import "./style.css"

function ChatItem(props){
    const getData=new Date(props.data);
    return(
        <div className="aside-panel-item" onClick={()=>(
            props.setCurrentUserChat(props.chatId)
        )}>
            <div className="left-side">
                <div className="avatar-user">
                    <img src={props.user.avatar}/>
                </div>
                <div className="user-info">
                    <h3 className="user-info__name">{props.user.name}</h3>
                    <p className="user-info__lastMessage">{props.text}</p>
                </div>
            </div>
            <div className="rigth-side">
                <div className="data-message">
                    <p>{`${getData.getMonth()}.${getData.getDate()}.${getData.getFullYear()}`}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatItem;