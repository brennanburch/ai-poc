import React from "react";
import clsx from "clsx";
import Go from "@components/Go";
import HamburgerMenu from "./HamburgerMenu.tsx";
import styles from "./Header.module.scss";

function Header() {
	const thisSite = window.location.hostname === "localhost"
		? "http://localhost:8100"
		: "https://34.82.254.177/";

	const [showPancakeMenu, setShowPancakeMenu] = React.useState(false);

	return (
		<div className={styles.header}>
			<HamburgerMenu
				linkClasses={clsx(styles.sublinks, showPancakeMenu && styles.visible)}
				onClick={() => setShowPancakeMenu(!showPancakeMenu)}
			>
				<Go
					to={`${thisSite}/`}
					className={styles.menuButton}
					data-category="Giftcard-header"
					data-action="Home"
				>
					Home
				</Go>
			</HamburgerMenu>
			<Go to={thisSite} data-action="home" data-category="Giftcard-header">
				<div className={styles.giftLogo}>The Vault</div>
			</Go>
		</div>
	);
}

export default Header;
