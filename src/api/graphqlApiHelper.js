import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const graphqlApiHelper = async (query, variables = {}) => {
  try {
    const result = await client.graphql({
      query,
      variables,
      authMode: 'userPool',
    });
    return result?.data;
  } catch (error) {
    console.error('Request Error:', error);
    throw error;
  }
};

export default graphqlApiHelper;
