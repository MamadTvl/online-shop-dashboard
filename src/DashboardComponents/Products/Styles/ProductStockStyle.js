import {withStyles} from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Switch from "@material-ui/core/Switch";
import {makeStyles} from "@material-ui/styles";
import React from "react";

export const StyledRadio = withStyles({
    root: {
        color: '#888888',
        '&$checked': {
            color: '#F16522',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
export const StyledSwitch = withStyles({
    switchBase: {
        color: '#888888',
        '&$checked': {
            color: '#F16522',
        },
        '&track': {
            backgroundColor: '#B8B8B8'
        },
        '&$checked + $track': {
            backgroundColor: '#B8B8B8',
        },
    },
    checked: {},
    track: {},
})(Switch);

export const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        // direction: "ltr",
    },
    title: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: "bold",

    },
    label: {
        fontFamily: 'Shabnam',
        color: '#545454',
        fontSize: 14,

    },
    textFieldColor: {
        fontFamily: 'Shabnam',
        fontSize: 14,

    },
    textFieldSize: {
        fontFamily: 'Shabnam',
        fontSize: 14,
        width: '100%',
    },
    textFieldCount: {
        fontFamily: 'Shabnam',
        fontSize: 14,
        width: '100%'
    },
    container: {
        justifyContent: "space-between"
    },
    cover: {
        width: 172,
        height: 172,
        alignSelf: "center",
        flexGrow: 1
    },
    detail: {
        direction: "rtl",
        // flexGrow  : 3,
    },
    productTitle: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 20,
        fontWeight: 500,
    },
    productDetail: {
        fontFamily: 'Shabnam',
        color: '#434343',
        fontSize: 16,
        fontWeight: 500,
    },
    offer: {
        fontFamily: 'Shabnam',
        fontSize: 16,
        color: "white",
        fontWeight: "bold"
    }

}))