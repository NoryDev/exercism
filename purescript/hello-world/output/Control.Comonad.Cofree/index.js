// Generated by psc version 0.10.5
"use strict";
var Prelude = require("../Prelude");
var Control_Monad_Free = require("../Control.Monad.Free");
var Control_Alternative = require("../Control.Alternative");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad_State = require("../Control.Monad.State");
var Data_Foldable = require("../Data.Foldable");
var Data_Lazy = require("../Data.Lazy");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Eq = require("../Data.Eq");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Ord = require("../Data.Ord");
var Data_Ordering = require("../Data.Ordering");
var Data_Functor = require("../Data.Functor");
var Data_Function = require("../Data.Function");
var Data_Semigroup = require("../Data.Semigroup");
var Control_Category = require("../Control.Category");
var Control_Apply = require("../Control.Apply");
var Control_Applicative = require("../Control.Applicative");
var Control_Plus = require("../Control.Plus");
var Control_Bind = require("../Control.Bind");
var Control_Alt = require("../Control.Alt");
var Control_Monad = require("../Control.Monad");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Control_Monad_State_Class = require("../Control.Monad.State.Class");
var Control_Monad_State_Trans = require("../Control.Monad.State.Trans");
var Data_Identity = require("../Data.Identity");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Cofree = (function () {
    function Cofree(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Cofree.create = function (value0) {
        return function (value1) {
            return new Cofree(value0, value1);
        };
    };
    return Cofree;
})();
var unfoldCofree = function (dictFunctor) {
    return function (s) {
        return function (e) {
            return function (n) {
                return new Cofree(e(s), Data_Lazy.defer(function (v) {
                    return Data_Functor.map(dictFunctor)(function (s1) {
                        return unfoldCofree(dictFunctor)(s1)(e)(n);
                    })(n(s));
                }));
            };
        };
    };
};
var tail = function (v) {
    return Data_Lazy.force(v.value1);
};
var mkCofree = function (a) {
    return function (t) {
        return new Cofree(a, Data_Lazy.defer(function (v) {
            return t;
        }));
    };
};
var head = function (v) {
    return v.value0;
};
var hoistCofree = function (dictFunctor) {
    return function (nat) {
        return function (cf) {
            return mkCofree(head(cf))(nat(Data_Functor.map(dictFunctor)(hoistCofree(dictFunctor)(nat))(tail(cf))));
        };
    };
};
var foldableCofree = function (dictFoldable) {
    return new Data_Foldable.Foldable(function (dictMonoid) {
        return function (f) {
            var go = function (fa) {
                return Data_Semigroup.append(dictMonoid["__superclass_Data.Semigroup.Semigroup_0"]())(f(head(fa)))(Data_Foldable.foldMap(dictFoldable)(dictMonoid)(go)(tail(fa)));
            };
            return go;
        };
    }, function (f) {
        var go = function (b) {
            return function (fa) {
                return Data_Foldable.foldl(dictFoldable)(go)(f(b)(head(fa)))(tail(fa));
            };
        };
        return go;
    }, function (f) {
        var go = function (fa) {
            return function (b) {
                return f(head(fa))(Data_Foldable.foldr(dictFoldable)(go)(b)(tail(fa)));
            };
        };
        return Data_Function.flip(go);
    });
};
var eqCofree = function (dictEq) {
    return function (dictEq1) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                return Data_Eq.eq(dictEq1)(head(x))(head(y)) && Data_Eq.eq(dictEq)(tail(x))(tail(y));
            };
        });
    };
};
var ordCofree = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqCofree(dictOrd["__superclass_Data.Eq.Eq_0"]())(dictOrd1["__superclass_Data.Eq.Eq_0"]());
        }, function (x) {
            return function (y) {
                var $34 = Data_Ord.compare(dictOrd1)(head(x))(head(y));
                if ($34 instanceof Data_Ordering.EQ) {
                    return Data_Ord.compare(dictOrd)(tail(x))(tail(y));
                };
                return $34;
            };
        });
    };
};
var _tail = function (v) {
    return v.value1;
};
var _lift = function (dictFunctor) {
    return function ($41) {
        return Data_Functor.map(Data_Lazy.functorLazy)(Data_Functor.map(dictFunctor)($41));
    };
};
var functorCofree = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        var loop = function (fa) {
            return new Cofree(f(head(fa)), _lift(dictFunctor)(loop)(_tail(fa)));
        };
        return loop;
    });
};
var applyCofree = function (dictApply) {
    return new Control_Apply.Apply(function () {
        return functorCofree(dictApply["__superclass_Data.Functor.Functor_0"]());
    }, function (f) {
        return function (x) {
            var t = Control_Apply.apply(dictApply)(Data_Functor.map(dictApply["__superclass_Data.Functor.Functor_0"]())(Control_Apply.apply(applyCofree(dictApply)))(tail(f)))(tail(x));
            var h = head(f)(head(x));
            return mkCofree(h)(t);
        };
    });
};
var applicativeCofree = function (dictAlternative) {
    return new Control_Applicative.Applicative(function () {
        return applyCofree((dictAlternative["__superclass_Control.Applicative.Applicative_0"]())["__superclass_Control.Apply.Apply_0"]());
    }, function (a) {
        return mkCofree(a)(Control_Plus.empty(dictAlternative["__superclass_Control.Plus.Plus_1"]()));
    });
};
var bindCofree = function (dictAlternative) {
    return new Control_Bind.Bind(function () {
        return applyCofree((dictAlternative["__superclass_Control.Applicative.Applicative_0"]())["__superclass_Control.Apply.Apply_0"]());
    }, function (fa) {
        return function (f) {
            var loop = function (fa$prime) {
                var fh = f(head(fa$prime));
                return mkCofree(head(fh))(Control_Alt.alt((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())(tail(fh))(Data_Functor.map(((dictAlternative["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())["__superclass_Data.Functor.Functor_0"]())(loop)(tail(fa$prime))));
            };
            return loop(fa);
        };
    });
};
var monadCofree = function (dictAlternative) {
    return new Control_Monad.Monad(function () {
        return applicativeCofree(dictAlternative);
    }, function () {
        return bindCofree(dictAlternative);
    });
};
var extendCofree = function (dictFunctor) {
    return new Control_Extend.Extend(function () {
        return functorCofree(dictFunctor);
    }, function (f) {
        var loop = function (fa) {
            return new Cofree(f(fa), _lift(dictFunctor)(loop)(_tail(fa)));
        };
        return loop;
    });
};
var comonadCofree = function (dictFunctor) {
    return new Control_Comonad.Comonad(function () {
        return extendCofree(dictFunctor);
    }, head);
};
var explore = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (pair) {
            return function (m) {
                return function (w) {
                    var step = function (ff) {
                        return Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (cof) {
                            return pair(Data_Functor.map(dictFunctor)(Data_Tuple.Tuple.create)(ff))(tail(cof));
                        });
                    };
                    var $38 = Control_Monad_State.runState(Control_Monad_Free.runFreeM(dictFunctor)(Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity))(step)(m))(w);
                    return $38.value0(Control_Comonad.extract(comonadCofree(dictFunctor1))($38.value1));
                };
            };
        };
    };
};
var traversableCofree = function (dictTraversable) {
    return new Data_Traversable.Traversable(function () {
        return foldableCofree(dictTraversable["__superclass_Data.Foldable.Foldable_1"]());
    }, function () {
        return functorCofree(dictTraversable["__superclass_Data.Functor.Functor_0"]());
    }, function (dictApplicative) {
        return Data_Traversable.traverse(traversableCofree(dictTraversable))(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
    }, function (dictApplicative) {
        return function (f) {
            var loop = function (ta) {
                return Control_Apply.apply(dictApplicative["__superclass_Control.Apply.Apply_0"]())(Data_Functor.map((dictApplicative["__superclass_Control.Apply.Apply_0"]())["__superclass_Data.Functor.Functor_0"]())(mkCofree)(f(head(ta))))(Data_Traversable.traverse(dictTraversable)(dictApplicative)(loop)(tail(ta)));
            };
            return loop;
        };
    });
};
module.exports = {
    explore: explore, 
    head: head, 
    hoistCofree: hoistCofree, 
    mkCofree: mkCofree, 
    tail: tail, 
    unfoldCofree: unfoldCofree, 
    eqCofree: eqCofree, 
    ordCofree: ordCofree, 
    functorCofree: functorCofree, 
    foldableCofree: foldableCofree, 
    traversableCofree: traversableCofree, 
    extendCofree: extendCofree, 
    comonadCofree: comonadCofree, 
    applyCofree: applyCofree, 
    applicativeCofree: applicativeCofree, 
    bindCofree: bindCofree, 
    monadCofree: monadCofree
};
