import { create } from 'zustand'

export const useStore = create((set) => ({
  file:null,
  questions:[],
  anonymizedText:'',
  conversation:[],
  chats:[],
  currentChat:'',
  processingFile:false,
  sources:[],
  showChats:true,
  setFile:(file)=>{
    set({file:file});
  },
  setAnonymizedText:(text)=>{
    set({anonymizedText:text});
  },
  addQuestion: (q) => {
    set((state) => {
      const updatedQuestions = [...state.questions, q];
      return { questions: updatedQuestions };
    });
  },
  alterQuestion:(q,i) => {
    set((state) => {
      const updatedQuestions = [...state.questions];
      updatedQuestions[i]=q;
      return { questions: updatedQuestions };
    });
  },
  removeQuestion:(q,i) => {
    set((state) => {
      const updatedQuestions =state.question.filter((_,index)=>i !== index);
      return { questions: updatedQuestions };
    });
  },
  clearQuestions:() => {
    set((state) => {
      return { questions: [] };
    });
  },
  addConversation:(c) => {
    set((state) => {
      const updatedCoversation = [...state.conversation, c];
      return { conversation: updatedCoversation };
    });
  },
  setConversation:(newConvo) => {
    set({ conversation: newConvo })
  },
  clearConversation:() => {
    set({ conversation: [] })
  },
  addChat: (chat) => {
    set((state) => {
      const updatedChats = [...state.chats, chat];
      return { chats: updatedChats };
    });
  },
  setCurrentChat:(chat_id)=>{
    set({currentChat:chat_id});
  },
  ToggleProcessingFile:()=>{
    set((state) =>{return {processingFile: !state.processingFile}});
  },
  setSources: (sources)=>{
    set({sources:sources})
  },
  setShowChats: (val)=>{
    set({showChats:val})
  }
}))

