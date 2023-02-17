var sum = 0;
var selected = 0;
var label = 7;
var score = 0;
var gameover = false;
var gameover_text = "";
var numbers_l = [];
var selected_numbers = new Set();
function PermutationCombinations(things, countInOneGroup)
{
	result = [];
	if (countInOneGroup != 2)
	{
		for (let i = 0; i < tmp.length; i++)
		{
			tmp2 = [ -114514 ];
			for (let j = 2; j < things.length; j++) tmp2.push(things[j]);
			ls = PermutationCombinations(tmp2, countInOneGroup - 1);
			for (let j = 0; j < ls.length; j++)
			{
				if (!ls[j].includes(-114514) || ls[j][1] <= tmp[i][1]) continue;
				tmp3 = 
				[
					tmp[i][0],
					tmp[i][1]
				];
				for (let l of ls[j]) if (l != -114514) tmp3.push(l);
				result.push(tmp3);
			}
		}
		return result;
	}
	if (countInOneGroup == 1)
	{
		for (let i of things)
		{
			result.push([ things[i] ]);
		}
		return result;
	}
	for (let i of things)
	{
		for (let j of things)
		{
			if (i >= j) continue;
			result.push([ i, j ]);
		}
	}
	return result;
}
function get_ok_group() {
	res = [];
	for (let i = 1; i < numbers_l.length; i++) {
		ls = PermutationCombinations(Array.from({length: label}, (val, j) => j),i);
		for (let j of ls) {
			j_sum = 0;
			for (let k of j) {
				j_sum += numbers_l[k];
			}
			if (j_sum == 0){
				tmp = [];
				for (let k of j) {
					tmp.push(init_label(numbers_l[k]));
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
	console.log(selected_numbers);
}
function init_labels(numbers = 7){
	selected = 0;
	update_score(0);
	selected_numbers.clear();
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
			for (let i of selected_numbers) {
				numbers_l[parseInt(i)-1] = parseInt(Math.random()*19-9,10);
				$("#" + i).val(init_label(numbers_l[parseInt(i)-1]));
				$("#" + i).removeClass("submit_button");
			}
		}
		else if (selected == 0) {
			
		}
		else{
			gameover = true;
			if (sum!=0){
				var polynomial = "";
				for (let i of selected_numbers) {
					polynomial += $("#" + i).val();
					if (i != selected_numbers[selected_numbers.size - 1]) {
						polynomial += "+";
					}
				}
				gameover_text = polynomial + " equals to " + sum + " and it's not equals to 0";
			}
			$("#numbers").addClass("hide");
			$("#Submit").addClass("hide");
			$("#ShowSum").addClass("hide");
			$("#SwitchColorScheme").addClass("hide");
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