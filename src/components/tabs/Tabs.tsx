import { Paper, Tab, Tabs as DxTabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { Indicator, IndicatorConditions } from "../Indicator";

const tabsBorderColor = "#d4d4d4";

const useStyles = makeStyles((theme) => ({
	tabsWrapper: {
		background: "transparent",
		boxShadow: "none",
	},
	tabsContentWrapper: {
		position: "relative",
	},
	tab: {
		transition: "color .2s linear",
		"&:hover": {
			color: theme.palette.primary.dark,
		},
		maxWidth: "unset",
		textTransform: "none",
		minHeight: "unset",
	},
	tabsRoot: {
		minHeight: "unset",
		marginBottom: 20,
	},
	scrollBtn: {
		border: `1px solid ${tabsBorderColor}`,
		background: "#ffffff",
	},
	active: {
		"&:hover": {
			color: theme.palette.text.primary,
		},
	},
	tabLabel: {
		position: "relative",
	},
	tabIndicator: {
		left: "auto",
		right: -10,
		top: 0,
	},
}));

export interface TabsList {
	disabled?: boolean;
	indicator?: IndicatorConditions;
	label: string;
}

export interface TabsProps {
	active: number;
	className?: string;
	onChange: (tab: number) => void;
	tabs: TabsList[];
	classes?: {
		tabsContentWrapper?: string;
	};
}

/**
 * Компонент-обертка для стилизации стандартных вкладок из Material UI
 *
 * @param {TabsProps} props
 * @returns {JSX.Element}
 */
export const Tabs: React.FC<TabsProps> = ({
	onChange,
	tabs,
	active,
	children,
	className,
	classes: customClasses,
}) => {
	const classes = useStyles();

	const handleTabChange = useCallback((_, newTab) => onChange(newTab), [
		onChange,
	]);

	return (
		<Paper className={clsx(classes.tabsWrapper, className)}>
			<DxTabs
				value={active}
				onChange={handleTabChange}
				variant="scrollable"
				indicatorColor="primary"
				className={classes.tabsRoot}
				TabScrollButtonProps={{
					classes: {
						root: classes.scrollBtn,
					},
				}}
			>
				{tabs.map(({ label, disabled, indicator }, i) => {
					const tabLabel = (
						<span className={classes.tabLabel}>
							{label}
							{indicator && (
								<Indicator
									conditions={indicator}
									className={classes.tabIndicator}
								/>
							)}
						</span>
					);

					return (
						<Tab
							key={i}
							label={tabLabel}
							disabled={disabled}
							className={clsx(classes.tab, {
								[classes.active]: i === active,
							})}
						/>
					);
				})}
			</DxTabs>
			<div
				className={clsx(
					classes.tabsContentWrapper,
					customClasses?.tabsContentWrapper
				)}
			>
				{children}
			</div>
		</Paper>
	);
};
