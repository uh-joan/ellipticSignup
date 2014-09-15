'use strict';

angular.module('users').directive('match', [
	function() {
		return {
            require :'ngModel',
            scope :{
                match: '='
            },
			restrict: 'A',
			link: function (scope, elem, attrs, ctrl) {
				scope.$watch(function(){
                    var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
                    return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.match === modelValue;
                }, function (currentValue){
                    ctrl.$setValidity('match', currentValue);
                });
			}
		};
	}
]);