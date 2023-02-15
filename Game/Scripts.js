var sum = 0;
var selected = 0;
var label = 7;
var score = 0;
var gameover = false;
var gameover_text = "";
var numbers_l = [];
var selected_numbers = [];
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
function init_label(n){
	if (n<0) return "(" + n + ")";
	if (n==0) return "(0)";
	return "(+" + n + ")";
}
function numberbuttons_clicked(){
	if ($(this).hasClass("submit_button")){
		$(this).removeClass("submit_button");
		selected_numbers.splice(selected_numbers.indexOf($(this).attr('id')), 1);
		selected--;
		update_sum(sum - numbers_l[parseInt($(this).attr('id'))-1]);
	}
	else {
		selected_numbers.push($(this).attr('id'));
		$(this).addClass("submit_button");
		selected++;
		update_sum(sum + numbers_l[parseInt($(this).attr('id'))-1]);
	}
}
function init_labels(numbers = 7){
	selected = 0;
	update_score(0);
	selected_numbers = [];
	update_sum(0);
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
	init_labels();
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
			for (i = 0; i < selected_numbers.length; i++){
				numbers_l[parseInt(selected_numbers[i])-1] = parseInt(Math.random()*19-9,10);
				$("#" + selected_numbers[i]).val(init_label(numbers_l[parseInt(selected_numbers[i])-1]));
				$("#" + selected_numbers[i]).removeClass("submit_button");
			}
		}
		else if (selected != 0){
			gameover = true;
			if (sum==0) gameover_text = "equals" + sum + " and it's not equals to 0"
		}
	});
	$("#Reset").click(function(){
		init_labels(label);
	});
	$("#ShowSum").click(function() {
		if ($("#sum_text").hasClass("hide")) $("#sum_text").removeClass("hide");
		else $("#sum_text").addClass("hide");
	});
});