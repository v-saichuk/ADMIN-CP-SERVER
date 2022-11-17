import Legals from '../../../models/Legals.js';

export const getOne = async (req, res) => {
    try {
        const LEGAL_PAGE_ID = req.params.id;

        const legals = await Legals.findById(LEGAL_PAGE_ID).exec();

        res.json({
            id: legals._id,
            ...legals.content,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати Legal page',
        });
    }
};
