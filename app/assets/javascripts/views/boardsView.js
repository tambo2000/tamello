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
		"submit form#new_board_form": "createBoard",
	},

	render: function() {
		var that = this;

		var renderedContent = JST["boards/boardsIndex"]();

		that.$el.html(renderedContent);

		// var timeout = 0;
		that.collection.each(function (board) {
			var boardRowView = new T.Views.BoardRowView({
      	model: board
    	});
    	// timeout += 100;
    	// setTimeout(function() {
				that.$("div.boardList").append(boardRowView.render().$el);
			// }, timeout);
    });

		return that
	},

	createBoard: function (event) {
    var that = this;

    var formData = $(event.currentTarget).serializeJSON();
    
    var board = new T.Models.Board(formData.board);
    that.collection.add(board);
    board.save();
  }

});



T.Views.BoardView = Backbone.View.extend({

	initialize: function() {
		//this.listenTo(this.model, 'change', this.render());
		//$( ".listTable" ).on( "sortupdate", function( event, ui ) {

		//} );
	},

	dragged: false,

	events: {
		"submit form#new_list_form": "createList",
		"click a.new-list-link": "focusOnForm",
    "mouseup .listTitle": "toggleEditListTitleInput",
    "submit form.edit_list_title_form": "updateList",
    "click button.exit_edit_list_input": "toggleEditListTitleInput",
		"click a.boardTitle": "toggleBoardTitleForm",
		"submit form.edit_board_title": "editBoardTitle",
		"click button.exit_edit_board_input": "toggleBoardTitleForm",
	},

	editBoardTitle: function(event) {
		event.preventDefault();
		console.log("editing board Title");
		var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    var board = new T.Models.Board(formData.board);
    // debugger

    if (board.get("title") !== "") {
      board.save({}, {
        success: function(resp) {
          console.log("successful board save");
          $("#" + event.target.id + ".boardTitle").text(board.get("title"));
          // $("#" + event.target.id + ".form-control").val(board.get("title"));
          that.toggleBoardTitleForm(event);
        },
        error: function(resp) {
          console.log(resp);
        }
      });
    } else {
      $("input.form-control").focus();
    }
	},

	toggleBoardTitleForm: function(event) {
		var that = this;
    event.preventDefault();

    $("#" + event.target.id + ".boardTitle").toggleClass("hide");
    $("#" + event.target.id + ".edit_board_title").toggleClass("hide");

    $("input.form-control").focus();
	},

	updateList: function(event) {
    event.preventDefault();
   
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    var list = new T.Models.List(formData.list);

    // don't allow blank list title
    if (list.get("title") !== "") {
      list.save();
      $("#" + event.target.id + ".listTitle").text(list.get("title"));
      that.toggleEditListTitleInput(event);
    } 
  },

	toggleEditListTitleInput: function(event) {
    var that = this;
    event.preventDefault();

    if (that.dragged === true) {
        that.dragged = false;
    }
    else {
        $("#" + event.target.id + ".edit_list_title_form").toggleClass("hide");
        $("#" + event.target.id + ".listTitle").toggleClass("hide");

        $("input.form-control").focus();
    } 
  },

	focusOnForm: function(event) {
		$('#newList').on('shown.bs.modal', function () {
  		$(".form-control").focus();
		})		
	},

	createList: function (event) {
		event.preventDefault();

    var that = this;

    var formData = $(event.currentTarget).serializeJSON();
    
    var list = new T.Models.List();
 
    list.save(formData.list, {
    	success: function(resp) {
    		var cards = new T.Collections.Cards;
				var listView = new T.Views.List({
	      	model: list,
	      	collection: cards
  			});
  	
  			that.$("tr").append(listView.render().$el);
  			setCSS();
    	}
    });

  	$('#newList').modal('hide');
    $('.modal-backdrop').remove();
  },

	render: function(id) {
		var that = this;

		var renderedContent = JST["boards/boardShow"]({
			board: that.model,
			maxWidth: listMaxWidth()
		});

		that.$el.html(renderedContent);

		var lists = new T.Collections.Lists();
		lists.board_id = id;
	
		lists.fetch( { 
			success: function(resp) {

				lists.each(function (list) {
					var cards = new T.Collections.Cards;
					var listView = new T.Views.List({
				      	model: list,
				      	collection: cards
		    	});
		    	// append empty lists in correct order
		    	that.$("tr").append(listView.render().$el);

  				cards.list_id = list.id
  				cards.fetch({
  					success: function(resp) {
  						// append cards to list
  						that.$("tr#" + list.id).append(listView.render().$el);
			    	}
					});
					setCSS();
		    });

				that.$(".listTable").sortable({
					delay: 150,
					forcePlaceholderSize: true,
					placeholder: "list list_placeholder",
					opacity: 0.8,
					tolerance: "intersect",
					revert: 100,
					start: function(event, ui) {
		        ui.placeholder.css("width", ui.item.width() - 16 + "px");
		        that.dragged = true;
					},
					update: function(event, ui) {
						
			    	var sortedIDsArr = $( ".listTable" ).sortable( "toArray" );
			    	sortedIDsArr = _.map(sortedIDsArr, function(ID) {
			    		return parseInt(ID);
			    	});
			    	
			    	lists.each( function(list) {
			    		list.set("position", _.indexOf(sortedIDsArr, list.id) );
			    		list.save();
			    	});
			    }
				});
			},

			error: function(resp) {
				console.log(resp);
		}});

    return that;
	}

});