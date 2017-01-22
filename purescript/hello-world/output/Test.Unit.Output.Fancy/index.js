// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Aff = require("../Control.Monad.Aff");
var Control_Monad_Aff_AVar = require("../Control.Monad.Aff.AVar");
var Control_Monad_Eff_Class = require("../Control.Monad.Eff.Class");
var Control_Monad_Eff_Exception = require("../Control.Monad.Eff.Exception");
var Data_Either = require("../Data.Either");
var Data_Foldable = require("../Data.Foldable");
var Data_List = require("../Data.List");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Tuple = require("../Data.Tuple");
var Test_Unit = require("../Test.Unit");
var Test_Unit_Console = require("../Test.Unit.Console");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Ring = require("../Data.Ring");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Semiring = require("../Data.Semiring");
var Data_List_Types = require("../Data.List.Types");
var Data_Show = require("../Data.Show");
var Control_Applicative = require("../Control.Applicative");
var indent = function (v) {
    if (v === 0) {
        return Data_Monoid.mempty(Data_Monoid.monoidString);
    };
    return "  " + indent(v - 1);
};
var indent$prime = function ($30) {
    return indent(Data_List.length($30));
};
var printLive = function (tst) {
    var runSuiteItem = function (path) {
        return function (v) {
            if (v instanceof Test_Unit.TestGroup) {
                return Control_Monad_Eff_Class.liftEff(Control_Monad_Aff.monadEffAff)(function __do() {
                    Test_Unit_Console.print(indent$prime(path))();
                    Test_Unit_Console.print("\u2192 Suite: ")();
                    Test_Unit_Console.printLabel(v.value0.value0)();
                    return Data_Functor["void"](Control_Monad_Eff.functorEff)(Test_Unit_Console.print("\x0a"))();
                });
            };
            if (v instanceof Test_Unit.TestUnit) {
                return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Eff_Class.liftEff(Control_Monad_Aff.monadEffAff)(function __do() {
                    Test_Unit_Console.print(indent$prime(path))();
                    Test_Unit_Console.savePos();
                    Test_Unit_Console.print("\u2192 Running: ")();
                    Test_Unit_Console.printLabel(v.value0)();
                    return Test_Unit_Console.restorePos();
                }))(function () {
                    return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Aff.attempt(v.value1))(function (v1) {
                        return Data_Functor["void"](Control_Monad_Aff.functorAff)((function () {
                            if (v1 instanceof Data_Either.Right) {
                                return Control_Monad_Eff_Class.liftEff(Control_Monad_Aff.monadEffAff)(function __do() {
                                    Test_Unit_Console.eraseLine();
                                    Test_Unit_Console.printPass("\u2713 Passed: ")();
                                    Test_Unit_Console.printLabel(v.value0)();
                                    return Test_Unit_Console.print("\x0a")();
                                });
                            };
                            if (v1 instanceof Data_Either.Left) {
                                return Control_Monad_Eff_Class.liftEff(Control_Monad_Aff.monadEffAff)(function __do() {
                                    Test_Unit_Console.eraseLine();
                                    Test_Unit_Console.printFail("\u2620 Failed: ")();
                                    Test_Unit_Console.printLabel(v.value0)();
                                    Test_Unit_Console.print(" because ")();
                                    Test_Unit_Console.printFail(Control_Monad_Eff_Exception.message(v1.value0))();
                                    return Test_Unit_Console.print("\x0a")();
                                });
                            };
                            throw new Error("Failed pattern match at Test.Unit.Output.Fancy line 43, column 14 - line 57, column 1: " + [ v1.constructor.name ]);
                        })());
                    });
                });
            };
            throw new Error("Failed pattern match at Test.Unit.Output.Fancy line 29, column 5 - line 35, column 5: " + [ path.constructor.name, v.constructor.name ]);
        };
    };
    return Test_Unit.walkSuite(runSuiteItem)(tst);
};
var printErrors = function (tests) {
    var printHeader = function (level) {
        return function (path) {
            var $20 = Data_List.uncons(path);
            if ($20 instanceof Data_Maybe.Nothing) {
                return Test_Unit_Console.print(indent(level));
            };
            if ($20 instanceof Data_Maybe.Just) {
                return function __do() {
                    Test_Unit_Console.print(indent(level) + ("In \"" + ($20.value0.head + "\":\x0a")))();
                    return printHeader(level + 1 | 0)($20.value0.tail)();
                };
            };
            throw new Error("Failed pattern match at Test.Unit.Output.Fancy line 75, column 34 - line 79, column 41: " + [ $20.constructor.name ]);
        };
    };
    var printError = function (err) {
        return function __do() {
            Data_Maybe.maybe(Test_Unit_Console.printFail(Control_Monad_Eff_Exception.message(err)))(Test_Unit_Console.printFail)(Control_Monad_Eff_Exception.stack(err))();
            return Test_Unit_Console.print("\x0a")();
        };
    };
    var printItem = function (v) {
        return function __do() {
            printHeader(0)(v.value0)();
            printError(v.value1)();
            return Test_Unit_Console.print("\x0a")();
        };
    };
    var list = Data_Foldable.traverse_(Control_Monad_Eff.applicativeEff)(Data_List_Types.foldableList)(printItem);
    return Control_Bind.bind(Control_Monad_Aff.bindAff)(Test_Unit.collectResults(tests))(function (v) {
        var errors = Test_Unit.keepErrors(v);
        return Control_Monad_Eff_Class.liftEff(Control_Monad_Aff.monadEffAff)((function () {
            var $28 = Data_List.length(errors);
            if ($28 === 0) {
                return Test_Unit_Console.printPass("\x0aAll " + (Data_Show.show(Data_Show.showInt)(Data_List.length(v)) + " tests passed! \ud83c\udf89\x0a\x0a"));
            };
            if ($28 === 1) {
                return function __do() {
                    Test_Unit_Console.printFail("\x0a1 test failed:\x0a\x0a")();
                    return list(errors)();
                };
            };
            return function __do() {
                Test_Unit_Console.printFail("\x0a" + (Data_Show.show(Data_Show.showInt)($28) + " tests failed:\x0a\x0a"))();
                return list(errors)();
            };
        })());
    });
};
var runTest = function (suite) {
    return Control_Bind.bind(Control_Monad_Aff.bindAff)(printLive(suite))(function (v) {
        return Control_Bind.bind(Control_Monad_Aff.bindAff)(printErrors(v))(function () {
            return Control_Applicative.pure(Control_Monad_Aff.applicativeAff)(v);
        });
    });
};
module.exports = {
    runTest: runTest
};