/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import {
    allPass,
    andThen, 
    compose, 
    gt, 
    ifElse, 
    lt, 
    length, 
    mathMod, 
    otherwise,
    partialRight, 
    prop, 
    test, 
    tap, 
} from 'ramda';

const api = new Api();

// validate
const less10Digit = compose(
    partialRight(lt, [10]),
    length
)
const more2Digit = compose(
    partialRight(gt, [2]),
    length
)
const isFloat = test(/^\d+(\.\d+)?$/);
const validate = allPass([less10Digit, more2Digit, isFloat]);
// async
const mod2to10 = async (val) => await api.get('https://api.tech/numbers/base', {from: 10, to: 2, number: val});
const getAnimal = async (id) => await api.get(`https://animals.tech/${id}`, {});
// props
const getResult = prop('result');
// mod
const square = n => n * n;

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    // helpers
    const logValidationError = () => handleError('ValidationError');
    const handleResult = compose(
        handleSuccess,
        getResult
    );
    const forAnimal = compose(
        otherwise(handleError),
        andThen(handleResult),
        getAnimal,
        tap(writeLog),
        partialRight(mathMod, [3]),
        tap(writeLog),
        square,
        tap(writeLog),
        length,
        tap(writeLog),
        getResult
    );
    const action = compose(
        otherwise(handleError),
        andThen(forAnimal),
        mod2to10,
        tap(writeLog),
        Math.round
    )
    const run = compose(
        ifElse(validate, action, logValidationError),
        tap(writeLog)
    );
    
    run(value);
}

export default processSequence;
