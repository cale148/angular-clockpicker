angular.module('angular-clock-picker-example', ['angular-clock-picker'])
  .controller('ClockPickerTestController', function ($scope) {
    $scope.time = new Date()
  });