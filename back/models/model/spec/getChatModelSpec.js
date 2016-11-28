describe('getChatModel', function () {
    var getChatModel = require('../getChatModel');

    it('should return JSON formatted for db insertion', function () {

        let chatData = {
            chatId: 'id',
            firstName: 'name',
            lastName: 'last',
            avatar: 'x',
            nameForMessage: 'nameOne',
            type: 'type',
            text: 'text',
            date: new Date(10)
        }

        let chatModel = {
            chat_id: 'id',
            first_name: 'name',
            last_name: 'last',
            avatar: 'x',
            conversation: [{
                name: 'nameOne',
                type: 'type',
                text: 'text',
                date: new Date(10)
            }]
        }

        let returned = getChatModel(chatData);

        expect(chatModel).toEqual(returned);
    });

})