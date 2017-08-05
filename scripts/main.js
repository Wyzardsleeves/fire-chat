//Authorization
const auth = firebase.auth();
auth.signInWithEmailAndPassword(email, pass); //signs in exiting user
auth.createUserWithEmailAndPassword(email, pass); //creates a user
auth.onAuthStateChanged(firebaseUser => { });

//initial test
var getTest = document.getElementsByClassName('test')[0];
var databaseRef = firebase.database().ref().child('text');

databaseRef.on('value', snap => getTest.innerText = snap.val());

//Array of text
var getMessages = document.getElementsByClassName('roomContents')[0];
var roomsRef = firebase.database().ref().child('rooms');

databaseRef.on('value', snap => getMessages.innerText = snap.val());

//get the logged in user
var current_user = '';

//grabs array from firebase
var messages = firebase.database().ref('messages');

//submit button
var field_content = document.getElementsById('message_field').value;
var send = documment.getElementsById('send_button');

send.addEventListener('click', function(){
  send_message();
});

//add to message list array
function send_message(user, content){
  message_list.$add({
    user: current_user,
    content: field_content
  });
  field_content.reset();
};
