
$(document).ready(function(){
   // $("button").click(function(){
        
           var search=$("#searchInput").val();
           
			$.ajax({
				type:"GET",
			   url: ' http://localhost:8080/book',
			   
			   error: function() {
			      $('#info').html('<p>An error has occurred</p>');
			   },
			   
			   success: function(data) {

				   	   for(var i=0;i<data.length;i++){
				   	   	    console.log(data.length);
				   	   	 
				   	   	  var addRow = '<tr><td>'+data[i].id+'</td><td>'
				   	   	  					 +data[i].bookName+'</td><td>'
				   	   	  					 +data[i].price+'</td><td>'
				   	   	  					 +data[i].publisherName+'</td><td>'
				   	   	  					 
				   	   	  					 +data[i].email+'</td><td>'
				   	   	  					 +data[i].phone+'</td><td>'
				   	   	  					 +data[i].published+
				   	   	  					 '</td><td><button class="btn btn-info" type="button" id="update">Update</button><button class="btn btn-danger" type="button">Delete</button></td></tr>'
				   	   	  					 ;

				   	   	  
				   	   	  				 
				   	   		$('#info').append(addRow);
				   	   }

				   	  
			      }
			   
			});
   // });
});

$(document).ready(function(){
    $("button#add").click(function(){
    	var inputBookName=$("#inputBookName").val(),
			   				    inputPrice=$("#inputPrice").val(),
			   				    inputAuthor=$("#inputAuthor").val(),
			   				    inputEmail=$("#inputEmail").val(),
			   				    inputPhone=$("#inputPhone").val(),
			   				    inputPublished=$("#inputPublished").val();

			   				    var sendInfo={
			   				    	
    											 bookName: inputBookName,
    											 price: inputPrice,
    											 publisherName: inputAuthor,
    											 email: inputEmail,
    											 phone: inputPhone,
    											 published: inputPublished
    										
			   				    }
        $.ajax({
				type:"Post",
			   url: ' http://localhost:8080/book',
			   
			   error: function() {
			      $('#info').html('<p>An error has occurred</p>');
			   },
			   
			   success: function(data) {
			   				
									data:sendInfo;		
				   	   	  console.log(data);
			      }
			   
			});
           
    });
});





