import React, { useEffect } from 'react'
import Message from './Message'
import {useStore} from '../store'
import { Box } from '@mui/material'
import { LineWobble } from '@uiball/loaders'

function InitConvo() {
  // const url = process.env.REACT_APP_URL
  const url = 'http://127.0.0.1:8000'
  
  const setFile = useStore((state)=> state.setFile)
  const file = useStore((state)=> state.file)
  const [anonymizedText,setAnonymizedText] = useStore((state)=>[state.anonymizedText,state.setAnonymizedText])
  const [componentMounted, setComponentMounted] = React.useState(false);
  const [processingFile,setProcessingFile] = React.useState(false)
  const ToggleProcessingFile =  useStore((state)=>state.ToggleProcessingFile)
  
  
  const handleFileChange = (e) => {
     setFile(e.target.files[0])
     setProcessingFile(true)
  }

  React.useEffect(()=>{
    if (componentMounted){
      let isFileChanged = true
      const fetchData = async () => {
        const path = await anonymizeFile()
        console.log('anonymizing')
        if(path){
          setAnonymizedText(path)
          console.log('path' + path) 
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
    <input type="file" accept='pdf' onChange={handleFileChange} style={{marginBottom:'10px'}} />
    {processingFile && 
  <LineWobble 
  size={80}
  lineWeight={1}
  speed={1.75} 
  color="white" 
  />}
    </>
    )
  }

export default InitConvo