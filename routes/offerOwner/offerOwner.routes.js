import { validationResult } from 'express-validator';
import OfferOwner from '../../models/OfferOwner.js';

export const getAll = async (req, res) => {
    try {
        const offerOwner = await OfferOwner.find();

        res.json(offerOwner);
    } catch (err) {
        console.log('Помилка в отримуванні всіх Offer Owner =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі Offer Owner',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const doc = new OfferOwner({
            name: req.body.name,
            color: req.body.color,
        });

        const offerOwner = await doc.save();

        res.json({
            success: true,
            message: 'Offer Owner успішно створенний',
            offerOwner,
        });
    } catch (err) {
        console.log('Помилка в створенні нового Offer Owner =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нового Offer Owner',
        });
    }
};

export const update = async (req, res) => {
    try {
        const offerOwnerId = req.params.id;

        await OfferOwner.updateOne(
            {
                _id: offerOwnerId,
            },
            {
                name: req.body.name,
                color: req.body.color,
            },
        );

        res.json({
            success: true,
            message: 'Offer owner успішно відредагована',
        });
    } catch (err) {
        console.log('Помилка в редагувані offer owner =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось відредагувати offer owner',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const offerOwnerId = req.params.id;
        OfferOwner.findOneAndDelete({ _id: offerOwnerId }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Невдалось видалити роль',
                    err,
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Роль не знайдена',
                    err,
                });
            }

            res.json({
                success: true,
                message: 'Роль успішно видалена',
            });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось видалити роль',
            err,
        });
    }
};
