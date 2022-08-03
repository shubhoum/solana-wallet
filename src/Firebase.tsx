import {initializeApp} from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
import {getDatabase, ref, set, child, get} from "firebase/database";
import firebase from "firebase/compat";

/*const firebaseConfig = {
    apiKey: "AIzaSyALOcyX57fFug4IAcczjtjPVU3H7ORH_fY",
    authDomain: "solana-unity-josh.firebaseapp.com",
    databaseURL: "https://solana-unity-josh-default-rtdb.firebaseio.com",
    projectId: "solana-unity-josh",
    storageBucket: "solana-unity-josh.appspot.com",
    messagingSenderId: "853950148217",
    appId: "1:853950148217:web:dca7346cef277d961c2ea8"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

export async function SendData(UserName: string, Password: string, Address: string) {
    console.log("Sending");
    await set(ref(db, 'users/' + UserName), {
        username: UserName,
        Password: Password,
        Address: Address,
    }).then(() => {
        console.log("Sending Completed");
    }).catch(error => {
        console.log("error-->" + error);
    });

}

export async function CheckData(UserName: string) {
    var value = "";
    console.log("Checking");
    await get(child(dbRef, `users/${UserName}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            value = "Data available";
            return value;
        } else {
            value = "No data available";
            console.log("No data available");
            return value;
        }
    }).catch((error) => {
        value = "error";
        return value;
        console.error(error);
    });
    return value;
}*/

// Using REST API
export async function SendData(UserName: string, Password: string, Address: string) {
    let url = `https://solana-unity-josh-default-rtdb.firebaseio.com/users/${UserName}.json`;

    let headers = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserName,
            Password: Password,
            Address: Address

        }),
    }
    fetch(url, headers).then((res) => console.log(res))
}

export async function CheckData(UserName: string) {
    let url = `https://solana-unity-josh-default-rtdb.firebaseio.com/users/${UserName}.json`;
    let _json = null;
    await fetch(
        url)
        .then((res) => res.json())
        .then((json) => {
            _json = json;
        })
    return _json;
}

