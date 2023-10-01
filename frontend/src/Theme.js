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
         main:'rgba(26, 40, 95,0.8)',
      },
      chatsBgc:{
        main:'#1b2962', 
      }
    
    },
    typography:{
        fontFamily:['Montserrat','sans-serif'].join(','),
        fontSize: '18px',
        logo:{
            color:'#1b2962',

        },

        },
        components: {
            MuiTypography: {
              styleOverrides: {
                msg: {
                  fontWeight: 100,
                },
              },
            },
            MuiButton: {
              variants: [
                {
                  props: { variant: 'clicked' },
                  style: {
                    textTransform: 'none',
                    backgroundColor:'#1b2962',
                    fontWeight: 300,
                    fontSize: 13,
                    '&:hover': {
                      color:'#00C1CE',
                      transition:'background-color 0.4s, color 0.4s',
                    },
                  },
                },
                {
                  props: { variant: 'secondaryButton' },
                  style: {
                    textTransform: 'none',
                    fontWeight: 300,
                    fontSize: 13,
                    border:'1px solid #9db3d0',
                    backgroundColor:'#1b2962',
                  },
                },
                {
                  props: { variant: 'mainBtn' },
                  style: {
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: 14,
                    backgroundColor:'#1b2962',
                    '&:hover': {
                      backgroundColor: 'transparent', 
                      color:'#1b2962',
                      transition:'background-color 0.7s, color 0.9s',
                    },
                  },
                },
              ],
            },
        },
  });

export default theme