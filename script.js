(function($){
	
	//our model
	var Person = Backbone.Model.extend({
		defaults: {
			name: '',
			weight: -1,
			BP1: -1,
			BP2: -1
		}
	});
	
	//our collection
	var People = Backbone.Collection.extend({
		model: Person,
		localStorage: new Backbone.localStorage('people-store')
	});
	
	var people = new People(); //initialize everything
	
	var DM = new Person({
		name: 'Dennis',
		weight: 183,
		BP1: 141,
		BP2: 87
	});
	
	people.add(DM);
	
	DM.set('BP1', 138);
	

	//our view
	var ListView = Backbone.View.extend({
		//the DOM elem we bind this.el to - can be any valid CSS selector
		el: $('body'),
		
		events: {
			'click button#add': 'addItem',
			'click button#remove': 'removeItem'
		},
		
		//called when our list view is created
		initialize: function(){
			this.render();
		},
		
		render:function() {
			$('#list').append('<li>Hey</li>');
		},
		
		addItem: function() {
			$('#list').append('<li>Another one</li>');
		},
		removeItem: function() {
			$('#list li:last').remove();
		}
	});
		
	//creates the list view for the app
	var list = new ListView();
})(jQuery);

	//console.log(DM.get('BP1'));
	//console.log(people.get(DM).get('weight'));
	//document.write(DM.get('name'));