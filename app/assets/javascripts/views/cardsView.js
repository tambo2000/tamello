T.Views.Card = Backbone.View.extend({

	className: "card",

	events: {
		// "submit form#new_card_form": "createCard"
	},

	render: function() {
		var that = this;

		var renderedContent = JST["cards/card"]({
			card: that.model
		});

    that.$el.html(renderedContent);
    return that;
	}
});

// T.Views.Cards = Backbone.View.extend({

// 	className: "cards",

// 	events: {
// 	},

// 	render: function() {
// 		var that = this;

// 		that.collection.each(function (card) {
// 			var cardView = new T.Views.Card({
//       	        model: card
//     	    });
// 			that.$el.append(cardView.render().$el);

// 			var cards = new T.Collections.Cards;
//     	    cards.list_id = list.id
//     	    cards.fetch({
//         		success: function(resp) {
//         			console.log("succesful cards fetch");
//         			console.log(resp);
//         		},
//         		error: function(resp) {
//         			console.log("bad cards fetch");
//         		}
//         	});
//         });

//     return that;
// 	}
// });

