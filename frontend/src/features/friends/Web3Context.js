// Web3/Solana Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const establishConnection = async () => {
        try {
            const url = clusterApiUrl('devnet'); // or 'mainnet-beta' for mainnet
            const connection = new Connection(url);
            setConnection(connection);
        } catch (error) {
            console.error('Failed to establish connection:', error);
        }
        };

        establishConnection();
    }, []);

    return (
        <Web3Context.Provider value={{ connection }}>
        {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
