import React, {useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import CommentCard from "./CommentCard";
import {makeStyles} from "@material-ui/core/styles";
import TablePaginationActions from "../Table/Components/TablePaginationActions";

const useStyles = makeStyles(() => ({
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        float: "right"
    },
}));

function CommentsList(props) {
    const classes = useStyles();
    const sortStatus = props.comments.search === '?sort=new'
    const title = sortStatus ? 'نظرات جدید' : 'همه نظرات'
    const [comments, setComments] = useState(props.comments.state)
    const numPages = parseInt((comments.length / 10).toString()) + 1

    const [page, setPage] = React.useState(0)

    const handleChangePages = (pageNumber) => {
        setPage(pageNumber)
    }


    const changeComment = (oldComment, newStatus) => {
        let changedComments, index
        changedComments = comments
        index = comments.indexOf(oldComment)
        changedComments[index].status = newStatus
        setComments(() => {
            return changedComments
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography className={classes.title}>{title}</Typography>
            </Grid>
            {
                comments.slice(page * 5, 5 * (page + 1))
                    .map((comment) => (
                        sortStatus ?
                            comment.status === 'جدید' ?
                                <Grid item xs={12}>
                                    <CommentCard changeComment={changeComment} comment={comment}
                                                 status={comment.status}/>
                                </Grid>
                                : null
                            :
                            <Grid item xs={12}>
                                <CommentCard changeComment={changeComment} comment={comment} status={comment.status}/>
                            </Grid>
                    ))
            }
            <Grid item xs={12}>
                <TablePaginationActions numPages={numPages} page={page} onChange={handleChangePages}/>
            </Grid>
        </Grid>
    )
}

export default CommentsList