// SignUp
const signupForm = document.querySelector("#signup-form");
const msg = document.querySelector(".userSignedUpMessage");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get User Info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  // Signup the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred);
      msg.innerHTML = `${cred.user.email} Signed Up`;
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      signupForm.querySelector(".error").innerHTML = err.message;
    });
});

// Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("Signed Out");
    msg.innerHTML = `Signed Out`;
  });
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get User Info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      // Close the Modal Login and Reset the Form
      console.log(cred.user);
      msg.innerHTML = `${cred.user.email} Signed In`;
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      loginForm.querySelector(".error").innerHTML = err.message;
    });
});
