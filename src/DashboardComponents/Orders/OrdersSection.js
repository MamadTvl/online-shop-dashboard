import React from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {IconButton, SvgIcon, Typography} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import ItemLink from "../../Routes/Link/ItemLink";
import TablePaginationActions from "../Table/Components/TablePaginationActions";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#F4F4F4',
        fontFamily: 'Shabnam',
        color: '#50525C',
        fontSize: 14,
    },
    body: {
        backgroundColor: '#fff',
        fontFamily: 'Shabnam',
        color: '#50525C',
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: '100%',
    },
    paper: {
        paddingTop: theme.spacing(0),
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        margin: theme.spacing(3, 3),
        float: "right"
    },
    state: {
        fontFamily: 'Shabnam',
        fontSize: 14,
        color: "white",
    },
    tablePaginationRoot: {
        position: "fixed",
        left: 0,

    },
    caption: {
        fontFamily: 'Shabnam',
    },
    toolbar: {
        fontFamily: 'Shabnam',
    },
    export: {
        margin: theme.spacing(1, 3, 3),
        float: "left"
    }
}), {index: 1});


function OrderSection() {
    const classes = useStyles();

    const createState = (state) => {
        switch (state) {
            case 'new' :
                return <Chip style={{'background-color': '#F16522'}} className={classes.state} label={'جدید'}/>
            case 'notSent' :
                return <Chip style={{'background-color': '#F29500'}} className={classes.state} label={'ارسال نشده'}/>
            case 'Sent' :
                return <Chip style={{'background-color': '#22B132'}} className={classes.state} label={'ارسال شده'}/>
            default:
                return null
        }
    }

    function createData(code, name, count, price, date, state, show) {
        return {code, name, count, price, date, state, show};
    }

    const rows = [
        // createData("DID2394852", "نیما مشهدی رضا", '۳', "۲۹۹٫۰۰۰" + "تومان",
        //     '۹۸/۱۱/۱۲', createState('new'), ''),
        //
        // createData("DID2394852", "نیما مشهدی رضا", '۳', "۲۹۹٫۰۰۰" + "تومان",
        //     '۹۸/۱۱/۱۲', createState('notSent'), ''),
        //
        // createData("DID2394852", "نیما مشهدی رضا", '۳', "۲۹۹٫۰۰۰" + "تومان",
        //     '۹۸/۱۱/۱۲', createState('Sent'), ''),
        //
        // createData("DID2394852", "نیما مشهدی رضا", '۳', "۲۹۹٫۰۰۰" + "تومان",
        //     '۹۸/۱۱/۱۲', createState('Sent'), ''),
        //
        // createData("DID2394852", "نیما مشهدی رضا", '۳', "۲۹۹٫۰۰۰" + "تومان",
        //     '۹۸/۱۱/۱۲', createState('Sent'), ''),

    ];

    const numPages = parseInt((rows.length / 10).toString()) + 1

    const [page, setPage] = React.useState(0)

    const handleChangePages = (pageNumber) => {
        setPage(pageNumber)
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <TableContainer className={classes.paper} component={Paper}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography className={classes.title} component={"span"}>سفارشات</Typography>

                    {/*<IconButton className={classes.export} aria-label={"export"}>*/}
                    {/*    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">*/}
                    {/*        <g id="common-file-text-download" transform="translate(-0.25 -0.25)">*/}
                    {/*            <circle id="Ellipse_128" data-name="Ellipse 128" cx="4.267" cy="4.267" r="4.267"*/}
                    {/*                    transform="translate(8.217 8.217)" fill="none" stroke="#f16522"*/}
                    {/*                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>*/}
                    {/*            <path id="Path_30125" data-name="Path 30125" d="M17.25,14.25v4.267"*/}
                    {/*                  transform="translate(-4.767 -3.9)" fill="none" stroke="#f16522"*/}
                    {/*                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>*/}
                    {/*            <path id="Path_30126" data-name="Path 30126" d="M16.6,19.6,15,18"*/}
                    {/*                  transform="translate(-4.117 -4.983)" fill="none" stroke="#f16522"*/}
                    {/*                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>*/}
                    {/*            <path id="Path_30127" data-name="Path 30127" d="M17.25,19.6l1.6-1.6"*/}
                    {/*                  transform="translate(-4.767 -4.983)" fill="none" stroke="#f16522"*/}
                    {/*                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>*/}
                    {/*            <path id="Path_30128" data-name="Path 30128" d="M3.75,6.75h7.467"*/}
                    {/*                  transform="translate(-0.867 -1.733)" fill="none" stroke="#f16522"*/}
                    {/*                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>*/}
                    {/*            <path id="Path_30129" data-name="Path 30129" d="M3.75,11.25H8.017"*/}
                    {/*                  transform="translate(-0.867 -3.033)" fill="none" stroke="#f16522"*/}
                    {/*                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>*/}
                    {/*            <path id="Path_30130" data-name="Path 30130" d="M3.75,15.75H6.417"*/}
                    {/*                  transform="translate(-0.867 -4.333)" fill="none" stroke="#f16522"*/}
                    {/*                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>*/}
                    {/*            <path id="Path_30131" data-name="Path 30131"*/}
                    {/*                  d="M5.55,14.617H1.817A1.067,1.067,0,0,1,.75,13.55V1.817A1.067,1.067,0,0,1,1.817.75H9.375a1.067,1.067,0,0,1,.754.312L12.171,3.1a1.067,1.067,0,0,1,.312.754V5.55"*/}
                    {/*                  fill="none" stroke="#f16522" strokeLinecap="round" strokeLinejoin="round"*/}
                    {/*                  strokeWidth="1"/>*/}
                    {/*        </g>*/}
                    {/*    </SvgIcon>*/}
                    {/*    <Typography*/}
                    {/*        style={{*/}
                    {/*            color: '#F16522',*/}
                    {/*            fontSize: '14px',*/}
                    {/*            fontFamily: 'Shabnam',*/}
                    {/*            fontWeight: "bold",*/}
                    {/*            margin: '8px 8px'*/}
                    {/*        }}*/}
                    {/*        component={'span'}*/}
                    {/*    >اکسپورت*/}
                    {/*    </Typography>*/}
                    {/*</IconButton>*/}
                </div>
                <Table className={classes.table} aria-label="Orders">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">کد سفارش</StyledTableCell>
                            <StyledTableCell align="right">نام مشتری</StyledTableCell>
                            <StyledTableCell align="right">تعداد کالا</StyledTableCell>
                            <StyledTableCell align="right">مبلغ سبد خرید</StyledTableCell>
                            <StyledTableCell align="right">تاریخ سفارش</StyledTableCell>
                            <StyledTableCell align="right">وضعیت</StyledTableCell>
                            <StyledTableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.slice(page * 10, page * 10 + 10)
                                .map((row) => (
                                    <StyledTableRow key={row.code}>
                                        <StyledTableCell align="right" component="th" scope="row">
                                            {row.code}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.name}</StyledTableCell>
                                        <StyledTableCell align="right">{row.count}</StyledTableCell>
                                        <StyledTableCell align="right">{row.price}</StyledTableCell>
                                        <StyledTableCell align="right">{row.date}</StyledTableCell>
                                        <StyledTableCell align="right">{row.state}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <ItemLink text={'مشاهده جزئیات'}
                                                      to={`/admin/dashboard/orders/${row.code}`}/>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*<TablePaginationActions numPages={numPages} page={page} onChange={handleChangePages}/>*/}
        </div>
    )

}

export default OrderSection