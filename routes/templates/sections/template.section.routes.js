import { validationResult } from 'express-validator';
import Template from '../../../models/Template.js';

export const create = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const TEMPLATE_PAGE_ID = req.body.templateId;
        const sect = await Template.findById(TEMPLATE_PAGE_ID);

        console.log('params =>>>>', req.body);
        console.log('sections =>>>>', sect.sections);

        // if (req.body.title) {
        // await Template.updateOne(
        //     {
        //         _id: TEMPLATE_PAGE_ID,
        //     },
        //     {
        //         sections: [...sect],
        //     },
        // );
        // }

        // {
        //     id: req.body.id,
        //     title: req.body.title,
        //     fields: req.body.fields,
        // }

        // const template = await Template.findById(req.body.templateId).populate('language').exec();

        res.json({
            success: true,
            message: 'Template Section',
        });
    } catch (err) {
        console.log('Template Section Error =>', err);
        res.status(500).json({
            success: false,
            message: 'Template Section Error Created',
        });
    }
};