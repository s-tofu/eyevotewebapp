import React, {useState} from 'react'
import Header from './Header';
import Questions from './Questions';
import Home from './Home'
import Study from './Eyevote.js';
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'consent') {
      return (Consent());
    } else if (page === 'questions') {
      return <Questions />
    } else if (page === 'home') {
      return <Home />
    }
  }

  const padding = {
    padding: 5
  }

  const Consent = () => {
    return (
      <Consent />
    );
  }
  return (
    <div className="App">
       {content()}
    </div>
  );
}

export default App;
