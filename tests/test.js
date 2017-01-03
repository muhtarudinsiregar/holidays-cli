/*jshint esversion: 6 */
const assert = require('assert');
const axios = require('axios');
const cheerio = require('cheerio');


describe('result crawling', function() {
    it('should return "Libur Nasional 2013" when the index array 0', function() {
        const listYears     = "http://www.liburnasional.com/";
        return axios.get(listYears).then(res => {
            var $ = cheerio.load(res.data);
            var root = $('.dropdown-menu').eq(0).children().children();
            var years = [];

            root.each(function(x, y) {
                years.push({name: y.children[0].data, link: y.attribs.href});
            });
            return years;
        }).then(function(years) {
            assert.equal(years[0].name, "Libur Nasional 2013");
        });
    });

    it('should return "Minggu", "1 Januari 2013","Tahun Baru Masehi"', function() {
        var holidays = [];

        return axios.get("http://www.liburnasional.com/kalender-2017/").then(res => {
            var $ = cheerio.load(res.data);
            $('.libnas-calendar-holiday-title').each(function(x, y) {
                holidays.push({
                    day     : y.children[1].children[0].data,
                    date    : y.children[2].children[0].data,
                    title   : y.children[0].children[0].children[0].children[0].data,
                });
            });

            return holidays;
        }).then(function(holidays) {
            assert.equal(holidays[0].day, "Minggu");
            assert.equal(holidays[0].date, "1 Januari 2017");
            assert.equal(holidays[0].title, "Tahun Baru Masehi");
        });
    });
});
