T.Routers.BoardsRouter = Backbone.Router.extend({
	initialize: function ($rootEl, boards) {
    this.$rootEl = $rootEl;
    this.boards = boards;
  },

  routes: {
    "": "index",
    "boards/:id": "show"
  },

  index: function () {
    var that = this;

    var boardsIndexView = new T.Views.BoardsIndexView({
      collection: that.boards
    });

    $("div.tamello").html(boardsIndexView.render().$el);
  },

  show: function (id) {
    var that = this;

    console.log(id);

    console.log(that.boards);

    board = that.boards.get(id);

    var boardView = new T.Views.BoardView({
      model: board
    });

    $("div.tamello").html(boardView.render().$el);
  }

});