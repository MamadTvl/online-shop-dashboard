import React, {useEffect, useState} from "react";
import {Backdrop, CircularProgress, Grid, Typography} from "@material-ui/core";
import CommentCard from "./CommentCard";
import {makeStyles} from "@material-ui/core/styles";
import TablePaginationActions from "../Table/Components/TablePaginationActions";
import useAllCommentsData from "./Actions/useAllCommentsData";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        float: "right"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color:'#F16522'
    }
}), {index: 1});

function CommentsList({location}) {
    const classes = useStyles();
    const history = useHistory()
    const queryParams = new URLSearchParams(location.search)
    const sortStatus = queryParams.get('new') === 'true'
    const title = sortStatus ? 'نظرات جدید' : 'همه نظرات'
    const [page, setPage] = useState(0)
    const [fetch, setFetch] = useState(true)
    const [loading, result] = useAllCommentsData(fetch, page, sortStatus)


    const handleChangePages = (pageNumber) => {
        setPage(pageNumber)
        refresh()
    }

    useEffect(() => {
        if (!loading && result.pages !== -1){
            if(result.comments.length === 0){
                history.push('/admin/dashboard/comments')
            }
            setFetch(false)
        }
    }, [loading, result])

    const refresh = () => {
        setFetch(true)
    }


    return (
        <>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress size={70} color="inherit"/>
            </Backdrop>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={classes.title}>{title}</Typography>
                </Grid>
                {
                    result.comments.map((comment) => (
                        <Grid key={Math.round(comment.create_date)} item xs={12}>
                            <CommentCard comment={comment} refresh={refresh}/>
                        </Grid>
                    ))
                }
                <Grid item xs={12}>
                    {!loading &&
                    <TablePaginationActions numPages={result.pages} page={page} onChange={handleChangePages}/>}
                </Grid>
            </Grid>
        </>
    )
}

export default CommentsList