import { validationResult } from 'express-validator';
import Section from '../../models/Section.js';

export const getAll = async (req, res) => {
    try {
        const sections = await Section.find().populate('template').exec();

        res.json(sections);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі sections',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const doc = new Section({
            title: req.body.title,
            template: req.body.template,
        });

        const section_saved = await doc.save();
        const section = await Section.findById(section_saved._id).populate('template').exec();

        res.json({
            success: true,
            message: 'Section успішно створенний',
            // website,
            section,
        });
    } catch (err) {
        console.log('Помилка в створенні нового Section =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нового Section',
        });
    }
};

// export const update = async (req, res) => {
//     try {
//         const TEMPLATE_PAGE_ID = req.params.id;

//         if (req.body.name) {
//             await Template.updateOne(
//                 {
//                     _id: TEMPLATE_PAGE_ID,
//                 },
//                 {
//                     name: req.body.name,
//                     language: req.body.language,
//                     template_pack: req.body.template_pack,
//                     description: req.body.description,
//                     screenshot: req.body.screenshot,
//                 },
//             );
//         }

//         // if (req.body.title) {
//         //     await Template.updateOne(
//         //         {
//         //             _id: TEMPLATE_PAGE_ID,
//         //         },
//         //         {
//         //             content: {
//         //                 title: req.body.title,
//         //                 description: req.body.description,
//         //             },
//         //         },
//         //     );
//         // }

//         const template = await Template.findById(TEMPLATE_PAGE_ID).populate('language').exec();

//         res.json({
//             success: true,
//             message: 'Template успішно відредагований',
//             template,
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'Невдалось відредагувати Template page',
//         });
//     }
// };

// export const remove = async (req, res) => {
//     try {
//         const TEMPLATE_PAGE_ID = req.params.id;
//         Template.findOneAndDelete({ _id: TEMPLATE_PAGE_ID }, (err, doc) => {
//             if (err) {
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Невдалось видалити Template Page',
//                     err,
//                 });
//             }

//             if (!doc) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Template Page не знайденo',
//                     err,
//                 });
//             }

//             res.json({
//                 success: true,
//                 message: 'Template Page успішно видаленний',
//             });
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'Невдалось видалити Template Page',
//             err,
//         });
//     }
// };

// export const groupUpdate = async (req, res) => {
//     try {
//         switch (req.body.action) {
//             case 'Duplicate':
//                 req.body.templateId.filter(async (id) => {
//                     const page = await Template.findById(id);

//                     const doc = new Template({
//                         name: page.name + '(copy)',
//                         language: page.language,
//                         template_pack: page.template_pack,
//                         description: page.description,
//                         screenshot: page.screenshot,
//                     });

//                     await doc.save();
//                 });
//                 break;

//             case 'Delete':
//                 req.body.templateId.filter(async (el) => {
//                     return await Template.findOneAndDelete({
//                         _id: el,
//                     });
//                 });
//                 break;

//             default:
//                 break;
//         }

//         res.json({
//             success: true,
//             message: 'Templates pages успішно дубльовано',
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'Невдалось дубльовати Templates pages',
//         });
//     }
// };
