import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useMemo } from "react";

const useStyles = makeStyles((theme) => ({
    indicator: {
        borderRadius: "100%",
        height: 10,
        left: 10,
        position: "absolute",
        top: "calc(50% - 18px)",
        width: 10,
        zIndex: theme.zIndex.drawer + 2,
    },
}));

export type IndicatorConditions = {
    color: string;
    condition: string;
    tip?: string;
}[];

interface IndicatorProps {
    className?: string;
    conditions: IndicatorConditions;
}

/**
 * Индикатор около пункта меню или вкладки.
 *
 * Окрашивается в цвет color в зависимости от условия eval(condition)
 *
 * @param {Indicator} props
 * @returns {JSX.Element}
 */
export const Indicator: React.FC<IndicatorProps> = React.memo(({ conditions, className }) => {
    const classes = useStyles();

    // TODO: Допилить вебсокеты, брать значения для eval(condition) из ApplicationState
    const currentCondition = conditions.find(({ condition }) => true /* eval(condition) */);
    const style = useMemo(
        () =>
            currentCondition
                ? {
                      color: currentCondition.color,
                      background: currentCondition.color,
                  }
                : {},
        [currentCondition],
    );

    const tip = useMemo(() => (currentCondition && currentCondition.tip ? currentCondition.tip : ""), [
        currentCondition,
    ]);

    return (
        <Tooltip title={tip}>
            <div className={clsx(classes.indicator, className)} style={style} />
        </Tooltip>
    );
});
