function getQueryString(name) {
	var query_string = window.location.search
	if (!query_string) return "";
	var re = /[?&]?([^=]+)=([^&]*)/g;
	var tokens;
	while (tokens = re.exec(query_string)) {
	if (decodeURIComponent(tokens[1]) === name) {
		return decodeURIComponent(tokens[2]);
		}
	}
	return "";
}
function loadData(){
	var search = getQueryString("search");
	var re = new RegExp(search);
	var table = document.getElementById("query-table");
	var html = table.innerHTML;
	console.log("Search: " + search)
	console.log("Matched Studs:");
	for (let i = 0; i < studs.length; i++){
		var stud = studs[i];
		if (re.test(stud.id) ||
		re.test(stud.name) ||
		re.test(stud.pinyin) ||
		re.test(stud.birthday)){
			console.log(stud);
			html += '<li class="table-row">' +
			`<div class="col col-1" data-label="Id">${stud.id}</div>` +
			`<div class="col col-2" data-label="Name">${stud.name}</div>` +
			`<div class="col col-3" data-label="Pinyin">${stud.pinyin}</div>` +
			`<div class="col col-4" data-label="Birthday">${stud.birthday}</div>` +
			'</li>';
		}
	}
	table.innerHTML = html;
}
window.onload = loadData;