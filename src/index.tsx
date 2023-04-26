import React from "react";
import ReactDOM from "react-dom/client"; // eslint-disable-line n/file-extension-in-import
import AppRouting from "@components/AppRouting";
import "./index.scss";

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<AppRouting />
	</React.StrictMode>,
);
