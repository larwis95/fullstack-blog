const router = require('express').Router();
const { BlogPost } = require('../../models');
const auth = require('../../libs/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user/:id', async (req, res) => { 
  try {
    const blogData = await BlogPost.findAll({
      where: {
        user_id: req.params.id,
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

router.post('/', auth, async (req, res) => {
  try {
    const blogData = await BlogPost.create({
      ...req.body,
    userId: req.session.user_id});
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', auth, async (req, res) => {
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