// import { __ } from '@wordpress/i18n';
import { store, getContext, getElement, getConfig } from '@wordpress/interactivity';


(function($){


    // Check if elements with the class '.gt-widgets-ctv-resa' exist on the page
    if (document.querySelectorAll('.gt-widgets-ctv-resa').length == 0) return;

    // Function to dynamically load a JavaScript file
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Function to dynamically load a CSS file
    function loadStyle(url) {
        const link = document.createElement('link');
        link.href = url;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }


    // Load js-cookie script
    loadScript(gtFseCtvVars.pluginUrl + '/lib/jscookies/js.cookies.min.js');

    // Load Moment.js first
    loadScript(gtFseCtvVars.pluginUrl + '/lib/caleran/vendor/moment.min.js', function () {
        // After Moment.js is loaded, load Caleran script
        loadScript(gtFseCtvVars.pluginUrl + '/lib/caleran/js/caleran.min.js');
    });

    // Load Caleran CSS
    loadStyle(gtFseCtvVars.pluginUrl + '/lib/caleran/css/caleran.min.css');
    

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.gt-widgets-ctv-resa__toggle').addClass('open');
        }
        else{
            $('.gt-widgets-ctv-resa__toggle').removeClass('open');
        }
    });

    $(document).on('click', '.gt-widgets-ctv-resa__toggle', function(){

        $(this).parent().addClass('gt-widgets-ctv-resa--open');

    });
    $(document).on('click', '.gt-widgets-ctv-resa__hide', function(){

        $(this).parent().removeClass('gt-widgets-ctv-resa--open');

    });

    $(window).on('load', function(){


        const gtOptions = store('gt/options');

        if(gtOptions && gtOptions.state){
            if(gtOptions.state.opening_date){
                var opening = moment(gtOptions.state.opening_date);
            }
            else{
                var opening = moment();
            }
            if(gtOptions.state.closing_date){
                var closing = moment(gtOptions.state.closing_date);
            }
            else{
                var closing = moment().add(7,'days');
            }
        }


        if(!Cookies.get('gt-arrival')){
            var arrival = moment() > opening ? moment() : opening;
        }
        else{
            var arrival = moment( Cookies.get('gt-arrival') );
        }

        if(!Cookies.get('gt-departure')){
            var departure = moment(opening).add(7,'days');
        }
        else{
            var departure = moment( Cookies.get('gt-departure') );
        }

        $('.gt-widgets-ctv-resa__form__entry--ranges').each(function(){
            $('input', this).caleran({
                locale:$('html').attr('lang'),
                showFooter:false,
                startDate:arrival,
                endDate:departure,
                autoCloseOnSelect:true,
                minDate:opening,
                maxDate:closing,
                calendarCount: $(window).width() < 768 ? 1 : 2,
                locale:$('html').attr('lang').split('-')[0],
                cancelLabel:"Annuler",
                applyLabel:"Appliquer",
                // maxDate:closing > moment() ? closing : null,
                oninit: function(caleran){
                    let arrival = moment(caleran.config.startDate).format('YYYY-MM-DD');
                    Cookies.set('gt-arrival', arrival, { expires: inTwoHours() });
                    let departure = moment(caleran.config.endDate).format('YYYY-MM-DD');
                    Cookies.set('gt-departure', departure, { expires: inTwoHours() });
                },
                onafterselect: function(caleran, startDate, endDate){
                    let arrival = moment(startDate).format('YYYY-MM-DD');
                    Cookies.set('gt-arrival', arrival, { expires: inTwoHours() });
                    let departure = moment(endDate).format('YYYY-MM-DD');
                    Cookies.set('gt-departure', departure, { expires: inTwoHours() });
                    $('.gt-dispo-loaded').removeClass('gt-dispo-loaded');
                    // update_disponibilites();

                    $('.gt-widgets-ctv-resa-form__entry--ranges input').each(function(){
                        let instance = $(this).data('caleran');
                        instance.setStart(startDate);
                        instance.setEnd(endDate);
                    });

                    // $(window).trigger('gt_dates_ranges_updated',[true]);
                }
            });
        });
    });
    
    function inTwoHours(){
        let time = new Date();
        time.setHours( time.getHours() + 2 );
        return time;
    }

    $(document).on('submit', '.gt-widgets-ctv-resa__form', function(e) {
        e.preventDefault();
    });

    $(document).on('click', '.gt-widgets-ctv-resa__form__entry--submit button', function () {
        let ranges = $('.gt-widgets-ctv-resa__form__entry--ranges input').val().split(' - ');
        let params = {
            dateStart: ranges[0],
            dateEnd: ranges[1],
            travelers: $('.gt-widgets-ctv-resa__form__entry--personnes select').val(),
            productType: $('.gt-widgets-ctv-resa__form__entry--type select').val(),
        };
        window.dispatchEvent(new CustomEvent('ctv-widget.open-search', { detail: params }));    
    });

    $(document).on('click', '.gt-widgets-ctv-resa__form__entry--submit.sticky button', function () {
        let ranges = $('.gt-widgets-ctv-resa__form__entry--ranges.sticky input').val().split(' - ');
        let params = {
            dateStart: ranges[0],
            dateEnd: ranges[1],
            travelers: $('.gt-widgets-ctv-resa__form__entry--personnes.sticky select').val(),
            productType: $('.gt-widgets-ctv-resa__form__entry--type.sticky select').val(),
        };
        window.dispatchEvent(new CustomEvent('ctv-widget.open-search', { detail: params }));    
    });

})(jQuery);