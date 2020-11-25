// ==UserScript==
// @name         9anime Bingewatcher+ alt
// @namespace    https://greasyfork.org/en/users/10118-drhouse
// @version      2.31
// @description  Auto-fullscreen, skip intros, jump to next episode 9anime on Vidstream and MyCloud videos
// @include      https://www*.9anime.*/*
// @include      https://vidstream.pro/*
// @include      https://mcloud.to/*
// @include      https://mcloud2.to/*
// @include      https://streamtape.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @author       drhouse
// @icon         https://www.google.com/s2/favicons?domain=9anime.to
// ==/UserScript==

(function($){

    function openFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE / Edge */
            elem.msRequestFullscreen();
        }
    }

    function waitForElementToDisplay(selector, time) {
        if($(selector)!=null) {
            setTimeout(function(){
                var elem = $('video').parent().parent().parent().get(0);
                openFullscreen(elem);
                $(elem).focus();
            }, 3000);


            var newYearCountdown = setInterval(function(){

                var player = $('video').get(0);

                var duration = player.duration;
                var current = player.currentTime;

                //console.log('duration='+duration)
                //console.log('current='+current)

                var link = $("body");
                link.addEventListener("keydown", function(event) {

                    var x = event.key;
                    var z = event.keyCode;

                    if (x == '0') { // 0 key skip 90s
                        player.currentTime = current + 90;
                    }

                    if (x == '6') { // 0 key skip end
                        player.currentTime = player.duration;
                    }

                    if (x == 'v') { // V key skip 90s
                        player.currentTime = current + 90;
                    }

                    if (x == 'n') { // V key skip end
                        player.currentTime = player.duration;
                    }
                }) 
            }, 1000);
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(selector, time);
            }, time);
        }
    }

    waitForElementToDisplay('#player', 1000);

})(jQuery);
