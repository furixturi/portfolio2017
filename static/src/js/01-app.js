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
            nav : $('nav')
        }

        /* $('a[href="#projects"]').on('click', function(e){
             e.preventDefault();
         })
     
         app.navigateTo = function(){
     
         };*/

//// navigation
        $(document).on('nav_change', function (e, arg) {
            app.onNavChange(arg);
        });

        app.onNavChange = function(target) {

        }
        
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