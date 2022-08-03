import React from 'react';
import './App.css';
import {CheckData, SendData} from "./Firebase";
import {Wallet} from "./Wallet";


import {
    Database
} from './Database'


class Signup extends React.Component {


    private userData: any = {};
    private buttonName: string = ""
    private isPasswordAllocated: string = "";


    async isDataAvailable(username: string) {
        const data = await CheckData(username);

        if (data !== null) {
            return true
        }
        return false
    }

    async connectMySQL() {
        let response = await fetch(`http://localhost:3000/connect/${localStorage.getItem("username")}/${localStorage.getItem("password")}/${localStorage.getItem("address")}`);
        console.log(response)
    }

    async addData() {

    }


    state = {
        show: true,
        message: "",
        color: "",
        usernameAvailable: false,
        passwordAvailable: false,
        showWallet: true,
        saveData: true,
        disableButton: true
    };


    writeUserData = () => {
        console.log("DATA SAVED");
    };

    getUserData = () => {
        console.log("DATA COLLECTED");
    };

    changeUI() {
        this.setState({show: !this.state.show});
        this.setState({showWallet: !this.state.showWallet});
    }

    changeMessage(msg: string, color: string) {
        this.setState({message: msg});
        this.setState({color: color});

    }

    onValueChange = (key: string, value: string) => {
        this.userData[key] = value;
    }

    onUpdate(event: any, message: string, color: string, checkAvailability: boolean) {
        this.onValueChange("username", event.target.value)
        this.state.usernameAvailable = checkAvailability;
        this.changeMessage(message, color)
    }

    reset = () => {
        localStorage.removeItem("disconnect");
        localStorage.removeItem("address")
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Rage Effect Solana Wallet</h1>
                    <div>
                        {this.reset}
                    </div>
                    <div>
                        {

                            this.state.show ?
                                <div>
                                    <input id="username"
                                           type="text"
                                           placeholder="Enter username"
                                           onChange={
                                               async (evt) => {

                                                   if (evt.target.value === '') {
                                                       this.onUpdate(evt, "", "#000000", false)
                                                       return
                                                   }

                                                   if (await this.isDataAvailable(evt.target.value)) {
                                                       this.onUpdate(evt, "Username is not available", "#ff0000", false)
                                                   } else {
                                                       this.onUpdate(evt, "Username is available", "#00ff00", true)
                                                   }
                                               }
                                           }/>
                                    <br/>
                                    <a style={
                                        {
                                            color: this.state.color
                                        }
                                    }>
                                        {this.state.message}
                                    </a>

                                    <br/><br/>

                                    <input id="password"
                                           type="password"
                                           placeholder="Enter password"
                                           onChange={
                                               (evt) => {
                                                   this.onValueChange("password", evt.target.value)
                                                   this.isPasswordAllocated = evt.target.value;
                                               }
                                           }
                                    />
                                    <br/><br/>
                                    <button
                                        id="btn"

                                        onClick={
                                            () => {
                                                if (this.state.usernameAvailable && this.isPasswordAllocated !== "") {
                                                    this.changeUI(); // Address Connect
                                                    localStorage.setItem("username", this.userData["username"])
                                                    localStorage.setItem("password", this.userData["password"])
                                                    localStorage.removeItem("address");
                                                } else {
                                                    //Pass
                                                }

                                            }
                                        }>
                                        Sign Up
                                    </button>

                                </div> :
                                !this.state.showWallet ?
                                    <div>
                                        <Wallet/>
                                        <br/>
                                        <button id="btn"
                                                style={{float: "left"}}
                                                onClick={() => {
                                                    this.setState({showWallet: !this.state.showWallet});
                                                    this.setState({saveData: !this.state.saveData});
                                                }
                                                }>
                                            Save
                                        </button>
                                    </div>
                                    : !this.state.saveData ?
                                        <div>
                                            <Database/>
                                        </div> : null

                        }
                    </div>
                </header>
            </div>
        );
    }
}

export default Signup;
