import graphqlApiHelper from './graphqlApiHelper';

import { createServiceRequest, updateServiceRequest, deleteServiceRequest } from '../graphql/mutations';
import { getServiceRequest, listServiceRequests } from '../graphql/queries';

export const fetchServicesApi = async () => {
  const res = await graphqlApiHelper(listServiceRequests);
  return res?.listServiceRequests?.items;
};

export const getServiceApi = async (payload) => {
  const res = await getServiceRequest(listServiceRequests, { input: payload });
  return res?.listServiceRequests?.items;
};

export const createServiceApi = async (payload) => {
  return await graphqlApiHelper(createServiceRequest, { input: payload });
};

export const updateServiceApi = async (payload) => {
  const res = await graphqlApiHelper(updateServiceRequest, { input: payload });
  return res?.updateServiceRequest;
};

export const deleteServiceApi = async (payload) => {
  const res = await graphqlApiHelper(deleteServiceRequest, { input: payload });
  return res?.deleteServiceRequest;
};