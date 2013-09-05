T.Routers.BoardsRouter = Backbone.Router.extend({
	initialize: function ($rootEl, boards) {
    this.$rootEl = $rootEl;
    this.boards = boards;
  },

  routes: {
    "": "index",
    "boards/:id": "show",
    "lists/:id/newcard": "createCard"
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

    board = that.boards.get(id);

    var boardView = new T.Views.BoardView({
      model: board
    });

    $("div.tamello").html(boardView.render(id).$el);
  }

  // createCard: function (id) {
  //   alert(id);
  //   var that = this;


  // }

});