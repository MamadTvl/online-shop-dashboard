import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import {Button, CircularProgress} from "@material-ui/core";
import CampaignBanners from "./CampaignBanners";
import CampaignAmazing from "./CampaignAmazing";
import CampaignDiscount from "./CampaignDiscount";
import useCampaignsData from "./useCampaignsData";
import {useStyles} from "./Styles/CampaignSectionStyle";
import {Skeleton} from "@material-ui/lab"
import {useAxios} from "../../utills/Hooks/useAxios";

function CampaignSection() {
    const classes = useStyles();
    const [fetch, setFetch] = useState(true)
    const [result, loading] = useCampaignsData(fetch)
    const [saveLoading, setSaveLoading] = useState(false)
    const [, updateData] = useAxios({
        url: '/admin/campaign_mng/update',
        method: 'PATCH',
    }, {manual: true})

    /** start of states **/
    const [campaigns, setCampaigns] = useState([])
    const [amazingOffer, setAmazingOffer] = useState()
    /** end of states **/

    useEffect(() => {
        setCampaigns(result[0])
        setAmazingOffer(result[1])
        setFetch(false)
    }, [result])
    const update = () => {
        setFetch(true)
    }

    const handleSubmit = async () => {
        setSaveLoading(true)
        for (const campaign in campaigns) {
            try {
                updateData({
                    data: {
                        "id": parseInt(campaign.id),
                        "percent_of_discount": parseInt(campaign.percent_of_discount) / 100,
                    }
                })
            } catch (err) {
            }
        }
        setSaveLoading(false)

    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {
                        loading
                            ? <Skeleton width={'100%'} height={500} variant={"rect"}/>
                            : <CampaignBanners
                                campaigns={campaigns}
                                setCampaigns={setCampaigns}
                            />
                    }
                </Grid>
                <Grid item xs={12}>
                    {loading
                        ? <Skeleton width={'100%'} height={500} variant={"rect"}/>
                        : <CampaignAmazing
                            amazingOffer={amazingOffer}
                            setAmazingOffer={setAmazingOffer}
                        />
                    }
                </Grid>
                <Grid item xs={12}>

                    {loading
                        ? <Skeleton width={'100%'} height={500} variant={"rect"}/>
                        : <CampaignDiscount/>
                    }
                </Grid>
                <Grid item xs={false} sm={6} md={9}/>
                <Grid style={{position: 'relative'}} item xs={12} sm={6} md={3}>
                    {
                        loading &&
                        <Button disabled={saveLoading} onClick={handleSubmit} fullWidth className={classes.save}
                                variant={"contained"}>ثبت
                            اطلاعات</Button>
                    }

                    {saveLoading && <CircularProgress size={38} className={classes.buttonProgress}/>}
                </Grid>
            </Grid>
        </div>
    )


}


export default CampaignSection