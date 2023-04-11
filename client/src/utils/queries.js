import { gql } from "@apollo/client";

export const QUERY_PEDALSETTINGS = gql`
  query Pedalsettings($userId: ID) {
    pedalsettings(userId: $userId) {
      preset
      _id
    }
  }
`;

export const QUERY_PEDALSETTING = gql`
  query pedalsetting($pedalsettingId: ID!) {
    pedalsetting(pedalsettingId: $pedalsettingId) {
      _id
      preset
      knobs{
        text
        position
        knobType
        knobValue
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pedalsettings {
        _id
        preset
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      pedalsettings {
        _id
        preset
      }
    }
  }
`;
