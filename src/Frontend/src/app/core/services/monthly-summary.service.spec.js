"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var monthly_summary_service_1 = require("./monthly-summary.service");
describe('MonthlySummaryService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(monthly_summary_service_1.MonthlySummaryService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=monthly-summary.service.spec.js.map