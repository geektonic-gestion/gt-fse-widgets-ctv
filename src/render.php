<div <?php echo get_block_wrapper_attributes(); ?>>

	<?php if($attributes['isMap']): ?>
		<ctv-maps <?php echo $attributes['dataAttributes']; ?> ></ctv-maps>

	<?php elseif($attributes['isTarifs']): ?>
		<?php if($attributes['productId'] && $attributes['productId'] !== 0): ?>
			<ctv-availability data-background-color="#FFFFFFFF" data-product-id="<?php $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-availability>

		<?php else: ?>
			<ctv-availability data-background-color="#FFFFFFFF" <?php echo $attributes['dataAttributes']; ?>></ctv-availability>		

		<?php endif; ?>
	<?php elseif($attributes['isList']): ?>
		<ctv-product-list data-background-color="#FFFFFFFF" <?php echo $attributes['dataAttributes']; ?>></ctv-product-list>

	<?php elseif($attributes['isSearchBar']): ?>
		<ctv-searchbar <?php echo $attributes['dataAttributes']; ?>></ctv-searchbar>

	<?php elseif($attributes['isSpecialOffers']): ?>
		<ctv-offers data-display-mode="carousel" <?php echo $attributes['dataAttributes']; ?> ></ctv-offers>

	<?php elseif($attributes['isNoteMoyenne']): ?>
		<ctv-reviews data-modal-position="bottom" <?php echo $attributes['dataAttributes']; ?> ></ctv-reviews>

	<?php elseif($attributes['isReviews']): ?>
		<ctv-reviews-list data-product-id="<?php $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-reviews-list>

	<?php elseif($attributes['isSearch']): ?>
		<ctv-search <?php echo $attributes['dataAttributes']; ?>></ctv-search>

	<?php elseif($attributes['isInventory']): ?>
		<ctv-inventory data-product-id="<?php $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-inventory>

	<?php elseif($attributes['isCalendarProduct']): ?>
		<ctv-product-search data-product-id="<?php $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-product-search>

	<?php elseif($attributes['productId']): ?>
		<ctv-product data-product-id="<?php $attributes['productId']; ?>" <?php echo $attributes['dataAttributes']; ?>></ctv-product>

	<?php elseif ( $attributes['isGtResaSticky'] ): ?>
		<div class="gt-widgets-ctv-resa">
			<div class="gt-widgets-ctv-resa__toggle" style="color: <?php echo esc_attr( $attributes['openButtonTextColor'] ); ?>; background-color: <?php echo esc_attr( $attributes['openButtonBackgroundColor'] ); ?>;">
				
				<?php if ( !empty( $attributes['openImageBefore'] ) ): ?>
					<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageBefore'] ) ); ?>');"></div>
				<?php endif; ?>
				
				<div class="gt-widgets-ctv-resa__toggle__title">
					<?php echo esc_html( $attributes['titleText'] ?: __( 'Organisez vos vacances', 'gt' ) ); ?>
				</div>
				
				<?php if ( !empty( $attributes['openImageAfter'] ) ): ?>
					<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['openImageAfter'] ) ); ?>');"></div>
				<?php endif; ?>
			</div>

			<div class="gt-widgets-ctv-resa__hide" style="color: <?php echo esc_attr( $attributes['closeButtonTextColor'] ); ?>; background-color: <?php echo esc_attr( $attributes['closeButtonBackgroundColor'] ); ?>;">
				
				<?php if ( !empty( $attributes['closeImageBefore'] ) ): ?>
					<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['closeImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['closeImageBefore'] ) ); ?>');"></div>
				<?php endif; ?>
				
				<div class="gt-widgets-ctv-resa__toggle__title">
					<?php echo esc_html( $attributes['closeText'] ?: __( 'Fermer', 'gt' ) ); ?>
				</div>

				<?php if ( !empty( $attributes['closeImageAfter'] ) ): ?>
					<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['closeImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['closeImageAfter'] ) ); ?>');"></div>
				<?php endif; ?>

			</div>

			<form class="gt-widgets-ctv-resa__form" style="background-color: <?php echo esc_attr( $attributes['backgroundColor'] ); ?>;">
				
				<div class="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--ranges" style="color: <?php echo esc_attr( $attributes['inputTextColor'] ); ?>;">
					
					<?php if ( !empty( $attributes['inputImageBefore'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['inputImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['inputImageBefore'] ) ); ?>');"></div>
					<?php endif; ?>
					
					<input type="text" placeholder="<?php esc_attr_e( 'Arrivée / Départ...', 'gt' ); ?>" />
					
					<?php if ( !empty( $attributes['inputImageAfter'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['inputImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['inputImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
				</div>

				<div class="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--personnes" style="color: <?php echo esc_attr( $attributes['selectTextColor'] ); ?>;">
					
					<?php if ( !empty( $attributes['selectImageBefore'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageBefore'] ) ); ?>');"></div>
					<?php endif; ?>
					
					<select>
						<option value=""><?php esc_html_e( '1 personne', 'gt' ); ?></option>
						<option value="2" selected><?php esc_html_e( '2 personnes', 'gt' ); ?></option>
						<option value="3"><?php esc_html_e( '3 personnes', 'gt' ); ?></option>
						<option value="4"><?php esc_html_e( '4 personnes', 'gt' ); ?></option>
						<option value="5"><?php esc_html_e( '5 personnes', 'gt' ); ?></option>
						<option value="6"><?php esc_html_e( '6 personnes', 'gt' ); ?></option>
						<option value="7"><?php esc_html_e( '7 personnes', 'gt' ); ?></option>
						<option value="8"><?php esc_html_e( '8 personnes', 'gt' ); ?></option>
						<option value="9"><?php esc_html_e( '9 personnes', 'gt' ); ?></option>
						<option value="10"><?php esc_html_e( '10 personnes', 'gt' ); ?></option>
					</select>

					<?php if ( !empty( $attributes['selectImageAfter'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['selectImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
				</div>

				<div class="gt-widgets-ctv-resa__form__entry gt-widgets-ctv-resa__form__entry--submit" style="background-color: <?php echo esc_attr( $attributes['buttonBackgroundColor'] ); ?>; color: <?php echo esc_attr( $attributes['buttonTextColor'] ); ?>;">
					
					<?php if ( !empty( $attributes['buttonImageBefore'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['buttonImageBefore'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['buttonImageBefore'] ) ); ?>');"></div>
					<?php endif; ?>
					
					<button type="submit">
						<?php echo esc_html( $attributes['submitButtonText'] ?: __( 'Rechercher un séjour', 'gt' ) ); ?>
					</button>

					<?php if ( !empty( $attributes['buttonImageAfter'] ) ): ?>
						<div class="masked-image" style="mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['buttonImageAfter'] ) ); ?>'); -webkit-mask-image: url('<?php echo esc_url( wp_get_attachment_url( $attributes['buttonImageAfter'] ) ); ?>');"></div>
					<?php endif; ?>
				</div>

			</form>
		</div>
	<?php endif; ?>



</div>