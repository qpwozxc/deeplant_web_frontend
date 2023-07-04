import { useState, useEffect } from "react"
import Sidebar from "./Sidebar";
import Header from "./Header";
import Menu from "./Menu";
function Base(){
    return(
        <div style={{ marginBottom: "100px" }}>
            <Header/>
            <Sidebar width={280}>
                <Menu/>
            </Sidebar>  

        </div>
      );
}

export default Base;