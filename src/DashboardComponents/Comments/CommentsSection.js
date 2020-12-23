import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import CommentCard from "./CommentCard";
import ItemLink from "../../Routes/Link/ItemLink";

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
    }
}));

function createData(product, user, date, status, description) {
    return {product, user, date, status, description};
}

const initial = [
    createData(
        'مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        '1آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'جدید',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        'مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        'آرش دامن‌افشان2',
        '۹۸/۱۱/۱۲',
        'جدید',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        'مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        '3آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'تایید شده',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        'مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        '4آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'رد شده',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        'مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        '5آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'رد شده',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        ' مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        'آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'تایید شده',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        'مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        'آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'تایید شده',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        ' مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        'آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'تایید شده',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        'مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        'آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'تایید شده',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    ),
    createData(
        ' مانتو زنانه طرح گل‌گلی ۳۹۴۸۱۸۳۴',
        'آرش دامن‌افشان',
        '۹۸/۱۱/۱۲',
        'تایید شده',
        'درود خدا بر شرف شما جوان‌های بی‌باک و غیور سرزمینم. امیدوارم که همگی مورد لطف خداوند بزرگ و بلند مرتبه قرار بگیرید. هلپیا بستری مناسبی برای کمک کردن بود و بهترین کار را کردین که به خیریه همچون محک این مبلغ را اهدا کردید',
    )
]


function CommentsSection() {
    const [comments, setComments] = useState(initial)
    const newCommentsIndex = [], allCommentsIndex = []
    let countNew = 0, countAll = 0
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].status === 'جدید' && countNew <= 2) {
            newCommentsIndex.push(i)
            countNew++
        }
        if (comments[i].status !== 'جدید' && comments[i].status !== '' && countAll <= 2) {
            allCommentsIndex.push(i)
            countAll++
        }
    }
    const classes = useStyles();

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
        <div className={classes.root}>
            <Grid container spacing={2}>
                {
                    newCommentsIndex.length > 0 ?
                        <>
                            <Grid item xs={12} component={"div"} className={classes.header}>
                                <Typography className={classes.title}>نظرات جدید</Typography>
                                <ItemLink
                                    to={{
                                        pathname: '/admin/dashboard/comments/show',
                                        search: '?sort=new',
                                        state: comments,
                                    }}
                                >
                                    <Typography className={classes.visitAll}>مشاهده همه</Typography>
                                </ItemLink>
                            </Grid>
                            <Grid item xs={12}>
                                <CommentCard
                                    changeComment={changeComment}
                                    comment={comments[newCommentsIndex[0]]}
                                    status={comments[newCommentsIndex[0]].status}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CommentCard
                                    changeComment={changeComment}
                                    comment={comments[newCommentsIndex[1]]}
                                    status={comments[newCommentsIndex[1]].status}
                                />
                            </Grid>
                        </>
                        : null
                }

                {
                    allCommentsIndex.length > 0 ?
                        <>
                            <Grid item xs={12} component={"div"} className={classes.header}>
                                <Typography className={classes.title}> همه نظرات</Typography>
                                <ItemLink
                                    to={{
                                        pathname: '/admin/dashboard/comments/show',
                                        state: comments,
                                    }}
                                >
                                    <Typography className={classes.visitAll}>مشاهده همه</Typography>
                                </ItemLink>
                            </Grid>
                            <Grid item xs={12}>
                                <CommentCard
                                    changeComment={changeComment}
                                    comment={comments[allCommentsIndex[0]]}
                                    status={comments[allCommentsIndex[0]].status}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CommentCard
                                    changeComment={changeComment}
                                    comment={comments[allCommentsIndex[1]]}
                                    status={comments[allCommentsIndex[1]].status}
                                />
                            </Grid>
                        </>
                        : null
                }
            </Grid>
        </div>
    )

}

export default CommentsSection