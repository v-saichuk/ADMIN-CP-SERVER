import User from '../../models/User.js';

export const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log('Помилка в отримані користувачів =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось откримати користувачів',
        });
    }
};
