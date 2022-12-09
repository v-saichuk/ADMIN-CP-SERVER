import { validationResult } from 'express-validator';
import Template from '../../models/Template.js';

export const getAll = async (req, res) => {
    try {
        const templates = await Template.find().populate('language').exec();
        const { sections, ...also } = templates;
        res.json(also.reverse());
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі Templates',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const doc = new Template({
            name: req.body.name,
            language: req.body.language,
            template_pack: req.body.template_pack,
            description: req.body.description,
            screenshot: req.body.screenshot,
        });

        const template_saved = await doc.save();
        const template = await Template.findById(template_saved._id).populate('language').exec();

        res.json({
            success: true,
            message: 'Template page успішно створенний',
            // website,
            template,
        });
    } catch (err) {
        console.log('Помилка в створенні нового Template page =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нового Template page',
        });
    }
};

export const update = async (req, res) => {
    try {
        const TEMPLATE_PAGE_ID = req.params.id;

        if (req.body.name) {
            await Template.updateOne(
                {
                    _id: TEMPLATE_PAGE_ID,
                },
                {
                    name: req.body.name,
                    language: req.body.language,
                    template_pack: req.body.template_pack,
                    description: req.body.description,
                    screenshot: req.body.screenshot,
                },
            );
        }

        // if (req.body.title) {
        //     await Template.updateOne(
        //         {
        //             _id: TEMPLATE_PAGE_ID,
        //         },
        //         {
        //             content: {
        //                 title: req.body.title,
        //                 description: req.body.description,
        //             },
        //         },
        //     );
        // }

        const template = await Template.findById(TEMPLATE_PAGE_ID).populate('language').exec();

        res.json({
            success: true,
            message: 'Template успішно відредагований',
            template,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось відредагувати Template page',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const TEMPLATE_PAGE_ID = req.params.id;
        Template.findOneAndDelete({ _id: TEMPLATE_PAGE_ID }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Невдалось видалити Template Page',
                    err,
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Template Page не знайденo',
                    err,
                });
            }

            res.json({
                success: true,
                message: 'Template Page успішно видаленний',
            });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось видалити Template Page',
            err,
        });
    }
};

export const groupUpdate = async (req, res) => {
    try {
        switch (req.body.action) {
            case 'Duplicate':
                req.body.templateId.filter(async (id) => {
                    const page = await Template.findById(id);

                    const doc = new Template({
                        name: page.name + '(copy)',
                        language: page.language,
                        template_pack: page.template_pack,
                        description: page.description,
                        screenshot: page.screenshot,
                    });

                    await doc.save();
                });
                break;

            case 'Delete':
                req.body.templateId.filter(async (el) => {
                    return await Template.findOneAndDelete({
                        _id: el,
                    });
                });
                break;

            default:
                break;
        }

        res.json({
            success: true,
            message: 'Templates pages успішно дубльовано',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось дубльовати Templates pages',
        });
    }
};
