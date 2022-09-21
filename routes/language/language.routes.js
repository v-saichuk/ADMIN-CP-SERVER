import { validationResult } from 'express-validator';
import Language from '../../models/Language.js';

export const getAll = async (req, res) => {
    try {
        const lang = await Language.find();

        res.json(lang);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі мови',
            err,
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const doc = new Language({
            title: req.body.title,
            code: req.body.code,
            icon: req.body.icon,
            enabled: req.body.enabled,
        });

        const lang = await doc.save();

        res.json(lang);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нову мову',
            err,
        });
    }
};

export const update = async (req, res) => {
    try {
        const languageId = req.params.id;

        await Language.updateOne(
            {
                _id: languageId,
            },
            {
                enabled: req.body.enabled,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось онововити мову',
            err,
        });
    }
};
