'use strict';

const { BRAND } = require('../../form-contact/templates_js/form-contact-utils');

const ANONYMOUS_NAME = 'Un visiteur anonyme';
const NO_EMAIL = 'Aucun email renseigné';

function displayName(name) {
  const trimmed = String(name ?? '').trim();
  return trimmed || ANONYMOUS_NAME;
}

function displayEmail(email) {
  const trimmed = String(email ?? '').trim();
  return trimmed || NO_EMAIL;
}

function buildPlainText({ name, email, message }) {
  return [
    'Formulaire avis visiteur — CLTO Badminton',
    '',
    `Visiteur : ${displayName(name)}`,
    `Email : ${displayEmail(email)}`,
    '',
    'Avis :',
    message || 'Aucun avis',
  ].join('\n');
}

module.exports = {
  BRAND,
  ANONYMOUS_NAME,
  NO_EMAIL,
  displayName,
  displayEmail,
  buildPlainText,
};
