import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import '../assets/css/homepage.css';

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [adduser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("Form state:", formState); // Add this line

    try {
      const { data } = await adduser({
        variables: { ...formState },
      });

      console.log("Mutation response:", data); // Add this line

      Auth.login(data.addUser.token); // Change 'adduser' to 'addUser' here
    } catch (e) {
      console.error(e);
    }
  };

  if (error) {
    return <>Signup failed {error.message}</>;
  }

  return (
    <main className="">
      <div className="">
        <div className="card">
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  flexDirection="row"
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />

                <input
                  flexDirection="row"
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                flexDirection="row"
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="save-btn"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-info text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
