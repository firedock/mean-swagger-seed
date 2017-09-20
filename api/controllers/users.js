const Users = require('../models/users.js');

module.exports = {
    create: function (req, res) {
        Users(req.body).save() // returns a promise
            .then(
                function (result) {
                    res.json(result);
                })
            .catch(function (err) {
                // just need one of these
                console.log('error:', err);
            });
    },

    get: function (req, res) {
        var id = req.swagger.params.id.value;
        Users.findOne({
                _id: new mongoose.Types.ObjectId(id)
            }).exec()
            .then((result) => {
                res.json(result);
            })
            .catch(function (err) {
                console.log('error:', err);
            });
    },

    getAll: function (req, res) {
        Users.find().exec()
            .then((result) => {
                res.json(result);
            })
            .catch(function (err) {
                console.log('error:', err);
            });
    },

    updateById: function (req, res) {
        var id = req.swagger.params.id.value;
        Users.update({
                _id: new mongoose.Types.ObjectId(id)
            }, {
                $set: req.body
            }).exec()
            .then()
            .catch(function (err) {
                console.log('error:', err);
            });
    }
};