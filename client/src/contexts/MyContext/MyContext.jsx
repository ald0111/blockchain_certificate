import React, { useState, useEffect } from "react";
import Context from "./Context";

const MyContext = ({ children }) => {
  const [web3, setWeb3] = useState({});

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

export default MyContext;
