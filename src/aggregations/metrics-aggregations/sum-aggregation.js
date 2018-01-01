'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

/**
 * A single-value metrics aggregation that sums up numeric values that are
 * extracted from the aggregated documents. These values can be extracted either
 * from specific numeric fields in the documents, or be generated by a
 * provided script.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html)
 *
 * Aggregation that sums up numeric values that are extracted from the
 * aggregated documents.
 *
 * @example
 * const reqBody = bob.requestBodySearch()
 *     .query(bob.constantScoreQuery(bob.matchQuery('type', 'hat')))
 *     .agg(bob.sumAggregation('hat_prices', 'price'));
 *
 * @example
 * // Script to fetch the sales price
 * const reqBody = bob.requestBodySearch()
 *     .query(bob.constantScoreQuery(bob.matchQuery('type', 'hat')))
 *     .agg(
 *         bob.sumAggregation('hat_prices').script(
 *             bob.script('inline', 'doc.price.value')
 *         )
 *     );
 *
 * @example
 * // Access the field value from the script using `_value`
 * const reqBody = bob.requestBodySearch()
 *     .query(bob.constantScoreQuery(bob.matchQuery('type', 'hat')))
 *     .agg(
 *         bob.sumAggregation('square_hats', 'price').script(
 *             bob.script('inline', '_value * _value')
 *         )
 *     );
 *
 * @example
 * // Treat documents missing price as if they had a value
 * const reqBody = bob.requestBodySearch()
 *     .query(bob.constantScoreQuery(bob.matchQuery('type', 'hat')))
 *     .agg(bob.sumAggregation('hat_prices', 'price').missing(100));
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends MetricsAggregationBase
 */
class SumAggregation extends MetricsAggregationBase {
    /**
     * Creates an instance of `SumAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    constructor(name, field) {
        super(name, 'sum', field);
    }
}

module.exports = SumAggregation;