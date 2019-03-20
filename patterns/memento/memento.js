class TreeOriginator {
	constructor(){
		this.height = 0;
		this.width = 0;
	}

	createMemento(){
		return new TreeMemento(this);
	}

	setMemento(memento) {
		memento.restoreState(this);
	}
}

class TreeMemento {
	constructor(originator){
		this.state = {};
		this.setState(originator);
	}
	
	restoreState(originator){
		originator.width = this.state.width;
		originator.height = this.state.height;
	}

	setState(originator){
		this.state.width = originator.width;
		this.state.height = originator.height;
	}
}

class MementoCaretaker {
	constructor(){
		this.history = [];
	}

	saveMemento(originator){
		const memento = originator.createMemento();
		this.history.push(memento);
	}

	restoreMemento(originator, revision){
		const memento = this.history[revision];
		originator.setMemento(memento);
	}

	clear(){
		this.history.length = 0;
	}
}

module.exports = {
	TreeOriginator,
	TreeMemento,
	MementoCaretaker,
};