T.Collections.Boards = Backbone.Collection.extend({
	model: T.Models.Board,
	url: "/boards"

	// parse: function(resp, options) {
	// 	var ourGists = resp.gists;
	// 	var favoritedGists = resp.favorites;

	// 	_(ourGists).each( function(gist) {
	// 		gist.favorited = false;
	// 		_(favoritedGists).each( function(favorite) {
	// 			if (gist.id === favorite.id) {
	// 				gist.favorited = true;
	// 			}
	// 		});
	// 	});

	// 	return ourGists;
	// }
});