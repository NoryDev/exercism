// Generated by psc version 0.10.5
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Test_Unit_Output_Fancy = require("../Test.Unit.Output.Fancy");
var Test_Unit_Output_Simple = require("../Test.Unit.Output.Simple");
var Test_Unit_Output_TAP = require("../Test.Unit.Output.TAP");
var Control_Monad_Aff = require("../Control.Monad.Aff");
var Control_Monad_Aff_AVar = require("../Control.Monad.Aff.AVar");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Class = require("../Control.Monad.Eff.Class");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Data_List = require("../Data.List");
var Test_Unit = require("../Test.Unit");
var Test_Unit_Console = require("../Test.Unit.Console");
var Control_Bind = require("../Control.Bind");
var Data_Ord = require("../Data.Ord");
var Control_Applicative = require("../Control.Applicative");
var Data_Unit = require("../Data.Unit");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Function = require("../Data.Function");
var runTestWith = function (runner) {
    return function (suite) {
        return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Bind.bind(Control_Monad_Aff.bindAff)(runner(suite))(Test_Unit.collectResults))(function (v) {
            var errs = Test_Unit.keepErrors(v);
            var $4 = Data_List.length(errs) > 0;
            if ($4) {
                return Control_Monad_Eff_Class.liftEff(Control_Monad_Aff.monadEffAff)($foreign.exit(1));
            };
            if (!$4) {
                return Control_Applicative.pure(Control_Monad_Aff.applicativeAff)(Data_Unit.unit);
            };
            throw new Error("Failed pattern match at Test.Unit.Main line 38, column 3 - line 38, column 58: " + [ $4.constructor.name ]);
        });
    };
};
var run = function (e) {
    var successHandler = function (v) {
        return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(Data_Unit.unit);
    };
    var errorHandler = function (v) {
        return $foreign.exit(1);
    };
    return function __do() {
        Control_Monad_Aff.runAff(errorHandler)(successHandler)(e)();
        return Data_Unit.unit;
    };
};
var runTest = function (suite) {
    var runner = (function () {
        if (Test_Unit_Output_TAP.requested) {
            return Test_Unit_Output_TAP.runTest;
        };
        if (!Test_Unit_Output_TAP.requested) {
            var $6 = Test_Unit_Console.hasStderr && Test_Unit_Console.hasColours;
            if ($6) {
                return Test_Unit_Output_Fancy.runTest;
            };
            if (!$6) {
                return Test_Unit_Output_Simple.runTest;
            };
            throw new Error("Failed pattern match at Test.Unit.Main line 45, column 23 - line 47, column 35: " + [ $6.constructor.name ]);
        };
        throw new Error("Failed pattern match at Test.Unit.Main line 43, column 18 - line 47, column 35: " + [ Test_Unit_Output_TAP.requested.constructor.name ]);
    })();
    return run(runTestWith(runner)(suite));
};
module.exports = {
    run: run, 
    runTest: runTest, 
    runTestWith: runTestWith, 
    exit: $foreign.exit
};