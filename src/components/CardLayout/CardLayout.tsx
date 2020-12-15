import { IconButton, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { getIcon } from "../icons";

const useStyles = makeStyles({
	shadow: {
		zIndex: 1,
		position: "fixed",
		left: 0,
		top: 0,
		background: "rgb(0, 0, 0, 0.38)",
		width: "100%",
		height: "100%",
	},
	cardLayoutWrapper: {
		overflow: "hidden",
	},
	cardLayout: {
		position: "fixed",
		width: 1400,
		height: "100%",
		right: 0,
		top: 0,
		padding: 10,
		boxShadow: "0 0 15px 3px #797979",
		zIndex: 3,
		background: "#f5f5f5",
		paddingLeft: 20,
	},
	close: {
		background: "#9dc967",
		color: "#ffffff",
		fontSize: 16,
		textTransform: "uppercase",
		borderRadius: 0,
		padding: 5,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		paddingRight: 25,
		position: "absolute",
		top: 30,
		left: -134,
		opacity: 0.9,
		transition: "opacity .3s linear",
		"&:hover": {
			background: "#9dc967",
			opacity: 1,
		},
	},
	closeIcon: {
		fontSize: 22,
		border: "1px solid #ffffff",
		borderRadius: "100%",
		marginRight: 20,
	},
});

const CloseIcon = getIcon("Close");

interface CardLayoutProps {
	open?: boolean;
	onClose: () => void;
}

/**
 * Панель, выезжающая слева
 * 
 * @param {CardLayoutProps} props
 * @returns {JSX.Element}
 */
export const CardLayout: React.FC<CardLayoutProps> = ({
	onClose,
	open,
	children,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.cardLayoutWrapper}>
			<div className={classes.shadow} hidden={!open} onClick={onClose} />
			<Slide in={open} direction="left">
				<div className={classes.cardLayout}>
					<IconButton
						size="small"
						className={classes.close}
						onClick={onClose}
					>
						<CloseIcon className={classes.closeIcon} /> Задача
					</IconButton>
					{children}
				</div>
			</Slide>
		</div>
	);
};
