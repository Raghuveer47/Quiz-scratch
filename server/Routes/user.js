const router = require('express').Router();
const UserRegister = require('../Model/UserRegister');
const middleware = require('./middleware');


router.get('/profile', middleware, async (req, res) => {
    const id = req.user.id;
    const user = await UserRegister.findById(id);
    return res.status(200).json(user);
});

//export router
module.exports = router;