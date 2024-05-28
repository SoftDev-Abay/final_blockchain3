import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[new PhantomWalletAdapter()]} autoConnect>
          <Router>
            <App />
          </Router>
        </WalletProvider>
      </ConnectionProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
