T.Views.List = Backbone.View.extend({

	className: "list",

	events: {
		"submit form#new_card_form": "createCard"
	},

	render: function() {
		var that = this;

		var renderedContent = JST["lists/list"]({
			list: that.model
		});

    that.$el.html(renderedContent);
    return that;
	},

	createCard: function (event) {
    var that = this;

    var formData = $(event.currentTarget).serializeJSON();
    
    var card = new T.Models.Card(formData.card);

    card.save();
  }
});

T.Views.Lists = Backbone.View.extend({

	className: "lists",

	events: {
	},

	render: function() {
		var that = this;

		that.collection.each(function (list) {
			var listView = new T.Views.List({
      	model: list
    	});
			that.$el.append(listView.render().$el);

			var cards = new T.Collections.Cards;
    	cards.list_id = list.id
    	cards.fetch({
    		success: function(resp) {
    			console.log("succesful cards fetch");
    			console.log(resp);
    			cards.each(function(card) {
    				var cardView = new T.Views.Card({
    					model: card
    				})
    				that.$("div.cards" + list.id).append(cardView.render().$el);
    			})
    		},
    		error: function(resp) {
    			console.log("bad cards fetch");
    		}
    	});
    });

     

    return that;
	}
});

