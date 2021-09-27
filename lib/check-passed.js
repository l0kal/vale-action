"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassed = void 0;
function checkPassed(result, passCondition) {
    var _a, _b, _c, _d, _e, _f;
    const maxErrors = (_b = (_a = /errors < (\d+)/.exec(passCondition)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : Infinity;
    const maxWarnings = (_d = (_c = /warnings < (\d+)/.exec(passCondition)) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : Infinity;
    const maxSuggestions = (_f = (_e = /suggestions < (\d+)/.exec(passCondition)) === null || _e === void 0 ? void 0 : _e[1]) !== null && _f !== void 0 ? _f : Infinity;
    return (result.errors < maxErrors &&
        result.warnings < maxWarnings &&
        result.suggestions < maxSuggestions);
}
exports.checkPassed = checkPassed;
