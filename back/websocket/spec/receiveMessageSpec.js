describe('receiveMessage', function () {
    var receiveMessage = require('../receiveMessage');
    var bot = require('../../bot');
    var models = require('../../models');
    var data;

    beforeEach(function () {
        data = {
            id: 1,
            name: 'name',
            type: 'type',
            text: 'some text',
            date: new Date(1)
        }
    });


    it('should call insertMessage (DB)', function () {
        spyOn(models, 'insertMessage');

        receiveMessage(data);

        expect(models.insertMessage).toHaveBeenCalled();
    });

    it('should call sendTelegram', function () {
        spyOn(bot, 'sendTelegram');

        receiveMessage(data);

        expect(bot.sendTelegram).toHaveBeenCalled();

    });

    it('should call getMessageModel (DB model)', function () {
        spyOn(models.model, 'getMessageModel');

        receiveMessage(data);

        expect(models.model.getMessageModel).toHaveBeenCalled();
    });

})