	$(document).ready(function(){
	$("button#searchButton").click(function(){
		var search=$("#searchInput").val();
		$('#searchTable').empty();
		$('#searchTable').html('<tr><th>BookId</th><th>BookName</th><th>Price</th><th>Author</th><th>Email</th><th>Phone</th><th>Published</th></tr>');
		$.ajax({
				type:"GET",
				url: ' http://localhost:8080/book',
				error: function() {
				    $('#info').html('<p>An error has occurred</p>');
				    }, /* End of Error Function*/
				success: function(data) {
					$('#info').hide();
					for(var i=0;i<data.length;i++){
						//console.log(data[i].bookName+"   "+search);
						
						if(data[i].bookName.includes(search))
						{
							console.log(data[i].bookName);
						 var addRow='<tr><td>'+data[i].id+'</td><td>'
					   	   	+data[i].bookName+'</td><td>'
					   	    +data[i].price+'</td><td>'
					   	   	+data[i].publisherName+'</td><td>'
					   	   	+data[i].email+'</td><td>'
					   	   	+data[i].phone+'</td><td>'
					   	   	+data[i].published+
					   	   	'</td>'+'</tr>';
					   	   	$('#searchTable').append(addRow);
						}

					}
					
					
				}
		});
	
	}); /*End of search function*/
    $("button#add").click(function(){
    	var inputBookName=$("#inputBookName").val(),
			inputPrice=$("#inputPrice").val(),
			inputAuthor=$("#inputAuthor").val(),
			inputEmail=$("#inputEmail").val(),
			inputPhone=$("#inputPhone").val(),
			inputPublished=$("#inputPublished").val();
        $.ajax({
			type:"Post",
			url: ' http://localhost:8080/book',
			headers:{'Content-Type':'application/json'},
			data: JSON.stringify({
			   	bookName: inputBookName,				 
    		    price: inputPrice,
   			    publisherName: inputAuthor,
    		    email: inputEmail,
    		    phone: inputPhone,
    		    published: inputPublished
			   })  
			}); /*End of ajax*/
           alert('Successfully Added');
    });/*End of button click*/
    /*Delete Button's Functionality start here*/
    $('#info').delegate('#del','click',function(){
				var deleteRow=$(this).parent().parent();
				var id=deleteRow.children('td:first').text();
				 $.ajax({
						type: 'DELETE', 
						dataType: 'json', 
						url: "http://localhost:8080/book/"+id, 
						headers: {"Content-Type": "application/json"},
						success: function(){
								deleteRow.fadeOut(800,function(){
									deleteRow.remove();
								})
								
						}
					});//end of inner ajax
					alert("Successfully deleted");

	});// end of delete button
});/*End of ready function*/

	$(document).ready(function(){        
	$.ajax({
	type:"GET",
	url: ' http://localhost:8080/book',
	error: function() {
	    $('#info').html('<p>An error has occurred</p>');
	    }, /* End of Error Function*/
	success: function(data) {
		var index=1;
		for(var i=0;i<data.length;i++){
		    var addRow = '<tr><td>'+data[i].id+'</td><td>'
				   	   	+data[i].bookName+'</td><td>'
				   	    +data[i].price+'</td><td>'
				   	   	+data[i].publisherName+'</td><td>'
				   	   	+data[i].email+'</td><td>'
				   	   	+data[i].phone+'</td><td>'
				   	   	+data[i].published+
				   	   	'</td><td>'+
				   	   	'<button href="#myModal2" data-toggle="modal"'+ 
				   	   	'class="btn btn-info" id="up'+index+'">Update</button>'+
				   	   	'<button class="btn btn-danger" id="del">Delete</button></td></tr>';
			$('#info').append(addRow);
			/*Update Button starts here*/
		    $('#display td button#up'+index).addClass("bt"+data[i].id);
			$('#display td button.bt'+data[i].id+'').click(function(){
				var x=$(this).attr('class');
					x=parseInt(x.substring(15));
					$.ajax({
						type:'GET',
						url:'http://localhost:8080/book/'+x,
						success: function(data) {
							$('div#myModal2 div.modal-body input#inputId').val(x);
							$('div#myModal2 div.modal-body input#inputBookName').val(data.bookName);
							$('div#myModal2 div.modal-body input#inputPrice').val(data.price);
							$('div#myModal2 div.modal-body input#inputAuthor').val(data.publisherName);
							$('div#myModal2 div.modal-body input#inputEmail').val(data.email);
							$('div#myModal2 div.modal-body input#inputPhone').val(data.phone);
							$('div#myModal2 div.modal-body input#inputPublished').val(data.published);
						}
					});//end of inner ajax			
			});//end Update Button
			index++;
		} /*End of for loop*/			   	  
	    }/*End of outer success*/	   
    });   /*end of outer ajax*/
        /*Start of update button of myModal2*/
		$('button#update').click(function(){
			var id=parseInt($('div#myModal2 div.modal-body input#inputId').val());
		    var bookName=$('div#myModal2 div.modal-body input#inputBookName').val();
			var price=$('div#myModal2 div.modal-body input#inputPrice').val();
			var publisherName=$('div#myModal2 div.modal-body input#inputAuthor').val();
			var email=$('div#myModal2 div.modal-body input#inputEmail').val();
			var phone=$('div#myModal2 div.modal-body input#inputPhone').val();
			var published=$('div#myModal2 div.modal-body input#inputPublished').val();
			$.ajax({
					type: 'PUT', 
					dataType: 'json',
					url: "http://localhost:8080/book/"+id,
					headers: {"Content-Type": "application/json"}, 
					data: JSON.stringify({
					id: id,
					bookName: bookName,
					price: price,
					publisherName: publisherName,
					email: email,
					phone: phone,
					published: published	
				    }) 
			});
					alert("Successfully updated");
					
	});//end of update button of myModal2
}); /*End of ready function*/










