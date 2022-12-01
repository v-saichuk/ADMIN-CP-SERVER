import { validationResult } from 'express-validator';
import Legals from '../../models/Legals.js';

export const getAll = async (req, res) => {
    try {
        const legals = await Legals.find()
            .populate('language')
            .populate('offer')
            .populate('website')
            .populate('offerOwner')
            .exec();

        res.json(legals.reverse());
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі Legals page',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const doc = new Legals({
            name: req.body.name,
            language: req.body.language,
            offer: req.body.offer,
            website: req.body.website,
            offerOwner: req.body.offerOwner,
            enabled: req.body.enabled,
            content: {
                title: '',
                description: '',
            },
        });

        const legalSaved = await doc.save();
        const legal = await Legals.findById(legalSaved._id)
            .populate('language')
            .populate('offer')
            .populate('website')
            .populate('offerOwner')
            .exec();

        res.json({
            success: true,
            message: 'Legal page успішно створенний',
            // website,
            legal,
        });
    } catch (err) {
        console.log('Помилка в створенні нового Legal page =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нового Legal page',
        });
    }
};

export const update = async (req, res) => {
    try {
        const LEGAL_PAGE_ID = req.params.id;

        if (req.body.name) {
            await Legals.updateOne(
                {
                    _id: LEGAL_PAGE_ID,
                },
                {
                    name: req.body.name,
                    language: req.body.language,
                    offer: req.body.offer,
                    website: req.body.website,
                    offerOwner: req.body.offerOwner,
                    enabled: req.body.enabled,
                },
            );
        }

        if (req.body.title) {
            await Legals.updateOne(
                {
                    _id: LEGAL_PAGE_ID,
                },
                {
                    content: {
                        title: req.body.title,
                        description: req.body.description,
                    },
                },
            );
        }

        const legal = await Legals.findById(LEGAL_PAGE_ID)
            .populate('language')
            .populate('offer')
            .populate('website')
            .populate('offerOwner')
            .exec();

        res.json({
            success: true,
            message: 'Legal успішно відредагований',
            legal,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось відредагувати Legal page',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const LEGAL_PAGE_ID = req.params.id;
        Legals.findOneAndDelete({ _id: LEGAL_PAGE_ID }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Невдалось видалити Legal Page',
                    err,
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Legal Page не знайденo',
                    err,
                });
            }

            res.json({
                success: true,
                message: 'Legal Page успішно видаленний',
            });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось видалити Legal Page',
            err,
        });
    }
};

export const updateEnabledOne = async (req, res) => {
    try {
        const LEGAL_PAGE_ID = req.params.id;

        await Legals.updateOne(
            {
                _id: LEGAL_PAGE_ID,
            },
            {
                enabled: req.body.enabled,
            },
        );

        res.json({
            success: true,
            message: `Legal page успішно ${req.body.enabled ? 'Активовано' : 'Деактивовано'}`,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Невдалось ${req.body.enabled ? 'Активувати' : 'Деактивувати'} Legal page`,
        });
    }
};

export const groupUpdate = async (req, res) => {
    try {
        switch (req.body.action) {
            case 'Duplicate':
                await req.body.legalsId.map(async (id) => {
                    const page = await Legals.findById(id);

                    const doc = new Legals({
                        name: page.name,
                        language: page.language,
                        offer: page.offer,
                        website: page.website,
                        offerOwner: page.offerOwner,
                        enabled: false,
                        content: {
                            title: page.content.title,
                            description: page.content.description,
                        },
                    });

                    await doc.save();

                    const legals = await Legals.find()
                        .populate('language')
                        .populate('offer')
                        .populate('website')
                        .populate('offerOwner')
                        .exec();

                    res.json({
                        success: true,
                        data: legals.reverse(),
                        message: 'Legal pages successfully duplicated',
                    });
                });

                // TODO: Дублююється відправка  респонса, тому що в в переборі масива, Але інакше не працює. Пізніше розібратися з цим.

                break;

            case 'Delete':
                req.body.legalsId.filter(async (el) => {
                    return await Legals.findOneAndDelete({
                        _id: el,
                    });
                });

                res.json({
                    success: true,
                    message: 'Legal pages successfully deleted',
                });

                break;

            default:
                break;
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error legals pages',
        });
    }
};
