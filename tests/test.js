/*jshint esversion: 6 */
const assert = require('assert');
const axios = require('axios');
const cheerio = require('cheerio');


describe('get list years', function() {
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
});
