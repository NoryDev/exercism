// Generated by psc version 0.10.5
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Monad_Aff = require("../Control.Monad.Aff");
var Control_Monad_Aff_AVar = require("../Control.Monad.Aff.AVar");
var Control_Monad_Aff_Console = require("../Control.Monad.Aff.Console");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Control_Monad_Eff_Exception = require("../Control.Monad.Eff.Exception");
var Data_Either = require("../Data.Either");
var Data_Foldable = require("../Data.Foldable");
var Data_List = require("../Data.List");
var Data_Maybe = require("../Data.Maybe");
var Data_String = require("../Data.String");
var Data_Tuple = require("../Data.Tuple");
var Test_Unit = require("../Test.Unit");
var Control_Applicative = require("../Control.Applicative");
var Data_Unit = require("../Data.Unit");
var Control_Bind = require("../Control.Bind");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_Show = require("../Data.Show");
var Data_List_Types = require("../Data.List.Types");
var printStack = function (err) {
    var $4 = Control_Monad_Eff_Exception.stack(err);
    if ($4 instanceof Data_Maybe.Nothing) {
        return Control_Applicative.pure(Control_Monad_Aff.applicativeAff)(Data_Unit.unit);
    };
    if ($4 instanceof Data_Maybe.Just) {
        return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Aff_Console.log("  stack: |-"))(function () {
            return Control_Monad_Aff_Console.log(Data_String.joinWith("\x0a")(Data_Functor.map(Data_Functor.functorArray)(Data_Semigroup.append(Data_Semigroup.semigroupString)("    "))(Data_String.split("\x0a")($4.value0))));
        });
    };
    throw new Error("Failed pattern match at Test.Unit.Output.TAP line 23, column 18 - line 27, column 67: " + [ $4.constructor.name ]);
};
var runTest = function (suite) {
    var run = function (v) {
        return function (v1) {
            return Data_Tuple.Tuple.create(v.value0 + 1 | 0)(Data_List.snoc(v.value1)((function () {
                var label = Data_String.joinWith(" / ")(Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray)(v1.value0));
                return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Aff.attempt(v1.value1))(function (v2) {
                    if (v2 instanceof Data_Either.Left) {
                        return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Aff_Console.log("not ok " + (Data_Show.show(Data_Show.showInt)(v.value0) + (" " + label))))(function () {
                            return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Aff_Console.log("  ---"))(function () {
                                return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Aff_Console.log("  message: " + Control_Monad_Eff_Exception.message(v2.value0)))(function () {
                                    return Control_Bind.bind(Control_Monad_Aff.bindAff)(printStack(v2.value0))(function () {
                                        return Control_Monad_Aff_Console.log("  ...");
                                    });
                                });
                            });
                        });
                    };
                    if (v2 instanceof Data_Either.Right) {
                        return Control_Monad_Aff_Console.log("ok " + (Data_Show.show(Data_Show.showInt)(v.value0) + (" " + label)));
                    };
                    throw new Error("Failed pattern match at Test.Unit.Output.TAP line 40, column 7 - line 47, column 58: " + [ v2.constructor.name ]);
                });
            })()));
        };
    };
    return Control_Bind.bind(Control_Monad_Aff.bindAff)(Test_Unit.collectTests(suite))(function (v) {
        return Control_Bind.bind(Control_Monad_Aff.bindAff)(Control_Monad_Aff_Console.log("1.." + Data_Show.show(Data_Show.showInt)(Data_List.length(v))))(function () {
            var acts = Data_Foldable.foldl(Data_List_Types.foldableList)(run)(new Data_Tuple.Tuple(1, Data_List_Types.Nil.value))(v);
            return Control_Bind.bind(Control_Monad_Aff.bindAff)(Data_Foldable.sequence_(Control_Monad_Aff.applicativeAff)(Data_List_Types.foldableList)(Data_Tuple.snd(acts)))(function () {
                return Control_Applicative.pure(Control_Monad_Aff.applicativeAff)(v);
            });
        });
    });
};
module.exports = {
    runTest: runTest, 
    requested: $foreign.requested
};
