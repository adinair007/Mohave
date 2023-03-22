import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  // ---> Jon added
  // getUsername() {
  //   return localStorage.getItem("username");
  // }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    try {
      const decoded = decode(token);
      // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      // If token hasn't passed its expiration time, return `false`
      else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  // ---> Jon changed from code block 
  // =============================================
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // login(idToken, user) {
  //   console.log("USER?", user);
  //   localStorage.setItem("username", user.name);
  //   localStorage.setItem('id_token', idToken);
  //   window.location.assign('/');
  // }
  // =============================================

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
