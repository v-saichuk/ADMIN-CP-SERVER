import c from 'config';
import { validationResult } from 'express-validator';
import Template from '../../../models/Template.js';

export const create = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const TEMPLATE_PAGE_ID = req.body.templateId;
        const template = await Template.findById(TEMPLATE_PAGE_ID);

        await Template.updateOne(
            {
                _id: TEMPLATE_PAGE_ID,
            },
            {
                sections: [...template.sections, req.body],
            },
        );

        const templateGetSections = await Template.findById(TEMPLATE_PAGE_ID);

        res.json({
            success: true,
            message: 'Template Section Created!',
            sections: templateGetSections.sections,
        });
    } catch (err) {
        console.log('Template Section Error =>', err);
        res.status(500).json({
            success: false,
            message: 'Template Section Error Created',
        });
    }
};

export const update = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const TEMPLATE_ID = req.body.templateId;
        const SECTION_ID = req.body.sectionId;

        const template = await Template.findById(TEMPLATE_ID);

        await Template.updateOne(
            {
                _id: TEMPLATE_ID,
            },
            {
                sections: template.sections.map((el) =>
                    String(el._id) === SECTION_ID
                        ? { ...el._doc, title: req.body.title, fields: el.fields }
                        : el,
                ),
            },
        );

        const templateGetSections = await Template.findById(TEMPLATE_ID);
        const getSection = templateGetSections.sections.find(
            (el) => el._id.toString() === SECTION_ID,
        );

        res.json({
            success: true,
            message: 'Template Section Updated!',
            section: {
                id: getSection._id,
                title: getSection.title,
            },
        });
    } catch (err) {
        console.log('Template Section Error Updated =>', err);
        res.status(500).json({
            success: false,
            message: 'Template Section Error Updated',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const TEMPLATE_ID = req.body.templateId;
        const SECTION_ID = req.body.sectionId;

        const template = await Template.findById(TEMPLATE_ID);

        await Template.updateOne(
            {
                _id: TEMPLATE_ID,
            },
            {
                sections: template.sections.filter((el) => String(el._id) !== SECTION_ID),
            },
        );

        res.json({
            success: true,
            message: 'Template Section Deleted!',
        });
    } catch (err) {
        console.log('Template Section Error Deleted =>', err);
        res.status(500).json({
            success: false,
            message: 'Template Section Error Deleted',
        });
    }
};
