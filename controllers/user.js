const { signToken } = require('../middleware/tokenVerify');
const { USER } = require('../models/index')
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    try {
        const {email, username} = req.body;
        console.log("email => ", email);
        let isUserExists = await USER.findOne({$or:[{email},{username}]});
        console.log("isUserExists > ", isUserExists);
        if (isUserExists?.email)
            return res.status(400).json({ message: "Email/UserName Should Be Unique" });



        const User = new USER({ ...req.body, email });
        console.log("User is => ", User);

        await User.save();
        return res.status(200).json({ message: "Success", data: User });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

const userLogin = async (req, res) => {
    try {
        const { password } = req.body;
        console.log(req.body);

        const user = await USER.findOne({ email: req.body.email });
        console.log("user is = ", user);
        if (!user)
            return res.status(400).json({ message: "Invalid Email Or Password" })


        let match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json({ message: "Credentials not match" })

        /* Token Generate */
        const tokenGenerate = signToken(user?._id)
        console.log(tokenGenerate);
        return res.status(200).json({ message: "User Login Successfully", data: user, tokenGenerate: tokenGenerate })

    } catch (error) {
        return res.status(400).json({ error: error.message });

    }
}

module.exports = { userRegister, userLogin };