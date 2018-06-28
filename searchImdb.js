window.onload = function () {
    $("#do-search").on('click', function () {
		searchTitles();
    });//End of Click

};//En

function searchTitles(){
        //Get data from input box
        var input = $('#title').val()
        var sURL = "http://www.omdbapi.com/?s=" + input + "&apikey=9af0ac15"
        //Get container for later use
        var lst = []
        $.ajax({
            method: 'GET',
            url: sURL,
            dataType: 'json',
            success: (function (results) {
                var movies = results.Search;
                //console.log(results);
                //Loop through the total number of movies found
                for (var i = 0; i < movies.length; i++) {
                    lst.push(movies[i].imdbID);
                }
                displayFullList(lst)
            }),
            error: function (error) {
                console.error('@ERROR', error);
            }
        });
}

function displayFullList(lst) {
	var container = $('#container');
    for (var j = 0; j < lst.length; j++) {
        var iURL = "http://www.omdbapi.com/?i=" + lst[j] + "&apikey=9af0ac15"
        $.ajax({
            method: 'GET',
            url: iURL,
            dataType: 'json',
            success: (function (result) {
				currentResult = 'Title: ' + result.Title + '<br>Written By: ' + result.Writer + '<br>'
				container.append(currentResult);
				
            }),
            error: function (error) {
                console.error('@ERROR', error);
            }
        });
    }
}
