const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../mongo/models/users');
const Products = require('../../mongo/models/products');

const expiresIn = '1d';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const token = jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({ status: 'OK', data: { token, expiresIn } });
      } else {
        res.status(403).send({
          status: 'INVALID_PASSWORD',
          message: 'The password is incorrect.'
        });
      }
    } else {
      res.status(401).send({
        status: 'USER_NOT_FOUND',
        message: 'The user does not exist.'
      });
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

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error('Missing param userId.');
    }

    await Users.findOneAndDelete(userId);
    await Products.deleteMany({ user: userId });

    res.send({ status: 'OK', message: 'User deleted' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find().select({ password: 0, __v: 0, role: 0 });
    res.send({ status: 'OK', data: users });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, data } = req.body;
    await Users.findByIdAndUpdate(req.sessionData.userId, {
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
