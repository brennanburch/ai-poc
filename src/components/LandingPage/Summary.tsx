import React from "react";
import styles from "./LandingPage.module.scss";

type SummaryProps = {
	number: number;
	fileName: string;
	summary: string;
};

function Summary({ number, fileName, summary }: SummaryProps) {
	return (
		<div className={styles.summaryColumn}>
			<span className={styles.successText}>{`${number + 1}. ${fileName}`} </span>
			Summary: {summary}

		</div>
	);
}

export default Summary;
