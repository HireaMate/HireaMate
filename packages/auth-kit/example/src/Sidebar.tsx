import React from 'react'
import "./Sidebar.css"
// import { Avatar } from '@mui/material'
import Avatar from "@mui/material/Avatar";
import bg from './Assets/bg.jpg';
import dog from './Assets/dog.jpg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SafeGetUserInfoResponse, Web3AuthModalPack } from '../../src';
import { EthHashInfo } from '@safe-global/safe-react-components'

type AppBarProps = {
    isLoggedIn: boolean
    userInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>;
    // eoa?: string | null
    signInInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>;
  }

function Sidebar({ userInfo, isLoggedIn, isSafe }: AppBarProps) {


const recentItem = (topic)=> (
    <div className='sidebar_recentItem'>
        <span className='sidebar__hash'>
      <VisibilityIcon style={{ fontSize: '23px', color: 'white', marginLeft: '5px' }} />
      </span>
      <div className='s'>
      {topic}
      </div>
    
    </div>
);


  return (
    <div className='sidebar'>

        <div className="sidebar_top">
            <img 
            src= {bg} //user.background
            alt=""/>
            {/* <Avatar src={user?.photoURL} className="sidebar__avatar" >
            {userInfo?.email[0]}
            </Avatar> */}
            <Avatar src={dog} className="sidebar__avatar" >
            {/* {userInfo.email[0]} */}
            </Avatar>
                {isLoggedIn && userInfo && (
                    <h2 style={{ fontSize: '25px' }}> {userInfo.name}</h2>
                    )}
                {isSafe && (
                    <EthHashInfo
                      address={safeAuthSignInResponse.eoa}
                      showCopyButton
                      showPrefix
                      prefix={getPrefix('0x5')}
                    />
                  )}
                {isLoggedIn && userInfo && (
                <h4 style={{ fontSize: '20px', color: 'white' }}> {userInfo.email}</h4>
                )}
        </div>

        <div className='sidebar_stats'>
            <div className="sidebar_stat">
            <p style={{ fontSize: '18px', color: 'white' }}>Jobs Done</p>
                <p style={{ fontSize: '15px' }} className="sidebar_statNumber">14</p>
            </div>
            <div className="sidebar_stat">
                <p style={{ fontSize: '18px', color: 'white' }}>Global Rating</p>
                <p style={{ fontSize: '15px' }} className="sidebar_statNumber">8.7 / 10</p>
            </div>
        </div>

        <div className='sidebar_bottom'>
        <p style={{ fontSize: '20px',color: 'white', paddingBottom: '10px' }}>Recently Viewed Jobs</p>        
        {recentItem('PWA NFT store')}
        {recentItem('Solidity insurance contract')}
        {recentItem('Integrate Safe to WebApp')}
        {recentItem('Deploy Arbitrage Contract')}
        </div>
    </div>
  )
}

export default Sidebar
