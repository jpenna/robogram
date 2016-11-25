const React = require('react');

class ChatBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            buttonClass: null
        }

        this.changeActive = this.changeActive.bind(this);

    }

    changeActive(id, name) {
        this.props.changeActive(id, name);
    }

    changeClass() {
        let isThisActive = this.props.activeId == this.props.id;

        let buttonClass = 'panel-block no-button preview-button';
        isThisActive ? buttonClass += ' active-chat' : buttonClass;

        this.state.buttonClass = buttonClass;
    }

    render() {
        this.changeClass();

        let date;

        let today = new Date().setHours(0,0,0,0);
        let sendDate = new Date(this.props.date).setHours(0,0,0,0);

        if (today == sendDate) {
            date = new Date(this.props.date).toLocaleString("pt-BR", {
                hour: 'numeric',
                minute: 'numeric'
            })
        } else if (today - sendDate < 86401000) {
            date = "Ontem"
        } else if (today - sendDate < 7*86401000) {
            date = new Date(this.props.date).toLocaleString("pt-BR", {
                weekday: 'short'
            });

            date = date.charAt(0).toUpperCase() + date.slice(1)

        } else {
            date = new Date(this.props.date).toLocaleString("pt-BR", {
                day: 'numeric',
                month: 'numeric'
            })
        }

        return (
            <button className={this.state.buttonClass}
                    onClick={() => this.changeActive(this.props.id, this.props.name)}>
                <div className="media">
                    <figure className="media-left">
                        <p className="image is-64x64 is-50x50">
                            <img className="avatar-image" src="http://placehold.it/128x128"/>
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <div className="level">
                                <div className="level-left">
                                    <p className="level-item preview-name">{this.props.name}</p>
                                </div>
                                <div className="level-right">
                                    <small className="level-item preview-time">{date}</small>
                                </div>
                            </div>
                            <p className="preview-text">{this.props.lastMessage}</p>
                        </div>
                    </div>
                </div>
            </button>
        )
    }
}

module.exports = ChatBox;