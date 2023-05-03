import React from "react";
import clsx from "clsx";
import styles from "./Page.module.scss";

type PageProps = {
	contentPreferredWidth: number;
	anchorTarget?: string;
	pageClass?: string;
	pageBackgroundClass?: string;
	contentClass?: string;
	contentBackgroundClass?: string;
	contentBackground?: string;
	verticalCenter?: boolean;
	footerEnabled?: boolean;
	footerFloating?: boolean;
	heightOverride?: number;
	hasNoTopPadding?: boolean;
	style?: Record<string, unknown>;
	children?: React.ReactNode;
};

function Page(props: PageProps) {
	return (
		<div>
			<div
				id={props.anchorTarget}
				className={clsx(styles.page, props.pageClass, props.pageBackgroundClass)}
				style={{
					...props.heightOverride ? {
						height: `${props.heightOverride}px`,
						minHeight: `${props.heightOverride}px`,
					} : {},
					...props.style,
				}}
			>
				<div
					className={clsx(styles.contentBackground, props.contentBackgroundClass)}
					style={{ backgroundImage: props.contentBackground ? `url${props.contentBackground})` : undefined }}
				>
					<div
						className={clsx(
							styles.content,
							props.contentClass,

							props.verticalCenter && styles.verticalCenter,
						)}
						style={{
							width: props.contentPreferredWidth,
							...props.hasNoTopPadding ? { paddingTop: 0 } : {},
						}}
					>
						{props.children}
					</div>
				</div>
			</div>

		</div>
	);
}

export default Page;
