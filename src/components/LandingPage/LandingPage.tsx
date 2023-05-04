import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import Page from "@components/Page";
import Go from "@components/Go";
import {
	submitQuestion,
	uploadFiles,
	type Answer,
	type UploadResponse,
} from "@helpers/postApi.ts";
import ResponseDisplay from "./ResponseDisplay.tsx";
import styles from "./LandingPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
	const [question, setQuestion] = React.useState("");
	const [uploadedFiles, setUploadedFiles] = React.useState<
		UploadResponse["successful_file_names"]
	>([]);
	const [failedFiles, setFailedFiles] = React.useState<
		UploadResponse["failed_file_names"]
	>({});
	const [errorMessage, setErrorMessage] = React.useState("");
	const [response, setResponse] = React.useState<Answer>();
	const [loading, setLoading] = React.useState(false);
	const [apiKey, setApiKey] = React.useState("");
	const [apiKeyApplied, setApiKeyApplied] = React.useState(false);
	const [visible, setVisible] = React.useState(false);

	const handleApplyKey = () => {
		localStorage.setItem("openai-api-key", apiKey);
		setApiKeyApplied(true);
	};

	/** Question submission */
	const handleAskQuestion = async () => {
		setLoading(true);
		console.log(`Asking question: ${question}`);

		try {
			const response = await submitQuestion(question, "GPT Turbo");

			setResponse(response);
			setLoading(false);
		} catch (error: unknown) {
			console.log("Error asking question:", error);

			setErrorMessage(error ? JSON.stringify(error) : "Error asking question");
			setResponse(undefined);
			setLoading(false);
		}
	};

	const handleFileUpload = async (files: File[]) => {
		setUploadedFiles([]);
		setFailedFiles({});
		setErrorMessage("");
		setLoading(true);

		try {
			const response = await uploadFiles(files);
			console.log("Response:", response);

			setUploadedFiles(response.successful_file_names ?? []);
			setFailedFiles(response.failed_file_names ?? {});
			setLoading(false);
		} catch (_error: unknown) {
			const error = _error as Error;
			console.log("Error uploading files:", error);

			setErrorMessage(
				error?.message ? `Error: ${error.message}` : "Error uploading files"
			);
			setUploadedFiles([]);
			setFailedFiles({});
			setLoading(false);
		}
	};

	React.useEffect(() => {
		// TODO: don't use local storage for an API key
		const savedApiKey = localStorage.getItem("openai-api-key");
		if (savedApiKey) {
			setApiKeyApplied(true);
		}
	}, []);

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

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: handleFileUpload,
		multiple: true,
	});

	const failedFilenames = Object.keys(failedFiles);

	return (
		<Page
			pageClass={styles.page}
			contentBackgroundClass={styles.background}
			contentPreferredWidth={1200}
			contentClass={styles.pageContent}
		>
			{/*HIDE OPENAI API KEY IN LOGO*/}

			<div className={styles.text}>
				<div className={styles.workArea}>
					<div className={styles.horizontalContainer}>
						<div className={styles.leftColumn}>
							<div>
								<button
									className={styles.btn}
									onClick={() => setVisible(!visible)}
								>
									{visible ? "" : ""}
									<h1>Get Started With PoeticAI</h1>
								</button>
								{visible && (
									<>
										<div id="apiKey">
											<div className={styles.questionInput}>
												<input
													type="text"
													value={apiKey}
													placeholder="Enter your OpenAI API key here..."
													onChange={(event) => setApiKey(event.target.value)}
												/>
												<button
													type="submit"
													className={styles.askQuestion}
													onClick={handleApplyKey}
												>
													Apply
												</button>
											</div>
										</div>
										<div className={styles.tokenCount}>
											To get an API key, visit the{" "}
											<Go
												to="https://platform.openai.com/account/api-keys"
												data-action={""}
												data-category={""}
											>
												<span
													style={{
														fontWeight: 900,
														textDecoration: "underline",
													}}
												>
													OpenAI API Keys Page
												</span>
											</Go>
										</div>
									</>
								)}
							</div>

							{errorMessage && (
								<div className={styles.error}>{errorMessage}</div>
							)}

							<>
								{/* Get Started SECTION*/}
								<div
									{...getRootProps()}
									className={clsx(
										styles.dropzone,
										loading && styles.dropzoneLoading
									)}
								>
									<input {...getInputProps()} disabled={loading} />
									<p className={styles.dropzoneText}>
										{loading
											? "Loading..."
											: "Drag and drop files to add to the knowledge base here, or click to select files"}
									</p>
									<FontAwesomeIcon
										icon={faFile}
										className={styles.dropzoneIcon}
									/>
								</div>

								<button
									type="submit"
									className={styles.button}
									onClick={handleApplyKey}
								>
									Next
									<FontAwesomeIcon
										icon={faArrowRight}
										className={styles.icon}
									/>
								</button>
							</>
							{/* Chat SECTION*/}


							<div className={styles.rightColumn}>
							<>
								<div className={styles.questionInput}>
									<input
										type="text"
										value={question}
										placeholder="So, what's on your mind?"
										onChange={(event) => setQuestion(event.target.value)}
									/>
									<button
										type="submit"
										disabled={loading || !question}
										className={
											loading ? styles.askQuestionDisabled : styles.askQuestion
										}
										onClick={handleAskQuestion}
									>
										Submit
									</button>
									{loading && <div className={styles.loader} />}
								</div>

								{response?.tokens && (
									<div className={styles.tokenCount}>
										TOTAL TOKENS USED:{" "}
										<span style={{ fontWeight: 900 }}>{response.tokens}</span>
									</div>
								)}
								{response && <ResponseDisplay response={response} />}
								<div style={{ height: 32 }} />
								<div className={styles.fileList}>
									{uploadedFiles.length > 0 && (
										<div className={styles.successfulFiles}>
											<h4>Uploaded Files:</h4>
											<ul>
												{uploadedFiles.map((file, index) => (
													<li key={index}>{file}</li>
												))}
											</ul>
										</div>
									)}
									{failedFilenames.length > 0 && (
										<div className={styles.failedFiles}>
											<h4>Failed Files:</h4>
											<ul>
												{failedFilenames.map((file, index) => (
													<li key={index}>
														{file}
														<div>Reason: {failedFiles[file]}</div>
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}

export default LandingPage;
