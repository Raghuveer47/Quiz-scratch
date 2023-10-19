const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRegister = require('../Model/UserRegister');
const nodemailer = require('nodemailer');

router.get('/', async (req, res) => {
    return res.json("routes");
});

var transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: 'pallubhai80@gmail.com',
            pass: 'zjijwzkhqbvapzmq'
        }
    }
);

//user register route
router.post("/register", async (req, res) => {
    try {
        let { fname, username, email, password } = req.body;
        //check the user already exist with this email/phone
        const takenEmail = await UserRegister.findOne({ username });
        if (takenEmail) {
            return res.status(405).json("Username already exists");
        }
        else {
            async function savedata() {
                password = await bcrypt.hash(req.body.password, 10);
                const newUser = new UserRegister({
                    fname,
                    username,
                    email,
                    password,
                });
                await newUser.save();
            }
            var options = {
                from: '"pallubhai80@gmail.com" <zjijwzkhqbvapzmq>',
                to: email,
                subject: "Testing node emails",
                html: `<p>Enter the otp: 123456 to verify your email address</p>`
            };
            transporter.sendMail(
                options, async function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500).send("email is incorrect");
                    }
                    else {
                        await savedata();
                        return res.status(200).json(info);
                    }
                }
            )
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
});

//user login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        //confirm the user is register or not
        const userexist = await UserRegister.findOne({ username });
        if (!userexist) {
            return res.status(404).json('user not found');
        }
        bcrypt.compare(password, userexist.password).then((isCorrect) => {
            if (isCorrect) {
                let payload = {
                    user: {
                        id: userexist.id
                    }
                }
                jwt.sign(payload, "newsecreate", { expiresIn: 36000000 }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json(token);
                });
            }
            else {
                return res.status(405).json('password is incorrect');
            }
        }
        );
    } catch (error) {
        return res.status(500).json(error.message)
    }
});

router.post("/forgot", async (req, res) => {
    try {
        const { email } = req.body;
        const userexist = await UserRegister.findOne({ email });
        if (!userexist) {
            return res.status(404).json('user not found');
        }
        else {
            var options = {
                from: '"pallubhai80@gmail.com" <zjijwzkhqbvapzmq>',
                to: email,
                subject: "Testing node emails",
                html: `<p>Enter the otp</p>`
            };
            transporter.sendMail(
                options, async function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500).send("email is incorrect");
                    }
                    else {
                        return res.status(200).json(info);
                    }
                }
            )
        }
    } catch (error) {
        return res.status(500).json("server timeout");
    }
})

//export router
module.exports = router;