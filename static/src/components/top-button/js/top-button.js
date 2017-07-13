/**
 * top-button.js
 */

$(function(){
    'use strict';
    var $el = $(".top-button");

    $el.on('click', function(e){
        e.preventDefault();
        $(document).trigger('nav_change_start', [$el.data('navi')]);
    });
});