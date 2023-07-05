import React from 'react';
import Base from "../components/Base/BaseCmp";
import UserList from "../components/User/UserList";

function UserManagement(){
    return (
        <div>
            <Base/>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <UserList/>
        </div>
        </div>
    );
}

export default UserManagement;
