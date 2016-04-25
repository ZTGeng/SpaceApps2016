var defaultDurition = 2000;
var Animations = function() {
    this.clear = function () {
        var $sun = $('<img src="/images/weather_images/sun.png">');
        $('.animation').append($sun);
        $sun.css({
            position: "absolute",
            top: "-100px",
            left: "125px",
            width: "100px",
            height: "100px",
            opacity: 0
        }).animate({
            top: "-70px",
            opacity: 1
        }, defaultDurition);
    };
    this.clearNight = function () {
        var $moon = $('<img src="/images/weather_images/moon.png">');
        $('.animation').append($moon);
        $moon.css({
          position: "absolute",
          top: "-100px",
          left: "125px",
          width: "100px",
          height: "100px",
          opacity: 0
        }).animate({
            top: "-70px",
            opacity: 1
        }, defaultDurition);
    };
    this.cloudy = function () {
        var $cloud1 = $('<img class="anime-obj" src="/images/weather_images/white_cloud_day_1.png">');
        var $cloud2 = $('<img class="anime-obj" src="/images/weather_images/white_cloud_day_2.png">');
        var $cloud3 = $('<img class="anime-obj" src="/images/weather_images/white_cloud_day_3.png">');
        var $cloud4 = $('<img class="anime-obj" src="/images/weather_images/white_cloud_day_4.png">');
        $('.animation').append($cloud1, $cloud2, $cloud3, $cloud4);
        $('.anime-obj').css({
            position: "absolute",
            opacity: 0,
        });
        $cloud1.css({
            top: "-50px",
            left: "100px",
            width: "200px",
            height: "90px",
        }).animate({
            left: "120px",
            opacity: 1
        }, defaultDurition);
        $cloud2.css({
            top: "-20px",
            left: "-20px",
            width: "170px",
            height: "70px",
        }).animate({
            left: "0",
            opacity: 1
        }, defaultDurition);
        $cloud3.css({
            top: "0",
            left: "30px",
            width: "170px",
            height: "80px",
        }).animate({
            left: "90px",
            opacity: 1
        }, defaultDurition);
        $cloud4.css({
            top: "-20px",
            left: "90px",
            width: "150px",
            height: "65px",
        }).animate({
            left: "180px",
            opacity: 1
        }, defaultDurition);
    };
    this.cloudyNight = function () {
        var $cloud1 = $('<img class="anime-obj" src="/images/weather_images/dark_cloud_night_1.png">');
        var $cloud2 = $('<img class="anime-obj" src="/images/weather_images/dark_cloud_night_2.png">');
        var $cloud3 = $('<img class="anime-obj" src="/images/weather_images/dark_cloud_night_3.png">');
        var $cloud4 = $('<img class="anime-obj" src="/images/weather_images/dark_cloud_night_4.png">');
        $('.animation').append($cloud1, $cloud2, $cloud3, $cloud4);
        $('.anime-obj').css({
            position: "absolute",
            opacity: 0,
        });

        $cloud1.css({
            top: "-50px",
            left: "100px",
            width: "200px",
            height: "90px",
        }).animate({
            left: "120px",
            opacity: 1
        }, defaultDurition);
        $cloud2.css({
            top: "-20px",
            left: "-20px",
            width: "170px",
            height: "70px",
        }).animate({
            left: "0",
            opacity: 1
        }, defaultDurition);
        $cloud3.css({
            top: "0",
            left: "30px",
            width: "170px",
            height: "80px",
        }).animate({
            left: "90px",
            opacity: 1
        }, defaultDurition);
        $cloud4.css({
            top: "-20px",
            left: "90px",
            width: "150px",
            height: "65px",
        }).animate({
            left: "180px",
            opacity: 1
        }, defaultDurition);
    };
    this.partlyCloudy = function() {
        this.clear();
        this.cloudy();
    };
    this.partlyCloudyNight = function() {
        this.clearNight();
        this.cloudyNight();
    };
    this.rain = function() {
        $rain = $('<div class="rain-animation"></div>');
        $('.animation').append($rain);
        this.cloudy();
    };
    this.rainNight = function() {
        $rain = $('<div class="rain-animation"></div>');
        $('.animation').append($rain);
        this.cloudyNight();
    };
    this.snow = function() {
        this.cloudy();
        $bigSnow = $('<div class="big-snow-animation"></div>');
        $smallSnow = $('<div class="small-snow-animation"></div>');
        $('.animation').append($bigSnow, $smallSnow);
    };
    this.snowNight = function() {
        this.cloudyNight();
        $bigSnow = $('<div class="big-snow-animation"></div>');
        $smallSnow = $('<div class="small-snow-animation"></div>');
        $('.animation').append($bigSnow, $smallSnow);
    };
};
