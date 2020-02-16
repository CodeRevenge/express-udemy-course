const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 15);
    res.send({ status: 'OK', message: 'User created', hash: hash.toString() });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const deleteUser = (req, res) => {
  res.send({ status: 'OK', message: 'User deleted' });
};

const getUsers = (req, res) => {
  res.send({ status: 'OK', message: [] });
};

const updateUser = (req, res) => {
  res.send({ status: 'OK', message: 'User updated' });
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser
};
