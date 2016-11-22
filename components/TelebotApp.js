const React = require('react')
const ChatList = require('./ChatList')

function TB(params) {

    class TelebotApp extends React.Component {

        constructor(props) {
            super(props)
            this.states = {
                value: this.props.value
            }
        }

        changeValue(value) {
            this.setState({value: value})
        }

        render() {
            return (
                <div className="box columns column is-10 is-offset-1 telebot-app">
                    {this.states.value}
                    <ChatList />

                    <input type='text' onChange={(value) => this.changeValue(value)} />

                </div>


            )
        }


    }

    return <TelebotApp value={params.value}/>;

}

module.exports = TB;