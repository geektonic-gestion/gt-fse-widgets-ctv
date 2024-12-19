<?php
$colorObject = $attributes['colorObject'] ?? [];
?>

<div 
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="gt/ctv/widgets"	
>

    <?php if ($attributes['isMap']): ?>
        <ctv-maps <?php echo $attributes['dataAttributes']; ?>></ctv-maps>

    <?php elseif ($attributes['isTarifs']): ?>
        <?php if ($attributes['productId'] && $attributes['productId'] !== 0): ?>
            <ctv-availability data-background-color="#FFFFFFFF" data-product-id="<?php echo $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-availability>

        <?php else: ?>
            <ctv-availability data-background-color="#FFFFFFFF" <?php echo $attributes['dataAttributes']; ?>></ctv-availability>

        <?php endif; ?>
    <?php elseif ($attributes['isList']): ?>
        <ctv-product-list data-background-color="#FFFFFFFF" <?php echo $attributes['dataAttributes']; ?>></ctv-product-list>

    <?php elseif ($attributes['isSearchBar']): ?>
        <ctv-searchbar <?php echo $attributes['dataAttributes']; ?>></ctv-searchbar>

    <?php elseif ($attributes['isSpecialOffers']): ?>
        <ctv-offers data-display-mode="carousel" <?php echo $attributes['dataAttributes']; ?>></ctv-offers>

    <?php elseif ($attributes['isNoteMoyenne']): ?>
        <ctv-reviews data-modal-position="bottom" <?php echo $attributes['dataAttributes']; ?>></ctv-reviews>

    <?php elseif ($attributes['isReviews']): ?>
        <ctv-reviews-list data-product-id="<?php echo $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-reviews-list>

    <?php elseif ($attributes['isSearch']): ?>
        <ctv-search <?php echo $attributes['dataAttributes']; ?>></ctv-search>

    <?php elseif ($attributes['isInventory']): ?>
        <ctv-inventory data-product-id="<?php echo $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-inventory>

    <?php elseif ($attributes['isCalendarProduct']): ?>
        <ctv-product-search data-product-id="<?php echo $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-product-search>

    <?php elseif ($attributes['productId']): ?>
        <ctv-product data-product-id="<?php echo $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-product>

    <?php elseif ($attributes['isGtResaSticky'] || $attributes['isGtResa']): ?>
        <div class="gt-widgets-ctv-resa <?php echo $attributes['isGtResaSticky'] ? 'sticky' : ''; ?>">

            <?php if ($attributes['isGtResaSticky']): ?>
                <div class="gt-widgets-ctv-resa__toggle" style="color: <?php echo esc_attr($colorObject['openButtonText']); ?>; 
                           background-color: <?php echo esc_attr($colorObject['openButtonBackground']); ?>;">
                    <?php if ( !empty( $attributes['openImageBefore'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageBefore'] ) ); ?>');"></div>
					<?php endif; ?>

                    <div class="gt-widgets-ctv-resa__toggle__title">
                        <?php echo esc_html($attributes['titleText'] ?: __('Organisez vos vacances', 'gt')); ?>
                    </div>

                    <?php if ( !empty( $attributes['openImageAfter'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
                </div>

                <div class="gt-widgets-ctv-resa__hide" style="color: <?php echo esc_attr($colorObject['closeButtonText']); ?>; 
                           background-color: <?php echo esc_attr($colorObject['closeButtonBackground']); ?>;">
                    <?php if ( !empty( $attributes['openImageBefore'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageBefore'] ) ); ?>');"></div>
					<?php endif; ?>

                    <div class="gt-widgets-ctv-resa__toggle__title">
                        <?php echo esc_html($attributes['closeText'] ?: __('Fermer', 'gt')); ?>
                    </div>

                    <?php if ( !empty( $attributes['openImageAfter'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
                </div>
            <?php endif; ?>

            <form class="gt-widgets-ctv-resa__form"
                style="background-color: <?php echo esc_attr($colorObject['background']); ?>;">
                <!-- Champ Dates -->
                <?php if (!empty($attributes['visibleFields']['inputDates'])): ?>
                    <div class="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--ranges <?php echo $attributes['isGtResaSticky'] ? 'sticky' : ''; ?>"
                        style="color: <?php echo esc_attr($colorObject['inputDatesText']); ?>;">
                        <?php if ( !empty( $attributes['inputImageBefore'] ) ): ?>
						<div class="masked-image" style="background-color: <?php echo esc_attr($colorObject['inputDatesImage']); ?>; mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['inputImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['inputImageBefore'] ) ); ?>');"></div>
					<?php endif; ?>

                        <input type="text" placeholder="<?php esc_attr_e('Arrivée / Départ...', 'gt'); ?>" />

                        <?php if ( !empty( $attributes['inputImageAfter'] ) ): ?>
						<div class="masked-image" style="background-color: <?php echo esc_attr($colorObject['inputDatesImage']); ?>; mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['inputImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['inputImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
                    </div>
                <?php endif; ?>

                <!-- Champ Nombre de Personnes -->
                <?php if (!empty($attributes['visibleFields']['persons'])): ?>
                    <div class="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--personnes <?php echo $attributes['isGtResaSticky'] ? 'sticky' : ''; ?>"
                        style="color: <?php echo esc_attr($colorObject['personsText']); ?>;">
                        <?php if ( !empty( $attributes['selectImageBefore'] ) ): ?>
						<div class="masked-image" style="background-color: <?php echo esc_attr($colorObject['personsImage']); ?>; mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageBefore'] ) ); ?>');"></div>
					<?php endif; ?>

                        <select>
                            <?php for ($i = 1; $i <= ($attributes['maxPersons'] ?? 8); $i++): ?>
                                <option value="<?php echo $i; ?>"><?php echo $i; ?>             <?php esc_html_e('personnes', 'gt'); ?></option>
                            <?php endfor; ?>
                        </select>

                        <?php if ( !empty( $attributes['selectImageAfter'] ) ): ?>
						<div class="masked-image" style="background-color: <?php echo esc_attr($colorObject['personsImage']); ?>;  mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
                    </div>
                <?php endif; ?>

                <!-- Champ Type -->
                <?php if (!empty($attributes['visibleFields']['type'])): ?>
                    <div class="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--type <?php echo $attributes['isGtResaSticky'] ? 'sticky' : ''; ?>"
                        style="color: <?php echo esc_attr($colorObject['typeText']); ?>;">
                        <?php if ( !empty( $attributes['selectImageBefore'] ) ): ?>
                            <div class="masked-image" style="background-color: <?php echo esc_attr($colorObject['typeImage']); ?>;  mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageBefore'] ) ); ?>');"></div>
                        <?php endif; ?>

                        <select>
                            <option value="all"><?php esc_html_e('Tous', 'gt'); ?></option>
                            <option value="accommodation"><?php esc_html_e('Location', 'gt'); ?></option>
                            <option value="pitch"><?php esc_html_e('Emplacement', 'gt'); ?></option>
                        </select>

                        <?php if ( !empty( $attributes['selectImageAfter'] ) ): ?>
						<div class="masked-image" style="background-color: <?php echo esc_attr($colorObject['typeImage']); ?>; mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
                    </div>
                <?php endif; ?>

                <!-- Bouton de Soumission -->
                <div class="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--submit <?php echo $attributes['isGtResaSticky'] ? 'sticky' : ''; ?>" style="background-color: <?php echo esc_attr($colorObject['buttonBackground']); ?>; 
                           color: <?php echo esc_attr($colorObject['buttonText']); ?>;">
                    <?php if ( !empty( $attributes['buttonImageBefore'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['buttonImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['buttonImageBefore'] ) ); ?>');"></div>
					<?php endif; ?>

                    <button type="submit">
                        <?php echo esc_html($attributes['submitButtonText'] ?: __('Rechercher un séjour', 'gt')); ?>
                    </button>

                    <?php if ( !empty( $attributes['buttonImageAfter'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['buttonImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['buttonImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
                </div>
            </form>
        </div>
    <?php endif; ?>

</div>