import axios from 'axios';

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
    // we don't need any results, just counts
    limit: 0,
    predicate: {
      type: 'and',
      predicates: predicates,
    },
  };
  const response = await axios.post(url, body);
  return response.data.count;
}

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

export async function getDataset(datasetKey) {
  const url = `https://api.gbif.org/v1/dataset/${datasetKey}`;
  const response = await axios.get(url);
  return response.data;
}
