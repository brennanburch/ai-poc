import React from "react";
import type { Answer } from "@helpers/server.ts";
import type { UploadedFile } from "./LandingPage.tsx";
import ContextSnippet from "./ContextSnippet.tsx";
import styles from "./LandingPage.module.scss";

type ResponseDisplayProps = {
	response: Answer;
	files: UploadedFile[];
};

function ResponseDisplay({ response, files }: ResponseDisplayProps) {
	return (
		<div className={styles.responseDisplay}>
			<div className={styles.answer}>{response.answer}</div>
			{/* <div className={styles.contexts}>
				{response.context.map((context, index) => (
					<ContextSnippet key={index} context={context} files={files} number={index + 1} />
				))}
			</div> */}
		</div>
	);
}

export default ResponseDisplay;
