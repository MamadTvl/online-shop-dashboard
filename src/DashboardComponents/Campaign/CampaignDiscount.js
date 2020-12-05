import React, {useEffect} from "react";
import {Button, IconButton, SvgIcon, TableBody, TableContainer, Typography} from "@material-ui/core";
import ItemLink from "../../Routes/Link/ItemLink";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import {StyledTableCell} from "../Table/Styles/StyledTableCell";
import {StyledTableRow} from "../Table/Styles/StyledTableRow";
import Card from "@material-ui/core/Card";
import {useStyles} from "./Styles/DiscountTableStyle";
import {useAxios} from "../../utills/Hooks/useAxios";
import toFaDigit from "../../utills/ToFaDigit";
import moment from "jalali-moment";
import {Skeleton} from "@material-ui/lab"


function CampaignDiscount() {

    const classes = useStyles();
    const [{response, loading}, get] = useAxios({
        url: '/admin/discount_mng/get'
    })
    const [, deleteDiscount] = useAxios({
        url: '/admin/discount_mng/delete',
        method: 'DELETE',
    }, {manual: true})

    const handleDelete = async (id) => {
        try {
            await deleteDiscount({
                data: {
                    "id": id,
                }
            })
            get()
        } catch (err) {
        }
    }

    useEffect(() => {
        get()
    }, [get])



    return (
        <Card>
            {
                loading
                    ? <Skeleton variant={"rect"} width={'100%'} height={134}/>
                :<TableContainer>
                    <Typography className={classes.title} component={"span"}>تخفیف ها</Typography>
                    <ItemLink to={'/admin/dashboard/campaigns/add'}>
                        <Button
                            dir={'ltr'}
                            className={classes.addProduct}
                            variant={"outlined"}
                            endIcon={<AddCircleOutlineIcon/>}
                        >
                            اضافه کردن تخفیف جدید
                        </Button>
                    </ItemLink>
                    <Table className={classes.table} aria-label="Orders">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">کد تخفیف</StyledTableCell>
                                <StyledTableCell align="right">تاریخ انقضا</StyledTableCell>
                                <StyledTableCell align="right">میزان تخفیف</StyledTableCell>
                                <StyledTableCell align="right">تعداد استفاده</StyledTableCell>
                                <StyledTableCell align="right"/>
                                <StyledTableCell align="right"/>
                            </TableRow>
                        </TableHead>

                        {
                            <TableBody>
                                {
                                    response.data.data.discounts.map((discount) => (
                                        <StyledTableRow key={discount.id}>
                                            <StyledTableCell align="right" component="th" scope="row">
                                                {discount.code}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {toFaDigit(moment.unix(discount.expire_date).format("jYYYY/jM/jD"))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="right">{toFaDigit((discount.discount_percent * 100).toString())}</StyledTableCell>
                                            <StyledTableCell
                                                align="right">{toFaDigit(discount.usage_capacity.toString())}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <ItemLink text={'ویرایش'} to={{
                                                    pathname: `/admin/dashboard/campaigns/discount`,
                                                    search: `?id=${discount.id}&code=${discount.code}`,
                                                    state: discount
                                                }}>
                                                    <IconButton>
                                                        <SvgIcon xmlns="http://www.w3.org/2000/svg" width="17.648"
                                                                 height="17.5"
                                                                 viewBox="0 0 17.648 17.5">
                                                            <g id="edit" transform="translate(-1.25 -1.129)">
                                                                <path id="Path_2582" data-name="Path 2582"
                                                                      d="M9.157,4H3.59A1.59,1.59,0,0,0,2,5.59V16.723a1.59,1.59,0,0,0,1.59,1.59H14.723a1.59,1.59,0,0,0,1.59-1.59V11.157"
                                                                      transform="translate(0 -0.434)" fill="none"
                                                                      stroke="#434343" strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="1.5"/>
                                                                <path id="Path_2583" data-name="Path 2583"
                                                                      d="M16.349,2.373a1.687,1.687,0,0,1,2.386,2.386l-7.554,7.554L8,13.108l.8-3.181Z"
                                                                      transform="translate(-1.229)" fill="none"
                                                                      stroke="#434343"
                                                                      strokeLinecap="round" strokeLinejoin="round"
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
                                                <IconButton onClick={() => handleDelete(discount.id)}>
                                                    <SvgIcon xmlns="http://www.w3.org/2000/svg" width="15.9"
                                                             height="17.5"
                                                             viewBox="0 0 15.9 17.5">
                                                        <g id="trash-2" transform="translate(-2.25 -1.25)">
                                                            <path id="Path_2584" data-name="Path 2584" d="M3,6H17.4"
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
                        }
                    </Table>

                </TableContainer>
            }
        </Card>
    )
}


export default CampaignDiscount