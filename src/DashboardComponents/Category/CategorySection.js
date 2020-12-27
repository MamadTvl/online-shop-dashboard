import React, {useEffect, useState} from "react";
import {Button, IconButton, Paper, SvgIcon, TableBody, TableContainer, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddCategoryDialog from "./AddCategoryDialog";
import TablePaginationActions from "../Table/Components/TablePaginationActions";
import {StyledTableCell} from "../Table/Styles/StyledTableCell";
import {StyledTableRow} from "../Table/Styles/StyledTableRow";
import {useAxios} from "../../utills/Hooks/useAxios";
import {toFaDigit} from "../../utills/ToFaDigit";
import {Skeleton} from "@material-ui/lab"
import moment from "jalali-moment";
import DeleteDialog from "../Public/DeleteDialog";

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
    paper: {
        paddingTop: theme.spacing(0)
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        margin: theme.spacing(3, 3),
        float: "right"
    },
    export: {
        margin: theme.spacing(1, 3, 3),
        float: "left"
    },
    addProduct: {
        margin: theme.spacing(2, 3),
        float: "left",
        backgroundColor: '#F16522',
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Shabnam',
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#F16522',
            opacity: '70%'
        },
    },
    pageButton: {

        color: 'white',
        fontSize: '16px',
        fontFamily: 'Shabnam',
        fontWeight: "bold",
        height: 40,
        width: 40,
        borderRadius: 7,
        marginLeft: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#F16522',
            opacity: '70%'
        },
    },
    buttonGroup: {
        margin: theme.spacing(4, 3, 10, 0),
        float: "left"
    },
    loading: {
        color: '#F16522',
        direction: 'rtl',
        position: 'absolute',
        top: '81px',
        right: 'auto',
        width: '82.5%',
    },
}), {index: 1});


function createData(id, name, create_date) {
    return {id, name, create_date};
}


function CategorySection() {
    const classes = useStyles();
    const [page, setPage] = useState(0)
    const [{response, loading}, getCategories] = useAxios(
        {
            url: `/admin/category_mng/get_category?page=${page}`
        }
    )
    const [{loading: postLoading}, postCategory] = useAxios(
        {
            url: `/admin/category_mng/create_category`,
            method: 'POST'
        },
        {manual: true}
    )
    const [{loading: pathLoading}, updateCategory] = useAxios(
        {
            url: `/admin/category_mng/update_category`,
            method: 'PATCH'
        },
        {manual: true}
    )
    const [{loading: deleteLoading}, deleteCategory] = useAxios(
        {
            url: `/admin/category_mng/delete_category`,
            method: 'DELETE'
        },
        {manual: true}
    )

    const [selectedCategory, setSelectedCategory] = useState(createData('', '', ''))


    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        id: null,
    })

    let numPages = 0
    if (response !== undefined)
        numPages = parseInt(((response.data.data.pages)).toString()) + 1

    const handleChangePages = (pageNumber) => {
        setPage(pageNumber)
    }
    const addCategoryClick = () => {
        setOpenAddDialog(true)
    }

    const addCategory = (category) => {
        postCategory({
            data: {
                "name": `${category}`
            }
        }).then(res => {
            console.log(res)
            getCategories()
        }).catch(err => {
            console.log(err)
        })
        setOpenAddDialog(false)
    }


    const editCategory = (category) => {
        if (selectedCategory.name !== category) {
            updateCategory({
                data: {
                    "id": `${selectedCategory.id}`,
                    "name": `${category}`,
                }
            }).then(res => {
                console.log(res)
                getCategories()
            }).catch(err => {
                console.log(err)
            })
        }
        setOpenEditDialog(false)
    }


    const deleteCategoryHandler = async() => {
        await deleteCategory({
            data: {
                "id": `${deleteDialog.id}`
            }
        }).then(res => {
            getCategories()
            setDeleteDialog({
                open: false,
                id: null,
            })
        }).catch(err => {
        })
    }

    useEffect(() => {
        getCategories()

    }, [getCategories])


    const onCloseDialog = () => {
        setOpenAddDialog(false)
        setOpenEditDialog(false)
        setDeleteDialog({
            ...deleteDialog,
            open: false,
        })
    }

    return (
        <div>

            {
                loading ? <Skeleton variant={"rect"} width={'100%'} height={500}/>
                    : <TableContainer component={Paper}>
                        <Typography className={classes.title} component={"span"}>دسته بندی ها</Typography>
                        <Button
                            dir={'ltr'}
                            className={classes.addProduct}
                            variant={"contained"}
                            onClick={addCategoryClick}
                            endIcon={<AddCircleOutlineIcon/>}
                        >
                            ساخت دسته بندی جدید
                        </Button>
                        <Table className={classes.table} aria-label="category">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="right">نام دسته‌بندی</StyledTableCell>
                                    <StyledTableCell align="right">تاریخ ایجاد</StyledTableCell>
                                    <StyledTableCell align="right"/>
                                    <StyledTableCell align="right"/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    response.data.data.categories
                                        .map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {toFaDigit(moment.unix(row.create_date).format("jYYYY/jM/jD"))}
                                                </StyledTableCell>

                                                <StyledTableCell align="right">
                                                    <IconButton
                                                        onClick={() => {
                                                            setSelectedCategory(() => {
                                                                return row
                                                            })
                                                            setOpenEditDialog(true)
                                                        }}
                                                    >
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
                                                </StyledTableCell>

                                                <StyledTableCell align="right">
                                                    <IconButton
                                                        onClick={() => {
                                                            setDeleteDialog({
                                                                open: true,
                                                                id: row.id,
                                                            })
                                                        }}
                                                    >

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
                        </Table>
                    </TableContainer>
            }

            <AddCategoryDialog
                onClose={onCloseDialog}
                add={addCategory}
                open={openAddDialog}
                title={'ایجاد دسته‌بندی جدید'}
                defaultValue={''}
            />

            <AddCategoryDialog
                onClose={onCloseDialog}
                add={editCategory}
                open={openEditDialog}
                title={'ویرایش دسته بندی'}
                defaultValue={selectedCategory.name}
            />
            <DeleteDialog
                onClose={onCloseDialog}
                open={deleteDialog.open}
                title={'حذف دسته بندی'}
                deleteHandler={deleteCategoryHandler}
            />

            {!loading && <TablePaginationActions numPages={numPages} page={page} onChange={handleChangePages}/>}
        </div>
    )
}

export default CategorySection