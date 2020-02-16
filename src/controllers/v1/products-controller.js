const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;

    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId
    });
    res.send({ status: 'OK', data: product });
  } catch (e) {
    console.log('create product error: ', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

const deleteProduct = (req, res) => {};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({
      price: { $lt: 20 }
    })
      .select('title desc price')
      .populate('user', 'username email data role');
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('Get products: error', e.message);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const products = await Products.find({
      user: req.params.userId
    });
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('Get products: error', e.message);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByUser
};
