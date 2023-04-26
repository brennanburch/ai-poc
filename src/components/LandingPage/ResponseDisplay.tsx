import React from "react";
import type { Answer } from "@helpers/postApi";
import ContextSnippet from "./ContextSnippet.tsx";
import styles from "./LandingPage.module.scss";

type ResponseDisplayProps = {
	response: Answer;
};

function ResponseDisplay({ response }: ResponseDisplayProps) {
	return (
		<div className={styles.responseDisplay}>
			<div className={styles.answer}>{response.answer}</div>
			<div className={styles.contexts}>
				{response.context.map((context, index) => (
					<ContextSnippet key={index} context={context} index={index} />
				))}
			</div>
		</div>
	);
}

export default ResponseDisplay;
