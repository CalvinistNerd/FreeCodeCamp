var apiBaseURL = 'https://api.wunderground.com/api/f7adc2272a36f454/geolookup/conditions/forecast10day/astronomy/q/'

var iconImageMap = {
    chanceflurries: {
        icon: 'wi-snow',
        bg: 'http://bigbackground.com/wp-content/uploads/2013/04/winter-wallpaper-widescreen.jpg'
    },
    chancerain: {
        icon: 'wi-rain',
        bg: 'http://wallpoper.com/images/00/44/58/57/autumn-rain_00445857.jpg'
    },
    chancesleet: {
        icon: 'wi-sleet',
        bg: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Sleet_(ice_pellets).jpg'
    },
    chancesnow: {
        icon: 'wi-snow',
        bg: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Snowing_%26_blowing_(5458326692).jpg'
    },
    chancetstorms: {
        icon: 'wi-thunderstorm',
        bg: 'http://ekkostorm.com/wp-content/uploads/2015/11/autumn-thunderstorm.jpg'
    },
    clear: {
        icon: 'wi-day-sunny',
        bg: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2015/07/Sunny-Bright-Day-Wallpaper-5.jpg'
    },
    nt_clear: {
        icon: 'wi-night-clear',
        bg: 'http://hdwallpaperia.com/wp-content/uploads/2013/10/Starry-Nights-Wallpaper.jpg'
    },
    cloudy: {
        icon: 'wi-cloudy',
        bg: 'http://www.kenrockwell.com/leica/images/m9/examples/2009-10-general/L1001326.JPG'
    },
    flurries: {
        icon: 'wi-snowflake-cold',
        bg: 'https://johnferebeephotography.files.wordpress.com/2012/10/snow-flurries-1-of-1.jpg'
    },
    fog: {
        icon: 'wi-fog',
        bg: 'https://uwana.files.wordpress.com/2013/01/fog.jpg'
    },
    hazy: {
        icon: 'w-day-haze',
        bg: 'http://wallpapersinhq.online/images/big/hazy_sail-802984.jpg'
    },
    mostlycloudy: {
        icon: 'wi-cloud',
        bg: 'http://retouchthesky.com/wp-content/uploads/2014/08/IMG_4954.jpg'
    },
    partlycloudy: {
        icon: 'wi-day-cloudy',
        bg: 'http://www.detaildesignonline.com/contentimages/IMG_5274.jpg'
    },
    nt_haze: {
        icon: 'wi-night-fog',
        bg: 'https://journeywithparkinsons.files.wordpress.com/2015/06/purple-haze-on-the-rocks-221584.jpg'
    },
    nt_partlycloudy: {
        icon: 'wi-night-partly-cloudy',
        bg: 'https://zeedub93.files.wordpress.com/2010/12/night_moon.jpg'
    },
    tstorms: {
        icon: 'wi-thunderstorm',
        bg: 'http://img.mota.ru/upload/wallpapers/source/2012/07/25/11/02/31766/mota_ru_2072502.jpg'
    },
    snow: {
        icon: 'wi-snow',
        bg: 'http://www.johnwelchent.com/files/7013/9542/5054/snow.jpg'
    },
    sleet: {
        icon: 'wi-sleet',
        bg: 'http://www.usnews.com/cmsmedia/a2/b4/7be962524d9980a91ee695c5d1ba/141117-oregonsnow-editorial.jpg'
    },
    rain: {
        icon: 'wi-rain',
        bg: 'http://images2.fanpop.com/image/photos/8500000/rain-rain-8578006-2000-1247.jpg'
    },
    partlysunny: {
        icon: 'wi-day-cloudy-high',
        bg: 'http://3.bp.blogspot.com/-eGc_fQan_aM/Uxo0NiwtnUI/AAAAAAAAPQY/GbpmNaDpaFE/s1600/DSCN1770.JPG'
    },
    mostlysunny: {
        icon: 'wi-day-sunny-overcast',
        bg: 'http://www.nationalweatherstation.com/wp-content/uploads/2015/05/sunny-day-landscape.jpg'
    },

}

var autoWeatherLoc = "";
var getWeatherLoc = "";
var weatherData = "";

function parsed_json();

function getWeatherData() {
    if (getWeatherLoc != "") {
        $.ajax({
            url: apiBaseURL + getWeatherLoc + ".json",
            datatype: 'json',
            success: weatherData = parsed_json;
        })
    } else {
        $.ajax({
            url: apiBaseURL + autoWeatherLoc + ".json",
            datatype: 'json',
            success: weatherData = parsed_json;
        })
    }
}


function getLocation() {

    navigator.geolocation.getCurrentPosition(data);

    autoWeatherLoc = data.coords.latitude + ',' + data.coords.longitude;
}

$(document).ready(function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            /* Get Location */
            $.ajax({
                url: "https://api.wunderground.com/api/f7adc2272a36f454/geolookup/conditions/forecast10day/astronomy/q/" + position.coords.latitude + "," + position.coords.longitude + ".json",
                datatype: 'json',
                success: function (parsed_json) {
                    city = parsed_json['location']['city'];
                    state = parsed_json['location']['state'];
                    country = parsed_json['location']['country_iso3166'];

                    $(".current-city").html(city + ", " + state + ", " + country);

                    /* Get Time */
                    time = parsed_json['forecast']['txt_forecast']['date'];
                    day = parsed_json['forecast']['simpleforecast']['forecastday'][6]['date']['weekday'];
                    moonIllum = parsed_json['moon_phase']['percentIlluminated'];
                    moonPhase = parsed_json['moon_phase']['phaseofMoon'];
                    sunriseHour = parsed_json['moon_phase']['sunrise']['hour'];
                    sunriseMin = parsed_json['moon_phase']['sunrise']['minute'];
                    sunsetHour = parsed_json['moon_phase']['sunset']['hour'] - 12;
                    sunsetMin = parsed_json['moon_phase']['sunset']['minute'];

                    $(".current-time").html(day + ", " + time);
                    $(".moon").html(moonIllum + "% " + moonPhase);
                    $(".sunrise").html(sunriseHour + ":" + sunriseMin + " AM");
                    $(".sunset").html(sunsetHour + ":" + sunsetMin + " PM");
                    /* Get Current Weather Condition */

                    obsCountry = parsed_json["current_observation"]["observation_location"]["country"];
                    windDir = parsed_json["current_observation"]["wind_dir"]
                    cond = parsed_json['current_observation']['weather'];
                    humid = parsed_json['current_observation']['relative_humidity'];
                    icon = parsed_json['current_observation']['icon']
                    if (obsCountry != "US") {
                        temp = parsed_json["current_observation"]["temp_c"];
                        windSpd = parsed_json['current_observation']['wind_kph'];
                        precip = parsed_json['current_observation']['precip_today_metric'];
                        $('.precip').html(precip + " mm");
                        $('.wind').html(windSpd + " kph, " + windDir);
                        $('.current-temp').html(temp + "<span><i class='wi wi-celsius degrees'></i></span>");
                    } else {
                        temp = parsed_json["current_observation"]["temp_f"];
                        windSpd = parsed_json['current_observation']['wind_mph'];
                        precip = parsed_json['current_observation']['precip_today_in'];
                        $('.precip').html(precip + " in");
                        $('.wind').html(windSpd + " mph, " + windDir);
                        $('.current-temp').html(temp + "<span><i class='wi wi-fahrenheit degrees'></i></span>");
                    }
                    $('.current-cond').html(cond);
                    $('.humid').html(humid);

                    /* Update Current Icon and Background */



                    $(".current-icon").html(`<i class="wi ${iconImageMap[icon].icon}"></i>`);
                    $(".body").css("background", `url(${iconImageMap[icon].bg}) no-repeat center center fixed`);

                    /* Get 6-Day Forecast */

                    for (var i = 0; i < 6; i++) {
                        var day = parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday_short'];
                        $(".day" + i).html(day);

                    }

                    for (var i = 0; i < 6; i++) {
                        if (country != 'US') {
                            dayHigh = parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius'];
                            dayLow = parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['celsius'];
                        } else {
                            dayHigh = parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['fahrenheit'];
                            dayLow = parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['fahrenheit'];
                        }

                        $(".day-" + i + "-temp").html(dayHigh + "<i class='wi wi-degrees'></i> | " + dayLow + "<i class='wi wi-degrees'></i>");
                    }

                    for (var i = 0; i < 6; i++) {
                        var dayCond = parsed_json['forecast']['simpleforecast']['forecastday'][i]['conditions']
                        $(".day-" + i + "-cond").html(dayCond);
                    }


                    /* Change Forecast Icon */

                    for (var i = 0; i < 6; i++) {
                        var foreIcon = parsed_json['forecast']['simpleforecast']['forecastday'][i]['icon'];
                        $(".day-" + i + "-icon").html("<i class='wi " + iconImageMap[foreIcon].icon + " forecast-icon'></i>");
                    }
                }
            });
        });
    }

});
