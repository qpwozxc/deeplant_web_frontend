import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import LogInField from "../components/Log/LogInField";
function LogIn(){
    return (
        <div>
            <Base/>
            <LogInField/>
        </div>
    );
}

export default LogIn;