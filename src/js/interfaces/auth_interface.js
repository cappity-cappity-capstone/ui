var request = require('superagent');

var API_HOST = 'http://localhost:4567';

var AuthInterface = {
  // User
  getCurrentUser: function(responseHandler) {
    request
      .get(API_HOST + '/auth/users/logged_in')
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          responseHandler(res.body);
        }
      });
  },

  addUser: function(user, successHandler, errorHandler) {
    request
      .post(API_HOST + '/auth/users')
      .send(JSON.stringify(user))
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(user);
        }
      });
  },

  updateUser: function(userId, user, successHandler, errorHandler) {
    request
      .put(API_HOST + '/auth/users/' + userId)
      .send(JSON.stringify(user))
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(user);
        }
      });
  },

  deleteUser: function(userId, successHandler, errorHandler) {
    request
      .delete(API_HOST + '/auth/users/' + userId)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(userId);
        }
      });
  },

  associateUser: function(userId, successHandler, errorHandler) {
    request
      .put(API_HOST + '/users/auth/' + userId + '/associate')
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(userId);
        }
      });
  },

  // Session
  createSession: function(email, password, successHandler, errorHandler) {
    request
      .post(API_HOST + '/auth/sessions')
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(res);
        }
      });
  },

  deleteSession: function(successHandler, errorHandler) {
    request
      .delete(API_HOST + '/auth/sessions')
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(res);
        }
      });
  },

  // Control Server
  addControlServer: function(server, successHandler, errorHandler) {
    request
      .post(API_HOST + '/auth/control_servers')
      .send(server)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(res);
        }
      });
  },

  updateControlServer: function(serverId, server, successHandler, errorHandler) {
    request
      .put(API_HOST + '/auth/control_servers/' + serverId)
      .send(server)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(res);
        }
      });
  }
};

module.exports = AuthInterface;
