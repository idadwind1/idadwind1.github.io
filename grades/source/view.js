function getQueryString(name) {
	var query_string = window.location.search
	if (!query_string) return '';
	var re = /[?&]?([^=]+)=([^&]*)/g;
	var tokens;
	while (tokens = re.exec(query_string)) {
	if (decodeURIComponent(tokens[1]) === name) {
		return decodeURIComponent(tokens[2]);
		}
	}
	return '';
}
function loadData(){
	var search = getQueryString("search");
	var grade = getQueryString("grade");
	var category = getQueryString("category");
	category = (category == '' ? 'a' : category);
	var search_all = category == 'a';
	var re = new RegExp(search);
	var table = document.getElementById("query-table");
	var html = table.innerHTML;
	grade = (grade == '' ? 'a' : grade);
	console.log(search_all)
	console.log("Search: " + search)
	console.log("Matched Studs:");
	for (let i = 0; i < studs.length; i++){
		var stud = studs[i];
		if ((
		((search_all || category == 'i') && re.test(stud.id)) ||
		((search_all || category == 'n') && re.test(stud.name)) ||
		((search_all || category == 'p') && re.test(stud.pinyin)) ||
		((search_all || category == 'b') && re.test(stud.birthday))) &&
		(stud.grade == grade || grade == 'a')){
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
	console.log(grade);
	console.log(category);
	console.log(search);
	loadForm(grade, category, search);
}
function loadForm(arg_grade, arg_category, arg_search){
	var grade = document.getElementById('grade');
	var category = document.getElementById('category');
	var search_box = document.getElementById('search');
	grade.value = arg_grade;
	category.value = arg_category;
	search.value = arg_search;
}
window.onload = loadData;