import { body } from 'express-validator';

export const create = [
    body('url', 'URL не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),
    body('offers', 'Вкажіть offers').isArray(),
    body('enabled', 'Вкажіть статус').isBoolean(),
    body('notes', 'Вкажіть опис').isLength(),
];

export const update = [
    body('url', 'URL не може бути меньш ніж 10 символи').isString().isLength({ min: 10 }),
    body('offers', 'Вкажіть offers').isArray(),
    body('enabled', 'Вкажіть статус').isBoolean(),
    body('notes', 'Вкажіть опис').isLength(),
];

export const updateOne = [body('enabled', 'Вкажіть статус').isBoolean()];
