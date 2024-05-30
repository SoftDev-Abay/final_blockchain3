import React from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

const getProvider = (wallet) => {
    if (!wallet) {
        return null;
    }
    const network = 'https://api.devnet.solana.com';
    const connection = new Connection(network, 'processed');

    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: 'processed',
    });
    return provider;
};

const WalletConect = () => {
    const wallet = useAnchorWallet();
    if (!wallet) return;
    console.log('provider:', getProvider(wallet));
    console.log('wallet:', wallet.publicKey.to);
    console.log('base account:', baseAccount.publicKey.toString());

    const baseAccount = wallet.publicKey.toBase58();
    const provider = getProvider(wallet);
    const walletPublicKey = wallet.publicKey.toString();

    return (
        <div>
            <h1>Wallet Connect</h1>
            <h2>Wallet Public Key: {walletPublicKey}</h2>
            <h2>Base Account: {baseAccount}</h2>
            <h2>Provider: {provider}</h2>

            <button onClick={() => wallet.disconnect()}>Disconnect</button>
        </div>
    );
};

export default WalletConect;
