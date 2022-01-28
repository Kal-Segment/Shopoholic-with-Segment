import React from 'react';
import {SideBar} from './SideBar';
import BasketCart from "./BasketCart";
import AccountButton from "./AccountButton";

const Layout = ({children})=>{
    return (
        <div className="view-container">
            
            {/* Website Header */}
            <div className="web-header">
                <div className="row" style={{margin: '20px'}}>
                    <div className="col-md-8">
                    <img className="img-logo" src="/uploads/phone123.png" 
                    alt="Apple iPhone 5c"></img>
                    <h1>The Phone Shop</h1>
                    </div>
                    
                    <div className="header-cart col-md-2">
                        <BasketCart />
                    </div>
    
                    <div className="header-account col-md-2">
                        <AccountButton />
                    </div>


                </div>
            </div>


            <div className="container">   
                <div className="row">
                    <div className="col-md-3">
                        <SideBar/>
                    </div>
                    <div className="col-md-9">
                        {children}
                    </div>
                </div>
            </div>
            
        </div>
    )
};

export default Layout;