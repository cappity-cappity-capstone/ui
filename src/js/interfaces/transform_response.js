var transformResponse = function (resp) {
  return JSON.parse(resp.text);
};

module.exports = transformResponse;
