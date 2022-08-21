import React, {useState , useEffect} from "react";
import AsidePanelChats from "./components/AsidePanelChats/AsidePanelChats";
import WindowChat from "./components/WindowChat/WindowChat";
import { getMessage } from "./helpers/API.helper";
import { v4 as uuidv4 } from 'uuid';
import { setItem,getItem } from "./helpers/localStorageHelper";
const users=[
    {
        id:1,
        avatar:"./imgUsers/gamer.png",
        name: "Alison Silver"
    },
    {
        id: 2,
        avatar:"./imgUsers/girl.png",
        name:"Scot Macoul"
    },
    {
        id: 3,
        avatar:"./imgUsers/man.png",
        name:"Scot Macoul"
    },
    {
        id: 4,
        avatar:"./imgUsers/profile.png",
        name:"Styles Stelinsky"
    },
    {
        id: 5,
        avatar:"./imgUsers/woman (1).png",
        name:"Derek Heil"
    },
    {
        id: 6,
        avatar:"./imgUsers/woman.png",
        name:"Lidia Martin"
    }
]
const chatsData = [
    {
        id:1,
        messages:[{
            id:1,
            value:'Hello',
            dataTime:new Date(),
            fromUserId:2,
            toUserId:1     
        },{
            id:2,
            value:"Wait for you",
            dataTime:new Date(),
            fromUserId:2,
            toUserId:1     
        }],
        usersId:[1,2],
        lastMessageTime:new Date()
    },
    {
        id:2,
        messages:[{
            id:3,
            value:'You have to give me my money,bro',
            dataTime:new Date(),
            fromUserId:3,
            toUserId:1     
        },{
            id:4,
            value:"I`am waiting",
            dataTime:new Date(),
            fromUserId:3,
            toUserId:1     
        }],
        usersId:[1,3],
        lastMessageTime:new Date()
    },
    {
        id:3,
        messages:[{
            id:5,
            value:'So,what about your holidays ?',
            dataTime:new Date(),
            fromUserId:4,
            toUserId:1     
        },],
        usersId:[1,4],
        lastMessageTime:new Date()
    }
]
function Chat() {
    const [currentUserChat,setCurrentUserChat]=useState(null);
    const [currentUserId,setCurrentUserId] = useState(1)
    const [chats,setChats] = useState(chatsData);
    
    
    useEffect(()=>{
        const chatsFromLocalStorage = getItem('chats');
        if(chatsFromLocalStorage){
            setChats(JSON.parse(chatsFromLocalStorage));
        }else{
            setItem('chats',JSON.stringify(chats))
        }
    },[])

    const addChackNorisMessage = async (chatId,fromUser)=>{
        const messageText = await getMessage(); 
        
        setTimeout(()=>{
            const newMessage = {
                id:uuidv4(),
                value:messageText,
                dataTime:new Date(),
                fromUserId:fromUser,
                toUserId:currentUserId
            }
            const chatsCopy = [...chats];
            const changeChatId = chatsCopy.findIndex((chat)=>chat.id === chatId);
            chatsCopy[changeChatId].lastMessageTime = newMessage.dataTime;
            chatsCopy[changeChatId].messages.push(newMessage);
            chatsCopy.sort((a,b)=>{
                return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
            })
            setItem('chats',JSON.stringify(chatsCopy));
            setChats(chatsCopy);
        },10000)
    }
    const addNewMessage = async (chatId,message)=>{
        const chatsCopy = [...chats];
        const changeChatId = chatsCopy.findIndex((chat)=>chat.id === chatId);
        chatsCopy[changeChatId].lastMessageTime = message.dataTime;
        chatsCopy[changeChatId].messages.push(message);
        
        chatsCopy.sort((a,b)=>{
            return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
        })
        
        setChats(chatsCopy);
        setItem('chats',JSON.stringify(chatsCopy));
        addChackNorisMessage(chatId,message.toUserId);
    }
    
   

    return(
        <div className="main-container">
            <AsidePanelChats users={users}  setCurrentUserChat={setCurrentUserChat} chats={chats} currentUserId={currentUserId}/>
            <WindowChat chats={chats} currentUserChatId={currentUserChat} users={users} currentUserId={currentUserId} addNewMessage={addNewMessage}/>
        </div>
    )

    
}

export default Chat;