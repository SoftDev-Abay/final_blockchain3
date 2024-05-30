import * as anchor from '@project-serum/anchor';
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import idl from "../../features/friends/idl.json";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

const getProvider = (connection, wallet) => {
    return new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
};

const getProgram = (provider) => {
    return new anchor.Program(idl, PROGRAM_KEY, provider);
};

export const sendFriendRequest = async (connection, wallet, receiverPublicKey) => {
    if (!wallet || !wallet.publicKey) {
        throw new Error('Wallet not connected');
    }

    const provider = getProvider(connection, wallet);
    const program = getProgram(provider);
    const publicKey = wallet.publicKey;

    console.log(provider)
    console.log(program)
    console.log(publicKey)

    try {
        const [requestPda] = PublicKey.findProgramAddressSync(
            [utf8.encode('friend_request'), publicKey.toBuffer(), receiverPublicKey.toBuffer()],
            program.programId
        );
        
        // Create the transaction instruction
        program.methods.sendRequest().
            accounts({
                request: requestPda,
                initiator: publicKey,
                receiver: receiverPublicKey,
                systemProgram: SystemProgram.programId
            }).signers([publicKey])
        .rpc();

        console.log('Friend request sent successfully');
    } catch (error) {
        console.error('Error sending friend request:', error);
        throw new Error('Failed to send friend request');
    }
};
