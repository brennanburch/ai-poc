import React from "react";
import ReactDOM from "react-dom/client"; // eslint-disable-line n/file-extension-in-import
import App from "@components/App";

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
