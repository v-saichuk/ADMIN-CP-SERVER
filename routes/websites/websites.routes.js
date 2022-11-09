import { validationResult } from 'express-validator';
import Websites from '../../models/Websites.js';

export const getAll = async (req, res) => {
    try {
        const websites = await Websites.find().populate('offers').exec();

        res.json(websites);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі Websites',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const doc = new Websites({
            url: req.body.url,
            offers: req.body.offers,
            enabled: req.body.enabled,
            notes: req.body.notes,
        });

        const websiteSaved = await doc.save();
        const website = await Websites.findById(websiteSaved._id).populate('offers').exec();

        res.json({
            success: true,
            message: 'Website успішно створенний',
            website,
        });
    } catch (err) {
        console.log('Помилка в створенні нового Website =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нового Website',
        });
    }
};

export const update = async (req, res) => {
    try {
        const websiteId = req.params.id;

        await Websites.updateOne(
            {
                _id: websiteId,
            },
            {
                url: req.body.url,
                offers: req.body.offers,
                enabled: req.body.enabled,
                notes: req.body.notes,
            },
        );

        const website = await Websites.findById(websiteId).populate('offers').exec();

        res.json({
            success: true,
            message: 'Website успішно відредагований',
            website,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось відредагувати Website',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const websiteId = req.params.id;
        Websites.findOneAndDelete({ _id: websiteId }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Невдалось видалити Website',
                    err,
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Website не знайденo',
                    err,
                });
            }

            res.json({
                success: true,
                message: 'Website успішно видаленний',
            });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось видалити Website',
            err,
        });
    }
};

export const updateEnabledOne = async (req, res) => {
    try {
        const websiteId = req.params.id;

        await Websites.updateOne(
            {
                _id: websiteId,
            },
            {
                enabled: req.body.enabled,
            },
        );

        const website = await Websites.findById(websiteId).populate('offers').exec();

        res.json({
            success: true,
            message: `Website успішно ${req.body.enabled ? 'Активовано' : 'Деактивовано'}`,
            website,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Невдалось ${req.body.enabled ? 'Активувати' : 'Деактивувати'} Website`,
        });
    }
};

export const groupUpdate = async (req, res) => {
    try {
        switch (req.body.action) {
            case 'Activate':
                req.body.websites.filter(async (el) => {
                    await Websites.updateOne(
                        {
                            _id: el,
                        },
                        {
                            enabled: true,
                        },
                    );
                });
                break;

            case 'Deactivate':
                req.body.websites.filter(async (el) => {
                    await Websites.updateOne(
                        {
                            _id: el,
                        },
                        {
                            enabled: false,
                        },
                    );
                });
                break;

            case 'Delete':
                req.body.websites.filter(async (el) => {
                    return await Websites.findOneAndDelete({
                        _id: el,
                    });
                });
                break;

            default:
                break;
        }

        res.json({
            success: true,
            message: 'Websites успішно оновлено',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось оновити Websites',
        });
    }
};
