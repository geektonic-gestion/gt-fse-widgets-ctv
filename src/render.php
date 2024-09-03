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

	<?php endif; ?>

</div>