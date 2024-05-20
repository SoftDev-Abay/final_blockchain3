const { Connection, PublicKey } = require('@solana/web3.js');
const anchor = require('@project-serum/anchor');
const fs = require('fs');
const path = require('path');

// Constants
const NETWORK = 'https://api.devnet.solana.com'; // Solana cluster URL
const PROGRAM_ID = '74CQ8ccFBViRxpRx4wgkUt4AWV11BgTQoK4w3L8mUGiM'; // Your program ID
const IDL_PATH = path.join(__dirname, '../../idl.json');

const idl = JSON.parse(fs.readFileSync(IDL_PATH, 'utf-8'));
const connection = new Connection(NETWORK, 'confirmed');
const wallet = new anchor.Wallet(anchor.web3.Keypair.generate());

async function initializeProgram() {
    // Create a Provider instance correctly
    const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        { preflightCommitment: 'confirmed' }
    );
    anchor.setProvider(provider);

    const programId = new PublicKey(PROGRAM_ID);
    return new anchor.Program(idl, programId, provider);
}

// Function to send a friend request
async function sendFriendRequest(initiator, receiver) {
    await program.rpc.sendRequest({
        accounts: {
            request: initiator.publicKey,
            initiator: initiator.publicKey,
            receiver: receiver,
            systemProgram: SystemProgram.programId,
        },
        signers: [initiator],
    });
    console.log("Friend request sent!");
}

// Function to accept a friend request
async function acceptFriendRequest(request, receiver) {
    await program.rpc.acceptRequest({
        accounts: {
            request: request,
            receiver: receiver.publicKey,
        },
        signers: [receiver],
    });
    console.log("Friend request accepted!");
}

async function getFriendRequests() {
    // Fetch all accounts of type FriendRequest
    const friendRequests = await program.account.friendRequest.all();
    
    // Process the retrieved friend requests
    friendRequests.forEach(request => {
        console.log('Friend Request:', request.account);
    });
}

module.exports = { initializeProgram, sendFriendRequest, acceptFriendRequest, getFriendRequests };
