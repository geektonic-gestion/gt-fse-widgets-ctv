/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

(function ($) {
  // Check if elements with the class '.gt-widgets-ctv-resa' exist on the page
  if (document.querySelectorAll('.gt-widgets-ctv-resa').length == 0) return;

  // Function to dynamically load a JavaScript file
  function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Function to dynamically load a CSS file
  function loadStyle(url) {
    const link = document.createElement('link');
    link.href = url;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // Load js-cookie script
  loadScript('/wp-content/plugins/gt-fse-widgets-ctv/lib/jscookies/js.cookies.min.js');

  // Load Moment.js first
  loadScript('/wp-content/plugins/gt-fse-widgets-ctv/lib/caleran/vendor/moment.min.js', function () {
    // After Moment.js is loaded, load Caleran script
    loadScript('/wp-content/plugins/gt-fse-widgets-ctv/lib/caleran/js/caleran.min.js');
  });

  // Load Caleran CSS
  loadStyle('/wp-content/plugins/gt-fse-widgets-ctv/lib/caleran/css/caleran.min.css');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.gt-widgets-ctv-resa__toggle').addClass('open');
    } else {
      $('.gt-widgets-ctv-resa__toggle').removeClass('open');
    }
  });
  $(document).on('click', '.gt-widgets-ctv-resa__toggle', function () {
    $(this).parent().addClass('gt-widgets-ctv-resa--open');
  });
  $(document).on('click', '.gt-widgets-ctv-resa__hide', function () {
    $(this).parent().removeClass('gt-widgets-ctv-resa--open');
  });
  $(window).on('load', function () {
    let opening = moment();
    let closing = moment().add(7, 'days');

    // Cookies.remove('gt-arrival');
    // Cookies.remove('gt-departure');

    if (!Cookies.get('gt-arrival')) {
      var arrival = moment() > opening ? moment() : opening;
    } else {
      var arrival = moment(Cookies.get('gt-arrival'));
    }
    if (!Cookies.get('gt-departure')) {
      var departure = moment().add(7, 'days');
    } else {
      var departure = moment(Cookies.get('gt-departure'));
    }
    $('.gt-widgets-ctv-resa__form__entry--ranges').each(function () {
      $('input', this).caleran({
        locale: $('html').attr('lang'),
        showFooter: false,
        startDate: arrival,
        endDate: departure,
        autoCloseOnSelect: true,
        minDate: opening,
        calendarCount: $(window).width() < 768 ? 1 : 2,
        locale: $('html').attr('lang').split('-')[0],
        cancelLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Annuler', 'gt-fse-widgets-ctv'),
        applyLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Appliquer', 'gt-fse-widgets-ctv'),
        // maxDate:closing > moment() ? closing : null,
        oninit: function (caleran) {
          let arrival = moment(caleran.config.startDate).format('YYYY-MM-DD');
          Cookies.set('gt-arrival', arrival, {
            expires: inTwoHours()
          });
          let departure = moment(caleran.config.endDate).format('YYYY-MM-DD');
          Cookies.set('gt-departure', departure, {
            expires: inTwoHours()
          });
        },
        onafterselect: function (caleran, startDate, endDate) {
          let arrival = moment(startDate).format('YYYY-MM-DD');
          Cookies.set('gt-arrival', arrival, {
            expires: inTwoHours()
          });
          let departure = moment(endDate).format('YYYY-MM-DD');
          Cookies.set('gt-departure', departure, {
            expires: inTwoHours()
          });
          $('.gt-dispo-loaded').removeClass('gt-dispo-loaded');
          // update_disponibilites();

          $('.gt-widgets-ctv-resa-form__entry--ranges input').each(function () {
            let instance = $(this).data('caleran');
            instance.setStart(startDate);
            instance.setEnd(endDate);
          });

          // $(window).trigger('gt_dates_ranges_updated',[true]);
        }
      });
    });
  });
  function inTwoHours() {
    let time = new Date();
    time.setHours(time.getHours() + 2);
    return time;
  }
  $(document).on('submit', '.gt-widgets-ctv-resa__form', function (e) {
    e.preventDefault();
  });
  $(document).on('click', '.gt-widgets-ctv-resa__form__entry--submit button', function () {
    let ranges = $('.gt-widgets-ctv-resa__form__entry--ranges input').val().split(' - ');
    let params = {
      dateStart: ranges[0],
      dateEnd: ranges[1],
      travelers: $('.gt-widgets-ctv-resa__form__entry--personnes select').val()
    };
    window.dispatchEvent(new CustomEvent('ctv-widget.open-search', {
      detail: params
    }));
  });
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map