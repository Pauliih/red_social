$(document).ready(function() {
  
  /*
  if($('#msg').val() === "" ){
    alert("Tienes que escribir un mensaje!")
  }else{
    */
    //Insetar el mensaje en el chat
    $('#send').click(function() {
      var message = $('#msg').val(); // Rescato el mensaje del input
      
      $('#msg').val(""); // vacío el input del mensaje
      
      var contenedorChat = $('#contChat'); //El contenedor del chat lo pongo en una var.
      // Generar la hora
      var hour = new Date();
      var hours = hour.getHours();
      var minutes = hour.getMinutes();
      // Le paso los mensajes rescatados
      contenedorChat.append('<div class="text-right message">' + '<p>' + message + '</p><br><span>' + hours + ':</span><span>' + minutes + '</span></div>');
    });
  //}
  
});

(function () {
  var config = {
    apiKey: "AIzaSyAd_v2ft8K0cwDm9oeJBJsSHMjbL3NfQHU",
    authDomain: "redsocial-d7c8d.firebaseapp.com",
    databaseURL: "https://redsocial-d7c8d.firebaseio.com",
    projectId: "redsocial-d7c8d",
    storageBucket: "redsocial-d7c8d.appspot.com",
    messagingSenderId: "955732054670"
  };
  firebase.initializeApp(config);

  //Obteniendo elementos del DOM
  /* var email = document.getElementById('email');
  var pass = document.getElementById('password');
  var login = document.getElementById('logIn');
  var register = document.getElementById('register');
  var logout = document.getElementById('logOut'); */

  $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
  });
  
  //Eventos para el registro
  login.addEventListener('click', function() {
    var emailValue = email.value;
    var passValue = pass.value;
    firebase.auth().signInWithEmailAndPassword(emailValue, passValue).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
     });
  });
  register.addEventListener('click', function() {
    var emailValue = email.value;
    var passValue = pass.value;
    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(emailValue, passValue)
  .catch(function(error) {console.error (error.message)});
  }); 

  
} ());

