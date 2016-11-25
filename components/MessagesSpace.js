const React = require('react')
const MessageBox = require('./MessageBox')

class MessagesSpace extends React.Component {

    render() {

        var talks;
        talks = this.props.chats[this.props.activeId].messages;

        var conversation = talks.map((talk) => {
            return <MessageBox key={talk.time} author={talk.author} message={talk.message} date={talk.date} type={talk.type}/>

        })

        return (
            <div className="panel messages-space">
                <div className="panel-block column is-offset-1 message-box">
                    {conversation}
                </div>
            </div>
        )
    }
}

module.exports = MessagesSpace