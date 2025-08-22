import { Outlet } from "react-router-dom";


export default function Layout(){
    return (
        <div id="container" style={{backgroundColor:'white',color:'black'}}>
            <Outlet/>
        </div>
    );
}