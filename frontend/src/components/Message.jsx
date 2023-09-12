import { Stack,Box,Typography} from '@mui/material'
import React from 'react'
import { useStore } from '../store';

function Message({type,message,image,index}) {
  const [time, setTime] = React.useState(new Date());
    //const url= process.env.REACT_APP_URL
  const url = 'http://127.0.0.1:8000'
  const conversation = useStore((state)=> state.conversation)
  const file = useStore((state)=> state.file)
  const setSources = useStore((state)=> state.setSources)
  const setShowChats = useStore((state)=>state.setShowChats)
  
  const getSources = async () =>{
    const filenameWithoutExtension = file.name.replace(/\.pdf$/, '')
    const question = conversation[index-1]['message']
    setShowChats(false)
    try{
      const res = await fetch(`${url}/ask/sources?file_path=${filenameWithoutExtension}&question=${question}`)
      const data = await res.json()
      const src = JSON.parse(data)
      setSources(src['sources'])
    }catch(err){
      console.log(err)
    }

  }
  return (
    <Stack direction='row' spacing ={2} sx={{alignItems:'baseline',justifyContent:'baseline',padding:'3px'}} useFlexGap>
        <Stack direction={'column'} sx={{fontSize:'12px',alignItems:'center',justifyContent:'center'}} >
            <Box>{type==='chatBot'?'ChatBot':'User'}</Box>
            <Box>{time.toLocaleTimeString()}</Box>
        </Stack>
        <Stack>
          <Typography variant='msg' mt={'0px'} sx={{justifySelf:'start',fontWeight: 100}}>
              {message}
          </Typography>
          {image && 
          <img src={`/${image}`} alt='img' style={{width:'250px',height:'300px',objectFit:'cover', border: '4px solid rgba(27, 41, 98, 1)', 
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          overflow: 'hidden'}}/>
          }
          {type==='chatBot' && index >= 1 && <Typography sx={{fontSize:'14px',textDecoration:'underline',cursor:'pointer'}} onClick={getSources}>src</Typography>}
        </Stack>
        
    </Stack>
  )
}

export default Message