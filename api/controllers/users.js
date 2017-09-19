const Users = require('../models/users.js');

module.exports = {
    // create
    post: function (req, res) {
        Users.createUser(req.body)
            .then(
                function (result) {
                    res.json({
                        data: result
                    });
                },
                function (err) {
                    res.json({
                        data: {
                            'error': err.code,
                            'msg': err.message
                        }
                    });
                }
            );
    },

    // read
    get: function (req, res) {
        var id = req.swagger.params.id.value;
        Users.getUserById(id)
            .then(
                function (result) {
                    res.json({
                        data: result
                    });
                }
            );
    },

    // update
    put: function (req, res) {
        var id = req.swagger.params.id.value;
        var data = req.body;
        Users.updateUserById(id, data)
            .then(
                function (result) {
                    res.json({
                        data: result
                    });
                }
            );
    },

    // delete
    delete: function (req, res) {
        res.json({});
    }
};