$(document).ready(function() {
  
  var containerPosts = $('#contPost'); //El contenedor del chat lo pongo en una var.

  $('#filter-newsfeed').on('change', function() {
      var selection = $('#filter-newsfeed').val();
      if( selection === "1") {
      containerPosts.html('<p>Esto es un append lo mas popular</p> <img class="img-responsive" src="https://i.pinimg.com/originals/9c/8f/51/9c8f51dac7738e0d5981d5b3fce5a4a6.gif"/>');
      }
      if( selection === "2") {
      containerPosts.html('<p>Esto es un append lo más comentado</p> <img class="img-responsive" src="https://i.pinimg.com/originals/9c/8f/51/9c8f51dac7738e0d5981d5b3fce5a4a6.gif"/>');
      }
    })
  //Insetar el mensaje en el chat
  $('#send').click(function() {
    var message = $('#post').val(); // Rescato el mensaje del input
    
    $('#post').val(""); // vacío el input del mensaje
    
    
    // Generar la hora con moment
    var dateNow = moment().format('MMMM Do YYYY, h:mm a');

    // Le paso los mensajes rescatados y prepend para añadir el elemento antes que el otro
    containerPosts.prepend('<div class="row message">' + '<p>' + message + '</p><br><span>' + dateNow + '</span></div>');
  });


  // Slide
    $('.carousel').carousel({
      interval: 2000
    });

    //Subir imagen
    $('.post').find('.wall-friend').click(function(){
      $('#wall-location').hide();
      $('#wall-photo').hide();
      $('#wall-friend').show();
    });
    
    $('.post').find('.wall-photo').click(function(){
      $('#wall-friend').hide();
      $('#wall-location').hide();
      $('#wall-photo').show();
    });

    $('.post').find('.wall-location').click(function(){
      $('#wall-friend').hide();
      $('#wall-photo').hide();
      $('#wall-location').show();
    });
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

