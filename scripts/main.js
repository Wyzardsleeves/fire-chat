//initial test
var getTest = document.getElementsByClassName('test')[0];
var databaseRef = firebase.database().ref().child('text');

databaseRef.on('value', snap => getTest.innerText = snap.val());

//Array of text
