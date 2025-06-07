import React, { createContext, useState } from 'react'
import run from '../api/apiUrl'
export const dataContext = createContext()

const UserContext = (props) => {
    const [input, setInput] = useState("")
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompt, setPrevPrompt] = useState([])

    const newChat = () => {
        setShowResult(false);
        setLoading(false);
    }

    // console.log("props value",props);
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)

        }, 75 * index);
    }

    async function sent(input) {
        setResultData("")
        setShowResult(true)
        setRecentPrompt(input)
        setLoading(true)
        setPrevPrompt(prev => [...prev, input])
        let response = await run(input)
        let responseArray = (response.split("**") && response.split("*"))
        // let newResponseArray = responseArray.split(" ")
        for (let i = 0; i < responseArray.length; i++) {
            const nextWord = responseArray[i]
            delayPara(i, nextWord)
        }


        // setResultData(responseArray)
        setLoading(false)
        setInput("")
    }
    const data = {
        input,
        setInput,
        sent,
        loading,
        setLoading,
        showResult,
        setShowResult,
        resultData,
        setResultData,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        newChat
    }
    return (
        <>
            <dataContext.Provider value={data}>
                {props.children}
            </dataContext.Provider>
        </>
    )
}

export default UserContext