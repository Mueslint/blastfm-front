import React, { useEffect, useState } from 'react';

import {Home, Landing} from './pages';
import { AppHeader, AppFooter } from './components';

import './App.css';

// SystemProgram is a reference to the Solana runtime!

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };
  
  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  

  return (
    <div className="App">
			<div className={walletAddress ? 'authed-container' : 'container'}>
        <AppHeader/>
          {!walletAddress && <Landing connectWallet={connectWallet}/>}
          {walletAddress && <Home walletAddress={walletAddress} />}
        <AppFooter />
      </div>
    </div>
  );
};

export default App;