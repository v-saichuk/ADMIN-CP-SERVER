import { body } from 'express-validator';

export const create = [
    body('avatarUrl', 'Аватар не является посиланням').optional().isURL(),
    body('firstName', 'Занад-то коротке імя користувача').isLength({ min: 2 }),
    body('lastName', 'Занад-то коротка фамілія користувача').isLength({ min: 2 }),
    body('email', 'Email не валідний').isEmail(),
    body('roleId', 'Роль відсутя').isLength({ min: 1 }),
    body('password', 'Пароль не може будти коротше 5 символів').isLength({ min: 5 }),
    body('twitter', 'Посиларня на аккаунт Twitter не є валідним').optional().isURL(),
    body('facebook', 'Посиларня на аккаунт Facebook не є валідним').optional().isURL(),
    body('telegram', 'Посиларня на аккаунт Telegram не є валідним').optional().isURL(),
    body('linkedin', 'Посиларня на аккаунт Linkedin не є валідним').optional().isURL(),
];

export const update = [
    body('avatarUrl', 'Аватар не является посиланням').optional().isURL(),
    body('firstName', 'Занад-то коротке імя користувача').isLength({ min: 2 }),
    body('lastName', 'Занад-то коротка фамілія користувача').isLength({ min: 2 }),
    body('email', 'Email не валідний').isEmail(),
    body('roleId', 'Роль відсутя').isLength({ min: 1 }),
    body('password', 'Пароль не може будти коротше 5 символів').isLength({ min: 5 }),
    body('twitter', 'Посиларня на аккаунт Twitter не є валідним').optional().isURL(),
    body('facebook', 'Посиларня на аккаунт Facebook не є валідним').optional().isURL(),
    body('telegram', 'Посиларня на аккаунт Telegram не є валідним').optional().isURL(),
    body('linkedin', 'Посиларня на аккаунт Linkedin не є валідним').optional().isURL(),
];
