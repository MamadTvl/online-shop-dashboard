import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Backdrop, CircularProgress, Typography} from "@material-ui/core";
import CommentCard from "./CommentCard";
import ItemLink from "../../Routes/Link/ItemLink";
import useAllCommentsData from "./Actions/useAllCommentsData";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        display: "flex",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: 'bold'
    },
    visitAll: {
        // borderStyle: "none",
        // borderColor: '#F8F8F8',
        // backgroundColor: '#F8F8F8',
        fontFamily: 'Shabnam',
        color: '#F16522',
        fontSize: 16,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color:'#F16522'
    }
}), {index: 1});


function CommentsSection() {
    const classes = useStyles();
    const [fetch, setFetch] = useState(true)
    const [loadingNewComments, resultNewComments] = useAllCommentsData(fetch, 0, true)
    const [loadingAllComments, resultAllComments] = useAllCommentsData(fetch, 0, false)
    
    
    useEffect(() => {
        if ((!loadingNewComments && resultNewComments.pages !== -1) 
            || (!loadingAllComments && resultAllComments.pages !== -1)){
            setFetch(false)
        }
    }, [loadingAllComments, loadingNewComments, resultAllComments, resultNewComments])

    const refresh = () => {
        setFetch(true)
    }
    return (
        <>
            <Backdrop className={classes.backdrop} open={loadingNewComments || loadingAllComments}>
                <CircularProgress size={70} color="inherit"/>
            </Backdrop>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    {

                        <>
                            <Grid item xs={12} component={"div"} className={classes.header}>
                                <Typography className={classes.title}>نظرات جدید</Typography>
                                <ItemLink
                                    to={{
                                        pathname: '/admin/dashboard/comments/show',
                                        search: '?new=true',
                                    }}
                                >
                                    <Typography hidden={resultNewComments.comments.length === 0} className={classes.visitAll}>مشاهده همه</Typography>
                                </ItemLink>
                            </Grid>
                            {
                                resultNewComments.comments.slice(0, 2).map((comment) => (
                                    <Grid item xs={12}>
                                        <CommentCard
                                            comment={comment}
                                            refresh={refresh}
                                        />
                                    </Grid>
                                ))
                            }
                            {
                                resultNewComments.comments.length === 0 &&
                                    <>
                                        <Typography
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 500,
                                                margin: 'auto',
                                                marginBottom: 32,
                                            }}
                                            className={classes.title}
                                        >
                                            نظر جدیدی ثبت نشده
                                        </Typography>
                                    </>
                            }
                        </>

                    }

                    {
                        <>
                            <Grid item xs={12} component={"div"} className={classes.header}>
                                <Typography className={classes.title}> همه نظرات</Typography>
                                <ItemLink
                                    to={{
                                        pathname: '/admin/dashboard/comments/show',
                                    }}
                                >
                                    <Typography hidden={resultAllComments.comments.length === 0}  className={classes.visitAll}>مشاهده همه</Typography>
                                </ItemLink>
                            </Grid>
                            {
                                resultAllComments.comments.slice(0, 2).map((comment) => (
                                    <Grid item xs={12}>
                                        <CommentCard
                                            comment={comment}
                                            refresh={refresh}
                                        />
                                    </Grid>
                                ))
                            }
                            {
                                resultAllComments.comments.length === 0 &&
                                <>
                                    <Typography
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 500,
                                            margin: 'auto',
                                            marginBottom: 32,
                                        }}
                                        className={classes.title}
                                    >
                                        نظری ثبت نشده
                                    </Typography>
                                </>
                            }
                        </>

                    }
                </Grid>
            </div>
        </>
    )

}

export default CommentsSection