	  var apiKey = 'vou035jDUUKlyiVeyGN1ow';

      document.addEventListener('DOMContentLoaded', bindButtons);

      function bindButtons(){
        document.getElementById('Submit').addEventListener('click', function(event) {
		if (document.getElementById('search').value)
		{
          var payload = {search:null};
          payload.search = document.getElementById('search').value;      
		  var url = 'https://www.goodreads.com/group/search.xml?key=' + apiKey + "&q=" + payload.search;

		$.get("https://query.yahooapis.com/v1/public/yql",
			{
				q: "select * from xml where url=\""+url+"\"",
				format: "json"
			},
			function(xml){
				console.log(xml);
				var response = xml;
				var groupList = '<ul>';
				if(response.query.results.GoodreadsResponse) {
					for (i = 0; i < 10; i++) {
						if(response.query.results.GoodreadsResponse.groups.list.group[i].title){
						groupList = groupList + '<li>'
						groupList = groupList + '<strong>' + '<a href="https://www.goodreads.com/group/show/' + response.query.results.GoodreadsResponse.groups.list.group[i].id + '">' + 
						response.query.results.GoodreadsResponse.groups.list.group[i].title + '</a></strong> </li>';
					}
				}
				
				document.getElementById('showGroups').innerHTML = groupList + '</ul>'

				}

			}
			);			  
		  };
          event.preventDefault();
        });
      }
	  
	  
