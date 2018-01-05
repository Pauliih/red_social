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

//-------INICIALIZANDO Firebase------------------//
    var config = {
      apiKey: "AIzaSyAd_v2ft8K0cwDm9oeJBJsSHMjbL3NfQHU",
      authDomain: "redsocial-d7c8d.firebaseapp.com",
      databaseURL: "https://redsocial-d7c8d.firebaseio.com",
      projectId: "redsocial-d7c8d",
      storageBucket: "redsocial-d7c8d.appspot.com",
      messagingSenderId: "955732054670"
    };
    firebase.initializeApp(config);

    var uid = "";
//----------------ANIMACIÓN LOGIN/REGISTER--------------------//
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

  //-----------------AUTENTICACIÓN DE EMAIL---------------------//
  $('#logIn').click(function() {
    var email = $('#emailLogin').val();
    var pass = $('#passwordLogin').val();
    var auth = firebase.auth();
    $('#emailLogin').val("");
    $('#passwordLogin').val("");
      // Sign in
    var promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));      
  });
  $('#register').click(function() {
    var email = $('#emailRegister').val();
    var pass = $('#passwordRegister').val();
    var auth = firebase.auth();
    $('#emailRegister').val("");
    $('#passwordRegister').val("");
    // Sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass)
    .then(function(user) {
        console.log(user);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('Contraseña muy débil');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
    /* var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message)); */
  }); 
  
  $('#logOut').click(function() {
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      uid = firebaseUser.uid;
     // $('#logOut').classList.remove('hide');
      //$('#formLogin').hide();
      //$('#bar').classList.remove('hidden');
      //$('#main').classList.remove('hidden')
    } else {
      console.log('no logueado');
      //$('#logOut').classList.add('hide');
    }    
  });
  //----------------------- DATEPICKER -----------------------------------//
  var date_input=$('input[name="dateofBirth"]'); //our date input has the name "date"
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);

  //Nueva Foto en seccion de ciclistas
    function newCyclistProfile() {
      $('#ciclyst container').append('<div class="col-md-3 well">'+
      '<center><a href="#aboutModal" data-toggle="modal" data-target="#myModal">'+
      '<img src="" name="aboutme" width="140" height="140" class="img-circle"></a>'+
      '<h3>'+nameCyclist+'</h3><em>click my face for more</em></center></div>')
    }

  //-------------EVENTOS BARRA LATERAL -------------------//
  $('#init').click(function(){
    $('#slide').removeClass('hide');
    $('#post').removeClass('hide');
    $('#newfeed').removeClass('hide');
    $('#calendarSection').addClass('hide');
    $('#cyclist').addClass('hide');
    $('#myProfile').addClass('hide');
    $('#cyclistFriends').addClass('hide');
  });
  $('#cyclists').click(function(){
    $('#cyclist').removeClass('hide');
    $('#calendarSection').addClass('hide');
    $('#slide').addClass('hide');
    $('#post').addClass('hide');
    $('#newfeed').addClass('hide');
    $('#myProfile').addClass('hide');
    $('#cyclistFriends').addClass('hide');
  });
  $('#eventCalendar').click(function(){
    $('#calendarSection').removeClass('hide');
    $('#cyclist').addClass('hide');
    $('#slide').addClass('hide');
    $('#post').addClass('hide');
    $('#newfeed').addClass('hide');
    $('#myProfile').addClass('hide');
    $('#cyclistFriends').addClass('hide');
  });

//-------------EVENTOS BARRA SUPERIOR -------------------//
  $('#profile').click(function(){
    $('#myProfile').removeClass('hide');
    $('#slide').addClass('hide');
    $('#post').addClass('hide');
    $('#newfeed').addClass('hide');
    $('#calendarSection').addClass('hide');
    $('#cyclist').addClass('hide');
    $('#cyclistFriends').addClass('hide');
  });
  $('#friends').click(function(){    
    $('#cyclistFriends').removeClass('hide');
    $('#cyclist').addClass('hide');
    $('#calendarSection').addClass('hide');
    $('#slide').addClass('hide');
    $('#post').addClass('hide');
    $('#newfeed').addClass('hide');
    $('#myProfile').addClass('hide');
  });

});
