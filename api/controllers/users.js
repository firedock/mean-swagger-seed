const Users = require('../models/users.js');

module.exports = {
    post: function (req, res) {
        Users(req.body).save() // returns a promise
            .then(
                function (result) {
                    res.json(result);
                })
            .catch(function (err) {
                console.log('error:', err);
            });
    },

    get: function (req, res) {
        Users.find().exec()
            .then((result) => {
                res.json(result);
            })
            .catch(function (err) {
                console.log('error:', err);
            });
    },

    getById: function (req, res) {
        var id = req.swagger.params.id.value;
        Users.findById({
                _id: id
            }).exec()
            .then((result) => {
                res.json(result);
            })
            .catch(function (err) {
                console.log('error:', err);
            });
    },

    put: function (req, res) {
        var id = req.swagger.params.id.value;
        Users.findByIdAndUpdate({
                _id: id
            }, {
                $set: req.body
            }).exec()
            .then((result) => {
                res.json(result);
            })
            .catch(function (err) {
                console.log('error:', err);
            });
    },

    delete: function (req, res) {
        var id = req.swagger.params.id.value;
        Users.findByIdAndRemove({
                _id: id
            }).exec()
            .then((result) => {
                res.json(result);
            })
            .catch(function (err) {
                console.log('error:', err);
            });
    }
};