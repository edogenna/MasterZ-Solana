import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    mintTo,
    getOrCreateAssociatedTokenAccount,
 } from "@solana/spl-token";

// importing the private key of our wallet (created with ‘yarn
import wallet from "../wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// mint address (created with ‘yarn createMint' command)
const mint = new PublicKey("FxQgRH9xgh2mVa2yYV5UjUErX6F612fWJu95AtCByUVZ");

(async () => {
    // creating an associated token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey,
    );

    // getting the associated token account address
    const ata = tokenAccount.address;
    console.log("Associated Token Account: ", ata.toBase58());

    // ammount to mint
    const amount = 10e6;

    // minting the amount to the associated token account
    await mintTo(
        connection,
        keypair,
        mint,
        ata,
        keypair.publicKey,
        amount
    );

    // logging the amount minted and the destination address
    console.log("Minted", amount, "to", ata.toBase58());

})()