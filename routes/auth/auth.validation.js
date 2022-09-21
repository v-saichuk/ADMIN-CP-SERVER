import { body } from 'express-validator';

export const login = [
    body('email', 'Email is not a valid').isEmail(),
    body('password', 'Error, min lingth 5 sign').isLength({ min: 5 }),
];
