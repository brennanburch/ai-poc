import React from "react";
import styles from "./LandingPage.module.scss";

const breakpoint = 769;
const loadingText = "Loading...";

type ContextSnippetProps = {
	isLoading: boolean;
};

function Dropzone({ isLoading }: ContextSnippetProps) {
	const [width, setWidth] = React.useState(window.innerWidth);

	React.useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		// Return a function from the effect that removes the event listener
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	if (width < breakpoint) {
		return (
			<p className={styles.dropzoneText}>
				{isLoading
					? loadingText
					: "Tap to select files to add to the knowledge base"}
			</p>
		);
	}

	return (
		<p className={styles.dropzoneText}>
			{isLoading
				? loadingText
				: "Drag and drop files to add to the knowledge base, or click to select files"}
		</p>
	);
}

export default Dropzone;
