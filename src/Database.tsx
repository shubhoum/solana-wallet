import {CheckData, SendData} from "./Firebase";
import {useState} from "react";

export const Database = () => {

    async function send(username: string, password: string, address: string) {
        const data = await CheckData(username);

        if (data !== null) {
            console.log("Return");
            return;
        }
        await SendData(username, password, address);
    }




    console.log(localStorage.getItem("address"))

    if (localStorage.getItem("address") !== null && localStorage.getItem("address") !== undefined)
        send("" + localStorage.getItem("username"), "" + localStorage.getItem("password"), "" + localStorage.getItem("address"))


    return (
        <>
            <button id="btn" onClick={
                () => {
                    window.location.reload();
                }
            }>
                Refresh
            </button>
            <br/><br/>
            <div style={
                {
                    whiteSpace: "pre-line",
                    fontStyle: "italic",
                    fontWeight: "bold"
                }
            }>
                {
                    localStorage.getItem("address") === null ? "No wallet found\nPlease refresh the page and connect your wallet" : "Thank you for sign up\n\n Go Back To Game"
                }
            </div>
            <>{
                () => {
                    localStorage.removeItem("address");
                }
            }
            </>
        </>
    )
}




