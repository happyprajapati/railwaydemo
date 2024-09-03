import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState('')

  useEffect(()=>{
    fetch(`https://meghainfocom-production.up.railway.app/admin/allcount`, {
      method: 'post',
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.prodCount);
      });
  },[])

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="font-bold">
        Click on the Vite and React logos to learn more
      </p>

      <p className="font-bold">
        {data}
      </p>
    </>
  )
}

export default App
