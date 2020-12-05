import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import useForceUpdate from '../../utills/Hooks/useForceUpdate'
import {useStyle} from "./Styles/SlidersStyle";
import PropTypes from "prop-types";
import {useAxios} from "../../utills/Hooks/useAxios";

function Sliders(props) {
    const classes = useStyle()
    const {sliderImages, setSliderImages} = props
    const forceUpdate = useForceUpdate();
    const [,pathImage] = useAxios({
        url:'/admin/setting/cover/upload_image',
        method: 'PATCH'
    }, {manual: true})
    const [, deleteImage] = useAxios({
        url: '/admin/setting/cover/remove_image',
        method: 'DELETE',
    }, {manual: true})

    const uploadImageHandler = (id) => async (event) => {
        const formData = new FormData()
        formData.append("image", event.target.files[0])
        const response = await pathImage({
            url: `/admin/setting/cover/upload_image?id=${id}`,
            data: formData
        })
        setSliderImages(prevState => {
            let editedSliderImages = prevState
            editedSliderImages[id - 1].cover = response.data.data.cover
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
        setSliderImages(prevState => {
            let editedSliderImages = prevState
            editedSliderImages[id - 1].cover = null
            return editedSliderImages
        })
        forceUpdate()
    }


    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>اسلایدر ها</Typography>}
            />
            <CardContent>
                <Grid container style={{justifyContent: 'space-around'}}>
                    {
                        sliderImages.map((image) => (
                            <Grid item md={6} xs={12} key={image.id}>
                                <Card className={classes.root}>
                                    <CardMedia
                                        key={image.id}
                                        image={image.cover}
                                        className={classes.cover}
                                    />
                                    <CardActions>
                                        <Button
                                            size={"small"}
                                            className={classes.delete}
                                            onClick={() => deleteImageHandler(image.id)}
                                        >
                                            حذف
                                        </Button>
                                        <input
                                            accept="image/*"
                                            hidden
                                            id={`upload-slider-${image.id}`}
                                            multiple
                                            type="file"
                                            onChange={uploadImageHandler(image.id)}
                                        />
                                        <label htmlFor={`upload-slider-${image.id}`}>
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
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

Sliders.propTypes = {
    sliderImages: PropTypes.object.isRequired,
    setSliderImages: PropTypes.func.isRequired,
};

export default Sliders