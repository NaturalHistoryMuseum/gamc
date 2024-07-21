import axios from 'axios';

/**
 * Retrieves the number of records from the dataset with the given key which
 * match the given optional predicate.
 *
 * @param datasetKey the dataset to search
 * @param predicate optional predicate
 * @returns {Promise<Number>} the number of records
 */
export async function getCount(datasetKey, predicate = null) {
  const predicates = [
    // query the given dataset
    {
      type: 'equals',
      key: 'DATASET_KEY',
      value: datasetKey,
    },
  ];
  if (!!predicate) {
    predicates.push(predicate);
  }

  const url = 'https://api.gbif.org/v1/occurrence/search/predicate';
  const body = {
    // we don't need any results, just the count
    limit: 0,
    predicate: {
      type: 'and',
      predicates: predicates,
    },
  };
  const response = await axios.post(url, body);
  return response.data.count;
}

/**
 * Searches the available GBIF occurrence datasets using the given search text,
 * returning a list of at most limit dataset objects from the GBIF API. Check
 * the GBIF API doc about the dataset/suggest endpoint to see how the search
 * text is used.
 *
 * @param search the search text to pass to the GBIF API
 * @param limit the maximum number of datasets to return, defaults to 10
 * @returns {Promise<Object[]>} a list of dataset objects
 */
export async function searchDatasets(search, limit = 10) {
  const url = 'https://api.gbif.org/v1/dataset/suggest';
  const params = {
    limit: limit,
    type: 'OCCURRENCE',
    q: search,
  };
  const response = await axios.get(url, { params: params });
  return response.data;
}

/**
 * Retrieves a dataset from the GBIF API with the given key.
 *
 * @param datasetKey the dataset key
 * @returns {Promise<Object>} a dataset object
 */
export async function getDataset(datasetKey) {
  const url = `https://api.gbif.org/v1/dataset/${datasetKey}`;
  const response = await axios.get(url);
  return response.data;
}
