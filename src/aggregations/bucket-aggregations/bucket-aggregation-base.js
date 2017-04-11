'use strict';

const _ = require('lodash');

const {
    Aggregation,
    Script,
    util: { checkType }
} = require('../../core');

/**
 * The `BucketAggregationBase` provides support for common options used across
 * various bucket `Aggregation` implementations.
 *
 * @extends Aggregation
 */
class BucketAggregationBase extends Aggregation {

    /**
     * Creates an instance of `BucketAggregationBase`
     *
     * @param {string} name a valid aggregation name
     * @param {string} type type of aggregation
     * @param {string=} field The field to aggregate on
     */
    constructor(name, type, field) {
        super(name, type);

        if (!_.isNil(field)) this._aggsDef.field = field;
    }

    // TODO: Investigate case when getters will be required

    /**
     * Sets field to run aggregation on.
     *
     * @param {string} field a valid field name
     * @returns {BucketAggregationBase} returns `this` so that calls can be chained
     */
    field(field) {
        this._aggsDef.field = field;
        return this;
    }

    /**
     * Sets script parameter for aggregation.
     *
     * @param {Script} script
     * @returns {BucketAggregationBase} returns `this` so that calls can be chained
     * @throws {TypeError} If `script` is not an instance of `Script`
     */
    script(script) {
        checkType(script, Script);
        this._aggsDef.script = script;
        return this;
    }
}

module.exports = BucketAggregationBase;
