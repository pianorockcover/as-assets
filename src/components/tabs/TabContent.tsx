import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(() => ({
    box: {
        position: "relative",
        height: "100%",
    },
}));

interface TabContentProps {
    className?: string;
    index: number;
    value: number;
}

/**
 * Компонент для открисовке контента вкладки
 *
 * @param {TabContentProps} props
 * @returns {JSX.Element}
 */
export const TabContent: React.FC<TabContentProps> = ({ children, value, index, className }) => {
    const classes = useStyles();
    return (
        <div role="tabpanel" hidden={value !== index}>
            <Box className={clsx(classes.box, className)}>{children}</Box>
        </div>
    );
};
