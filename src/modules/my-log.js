module.exports.info = text => {
  console.log("INFO: ", text);
  return text;
};

module.exports.error = text => {
  console.log("Error: ", text);
  return text;
};

// module.exports = { info, error };
