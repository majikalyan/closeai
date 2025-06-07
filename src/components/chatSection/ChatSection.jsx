import React, { useContext, useRef } from 'react'
import "./ChatSection.css"
import Darkmode from '../darkmode/Darkmode'
import { FaPlus } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { dataContext } from '../../context/UserContext';

const ChatSection = () => {
  let { sent, input, setInput, showResult, resultData, recentPrompt, loading, prevPrompt, newChat } = useContext(dataContext)

  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)"
  }
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)"
  }

  async function loadPrevPrompt(prompt) {
    sent(prompt)
    closeMenu()
  }
  // console.log("input value",input);
  return (
    <div className='chatsection'>
      <div className="navSection ">
        <h1 className='logo'>CloseAI</h1>
        <RiMenu3Fill className='menuIcon' onClick={openMenu} />

      </div>
      <div className="topsection">
        {!showResult ?
          <div className="headings">
            <span></span><span>What can I help with? </span>
          </div> :
          <div className="result">
            <div className="userbox">
              <img src="assets/user.png" alt="user_image" width="30px" />
              <p>{recentPrompt}</p>
            </div>
            <div className="aibox">
              <img src="assets/ai.png" alt="user_image" width="40px" />
              {loading ?
                <div className="loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                :
                <p>{resultData}</p>
              }
            </div>
          </div>
        }
      </div>
      <div className="bottomsection">
        <input onChange={(e) => setInput(e.target.value)} type="text" placeholder='Ask anything' value={input} />
        {
          input ? <button type='submit' className='sentbtn' onClick={() => { sent(input) }}><LuSend /></button> : null
        }

        <Darkmode />
      </div>
      {/* mobile menu */}
      <div ref={sideMenuRef} className='side flex    flex-col  fixed  -right-65 top-0 bottom-0 w-65 z-50 h-screen  transition duration-500'>
        <div className='close absolute right-6 top-6 ' onClick={closeMenu}>
          <MdOutlineCloseFullscreen className='cursor-pointer   text-2xl'/>
        </div>
        <div className="new " onClick={() => { newChat() ,closeMenu() }}>
          <FaPlus className='plusIcon' />
          <p>New Chat</p>
        </div>
        <div className="recentPart">
          <p className="recentTitle">Recent</p>
          {prevPrompt.map((item, index) => {
            return (
              <div className="eachPart" key={index} onClick={() => { loadPrevPrompt(item) }} >
                <FaRegMessage />
                <p>{(item.length < 15) ? item : (item.slice(0, 18) + "...")}</p>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default ChatSection