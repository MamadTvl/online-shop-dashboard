import React, {useEffect, useRef, useState} from "react";
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import ProductInfo from "./ProductInfo";
import AddImage from "./AddImage";
import ProductCategory from "./ProductCategory";
import ProductCampaign from "./ProductCampaign";
import ProductTag from "./ProductTag";
import ProductStock from "./ProductStock";
import {useAxios} from "../../utills/Hooks/useAxios";
import {productData, stockData} from "./convertProductData";
import {useStyles} from './Styles/ShowProductStyle'
import GetProductData from "./GetProductData";
import EditImage from "./EditImage";
import {useHistory} from 'react-router-dom'
import {Skeleton} from "@material-ui/lab";
import PropTypes from "prop-types";

const initialData = {
    colorTags: new Set(),
    sizeTags: new Set(),
    productInfoValues: {
        title: '',
        detail: '',
        describe: '',
        price: '0',
        discount: '0',
    },
    selectedCategory: {
        name: "",
    },
    selectedCampaign: {
        id: null,
        value: "نا مشخص",
        label: "نا مشخص",
    },
    tags: new Set(),
    stockValues: [],
    afterOrderValue: 0,
    isExist: true,
    productType: "1",
}


function Product(props) {
    const classes = useStyles();
    const history = useHistory()
    const {edit} = props
    let params = (new URL(document.location)).searchParams;
    const code = params.get("code")
    const [saveLoading, setSaveLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)

    const [, postProductData] = useAxios({
        url: '/admin/merchandise_mng/create_merchandise',
        method: 'POST'
    }, {manual: true})

    const [, pathProductData] = useAxios({
        url: '/admin/merchandise_mng/update_merchandise',
        method: 'PATCH',
    }, {manual: true})

    const [, postStockData] = useAxios({
        url: 'admin/merchandise_mng/create_stock',
        method: 'POST'
    }, {manual: true})

    const [, removeStockData] = useAxios({
        url: '/admin/merchandise_mng/remove_stock',
        method: 'DELETE',
    }, {manual: true})

    const [, pathImage] = useAxios({
        url: '/admin/merchandise_mng/upload_image',
        method: 'PATCH'
    }, {manual: true})

    /** start of productInfo states **/
    const [colorTags, setColorTags] = useState(initialData.colorTags)

    const [sizeTags, setSizeTags] = useState(initialData.sizeTags)

    const [productInfoValues, setProductInfoValues] = useState(initialData.productInfoValues)
    /** end of productInfo states **/

    /** start of Add Image states **/
    const [preview_imageFormData, setPreview_imageFormData] = useState()
    const [other_imageFormData, setOther_imageFormData] = useState([])
    /** end of Add Image states **/

    /** start of Edit Image states **/
    const [preview_image, setPreview_image] = useState(null)
    const [other_images, setOther_images] = useState([])
    /** end of Edit Image states **/

    /** start of selectedCampaign, selectedCategory, tag states **/
    const [selectedCategory, setSelectedCategory] = useState(initialData.selectedCategory)

    const [selectedCampaign, setSelectedCampaign] = useState(initialData.selectedCampaign)

    const [tags, setTags] = useState(initialData.tags)
    /** end of selectedCampaign, selectedCategory, tag states **/

    /**start of productStock states **/
        // stockValues include: array Of {color,size, count}
    const [stockValues, setStockValues] = useState(initialData.stockValues)

    const [afterOrderValue, setAfterOrderValue] = useState(initialData.afterOrderValue)

    const [isExist, setIsExist] = useState(initialData.isExist)

    const [productType, setProductType] = useState(initialData.productType);
    /** end of productStock states **/
    let stock_list = useRef([])
    useEffect(() => {
        async function getValues() {
            setEditLoading(true)
            let newData = await GetProductData()
            setColorTags(newData.colorTags)
            setSizeTags(newData.sizeTags)
            setProductInfoValues(newData.productInfoValues)
            setSelectedCategory(newData.selectedCategory)
            setSelectedCampaign(newData.selectedCampaign)
            setTags(newData.tags)
            setStockValues(newData.stockValues)
            setAfterOrderValue(newData.afterOrderValue)
            setIsExist(newData.isExist)
            setProductType(newData.productType)
            setPreview_image(newData.preview_image)
            setOther_images(newData.other_images)
            stock_list.current = newData.stock_list
            setEditLoading(false)
        }

        if (edit)
            getValues().then()
        else {
            setColorTags(initialData.colorTags)
            setSizeTags(initialData.sizeTags)
            setProductInfoValues(initialData.productInfoValues)
            setSelectedCategory(initialData.selectedCategory)
            setSelectedCampaign(initialData.selectedCampaign)
            setTags(initialData.tags)
            setStockValues(initialData.stockValues)
            setAfterOrderValue(initialData.afterOrderValue)
            setIsExist(initialData.isExist)
            setProductType(initialData.productType)

        }
    }, [edit])

    useEffect(() => {
        if (!edit) {
            setColorTags(new Set())
            setSizeTags(new Set())
            setTags(new Set())
        }
    }, [edit])


    const handleSubmit = async () => {
        setSaveLoading(true)
        try {
            const response = await postProductData({
                data:
                    productData(0, false, productInfoValues, selectedCategory,
                        [...tags], [...colorTags], [...sizeTags],
                        selectedCampaign, isExist, productType, afterOrderValue)

            })
            const id = response.data.data.id

            for (let i = 0; i < colorTags.size * sizeTags.size && sizeTags.size > 0; i++) {
                await postStockData({
                    data:
                        stockData(id, productType, i, stockValues, isExist)
                })
            }

            if (preview_imageFormData) {
                await pathImage({
                    url: `/admin/merchandise_mng/upload_image?id=${id}`,
                    data: preview_imageFormData
                })
            }

            for (let i = 0; i < other_imageFormData.length; i++) {
                await pathImage({
                    url: `/admin/merchandise_mng/upload_image?id=${id}`,
                    data: other_imageFormData[i]
                })
            }
        } catch (err) {}

        setSaveLoading(false)
        history.push('/admin/dashboard/products')
    }

    const handleEdit = async () => {
        setSaveLoading(true)
        let params = (new URL(document.location)).searchParams;
        const id = params.get("id")
        try {
            await pathProductData({
                url: `/admin/merchandise_mng/update_merchandise`,
                data: productData(id, true, productInfoValues, selectedCategory,
                    [...tags], [...colorTags], [...sizeTags],
                    selectedCampaign, isExist, productType, afterOrderValue)
            })
        } catch (err) {
        }

        for (const stock of stock_list.current) {
            try {
                await removeStockData({
                    data: {
                        "id": stock.id,
                    }
                })
            }catch (err){}
        }

        for (let i = 0; i < colorTags.size * sizeTags.size && sizeTags.size > 0; i++) {
            try {
                await postStockData({
                    data:
                        stockData(id, productType, i, stockValues, isExist)
                })
            } catch (err) {
            }
        }
        setSaveLoading(false)
        history.push('/admin/dashboard/products')
    }

    return (
        <div className={classes.root}>

            <Grid container direction={"row"} className={classes.container} spacing={2}>

                <Grid item md={12} style={{margin: '0px 32px 32px 32px'}}>
                    {
                        edit
                            ? <Typography className={classes.title}>{`ویرایش محصول ${code}`}</Typography>
                            : <Typography className={classes.title}>اضافه کردن محصول</Typography>
                    }

                </Grid>

                <Grid container xs={12} md={8} className={classes.gridRight} spacing={2}>
                    <Grid style={{position: 'relative'}} item xs={12} md={12}>

                        {
                            editLoading
                                ? <Skeleton
                                    variant="rect"
                                    height={761}
                                    width={'100%'}
                                />
                                : <ProductInfo
                                    colorTags={colorTags}
                                    setColorTags={setColorTags}
                                    sizeTags={sizeTags}
                                    setSizeTags={setSizeTags}
                                    productInfoValues={productInfoValues}
                                    setProductInfoValues={setProductInfoValues}
                                />
                        }
                    </Grid>
                </Grid>

                <Grid container xs={12} md={4} className={classes.gridLeft}>

                    <Grid item xs={12} md={12} className={classes.gridLeftElements}>
                        {
                            edit
                                ?
                                editLoading
                                    ? <Skeleton
                                        variant="rect"
                                        height={223}
                                        width={'100%'}/>
                                    : <EditImage
                                        preview_image={preview_image}
                                        setPreview_image={setPreview_image}
                                        other_images={other_images}
                                        setOther_images={setOther_images}
                                    />
                                : <AddImage
                                    other_imageFormData={other_imageFormData}
                                    setOther_imageFormData={setOther_imageFormData}
                                    preview_imageFormData={preview_imageFormData}
                                    setPreview_imageFormData={setPreview_imageFormData}
                                />
                        }

                    </Grid>

                    <Grid item xs={12} md={12} className={classes.gridLeftElements}>
                        {
                            editLoading
                                ? <Skeleton
                                    height={223} width={'100%'}/>
                                : <ProductCategory
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />
                        }
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.gridLeftElements}>
                        {
                            editLoading
                                ? <Skeleton variant="rect"
                                            height={223} width={'100%'}/>

                                : <ProductCampaign
                                    selectedCampaign={selectedCampaign}
                                    setSelectedCampaign={setSelectedCampaign}
                                />
                        }
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.gridLeftElements}>
                        {
                            editLoading
                                ? <Skeleton
                                    variant="rect"
                                    height={223}
                                    width={'100%'}/>
                                : <ProductTag
                                    tags={tags}
                                    setTags={setTags}
                                />
                        }
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.gridLeftElements}>
                        {
                            editLoading
                                ? <Skeleton
                                    variant="rect"
                                    height={223}
                                    width={'100%'}/>
                                : <ProductStock
                                    colorTags={colorTags}
                                    sizeTags={sizeTags}

                                    stockValues={stockValues}
                                    setStockValues={setStockValues}

                                    afterOrderValue={afterOrderValue}
                                    setAfterOrderValue={setAfterOrderValue}

                                    isExist={isExist}
                                    setIsExist={setIsExist}

                                    productType={productType}
                                    setProductType={setProductType}
                                />
                        }
                    </Grid>

                    <Grid hidden={editLoading} item xs={12} md={12} className={classes.gridLeftElements}>
                        {
                            edit
                                ? <Button
                                    disabled={saveLoading}
                                    fullWidth
                                    onClick={handleEdit}
                                    className={classes.save}
                                    variant={"contained"}
                                >
                                    ویرایش اطلاعات
                                </Button>

                                : <Button
                                    disabled={saveLoading}
                                    fullWidth
                                    onClick={handleSubmit}
                                    className={classes.save}
                                    variant={"contained"}
                                >
                                    ثبت اطلاعات
                                </Button>
                        }
                        {saveLoading && <CircularProgress size={38} className={classes.buttonProgress}/>}

                    </Grid>

                </Grid>
            </Grid>
        </div>
    )
}

Product.propTypes = {
    edit: PropTypes.bool.isRequired,
};

export default Product