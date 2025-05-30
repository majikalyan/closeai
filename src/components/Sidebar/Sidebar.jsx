import React, { useContext, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { RiMenu2Line } from "react-icons/ri";
import "./Sidebar.css"
import { dataContext } from '../../context/UserContext';

const Sidebar = () => {
    const [extend, setExtend] = useState(true)
    const { sent, prevPrompt,newChat } = useContext(dataContext)
    async function loadPrevPrompt(prompt) {
        sent(prompt)
    }

    const handleExtend = () => {
        // console.log("extend value",extend);
        setExtend(prev => !prev)
    }
    return (
        <div className='sidebar'>
            <RiMenu2Line id='menu' onClick={handleExtend} />
            <div className="newchat" onClick={()=>{newChat()}}>
                <FaPlus />
                {extend ? <p>New Chat</p> : null}
            </div>
            <div className="recentchat">
                {extend ? <p className="title">Recent</p> : null}
                {prevPrompt.map((item, index) => {
                    return (
                        <div className="recent" key={index} onClick={() => { loadPrevPrompt(item) }}>
                            <FaRegMessage />
                            {extend ?
                                <p>{(item.length < 15) ? item : (item.slice(0, 15) + "...")}</p>
                                :
                                null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar