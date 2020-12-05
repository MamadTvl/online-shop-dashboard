import React, {useEffect} from "react";
import {Button, IconButton, Paper, SvgIcon, TableBody, TableContainer, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ItemLink from "../../Routes/Link/ItemLink";
import {StyledTableCell} from "../Table/Styles/StyledTableCell";
import {StyledTableRow} from "../Table/Styles/StyledTableRow";
import TablePaginationActions from "../Table/Components/TablePaginationActions";
import {useAxios} from '../../utills/Hooks/useAxios'
import toFaDigit from "../../utills/ToFaDigit";
import {useStyles} from "./Styles/ProductSectionStyle";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from 'jalali-moment'

// todo: test api !

function ProductsSection() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0)

    const [{data, loading}, fetch] = useAxios(
        `admin/merchandise_mng/get_all_merchandise?page=${page}`);

    const [, exportExcel] = useAxios(
        {
            url: `admin/merchandise_mng/export_exel`,
            // responseType: 'blob'
        },
        {manual: true}
    );

    const [, executeDelete] = useAxios(
        {
            url: `/admin/merchandise_mng/delete_merchandise`,
            method: "DELETE",
        },
        {manual: true}
    );
    useEffect(() => {
        fetch()
    }, [])

    let numPages = 0

    if (data !== undefined)
        numPages = data.data.pages + 1

    const handleChangePages = (pageNumber) => {
        setPage(pageNumber)
    }


    const exportHandler = () => {
        exportExcel()
            .then(res => {
                const link = document.createElement('a');
                link.href = res.data.data.file_dir
                link.setAttribute('download', 'products.csv');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteHandler = (id) => {
        executeDelete({
            data: {
                "id": `${id}`
            }
        })
            .then(() => {
                fetch()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {
                loading
                    ? <div style={{height: 1000, position: 'relative'}}>
                        <Skeleton style={{position: 'absolute', top: '-22%'}} animation="pulse" height={1000} width="100%">
                            <TableContainer component={Paper}/>
                        </Skeleton>
                    </div>
                    :
                    <TableContainer component={Paper}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography className={classes.title} component={"span"}>محصولات</Typography>
                            <div>
                                <ItemLink to={'/admin/dashboard/products/add'}>
                                    <Button
                                        dir={'ltr'}
                                        className={classes.addProduct}
                                        variant={"contained"}
                                        endIcon={<AddCircleOutlineIcon/>}
                                    >
                                        اضافه کردن محصول جدید
                                    </Button>
                                </ItemLink>
                                <IconButton onClick={exportHandler} className={classes.export} aria-label={"export"}>
                                    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                             viewBox="0 0 17 17">
                                        <g id="common-file-text-download" transform="translate(-0.25 -0.25)">
                                            <circle id="Ellipse_128" data-name="Ellipse 128" cx="4.267" cy="4.267"
                                                    r="4.267"
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
                                                  fill="none" stroke="#f16522" strokeLinecap="round"
                                                  strokeLinejoin="round"
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
                            </div>
                        </div>

                        {
                            data.data.merchandises.length > 0 ?
                                <Table className={classes.table} aria-label="products">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="right">کد محصول</StyledTableCell>
                                            <StyledTableCell align="right">نام محصول</StyledTableCell>
                                            <StyledTableCell align="right">حداکثر فروش</StyledTableCell>
                                            <StyledTableCell align="right">تعداد موجود</StyledTableCell>
                                            <StyledTableCell align="right">تاریخ ثبت محصول</StyledTableCell>
                                            <StyledTableCell align="right">نوع محصول</StyledTableCell>
                                            <StyledTableCell align="right"/>
                                            <StyledTableCell align="right"/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data.data.merchandises.map((row) => (
                                                <StyledTableRow key={row.id}>
                                                    <StyledTableCell align="right" component="th" scope="row">
                                                        {row.unique_code}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="right">
                                                        {row.title}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="right">
                                                        {toFaDigit(row.order_counter.toString())}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="right">
                                                        {toFaDigit(row.stock_number.toString())}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="right">
                                                        {toFaDigit(moment.unix(row.create_date).locale('fa').format("jYYYY/jM/jD"))}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="right">
                                                        {row.merchandise_type === "1" ? "آماده در انبار" : "پس از سفارش"}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="right">
                                                        <ItemLink text={'ویرایش'} to={{
                                                            pathname: `/admin/dashboard/product`,
                                                            search: `?id=${row.id}&code=${row.unique_code}`,
                                                            state: row
                                                        }}>
                                                            <IconButton>

                                                                <SvgIcon xmlns="http://www.w3.org/2000/svg"
                                                                         width="17.648"
                                                                         height="17.5"
                                                                         viewBox="0 0 17.648 17.5">
                                                                    <g id="edit" transform="translate(-1.25 -1.129)">
                                                                        <path id="Path_2582" data-name="Path 2582"
                                                                              d="M9.157,4H3.59A1.59,1.59,0,0,0,2,5.59V16.723a1.59,1.59,0,0,0,1.59,1.59H14.723a1.59,1.59,0,0,0,1.59-1.59V11.157"
                                                                              transform="translate(0 -0.434)"
                                                                              fill="none"
                                                                              stroke="#434343" strokeLinecap="round"
                                                                              strokeLinejoin="round" strokeWidth="1.5"/>
                                                                        <path id="Path_2583" data-name="Path 2583"
                                                                              d="M16.349,2.373a1.687,1.687,0,0,1,2.386,2.386l-7.554,7.554L8,13.108l.8-3.181Z"
                                                                              transform="translate(-1.229)" fill="none"
                                                                              stroke="#434343"
                                                                              strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              strokeWidth="1.5"/>
                                                                    </g>
                                                                </SvgIcon>

                                                                <Typography
                                                                    style={{
                                                                        color: '#434343',
                                                                        fontSize: '14px',
                                                                        fontFamily: 'Shabnam',
                                                                        margin: '8px 8px'
                                                                    }}
                                                                    component={'span'}
                                                                >ویرایش
                                                                </Typography>

                                                            </IconButton>

                                                        </ItemLink>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <IconButton onClick={() => deleteHandler(row.id)}>

                                                            <SvgIcon xmlns="http://www.w3.org/2000/svg" width="15.9"
                                                                     height="17.5"
                                                                     viewBox="0 0 15.9 17.5">
                                                                <g id="trash-2" transform="translate(-2.25 -1.25)">
                                                                    <path id="Path_2584" data-name="Path 2584"
                                                                          d="M3,6H17.4"
                                                                          transform="translate(0 -0.8)" fill="none"
                                                                          stroke="#f16522"
                                                                          strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth="1.5"/>
                                                                    <path id="Path_2585" data-name="Path 2585"
                                                                          d="M16.2,5.2V16.4A1.6,1.6,0,0,1,14.6,18h-8A1.6,1.6,0,0,1,5,16.4V5.2m2.4,0V3.6A1.6,1.6,0,0,1,9,2h3.2a1.6,1.6,0,0,1,1.6,1.6V5.2"
                                                                          transform="translate(-0.4)" fill="none"
                                                                          stroke="#f16522"
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

                                                            <Typography
                                                                style={{
                                                                    color: '#F16522',
                                                                    fontSize: '14px',
                                                                    fontFamily: 'Shabnam',
                                                                    margin: '8px 8px'
                                                                }}
                                                                component={'span'}
                                                            >حذف
                                                            </Typography>

                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}

                                    </TableBody>
                                </Table> : null
                        }

                    </TableContainer>
            }

            {
                loading
                    ? null
                    : data.data.merchandises.length > 0
                    ? <TablePaginationActions numPages={numPages} page={page} onChange={handleChangePages}/>
                    : null
            }
        </div>
    )

}

export default ProductsSection