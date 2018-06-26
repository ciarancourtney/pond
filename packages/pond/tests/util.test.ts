/**
 *  Copyright (c) 2015-2017, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
declare const describe: any;
declare const it: any;
declare const expect: any;
declare const beforeEach: any;

import { generateTs } from "./utils";

import Util from "../src/util";

describe("Util", () => {
    it("can check a string to make sure its a valid index string", () => {
        expect(Util.isIndexString("5m-5002093")).toBe(true);
        expect(Util.isIndexString("1h@5m-5002093")).toBe(true);
        expect(Util.isIndexString("1h@5m+123-5002093")).toBe(true);
        expect(Util.isIndexString("5002093")).toBe(false);
        expect(Util.isIndexString("bob")).toBe(false);
        expect(Util.isIndexString("5x-50020")).toBe(false);
        expect(Util.isIndexString("5d")).toBe(false);
        expect(Util.isIndexString("5d-")).toBe(false);
        expect(Util.isIndexString("5d-xxx")).toBe(false);
        expect(Util.isIndexString("1h@5m+xxx-5002093")).toBe(false);
    });

    it("can decode a period index string", () => {
        const { decodedPeriod, decodedDuration, decodedIndex } = Util.decodeIndexString(
            "5m-5002093"
        );
        expect(+decodedDuration).toBe(300000);
        expect(+decodedPeriod.frequency()).toBe(300000);
        expect(+decodedPeriod.offset()).toBe(0);
        expect(+decodedIndex).toBe(5002093);
    });

    it("can decode a period index string with an offset", () => {
        const { decodedPeriod, decodedDuration, decodedIndex } = Util.decodeIndexString(
            "5m+1234-5002093"
        );
        expect(+decodedDuration).toBe(300000);
        expect(+decodedPeriod.frequency()).toBe(300000);
        expect(+decodedPeriod.offset()).toBe(1234);
        expect(+decodedIndex).toBe(5002093);
    });

    it("can decode a period index string with a duration and frequency", () => {
        const { decodedPeriod, decodedDuration, decodedIndex } = Util.decodeIndexString(
            "1h@5m+1234-5002093"
        );
        expect(+decodedDuration).toBe(3600000);
        expect(+decodedPeriod.frequency()).toBe(300000);
        expect(+decodedPeriod.offset()).toBe(1234);
        expect(+decodedIndex).toBe(5002093);
    });
});

describe("Test Utils", () => {
    it("can generate 1 day of hourly unix time series", () => {
        const data = generateTs(0, 24 * 3600 * 1000, 3600 * 1000);
        expect(data.length).toBe(24);
        expect(data[0]).toEqual([0, 0]);
        expect(data[data.length - 1]).toEqual([(86400 - 3600) * 1000, 23]);
    });
});
