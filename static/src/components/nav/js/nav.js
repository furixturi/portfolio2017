$(function(){
    var $el = $('nav'),
        revealTimeout = 100;

    // show
    setTimeout(function(){
        $el.addClass('reveal');
    }, revealTimeout);


    $el.find('a').on('click', function(e){
        var $navEl = $(this);
        e.preventDefault();
        $(document).trigger('nav_change', [$navEl.data('navi')]);
    });

    $el.on('nav_change_complete', function(e, arg){

        $to = $el.find('a[data-navi="arg"]');

        if( $to && !$to.hasClass('active') ) {

            $from = $el.find('a.active');
            if($from) $from.removeClass('active')

            $to.addClass('active');

        }

    })

    $el.on('nav_hide', function(e, arg) {
        console.log('hide nav')
        $el.addClass('hide');
    });

    $el.on('nav_show', function(e, arg) {
        $el.removeClass('hide');
    });

    
    
});