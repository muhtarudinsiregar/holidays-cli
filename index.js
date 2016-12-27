'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = "http://www.liburnasional.com/kalender-2017/";

var holidays = [];

axios.get(baseUrl).then(res => {
    var $ = cheerio.load(res.data);
    // get datemont
    // return [ { date: '1 Januari 2017', ... }],
    $(".libnas-calendar-holiday-datemonth").each(function(x, y) {
        holidays.push({
            date: y.children[0].data
        });
        return holidays;
    });
});
