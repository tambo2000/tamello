T.Collections.Cards = Backbone.Collection.extend({
	model: T.Models.Card,
	url: function() {
		return "/lists/" + this.list_id + "/cards"
	},
	comparator: function(card) {
			return card.get("position");
	}
});