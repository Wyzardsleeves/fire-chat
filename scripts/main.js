/*
//Authorization
const auth = firebase.auth();
auth.signInWithEmailAndPassword(email, pass); //signs in exiting user
auth.createUserWithEmailAndPassword(email, pass); //creates a user
auth.onAuthStateChanged(firebaseUser => { });
*/

//initial test
var getTest = document.getElementsByClassName('test')[0];
var databaseRef = firebase.database().ref().child('text');

databaseRef.on('value', snap => getTest.innerText = snap.val());

//get the logged in user
var current_user = '';

//grabs array from firebase
var messagesRef = firebase.database().ref().child('rooms').child('Room1').child('messages');

//submit button
var form = document.getElementById('message-form');

var send = document.getElementById('send-button');
send.addEventListener('click', function(){
  send_message();
});

//add to message list array
function send_message(){
  var field_value = document.getElementById('message-field').value;
  messagesRef.push({
    user: "dog",
    content: field_value
  });
  form.reset();
};
