import React from 'react'
import "./Sidebar.css"
// import { Avatar } from '@mui/material'
import Avatar from "@mui/material/Avatar";
import bg from './Assets/bg.jpg';
import dog from './Assets/dog.jpg';
import { SafeGetUserInfoResponse, Web3AuthModalPack } from '../../src';

type AppBarProps = {
    isLoggedIn: boolean
    userInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>;
  }

function Sidebar({ userInfo, isLoggedIn }: AppBarProps) {


const recentItem = (topic)=> (
    <div className='sidebar_recentItem'>
        <span className='sidebar__hash'>#</span>
        <p>{topic}</p>
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
                <h2 style={{ fontSize: '18px' }}> {userInfo.name}</h2>
                )}
                {isLoggedIn && userInfo && (
                <h4> {userInfo.email}</h4>
                )}
        </div>

        <div className='sidebar_stats'>
            <div className="sidebar_stat">
                <p>Who viewed you</p>
                <p className="sidebar_statNumber">2.500</p>
            </div>
            <div className="sidebar_stat">
                <p>Views on posts</p>
                <p className="sidebar_statNumber">2.400</p>
            </div>
        </div>

        <div className='sidebar_bottom'>
        <p style={{ fontSize: '13px', paddingBottom: '10px' }}>Recent</p>        
        {recentItem('reactjs')}
        {recentItem('programming')}
        {recentItem('software')}
        {recentItem('design')}
        </div>
    </div>
  )
}

export default Sidebar
