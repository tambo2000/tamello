T.Views.List = Backbone.View.extend({

	tagName: "td",

  className: "listCell",

  dragged: false,

	id: function() {
		return "" + this.model.id;
	},

	initialize: function() {
    var that = this;

		//this.listenTo(this.model, 'change', this.render());
    // that.listenTo(that.collection, 'change', that.render());
    // that.listenTo($(window), 'resize', that.doResize());
	},

	events: {
    "click a.new_card_link": "toggleNewCardInput",
    "submit form.new_card_form": "createCard",
    "click button.exit_card_input": "toggleNewCardInput",
    "click button.delete-card": "deleteCard",
    "click button.delete-list": "deleteList",
    "mouseenter a.dropdown-toggle": "dropdownToggle",
    // "mouseleave div.listMenu": "dropdownToggle"
	},

  dropdownToggle: function(event) {
    var that = this;
    that.$("#" + event.currentTarget.id + ".dropdown-toggle").dropdown('toggle');
  },

  deleteList: function(event) {
    var that = this;
    that.$el.toggle( "drop", {direction: "down"} , 400, function() {
      that.model.destroy();
      that.remove();
      $('.modal-backdrop').remove();
    });
  },

  deleteCard: function(event) {
    event.preventDefault();
    var that = this;
    var card = that.collection.get(event.currentTarget.id);
    that.$("#" + event.currentTarget.id + ".card").toggle( "drop", {direction: "left"} , 400, function() {
      card.destroy();
      that.render();
      $('.modal-backdrop').remove();
    });
  },

	render: function() {
		var that = this;

		var renderedContent = JST["lists/list"]({
			list: that.model,
      listMinWidth: listMinWidth(),
      listMaxWidth: listMaxWidth(),
      listMaxHeight: listMaxHeight()
		});

    that.$el.html(renderedContent);

		that.collection.each(function(card) {
			var cardView = new T.Views.Card({
				model: card
			})
			that.$(".connectedListSortable").append(cardView.render().$el);
		});
		
    that.$("div.cards" + that.model.id).sortable({
      forcePlaceholderSize: true,
      placeholder: "card card_placeholder",
      connectWith: ".connectedListSortable",
      opacity: 0.6,
      revert: 200,
      start: function(event, ui) {
        ui.placeholder.css("width", ui.item.width() + 3 + "px");
        ui.placeholder.css("height", ui.item.height() + 4 + "px");
      },
      remove: function(event, ui) {
        var removedCard = new T.Models.Card();
        removedCard.set({id: parseInt(ui.item[0].attributes.id.nodeValue)});
        that.collection.remove(removedCard);
      },
      receive: function(event, ui) {
        var addedCard = new T.Models.Card();
        addedCard.set({id: parseInt(ui.item[0].attributes.id.nodeValue)});
        that.collection.add(addedCard);
      },
      update: function(event, ui) {
        // return array of card ids in correct order
        var sortedIDsArr = that.$("div.cards" + that.model.id).sortable( "toArray" );
        sortedIDsArr = _.map(sortedIDsArr, function(ID) {
          return parseInt(ID);
        });
        

        // update position attribute of each card and save to server
        that.collection.each( function(card) {
          card.set("list_id", that.model.id);
          card.set("position", _.indexOf(sortedIDsArr, card.id) );
          card.save();
        });
      }
    });
    that.delegateEvents();
    return that;
	},

  toggleNewCardInput: function (event) {
    event.preventDefault();

    $("#" + event.target.id + ".new_card_form").toggleClass("hide");
    $("#" + event.target.id + ".new_card_link").toggleClass("hide");
    $("input.form-control").focus();
  },

	createCard: function (event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    var card = new T.Models.Card(formData.card);

    var comments = new T.Collections.Comments();

    // don't allow blank cards
    if (card.get("title") !== "") {
      that.collection.add(card);
      card.save({}, {
        success: function(resp) {
          console.log("successful card save");
          comments.card_id = card.id;
          comments.fetch({
            success: function(resp) {
              var cardView = new T.Views.Card({
                model: card,
                collection: comments
              })
              that.$(".connectedListSortable").append(cardView.render().$el);
              that.$("#" + card.id + ".card").css( "display", "none");
              that.$("#" + card.id + ".card").toggle( "drop", {direction: "left"} , 400);
            },
            error: function(resp) {
              console.log("bad comments fetch");
            }
          }) 
        },
        error: function(resp) {
          console.log("bad card save");
        }
      });
      // clear input field
      event.currentTarget.children[1].value = "";
    } else {
      console.log("blank card");
      $("#" + event.target.id + ".list").effect( "shake" );
      $("input.form-control").focus();
    }
  }
});




