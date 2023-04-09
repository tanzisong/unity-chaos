import {useEffect, useState} from 'react'
import { parse, genContext } from "@chaos/dsl";

import table_xml from "./template/table.xml"


function App() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const AST = parse(genContext(table_xml));
    console.info(AST)
  }, [])

  return (
    <div>
      sssss
    </div>
  )
}

export default App
