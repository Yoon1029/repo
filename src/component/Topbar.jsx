import React from 'react'
import './Topbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


function Topbar(){
    let value = 0;
    return(
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">나이쁘개🌼</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                    <NotificationsNoneIcon />
                        <span className="topIconBadge">{value}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;