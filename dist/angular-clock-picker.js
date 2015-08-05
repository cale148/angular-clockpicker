'use strict';
angular.module('angular-clock-picker', [])
  .directive('clockpicker', function () {
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


angular.module("angular-clock-picker").run(["$templateCache", function($templateCache) {$templateCache.put("/template/clockpicker.html","<div class=\"analog-clock-circle-container\">\n  <div class=\"analog-clock-circle-item\" ng-repeat=\"(index, value) in clock.values[clock.arrow]\">\n    <div class=\"analog-clock-circle-point\" ng-click=\"clock[clock.arrow] = index; clock.arrow = \'min\'\" ng-class=\"{\'analog-clock-circle-point_active\': index === clock[clock.arrow]}\">\n      {{value}}\n    </div>\n  </div>\n\n  <div class=\"analog-clock-circle-center\"></div>\n\n  <div class=\"analog-clock-arrow-hr\" ng-style=\"{ transform: \'rotate(\' + (clock.hr * 30) + \'deg)\' }\" ng-class=\"{\'analog-clock-arrow-hr_active\': \'hr\' === clock.arrow}\"></div>\n  <div class=\"analog-clock-arrow-min\" ng-style=\"{ transform: \'rotate(\' + (clock.min * 30) + \'deg)\' }\" ng-class=\"{\'analog-clock-arrow-min_active\': \'min\' === clock.arrow}\"></div>\n\n  <div class=\"analog-clock-am\" ng-click=\"clock.meridiem = \'am\'\" ng-class=\"{\'analog-clock-am_active\': \'am\' === clock.meridiem}\">AM</div>\n  <div class=\"analog-clock-pm\" ng-click=\"clock.meridiem = \'pm\'\" ng-class=\"{\'analog-clock-pm_active\': \'pm\' === clock.meridiem}\">PM</div>\n\n  <div class=\"analog-clock-hr\" ng-click=\"clock.arrow = \'hr\'\" ng-class=\"{\'analog-clock-hr_active\': \'hr\' === clock.arrow}\">Hr</div>\n  <div class=\"analog-clock-min\" ng-click=\"clock.arrow = \'min\'\" ng-class=\"{\'analog-clock-min_active\': \'min\' === clock.arrow}\">Min</div>\n</div>\n");}]);