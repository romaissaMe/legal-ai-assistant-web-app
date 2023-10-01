import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ForumIcon from '@mui/icons-material/Forum';
import { useStore } from '../store';




function Topbar({page}) {
  // const url = process.env.REACT_APP_URL
  const url = 'http://127.0.0.1:8000'
  const addChat = useStore((state)=>state.addChat)
  const setCurrentChat = useStore((state)=>state.setCurrentChat)
  const setConversation = useStore((state)=>state.setConversation)
  const setSources = useStore((state)=> state.setSources)
  const {currentFile,setCurrentFile} = useStore()

  const handleNewChat = async ()=>{
    try {
      const res = await fetch(`${url}/new-chat/`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({"chat_title":'New Chat'})
    })
    const data = await res.json()
    addChat({title:data['chat_title'],chat_id:data['chat_id'],chat_file:null})
    setCurrentChat(data['chat_id'])
    setConversation([])
    setCurrentFile(null)
    setSources([])
    console.log('top bar:',currentFile)
    }
    catch (err){
      return err
    }
  }
  const {showChats,setShowChats}=useStore()
  const setCloseSideBar = useStore((state)=>state.setCloseSideBar)
  const handleChatsClick = ()=> {
    setShowChats(true)
    setCloseSideBar(false)
  }

  return (
      <AppBar position='static' sx={{backgroundColor:'appBar.main',height:'50px',justifyContent:'center'}}>
        <Toolbar>
          <Typography variant='logo' sx={{ flexGrow: 1,textAlign:'start',fontWeight: 500,fontSize:{xs:'13px',sm:'15px',md:'18px',lg:'18px'}}}>
            LegalAssist
          </Typography>
          { page === 'chat' &&
          <> 
          <IconButton  sx={{display:{xs:'block',sm:'block',md:'none',lg:'none',color:'darkblue'},marginRight:'10px'}} onClick={handleChatsClick} ><Stack direction={'row-reverse'} gap={'1px'} >chats <ForumIcon size='large'/></Stack></IconButton>
          <Button variant='mainBtn' sx={{fontSize:{xs:'11px',sm:'13px'},width:{xs:'70px',sm:'80px',md:'90px',lg:'100px'},
                    height:{xs:'30px',sm:'30px',md:'30px',lg:'30px'},
                    paddingTop:'0px',
                    paddingBottom:'0px',
                    paddingRight:{xs:'1px',sm:'1px',md:'1px',lg:'1px'},
                    paddingLeft:{xs:'1px',sm:'1px',md:'1px',lg:'1px'}}}  onClick={handleNewChat}>
            New Chat
          </Button> 
            
          </>}
        </Toolbar>
      </AppBar>
  )
}

export default Topbar