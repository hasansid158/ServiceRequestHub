/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateServiceRequest = /* GraphQL */ `
  subscription OnCreateServiceRequest(
    $filter: ModelSubscriptionServiceRequestFilterInput
    $owner: String
  ) {
    onCreateServiceRequest(filter: $filter, owner: $owner) {
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
export const onUpdateServiceRequest = /* GraphQL */ `
  subscription OnUpdateServiceRequest(
    $filter: ModelSubscriptionServiceRequestFilterInput
    $owner: String
  ) {
    onUpdateServiceRequest(filter: $filter, owner: $owner) {
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
export const onDeleteServiceRequest = /* GraphQL */ `
  subscription OnDeleteServiceRequest(
    $filter: ModelSubscriptionServiceRequestFilterInput
    $owner: String
  ) {
    onDeleteServiceRequest(filter: $filter, owner: $owner) {
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
