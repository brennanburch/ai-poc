import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { submitQuestionForDocs, type Answer } from "@helpers/server.ts";
import Page from "@components/Page";
import ResponseDisplay from "./ResponseDisplay.tsx";
import styles from "./LandingPage.module.scss";

function OurDocs() {
	const [question, setQuestion] = React.useState("");
	const [doc1Selected, setDoc1Selected] = React.useState(false);
	const [doc2Selected, setDoc2Selected] = React.useState(false);
	const [doc3Selected, setDoc3Selected] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [response, setResponse] = React.useState<Answer>();
	const [loading, setLoading] = React.useState(false);

	const noDocumentsSelected = () => !doc1Selected && !doc2Selected && !doc3Selected;

	const doc1 = "Customer-Rights.pdf";
	const doc2 = "PMA-FAQ.pdf";
	const doc3 = "Tickets-Museo-Del-Prado.pdf";

	/** Question submission */
	const handleAskQuestion = async () => {
		setLoading(true);
		console.log(`Asking question: ${question}`);

		try {
			const selectedDocuments = [
				doc1Selected && doc1,
				doc2Selected && doc2,
				doc3Selected && doc3,
			].filter(Boolean) as string[];

			console.log(selectedDocuments);

			const response = await submitQuestionForDocs({ question, documents: selectedDocuments });

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
				<h1>Chat With These Famous Docs</h1>
				<h4>This simple example is just a taste of how Generative AI can be used to interact with your
						business's document collection to Classify, Detect, Analyze, Automate, and Revolutionize your
						business's data flow or documents. Schedule some time with Poetic to understand how we can
						transform your business processes and workshop an AI Based Transformation.
					</h4>


						<div className={styles.horizontalContainer}>
						<div className={styles.rightColumn}>
						<FormGroup className={styles.cardContainer}>
							<FormControlLabel
								className={styles.card}
								label={doc1}
								labelPlacement="bottom"
								control={
									<span>
										<Checkbox
											inputProps={{ "aria-label": `Checkbox ${doc1}` }}
											checked={doc1Selected}
											onChange={(event) => setDoc1Selected(event.target.checked)}
										/>
										<FontAwesomeIcon
											icon={faFile}
											className={styles.dropzoneIcon}
										/>
									</span>
								}
							/>
							<FormControlLabel
								className={styles.card}
								label={doc2}
								labelPlacement="bottom"
								control={
									<span>
										<Checkbox
											inputProps={{ "aria-label": `Checkbox ${doc2}` }}
											checked={doc2Selected}
											onChange={(event) => setDoc2Selected(event.target.checked)}
										/>
										<FontAwesomeIcon
											icon={faFile}
											className={styles.dropzoneIcon}
										/>
									</span>
								}
							/>
							<FormControlLabel
								className={styles.card}
								label={doc3}
								labelPlacement="bottom"
								control={
									<span>
										<Checkbox
											inputProps={{ "aria-label": `Checkbox ${doc3}` }}
											checked={doc3Selected}
											onChange={(event) => setDoc3Selected(event.target.checked)}
										/>
										<FontAwesomeIcon
											icon={faFile}
											className={styles.dropzoneIcon}
										/>
									</span>
								}
							/>
						</FormGroup>
						<div className={styles.contextColumn}>
						{response && <ResponseDisplay response={response} />}
						</div>


						<div className={styles.questionInput}>
							<input
								type="text"
								placeholder="Ask a question..."
								disabled={loading || noDocumentsSelected()}
								value={question}
								onChange={(event) => setQuestion(event.target.value)}
							/>
							<button
								type="submit"
								disabled={loading || !question || noDocumentsSelected()}
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

				</div>

		</Page>
	);
}

export default OurDocs;
