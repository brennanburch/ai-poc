import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useLocationChange from "@hooks/useLocationChange.ts";
import styles from "./AppRouting.module.scss";

const LandingPage = React.lazy(async () => import("@components/LandingPage"));
const Header = React.lazy(async () => import("@components/Header"));

const loading = (
	<div
		style={{
			color: "#fff",
			minHeight: "100vh",
			backgroundColor: "white",
			minWidth: "100%",
		}}
	>
		loading...
	</div>
);

type RoutingError = {
	message: string;
	errorStack: string;
	reactStack: string;
};

function AppRouting() {
	const [error, setError] = React.useState<RoutingError>();

	// UseLocationChange(() => window.scrollTo(0, 0));

	return error ? (
		<div className={styles.crashPage}>
			<div className={styles.errorBox}>
				<div className={styles.title}>Oops, A Wild Error Appeared! It says:</div>
				<div className={styles.message}>{`"${error.message}"`}</div>
				<div className={styles.reactStack}>{error.reactStack}</div>
				<div className={styles.errorStack}>{error.errorStack}</div>
			</div>
		</div>
	) : (
		<Suspense fallback={loading}>
			<BrowserRouter>
				<Routes>
					<Route Component={Header} />
					<Route path="/" Component={LandingPage} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}

export default AppRouting;
