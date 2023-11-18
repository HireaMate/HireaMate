import React from 'react'
import "./Feed.css"
import Posts from "./Posts"
import { useState, useEffect } from "react";
import FlipMove from 'react-flip-move'
// import { AuthProvider } from './AuthContext';
import { SafeGetUserInfoResponse, Web3AuthModalPack } from '../../src';
import { EthHashInfo } from '@safe-global/safe-react-components'
import ContractInteractionComponent from './AvailableOffer'

type AppBarProps = {
  isLoggedIn: boolean
  userInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>;
  safeAuthSignInResponse?: SafeGetUserInfoResponse<Web3AuthModalPack>;
  signInInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>;
}


function Feed({ userInfo, isLoggedIn, safeAuthSignInResponse, signInInfo}: AppBarProps) {
  
  return (
    <div className='feed'>

      <div className='feed_inputContainer'>
 
        <div className='feed_input'>
        <Posts signInInfo={signInInfo}
          />
        </div>
        <ContractInteractionComponent />

        </div>
    </div>
  )
}
//MANUALY CHECKING THE UI BY HARDCODING POSTS , EVEN THOUGH NOT PART OF DB
export default Feed

// #70B5F9"