import { body } from 'express-validator';

export const create = [
    body('name', 'Назва не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),
    body('language', 'language обовязковий').isString(),
    body('offer', 'offer обовязковий').isString(),
    body('website', 'website обовязковий').isString(),
    body('offerOwner', 'Offer Owner обовязковий').isString(),
    body('enabled', 'enabled обовязковий').isBoolean(),
    // body('content.title', 'description обовязковий').isString(),
    // body('content.description', 'description обовязковий').isString(),
];
export const update = [
    body('name', 'Назва не може бути меньш ніж 2 символи').isString().isLength({ min: 2 }),
    body('language', 'language обовязковий').isString(),
    body('offer', 'offer обовязковий').isString(),
    body('website', 'website обовязковий').isString(),
    body('offerOwner', 'Offer Owner обовязковий').isString(),
    body('enabled', 'enabled обовязковий').isBoolean(),
    // body('content.title', 'description обовязковий').isString(),
    // body('content.description', 'description обовязковий').isString(),
];
