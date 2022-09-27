import { validationResult } from 'express-validator';
import Role from '../../models/Role.js';

export const getAll = async (req, res) => {
    try {
        const roles = await Role.find();

        res.json(roles);
    } catch (err) {
        console.log('Помилка в отримуванні всіх ролей =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось отримати всі ролі',
        });
    }
};

export const create = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }

        const doc = new Role({
            title: req.body.title,
            color: req.body.color,
            isSetting: req.body.isSetting,
            users: {
                createUsers: req.body.users.createUsers,
                editUsers: req.body.users.editUsers,
                deleteUsers: req.body.users.deleteUsers,
            },
            projects: {
                createProjects: req.body.projects.createProjects,
                editProjects: req.body.projects.editProjects,
                deleteProjects: req.body.projects.deleteProjects,
            },
        });

        const role = await doc.save();

        res.json({
            success: true,
            message: 'Роль успішно створенна',
            role,
        });
    } catch (err) {
        console.log('Помилка в створенні нової ролі =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось створити нову роль',
        });
    }
};

export const update = async (req, res) => {
    try {
        const roleId = req.params.id;

        // console.log('====>', req);

        await Role.updateOne(
            {
                _id: roleId,
            },
            {
                title: req.body.title,
                color: req.body.color,
                isSetting: req.body.isSetting,
                users: {
                    createUsers: req.body.users.createUsers,
                    editUsers: req.body.users.editUsers,
                    deleteUsers: req.body.users.deleteUsers,
                },
                projects: {
                    createProjects: req.body.projects.createProjects,
                    editProjects: req.body.projects.editProjects,
                    deleteProjects: req.body.projects.deleteProjects,
                },
            },
        );

        res.json({
            success: true,
            message: 'Роль успішно відредагована',
        });
    } catch (err) {
        console.log('Помилка в редагувані ролі =>', err);
        res.status(500).json({
            success: false,
            message: 'Невдалось відредагувати роль',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const roleId = req.params.id;
        Role.findOneAndDelete({ _id: roleId }, (err, doc) => {
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
