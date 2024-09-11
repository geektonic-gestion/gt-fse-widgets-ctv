/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);







function Edit({
  attributes,
  setAttributes
}) {
  const {
    isMap,
    isTarifs,
    isList,
    productId,
    isProduct,
    isSearchBar,
    isSpecialOffers,
    isNoteMoyenne,
    isReviews,
    isSearch,
    isInventory,
    isCalendarProduct,
    isGtResaSticky,
    backgroundColor,
    buttonBackgroundColor,
    dataAttributes,
    titleText,
    closeText,
    submitButtonText,
    inputTextColor,
    selectTextColor,
    buttonTextColor,
    inputImageBefore,
    inputImageAfter,
    selectImageBefore,
    selectImageAfter,
    buttonImageBefore,
    buttonImageAfter,
    openImageBefore,
    openImageAfter,
    closeImageBefore,
    closeImageAfter,
    openButtonTextColor,
    openButtonBackgroundColor,
    closeButtonTextColor,
    closeButtonBackgroundColor
  } = attributes;
  const options = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Liste', 'gt-fse-widgets-ctv'),
    value: 'isList'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('SearchBar', 'gt-fse-widgets-ctv'),
    value: 'isSearchBar'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Produit', 'gt-fse-widgets-ctv'),
    value: 'isProduct'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Map', 'gt-fse-widgets-ctv'),
    value: 'isMap'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tarifs', 'gt-fse-widgets-ctv'),
    value: 'isTarifs'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Offres spéciales', 'gt-fse-widgets-ctv'),
    value: 'isSpecialOffers'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Note moyenne', 'gt-fse-widgets-ctv'),
    value: 'isNoteMoyenne'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Avis', 'gt-fse-widgets-ctv'),
    value: 'isReviews'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Recherche', 'gt-fse-widgets-ctv'),
    value: 'isSearch'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Inventaire', 'gt-fse-widgets-ctv'),
    value: 'isInventory'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Calendrier produit', 'gt-fse-widgets-ctv'),
    value: 'isCalendarProduct'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Barre resa sticky', 'gt-fse-widgets-ctv'),
    value: 'isGtResaSticky'
  }];
  const selectedOption = options.find(opt => attributes[opt.value])?.value || '';
  const handleOptionChange = option => {
    const newAttributes = options.reduce((acc, {
      value
    }) => {
      acc[value] = value === option;
      return acc;
    }, {});
    setAttributes(newAttributes);
  };
  const [colors, setColors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
  const [globalId, setGlobalId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)('');
  const [imageUrls, setImageUrls] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)({
    openImageBeforeUrl: null,
    openImageAfterUrl: null,
    closeImageBeforeUrl: null,
    closeImageAfterUrl: null,
    inputImageBeforeUrl: null,
    inputImageAfterUrl: null,
    selectImageBeforeUrl: null,
    selectImageAfterUrl: null,
    buttonImageBeforeUrl: null,
    buttonImageAfterUrl: null
  });

  // Fetch image URLs based on IDs
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    const fetchImageUrl = async (imageId, key) => {
      if (!imageId) return;
      const response = await wp.media.attachment(imageId).fetch();
      const imageUrl = response?.url || null;
      setImageUrls(prev => ({
        ...prev,
        [key]: imageUrl
      }));
    };
    fetchImageUrl(openImageBefore, 'openImageBeforeUrl');
    fetchImageUrl(openImageAfter, 'openImageAfterUrl');
    fetchImageUrl(closeImageBefore, 'closeImageBeforeUrl');
    fetchImageUrl(closeImageAfter, 'closeImageAfterUrl');
    fetchImageUrl(inputImageBefore, 'inputImageBeforeUrl');
    fetchImageUrl(inputImageAfter, 'inputImageAfterUrl');
    fetchImageUrl(selectImageBefore, 'selectImageBeforeUrl');
    fetchImageUrl(selectImageAfter, 'selectImageAfterUrl');
    fetchImageUrl(buttonImageBefore, 'buttonImageBeforeUrl');
    fetchImageUrl(buttonImageAfter, 'buttonImageAfterUrl');
  }, [openImageBefore, openImageAfter, closeImageBefore, closeImageAfter, inputImageBefore, inputImageAfter, selectImageBefore, selectImageAfter, buttonImageBefore, buttonImageAfter]);

  // Fetch colors from global settings
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    const globalSettings = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.select)('core/block-editor').getSettings();
    if (globalSettings.colors) {
      setColors(globalSettings.colors);
    }
  }, []);

  // Fetch the global ID using the REST API
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    fetch('/wp-json/gt-ctv/v1/global-id').then(response => response.json()).then(data => setGlobalId(data)).catch(error => console.error('Error fetching global ID:', error));
  }, []);
  const handleColorChange = (newColor, attribute) => {
    setAttributes({
      [attribute]: newColor
    });
  };
  const renderColorPalette = (label, colorValue, onChangeCallback) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPalette, {
    colors: colors,
    value: colorValue,
    onChange: onChangeCallback
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null));
  const renderImageControl = (label, imageId, onChangeCallback, imageUrlKey) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: media => onChangeCallback(media.id),
    allowedTypes: ['image'],
    value: imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      isSecondary: true
    }, imageId ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change Image', 'gt-fse-widgets-ctv') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Image', 'gt-fse-widgets-ctv'))
  })), imageId && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: imageUrls[imageUrlKey],
    alt: label,
    style: {
      maxWidth: '50px',
      marginTop: '10px'
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isDestructive: true,
    onClick: () => {
      onChangeCallback(null); // Set the image attribute to 0 or undefined to clear it
      setImageUrls(prev => ({
        ...prev,
        [imageUrlKey]: null
      })); // Clear the image URL in the state
    },
    style: {
      marginTop: '10px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delete Image', 'gt-fse-widgets-ctv'))));

  // Function to render masked images
  const renderMaskedImage = imageUrl => {
    return imageUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "masked-image",
      style: {
        maskImage: `url(${imageUrl})`,
        WebkitMaskImage: `url(${imageUrl})`,
        backgroundColor: 'currentColor',
        width: '24px',
        // Set an appropriate width/height for your images
        height: '24px'
      }
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings', 'gt-fse-widgets-ctv')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Quel widget afficher ?', 'gt-fse-widgets-ctv'),
    selected: selectedOption,
    options: options,
    onChange: handleOptionChange
  }), (isTarifs || isProduct || isInventory || isReviews || isCalendarProduct) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Product ID', 'gt-fse-widgets-ctv'),
    value: productId,
    onChange: id => setAttributes({
      productId: id || 0
    }),
    min: 0
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data-attributes', 'gt-fse-widgets-ctv'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ajouter des data-attribtues pour le widget', 'gt-fse-widgets-ctv'),
    value: dataAttributes,
    onChange: dataAttributes => setAttributes({
      dataAttributes
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `https://reservation.secureholiday.net/fr/${globalId}/documentation/widgets/`,
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lire la documentation', 'gt-fse-widgets-ctv')))), isGtResaSticky && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bouton ouverture', 'gt-fse-widgets-ctv'),
    initialOpen: false
  }, renderColorPalette((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Couleur du texte', 'gt-fse-widgets-ctv'), openButtonTextColor, newColor => handleColorChange(newColor, 'openButtonTextColor')), renderColorPalette((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Couleur du fond', 'gt-fse-widgets-ctv'), openButtonBackgroundColor, newColor => handleColorChange(newColor, 'openButtonBackgroundColor')), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image avant', 'gt-fse-widgets-ctv'), openImageBefore, newId => setAttributes({
    openImageBefore: newId
  }), 'openImageBeforeUrl'), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image après', 'gt-fse-widgets-ctv'), openImageAfter, newId => setAttributes({
    openImageAfter: newId
  }), 'openImageAfterUrl')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bouton fermeture', 'gt-fse-widgets-ctv'),
    initialOpen: false
  }, renderColorPalette((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Couleur du texte', 'gt-fse-widgets-ctv'), closeButtonTextColor, newColor => handleColorChange(newColor, 'closeButtonTextColor')), renderColorPalette((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Couleur du fond', 'gt-fse-widgets-ctv'), closeButtonBackgroundColor, newColor => handleColorChange(newColor, 'closeButtonBackgroundColor')), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image avant', 'gt-fse-widgets-ctv'), closeImageBefore, newId => setAttributes({
    closeImageBefore: newId
  }), 'closeImageBeforeUrl'), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image après', 'gt-fse-widgets-ctv'), closeImageAfter, newId => setAttributes({
    closeImageAfter: newId
  }), 'closeImageAfterUrl')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Input Dates', 'gt-fse-widgets-ctv'),
    initialOpen: false
  }, renderColorPalette((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Couleur du texte', 'gt-fse-widgets-ctv'), inputTextColor, newColor => handleColorChange(newColor, 'inputTextColor')), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image avant', 'gt-fse-widgets-ctv'), inputImageBefore, newId => setAttributes({
    inputImageBefore: newId
  }), 'inputImageBeforeUrl'), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image après', 'gt-fse-widgets-ctv'), inputImageAfter, newId => setAttributes({
    inputImageAfter: newId
  }), 'inputImageAfterUrl')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Nombre de personnes', 'gt-fse-widgets-ctv'),
    initialOpen: false
  }, renderColorPalette((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Couleur du texte', 'gt-fse-widgets-ctv'), selectTextColor, newColor => handleColorChange(newColor, 'selectTextColor')), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image Before Select', 'gt-fse-widgets-ctv'), selectImageBefore, newId => setAttributes({
    selectImageBefore: newId
  }), 'selectImageBeforeUrl'), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image After Select', 'gt-fse-widgets-ctv'), selectImageAfter, newId => setAttributes({
    selectImageAfter: newId
  }), 'selectImageAfterUrl')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bouton recherche', 'gt-fse-widgets-ctv'),
    initialOpen: false
  }, renderColorPalette((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Couleur du texte', 'gt-fse-widgets-ctv'), buttonTextColor, newColor => handleColorChange(newColor, 'buttonTextColor')), renderColorPalette((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Couleur du fond', 'gt-fse-widgets-ctv'), buttonBackgroundColor, newColor => handleColorChange(newColor, 'buttonBackgroundColor')), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image Before Button', 'gt-fse-widgets-ctv'), buttonImageBefore, newId => setAttributes({
    buttonImageBefore: newId
  }), 'buttonImageBeforeUrl'), renderImageControl((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image After Button', 'gt-fse-widgets-ctv'), buttonImageAfter, newId => setAttributes({
    buttonImageAfter: newId
  }), 'buttonImageAfterUrl')))), isGtResaSticky ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gt-widgets-ctv-resa admin"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gt-widgets-ctv-resa__hide",
    style: {
      color: closeButtonTextColor,
      backgroundColor: closeButtonBackgroundColor
    }
  }, imageUrls.closeImageBeforeUrl && renderMaskedImage(imageUrls.closeImageBeforeUrl), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "gt-widgets-ctv-resa__toggle__title",
    value: closeText,
    onChange: newValue => setAttributes({
      closeText: newValue
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fermer', 'gt-fse-widgets-ctv')
  }), imageUrls.opencloseImageAfterUrlImageAfterUrl && renderMaskedImage(imageUrls.closeImageAfterUrl)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gt-widgets-ctv-resa__toggle",
    style: {
      color: openButtonTextColor,
      backgroundColor: openButtonBackgroundColor
    }
  }, imageUrls.openImageBeforeUrl && renderMaskedImage(imageUrls.openImageBeforeUrl), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "gt-widgets-ctv-resa__toggle__title",
    value: titleText,
    onChange: newValue => setAttributes({
      titleText: newValue
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Organisez vos vacances', 'gt-fse-widgets-ctv')
  }), imageUrls.openImageAfterUrl && renderMaskedImage(imageUrls.openImageAfterUrl)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: "gt-widgets-ctv-resa__form",
    style: {
      backgroundColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--ranges",
    style: {
      color: inputTextColor
    }
  }, imageUrls.inputImageBeforeUrl && renderMaskedImage(imageUrls.inputImageBeforeUrl), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "gtInputLike",
    value: attributes.inputButtonText,
    onChange: newValue => setAttributes({
      inputButtonText: newValue
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Arrivée / Départ...', 'gt-fse-widgets-ctv')
  }), imageUrls.inputImageAfterUrl && renderMaskedImage(imageUrls.inputImageAfterUrl)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--personnes",
    style: {
      color: selectTextColor
    }
  }, imageUrls.selectImageBeforeUrl && renderMaskedImage(imageUrls.selectImageBeforeUrl), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, "1 personne"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "2",
    selected: true
  }, "2 personnes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "3"
  }, "3 personnes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "4"
  }, "4 personnes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "5"
  }, "5 personnes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "6"
  }, "6 personnes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "7"
  }, "7 personnes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "8"
  }, "8 personnes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "9"
  }, "9 personnes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "10"
  }, "10 personnes")), imageUrls.selectImageAfterUrl && renderMaskedImage(imageUrls.selectImageAfterUrl)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--submit",
    style: {
      backgroundColor: buttonBackgroundColor,
      color: buttonTextColor
    }
  }, imageUrls.buttonImageBeforeUrl && renderMaskedImage(imageUrls.buttonImageBeforeUrl), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "div",
    className: "gtButtonLike",
    value: submitButtonText,
    onChange: newValue => setAttributes({
      submitButtonText: newValue
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rechercher un séjour', 'gt-fse-widgets-ctv')
  }), imageUrls.buttonImageAfterUrl && renderMaskedImage(imageUrls.buttonImageAfterUrl)))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    style: {
      textAlign: 'center'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Widget CTOUTVERT : ', 'gt-fse-widgets-ctv'), " ", options.find(opt => opt.value === selectedOption)?.label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Aucun widget sélectionné', 'gt-fse-widgets-ctv')));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"gt/gt-fse-widgets-ctv","version":"1.0.5","title":"GT Widgets CTOUTVERT","category":"widgets","icon":"welcome-widgets-menus","description":"Un block pour afficher des widgets CTOUTVERT","example":{},"supports":{"html":false,"typography":{"fontSize":true,"fontFamily":true,"lineHeight":true,"fontWeight":true}},"attributes":{"isSearchBar":{"type":"boolean","default":false},"isList":{"type":"boolean","default":true},"isProduct":{"type":"boolean","default":false},"isMap":{"type":"boolean","default":false},"isTarifs":{"type":"boolean","default":false},"isSpecialOffers":{"type":"boolean","default":false},"isNoteMoyenne":{"type":"boolean","default":false},"isReviews":{"type":"boolean","default":false},"isSearch":{"type":"boolean","default":false},"isInventory":{"type":"boolean","default":false},"isCalendarProduct":{"type":"boolean","default":false},"isGtResaSticky":{"type":"boolean","default":false},"productId":{"type":"number","default":0},"dataAttributes":{"type":"string","default":""},"backgroundColor":{"type":"string","default":""},"buttonBackgroundColor":{"type":"string","default":""},"titleText":{"type":"string","default":""},"closeText":{"type":"string","default":""},"submitButtonText":{"type":"string","default":""},"inputButtonText":{"type":"string","default":""},"inputTextColor":{"type":"string","default":""},"selectTextColor":{"type":"string","default":""},"buttonTextColor":{"type":"string","default":""},"inputImageBefore":{"type":"number","default":null},"inputImageAfter":{"type":"number","default":null},"selectImageBefore":{"type":"number","default":null},"selectImageAfter":{"type":"number","default":null},"buttonImageBefore":{"type":"number","default":null},"buttonImageAfter":{"type":"number","default":null},"openImageBefore":{"type":"number","default":null},"openImageAfter":{"type":"number","default":null},"closeImageBefore":{"type":"number","default":null},"closeImageAfter":{"type":"number","default":null},"openButtonTextColor":{"type":"string","default":""},"openButtonBackgroundColor":{"type":"string","default":""},"closeButtonTextColor":{"type":"string","default":""},"closeButtonBackgroundColor":{"type":"string","default":""}},"textdomain":"gt-fse-widgets-ctv","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgt_fse_widgets_ctv"] = self["webpackChunkgt_fse_widgets_ctv"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map