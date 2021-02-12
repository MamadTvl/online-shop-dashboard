import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Table, TableBody, TableHead, TableRow, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/styles";
import {separateDigit} from "../../utills/ToFaDigit";

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
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
    },
}), {index: 1})

function CartCost(props) {
    const classes = useStyles()

    return (
        <Card>
            <CardHeader
                title={
                    <Typography className={classes.title}>مبلغ سبد خرید</Typography>
                }
            />
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align = "right" >
                                کل
                            </StyledTableCell>
                            <StyledTableCell align = "right" >
                                هزینه محصولات
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell align = "right" >
                                {`${separateDigit(props.data.amount)} تومان`}
                            </StyledTableCell>
                            <StyledTableCell align = "right" >
                                {`${separateDigit(props.data.productsCost)} تومان`}
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align = "right" >
                                هزینه ارسال
                            </StyledTableCell>
                            <StyledTableCell align = "right" >
                                
                                تخفیف ها</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell align = "right" >
                                {props.data.free_transmission ? 'رایگان' : 'به عهده مشتری'}
                            </StyledTableCell>
                            <StyledTableCell align = "right" >
                                {`${separateDigit(props.data.discount)} تومان`}
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>

        </Card>
    )

}


export default CartCost
