import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

// importing the private key of our wallet (created with ‘yarn keygen’ command)
import wallet from "../wallet.json";

// creating a new instance of Keypair by passing the private key of our wallet as an argument
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// creating a new connection with Solana's devnet cluster
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {
    try {
        
        // request an airdrop of 1 SOL to our wallet using the requestAirdrop method
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      // qallet address to send funds to
            1 * LAMPORTS_PER_SOL    // quantity of SOL requered (1 SOL = 1_000_000_000 LAMPORTS)
        );

        // waiting for confirmation of the transaction and logging the transaction link on Solana's explorer
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();
