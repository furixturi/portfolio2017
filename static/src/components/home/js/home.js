/**
 * home.js
 */

$(function(){
    'use strict';

    var $el = $("#home");

    $el.find('.scrollCTA').on("click", function(e){
        e.preventDefault();
        $(document).trigger('nav_change_start', [$(this).data('navi')]);
    })
})
