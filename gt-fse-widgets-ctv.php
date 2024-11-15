<?php
/**
 * Plugin Name:       GT Widgets CTOUTVERT
 * Description:       Un block pour afficher des widgets CTOUTVERT
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.9
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gt-fse-widgets-ctv
 *
 * @package GtFseWidgetsCtv
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Register the block
function gt_fse_widgets_ctv_gt_fse_widgets_ctv_block_init() {
    register_block_type( __DIR__ . '/build');
}

add_action( 'init', 'gt_fse_widgets_ctv_gt_fse_widgets_ctv_block_init' );


// Enqueue BO script

add_action( 'enqueue_block_editor_assets', function() {
    // Auto-generated asset file.
    $asset = include_once __DIR__ . '/query-block/build/index.asset.php';

    wp_enqueue_script(
        'gt-fse-ctv-widget-query-block-back',
        plugins_url( '', __FILE__ ) . '/query-block/build/index.js',
        $asset['dependencies'],
        $asset['version'],
        true
    );
});

add_action( 'wp_enqueue_scripts', function() {
    // Auto-generated asset file.
    $asset = include_once __DIR__ . '/query-block/build/index.asset.php';

    wp_enqueue_script(
        'gt-fse-ctv-widget-query-block-front',
        plugins_url( '', __FILE__ ) . '/query-block/view.js',
        $asset['dependencies'],
        $asset['version'],
        true
    );
});

// Add the settings page
function gt_ctv_add_settings_page() {
	add_options_page(
		'Widgets CTOUTVERT',
		'Widgets CTOUTVERT',
		'manage_options',
		'gt-ctv-settings',
		'gt_ctv_render_settings_page'
	);
}
add_action( 'admin_menu', 'gt_ctv_add_settings_page' );

// Render the settings page
function gt_ctv_render_settings_page() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Widgets CTOUTVERT', 'gt-fse-widgets-ctv' ); ?></h1>
		<form method="post" action="options.php">
			<?php
			settings_fields( 'gt_ctv_settings_group' );
			do_settings_sections( 'gt-ctv-settings' );
			submit_button();
			?>
		</form>
	</div>
	<?php
}

// Register settings and fields
function gt_ctv_register_settings() {
	register_setting( 'gt_ctv_settings_group', 'gt_ctv_global_id' );
	register_setting( 'gt_ctv_settings_group', 'gt_ctv_id_group' );

	add_settings_section(
		'gt_ctv_main_section',
		__( 'Configuration', 'gt-fse-widgets-ctv' ),
		null,
		'gt-ctv-settings'
	);

	add_settings_field(
		'gt_ctv_global_id',
		__( 'Identifiant global', 'gt-fse-widgets-ctv' ),
		'gt_ctv_global_id_render',
		'gt-ctv-settings',
		'gt_ctv_main_section'
	);

	add_settings_field(
		'gt_ctv_id_group',
		__( 'idGroup ?', 'gt-fse-widgets-ctv' ),
		'gt_ctv_id_group_render',
		'gt-ctv-settings',
		'gt_ctv_main_section'
	);
}
add_action( 'admin_init', 'gt_ctv_register_settings' );

function gt_ctv_global_id_render() {
	$value = get_option( 'gt_ctv_global_id', '' );
	echo '<input type="number" name="gt_ctv_global_id" value="' . esc_attr( $value ) . '" />';
}

function gt_ctv_id_group_render() {
	$value = get_option( 'gt_ctv_id_group', 0 );
	$checked = checked( 1, $value, false );
	echo '<input type="checkbox" name="gt_ctv_id_group" value="1" ' . $checked . ' />';
}

// Add meta box to all public post types
function gt_ctv_add_meta_box() {
	$post_types = get_post_types( array( 'public' => true ), 'names' );

	foreach ( $post_types as $post_type ) {
		add_meta_box(
			'gt_ctv_meta_box',
			__( 'Widgets CTOUTVERT', 'gt-fse-widgets-ctv' ),
			'gt_ctv_meta_box_callback',
			$post_type,
			'side',
			'default'
		);
	}
}
add_action( 'add_meta_boxes', 'gt_ctv_add_meta_box' );

function gt_ctv_meta_box_callback( $post ) {
    wp_nonce_field( 'gt_ctv_meta_box', 'gt_ctv_meta_box_nonce' );

    // Get the global options
    $global_id = get_option( 'gt_ctv_global_id', '' );
    $id_group_option = get_option( 'gt_ctv_id_group', 0 );

    // Get the post-specific overrides
    $override_id = get_post_meta( $post->ID, '_gt_ctv_global_id', true );
    $override_id_group = get_post_meta( $post->ID, '_gt_ctv_id_group', true );

    // Determine which value to display (override if set, otherwise global)
    $final_id = ( $override_id !== '' ) ? $override_id : $global_id;
    $final_id_group = ( $override_id_group !== '' ) ? $override_id_group : $id_group_option;

    echo '<p><label for="gt_ctv_global_id">' . __( 'Identifiant global', 'gt-fse-widgets-ctv' ) . '</label></p>';
    echo '<input type="number" id="gt_ctv_global_id" name="gt_ctv_global_id" value="' . esc_attr( $final_id ) . '" />';

    $checked = checked( 1, $final_id_group, false );
    echo '<p><label for="gt_ctv_id_group">' . __( 'idGroup ?', 'gt-fse-widgets-ctv' ) . '</label></p>';
    echo '<input type="checkbox" id="gt_ctv_id_group" name="gt_ctv_id_group" value="1" ' . $checked . ' />';

    echo "<br/>";
    echo "<br/>";
    
    // Champ "Identifiant produit"
    // Récupérer la valeur actuelle du champ "Identifiant produit"
    $product_id = get_post_meta( $post->ID, '_gt_ctv_product_id', true );
    echo '<p><label for="gt_ctv_product_id">' . __( 'Identifiant produit', 'gt-fse-widgets-ctv' ) . '</label></p>';
    echo '<input 
        type="text" 
        id="gt_ctv_product_id" 
        name="gt_ctv_product_id" 
        value="' . esc_attr( $product_id ) . '" 
        style="width: 100%; margin-top: 5px;" 
    />';
}

// Save meta box data
function gt_ctv_save_meta_box_data( $post_id ) {
    // Check for nonce and autosave
    if ( ! isset( $_POST['gt_ctv_meta_box_nonce'] ) ||
         ! wp_verify_nonce( $_POST['gt_ctv_meta_box_nonce'], 'gt_ctv_meta_box' ) ) {
        return;
    }

    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    // Check if the user has permissions to save data
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // Save the global ID if set
    if ( isset( $_POST['gt_ctv_global_id'] ) ) {
        update_post_meta( $post_id, '_gt_ctv_global_id', sanitize_text_field( $_POST['gt_ctv_global_id'] ) );
    } else {
        delete_post_meta( $post_id, '_gt_ctv_global_id' ); // Delete if not set
    }

    // Vérifier et sauvegarder la valeur du champ "Identifiant produit"
    if ( isset( $_POST['gt_ctv_product_id'] ) ) {
        $product_id = sanitize_text_field( $_POST['gt_ctv_product_id'] );
        update_post_meta( $post_id, '_gt_ctv_product_id', $product_id );
    } else {
        delete_post_meta( $post_id, '_gt_ctv_product_id' );
    }

    // Save the idGroup value (checkbox)
    $id_group = isset( $_POST['gt_ctv_id_group'] ) ? 1 : 0;
    update_post_meta( $post_id, '_gt_ctv_id_group', $id_group );
}
add_action( 'save_post', 'gt_ctv_save_meta_box_data' );

// Function to get the final "Identifiant global" value
function gt_ctv_get_final_global_id( $post_id ) {
	$override_id = get_post_meta( $post_id, '_gt_ctv_global_id', true );
	if ( $override_id !== '' ) {
		return $override_id;
	}

	return get_option( 'gt_ctv_global_id', '' );
}

// Function to get the final "idGroup" value
function gt_ctv_get_final_id_group( $post_id ) {
	$override_id = get_post_meta( $post_id, '_gt_ctv_global_id', true );
	$override_id_group = get_post_meta( $post_id, '_gt_ctv_id_group', true );
	if ( $override_id_group !== '' && $override_id !== '') {
		return $override_id_group;
	}

	return get_option( 'gt_ctv_id_group', 0 );
}

// Register meta fields for REST API
function gt_ctv_register_meta() {
    register_post_meta('', '_gt_ctv_global_id', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        },
    ));

    register_post_meta('', '_gt_ctv_id_group', array(
        'show_in_rest' => true,
        'type' => 'boolean',
        'single' => true,
        'sanitize_callback' => 'rest_sanitize_boolean',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        },
    ));
}
add_action('init', 'gt_ctv_register_meta');

function gt_ctv_register_rest_endpoint() {
    register_rest_route('gt-ctv/v1', '/global-id', array(
        'methods' => 'GET',
        'callback' => 'gt_ctv_get_global_id',
    ));
}

function gt_ctv_get_global_id() {
    return get_option('gt_ctv_global_id', '');
}

add_action('rest_api_init', 'gt_ctv_register_rest_endpoint');



// Register scripts
function gt_ctv_add_script() {
    // Get the global option for 'isGroup'
    $isGroup = gt_ctv_get_final_id_group(get_the_ID());
    
    // Get the global or group ID
    $ctv_id = gt_ctv_get_final_global_id(get_the_ID()); // Default ID if not set
    $id_name = $isGroup ? 'groupId' : 'id';

    // Prepare the script
    $script = "
        <script>
            window.ctoutvert = {
                {$id_name}: {$ctv_id}, 
                lang: '" . ICL_LANGUAGE_CODE . "',
                url: 'https://reservation.secureholiday.net/widgets/'
            };

            (function (w, d, s, ctv, r, js, fjs) {
                r=new XMLHttpRequest();r.open('GET',w[ctv].url+'js/src.json');
                r.responseType='json';r.json=true;r.send();
                r.onload=function(){w[ctv].src=r.responseType=='json'?r.response:JSON.parse(r.response);
                js.src=w[ctv].src[0];fjs.parentNode.insertBefore(js, fjs);}
                js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
                js.id='ctvwidget';js.async=1;
            }(window, document, 'script', 'ctoutvert'));
        </script>
    ";

    echo $script;
}
add_action('wp_head', 'gt_ctv_add_script');
add_action('admin_head', 'gt_ctv_add_script');

// Ajouter une classe aux éléments .hebergement si gtOpenInSidebar est activé
function gt_ctv_add_class_to_hebergements_with_sidebar($block_content, $block) {
    // Vérifiez que c'est un Query Block et que gtOpenInSidebar est activé
    if (
        isset($block['blockName'], $block['attrs']['gtOpenInSidebar']) &&
        $block['blockName'] === 'core/query' &&
        $block['attrs']['gtOpenInSidebar'] === true
    ) {
        // Utilisez WP_HTML_Tag_Processor pour analyser le contenu HTML
        $processor = new WP_HTML_Tag_Processor($block_content);

        // Parcourez les balises avec la classe contenant "hebergement"
        while ($processor->next_tag(['attributes' => ['class' => '*hebergement*']])) {
            $processor->add_class('gt-fse-widgets-ctv-open-product');
        }

        // Retournez le contenu HTML mis à jour
        return $processor->get_updated_html();
    }

    // Retournez le contenu non modifié pour les autres blocs
    return $block_content;
}
add_filter('render_block', 'gt_ctv_add_class_to_hebergements_with_sidebar', 10, 2);


// register attributes
add_filter('register_block_type_args', function($args, $name) {
    // Verify block name is exactly as intended
    if ($name === 'core/query') { // Or use 'gt/gt-fse-hebergements' if applicable
        $args['attributes']['gtOpenInSidebar'] = array(
            'type' => 'integer',
            'default' => null,
        );
    }
    return $args;
}, 10, 2);
