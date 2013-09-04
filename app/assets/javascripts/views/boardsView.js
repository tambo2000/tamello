T.Views.BoardRowView = Backbone.View.extend({

	className: "boardRow",

	initialize: function() {
		this.listenTo(this.model, 'change', this.render());
	},

	events: {
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

});

T.Views.BoardView = Backbone.View.extend({

	render: function() {
		var that = this;

		var renderedContent = JST["boards/boardShow"]({
			board: that.model
		});

		that.$el.html(renderedContent);
    return that;
	}

});