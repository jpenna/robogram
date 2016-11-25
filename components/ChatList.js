const React = require('react')
const ChatBox = require('./ChatBox')

class ChatList extends React.Component {

    render() {

        const list = [];
        const chatList = this.props.chats;

        for (let key in chatList) {
            let chat = chatList[key]
            let lastKey = chat.messages.length - 1;

            list.push(
                <ChatBox key={key}
                         id={key}
                         name={chat.first_name}
                         date={chat.messages[lastKey].date}
                         lastMessage={chat.messages[lastKey].message}
                         activeId={this.props.activeId}
                         changeActive={this.props.changeActive}/>
            )
        }

        return (
            <div className="panel column is-3 chat-list is-hidden-mobile">
                <p className="panel-heading chat-list-heading">
                    Contacts
                </p>
                <div className="chat-list-overflow">
                {list}
                </div>
            </div>
        )
    }
}

module.exports = ChatList