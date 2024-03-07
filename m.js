var recursivecalculator = {
	calculate(n) {
		return (recursivecalculator.recursivefunction)(n ?? document.getElementById("input-value").value, recursivecalculator.calculate);
	},
	get recursivefunction() {
		return Function("n", "f", document.getElementById("input-function").value);
	},
}
function deleteitem(n) {
	document.querySelectorAll("#input-default-list li")[n].remove();
}
function additem(n) {
	var e = document.getElementById("input-default-list");
	var l = e.children.length;
	var i = document.createElement("li");
	i.innerHTML = `<input type="number"/> : <input type="number"><a href="javascript:deleteitem(${n})">Delete</a>`;
	e.appendChild();
}