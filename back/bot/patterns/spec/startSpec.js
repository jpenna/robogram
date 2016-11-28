describe('start', function () {
    var start = require('../start');
    var models = require('../../../models/index');
    var msg;
    var res;
    var websocket;
    var promise;

    beforeAll(function () {
        msg = {
            chat: {
                id: 1,
                firstname: 'name',
                lastname: 'last'
            },
            text: 'text'
        }
        res = {
            text: () => {
            }
        };
        websocket = {
            sendMessage: () => {
            },
            sendChat: () => {
            }
        };
        promise = new Promise(function (res, rej) {
            res(false);
        });
    })

    it('should call getChatModel (DB model)', function () {
        spyOn(models.model, 'getChatModel');

        start(msg, res, websocket);

        expect(models.model.getChatModel).toHaveBeenCalled();
    });

    it('should call insertChat (DB)', function () {
        spyOn(models, 'insertChat').and.returnValue(promise);

        start(msg, res, websocket);

        expect(models.insertChat).toHaveBeenCalled();
    });

    it('should call sendChat (Web Socket)', function () {
        spyOn(websocket, 'sendChat').and.returnValue(promise);

        start(msg, res, websocket);

        expect(websocket.sendChat).toHaveBeenCalled();

    });
    
    
})