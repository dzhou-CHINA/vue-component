/**
 * Gets the smallest positive number and its index
 *
 * @param {Array} array number list
 *
 * @returns {Object} Smallest positive number and index
 */
const getMinPositiveNO = (array = []) => {
    let index = -1;
    let min = 0;

    array.reduce((pre, cur, i) => {
        console.log(pre, cur, i)
        if (pre > 0 && cur > 0) {
            min = Math.min(pre, cur);
            
            index = min !== pre ? i : index;
        }

        return min;
    });

    return { index, value: array[index]};
};

/**
 * Flattens the array list
 *
 * @param {Array} array object list
 *
 * @returns {Array} array list
 */
const flatten = (array = []) => {
    const result = [];

    array.forEach(v => {
        if (Array.isArray(v)) {
            result.push(...flatten(v));
        } else {
            result.push(v);
        }
    });

    return result;
};

/**
 * Splices the array
 *
 * @param {Array} array array list
 *
 * @returns {Array} sliced list
 */
Array.prototype._splice = (start = 0, end, ...addList) => {
    if (typeof start !== 'number') {
        start = 0;
    } else if (start < 0) {
        start = Math.abs(start) >= this.length ? 0 : start + this.length;
    }

    if (typeof end === 'undefined') {
        end = this.length - start;
    } else if (typeof end !== 'number') {
        end = 0;
    }

    const removeList = this.slice(start, end);
    const left = this.slice(0, start);
    const right = this.slice(end, this.length);
    const result = [...left, ...addList, ...right];
    result.forEach((v, i) => this[i] = v);

    return removeList;
};

/**
 * The function like the Object.property.map
 * `JSON.stringify(obj, fn(k, v))`
 *
 * @param {Object} obj the object to map
 * @param {Function} fn handle function
 *
 * @returns {Object} the handled object
 */
const _Map = (obj, fn) => {
    if (typeof fn !== 'function') {
        console.error(`${fn} is not Function!`)
        return;
    }

    return JSON.parse(JSON.stringify(obj, (k, v) => {
        if (k) {
            return fn.call(this, k, v);
        } else {
            return v;
        }
    }));
};

const arr = ['Jan', 'March', 'April', 'June'];
const data = arr._splice(1,2, '222');
console.log(arr, data);
