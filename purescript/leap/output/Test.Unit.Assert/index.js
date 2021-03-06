// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Data_Either = require("../Data.Either");
var Control_Monad_Aff = require("../Control.Monad.Aff");
var Test_Unit = require("../Test.Unit");
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Data_Eq = require("../Data.Eq");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var expectFailure = function (reason) {
    return function (t) {
        return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Aff.attempt(t))(function (v) {
            return Data_Either.either(Data_Function["const"](Test_Unit.success))(Data_Function["const"](Test_Unit.failure(reason)))(v);
        });
    };
};
var equal$prime = function (dictEq) {
    return function (reason) {
        return function (expected) {
            return function (actual) {
                var $11 = Data_Eq.eq(dictEq)(expected)(actual);
                if ($11) {
                    return Test_Unit.success;
                };
                if (!$11) {
                    return Test_Unit.failure(reason);
                };
                throw new Error("Failed pattern match at Test.Unit.Assert line 45, column 3 - line 45, column 57: " + [ $11.constructor.name ]);
            };
        };
    };
};
var equal = function (dictEq) {
    return function (dictShow) {
        return function (expected) {
            return function (actual) {
                var $12 = Data_Eq.eq(dictEq)(expected)(actual);
                if ($12) {
                    return Test_Unit.success;
                };
                if (!$12) {
                    return Test_Unit.failure("expected " + (Data_Show.show(dictShow)(expected) + (", got " + Data_Show.show(dictShow)(actual))));
                };
                throw new Error("Failed pattern match at Test.Unit.Assert line 37, column 3 - line 39, column 31: " + [ $12.constructor.name ]);
            };
        };
    };
};
var shouldEqual = function (dictEq) {
    return function (dictShow) {
        return Data_Function.flip(equal(dictEq)(dictShow));
    };
};
var assertFalse = function (v) {
    return function (v1) {
        if (!v1) {
            return Test_Unit.success;
        };
        if (v1) {
            return Test_Unit.failure(v);
        };
        throw new Error("Failed pattern match at Test.Unit.Assert line 24, column 1 - line 24, column 30: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var assert = function (v) {
    return function (v1) {
        if (v1) {
            return Test_Unit.success;
        };
        if (!v1) {
            return Test_Unit.failure(v);
        };
        throw new Error("Failed pattern match at Test.Unit.Assert line 18, column 1 - line 18, column 24: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
module.exports = {
    assert: assert, 
    assertFalse: assertFalse, 
    equal: equal, 
    "equal'": equal$prime, 
    expectFailure: expectFailure, 
    shouldEqual: shouldEqual
};
