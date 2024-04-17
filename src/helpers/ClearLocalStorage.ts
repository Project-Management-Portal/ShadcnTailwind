const clearLocalStorage = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  localStorage.removeItem("isJoinedTeam");
  localStorage.removeItem("submittedTeam");
};

export default clearLocalStorage;
