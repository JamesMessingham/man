const email = document.querySelector("#txtEmail"),
      username = document.querySelector("#txtUsername"),
      password = document.querySelector("#txtPassword"),
      login = document.querySelector("#btnLogin"),
      signup = document.querySelector("#btnSignUp"),
      logout = document.querySelector("#btnLogout"),
      authForm = document.querySelector("#auth"),
      chat = document.querySelector("#socket-chat");

login.addEventListener("click", e => {
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => console.log(e.message));
});

signup.addEventListener("click", e =>{
  const auth = firebase.auth();

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.then(u => {
    user = auth.currentUser;
    user.updateProfile({displayName: username.value});
  });
  promise.catch(e => console.log(e.message));
});

logout.addEventListener("click", e => {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(user => {
  user ? loggedIn() : loggedOut();
});

function loggedIn(){
  chat.style.display = 'flex';
  authForm.style.display = 'none';
}

function loggedOut(){
  chat.style.display = 'none';
  authForm.style.display = 'block';
}
