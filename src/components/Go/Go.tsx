import React from "react";
import { Link } from "react-router-dom";

type GoProps = {
	className?: string;
	to?: string;
	isExternal?: boolean;
	"data-action": string;
	"data-category": string;
	children?: React.ReactNode;
	onClick?: () => void;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const HOSTNAMES = new Set(["localhost", "vault.app"]);

/**
 * <Go to="url" />
 * Combines <Link> and <a> into a simple hassle-free interface
 */
function Go(props: GoProps) {
	if (!props.to) {
		return (
			<a target="_blank" rel="noopener noreferrer" {...props} />
		);
	}

	const curHost = window.location.hostname;
	const toUrl = new URL(props.to);

	if (HOSTNAMES.has(toUrl.hostname) && !props.isExternal) {
		const linkProps = { ...props, to: `${toUrl.pathname}${toUrl.hash}` };
		return <Link {...linkProps} />;
	}

	return (
		<a href={props.to} target="_blank" rel="noopener noreferrer" {...props} />
	);
}

export default Go;
