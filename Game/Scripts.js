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
	$("#gameover_text").text(text);
	if (bool_switch) {
		$("#gameoverText").removeClass("hide");
		$("#numbers").addClass("hide");
		$("#Submit").addClass("hide");
		$("#ShowSumCheckBox").css("display","none");
		$("#gameoverText").removeClass("hide");
		$("#Help").addClass("hide");
		$("#deadendDetection").addClass("hide");
	} else {
		$("#gameoverText").addClass("hide");
		$("#numbers").removeClass("hide");
		$("#Submit").removeClass("hide");
		$("#ShowSumCheckBox").css("display","");
		$("#gameoverText").addClass("hide");
		$("#Help").removeClass("hide");
		$("#deadendDetection").removeClass("hide");
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
		$("#sum_span").text("None");
		$("#sum_span").css("color","red");
		return;
	}
	if (sum == 0){
		$("#sum_span").css("color","green");
		$("#sum_span").text("0");
		return;
	}
	$("#sum_span").text(sum);
	$("#sum_span").css("color","");
}
function update_score(value) {
	score = value;
	$("#score_span").text(score);
}
function update_help(value) {
	help_used_time = value;
	$("#help_span").text(help_used_time);
}
function init_label(n){
	if (n<0) return "(" + n + ")";
	if (n==0) return "(0)";
	return "(+" + n + ")";
}
function numberbuttons_clicked(){
	if ($(this).hasClass("submit_button")){
		$(this).removeClass("submit_button");
		selected_numbers.delete($(this).attr('id'));
		selected--;
		update_sum(sum - numbers_l[parseInt($(this).attr('id'))-1]);
	}
	else {
		selected_numbers.add($(this).attr('id'));
		$(this).addClass("submit_button");
		selected++;
		update_sum(sum + numbers_l[parseInt($(this).attr('id'))-1]);
	}
}
function init_game(numbers = 7) {
	update_sum(0);
	update_score(0);
	init_labels(numbers);
}
function init_labels(numbers = 7){
	selected = 0;
	selected_numbers.clear();
	numbers_l = [];
	$("#numbers").empty();
	for (var i = 0; i < numbers; i++){
		n = parseInt(Math.random()*19-9,10);
		numbers_l.push(n)
		$("#numbers").append("<input type=\"button\" id=\"" + (i+1) + "\" value=\"" + init_label(n) + "\" class=\"buttons numberbuttons\">");
	}
	$(".numberbuttons").bind("click", numberbuttons_clicked);
}
$(document).ready(function(){
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		$("body").addClass("night");
		$("#SwitchColorScheme").val("Light Mode");
	}
	init_game(label);
	$("#SwitchColorScheme").click(function(){
		if ($("body").hasClass("night")){
			$("body").removeClass("night");
			$("#SwitchColorScheme").val("Dark Mode");
		}
		else{
			$("body").addClass("night");
			$("#SwitchColorScheme").val("Light Mode");
		}
	});
	$("#Submit").click(function(){
		if (sum == 0 && selected != 0){
			update_score(score + 1);
			selected = 0;
			update_sum(0);
			for (let i of selected_numbers) {
				numbers_l[parseInt(i)-1] = parseInt(Math.random()*19-9,10);
				$("#" + i).val(init_label(numbers_l[parseInt(i)-1]));
				$("#" + i).removeClass("submit_button");
			}
			selected_numbers.clear();
		}
		else if (selected == 0) {
			
		}
		else{
			if (sum!=0){
				var polynomial = "";
				for (let i of selected_numbers) polynomial += $("#" + i).val() + "+";
				polynomial = polynomial.substr(0, polynomial.length - 1);
				lose(true, polynomial + " equals to " + sum + " and it's not equals to 0");
			}
		}
	});
	$("#Reset").click(function(){
		lose(false, "")
		init_game(label);
	});
	$("#ShowSum").click(function() {
		if ($("#sum_text").hasClass("hide")) $("#sum_text").removeClass("hide");
		else $("#sum_text").addClass("hide");
	});
	$("#Help").click(function() {
		update_help(help_used_time+1);
		arr = get_ok_group();
		for (let i of selected_numbers) $("#" + i).removeClass("submit_button");
		selected_numbers = new Set(arr[parseInt(Math.random()*(arr.length+1),10)]);
		for (let i of selected_numbers) $("#" + i).addClass("submit_button");
		selected = selected_numbers.length;
	});
	$("#deadendDetection").click(function() {
		arr = get_ok_group();
		arr = arr[parseInt(Math.random()*(arr.length+1),10)];
		if (arr.length == 0) {init_labels(label);return;}
		tmp = "";
		for (let i of arr) tmp += init_label(numbers_l[i-1]) + "+";
		tmp = tmp.substr(0, tmp.length - 1);
		lose(true, "Not the dead end yet, " + tmp + " can still be offset");
	})
});