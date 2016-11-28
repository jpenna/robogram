describe('handleIncomming', function () {
    var handleIncomming = require('../handleIncomming');
    var models = require('../../../models/index');
    var patterns = require('../../patterns');
    var msg;
    var res;
    var websocket;

    beforeAll(function () {
        // Mock data
        msg = {
            chat: {
                id: 1,
                name: 'name'
            },
            text: 'text'
        };
        websocket = { sendMessage: function() {} };
        res = {text: () => {}};
    })


    it('should call insertMessage (DB)', function () {
        spyOn(models, 'insertMessage');

        handleIncomming(msg, res, websocket);

        expect(models.insertMessage).toHaveBeenCalled();
    });

    it('should call getMessageModel (DB model)', function () {
        spyOn(models.model, 'getMessageModel');

        handleIncomming(msg, res, websocket);

        expect(models.model.getMessageModel).toHaveBeenCalled();
    });

    it('should call sendTelegram', function () {
        spyOn(patterns, 'searchPatterns');

        handleIncomming(msg, res, websocket);

        expect(patterns.searchPatterns).toHaveBeenCalled();
    });
})