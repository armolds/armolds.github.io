	  var apiKey = 'vou035jDUUKlyiVeyGN1ow';

      document.addEventListener('DOMContentLoaded', bindButtons);

      function bindButtons(){
        document.getElementById('Submit').addEventListener('click', function(event) {
		if (document.getElementById('author').value)
		{
          var payload = {author:null};
          payload.author = document.getElementById('author').value;      
		  var replaceSpaces = payload.author.replace(/ /g, '%20');
		  var url = 'https://www.goodreads.com/api/author_url/' + replaceSpaces + '?key='+ apiKey;

		$.get("https://query.yahooapis.com/v1/public/yql",
			{
				q: "select * from xml where url=\""+url+"\"",
				format: "json"
			},
			function(xml){
				console.log(xml);
				var response = xml;
				if(response.query.results.GoodreadsResponse) {
				var authID = response.query.results.GoodreadsResponse.author.id;
				
				getAuthInfo(authID);
				
				}

			}
			);			  
		  };
          event.preventDefault();
        });
      }
	  
	  function getAuthInfo(authorId){
		  
		  var idToSend = authorId;
		  var url = 'https://www.goodreads.com/author/show/' + idToSend + '?format=xml&key=' + apiKey;
		  
		  $.get("https://query.yahooapis.com/v1/public/yql",
		  {
			  q: "select * from xml where url=\""+url+"\"",
			  format: "json"
		  },
		  function(xml2){
			  console.log(xml2);
			  var response = xml2;
			  var bookList = '<ul>'
			  if(response.query.results.GoodreadsResponse) {
				  for (i = 0; i < 10; i++) {
				  	if(response.query.results.GoodreadsResponse.author.books.book[i]){
						var publishedYear = response.query.results.GoodreadsResponse.author.books.book[i].publication_year
						if(publishedYear) {
						bookList = bookList + '<li>'
				  	   bookList = bookList + '<strong>' + response.query.results.GoodreadsResponse.author.books.book[i].title + '</strong> <i>Published: </i>' 
					   + publishedYear + '</li>';
						}
						else {
						bookList = bookList + '<li>'
				  	   bookList = bookList + '<strong>' + response.query.results.GoodreadsResponse.author.books.book[i].title + '</strong> </i>' 
					    + '</li>';	
						}
				  	}
				  }
				  document.getElementById('authorID').innerHTML = bookList + '</ul>'
			  }
		  }
		  )
		  
	  }
	  