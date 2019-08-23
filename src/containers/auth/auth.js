export const adminRole = 'admin';
export const guestRole = 'guest';

const rolesAccess = {
  guest: ['guest'],
  admin: ['guest', 'admin'],
};

export const checkAccess = (user, requiredRole) => rolesAccess[user].includes(requiredRole);
