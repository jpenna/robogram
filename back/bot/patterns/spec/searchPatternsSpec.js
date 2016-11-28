xdescribe('searchPatterns', function () {
    var searchPatterns = require('../searchPatterns');
    var start = require('../start');
    var getResponse = require('../getResponse');
    var reply = require('../../forward/reply');
    var msg;
    var res;
    var websocket;


    beforeEach(function () {
        msg = {
            chat: {
                id: 1,
                firstname: 'name',
                lastname: 'last'
            }
        };
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
    })

    it('should call Start if command = start', function () {
        start = jasmine.createSpy('').and.returnValue(false);

        msg.command = 'start';

        searchPatterns(msg, res, websocket);

        expect(startObj.start).toHaveBeenCalledTimes(1);
    });

    it('should call some Command if command != start', function () {
        getResponse = jasmine.createSpy().and.callFake(function getResponse() {
            return false;
        });

        msg.command = 'anything';

        searchPatterns(msg, res, websocket);

        expect(getResponse).toHaveBeenCalled();
    });

    it('should reply ONCE if getResponse returns a string', function () {
        getResponse = jasmine.createSpy().and.callFake(function getResponse() {
            return 'string';
        });
        reply = jasmine.createSpy();

        msg.command = 'anything';

        searchPatterns(msg, res, websocket);

        expect(reply).toHaveBeenCalledTimes(1);
    });

    it('should reply + THAN ONCE if getResponse returns an Array', function () {
        getResponse = jasmine.createSpy().and.callFake(function getResponse() {
            return ['response', 'another response'];
        });
        reply = jasmine.createSpy();

        msg.command = 'anything';

        searchPatterns(msg, res, websocket);

        expect(reply).toHaveBeenCalledTimes(2);
    });

    it('should reply if there is no command', function () {
        reply = jasmine.createSpy();

        searchPatterns(msg, res, websocket);

        expect(reply).toHaveBeenCalled();
    });
});