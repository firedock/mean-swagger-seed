'use strict';

module.exports = {
    getAllUsers: (req, res) => {
        res.json([{
            userId: 1,
            userName: 'robflanagan'
        }, {
            userId: 2,
            userName: 'joesomebody'
        }])
    }
}