'use strict';

$(document).ready(init);

function init() {
  $('#get-cams').click(clickGetCams);
  $('#nsa').click(clickNsa);
}

function clickNsa() {
  var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(pos) {
  var url = 'http://api.wunderground.com/api/aad218fcd659a15a/webcams/q/' + pos.coords.latitude + ',' + pos.coords.longitude + '.json';
  paint(url);
}

function error(err) {
  console.log('could not find position', err);
}

function clickGetCams() {
  var zipCode = $('#zip-code').val();
  var url = 'http://api.wunderground.com/api/aad218fcd659a15a/webcams/q/' + zipCode + '.json';
  paint(url);
}

function paint(url) {
  $.getJSON(url, function(response) {
    $('#images').empty();
    response.webcams.forEach(function(cam) {
      var $img = $('<div>');
      $img.addClass('image');
      $img.css('background-image', 'url("' + cam.CURRENTIMAGEURL + '")');
      $('#images').append($img);
    });
  });
}
