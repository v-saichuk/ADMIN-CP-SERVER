import { validationResult } from 'express-validator';
import Offer from '../../models/Offer.js';

export const getAll = async (req, res) => {
    try {
        const offers = await Offer.find().populate('offerOwner').exec();

        res.json(offers);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі Offers',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const doc = new Offer({
            name: req.body.name,
            offerOwner: req.body.offerOwner,
            logo: req.body.logo,
        });

        const offerSaved = await doc.save();
        const offer = await Offer.findById(offerSaved._id).populate('offerOwner').exec();

        res.json({
            success: true,
            message: 'Offer успішно створенний',
            offer,
        });
    } catch (err) {
        console.log('Помилка в створенні нового Offer =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нового Offer',
        });
    }
};

export const update = async (req, res) => {
    try {
        const offerId = req.params.id;

        await Offer.updateOne(
            {
                _id: offerId,
            },
            {
                name: req.body.name,
                offerOwner: req.body.offerOwner,
                logo: req.body.logo,
            },
        );

        const offer = await Offer.findById(offerId).populate('offerOwner').exec();

        res.json({
            success: true,
            message: 'Offer успішно відредагована',
            offer,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось відредагувати offer',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const offerId = req.params.id;
        Offer.findOneAndDelete({ _id: offerId }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Невдалось видалити Offer',
                    err,
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Offer не знайденo',
                    err,
                });
            }

            res.json({
                success: true,
                message: 'Offer успішно видаленний',
            });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось видалити Offer',
            err,
        });
    }
};
