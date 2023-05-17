import React from "react";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { submitQuestionForDocs, type Answer } from "@helpers/server.ts";
import Page from "@components/Page";
import ResponseDisplay from "./ResponseDisplay.tsx";
import styles from "./LandingPage.module.scss";

function OurDocs() {
	const [question, setQuestion] = React.useState("");
	const [doc, setDoc] = React.useState("KennedyMoonSpeech.txt");
	const [errorMessage, setErrorMessage] = React.useState("");
	const [response, setResponse] = React.useState<Answer>();
	const [loading, setLoading] = React.useState(false);

	const doc1 = "Chat with Kennedy's \"We Choose The Moon\" speech transcript.";
	const doc1FileName = "KennedyMoonSpeech.txt";
	const doc2 = "Chat with Lincoln's \"Gettysburg Address\" transcript.";
	const doc2FileName = "GettysburgSpeech.txt";
	const doc3 = "Chat with Reagan's \"The Berlin Wall\" speech transcript.";
	const doc3FileName = "ReaganBerlinWallSpeech.txt";

	/** Question submission */
	const handleAskQuestion = async () => {
		setLoading(true);
		console.log(`Asking question: ${question}`);

		try {
			const response = await submitQuestionForDocs({ question, document: doc });

			setResponse(response);
		} catch (error: unknown) {
			console.log("Error asking question:", error);

			setErrorMessage(error ? JSON.stringify(error) : "Error asking question");
			setResponse(undefined);
		}

		setLoading(false);
	};

	// Disabled because it breaks choosing the doc
	// React.useEffect(() => {
	// 	const handleKeyDown = async (event: KeyboardEvent) => {
	// 		if (event.key === "Enter" && !loading && question) {
	// 			await handleAskQuestion();
	// 		}
	// 	};

	// 	document.addEventListener("keydown", handleKeyDown);

	// 	return () => {
	// 		document.removeEventListener("keydown", handleKeyDown);
	// 	};
	// }, [loading, question]);

	return (
		<Page
			pageClass={styles.page}
			contentBackgroundClass={styles.background}
			contentPreferredWidth={1400}
			contentClass={styles.pageContent}
		>
			<div className={styles.text}>
				<div className={styles.workArea}>
					<h1>Chat With These Famous Docs</h1>
					<h4>This simple example is just a taste of how Generative AI can be used to interact with your
						business's document collection to Classify, Detect, Analyze, Automate, and Revolutionize your
						business's data flow or documents. Schedule some time with Poetic to understand how we can
						transform your business processes and workshop an AI Based Transformation.
					</h4>

					<div className={styles.horizontalContainer}>
						<div className={styles.rightColumn}>
							<RadioGroup
								className={styles.darkContainer}
								aria-labelledby="documents-radio-button-group-label"
								name="documents-radio-buttons-group"
								defaultValue={doc1FileName}
								value={doc}
								onChange={(event) => setDoc(event.target.value)}
							>
								<div className={styles.cardKennedy}>
									<FormControlLabel
										className={styles.cardContent}
										value={doc1FileName}
										label={doc1}
										labelPlacement="bottom"
										control={<Radio />}
									/>
								</div>
								<div className={styles.cardLincoln}>
									<FormControlLabel
										className={styles.cardContent}
										value={doc2FileName}
										label={doc2}
										labelPlacement="bottom"
										control={<Radio />}
									/>
								</div>
								<div className={styles.cardReagan}>
									<FormControlLabel
										className={styles.cardContent}
										value={doc3FileName}
										label={doc3}
										labelPlacement="bottom"
										control={<Radio />}
									/>
								</div>
							</RadioGroup>

							<div className={styles.questionInput}>
								<input
									type="text"
									placeholder="Ask a question..."
									disabled={loading}
									value={question}
									onChange={(event) => setQuestion(event.target.value)}
								/>
								<button
									type="submit"
									disabled={loading || !question}
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

export default OurDocs;
