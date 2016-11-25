const React = require('react');

class MessagesSpace extends React.Component {

    render() {

        let date;

        let today = new Date().setHours(0, 0, 0, 0);
        let sendDate = new Date(this.props.date).setHours(0, 0, 0, 0);

        if (today == sendDate) {
            date = new Date(this.props.date).toLocaleString("pt-BR", {
                hour: 'numeric',
                minute: 'numeric'
            })
        } else if (today - sendDate < 86401000) {
            date = "Ontem"
        } else if (today - sendDate < 7 * 86401000) {
            date = new Date(this.props.date).toLocaleString("pt-BR", {
                weekday: 'short',
                hour: 'numeric',
                minute: 'numeric'
            });

            date = date.charAt(0).toUpperCase() + date.slice(1)

        } else {
            date = new Date(this.props.date)

            let days = date.toLocaleString("pt-BR", {
                day: 'numeric',
                month: 'numeric'
            });

            let time = date.toLocaleString("pt-BR", {
                hour: 'numeric',
                minute: 'numeric',
            });

            date = days + ', ' + time
        }

        let isOrange = this.props.type == 'client' ? 'is-orange' : '';
        let nameStyle = `${isOrange} level-item client-name`;

        return (

            <div className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img className="avatar-image" src="http://placehold.it/128x128"/>
                    </p>
                </figure>
                <div className="media-content msg-context">
                    <div className="content">
                        <div className="level message-info">
                            <div className="level-left">
                                <p className={nameStyle}>{this.props.author}</p>
                                {this.props.type == "bot" && <span className="tag is-dark-blue bot-small">BOT</span>}
                            </div>
                            <div className="level-right">
                                <small className="level-item">{date}</small>
                            </div>
                        </div>
                        <p className="message-text">{this.props.message}</p>
                    </div>
                </div>
            </div>

        )
    }
}

module.exports = MessagesSpace;