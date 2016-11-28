module.exports = (msg) => {

    return {
        id: msg.id,
        name: msg.name,
        type: msg.type,
        text: msg.text,
        date: new Date(msg.date)
    }
}