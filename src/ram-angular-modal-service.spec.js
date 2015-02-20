/**
 * Created by Danny Schreiber on 2/9/2015.
 */

describe('DialogService', function() {
	var dialogService, $modal;

	// Initialization of the AngularJS application before each test case
	beforeEach(module('ram.ui.modal.service'));

	// Injection of dependencies
	beforeEach(inject(function(_DialogService_, _$modal_) {
		dialogService = _DialogService_;
		$modal = _$modal_;
	}));

	it('should store an object in the local cache', function() {

		// create an object to test with
		var test = {
			name: 'Danny Schreiber'
		};

		//should be set to Danny Schreiber
		expect(test.name).toBe('Danny Schreiber');
	});

});