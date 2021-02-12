import React, {useEffect} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {IconButton, Link, SvgIcon, Typography} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import ItemLink from "../../Routes/Link/ItemLink";
import TablePaginationActions from "../Table/Components/TablePaginationActions";
import {StyledTableCell} from "../Table/Styles/StyledTableCell";
import {StyledTableRow} from "../Table/Styles/StyledTableRow";
import {useOrderSectionStyles} from "./Styles/useOrderSectionStyles";
import {useAxios} from "../../utills/Hooks/useAxios";
import {separateDigit, toFaDigit} from "../../utills/ToFaDigit";
import moment from "jalali-moment";
import Skeleton from "@material-ui/lab/Skeleton";


function OrderSection() {
    const classes = useOrderSectionStyles();
    const [page, setPage] = React.useState(0)
    const [{data, loading}, fetch] = useAxios(
        `admin/payment_mng/get_payments?page=${page}`
    )
    const [{data: excelLink, loading: exportLoading}, exportExcel] = useAxios({
        url: '/admin/financial_mng/export_exel',
    })

    const createState = (state) => {
        switch (state) {
            case 1 :
                return <Chip style={{'background-color': '#F29500'}} className={classes.state} label={'در حال بررسی'}/>
            case 2 :
                return <Chip style={{'background-color': '#F16522'}} className={classes.state} label={'تحویل داده شده'}/>
            case 3 :
                return <Chip style={{'background-color': '#22B132'}} className={classes.state} label={'لغو شده'}/>
            default:
                return null
        }
    }
    let numPages = 0

    if (data !== undefined)
        numPages = data.data.max_pages + 1


    const handleChangePages = (pageNumber) => {
        setPage(pageNumber)
    }

    useEffect(() => {
        fetch()
        exportExcel()
    }, [])


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {
                loading || exportLoading
                ?
                    <div style={{height: 1000, position: 'relative'}}>
                    <Skeleton style={{position: 'absolute', top: '-22%'}} animation="pulse" height={1000} width="100%">
                        <TableContainer component={Paper}/>
                    </Skeleton>
                </div>
                :
                <TableContainer className={classes.paper} component={Paper}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography className={classes.title} component={"span"}>سفارشات</Typography>
                        <Link
                            href={`${!exportLoading && excelLink !== undefined && excelLink.data.file_dir}`}
                            className={classes.exportLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconButton>
                                <SvgIcon xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                                    <g id="common-file-text-download" transform="translate(-0.25 -0.25)">
                                        <circle id="Ellipse_128" data-name="Ellipse 128" cx="4.267" cy="4.267" r="4.267"
                                                transform="translate(8.217 8.217)" fill="none" stroke="#f16522"
                                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                        <path id="Path_30125" data-name="Path 30125" d="M17.25,14.25v4.267"
                                              transform="translate(-4.767 -3.9)" fill="none" stroke="#f16522"
                                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                        <path id="Path_30126" data-name="Path 30126" d="M16.6,19.6,15,18"
                                              transform="translate(-4.117 -4.983)" fill="none" stroke="#f16522"
                                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                        <path id="Path_30127" data-name="Path 30127" d="M17.25,19.6l1.6-1.6"
                                              transform="translate(-4.767 -4.983)" fill="none" stroke="#f16522"
                                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                        <path id="Path_30128" data-name="Path 30128" d="M3.75,6.75h7.467"
                                              transform="translate(-0.867 -1.733)" fill="none" stroke="#f16522"
                                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                        <path id="Path_30129" data-name="Path 30129" d="M3.75,11.25H8.017"
                                              transform="translate(-0.867 -3.033)" fill="none" stroke="#f16522"
                                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                        <path id="Path_30130" data-name="Path 30130" d="M3.75,15.75H6.417"
                                              transform="translate(-0.867 -4.333)" fill="none" stroke="#f16522"
                                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                        <path id="Path_30131" data-name="Path 30131"
                                              d="M5.55,14.617H1.817A1.067,1.067,0,0,1,.75,13.55V1.817A1.067,1.067,0,0,1,1.817.75H9.375a1.067,1.067,0,0,1,.754.312L12.171,3.1a1.067,1.067,0,0,1,.312.754V5.55"
                                              fill="none" stroke="#f16522" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="1"/>
                                    </g>
                                </SvgIcon>
                                <Typography
                                    style={{
                                        color: '#F16522',
                                        fontSize: '14px',
                                        fontFamily: 'Shabnam',
                                        fontWeight: "bold",
                                        margin: '8px 8px'
                                    }}
                                    component={'span'}
                                >اکسپورت
                                </Typography>
                            </IconButton>
                        </Link>
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
                                data.data.payments.map((payment) => (
                                    <StyledTableRow key={payment.unique_code}>
                                        <StyledTableCell align="right" component="th" scope="row">
                                            {payment.unique_code}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {payment.user.name_and_last_name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {toFaDigit(payment.basket.boxes_list.length.toString())}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {`${separateDigit(payment.amount)} تومان`}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {toFaDigit(moment.unix(payment.payment_date).locale('fa').format("jYYYY/jM/jD"))}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {createState(payment.status)}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <ItemLink text={'مشاهده جزئیات'}
                                                      to={`/admin/dashboard/order?id=${payment.id}`}/>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <TablePaginationActions numPages={numPages} page={page} onChange={handleChangePages}/>
        </div>
    )

}

export default OrderSection
