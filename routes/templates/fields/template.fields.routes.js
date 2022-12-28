import { validationResult } from 'express-validator';
import Template from '../../../models/Template.js';

export const create = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const TEMPLATE_ID = req.body.templateId;
        const SECTION_ID = req.body.sectionId;

        const INFORMATION = req.body.information;
        const CONTENT = req.body.content;

        const template = await Template.findById(TEMPLATE_ID);

        await Template.updateOne(
            {
                _id: TEMPLATE_ID,
            },
            {
                sections: template.sections.map((section) =>
                    String(section._id) === SECTION_ID
                        ? {
                              _id: section._id,
                              title: section.title,
                              fields: [
                                  ...section.fields,
                                  {
                                      field_type: INFORMATION.field_type,
                                      field_name: INFORMATION.field_name,
                                      field_description: INFORMATION.field_description,
                                      content: CONTENT,
                                  },
                              ],
                          }
                        : section,
                ),
            },
        );

        const templateGetSections = await Template.findById(TEMPLATE_ID);

        res.json({
            success: true,
            message: 'Template Section Field Created!',
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
        const FIELD_ID = req.body.fieldId;

        const template = await Template.findById(TEMPLATE_ID);

        await Template.updateOne(
            {
                _id: TEMPLATE_ID,
            },
            {
                sections: template.sections.filter((sec) =>
                    String(sec._id) === SECTION_ID
                        ? (sec.fields = sec.fields.filter((elm) => String(elm._id) !== FIELD_ID))
                        : { ...sec },
                ),
            },
        );

        res.json({
            success: true,
            message: 'Template Field Deleted!',
        });
    } catch (err) {
        console.log('Template Field Error Deleted =>', err);
        res.status(500).json({
            success: false,
            message: 'Template Field Error Deleted',
        });
    }
};
