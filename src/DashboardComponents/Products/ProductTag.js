import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
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
    textField: {
        fontFamily: 'Shabnam',
        fontSize: 14,
    },
}), {index: 1});

function ProductTag(props) {
    const classes = useStyles()
    const {tags, setTags} = props
    const [clicked, setClicked] = useState(false)

    const createTag = (tag) => {
        return <Chip
            dir={'ltr'}
            style={{
                fontFamily: 'Shabnam',
                fontSize: 16,
                color: 'white',
                backgroundColor: '#434343'
            }}
            color={'secondary'}
            label={tag}
            onDelete={() => {
                setTags(prevState => {
                    prevState.delete(tag)
                    return new Set(prevState)
                })
            }}
        />
    }
    const addEvent = () => {
        if (!clicked) {
            const tagInput = document.getElementById('product-tag')
            tagInput.addEventListener('keyup', (event) => {
                if (event.keyCode === 13 && tagInput.value !== "") {
                    setTags(prevState => {
                        prevState.add(tagInput.value)
                        return new Set(prevState)
                    })
                    document.getElementById('product-tag').value = ""
                }
            })
            setClicked(!clicked)
        }
    }

    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>تگ‌ها</Typography>}
            />
            <CardContent>
                <div id={'colorTextField'}>
                    <TextField
                        id={'product-tag'}
                        onClick={addEvent}
                        placeholder={'تگ را بنویسید و اینتر بزنید.'}
                        margin={'normal'}
                        fullWidth
                        InputProps={{
                            classes: {
                                input: classes.textField
                            },
                        }}
                        variant="outlined"
                    />
                </div>
                <div>
                    {
                        [...tags].map((tag) => (
                            createTag(tag)
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}

ProductTag.propTypes = {
    tags: PropTypes.object.isRequired,
    setTags: PropTypes.func.isRequired,
};

export default ProductTag