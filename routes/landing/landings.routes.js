import { validationResult } from 'express-validator';
import Landing from '../../models/Landing.js';
import Template from '../../models/Template.js';

export const getAll = async (req, res) => {
    try {
        const landings = await Landing.find()
            .populate('language')
            .populate('website')
            .populate('offer')
            .exec();

        res.json(landings.reverse());
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі Landings',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const template = await Template.findById(req.body.template_pack);

        const doc = new Landing({
            name: req.body.name,
            country: req.body.country,
            language: req.body.language,
            website: req.body.website,
            offer: req.body.offer,
            template_pack: template.template_pack,
            status: req.body.status,
            note: req.body.note,
            sections: template.sections,
        });

        const landing_saved = await doc.save();
        const landing = await Landing.findById(landing_saved._id)
            .populate('language')
            .populate('website')
            .populate('offer')
            .exec();

        res.json({
            success: true,
            message: 'Landing page успішно створенний',
            data: landing,
        });
    } catch (err) {
        console.log('Помилка в створенні нового Landing page =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нового Landing page',
        });
    }
};

export const update = async (req, res) => {
    try {
        const LANDING_PAGE_ID = req.params.id;

        if (req.body.name) {
            await Landing.updateOne(
                {
                    _id: LANDING_PAGE_ID,
                },
                {
                    name: req.body.name,
                    country: req.body.country,
                    language: req.body.language,
                    website: req.body.website,
                    offer: req.body.offer,
                    // template_pack: req.body.template_pack,
                    status: req.body.status,
                    note: req.body.note,
                },
            );
        }

        const LANDING = await Landing.findById(LANDING_PAGE_ID)
            .populate('language')
            .populate('website')
            .populate('offer')
            .exec();

        res.json({
            success: true,
            message: 'Landing page успішно відредагований',
            data: LANDING,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось відредагувати Landing page',
        });
    }
};

export const updateEnabledOne = async (req, res) => {
    try {
        const LANDING_PAGE_ID = req.params.id;

        await Landing.updateOne(
            {
                _id: LANDING_PAGE_ID,
            },
            {
                status: req.body.status,
            },
        );

        res.json({
            success: true,
            message: `Landing page успішно ${req.body.status ? 'Активовано' : 'Деактивовано'}`,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Невдалось ${req.body.status ? 'Активувати' : 'Деактивувати'} Landing page`,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const LANDING_PAGE_ID = req.params.id;
        Landing.findOneAndDelete({ _id: LANDING_PAGE_ID }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Невдалось видалити Landing Page',
                    err,
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Landing Page не знайденo',
                    err,
                });
            }

            res.json({
                success: true,
                message: 'Landing Page успішно видаленний',
            });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось видалити Landing Page',
            err,
        });
    }
};

// // TODO: Помилки при дублювані шаблонів
export const groupUpdate = async (req, res) => {
    try {
        switch (req.body.action) {
            case 'Duplicate':
                const ARR_LANDING_ID = req.body.landingId;

                ARR_LANDING_ID.filter(async (landingId) => {
                    const landing = await Landing.findById(landingId);

                    const doc = new Landing({
                        name: landing.name + '(copy)',
                        country: landing.country,
                        language: landing.language,
                        website: landing.website,
                        offer: landing.offer,
                        sections: landing.sections,
                        template_pack: landing.template_pack,
                        status: landing.status,
                        note: landing.note,
                    });

                    await doc.save();

                    const landings = await Landing.find()
                        .populate('language')
                        .populate('website')
                        .populate('offer')
                        .exec();

                    return await res.json({
                        success: true,
                        message: 'Landing pages успішно дубльовано!',
                        data: landings.reverse(),
                    });
                });

                break;

            case 'Delete':
                req.body.landingId.filter(async (el) => {
                    return await Landing.findOneAndDelete({
                        _id: el,
                    });
                });
                res.json({
                    success: true,
                    message: 'Landing pages успішно видаленно!',
                });
                break;

            default:
                break;
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось дубльовати Landing pages',
        });
    }
};
