const router = require('express').Router();
const { Category, Product } = require('../../models');
const { sync } = require('../../models/Product');

// The `/api/categories` endpoint

// return all the categories and related products in the table
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryProdData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryProdData);

  } catch (err) {
    res.status(500).json(err);
  }

});

// find a single category including related products for the passed in id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryProdData = await Category.findByPk(req.params.id, {
      include: [Product]
    });

    if (!categoryProdData) {
      res.status(404).json({ message: 'Category not found with this id!' });
      return;
    }

    res.status(200).json(categoryProdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new category using passed in body (json)
router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }

});

// update category table (category_name) using the passed in id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const reqId = req.params.id;
    const updatedCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: reqId }}
    );

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }

});

// delete row from category table using passed id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const reqId = req.params.id;
    const deletedCategory = await Category.destroy(
      { where: { id: reqId } }
    );

    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
