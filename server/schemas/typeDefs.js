const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type PedalState {
    _id: ID
    preset: String
    knobs: [Step]
  }

  type Step {
    text: String
    position: Int
    knobType: String
    knobValue: [String]
  }

  type User {
    _id: ID
    username: String
    email: String
    pedalsettings: [PedalState]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    pedalsettings(userId: ID): [PedalState]
    pedalsetting(pedalsettingId: ID!): PedalState
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(email: String!, username: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addpedalInfo(preset: String!, userId: ID!): PedalState
    updatepedalInfo(
      pedalsettingId: ID!
      preset: String
      knobs: [StepInput]
      userId: ID
    ): PedalState
    deletepedalInfo(pedalsettingId: ID!, userId: ID!): PedalState
  }

  input StepInput {
    text: String
    position: Int
    knobType: String
    knobValue: [String]
  }
`;

module.exports = typeDefs;
