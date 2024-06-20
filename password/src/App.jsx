import { useCallback, useEffect, useState, useRef  } from 'react'

// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed ,setNumberAllowed ] =useState(false);
  const [characterAllowed ,setCharacterAllowed ] =useState(false);
  const [password , setPassword]=useState("");
  const passwordGenerate= useCallback(()=>{
   let pass = "";
   let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   if(numberAllowed) str+= "0123456789";
   if(characterAllowed) str+= "!@#$%^&*{}";
   for(let i=1 ; i<=length;i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(char);

   }
   setPassword(pass);
  },[length,numberAllowed ,characterAllowed ,setPassword])

   useEffect(()=>{passwordGenerate()},[length,numberAllowed ,characterAllowed,passwordGenerate])

   const passwordRef=useRef(null);
   const copyPasswordToClipboard =useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
   },[password])
    
   return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-300 bg-black'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4 p-10 pt-3'>
        <input type="text" 
        value={password}
        placeholder='password...'
        className='outline-none w-full py-1 px-3 rounded-md'
        ref={passwordRef}
        readOnly
        />
        <button className=' outline-none bg-green-400 text-black hover:bg-white'
        onClick={copyPasswordToClipboard}
       >copy</button>
       </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
         />
          <label>length:{length}</label>
          <div className='flex items-center gap-x-1' >
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput" 
            onChange={()=>{setNumberAllowed((prev)=>!prev);}}
           />
            <label htmlFor="numberInput">numbers</label>
          </div>
          <div className='flex items-center gap-x-1' >
            <input 
            type="checkbox"
            defaultChecked={characterAllowed}
            id="characterInput" 
            onChange={()=>{setCharacterAllowed ((prev)=>!prev);}}/>
            <label htmlFor="characterInput">characters</label>
          </div>
        </div>
        
       </div>

      </div>
    </>
  )
}

export default App
