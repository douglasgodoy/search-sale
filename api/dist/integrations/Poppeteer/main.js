"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
var utils_1 = require("../../../utils");
var scraping = {
    init: function (body) { return __awaiter(void 0, void 0, void 0, function () {
        var browser, valueSearchUrl, pagination, issetPag, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, puppeteer.launch()];
                case 1:
                    browser = _b.sent();
                    valueSearchUrl = body.search.split(' ').join('%20');
                    pagination = body.page || false;
                    issetPag = pagination > 1 ? "o=" + pagination + "&" : '';
                    _a = {
                        url: "https://pr.olx.com.br/regiao-de-maringa/regiao-de-maringa?" + issetPag + "q=" + valueSearchUrl
                    };
                    return [4 /*yield*/, browser.newPage()];
                case 2: return [2 /*return*/, (_a.page = _b.sent(),
                        _a.browser = browser,
                        _a)];
            }
        });
    }); },
    olx: {
        getDataSanitize: function () {
            try {
                var getDataSale = function (el) { return ({
                    value: Array.from(el.querySelectorAll('p')).filter(function (p) { return p.textContent.match(/R\$/); }).map(function (filtered) { return filtered.textContent; }).toString(),
                    img: Array.from(el.querySelectorAll('img')).map(function (img) { return img.dataset.src; }).toString(),
                    title: el.getAttribute('title'),
                    link: el.getAttribute('href')
                }); };
                var dataArray = Array.from(document.querySelectorAll('#ad-list li a'));
                var countPages = document.querySelectorAll('[data-lurker-detail="pagination_item"]').length + 1;
                var sanitizeFilters = dataArray.map(getDataSale).filter(function (data) { return data.title && /http/g.test(data.img); });
                sanitizeFilters[0].pages = countPages;
                return sanitizeFilters;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        },
        process: function (_a) {
            var page = _a.page, url = _a.url, browser = _a.browser;
            return __awaiter(void 0, void 0, void 0, function () {
                var data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, page.goto(url)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, page.evaluate(scraping.olx.getDataSanitize)];
                        case 2:
                            data = _b.sent();
                            return [2 /*return*/, { browser: browser, data: data }];
                    }
                });
            });
        }
    },
    "finally": function (_a) {
        var browser = _a.browser, data = _a.data;
        return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, browser.close()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, data];
            }
        }); });
    }
};
exports["default"] = utils_1["default"].composeF(scraping.init, scraping.olx.process, scraping["finally"]);
