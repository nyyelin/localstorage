$(document).ready(function(){

	getstudentdata();

	
	$('.addstudent_div').show();
	$('.editstudent_div').hide();
	$('.alert').hide(2000);



	function getstudentdata()
	{
		// console.log('hi');
		$.get('student.json',function(res){
			// console.log(typeof(res));
			if(res)
			{
				$studentobj = JSON.parse(res);
				console.log($studentobj);
				var html = "";
				var j = 1;
				$.each($studentobj,function(i,v){
					html+= `<tr>
								<td>${j++}</td>
								<td><img src="${v.photo}" width = "120px" height = "100px"></td>
								<td>${v.name}</td>
								<td>${v.email}</td>
								<td>${v.address}</td>
								<td>
									<button class="btn btn-outline-warning edit" data-id = "${i}">Edit</button>
									<button class="btn btn-outline-danger delete" data-id = "${i}">Delete</button>
								</td>
							</tr>`;
				})
				$('tbody').html(html);
			}
		})
	}


	$('tbody').on('click','.edit',function()
	{
		$('.addstudent_div').hide(3000);
		$('.editstudent_div').show();
		var id = $(this).data('id');
		$.get("student.json",function(res){
			if(res)
			{
				var student_obj = JSON.parse(res);
				var edit_name = student_obj[id].name;
				var edit_email = student_obj[id].email;
				var edit_photo = student_obj[id].photo;
				var edit_address = student_obj[id].address;
				$('.edit_id').val(id);
				$('.edit_name').val(edit_name);
				$('.edit_email').val(edit_email);
				$('.edit_address').text(edit_address);
				$('.edit_oldphotovalue').val(edit_photo);
				$('.edit_oldphoto').attr('src',edit_photo);

			}
		})

	})

	$('tbody').on('click','.delete',function(i,v){
		var id = $(this).data('id');
		var ans = confirm("Are you sure to delete?");
		if(ans)
		{
			$.post('deletestudent.php',{id:id},function(res){
				getstudentdata();
			})
		}
	})
})