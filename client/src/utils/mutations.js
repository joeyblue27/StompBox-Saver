import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PEDALSETTING = gql`
  mutation addpedalInfo($preset: String!, $userId: ID!) {
    addpedalInfo(preset: $preset, userId: $userId) {
      _id
      preset
    }
  }
`;

export const UPDATE_PEDALSETTING = gql`
  mutation updatepedalInfo(
    $pedalsettingId: ID!
    $preset: String
    $knobs: [KnobInput]
    $userId: ID
  ) {
    updatepedalInfo(
      pedalsettingId: $pedalsettingId
      preset: $preset
      knobs: $knobs
      userId: $userId
    ) {
      preset
      knobs {
        text
        position
        knobType
        knobValue
      }
    }
  }
`;

export const DELETE_PEDALSETTING = gql`
  mutation deletepedalInfo($pedalsettingId: ID!, $userId: ID!) {
    deletepedalInfo(pedalsettingId: $pedalsettingId, userId: $userId) {
      _id
      preset
    }
  }
`;
