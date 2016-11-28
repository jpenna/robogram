
function getResponse (msg, cmd) {
    switch (cmd) {
        case 'sayhi':
            return ['Olá!', 'Como você está?'];
            break;
        case 'whereareyou':
            return ['Here is where I am: -19.928232, -43.9439383', "Don't visist me.", "Just kidding! 😎", "or not. 👺"];
            break;
        case 'id':
            return "Your id is: " + msg.chat.id;
            break;
        case 'saybye':
            return "See you later! 👋";
            break;
        default:
            return "I don't know what this command mean 😅";
            break;
    }
}

module.exports = getResponse;