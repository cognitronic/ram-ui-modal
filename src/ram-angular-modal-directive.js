/**
 * Created by Danny Schreiber on 2/9/2015.
 */

(function(){

	var link = function(scope, element, attrs){
		var dialogProvider = element.injector().get('DialogsService');
		var templateFile = attrs.ccCustomModal;
		var controller = attrs.ccModalController;
		scope.dialogModel = {
			header: 'Notification Settings'
		};
		element.bind('click', function(event){
			if(scope.ccOnLoadModalAction)
				scope.$eval(scope.ccOnLoadModalAction);
			var dialog = dialogProvider.create(templateFile, controller, scope.dialogModel);
			dialog.result.then(function(){
				if(scope.ccPostSubmitAction){
					scope.$eval(scope.ccPostSubmitAction);
				}
			}, function(){
				if(scope.ccPostCancelAction){
					scope.$eval(scope.ccPostCancelAction);
				}
			});
		});

	};

	var ramModal = function(){
		return {
			restrict: 'A',
			link: link,
			scope: {
				postSubmitAction: '&',
				postCancelAction: '&',
				onLoadModalAction: '&'
			}
		};
	};

	angular.module('ram.ui.modal.directive', ['ram.ui.modal.service']).directive('ramModal', ramModal);
})();





