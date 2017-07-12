/**
 * top-button.js
 */

$(function(){
    'use strict';
    var $el = $(".top-button");

    $el.on('click', function(e){
        console.log('to top button clicked')
        e.preventDefault();
        $(document).trigger('nav_change_start', [$el.data('navi')]);
    });
});