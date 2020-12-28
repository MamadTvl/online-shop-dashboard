import React, {useState} from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import {Button, CardContent, CardHeader, Divider, IconButton, SvgIcon, Typography} from "@material-ui/core";
import profile from '../../img/profile.png'
import {useCommentCardStyles} from "./Styles/useCommentCardStyle";


function CommentCard(props) {
    const {comment, status, changeComment} = props
    const [commentStatus, setCommentStatus] = useState(status)
    const classes = useCommentCardStyles()

    const createStatus = (status) => {
        const statusColor = status === 'تایید شده' ? '#22B132' : '#F16522'
        return (
            <div className={classes.statusRec} style={{backgroundColor: statusColor}}>
                <Typography className={classes.statusText} component={"span"}>{status}</Typography>
                {
                    status === 'تایید شده'
                        ?
                        <span>
                            <SvgIcon className={classes.statusIcon} xmlns="http://www.w3.org/2000/svg" width="13.364"
                                     height="13.207"
                                     viewBox="0 0 13.364 13.207">
                            <g id="check-circle" transform="translate(-1.343 -1.368)">
                                <path id="Path_30121" data-name="Path 30121" d="M14,7.445V8a6,6,0,1,1-3.558-5.484"
                                      fill="none" stroke="#fff" strokeLinecap="round"
                                      strokeWidth="1"/>
                                <path id="Path_30122" data-name="Path 30122" d="M16.8,4l-6,6.006L9,8.206"
                                      transform="translate(-2.8 -0.802)" fill="none" stroke="#fff"
                                      strokeLinecap="round"
                                      strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                        </SvgIcon>
                        </span>
                        : <span>
                            <SvgIcon className={classes.statusIcon} xmlns="http://www.w3.org/2000/svg" width="13"
                                     height="13" viewBox="0 0 13 13">
                            <g id="x-circle" transform="translate(-1.5 -1.5)">
                                <circle id="Ellipse_118" data-name="Ellipse 118" cx="6" cy="6" r="6"
                                        transform="translate(2 2)" fill="none" stroke="#fff" strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="1"/>
                                <line id="Line_32" data-name="Line 32" x1="3.6" y2="3.6" transform="translate(6.2 6.2)"
                                      fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1"/>
                                <line id="Line_33" data-name="Line 33" x2="3.6" y2="3.6" transform="translate(6.2 6.2)"
                                      fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1"/>
                            </g>
                        </SvgIcon>
                        </span>
                }
            </div>
        )
    }
    const deleteClick = () => {
        setCommentStatus('')
        changeComment(comment, commentStatus)
    }
    const acceptClick = () => {
        setCommentStatus('تایید شده')
        changeComment(comment, commentStatus)
    }
    const declineClick = () => {
        setCommentStatus('رد شده')
        changeComment(comment, commentStatus)
    }
    const createDeleteAction = (
        <IconButton onClick={deleteClick}>
            <Typography
                style={{
                    color: '#F16522',
                    fontSize: '12px',
                    fontFamily: 'Shabnam',
                    margin: '8px 8px'
                }}
                component={'span'}
            >حذف کردن
            </Typography>
            <SvgIcon style={{width: 10.8, height: 12}} xmlns="http://www.w3.org/2000/svg" width="15.9" height="17.5"
                     viewBox="0 0 15.9 17.5">
                <g id="trash-2" transform="translate(-2.25 -1.25)">
                    <path id="Path_2584" data-name="Path 2584" d="M3,6H17.4"
                          transform="translate(0 -0.8)" fill="none" stroke="#f16522"
                          strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="1.5"/>
                    <path id="Path_2585" data-name="Path 2585"
                          d="M16.2,5.2V16.4A1.6,1.6,0,0,1,14.6,18h-8A1.6,1.6,0,0,1,5,16.4V5.2m2.4,0V3.6A1.6,1.6,0,0,1,9,2h3.2a1.6,1.6,0,0,1,1.6,1.6V5.2"
                          transform="translate(-0.4)" fill="none" stroke="#f16522"
                          strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="1.5"/>
                    <line id="Line_26" data-name="Line 26" y2="4.8"
                          transform="translate(8.6 9.2)" fill="none"
                          stroke="#f16522"
                          strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="1.5"/>
                    <line id="Line_27" data-name="Line 27" y2="4.8"
                          transform="translate(11.8 9.2)" fill="none"
                          stroke="#f16522"
                          strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="1.5"/>
                </g>
            </SvgIcon>

        </IconButton>
    )


    const crateSelectStatusAction = (
        <div className={classes.actions}>
            <Button
                onClick={acceptClick}
                size={'small'}
                dir={'ltr'}
                className={classes.accept}
                variant={"outlined"}
                endIcon={
                    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="13.364"
                             height="13.207"
                             viewBox="0 0 13.364 13.207">
                        <g id="check-circle" transform="translate(-1.343 -1.368)">
                            <path id="Path_30121" data-name="Path 30121" d="M14,7.445V8a6,6,0,1,1-3.558-5.484"
                                  fill="none" stroke="#21b132" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="1"/>
                            <path id="Path_30122" data-name="Path 30122" d="M16.8,4l-6,6.006L9,8.206"
                                  transform="translate(-2.8 -0.802)" fill="none" stroke="#21b132"
                                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                    </SvgIcon>
                }
            >
                تایید
            </Button>
            <Button
                dir={'ltr'}
                size={'small'}
                onClick={declineClick}
                className={classes.decline}
                variant={"outlined"}
                endIcon={
                    <SvgIcon className={classes.svgIcon} xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                             viewBox="0 0 13 13">
                        <g id="x-circle" transform="translate(-1.5 -1.5)">
                            <circle id="Ellipse_118" data-name="Ellipse 118" cx="6" cy="6" r="6"
                                    transform="translate(2 2)" fill="none" stroke="#f16522" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="1"/>
                            <line id="Line_32" data-name="Line 32" x1="3.6" y2="3.6" transform="translate(6.2 6.2)"
                                  fill="none" stroke="#f16522" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="1"/>
                            <line id="Line_33" data-name="Line 33" x2="3.6" y2="3.6" transform="translate(6.2 6.2)"
                                  fill="none" stroke="#f16522" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="1"/>
                        </g>
                    </SvgIcon>
                }
            >
                رد کردن
            </Button>

        </div>
    )
    return (
        <div>
            {
                commentStatus !== '' ?
                    <Card>
                        <div className={classes.header}>
                            <CardHeader
                                title={
                                    <div className={classes.detail}>
                                        <Typography
                                            className={classes.title}>
                                            {`محصول: ${comment.product} - تاریخ ارسال: ${comment.date}`}
                                        </Typography>
                                        {commentStatus !== 'جدید' ? createStatus(commentStatus) : null}
                                    </div>
                                }
                            />
                            {
                                commentStatus !== 'جدید'
                                    ? createDeleteAction
                                    : commentStatus !== ''
                                    ? crateSelectStatusAction : null
                            }
                        </div>
                        <Divider/>
                        <CardContent className={classes.content}>
                            <img className={classes.profile} src={profile} alt={'profile'}/>
                            <div style={{marginRight: 20}}>
                                <Typography className={classes.username}>{comment.user}</Typography>
                                <Typography className={classes.comment}>{comment.description}</Typography>
                            </div>
                        </CardContent>
                    </Card>
                    : null
            }
        </div>
    )

}


CommentCard.propTypes = {
    comment: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    changeComment: PropTypes.func.isRequired,
};

export default CommentCard