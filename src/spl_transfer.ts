import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
} from "@solana/spl-token";

// importing the private key of our wallet (created with ‘yarn
import wallet from "../wallet.json";

// creating a new instance of Keypair by passing the private key of our wallet as an argument
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// mint address (created with ‘yarn createMint' command)
const mint = new PublicKey("FxQgRH9xgh2mVa2yYV5UjUErX6F612fWJu95AtCByUVZ");

// ata (created with ‘yarn mintToken' command)
const fromAta = new PublicKey("2qqc8Td273PAUXbsd8udZSobNachhWBhqS6s4DFb9cVZ");

// generating a new keypair and logging the public key
const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {
    // creating an associated token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    // getting the associated token account address
    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    // amount in ATA
    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    // amount to transfer
    const amount = 10e5;

    // transferring the amount from the associated token account to the new associated token account
    await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair,
        amount
    );

    // logging the amount transferred and the destination address
    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
})()