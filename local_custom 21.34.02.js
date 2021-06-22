$(document).ready(function(){

	showdata();
	shownoticount();

	// click add to cart and get data
	$('.add_to_cart').click(function(){
		var id = $(this).data('id');
		var name = $(this).data('name');
		var price = $(this).data('price');
		var photo = $(this).data('photo');
		// this = get data from button 
		// console.log(id,name,price,photo);


		// create object
		data = {
				id:id,
				name:name,
				price:price,
				photo:photo,
				qty:1
			};
		// console.log(typeof(data));
		// typeof = get data tyep eg(array||object||string)


		var mycart = localStorage.getItem('item');
		// if we do not have localstorage create new array


		if(!mycart){
			var myitem = new Array();
		}else{
			var myitem = JSON.parse(mycart);
		}
		// console.log(typeof(myitem));



		var hasid = false;
		$.each(myitem,function(i,v){
			if(v.id == id){
				hasid = true;
				v.qty++;
			}
		})
		if(!hasid){
			myitem.push(data);
		}
		// console.log(data);

		localStorage.setItem('item', JSON.stringify(myitem));
		showdata();
		shownoticount();


	});


	function showdata(){
		var mycart = localStorage.getItem('item');
		if(mycart){
			var mycart_obj = JSON.parse(mycart);
			

			var showtable = "";
			var j = 1;

			// loop obj
			$.each(mycart_obj,function(i,v){
				showtable += `<tr>
								<td>${j++}</td>
								<td><img src="${v.photo}" width = '120px' height = '100px'></td>
								<td>${v.name}</td>
								<td>${v.price}</td>
								<td class="text-dark font-weight-bold">${v.price*v.qty}</td>

								<td>
									<button class="btn btn-outline-warning rounded-circle text-danger plus_btn" data-id="${i}">+</button>
									<span class="qty">${v.qty}</span>
									<button class="btn btn-outline-warning rounded-circle text-danger minus_btn" data-id="${i}">-</button>

								</td>
								<td>
									<button class="btn btn-outline-danger rounded-circle text-dark delete" data-id="${i}">X</button>
								</td>
							</tr>`;
			});

			$('#tbody').html(showtable);
		}
	}



	//qty plus
	$('#tbody').on('click','.plus_btn',function(){
		var id = $(this).data('id');
		var mycart = localStorage.getItem('item');
		if(mycart)
		{
			var mycart_obj = JSON.parse(mycart);
			$.each(mycart_obj,function(i,v){
				if (i == id) {
					v.qty++;
				}
			});
			localStorage.setItem('item',JSON.stringify(mycart_obj));
			showdata();
			shownoticount();
		}

	})


	// qty minus

	$('#tbody').on('click','.minus_btn',function(){
		var id = $(this).data('id');
		var mycart = localStorage.getItem('item');
		if(mycart)
		{
			var mycart_obj = JSON.parse(mycart);
			$.each(mycart_obj,function(i,v){
				if (i == id) {
					v.qty--;

					if(v.qty==0)
					{
						// mycart_obj.splice(i,1);
						var ans = confirm("Are you sure to reduce?");
						if(ans){
							mycart_obj.splice(i,1);
						}else{
							v.qty=1;
						}
					}

				}

			});
			localStorage.setItem('item',JSON.stringify(mycart_obj));
			showdata();
			shownoticount();
		}
	})


	// delete data
	$('#tbody').on('click','.delete',function(){
		var id = $(this).data('id');
		var mycart = localStorage.getItem('item');
		if(mycart)
		{
			var mycart_obj = JSON.parse(mycart);
			$.each(mycart_obj,function(i,v){
				if (i == id) {
					var ans = confirm("Are you sure to reduce?");
					if(ans){
						mycart_obj.splice(i,1);
					}else{
						v.qty=1;
					}
				}

			});
			localStorage.setItem('item',JSON.stringify(mycart_obj));
			showdata();
			shownoticount();
		}
	})


	// show count noti
	function shownoticount(){
		var mycart = localStorage.getItem('item');
		if(mycart){
			var noti = 0;
			var mycart_obj = JSON.parse(mycart);
			// noti+=mycart_obj.length;
			$.each(mycart_obj,function(i,v){
				noti+=v.qty;
			});
			$('.noti').html(noti);
		}
	}


})