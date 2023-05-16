import React from "react";
import styles from "./LandingPage.module.scss";

type SummaryProps = {
	number: number;
	fileName: string;
	summary: string;
};

function Summary({ number, fileName, summary }: SummaryProps) {
	return (
		<div className={styles.horizontalContainer}>
			<span>{`${number}. ${fileName}`}</span>
			<p>Summary: {summary}</p>
		</div>
	);
}

export default Summary;
