describe('getConversationModel', function () {
    var getMessageModel = require('../getMessageModel');

    it('should return JSON formatted for db insertion', function () {

        let model = {
            name: 'name',
            type: 'type',
            text: 'text',
            date: new Date(10)
        }

        let returned = getMessageModel('name', 'type', 'text', new Date(10));

        expect(model).toEqual(returned);
    });

})