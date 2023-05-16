import React from "react";
import styles from "./LandingPage.module.scss";




const breakpoint = 769;
const loadingText = "AI processing document. Please wait...";

type ContextSnippetProps = {

	name: string;
	isLoading: boolean;

};

function Dropzone({  name: fileName ,isLoading }: ContextSnippetProps) {
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
					<br/>
					{fileName}

			</p>
		);
	}

	return (
		<p className={styles.dropzoneText}>
			{isLoading
				? loadingText
				: "Drag and drop files to add to the knowledge base, or click to select files"}
			<br/>
					{fileName}
		</p>

	);
}

export default Dropzone;
