describe('getMessageModel', function () {
    var getMessageModel = require('../getMessageModel');

    it('should return JSON formatted for db insertion', function () {

        let data = {
            id: 1,
            name: 'name',
            type: 'type',
            text: 'text',
            date: new Date(10)
        }

        let returned = getMessageModel(data);

        expect(data).toEqual(returned);
    });

})