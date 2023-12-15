import React from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";

export default function Test() {
    return (
        <div className="h-screen">
            <div className="w-full h-[6.7%]">
                <NavBar />
            </div>
            <div className="w-1/6 h-full overflow-y-hidden">
                <SideBar />
            </div>
        </div>
    );
}
