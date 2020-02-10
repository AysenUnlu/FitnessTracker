$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $(".login");
  var usernameInput = $("#email");
  var passwordInput = $("#password");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/users/login", {
      email: username,
      password: password
    }).then(function(data) {
       window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      $("#password-feedback").text("Incorrect Username or Password");
    });
  }

});
