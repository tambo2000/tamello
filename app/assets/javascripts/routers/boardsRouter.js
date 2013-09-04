T.Routers.BoardsRouter = Backbone.Router.extend({
	initialize: function ($rootEl, boards) {
    this.$rootEl = $rootEl;
    this.boards = boards;
  },

  routes: {
    "": "index",
    "boards/create": "index",
    "boards/:id": "show"
  },

  index: function () {
    var that = this;

    var boardsIndexView = new T.Views.BoardsIndexView({
      collection: that.boards
    });

    that.$rootEl.html(boardsIndexView.render().$el);
  },

  show: function (id) {
    alert("I'm just getting warmed up!");
  },

  create: function () {
    alert("I will create");
  }
});