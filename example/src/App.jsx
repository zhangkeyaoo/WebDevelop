import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>热门圈子推荐</h1>
      <div className="card">
        <p>
        <button > 发现圈子 </button>
        </p>
        <p>
        <button > 我的空间 </button>
        </p>
        <p>
        <button > 好友列表 </button>
        </p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          联系作者 <b>1652046628@qq.com</b>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more you are <b>dongdongzhu</b>
      </p>
    </>
  )
}

export default App
