import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),//проверка что это имэйл
    body('password', 'Пароль должен быть минимум из 5 символов').isLength({ min: 5 }),//длина пароля от 5 символов
    body('fullName', 'Укажите имя').isLength({ min: 3 }),//длина имени от 3 символов
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),//проверка что аватарка является ссылкой
]