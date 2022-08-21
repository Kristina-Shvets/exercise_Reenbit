import React, {useEffect, useState} from "react";
import Message from "../Message/Message";
import ChatBoxBottom from "./ChatBoxBottom";
import HeaderWindowChat from "./HeaderWindowChat";
import { v4 as uuidv4 } from 'uuid';
import ListOfMessages from "./ListOfMessages";
import "./windowChat.css"


function WindowChat({chats ,users,currentUserId,currentUserChatId,addNewMessage}){

    const [currentChat,setCurrenChat] = useState(null);
    const [fromUser,setFromUser] = useState(null);

    useEffect(()=>{
        if(currentUserChatId && currentUserId){
            setCurrenChat(chats.find((chat)=>chat.id === currentUserChatId));       
        }
    },[chats,currentUserId,currentUserChatId])
    
    useEffect(()=>{
        if(currentChat){
            const [fromUserId] = currentChat.usersId.filter((userId)=>userId !== currentUserId);
            setFromUser(users.find((user)=>user.id === fromUserId));
        }
    },[currentChat])
   

    const addMessageHandler = (textValue)=>{
        const newMessage = {
            id:uuidv4(),
            value:textValue,
            dataTime:new Date(),
            fromUserId:currentUserId ,
            toUserId:fromUser.id
        }
        addNewMessage(currentUserChatId,newMessage);
    }

    return(
            <div className="my-messages">
                        {
                currentChat?.messages?.length && fromUser ? 
                <>
                    <HeaderWindowChat userAvatar={fromUser.avatar} userName={fromUser.name}/>
                    <ListOfMessages messages={currentChat.messages} currentUserId={currentUserId} users={users}/>
                    <ChatBoxBottom addMessageHandler={addMessageHandler}/>
                </> 
                :<div>There is nothing....</div>
            }
        </div>)   
}

export default WindowChat;