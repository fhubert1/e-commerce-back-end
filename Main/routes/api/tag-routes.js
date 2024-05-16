const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all the tag records
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product, as: 'tagged_products' } // Include the Products
      ]
    });

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }

});

// find a single tag by its `id` including the product data
router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product, as: 'tagged_products' } // Include the Products
      ]
    });

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }

});

// create new tag row in table
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }

});

// update tag name based on passed id
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const reqId = req.params.id;
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: reqId }}
    );

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }  
});

// delete tag based on passed id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const reqId = req.params.id;
    const deletedTag = await Tag.destroy(
      { where: { id: reqId } }
    );

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(400).json(err);
  }  
});

module.exports = router;
