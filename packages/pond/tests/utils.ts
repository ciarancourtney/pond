/**
 * Return incrementing unix time series for testing purposes
 * Uses 'start-of-interval' semantics i.e. [0, 123.4] at 900sec interval
 * means 123.4 units between 1970-01-01 00:00 and 1970-01-01 00:15
 * TODO Replace with deterministic generator (seeded on start date, interval and optional string)
 * TODO Verify that aggregations are mathematically correct elsewhere
 */
export function generateTs(startTsIncl: number, endTsExcl: number, interval: number): number[][] {
    const data = [];
    let value = 1;
    while (startTsIncl < endTsExcl) {
        data.push([startTsIncl, value]);
        startTsIncl += interval;
        value++
    }
    return data
}
