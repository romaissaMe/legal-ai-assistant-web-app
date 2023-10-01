import { create } from 'zustand'

export const useStore = create((set) => ({
  currentFile:null,
  questions:[],
  anonymizedText:'',
  conversation:[],
  chats:[],
  currentChat:'',
  processingFile:false,
  sources:[],
  showChats:true,
  closeSideBar:true,
  setCurrentFile:(file)=>{
    set({currentFile:file});
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
  removeChat:(chat_id) => {
    set((state) => {
      const updatedChats = state.chats.filter((chat)=> chat.chat_id != chat_id)
      return { chats: updatedChats };
    });
  },
  updateChats: (chat_id, val) => {
    set((state) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.chat_id === chat_id) {
          // If chat_id matches, update the chat_file
          return {
            ...chat,
            title:val.name,
            chat_file: val,
          };
        }
        // Otherwise, return the chat as is
        return chat;
      });
      return { chats: updatedChats };
    });
  },
  getFileForChat:(chat_id)=>{
    (state)=>{
    const chat = state.chats.find((item) => item.chat_id===chat_id)
    return chat ? chat.title : null;
  }
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
  },
  setCloseSideBar:(val)=>{
    set({closeSideBar:val})
  },
  setSources:(val)=>{
    set({sources:val})
  },
}))

