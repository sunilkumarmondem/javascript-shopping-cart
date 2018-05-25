const courses = document.querySelector('#courses-list');
const shoppinglist=document.querySelector('#cart-content tbody');
const clearcart = document.querySelector('#clear-cart');

eventlisten();

function eventlisten(){
	courses.addEventListener('click',buycourse);
	shoppinglist.addEventListener('click',removecourse);
	clearcart.addEventListener('click',removecart);
	document.addEventListener('DOMContentLoaded',getfromlocal);
}

function buycourse(e){
	e.preventDefault();
	// use delegation
	if(e.target.classList.contains('add-to-cart')){
		const course=e.target.parentElement.parentElement;
		/*console.log(course);*/
		getcourse(course);

	}
}

function getcourse(course){
	const courseinfo={
		image:course.querySelector('img').src,
		title:course.querySelector('h4').textContent,
		price:course.querySelector('.price span').textContent,
		id:course.querySelector('a').getAttribute('data-id')
	}
	
	addtocart(courseinfo);
}

function addtocart(course){
	//console.log(course);
	const row=document.createElement('tr');
	row.innerHTML=`
				<tr>
				<td><img src="${course.image}" width=100></td>
				<td>${course.title}</td>
				<td>${course.price}</td>
				<td><a href="#" class="remove" data-id="${course.id}">X</a></td>
				</tr>
					`;

					shoppinglist.appendChild(row);
		savetostorage(course);
}

function savetostorage(course){
	let courses=getfromstorage();
	courses.push(course);
	localStorage.setItem('courses',JSON.stringify(courses));
}

function getfromstorage(){
	let courses;
	if(localStorage.getItem('courses')===null){
		courses=[];
	}
	else{
		courses=JSON.parse(localStorage.getItem('courses'));
	}
	return courses;
}

function removecourse(e){
	let course,courseid;

	if(e.target.classList.contains('remove')){
		e.target.parentElement.parentElement.remove();
		course=e.target.parentElement.parentElement;
		courseid=course.querySelector('a').getAttribute('data-id');
	}
	removefromlocal(courseid);
}

function removefromlocal(id){
	let coursesls=getfromstorage();

	coursesls.forEach(function(coursel,index){
		if(coursel.id===id){
			coursesls.splice(index,1);
		}
	});
	localStorage.setItem('coursesls',JSON.stringify(coursesls));
}

function removecart(){
	shoppinglist.innerHTML='';
	clearlocalstorage();
}

function localstorage(){
	localStorage.clear();
}

function getfromlocal(){
	let coursesls=getfromstorage();
	coursesls.forEach(function(course){
		const row=document.createElement('tr');
	row.innerHTML=`
				<tr>
				<td><img src="${course.image}" width=100></td>
				<td>${course.title}</td>
				<td>${course.price}</td>
				<td><a href="#" class="remove" data-id="${course.id}">X</a></td>
				</tr>
					`;
					shoppinglist.appendChild(row);
	})
}