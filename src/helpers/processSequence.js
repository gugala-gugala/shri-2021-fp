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
import { allPass, compose, lt, gt, length, test, tap, mathMod, partialRight, ifElse, andThen, otherwise } from 'ramda';
const api = new Api();

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
const square = n => n * n;
const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const logValidationError = () => handleError('ValidationError');
    const action = (v) => {
        let val = Math.round(v);
        writeLog(val);
        api.get('https://api.tech/numbers/base', {from: 10, to: 2, number: val}).then(({result}) => {
            forAnimal(result);
        }).catch((e) => {
            handleError(e);
        });
    }
    writeLog(value);

    const v = ifElse(validate, action, logValidationError);
    v(value);

    const getAnimal = async (id) => {
        let url = `https://animals.tech/${id}`;
        let z = await api.get(url, {});
        return z.result;
    }
    const forAnimal = compose(
        otherwise(handleError),
        andThen(handleSuccess),
        getAnimal,
        tap(writeLog),
        partialRight(mathMod, [3]),
        tap(writeLog),
        square,
        tap(writeLog),
        length,
        tap(writeLog)
    )
}

export default processSequence;
