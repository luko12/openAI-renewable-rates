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
  const [answer, setAnswer] = useState('')
  const [reference, setReference] = useState('')

  const search = async () => {
    setLoading(true)
    console.log('question:', question, 'state:', appState, 'utility:', appUtility)
    const response = await (await fetch(`http://127.0.0.1:8000/openAI/${appState}/${appUtility}`,
    {
      method: "GET",
      headers: {
        "question": question
      }

    })).json()
    setLoading(false)
    setAnswer(response.answer)
    setReference(response.reference)
    console.log('answer:', response.answer, 'reference:', response.reference)

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
        <div className="Text-Container1">
          <h1 className="Ask">ASK ME ANYTHING</h1>

          <div className="Filter1">
              <input
                  style={{all:"unset", width:"100%", textAlign:"left"}}
                  type="text"
                  name="state"
                  placeholder="State (IL or NJ)"
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
      </div>

      <div className="Hero-Blue">
        <div className="Text-Container2">
          <h3 className="Tip">Thanks for coming 👋</h3>
          <h4 className="Tip">We hope this tool speeds along your renewable project development!</h4>
          <h3 className="Tip">Here are a few tips to help you get started:</h3>
          <p className="Tip">Supported states: IL and NJ</p>
          <p className="Tip">Supported Policy Sources:</p>
          <ul>
            <li className="Tip">ComEd (refers to the <a href="https://drive.google.com/file/d/1FLjep7CjkTOYBooYKmNlto6FbuUV0fcF/view?usp=share_link">ComEd Utility Rate Schedule</a>)</li>
            <li className="Tip">Ameren (refers to the <a href="https://drive.google.com/file/d/1LAeYW8AU0AKqJyp-RmufKBFQtNT69AO5/view?usp=share_link">Ameren Utility Rate Schedule</a>) </li>
            <li className="Tip">JCP&L (refers to the <a href="https://drive.google.com/file/d/1s0k78UR5u9YT164_FdxXKnqHwXkchxZJ/view?usp=share_link">JCP&L Utility Rate Schedule</a>)</li>
            <li className="Tip">ACE (refers to the <a href="https://drive.google.com/file/d/1S6aJsAUWZR_l3QAsq-vTBhCS7qsk8y0B/view?usp=share_link">ACE Utility Rate Schedule</a>)</li>
            <li className="Tip">State (refers to the respective statewide incentive programs (<a href="https://drive.google.com/file/d/1yvzewSGFgXB2LEg0LxYCX-9FzSVlHtFG/view?usp=share_link">NJ Susi</a> or <a href="https://drive.google.com/file/d/19MAkqOWJ1pvCSMXOu5VMSOu2OSCgR3NA/view?usp=share_link">IL Shines</a>) </li>
          </ul>
          { loading && (
            <>
              <img src={spinner} className="spinner" alt="logo" />
              <p className="Response">We’re looking for the right answer...</p>
            </>
          )}
          { answer && (
            <>
              <h3 className="Tip">Answer:</h3>
              <p>{answer}</p>
              <h3 className="Tip">Reference:</h3>
              <p className="Tip">{reference}</p>
            </>
          )}

        </div>
      </div>

    </div>
  );
}

export default App;
