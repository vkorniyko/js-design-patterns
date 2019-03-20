const { WheelModel, PedalModel, ChainModel, RudderModel, BrakeModel, BellModel, BikeFacade } = require('../patterns/facade/facade');

QUnit.test("WheelModel.prototype.rotate(rotations)", function (assert) {
	const wheelModel = new WheelModel();
	
	const result = wheelModel.rotate(10);

	assert.strictEqual(result, 10);
	assert.strictEqual(wheelModel.rotations, 10);
});

QUnit.test("ChainModel.prototype.cycle(cycles)", function (assert) {
	const wheels = [];
	wheels.push(new WheelModel());
	wheels.push(new WheelModel());
	
	const pedals = [];
	pedals.push(new PedalModel());
	pedals.push(new PedalModel());
	
	const chain = new ChainModel(pedals, wheels);

	const result = chain.cycle(1);

	assert.strictEqual(result, 1);
	assert.strictEqual(chain.cycles, 1);

	chain.wheels.forEach(wheel => {
		assert.strictEqual(wheel.rotations, 5);
	});
});

QUnit.test("PedalModel.prototype.twirl(count)", function (assert) {
	const wheels = [];
	const pedals = [];
	const chain = new ChainModel(pedals, wheels);
	
	wheels.push(new WheelModel());
	wheels.push(new WheelModel());
	
	const pedal = new PedalModel(chain);
	pedals.push(pedal);
	pedals.push(new PedalModel(chain));

	const result = pedal.twirl(2);

	assert.strictEqual(result, 2);
	assert.strictEqual(chain.cycles, 1);

	chain.wheels.forEach(wheel => {
		assert.strictEqual(wheel.rotations, 5);
	});
});

QUnit.test("RudderModel.prototype.setDirection(direction)", function (assert) {
	const rudder = new RudderModel();
	
	const result = rudder.setDirection("straight");

	assert.strictEqual(result, "straight");
	assert.strictEqual(rudder.direction, "straight");
});

QUnit.test("BrakeModel.prototype.enable()", function (assert) {
	const brake = new BrakeModel();
	
	const result = brake.enable();

	assert.strictEqual(result, true);
	assert.strictEqual(brake.isEnabled, true);
});

QUnit.test("BrakeModel.prototype.disable()", function (assert) {
	const brake = new BrakeModel();
	
	const result = brake.disable();

	assert.strictEqual(result, false);
	assert.strictEqual(brake.isEnabled, false);
});

QUnit.test("BellModel.prototype.ring()", function (assert) {
	const bell = new BellModel();
	
	const result = bell.ring();

	assert.strictEqual(result, true);
	assert.strictEqual(bell.isRang, true);
});

QUnit.test("BikeFacade.prototype.go()", function (assert) {
	const bike = new BikeFacade();
	
	bike.go("straight", 2);

	assert.strictEqual(bike.bell.isRang, true);

	bike.brakes.forEach(brake => {
		assert.strictEqual(brake.isEnabled, false);
	});

	assert.strictEqual(bike.rudder.direction, "straight");

	bike.wheels.forEach(wheel => {
		assert.strictEqual(wheel.rotations, 5);
	});

	assert.strictEqual(bike.chain.cycles, 1);

	bike.pedals.forEach(pedal => {
		assert.strictEqual(pedal.twirls, 2);
	});
});