import { validationResult } from 'express-validator';
import Landing from '../../../models/Landing.js';

export const create = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const LANDING_ID = req.body.main_id;
        const SECTION_ID = req.body.section_id;

        const INFORMATION = req.body.information;
        const CONTENT = req.body.content;

        const landing = await Landing.findById(LANDING_ID);

        await Landing.updateOne(
            {
                _id: LANDING_ID,
            },
            {
                sections: landing.sections.map((section) =>
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

        const getSection = await Landing.findById(LANDING_ID);

        res.json({
            success: true,
            message: 'Landing Section Field Created!',
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

        const LANDING_ID = req.body.main_id;
        const SECTION_ID = req.body.section_id;
        const FIELD_ID = req.body.fieldId;

        const INFORMATION = req.body.information;
        const CONTENT = req.body.content;

        const landing = await Landing.findById(LANDING_ID);

        await Landing.updateOne(
            {
                _id: LANDING_ID,
            },
            {
                sections: landing.sections.map((section) =>
                    String(section._id) === SECTION_ID
                        ? {
                              _id: section._id,
                              title: section.title,
                              fields: [
                                  ...section.fields.map((field) =>
                                      String(field._id) === FIELD_ID
                                          ? {
                                                _id: field._id,
                                                field_type: INFORMATION.field_type,
                                                field_name: INFORMATION.field_name,
                                                field_description: INFORMATION.field_description,
                                                content: CONTENT,
                                            }
                                          : field,
                                  ),
                              ],
                          }
                        : section,
                ),
            },
        );

        const GetLanding = await Landing.findById(LANDING_ID);
        const GetSection = GetLanding.sections.find(
            (section) => String(section._id) === SECTION_ID,
        );
        res.json({
            success: true,
            message: 'Landing Section Field Updated!',
            fields: GetSection.fields,
        });
    } catch (error) {
        console.log('Landing Section Field Error =>', error);
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
        const FIELD_ID = req.body.fieldId;

        const landing = await Landing.findById(LANDING_ID);

        await Landing.updateOne(
            {
                _id: LANDING_ID,
            },
            {
                sections: landing.sections.filter((section) =>
                    String(section._id) === SECTION_ID
                        ? (section.fields = section.fields.filter(
                              (field) => String(field._id) !== FIELD_ID,
                          ))
                        : { ...section },
                ),
            },
        );

        res.json({
            success: true,
            message: 'Landing Field Deleted!',
        });
    } catch (err) {
        console.log('Landing Field Error Deleted =>', err);
        res.status(500).json({
            success: false,
            message: 'Landing Field Error Deleted',
        });
    }
};

export const position = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const LANDING_ID = req.body.landing_id;
        const SECTION_ID = req.body.section_id;

        const landing = await Landing.findById(LANDING_ID);

        await Landing.updateOne(
            {
                _id: LANDING_ID,
            },
            {
                sections: landing.sections.map((section) =>
                    String(section._id) === SECTION_ID
                        ? {
                              _id: section._id,
                              title: section.title,
                              fields: req.body.fields,
                          }
                        : section,
                ),
            },
        );

        res.json({
            success: true,
            message: 'Position fields saved',
        });
    } catch (error) {
        console.log('Position fields error =>', error);
        res.status(500).json({
            success: false,
            message: 'Position fields error',
        });
    }
};
