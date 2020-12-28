import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {Button, CardContent, CardHeader, CardMedia, InputAdornment, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import useForceUpdate from '../../utills/Hooks/useForceUpdate'
import {useStyles} from "./Styles/BannersStyle";
import PropTypes from "prop-types";
import {DecimalInput} from "react-hichestan-numberinput";
import {useAxios} from "../../utills/Hooks/useAxios";


function createDate(title, subTitle, id) {
    return {title, subTitle, id}
}

const banners = [
    createDate('بنر اول', 'سایز ۵۱۶ * ۵۲۰', 'campaign-1'),
    createDate('بنر دوم', 'سایز ۷۰۰ * ۵۲۰', 'campaign-2'),
    createDate('بنر سوم', 'سایز ۱۲۴۰ * ۵۲۰', 'campaign-3'),
]

function CampaignBanners(props) {
    const classes = useStyles();
    const {campaigns, setCampaigns} = props
    const forceUpdate = useForceUpdate();

    const [, pathImage] = useAxios({
        url: '/admin/campaign_mng/upload_image',
        method: 'PATCH'
    }, {manual: true})

    const [, deleteImage] = useAxios({
        url: '/admin/campaign_mng/remove_image',
        method: 'DELETE',
    }, {manual: true})

    const uploadImageHandler = (id) => async (event) => {
        const formData = new FormData()
        formData.append("image", event.target.files[0])
        const response = await pathImage({
            url: `/admin/campaign_mng/upload_image?id=${id}`,
            data: formData,
        })

        setCampaigns(prevState => {
            prevState[id - 1] = {
                ...prevState[id - 1],
                "image": response.data.data.image
            }
            return [...prevState]
        })
        forceUpdate()
    }

    const deleteImageHandler = async (id) => {
        await deleteImage({
            data: {
                "id": id,
            }
        })
        setCampaigns(prevState => {
            prevState[id - 1] = {
                ...prevState[id - 1],
                "image": null,
            }
            return [...prevState]
        })
        forceUpdate()
    }

    const handleChangeValues = (id, value) => (event) => {
        setCampaigns(prevState => {
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
                title={<Typography className={classes.title}>بنر های کمپین</Typography>}
            />
            <CardContent>
                <Grid container spacing={3}>
                    {
                        banners.map((banner, index) => (
                            <Grid item xs={12} md={6}>
                                <Card className={classes.paper}>
                                    <div className={classes.header}>
                                        <CardMedia
                                            className={classes.cover}
                                            image={campaigns[index].image}
                                        />
                                        <div style={{
                                            marginRight: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1
                                        }}>
                                            <Typography className={classes.bannerName}
                                                        component={"span"}>{banner.title}</Typography>
                                            <Typography className={classes.bannerDetail}
                                                        component={"span"}>{banner.subTitle}</Typography>
                                        </div>
                                        <CardActions className={classes.cardAction}>
                                            <Button
                                                onClick={() => deleteImageHandler(campaigns[index].id)}
                                                size={"small"}
                                                className={classes.delete}
                                            >
                                                حذف
                                            </Button>
                                            <input
                                                accept="image/*"
                                                hidden
                                                id={`upload-banner-${index}`}
                                                multiple
                                                type="file"
                                                onChange={uploadImageHandler(campaigns[index].id)}
                                            />
                                            <label htmlFor={`upload-banner-${index}`}>
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
                                    </div>
                                    <CardContent>
                                        <TextField
                                            id={banner.id}
                                            value={campaigns[index].percent_of_discount}
                                            onChange={handleChangeValues(campaigns[index].id, "percent_of_discount")}
                                            placeholder={'0'}
                                            margin={'normal'}
                                            fullWidth
                                            InputProps={{
                                                classes: {
                                                    input: classes.textField,
                                                    adornedStart: classes.textField,
                                                },
                                                style: {
                                                    direction: 'ltr',
                                                },
                                                inputComponent: DecimalInput,
                                                startAdornment: <InputAdornment position={"start"}>%</InputAdornment>
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

CampaignBanners.propTypes = {
    campaigns: PropTypes.object.isRequired,
    setCampaigns: PropTypes.func.isRequired,
};

export default CampaignBanners