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
  const file = useStore((state)=> state.file)
  const question = useStore((state)=>state.questions[0])
  const currentChat=useStore((state)=>state.currentChat)
  const alterQuestion=useStore((state)=>state.alterQuestion)
  const processingFile=useStore((state)=>state.processingFile)
  const [pending,setPending] = React.useState(false)
  const chatBoxRef = React.useRef(null)
  const yes = React.useState(false)
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
    <Box display={'flex'} gap={'10px'}  sx={{height:'89%',flexDirection:'column',justifyItems:'space-between',alignItems:'center',width:'100%',borderRadius:'0px 0px 0px 8px',marginRight:'20px',marginTop:'10px',padding:'5px',paddingTop:'0px',paddingBottom:'0px'}} bgcolor={'chatBox.main'} >
      <Box sx={{bgcolor:'chatBgc.main',width:'100%', height:'100%',padding:'20px',overflowY:'scroll',borderRadius:'8px 0px 0px 0px'}} className="chat-box">
          <InitConvo/>
          {conversation && conversation.map((msg,index)=>{
            return <Box key={index}><Message {...msg} index={index}/></Box>
          })}
            {pending &&  <DotWave 
                        size={40}
                        speed={1} 
                        color="#E6EEFF" 
                        />}
          {/* <div ref={chatBoxRef}></div> */}
          
      </Box>
      <form onSubmit={handleSubmit} style={{width:'96%',bordeRadius:'8px'}}>
        <Stack direction={'row'} useFlexGap sx={{alignItems:'center', justifyContent:'flex-start',width:'100%',margin:'0px'}} >
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