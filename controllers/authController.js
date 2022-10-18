const User = require('../model/User')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });


    const foundUser = await User.findOne({ username : user}).exec()
    if (!foundUser) return res.sendStatus(401); //Unauthorized 


    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);


    if (match) {
        const roles = Object.values(foundUser.roles)
        console.log(roles);
        // create access token
        const accessToken = jwt.sign(
            { "UserInfo" : {
                "username": foundUser.username ,
                "roles" : roles
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '240s' }
        );

        console.log(accessToken);
            //create refresh token
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );


        //update current document
        try {

        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result)

        } catch (err) {
             console.error(err);
        }

        
        
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',  maxAge: 24 * 60 * 60 * 1000 }) //secure: true,
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };