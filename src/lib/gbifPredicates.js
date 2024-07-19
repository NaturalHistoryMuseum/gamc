export function exists(field) {
  return { type: 'isNotNull', parameter: field };
}

export function equals(field, value) {
  return {
    type: 'equals',
    key: field,
    value: value,
  };
}

export function isTrue(field) {
  return equals(field, true);
}

export function createOr(...predicates) {
  return {
    type: 'or',
    predicates: predicates,
  };
}

export function createAnd(...predicates) {
  return {
    type: 'and',
    predicates: predicates,
  };
}

export function createBasicOr(...fields) {
  return createOr(...fields.map(exists));
}
