import React from "react";
import {Redirect, Route} from "react-router-dom";
import DashboardLayout from "../DashboardForms/DashboardLayout";
import {useAuth} from "../utills/Auth";

function PrivateAdminRoute(props) {
    const auth = useAuth()
    document.getElementById("root").hidden = auth.loading
    if (auth.loading) {
        return null
    }
    return (
        auth.isLogin ?
            <DashboardLayout>
                <Route path={'/admin/dashboard'}>
                    {props.children}
                </Route>
            </DashboardLayout>
            : <Route><Redirect to={'/admin/login'}/></Route>
    )

}

export default PrivateAdminRoute