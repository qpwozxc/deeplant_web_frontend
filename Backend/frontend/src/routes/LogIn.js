import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import Header from "../components/Base/Header";
import LogInField from "../components/Log/LogInField";
function LogIn(){
    return (
        <div>
            <Header/>

            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <LogInField/>
        </div>
        </div>
    );
}

export default LogIn;