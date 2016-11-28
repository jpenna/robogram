describe('prepareConnection', function () {
    var prepareConnection = require('../prepareConnection');
    var ee = require('event-emitter');
    var socket;

    beforeEach(function () {
        var socket = ee({});
    });

    it('should call on(connection)', function () {
        spyOn(socket).and.returnValue(ee({}));

        prepareConnection(socket);

        expect(socket.on).toHaveBeenCalledWith('connection');

    });

    it('should call on(disconnect) <- after on(connection) called', function () {

    });

    it('should call on(chat message) <- after on(connection) called', function () {

    });


});