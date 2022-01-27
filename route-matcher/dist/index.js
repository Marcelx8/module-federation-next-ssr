"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFederatedCatchAll = exports.matchFederatedPage = void 0;
var react_1 = __importDefault(require("react"));
var feather_route_matcher_1 = __importDefault(require("feather-route-matcher"));
function matchFederatedPage(remotes, path) {
    return __awaiter(this, void 0, void 0, function () {
        var maps, config, _i, maps_1, map, _a, _b, _c, path_1, mod, matcher, match;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!remotes) {
                        console.error('No __REMOTES__ webpack global defined or no remotes passed to catchAll');
                    }
                    return [4 /*yield*/, Promise.all(Object.entries(remotes).map(function (_a) {
                            var remote = _a[0], loadRemote = _a[1];
                            // console.log('page map', remote, loadRemote);
                            var loadOrReferenceRemote = !window[remote] ? loadRemote() : window[remote];
                            return Promise.resolve(loadOrReferenceRemote).then(function (container) {
                                // console.log(container);
                                return container
                                    .get('./pages-map')
                                    .then(function (factory) { return ({ remote: remote, config: factory().default }); })
                                    .catch(function (error) {
                                    console.error('Error: PagesMap ::', error);
                                    return null;
                                });
                            });
                        }))];
                case 1:
                    maps = _d.sent();
                    config = {};
                    for (_i = 0, maps_1 = maps; _i < maps_1.length; _i++) {
                        map = maps_1[_i];
                        if (!map)
                            continue;
                        for (_a = 0, _b = Object.entries(map.config); _a < _b.length; _a++) {
                            _c = _b[_a], path_1 = _c[0], mod = _c[1];
                            config[path_1] = {
                                remote: map.remote,
                                module: mod,
                            };
                        }
                    }
                    matcher = (0, feather_route_matcher_1.default)(config);
                    match = matcher(path);
                    return [2 /*return*/, match];
            }
        });
    });
}
exports.matchFederatedPage = matchFederatedPage;
function createFederatedCatchAll(remotes) {
    var _this = this;
    var FederatedCatchAll = function (initialProps) {
        var _a = react_1.default.useState({}), lazyProps = _a[0], setProps = _a[1];
        var _b = __assign(__assign({}, lazyProps), initialProps), FederatedPage = _b.FederatedPage, render404 = _b.render404, renderError = _b.renderError, needsReload = _b.needsReload, props = __rest(_b, ["FederatedPage", "render404", "renderError", "needsReload"]);
        react_1.default.useEffect(function () { return __awaiter(_this, void 0, void 0, function () {
            var federatedProps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!needsReload) return [3 /*break*/, 2];
                        return [4 /*yield*/, FederatedCatchAll.getInitialProps(props)];
                    case 1:
                        federatedProps = _a.sent();
                        setProps(federatedProps);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }, []);
        if (render404) {
            // TODO: Render 404 page
            return react_1.default.createElement('h1', {}, '404 Not Found');
        }
        if (renderError) {
            // TODO: Render error page
            return react_1.default.createElement('h1', {}, 'Oops, something went wrong.');
        }
        if (FederatedPage) {
            return react_1.default.createElement(FederatedPage, props);
        }
        return null;
    };
    FederatedCatchAll.getInitialProps = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var err, req, res, AppTree, props, matchedPage, remote, mod, initErr_1, FederatedPage, modifiedContext, federatedPageProps, err_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    err = ctx.err, req = ctx.req, res = ctx.res, AppTree = ctx.AppTree, props = __rest(ctx, ["err", "req", "res", "AppTree"]);
                    if (err) {
                        // TODO: Run getInitialProps for error page
                        return [2 /*return*/, __assign({ renderError: true }, props)];
                    }
                    if (!process.browser) {
                        return [2 /*return*/, __assign({ needsReload: true }, props)];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, matchFederatedPage(remotes, ctx.asPath)];
                case 2:
                    matchedPage = _d.sent();
                    remote = (_a = matchedPage === null || matchedPage === void 0 ? void 0 : matchedPage.value) === null || _a === void 0 ? void 0 : _a.remote;
                    mod = (_b = matchedPage === null || matchedPage === void 0 ? void 0 : matchedPage.value) === null || _b === void 0 ? void 0 : _b.module;
                    if (!remote || !mod) {
                        // TODO: Run getInitialProps for 404 page
                        return [2 /*return*/, __assign({ render404: true }, props)];
                    }
                    console.log('loading exposed module', mod, 'from remote', remote);
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 6, , 7]);
                    if (!!window[remote].__initialized) return [3 /*break*/, 5];
                    window[remote].__initialized = true;
                    return [4 /*yield*/, window[remote].init(__webpack_share_scopes__.default)];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    initErr_1 = _d.sent();
                    console.log('initErr', initErr_1);
                    return [3 /*break*/, 7];
                case 7: return [4 /*yield*/, window[remote].get(mod).then(function (factory) { return factory().default; })];
                case 8:
                    FederatedPage = _d.sent();
                    if (!FederatedPage) {
                        // TODO: Run getInitialProps for 404 page
                        return [2 /*return*/, __assign({ render404: true }, props)];
                    }
                    modifiedContext = __assign(__assign({}, ctx), { query: matchedPage.params });
                    return [4 /*yield*/, ((_c = FederatedPage.getInitialProps) === null || _c === void 0 ? void 0 : _c.call(FederatedPage, modifiedContext))];
                case 9:
                    federatedPageProps = (_d.sent()) || {};
                    return [2 /*return*/, __assign(__assign({}, federatedPageProps), { FederatedPage: FederatedPage })];
                case 10:
                    err_1 = _d.sent();
                    console.log('err', err_1);
                    // TODO: Run getInitialProps for error page
                    return [2 /*return*/, __assign({ renderError: true }, props)];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    return FederatedCatchAll;
}
exports.createFederatedCatchAll = createFederatedCatchAll;
