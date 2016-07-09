'use strict';

var LineBreaker = require('linebreak');

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var _cache = {};

function getCacheKey(text, width, fontSize, lineHeight) {
  return text + width + fontSize + lineHeight;
}

/**
 * Given a string of text, available width, return the measured width
 * and height.
 * @param {String} text The input string
 * @param {Number} width The available width
 * @param {Number} fontSize The font size in CSS pixels
 * @param {Number} lineHeight The line height in CSS pixels
 * @return {Object} Measured text size with `width` and `height` members.
 */
module.exports = function measureText(text, width, fontSize, lineHeight) {
  var cacheKey = getCacheKey(text, width, fontSize, lineHeight);
  var cached = _cache[cacheKey];
  if (cached) {
    return cached;
  }

  var measuredSize = {};
  var textMetrics;
  var lastMeasuredWidth;
  var words;
  var tryLine;
  var currentLine;
  var breaker;
  var bk;
  var lastBreak;

  ctx.font = fontSize + 'px sans-serif';
  textMetrics = ctx.measureText(text);

  measuredSize.width = textMetrics.width;
  measuredSize.height = lineHeight;
  measuredSize.lines = [];

  if (measuredSize.width <= width) {
    // The entire text string fits.
    measuredSize.lines.push({
      width: measuredSize.width,
      text: text
    });
  } else {
    // Break into multiple lines.
    measuredSize.width = width;
    currentLine = '';
    breaker = new LineBreaker(text);

    while (bk = breaker.nextBreak()) {
      var word = text.slice(lastBreak ? lastBreak.position : 0, bk.position);

      tryLine = currentLine + word;
      textMetrics = ctx.measureText(tryLine);
      if (textMetrics.width > width || (lastBreak && lastBreak.required)) {
        measuredSize.height += lineHeight;
        measuredSize.lines.push({
          width: lastMeasuredWidth,
          text: currentLine.trim()
        });
        currentLine = word;
        lastMeasuredWidth = ctx.measureText(currentLine.trim()).width;
      } else {
        currentLine = tryLine;
        lastMeasuredWidth = textMetrics.width;
      }

      lastBreak = bk;
    }

    currentLine = currentLine.trim();
    if (currentLine.length > 0) {
      textMetrics = ctx.measureText(currentLine);
      measuredSize.lines.push({
        width: textMetrics,
        text: currentLine
      });
    }
  }

  _cache[cacheKey] = measuredSize;

  return measuredSize;
};