describe('reply', function () {
    var reply = require('../reply');
    var models = require('../../../models/index');
    var msg;
    var message;
    var res;
    var websocket;

    beforeAll(function () {
        msg = {
            chat: {
                id: 1,
                name: 'name'
            },
            text: 'text'
        };
        message = 'some reply text';
        websocket = { sendMessage: function() {} };
        res = {text: () => {}};
    })


    it('should call insertMessage (DB)', function () {
        spyOn(models, 'insertMessage');

        reply(msg, message, res, websocket);

        expect(models.insertMessage).toHaveBeenCalled();
    });

    it('should call sendMessage (Web Socket)', function () {
        spyOn(websocket, 'sendMessage');

        reply(msg, message, res, websocket);

        expect(websocket.sendMessage).toHaveBeenCalled();

    });

    it('should call getMessageModel (DB model)', function () {
        spyOn(models.model, 'getMessageModel');

        reply(msg, message, res, websocket);

        expect(models.model.getMessageModel).toHaveBeenCalled();
    });

    it('should call patterns (respond to Client)', function () {
        spyOn(res, 'text');

        reply(msg, message, res, websocket);

        expect(res.text).toHaveBeenCalled();
    });
})