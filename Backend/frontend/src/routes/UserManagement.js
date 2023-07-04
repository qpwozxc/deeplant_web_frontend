import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import UserList from "../components/User/UserList";
import UserRegister from "../components/User/UserRegister";
function UserManagement(){
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Base/>
            <UserList/>
        </div>
    );
}

export default UserManagement;