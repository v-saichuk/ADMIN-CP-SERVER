import c from 'config';
import { validationResult } from 'express-validator';
import Landing from '../../../models/Landing.js';

export const create = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const LANDING_PAGE_ID = req.body.landingId;
        const landing = await Landing.findById(LANDING_PAGE_ID);

        await Landing.updateOne(
            {
                _id: LANDING_PAGE_ID,
            },
            {
                sections: [...landing.sections, req.body],
            },
        );

        const getSection = await Landing.findById(LANDING_PAGE_ID);

        res.json({
            success: true,
            message: 'Landing Section Created!',
            sections: getSection.sections,
        });
    } catch (err) {
        console.log('Landing Section Error =>', err);
        res.status(500).json({
            success: false,
            message: 'Landing Section Error Created',
        });
    }
};

export const update = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const LANDING_ID = req.body.landingId;
        const SECTION_ID = req.body.sectionId;

        const landing = await Landing.findById(LANDING_ID);

        await Landing.updateOne(
            {
                _id: LANDING_ID,
            },
            {
                sections: landing.sections.map((el) =>
                    String(el._id) === SECTION_ID
                        ? { ...el._doc, title: req.body.title, fields: el.fields }
                        : el,
                ),
            },
        );

        const landingGetSections = await Landing.findById(LANDING_ID);
        const getSection = landingGetSections.sections.find(
            (section) => section._id.toString() === SECTION_ID,
        );

        res.json({
            success: true,
            message: 'Landing Section Updated!',
            section: {
                id: getSection._id,
                title: getSection.title,
            },
        });
    } catch (err) {
        console.log('Landing Section Error Updated =>', err);
        res.status(500).json({
            success: false,
            message: 'Landing Section Error Updated',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const LANDING_ID = req.body.landingId;
        const SECTION_ID = req.body.sectionId;

        const landing = await Landing.findById(LANDING_ID);

        await Landing.updateOne(
            {
                _id: LANDING_ID,
            },
            {
                sections: landing.sections.filter((section) => String(section._id) !== SECTION_ID),
            },
        );

        res.json({
            success: true,
            message: 'Landing Section Deleted!',
        });
    } catch (err) {
        console.log('Landing Section Error Deleted =>', err);
        res.status(500).json({
            success: false,
            message: 'Landing Section Error Deleted',
        });
    }
};
