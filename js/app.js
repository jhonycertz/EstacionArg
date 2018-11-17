$(document).on('scroll', function(e) {
  var isScrolled = $(document).scrollTop() > 1;

  $('.navbar').toggleClass('scrolled', isScrolled)
})

$('#navbarMenu').on('show.bs.collapse', function() {
  $('.navbar').addClass('expanded')
  $('.navbar-toggler').find('.mdi').addClass('mdi-close').removeClass('mdi-menu')
  $('.navbar-collapse-overlay').addClass('fade-in')
});

$('#navbarMenu').on('hide.bs.collapse', function() {
  $('.navbar').removeClass('expanded')
  $('.navbar-toggler').find('.mdi').addClass('mdi-menu').removeClass('mdi-close')
  $('.navbar-collapse-overlay').removeClass('fade-in')
});

$('.navbar-collapse-overlay').on('click', function() {
  $('#navbarMenu').collapse('hide')
})

$('[data-scroll-to]').on('click', function() {
  var target = $(this).data('scroll-to')

  $('#navbarMenu').collapse('hide')

  $('html, body').animate({
    scrollTop: $('[data-scroll-target=' + target + ']').offset().top - $('.navbar-brand').height()
  }, 500)
});

$("#send").click(send);

function send() {
  if($("form")[0].checkValidity())
  {
    var request = $.ajax({
      url: "https://ws.estaciona.com/?accion=sendMensaje",
      method: "POST",
      data: {
        nombre: $("#name").val().replace(/[^\w\s]/gi, ''),
        email: $("#email").val(),
        telefono: $("#phone").val().replace(/[^\w\s]/gi, ''),
        asunto: $("#asunto").val(),
        mensaje: $("#body").val(),
      },
      dataType: "json"
    });
  
    request.done(function(msg) {
      if (!msg.error) {
        $(".form").fadeOut();
        $(".more").fadeOut(function() {
          $("#result").html("¡Gracias por enviarnos tu consulta!");
          $("#response").html("<strong>Uno de nuestros representantes te contactará dentro de las próximas 48hs.</strong>");
          $(".result").fadeIn();
        });
  
      }
      console.log(msg);
    });
  
    request.fail(function(jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    });
  }else{
    alert("Por favor, completá todos los campos y te contactaremos.");
  }
}

function Submit() {
  event.preventDefault();
}
