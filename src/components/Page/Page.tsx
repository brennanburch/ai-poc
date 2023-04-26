import React from "react";
import clsx from "clsx";
import Footer from "@components/Footer";
import styles from "./Page.module.scss";

type PageProps = {
	contentPreferredWidth: number;
	anchorTarget?: string;
	pageClass?: string;
	pageBackgroundClass?: string;
	contentClass?: string;
	contentBackgroundClass?: string;
	contentBackground?: string;
	footerComponent?: React.ReactNode;
	showContentFooter?: boolean;
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
							props.showContentFooter && styles.showFooter,
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
			{props.footerEnabled && (props.footerComponent
				?? <Footer floating={props.footerFloating} backgroundClass={props.pageBackgroundClass} />
			)}
		</div>
	);
}

export default Page;
