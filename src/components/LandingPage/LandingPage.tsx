import React from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { submitQuestion, uploadFiles, getNewSessionId, type Answer } from "@helpers/server.ts";
import Page from "@components/Page";
import ResponseDisplay from "./ResponseDisplay.tsx";
import ContextSnippet from "./ContextSnippet.tsx";

import styles from "./LandingPage.module.scss";

export type UploadedFile = {
	file: File;
	fileId: string;
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

		const newUploadedFiles: UploadedFile[] = [];
		const newFailedFiles: FailedFile[] = [];

		await Promise.all(files.map(async (file) => {
			try {
				console.log(`Uploading file "${file.name}"`);
				const { fileId } = await uploadFiles({ file, sessionId });

				newUploadedFiles.push({ file, fileId });
			} catch (_error: unknown) {
				const error = _error as Error;

				console.log(`Error uploading file "${file.name}":`, error);
				newFailedFiles.push({ file, reason: error.message });
			}
		}));

		setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
		setFailedFiles([...failedFiles, ...newFailedFiles]);
		setLoading(false);
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
	const dropzoneContent = () => {
	const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 769;

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width < breakpoint ? <p className={styles.dropzoneText}>
  {loading
	  ? "Loading..."
	  : "Tap to select files"}</p> :
	  <p className={styles.dropzoneText}>
		{loading
			? "Loading..."
			: "Drag and drop files to add to the knowledge base here, or click to select files"}</p>;
		}

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
					<div className={styles.leftColumn}>
						<h1>Get Started With PoeticAI</h1>

						{/* Get Started SECTION */}
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
							{dropzoneContent()}
						</div>


						{response && <ResponseDisplay response={response} files={uploadedFiles} />}

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
					</div>
				</div>
			</div>
		</Page>
	);
}

export default LandingPage;
