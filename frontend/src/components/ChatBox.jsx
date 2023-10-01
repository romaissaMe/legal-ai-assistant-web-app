import { Container,Typography,Box,Stack}from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import IconButton from '@mui/material/IconButton';
import { DotWave } from '@uiball/loaders'
import React, { useEffect } from 'react'
import QuestionField from './QuestionField'
import Message from './Message'
import InitConvo from './InitConvo'
import { useStore } from '../store';
function ChatBox() {
  //const url= process.env.REACT_APP_URL
  const url = 'http://127.0.0.1:8000'
  const conversation = useStore((state)=> state.conversation)
  const addConversation = useStore((state)=> state.addConversation)
  const file = useStore((state)=> state.currentFile)
  const question = useStore((state)=>state.questions[0])
  const currentChat=useStore((state)=>state.currentChat)
  const alterQuestion=useStore((state)=>state.alterQuestion)
  const processingFile=useStore((state)=>state.processingFile)
  const [pending,setPending] = React.useState(false)
  const chatBoxRef = React.useRef(null)
  const closeSideBar = useStore((state) => state.closeSideBar)
  const handleSubmit=(e)=>{
    e.preventDefault()
    }
    const handleClick= async(e)=>{
      if(question && !processingFile){
         const filenameWithoutExtension = file.name.replace(/\.pdf$/, '');
         addConversation({'message':question})
         setPending(true)
         setTimeout(() => {
          alterQuestion('', 0);
        }, 1000);
         try{
            const res = await fetch(`${url}/ask/`,{
              method:'POST',
              headers: {
                'Content-Type': 'application/json'
                },
              body: JSON.stringify({"questions":question,"path":filenameWithoutExtension,'chat_id':currentChat})
            })
            const data = await res.json()
            if(data){
              setPending(false)
              addConversation({'type':'chatBot','message':data['result']})
            }
            
         } catch(err){
          console.log(err)
         }
      }
      else{
        if (processingFile) alert('file not processed yet')
        else if (!question )alert('question required')
      }
    }

    useEffect(()=>{
      chatBoxRef.current?.scrollIntoView({ behavior: "smooth" })
    },[conversation])
  return (
    <Box sx={{height:'100%',overflowY:'hidden',position:'relative',overflowX:'hidden',width:{xs:closeSideBar?'100%':'0%',sm:closeSideBar?'100%':'0%',md:'100%',lg:'100%'}}}>
    <Box sx={{position:'relative',width:'100%',marginTop:'10px',padding:'5px',paddingTop:'0px',paddingBottom:'0px',height:'calc( 100% - 100px)',maxHeight:'calc( 100% - 100px)',overflowY:'scroll',overflowX:'hidden'}} className="scrol-box" >
      
          <InitConvo/>
          {conversation && conversation.map((msg,index)=>{
            return <Box key={index}><Message {...msg} index={index}/></Box>
          })}
            {pending &&  <DotWave 
                        size={30}
                        speed={1} 
                        color="darkblue" 
                        />}
          <div ref={chatBoxRef}></div>
          
    </Box>
    <form onSubmit={handleSubmit} style={{width:'96%',bordeRadius:'8px',flex:1}}>
    <Stack direction={'row'} useFlexGap sx={{alignItems:'center', justifyContent:'flex-start',width:'100%',margin:'0px',position:'absolute', bottom:'3px',left:'5px'}} >
      <QuestionField/>
      <IconButton type='submit' onClick={handleClick}>
        <SendOutlinedIcon sx={{width:'20px',color:'#1b2962'}} />
      </IconButton>
    </Stack>
    </form>
    </Box>
  )
}

export default ChatBox