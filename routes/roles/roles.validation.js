import { body } from 'express-validator';

export const create = [
    body('title', 'Назва ролі не може бути меньш ніж 3 символи або числом')
        .isString()
        .isLength({ min: 3 }),
    body('color', 'Мінімальна довжина назви кольра 4 символи').isLength({ min: 4 }),
    body('isSetting', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('createUsers', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('editUsers', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('deleteUsers', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('createProjects', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('editProjects', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('deleteProjects', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
];

export const update = [
    body('title', 'Назва ролі не може бути меньш ніж 3 символи або числом')
        .isString()
        .isLength({ min: 3 }),
    body('color', 'Мінімальна довжина назви кольра 4 символи').isLength({ min: 4 }),
    body('isSetting', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('createUsers', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('editUsers', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('deleteUsers', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('createProjects', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('editProjects', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
    body('deleteProjects', 'Вкажіть тільки булеве значеня (Так або Ні)').isBoolean(),
];
