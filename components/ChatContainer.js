const React = require('react')
const HeaderContainer = require('./HeaderContainer')
const MessagesSpace = require('./MessagesSpace')
const InputContainer = require('./InputContainer')

class ChatContainer extends React.Component {


    render() {
        return (
            <div className="column is-9 chat-container">
                <HeaderContainer first_name={this.props.chats[this.props.activeId].first_name}
                                 last_name={this.props.chats[this.props.activeId].last_name}/>
                <MessagesSpace chats={this.props.chats} activeId={this.props.activeId}/>
                <InputContainer newMessage={this.props.newMessage} />
            </div>
        )
    }
}

module.exports = ChatContainer