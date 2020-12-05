import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {Button, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddImageDialog from "./AddImageDialog";
import {useStyle} from "./Styles/ImagesStyle";
import PropTypes from "prop-types";
import {useAxios} from "../../utills/Hooks/useAxios";


function EditImage(props) {
    let params = (new URL(document.location)).searchParams;
    const id = params.get("id")
    const
        {
            preview_image, setPreview_image,
            other_images, setOther_images
        } = props
    const classes = useStyle()
    const [open, setOpen] = useState(false);
    const [, pathImage] = useAxios({
        url: `/admin/merchandise_mng/upload_image?id=${id}`,
        method: 'PATCH',
    }, {manual: true})

    const [, deleteImage] = useAxios({
        url: `/admin/merchandise_mng/remove_image`,
        method: 'DELETE',
    }, {manual: true})

    const [, pathPreviewImage] = useAxios({
        url: '/admin/merchandise_mng/update_merchandise',
        method: 'PATCH',
    }, {manual: true})

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true)
    }

    const uploadImageHandler = async (imageFile) => {
        if (preview_image === null) {
            try {
                const formData = new FormData()
                formData.append("preview_image", imageFile)
                const response = await pathImage({
                    data: formData
                })
                setPreview_image(response.data.data.preview_image)
            } catch (err) {
            }
        } else {
            try {
                const formData = new FormData()
                formData.append("other_image", imageFile)
                const response = await pathImage({
                    data: formData,
                })
                setOther_images(response.data.data.other_image_list)
            } catch (err) {
            }
        }
        setOpen(false)
    }

    const editImageHandler = (index, isPreview) => async (event) => {
        // todo: test when backend bugs fixed (when fixed update product) use that
        const imageFile = event.target.files[0]
        console.log(imageFile)
        if (isPreview) {
            const formData = new FormData()
            formData.append("preview_image", imageFile)
            try {
                await deleteImage({
                    data: {
                        "id": id,
                        "preview_image": preview_image,
                    }
                })
                const response = await pathImage({
                    data: formData,
                })
                setPreview_image(response.data.data.preview_image)

            } catch (err) {
            }

        } else {
            const formData = new FormData()
            formData.append("other_image", imageFile)

            try {
                await deleteImage({
                    data: {
                        "id": id,
                        "other_image": other_images[index],
                    }
                })
                const response = await pathImage({
                    data: formData
                })
                setOther_images(response.data.data.other_image_list)
            } catch (err) {
            }
        }
    }


    const deleteImageHandler = async (index, isPreview) => {
        if (isPreview) {
            try {
                await deleteImage({
                    data: {
                        "id": id,
                        "preview_image": preview_image,
                    }
                })
                if (other_images.length > 0) {
                    const response = await pathPreviewImage({
                        url: `/admin/merchandise_mng/update_merchandise?id=${id}`,
                        data: {
                            "id": id,
                            "preview_image": other_images[0]
                        }
                    })
                    const response2 = await deleteImage({
                        data: {
                            "id": id,
                            "other_image": other_images[0],
                        }
                    })
                    setPreview_image(response.data.data.preview_image)
                    setOther_images(response2.data.data.other_image_list)

                }
            } catch (err) {
                console.log(err)
            }


        } else {
            try {
                const response = await deleteImage({
                    data: {
                        "id": id,
                        "other_image": other_images[index],
                    }
                })
                setOther_images(response.data.data.other_image_list)
            } catch (err) {
            }

        }
    }

    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>عکس ها</Typography>}
            />
            <CardContent>
                {
                    preview_image !== null ?
                        <Card className={classes.root} style={{position: 'relative'}}>
                            <Typography className={classes.previewTitle}>عکس پیش نمایش</Typography>
                            <CardMedia
                                className={classes.cover}
                                image={preview_image}
                                component={'img'}
                            />
                            <CardContent className={classes.detail}>
                                <CardActions className={classes.actions}>
                                    <input
                                        accept="image/*"
                                        hidden
                                        id={`upload-preview-image`}
                                        multiple
                                        type="file"
                                        onChange={editImageHandler(0, true)}
                                    />
                                    <label htmlFor={`upload-preview-image`}>
                                        <Button
                                            size={"small"}
                                            className={classes.upload}
                                            variant={"contained"}
                                            component={'span'}
                                        >
                                            آپلود
                                        </Button>
                                    </label>
                                    <Button
                                        onClick={() => deleteImageHandler(0, true)}
                                        size={"small"}
                                        className={classes.delete}
                                    >
                                        حذف
                                    </Button>
                                </CardActions>
                            </CardContent>
                        </Card> : null
                }

                {
                    other_images.map((image, index) => (
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.cover}
                                image={image}
                                component={'img'}
                            />
                            <CardContent className={classes.detail}>
                                <CardActions className={classes.actions}>
                                    <input
                                        accept="image/*"
                                        hidden
                                        id={`upload-image-${index}`}
                                        multiple
                                        type="file"
                                        onChange={editImageHandler(index, false)}
                                    />
                                    <label htmlFor={`upload-image-${index}`}>
                                        <Button
                                            size={"small"}
                                            className={classes.upload}
                                            variant={"contained"}

                                            component={'span'}
                                        >
                                            آپلود
                                        </Button>
                                    </label>
                                    <Button
                                        onClick={() => deleteImageHandler(index, false)}
                                        size={"small"}
                                        className={classes.delete}
                                    >
                                        حذف
                                    </Button>
                                </CardActions>

                            </CardContent>
                        </Card>
                    ))
                }
                <div className={classes.addImage}>
                    <IconButton onClick={handleClickOpen} className={classes.addImage}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                    <span>اضافه کردن عکس جدید</span>
                </div>
                <AddImageDialog uploadImageHandler={uploadImageHandler} open={open} onClose={handleClose}/>

            </CardContent>
        </Card>
    )

}

EditImage.propTypes = {
    preview_image: PropTypes.any.isRequired,
    setPreview_image: PropTypes.func.isRequired,
    other_images: PropTypes.array.isRequired,
    setOther_images: PropTypes.func.isRequired,
};

export default EditImage