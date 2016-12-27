'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const inquirer = require('inquirer');

const baseUrl = "http://www.liburnasional.com/kalender-2017/";

var holidays = [];
var years = []

axios.get(baseUrl).then(res => {
    var $ = cheerio.load(res.data);
    // get data
    $('.libnas-calendar-holiday-title').each(function(x, y) {
        holidays.push({
            day     : y.children[1].children[0].data,
            date    : y.children[2].children[0].data,
            title   : y.children[0].children[0].children[0].children[0].data,
        });
    });
    return holidays;
}).then(holidays => {
    var currentYear = new Date().getFullYear(); //get current Year

    // get lists years, five years from current year
    for (var i = 0; i < 5; i++) {
        var temp = currentYear+i;
        years.push(temp.toString());
    }

    return inquirer.prompt([{
        type    : "list",
        name    : "data",
        message : "Pilih Tahun: ",
        choices : years
    }]);
}).then(answer => {
    // console.log("ntak");
});
