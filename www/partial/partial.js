Function.prototype.partial = function() {
  var origArguments = Array.from(arguments);
  var origThis      = origArguments.shift();
  var origFunction  = this;

  return function() {
    var newArguments = Array.from(arguments);
    var allArgs = origArguments.concat(newArguments);
    return origFunction.apply(origThis, allArgs);
  };
};
