'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const inquirer = require('inquirer');

const listYears     = "http://www.liburnasional.com/";
const holidaysUrl   = "http://www.liburnasional.com/kalender-";

var holidays = [];

axios.get(listYears).then(res => {
    var $ = cheerio.load(res.data);
    var root = $('.dropdown-menu').eq(0).children().children();
    var years = [];

    root.each(function(x, y) {
        years.push({name: y.children[0].data, link: y.attribs.href});
    });

    return inquirer.prompt([{
        type    : "list",
        name    : "years",
        message : "Pilih Tahun: ",
        choices : years
    }]);
}).then(answer => {
    var year = answer.years.split(" ");
    return year[year.length - 1];
});
