import React from 'react';

import {
    LandingContainer, 
    LandingSubText, 
    ConnectWalletButton
} from './styled'

const Landing = ({connectWallet}) => {
    return (
        <LandingContainer>
            <LandingSubText>
                Why trying harder than Spotify when you can go full retro ✨
            </LandingSubText>
            <ConnectWalletButton onClick={connectWallet}>
                Connect to Wallet
            </ConnectWalletButton>
        </LandingContainer>
    )
}

export default Landing;