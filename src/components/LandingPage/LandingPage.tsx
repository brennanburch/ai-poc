import React from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { submitQuestion, uploadFiles, getNewSessionId, type Answer } from "@helpers/server.ts";
import Page from "@components/Page";
import Dropzone from "./Dropzone.tsx";
import ResponseDisplay from "./ResponseDisplay.tsx";
import styles from "./LandingPage.module.scss";
import Summary from "./Summary.tsx";

export type UploadedFile = {
	file: File;
	fileId: string;
	summary: string;
};

type FailedFile = {
	file: File;
	reason: string;
};

function LandingPage() {
	const [sessionId, setSessionId] = React.useState("");
	const [question, setQuestion] = React.useState("");
	const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
	const [failedFiles, setFailedFiles] = React.useState<FailedFile[]>([]);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [response, setResponse] = React.useState<Answer>();
	const [loading, setLoading] = React.useState(false);
	const [name, setName] = React.useState("");

	/** Question submission */
	const handleAskQuestion = async () => {
		setLoading(true);
		console.log(`Asking question: ${question}`);

		try {
			const response = await submitQuestion({ question, sessionId });

			setResponse(response);
		} catch (error: unknown) {
			console.log("Error asking question:", error);

			setErrorMessage(error ? JSON.stringify(error) : "Error asking question");
			setResponse(undefined);
		}

		setLoading(false);
	};

	const handleFileUpload = async (files: File[]) => {
		setErrorMessage("");
		setLoading(true);
		setName(files.map((file) => file.name).join(", "));

		const newUploadedFiles: UploadedFile[] = [];
		const newFailedFiles: FailedFile[] = [];

		await Promise.all(files.map(async (file) => {
			try {
				console.log(`Uploading file "${file.name}"`);
				const { fileId, summary } = await uploadFiles({ file, sessionId });
				console.log(`"${file.name}" summary:`, summary);

				newUploadedFiles.push({ file, fileId, summary });
			} catch (_error: unknown) {
				const error = _error as Error;

				console.log(`Error uploading file "${file.name}":`, error);
				newFailedFiles.push({ file, reason: error.message });
			}
		}));

		setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
		setFailedFiles([...failedFiles, ...newFailedFiles]);
		setLoading(false);
		setName("");
	};

	React.useEffect(() => {
		const handleKeyDown = async (event: KeyboardEvent) => {
			if (event.key === "Enter" && !loading && question) {
				await handleAskQuestion();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [loading, question]);

	React.useEffect(() => {
		const handleGetNewSessionId = async () => {
			setLoading(true);

			const { sessionId: newSessionId } = await getNewSessionId();
			setSessionId(newSessionId);

			console.log("Started new session:", newSessionId);
			setLoading(false);
		};

		if (!sessionId) {
			void handleGetNewSessionId();
		}
	}, [sessionId]);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: handleFileUpload,
		multiple: true,
	});

	return (
		<Page
			pageClass={styles.page}
			contentBackgroundClass={styles.background}
			contentPreferredWidth={1400}
			contentClass={styles.pageContent}

		>
			{/* HIDE OPENAI API KEY IN LOGO */}

			<div className={styles.text}>

				<div className={styles.workArea}>
					<h1>Poetic AI Playground Chat</h1>
					<div className={styles.horizontalContainer}>

						<div className={styles.rightColumn}>

							<div
								{...getRootProps()}
								className={clsx(
									styles.dropzone,
									loading && styles.dropzoneLoading,
								)}
							>
								<input {...getInputProps()} disabled={loading} />
								<FontAwesomeIcon
									icon={faFile}
									className={styles.dropzoneIcon}
								/>
								<Dropzone isLoading={loading} name={name} isSessionStarted={Boolean(sessionId)} />

							</div>
							{uploadedFiles.map(({ file: { name }, fileId, summary }, i) => (
								<Summary key={fileId} number={i} fileName={name} summary={summary} />
							))}

							<div className={styles.questionInput}>
								<input
									type="text"
									placeholder="So, what's on your mind?"
									disabled={loading || !sessionId}
									value={question}
									onChange={(event) => setQuestion(event.target.value)}
								/>
								<button
									type="submit"
									disabled={loading || !question || !sessionId}
									className={styles.askQuestion}
									onClick={handleAskQuestion}
								>
									Submit
								</button>
								{loading && <div className={styles.loader} />}
							</div>



							<div className={styles.contextColumn}>
								{response && <ResponseDisplay response={response} />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}

export default LandingPage;
