'use strict';

const NLISTINGS = 20;
const NAGENTS = 6;
const NLISTINGS_AGENTS = 60;
const NLISTING_IMAGES = 100;
const randi = (n) => Math.floor(Math.random() * n);
const randword = () => {
  const len = randi(5) + 5;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < len; ++i) {
    result += alphabet[randi(alphabet.length)];
  }
  return result;
}

module.exports = {
  NLISTINGS, NAGENTS, NLISTINGS_AGENTS, NLISTING_IMAGES,
  randi, randword
};
