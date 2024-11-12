export const getRoleFromToken = (token, role) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const isRole = payload.signInfo.role.some((value) => value === role);
  if (isRole) {
    return true;
  } else {
    return false;
  }
};
