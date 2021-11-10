/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
    all,
    allPass, 
    and, 
    anyPass, 
    compose, 
    equals, 
    filter, 
    groupBy, 
    gte, 
    length, 
    map, 
    max, 
    not, 
    partialRight, 
    pick, 
    prop, 
    reduce, 
    values, 
} from 'ramda';

const isRed = equals('red');
const isGreen = equals('green');
const isOrange = equals('orange');
const isBlue = equals('blue');
const isWhite = equals('white');
const isNoWhite = (c) => c !== 'white';

const getStar = prop('star');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getCircle = prop('circle');

const countOf = (color, shapes) => length(filter(color, values(shapes)));
const countOfGreen = (shapes) => countOf(isGreen, shapes);
const countOfBlue = (shapes) => countOf(isBlue, shapes);
const countOfRed = (shapes) => countOf(isRed, shapes);
const countOfWhite = (shapes) => countOf(isWhite, shapes);

// конкретные экземпляры
const isRedStar = compose(isRed, getStar);
const isGreenSquare = compose(isGreen, getSquare);
const isBlueCircle = compose(isBlue, getCircle);
const isGreenTreangle = compose(isGreen, getTriangle);
const isWhiteStar = compose(isWhite, getStar);

// 1.
const e2White = compose(equals(2), countOfWhite);
const redStarGreenSquare = allPass([isRedStar, isGreenSquare, e2White]);

// 2.
const min2Green = compose(
    partialRight(gte, [2]),
    countOfGreen
);
// 3.
const equalRedAndBlue = (shapes) => equals(countOfRed(shapes), countOfBlue(shapes));
// 4.
const orangeSquare = compose(isOrange, getSquare);
const is4 = allPass([isBlueCircle, isRedStar, orangeSquare])
// 5.
const min3Equal = compose(
    partialRight(gte, [3]),
    reduce(max, 0),
    map(length),
    values,
    groupBy(a=>a),
    filter(isNoWhite),
    values
)
// 6.
const e2Green = compose(
    equals(2),
    countOfGreen
);
const e1Red = compose(
    equals(1),
    countOfRed
)
const green2AndRed = allPass([isGreenTreangle, e2Green, e1Red]);
// 7.
const allOrange = compose(
    all(a=>a),
    map(isOrange),
    values
);
// 8.
const notRedOrWhiteStar = compose(
    not,
    anyPass([isRedStar, isWhiteStar])
)
// 9.
const allIsGreen = shapes => all(isGreen, values(shapes));
// 10.
const isEqualNoWhite = (args) => and(args[0] === args[1], args[0] !== 'white');
const triangleAndSquare = compose(
    isEqualNoWhite,
    values,
    pick(['triangle', 'square'])
);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = redStarGreenSquare;

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = min2Green;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = equalRedAndBlue; //(shapes) => equals(countOfRed(shapes), countOfBlue(shapes));

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = is4;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = min3Equal;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = green2AndRed;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allOrange;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = notRedOrWhiteStar;

// 9. Все фигуры зеленые.
export const validateFieldN9 = allIsGreen;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = triangleAndSquare;
