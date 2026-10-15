import assert from 'node:assert/strict';

// Historical literal-answer fixtures belong to the instrument whose wording
// they actually answered. Select it before loading classification.js so frozen
// T7/T8/etc. responses are never interpreted as answers to new propositions.
export function selectLegacy08Instrument(context) {
  assert.ok(Array.isArray(context.LAW_LEGACY_QUESTIONS),
    'Historical fixtures require the preserved 0.8 question bank');
  context.LAW_QUESTIONS = context.LAW_LEGACY_QUESTIONS;
  context.LAW_VERSION = '0.8 Beta';
  context.LAW_INSTRUMENT_VERSION = '0.8';
}
