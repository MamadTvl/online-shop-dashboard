import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {Button, CardContent, CardMedia, Typography} from "@material-ui/core";
import loginImage from '../../img/Login.png'
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from '@material-ui/core/CircularProgress';
import useAxios from "axios-hooks";
import {useStyle} from "./Style";


function DashboardLogin() {
    const classes = useStyle()
    const baseUrl = "https://api.didartshop.ir"
    const [value, setValue] = useState({
        password: '',
        showPassword: false
    })
    const [{loading}, fetch] = useAxios(
        {
            url: `${baseUrl}/user/sign_in`,
            method: 'POST'
        },
        {manual: true}
    )
    const handleChange = () => (event) => {
        setValue({...value, 'password': event.target.value});
    };

    const handleClickShowPassword = () => {
        setValue({...value, showPassword: !value.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function handleClickSignIn() {
        const mobile_number = document.getElementById('admin-mobile').value
        const password = document.getElementById('admin-password').value
        fetch({data: {"mobile_number": `${mobile_number}`, "password": `${password}`}})
            .then(res => {
                if (res.data.status === "success") {
                    localStorage.setItem("Authorization", res.data.data.token)
                    // eslint-disable-next-line no-restricted-globals
                    location.reload()
                } else {
                    console.log(res)
                }
            })
            .catch(er => {
                console.log(er)
            })
    }


    return (
        <>
            <Typography className={classes.title}>ورود به پنل داشبورد</Typography>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Card className={classes.login}>
                    <CardMedia className={classes.image} image={loginImage}/>
                    <CardContent>
                        <div className={classes.content}>
                            <Typography className={classes.label}>شماره موبایل</Typography>
                            <TextField
                                dir={'ltr'}
                                id={'admin-mobile'}
                                fullWidth
                                margin={'normal'}
                                InputProps={{
                                    classes: {
                                        input: classes.textField
                                    }
                                }}
                                variant="outlined"
                            />
                            <Typography className={classes.label}>رمز عبور</Typography>
                            <TextField
                                dir={'ltr'}
                                id={'admin-password'}
                                type={value.showPassword ? 'text' : 'password'}
                                fullWidth
                                value={value.password}
                                onChange={handleChange()}
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
                        </div>

                    </CardContent>
                </Card>
                <div style={{position: 'relative', margin: 'auto'}}>
                    <Button disabled={loading} onClick={handleClickSignIn} className={classes.signin}
                            variant={"contained"}>ورود</Button>
                    {loading && <CircularProgress size={38} className={classes.buttonProgress}/>}
                </div>
            </div>
        </>
    )
}

export default DashboardLogin