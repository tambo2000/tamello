T.Views.List = Backbone.View.extend({

	tagName: "td",

	id: function() {
		return "" + this.model.id;
	},

	initialize: function() {
		//this.listenTo(this.model, 'change', this.render());
	},

	events: {
		"submit form#new_card_form": "createCard"
	},

	render: function() {
		var that = this;

		var renderedContent = JST["lists/list"]({
			list: that.model
		});

    that.$el.html(renderedContent);

    var cards = new T.Collections.Cards;
  	cards.list_id = that.model.id
  	cards.fetch({
  		success: function(resp) {
  			that.$("div.cards" + that.model.id).empty();
  			cards.each(function(card) {
  				var cardView = new T.Views.Card({
  					model: card
  				})
  				that.$("div.cards" + that.model.id).append(cardView.render().$el);
  			})
  			that.$("div.cards" + that.model.id).append($("<div style='height:10px; bottom:0;'><div>"));

        that.$("div.cards" + that.model.id).sortable({
          connectWith: ".connectedListSortable",
          revert: 200
        });
  		},
  		error: function(resp) {
  			console.log("bad cards fetch");
  		}
  	});

    return that;
	},

	createCard: function (event) {
    var that = this;

    var formData = $(event.currentTarget).serializeJSON();
    
    var card = new T.Models.Card(formData.card);
    
    card.save();

    //Backbone.history.navigate("#boards/" + that.model.get("board_id"));
  }
});


