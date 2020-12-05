import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {Button, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {useStyle} from "./Style";
import {useAxios} from "../../utills/Hooks/useAxios";
import LinearProgress from "@material-ui/core/LinearProgress";

function Account() {
    const classes = useStyle()
    const [value, setValue] = useState({
        password: '',
        rePassword: '',
        showPassword: false
    })
    const textField = (id, defaultValue) => {
        switch (id) {
            case 'password':
                return (<TextField
                    dir={'ltr'}
                    id={id}
                    type={value.showPassword ? 'text' : 'password'}
                    fullWidth
                    value={value.password}
                    onChange={handleChange('password')}
                    margin={'normal'}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        },
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {value.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                    }}
                    variant="outlined"
                />)
            case 'new-password':
                return (
                    <TextField
                        dir={'ltr'}
                        id={id}
                        type={value.showPassword ? 'text' : 'password'}
                        fullWidth
                        value={value.rePassword}
                        onChange={handleChange('rePassword')}
                        margin={'normal'}

                        InputProps={{
                            classes: {
                                input: classes.textField
                            },
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {value.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                        }}
                        variant="outlined"
                    />
                )
            case 'email':
                return (
                    <TextField
                        dir={'ltr'}
                        id={id}
                        fullWidth
                        defaultValue={defaultValue}
                        margin={'normal'}
                        InputProps={{
                            classes: {
                                style: {
                                    direction: 'ltr'
                                },
                                input: classes.textField
                            }
                        }}
                        variant="outlined"
                    />
                )
            default:
                return (<>
                    <TextField
                        id={id}
                        fullWidth
                        defaultValue={defaultValue}
                        margin={'normal'}
                        InputProps={{
                            classes: {
                                input: classes.textField
                            }
                        }}
                        variant="outlined"
                    />
                </>)
        }
    }

    const [{response, loading}, fetch] = useAxios({
            url: '/user/get_profile',
        }
    )


    if(loading)
        return <LinearProgress className={classes.loading}/>

    const data = response.data.data

    const accountItems = [
        {title: 'نام و نام‌خانوادگی', id: 'name', defaultValue: data.name_and_last_name},
        {title: 'شماره موبایل', id: 'mobile', defaultValue: data.mobile_number},
        {title: 'رمز عبور', id: 'password', defaultValue: ''},
        {title: 'رمز عبور جدید', id: 'new-password', defaultValue: ''}
    ]
    const handleChange = (props) => (event) => {
        setValue({...value, [props]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValue({...value, showPassword: !value.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Card>
                <CardHeader
                    title={<Typography className={classes.title}>حساب کاربری</Typography>}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        {
                            accountItems.map((item) => (
                                <Grid item xs={12} md={6}>
                                    <Typography className={classes.label}>{item.title}</Typography>
                                    {textField(item.id, item.defaultValue)}
                                </Grid>
                            ))

                        }
                    </Grid>
                </CardContent>
            </Card>
            <Button className={classes.save} variant={"contained"}>ثبت اطلاعات</Button>
        </>
    )
}

export default Account