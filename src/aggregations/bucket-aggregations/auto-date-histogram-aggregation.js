'use strict';

const AutoHistogramAggregationBase = require('./auto-histogram-aggregation-base');

/**
 * A multi-bucket aggregation similar to the histogram except it can only be applied on date values.
 * The interval can be specified by date/time expressions.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html#_scripts)
 *
 * @example
 * const agg = esb.autoDateHistogramAggregation('sales_over_time', 'date', 15);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 * @param {number=} buckets Bucket count to generate histogram over.
 *
 * @extends HistogramAggregationBase
 */
class AutoDateHistogramAggregation extends AutoHistogramAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field, buckets) {
        super(name, 'auto_date_histogram', field, buckets);
    }

    /**
     * Date-times are stored in Elasticsearch in UTC.
     * By default, all bucketing and rounding is also done in UTC.
     * The `time_zone` parameter can be used to indicate that bucketing should use a different time zone.
     * Sets the date time zone
     *
     * @example
     * const agg = esb.dateHistogramAggregation('by_day', 'date', 'day').timeZone(
     *     '-01:00'
     * );
     *
     * @param {string} tz Time zone. Time zones may either be specified
     * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
     * an identifier used in the TZ database like America/Los_Angeles.
     * @returns {DateHistogramAggregation} returns `this` so that calls can be chained
     */
    timeZone(tz) {
        this._aggsDef.time_zone = tz;
        return this;
    }
}

module.exports = AutoDateHistogramAggregation;
