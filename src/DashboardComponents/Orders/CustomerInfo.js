import React from "react";
import Card from "@material-ui/core/Card";
import {
    CardHeader,
    IconButton,
    SvgIcon,
    Table, TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#fff',
        fontFamily: 'Shabnam',
        color: '#50525C',
        opacity : '70%',
        fontSize: 14,
    },
    body: {
        backgroundColor: '#fff',
        fontFamily: 'Shabnam',
        color: '#50525C',
        fontSize: 16,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '230px',
    },
    details: {
        display: "flex",
        justifyContent : "space-around",
        flexDirection: "row",
    },
    card: {
        display: 'flex',
        // padding: theme.spacing(15),
        // textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            // padding: theme.spacing(15),
            // width: '100%'
        }
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
    },
    textStyle : {
        backgroundColor: '#fff',
        fontFamily: 'Shabnam',
        color: '#50525C',
        opacity : '70%',
        fontSize: 14,
    },
    address : {
        marginRight : theme.spacing(2),
    }

}));



const details = ['نام مشتری', 'ایمیل', 'شماره موبایل', 'استان', 'شهر']

const customer = ['نیما مشهدی رضا', 'ArashDma@gmail.com', '۰۹۳۶۶۱۸۳۴۹۳', 'تهران', 'تهران', 'پونک جنوبی، ایران زمین جنوبی، کوچه سعادت، پلاک ۳۳ واحد ۰۲']

function CustomersInfo() {
    const classes = useStyles()

    return (

        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography className={classes.title}>اطلاعات مشتری</Typography>
                }
            />

            <TableContainer className={classes.details} component={"div"}>
                <Table className={classes.table} aria-label="information">
                    <TableHead>
                        <TableRow>
                            {
                                details.map((title) => (
                                    <StyledTableCell align = "right" >{title}</StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {
                                customer.map((detail, index) => (
                                    index !== 5 ?
                                    <StyledTableCell align = "right" >{detail}</StyledTableCell>
                                    : null
                                ))
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.address}>
                <Typography className={classes.textStyle}  style={{marginTop : 24, marginBottom : 8}}>آدرس</Typography>
                <Typography className={classes.textStyle} style={{color : '#50525C', fontSize : 16, opacity  : '100%',marginBottom : 24  }}>
                    {customer[5]}</Typography>
            </div>
        </Card>
    )


}


export default CustomersInfo