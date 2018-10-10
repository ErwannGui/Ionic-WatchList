'use strict';
module.exports = function(app) {
    var crud = require('../controllers/crudController');

    // crud Routes
    app.route('/api/users')
        .get(crud.list_all_users);

    app.route('/api/new')
        .post(crud.create_an_user);

    app.route('/api/user/:userId')
        .get(crud.details)

    app.route('/api/modify/:userId')
        .put(crud.update_an_user)

    app.route('/api/delete/:userId')
        .delete(crud.delete_an_user);
};