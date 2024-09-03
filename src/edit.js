import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RadioControl, __experimentalNumberControl as NumberControl, TextareaControl } from '@wordpress/components';
import './editor.scss';
import { useEffect, useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    // Destructure the attributes
    const { isMap, isTarifs, isList, productId, isProduct, isSearchBar, isSpecialOffers, isNoteMoyenne, isReviews, isSearch, isInventory, isCalendarProduct } = attributes;

    // State to hold the global ID
    const [globalId, setGlobalId] = useState('');

    // Options array with label-value pairs
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
    ];

    // Determine the currently selected option
    let selectedOption = '';
    if (isMap) selectedOption = 'isMap';
    else if (isTarifs) selectedOption = 'isTarifs';
    else if (isList) selectedOption = 'isList';
    else if (isProduct) selectedOption = 'isProduct';
    else if (isSearchBar) selectedOption = 'isSearchBar';
    else if (isSpecialOffers) selectedOption = 'isSpecialOffers';
    else if (isNoteMoyenne) selectedOption = 'isNoteMoyenne';
    else if (isReviews) selectedOption = 'isReviews';
    else if (isSearch) selectedOption = 'isSearch';
    else if (isInventory) selectedOption = 'isInventory';
    else if (isCalendarProduct) selectedOption = 'isCalendarProduct';

    // Fetch the global ID using the REST API
    useEffect(() => {
        fetch('/wp-json/gt-ctv/v1/global-id')
            .then(response => response.json())
            .then(data => {
                setGlobalId(data);
            })
            .catch(error => {
                console.error('Error fetching global ID:', error);
            });
    }, []);

    // Handle option change
    const handleOptionChange = (option) => {
        setAttributes({
            isSearchBar: option === 'isSearchBar',
            isMap: option === 'isMap',
            isTarifs: option === 'isTarifs',
            isList: option === 'isList',
            isProduct: option === 'isProduct',
            isSpecialOffers: option === 'isSpecialOffers',
            isNoteMoyenne: option === 'isNoteMoyenne',
            isReviews: option === 'isReviews',
            isSearch: option === 'isSearch',
            isInventory: option === 'isInventory',
            isCalendarProduct: option === 'isCalendarProduct',
        });
    };

    const handleIdChange = (id) => {
        if (id === '') {
            id = 0;
        }
        setAttributes({ productId: id });
    };

    // Find the label for the selected option
    const selectedOptionLabel = options.find(option => option.value === selectedOption)?.label || __('Aucun widget sélectionné', 'gt-fse-widgets-ctv');

    // Render the block editor UI
    return (
        <div { ...useBlockProps() }>
            <InspectorControls>
                <PanelBody title={__('Settings', 'gt-fse-widgets-ctv')}>
                    <RadioControl
                        label={__('Quel widget afficher ?', 'gt-fse-widgets-ctv')}
                        selected={selectedOption}
                        options={options}
                        onChange={handleOptionChange}
                    />
                    {(isTarifs || !selectedOption || isProduct || isInventory || isReviews || isCalendarProduct) && (
                        <NumberControl
                            label={__('Product ID', 'gt-fse-widgets-ctv')}
                            value={productId}
                            onChange={(id) => handleIdChange(id)}
                            min={0}
                            defaultValue={0}
                        />
                    )}

                    <TextareaControl
                        label="Data-attributes"
                        help="Ajouter des data-attribtues pour le widget"
                        value={attributes.dataAttributes}
                        onChange={(dataAttributes) => setAttributes({ dataAttributes })}
                    />

                    <p>
                        <a href={"https://reservation.secureholiday.net/fr/" + globalId + "/documentation/widgets/"} target="_blank">Lire la documentation</a>
                    </p>

                </PanelBody>
            </InspectorControls>

            <h2 style={{textAlign: 'center'}}>{__('Widget CTOUTVERT : ', 'gt-fse-widgets-ctv')} {selectedOptionLabel}</h2>

        </div>
    );
}
