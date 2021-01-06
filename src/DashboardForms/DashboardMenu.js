import React, {useState} from "react";
import {List, SvgIcon} from "@material-ui/core";

import ListItemLink from "../Routes/Link/ListItemLink";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useStyles} from "./Styles/MenuStyle";
import {useHistory} from "react-router-dom"

function DashboardMenu() {
    const classes = useStyles();
    const history = useHistory()
    const [listButtons, setListButtons] = useState([])
    // List Items
    const listItems = ['سفارشات', 'محصولات', 'مدیریت وبسایت', 'کمپین ها',
        'دسته بندی ها', 'نظرات', 'امور مالی', 'حساب کاربری']
    const route = (item) => {
        switch (item) {
            case 'سفارشات' :
                return 'orders'
            case 'محصولات' :
                return 'products'
            case 'مدیریت وبسایت' :
                return 'management'
            case 'کمپین ها' :
                return 'campaigns'
            case 'دسته بندی ها' :
                return 'categories'
            case 'نظرات' :
                return 'comments'
            case 'امور مالی' :
                return 'fiance'
            case 'حساب کاربری' :
                return 'account'
            default:
                return null
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('Authorization');
        history.go(0)
    }
    const setBgColor = (element) => {
        for (let i = 0; i < listButtons.length; i++) {
            if (listButtons[i].innerText !== element.innerText) {
                listButtons[i].style.backgroundColor = ''
                listButtons[i].children[1].children[0].style.fontWeight = 'normal'
                listButtons[i].children[1].children[0].style.color = '#434343'
            } else {
                listButtons[i].style.backgroundColor = 'rgba(241, 101, 34, 0.1)'
                listButtons[i].children[1].children[0].style.fontWeight = 'bold'
                listButtons[i].children[1].children[0].style.color = '#F16522'
            }
        }
    }

    const forwardElement = (ref) => {
        let isDuplicate = false
        for (let i = 0; i < listButtons.length; i++) {
            if (ref.current === listButtons[i]) {
                isDuplicate = true
            }
        }

        !isDuplicate && setListButtons(prevState => {
            return [...prevState, ref.current]
        })
        if (!isDuplicate) {
            ref.current.style.backgroundColor = 'rgba(241, 101, 34, 0.1)'
            ref.current.children[1].children[0].style.fontWeight = 'bold'
            ref.current.children[1].children[0].style.color = '#F16522'

        }
        setBgColor(ref.current)
    }

    return (
        <List
            style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
        >
            <div>
                {
                    listItems.map((text, index) => (
                        text !== 'حساب کاربری' ?
                            <ListItemLink key={index} forwardElement={forwardElement} primary={text}
                                          to={`/admin/dashboard/${route(text)}`}/>
                            : null

                    ))
                }
            </div>
            <li key={8}>
                <ListItem key={18} onClick={handleSignOut} className={classes.exit} button>
                    <ListItemIcon>
                        <SvgIcon xmlns="http://www.w3.org/2000/svg" width="21.502" height="20.165"
                                 viewBox="0 0 21.502 20.165">
                            <g id="login-1" transform="translate(0.003 -0.75)" opacity="0.7">
                                <path id="Path_2578" data-name="Path 2578" d="M21.5,12H7.5"
                                      transform="translate(-0.751 -1.168)" fill="none" stroke="#434343"
                                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                <path id="Path_2579" data-name="Path 2579" d="M10.833,14.92,7.5,11.587l3.333-3.333"
                                      transform="translate(-0.751 -0.751)" fill="none" stroke="#434343"
                                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                <path id="Path_2580" data-name="Path 2580"
                                      d="M14.082,14.832v4a1.277,1.277,0,0,1-1.212,1.333H1.961A1.277,1.277,0,0,1,.75,18.832v-16A1.276,1.276,0,0,1,1.961,1.5H12.87a1.277,1.277,0,0,1,1.212,1.333v4"
                                      transform="translate(0)" fill="none" stroke="#434343" strokeLinecap="round"
                                      strokeLinejoin="round" strokeWidth="1.5"/>
                            </g>
                        </SvgIcon>
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.textStyle}} primary={'خروج'}/>
                </ListItem>

            </li>
        </List>
    )
}

export default DashboardMenu