T.Views.BoardRowView = Backbone.View.extend({

	className: "boardRow",

	initialize: function() {
		//var that = this;
		// var favorites = new Gist.Collections.Favorites;
		// favorites.fetch( {success: function() {
		// 	console.log(favorites);
		// }});

		this.listenTo(this.model, 'change', this.render());
		//this.listenTo(favorites, 'change', this.render());
	},

	events: {
		// "click input.favorite": "favoriteGist",
		// "click input.unfavorite": "unFavoriteGist"
	},

	render: function() {
		var that = this;

		var renderedContent = JST["boards/boardRow"]({
			board: that.model
		});

    that.$el.html(renderedContent);
    return that;
	}
});


T.Views.BoardsIndexView = Backbone.View.extend({

	events: {
		"submit form#new_board_form": "createBoard"
	},

	render: function() {
		var that = this;

		var renderedContent = JST["boards/boardsIndex"]();

		// var b = new T.Models.Board();
		// var form = new Backbone.Form({ model: b });
		// form.render();
		// console.log(form.el);

		that.$el.html(renderedContent);

		that.collection.each(function (board) {
			var boardRowView = new T.Views.BoardRowView({
      	model: board
    	});
			that.$("div.boardList").append(boardRowView.render().$el);
    });

		return that
	},

	createBoard: function (event) {
    var that = this;

    var formData = $(event.currentTarget).serializeJSON();
    
    var board = new T.Models.Board(formData.board);
    board.save();
  }

})