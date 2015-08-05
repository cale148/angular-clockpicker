'use strict';
angular.module('angular-clock-picker', [])
  .directive('analogClock', function () {
    return {
      templateUrl: '/template/clockpicker.html',
      restrict: 'E',
      scope: {
        ngModel: '='
      },
      link: function postLink (scope) {
        if (!scope.ngModel) {
          scope.ngModel = new Date();
        }
        scope.clock = {
          arrow: 'hr',
          values: {
            hr: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
            min: [15, 20, 25, 30, 35, 40, 45, 50, 55, '00', '05', 10]
          }
        }

        scope.$watch('ngModel.getTime()', function () {
          var hr = scope.ngModel.getHours() % 12 || 12
          var min = Math.round(scope.ngModel.getMinutes() / 5) * 5

          scope.clock.meridiem = scope.ngModel.getHours() < 12 ? 'am' : 'pm'

          scope.clock.hr = scope.clock.values.hr.indexOf(hr)
          if (min < 10) {
            min = '0' + min
          }
          scope.clock.min = scope.clock.values.min.indexOf(min)
        })

        scope.$watch('clock.min', function (val) {
          scope.ngModel.setMinutes(parseInt(scope.clock.values.min[val]))
        })
        scope.$watch('clock.hr + clock.meridiem', function () {
          var hr = parseInt(scope.clock.values.hr[scope.clock.hr])
          if ('pm' === scope.clock.meridiem) {
            hr += 12
            if (24 === hr) {
              hr = 12
            }
          } else if (12 === hr) {
            hr = 0
          }
          scope.ngModel.setHours(hr)
        })
      }
    }
  });

