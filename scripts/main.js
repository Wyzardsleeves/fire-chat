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
var current_user = 'dog';

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
  var field_value = document.getElementById('message-field').value;
  messagesRef.push({
    user: current_user,
    content: field_value
  });
  form.reset();
};


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
