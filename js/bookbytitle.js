	  var apiKey = 'vou035jDUUKlyiVeyGN1ow';

      document.addEventListener('DOMContentLoaded', bindButtons);

      function bindButtons(){
        document.getElementById('Submit').addEventListener('click', function(event) {
		if (document.getElementById('title').value)
		{
          var payload = {title:null};
          payload.title = document.getElementById('title').value;      
		  var url = 'https://www.goodreads.com/book/title.xml?title=' + payload.title + '&key='+ apiKey;

		$.get("http://query.yahooapis.com/v1/public/yql",
			{
				q: "select * from xml where url=\""+url+"\"",
				format: "json"
			},
			function(xml){
				console.log(xml);
				var response = xml;
				if(response.query.results.GoodreadsResponse) {
				document.getElementById('reviews').innerHTML = response.query.results.GoodreadsResponse.book.reviews_widget;
				}
				else
					document.getElementById('reviews').textContent = 'Error: Please enter a book title.';
				}
			);			  
		  };
          event.preventDefault();
        });
      }