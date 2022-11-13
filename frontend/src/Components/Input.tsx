import './../App.css';
import { useState } from "react"
import arrow_icon from './../Assets/arrow-icon.png'
import search_icon from './../Assets/search-icon.png'

export default function Input() {

    const [appState, setAppState] = useState('');
    const [appUtility, setAppUtility] = useState('')
    const [question, setQuestion] = useState('')

    return (
        <>
            <h1 className="Ask">ASK ME ANYTHING</h1>

            <div className="Filter1">
                <input
                    style={{all:"unset", width:"100%", textAlign:"left"}}
                    type="text"
                    name="state"
                    placeholder="State (only Illinois or New Jersey)"
                    value={appState}
                    onChange={e => setAppState(e.target.value)}
                />
            </div>
            <div className="Filter2">
                <input
                    style={{all:"unset", width:"100%", textAlign:"left"}}
                    type="text"
                    name="utility"
                    placeholder="Policy Source"
                    value={appUtility}
                    onChange={e => setAppUtility(e.target.value)}
                />
            </div>
            <div className="Question">
                <input
                    style={{all:"unset", width:"100%", textAlign:"left"}}
                    type="text"
                    name="question"
                    placeholder="Type your question here"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />
                <button style={{all:"unset", cursor:"pointer"}}>
                    <img src={search_icon} className="Search" alt="logo" />
                </button>
            </div>
        </>
    )
}