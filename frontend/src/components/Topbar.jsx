import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useStore } from '../store';




function Topbar({page}) {
  // const url = process.env.REACT_APP_URL
  const url = 'http://127.0.0.1:8000'
  const addChat = useStore((state)=>state.addChat)
  const setCurrentChat = useStore((state)=>state.setCurrentChat)
  const setConversation = useStore((state)=>state.setConversation)
  const setSources = useStore((state)=> state.setSources)


  const handleNewChat = async ()=>{
    try {
      const res = await fetch(`${url}/new-chat/`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({"chat_title":'Chat Title'})
    })
    const data = await res.json()
    addChat({title:data['chat_title'],chat_id:data['chat_id']})
    setCurrentChat(data['chat_id'])
    setConversation([])
    setSources([])
    }
    catch (err){
      return err
    }
    
  }
  return (
      <AppBar sx={{backgroundColor:'appBar.main'}}>
        <Toolbar>
          <Typography variant='logo' sx={{ flexGrow: 1,textAlign:'start',fontWeight: 500}}>
            LegalAssist
          </Typography>
          { page === 'chat' &&
          <Button variant='mainBtn' onClick={handleNewChat}>
            New Chat
          </Button> }
        </Toolbar>
      </AppBar>
  )
}

export default Topbar