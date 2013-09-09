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

	events: {
		"submit form#new_list_form": "createList",
		"click a.new-list-link": "focusOnForm"
	},

	focusOnForm: function(event) {
		console.log("clicked");
		$('#newList').on('shown.bs.modal', function () {
  		$(".form-control").focus();
		})
		
		console.log($("input#list_title.form-control"));
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
			board: that.model
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
		    });

				that.$(".listTable").sortable({
					forcePlaceholderSize: true,
					placeholder: "list list_placeholder",
					opacity: 0.8,
					tolerance: "intersect",
					revert: 100,
					start: function(event, ui) {
						// ui.placeholder.css("width", (Math.floor(($(window).width() / 5))) + "px");
		        ui.placeholder.css("width", ui.item.width() - 16 + "px");
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