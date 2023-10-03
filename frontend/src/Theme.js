import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      mode:'dark',
      background: {
        default: '#E6EEFF',
      },
      appBar:{
       main:'#E6EEFF',
      },
      chatBox:{
        main:'',
      },
      chatBgc:{
         main:'',
      },
      chatsBgc:{
        main:'#B0C4DE', 
      },
      callAction:{
        main:'#0047AB',
        light:'#3366BB',
      },
      sideBarTextColor:{
        main:'#2F4F4F',
        secondary:'#FFFFFF',
      },
      gold:{
        main:'#D89B00'
      }
    
    },
    typography:{
        fontFamily:['Montserrat','sans-serif'].join(','),
        fontSize: '18px',
        color:'#FFFFF0',
        logo:{
            color:'#1b2962',

        },

        },
        components: {
            MuiTypography: {
              styleOverrides: {
                msg: {
                  fontWeight: 400,
                },
              },
            },
            MuiButton: {
              variants: [
                {
                  props: { variant: 'clicked' },
                  style: {
                    textTransform: 'none',
                    backgroundColor:'#D89B00',
                    fontWeight: 300,
                    fontSize: 13,
                    width:85,
                    height:25,
                    paddingTop:0,
                    paddingRight:1,
                    paddingBottom:0,
                    paddingLeft: 1,
                    '&:hover': {
                      color:'#2F4F4F',
                      fontWeight: 400,
                      transition:'background-color 0.4s, color 0.4s',
                    },
                  },
                },
                {
                  props: { variant: 'secondaryButton' },
                  style: {
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: 13,
                    color:'#2F4F4F',
                    border:'1px solid #9db3d0',
                    width:85,
                    height:25,
                    paddingTop:0,
                    paddingRight:1,
                    paddingBottom:0,
                    paddingLeft: 1,
                  },
                },
                {
                  props: { variant: 'mainBtn' },
                  style: {
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: 14,
                    backgroundColor:'#0047AB',
                    '&:hover': {
                      backgroundColor: 'transparent', 
                      color:'#0047AB',
                      transition:'background-color 0.7s, color 0.9s',
                    },
                  },
                },
              ],
            },
        },
  });

export default theme