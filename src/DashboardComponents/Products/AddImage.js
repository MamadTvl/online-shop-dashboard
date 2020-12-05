import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {Button, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddImageDialog from "./AddImageDialog";
import PropTypes from "prop-types";
import useForceUpdate from '../../utills/Hooks/useForceUpdate'
import {useStyle} from "./Styles/ImagesStyle";


function AddImage(props) {
    const
        {
            preview_imageFormData, setPreview_imageFormData,
            other_imageFormData, setOther_imageFormData
        } = props
    const classes = useStyle()
    const [open, setOpen] = useState(false);
    const [preview_imageFile, setPreview_imageFile] = useState(null)
    const [other_imageFiles, setOther_imageFiles] = useState([])

    const forceUpdate = useForceUpdate();

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true)
    }
    const uploadImageHandler = (imageFile) => {
        if (preview_imageFile === null) {
            setPreview_imageFile(imageFile)

            const formData = new FormData();
            formData.append("preview_image", imageFile);
            setPreview_imageFormData(formData)
        } else {
            setOther_imageFiles(prevState => {
                return [...prevState, imageFile]
            })

            const formData = new FormData()
            formData.append("other_image", imageFile)
            setOther_imageFormData(prevState => {
                return [...prevState, formData]
            })

        }
        setOpen(false)

    }

    const editImageHandler = (index, isPreview) => (event) => {
        const imageFile = event.target.files[0]
        if (isPreview) {
            setPreview_imageFile(imageFile)
            const formData = new FormData()
            formData.append("preview_image", imageFile)
            setPreview_imageFormData(formData)
        } else {
            let editedArray = other_imageFiles
            editedArray[index] = imageFile
            setOther_imageFiles(editedArray)

            let editedFormDataArray = other_imageFormData
            const formData = new FormData()
            formData.append("other_image", imageFile)
            editedFormDataArray[index] = formData
            setOther_imageFormData(editedFormDataArray)

        }
        forceUpdate()
    }

    const deleteImageHandler = (index, isPreview) => {
        if (isPreview) {
            setPreview_imageFile(null)
            // edit form data of preview images
            setPreview_imageFormData(null)
            if (other_imageFiles.length > 0) {
                setPreview_imageFile(other_imageFiles[0])
                // send form data of preview image
                const formData = new FormData();
                formData.append("preview_image", other_imageFiles[0]);
                setPreview_imageFormData(formData)

                setOther_imageFiles(other_imageFiles
                    .filter(item => item !== other_imageFiles[0]))
                // edit form data of other images
                setOther_imageFormData(other_imageFormData
                    .filter(item => item !== other_imageFormData[0]))
            }
        } else {
            setOther_imageFiles(other_imageFiles
                .filter(item => item !== other_imageFiles[index]))
            // edit form data of other images
            setOther_imageFormData(other_imageFormData
                .filter(item => item !== other_imageFormData[index]))
        }

    }


    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>عکس ها</Typography>}
            />
            <CardContent>
                {
                    preview_imageFile ?
                        <Card className={classes.root} style={{position: 'relative'}}>
                            <Typography className={classes.previewTitle}>عکس پیش نمایش</Typography>
                            <CardMedia
                                className={classes.cover}
                                image={URL.createObjectURL(preview_imageFile)}
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
                    other_imageFiles.map((imageFile, index) => (
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.cover}
                                image={URL.createObjectURL(imageFile)}
                                // title={imageFile.name}
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

AddImage.propTypes = {
    preview_imageFormData: PropTypes.any.isRequired,
    setPreview_imageFormData: PropTypes.func.isRequired,
    other_imageFormData: PropTypes.array.isRequired,
    setOther_imageFormData: PropTypes.func.isRequired,
};

export default AddImage