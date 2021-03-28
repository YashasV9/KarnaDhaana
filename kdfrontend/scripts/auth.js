// SignUp
const signupForm = document.querySelector("#signup-form");
const msg = document.querySelector(".userSignedUpMessage");
const ngoSignupForm = document.querySelector("#signup-form-ngo");

ngoSignupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const ngoEmail = ngoSignupForm["signup-email-ngo"].value;
  const ngoPassword = ngoSignupForm["signup-password-ngo"].value;
  const selectOption = document.querySelector("#area-of-work");
  const areaOfInterest = selectOption.options[selectOption.selectedIndex].text;
  auth
    .createUserWithEmailAndPassword(ngoEmail, ngoPassword)
    .then((cred) => {
      return db.collection("ngo").doc(cred.user.uid).set({
        uniqueId: ngoSignupForm["signup-id-ngo"].value,
        district: ngoSignupForm["signup-district-ngo"].value,
        ngoName: ngoSignupForm["signup-name-ngo"].value,
        donor: false,
        area: areaOfInterest,
        donorList: {},
      });
    })
    .then(() => {
      const ngoModal = document.querySelector("#modal-signup-ngo");
      M.Modal.getInstance(ngoModal).close();
      ngoSignupForm.reset();
      ngoSignupForm.querySelector(".error").innerHTML = "";
      msg.textContent = "NGO Signed Up";
    })
    .catch((err) => {
      ngoSignupForm.querySelector(".error").innerHTML = err.message;
    });
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get User Info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  // Signup the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("donors").doc(cred.user.uid).set({
        username: signupForm["signup-name"].value,
        district: signupForm["signup-district"].value,
        donor: true,
        ngoList: {},
      });
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector(".error").innerHTML = "";
      msg.textContent = "SignedUp";
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
