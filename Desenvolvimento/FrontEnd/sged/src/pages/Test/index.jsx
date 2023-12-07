import React from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";

export default function Test() {
    return (
        <div className="flex flex-col min-h-full">
            <NavBar />
            <div className="h-full" >
                <SideBar />
            </div>
        </div>
    )
}