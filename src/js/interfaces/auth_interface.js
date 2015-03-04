var request = require('superagent');
var camelizeKeys = require('humps').camelizeKeys;

var AuthInterface = function(host) {
  this.host = host;
}

AuthInterface.prototype = {
  // User
  getCurrentUser: function(successHandler, errorHandler) {
    request
      .get(this.host + '/auth/users/logged_in')
      .withCredentials()
      .end(function(res) {
        if (res.ok) {
          successHandler(camelizeKeys(res.body));
        } else {
          errorHandler(camelizeKeys(res.body));
        }
      });
  },

  addUser: function(user, successHandler, errorHandler) {
    request
      .post(this.host + '/auth/users')
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
      .put(this.host + '/auth/users/' + userId)
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
      .del(this.host + '/auth/users/' + userId)
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
      .put(this.host + '/users/auth/' + userId + '/associate')
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
    var user = {
      email: email,
      password: password
    }
    request
      .post(this.host + '/auth/sessions')
      .send(JSON.stringify(user))
      .end(function(res) {
        if (res.ok) {
          successHandler(camelizeKeys(res.body));
        } else {
          errorHandler(camelizeKeys(res.body));
        }
      });
  },

  deleteSession: function(responseHandler) {
    request
      .del(this.host + '/auth/sessions')
      .withCredentials()
      .end(function(res) {
        responseHandler(camelizeKeys(res.body));
      });
  },

  // Control Server
  addControlServer: function(server, successHandler, errorHandler) {
    request
      .post(this.host + '/auth/control_servers')
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
      .put(this.host + '/auth/control_servers/' + serverId)
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
