// Generated by psc version 0.10.5
"use strict";
var Data_CatQueue = require("../Data.CatQueue");
var Data_Foldable = require("../Data.Foldable");
var Data_List = require("../Data.List");
var Control_Alt = require("../Control.Alt");
var Control_Alternative = require("../Control.Alternative");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Monad = require("../Control.Monad");
var Control_MonadPlus = require("../Control.MonadPlus");
var Control_MonadZero = require("../Control.MonadZero");
var Control_Plus = require("../Control.Plus");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_NaturalTransformation = require("../Data.NaturalTransformation");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Data_List_Types = require("../Data.List.Types");
var CatNil = (function () {
    function CatNil() {

    };
    CatNil.value = new CatNil();
    return CatNil;
})();
var CatCons = (function () {
    function CatCons(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    CatCons.create = function (value0) {
        return function (value1) {
            return new CatCons(value0, value1);
        };
    };
    return CatCons;
})();
var showCatList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        if (v instanceof CatNil) {
            return "CatNil";
        };
        if (v instanceof CatCons) {
            return "(CatList " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(Data_CatQueue.showCatQueue(showCatList(dictShow)))(v.value1) + ")")));
        };
        throw new Error("Failed pattern match at Data.CatList line 154, column 3 - line 155, column 3: " + [ v.constructor.name ]);
    });
};
var $$null = function (v) {
    if (v instanceof CatNil) {
        return true;
    };
    return false;
};
var link = function (v) {
    return function (cat) {
        if (v instanceof CatNil) {
            return cat;
        };
        if (v instanceof CatCons) {
            return new CatCons(v.value0, Data_CatQueue.snoc(v.value1)(cat));
        };
        throw new Error("Failed pattern match at Data.CatList line 111, column 1 - line 111, column 22: " + [ v.constructor.name, cat.constructor.name ]);
    };
};
var foldr = function (k) {
    return function (b) {
        return function (q) {
            var foldl = function (__copy_v) {
                return function (__copy_c) {
                    return function (__copy_v1) {
                        var v = __copy_v;
                        var c = __copy_c;
                        var v1 = __copy_v1;
                        tco: while (true) {
                            if (v1 instanceof Data_List_Types.Nil) {
                                return c;
                            };
                            if (v1 instanceof Data_List_Types.Cons) {
                                var __tco_v = v;
                                var __tco_c = v(c)(v1.value0);
                                var __tco_v1 = v1.value1;
                                v = __tco_v;
                                c = __tco_c;
                                v1 = __tco_v1;
                                continue tco;
                            };
                            throw new Error("Failed pattern match at Data.CatList line 126, column 3 - line 126, column 22: " + [ v.constructor.name, c.constructor.name, v1.constructor.name ]);
                        };
                    };
                };
            };
            var go = function (__copy_xs) {
                return function (__copy_ys) {
                    var xs = __copy_xs;
                    var ys = __copy_ys;
                    tco: while (true) {
                        var $33 = Data_CatQueue.uncons(xs);
                        if ($33 instanceof Data_Maybe.Nothing) {
                            return foldl(function (x) {
                                return function (i) {
                                    return i(x);
                                };
                            })(b)(ys);
                        };
                        if ($33 instanceof Data_Maybe.Just) {
                            var __tco_ys = new Data_List_Types.Cons(k($33.value0.value0), ys);
                            xs = $33.value0.value1;
                            ys = __tco_ys;
                            continue tco;
                        };
                        throw new Error("Failed pattern match at Data.CatList line 121, column 14 - line 123, column 67: " + [ $33.constructor.name ]);
                    };
                };
            };
            return go(q)(Data_List_Types.Nil.value);
        };
    };
};
var uncons = function (v) {
    if (v instanceof CatNil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof CatCons) {
        return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0, (function () {
            var $38 = Data_CatQueue["null"](v.value1);
            if ($38) {
                return CatNil.value;
            };
            if (!$38) {
                return foldr(link)(CatNil.value)(v.value1);
            };
            throw new Error("Failed pattern match at Data.CatList line 103, column 39 - line 103, column 89: " + [ $38.constructor.name ]);
        })()));
    };
    throw new Error("Failed pattern match at Data.CatList line 102, column 1 - line 102, column 24: " + [ v.constructor.name ]);
};
var foldMap = function (dictMonoid) {
    return function (f) {
        return function (v) {
            if (v instanceof CatNil) {
                return Data_Monoid.mempty(dictMonoid);
            };
            if (v instanceof CatCons) {
                var d = (function () {
                    var $43 = Data_CatQueue["null"](v.value1);
                    if ($43) {
                        return CatNil.value;
                    };
                    if (!$43) {
                        return foldr(link)(CatNil.value)(v.value1);
                    };
                    throw new Error("Failed pattern match at Data.CatList line 144, column 11 - line 144, column 61: " + [ $43.constructor.name ]);
                })();
                return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(f(v.value0))(foldMap(dictMonoid)(f)(d));
            };
            throw new Error("Failed pattern match at Data.CatList line 142, column 1 - line 142, column 26: " + [ f.constructor.name, v.constructor.name ]);
        };
    };
};
var foldableCatList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (l) {
            return foldMap(dictMonoid)(f)(l);
        };
    };
}, function (f) {
    return function (s) {
        return function (l) {
            return Data_Foldable.foldlDefault(foldableCatList)(f)(s)(l);
        };
    };
}, function (f) {
    return function (s) {
        return function (l) {
            return Data_Foldable.foldrDefault(foldableCatList)(f)(s)(l);
        };
    };
});
var empty = CatNil.value;
var append = function (v) {
    return function (v1) {
        if (v1 instanceof CatNil) {
            return v;
        };
        if (v instanceof CatNil) {
            return v1;
        };
        return link(v)(v1);
    };
};
var cons = function (a) {
    return function (cat) {
        return append(new CatCons(a, Data_CatQueue.empty))(cat);
    };
};
var map = function (v) {
    return function (v1) {
        if (v1 instanceof CatNil) {
            return CatNil.value;
        };
        if (v1 instanceof CatCons) {
            var d = (function () {
                var $50 = Data_CatQueue["null"](v1.value1);
                if ($50) {
                    return CatNil.value;
                };
                if (!$50) {
                    return foldr(link)(CatNil.value)(v1.value1);
                };
                throw new Error("Failed pattern match at Data.CatList line 138, column 11 - line 138, column 61: " + [ $50.constructor.name ]);
            })();
            return cons(v(v1.value0))(map(v)(d));
        };
        throw new Error("Failed pattern match at Data.CatList line 136, column 1 - line 136, column 22: " + [ v.constructor.name, v1.constructor.name ]);
    };
};
var functorCatList = new Data_Functor.Functor(map);
var singleton = function (a) {
    return cons(a)(CatNil.value);
};
var traversableCatList = new Data_Traversable.Traversable(function () {
    return foldableCatList;
}, function () {
    return functorCatList;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof CatNil) {
            return Control_Applicative.pure(dictApplicative)(CatNil.value);
        };
        if (v instanceof CatCons) {
            var d = (function () {
                var $54 = Data_CatQueue["null"](v.value1);
                if ($54) {
                    return CatNil.value;
                };
                if (!$54) {
                    return foldr(link)(CatNil.value)(v.value1);
                };
                throw new Error("Failed pattern match at Data.CatList line 176, column 13 - line 176, column 63: " + [ $54.constructor.name ]);
            })();
            return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(cons)(v.value0))(Data_Traversable.sequence(traversableCatList)(dictApplicative)(d));
        };
        throw new Error("Failed pattern match at Data.CatList line 174, column 3 - line 174, column 32: " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof CatNil) {
                return Control_Applicative.pure(dictApplicative)(CatNil.value);
            };
            if (v1 instanceof CatCons) {
                var d = (function () {
                    var $59 = Data_CatQueue["null"](v1.value1);
                    if ($59) {
                        return CatNil.value;
                    };
                    if (!$59) {
                        return foldr(link)(CatNil.value)(v1.value1);
                    };
                    throw new Error("Failed pattern match at Data.CatList line 172, column 13 - line 172, column 63: " + [ $59.constructor.name ]);
                })();
                return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(cons)(v(v1.value0)))(Data_Traversable.traverse(traversableCatList)(dictApplicative)(v)(d));
            };
            throw new Error("Failed pattern match at Data.CatList line 170, column 3 - line 170, column 34: " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
var semigroupCatList = new Data_Semigroup.Semigroup(append);
var monoidCatList = new Data_Monoid.Monoid(function () {
    return semigroupCatList;
}, CatNil.value);
var monadCatList = new Control_Monad.Monad(function () {
    return applicativeCatList;
}, function () {
    return bindCatList;
});
var bindCatList = new Control_Bind.Bind(function () {
    return applyCatList;
}, Data_Function.flip(foldMap(monoidCatList)));
var applyCatList = new Control_Apply.Apply(function () {
    return functorCatList;
}, Control_Monad.ap(monadCatList));
var applicativeCatList = new Control_Applicative.Applicative(function () {
    return applyCatList;
}, singleton);
var fromFoldable = function (dictFoldable) {
    return function (f) {
        return Data_Foldable.foldMap(dictFoldable)(monoidCatList)(singleton)(f);
    };
};
var snoc = function (cat) {
    return function (a) {
        return append(cat)(new CatCons(a, Data_CatQueue.empty));
    };
};
var unfoldableCatList = new Data_Unfoldable.Unfoldable(function (f) {
    return function (b) {
        var go = function (__copy_source) {
            return function (__copy_memo) {
                var source = __copy_source;
                var memo = __copy_memo;
                tco: while (true) {
                    var $62 = f(source);
                    if ($62 instanceof Data_Maybe.Nothing) {
                        return memo;
                    };
                    if ($62 instanceof Data_Maybe.Just) {
                        var __tco_memo = snoc(memo)($62.value0.value0);
                        source = $62.value0.value1;
                        memo = __tco_memo;
                        continue tco;
                    };
                    throw new Error("Failed pattern match at Data.CatList line 165, column 24 - line 167, column 57: " + [ $62.constructor.name ]);
                };
            };
        };
        return go(b)(CatNil.value);
    };
});
var altCatList = new Control_Alt.Alt(function () {
    return functorCatList;
}, append);
var plusCatList = new Control_Plus.Plus(function () {
    return altCatList;
}, empty);
var alternativeCatList = new Control_Alternative.Alternative(function () {
    return applicativeCatList;
}, function () {
    return plusCatList;
});
var monadZeroCatList = new Control_MonadZero.MonadZero(function () {
    return alternativeCatList;
}, function () {
    return monadCatList;
});
var monadPlusCatList = new Control_MonadPlus.MonadPlus(function () {
    return monadZeroCatList;
});
module.exports = {
    CatNil: CatNil, 
    CatCons: CatCons, 
    append: append, 
    cons: cons, 
    empty: empty, 
    fromFoldable: fromFoldable, 
    "null": $$null, 
    snoc: snoc, 
    uncons: uncons, 
    semigroupCatList: semigroupCatList, 
    monoidCatList: monoidCatList, 
    showCatList: showCatList, 
    foldableCatList: foldableCatList, 
    unfoldableCatList: unfoldableCatList, 
    traversableCatList: traversableCatList, 
    functorCatList: functorCatList, 
    applyCatList: applyCatList, 
    applicativeCatList: applicativeCatList, 
    bindCatList: bindCatList, 
    monadCatList: monadCatList, 
    altCatList: altCatList, 
    plusCatList: plusCatList, 
    alternativeCatList: alternativeCatList, 
    monadZeroCatList: monadZeroCatList, 
    monadPlusCatList: monadPlusCatList
};
