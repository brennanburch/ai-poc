import React from "react";
import type { Context } from "@helpers/server.ts";
import type { UploadedFile } from "./LandingPage.tsx";
import styles from "./LandingPage.module.scss";

type ContextSnippetProps = {
	context: Context;
	files: UploadedFile[];
	number: number;
};

function ContextSnippet({ context: { fileId, content: fileContent }, files, number }: ContextSnippetProps) {
	const [collapsed, setCollapsed] = React.useState(true);

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	const maybeFile = files.find((file) => file.fileId === fileId);

if (!maybeFile) {
	return (<div />);
}

const { file } = maybeFile;
const preview = fileContent.slice(0, 222) + (fileContent.length > 222 ? "..." : "");

	return (
		<div className={styles.contextSnippet}>
			<h4 onClick={toggleCollapse}>
				Context {number}
				<label className={styles.title}>
					{file.name}
					<span className={styles.arrow}>{collapsed ? "▼" : "▲"}</span>
					
				</label>
			</h4>
			<div className={collapsed ? styles.collapsed : styles.expanded}>
				{collapsed ? preview : fileContent}
			</div>
		</div>
	);
}

export default ContextSnippet;
