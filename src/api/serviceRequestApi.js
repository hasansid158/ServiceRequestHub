import { generateClient } from 'aws-amplify/api';
import { createServiceRequest, updateServiceRequest, deleteServiceRequest } from '../graphql/mutations';
import { getServiceRequest, listServiceRequests } from '../graphql/queries';

const client = generateClient();

export const createServiceApi = async (input) => {
  try {
    const result = await client.graphql({
      mutation: createServiceRequest,
      variables: { input },
    });
    return result.data.createServiceRequest;
  } catch (error) {
    console.error('Error creating service request:', error);
    throw error;
  }
};

export const fetchServicesApi = async () => {
  try {
    const result = await client.graphql({
      query: listServiceRequests,
    });
    return result.data.listServiceRequests.items;
  } catch (error) {
    console.error('Error fetching service requests:', error);
    throw error;
  }
};