#!/usr/bin/env node
/*jslint node: true */
/*jshint esversion: 6 */

'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const inquirer = require('inquirer');
const Table = require('cli-table');
const colors = require('colors');

const baseUrl     = "http://www.liburnasional.com/";

axios.get(baseUrl).then(response => {
    var $ = cheerio.load(response.data);
    var sources = $('.dropdown-menu').eq(0).children().children();
    var years = [];

    sources.each(function(x, y) {
        years.push({name: y.children[0].data, link: y.attribs.href});
    });

    // value : "Liburan Nasional 2012"
    return inquirer.prompt([{
        type    : "list",
        name    : "years",
        message : "Pilih Tahun: ",
        choices : years
    }]);
}).then(answer => {
    // get year from answer

    var year = answer.years.split(" ");
    return year[year.length - 1];
}).then(year => {
    let subUrl   = "http://www.liburnasional.com/kalender-";
    let url         = subUrl+year+"/";

    // get data u need
    axios.get(url).then(res => {
        var $ = cheerio.load(res.data);
        var holidays = [];

        $('.libnas-calendar-holiday-title').each(function(x, y) {
            holidays.push({
                day     : y.children[1].children[0].data,
                date    : y.children[2].children[0].data,
                title   : y.children[0].children[0].children[0].children[0].data
            });
        });

        return holidays;
    }).then(holidays => {
        var table = new Table({
             head: ['Tanggal', 'Hari', 'Acara']
        });

        // push value to table
        holidays.forEach(x=> {
            table.push([x.date, x.day, x.title]);
        });

        console.log(colors.cyan(table.toString()));
    });
});
