import React, { useState } from "react";
import "./App.css";
import { SecretNetworkClient, MetaMaskWallet } from "secretjs";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [secretWalletAddress, setSecretWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      const [ethAddress] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const wallet = await MetaMaskWallet.create(window.ethereum, ethAddress);

      const secretjs = new SecretNetworkClient({
        url: "https://api.pulsar3.scrttestnet.com",
        chainId: "pulsar-3",
        wallet: wallet,
        walletAddress: wallet.address,
      });

      console.log("Connected to Secret Network", secretjs);
      setSecretWalletAddress(secretjs.address);
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h5>
          Connect your Metamask wallet to receive your Secret wallet address
        </h5>
        <button onClick={connectWallet} disabled={isConnected}>
          {isConnected ? "Connected" : "Connect Wallet"}
        </button>
        <h6>
          {isConnected
            ? `Your Secret wallet address is: ${secretWalletAddress}`
            : ""}
        </h6>
      </header>
    </div>
  );
}

export default App;
