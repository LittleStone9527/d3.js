'use strict';

describe('Directive: axis', function () {

  // load the directive's module
  beforeEach(module('d3jsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<axis></axis>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the axis directive');
  }));
});
