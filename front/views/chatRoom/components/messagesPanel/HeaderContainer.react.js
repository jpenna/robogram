const React = require('react');

class HeaderContainer extends React.Component {

    render() {
        return (
        <div className="header-container">
            <p className="title is-4 chat-name">{this.props.first_name} {this.props.last_name}</p>
        </div>
        )
    }
}

module.exports = HeaderContainer;