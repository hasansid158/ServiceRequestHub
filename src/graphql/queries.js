/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getServiceRequest = /* GraphQL */ `
  query GetServiceRequest($id: ID!) {
    getServiceRequest(id: $id) {
      id
      serviceName
      serviceDescription
      creationDate
      severity
      resolutionDate
      reporterName
      contactInformation
      location
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listServiceRequests = /* GraphQL */ `
  query ListServiceRequests(
    $filter: ModelServiceRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        serviceName
        serviceDescription
        creationDate
        severity
        resolutionDate
        reporterName
        contactInformation
        location
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
