'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = "http://www.liburnasional.com/kalender-2017/";

var holidays = [];

axios.get(baseUrl).then(res => {
    var $ = cheerio.load(res.data);

    $('.libnas-calendar-holiday-title').each(function(x, y) {
        holidays.push({
            day     : y.children[1].children[0].data,
            date    : y.children[2].children[0].data,
            title   : y.children[0].children[0].children[0].children[0].data,
        });
    });
    return holidays
});
