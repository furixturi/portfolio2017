/**
 * 01-app.js
 */

; (function ($) {
    'use strict';

    // namespace
    window.xiaoliPortfolio2017 = {
        info: "Xiaoli Shen | Portfolio 2017"
    };

    $(function () {

        var app = window.xiaoliPortfolio2017;
        app.$components = {
            // html: $(html)
            body: $('body'),
            nav : $('nav'),
            sections : $('section'),
            topButton : $('.top-button')
        }

//// navigation
        
        app.onNavChange = function(target) {
            if(!target || !$('#' + target).length) return;

            $('html, body').animate({
                scrollTop: $('#' + target).offset().top
            }, 400, 'easeInOutExpo', function(){
                app.$components.nav.trigger('nav_change_complete', target);
                app.$components.body.trigger('nav_change_complete');
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
                    // console.log($(this).attr('id') + " found by whole content in viewport")
                    current = $(this).attr('id');
                } else if ( topDistanceToWindowTop >= 0 && topDistanceToWindowTop < windowHeight / 2 ) {
                    // console.log($(this).attr('id') + " found by top in upper half of viewport")
                    current = $(this).attr('id');
                } else if (bottomDistanceToWindowBottom <= 0 && bottomDistanceToWindowBottom > -windowHeight / 2) {
                    // console.log($(this).attr('id') + " found by bottom in lower half of viewport")
                    current = $(this).attr('id');
                }

            })

            return current; 
        }

        app.updateActiveSection = function(){
            var currentActiveSection = app.checkCurrentActiveSection();
            if( currentActiveSection && app.currentActiveSection !== currentActiveSection ) {
                app.oldActiveSection = app.currentActiveSection;
                app.currentActiveSection = currentActiveSection;
                app.$components.nav.trigger('nav_change_complete', currentActiveSection);
                app.$components.body.trigger('nav_change_complete');                
            }
        }

        app.$components.body.on('nav_change_complete', function(){
            app.$components.body.removeClass(app.oldActiveSection).addClass(app.currentActiveSection);
        })

        // update when a nav link is clicked
        $(document).on('nav_change_start', function (e, arg) {
            app.onNavChange(arg);
        });

        // update while scrolling (throttled to execute every 100ms while scrolling)
        $(window).on('scroll', _.throttle(
            function(){
                var windowScrollTop = $(window).scrollTop(),
                windowHeight = window.innerHeight;
                
                if(windowScrollTop > windowHeight) {
                    app.$components.topButton.addClass("show");
                } else {
                    app.$components.topButton.removeClass("show");
                }

                app.updateActiveSection();
            }, 100));

        // fix navi while window resizing (debounced to only execute at 100ms after the last resize event is fired)
        $(window).on('resize', _.debounce(app.updateActiveSection, 100))


        
//// open/close project detail
        $(document).on('project_detail_open', function(e, arg) {
            app.$components.nav.trigger('nav_hide');
            app.$components.body.addClass('project-detail-opened');
            $('html').addClass('no-scroll');
        });

        $(document).on('project_detail_close', function(e, arg) {
            app.$components.nav.trigger('nav_show');
            app.$components.body.removeClass('project-detail-opened');
            $('html').removeClass('no-scroll');
        });


    });
})($);