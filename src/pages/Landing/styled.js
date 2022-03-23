import styled from 'styled-components'

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const LandingSubText = styled.p`
  width: 80%;
  font-size: 25px;
  color: white;
`

const ConnectWalletButton = styled.button`
    height: 45px;
    border: 0;
    width: auto;
    padding-left: 40px;
    padding-right: 40px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: white;

    background: -webkit-linear-gradient(left, #ffd319, #ff2975);
    background-size: 150% 200%;
    animation: gradient-animation 4s ease infinite;
`

export {
    LandingContainer, 
    LandingSubText, 
    ConnectWalletButton
}