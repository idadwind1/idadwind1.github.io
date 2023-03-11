var sum = 0;
var selected = 0;
var label = 7;
var score = 0;
var gameover = false;
var numbers_l = [];
var selected_numbers = new Set();
var help_used_time = 0;
function lose(bool_switch, text) {
	gameover = bool_switch;
	document.getElementById("gameover_text").textContent = text;
	if (bool_switch) {
		document.getElementById("gameoverText").classList.remove("hide");
		document.getElementById("numbers").classList.add("hide");
		document.getElementById("controls").classList.add("hide");
		document.getElementById("Reset").style.display = "inline-block";
	} else {
		document.getElementById("gameoverText").classList.add("hide");
		document.getElementById("numbers").classList.remove("hide");
		document.getElementById("controls").classList.remove("hide");
		document.getElementById("Reset").style.display = "";
	}
}
function getCombinations(arr, n) {
  if (n > arr.length) return [];
  const result = [];
  function generateCombos(currentCombo, remainingElements) {
    if (currentCombo.length === n) {
      result.push(currentCombo);
    } else {
      for (let i = 0; i < remainingElements.length; i++) {
        const newCombo = currentCombo.concat(remainingElements[i]);
        const newRemaining = remainingElements.slice(i + 1);
        generateCombos(newCombo, newRemaining);
      }
    }
  }
  
  generateCombos([], arr);
  
  return result;
}
function get_ok_group() {
	res = [];
	for (let i = 1; i < numbers_l.length; i++) {
		ls = getCombinations(Array.from({length: label}, (val, j) => j),i);
		for (let j of ls) {
			j_sum = 0;
			for (let k of j) {
				j_sum += numbers_l[k];
			}
			if (j_sum == 0){
				tmp = [];
				for (let k of j) {
					tmp.push(k+1);
				}
				res.push(tmp);
			}
		}
	}
	return res;
}
function update_sum(value) {
	sum = value;
	if (selected == 0){
		document.getElementById("sum_span").textContent = "None";
		document.getElementById("sum_span").style.color = "red";
		return;
	}
	if (sum == 0){
		document.getElementById("sum_span").style.color = "green";
		document.getElementById("sum_span").textContent = "0";
		return;
	}
	document.getElementById("sum_span").textContent = sum;
	document.getElementById("sum_span").style.color = "";
}
function update_score(value) {
	score = value;
	document.getElementById("score_span").textContent = score;
}
function update_help(value) {
	help_used_time = value;
	document.getElementById("help_span").textContent = help_used_time;
}
function init_label(n){
	if (n<0) return "(" + n + ")";
	if (n==0) return "(0)";
	return "(+" + n + ")";
}
function numberbuttons_clicked(){
	if (this.classList.contains("submit_button")){
		this.classList.remove("submit_button");
		selected_numbers.delete(this.getAttribute("id"));
		selected--;
		update_sum(sum - numbers_l[parseInt(this.getAttribute("id"))-1]);
	}
	else {
		selected_numbers.add(this.getAttribute("id"));
		this.classList.add("submit_button");
		selected++;
		update_sum(sum + numbers_l[parseInt(this.getAttribute("id"))-1]);
	}
}
function init_game(numbers = 7) {
	update_sum(0);
	update_score(0);
	update_help(0);
	init_labels(numbers);
}
function init_labels(numbers = 7){
	selected = 0;
	selected_numbers.clear();
	numbers_l = [];
	document.getElementById("numbers").innerHTML = "";
	for (var i = 0; i < label; i++){
		n = parseInt(Math.random()*19-9,10);
		numbers_l.push(n)
		document.getElementById("numbers").insertAdjacentHTML("beforeend", "<input type=\"button\" id=\"" + (i+1) + "\" value=\"" + init_label(n) + "\" class=\"numberbuttons\">");
	}
	for (let i of document.getElementsByClassName("numberbuttons")) {
		i.addEventListener("click", numberbuttons_clicked)
	}
}
function docReady(){
	init_game(label);
	document.getElementById("Submit").addEventListener("click", function(){
		if (sum == 0 && selected != 0){
			update_score(score + 1);
			selected = 0;
			update_sum(0);
			for (let i of selected_numbers) {
				numbers_l[parseInt(i)-1] = parseInt(Math.random()*19-9,10);
				document.getElementById(i).value = init_label(numbers_l[parseInt(i)-1]);
				document.getElementById(i).classList.remove("submit_button");
			}
			selected_numbers.clear();
		}
		else if (selected == 0) {
			
		}
		else{
			if (sum!=0){
				var polynomial = "";
				for (let i of selected_numbers) polynomial += document.getElementById(i).value + "+";
				polynomial = polynomial.substr(0, polynomial.length - 1);
				lose(true, polynomial + " equals to " + sum + " and it's not equals to 0");
			}
		}
	});
	document.getElementById("Reset").addEventListener("click",function(){
		lose(false, "")
		init_game(label);
	});
	document.getElementById("ShowSum").addEventListener("click", function() {
		if (document.getElementById("sum_text").classList.contains("hide-with-self")) document.getElementById("sum_text").classList.remove("hide-with-self");
		else document.getElementById("sum_text").classList.add("hide-with-self");
	});
	document.getElementById("Help").addEventListener("click", function() {
		update_help(help_used_time+1);
		arr = get_ok_group();
		for (let i of selected_numbers) document.getElementById(i).classList.remove("submit_button");
		selected_numbers = new Set(arr[parseInt(Math.random()*(arr.length+1),10)]);
		for (let i of selected_numbers) document.getElementById(i).classList.add("submit_button");
		selected = selected_numbers.length;
	});
	document.getElementById("deadendDetection").addEventListener("click", function() {
		arr = get_ok_group();
		if (arr.length == 0) {init_labels(label);return;}
		arr = arr[parseInt(Math.random()*(arr.length+1),10)];
		tmp = "";
		for (let i of arr) tmp += init_label(numbers_l[i-1]) + "+";
		tmp = tmp.substr(0, tmp.length - 1);
		lose(true, "Not the dead end yet, " + tmp + " can still be offset");
	});
}
if (document.readyState !== "loading") {
  docReady();
} else {
  document.addEventListener("DOMContentLoaded", docReady);
}