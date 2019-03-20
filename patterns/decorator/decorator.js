class AnimalComponent {
	constructor(){
		this.foodEaten = 0;
	}

	eat(count){
		return this.foodEaten += count;
	}
}

class BaseAnimalDecorator {
	constructor(animalComponent){
		if(new.target === BaseAnimalDecorator)
			throw new Error("Can't instantiate abstract type.");

		this.animalComponent = animalComponent;
	}

	eat(count){
		return this.animalComponent.eat(count);
	}
}

class PigAnimalDecorator extends BaseAnimalDecorator {
	constructor(animalComponent){
		super(animalComponent);
		this.grunted = false;
	}
	
	eat(count){
		var result = super.eat(count);
		this.grunt();

		return result;
	}

	grunt(){
		this.grunted = true;
	}
}

module.exports = {
	AnimalComponent,
	BaseAnimalDecorator,
	PigAnimalDecorator
};