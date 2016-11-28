module.exports = (data) => {

    return {
        chat_id: data.id,
        first_name: data.firstName,
        last_name: data.lastName,
        avatar: data.avatar,
        conversation: []
    }
}