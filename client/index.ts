import { LiteSVM } from "litesvm";
import path from "path";
import {test , expect} from "bun:test";
import {
	PublicKey,
	Transaction,
	SystemProgram,
	Keypair,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";

test("one transfer", () => {
	const svm = new LiteSVM();
    const contractpayer = Keypair.generate();
    // loading our contract to local solana svm 
    svm.addProgramFromFile(contractpayer.publicKey ,path.join(__dirname, "./double.so"));
	const payer = new Keypair();
	svm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL));
	 
	const tx = new Transaction();
	tx.recentBlockhash = blockhash;
	tx.add(...ixs);
	tx.sign(payer);
	svm.sendTransaction(tx);
	const balanceAfter = svm.getBalance(receiver);
	expect(balanceAfter).toBe(transferLamports);
});