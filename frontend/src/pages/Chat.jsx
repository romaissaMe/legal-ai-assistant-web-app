import React from 'react'
import {Stack,Box,Typography, Button,IconButton} from '@mui/material';
import ChatBox from '../components/ChatBox';
import { useStore } from '../store';
import Divider from '@mui/material/Divider';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';

import '../styles.css'

export default function Chat({setPage}) {
  // const url = process.env.REACT_APP_URL
  const url = 'http://127.0.0.1:8000'
  const chats = useStore((state)=>state.chats)
  const setCurrentFile = useStore((state)=>state.setCurrentFile)
  const currentFile = useStore((state)=>state.currentFile)
  const setCurrentChat = useStore((state)=>state.setCurrentChat)
  const currentChat = useStore((state)=>state.currentChat)
  const removeChat = useStore((state)=>state.removeChat)
  const setConversation = useStore((state)=>state.setConversation)
  const {sources,setSources} = useStore()
    // Use a ref to store the previous length of 'chats'.
  const prevChatsLengthRef = React.useRef(chats.length);
  const lastRemovedChatIdRef = React.useRef(null);
  const {closeSideBar,setCloseSideBar} = useStore()

  const {showChats,setShowChats}=useStore()
  const handleClickChat = async (chat_id)=>{
    if (chat_id !== currentChat){
    setCurrentChat(chat_id)
  }else{
    setCloseSideBar(true)
  }
  }

  const getFileForChat = () => {
    const chat = chats.find((item) => item.chat_id === currentChat);
    return chat ? chat.chat_file : null;
  }
  React.useEffect(() => {
    setPage('chat')
  }, []);

  React.useEffect(()=>{
    //fetch conversation of the chat
    const fetchConv = async()=>{
      setCurrentFile(getFileForChat(currentChat) || null)
      console.log('current file :',currentFile)
      setCloseSideBar(true)
      setSources([])
    try{
      const res = await fetch(`${url}/ask/conversation?chat_id=${currentChat}`)
      const data = await res.json()
      const conv = JSON.parse(data)
      setConversation(conv['conversation'])
    }catch(err){
      console.log(err)
    }}
    fetchConv()
  },[currentChat])

  
  const handleDeleteChat = (chat_id) => {
    lastRemovedChatIdRef.current=chat_id
    removeChat(chat_id)
  }

React.useEffect(() => {
  
  // Check if an element was removed from 'chats'.
  if (chats.length < prevChatsLengthRef.current) {
    if (currentChat === lastRemovedChatIdRef.current){
      if(chats.length !== 0){
      setCurrentChat(chats[chats.length - 1].chat_id)
      }
      else setCurrentChat('')
    }
    // Update the previous length reference.
    prevChatsLengthRef.current = chats.length;
  }else{
    prevChatsLengthRef.current += 1
    console.log(prevChatsLengthRef.current)
  }
}, [chats]);

  return (
          <Stack direction='row' sx={{height:'100%',overflow:'hidden'}}>
               <Box className="sideBar" p={'10px'} pt={'20px'} bgcolor={'chatsBgc.main'} sx={{bordeRadius:'8px',height:'100%',width:{xs:'100%',sm:'100%',md:showChats?'300px':'500px',lg:showChats?'300px':'600px'},overflowY:'scroll',overflowX:'hidden',display: { xs: closeSideBar ? 'none' : 'block', sm: closeSideBar ? 'none' : 'block',md:'block',lg:'block'}}} >
                      <Box sx={{display:{lg:'flex',md:'flex',sm:'none',xs:'none'},padding:'10px',justifyContent:'space-around'}}>
                        <Button variant={`${showChats ? 'secondaryButton' : 'clicked'}`} marginRight='5px' onClick={()=>setShowChats(true)}>
                          Chats
                        </Button>
                        <Button variant={`${  !showChats ? 'secondaryButton' : 'clicked'}`} onClick={()=>setShowChats(false)}>
                          Sources
                        </Button>
                      </Box>
                      
                      <IconButton  size='small' onClick={() =>setCloseSideBar((prev) => !prev)} sx={{display:{xs:'block',sm:'block',md:'none',lg:'none'},color:'sideBarTextColor.main'}}><CloseIcon/></IconButton>
                      {showChats?
                        chats.map((item,i)=>{
                        return <List>
                              <ListItem disablePadding sx={{backgroundColor:currentChat==item.chat_id?'callAction.light':'transparent', color:currentChat==item.chat_id?'sideBarTextColor.secondary':'sideBarTextColor.main'}}>
                                <ListItemButton>
                                  <ListItemText key={i} onClick={() => handleClickChat(item.chat_id)} primary={item.title} sx={{display:'inline-block', fontSize:'14px', whiteSpace: 'nowrap', overflow:'hidden',textOverflow: 'ellipsis',marginRight:'10px'}} />
                                  <ListItemIcon>
                                    <DeleteSweepOutlinedIcon fontSize='small' sx={{color:currentChat==item.chat_id?'sideBarTextColor.secondary':'sideBarTextColor.main'}} onClick={()=>handleDeleteChat(item.chat_id)}/> 
                                  </ListItemIcon>
                                  
                                </ListItemButton>
                              </ListItem>
                            </List>
                           }) : sources.map((item,i)=>{
                            return <Typography sx={{width:'100%',fontSize:'13px',textAlign:'justify',fontWeight:'300',padding:'10px'}} key={i}>{item.page_content}</Typography>
                          })
                          }
                       
                </Box>
                  {currentChat && chats.length != 0?<ChatBox/>: <Box sx={{textAlign:'center',paddingTop:'20%',flex:3,width:{xs:closeSideBar?'100%':'0%',sm:closeSideBar?'100%':'0%',md:'100%',lg:'100%'}}} > <span style={{color:'darkblue'}}>Start a Chat...</span>  </Box> }    
              
          </Stack>

  )
}
