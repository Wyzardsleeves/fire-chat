//initial test
var getTest = document.getElementsByClassName('test')[0];
var databaseRef = firebase.database().ref().child('text');

databaseRef.on('value', snap => getTest.innerText = snap.val());

//User creation
function makeAny(){
  var ran1 = Math.floor((Math.random() * 10000) + 1);
  var ran2 = Math.floor((Math.random() * 1000) + 1);
  current_user = "Anonymous_" + ran1 + "!" + ran2;
  return current_user
}

function checkUserName(){
  if(firebase.auth().currentUser.displayName == null){
    var getUserName = prompt("No username. Please enter a username or leave blank for generated one");
    if(firebase.auth().currentUser.displayName == null){
      if (getUserName != '' || getUserName != null) {
        firebase.auth().currentUser.updateProfile({displayName: getUserName});
      }else{
        var tempUser = makeAny();
        firebase.auth().currentUser.updateProfile({displayName: tempUser});
      }
    }
  }
}

//Login
var fieldEmail = document.getElementById('email-field');
var fieldPassword = document.getElementById('password-field');
var buttonLogIn = document.getElementById('logIn-button');
var buttonLogOut = document.getElementById('logOut-button');
var buttonSignUp = document.getElementById('signUp-button');
var loginForm = document.getElementById('login-form');
var loggedUser = document.getElementById('logged-user');

//login
buttonLogIn.addEventListener('click', e => {
  const email = fieldEmail.value;
  const password = fieldPassword.value;
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(email, password);
  loginForm.reset();
});

//signup
buttonSignUp.addEventListener('click', e => {
  const email = fieldEmail.value;
  const password = fieldPassword.value;
  const auth = firebase.auth();

  auth.createUserWithEmailAndPassword(email, password);
  loginForm.reset();
});

//logout
buttonLogOut.addEventListener('click', e => {
  firebase.auth().signOut();
  console.log("hoorah!");
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser != null){
    checkUserName();
    console.log(firebaseUser);
    var loggedIn = 'Logged in as <span style="color:red;">' + firebase.auth().currentUser.email + '</span>';
    loggedUser.innerHTML = loggedIn;
  }
  else{
    console.log("nothing");
  }

  showLogin();
});

//shows and hides login elements
function showLogin(){
  if(firebase.auth().currentUser){
    fieldEmail.style.display = "none";
    fieldPassword.style.display = "none";
    buttonLogIn.style.display = "none";
    buttonSignUp.style.display = "none";
    //outlier
    loggedUser.style.display = "inline";
    buttonLogOut.style.display = "inline";
  }
  else{
    loggedUser.style.display = "none";
    buttonLogOut.style.display = "none";
    //outlier
    fieldEmail.style.display = "inline";
    fieldPassword.style.display = "inline";
    buttonLogIn.style.display = "inline";
    buttonSignUp.style.display = "inline";
  }
}

//grabs array from firebase
var getElementArray = document.getElementsByClassName('list-msg')[0];
var messagesRef = firebase.database().ref('rooms/Room1/messages');

messagesRef.on('value', gotData);

function gotData(x){
  var material = '';
  //console.log(x.val());
  //console.log(keys);
  var values = x.val();
  var keys = Object.keys(values);
  for(var i = 0; i < keys.length; i++){
    var num = keys[i];
    material += '<li>' + values[num].user + ': ' + values[num].content + '</li>';
  }
  getElementArray.innerHTML = material;
}

//submit button
var form = document.getElementById('message-form');
var send = document.getElementById('send-button');
send.addEventListener('click', function(){
  send_message();
});

//add to message list array
function send_message(){
  if(firebase.auth().currentUser != null){
    var field_value = document.getElementById('message-field').value;
    messagesRef.push({
      user: firebase.auth().currentUser.displayName,
      content: field_value
    });
  }
  else{
    alert("Must be logged in to post a message in chat! (leave blank for random generated name)");
  }
  form.reset();
};

/*
function send_message(){
  var field_value = document.getElementById('message-field').value;
  messagesRef.push({
    user: firebase.auth().currentUser.displayName,
    content: field_value
  });
  form.reset();
};
*/


/* old one
buttonSignUp.addEventListener('click', e => {
  const email = fieldEmail.value;
  const password = fieldPassword.value;
  const auth = firebase.auth();

  const promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));
});
*/

/*

// sync down from server
var getElementArray = document.getElementsByClassName('list-msg')[0];
messagesRef.child('messages').on('value', function(snap){
  getElementArray.innerHTML = snap.val();
  console.log(messagesRef);
});

--------------------------------
//grabs array from firebase
var messagesRef = firebase.database().ref().child('rooms').child('Room1').child('messages').child('post1').child('content');

// sync down from server
var getElementArray = document.getElementsByClassName('testy')[0];
messagesRef.on('value', function(snap){
  getElementArray.innerHTML = snap.val();
  console.log(messagesRef);
});
*/
