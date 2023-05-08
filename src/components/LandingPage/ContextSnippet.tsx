import React from "react";
import type { Context } from "@helpers/postApi";
import styles from "./LandingPage.module.scss";

type ContextSnippetProps = {
	context: Context;
	index: number;
};

function ContextSnippet({ context, index }: ContextSnippetProps) {
	const [collapsed, setCollapsed] = React.useState(true);

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	const preview = context.text.slice(0, 222) + (context.text.length > 222 ? "..." : "");

	return (
		<div className={styles.contextSnippet}>
			<h4 onClick={toggleCollapse}>
				Context {index + 1}
				<span className={styles.title}>
					
					<span className={styles.arrow}>{collapsed ? "▼" : "▲"}</span>
				</span>
			</h4>
			<div className={collapsed ? styles.collapsed : styles.expanded}>
				{collapsed ? preview : context.text}
			</div>
		</div>
	);
}

export default ContextSnippet;
