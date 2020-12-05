import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",
        margin: theme.spacing(0, 0)
    },
    menu: {
        fontFamily: 'Shabnam',
    },
    textField: {
        display: "flex",
        justifyContent: "center",
    },
    textFieldFont: {
        fontFamily: 'Shabnam',
        fontSize: 16,
        color: '#545454',
    }
}));

const campaigns = [
    {
        id: null,
        value: "نا مشخص",
        label: "نا مشخص",
    },
    {
        id: 1,
        value: "کمپین ۱",
        label: "کمپین ۱",
    },
    {
        id: 2,
        value: "کمپین ۲",
        label: "کمپین ۲",
    },
    {
        id: 3,
        value: "کمپین ۳",
        label: "کمپین ۳",
    },
];

function ProductCampaign(props) {
    const classes = useStyles()
    const {selectedCampaign, setSelectedCampaign} = props

    const handleChange = (event) => {
        for (let i = 0; i < campaigns.length; i++) {
            if (campaigns[i].value === event.target.value){
                console.log(campaigns[i].value, event.target.value)
                setSelectedCampaign(campaigns[i])
                console.log(selectedCampaign)
            }

        }

    };
    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>کمپین</Typography>}
            />
            <CardContent>
                <div className={classes.textField}>
                    <TextField
                        style={{flexGrow: 1}}
                        id="campaign"
                        select
                        value={selectedCampaign.value}
                        defaultValue={""}
                        onChange={handleChange}
                        InputProps={{
                            classes: {
                                input: classes.textFieldFont
                            }
                        }}
                        variant="outlined"
                    >
                        {campaigns.map((option) => (
                            <MenuItem className={classes.menu} key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </CardContent>
        </Card>
    )
}

ProductCampaign.propTypes = {
    selectedCampaign: PropTypes.object.isRequired,
    setSelectedCampaign: PropTypes.func.isRequired,
};

export default ProductCampaign