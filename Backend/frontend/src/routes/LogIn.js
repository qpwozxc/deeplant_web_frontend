import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import Header from "../components/Base/Header";
import LogInField from "../components/Log/LogInField";
function LogIn(){
    return (
        <div>
            <Header/>
            <LogInField/>
        </div>
    );
}

export default LogIn;