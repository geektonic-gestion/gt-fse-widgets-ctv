import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';

const addCtoutvertPanel = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes } = props;

        // Vérifiez si le bloc est "gt-fse-hebergements"
        if (name !== 'core/query' || attributes.className !== 'gt-fse-hebergements') {
            return <BlockEdit {...props} />;
        }

        console.log(attributes);

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Widgets CTOUTVERT', 'gt-widgets-ctv')} initialOpen={true}>
                        <ToggleControl
                            label={__('Ouvrir les hébergements en sidebar', 'gt-widgets-ctv')}
                            checked={attributes.gtOpenInSidebar}
                            onChange={(value) => setAttributes({ gtOpenInSidebar: value })}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'addCtoutvertPanel');

// Ajoutez le filtre pour injecter le panneau
addFilter(
    'editor.BlockEdit',
    'gt-widgets-ctv/add-ctoutvert-panel',
    addCtoutvertPanel
);
