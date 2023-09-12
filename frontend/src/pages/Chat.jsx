import React from 'react'
import {Stack,Box,Typography, Button,IconButton} from '@mui/material';
import ChatBox from '../components/ChatBox';
import { useStore } from '../store';
import Divider from '@mui/material/Divider';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import '../styles.css'
import Home from './Home';
export default function Chat({setPage}) {
  // const url = process.env.REACT_APP_URL
  const url = 'http://127.0.0.1:8000'
  const chats = useStore((state)=>state.chats)
  const setCurrentChat = useStore((state)=>state.setCurrentChat)
  const currentChat = useStore((state)=>state.currentChat)
  const setConversation = useStore((state)=>state.setConversation)
  const sources = useStore((state)=>state.sources)

  const {showChats,setShowChats}=useStore()
  const handleClickChat = async (chat_id)=>{
    if (chat_id !== currentChat){
    setCurrentChat(chat_id)
    //fetch conversation of the chat
    try{
      const res = await fetch(`${url}/ask/conversation?chat_id=${chat_id}`)
      const data = await res.json()
      const conv = JSON.parse(data)
      setConversation(conv['conversation'])
    }catch(err){
      console.log(err)
    }
  }
  }
  React.useEffect(() => {
    setPage('chat')
  }, []);
  return (
          <Box display={'flex'} sx={{height:'100%',width:'100%'}} gap={'10px'}>
               <Box p={'10px'} pt={'15px'} bgcolor={'chatsBgc.main'} sx={{bordeRadius:'8px',height:'100%'}} >
                      <Stack direction='row' gap={'3px'}>
                        <Button variant={`${showChats ? 'secondaryButton' : 'clicked'}`} onClick={()=>setShowChats(true)}>
                          Chats
                        </Button>
                        <Button variant={`${  !showChats ? 'secondaryButton' : 'clicked'}`} onClick={()=>setShowChats(false)}>
                          Sources
                        </Button>
                      </Stack>
                    
                      <Stack divider={<Divider orientation="vertical" flexItem  sx={{color:'white',height:'2px',maxWidth:'300px'}} />} spacing={1} mt={'10px'}>
                        {showChats?
                        chats.map((item,i)=>{
                          return <Stack direction={'row'} useFlexGap sx={{alignItems:'center',justifyContent:'space-between'}}> 
                          <Button variant="text" key={i} onClick={() => handleClickChat(item.chat_id)}>{item.title}</Button>  
                          <IconButton><DeleteSweepOutlinedIcon fontSize='small' sx={{color:'#c7c6da'}} /></IconButton>
                          </Stack> 
                        }) : sources.map((item,i)=>{
                          return <Typography sx={{maxWidth:'400px',fontSize:'13px',textAlign:'justify',fontWeight:'300',padding:'10px'}} key={i}>{item.page_content}</Typography>
                        })
                        }
                      </Stack>
                </Box>
                  {currentChat?<ChatBox/>: <Box sx={{width:'100%',textAlign:'center',paddingTop:'20%'}} > <span style={{color:'darkblue'}}>Start a Chat...</span>  </Box> }    
           </Box>

  )
}
