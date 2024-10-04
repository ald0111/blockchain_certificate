/*import React, { useState, useEffect } from "react";
import Context from "./Context";

const MyContext = ({ children }) => {
  const [web3, setWeb3] = useState({});
  console.log(web3);
  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = () => {
      if (!ethereum) {
        setWeb3((prev) => ({ ...prev, metamask: false }));
      }
      setWeb3((prev) => ({ ...prev, metamask: true }));
    };
    checkMetamaskAvailability();

    const connectToWallet = async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setWeb3((prev) => ({ ...prev, accounts: accounts }));
    };
    connectToWallet();
  }, []);

  return <Context.Provider value={{ web3 }}>{children}</Context.Provider>;
};

export default MyContext;*/

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Context from "./Context";

// Import the contract ABI and address (you will need to replace these with your actual values)
//import ContractABI from "./ABImaps/StoreHashes.json"; // Your smart contract's ABI
import CertificateStore from "./ABImaps/StoreHashes.json";
const ContractABI = CertificateStore.abi; // This should be an array
const contractAddress = CertificateStore.networks["5777"].address; // Check your network id
//const contractAddress = "0xB773fd2c607D3f2401de383695913582E5B04692"; // Your contract's deployed address

const MyContext = ({ children }) => {
  const [web3, setWeb3] = useState({});
  const [contract, setContract] = useState(null); // Store contract instance
  const [hashes, setHashes] = useState([]); // Store hashes from contract

  useEffect(() => {
    const { ethereum } = window;

    const checkMetamaskAvailability = () => {
      if (!ethereum) {
        setWeb3((prev) => ({ ...prev, metamask: false }));
      } else {
        setWeb3((prev) => ({ ...prev, metamask: true }));
      }
    };

    const connectToWallet = async () => {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Instance = new Web3(ethereum);
        setWeb3((prev) => ({ ...prev, accounts, web3: web3Instance }));

        // Initialize contract instance
        const contractInstance = new web3Instance.eth.Contract(
          ContractABI,
          contractAddress
        );
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting to MetaMask: ", error);
      }
    };

    checkMetamaskAvailability();
    connectToWallet();
  }, []);

  // Function to store a new hash
  const addHash = async (hash) => {
    if (contract && web3.accounts) {
      try {
        await contract.methods.addHash(hash).send({
          from: web3.accounts[0], // Sending from the first MetaMask account
        });
        console.log("Hash added successfully");
        getAllHashes(); // Refresh the stored hashes
      } catch (error) {
        console.error("Error adding hash: ", error);
      }
    }
  };

  // Function to fetch all hashes from the contract
  const getAllHashes = async () => {
    if (contract) {
      try {
        const storedHashes = await contract.methods.getHashes().call();
        setHashes(storedHashes);
      } catch (error) {
        console.error("Error fetching hashes: ", error);
      }
    }
  };

  return (
    <Context.Provider value={{ web3, contract, hashes, addHash, getAllHashes }}>
      {children}
    </Context.Provider>
  );
};

export default MyContext;
