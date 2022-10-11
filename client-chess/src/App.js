// React
import { useState, useEffect } from 'react';

// Tailwind
import './tailwind/output.css'

const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

function App() {

  const [board, setBoard] = useState()

  useEffect(() => {
    fetch('http://localhost:5001?' + new URLSearchParams({ start: true }), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(data => setBoard(JSON.parse(atob(data)).fen))
  }, [])

  return (
    <div className="App">
      { board }
    </div>
  );
}

export default App;