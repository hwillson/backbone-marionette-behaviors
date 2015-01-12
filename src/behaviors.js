/*global window, Marionette, $*/
'use strict';

// backbone-marionette-behaviors
// -----------------------------
// v0.0.1
//
// Copyright (c)2015 Hugh Willson, Octonary Inc.
// Distributed under MIT license
//
// https://github.com/hwillson/backbone-marionette-behaviors

(function (window, Marionette, $) {

  var Behaviors = {};

  /**
   * Open ".js-new-window" links in a new browser window.
   */
  Behaviors.NewWindow = Marionette.Behavior.extend({

    events: {
      'click .js-new-window': 'newWindow'
    },

    newWindow: function (e) {
      window.open($(e.target).attr('href'), '_blank');
    }

  });

  /**
   * Reload the browser window when ".js-reload" is clicked.
   */
  Behaviors.ReloadWindow = Marionette.Behavior.extend({

    events: {
      'click .js-reload-window': 'reloadWindow'
    },

    reloadWindow: function (e) {
      e.preventDefault();
      window.location.reload();
    }

  });

  window.Behaviors = Behaviors;

}(window, Marionette, $));
