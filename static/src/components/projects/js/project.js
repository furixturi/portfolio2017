/**
 * project.js
 */

$(function(){
    'use strict';

    var projects = $('#projects article');

    $.each(projects, function(){
        var $el = $(this),
            $moreInfo = $el.find('a.more-info'),
            $lessInfo = $el.find('a.less-info');

        $moreInfo.on('click', function(e){
            e.preventDefault();
            $el.addClass('detail');
            $(document).trigger('project_detail_open', [$el])
            return false;
        });

        $lessInfo.on('click', function(e){
            e.preventDefault();
            $el.removeClass('detail');
            $(document).trigger('project_detail_close', [$el])
            return false;
        });


    })
});