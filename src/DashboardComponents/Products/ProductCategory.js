import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, MenuItem, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import EditProduct from "./GetProductData";
import useCategoriesData from "../../utills/Hooks/useCategoriesData";

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
}), {index: 1});


function ProductCategory(props) {
    const {selectedCategory, setSelectedCategory} = props
    const classes = useStyles()
    const [loading, categories] = useCategoriesData(true)

    const findCategory = (name) => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === name){
                return categories[i]
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
                        disabled={loading}
                        style={{flexGrow: 1}}
                        id="category"
                        select
                        value={selectedCategory ? selectedCategory.name : ''}
                        onChange={(event) => {
                            setSelectedCategory(findCategory(event.target.value))
                        }}
                        InputProps={{
                            classes: {
                                input: classes.textFieldFont
                            }
                        }}
                        variant="outlined"

                    >
                        {
                            categories.map((category) => (
                                <MenuItem className={classes.menu} key={category.id} value={category.name}>
                                    {category.name}
                                </MenuItem>
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