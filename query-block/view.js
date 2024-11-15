document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gt-fse-widgets-ctv-open-product, .gt-fse-widgets-ctv-open-product a').forEach(function(element) {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            let productId = this.getAttribute('data-gt-ctv-product-id');
            if(!productId) return;
            let ranges = document.querySelector('.gt-widgets-ctv-resa__form__entry--ranges input').value.split(' - ');
            let params = {
                productId:productId,
                dateStart: ranges[0],
                dateEnd: ranges[1],
                travelers: document.querySelector('.gt-widgets-ctv-resa__form__entry--personnes select').value,
            };
            window.dispatchEvent(new CustomEvent('ctv-widget.open-search', { detail: params }));

        });
    });
});