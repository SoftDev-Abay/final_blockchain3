import * as anchor from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react";
import idl from "../../features/friends/idl.json";
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

const BlogContext = createContext();

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("Parent must be wrapped inside BlogProvider");
    }
    return context;
};

export const BlogProvider = ({ children }) => {
    const [transactionPending, setTransactionPending] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();

    console.log("anchorWallet", anchorWallet);
    console.log("connection", connection);

    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
            return new anchor.Program(idl, PROGRAM_KEY, provider);
        }
    }, [connection, anchorWallet]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            if (program && anchorWallet?.publicKey) {
                try {
                    const requests = await program.account.friendRequest.all([
                        {
                            memcmp: {
                                offset: 8,
                                bytes: anchorWallet.publicKey.toBase58(),
                            },
                        },
                    ]);
                    setFriendRequests(requests);

                    const acceptedFriends = requests
                        .filter(request => request.account.accepted)
                        .map(request => (request.account.initiator.equals(anchorWallet.publicKey) ? request.account.receiver : request.account.initiator));

                    setFriends(acceptedFriends);
                } catch (error) {
                    console.error('Error fetching friend requests:', error);
                }
            }
        };

        fetchFriendRequests();
    }, [program, anchorWallet, transactionPending]);

    const sendRequest = async (receiverPublicKey) => {
        if (program && anchorWallet?.publicKey) {
            setTransactionPending(true);
            try {
                const [requestPda] = findProgramAddressSync(
                    [utf8.encode('request'), anchorWallet.publicKey.toBuffer(), receiverPublicKey.toBuffer()],
                    program.programId
                );
    
                await program.methods
                    .sendRequest()
                    .accounts({
                        request: requestPda,
                        initiator: anchorWallet.publicKey,
                        receiver: receiverPublicKey,
                        systemProgram: SystemProgram.programId,
                    },
                )
                .signers([anchorWallet.publicKey])
                .rpc();
    
                alert('Friend request sent successfully');
                // Fetch the updated friend requests list
                const updatedRequests = await program.account.friendRequest.all();
                setFriendRequests(updatedRequests);
            } catch (error) {
                console.error('Error sending friend request:', error);
                alert('Failed to send friend request.');
            } finally {
                setTransactionPending(false);
            }
        }
    };

    const respondToRequest = async (requestPublicKey, accept) => {
        if (program && anchorWallet?.publicKey) {
            setTransactionPending(true);
            try {
                await program.methods
                    .respondToFriendRequest(accept)
                    .accounts({
                        request: requestPublicKey,
                        receiver: anchorWallet.publicKey,
                    })
                    .rpc();

                alert(`Friend request ${accept ? 'accepted' : 'rejected'} successfully`);
                // Fetch the updated friend requests list
                const updatedRequests = await program.account.friendRequest.all();
                setFriendRequests(updatedRequests);
            } catch (error) {
                console.error(`Error ${accept ? 'accepting' : 'rejecting'} friend request:`, error);
                alert(`Failed to ${accept ? 'accept' : 'reject'} friend request.`);
            } finally {
                setTransactionPending(false);
            }
        }
    };

    return (
        <BlogContext.Provider
            value={{
                sendRequest,
                respondToRequest,
                friendRequests,
                friends,
                transactionPending,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};
