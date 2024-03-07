class LogicData {
	data;
	constructor(data) {
		if(typeof data != "object") return; 
		this.data = data;
	}
}
class LogicGate {
	#check;
	constructor(input) {
		if(typeof input != "function") return;
		this.#check = input;
	}
}