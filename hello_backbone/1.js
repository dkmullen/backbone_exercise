//1.js - This example illustrates the declaration and instantiation of a minimalist View.

(function($){

//ListView class: Our main app view.

  var ListView = Backbone.View.extend({
    el: $('body'), // attaches `this.el` to an existing element.

//initialize(): Automatically called upon instantiation. Where you make all types of bindings, excluding UI events, such as clicks, etc.

    initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

       this.render(); // not all views are self-rendering. This one is.
    },

//render(): Function in charge of rendering the entire view in this.el. Needs to be manually called by the user.

    render: function(){
      $(this.el).append("<ul> <li>hello world</li> </ul>");
    }
  });

  var listView = new ListView();
})(jQuery);