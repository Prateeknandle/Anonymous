import React from 'react'
import {NavLink} from "react-router-dom";

const Errorpage = () => {
    return (
        <div className="text-center">
            <h1>404</h1>
            <h1>Soory, this page is not available</h1>
            <NavLink className="navbar-brand" to="/">Home Page</NavLink>
        </div>
    )
}

export default Errorpage
