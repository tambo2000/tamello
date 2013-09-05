T.Collections.Lists = Backbone.Collection.extend({
	model: T.Models.List,
	url: function() {
		return "/boards/" + this.board_id + "/lists"
	}
});