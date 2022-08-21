import "./message.css"
import React, {useState ,useEffect} from "react";

function Message({messageText,data , avatarUser ,own}){
    return(
        <div className={own ? "message own" : "message"}>
            <div className="message__user-avatar">
                <img src={avatarUser} className="image-user"></img>
            </div>
            <div className="message__time-and-text">
                <div className="message_text">
                    {messageText}
                </div>
                <p className="message_time">{`${new Date(data).getMonth()}/${new Date(data).getDate()}/${new Date(data).getFullYear()} ,${new Date(data).getHours()}:${new Date(data).getMinutes()} AM`}</p>
            </div>
        </div>
                )
}
export default Message;