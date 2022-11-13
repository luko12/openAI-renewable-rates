import React from 'react';
import logo from './logo.svg';
import acropora_logo from './Assets/logo.png'
import spinner from './Assets/spinner.png'
import search_icon from './Assets/search-icon.png'
import './App.css';
import { useState } from "react"

function App() {

  const [appState, setAppState] = useState('');
  const [appUtility, setAppUtility] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const search = async () => {
    setLoading(true)
    console.log('question:', question, 'state:', appState, 'utility:', appUtility)
    const response = await fetch("http://127.0.0.1:8000/openAI/what_is_community_solar/NJ/state",
    {
      method: "GET",
    })
    setLoading(false)
    console.log('response:', response, 'body:', response.body)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={acropora_logo} className="App-logo" alt="logo" />
        <p className="Nav-text Search-tool">Search Tool</p>
        <p className="Nav-text About-us">About Us</p>
        <p className="Nav-text Login">Login/Sign Up</p>
      </header>

      <div className="Hero-Black">

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
            <button style={{all:"unset", cursor:"pointer"}} onClick={search}>
                <img src={search_icon} className="Search" alt="logo" />
            </button>
        </div>
      </div>

      <div className="Hero-Blue">

        <h3>Thanks for coming 👋</h3>
        {/* <h3>Here are a few tips to help you get started:</h3>
        <p>Supported states: Illinois, New Jersey</p>
        <p>Supported policy sources: Utility Rate Schedule</p> */}
        { loading && (
          <>
            <img src={spinner} className="spinner" alt="logo" />
            <p className="Response">We’re looking for the right answer...</p>
          </>
        )}
      </div>

      <div className="Footer"/>
    </div>
  );
}

export default App;
