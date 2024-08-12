import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+={}[]~`"

    for(let i=1;i<length; i++){
      let char = Math.floor(Math.random()* str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=> {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto content-center my-7 shadow-2xl rounded-lg py-3 px-4  text-orange-500 bg-gray-700'>
         <h1 className='text-center text-white text-xl my-2'>Password Generator</h1>
         <h3 className='text-white my-3'>Generate custom password</h3>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
            type="text" 
            placeholder='Password' 
            readOnly 
            ref={passwordRef} 
            value={password} 
            className='outline-none w-full py-1 px-3 shadow-2xl rounded-l-md' 
          />
        <button onClick={copyPasswordToClipboard} className='px-4 text-center rounded-r-md border-none border-2 text-lg shadow-2xl bg-gray-700'>Copy</button>
     </div>

     <div className='flex text-3m gap-x-3' >

       <div className='flex items-center gap-x-1'>
         <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) =>{
           setlength(e.target.value) }} /> 
         <label>Length: {length}</label>
       </div>

       <div className='flex items-center gap-x-1'>
         <input type="checkbox" className='cursor-pointer' defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
         <label>Numbers</label>
       </div>

       <div className='flex items-center gap-x-1'>
         <input type="checkbox" className='cursor-pointer' defaultChecked={charAllowed} id='numberInput' onChange={()=>{setCharAllowed((prev)=>!prev)}} />
         <label>Characters</label>
       </div>
     </div>
   </div>
    </>
  )
}

export default App


// useCallback - return memoized function freeze the function ek function hai jitna ho ske cache mein rkh lo jitna part use ho pa rha hai krlo 
// numbers and function change ho rha hai toh function ko re run krdo
// loop chala ke random number nikal lo
// useEffect mein agr kuch bhi chedhchadh ho toh re run krdo
// kisi ka bhi jb reference lena hota hai
