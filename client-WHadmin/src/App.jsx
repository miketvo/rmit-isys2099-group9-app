import { useEffect } from "react"

function App() {

  useEffect(()=> {
    fetch('http://localhost:3000/api')
    .then(res => res.json)
    .then(data => console.log(data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <p>Hello World!</p>  
    </div>
  )
}

export default App
