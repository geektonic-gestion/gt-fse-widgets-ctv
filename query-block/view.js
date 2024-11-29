document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.gt-fse-widgets-ctv-open-product, .gt-fse-widgets-ctv-open-product a').forEach(function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            let productId = this.getAttribute('data-gt-ctv-product-id');
            if (!productId) return;
             
            let params = {
                productId: productId,
            };
            
            window.dispatchEvent(new CustomEvent('ctv-widget.open-search', { detail: params }));

        });
    });
});