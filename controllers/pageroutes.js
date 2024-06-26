const router = require('express').Router();
const { User, BlogPost, Comments } = require('../models');
const auth = require('../libs/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
            include: [
                {
                    model: User, 
                    attributes: ['username', 'id'],
                },
                {
                    model: Comments,
                }
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        console.log(blogs);

        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post', auth, async (req, res) => {
    try {
        res.render('post', {
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                },
                {
                    model: Comments,
                    include: [
                        {
                            model: User,
                            attributes: ['username', 'id'],
                        },
                    ],
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        console.log(blog)

        res.render('blog', {
            ...blog,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', auth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;