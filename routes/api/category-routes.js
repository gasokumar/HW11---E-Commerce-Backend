const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  (req, res) => {
   // find all categories
  // be sure to include its associated Products
  // WORKING
  Category.findAll({
  include: [
    //
    { model: Product,
      //attributes are what is returned about the product. We might only need product_name if we're trying to return the associated products.
      attributes: ['product_name']
    } 
  ]
})
.then((allCategories) => {
  res.json(allCategories);
});
});

router.get('/:id',  (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // WORKING
  Category.findByPk(req.params.id, {
    include: [
      {model: Product,
      attributes: [
         'product_name'
        ]
      }
    ]
  })
  .then((CategorybyID) => {
    res.json(CategorybyID);
  });
});

router.post('/', (req, res) => {
  // create a new category
  //WORKING
  //req.body should look like this: 
  // {"category_name": "newCategory"}
  Category.create({
    category_name: req.body.category_name
  })
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  //WORKING, but response sent back is [1]
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
  //WORKING but response sent back is 1
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
