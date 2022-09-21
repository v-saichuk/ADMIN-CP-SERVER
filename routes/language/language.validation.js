import { body } from 'express-validator';

export const create = [
    body('title', 'Назва країни повина бути строкою').isString(),
    body('code', 'Код країни має бути строкою').isString(),
    body('icon', 'Стяг країни повинний бути строкою').isString(),
    body('enabled', 'Активування або Деактивування країни має бути булевим значенням').isBoolean(),
];

export const update = [
    body('enabled', 'Активування або Деактивування країни має бути булевим значенням').isBoolean(),
];
