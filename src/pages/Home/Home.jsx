import React, {useState, useEffect} from 'react';
import { Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
import {
  Program, Provider, web3
} from '@project-serum/anchor';

import { OneTimeInitSection, MusicList, GifForm }from '../../components';
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
    const [musicList, setMusicList] = useState([]);

    const onInputChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
    };
    
    const createMusicAccount = async () => {
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
          await getMusicList();
      
        } catch(error) {
          console.log("Error creating BaseAccount account:", error)
        }
    }

    const getMusicList = async() => {
        try {
          const provider = getProvider();
          const program = new Program(idl, programID, provider);
          const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
          
          setMusicList(account.musicList)
      
        } catch (error) {
          setMusicList(null);
        }
    };

    const sendMusic = async () => {
        if (inputValue.length === 0) {
          return;
        }
        
        console.log('inputValue', inputValue, inputValue.split('/').pop().length !== 22);

        if(inputValue.split('/').pop().length !== 22) {
          alert('Invalid format, it should be this: https://open.spotify.com/track/0U0ldCRmgCqhVvD6ksG63j')
          setInputValue('');
        } else {
          try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
        
            await program.rpc.addMusic(inputValue, {
              accounts: {
                baseAccount: baseAccount.publicKey,
                user: provider.wallet.publicKey,
              },
            });
        
            setInputValue('');
  
            await getMusicList();
          } catch (error) {
            console.log("Error sending GIF:", error)
          }
        }

    };

    const resetMusic = async () => {
      try {
        console.log("Reseting musics...")

        const provider = getProvider();
        const program = new Program(idl, programID, provider);
    
        await program.rpc.resetAllMusic({
          accounts: {
            baseAccount: baseAccount.publicKey
          },
        });
    
        await getMusicList();
      } catch (error) {
        console.log("Error Reseting musics..:", error)
      }
    }

    useEffect(() => {
        if (walletAddress) {
            getMusicList();
        }
    }, [walletAddress]);

    if (musicList === null) 
        return (<OneTimeInitSection createMusicAccount={createMusicAccount}/>);
      
    return (
        <div className="connected-container">
            <GifForm 
                inputValue={inputValue} 
                onInputChange={onInputChange}
                sendMusic={sendMusic}
                resetMusic={resetMusic}
            />
            <MusicList musicList={musicList} />
        </div>
  )
}

export default Home;