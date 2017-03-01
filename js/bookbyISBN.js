	  var apiKey = 'vou035jDUUKlyiVeyGN1ow';

      document.addEventListener('DOMContentLoaded', bindButtons);

      function bindButtons(){
        document.getElementById('Submit').addEventListener('click', function(event) {
		if (document.getElementById('ISBN').value)
		{
          var payload = {ISBN:null};
          payload.ISBN = document.getElementById('ISBN').value;      
		  var url = 'https://www.goodreads.com/api/author_url/' + payload.ISBN + '?key='+ apiKey;

		$.get("https://query.yahooapis.com/v1/public/yql",
			{
				q: "select * from xml where url=\""+url+"\"",
				format: "json"
			},
			function(xml){
				console.log(xml);
				var response = xml;
				if(response.query.results.GoodreadsResponse) {
				
				document.getElementById('showBookInfo').textContent = response.query.results.GoodreadsResponse;
				
				}

			}
			);			  
		  };
          event.preventDefault();
        });
      }
	  