import React from "react";
import type { Context } from "@helpers/server.ts";
import type { UploadedFile } from "./LandingPage.tsx";
import styles from "./LandingPage.module.scss";

type ContextSnippetProps = {
	context: Context;
	number: number;
};

function ContextSnippet({ context: { name: fileName, content: fileContent }, number }: ContextSnippetProps) {
	const [collapsed, setCollapsed] = React.useState(true);

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div className={styles.contextSnippet}>
			<h4 onClick={toggleCollapse}>
				Context {number}
				<label className={styles.title}>
					{fileName}
					<span className={styles.arrow}>{collapsed ? "▼" : "▲"}</span>

				</label>
			</h4>
			<div className={collapsed ? styles.collapsed : styles.expanded}>
				<p className={collapsed ? styles.preview : styles.content}>
					{fileContent}
				</p>
			</div>
		</div>
	);
}

export default ContextSnippet;
