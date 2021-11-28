const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  //WORKING
  Tag.findAll({
    include: [
      //
      { model: Product,
        //attributes are what is returned about the product. We might only need product_name if we're trying to return the associated products.
        attributes: ['product_name']
      } 
    ]
  })
  .then((allTags) => {
    res.json(allTags);
  });
});

router.get('/:id', (req, res) => {
   // find a single tag by its `id`
  // be sure to include its associated Product data
  //WORKING
  Tag.findByPk(req.params.id, {
    include: [
      {model: Product,
      attributes: [
         'product_name'
        ]
      }
    ]
  })
  .then((TagbyID) => {
    res.json(TagbyID);
  });
 
});

router.post('/', (req, res) => {
  // create a new tag
  // WORKING
    //req.body should look like this: 
  // {"tag_name": "newTag"}

  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then((updatedTag) => {
    // Sends the updated category as a json response
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  //WORKING
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));

});

module.exports = router;
