/**
 * Created by Danny Schreiber on 2/9/2015.
 */

angular.module('ram.ui.modal', [
	'ram.ui.modal.service',
	'ram.ui.modal.directive',
	'ui.bootstrap'
]);
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






/**
 * Created by Danny Schreiber on 2/9/2015.
 */
angular.module('ram.ui.modal.service', ['ui.bootstrap'])
/**
 * @class DialogsService
 * @classdesc This service allows for the programmatic creation of dialogs and leverages the modal functionality from the Angular Bootstrap library.
 */
	.provider('DialogService',[function(){
		var b = true; // backdrop
		var k = true; // keyboard
		var w = 'modal-dialog'; // windowClass
		var copy = true; // controls use of angular.copy

		/**
		 * Sets the use of the modal backdrop.  Either to have one or not and
		 * whether or not it responds to mouse clicks ('static' sets the
		 * backdrop to true and does not respond to mouse clicks).
		 *
		 * @param  {mixed} val   (true, false, 'static')
		 * @memberOf DialogsService
		 */
		this.useBackdrop = function(val){
			if(angular.isDefined(val))
				b = val;
		};

		/**
		 * Sets the use of the ESC (escape) key to close modal windows.
		 *
		 * @param  {boolean} val
		 * @memberOf DialogsService
		 */
		this.useEscClose = function(val){ // possible values : true, false
			if(angular.isDefined(val))
				k = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
		}; // end useESCClose

		/**
		 * Sets the additional CSS window class of the modal window template.
		 *
		 * @param  {string} val
		 * @memberOf DialogsService
		 */
		this.useClass = function(val){
			if(angular.isDefined(val))
				w = val;
		}; // end useClass

		/**
		 * Determines the use of angular.copy when sending data to the modal controller.
		 *
		 * @param  {boolean} val
		 * @memberOf DialogsService
		 */
		this.useCopy = function(val){
			if(angular.isDefined(val))
				copy = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
		};


		this.$get = ['$modal',function ($modal){
			return {

				/**
				 * Creates a custom modal.
				 * @param {string} url Path to the modal template
				 * @param {string} ctrlr Controller to be injected into the dialog service
				 * @param {object} data optional data object to be passed into the resolve and accessible from the dialog service and the modal's controller
				 * @param {string} cssClass optional css class to apply to the dialog window
				 * @param {mixed} backDrop optional flag that sets the dialog back drop
				 * @param {boolean} escKey optional flag to allow the esc key to close the modal
				 * @returns {*} an instance of $modal
				 * @memberOf DialogsService
				 */
				create : function(url, ctrlr, data, cssClass, backDrop, escKey){
					this.useBackdrop(backDrop);
					this.useEscClose(escKey);
					this.useClass(cssClass);

					return $modal.open({
						templateUrl : url,
						controller : ctrlr,
						keyboard : k,
						backdrop : b,
						windowClass: w,
						resolve : {
							data : function() {
								if(copy){
									return angular.copy(data);
								}
								else
									return data;
							}
						}
					});
				}
			};
		}];
	}])
	.value("defaultStrings",{
		error: "Error",
		errorMessage: "An unknown error has occurred.",
		close: "Close",
		ok: "OK",
		yes: "Yes",
		no: "No",
		cancel: "Cancel",
		save: "Save",
		saveReturn: "Save and Return"
	});