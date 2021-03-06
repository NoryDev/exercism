// Generated by psc version 0.10.5
"use strict";
var $foreign = require("./foreign");
var Prelude = require("../Prelude");
var Control_Alt = require("../Control.Alt");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Random = require("../Control.Monad.Eff.Random");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Control_Monad_State = require("../Control.Monad.State");
var Control_Monad_State_Class = require("../Control.Monad.State.Class");
var Control_Monad_State_Trans = require("../Control.Monad.State.Trans");
var Data_Array = require("../Data.Array");
var Data_Foldable = require("../Data.Foldable");
var Data_Identity = require("../Data.Identity");
var Data_Int = require("../Data.Int");
var Data_List = require("../Data.List");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid_Additive = require("../Data.Monoid.Additive");
var Data_Newtype = require("../Data.Newtype");
var Data_Tuple = require("../Data.Tuple");
var $$Math = require("../Math");
var Test_QuickCheck_LCG = require("../Test.QuickCheck.LCG");
var Data_Functor = require("../Data.Functor");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Function = require("../Data.Function");
var Data_Ord = require("../Data.Ord");
var Data_List_Types = require("../Data.List.Types");
var Data_Ring = require("../Data.Ring");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_Semiring = require("../Data.Semiring");
var Data_Boolean = require("../Data.Boolean");
var Data_Eq = require("../Data.Eq");
var Data_Unit = require("../Data.Unit");
var Gen = function (x) {
    return x;
};
var unGen = function (v) {
    return v;
};
var runGen = function ($59) {
    return Control_Monad_State.runState(unGen($59));
};
var stateful = function (f) {
    return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
        return runGen(f(s))(s);
    }));
};
var sized = function (f) {
    return stateful(function (s) {
        return f(s.size);
    });
};
var variant = function (n) {
    return function (g) {
        return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
            return runGen(g)((function () {
                var $16 = {};
                for (var $17 in s) {
                    if ({}.hasOwnProperty.call(s, $17)) {
                        $16[$17] = s[$17];
                    };
                };
                $16.newSeed = n;
                return $16;
            })());
        }));
    };
};
var resize = function (sz) {
    return function (g) {
        return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
            return runGen(g)((function () {
                var $19 = {};
                for (var $20 in s) {
                    if ({}.hasOwnProperty.call(s, $20)) {
                        $19[$20] = s[$20];
                    };
                };
                $19.size = sz;
                return $19;
            })());
        }));
    };
};
var replicateMRec = function (dictMonadRec) {
    return function (k) {
        return function (v) {
            if (k <= 0) {
                return Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(Data_List_Types.Nil.value);
            };
            var go = function (v1) {
                if (v1.value1 === 0) {
                    return Control_Applicative.pure((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Applicative.Applicative_0"]())(new Control_Monad_Rec_Class.Done(v1.value0));
                };
                return Data_Functor.mapFlipped((((dictMonadRec["__superclass_Control.Monad.Monad_0"]())["__superclass_Control.Bind.Bind_1"]())["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(v)(function (x) {
                    return new Control_Monad_Rec_Class.Loop(new Data_Tuple.Tuple(new Data_List_Types.Cons(x, v1.value0), v1.value1 - 1));
                });
            };
            return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go)(new Data_Tuple.Tuple(Data_List_Types.Nil.value, k));
        };
    };
};
var repeatable = function (f) {
    return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
        return new Data_Tuple.Tuple(function (a) {
            return Data_Tuple.fst(runGen(f(a))(s));
        }, (function () {
            var $29 = {};
            for (var $30 in s) {
                if ({}.hasOwnProperty.call(s, $30)) {
                    $29[$30] = s[$30];
                };
            };
            $29.newSeed = Test_QuickCheck_LCG.lcgNext(s.newSeed);
            return $29;
        })());
    }));
};
var perturbGen = function (n) {
    return function (gen) {
        return Control_Bind.bind(Control_Monad_State_Trans.bindStateT(Data_Identity.monadIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
            var $32 = {};
            for (var $33 in s) {
                if ({}.hasOwnProperty.call(s, $33)) {
                    $32[$33] = s[$33];
                };
            };
            $32.newSeed = Test_QuickCheck_LCG.lcgPerturb(Data_Int.toNumber($foreign.float32ToInt32(n)))(s.newSeed);
            return $32;
        }))(function () {
            return unGen(gen);
        });
    };
};
var monadRecGen = Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity);
var monadGen = Control_Monad_State_Trans.monadStateT(Data_Identity.monadIdentity);
var listOf = replicateMRec(monadRecGen);
var lcgStep = (function () {
    var f = function (s) {
        return new Data_Tuple.Tuple(Test_QuickCheck_LCG.runSeed(s.newSeed), (function () {
            var $35 = {};
            for (var $36 in s) {
                if ({}.hasOwnProperty.call(s, $36)) {
                    $35[$36] = s[$36];
                };
            };
            $35.newSeed = Test_QuickCheck_LCG.lcgNext(s.newSeed);
            return $35;
        })());
    };
    return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(f));
})();
var functorGen = Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity);
var uniform = Data_Functor.map(functorGen)(function (n) {
    return Data_Int.toNumber(n) / Data_Int.toNumber(Test_QuickCheck_LCG.lcgN);
})(lcgStep);
var vectorOf = function (k) {
    return function (g) {
        return Data_Functor.map(functorGen)(Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray))(listOf(k)(g));
    };
};
var evalGen = function ($60) {
    return Control_Monad_State.evalState(unGen($60));
};
var sample = function (seed) {
    return function (sz) {
        return function (g) {
            return evalGen(vectorOf(sz)(g))({
                newSeed: seed, 
                size: sz
            });
        };
    };
};
var randomSample$prime = function (n) {
    return function (g) {
        return function __do() {
            var v = Test_QuickCheck_LCG.randomSeed();
            return sample(v)(n)(g);
        };
    };
};
var randomSample = randomSample$prime(10);
var chooseInt = function (a) {
    return function (b) {
        var clamp = function (x) {
            var $39 = x % ((b - a) + 1 | 0);
            if ($39 >= 0) {
                return a + $39 | 0;
            };
            if (Data_Boolean.otherwise) {
                return (b + $39 | 0) + 1 | 0;
            };
            throw new Error("Failed pattern match at Test.QuickCheck.Gen line 123, column 13 - line 125, column 43: " + [ $39.constructor.name ]);
        };
        return Data_Functor.map(functorGen)(clamp)(lcgStep);
    };
};
var choose = function (a) {
    return function (b) {
        var min = $$Math.min(a)(b);
        var max = $$Math.max(a)(b);
        return Data_Functor.map(functorGen)(function ($61) {
            return min + (max - min) * $61;
        })(uniform);
    };
};
var bindGen = Control_Monad_State_Trans.bindStateT(Data_Identity.monadIdentity);
var frequency = function (x) {
    return function (xs) {
        var xxs = new Data_List_Types.Cons(x, xs);
        var total = Data_Newtype.unwrap(Data_Monoid_Additive.newtypeAdditive)(Data_Foldable.fold(Data_List_Types.foldableList)(Data_Monoid_Additive.monoidAdditive(Data_Semiring.semiringNumber))(Data_Functor.map(Data_List_Types.functorList)(function ($62) {
            return Data_Monoid_Additive.Additive(Data_Tuple.fst($62));
        })(xxs)));
        var pick = function (__copy_n) {
            return function (__copy_d) {
                return function (__copy_v) {
                    var n = __copy_n;
                    var d = __copy_d;
                    var v = __copy_v;
                    tco: while (true) {
                        if (v instanceof Data_List_Types.Nil) {
                            return d;
                        };
                        if (v instanceof Data_List_Types.Cons) {
                            var $43 = n <= v.value0.value0;
                            if ($43) {
                                return v.value0.value1;
                            };
                            if (!$43) {
                                var __tco_n = n - v.value0.value0;
                                var __tco_d = d;
                                var __tco_v = v.value1;
                                n = __tco_n;
                                d = __tco_d;
                                v = __tco_v;
                                continue tco;
                            };
                            throw new Error("Failed pattern match at Test.QuickCheck.Gen line 141, column 40 - line 141, column 81: " + [ $43.constructor.name ]);
                        };
                        throw new Error("Failed pattern match at Test.QuickCheck.Gen line 137, column 18 - line 144, column 23: " + [ n.constructor.name, d.constructor.name, v.constructor.name ]);
                    };
                };
            };
        };
        return Control_Bind.bind(bindGen)(choose(0)(total))(function (v) {
            return pick(v)(Data_Tuple.snd(x))(xxs);
        });
    };
};
var oneOf = function (x) {
    return function (xs) {
        return Control_Bind.bind(bindGen)(chooseInt(0)(Data_Array.length(xs)))(function (v) {
            var $50 = v < 1;
            if ($50) {
                return x;
            };
            if (!$50) {
                return Data_Maybe.fromMaybe(x)(Data_Array.index(xs)(v - 1));
            };
            throw new Error("Failed pattern match at Test.QuickCheck.Gen line 132, column 3 - line 132, column 55: " + [ $50.constructor.name ]);
        });
    };
};
var arrayOf = function (g) {
    return sized(function (n) {
        return Control_Bind.bind(bindGen)(chooseInt(0)(n))(function (v) {
            return vectorOf(v)(g);
        });
    });
};
var applyGen = Control_Monad_State_Trans.applyStateT(Data_Identity.monadIdentity);
var applicativeGen = Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity);
var arrayOf1 = function (g) {
    return sized(function (n) {
        return Control_Bind.bind(bindGen)(chooseInt(0)(n))(function (v) {
            return Control_Bind.bind(bindGen)(g)(function (v1) {
                return Control_Bind.bind(bindGen)(vectorOf(v - 1)(g))(function (v2) {
                    return Control_Applicative.pure(applicativeGen)(new Data_Tuple.Tuple(v1, v2));
                });
            });
        });
    });
};
var elements = function (x) {
    return function (xs) {
        return Control_Bind.bind(bindGen)(chooseInt(0)(Data_Array.length(xs)))(function (v) {
            return Control_Applicative.pure(applicativeGen)((function () {
                var $56 = v === 0;
                if ($56) {
                    return x;
                };
                if (!$56) {
                    return Data_Maybe.fromMaybe(x)(Data_Array.index(xs)(v - 1));
                };
                throw new Error("Failed pattern match at Test.QuickCheck.Gen line 181, column 8 - line 181, column 62: " + [ $56.constructor.name ]);
            })());
        });
    };
};
var suchThat = function (gen) {
    return function (pred) {
        var go = function (v) {
            return Control_Bind.bind(bindGen)(gen)(function (v1) {
                return Control_Applicative.pure(applicativeGen)((function () {
                    var $58 = pred(v1);
                    if ($58) {
                        return new Control_Monad_Rec_Class.Done(v1);
                    };
                    if (!$58) {
                        return new Control_Monad_Rec_Class.Loop(Data_Unit.unit);
                    };
                    throw new Error("Failed pattern match at Test.QuickCheck.Gen line 100, column 10 - line 100, column 46: " + [ $58.constructor.name ]);
                })());
            });
        };
        return Control_Monad_Rec_Class.tailRecM(monadRecGen)(go)(Data_Unit.unit);
    };
};
var altGen = Control_Monad_State_Trans.altStateT(Data_Identity.monadIdentity)(Data_Identity.altIdentity);
module.exports = {
    arrayOf: arrayOf, 
    arrayOf1: arrayOf1, 
    choose: choose, 
    chooseInt: chooseInt, 
    elements: elements, 
    evalGen: evalGen, 
    frequency: frequency, 
    listOf: listOf, 
    oneOf: oneOf, 
    perturbGen: perturbGen, 
    randomSample: randomSample, 
    "randomSample'": randomSample$prime, 
    repeatable: repeatable, 
    resize: resize, 
    runGen: runGen, 
    sample: sample, 
    sized: sized, 
    stateful: stateful, 
    suchThat: suchThat, 
    unGen: unGen, 
    uniform: uniform, 
    variant: variant, 
    vectorOf: vectorOf, 
    functorGen: functorGen, 
    applyGen: applyGen, 
    applicativeGen: applicativeGen, 
    bindGen: bindGen, 
    monadGen: monadGen, 
    altGen: altGen, 
    monadRecGen: monadRecGen
};
