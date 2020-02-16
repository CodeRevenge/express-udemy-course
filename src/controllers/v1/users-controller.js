
const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users');

const createUser = async (req, res) => {
  try {
    // console.log(req.body);

    const { username, email, password, data } = req.body;

    const hash = await bcrypt.hash(password, 15);

    // await Users.create({
    //   username,
    //   email,
    //   password: hash,
    //   data
    // });

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;

    await user.save();

    res.send({ status: 'OK', message: 'User created' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      // console.log('RROR create user: ', error);
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
      return;
    }
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
