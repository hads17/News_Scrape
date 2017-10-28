var express = require("express");
var app = express();
var cheerio = require("cheerio");
var request = require("request");
var db = require("../models/article.js");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        console.log("hello");
        request("https://www.nytimes.com/", function (error, response, html) {
            if (error) throw error;
            // console.log(response);
            // console.log(html)

            var $ = cheerio.load(html);

            $(".story").each(function (i, element) {
                // Save the text and href of each link enclosed in the current element
                console.log(element);
                var headline = $(element).children("h2").text();
                var summary = $(element).find($(".summary")).text();
                var URL = $(element).find("h2 a").attr("href");

                // If this found element had both a title and a link
                if (headline && summary && URL) {
                    // Insert the data in the scrapedData db
                    db.article.insert({
                            headline: title,
                            summary: summary,
                            URL: URL,
                        },
                        function (err, inserted) {
                            if (err) {
                                // Log the error if one is encountered during the query
                                console.log(err);
                            } else {
                                // Otherwise, log the inserted data
                                console.log(inserted);
                            }
                        });
                }
            });
        });
        res.redirect("/");
    });
}