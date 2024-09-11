import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RadioControl, __experimentalNumberControl as NumberControl, TextareaControl, ColorPalette, Button } from '@wordpress/components';
import './editor.scss';
import { useEffect, useState } from '@wordpress/element';
import { select } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
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

    const options = [
        { label: __('Liste', 'gt-fse-widgets-ctv'), value: 'isList' },
        { label: __('SearchBar', 'gt-fse-widgets-ctv'), value: 'isSearchBar' },
        { label: __('Produit', 'gt-fse-widgets-ctv'), value: 'isProduct' },
        { label: __('Map', 'gt-fse-widgets-ctv'), value: 'isMap' },
        { label: __('Tarifs', 'gt-fse-widgets-ctv'), value: 'isTarifs' },
        { label: __('Offres spéciales', 'gt-fse-widgets-ctv'), value: 'isSpecialOffers' },
        { label: __('Note moyenne', 'gt-fse-widgets-ctv'), value: 'isNoteMoyenne' },
        { label: __('Avis', 'gt-fse-widgets-ctv'), value: 'isReviews' },
        { label: __('Recherche', 'gt-fse-widgets-ctv'), value: 'isSearch' },
        { label: __('Inventaire', 'gt-fse-widgets-ctv'), value: 'isInventory' },
        { label: __('Calendrier produit', 'gt-fse-widgets-ctv'), value: 'isCalendarProduct' },
        { label: __('Barre resa sticky', 'gt-fse-widgets-ctv'), value: 'isGtResaSticky' },
    ];

    const selectedOption = options.find((opt) => attributes[opt.value])?.value || '';

    const handleOptionChange = (option) => {
        const newAttributes = options.reduce((acc, { value }) => {
            acc[value] = value === option;
            return acc;
        }, {});
        setAttributes(newAttributes);
    };
    
    

    const [colors, setColors] = useState([]);
    const [globalId, setGlobalId] = useState('');
    const [imageUrls, setImageUrls] = useState({
        openImageBeforeUrl: null,
        openImageAfterUrl: null,
        closeImageBeforeUrl: null,
        closeImageAfterUrl: null,
        inputImageBeforeUrl: null,
        inputImageAfterUrl: null,
        selectImageBeforeUrl: null,
        selectImageAfterUrl: null,
        buttonImageBeforeUrl: null,
        buttonImageAfterUrl: null,
    });

    // Fetch image URLs based on IDs
    useEffect(() => {
        const fetchImageUrl = async (imageId, key) => {
            if (!imageId) return;

            const response = await wp.media.attachment(imageId).fetch();
            const imageUrl = response?.url || null;
            setImageUrls(prev => ({ ...prev, [key]: imageUrl }));
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
    useEffect(() => {
        const globalSettings = select('core/block-editor').getSettings();
        if (globalSettings.colors) {
            setColors(globalSettings.colors);
        }
    }, []);

    // Fetch the global ID using the REST API
    useEffect(() => {
        fetch('/wp-json/gt-ctv/v1/global-id')
            .then((response) => response.json())
            .then((data) => setGlobalId(data))
            .catch((error) => console.error('Error fetching global ID:', error));
    }, []);

    const handleColorChange = (newColor, attribute) => {
        setAttributes({ [attribute]: newColor });
    };

    const renderColorPalette = (label, colorValue, onChangeCallback) => (
        <>
            <p>{label}</p>
            <ColorPalette
                colors={colors}
                value={colorValue}
                onChange={onChangeCallback}
            />
            <br />
        </>
    );

    const renderImageControl = (label, imageId, onChangeCallback, imageUrlKey) => (
        <div className="image-control">
            <p>{label}</p>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => onChangeCallback(media.id)}
                    allowedTypes={['image']}
                    value={imageId}
                    render={({ open }) => (
                        <Button onClick={open} isSecondary>
                            {imageId ? __('Change Image', 'gt-fse-widgets-ctv') : __('Upload Image', 'gt-fse-widgets-ctv')}
                        </Button>
                    )}
                />
            </MediaUploadCheck>
            {imageId && (
                <>
                    <img src={imageUrls[imageUrlKey]} alt={label} style={{ maxWidth: '100%', marginTop: '10px' }} />
                    <Button
                        isDestructive
                        onClick={() => onChangeCallback(null)} // Clear the image by setting it to null
                        style={{ marginTop: '10px' }}
                    >
                        {__('Delete Image', 'gt-fse-widgets-ctv')}
                    </Button>
                </>
            )}
        </div>
    );

    // Function to render masked images
    const renderMaskedImage = (imageUrl) => {
        return (
            imageUrl && (
                <div
                    className="masked-image"
                    style={{
                        maskImage: `url(${imageUrl})`,
                        WebkitMaskImage: `url(${imageUrl})`,
                        backgroundColor: 'currentColor',
                        width: '24px', // Set an appropriate width/height for your images
                        height: '24px'
                    }}
                ></div>
            )
        );
    };

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody title={__('Settings', 'gt-fse-widgets-ctv')}>
                    <RadioControl
                        label={__('Quel widget afficher ?', 'gt-fse-widgets-ctv')}
                        selected={selectedOption}
                        options={options}
                        onChange={handleOptionChange}
                    />
                    {(isTarifs || isProduct || isInventory || isReviews || isCalendarProduct) && (
                        <NumberControl
                            label={__('Product ID', 'gt-fse-widgets-ctv')}
                            value={productId}
                            onChange={(id) => setAttributes({ productId: id || 0 })}
                            min={0}
                        />
                    )}
                    <TextareaControl
                        label={__('Data-attributes', 'gt-fse-widgets-ctv')}
                        help={__('Ajouter des data-attribtues pour le widget', 'gt-fse-widgets-ctv')}
                        value={dataAttributes}
                        onChange={(dataAttributes) => setAttributes({ dataAttributes })}
                    />
                    <p>
                        <a href={`https://reservation.secureholiday.net/fr/${globalId}/documentation/widgets/`} target="_blank">
                            {__('Lire la documentation', 'gt-fse-widgets-ctv')}
                        </a>
                    </p>
                </PanelBody>
                {isGtResaSticky && (
                    <>
                    <PanelBody title={__('Bouton ouverture', 'gt-fse-widgets-ctv')}>
                        {renderColorPalette(
                            __('Couleur du texte', 'gt-fse-widgets-ctv'),
                            openButtonTextColor,
                            (newColor) => handleColorChange(newColor, 'openButtonTextColor')
                        )}
                        {renderColorPalette(
                            __('Couleur du fond', 'gt-fse-widgets-ctv'),
                            openButtonBackgroundColor,
                            (newColor) => handleColorChange(newColor, 'openButtonBackgroundColor')
                        )}
                        {renderImageControl(__('Image avant', 'gt-fse-widgets-ctv'), openImageBefore, (newId) => setAttributes({ openImageBefore: newId }), 'openImageBeforeUrl')}
                        {renderImageControl(__('Image après', 'gt-fse-widgets-ctv'), openImageAfter, (newId) => setAttributes({ openImageAfter: newId }), 'openImageAfterUrl')}
                    </PanelBody>

                    <PanelBody title={__('Bouton fermeture', 'gt-fse-widgets-ctv')}>
                        {renderColorPalette(
                            __('Couleur du texte', 'gt-fse-widgets-ctv'),
                            closeButtonTextColor,
                            (newColor) => handleColorChange(newColor, 'closeButtonTextColor')
                        )}
                        {renderColorPalette(
                            __('Couleur du fond', 'gt-fse-widgets-ctv'),
                            closeButtonBackgroundColor,
                            (newColor) => handleColorChange(newColor, 'closeButtonBackgroundColor')
                        )}
                        {renderImageControl(__('Image avant', 'gt-fse-widgets-ctv'), closeImageBefore, (newId) => setAttributes({ closeImageBefore: newId }), 'closeImageBeforeUrl')}
                        {renderImageControl(__('Image après', 'gt-fse-widgets-ctv'), closeImageAfter, (newId) => setAttributes({ closeImageAfter: newId }), 'closeImageAfterUrl')}
                    </PanelBody>

                    <PanelBody title={__('Input Dates', 'gt-fse-widgets-ctv')}>
                        {renderColorPalette(
                            __('Couleur du texte', 'gt-fse-widgets-ctv'),
                            inputTextColor,
                            (newColor) => handleColorChange(newColor, 'inputTextColor')
                        )}
                        {renderImageControl(__('Image avant', 'gt-fse-widgets-ctv'), inputImageBefore, (newId) => setAttributes({ inputImageBefore: newId }), 'inputImageBeforeUrl')}
                        {renderImageControl(__('Image après', 'gt-fse-widgets-ctv'), inputImageAfter, (newId) => setAttributes({ inputImageAfter: newId }), 'inputImageAfterUrl')}
                    </PanelBody>

                    <PanelBody title={__('Nombre de personnes', 'gt-fse-widgets-ctv')}>
                        {renderColorPalette(
                            __('Couleur du texte', 'gt-fse-widgets-ctv'),
                            selectTextColor,
                            (newColor) => handleColorChange(newColor, 'selectTextColor')
                        )}
                        {renderImageControl(__('Image Before Select', 'gt-fse-widgets-ctv'), selectImageBefore, (newId) => setAttributes({ selectImageBefore: newId }), 'selectImageBeforeUrl')}
                        {renderImageControl(__('Image After Select', 'gt-fse-widgets-ctv'), selectImageAfter, (newId) => setAttributes({ selectImageAfter: newId }), 'selectImageAfterUrl')}
                    </PanelBody>

                    <PanelBody title={__('Bouton recherche', 'gt-fse-widgets-ctv')}>
                        {renderColorPalette(
                            __('Couleur du texte', 'gt-fse-widgets-ctv'),
                            buttonTextColor,
                            (newColor) => handleColorChange(newColor, 'buttonTextColor')
                        )}
                        {renderColorPalette(
                            __('Couleur du fond', 'gt-fse-widgets-ctv'),
                            buttonBackgroundColor,
                            (newColor) => handleColorChange(newColor, 'buttonBackgroundColor')
                        )}
                        {renderImageControl(__('Image Before Button', 'gt-fse-widgets-ctv'), buttonImageBefore, (newId) => setAttributes({ buttonImageBefore: newId }), 'buttonImageBeforeUrl')}
                        {renderImageControl(__('Image After Button', 'gt-fse-widgets-ctv'), buttonImageAfter, (newId) => setAttributes({ buttonImageAfter: newId }), 'buttonImageAfterUrl')}
                    </PanelBody>
                    </>
                )}
            </InspectorControls>

            {isGtResaSticky ? (
                <div className="gt-widgets-ctv-resa admin">
                    <div className="gt-widgets-ctv-resa__hide" style={{ color: closeButtonTextColor, backgroundColor: closeButtonBackgroundColor }}>
                        {imageUrls.closeImageBeforeUrl && renderMaskedImage(imageUrls.closeImageBeforeUrl)}

                        <RichText
                            tagName="div"
                            className="gt-widgets-ctv-resa__toggle__title"
                            value={closeText}
                            onChange={(newValue) => setAttributes({ closeText: newValue })}
                            placeholder={__('Fermer', 'gt-fse-widgets-ctv')}
                        />
                        {imageUrls.opencloseImageAfterUrlImageAfterUrl && renderMaskedImage(imageUrls.closeImageAfterUrl)}

                    </div>
                    <div className="gt-widgets-ctv-resa__toggle" style={{ color: openButtonTextColor, backgroundColor: openButtonBackgroundColor }}>
                        {imageUrls.openImageBeforeUrl && renderMaskedImage(imageUrls.openImageBeforeUrl)}
                        <RichText
                            tagName="div"
                            className="gt-widgets-ctv-resa__toggle__title"
                            value={titleText}
                            onChange={(newValue) => setAttributes({ titleText: newValue })}
                            placeholder={__('Organisez vos vacances', 'gt-fse-widgets-ctv')}
                        />
                        {imageUrls.openImageAfterUrl && renderMaskedImage(imageUrls.openImageAfterUrl)}

                    </div>
                    <form className="gt-widgets-ctv-resa__form" style={{ backgroundColor }}>
                        <div className="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--ranges" style={{ color: inputTextColor }}>
                            {imageUrls.inputImageBeforeUrl && renderMaskedImage(imageUrls.inputImageBeforeUrl)}

                            <RichText
                                tagName="div"
                                className='gtInputLike'
                                value={attributes.inputButtonText}
                                onChange={(newValue) => setAttributes({ inputButtonText: newValue })}
                                placeholder={__('Arrivée / Départ...', 'gt-fse-widgets-ctv')}
                            />
                            {imageUrls.inputImageAfterUrl && renderMaskedImage(imageUrls.inputImageAfterUrl)}

                        </div>
                        <div className="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--personnes" style={{ color: selectTextColor }}>
                            {imageUrls.selectImageBeforeUrl && renderMaskedImage(imageUrls.selectImageBeforeUrl)}

                            <select>
                                <option value="">1 personne</option>
                                <option value="2" selected>2 personnes</option>
                                <option value="3">3 personnes</option>
                                <option value="4">4 personnes</option>
                                <option value="5">5 personnes</option>
                                <option value="6">6 personnes</option>
                                <option value="7">7 personnes</option>
                                <option value="8">8 personnes</option>
                                <option value="9">9 personnes</option>
                                <option value="10">10 personnes</option>
                            </select>
                            {imageUrls.selectImageAfterUrl && renderMaskedImage(imageUrls.selectImageAfterUrl)}

                        </div>
                        <div className="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--submit" style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}>
                            {imageUrls.buttonImageBeforeUrl && renderMaskedImage(imageUrls.buttonImageBeforeUrl)}

                            <RichText
                                tagName="div"
                                className='gtButtonLike'
                                value={submitButtonText}
                                onChange={(newValue) => setAttributes({ submitButtonText: newValue })}
                                placeholder={__('Rechercher un séjour', 'gt-fse-widgets-ctv')}
                            />
                            {imageUrls.buttonImageAfterUrl && renderMaskedImage(imageUrls.buttonImageAfterUrl)}
                        </div>
                    </form>
                </div>
            ) : (
                <h2 style={{ textAlign: 'center' }}>
                    {__('Widget CTOUTVERT : ', 'gt-fse-widgets-ctv')} {options.find((opt) => opt.value === selectedOption)?.label || __('Aucun widget sélectionné', 'gt-fse-widgets-ctv')}
                </h2>
            )}
        </div>
    );
}
