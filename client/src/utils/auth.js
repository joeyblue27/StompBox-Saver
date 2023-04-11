// get users info
import decode from "jwt-decode";

// create new user and get JSON token
class AuthService {
 

  getProfile() {
    const decodedToken = decode(this.getToken());
    console.log("Decoded token:", decodedToken);
    return {
      id: decodedToken.data._id,
      email: decodedToken.data.email,
      username: decodedToken.data.username,
    };
  }

  getUser() {
    const decodedToken = decode(this.getToken());
    console.log("Decoded token:", decodedToken);
    return decodedToken;
  }

  // return `true` or `false` if token exists (does not verify if it's expired yet)
  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  getToken() {
    // gets the users token
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // saves the users token into local storage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // logs user out 
    localStorage.removeItem("id_token");
    // navigate to homepage
    window.location.assign("/");
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
