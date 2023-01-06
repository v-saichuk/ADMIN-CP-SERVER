import { validationResult } from 'express-validator';
import Landing from '../../models/Landing.js';
import Template from '../../models/Template.js';

// export const getAll = async (req, res) => {
//     try {
//         const templates = await Template.find().populate('language').exec();

//         res.json(templates.reverse());
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'Невдалось отримати всі Templates',
//         });
//     }
// };

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
            template_pack: req.body.template_pack,
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
            landing,
        });
    } catch (err) {
        console.log('Помилка в створенні нового Landing page =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нового Landing page',
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

// // TODO: Помилки при дублювані шаблонів
// export const groupUpdate = async (req, res) => {
//     try {
//         switch (req.body.action) {
//             case 'Duplicate':
//                 const ARR_TEMPLATE_ID = req.body.templateId;

//                 ARR_TEMPLATE_ID.filter(async (templateId) => {
//                     const template = await Template.findById(templateId);

//                     const doc = new Template({
//                         name: template.name + '(copy)',
//                         language: template.language,
//                         template_pack: template.template_pack + '(copy)',
//                         description: template.description,
//                         screenshot: template.screenshot,
//                         sections: template.sections,
//                     });

//                     await doc.save();

//                     const templates = await Template.find().populate('language').exec();

//                     return await res.json({
//                         success: true,
//                         message: 'Templates pages успішно дубльовано!',
//                         templates: templates.reverse(),
//                     });
//                 });

//                 break;

//             case 'Delete':
//                 req.body.templateId.filter(async (el) => {
//                     return await Template.findOneAndDelete({
//                         _id: el,
//                     });
//                 });
//                 res.json({
//                     success: true,
//                     message: 'Templates pages успішно видаленно!',
//                 });
//                 break;

//             default:
//                 break;
//         }

//         // const template = await Template.findById(TEMPLATE_PAGE_ID).populate('language').exec();
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'Невдалось дубльовати Templates pages',
//         });
//     }
// };
