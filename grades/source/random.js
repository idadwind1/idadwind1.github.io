function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function loadData(){
	var table = document.getElementById("query-table");
	var stud = studs[randomIntFromInterval(0, studs.length)]
	console.log("Selected Studs:");
	console.log(stud);
	table.innerHTML += `<li class="table-row">
	<div class="col col-1" data-label="Id">${stud.id}</div>
	<div class="col col-2" data-label="Name">${stud.name}</div>
	<div class="col col-2" data-label="Pinyin">${stud.pinyin}</div>
	<div class="col col-1" data-label="Birthday">${stud.birthday}</div>
	<div class="col col-2" data-label="Homeroom">${stud.homeroom}</div>
	<div class="col col-2" data-label="Card Id">${stud.card_id}</div>
	<div class="col col-2" data-label="Dorm">
		<input type="checkbox" ${stud.isBoarded?'checked':''} disabled>Boarded
		<br>
		<input type="checkbox" ${stud.doStayAtSelfStudy?'checked':''} disabled>Self Study
	</div>
	</li>`;
}
window.onload = loadData;