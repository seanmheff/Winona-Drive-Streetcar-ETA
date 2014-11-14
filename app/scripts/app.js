'use strict';

/**
 * @ngdoc overview
 * @name ttcApp
 * @description
 * # ttcApp
 *
 * Main module of the application.
 */
angular
  .module('ttcApp', []);

String.prototype.toHHMMSS = function () {
  var secNum = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(secNum / 3600);
  var minutes = Math.floor((secNum - (hours * 3600)) / 60);
  var seconds = secNum - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = '0'+hours;}
  if (minutes < 10) {minutes = '0'+minutes;}
  if (seconds < 10) {seconds = '0'+seconds;}
  var time    = minutes+':'+seconds;
  return time;
};
