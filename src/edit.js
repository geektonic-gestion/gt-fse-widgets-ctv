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
        isProduct,
        isSearchBar,
        isSpecialOffers,
        isNoteMoyenne,
        isReviews,
        isSearch,
        isInventory,
        isCalendarProduct,
        isGtResa,
        isGtResaSticky,
        dataAttributes,
        titleText,
        closeText,
        submitButtonText,
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
        colorObject,
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
        { label: __('Barre resa', 'gt-fse-widgets-ctv'), value: 'isGtResa' },
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

    const handleColorChange = (field, newColor) => {
        setAttributes({
            colorObject: {
                ...attributes.colorObject, // Conservez les anciennes couleurs
                [field]: newColor,         // Mettez à jour uniquement la couleur spécifique
            },
        });
    };

    const renderColorPalette = (label, field) => (
        <div>
            <p>{label}</p>
            <ColorPalette
                colors={colors} // Les couleurs récupérées des global settings
                value={colorObject[field]}
                onChange={(newColor) => handleColorChange(field, newColor)}
            />
        </div>
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
                    <div>
                        <img src={imageUrls[imageUrlKey]} alt={label} style={{ maxWidth: '50px', marginTop: '10px' }} />
                    </div>
                    <Button
                        isDestructive
                        onClick={() => {
                            onChangeCallback(null); // Set the image attribute to 0 or undefined to clear it
                            setImageUrls((prev) => ({ ...prev, [imageUrlKey]: null })); // Clear the image URL in the state
                        }}
                        style={{ marginTop: '10px' }}
                    >
                        {__('Delete Image', 'gt-fse-widgets-ctv')}
                    </Button>
                </>
            )}
        </div>
    );

    // Function to render masked images
    const renderMaskedImage = (imageUrl, color) => {
        return (
            imageUrl && (
                <div
                    className="masked-image"
                    style={{
                        maskImage: `url(${imageUrl})`,
                        WebkitMaskImage: `url(${imageUrl})`,
                        backgroundColor: color || 'currentColor',
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
                            value={parseInt(attributes.productId)}
                            onChange={(productId) => setAttributes({ productId: parseInt(productId) })}
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
                {(isGtResaSticky || isGtResa) && (
                    <>
                        <PanelBody title={__('Global', 'gt-fse-widgets-ctv')} >
                            {renderColorPalette(__('Couleur du fond', 'gt-fse-widgets-ctv'), 'background')}
                        </PanelBody>
                        <PanelBody title={__('Bouton ouverture', 'gt-fse-widgets-ctv')} initialOpen={false} >
                            {renderColorPalette(__('Couleur du texte', 'gt-fse-widgets-ctv'), 'openButtonText')}
                            {renderColorPalette(__('Couleur du fond', 'gt-fse-widgets-ctv'), 'openButtonBackground')}
                            {renderImageControl(__('Image avant', 'gt-fse-widgets-ctv'), openImageBefore, (newId) => setAttributes({ openImageBefore: newId }), 'openImageBeforeUrl')}
                            {renderImageControl(__('Image après', 'gt-fse-widgets-ctv'), openImageAfter, (newId) => setAttributes({ openImageAfter: newId }), 'openImageAfterUrl')}
                        </PanelBody>

                        <PanelBody title={__('Bouton fermeture', 'gt-fse-widgets-ctv')} initialOpen={false} >
                            {renderColorPalette(__('Couleur du texte', 'gt-fse-widgets-ctv'), 'closeButtonText')}
                            {renderColorPalette(__('Couleur du fond', 'gt-fse-widgets-ctv'), 'closeButtonBackground')}
                            {renderImageControl(__('Image avant', 'gt-fse-widgets-ctv'), closeImageBefore, (newId) => setAttributes({ closeImageBefore: newId }), 'closeImageBeforeUrl')}
                            {renderImageControl(__('Image après', 'gt-fse-widgets-ctv'), closeImageAfter, (newId) => setAttributes({ closeImageAfter: newId }), 'closeImageAfterUrl')}
                        </PanelBody>
                        <PanelBody title={__('Input Dates', 'gt-fse-widgets-ctv')} initialOpen={false}>
                            <Button
                                variant={attributes.visibleFields.inputDates ? 'primary' : 'secondary'}
                                onClick={() =>
                                    setAttributes({
                                        visibleFields: {
                                            ...attributes.visibleFields,
                                            inputDates: !attributes.visibleFields.inputDates,
                                        },
                                    })
                                }
                            >
                                {attributes.visibleFields.inputDates ? __('Masquer', 'gt-fse-widgets-ctv') : __('Afficher', 'gt-fse-widgets-ctv')}
                            </Button>

                            {renderColorPalette(
                                __('Couleur du texte', 'gt-fse-widgets-ctv'),
                                'inputDatesText'
                            )}
                            {renderColorPalette(
                                __('Couleur de l\'image', 'gt-fse-widgets-ctv'),
                                'inputDatesImage'
                            )}
                            {renderImageControl(
                                __('Image avant', 'gt-fse-widgets-ctv'),
                                inputImageBefore,
                                (newId) => setAttributes({ inputImageBefore: newId }),
                                'inputImageBeforeUrl'
                            )}
                            {renderImageControl(
                                __('Image après', 'gt-fse-widgets-ctv'),
                                inputImageAfter,
                                (newId) => setAttributes({ inputImageAfter: newId }),
                                'inputImageAfterUrl'
                            )}
                        </PanelBody>

                        <PanelBody title={__('Nombre de personnes', 'gt-fse-widgets-ctv')} initialOpen={false}>
                            <Button
                                variant={attributes.visibleFields.persons ? 'primary' : 'secondary'}
                                onClick={() =>
                                    setAttributes({
                                        visibleFields: {
                                            ...attributes.visibleFields,
                                            persons: !attributes.visibleFields.persons,
                                        },
                                    })
                                }
                            >
                                {attributes.visibleFields.persons ? __('Masquer', 'gt-fse-widgets-ctv') : __('Afficher', 'gt-fse-widgets-ctv')}
                            </Button>

                            {renderColorPalette(
                                __('Couleur du texte', 'gt-fse-widgets-ctv'),
                                'personsText'
                            )}
                            {renderColorPalette(
                                __('Couleur de l\'image', 'gt-fse-widgets-ctv'),
                                'personsImage'
                            )}
                            {renderImageControl(
                                __('Image avant', 'gt-fse-widgets-ctv'),
                                selectImageBefore,
                                (newId) => setAttributes({ selectImageBefore: newId }),
                                'selectImageBeforeUrl'
                            )}
                            {renderImageControl(
                                __('Image après', 'gt-fse-widgets-ctv'),
                                selectImageAfter,
                                (newId) => setAttributes({ selectImageAfter: newId }),
                                'selectImageAfterUrl'
                            )}
                            <NumberControl
                                label={__('Nombre de personnes max', 'gt-fse-widgets-ctv')}
                                value={parseInt(attributes.maxPersons)}
                                onChange={(maxPersons) => setAttributes({ maxPersons: parseInt(maxPersons) })}
                                min={1}
                            />
                        </PanelBody>

                        <PanelBody title={__('Types d\'hébergements', 'gt-fse-widgets-ctv')} initialOpen={false}>
                            <Button
                                variant={attributes.visibleFields.type ? 'primary' : 'secondary'}
                                onClick={() =>
                                    setAttributes({
                                        visibleFields: {
                                            ...attributes.visibleFields,
                                            type: !attributes.visibleFields.type,
                                        },
                                    })
                                }
                            >
                                {attributes.visibleFields.type ? __('Masquer', 'gt-fse-widgets-ctv') : __('Afficher', 'gt-fse-widgets-ctv')}
                            </Button>

                            {renderColorPalette(
                                __('Couleur du texte', 'gt-fse-widgets-ctv'),
                                'typeText'
                            )}
                            {renderColorPalette(
                                __('Couleur de l\'image', 'gt-fse-widgets-ctv'),
                                'typeImage'
                            )}
                            {renderImageControl(
                                __('Image avant', 'gt-fse-widgets-ctv'),
                                selectImageBefore,
                                (newId) => setAttributes({ selectImageBefore: newId }),
                                'selectImageBeforeUrl'
                            )}
                            {renderImageControl(
                                __('Image après', 'gt-fse-widgets-ctv'),
                                selectImageAfter,
                                (newId) => setAttributes({ selectImageAfter: newId }),
                                'selectImageAfterUrl'
                            )}
                        </PanelBody>

                        <PanelBody title={__('Bouton recherche', 'gt-fse-widgets-ctv')} initialOpen={false} >
                            {renderColorPalette(__('Couleur du texte', 'gt-fse-widgets-ctv'), 'buttonText')}
                            {renderColorPalette(__('Couleur du fond', 'gt-fse-widgets-ctv'), 'buttonBackground')}
                            {renderImageControl(__('Image Before Button', 'gt-fse-widgets-ctv'), buttonImageBefore, (newId) => setAttributes({ buttonImageBefore: newId }), 'buttonImageBeforeUrl')}
                            {renderImageControl(__('Image After Button', 'gt-fse-widgets-ctv'), buttonImageAfter, (newId) => setAttributes({ buttonImageAfter: newId }), 'buttonImageAfterUrl')}
                        </PanelBody>
                    </>
                )}
            </InspectorControls>

            {(isGtResaSticky || isGtResa) ? (
                <div className="gt-widgets-ctv-resa admin">
                    <div
                        className="gt-widgets-ctv-resa__hide"
                        style={{
                            color: colorObject.closeButtonText,
                            backgroundColor: colorObject.closeButtonBackground,
                        }}
                    >
                        {imageUrls.closeImageBeforeUrl &&
                            renderMaskedImage(imageUrls.closeImageBeforeUrl, colorObject.closeButtonText)}

                        <RichText
                            tagName="div"
                            className="gt-widgets-ctv-resa__toggle__title"
                            value={closeText}
                            onChange={(newValue) => setAttributes({ closeText: newValue })}
                            placeholder={__('Fermer', 'gt-fse-widgets-ctv')}
                        />

                        {imageUrls.closeImageAfterUrl &&
                            renderMaskedImage(imageUrls.closeImageAfterUrl, colorObject.closeButtonText)}
                    </div>

                    <div
                        className="gt-widgets-ctv-resa__toggle"
                        style={{
                            color: colorObject.openButtonText,
                            backgroundColor: colorObject.openButtonBackground,
                        }}
                    >
                        {imageUrls.openImageBeforeUrl &&
                            renderMaskedImage(imageUrls.openImageBeforeUrl, colorObject.openButtonText)}

                        <RichText
                            tagName="div"
                            className="gt-widgets-ctv-resa__toggle__title"
                            value={titleText}
                            onChange={(newValue) => setAttributes({ titleText: newValue })}
                            placeholder={__('Organisez vos vacances', 'gt-fse-widgets-ctv')}
                        />

                        {imageUrls.openImageAfterUrl &&
                            renderMaskedImage(imageUrls.openImageAfterUrl, colorObject.openButtonText)}
                    </div>

                    <form
                        className="gt-widgets-ctv-resa__form"
                        style={{ backgroundColor: colorObject.background }}
                    >
                        {attributes.visibleFields.inputDates && (
                            <div
                                className="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--ranges"
                                style={{ color: colorObject.inputDatesText }}
                            >
                                {imageUrls.inputImageBeforeUrl &&
                                    renderMaskedImage(imageUrls.inputImageBeforeUrl, colorObject.inputDatesImage)}
                                <RichText
                                    tagName="div"
                                    className="gtInputLike"
                                    value={attributes.inputButtonText}
                                    onChange={(newValue) =>
                                        setAttributes({ inputButtonText: newValue })
                                    }
                                    placeholder={__('Arrivée / Départ...', 'gt-fse-widgets-ctv')}
                                />
                                {imageUrls.inputImageAfterUrl &&
                                    renderMaskedImage(imageUrls.inputImageAfterUrl, colorObject.inputDatesImage)}
                            </div>
                        )}
                        {attributes.visibleFields.persons && (
                            <div
                                className="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--personnes"
                                style={{ color: colorObject.personsText }}
                            >
                                {imageUrls.selectImageBeforeUrl &&
                                    renderMaskedImage(imageUrls.selectImageBeforeUrl, colorObject.personsImage)}

                                <select>
                                    <option value="">1 personne</option>
                                    <option value="2" selected>
                                        2 personnes
                                    </option>
                                    <option value="3">3 personnes</option>
                                    <option value="4">4 personnes</option>
                                    <option value="5">5 personnes</option>
                                    <option value="6">6 personnes</option>
                                    <option value="7">7 personnes</option>
                                    <option value="8">8 personnes</option>
                                    <option value="9">9 personnes</option>
                                    <option value="10">10 personnes</option>
                                </select>
                                {imageUrls.selectImageAfterUrl &&
                                    renderMaskedImage(imageUrls.selectImageAfterUrl, colorObject.personsImage)}
                            </div>
                        )}
                        {attributes.visibleFields.type && (
                            <div className="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--type">
                                {imageUrls.selectImageBeforeUrl &&
                                    renderMaskedImage(imageUrls.selectImageBeforeUrl, colorObject.typeImage)}

                                <select style={{ color: colorObject.typeText }}>
                                    <option value="all">Tous</option>
                                    <option value="accommodation">Location</option>
                                    <option value="pitch" selected>
                                        Emplacement
                                    </option>
                                </select>
                                {imageUrls.selectImageAfterUrl &&
                                    renderMaskedImage(imageUrls.selectImageAfterUrl, colorObject.typeImage)}
                            </div>
                        )}
                        <div
                            className="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--submit"
                            style={{
                                backgroundColor: colorObject.buttonBackground,
                                color: colorObject.buttonText,
                            }}
                        >
                            {imageUrls.buttonImageBeforeUrl &&
                                renderMaskedImage(imageUrls.buttonImageBeforeUrl, colorObject.buttonText)}

                            <RichText
                                tagName="div"
                                className="gtButtonLike"
                                value={submitButtonText}
                                onChange={(newValue) =>
                                    setAttributes({ submitButtonText: newValue })
                                }
                                placeholder={__('Rechercher un séjour', 'gt-fse-widgets-ctv')}
                            />
                            {imageUrls.buttonImageAfterUrl &&
                                renderMaskedImage(imageUrls.buttonImageAfterUrl, colorObject.buttonText)}
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
