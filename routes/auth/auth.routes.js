import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                seccess: false,
                message: 'User is not found',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                seccess: false,
                message: 'Password is not corected',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Login error',
        });
        console.log('Error =>', err);
    }
};
