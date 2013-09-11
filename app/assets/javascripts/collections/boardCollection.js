T.Collections.Boards = Backbone.Collection.extend({
	model: T.Models.Board,
	url: "/boards",
	comparator: function(board) {
		return board.get("created_at");
	}
});