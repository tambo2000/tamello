T.Collections.Comments = Backbone.Collection.extend({
	model: T.Models.Comment,
	url: function() {
		return "/cards/" + this.card_id + "/comments"
	},
	comparator: function(comment) {
			return comment.get("created_at");
	}
});