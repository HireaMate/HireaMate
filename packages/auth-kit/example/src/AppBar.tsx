import { AppBar as MuiAppBar, Typography, styled, Box, Button } from '@mui/material'
import { SafeGetUserInfoResponse, Web3AuthModalPack } from '../../src'

import HeaderOption from './HeaderOption'
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./Appbar.css"


type AppBarProps = {
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
  userInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>
}

const AppBar = ({ isLoggedIn, onLogin, onLogout, userInfo }: AppBarProps) => {
  return (
    <div className="header">

      <div className="components">

            <div className="header__left">
              <h1>HelpAMate</h1>
            </div>

            {isLoggedIn ? (
              <div className="header__right">
                <HeaderOption userInfo={userInfo} Icon={HomeIcon} title="Home" />
                <HeaderOption userInfo={userInfo} Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption userInfo={userInfo} Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption userInfo={userInfo} Icon={ChatIcon} title="Chat" />
                <HeaderOption userInfo={userInfo} Icon={NotificationsIcon} title="Notifications" />
                <div className="test">
                <Button onClick={onLogout} >
                  Log Out
                </Button>
                </div>
              </div>
            ) : (
              <Button onClick={onLogin} >
                Login
              </Button>
            )}
            </div>
    </div>
  );
};

export default AppBar;


