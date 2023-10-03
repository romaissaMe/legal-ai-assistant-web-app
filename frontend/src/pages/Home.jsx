import { Typography, Box, Button} from '@mui/material'
import React from 'react'
import { NewtonsCradle } from '@uiball/loaders'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '../images/backimg.jpg';



function Home({setPage}) {
  const navigate = useNavigate()
  const handleStart = () =>{
   navigate('/chat')
  }

  React.useEffect(()=>{
    setPage('')
  },[])
  return (
    <Box display={'flex'} className="home"  gap={'40px'} sx={{flexDirection:'column',alignItems:'center',overflow:'clip',padding:'20px',height:'100%'}}>
      {/* <img src={backgroundImage} alt="" /> */}
        <Typography sx={{textAlign:'center',fontWeight:'800',color:'chatsBgc.main',fontSize:'25px',marginTop:'20vh'}}> 
            Ask Your Legal Ai Assistant
        </Typography>
        
        <NewtonsCradle 
        size={50}
        speed={1.4} 
        color="#1b2962" 
        />
        <Button sx={{color:'black'}} onClick={handleStart}>
           Click To Start Chatting
        </Button> 
    </Box>
  )
}

export default Home