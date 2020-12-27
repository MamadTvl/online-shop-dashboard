import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import {Button, CardContent, CardHeader, CardMedia, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {useStyles} from "./Styles/AmazingStyle";
import PropTypes from "prop-types";
import {useAxios} from "../../utills/Hooks/useAxios";
import useForceUpdate from "../../utills/Hooks/useForceUpdate";
import CardActions from "@material-ui/core/CardActions";
import {useHistory} from 'react-router-dom'

function createData(title, textFieldID) {
    return {title, textFieldID}
}

function CampaignAmazing(props) {
    const classes = useStyles();
    const history = useHistory()
    const banners = [
        createData('محصول اول', 'amazing-1'),
        createData('محصول دوم', 'amazing-2'),
        createData('محصول سوم', 'amazing-3')
    ]
    const {amazingOffer, setAmazingOffer, cover, setCover} = props
    const [values, setValues] = useState({
        1: "",
        2: "",
        3: "",
    })
    const forceUpdate = useForceUpdate()
    const [, pathAmazing] = useAxios({
        url: '/admin/amazing_offer_mng/update',
        method: 'PATCH',
    }, {manual: true})
    const [, pathImage] = useAxios({
        url: '/admin/amazing_offer_mng/cover/upload',
        method: 'PATCH'
    }, {manual: true})

    const [, deleteImage] = useAxios({
        url: '/admin/amazing_offer_mng/cover/remove',
        method: 'DELETE',
    }, {manual: true})

    const handleChangeValues = (value) => (event) => {
        setValues(prevState => {
            return {
                ...prevState,
                [value]: event.target.value,
            }

        })
    }

    useEffect(() => {
        setValues({
            1: amazingOffer[0] ? amazingOffer[0].unique_code : "",
            2: amazingOffer[1] ? amazingOffer[1].unique_code : "",
            3: amazingOffer[2] ? amazingOffer[2].unique_code : "",
        })
    }, [amazingOffer])

    const addProduct = async (id) => {
        try {
            console.log(values[`${id}`], id)
            const response = await pathAmazing({
                data: {
                    "unique_code": values[`${id}`],
                    "merchandise_index": parseInt(id)
                }
            })
            setAmazingOffer(prevState => {
                prevState[parseInt(id) - 1] = response.data.data
                return prevState
            })
            forceUpdate()
        } catch (err) {
        }
    }

    const deleteImageHandler = async () => {
        try{
            await deleteImage()
            setCover(null)
            forceUpdate()
            history.go(0)
        }catch(err){}
    }

    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>شگفت‌انگیز‌ها</Typography>}
            />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card style={{justifyContent: 'space-between'}} className={classes.paper}>
                            <div style={{display: 'flex',}}>
                                <CardMedia
                                    className={classes.cover}
                                    image={cover}
                                />
                                <div style={{
                                    marginRight: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 1
                                }}>
                                    <Typography className={classes.coverTitle}
                                                component={"span"}>{'تصویر پیش نمایش'}</Typography>
                                    <Typography className={classes.coverSubTitle}
                                                component={"span"}>{'۲۷۵ * ۲۷۵'}</Typography>
                                </div>
                            </div>
                            <CardActions className={classes.cardAction}>
                                <Button
                                    disabled={cover === null}
                                    onClick={deleteImageHandler}
                                    size={"small"}
                                    className={classes.delete}
                                >
                                    حذف
                                </Button>
                                <input
                                    accept="image/*"
                                    hidden
                                    id={`upload-amazing-cover`}
                                    multiple
                                    type="file"
                                    onChange={async (event) => {
                                        const formData = new FormData()
                                        formData.append("cover", event.target.files[0])
                                        try{
                                            const response = await pathImage({
                                                data: formData,
                                            })
                                            setCover(response.data.data.cover)
                                            forceUpdate()
                                            history.go(0)
                                        }catch(err){
                                        }
                                    }}
                                />
                                <label htmlFor={`upload-amazing-cover`}>
                                    <Button
                                        disabled={cover !== null}
                                        size={"small"}
                                        className={classes.upload}
                                        variant={"contained"}
                                        component={'span'}
                                    >
                                        آپلود
                                    </Button>
                                </label>
                            </CardActions>

                        </Card>
                    </Grid>
                    {
                        banners.map((banner, index) => (
                            <Grid item xs={12}>
                                <Card className={classes.paper}>
                                    <div className={classes.product}>
                                        <Typography className={classes.bannerName}
                                                    component={"span"}>{banner.title}</Typography>
                                        <Typography className={classes.bannerDetail}
                                                    component={"span"}>{amazingOffer[index] ? amazingOffer[index].title : ""}</Typography>
                                    </div>
                                    <CardContent>
                                        <TextField
                                            id={banner.textFieldID}
                                            placeholder={'کد محصول'}
                                            value={values[`${index + 1}`]}
                                            onChange={handleChangeValues(`${index + 1}`)}
                                            margin={'normal'}
                                            fullWidth
                                            InputProps={{
                                                classes: {
                                                    input: classes.textField
                                                },
                                                endAdornment:
                                                    <InputAdornment position={"end"}>
                                                        <Button
                                                            size={"small"}
                                                            className={classes.save}
                                                            variant={"contained"}
                                                            onClick={() => addProduct(index + 1)}
                                                        >
                                                            ثبت
                                                        </Button>
                                                    </InputAdornment>
                                            }}
                                            variant="outlined"
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>

    )


}

CampaignAmazing.propTypes = {
    amazingOffer: PropTypes.object.isRequired,
    setAmazingOffer: PropTypes.func.isRequired,
    cover: PropTypes.string,
    setCover: PropTypes.func,
};
export default CampaignAmazing
