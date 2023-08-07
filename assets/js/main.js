/**
* Template Name: Impact
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

function alerta(){
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Cotizador',
		html: 'Tus datos fueron enviados con éxito',
		showConfirmButton: false,
	});
}

function alerta2(){
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Contacto',
		html: 'Tus datos fueron enviados con éxito',
		showConfirmButton: false,
	});
}

function login(){
	Swal.fire({
    title: 'My STKINT',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Mail">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: 'Ingresar',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Ingresa un usuario y contraseña correctos`)
      }
      return { login: login, password: password }
    }
  }).then((result) => {
    Swal.fire(`
      Login: El usuario no se encuentra registrado
    `.trim())
  })
}

function inco(){
	Swal.fire({
		position: 'center',
    width: 800,
    html: '<img id="preview" src="assets/img/incoterms.jpg">',
		showConfirmButton: false,
	});
}


// Convertidor de longitudes
function convertirLongitudes(){

  //Extracción de datos
  var numero1 = document.getElementById("unidad1valor").value;
  var unidad1 = document.getElementById("unidad1name").value;
  var unidad2 = document.getElementById("unidad2name").value;

  //medidas
  function unidad(unidad2){  
    var unidadfinal
    if(unidad2 === "1"){unidadfinal = "km";}
    else if (unidad2 === "2") {unidadfinal = "m";}
    else if (unidad2 === "3") {unidadfinal = "mi";}
    else if (unidad2 === "4") {unidadfinal = "ft";}
    else {unidadfinal = "in";}
  
    return unidadfinal;
  };
  var medidas = unidad(unidad2);

  // Validaciones
  if (numero1 <= 0){
    Swal.fire({
      icon: 'warning',
      position: 'center',
      width: 800,
      html: 'El número debe ser mayor a 0(cero)',
      showConfirmButton: false,
    });
    
  } else {resultado}

  //Calculando
  function calculando(){

    var resultadocalculando

    if (unidad1 === "1" && unidad2 === "1") {resultadocalculando = numero1 * 1;}
    else if (unidad1 === "1" && unidad2 === "2") {resultadocalculando = numero1 * 1000;}
    else if (unidad1 === "1" && unidad2 === "3") {resultadocalculando = numero1 * 0.62;}
    else if (unidad1 === "1" && unidad2 === "4") {resultadocalculando = numero1 * 3280.84;}
    else if (unidad1 === "1" && unidad2 === "5") {resultadocalculando = numero1 * 39370.08;}
    else if (unidad1 === "2" && unidad2 === "1") {resultadocalculando = numero1 / 1000;}
    else if (unidad1 === "2" && unidad2 === "2") {resultadocalculando = numero1 * 1;}
    else if (unidad1 === "2" && unidad2 === "3") {resultadocalculando = numero1 / 1609;}
    else if (unidad1 === "2" && unidad2 === "4") {resultadocalculando = numero1 * 3.281;}
    else if (unidad1 === "2" && unidad2 === "5") {resultadocalculando = numero1 * 39.37;}
    else if (unidad1 === "3" && unidad2 === "1") {resultadocalculando = numero1 * 1.609;}
    else if (unidad1 === "3" && unidad2 === "2") {resultadocalculando = numero1 * 1609;}
    else if (unidad1 === "3" && unidad2 === "3") {resultadocalculando = numero1 * 1;}
    else if (unidad1 === "3" && unidad2 === "4") {resultadocalculando = numero1 * 5280;}
    else if (unidad1 === "3" && unidad2 === "5") {resultadocalculando = numero1 * 63360;}
    else if (unidad1 === "4" && unidad2 === "1") {resultadocalculando = numero1 / 3281;}
    else if (unidad1 === "4" && unidad2 === "2") {resultadocalculando = numero1 / 3.281;}
    else if (unidad1 === "4" && unidad2 === "3") {resultadocalculando = numero1 / 5280;}
    else if (unidad1 === "4" && unidad2 === "4") {resultadocalculando = numero1 * 1;}
    else if (unidad1 === "4" && unidad2 === "5") {resultadocalculando = numero1 * 12;}
    else if (unidad1 === "5" && unidad2 === "1") {resultadocalculando = numero1 / 39370;}
    else if (unidad1 === "5" && unidad2 === "2") {resultadocalculando = numero1 / 39.37;}
    else if (unidad1 === "5" && unidad2 === "3") {resultadocalculando = numero1 / 63360;}
    else if (unidad1 === "5" && unidad2 === "4") {resultadocalculando = numero1 / 12;}
    else if (unidad1 === "5" && unidad2 === "5") {resultadocalculando = numero1 * 1;}

    return resultadocalculando
  };

  var calculado = calculando();
  
  // Agregar separador de miles
  function formatearNumero(calculado){
    return new Intl.NumberFormat("es-CL").format(calculado);
  }

  //Formulas
  function formulas(){

    var formularesultado

    if (unidad1 === "1" && unidad2 === "1") {formularesultado = " ";}
    else if (unidad1 === "1" && unidad2 === "2") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 1.000";}
    else if (unidad1 === "1" && unidad2 === "3") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 0,62";}
    else if (unidad1 === "1" && unidad2 === "4") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 3.280,84";}
    else if (unidad1 === "1" && unidad2 === "5") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 39.370,08";}
    else if (unidad1 === "2" && unidad2 === "1") {formularesultado = "<b>Fórmula:</b> debes dividir por 1.000";}
    else if (unidad1 === "2" && unidad2 === "2") {formularesultado = " ";}
    else if (unidad1 === "2" && unidad2 === "3") {formularesultado = "<b>Fórmula:</b> debes dividir por 1.609";}
    else if (unidad1 === "2" && unidad2 === "4") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 3,281";}
    else if (unidad1 === "2" && unidad2 === "5") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 39,37";}
    else if (unidad1 === "3" && unidad2 === "1") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 1,609";}
    else if (unidad1 === "3" && unidad2 === "2") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 1.609";}
    else if (unidad1 === "3" && unidad2 === "3") {formularesultado = " ";}
    else if (unidad1 === "3" && unidad2 === "4") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 5.280";}
    else if (unidad1 === "3" && unidad2 === "5") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 63.360";}
    else if (unidad1 === "4" && unidad2 === "1") {formularesultado = "<b>Fórmula:</b> debes dividir por 3.281";}
    else if (unidad1 === "4" && unidad2 === "2") {formularesultado = "<b>Fórmula:</b> debes dividir por 3,281";}
    else if (unidad1 === "4" && unidad2 === "3") {formularesultado = "<b>Fórmula:</b> debes dividir por 5.280";}
    else if (unidad1 === "4" && unidad2 === "4") {formularesultado = " ";}
    else if (unidad1 === "4" && unidad2 === "5") {formularesultado = "<b>Fórmula:</b> debes multiplicar por 12";}
    else if (unidad1 === "5" && unidad2 === "1") {formularesultado = "<b>Fórmula:</b> debes dividir por 39.370";}
    else if (unidad1 === "5" && unidad2 === "2") {formularesultado = "<b>Fórmula:</b> debes dividir por 39,37";}
    else if (unidad1 === "5" && unidad2 === "3") {formularesultado = "<b>Fórmula:</b> debes dividir por 63.360";}
    else if (unidad1 === "5" && unidad2 === "4") {formularesultado = "<b>Fórmula:</b> debes dividir por 12";}
    else if (unidad1 === "5" && unidad2 === "5") {formularesultado = " ";}

    return formularesultado
  };

  var resultadoformula = formulas();

  //resultado
  var resultado = "<b>" + formatearNumero(calculado) + " " + medidas + "</b><br> " + resultadoformula;
  

  // Escribiendo el resultado
  document.getElementById('mens1').innerHTML = resultado;  
  

};