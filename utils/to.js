/**
 * 免去try catch，适用于promise对象
 * const [err, data] = to(promise())
 * @param promise
 * @returns {*}
 */
export default function to(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}
