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
    var promise = auth.signInWithEmailAndPassword(email, pass)
    .then(function(user) {
      console.log(user);
     })
    .catch(e => console.log(e.message));      
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
    uid = "";
  });

  firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      uid = firebaseUser.uid;
      start();
    } else {
      console.log('no logueado');
      stop();
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

  //-----------------INICIO DE SESION--------------//
  function start(){
    $('#bar').removeClass('hide');
    $('#main').removeClass('hide');
    $('#formLogin').addClass('hide');
    $('#slide').removeClass('hide');
    $('#post').removeClass('hide');
    $('#newfeed').removeClass('hide');
  }
  function stop(){
    $('#bar').addClass('hide');
    $('#main').addClass('hide');
    $('#cyclistFriends').addClass('hide');
    $('#cyclist').addClass('hide');
    $('#calendarSection').addClass('hide');
    $('#slide').addClass('hide');
    $('#post').addClass('hide');
    $('#newfeed').addClass('hide');
    $('#myProfile').addClass('hide');
    $('#newfeed').addClass('hide');
    $('#formLogin').removeClass('hide');    
  }

  //-----------------AGENDA EVENTOS--------------------//
  function editEvent(event) {
    $('#event-modal input[name="event-index"]').val(event ? event.id : '');
    $('#event-modal input[name="event-name"]').val(event ? event.name : '');
    $('#event-modal input[name="event-location"]').val(event ? event.location : '');
    $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
    $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
    $('#event-modal').modal();
}

function deleteEvent(event) {
    var dataSource = $('.calendar').data('calendar').getDataSource();

    for(var i in dataSource) {
        if(dataSource[i].id == event.id) {
            dataSource.splice(i, 1);
            break;
        }
    }
    
    $('.calendar').data('calendar').setDataSource(dataSource);
}

function saveEvent() {
    var event = {
        id: $('#event-modal input[name="event-index"]').val(),
        name: $('#event-modal input[name="event-name"]').val(),
        location: $('#event-modal input[name="event-location"]').val(),
        startDate: $('#event-modal input[name="event-start-date"]').datepicker('getDate'),
        endDate: $('#event-modal input[name="event-end-date"]').datepicker('getDate')
    }
    
    var dataSource = $('.calendar').data('calendar').getDataSource();

    if(event.id) {
        for(var i in dataSource) {
            if(dataSource[i].id == event.id) {
                dataSource[i].name = event.name;
                dataSource[i].location = event.location;
                dataSource[i].startDate = event.startDate;
                dataSource[i].endDate = event.endDate;
            }
        }
    }
    else
    {
        var newId = 0;
        for(var i in dataSource) {
            if(dataSource[i].id > newId) {
                newId = dataSource[i].id;
            }
        }
        
        newId++;
        event.id = newId;
    
        dataSource.push(event);
    }
    
    $('.calendar').data('calendar').setDataSource(dataSource);
    $('#event-modal').modal('hide');
}

$(function() {
    var currentYear = new Date().getFullYear();

    $('.calendar').calendar({
        enableContextMenu: true,
        enableRangeSelection: true,
        contextMenuItems:[
            {
              text: 'Update',
              click: editEvent
            },
            {
              text: 'Delete',
              click: deleteEvent
            }
        ],
        selectRange: function(e) {
          editEvent({ startDate: e.startDate, endDate: e.endDate });
        },
        mouseOnDay: function(e) {
            if(e.events.length > 0) {
                var content = '';
                
                for(var i in e.events) {
                    content += '<div class="event-tooltip-content">'
                                    + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
                                    + '<div class="event-location">' + e.events[i].location + '</div>'
                                + '</div>';
                }
            
                $(e.element).popover({
                    trigger: 'manual',
                    container: 'body',
                    html:true,
                    content: content
                });
                
                $(e.element).popover('show');
            }
        },
        mouseOutDay: function(e) {
            if(e.events.length > 0) {
                $(e.element).popover('hide');
            }
        },
        dayContextMenu: function(e) {
            $(e.element).popover('hide');
        },
        dataSource: [
          {
            id: 0,
            name: 'Google I/O',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 4, 28),
            endDate: new Date(currentYear, 4, 29)
          },
          {
            id: 1,
            name: 'Microsoft Convergence',
            location: 'New Orleans, LA',
            startDate: new Date(currentYear, 2, 16),
            endDate: new Date(currentYear, 2, 19)
          },
          {
            id: 2,
            name: 'Microsoft Build Developer Conference',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 3, 29),
            endDate: new Date(currentYear, 4, 1)
          },
          {
            id: 3,
            name: 'Apple Special Event',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 8, 1),
            endDate: new Date(currentYear, 8, 1)
          },
          {
            id: 4,
            name: 'Apple Keynote',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 8, 9),
            endDate: new Date(currentYear, 8, 9)
          },
          {
            id: 5,
            name: 'Chrome Developer Summit',
            location: 'Mountain View, CA',
            startDate: new Date(currentYear, 10, 17),
            endDate: new Date(currentYear, 10, 18)
          },
          {
            id: 6,
            name: 'F8 2015',
            location: 'San Francisco, CA',
            startDate: new Date(currentYear, 2, 25),
            endDate: new Date(currentYear, 2, 26)
          },
          {
            id: 7,
            name: 'Yahoo Mobile Developer Conference',
            location: 'New York',
            startDate: new Date(currentYear, 7, 25),
            endDate: new Date(currentYear, 7, 26)
          },
          {
            id: 8,
            name: 'Android Developer Conference',
            location: 'Santa Clara, CA',
            startDate: new Date(currentYear, 11, 1),
            endDate: new Date(currentYear, 11, 4)
          },
          {
            id: 9,
            name: 'LA Tech Summit',
            location: 'Los Angeles, CA',
            startDate: new Date(currentYear, 10, 17),
            endDate: new Date(currentYear, 10, 17)
          }
        ]
    });
    
    $('#save-event').click(function() {
        saveEvent();
    });
});
});
