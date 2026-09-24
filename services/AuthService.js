import { LoginPage } from '../pages/LoginPage.js';
import { getUser } from '../utils/testData.js';

// AuthService is a reusable layer for login logic.
// This avoids repeating login steps in every test.
export class AuthService {
  constructor(page) {
    this.page = page;
  }

  async loginAs(role = 'validUser') {
    // Login using a role from the test-data file.
    const user = getUser(role);
    const loginPage = new LoginPage(this.page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    return { loginPage, user };
  }

  async loginWithCredentials(username, password) {
    // Login using explicit credentials when needed.
    const loginPage = new LoginPage(this.page);

    await loginPage.goto();
    await loginPage.login(username, password);

    return { loginPage };
  }
}
