import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import { validationResult } from 'express-validator';
import User from '../../models/User.js';
import Role from '../../models/Role.js';

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Користувач не знайдений',
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {
        console.log('Помилка в пошуку користувача =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось знайти користувача в базі данних',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const person = await User.findOne({ email: req.body.email });
        if (person) {
            return res.status(409).json({
                seccess: false,
                message: 'Такий користувач вже зареєстрованний!',
            });
        }
        const role = await Role.findOne({ _id: req.body.roleId });
        if (!role) {
            return res.status(404).json({
                seccess: false,
                message: 'Помилка. Така роль не знайдена!',
            });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new User({
            avatarUrl: req.body.avatarUrl,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            roleId: req.body.roleId,
            passwordHash,
            social: {
                twitter: req.body.social.twitter,
                facebook: req.body.social.facebook,
                telegram: req.body.social.telegram,
                linkedin: req.body.social.linkedin,
            },
        });

        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id,
            },
            config.get('secretKey'),
            {
                expiresIn: config.get('tokenExistence'),
            },
        );

        res.json({
            ...user._doc,
            token,
        });
    } catch (err) {
        console.log('Помилка в реєстраціі користувача =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось зареєструвати користувача',
        });
    }
};

export const update = async (req, res) => {
    try {
        const userId = req.params.id;
        const person = await User.findOne({ _id: userId });

        const newPasswordHash = async () => {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const newPasswordHash = await bcrypt.hash(password, salt);
            return newPasswordHash;
        };

        await User.updateOne(
            {
                _id: userId,
            },
            {
                avatarUrl: req.body.avatarUrl,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                roleId: req.body.roleId,
                passwordHash: req.body.password ? await newPasswordHash() : person.passwordHash,
                social: {
                    twitter: req.body.social.twitter,
                    facebook: req.body.social.facebook,
                    telegram: req.body.social.telegram,
                    linkedin: req.body.social.linkedin,
                },
            },
        );

        res.json({
            success: true,
            message: 'Користувач успішно відредагований',
        });
    } catch (err) {
        console.log('Помилка в редагувані користувача =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось відредагувати користувача',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const userId = req.params.id;
        User.findOneAndDelete({ _id: userId }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Невдалось видалити користувача',
                    err,
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Користувач не знайдений',
                    err,
                });
            }

            res.json({
                success: true,
                message: 'Користувач успішно видалений',
            });
        });
    } catch (err) {
        console.log('Помилка в видалені користувача =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось видалити користувача',
        });
    }
};
