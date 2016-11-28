describe('getResponse', function () {
    var getResponse = require('../getResponse');

    it('should return default if no command found', function () {

        let msg = {msg: 'msg'};
        let cmd = 'no command found';

        let defaultText = "I don't know what this command mean 😅";

        let returned = getResponse(msg, cmd);

        expect(returned).toEqual(defaultText);
    })
})