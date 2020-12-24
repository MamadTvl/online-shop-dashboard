import React from "react";
import MaskedInput from 'react-text-mask';
import PropTypes from "prop-types";


export default function DateFormat(props) {
    const {inputRef, ...other} = props


    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={[/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            showMask
        />
    )
}

DateFormat.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

