$(function () {
  'use strict';
  //links add active class
  $('.links li a').click(function (num){
      $(this).addClass('active').siblings().removeClass('active');
  });
});