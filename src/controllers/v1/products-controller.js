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

const getProducts = (req, res) => {};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts
};
