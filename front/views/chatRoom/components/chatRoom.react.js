const React = require('react');
const ReactDOM = require('react-dom');
const ChatList = require('./chatsList/ChatList.react');
const MessagesPanel = require('./messagesPanel/MessagesPanel.react');

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);

        this.socket = socket;

        this.state = {
            chats: props.chats.chats,
            activeId: props.chats.activeId,
        }

        this.changeActive = this.changeActive.bind(this);
        this.newMessage = this.newMessage.bind(this);
        this.insertNewMessage = this.insertNewMessage.bind(this);
        this.insertNewClient = this.insertNewClient.bind(this);
    }

    insertNewMessage(chatId, author, type, text, date) {
        let chatMessage = {
            author: author,
            type: type,
            message: text,
            date: date
        }

        let newChat = this.state.chats;
        newChat[chatId].conversation.push(chatMessage);

        this.setState({chats: newChat})
    }

    insertNewClient(clientData) {

        let client = {
            chat_id: clientData.chatId,
            first_name: clientData.first_name,
            last_name: clientData.last_name,
            avatar: clientData.avatar,
            conversation: []
        }

        let chats = this.state.chats;
        chats[clientData.chatId] = client;

        this.setState({chats: chats});

    }

    componentWillMount() {
        window.newUser = (data) => {

            let client = {
                chatId: data.chat_id,
                first_name: data.first_name,
                last_name: data.last_name,
                avatar: data.avatar,
                conversation: []
            }

            this.insertNewClient(client)

        }

        window.newMessage = (data) => {

            let chatId = data.chatId;
            let author = data.author;
            let type = data.type;
            let text = data.text;
            let date = data.date;

            this.insertNewMessage(chatId, author, type, text, date)

        };


    }

    componentDidMount() {
        this.scrollBottom();
    }

    componentDidUpdate() {
        this.scrollBottom();
    }

    changeActive(id) {
        this.setState({activeId: id}, this.scrollBottom())
    }

    newMessage(message) {

        let activeChat = this.state.activeId;
        let author = 'Telebot';
        let type = 'user';
        let text = message.message;
        let date = message.date;

        this.socket.emit('chat message', {chatId: activeChat, type: type, text: text});

        this.insertNewMessage(activeChat, author, type, text, date)

    }

    scrollBottom() {
        var messageArea = document.getElementsByClassName("messages-container");
        messageArea[0].scrollTop = messageArea[0].scrollHeight;
    }

    render() {
        return (
            <div className="box columns column is-10 is-offset-1 telebot-app">
                <ChatList chats={this.state.chats} activeId={this.state.activeId} changeActive={this.changeActive}/>
                <MessagesPanel chats={this.state.chats} activeId={this.state.activeId} name={this.state.name}
                               newMessage={this.newMessage}/>
            </div>
        )
    }
}

ReactDOM.render(
    <ChatRoom chats={initialState} socket={socket}/>,
    document.getElementById('container')
)