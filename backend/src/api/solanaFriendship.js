const {
	Connection,
	PublicKey,
	SystemProgram,
	Keypair,
} = require('@solana/web3.js');
const anchor = require('@project-serum/anchor');
const fs = require('fs');
const path = require('path');
const User = require('../models/User-model');

const NETWORK = 'https://api.devnet.solana.com';
const PROGRAM_ID = 'DbBS9aWMY4V5bQQtjf376r8aGNXBYxhYk9heqduc6WJf';
const IDL_PATH = path.join(__dirname, '../../idl.json');

const idl = JSON.parse(fs.readFileSync(IDL_PATH, 'utf-8'));
const connection = new Connection(NETWORK, 'confirmed');
const wallet = new anchor.Wallet(anchor.web3.Keypair.generate());
console.log(wallet.payer);

let program;

async function initializeProgram() {
	const provider = new anchor.AnchorProvider(connection, wallet, {
		preflightCommitment: 'confirmed',
	});
	anchor.setProvider(provider);
	const programId = new PublicKey(PROGRAM_ID);
	program = new anchor.Program(idl, programId, provider);
	return program;
}

async function sendFriendRequest(initiator, receiver) {
	console.log(initiator, receiver);
	const initiatorPubKey = new PublicKey(initiator);
	const receiverPubKey = new PublicKey(receiver);
	console.log(initiatorPubKey, receiverPubKey);
	console.log(initiatorPubKey._bn);

	// Send request through Solana
	await program.rpc.sendRequest({
		accounts: {
			request: initiatorPubKey,
			initiator: initiatorPubKey,
			receiver: receiverPubKey,
			systemProgram: SystemProgram.programId,
		},
		signers: [wallet.payer],
	});

	// Update MongoDB
	await User.findOneAndUpdate(
		{ walletAddress: receiver },
		{ $addToSet: { friendRequests: initiator } }
	);

	console.log('Friend request sent!');
}

// Inside solanaFriendship.js
async function acceptFriendRequest(request, receiver) {
	const requestPubKey = new PublicKey(request);
	const receiverPubKey = new PublicKey(receiver);

	// Accept request through Solana
	await program.rpc.acceptRequest({
		accounts: {
			request: requestPubKey,
			receiver: receiverPubKey,
		},
		signers: [wallet.payer],
	});

	// Update MongoDB
	await User.findOneAndUpdate(
		{ walletAddress: receiver },
		{ $pull: { friendRequests: request }, $addToSet: { friends: request } }
	);
	await User.findOneAndUpdate(
		{ walletAddress: request },
		{ $addToSet: { friends: receiver } }
	);

	console.log('Friend request accepted!');
}

async function getFriendRequests() {
	const friendRequests = await program.account.friendRequest.all();
	friendRequests.forEach((request) => {
		console.log('Friend Request:', request.account);
	});
}

module.exports = {
	initializeProgram,
	sendFriendRequest,
	acceptFriendRequest,
	getFriendRequests,
};
