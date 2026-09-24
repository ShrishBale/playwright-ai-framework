import users from '../test-data/users.json' with { type: 'json' };

// This helper centralizes access to your app users.
// It makes tests easy to read and keeps test data out of feature files.
export function getUser(role) {
  if (!users[role]) {
    throw new Error(`User role "${role}" was not found in test-data/users.json`);
  }

  return users[role];
}

export function getUsers() {
  return users;
}

export function getAllRoles() {
  return Object.keys(users);
}
