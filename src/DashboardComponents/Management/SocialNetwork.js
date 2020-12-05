import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {useStyle} from "./Styles/SocialNetworkStyle";
import PropTypes from "prop-types";

const socialNames = [
    {label: 'آپارارت', id: 'aparat'},
    {label: 'توییتر', id: 'twitter'},
    {label: 'تلگرام', id: 'telegram'},
    {label: 'اینستاگرام', id: 'instagram'},
    {label: 'یوتیوب', id: 'youtube'},
]

function SocialNetwork(props) {
    const classes = useStyle()
    const {socialNetwork, setSocialNetwork} = props
    const handleChangeValues = (id, value) => (event) => {
        setSocialNetwork(prevState => {
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
                title={<Typography className={classes.title}>شبکه های اجتماعی</Typography>}
            />
            <CardContent>
                <Grid container>
                    {socialNetwork.map((social) => (
                        <Grid item md={3} xs={12}>
                            <Typography className={classes.label}>{social.title}</Typography>
                            <div className={classes.root}>
                                <TextField
                                    id={social.id}
                                    placeholder={'آیدی شما'}
                                    value={social.link}
                                    onChange={handleChangeValues(social.id, "link")}
                                    fullWidth
                                    margin={'normal'}
                                    InputProps={{
                                        classes: {
                                            input: classes.textField,
                                        }
                                    }}
                                    variant="outlined"
                                />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>

        </Card>
    )
}

SocialNetwork.propTypes = {
    socialNetwork: PropTypes.object.isRequired,
    setSocialNetwork: PropTypes.func.isRequired,
};

export default SocialNetwork