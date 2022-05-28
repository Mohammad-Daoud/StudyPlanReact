import React from "react"


export default function Navbar(){
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const schoolName = params.get("schoolName");
    const departmentName= params.get("departmentName");
    const year = params.get("year");
    const username = params.get("username");
    const firstName = params.get("fname");
    const lastName = params.get("lname");
    const studentID = params.get("studentID");
    return (
        <nav className="list" style={{
            "position":"fixed",
            "zIndex":"999"
        }}>
            
        </nav>
    )
}