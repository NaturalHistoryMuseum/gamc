/**
 * Creates an exists predicate for use on the GBIF API. Currently this is
 * implemented as an isNotNull predicate.
 *
 * @param {string} field the field to check exists
 * @returns {{type: string, parameter: string}} a GBIF API predicate
 */
export function exists(field) {
  // todo: do we want to check for values MIDS treats as "missing" instead of/in
  //       addition to just a straight up exists check?
  return { type: 'isNotNull', parameter: field };
}

/**
 * Creates an equals predicate for use on the GBIF API.
 *
 * @param {string} field the field to check
 * @param {any} value the value to check
 * @returns {{type: string, key: string, value: any}} a GBIF API predicate
 */
export function equals(field, value) {
  return {
    type: 'equals',
    key: field,
    value: value,
  };
}

/**
 * Creates a predicate for use on the GBIF API which filters where the given
 * field is true.
 *
 * @param {string} field the field to check is true
 * @returns {{type: string, key: string, value: boolean}} a GBIF API predicate
 */
export function isTrue(field) {
  return equals(field, true);
}

/**
 * Creates a predicate representing an or of all the passed predicates.
 *
 * @param {...Object} predicates the predicates to or together
 * @returns {{predicates: Object[], type: string}} a GBIF API predicate
 */
export function createOr(...predicates) {
  return {
    type: 'or',
    predicates: predicates,
  };
}

/**
 * Creates a predicate representing an and of all the passed predicates.
 *
 * @param {...Object} predicates the predicates to and together
 * @returns {{predicates: Object[], type: string}} a GBIF API predicate
 */
export function createAnd(...predicates) {
  return {
    type: 'and',
    predicates: predicates,
  };
}

/**
 * Creates an or predicate over the existence of each of the given fields. This
 * results in a query which checks that at least one of the fields exists.
 *
 * @param {...String} fields the fields
 * @returns {{predicates: Object[], type: string}} a GBIF API predicate
 */
export function createBasicOr(...fields) {
  return createOr(...fields.map(exists));
}
