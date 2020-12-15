import { Button, Typography } from "@material-ui/core";
import React, { createRef, useCallback, useState } from "react";
import { RichTextEditor } from "./components/RichTextEditor/RichTextEditor";
import { makeStyles } from "@material-ui/core/styles";
import { CommentProps } from "./components/Comments/Comment";
import { Comments } from "./components/Comments/Comments";
import fakeApiComments from "./fake-api.json";
import { CardLayout } from "./components/CardLayout/CardLayout";
import taskHistoryData from "./fake-api-graph.json";
import { TaskHistory } from "./components/TaskHistory/TaskHistory";
import { Tabs } from "./components/tabs/Tabs";
import { noop } from "lodash";
import { TabContent } from "./components/tabs/TabContent";

const useStyles = makeStyles({
	"@global": {
		"*::-webkit-scrollbar": {
			width: 10,
			height: 10,
		},
		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "rgba(0, 0, 0, .3)",
			borderRadius: 5,
		},
		"*::-webkit-scrollbar-track": {
			backgroundColor: "rgba(0, 0, 0, .1)",
		},
	},
	body: {
		minWidth: 1000,
		backgroundColor: "#eef2f4",
	},
	leaveCommentBtn: {
		marginBottom: 20,
	},
	badge: {
		background: "#FF9800",
		color: "#ffffff",
		textAlign: "center",
		borderRadius: 5,
		padding: 3,
		width: "fit-content",
		paddingLeft: 20,
		paddingRight: 20,
		marginRight: 10,
		minWidth: 200,
	},
	title: {
		fontSize: 17,
		marginBottom: 20,
		marginTop: 0,
		fontWeight: 500,
	},
	decisionBtn: {
		background: "#78a971",
		color: "#ffffff",
		paddingLeft: 50,
		paddingRight: 50,
		display: "block",
		margin: "0 auto",
		"&:hover": {
			background: "#78a971",
		},
	},
	cardArea: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
	},
	cardContent: {
		display: "flex",
		height: "100%",
	},
	cardContentLeft: {
		width: "50%",
		paddingRight: 10,
		height: "100%",
        overflow: "auto",
        marginRight: 10,
	},
	cardContentRight: {
		width: "50%",
		background: "#ffffff",
		padding: 10,
		height: "100%",
		overflow: "auto",
	},
	cardHeader: {
		paddingTop: 10,
		borderBottom: "1px solid #dedede",
		marginBottom: 10,
		position: "relative",
		paddingBottom: 15,
	},
	cardBody: {
		flex: 1,
		overflow: "hidden",
	},
	cardFooter: {
		background: "#ffffff",
		marginRight: -20,
		marginLeft: -20,
		padding: 15,
		marginTop: 10,
		marginBottom: -10,
	},
	tabsContentWrapper: {
		height: "calc(100% - 55px)",
		"&>div": {
			height: "100%",
		},
	},
	formPlaceholder: {
		width: "100%",
		height: 500,
		background: "#ffffff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#b3b3b3",
		marginBottom: 20,
		boxShadow: "2px 3px 10px 1px rgb(210 210 210)",
	},
	assetState: {
		display: "flex",
		alignItems: "center",
		color: "#848484",
	},
	controlDate: {
		color: "#ff575b",
		position: "absolute",
		right: 0,
		bottom: 5,
		fontSize: 13,
	},
});

const App: React.FC = () => {
	const classes = useStyles();

	const [comments, setComments] = useState<CommentProps[]>(fakeApiComments);
	const [forceClean, setForceClean] = useState<number>();
	const [currentComment, setCurrentComment] = useState<string>();

    const commContainerRef = createRef<HTMLDivElement>();

	const leaveComment = useCallback(() => {
		if (currentComment) {
			setComments([
				{
					date: "23.09.2020 20:31",
					text: currentComment,
					user: {
						id: 2,
						name: "Тест Тестов",
					},
					decision: {
						label: "Решение не принято",
					},
				},
				...comments,
			]);
			setForceClean(+new Date());
			setCurrentComment(undefined);

            console.log(currentComment);
            
            if (commContainerRef && commContainerRef.current) {
                commContainerRef.current.scrollTop = 0;
            }
		}
	}, [currentComment, comments, commContainerRef]);

	const [openLayout, setOpenLayout] = useState<boolean>(true);
	const closeLayout = useCallback(() => setOpenLayout(false), []);
	const showLayout = useCallback(() => setOpenLayout(true), []);

	return (
		<>
			<Button onClick={showLayout}>Открыть карточку Актива</Button>
			<CardLayout open={openLayout} onClose={closeLayout}>
				<div className={classes.cardArea}>
					<div className={classes.cardHeader}>
						<Typography variant="h3" className={classes.title}>
							Учетная карточка актива 201212000932
						</Typography>
						<div className={classes.assetState}>
							<div className={classes.badge}>Актив в пуле</div> c
							23.02.2030
						</div>
						<div className={classes.controlDate}>
							Контрольная дата: 15.06.2031
						</div>
					</div>
					<Tabs
						active={0}
						onChange={noop}
						tabs={[
							{ label: "Кредитный договор" },
							{ label: "Критерии актива" },
							{ label: "Критерии организации" },
						]}
						className={classes.cardBody}
						classes={{
							tabsContentWrapper: classes.tabsContentWrapper,
						}}
					>
						<TabContent index={0} value={0}>
							<div className={classes.cardContent}>
								<div className={classes.cardContentLeft} ref={commContainerRef}>
									<div className={classes.formPlaceholder}>
										Форма редактирования актива
									</div>
									<Comments data={comments} selfUserId={2} />

									<RichTextEditor
										onChange={setCurrentComment}
										forceClean={forceClean}
									/>
									<Button
										variant="contained"
										size="small"
										color="primary"
										onClick={leaveComment}
									>
										Сохранить описание
									</Button>
								</div>
								<div className={classes.cardContentRight}>
									<Tabs
										active={0}
										onChange={noop}
										tabs={[
											{ label: "Изменения по активу" },
											{ label: "Грвфик погашения" },
											{ label: "Ревизиты договора" },
										]}
										className={classes.cardBody}
									>
										<TabContent index={0} value={0}>
											<TaskHistory
												data={taskHistoryData as any}
											/>
										</TabContent>
									</Tabs>
								</div>
							</div>
						</TabContent>
					</Tabs>
					<div className={classes.cardFooter}>
						<Button
							variant="contained"
							size="small"
							className={classes.decisionBtn}
						>
							Принять решение по активу
						</Button>
					</div>
				</div>
			</CardLayout>
		</>
	);
};

export default App;
