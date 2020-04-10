/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      bad
      good
      tomorrow
      description
      createdAt
      username
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bad
        good
        tomorrow
        description
        createdAt
        username
      }
      nextToken
    }
  }
`;
export const notesByUserName = /* GraphQL */ `
  query NotesByUserName(
    $username: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByUserName(
      username: $username
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bad
        good
        tomorrow
        description
        createdAt
        username
      }
      nextToken
    }
  }
`;
