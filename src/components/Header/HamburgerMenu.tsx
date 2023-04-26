import React from "react";
import styles from "./Header.module.scss";

type HamburgerMenuProps = {
	children: React.ReactNode;
	linkClasses: string;
	onClick: () => void;
};

function HamburgerMenu({ children, linkClasses, onClick }: HamburgerMenuProps) {
	return (
		<div className={styles.hamburgerMenu}>
			<div className={styles.pancakeIcon} onClick={onClick} />
			<div className={linkClasses}>{children}</div>
		</div>
	);
}

export default HamburgerMenu;
