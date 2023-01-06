import { body } from 'express-validator';

export const create = [
    body('name', 'Імя не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),
    body('language', 'language обовязковий').isString(),
    body('template_pack', 'Назва не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),

    // body('description', 'Назва не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),
    // body('screenshot', 'Назва не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),
];
export const update = [
    body('name', 'Імя не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),
    body('language', 'language обовязковий').isString(),
    body('template_pack', 'Назва не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),
];
