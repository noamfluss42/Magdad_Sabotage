"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var download_exhibits_service_1 = require("./download-exhibits.service");
describe('DownloadExhibitsService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(download_exhibits_service_1.DownloadExhibitsService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=download-exhibits.service.spec.js.map