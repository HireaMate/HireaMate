import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
import "./Widgets.css"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

  const newsArticle =(heading, subtitle) => (
    <div className='widgets_article'>
        <div className='widgets_article_left'>
            {/* <FiberManualRecordIcon /> */}
        </div>
        <div className='widgets_article_right'>
            <h4>{heading}</h4>
            <p>{subtitle}</p>
        </div>
    </div>
  )
  return (
    <div className='widgets'>
        <div className='widgets_header'>
        <h2> Past Jobs</h2>
        <InfoIcon/>
        </div>

        {/* <FiberManualRecordIcon /> */}
        { newsArticle("WebApp Creation - Pawn Shop", "Rate 9.5 / 10")}
    </div>
  )
}

export default Widgets
