import React from 'react'
import "./Feed.css"
import Posts from "./Posts"
import { useState, useEffect } from "react";
import FlipMove from 'react-flip-move'




function Feed() {
  
  return (
    <div className='feed'>

      <div className='feed_inputContainer'>

        <div className='feed_input'>
        <Posts/>
        </div>
        </div>
    </div>
  )
}
//MANUALY CHECKING THE UI BY HARDCODING POSTS , EVEN THOUGH NOT PART OF DB
export default Feed

// #70B5F9"