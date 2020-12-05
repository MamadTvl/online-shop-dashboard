import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useForceUpdate from '../../utills/Hooks/useForceUpdate'
import {useStyle} from "./Styles/AttributesStyle";
import PropTypes from "prop-types";
import {useAxios} from "../../utills/Hooks/useAxios";

function Attributes(props) {
    const classes = useStyle()
    const {attributes, setAttributes} = props
    const forceUpdate = useForceUpdate();
    const [,pathImage] = useAxios({
        url:'/admin/setting/motto/upload_image',
        method: 'PATCH'
    }, {manual: true})
    const [, deleteImage] = useAxios({
        url: '/admin/setting/motto/remove_image',
        method: 'DELETE',
    }, {manual: true})

    const uploadImageHandler = (id) => async (event) => {
        const formData = new FormData()
        formData.append("image", event.target.files[0])
        const response = await pathImage({
            url: `/admin/setting/motto/upload_image?id=${id}`,
            data: formData
        })
        setAttributes(prevState => {
            let editedSliderImages = prevState
            editedSliderImages[id - 1].image = response.data.data.cover
            return editedSliderImages
        })
        forceUpdate()
    }

    const deleteImageHandler = async (id) => {
        await deleteImage({
            data: {
                id: id,
            }
        })
        setAttributes(prevState => {
            let editedSliderImages = prevState
            editedSliderImages[id - 1].image = null
            return editedSliderImages
        })
        forceUpdate()
    }

    const handleChangeValues = (id, value) => (event) => {
        setAttributes(prevState => {
            prevState[id - 1] = {
                ...prevState[id - 1],
                [value]: event.target.value,
            }
            return [...prevState]
        })
    }

    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>ویژگی ها</Typography>}
            />
            <Grid container>
                {
                    attributes.map((attribute, index) => (
                        <Grid item xs={12} md={4}>
                            <Card className={classes.root}>
                                <CardMedia
                                    image={attribute.image}
                                    className={classes.cover}
                                />
                                <CardActions style={{justifyContent: 'center'}}>
                                    <Button
                                        onClick={() => deleteImageHandler(attribute.id)}
                                        size={"small"}
                                        className={classes.delete}
                                    >
                                        حذف
                                    </Button>
                                    <input
                                        accept="image/*"
                                        hidden
                                        id={`upload-attribute-${index}`}
                                        multiple
                                        type="file"
                                        onChange={uploadImageHandler(attribute.id)}
                                    />
                                    <label htmlFor={`upload-attribute-${index}`}>
                                        <Button
                                            size={"small"}
                                            className={classes.upload}
                                            variant={"contained"}
                                            component={'span'}
                                        >
                                            آپلود
                                        </Button>
                                    </label>
                                </CardActions>
                                <CardContent>
                                    <Typography className={classes.label}>عنوان</Typography>
                                    <TextField
                                        id={`attributes-title-${attribute.id}`}
                                        placeholder={'عنوان'}
                                        fullWidth
                                        value={attribute.title}
                                        onChange={handleChangeValues(attribute.id, "title")}
                                        margin={'normal'}
                                        InputProps={{
                                            classes: {
                                                input: classes.textField
                                            }
                                        }}
                                        variant="outlined"
                                    />
                                    <Typography className={classes.label}>توضیحات</Typography>
                                    <TextField
                                        id={`attributes-describe-${attribute.id}`}
                                        placeholder={'توضیحات'}
                                        value={attribute.text}
                                        onChange={handleChangeValues(attribute.id, "text")}
                                        fullWidth
                                        multiline
                                        rows={6}
                                        margin={'normal'}
                                        InputProps={{
                                            classes: {
                                                input: classes.textField
                                            }
                                        }}
                                        variant="outlined"
                                    />

                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>

        </Card>
    )

}

Attributes.propTypes = {
    attributes: PropTypes.object.isRequired,
    setAttributes: PropTypes.func.isRequired,
};

export default Attributes