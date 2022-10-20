import { body } from 'express-validator';

export const create = [
    body('name', 'Назва Offer Owner не може бути меньш ніж 3 символи або числом')
        .isString()
        .isLength({ min: 3 }),
    body('color', 'Мінімальна довжина назви кольра 4 символи').isLength({ min: 4 }),
];

export const update = [
    body('name', 'Назва Offer Owner не може бути меньш ніж 3 символи або числом')
        .isString()
        .isLength({ min: 3 }),
    body('color', 'Мінімальна довжина назви кольра 4 символи').isLength({ min: 4 }),
];
