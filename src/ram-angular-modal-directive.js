/**
 * Created by Danny Schreiber on 2/9/2015.
 */

(function(){

	var link = function(scope, element, attrs){
		var dialogProvider = element.injector().get('DialogsService');
		var templateFile = attrs.ramModal;
		var controller = attrs.modalController;
		scope.dialogModel = {
			header: 'Notification Settings'
		};
		element.bind('click', function(event){
			if(scope.onLoadModalAction)
				scope.$eval(scope.onLoadModalAction);
			var dialog = dialogProvider.create(templateFile, controller, scope.dialogModel);
			dialog.result.then(function(){
				if(scope.postSubmitAction){
					scope.$eval(scope.postSubmitAction);
				}
			}, function(){
				if(scope.postCancelAction){
					scope.$eval(scope.postCancelAction);
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





