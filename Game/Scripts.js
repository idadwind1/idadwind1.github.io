var sum = 0;
var selected = 0;
var label = 7;
var score = 0;
var gameover = false;
var gameover_text = "";
var numbers_l = [];
function init_label(i){
	if (i<0) return "(" + i.toString() + ")";
	if (i==0) return "(+0)";
	return "(+" + i.toString() + ")";
}
function numberbuttons_clicked(){
	if ($(this).hasClass("submit_button")){
		$(this).removeClass("submit_button");
		$(this).addClass("button");
		selected--;
		sum -= numbers_l[parseInt($(this).attr('id'))-1];
	}
	else {
		$(this).addClass("submit_button");
		$(this).removeClass("button");
		selected++;
		sum += numbers_l[parseInt($(this).attr('id'))-1];
	}
}
function init_labels(numbers = 7){
	sum = 0;
	selected = 0;
	$("#numbers").empty();
	for (var i = 0; i < numbers; i++){
		n = parseInt(Math.random()*19-9,10);
		numbers_l.push(n)
		$("#numbers").append("<input type=\"button\" id=\"" + (i+1).toString() + "\" value=\"" + init_label(n) + "\" class=\"buttons button numberbuttons\">");
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
			score++;
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