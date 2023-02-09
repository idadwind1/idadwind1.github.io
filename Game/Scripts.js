sum = 0;
selected = 0;
label = 7;
score = 0;
function init_label(){
	i = (Math.random()*10-10).toFixed(0);
	if (i<0) return "(" + i.toString() + ")";
	if (i==0) return "(+0)";
	return "(+" + i.toString() + ")";
}
function init_labels(numbers = 7){
	sum = 0;
	selected = 0;
}
function reset(){
	init_labels(label);
}
function submit(){
	alert(init_label().toString());
	if (sum == 0 && selected != 0){
		
	}
}