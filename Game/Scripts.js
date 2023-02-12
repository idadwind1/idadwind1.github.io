var sum = 0;
var selected = 0;
var label = 7;
var score = 0;
var gameover = false;
var gameover_text = "";
var numbers_l = [];
function init_label(){
	i = (Math.random()*10-10).toFixed(0);
	if (i<0) return "(" + i.toString() + ")";
	if (i==0) return "(+0)";
	return "(+" + i.toString() + ")";
}
function init_labels(numbers = 7){
	sum = 0;
	selected = 0;
	for (var i = 0; i < numbers; i++){
		numbers_l.push(init_label())
	}
}
$(document).ready(function(){
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