"use strict";

class BaseBuilder {
  constructor() {
    if (new.target === BaseBuilder)
      throw new Error("Can't instantiate abstract type.");
  }

  buildNode(data) { /* eslint-disable-line no-unused-vars*/
    throw new Error("Not implemented.");
  }
}

module.exports = BaseBuilder;
