/* This example illustrates how to delegate the rendering of a Model to a dedicated View. 
and how to tie changes in those to a View. */

(function($){
	var Item = Backbone.Model.extend({
		defaults: {
			part1: 'Hello',
			part2: 'world'
		}
	});
	
	var List = Backbone.Collection.extend({
		model: Item
	});
	
	var ItemView = Backbone.View.extend ({
		tagName: 'li', //name of (orphan) root tag in this el
		initialize: function() {
			_.bindAll(this, 'render'); //every function that uses 'this' as the current object should be in here
		},
		render: function() {
			$(this.el).html('<span>' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span>');
			return this; //for chainable calls, like .render.el
		}  
	});
		
	// **ListView class**: Our main app view.
	var ListView = Backbone.View.extend({
		el: $('body'), // attaches `this.el` to an existing element.
		
		events: {
			'click button#add': 'addItem'
	},
	
	/*/ `initialize()`: Automatically called upon instantiation. 
		Where you make all types of bindings, _excluding_ UI events, 
		such as clicks, etc.*/
    initialize: function(){
		// fixes loss of context for 'this' within methods
		_.bindAll(this, 'render', 'addItem', 'appendItem'); 
		
		//every function that uses 'this' as the current method goes in here
		this.collection = new List;
		this.collection.bind('add', this.appendItem); //collection event binder
		this.counter = 0; //total # of items added thus far
		this.render(); // not all views are self-rendering. This one is.
    },
    // `render()`: Function in charge of rendering the entire view in `this.el`. Needs to be manually called by the user.
    render: function(){
		var self = this;
		$(this.el).append('<button id="add">Add list item</button>');
		$(this.el).append('<ul></ul>');
		_(this.collection.models).each(function(item){ // in case collection is not empty
		  self.append(item);
		}, this);
    },
	
	addItem: function() {
		this.counter++;
		var item = new Item();
		item.set({
			part2: item.get('part2') + this.counter //modify item defaults
		});
		this.collection.add(item);  // add item to collection; view is updated via event 'add'
	},
	
	appendItem: function(item) {
		var itemView = new ItemView({
			model: item
		});
		$('ul', this.el).append(itemView.render().el);
		}
   });

  // **listView instance**: Instantiate main app view.
  var listView = new ListView();
})(jQuery);