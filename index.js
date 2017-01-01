#!/usr/bin/env node
/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const inquirer = require('inquirer');

const listYears     = "http://www.liburnasional.com/";

var holidays = [];

axios.get(listYears).then(res => {
    var $ = cheerio.load(res.data);
    var root = $('.dropdown-menu').eq(0).children().children();
    var years = [];

    root.each(function(x, y) {
        years.push({name: y.children[0].data, link: y.attribs.href});
    });

    // return selected
    // value : "Liburan Nasional 2012"
    return inquirer.prompt([{
        type    : "list",
        name    : "years",
        message : "Pilih Tahun: ",
        choices : years
    }]);
}).then(answer => {
    // get last word from answer/year
    // return : 2013
    var year = answer.years.split(" ");
    return year[year.length - 1];
}).then(year => {
    let url   = "http://www.liburnasional.com/kalender-";
    url         = url+year+"/";

    // get data u need
    axios.get(url).then(res => {
        var $ = cheerio.load(res.data);
        $('.libnas-calendar-holiday-title').each(function(x, y) {
            holidays.push({
                day     : y.children[1].children[0].data,
                date    : y.children[2].children[0].data,
                title   : y.children[0].children[0].children[0].children[0].data,
            });
        });

        return holidays;
    }).then(holidays => {
        console.log(holidays);
    });
});
