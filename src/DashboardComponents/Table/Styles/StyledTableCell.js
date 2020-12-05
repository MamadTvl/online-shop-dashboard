import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

export const StyledTableCell = withStyles((theme) => ({
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