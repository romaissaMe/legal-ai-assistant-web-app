import { Typography, Box, Button, Stack} from '@mui/material'
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
    <Stack className="home" sx={{height:'100%',alignItems:'center',justifyContent:'center',padding:{xs: '10px 20px 0 20px', sm: '10px 20px 0 20px',md:'10px 20px 0 20px', lg:'10px 20px 0 20px'},overflowY:'scroll',overflowX:'hidden'}} >
       <Stack direction={{ xs: 'column', sm: 'row',md:'row', lg:'row' }} gap={{xs: '10px', sm: '0px',md:'15%', lg:'20%' }}>
        <img className='home-img' src='balance_of_justice.png' alt="ai lawyer" /> 
        <Stack sx={{alignItems:'center',justifyContent:'center'}}>
        <Typography sx={{textAlign:'center',fontWeight:'800',color:'#E0E0E0',fontSize:{xs: '20px', sm: '25px',md:'25px', lg:'25px'}}}> 
            Ask Your Legal Ai Assistant
        </Typography>
        <Typography sx={{textAlign:'justify',fontWeight:'500',color:'chatsBgc.main',fontSize:{xs: '14px', sm: '16px',md:'16px', lg:'16px'},marginTop:'20px', marginBottom:'2px',width:{xs: '100%', sm: '100%',md:'90%', lg:'90%'}}}>
        Welcome to a new era of legal assistance <strong>where AI meets the law</strong>, transforming the way you work and achieve success in the legal arena.
        </Typography>
        <Typography sx={{textAlign:'justify',fontWeight:'500',color:'chatsBgc.main',fontSize:{xs: '14px', sm: '16px',md:'16px', lg:'16px'},marginTop:{xs: '2px', sm: '20px',md:'20px', lg:'20px'}, marginBottom:'20px',width:{xs: '100%', sm: '100%',md:'90%', lg:'90%'}}}>
        Combining cutting-edge technology with legal expertise to streamline research, analyze documents, and provide invaluable insights. 
        </Typography>
        
        <Button variant='homeBtn' sx={{marginBottom:'20px'}} onClick={handleStart}>
           Click To Start Chatting
        </Button> 
        </Stack>
       </Stack>
    </Stack>

  )
}

export default Home