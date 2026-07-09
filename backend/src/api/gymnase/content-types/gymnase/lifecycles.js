'use strict';

/**
 * Validates that a string is a valid geographic coordinate.
 * Accepts values like "47.887067687826196" or "-1.9135509424965862".
 * @param {string} value
 * @returns {number|null} parsed float or null if invalid
 */
function parseCoordinate(value) {
  if (value === null || value === undefined || value === '') return null;
  const normalized = String(value).replace(',', '.');
  const parsed = parseFloat(normalized);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) return null;
  return parsed;
}

function validateLatitude(value) {
  const n = parseCoordinate(value);
  if (n === null) return 'La latitude doit être un nombre décimal valide (ex: 47.887067687826196).';
  if (n < -90 || n > 90) return 'La latitude doit être comprise entre -90 et 90.';
  return null;
}

function validateLongitude(value) {
  const n = parseCoordinate(value);
  if (n === null) return 'La longitude doit être un nombre décimal valide (ex: 1.9135509424965862).';
  if (n < -180 || n > 180) return 'La longitude doit être comprise entre -180 et 180.';
  return null;
}

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    normalizeAndValidate(data);
  },

  beforeUpdate(event) {
    const { data } = event.params;
    normalizeAndValidate(data);
  },
};

function normalizeAndValidate(data) {
  const errors = {};

  if (data.latitude !== undefined) {
    const latError = validateLatitude(data.latitude);
    if (latError) {
      errors.latitude = latError;
    } else {
      // Normalize comma → dot and store as string
      data.latitude = String(data.latitude).replace(',', '.');
    }
  }

  if (data.longitude !== undefined) {
    const lngError = validateLongitude(data.longitude);
    if (lngError) {
      errors.longitude = lngError;
    } else {
      data.longitude = String(data.longitude).replace(',', '.');
    }
  }

  if (Object.keys(errors).length > 0) {
    const messages = Object.values(errors).join(' | ');
    throw new Error(`Coordonnées invalides : ${messages}`);
  }
}
