import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { submitQuestion, uploadFiles, getNewSessionId, type Answer } from "@helpers/server.ts";
import Page from "@components/Page";
import ResponseDisplay from "./ResponseDisplay.tsx";
import styles from "./LandingPage.module.scss";
import Checkbox from '@mui/material/Checkbox';




export type UploadedFile = {
	file: File;
	fileId: string;
};

type FailedFile = {
	file: File;
	reason: string;
};

function OurDocs() {
	const [sessionId, setSessionId] = React.useState("");
	const [question, setQuestion] = React.useState("");

	const [errorMessage, setErrorMessage] = React.useState("");
	const [response, setResponse] = React.useState<Answer>();
	const [loading, setLoading] = React.useState(false);
	const label = { inputProps: { 'aria-label': 'Checkbox' } };

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
						<h1>Chat With Our Docs</h1>
						<h3>Select one of the documents below and ask us a question.</h3>

						<div className={styles.cardContainer}>
							<div className={styles.card}>
							<Checkbox className={styles.card}{...label} />

							<FontAwesomeIcon
								icon={faFile}
								className={styles.dropzoneIcon}
							/></div>
							<div className={styles.card}>
							<Checkbox className={styles.card} {...label} />

							<FontAwesomeIcon
								icon={faFile}
								className={styles.dropzoneIcon}
							/></div>
							<div className={styles.card}>
							<Checkbox className={styles.card} {...label} />

							<FontAwesomeIcon
								icon={faFile}
								className={styles.dropzoneIcon}
							/></div>
						</div>


						{response && <ResponseDisplay response={response} />}

						<div className={styles.questionInput}>
							<input
								type="text"
								placeholder="Ask a question about this document"
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

export default OurDocs;
