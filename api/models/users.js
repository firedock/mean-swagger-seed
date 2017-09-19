const mongoose = require('../helpers/mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('q').Promise;
assert.ok(query.exec() instanceof require('q').makePromise);

// schema
const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: String,
    firstName: String,
    lastName: String,
    permissions: Array,
    created: {
        type: Date,
        default: Date.now
    }
});

// model
const Users = mongoose.model('users', userSchema);

module.exports = {

    createUser: function (data) {
        data._id = mongoose.Types.ObjectId();
        return q.Promise(function (resolve, reject) {
            Users(data).save(function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        });
    },

    getUserById: function (id) {
        return q.Promise(function (resolve, reject) {
            Users.findOne({
                _id: new mongoose.Types.ObjectId(id)
            }, function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }
            });
        });
    },

    getUsers: function () {
        return q.Promise(function (resolve, reject) {
            Users.find(function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    },

    updateUserById: function (id, data) {
        return q.Promise(function (resolve, reject) {
            Users.update({
                    _id: new mongoose.Types.ObjectId(id)
                }, {
                    $set: data
                },
                function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
        });
    }
};