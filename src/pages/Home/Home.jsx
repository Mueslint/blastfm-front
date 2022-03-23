import React, {useState, useEffect} from 'react';
import { Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
import {
  Program, Provider, web3
} from '@project-serum/anchor';

import { OneTimeInitSection, GifList, GifForm }from '../../components';
import idl from '../../idl.json';
import kp from '../../keypair.json'

const { SystemProgram } = web3;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed" // "processed" is our node, "finalized" is more trustable but longer
}


const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection, window.solana, opts.preflightCommitment,
    );
    return provider;
}

const Home = ({walletAddress}) => {
    const [inputValue, setInputValue] = useState('');
    const [gifList, setGifList] = useState([]);

    const onInputChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
    };
    
    const createGifAccount = async () => {
        try {
          const provider = getProvider();
          const program = new Program(idl, programID, provider);
          await program.rpc.startStuffOff({
            accounts: {
              baseAccount: baseAccount.publicKey,
              user: provider.wallet.publicKey,
              systemProgram: SystemProgram.programId,
            },
            signers: [baseAccount]
          });
          console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
          await getGifList();
      
        } catch(error) {
          console.log("Error creating BaseAccount account:", error)
        }
    }

    const getGifList = async() => {
        try {
          const provider = getProvider();
          const program = new Program(idl, programID, provider);
          const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
          
          setGifList(account.gifList)
      
        } catch (error) {
          setGifList(null);
        }
    };

    const sendGif = async () => {
        if (inputValue.length === 0) {
          return;
        }

        setInputValue('');

        try {
          const provider = getProvider();
          const program = new Program(idl, programID, provider);
      
          await program.rpc.addGif(inputValue, {
            accounts: {
              baseAccount: baseAccount.publicKey,
              user: provider.wallet.publicKey,
            },
          });
      
          await getGifList();
        } catch (error) {
          console.log("Error sending GIF:", error)
        }
    };


    useEffect(() => {
        if (walletAddress) {
            getGifList();
        }
    }, [walletAddress]);

    if (gifList === null) 
        return (<OneTimeInitSection createGifAccount={createGifAccount}/>);
      
    return (
        <div className="connected-container">
            <GifForm 
                inputValue={inputValue} 
                onInputChange={onInputChange}
                sendGif={sendGif}
            />
            <GifList gifList={gifList} />
        </div>
  )
}

export default Home;