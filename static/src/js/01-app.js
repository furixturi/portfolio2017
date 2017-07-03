/**
 * 01-app.js
 */
; (function ($) {
    // namespace
    window.xiaoliPortfolio2017 = {
        info: "Xiaoli Shen | Portfolio 2017"
    };

    $(function () {

        var app = window.xiaoliPortfolio2017;
        app.$components = {
            // html: $(html)
            nav : $('nav'),
            sections : $('section')
        }

//// navigation
        
        app.onNavChange = function(target) {
            if(!target || !$('#' + target).length) return;

            $('html, body').animate({
                scrollTop: $('#' + target).offset().top
            }, 400, 'easeInOutExpo', function(){
                app.$components.nav.trigger('nav_change_complete', target)
            })
        }

        app.checkCurrentActiveSection = function() {
            var windowScrollTop = $(window).scrollTop(),
                windowHeight = window.innerHeight,
                current = null;

            app.$components.sections.each(function(){

                var top = $(this).offset().top,
                    bottom = top + $(this).height(),
                    topDistanceToWindowTop = top - windowScrollTop,
                    bottomDistanceToWindowBottom = bottom - (windowScrollTop + windowHeight);

                if (topDistanceToWindowTop < 0 && bottomDistanceToWindowBottom > 0) {
                    console.log($(this).attr('id') + " found by whole content in viewport")
                    current = $(this).attr('id');
                } else if ( topDistanceToWindowTop >= 0 && topDistanceToWindowTop < windowHeight / 2 ) {
                    console.log($(this).attr('id') + " found by top in upper half of viewport")
                    current = $(this).attr('id');
                } else if (bottomDistanceToWindowBottom <= 0 && bottomDistanceToWindowBottom > -windowHeight / 2) {
                    console.log($(this).attr('id') + " found by bottom in lower half of viewport")
                    current = $(this).attr('id');
                }

            })

            return current; 
        }

        // update when a nav link is clicked
        $(document).on('nav_change', function (e, arg) {
            app.onNavChange(arg);
        });
        // update while scrolling (throttled to execute every 100ms while scrolling)
        $(window).on('scroll', _.throttle(function(){
            var currentActiveSection = app.checkCurrentActiveSection();
            if( currentActiveSection && app.currentActiveSection !== currentActiveSection ) {
                app.currentActiveSection = currentActiveSection;
                app.$components.nav.trigger('nav_change_complete', currentActiveSection)

            }
            console.log("!!!!!!!! active: " + currentActiveSection);
        }, 100));
        // fix navi while window resizing (debounced to only execute at 100ms after the last resize event is fired)
        $(window).on('resize', _.debounce(function(){

        }, 100))
        
//// open/close project detail
        $(document).on('project_detail_open', function(e, arg) {
            app.$components.nav.trigger('nav_hide');
            $('html').addClass('no-scroll');
        });

        $(document).on('project_detail_close', function(e, arg) {
            app.$components.nav.trigger('nav_show');
            $('html').removeClass('no-scroll');
        });


    });
})($);