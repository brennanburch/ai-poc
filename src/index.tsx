import React from "react";
import ReactDOM from "react-dom/client"; // eslint-disable-line n/file-extension-in-import
import LandingPage from "@components/LandingPage";
import "./index.scss";

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<LandingPage />
	</React.StrictMode>,
);
