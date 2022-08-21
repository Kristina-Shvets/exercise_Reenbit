import Message from '../Message/Message';
const ListOfMessages = ({messages,currentUserId,users})=>{
    return (
        <div className="messages-wrapper">
            {messages.map((message)=>{
            const userOfMessage = users.find(user=>user.id === message.fromUserId);
            return <Message messageText={message.value} data={message.dataTime} avatarUser={userOfMessage.avatar} own={message.fromUserId === currentUserId} />
        })}
        </div>
        
    )
}
export default ListOfMessages;