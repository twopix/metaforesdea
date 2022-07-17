const i18n = require('eleventy-plugin-i18n');
const translations = require('./_data/i18n');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const util = require('util');
const { DateTime } = require("luxon");


module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'gr'
    }
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  // get curront year 
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // get filename
  eleventyConfig.addFilter("getExt",(path)=>{
    return path.split('.').pop();
  });

  // filter for dates
  eleventyConfig.addFilter("postDate", (dateObj, locales) => {
    return DateTime.fromJSDate(dateObj).setLocale(locales).toLocaleString(DateTime.DATE_MED);
  });

  // filter for dates
  eleventyConfig.addFilter("postDateFormat", (dateObj, locales, format) => {
    return DateTime.fromJSDate(dateObj).setLocale(locales).toFormat(format);
  });

  // date filter (localized) date
  eleventyConfig.addNunjucksFilter("date", function (date, format, locale) {
    locale = locale ? locale : "en";
    moment.locale(locale);
    return moment(date).format(format);
  });

  // return collections of posts filtered by post_type
  eleventyConfig.addFilter('filteredByPost_type', function(collection, post_type, locale) {
    if (!post_type) return collection;
      const filtered = collection.filter(item => item.data.post_type == post_type && item.data.locale==locale)
      return filtered;
  });

  // return collections of posts filtered by lang
  eleventyConfig.addFilter('filteredByLang', function(collection, locale) {
    if (!locale) return collection;
      const filtered = collection.filter(item => item.data.locale==locale)
      return filtered;
  });

  // ------------ debug -----------
  // for debuging / may close after
  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
    debugger;
  });
  // debug 2
  eleventyConfig.addFilter('console', function(value) {
    const str = util.inspect(value);
    return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
  });
  // debug 3
  eleventyConfig.addFilter('dump', obj => {
    const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

    return JSON.stringify(obj, getCircularReplacer(), 4);
  });



  return {};
};

