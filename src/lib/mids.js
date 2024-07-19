import { getCount } from './gbifApi.js';
import {
  createAnd,
  createBasicOr,
  createOr,
  exists,
  isTrue,
} from './gbifPredicates.js';

export const mids0Elements = {
  // missing:
  // - materialSampleID
  // - materialEntityID
  PhysicalSpecimenID: createBasicOr(
    'CATALOG_NUMBER',
    'OTHER_CATALOG_NUMBERS',
    'OCCURRENCE_ID',
  ),
  // missing:
  // - ownerInstitutionCode
  // - institutionID
  Organization: createBasicOr('INSTITUTION_KEY', 'INSTITUTION_CODE'),
};

export const mids1Elements = {
  Name: createBasicOr(
    'SCIENTIFIC_NAME',
    // todo: is this ok for vernacularName? Probably but not?
    'VERBATIM_SCIENTIFIC_NAME',
    // todo: is this ok for scientificNameID? Seems like this may actually produce a
    //       search across all taxonomy fields on GBIF's end?
    'TAXON_KEY',
    // todo: we don't have organismName but we do have this, is it ok?
    'ORGANISM_ID',
  ),
  SpecimenType: exists('BASIS_OF_RECORD'),
  ObjectType: exists('PREPARATIONS'),
  License: exists('LICENSE'),
  Modified: exists('MODIFIED'),
};

export const mids2Elements = {
  // missing:
  // - county
  // - municipality
  // - verbatimLocality
  // - verbatimLongitude
  // - verbatimLatitude
  // - countryCode
  QualitativeLocation: createBasicOr(
    'LOCALITY',
    'ISLAND',
    'ISLAND_GROUP',
    'CONTINENT',
    'COUNTRY',
    'STATE_PROVINCE',
    'WATER_BODY',
    'HIGHER_GEOGRAPHY',
  ),
  // missing:
  // - locationID
  // - footprintWKT
  // but GADM_GID probably makes up for this?
  QuantitativeLocation: createOr(
    // instead of checking DECIMAL_LATITUDE and DECIMAL_LONGITUDE, use this
    isTrue('HAS_COORDINATE'),
    exists('GADM_GID'),
  ),
  CollectingAgent: createBasicOr('RECORDED_BY', 'RECORDED_BY_ID'),
  // missing:
  // - verbatimEventDate
  CollectionDate: createBasicOr('EVENT_DATE', 'YEAR'),
  CollectorNumber: createBasicOr('FIELD_NUMBER', 'RECORD_NUMBER'),
  // missing:
  // - associatedMedia
  // - identifier
  // - references
  // - accessURI
  // - identifier
  // but probably ok because of MEDIA_TYPE I think.
  // todo: worth using DWCA_EXTENSION is one of Multimedia Audubon multimedia etc
  media: exists('MEDIA_TYPE'),
};

// missing:
// - AssociatedMediaID
export const mids3Elements = {
  // missing:
  // - geodeticDatum
  // - coordinatePrecision
  // - footprintSRS
  // - footprintWKT
  GeographicalLocalityID: createOr(
    exists('COORDINATE_UNCERTAINTY_IN_METERS'),
    // instead of checking DECIMAL_LATITUDE and DECIMAL_LONGITUDE, use this
    isTrue('HAS_COORDINATE'),
  ),
  // todo: is this ok?
  InstitutionID: exists('INSTITUTION_KEY'),
  CollectorID: exists('RECORDED_BY_ID'),
  // todo: is this ok?
  ScientificNameID: exists('TAXON_ID'),
  IdentifiedByID: exists('IDENTIFIED_BY_ID'),
};

export async function calculateCounts(datasetKey) {
  const counts = [];
  const predicates = [];
  const levels = [mids0Elements, mids1Elements, mids2Elements, mids3Elements];
  for (const level of levels) {
    predicates.push(...Object.values(level));
    const count = await getCount(datasetKey, createAnd(...predicates));
    counts.push(count);
  }
  return counts;
}

export async function getPerElementCounts(datasetKey) {
  const counts = [];
  const levels = [mids0Elements, mids1Elements, mids2Elements, mids3Elements];

  for (const level of levels) {
    const levelCounts = {};
    for (const [element, predicate] of Object.entries(level)) {
      levelCounts[element] = await getCount(datasetKey, predicate);
    }
    counts.push(levelCounts);
  }
  return counts;
}
