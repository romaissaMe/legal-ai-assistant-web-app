import React, { useEffect } from 'react'
import Message from './Message'
import {useStore} from '../store'
import { Box, Typography } from '@mui/material'
import { LineWobble } from '@uiball/loaders'

function InitConvo() {
  // const url = process.env.REACT_APP_URL
  const url = 'http://127.0.0.1:8000'
  
  const [file,setFile] = React.useState('null')
  const {setCurrentFile,currentFile} = useStore()
  const [anonymizedText,setAnonymizedText] = useStore((state)=>[state.anonymizedText,state.setAnonymizedText])
  const [componentMounted, setComponentMounted] = React.useState(false);
  const [processingFile,setProcessingFile] = React.useState(false)
  const ToggleProcessingFile =  useStore((state)=>state.ToggleProcessingFile)
  const updateChats = useStore((state) => state.updateChats)
  const chats = useStore((state) => state.chats)
  const currentChat = useStore((state) => state.currentChat)
  const inputRef = React.useRef(null)
  // const getFileForChat = useStore((state) => state.getFileForChat)
  
 
  
  const handleFileChange = (e) => {
     updateChats(currentChat,e.target.files[0])
     setFile(e.target.files[0])
     setProcessingFile(true)
     setCurrentFile(e.target.files[0]) 
  }
  
  React.useEffect(()=>{
    if (componentMounted){
      let isFileChanged = true
      const fetchData = async () => {
        const path = await anonymizeFile()
        if(path){
          setAnonymizedText(path)
        }
      }
    if (isFileChanged){
      ToggleProcessingFile()
      fetchData()
      .catch(console.error);
    }
    // cancel any future `setData`
    return () => {
      isFileChanged = false;
    }
    }else {
      // If the component is mounting, set it as mounted
      setComponentMounted(true);
    }
  },[file])

  React.useEffect(()=>{
    if(componentMounted){
    const process = async () =>{
      const processed = await processFile()
      if (processed){
        setProcessingFile(false)
        ToggleProcessingFile()
      }
    }

    process()
    .catch(console.error);
  } else{
    setComponentMounted(true);
  }
  },[anonymizedText])


  
  const anonymizeFile = async () =>{
    const formData=new FormData()
    formData.append('file',file)
    try{
    const res = await fetch(`${url}/anonymize/`,{
    method:'POST',
    body:formData,
    })
    const data = await res.json()
    return data['path']
    }
    catch(err){
    return err
    }
}
  const processFile = async () => {
    const filenameWithoutExtension = file.name.replace(/\.pdf$/, '');
    try {
      const res = await fetch(`${url}/process/`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({"path":anonymizedText,"file_name":filenameWithoutExtension})
    })
    const data = await res.json()
    return data['result']}
    catch (err){
      return err
    }
  }
  return (
    <>
    <Message type='chatBot' message='Hello Iam your Legal Ai Assistant' image='legal.jpg'/>
    <Message type='chatBot' message='Upload a pdf file to begin!'/>
    <input type="file" accept='pdf' onChange={handleFileChange} style={{marginBottom:'10px',display: 'none' }} ref={inputRef}/>
    <Typography sx={{color:'darkblue'}}>
      Selected File: {currentFile ? currentFile.name : 'No file selected'}
    </Typography>
    <button onClick={() => inputRef.current.click()}>Choose File</button>
    {processingFile && 
    <LineWobble 
    size={80}
    lineWeight={1}
    speed={1.75} 
    color="darkblue" 
    />}
    </>
    )
  }

export default InitConvo