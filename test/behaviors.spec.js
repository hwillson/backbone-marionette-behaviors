/*global describe, it, expect, $, document, _, sinon, beforeEach, afterEach, Marionette, window*/
'use strict';

var $body = $(document.body);

var setFixtures = function () {
  _.each(arguments, function (content) {
    $body.append(content);
  });
};

var clearFixtures = function () {
  $body.empty();
};

describe('Behaviors', function () {

  beforeEach(function () {

    this.sinon = sinon.sandbox.create();

    Marionette.Behaviors.behaviorsLookup = function () {
      return window.Behaviors;
    };

  });

  afterEach(function () {
    this.sinon.restore();
    clearFixtures();
  });

  describe('NewWindow', function () {

    beforeEach(function () {

      var TestView;

      setFixtures(
        '<scripts type="text/template" id="test-new-window">'
          + '<a href="http://google.com" id="test-link1" class="js-new-window">'
          + 'Test link 1'
          + '</a>'
          + '<a href="http://google.com" id="test-link2">'
          + 'Test link 2'
          + '</a>'
      );

      TestView = Marionette.ItemView.extend({
        template: '#test-new-window',
        behaviors: {
          NewWindow: {}
        }
      });
      this.testView = new TestView();

    });

    it(
      'should open a new window/tab when ".js-new-window" is clicked',
      function () {
        var stub = this.sinon.stub(window, 'open');
        this.testView.render();
        this.testView.$('#test-link1').click();
        expect(stub.callCount).to.equal(1);
        expect(stub.args[0][0]).to.equal('http://google.com');
        expect(stub.args[0][1]).to.equal('_blank');
      }
    );

    it(
      'should not open a new window/tab when a link is clicked without the ".js-new-window" selector',
      function () {
        var stub = this.sinon.stub(window, 'open');
        this.testView.render();
        this.testView.$('#test-link2').click();
        expect(stub.callCount).to.equal(0);
      }
    );

  });

  describe('ReloadWindow', function () {

    beforeEach(function () {

      var TestView;

      setFixtures(
        '<scripts type="text/template" id="test-reload-window">'
          + '<a href="#" id="test-link1" class="js-reload-window">'
          + 'Test link 1'
          + '</a>'
          + '<a href="#" id="test-link2">'
          + 'Test link 2'
          + '</a>'
      );

      TestView = Marionette.ItemView.extend({
        template: '#test-reload-window',
        behaviors: {
          ReloadWindow: {}
        }
      });
      this.testView = new TestView();

    });

    it(
      'should reload the current browser window/tab when ".js-reload-window" is clicked',
      function () {
        var stub = this.sinon.stub(window.location, 'reload');
        this.testView.render();
        this.testView.$('#test-link1').click();
        expect(stub.callCount).to.equal(1);
      }
    );

    it(
      'should not reload the current browser window/tab when a link is clicked that does not have the ".js-reload-window" selector',
      function () {
        var stub = this.sinon.stub(window.location, 'reload');
        this.testView.render();
        this.testView.$('#test-link2').click();
        expect(stub.callCount).to.equal(0);
      }
    );

  });

});
