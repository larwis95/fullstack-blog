const router = require('express').Router();
const { BlogPost } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const blogData = await BlogPost.create(req.body);
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;