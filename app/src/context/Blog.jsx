import * as anchor from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

import idl from "../idl.json";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("Parent must be wrapped inside PostsProvider");
  }

  return context;
};

export const BlogProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);
  const [posts, setPosts] = useState([]);
  const [transactionPending, setTransactionPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastPostId, setLastPostId] = useState();
  const [request, setRequest] = useState([]);
  const [friends, setFreinds] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(idl, PROGRAM_KEY, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    const start = async () => {
      if (program && publicKey) {
        try {
          const [userPda] = await findProgramAddressSync(
            [utf8.encode("user"), publicKey.toBuffer()],
            program.programId
          );
          const user = await program.account.userAccount.fetch(userPda);
          if (user) {
            setInitialized(true);
            setUser(user);
            setLastPostId(user.lastPostId);
            const postAccounts = await program.account.postAccount.all(
              publicKey.toString()
            );
            setPosts(postAccounts);
            setRequest(user.friendRequests);
            setFreinds(user.friends);
            const userAccounts = await program.account.userAccount.all();
            setUserAccounts(userAccounts);
          }
        } catch (error) {
          console.log(error);
          setInitialized(false);
        }
      }
    };

    start();
  }, [program, publicKey, transactionPending]);

  const initUser = async (name = "abay", avatar = "asdsad", bio = "best") => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [userPda] = findProgramAddressSync(
          [utf8.encode("user"), publicKey.toBuffer()],
          program.programId
        );

        await program.methods
          .initUser(name, avatar, bio)
          .accounts({
            userAccount: userPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        setInitialized(true);
      } catch (error) {
        console.log(error);
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const createPost = async (title, content, image) => {
    if (program && publicKey) {
      setTransactionPending(true);
      try {
        const [userPda] = findProgramAddressSync(
          [utf8.encode("user"), publicKey.toBuffer()],
          program.programId
        );
        const [postPda] = findProgramAddressSync(
          [
            utf8.encode("post"),
            publicKey.toBuffer(),
            Uint8Array.from([lastPostId]),
          ],
          program.programId
        );

        await program.methods
          .createPost(title, content, image)
          .accounts({
            userAccount: userPda,
            postAccount: postPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        setShowModal(false);
      } catch (error) {
        console.error(error);
      } finally {
        setTransactionPending(false);
      }
    }
  };
  const sendFriendRequest = async (receiverPublicKey) => {
    if (program && publicKey) {
      setTransactionPending(true);
      try {
        const [senderPda] = findProgramAddressSync(
          [utf8.encode("user"), publicKey.toBuffer()],
          program.programId
        );

        const receiverPublicKeyObj =
          typeof receiverPublicKey === "string"
            ? new PublicKey(receiverPublicKey)
            : receiverPublicKey;

        await program.methods
          .sendFriendRequest()
          .accounts({
            sender: senderPda,
            receiver: receiverPublicKeyObj,
            authority: publicKey,
          })
          .rpc();

        setTransactionPending(false);
      } catch (error) {
        console.error("Error sending friend request:", error);
        setTransactionPending(false);
      }
    }
  };

  const acceptRequest = async (senderPublickey) => {
    senderPublickey.to
    if (program && publicKey) {
      setTransactionPending(true);
      try {
        const [receiverPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);
        
        // const senderPublickey =
        //   typeof senderPublickey === "string"
        //     ? new PublicKey(senderPublickey)
        //     : senderPublickey;


        // const senderPublickey = typeof senderPublickey === 'string' ? new PublicKey(senderPublickey) : senderPublickey;
        await program.methods
          .acceptFriendRequest()
          .accounts({
            sender: senderPublickey,
            receiver: receiverPda, 
            authority: publicKey,
          })
          .rpc();
  
        setTransactionPending(false);
      } catch (error) {
        console.error('Error sending friend request:', error);
        setTransactionPending(false);
      }
    }
  };


  const getPersonByPublicKey = (publicKey) => {
    return userAccounts.find((user) => user.publicKey.toBase58() === publicKey);
  };

  const getBlogByPublicKey = (publicKey) => {
    return posts.find((post) => post.publicKey.toBase58() === publicKey);
  };

  return (
    <BlogContext.Provider
      value={{
        user,
        friends,
        request,
        userAccounts,
        posts,
        initialized,
        initUser,
        createPost,
        showModal,
        setShowModal,
        sendFriendRequest,
        getPersonByPublicKey,
        getBlogByPublicKey,
        acceptRequest
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
