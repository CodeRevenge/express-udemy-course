const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        res.send({ status: 'OK', data: {} });
      } else {
        res.status(403).send({ status: 'INVALID_PASSWORD', message: 'The password is incorrect.' });
      }
    } else {
      res
        .status(401)
        .send({ status: 'USER_NOT_FOUND', message: 'The user does not exist.' });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

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
  } catch (e) {
    if (e.code && e.code === 11000) {
      // console.log('RROR create user: ', e);
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: e.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const deleteUser = (req, res) => {
  res.send({ status: 'OK', message: 'User deleted' });
};

const getUsers = (req, res) => {
  res.send({ status: 'OK', message: [] });
};

const updateUser = async (req, res) => {
  try {
    const { username, email, data, userId } = req.body;
    await Users.findByIdAndUpdate(userId, {
      username,
      email,
      data
    });
    res.send({ status: 'OK', message: 'User updated' });
  } catch (e) {
    if (e.code && e.code === 11000) {
      // console.log('RROR create user: ', error);
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: e.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  login
};
