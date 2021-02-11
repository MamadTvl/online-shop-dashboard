import React from "react";
import {Redirect, Switch} from 'react-router-dom';


import OrdersSection from "../DashboardComponents/Orders/OrdersSection";
import OrdersDetail from "../DashboardComponents/Orders/OrdersDetail";
import ProductsSection from "../DashboardComponents/Products/ProductsSection";
import Product from "../DashboardComponents/Products/Product";
import WebsiteManagement from "../DashboardComponents/Management/WebsiteManagement";
import CategorySection from "../DashboardComponents/Category/CategorySection";
import CampaignSection from "../DashboardComponents/Campaign/CampaignSection";
import FianceSection from "../DashboardComponents/Fiance/FianceSection";
import CommentsSection from "../DashboardComponents/Comments/CommentsSection";
import Discount from "../DashboardComponents/Campaign/Discount";
import CommentsList from "../DashboardComponents/Comments/CommentsList";
import Account from "../DashboardComponents/Account/Account";


function DashboardRoutes(props) {
    const path = props.section.pathname
    let found = true
    let orderCode

    const setSection = () => {
        switch (path) {
            case '/admin/dashboard':
                return <></>
            case '/admin/dashboard/orders' :
                return <OrdersSection/>

            case `/admin/dashboard/order`:
                return <OrdersDetail code={orderCode}/>

            case '/admin/dashboard/products' :
                return <ProductsSection/>

            case '/admin/dashboard/products/add' :
                return <Product edit={false}/>

            case '/admin/dashboard/product':
                return <Product edit={true}/>

            case '/admin/dashboard/management':
                return <WebsiteManagement/>

            case '/admin/dashboard/campaigns':
                return <CampaignSection/>

            case '/admin/dashboard/campaigns/add':
                return <Discount edit={false}/>

            case `/admin/dashboard/campaigns/discount`:
                return <Discount edit={true}/>

            case '/admin/dashboard/categories':
                return <CategorySection/>

            case '/admin/dashboard/comments': {
                return <CommentsSection/>
            }
            case '/admin/dashboard/comments/show': {
                return <CommentsList/>
            }

            case '/admin/dashboard/fiance': {
                return <FianceSection/>
            }

            case '/admin/dashboard/account': {
                return <Account/>
            }

            default:
                return found = false
        }
    }

    return (
        <>
            <Switch>
                {setSection()}
            </Switch>
            {
                !found ? <Redirect to="/"/> : null
            }

        </>
    )
}

export default DashboardRoutes
