import * as React from 'react';
import { styled } from '@mui/system';
import { useStore } from '../store';
import '../styles.css'


export default function QuestionField() {
 
  const val= useStore((state)=>state.questions[0])
  const alterQuestion = useStore((state)=>state.alterQuestion)
  const handleInputBlur = ()=>{
    alterQuestion(val,0)
  }
    

  return (<>
  <textarea
  disabled={false}
  minRows={2}
  maxRows={4}
  placeholder="enter your question"
  value={val}
  onChange={(e)=>alterQuestion(e.target.value,0)}
  onBlur={handleInputBlur}
  style={{width:'100%'}}
  required
  className='textArea'
/>
 
  </>);
}
