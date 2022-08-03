import {useWallet} from '@solana/wallet-adapter-react';
import React, {useMemo} from 'react';

export const WalletMulti = () => {

    const {publicKey} = useWallet(); // get public key form the useWallett
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

    console.log("isConnected "+localStorage.getItem("connected"))

    if (localStorage.getItem("connected") === "false") {
        localStorage.removeItem("address") // Remove previous same address if disconnected button is pressed
    }

    else if (base58 !== undefined && localStorage.getItem("connected") === "true"){
        localStorage.setItem("address",base58+"") // set the address of the wallet if wallet is connected and base58 has wallet address
        console.log(base58)
    }

    return (
        <>
        </>
    )
};
