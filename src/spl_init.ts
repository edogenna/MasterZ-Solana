import { 
    Keypair, 
    Connection, 
} from "@solana/web3.js";

import { createMint } from "@solana/spl-token";

// importing the private key of our wallet (created with ‘yarn keygen’ command)
import wallet from "../wallet.json";

// creating a new instance of Keypair by passing the private key of our wallet as an argument
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {

    // creating a new mint
    const mint = await createMint(
        connection, // connection to the Solana network
        keypair,   // payer of the transaction
        keypair.publicKey, // mint authority
        null, // freeze authority (optional)
        6, // number of decimals
    );

    // logging the mint address
    console.log("Mint Address:", mint.toBase58());
})()