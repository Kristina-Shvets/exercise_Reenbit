

function HeaderWindowChat({userAvatar ,userName}){
    return(
        <div className="my__message-header">
                <div className="header-user-avatar">
                    <img src={userAvatar}/>
                    <h2>{userName}</h2>
                </div>
            </div>
    )
}

export default HeaderWindowChat;