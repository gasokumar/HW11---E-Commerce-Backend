const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
   // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
  include: [
    //
    { model: Product,
      //attributes are what is returned about the product. We might only need product_name if we're trying to return the associated products.
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    } 
  ]
})
return categoryData
 
});

router.get('/:id', (req, res) => {
  const dbCategoryData = await Category.findByPk(req.params.id, {
    include: [
      {model: Product,
      attributes: [
        'id', 'product_name', 'price', 'stock', 'category_id'
        ]
      }
    ]
  })
  return dbCategoryData
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.json(newCategory);
  } catch (err) {
    res.json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then((updatedCategory) => {
    // Sends the updated category as a json response
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }
  )
  .then(data => {
    if (!data) {
      res.status(404).json({message: "Sorry, we couldn't find a category with that ID"});
      return
    }
    res.json(data)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;
