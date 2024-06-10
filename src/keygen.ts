import { Keypair } from "@solana/web3.js";

// generating new Keypair
const keypair = Keypair.generate();

// logging the public and private keys
console.log(`Public Key: ${keypair.publicKey.toBase58()} \n\n Secret Key: [${keypair.secretKey}]`)
