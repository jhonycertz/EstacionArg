Number.prototype.formatMoney = function(c, d, t) {
  var n = this,
      c = isNaN( c = Math.abs(c)) ? 0 : c,
      d = d == undefined ? "," : d,
      t = t == undefined ? "." : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt( n = Math.abs(Number(n) || 0).toFixed(c))),
      j = ( j = i.length) > 3 ? j % 3 : 0,
      dec = Math.abs(n - i).toFixed(c).slice(2);
  return s + ( j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c && parseInt(dec) > 0 ? d + dec : "");
};
function globalNavDropdowns(e) {
  var t = this;
  this.container = document.querySelector(e), this.root = this.container.querySelector(".navRoot"), this.primaryNav = this.root.querySelector(".navSection.primary"), this.primaryNavItem = this.root.querySelector(".navSection.primary .rootLink:last-child"), this.secondaryNavItem = this.root.querySelector(".navSection.secondary .rootLink:first-child"), this.checkCollision(), window.addEventListener("load", this.checkCollision.bind(this)), window.addEventListener("resize", this.checkCollision.bind(this)), this.container.classList.add("noDropdownTransition"), this.dropdownBackground = this.container.querySelector(".dropdownBackground"), this.dropdownBackgroundAlt = this.container.querySelector(".alternateBackground"), this.dropdownContainer = this.container.querySelector(".dropdownContainer"), this.dropdownArrow = this.container.querySelector(".dropdownArrow"), this.dropdownRoots = Strut.queryArray(".hasDropdown", this.root), this.dropdownSections = Strut.queryArray(".dropdownSection", this.container).map(function(e) {
    return {
      el: e,
      name: e.getAttribute("data-dropdown"),
      content: e.querySelector(".dropdownContent")
    }
  });
  var n = window.PointerEvent ? {
    end: "pointerup",
    enter: "pointerenter",
    leave: "pointerleave"
  } : {
    end: "touchend",
    enter: "mouseenter",
    leave: "mouseleave"
  };
  this.dropdownRoots.forEach(function(e, r) {
    e.addEventListener(n.end, function(n) {
      n.preventDefault(), n.stopPropagation(), t.toggleDropdown(e)
    }), e.addEventListener(n.enter, function(n) {
      if (n.pointerType == "touch")
        return;
      t.stopCloseTimeout(), t.openDropdown(e)
    }), e.addEventListener(n.leave, function(e) {
      if (e.pointerType == "touch")
        return;
      t.startCloseTimeout()
    })
  }), this.dropdownContainer.addEventListener(n.end, function(e) {
    e.stopPropagation()
  }), this.dropdownContainer.addEventListener(n.enter, function(e) {
    if (e.pointerType == "touch")
      return;
    t.stopCloseTimeout()
  }), this.dropdownContainer.addEventListener(n.leave, function(e) {
    if (e.pointerType == "touch")
      return;
    t.startCloseTimeout()
  }), document.body.addEventListener(n.end, function(e) {
    Strut.touch.isDragging || t.closeDropdown()
  })
}


(function() {
  window.$ && window.$.ajaxPrefilter && $(function() {
    return $.ajaxPrefilter(function(e, t, n) {
      var r,
          i;
      return i = $("meta[name=csrf-token]"),
      r = i ? i.attr("content") : "", n.setRequestHeader(" ", r)
    })
  })
}).call(this), "use strict";
var Strut = {
  random: function(e, t) {
    return Math.random() * (t - e) + e
  },
  arrayRandom: function(e) {
    return e[Math.floor(Math.random() * e.length)]
  },
  interpolate: function(e, t, n) {
    return e * (1 - n) + t * n
  },
  rangePosition: function(e, t, n) {
    return (n - e) / (t - e)
  },
  clamp: function(e, t, n) {
    return Math.max(Math.min(e, n), t)
  },
  queryArray: function(e, t) {
    return t || ( t = document.body), Array.prototype.slice.call(t.querySelectorAll(e))
  },
  ready: function(e) {
    document.readyState !== "loading" ? e() : document.addEventListener("DOMContentLoaded", e)
  }
};
Strut.isRetina = window.devicePixelRatio > 1.3, Strut.mobileViewportWidth = 670, Strut.isMobileViewport = window.innerWidth < Strut.mobileViewportWidth, window.addEventListener("resize", function() {
  Strut.isMobileViewport = window.innerWidth < Strut.mobileViewportWidth
}), Strut.touch = {
  isSupported: "ontouchstart" in window || navigator.maxTouchPoints,
  isDragging: !1
}, document.addEventListener("DOMContentLoaded", function() {
  document.body.addEventListener("touchmove", function() {
    Strut.touch.isDragging = !0
  }), document.body.addEventListener("touchstart", function() {
    Strut.touch.isDragging = !1
  })
}), Strut.load = {
  images: function(e, t) {
    typeof e == "string" && ( e = [e]);
    var n = -e.length;
    e.forEach(function(e) {
      var r = new Image;
      r.src = e, r.onload = function() {
        n++, n === 0 && t && t()
      }
    })
  },
  css: function(e, t) {
    var n = document.createElement("link"),
        r = window.readConfig("strut_files") || {},
        i = r[e];
    if (!i)
      throw new Error('CSS file "' + e + '" not found in strut_files config');
    n.href = i, n.rel = "stylesheet", document.head.appendChild(n), t && (n.onload = t)
  },
  js: function(e, t) {
    var n = document.createElement("script"),
        r = window.readConfig("strut_files") || {},
        i = r[e];
    if (!i)
      throw new Error('Javascript file "' + e + '" not found in strut_files config');
    n.src = i, n.async = !1, document.head.appendChild(n), t && (n.onload = t)
  }
}, Strut.supports = {
  es6: function() {
    try {
      return new Function("(a = 0) => a"), !0
    } catch (e) {
      return !1
    }
  }(),
  pointerEvents: function() {
    var e = document.createElement("a").style;
    return e.cssText = "pointer-events:auto", e.pointerEvents === "auto"
  }(),
  positionSticky: Boolean(window.CSS && CSS.supports("(position: -webkit-sticky) or (position: sticky)")),
  masks: function() {
    return !/MSIE|Trident|Edge/i.test(navigator.userAgent)
  }()
}, globalNavDropdowns.prototype.checkCollision = function() {
  var e = this;
  if (Strut.isMobileViewport)
    return;
  if (e.compact == 1) {
    var t = document.body.clientWidth,
        n = e.primaryNav.getBoundingClientRect();
    n.left + n.width / 2 > t / 2 && (e.container.classList.remove("compact"), e.compact = !1)
  } else {
    var r = e.primaryNavItem.getBoundingClientRect(),
        i = e.secondaryNavItem.getBoundingClientRect();
    r.right > i.left && (e.container.classList.add("compact"), e.compact = !0)
  }
}, globalNavDropdowns.prototype.openDropdown = function(e) {
  var t = this;
  if (this.activeDropdown === e)
    return;
  this.container.classList.add("overlayActive"), this.container.classList.add("dropdownActive"), this.activeDropdown =
  e, this.dropdownRoots.forEach(function(e, t) {
    e.classList.remove("active")
  }), e.classList.add("active");
  var n = e.getAttribute("data-dropdown"),
      r = "left",
      i,
      s,
      o;
  this.dropdownSections.forEach(function(e) {
    e.el.classList.remove("active"), e.el.classList.remove("left"), e.el.classList.remove("right"), e.name == n ? (e.el.classList.add("active"),
    r = "right",
    i = e.content.offsetWidth,
    s = e.content.offsetHeight, e.content.getAttribute("data-fixed") ? e.content.setAttribute("data-fixed", !0) : (e.content.style.width = i + "px", e.content.style.height = s + "px"),
    o = e.content) : e.el.classList.add(r)
  });
  var u = 380,
      a = 400,
      f = i / u,
      l = s / a,
      c = e.getBoundingClientRect(),
      h = c.left + c.width / 2 - i / 2;
  h = Math.round(Math.max(h, 10)), clearTimeout(this.disableTransitionTimeout), this.enableTransitionTimeout = setTimeout(function() {
    t.container.classList.remove("noDropdownTransition")
  }, 50), this.dropdownBackground.style.transform = "translateX(" + h + "px) scaleX(" + f + ") scaleY(" + l + ")", this.dropdownContainer.style.transform = "translateX(" + h + "px)", this.dropdownContainer.style.width = i + "px", this.dropdownContainer.style.height = s + "px";
  var p = Math.round(c.left + c.width / 2);
  this.dropdownArrow.style.transform = "translateX(" + p + "px) rotate(45deg)";
  var d = o.children[0].offsetHeight / l;
  this.dropdownBackgroundAlt.style.transform = "translateY(" + d + "px)", window.siteAnalytics && window.siteAnalytics.trackGlobalNavDropdownOpen && window.siteAnalytics.trackGlobalNavDropdownOpen(n)
}, globalNavDropdowns.prototype.closeDropdown = function() {
  var e = this;
  if (!this.activeDropdown)
    return;
  this.dropdownRoots.forEach(function(e, t) {
    e.classList.remove("active")
  }), clearTimeout(this.enableTransitionTimeout), this.disableTransitionTimeout = setTimeout(function() {
    e.container.classList.add("noDropdownTransition")
  }, 50), this.container.classList.remove("overlayActive"), this.container.classList.remove("dropdownActive"), this.activeDropdown =
  undefined
}, globalNavDropdowns.prototype.toggleDropdown = function(e) {
  this.activeDropdown === e ? this.closeDropdown() : this.openDropdown(e)
}, globalNavDropdowns.prototype.startCloseTimeout = function() {
  var e = this;
  e.closeDropdownTimeout = setTimeout(function() {
    e.closeDropdown()
  }, 50)
}, globalNavDropdowns.prototype.stopCloseTimeout = function() {
  var e = this;
  clearTimeout(e.closeDropdownTimeout)
}, Strut.supports.pointerEvents || Strut.load.css("v3/shared/navigation_ie10.css"), Strut.ready(function() {
  new globalNavDropdowns(".globalNav")
});
function scroll_to_class(element_class, removed_height) {
  var scroll_to = $(element_class).offset().top - removed_height;
  if ($(window).scrollTop() != scroll_to) {
    $('.form-wizard').stop().animate({
      scrollTop: scroll_to
    }, 0);
  }
}
function bar_progress(progress_line_object, direction) {
  var number_of_steps = progress_line_object.data('number-of-steps');
  var now_value = progress_line_object.data('now-value');
  var new_value = 0;
  if (direction == 'right') {
    new_value = now_value + (100 / number_of_steps);
  } else if (direction == 'left') {
    new_value = now_value - (100 / number_of_steps);
  }
  progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}
$(window).scroll(function() {
  var posicionActual = $(document).scrollTop();
  $.each($('.nav_transparent'),function(){
    if ($(this).position().top <= posicionActual){
      $("nav.menu").removeClass("nav_white");
      $("nav.menu").removeClass("nav_blue");
      $("nav.menu").addClass("nav_transparent");
      $(".demos").addClass("demo");
      $(".demos").removeClass("demo1");
      $(".cls").removeClass("cls2");
      $(".cls").addClass("cls1");
      $(".cl").removeClass("cls1");
      $(".cl").addClass("cls2");
      $(".hamb-bottom").css({"background-color": "#fff"});
      $(".hamb-middle").css({"background-color": "#fff"});
      $(".hamb-top").css({"background-color": "#fff"});
    }
  });
  $.each($('.nav_blue'),function(){
    if ($(this).position().top <= posicionActual){
      $("nav.menu").removeClass("nav_transparent");
      $("nav.menu").removeClass("nav_white");
      $("nav.menu").addClass("nav_blue");
      $(".cls").removeClass("cls2");
      $(".cls").addClass("cls1");
      $(".cl").removeClass("cls1");
      $(".cl").addClass("cls2");
      $(".hamb-bottom").css({"background-color": "#4285f4"});
      $(".hamb-middle").css({"background-color": "#4285f4"});
      $(".hamb-top").css({"background-color": "#4285f4"});
    }
  });
  $.each($('.nav_white'),function(){
    if ($(this).position().top <= posicionActual){
      $("nav.menu").removeClass("nav_blue");
      $("nav.menu").removeClass("nav_transparent");
      $("nav.menu").addClass("nav_white");
      $(".demos").removeClass("demo");
      $(".demos").addClass("demo1");
      $(".cls").removeClass("cls1");
      $(".cls").addClass("cls2");
      $(".cl").removeClass("cls2");
      $(".cl").addClass("cls1");
      $(".hamb-bottom").css({"background-color": "#fff"});
      $(".hamb-middle").css({"background-color": "#fff"});
      $(".hamb-top").css({"background-color": "#fff"});
    }
  });
});
  var app = {
  realtime: [],
  contenido: $('#contenido'),
  privadosView: function() {
    $('#pictureTarifa, #tarifaHorarios').collapse('hide'); 
    $('input[name="radios"]').change( function() {
    if ($('#pictureTar').is(":checked")){
      $('#pictureTarifa').collapse('show');
      $('#mensaje').collapse('hide');
    } else {
      $('#pictureTarifa').collapse('hide');
    } 
    if ($('#tarifaHor').is(":checked")){
      $('#tarifaHorarios').collapse('show');
      $('#mensaje').collapse('hide');
    } else {
      $('#tarifaHorarios').collapse('hide');
    } 
    if ($('#radio3').is(":checked")){
      $('#mensaje').collapse('show');
      $('#pictureTarifa').collapse('hide');
      $('#tarifaHorarios').collapse('hide');
    }
  });
  var $cloned = $(".picsvg").clone();
  $cloned.appendTo(".pic-svg");
  $(".calendario .picsvg").addClass('calendario');
    //Form
    $('.form-wizard fieldset:first').fadeIn('slow');
    $('.form-wizard .required').on('focus', function() {
      $(this).removeClass('input-error');
    });
    // next step
    $('.form-wizard .btn-next').on('click', function() {
      var parent_fieldset = $(this).parents('fieldset');
      var next_step = true;
      // navigation steps / progress steps
      var current_active_step = $(this).parents('.form-wizard').find('.form-wizard-step.active');
      var progress_line = $(this).parents('.form-wizard').find('.form-wizard-progress-line');
      // fields validation
      parent_fieldset.find('.required').each(function() {
        if ($(this).val() == "") {
          $(this).addClass('input-error');
          next_step = false;
        } else {
          $(this).removeClass('input-error');
        }
      });
      // fields validation
      if (next_step) {
        parent_fieldset.fadeOut(400, function() {
          // change icons
          current_active_step.removeClass('active').addClass('activated').next().addClass('active');
          // progress bar
          bar_progress(progress_line, 'right');
          // show next step
          $(this).next().fadeIn();
          // scroll window to beginning of the form
          scroll_to_class($('.form-wizard'), 20);
        });
      }
    });
    // previous step
    $('.form-wizard .btn-previous').on('click', function() {
      // navigation steps / progress steps
      var current_active_step = $(this).parents('.form-wizard').find('.form-wizard-step.active');
      var progress_line = $(this).parents('.form-wizard').find('.form-wizard-progress-line');
      $(this).parents('fieldset').fadeOut(400, function() {
        // change icons
        current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
        // progress bar
        bar_progress(progress_line, 'left');
        // show previous step
        $(this).prev().fadeIn();
        // scroll window to beginning of the form
        scroll_to_class($('.form-wizard'), 20);
      });
    });
    // submit
    $('.form-wizard').on('submit', function(e) {

      // fields validation
      $(this).find('.required').each(function() {
        if ($(this).val() == "") {
          e.preventDefault();
          $(this).addClass('input-error');
        } else {
          $(this).removeClass('input-error');
        }
      });
      // fields validation
    });
    $(".pesos").on("blur", function() {
      var monto = parseFloat($(this).val().replace(',', "."));
      $(this).val('$' + monto.formatMoney(2, ","));
    }).on('input', function() {
      var monto = parseFloat($(this).val().replace(',', "."));
      if (isNaN(monto)) {
        monto = "";
      }
      $(this).attr("monto", monto);
    }).on('focus', function() {
      var monto = "";
      if (!!$(this).attr("monto")) {
        monto = $(this).attr("monto").replace(".", ",");
      }
      $(this).val(monto).select();
    });
    $('.time').timepicker({
      defaultTime: '00:00',
      useCurrent: false,
      dropdown: false,
      useCurrent: false,
      format: 'HH:mm',
      minuteStep: 15,
      Step: 15,
      showSeconds: false,
      showMeridian: false,
      disableFocus: true,
      icons: {
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down'
      }
    }).on('focus', function() {
      $(this).timepicker('showWidget');
    });
    $('.time').val('');
    $('.calendario').click(function() {
      $('#horarios').toggleClass("show");
      if ($('.calendario').is(':checked')) {
        $("#247 input[type=checkbox]").prop('checked', true);
      } else {
        $("#247 input[type=checkbox]").prop('checked', false);
      }
    });
    $('#wash').on('click', function() {
      $('.iconos-wash').toggleClass("active");
      $('.serv-wash').toggleClass("active");
    });
    $('#gomeria').on('click', function() {
      $('.iconos-gomeria').toggleClass("active");
      $('.serv-gomeria').toggleClass("active");
    });
    $('#techado').on('click', function() {
      $('.iconos-techado').toggleClass("active");
      $('.serv-techado').toggleClass("active");
    });
    $('#valet').on('click', function() {
      $('.iconos-valet').toggleClass("active");
      $('.serv-valet').toggleClass("active");
    });
    $('#oil').on('click', function() {
      $('.iconos-oil').toggleClass("active");
      $('.serv-oil').toggleClass("active");
    });
    $('#mecanico').on('click', function() {
      $('.iconos-mecanico').toggleClass("active");
      $('.serv-mecanico').toggleClass("active");
    });
    $('#cctv').on('click', function() {
      $('.iconos-cctv').toggleClass("active");
      $('.serv-cctv').toggleClass("active");
    });
    $('#altura').on('click', function() {
      $('.iconos-altura').toggleClass("active");
      $('.serv-altura').toggleClass("active");
    });
    $('#reservado').on('click', function() {
      $('.iconos-reservado').toggleClass("active");
      $('.serv-reservado').toggleClass("active");
    });
    $('#247').on('click', function() {
      $('.iconos-247').toggleClass("active");
      $('.serv-247').toggleClass("active");
    });
    /*carga de imagenes*/
    Dropzone.autoDiscover = false;
    $("#dropzone").dropzone({
      url: "/tarifas.php",
      addRemoveLinks: true,
      maxFileSize: 1000,
      dictResponseError: "Ha ocurrido un error, siga intentando o rellene el formulario con la información.",
      acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF',
      maxFiles: 4,
      parallelUploads: 2,
      uploadMultiple: false,
      complete: function(file)
      {
        if(file.status == "success")
        {
          alert("Sus tarifas y estacionamientos ya se encuentran en nuestro poder absoluto: " + file.name);
        }
      },
      error: function(file)
      {
        alert("Error subiendo las imagenes de sius tarifas y horarios" + file.name);
      },
    });
  },

  adherirPrivado: function() {
    var data = {};
    data.estacionamiento = {};
    data.estacionamiento.name = $("#name").val();
    data.estacionamiento.encargado = $("#nombre").val();
    data.estacionamiento.telefono = $("#telefono").val();
    data.estacionamiento.plazas = !!parseInt($("#plazas").val()) ? parseInt($("#plazas").val()) : null;
    data.estacionamiento.address = $("#address").val();
    data.estacionamiento.mediosDePago = {};
    data.estacionamiento.mediosDePago.E = !!$("#E:checked").length;
    data.estacionamiento.mediosDePago.D = !!$("#D:checked").length;
    data.estacionamiento.mediosDePago.C = !!$("#C:checked").length;
    data.estacionamiento.servicios = new Array();
    data.estacionamiento.horarios = {};
    data.estacionamiento.valores = {
      "auto": {},
      "camioneta": {},
      "4x4": {},
      "camion": {},
      "moto": {},
      "bici": {}
    };
    $("#servicios input:checked").each(function() {
      data.estacionamiento.servicios.push(this.id);
    });
    if (!!$("#247:checked").length) {
      data.estacionamiento.horarios["247"] = true;
      $("#horarios input").each(function(k) {
        var val = "24:00";
        if (k % 2 == 0) {
          val = "00:00";
        }
        data.estacionamiento.horarios[this.id] = val;
      });
    } else {
      $("#horarios input").each(function(k) {
        data.estacionamiento.horarios[this.id] = this.value;
      });
    }
    $.each(data.estacionamiento.valores, function(k, v) {
      for (var i = 1; i < 10; i++) {
        var val = !!$("#" + k + "-" + i) ? $("#" + k + "-" + i).attr('monto') : null;
        if (!!val) {
          data.estacionamiento.valores[k][i] = val;
        }
      }
    });
    return data;
  }
};
$(document).ready(function() {
  var $logo = $("#logoestaciona").clone();
  $logo.appendTo(".logotipo").removeClass('cls-3');
  (function($) {
    var touchStartX = null;
    $('.carousel').each(function() {
      var $carousel = $(this);
      $(this).on('touchstart', function(event) {
        var e = event.originalEvent;
        if (e.touches.length == 1) {
          var touch = e.touches[0];
          touchStartX = touch.pageX;
        }
      }).on('touchmove', function(event) {
        var e = event.originalEvent;
        if (touchStartX != null) {
          var touchCurrentX = e.changedTouches[0].pageX;
          if ((touchCurrentX - touchStartX) > 60) {
            touchStartX = null;
            $carousel.carousel('prev');
          } else if ((touchStartX - touchCurrentX) > 60) {
            touchStartX = null;
            $carousel.carousel('next');
          }
        }
      }).on('touchend', function() {
        touchStartX = null;
      });
    });
  })(jQuery);
  app.privadosView();
  var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false;
  trigger.click(function() {
    hamburger_cross();
  });
  function hamburger_cross() {
    if (isClosed == true) {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  };
  $('[data-toggle="offcanvas"]').click(function() {
    $('#wrapper').toggleClass('toggled');
  });
  $('#bgblue').click(function() {
    var word = document.getElementById('bgblue');
    if (word.innerHTML == 'ENVIAR') 
        word.innerHTML = 'CONTACTANOS';
    else word.innerHTML = 'ENVIAR'; 
    $('#bgim').toggleClass('mostrar');
    $('#bgim').toggleClass('dale');
  });
  $(".form__input").change(function(){
    var color = $(this).data("span");
    if ($(this).val()=="") {
      $("#"+color).css("background-color", "transparent");
    } else {
      $("#"+color).css("background-color", "#63E2FF");
    }
  });
  var doAnimations = function() {
    var offset = $(window).scrollTop() + $(window).height(),
      $animatables = $('.animatedoff');
    if ($animatables.length == 0) {
      $(window).off('scroll', doAnimations);
    }
    $animatables.each(function(i) {
      var $animatable = $(this);
        if (($animatable.offset().top + $animatable.height() - 20) < offset) {
            $animatable.removeClass('animatedoff').addClass('animated');
        }
    });
  };
  $(window).on('scroll', doAnimations);
  $(window).trigger('scroll');
});
