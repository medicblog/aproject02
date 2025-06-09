// @ts-check

const {random, floor} = Math;

const utils = {
    rnd(min, max) {
        return floor(random() * (max - min + 1) + min);
    },
};

export default utils;