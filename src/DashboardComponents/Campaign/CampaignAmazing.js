import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import {Button, CardContent, CardHeader, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {useStyles} from "./Styles/AmazingStyle";
import PropTypes from "prop-types";
import {useAxios} from "../../utills/Hooks/useAxios";
import useForceUpdate from "../../utills/Hooks/useForceUpdate";


function createData(title, textFieldID) {
    return {title, textFieldID}
}

function CampaignAmazing(props) {
    const classes = useStyles();
    const banners = [
        createData('محصول اول', 'amazing-1'),
        createData('محصول دوم', 'amazing-2'),
        createData('محصول سوم', 'amazing-3')
    ]
    const {amazingOffer, setAmazingOffer} = props
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

    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>شگفت‌انگیز‌ها</Typography>}
            />
            <CardContent>
                <Grid container spacing={3}>
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
};
export default CampaignAmazing
