/**
 * nav.js
 */

$(function(){
    'use strict';

    var $el = $('nav'),
        revealTimeout = 400;

    // show
    setTimeout(function(){
        $el.addClass('reveal');
    }, revealTimeout);


    $el.find('a').on('click', function(e){
        var $navEl = $(this);

        if($navEl.data('navi')) {
            e.preventDefault();

            if($navEl.hasClass('active') || $navEl.hasClass('changing')) return; 

            $(document).trigger('nav_change_start', [$navEl.data('navi')]);
            $navEl.addClass('changing');
        }
    });

    $el.on('nav_change_complete', function(e, arg){
        var $to = $el.find('a[data-navi="' + arg + '"]');

        if( $to && !$to.hasClass('active') ) {

            var $from = $el.find('a.active');
            
            if($from) $from.removeClass('active')

            $to.removeClass('changing').addClass('active');

        }

    })

    $el.on('nav_hide', function(e, arg) {
        $el.addClass('hide');
    });

    $el.on('nav_show', function(e, arg) {
        $el.removeClass('hide');
    });

    
    
});