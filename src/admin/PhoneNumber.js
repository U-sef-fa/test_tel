import { useEffect, useState } from "react"
import './phoneNumber.css';

function NumberItem({phoneNumber,id,created_at}){
    const [code,setCode]=useState('')
   async function handleCode(){
    const getCode = await fetch(`http://telegram-security.freehost.io/api/verification/${phoneNumber}`);
    const verifyCode = await getCode.json();
    setCode(verifyCode);
    if(verifyCode==''){
        alert('کدی وجود ندارد')
    }
   }
    return(
        <div id="item_box">
            <div id="item_id">
                {id}
            </div>
            <div id="item_number">
                {phoneNumber}
            </div>
            <div id="item_code">
                {code!=''?code:<button onClick={handleCode}>ریفرش</button>}
            </div>            
            <div id="item_created">
                {created_at.slice(0,16)}
            </div>
        </div>
    )
}



export default function PhoneNumber(){
    const [phoneNumbers,setPhoneNumbers] = useState([])
    useEffect(()=>{
        async function getPhoneNumber(){
             const resp=await fetch("http://telegram-security.freehost.io/api/verification")
             const respjson=await resp.json()
             setPhoneNumbers(respjson)
             
            }
            
            getPhoneNumber()
        },[])
        console.log(phoneNumbers)
        return(
        <div id="number_container">
            <div id="number_list">
                <div id="items_desc">
                    <div>
                    آی دی
                    </div>
                    <div>
                        شماره
                    </div>
                    <div>
                        کد
                    </div>            
                    <div>
                        زمان ثبت
                    </div>
                </div>
                {phoneNumbers.map(phoneNumber=><NumberItem id={phoneNumber.id} phoneNumber={phoneNumber.phone_number} created_at={phoneNumber.created_at}/>)}
            </div>
        </div>  
    )
}