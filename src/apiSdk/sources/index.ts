import axios from 'axios';
import queryString from 'query-string';
import { SourceInterface, SourceGetQueryInterface } from 'interfaces/source';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSources = async (query?: SourceGetQueryInterface): Promise<PaginatedInterface<SourceInterface>> => {
  const response = await axios.get('/api/sources', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSource = async (source: SourceInterface) => {
  const response = await axios.post('/api/sources', source);
  return response.data;
};

export const updateSourceById = async (id: string, source: SourceInterface) => {
  const response = await axios.put(`/api/sources/${id}`, source);
  return response.data;
};

export const getSourceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sources/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSourceById = async (id: string) => {
  const response = await axios.delete(`/api/sources/${id}`);
  return response.data;
};
