import "./asidePanelChatStyle.css"
import React ,{useState,useEffect} from "react";
import ChatItem from "../ChatItem/ChatItem";
import {isEqual} from '../../helpers/chats.helper'

function AsidePanelChats(props) {
    const [searchValue, setSearchValue]=useState("")
    const [hideAsideBlock, setHideAsideBlock]=useState(false);
    
    const currentUser = props.users.find((user)=>user.id === props.currentUserId);
    const searchHandler=(value)=>{
        setSearchValue(value);
    }
    function handleSubmit(e) {
        e.preventDefault();
    }
    const [avaliableChats,setAvalibleChats]= useState([]);
    
    useEffect(()=>{
        if(searchValue.length === 0){
            setAvalibleChats(props.chats);
        }else{
            setAvalibleChats(props.chats.filter(chat=>{
                let chatName = '';
                const [fromUserId] = chat.usersId.filter((userId)=>userId !== props.currentUserId);
                const fromUser = props.users.find((user)=>user.id === fromUserId);
                chatName = fromUser.name;
                return isEqual(chatName,searchValue);
            })
            );
        }
    },[searchValue])
    
    return(
        <div className={`${hideAsideBlock ? 'hide' : ''} aside-panel`}>
            <div className="aside__panel-header ">
            <div className="user-avatar">
                    <img src={currentUser.avatar}/>
                    </div>
                <div className="search-bar">
                    <form onSubmit={handleSubmit}>
                        <input value={searchValue} onChange={(e)=>searchHandler(e.target.value)} placeholder="Search or start new chat"/>
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg>
                    </form>
                </div>
            </div>
            <div className="wrapper">
            <div className="name-of-topic">
                <h2>Chats</h2>
            </div>
            {avaliableChats.map((chat)=>
                {   
                    const [fromUserId] = chat.usersId.filter((userId)=>userId !== props.currentUserId);
                    const fromUser = props.users.find((user)=>user.id === fromUserId);
                    
                    const lastMessage = chat.messages[chat.messages.length-1];
                    return <ChatItem text={lastMessage.value} chatId={chat.id} data={lastMessage.dataTime} user={fromUser} key={chat.id} setCurrentUserChat={props.setCurrentUserChat}/>
                }
            )}
            </div>
            
        </div>
    )
    
}
export default AsidePanelChats;