import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, MenuItem, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import GetCategory from "./GetCategory";
import PropTypes from "prop-types";
import EditProduct from "./GetProductData";

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

const promise = GetCategory()

function ProductCategory(props) {
    const {selectedCategory, setSelectedCategory} = props
    const classes = useStyles()
    const [categories, setCategories] = useState([])
    promise.then(res => {
        setCategories(res[0])
    })

    const handleChange = (event) => {
        for (let i = 0; i < categories.length; i++) {
            for (let j = 0; j < categories[i].length; j++) {
                if(categories[i][j].name === event.target.value){
                   setSelectedCategory(categories[i][j])
                }
            }
        }
    };

    return (
        <Card>
            <CardHeader
                title={<Typography className={classes.title}>دسته بندی</Typography>}
            />
            <CardContent>
                <div className={classes.textField}>
                    <TextField
                        style={{flexGrow: 1}}
                        id="category"
                        select
                        value={selectedCategory ? selectedCategory.name : ''}
                        onChange={handleChange}
                        InputProps={{
                            classes: {
                                input: classes.textFieldFont
                            }
                        }}
                        variant="outlined"

                    >
                        {
                            categories.map((response) => (
                                response.map((category) => (
                                    <MenuItem className={classes.menu} key={category.id} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                ))
                            ))

                        }
                    </TextField>
                </div>
            </CardContent>
        </Card>
    )

}
EditProduct.propTypes = {
    selectedCategory: PropTypes.object.isRequired,
    setSelectedCategory: PropTypes.func.isRequired,
};


export default ProductCategory