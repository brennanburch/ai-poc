import React from "react";
import styles from "./LandingPage.module.scss";

const breakpoint = 769;

type ContextSnippetProps = {
	name: string;
	isLoading: boolean;
	isSessionStarted: boolean;
};

function Dropzone({ name: fileName, isLoading, isSessionStarted }: ContextSnippetProps) {
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
					? (isSessionStarted
						? "Loading..."
						: "AI processing document. Please wait...")
					: "Tap to select files to add to the knowledge base"}
				<br />
				{fileName}

			</p>
		);
	}

	return (
		<p className={styles.dropzoneText}>
			{isLoading
				? (isSessionStarted
					? "Loading..."
					: "AI processing document. Please wait...")
				: "Drag and drop files to add to the knowledge base, or click to select files"}
			<br />
			{fileName}
		</p>

	);
}

export default Dropzone;
