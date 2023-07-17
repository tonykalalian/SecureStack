// This middleware can be used to check if a user is authenticated before accessing certain routes
function isAuthenticated(req, res, next) {
  // Implement your authentication logic here (e.g., check if the user is logged in)
  // For demonstration purposes, let's assume the user is authenticated
  const isAuthenticated = true;

  if (isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  isAuthenticated,
};
