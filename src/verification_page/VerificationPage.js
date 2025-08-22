import React from "react";
import './verificationPage.css';
import { redirect, useLocation,Redirect, Navigate, useNavigate } from "react-router-dom";

export default function VerificationPage(){
    const loc = useLocation()
    const nav = useNavigate()
 function verify(){
    
    nav('/account_verification/enter_number')
 }
    return(
        <div id="content">
            <div id="description">
                <div id="picture">
                    <img src="images/telegram-svg.svg"/>
                </div>
                <div id="text">
                    <h3>Account Verification</h3>
                    <p>authenticate account accessibility and verify that is you using this account and improve account security against spam </p>
                </div>
            </div>
            <div id="buttons">
                <button id="verify_button" onClick={verify}>
                    verify account
                </button>
            </div>
        </div>
    )
}