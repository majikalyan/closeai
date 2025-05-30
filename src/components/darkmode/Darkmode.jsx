import React, { useEffect, useState } from 'react'
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import "./Darkmode.css"

const Darkmode = () => {
    const [mode, setMode] = useState("false")
    // const [icon,setIcon] =useState("<IoSunnyOutline />")
    useEffect(() => {
        document.body.className = mode ? "lightmode" : "darkmode"
    }, [mode])
    const modeToggle = () => {
        // console.log("mode value",mode);
        setMode(!mode)
    }
    return (
        <div>
            <button className='darkmodebtn' onClick={modeToggle}>
                {mode?<MdOutlineDarkMode/>:<IoSunnyOutline/>}
            </button>

        </div>
    )
}

export default Darkmode