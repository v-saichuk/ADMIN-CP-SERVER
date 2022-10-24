import { body } from 'express-validator';

export const create = [
    body('name', 'Назва Offer не може бути меньш ніж 3 символи або числом')
        .isString()
        .isLength({ min: 3 }),
    // body('offerOwner', 'Offer Owner Обовязково має бути').isEmpty(),
    body('logo', 'Вкажіть лого').isLength({ min: 4 }),
];

export const update = [
    body('name', 'Назва Offer не може бути меньш ніж 3 символи або числом')
        .isString()
        .isLength({ min: 3 }),
    // body('offerOwner', 'Offer Owner Обовязково має бути').isEmpty(),
    body('logo', 'Вкажіть лого').isLength({ min: 4 }),
];
