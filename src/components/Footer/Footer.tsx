import React from "react";
import clsx from "clsx";
import Go from "@components/Go";
import styles from "./Footer.module.scss";

type FooterProps = {
	isBackgroundOnly?: boolean;
	backgroundClass?: string;
};

function Footer({ isBackgroundOnly, backgroundClass }: FooterProps) {
	return (
		<div className={clsx(styles.footer, backgroundClass, isBackgroundOnly && styles.backgroundOnly)} >
			<div className={styles.footerContainer}>
				<div className={clsx(styles.cropHeight, styles.flip)}>
					{!isBackgroundOnly && (
						<div className={styles.content}>
							<div className={styles.linkRow}>
								<div className={styles.socialButtons} />
								<div className={styles.linkColumn}>
									<div className={styles.linkHeader}>Vault</div>
									<Go to="/" data-action="vault-home" data-category="footer-link">
										Home
									</Go>
								</div>
								<div className={styles.linkColumn}>
									<div className={styles.linkHeader}>Help</div>
									<div>FAQ</div>
									<div>Contact Us</div>
								</div>
								<div className={styles.linkColumn} />
								<div className={styles.linkColumn} />
							</div>
							<div className={styles.bottomRow}>
								<img
									style={{ display: "inline-block" }}
									height="40px"
									width="40px"
									src="/img/logos/vault-favicon.png"
								/>

								<span>
									© pashpashpash {new Date().getFullYear()} All
									Rights Reserved.
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Footer;
