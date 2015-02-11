var ReactTools = require('react-tools');

// Quickfix for relative path references until jest supports NODE_PATH
// https://github.com/facebook/jest/issues/102
var replacePath = function(src, path) {
  var srcPath = path.match(/^.*ui\//)[0] + 'src/js/';
  return src.replace(/require\((['"])components/g, 'require($1' + srcPath + 'components/')
            .replace(/require\((['"])interfaces/g, 'require($1' + srcPath + 'interfaces/');
};

module.exports = {
  process: function(src, path) {
    src = replacePath(src, path);
    return ReactTools.transform(src);
  }
};
