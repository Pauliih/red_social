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