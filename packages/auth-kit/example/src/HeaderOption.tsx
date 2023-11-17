import React from 'react';
import "./HeaderOption.css";
import Avatar from "@mui/material/Avatar";
import { SafeGetUserInfoResponse, Web3AuthModalPack } from '../../src';

type AppBarProps = {
  userInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>;
}

function HeaderOption({ avatar, Icon, title, onClick, userInfo }: AppBarProps) {
  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className='headerOption__icon' />}
      {/* {avatar && 
        <Avatar className="headerOption__icon" src={userInfo?.photoURL}>
          {userInfo?.email[0]}
        </Avatar>
      } */}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
