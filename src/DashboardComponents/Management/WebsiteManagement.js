import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import Sliders from "./Sliders";
import Attributes from "./Attributes";
import SocialNetwork from "./SocialNetwork";
import {useStyles} from "./Styles/WebsiteManagmentStyle";
import useSettingData from "./useSettingData";
import {useAxios} from "../../utills/Hooks/useAxios";
import {Skeleton} from "@material-ui/lab"

const initialSliders = [
    {
        "id": 1,
        "cover": null
    },
    {
        "id": 2,
        "cover": null
    },
    {
        "id": 3,
        "cover": null
    },
    {
        "id": 4,
        "cover": null
    }
]
const initialAttributes = [
    {
        "id": 1,
        "image": "",
        "title": "",
        "text": ""
    },
    {
        "id": 2,
        "image": "",
        "title": "",
        "text": ""
    },
    {
        "id": 3,
        "image": "",
        "title": "",
        "text": ""
    }
]
const initialSocialNetwork = [
    {
        "id": 1,
        "title": "",
        "link": ""
    },
    {
        "id": 2,
        "title": "",
        "link": ""
    },
    {
        "id": 3,
        "title": "",
        "link": ""
    },
    {
        "id": 4,
        "title": "",
        "link": ""
    },
    {
        "id": 5,
        "title": "",
        "link": ""
    }
]

function WebsiteManagement() {
    const classes = useStyles();
    const [fetch, setFetch] = useState(true)
    const [result, loading] = useSettingData(fetch)
    const [saveLoading, setSaveLoading] = useState(false)

    const [, updateAttributeData] = useAxios({
        url: `/admin/setting/motto/update`,
        method: 'PATCH'
    }, {manual: true})

    const [, updateNetworkData] = useAxios({
        url: `/admin/setting/social_network/update`,
        method: 'PATCH'
    }, {manual: true})

    /** sliders state **/
    const [sliderImages, setSliderImages] = useState(initialSliders)
    /** sliders state **/

    /** Attributes state **/
    const [attributes, setAttributes] = useState(initialAttributes)
    /** Attributes state **/

    /** SocialNetwork state **/
    const [socialNetwork, setSocialNetwork] = useState(initialSocialNetwork)
    /** SocialNetwork state **/

    useEffect(() => {
        setSliderImages(result[0])
        setAttributes(result[1])
        setSocialNetwork(result[2])
        setFetch(false)
    }, [result])


    const handleSubmit = async () => {
        setSaveLoading(true)
        for (let i = 0; i < 3; i++) {
            try {
                await updateAttributeData({
                    data: attributes[i],
                })
            } catch (err) {

            }
        }
        for (let i = 0; i < 5; i++) {
            try {
                await updateNetworkData({
                    data: socialNetwork[i]
                })
            } catch (err) {
            }
        }
        setSaveLoading(false)
        setFetch(true)
    }
    return (
        <div className={classes.root}>

            <Grid container className={classes.container} spacing={2}>
                <Grid item xs={12} style={{margin: '0px 16px 0px 0px'}}>
                    <Typography className={classes.title}>مدیریت وبسایت</Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        loading ?
                            <Skeleton variant={"rect"} width={'100%'} height={329.6}/>
                            : <Sliders
                                sliderImages={sliderImages}
                                setSliderImages={setSliderImages}
                            />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        loading ?
                            <Skeleton variant={"rect"} width={'100%'} height={624}/>
                            : <Attributes
                                attributes={attributes}
                                setAttributes={setAttributes}
                            />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        loading ?
                            <Skeleton variant={"rect"} width={'100%'} height={294}/>
                            : <SocialNetwork
                                socialNetwork={socialNetwork}
                                setSocialNetwork={setSocialNetwork}
                            />
                    }
                </Grid>
                <Grid item xs={12}>
                    <div style={{position: 'relative'}}>
                        <Button disabled={saveLoading} onClick={handleSubmit} className={classes.save}
                                variant={"contained"}>ثبت
                            اطلاعات</Button>
                        {saveLoading && <CircularProgress size={38} className={classes.buttonProgress}/>}
                    </div>
                </Grid>
            </Grid>

        </div>
    )

}

export default WebsiteManagement
