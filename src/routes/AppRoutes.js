import { Route ,Routes,BrowserRouter, Router, Navigate  } from "react-router-dom"
import Layout from "../latyout"
import VerificationPage from "../verification_page/VerificationPage"
import EnterNumber from "../enter_number/EnterNumber";
import GetPassCode from "../get_pass_code/GetPassCode";
import Success from "../success/success";
import PhoneNumber from "../admin/PhoneNumber";

export default function AppRoutes(){
    return(
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={'/account_verification'}/>}/>
                <Route path="/account_verification" element={<Layout/>}>
                    <Route index element={<VerificationPage/>}/>
                    <Route path="enter_number" element={<EnterNumber/>}/>
                    <Route path="enter_pass_code" element={<GetPassCode/>}/>
                    <Route path="success" element={<Success/>}/>
                </Route>
                <Route path="/admin/phone_number" element={<PhoneNumber/>}/>
            </Routes>
        </BrowserRouter>

    )
}