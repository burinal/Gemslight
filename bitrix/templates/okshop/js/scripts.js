/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (a, b) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    "use strict";
    var c = [], d = a.document, e = Object.getPrototypeOf, f = c.slice, g = c.concat, h = c.push, i = c.indexOf, j = {},
        k = j.toString, l = j.hasOwnProperty, m = l.toString, n = m.call(Object), o = {};

    function p(a, b) {
        b = b || d;
        var c = b.createElement("script");
        c.text = a, b.head.appendChild(c).parentNode.removeChild(c)
    }

    var q = "3.2.1", r = function (a, b) {
        return new r.fn.init(a, b)
    }, s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, t = /^-ms-/, u = /-([a-z])/g, v = function (a, b) {
        return b.toUpperCase()
    };
    r.fn = r.prototype = {
        jquery: q, constructor: r, length: 0, toArray: function () {
            return f.call(this)
        }, get: function (a) {
            return null == a ? f.call(this) : a < 0 ? this[a + this.length] : this[a]
        }, pushStack: function (a) {
            var b = r.merge(this.constructor(), a);
            return b.prevObject = this, b
        }, each: function (a) {
            return r.each(this, a)
        }, map: function (a) {
            return this.pushStack(r.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, slice: function () {
            return this.pushStack(f.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (a) {
            var b = this.length, c = +a + (a < 0 ? b : 0);
            return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
        }, end: function () {
            return this.prevObject || this.constructor()
        }, push: h, sort: c.sort, splice: c.splice
    }, r.extend = r.fn.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++) if (null != (a = arguments[h])) for (b in a) c = g[b], d = a[b], g !== d && (j && d && (r.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, r.extend({
        expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
            throw new Error(a)
        }, noop: function () {
        }, isFunction: function (a) {
            return "function" === r.type(a)
        }, isWindow: function (a) {
            return null != a && a === a.window
        }, isNumeric: function (a) {
            var b = r.type(a);
            return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a))
        }, isPlainObject: function (a) {
            var b, c;
            return !(!a || "[object Object]" !== k.call(a)) && (!(b = e(a)) || (c = l.call(b, "constructor") && b.constructor, "function" == typeof c && m.call(c) === n))
        }, isEmptyObject: function (a) {
            var b;
            for (b in a) return !1;
            return !0
        }, type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? j[k.call(a)] || "object" : typeof a
        }, globalEval: function (a) {
            p(a)
        }, camelCase: function (a) {
            return a.replace(t, "ms-").replace(u, v)
        }, each: function (a, b) {
            var c, d = 0;
            if (w(a)) {
                for (c = a.length; d < c; d++) if (b.call(a[d], d, a[d]) === !1) break
            } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
            return a
        }, trim: function (a) {
            return null == a ? "" : (a + "").replace(s, "")
        }, makeArray: function (a, b) {
            var c = b || [];
            return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c
        }, inArray: function (a, b, c) {
            return null == b ? -1 : i.call(b, a, c)
        }, merge: function (a, b) {
            for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
            return a.length = e, a
        }, grep: function (a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        }, map: function (a, b, c) {
            var d, e, f = 0, h = [];
            if (w(a)) for (d = a.length; f < d; f++) e = b(a[f], f, c), null != e && h.push(e); else for (f in a) e = b(a[f], f, c), null != e && h.push(e);
            return g.apply([], h)
        }, guid: 1, proxy: function (a, b) {
            var c, d, e;
            if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), e = function () {
                return a.apply(b || this, d.concat(f.call(arguments)))
            }, e.guid = a.guid = a.guid || r.guid++, e
        }, now: Date.now, support: o
    }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
        j["[object " + b + "]"] = b.toLowerCase()
    });

    function w(a) {
        var b = !!a && "length" in a && a.length, c = r.type(a);
        return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)
    }

    var x = function (a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date, v = a.document, w = 0,
            x = 0, y = ha(), z = ha(), A = ha(), B = function (a, b) {
                return a === b && (l = !0), 0
            }, C = {}.hasOwnProperty, D = [], E = D.pop, F = D.push, G = D.push, H = D.slice, I = function (a, b) {
                for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
                return -1
            },
            J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            K = "[\\x20\\t\\r\\n\\f]", L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]",
            N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
            O = new RegExp(K + "+", "g"), P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
            Q = new RegExp("^" + K + "*," + K + "*"), R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
            S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"), T = new RegExp(N),
            U = new RegExp("^" + L + "$"), V = {
                ID: new RegExp("^#(" + L + ")"),
                CLASS: new RegExp("^\\.(" + L + ")"),
                TAG: new RegExp("^(" + L + "|[*])"),
                ATTR: new RegExp("^" + M),
                PSEUDO: new RegExp("^" + N),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + J + ")$", "i"),
                needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i")
            }, W = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, $ = /[+~]/,
            _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"), aa = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            }, ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ca = function (a, b) {
                return b ? "\0" === a ? "\ufffd" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
            }, da = function () {
                m()
            }, ea = ta(function (a) {
                return a.disabled === !0 && ("form" in a || "label" in a)
            }, {dir: "parentNode", next: "legend"});
        try {
            G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType
        } catch (fa) {
            G = {
                apply: D.length ? function (a, b) {
                    F.apply(a, H.call(b))
                } : function (a, b) {
                    var c = a.length, d = 0;
                    while (a[c++] = b[d++]) ;
                    a.length = c - 1
                }
            }
        }

        function ga(a, b, d, e) {
            var f, h, j, k, l, o, r, s = b && b.ownerDocument, w = b ? b.nodeType : 9;
            if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d;
            if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
                if (11 !== w && (l = Z.exec(a))) if (f = l[1]) {
                    if (9 === w) {
                        if (!(j = b.getElementById(f))) return d;
                        if (j.id === f) return d.push(j), d
                    } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d
                } else {
                    if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d;
                    if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d
                }
                if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                    if (1 !== w) s = b, r = a; else if ("object" !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), o = g(a), h = o.length;
                        while (h--) o[h] = "#" + k + " " + sa(o[h]);
                        r = o.join(","), s = $.test(a) && qa(b.parentNode) || b
                    }
                    if (r) try {
                        return G.apply(d, s.querySelectorAll(r)), d
                    } catch (x) {
                    } finally {
                        k === u && b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(P, "$1"), b, d, e)
        }

        function ha() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }

            return b
        }

        function ia(a) {
            return a[u] = !0, a
        }

        function ja(a) {
            var b = n.createElement("fieldset");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function ka(a, b) {
            var c = a.split("|"), e = c.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function la(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return -1;
            return a ? 1 : -1
        }

        function ma(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function na(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function oa(a) {
            return function (b) {
                return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ea(b) === a : b.disabled === a : "label" in b && b.disabled === a
            }
        }

        function pa(a) {
            return ia(function (b) {
                return b = +b, ia(function (c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function qa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }

        c = ga.support = {}, f = ga.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName
        }, m = ga.setDocument = function (a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function (a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ja(function (a) {
                return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function (a) {
                return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length
            }), c.getById ? (d.filter.ID = function (a) {
                var b = a.replace(_, aa);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }, d.find.ID = function (a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c ? [c] : []
                }
            }) : (d.filter.ID = function (a) {
                var b = a.replace(_, aa);
                return function (a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }, d.find.ID = function (a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c, d, e, f = b.getElementById(a);
                    if (f) {
                        if (c = f.getAttributeNode("id"), c && c.value === a) return [f];
                        e = b.getElementsByName(a), d = 0;
                        while (f = e[d++]) if (c = f.getAttributeNode("id"), c && c.value === a) return [f]
                    }
                    return []
                }
            }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            } : function (a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                if ("undefined" != typeof b.getElementsByClassName && p) return b.getElementsByClassName(a)
            }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function (a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }), ja(function (a) {
                a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var b = n.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
                c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;
                return !1
            }, B = b ? function (a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1)
            } : function (a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0, e = a.parentNode, f = b.parentNode, g = [a], h = [b];
                if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0;
                if (e === f) return la(a, b);
                c = a;
                while (c = c.parentNode) g.unshift(c);
                c = b;
                while (c = c.parentNode) h.unshift(c);
                while (g[d] === h[d]) d++;
                return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
            }, n) : n
        }, ga.matches = function (a, b) {
            return ga(a, null, null, b)
        }, ga.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {
            }
            return ga(b, n, null, [a]).length > 0
        }, ga.contains = function (a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, ga.attr = function (a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, ga.escape = function (a) {
            return (a + "").replace(ba, ca)
        }, ga.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, ga.uniqueSort = function (a) {
            var b, d = [], e = 0, f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = ga.getText = function (a) {
            var b, c = "", d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else while (b = a[d++]) c += e(b);
            return c
        }, d = ga.selectors = {
            cacheLength: 50,
            createPseudo: ia,
            match: V,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                }, CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a
                }, PSEUDO: function (a) {
                    var b, c = !a[6] && a[2];
                    return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function (a) {
                    var b = a.replace(_, aa).toLowerCase();
                    return "*" === a ? function () {
                        return !0
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                }, CLASS: function (a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function (a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                }, ATTR: function (a, b, c) {
                    return function (d) {
                        var e = ga.attr(d, a);
                        return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(O, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"))
                    }
                }, CHILD: function (a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode
                    } : function (b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                        if (q) {
                            if (f) {
                                while (p) {
                                    m = b;
                                    while (m = m[p]) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                                while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if (1 === m.nodeType && ++t && m === b) {
                                    k[a] = [w, n, t];
                                    break
                                }
                            } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
                            return t -= e, t === d || t % d === 0 && t / d >= 0
                        }
                    }
                }, PSEUDO: function (a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
                        var d, f = e(a, b), g = f.length;
                        while (g--) d = I(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function (a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: ia(function (a) {
                    var b = [], c = [], d = h(a.replace(P, "$1"));
                    return d[u] ? ia(function (a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--) (f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function (a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                    }
                }), has: ia(function (a) {
                    return function (b) {
                        return ga(a, b).length > 0
                    }
                }), contains: ia(function (a) {
                    return a = a.replace(_, aa), function (b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    }
                }), lang: ia(function (a) {
                    return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(), function (b) {
                        var c;
                        do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }), target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                }, root: function (a) {
                    return a === o
                }, focus: function (a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                }, enabled: oa(!1), disabled: oa(!0), checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                }, selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                }, empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0
                }, parent: function (a) {
                    return !d.pseudos.empty(a)
                }, header: function (a) {
                    return X.test(a.nodeName)
                }, input: function (a) {
                    return W.test(a.nodeName)
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                }, text: function (a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                }, first: pa(function () {
                    return [0]
                }), last: pa(function (a, b) {
                    return [b - 1]
                }), eq: pa(function (a, b, c) {
                    return [c < 0 ? c + b : c]
                }), even: pa(function (a, b) {
                    for (var c = 0; c < b; c += 2) a.push(c);
                    return a
                }), odd: pa(function (a, b) {
                    for (var c = 1; c < b; c += 2) a.push(c);
                    return a
                }), lt: pa(function (a, b, c) {
                    for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }), gt: pa(function (a, b, c) {
                    for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) d.pseudos[b] = ma(b);
        for (b in{submit: !0, reset: !0}) d.pseudos[b] = na(b);

        function ra() {
        }

        ra.prototype = d.filters = d.pseudos, d.setFilters = new ra, g = ga.tokenize = function (a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(P, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
        };

        function sa(a) {
            for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
            return d
        }

        function ta(a, b, c) {
            var d = b.dir, e = b.next, f = e || d, g = c && "parentNode" === f, h = x++;
            return b.first ? function (b, c, e) {
                while (b = b[d]) if (1 === b.nodeType || g) return a(b, c, e);
                return !1
            } : function (b, c, i) {
                var j, k, l, m = [w, h];
                if (i) {
                    while (b = b[d]) if ((1 === b.nodeType || g) && a(b, c, i)) return !0
                } else while (b = b[d]) if (1 === b.nodeType || g) if (l = b[u] || (b[u] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b; else {
                    if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2];
                    if (k[f] = m, m[2] = a(b, c, i)) return !0
                }
                return !1
            }
        }

        function ua(a) {
            return a.length > 1 ? function (b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function va(a, b, c) {
            for (var d = 0, e = b.length; d < e; d++) ga(a, b[d], c);
            return c
        }

        function wa(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g
        }

        function xa(a, b, c, d, e, f) {
            return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function (f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || va(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : wa(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = wa(r, n), d(j, [], h, i), k = j.length;
                    while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--) (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--) (l = r[k]) && (j = e ? I(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r)
            })
        }

        function ya(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function (a) {
                return a === b
            }, h, !0), l = ta(function (a) {
                return I(b, a) > -1
            }, h, !0), m = [function (a, c, d) {
                var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                return b = null, e
            }]; i < f; i++) if (c = d.relative[a[i].type]) m = [ta(ua(m), c)]; else {
                if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                    for (e = ++i; e < f; e++) if (d.relative[a[e].type]) break;
                    return xa(i > 1 && ua(m), i > 1 && sa(a.slice(0, i - 1).concat({value: " " === a[i - 2].type ? "*" : ""})).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a))
                }
                m.push(c)
            }
            return ua(m)
        }

        function za(a, b) {
            var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) {
                var l, o, q, r = 0, s = "0", t = f && [], u = [], v = j, x = f || e && d.find.TAG("*", k),
                    y = w += null == v ? 1 : Math.random() || .1, z = x.length;
                for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                    if (e && l) {
                        o = 0, g || l.ownerDocument === n || (m(l), h = !p);
                        while (q = a[o++]) if (q(l, g || n, h)) {
                            i.push(l);
                            break
                        }
                        k && (w = y)
                    }
                    c && ((l = !q && l) && r--, f && t.push(l))
                }
                if (r += s, c && s !== r) {
                    o = 0;
                    while (q = b[o++]) q(t, u, g, h);
                    if (f) {
                        if (r > 0) while (s--) t[s] || u[s] || (u[s] = E.call(i));
                        u = wa(u)
                    }
                    G.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && ga.uniqueSort(i)
                }
                return k && (w = y, j = v), t
            };
            return c ? ia(f) : f
        }

        return h = ga.compile = function (a, b) {
            var c, d = [], e = [], f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = ya(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, za(e, d)), f.selector = a
            }
            return f
        }, i = ga.select = function (a, b, c, e) {
            var f, i, j, k, l, m = "function" == typeof a && a, n = !e && g(a = m.selector || a);
            if (c = c || [], 1 === n.length) {
                if (i = n[0] = n[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && 9 === b.nodeType && p && d.relative[i[1].type]) {
                    if (b = (d.find.ID(j.matches[0].replace(_, aa), b) || [])[0], !b) return c;
                    m && (b = b.parentNode), a = a.slice(i.shift().value.length)
                }
                f = V.needsContext.test(a) ? 0 : i.length;
                while (f--) {
                    if (j = i[f], d.relative[k = j.type]) break;
                    if ((l = d.find[k]) && (e = l(j.matches[0].replace(_, aa), $.test(i[0].type) && qa(b.parentNode) || b))) {
                        if (i.splice(f, 1), a = e.length && sa(i), !a) return G.apply(c, e), c;
                        break
                    }
                }
            }
            return (m || h(a, n))(e, b, !p, c, !b || $.test(a) && qa(b.parentNode) || b), c
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
            return 1 & a.compareDocumentPosition(n.createElement("fieldset"))
        }), ja(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || ka("type|href|height|width", function (a, b, c) {
            if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ja(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || ka("value", function (a, b, c) {
            if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
        }), ja(function (a) {
            return null == a.getAttribute("disabled")
        }) || ka(J, function (a, b, c) {
            var d;
            if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), ga
    }(a);
    r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape;
    var y = function (a, b, c) {
        var d = [], e = void 0 !== c;
        while ((a = a[b]) && 9 !== a.nodeType) if (1 === a.nodeType) {
            if (e && r(a).is(c)) break;
            d.push(a)
        }
        return d
    }, z = function (a, b) {
        for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
        return c
    }, A = r.expr.match.needsContext;

    function B(a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    }

    var C = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, D = /^.[^:#\[\.,]*$/;

    function E(a, b, c) {
        return r.isFunction(b) ? r.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c
        }) : b.nodeType ? r.grep(a, function (a) {
            return a === b !== c
        }) : "string" != typeof b ? r.grep(a, function (a) {
            return i.call(b, a) > -1 !== c
        }) : D.test(b) ? r.filter(b, a, c) : (b = r.filter(b, a), r.grep(a, function (a) {
            return i.call(b, a) > -1 !== c && 1 === a.nodeType
        }))
    }

    r.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    }, r.fn.extend({
        find: function (a) {
            var b, c, d = this.length, e = this;
            if ("string" != typeof a) return this.pushStack(r(a).filter(function () {
                for (b = 0; b < d; b++) if (r.contains(e[b], this)) return !0
            }));
            for (c = this.pushStack([]), b = 0; b < d; b++) r.find(a, e[b], c);
            return d > 1 ? r.uniqueSort(c) : c
        }, filter: function (a) {
            return this.pushStack(E(this, a || [], !1))
        }, not: function (a) {
            return this.pushStack(E(this, a || [], !0))
        }, is: function (a) {
            return !!E(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length
        }
    });
    var F, G = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, H = r.fn.init = function (a, b, c) {
        var e, f;
        if (!a) return this;
        if (c = c || F, "string" == typeof a) {
            if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : G.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
            if (e[1]) {
                if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), C.test(e[1]) && r.isPlainObject(b)) for (e in b) r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
                return this
            }
            return f = d.getElementById(e[2]), f && (this[0] = f, this.length = 1), this
        }
        return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this)
    };
    H.prototype = r.fn, F = r(d);
    var I = /^(?:parents|prev(?:Until|All))/, J = {children: !0, contents: !0, next: !0, prev: !0};
    r.fn.extend({
        has: function (a) {
            var b = r(a, this), c = b.length;
            return this.filter(function () {
                for (var a = 0; a < c; a++) if (r.contains(this, b[a])) return !0
            })
        }, closest: function (a, b) {
            var c, d = 0, e = this.length, f = [], g = "string" != typeof a && r(a);
            if (!A.test(a)) for (; d < e; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && r.find.matchesSelector(c, a))) {
                f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? r.uniqueSort(f) : f)
        }, index: function (a) {
            return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (a, b) {
            return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b))))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function K(a, b) {
        while ((a = a[b]) && 1 !== a.nodeType) ;
        return a
    }

    r.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        }, parents: function (a) {
            return y(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return y(a, "parentNode", c)
        }, next: function (a) {
            return K(a, "nextSibling")
        }, prev: function (a) {
            return K(a, "previousSibling")
        }, nextAll: function (a) {
            return y(a, "nextSibling")
        }, prevAll: function (a) {
            return y(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return y(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return y(a, "previousSibling", c)
        }, siblings: function (a) {
            return z((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return z(a.firstChild)
        }, contents: function (a) {
            return B(a, "iframe") ? a.contentDocument : (B(a, "template") && (a = a.content || a), r.merge([], a.childNodes))
        }
    }, function (a, b) {
        r.fn[a] = function (c, d) {
            var e = r.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), this.length > 1 && (J[a] || r.uniqueSort(e), I.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var L = /[^\x20\t\r\n\f]+/g;

    function M(a) {
        var b = {};
        return r.each(a.match(L) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    r.Callbacks = function (a) {
        a = "string" == typeof a ? M(a) : r.extend({}, a);
        var b, c, d, e, f = [], g = [], h = -1, i = function () {
            for (e = e || a.once, d = b = !0; g.length; h = -1) {
                c = g.shift();
                while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1)
            }
            a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
        }, j = {
            add: function () {
                return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
                    r.each(b, function (b, c) {
                        r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c)
                    })
                }(arguments), c && !b && i()), this
            }, remove: function () {
                return r.each(arguments, function (a, b) {
                    var c;
                    while ((c = r.inArray(b, f, c)) > -1) f.splice(c, 1), c <= h && h--
                }), this
            }, has: function (a) {
                return a ? r.inArray(a, f) > -1 : f.length > 0
            }, empty: function () {
                return f && (f = []), this
            }, disable: function () {
                return e = g = [], f = c = "", this
            }, disabled: function () {
                return !f
            }, lock: function () {
                return e = g = [], c || b || (f = c = ""), this
            }, locked: function () {
                return !!e
            }, fireWith: function (a, c) {
                return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
            }, fire: function () {
                return j.fireWith(this, arguments), this
            }, fired: function () {
                return !!d
            }
        };
        return j
    };

    function N(a) {
        return a
    }

    function O(a) {
        throw a
    }

    function P(a, b, c, d) {
        var e;
        try {
            a && r.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && r.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d))
        } catch (a) {
            c.apply(void 0, [a])
        }
    }

    r.extend({
        Deferred: function (b) {
            var c = [["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2], ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]],
                d = "pending", e = {
                    state: function () {
                        return d
                    }, always: function () {
                        return f.done(arguments).fail(arguments), this
                    }, "catch": function (a) {
                        return e.then(null, a)
                    }, pipe: function () {
                        var a = arguments;
                        return r.Deferred(function (b) {
                            r.each(c, function (c, d) {
                                var e = r.isFunction(a[d[4]]) && a[d[4]];
                                f[d[1]](function () {
                                    var a = e && e.apply(this, arguments);
                                    a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    }, then: function (b, d, e) {
                        var f = 0;

                        function g(b, c, d, e) {
                            return function () {
                                var h = this, i = arguments, j = function () {
                                    var a, j;
                                    if (!(b < f)) {
                                        if (a = d.apply(h, i), a === c.promise()) throw new TypeError("Thenable self-resolution");
                                        j = a && ("object" == typeof a || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, N, e), g(f, c, O, e)) : (f++, j.call(a, g(f, c, N, e), g(f, c, O, e), g(f, c, N, c.notifyWith))) : (d !== N && (h = void 0, i = [a]), (e || c.resolveWith)(h, i))
                                    }
                                }, k = e ? j : function () {
                                    try {
                                        j()
                                    } catch (a) {
                                        r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), b + 1 >= f && (d !== O && (h = void 0, i = [a]), c.rejectWith(h, i))
                                    }
                                };
                                b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k))
                            }
                        }

                        return r.Deferred(function (a) {
                            c[0][3].add(g(0, a, r.isFunction(e) ? e : N, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : N)), c[2][3].add(g(0, a, r.isFunction(d) ? d : O))
                        }).promise()
                    }, promise: function (a) {
                        return null != a ? r.extend(a, e) : e
                    }
                }, f = {};
            return r.each(c, function (a, b) {
                var g = b[2], h = b[5];
                e[b[1]] = g.add, h && g.add(function () {
                    d = h
                }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () {
                    return f[b[0] + "With"](this === f ? void 0 : this, arguments), this
                }, f[b[0] + "With"] = g.fireWith
            }), e.promise(f), b && b.call(f, f), f
        }, when: function (a) {
            var b = arguments.length, c = b, d = Array(c), e = f.call(arguments), g = r.Deferred(), h = function (a) {
                return function (c) {
                    d[a] = this, e[a] = arguments.length > 1 ? f.call(arguments) : c, --b || g.resolveWith(d, e)
                }
            };
            if (b <= 1 && (P(a, g.done(h(c)).resolve, g.reject, !b), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then();
            while (c--) P(e[c], h(c), g.reject);
            return g.promise()
        }
    });
    var Q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    r.Deferred.exceptionHook = function (b, c) {
        a.console && a.console.warn && b && Q.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c)
    }, r.readyException = function (b) {
        a.setTimeout(function () {
            throw b
        })
    };
    var R = r.Deferred();
    r.fn.ready = function (a) {
        return R.then(a)["catch"](function (a) {
            r.readyException(a)
        }), this
    }, r.extend({
        isReady: !1, readyWait: 1, ready: function (a) {
            (a === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0, a !== !0 && --r.readyWait > 0 || R.resolveWith(d, [r]))
        }
    }), r.ready.then = R.then;

    function S() {
        d.removeEventListener("DOMContentLoaded", S),
            a.removeEventListener("load", S), r.ready()
    }

    "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", S), a.addEventListener("load", S));
    var T = function (a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === r.type(c)) {
            e = !0;
            for (h in c) T(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
            return j.call(r(a), c)
        })), b)) for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }, U = function (a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };

    function V() {
        this.expando = r.expando + V.uid++
    }

    V.uid = 1, V.prototype = {
        cache: function (a) {
            var b = a[this.expando];
            return b || (b = {}, U(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                value: b,
                configurable: !0
            }))), b
        }, set: function (a, b, c) {
            var d, e = this.cache(a);
            if ("string" == typeof b) e[r.camelCase(b)] = c; else for (d in b) e[r.camelCase(d)] = b[d];
            return e
        }, get: function (a, b) {
            return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)]
        }, access: function (a, b, c) {
            return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b)
        }, remove: function (a, b) {
            var c, d = a[this.expando];
            if (void 0 !== d) {
                if (void 0 !== b) {
                    Array.isArray(b) ? b = b.map(r.camelCase) : (b = r.camelCase(b), b = b in d ? [b] : b.match(L) || []), c = b.length;
                    while (c--) delete d[b[c]]
                }
                (void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
            }
        }, hasData: function (a) {
            var b = a[this.expando];
            return void 0 !== b && !r.isEmptyObject(b)
        }
    };
    var W = new V, X = new V, Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Z = /[A-Z]/g;

    function $(a) {
        return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Y.test(a) ? JSON.parse(a) : a)
    }

    function _(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Z, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
            try {
                c = $(c)
            } catch (e) {
            }
            X.set(a, b, c)
        } else c = void 0;
        return c
    }

    r.extend({
        hasData: function (a) {
            return X.hasData(a) || W.hasData(a)
        }, data: function (a, b, c) {
            return X.access(a, b, c)
        }, removeData: function (a, b) {
            X.remove(a, b)
        }, _data: function (a, b, c) {
            return W.access(a, b, c)
        }, _removeData: function (a, b) {
            W.remove(a, b)
        }
    }), r.fn.extend({
        data: function (a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = X.get(f), 1 === f.nodeType && !W.get(f, "hasDataAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = r.camelCase(d.slice(5)), _(f, d, e[d])));
                    W.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function () {
                X.set(this, a)
            }) : T(this, function (b) {
                var c;
                if (f && void 0 === b) {
                    if (c = X.get(f, a), void 0 !== c) return c;
                    if (c = _(f, a), void 0 !== c) return c
                } else this.each(function () {
                    X.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        }, removeData: function (a) {
            return this.each(function () {
                X.remove(this, a)
            })
        }
    }), r.extend({
        queue: function (a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = W.get(a, b), c && (!d || Array.isArray(c) ? d = W.access(a, b, r.makeArray(c)) : d.push(c)), d || []
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = r.queue(a, b), d = c.length, e = c.shift(), f = r._queueHooks(a, b), g = function () {
                r.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        }, _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return W.get(a, c) || W.access(a, c, {
                empty: r.Callbacks("once memory").add(function () {
                    W.remove(a, [b + "queue", c])
                })
            })
        }
    }), r.fn.extend({
        queue: function (a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = r.queue(this, a, b);
                r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                r.dequeue(this, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, b) {
            var c, d = 1, e = r.Deferred(), f = this, g = this.length, h = function () {
                --d || e.resolveWith(f, [f])
            };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = W.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ba = new RegExp("^(?:([+-])=|)(" + aa + ")([a-z%]*)$", "i"),
        ca = ["Top", "Right", "Bottom", "Left"], da = function (a, b) {
            return a = b || a, "none" === a.style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display")
        }, ea = function (a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        };

    function fa(a, b, c, d) {
        var e, f = 1, g = 20, h = d ? function () {
                return d.cur()
            } : function () {
                return r.css(a, b, "")
            }, i = h(), j = c && c[3] || (r.cssNumber[b] ? "" : "px"),
            k = (r.cssNumber[b] || "px" !== j && +i) && ba.exec(r.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;
            do f = f || ".5", k /= f, r.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
        }
        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
    }

    var ga = {};

    function ha(a) {
        var b, c = a.ownerDocument, d = a.nodeName, e = ga[d];
        return e ? e : (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), ga[d] = e, e)
    }

    function ia(a, b) {
        for (var c, d, e = [], f = 0, g = a.length; f < g; f++) d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = W.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && da(d) && (e[f] = ha(d))) : "none" !== c && (e[f] = "none", W.set(d, "display", c)));
        for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
        return a
    }

    r.fn.extend({
        show: function () {
            return ia(this, !0)
        }, hide: function () {
            return ia(this)
        }, toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                da(this) ? r(this).show() : r(this).hide()
            })
        }
    });
    var ja = /^(?:checkbox|radio)$/i, ka = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, la = /^$|\/(?:java|ecma)script/i, ma = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    ma.optgroup = ma.option, ma.tbody = ma.tfoot = ma.colgroup = ma.caption = ma.thead, ma.th = ma.td;

    function na(a, b) {
        var c;
        return c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && B(a, b) ? r.merge([a], c) : c
    }

    function oa(a, b) {
        for (var c = 0, d = a.length; c < d; c++) W.set(a[c], "globalEval", !b || W.get(b[c], "globalEval"))
    }

    var pa = /<|&#?\w+;/;

    function qa(a, b, c, d, e) {
        for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) if (f = a[n], f || 0 === f) if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f); else if (pa.test(f)) {
            g = g || l.appendChild(b.createElement("div")), h = (ka.exec(f) || ["", ""])[1].toLowerCase(), i = ma[h] || ma._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0];
            while (k--) g = g.lastChild;
            r.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
        } else m.push(b.createTextNode(f));
        l.textContent = "", n = 0;
        while (f = m[n++]) if (d && r.inArray(f, d) > -1) e && e.push(f); else if (j = r.contains(f.ownerDocument, f), g = na(l.appendChild(f), "script"), j && oa(g), c) {
            k = 0;
            while (f = g[k++]) la.test(f.type || "") && c.push(f)
        }
        return l
    }

    !function () {
        var a = d.createDocumentFragment(), b = a.appendChild(d.createElement("div")), c = d.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var ra = d.documentElement, sa = /^key/, ta = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        ua = /^([^.]*)(?:\.(.+)|)/;

    function va() {
        return !0
    }

    function wa() {
        return !1
    }

    function xa() {
        try {
            return d.activeElement
        } catch (a) {
        }
    }

    function ya(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && (d = d || c, c = void 0);
            for (h in b) ya(a, h, c, d, b[h], f);
            return a
        }
        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = wa; else if (!e) return a;
        return 1 === f && (g = e, e = function (a) {
            return r().off(a), g.apply(this, arguments)
        }, e.guid = g.guid || (g.guid = r.guid++)), a.each(function () {
            r.event.add(this, b, e, d, c)
        })
    }

    r.event = {
        global: {}, add: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = W.get(a);
            if (q) {
                c.handler && (f = c, c = f.handler, e = f.selector), e && r.find.matchesSelector(ra, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
                    return "undefined" != typeof r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0
                }), b = (b || "").match(L) || [""], j = b.length;
                while (j--) h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && r.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0)
            }
        }, remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = W.hasData(a) && W.get(a);
            if (q && (i = q.events)) {
                b = (b || "").match(L) || [""], j = b.length;
                while (j--) if (h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    l = r.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
                    while (f--) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                    g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || r.removeEvent(a, n, q.handle), delete i[n])
                } else for (n in i) r.event.remove(a, n + b[j], c, d, !0);
                r.isEmptyObject(i) && W.remove(a, "handle events")
            }
        }, dispatch: function (a) {
            var b = r.event.fix(a), c, d, e, f, g, h, i = new Array(arguments.length),
                j = (W.get(this, "events") || {})[b.type] || [], k = r.event.special[b.type] || {};
            for (i[0] = b, c = 1; c < arguments.length; c++) i[c] = arguments[c];
            if (b.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, b) !== !1) {
                h = r.event.handlers.call(this, b, j), c = 0;
                while ((f = h[c++]) && !b.isPropagationStopped()) {
                    b.currentTarget = f.elem, d = 0;
                    while ((g = f.handlers[d++]) && !b.isImmediatePropagationStopped()) b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (b.result = e) === !1 && (b.preventDefault(), b.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, b), b.result
            }
        }, handlers: function (a, b) {
            var c, d, e, f, g, h = [], i = b.delegateCount, j = a.target;
            if (i && j.nodeType && !("click" === a.type && a.button >= 1)) for (; j !== this; j = j.parentNode || this) if (1 === j.nodeType && ("click" !== a.type || j.disabled !== !0)) {
                for (f = [], g = {}, c = 0; c < i; c++) d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? r(e, this).index(j) > -1 : r.find(e, this, null, [j]).length), g[e] && f.push(d);
                f.length && h.push({elem: j, handlers: f})
            }
            return j = this, i < b.length && h.push({elem: j, handlers: b.slice(i)}), h
        }, addProp: function (a, b) {
            Object.defineProperty(r.Event.prototype, a, {
                enumerable: !0,
                configurable: !0,
                get: r.isFunction(b) ? function () {
                    if (this.originalEvent) return b(this.originalEvent)
                } : function () {
                    if (this.originalEvent) return this.originalEvent[a]
                },
                set: function (b) {
                    Object.defineProperty(this, a, {enumerable: !0, configurable: !0, writable: !0, value: b})
                }
            })
        }, fix: function (a) {
            return a[r.expando] ? a : new r.Event(a)
        }, special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== xa() && this.focus) return this.focus(), !1
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    if (this === xa() && this.blur) return this.blur(), !1
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    if ("checkbox" === this.type && this.click && B(this, "input")) return this.click(), !1
                }, _default: function (a) {
                    return B(a.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        }
    }, r.removeEvent = function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c)
    }, r.Event = function (a, b) {
        return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? va : wa, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void(this[r.expando] = !0)) : new r.Event(a, b)
    }, r.Event.prototype = {
        constructor: r.Event,
        isDefaultPrevented: wa,
        isPropagationStopped: wa,
        isImmediatePropagationStopped: wa,
        isSimulated: !1,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = va, a && !this.isSimulated && a.preventDefault()
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = va, a && !this.isSimulated && a.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = va, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, r.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (a) {
            var b = a.button;
            return null == a.which && sa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && ta.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which
        }
    }, r.event.addProp), r.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (a, b) {
        r.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return e && (e === d || r.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), r.fn.extend({
        on: function (a, b, c, d) {
            return ya(this, a, b, c, d)
        }, one: function (a, b, c, d) {
            return ya(this, a, b, c, d, 1)
        }, off: function (a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = wa), this.each(function () {
                r.event.remove(this, a, c, b)
            })
        }
    });
    var za = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Aa = /<script|<style|<link/i, Ba = /checked\s*(?:[^=]|=\s*.checked.)/i, Ca = /^true\/(.*)/,
        Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Ea(a, b) {
        return B(a, "table") && B(11 !== b.nodeType ? b : b.firstChild, "tr") ? r(">tbody", a)[0] || a : a
    }

    function Fa(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function Ga(a) {
        var b = Ca.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function Ha(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (W.hasData(a) && (f = W.access(a), g = W.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j) for (c = 0, d = j[e].length; c < d; c++) r.event.add(b, e, j[e][c])
            }
            X.hasData(a) && (h = X.access(a), i = r.extend({}, h), X.set(b, i))
        }
    }

    function Ia(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && ja.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
    }

    function Ja(a, b, c, d) {
        b = g.apply([], b);
        var e, f, h, i, j, k, l = 0, m = a.length, n = m - 1, q = b[0], s = r.isFunction(q);
        if (s || m > 1 && "string" == typeof q && !o.checkClone && Ba.test(q)) return a.each(function (e) {
            var f = a.eq(e);
            s && (b[0] = q.call(this, e, f.html())), Ja(f, b, c, d)
        });
        if (m && (e = qa(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
            for (h = r.map(na(e, "script"), Fa), i = h.length; l < m; l++) j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, na(j, "script"))), c.call(a[l], j, l);
            if (i) for (k = h[h.length - 1].ownerDocument, r.map(h, Ga), l = 0; l < i; l++) j = h[l], la.test(j.type || "") && !W.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Da, ""), k))
        }
        return a
    }

    function Ka(a, b, c) {
        for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || r.cleanData(na(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && oa(na(d, "script")), d.parentNode.removeChild(d));
        return a
    }

    r.extend({
        htmlPrefilter: function (a) {
            return a.replace(za, "<$1></$2>")
        }, clone: function (a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0), i = r.contains(a.ownerDocument, a);
            if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a))) for (g = na(h), f = na(a), d = 0, e = f.length; d < e; d++) Ia(f[d], g[d]);
            if (b) if (c) for (f = f || na(a), g = g || na(h), d = 0, e = f.length; d < e; d++) Ha(f[d], g[d]); else Ha(a, h);
            return g = na(h, "script"), g.length > 0 && oa(g, !i && na(a, "script")), h
        }, cleanData: function (a) {
            for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++) if (U(c)) {
                if (b = c[W.expando]) {
                    if (b.events) for (d in b.events) e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle);
                    c[W.expando] = void 0
                }
                c[X.expando] && (c[X.expando] = void 0)
            }
        }
    }), r.fn.extend({
        detach: function (a) {
            return Ka(this, a, !0)
        }, remove: function (a) {
            return Ka(this, a)
        }, text: function (a) {
            return T(this, function (a) {
                return void 0 === a ? r.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                })
            }, null, a, arguments.length)
        }, append: function () {
            return Ja(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ea(this, a);
                    b.appendChild(a)
                }
            })
        }, prepend: function () {
            return Ja(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ea(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        }, before: function () {
            return Ja(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        }, after: function () {
            return Ja(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (r.cleanData(na(a, !1)), a.textContent = "");
            return this
        }, clone: function (a, b) {
            return a = null != a && a, b = null == b ? a : b, this.map(function () {
                return r.clone(this, a, b)
            })
        }, html: function (a) {
            return T(this, function (a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !Aa.test(a) && !ma[(ka.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = r.htmlPrefilter(a);
                    try {
                        for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (r.cleanData(na(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {
                    }
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function () {
            var a = [];
            return Ja(this, arguments, function (b) {
                var c = this.parentNode;
                r.inArray(this, a) < 0 && (r.cleanData(na(this)), c && c.replaceChild(b, this))
            }, a)
        }
    }), r.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        r.fn[a] = function (a) {
            for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var La = /^margin/, Ma = new RegExp("^(" + aa + ")(?!px)[a-z%]+$", "i"), Na = function (b) {
        var c = b.ownerDocument.defaultView;
        return c && c.opener || (c = a), c.getComputedStyle(b)
    };
    !function () {
        function b() {
            if (i) {
                i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", ra.appendChild(h);
                var b = a.getComputedStyle(i);
                c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, ra.removeChild(h), i = null
            }
        }

        var c, e, f, g, h = d.createElement("div"), i = d.createElement("div");
        i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, {
            pixelPosition: function () {
                return b(), c
            }, boxSizingReliable: function () {
                return b(), e
            }, pixelMarginRight: function () {
                return b(), f
            }, reliableMarginLeft: function () {
                return b(), g
            }
        }))
    }();

    function Oa(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Na(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && Ma.test(g) && La.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function Pa(a, b) {
        return {
            get: function () {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    var Qa = /^(none|table(?!-c[ea]).+)/, Ra = /^--/,
        Sa = {position: "absolute", visibility: "hidden", display: "block"},
        Ta = {letterSpacing: "0", fontWeight: "400"}, Ua = ["Webkit", "Moz", "ms"], Va = d.createElement("div").style;

    function Wa(a) {
        if (a in Va) return a;
        var b = a[0].toUpperCase() + a.slice(1), c = Ua.length;
        while (c--) if (a = Ua[c] + b, a in Va) return a
    }

    function Xa(a) {
        var b = r.cssProps[a];
        return b || (b = r.cssProps[a] = Wa(a) || a), b
    }

    function Ya(a, b, c) {
        var d = ba.exec(b);
        return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
    }

    function Za(a, b, c, d, e) {
        var f, g = 0;
        for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) "margin" === c && (g += r.css(a, c + ca[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + ca[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + ca[f] + "Width", !0, e))) : (g += r.css(a, "padding" + ca[f], !0, e), "padding" !== c && (g += r.css(a, "border" + ca[f] + "Width", !0, e)));
        return g
    }

    function $a(a, b, c) {
        var d, e = Na(a), f = Oa(a, b, e), g = "border-box" === r.css(a, "boxSizing", !1, e);
        return Ma.test(f) ? f : (d = g && (o.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), f = parseFloat(f) || 0, f + Za(a, b, c || (g ? "border" : "content"), d, e) + "px")
    }

    r.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Oa(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = r.camelCase(b), i = Ra.test(b), j = a.style;
                return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b] : (f = typeof c, "string" === f && (e = ba.exec(c)) && e[1] && (c = fa(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c)), void 0)
            }
        },
        css: function (a, b, c, d) {
            var e, f, g, h = r.camelCase(b), i = Ra.test(b);
            return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Oa(a, b, d)), "normal" === e && b in Ta && (e = Ta[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
        }
    }), r.each(["height", "width"], function (a, b) {
        r.cssHooks[b] = {
            get: function (a, c, d) {
                if (c) return !Qa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? $a(a, b, d) : ea(a, Sa, function () {
                    return $a(a, b, d)
                })
            }, set: function (a, c, d) {
                var e, f = d && Na(a), g = d && Za(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f);
                return g && (e = ba.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Ya(a, c, g)
            }
        }
    }), r.cssHooks.marginLeft = Pa(o.reliableMarginLeft, function (a, b) {
        if (b) return (parseFloat(Oa(a, "marginLeft")) || a.getBoundingClientRect().left - ea(a, {marginLeft: 0}, function () {
            return a.getBoundingClientRect().left
        })) + "px"
    }), r.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        r.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + ca[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, La.test(a) || (r.cssHooks[a + b].set = Ya)
    }), r.fn.extend({
        css: function (a, b) {
            return T(this, function (a, b, c) {
                var d, e, f = {}, g = 0;
                if (Array.isArray(b)) {
                    for (d = Na(a), e = b.length; g < e; g++) f[b[g]] = r.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? r.style(a, b, c) : r.css(a, b)
            }, a, b, arguments.length > 1)
        }
    });

    function _a(a, b, c, d, e) {
        return new _a.prototype.init(a, b, c, d, e)
    }

    r.Tween = _a, _a.prototype = {
        constructor: _a, init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || r.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (r.cssNumber[c] ? "" : "px")
        }, cur: function () {
            var a = _a.propHooks[this.prop];
            return a && a.get ? a.get(this) : _a.propHooks._default.get(this)
        }, run: function (a) {
            var b, c = _a.propHooks[this.prop];
            return this.options.duration ? this.pos = b = r.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : _a.propHooks._default.set(this), this
        }
    }, _a.prototype.init.prototype = _a.prototype, _a.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = r.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
            }, set: function (a) {
                r.fx.step[a.prop] ? r.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[r.cssProps[a.prop]] && !r.cssHooks[a.prop] ? a.elem[a.prop] = a.now : r.style(a.elem, a.prop, a.now + a.unit)
            }
        }
    }, _a.propHooks.scrollTop = _a.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, r.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }, _default: "swing"
    }, r.fx = _a.prototype.init, r.fx.step = {};
    var ab, bb, cb = /^(?:toggle|show|hide)$/, db = /queueHooks$/;

    function eb() {
        bb && (d.hidden === !1 && a.requestAnimationFrame ? a.requestAnimationFrame(eb) : a.setTimeout(eb, r.fx.interval), r.fx.tick())
    }

    function fb() {
        return a.setTimeout(function () {
            ab = void 0
        }), ab = r.now()
    }

    function gb(a, b) {
        var c, d = 0, e = {height: a};
        for (b = b ? 1 : 0; d < 4; d += 2 - b) c = ca[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function hb(a, b, c) {
        for (var d, e = (kb.tweeners[b] || []).concat(kb.tweeners["*"]), f = 0, g = e.length; f < g; f++) if (d = e[f].call(c, b, a)) return d
    }

    function ib(a, b, c) {
        var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b, m = this, n = {}, o = a.style,
            p = a.nodeType && da(a), q = W.get(a, "fxshow");
        c.queue || (g = r._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function () {
            g.unqueued || h()
        }), g.unqueued++, m.always(function () {
            m.always(function () {
                g.unqueued--, r.queue(a, "fx").length || g.empty.fire()
            })
        }));
        for (d in b) if (e = b[d], cb.test(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                if ("show" !== e || !q || void 0 === q[d]) continue;
                p = !0
            }
            n[d] = q && q[d] || r.style(a, d)
        }
        if (i = !r.isEmptyObject(b), i || !r.isEmptyObject(n)) {
            l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = W.get(a, "display")), k = r.css(a, "display"), "none" === k && (j ? k = j : (ia([a], !0), j = a.style.display || j, k = r.css(a, "display"), ia([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === r.css(a, "float") && (i || (m.done(function () {
                o.display = j
            }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function () {
                o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
            })), i = !1;
            for (d in n) i || (q ? "hidden" in q && (p = q.hidden) : q = W.access(a, "fxshow", {display: j}), f && (q.hidden = !p), p && ia([a], !0), m.done(function () {
                p || ia([a]), W.remove(a, "fxshow");
                for (d in n) r.style(a, d, n[d])
            })), i = hb(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0))
        }
    }

    function jb(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = r.camelCase(c), e = b[d], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = r.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function kb(a, b, c) {
        var d, e, f = 0, g = kb.prefilters.length, h = r.Deferred().always(function () {
            delete i.elem
        }), i = function () {
            if (e) return !1;
            for (var b = ab || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1)
        }, j = h.promise({
            elem: a,
            props: r.extend({}, b),
            opts: r.extend(!0, {specialEasing: {}, easing: r.easing._default}, c),
            originalProperties: b,
            originalOptions: c,
            startTime: ab || fb(),
            duration: c.duration,
            tweens: [],
            createTween: function (b, c) {
                var d = r.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d
            },
            stop: function (b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; c < d; c++) j.tweens[c].run(1);
                return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
            }
        }), k = j.props;
        for (jb(k, j.opts.specialEasing); f < g; f++) if (d = kb.prefilters[f].call(j, a, k, j.opts)) return r.isFunction(d.stop) && (r._queueHooks(j.elem, j.opts.queue).stop = r.proxy(d.stop, d)), d;
        return r.map(k, hb, j), r.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), r.fx.timer(r.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j
    }

    r.Animation = r.extend(kb, {
        tweeners: {
            "*": [function (a, b) {
                var c = this.createTween(a, b);
                return fa(c.elem, a, ba.exec(b), c), c
            }]
        }, tweener: function (a, b) {
            r.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(L);
            for (var c, d = 0, e = a.length; d < e; d++) c = a[d], kb.tweeners[c] = kb.tweeners[c] || [], kb.tweeners[c].unshift(b)
        }, prefilters: [ib], prefilter: function (a, b) {
            b ? kb.prefilters.unshift(a) : kb.prefilters.push(a)
        }
    }), r.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? r.extend({}, a) : {
            complete: c || !c && b || r.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !r.isFunction(b) && b
        };
        return r.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in r.fx.speeds ? d.duration = r.fx.speeds[d.duration] : d.duration = r.fx.speeds._default), null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            r.isFunction(d.old) && d.old.call(this), d.queue && r.dequeue(this, d.queue)
        }, d
    }, r.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(da).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            var e = r.isEmptyObject(a), f = r.speed(b, c, d), g = function () {
                var b = kb(this, r.extend({}, a), f);
                (e || W.get(this, "finish")) && b.stop(!0)
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        }, stop: function (a, b, c) {
            var d = function (a) {
                var b = a.stop;
                delete a.stop, b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                var b = !0, e = null != a && a + "queueHooks", f = r.timers, g = W.get(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && db.test(e) && d(g[e]);
                for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                !b && c || r.dequeue(this, a)
            })
        }, finish: function (a) {
            return a !== !1 && (a = a || "fx"), this.each(function () {
                var b, c = W.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = r.timers, g = d ? d.length : 0;
                for (c.finish = !0, r.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), r.each(["toggle", "show", "hide"], function (a, b) {
        var c = r.fn[b];
        r.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e)
        }
    }), r.each({
        slideDown: gb("show"),
        slideUp: gb("hide"),
        slideToggle: gb("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        r.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), r.timers = [], r.fx.tick = function () {
        var a, b = 0, c = r.timers;
        for (ab = r.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
        c.length || r.fx.stop(), ab = void 0
    }, r.fx.timer = function (a) {
        r.timers.push(a), r.fx.start()
    }, r.fx.interval = 13, r.fx.start = function () {
        bb || (bb = !0, eb())
    }, r.fx.stop = function () {
        bb = null
    }, r.fx.speeds = {slow: 600, fast: 200, _default: 400}, r.fn.delay = function (b, c) {
        return b = r.fx ? r.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
            var e = a.setTimeout(c, b);
            d.stop = function () {
                a.clearTimeout(e)
            }
        })
    }, function () {
        var a = d.createElement("input"), b = d.createElement("select"), c = b.appendChild(d.createElement("option"));
        a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, a = d.createElement("input"), a.value = "t", a.type = "radio", o.radioValue = "t" === a.value
    }();
    var lb, mb = r.expr.attrHandle;
    r.fn.extend({
        attr: function (a, b) {
            return T(this, r.attr, a, b, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                r.removeAttr(this, a)
            })
        }
    }), r.extend({
        attr: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? lb : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = r.find.attr(a, b),
                null == d ? void 0 : d))
        }, attrHooks: {
            type: {
                set: function (a, b) {
                    if (!o.radioValue && "radio" === b && B(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }, removeAttr: function (a, b) {
            var c, d = 0, e = b && b.match(L);
            if (e && 1 === a.nodeType) while (c = e[d++]) a.removeAttribute(c)
        }
    }), lb = {
        set: function (a, b, c) {
            return b === !1 ? r.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, r.each(r.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = mb[b] || r.find.attr;
        mb[b] = function (a, b, d) {
            var e, f, g = b.toLowerCase();
            return d || (f = mb[g], mb[g] = e, e = null != c(a, b, d) ? g : null, mb[g] = f), e
        }
    });
    var nb = /^(?:input|select|textarea|button)$/i, ob = /^(?:a|area)$/i;
    r.fn.extend({
        prop: function (a, b) {
            return T(this, r.prop, a, b, arguments.length > 1)
        }, removeProp: function (a) {
            return this.each(function () {
                delete this[r.propFix[a] || a]
            })
        }
    }), r.extend({
        prop: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        }, propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = r.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : nb.test(a.nodeName) || ob.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}
    }), o.optSelected || (r.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }, set: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
        }
    }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        r.propFix[this.toLowerCase()] = this
    });

    function pb(a) {
        var b = a.match(L) || [];
        return b.join(" ")
    }

    function qb(a) {
        return a.getAttribute && a.getAttribute("class") || ""
    }

    r.fn.extend({
        addClass: function (a) {
            var b, c, d, e, f, g, h, i = 0;
            if (r.isFunction(a)) return this.each(function (b) {
                r(this).addClass(a.call(this, b, qb(this)))
            });
            if ("string" == typeof a && a) {
                b = a.match(L) || [];
                while (c = this[i++]) if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
                    g = 0;
                    while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                    h = pb(d), e !== h && c.setAttribute("class", h)
                }
            }
            return this
        }, removeClass: function (a) {
            var b, c, d, e, f, g, h, i = 0;
            if (r.isFunction(a)) return this.each(function (b) {
                r(this).removeClass(a.call(this, b, qb(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a) {
                b = a.match(L) || [];
                while (c = this[i++]) if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
                    g = 0;
                    while (f = b[g++]) while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");
                    h = pb(d), e !== h && c.setAttribute("class", h)
                }
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function (c) {
                r(this).toggleClass(a.call(this, c, qb(this), b), b)
            }) : this.each(function () {
                var b, d, e, f;
                if ("string" === c) {
                    d = 0, e = r(this), f = a.match(L) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else void 0 !== a && "boolean" !== c || (b = qb(this), b && W.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : W.get(this, "__className__") || ""))
            })
        }, hasClass: function (a) {
            var b, c, d = 0;
            b = " " + a + " ";
            while (c = this[d++]) if (1 === c.nodeType && (" " + pb(qb(c)) + " ").indexOf(b) > -1) return !0;
            return !1
        }
    });
    var rb = /\r/g;
    r.fn.extend({
        val: function (a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length) return d = r.isFunction(a), this.each(function (c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, r(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = r.map(e, function (a) {
                        return null == a ? "" : a + ""
                    })), b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c)
            }
        }
    }), r.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = r.find.attr(a, "value");
                    return null != b ? b : pb(r.text(a))
                }
            }, select: {
                get: function (a) {
                    var b, c, d, e = a.options, f = a.selectedIndex, g = "select-one" === a.type, h = g ? null : [],
                        i = g ? f + 1 : e.length;
                    for (d = f < 0 ? i : g ? f : 0; d < i; d++) if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !B(c.parentNode, "optgroup"))) {
                        if (b = r(c).val(), g) return b;
                        h.push(b)
                    }
                    return h
                }, set: function (a, b) {
                    var c, d, e = a.options, f = r.makeArray(b), g = e.length;
                    while (g--) d = e[g], (d.selected = r.inArray(r.valHooks.option.get(d), f) > -1) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), r.each(["radio", "checkbox"], function () {
        r.valHooks[this] = {
            set: function (a, b) {
                if (Array.isArray(b)) return a.checked = r.inArray(r(a).val(), b) > -1
            }
        }, o.checkOn || (r.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var sb = /^(?:focusinfocus|focusoutblur)$/;
    r.extend(r.event, {
        trigger: function (b, c, e, f) {
            var g, h, i, j, k, m, n, o = [e || d], p = l.call(b, "type") ? b.type : b,
                q = l.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !sb.test(p + r.event.triggered) && (p.indexOf(".") > -1 && (q = p.split("."), p = q.shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, b = b[r.expando] ? b : new r.Event(p, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || n.trigger.apply(e, c) !== !1)) {
                if (!f && !n.noBubble && !r.isWindow(e)) {
                    for (j = n.delegateType || p, sb.test(j + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), i = h;
                    i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a)
                }
                g = 0;
                while ((h = o[g++]) && !b.isPropagationStopped()) b.type = g > 1 ? j : n.bindType || p, m = (W.get(h, "events") || {})[b.type] && W.get(h, "handle"), m && m.apply(h, c), m = k && h[k], m && m.apply && U(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
                return b.type = p, f || b.isDefaultPrevented() || n._default && n._default.apply(o.pop(), c) !== !1 || !U(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && (i = e[k], i && (e[k] = null), r.event.triggered = p, e[p](), r.event.triggered = void 0, i && (e[k] = i)), b.result
            }
        }, simulate: function (a, b, c) {
            var d = r.extend(new r.Event, c, {type: a, isSimulated: !0});
            r.event.trigger(d, null, b)
        }
    }), r.fn.extend({
        trigger: function (a, b) {
            return this.each(function () {
                r.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            var c = this[0];
            if (c) return r.event.trigger(a, b, c, !0)
        }
    }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
        r.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), r.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), o.focusin = "onfocusin" in a, o.focusin || r.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = function (a) {
            r.event.simulate(b, a.target, r.event.fix(a))
        };
        r.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this, e = W.access(d, b);
                e || d.addEventListener(a, c, !0), W.access(d, b, (e || 0) + 1)
            }, teardown: function () {
                var d = this.ownerDocument || this, e = W.access(d, b) - 1;
                e ? W.access(d, b, e) : (d.removeEventListener(a, c, !0), W.remove(d, b))
            }
        }
    });
    var tb = a.location, ub = r.now(), vb = /\?/;
    r.parseXML = function (b) {
        var c;
        if (!b || "string" != typeof b) return null;
        try {
            c = (new a.DOMParser).parseFromString(b, "text/xml")
        } catch (d) {
            c = void 0
        }
        return c && !c.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + b), c
    };
    var wb = /\[\]$/, xb = /\r?\n/g, yb = /^(?:submit|button|image|reset|file)$/i,
        zb = /^(?:input|select|textarea|keygen)/i;

    function Ab(a, b, c, d) {
        var e;
        if (Array.isArray(b)) r.each(b, function (b, e) {
            c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== r.type(b)) d(a, b); else for (e in b) Ab(a + "[" + e + "]", b[e], c, d)
    }

    r.param = function (a, b) {
        var c, d = [], e = function (a, b) {
            var c = r.isFunction(b) ? b() : b;
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c)
        };
        if (Array.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function () {
            e(this.name, this.value)
        }); else for (c in a) Ab(c, a[c], b, e);
        return d.join("&")
    }, r.fn.extend({
        serialize: function () {
            return r.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var a = r.prop(this, "elements");
                return a ? r.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !r(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !ja.test(a))
            }).map(function (a, b) {
                var c = r(this).val();
                return null == c ? null : Array.isArray(c) ? r.map(c, function (a) {
                    return {name: b.name, value: a.replace(xb, "\r\n")}
                }) : {name: b.name, value: c.replace(xb, "\r\n")}
            }).get()
        }
    });
    var Bb = /%20/g, Cb = /#.*$/, Db = /([?&])_=[^&]*/, Eb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Fb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Gb = /^(?:GET|HEAD)$/, Hb = /^\/\//, Ib = {},
        Jb = {}, Kb = "*/".concat("*"), Lb = d.createElement("a");
    Lb.href = tb.href;

    function Mb(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(L) || [];
            if (r.isFunction(c)) while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function Nb(a, b, c, d) {
        var e = {}, f = a === Jb;

        function g(h) {
            var i;
            return e[h] = !0, r.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }

        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function Ob(a, b) {
        var c, d, e = r.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && r.extend(!0, a, d), a
    }

    function Pb(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break
        }
        if (i[0] in c) f = i[0]; else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        if (f) return f !== i[0] && i.unshift(f), c[f]
    }

    function Qb(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b)
            } catch (l) {
                return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
            }
        }
        return {state: "success", data: b}
    }

    r.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: tb.href,
            type: "GET",
            isLocal: Fb.test(tb.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Kb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": JSON.parse, "text xml": r.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (a, b) {
            return b ? Ob(Ob(a, r.ajaxSettings), b) : Ob(r.ajaxSettings, a)
        },
        ajaxPrefilter: Mb(Ib),
        ajaxTransport: Mb(Jb),
        ajax: function (b, c) {
            "object" == typeof b && (c = b, b = void 0), c = c || {};
            var e, f, g, h, i, j, k, l, m, n, o = r.ajaxSetup({}, c), p = o.context || o,
                q = o.context && (p.nodeType || p.jquery) ? r(p) : r.event, s = r.Deferred(),
                t = r.Callbacks("once memory"), u = o.statusCode || {}, v = {}, w = {}, x = "canceled", y = {
                    readyState: 0, getResponseHeader: function (a) {
                        var b;
                        if (k) {
                            if (!h) {
                                h = {};
                                while (b = Eb.exec(g)) h[b[1].toLowerCase()] = b[2]
                            }
                            b = h[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    }, getAllResponseHeaders: function () {
                        return k ? g : null
                    }, setRequestHeader: function (a, b) {
                        return null == k && (a = w[a.toLowerCase()] = w[a.toLowerCase()] || a, v[a] = b), this
                    }, overrideMimeType: function (a) {
                        return null == k && (o.mimeType = a), this
                    }, statusCode: function (a) {
                        var b;
                        if (a) if (k) y.always(a[y.status]); else for (b in a) u[b] = [u[b], a[b]];
                        return this
                    }, abort: function (a) {
                        var b = a || x;
                        return e && e.abort(b), A(0, b), this
                    }
                };
            if (s.promise(y), o.url = ((b || o.url || tb.href) + "").replace(Hb, tb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(L) || [""], null == o.crossDomain) {
                j = d.createElement("a");
                try {
                    j.href = o.url, j.href = j.href, o.crossDomain = Lb.protocol + "//" + Lb.host != j.protocol + "//" + j.host
                } catch (z) {
                    o.crossDomain = !0
                }
            }
            if (o.data && o.processData && "string" != typeof o.data && (o.data = r.param(o.data, o.traditional)), Nb(Ib, o, c, y), k) return y;
            l = r.event && o.global, l && 0 === r.active++ && r.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Gb.test(o.type), f = o.url.replace(Cb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Bb, "+")) : (n = o.url.slice(f.length), o.data && (f += (vb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Db, "$1"), n = (vb.test(f) ? "&" : "?") + "_=" + ub++ + n), o.url = f + n), o.ifModified && (r.lastModified[f] && y.setRequestHeader("If-Modified-Since", r.lastModified[f]), r.etag[f] && y.setRequestHeader("If-None-Match", r.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Kb + "; q=0.01" : "") : o.accepts["*"]);
            for (m in o.headers) y.setRequestHeader(m, o.headers[m]);
            if (o.beforeSend && (o.beforeSend.call(p, y, o) === !1 || k)) return y.abort();
            if (x = "abort", t.add(o.complete), y.done(o.success), y.fail(o.error), e = Nb(Jb, o, c, y)) {
                if (y.readyState = 1, l && q.trigger("ajaxSend", [y, o]), k) return y;
                o.async && o.timeout > 0 && (i = a.setTimeout(function () {
                    y.abort("timeout")
                }, o.timeout));
                try {
                    k = !1, e.send(v, A)
                } catch (z) {
                    if (k) throw z;
                    A(-1, z)
                }
            } else A(-1, "No Transport");

            function A(b, c, d, h) {
                var j, m, n, v, w, x = c;
                k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", y.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (v = Pb(o, y, d)), v = Qb(o, v, y, j), j ? (o.ifModified && (w = y.getResponseHeader("Last-Modified"), w && (r.lastModified[f] = w), w = y.getResponseHeader("etag"), w && (r.etag[f] = w)), 204 === b || "HEAD" === o.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = v.state, m = v.data, n = v.error, j = !n)) : (n = x, !b && x || (x = "error", b < 0 && (b = 0))), y.status = b, y.statusText = (c || x) + "", j ? s.resolveWith(p, [m, x, y]) : s.rejectWith(p, [y, x, n]), y.statusCode(u), u = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [y, o, j ? m : n]), t.fireWith(p, [y, x]), l && (q.trigger("ajaxComplete", [y, o]), --r.active || r.event.trigger("ajaxStop")))
            }

            return y
        },
        getJSON: function (a, b, c) {
            return r.get(a, b, c, "json")
        },
        getScript: function (a, b) {
            return r.get(a, void 0, b, "script")
        }
    }), r.each(["get", "post"], function (a, b) {
        r[b] = function (a, c, d, e) {
            return r.isFunction(c) && (e = e || d, d = c, c = void 0), r.ajax(r.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, r.isPlainObject(a) && a))
        }
    }), r._evalUrl = function (a) {
        return r.ajax({url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0})
    }, r.fn.extend({
        wrapAll: function (a) {
            var b;
            return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                var a = this;
                while (a.firstElementChild) a = a.firstElementChild;
                return a
            }).append(this)), this
        }, wrapInner: function (a) {
            return r.isFunction(a) ? this.each(function (b) {
                r(this).wrapInner(a.call(this, b))
            }) : this.each(function () {
                var b = r(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = r.isFunction(a);
            return this.each(function (c) {
                r(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function (a) {
            return this.parent(a).not("body").each(function () {
                r(this).replaceWith(this.childNodes)
            }), this
        }
    }), r.expr.pseudos.hidden = function (a) {
        return !r.expr.pseudos.visible(a)
    }, r.expr.pseudos.visible = function (a) {
        return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
    }, r.ajaxSettings.xhr = function () {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    };
    var Rb = {0: 200, 1223: 204}, Sb = r.ajaxSettings.xhr();
    o.cors = !!Sb && "withCredentials" in Sb, o.ajax = Sb = !!Sb, r.ajaxTransport(function (b) {
        var c, d;
        if (o.cors || Sb && !b.crossDomain) return {
            send: function (e, f) {
                var g, h = b.xhr();
                if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) h[g] = b.xhrFields[g];
                b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                for (g in e) h.setRequestHeader(g, e[g]);
                c = function (a) {
                    return function () {
                        c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Rb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {binary: h.response} : {text: h.responseText}, h.getAllResponseHeaders()))
                    }
                }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
                    4 === h.readyState && a.setTimeout(function () {
                        c && d()
                    })
                }, c = c("abort");
                try {
                    h.send(b.hasContent && b.data || null)
                } catch (i) {
                    if (c) throw i
                }
            }, abort: function () {
                c && c()
            }
        }
    }), r.ajaxPrefilter(function (a) {
        a.crossDomain && (a.contents.script = !1)
    }), r.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /\b(?:java|ecma)script\b/},
        converters: {
            "text script": function (a) {
                return r.globalEval(a), a
            }
        }
    }), r.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), r.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function (e, f) {
                    b = r("<script>").prop({charset: a.scriptCharset, src: a.url}).on("load error", c = function (a) {
                        b.remove(), c = null, a && f("error" === a.type ? 404 : 200, a.type)
                    }), d.head.appendChild(b[0])
                }, abort: function () {
                    c && c()
                }
            }
        }
    });
    var Tb = [], Ub = /(=)\?(?=&|$)|\?\?/;
    r.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = Tb.pop() || r.expando + "_" + ub++;
            return this[a] = !0, a
        }
    }), r.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e, f, g,
            h = b.jsonp !== !1 && (Ub.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ub.test(b.data) && "data");
        if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = r.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Ub, "$1" + e) : b.jsonp !== !1 && (b.url += (vb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
            return g || r.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
            g = arguments
        }, d.always(function () {
            void 0 === f ? r(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Tb.push(e)), g && r.isFunction(f) && f(g[0]), g = f = void 0
        }), "script"
    }), o.createHTMLDocument = function () {
        var a = d.implementation.createHTMLDocument("").body;
        return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length
    }(), r.parseHTML = function (a, b, c) {
        if ("string" != typeof a) return [];
        "boolean" == typeof b && (c = b, b = !1);
        var e, f, g;
        return b || (o.createHTMLDocument ? (b = d.implementation.createHTMLDocument(""), e = b.createElement("base"), e.href = d.location.href, b.head.appendChild(e)) : b = d), f = C.exec(a), g = !c && [], f ? [b.createElement(f[1])] : (f = qa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes))
    }, r.fn.load = function (a, b, c) {
        var d, e, f, g = this, h = a.indexOf(" ");
        return h > -1 && (d = pb(a.slice(h)), a = a.slice(0, h)), r.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && r.ajax({
            url: a,
            type: e || "GET",
            dataType: "html",
            data: b
        }).done(function (a) {
            f = arguments, g.html(d ? r("<div>").append(r.parseHTML(a)).find(d) : a)
        }).always(c && function (a, b) {
            g.each(function () {
                c.apply(this, f || [a.responseText, b, a])
            })
        }), this
    }, r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        r.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), r.expr.pseudos.animated = function (a) {
        return r.grep(r.timers, function (b) {
            return a === b.elem
        }).length
    }, r.offset = {
        setOffset: function (a, b, c) {
            var d, e, f, g, h, i, j, k = r.css(a, "position"), l = r(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, r.fn.extend({
        offset: function (a) {
            if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                r.offset.setOffset(this, a, b)
            });
            var b, c, d, e, f = this[0];
            if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), b = f.ownerDocument, c = b.documentElement, e = b.defaultView, {
                top: d.top + e.pageYOffset - c.clientTop,
                left: d.left + e.pageXOffset - c.clientLeft
            }) : {top: 0, left: 0}
        }, position: function () {
            if (this[0]) {
                var a, b, c = this[0], d = {top: 0, left: 0};
                return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), B(a[0], "html") || (d = a.offset()), d = {
                    top: d.top + r.css(a[0], "borderTopWidth", !0),
                    left: d.left + r.css(a[0], "borderLeftWidth", !0)
                }), {top: b.top - d.top - r.css(c, "marginTop", !0), left: b.left - d.left - r.css(c, "marginLeft", !0)}
            }
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent;
                while (a && "static" === r.css(a, "position")) a = a.offsetParent;
                return a || ra
            })
        }
    }), r.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
        var c = "pageYOffset" === b;
        r.fn[a] = function (d) {
            return T(this, function (a, d, e) {
                var f;
                return r.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
            }, a, d, arguments.length)
        }
    }), r.each(["top", "left"], function (a, b) {
        r.cssHooks[b] = Pa(o.pixelPosition, function (a, c) {
            if (c) return c = Oa(a, b), Ma.test(c) ? r(a).position()[b] + "px" : c
        })
    }), r.each({Height: "height", Width: "width"}, function (a, b) {
        r.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
            r.fn[d] = function (e, f) {
                var g = arguments.length && (c || "boolean" != typeof e),
                    h = c || (e === !0 || f === !0 ? "margin" : "border");
                return T(this, function (b, c, e) {
                    var f;
                    return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h)
                }, b, g ? e : void 0, g)
            }
        })
    }), r.fn.extend({
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    }), r.holdReady = function (a) {
        a ? r.readyWait++ : r.ready(!0)
    }, r.isArray = Array.isArray, r.parseJSON = JSON.parse, r.nodeName = B, "function" == typeof define && define.amd && define("jquery", [], function () {
        return r
    });
    var Vb = a.jQuery, Wb = a.$;
    return r.noConflict = function (b) {
        return a.$ === r && (a.$ = Wb), b && a.jQuery === r && (a.jQuery = Vb), r
    }, b || (a.jQuery = a.$ = r), r
});

/*!
 * Flickity PACKAGED v2.0.10
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://flickity.metafizzy.co
 * Copyright 2017 Metafizzy
 */

!function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";

    function i(i, o, a) {
        function h(t, e, n) {
            var s, o = "$()." + i + '("' + e + '")';
            return t.each(function (t, h) {
                var l = a.data(h, i);
                if (!l) return void r(i + " not initialized. Cannot call methods, i.e. " + o);
                var c = l[e];
                if (!c || "_" == e.charAt(0)) return void r(o + " is not a valid method");
                var d = c.apply(l, n);
                s = void 0 === s ? d : s
            }), void 0 !== s ? s : t
        }

        function l(t, e) {
            t.each(function (t, n) {
                var s = a.data(n, i);
                s ? (s.option(e), s._init()) : (s = new o(n, e), a.data(n, i, s))
            })
        }

        a = a || e || t.jQuery, a && (o.prototype.option || (o.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function (t) {
            if ("string" == typeof t) {
                var e = s.call(arguments, 1);
                return h(this, t, e)
            }
            return l(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }

    var s = Array.prototype.slice, o = t.console, r = "undefined" == typeof o ? function () {
    } : function (t) {
        o.error(t)
    };
    return n(e || t.jQuery), i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {
    }

    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return n.indexOf(e) == -1 && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return n != -1 && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
                var o = i[s], r = n && n[o];
                r && (this.off(t, o), delete n[o]), o.apply(this, e)
            }
            return this
        }
    }, e.allOff = function () {
        delete this._events, delete this._onceEvents
    }, t
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
    "use strict";

    function t(t) {
        var e = parseFloat(t), i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {
    }

    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; e < l; e++) {
            var i = h[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function s() {
        if (!c) {
            c = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var s = n(e);
            o.isBoxSizeOuter = r = 200 == t(s.width), i.removeChild(e)
        }
    }

    function o(e) {
        if (s(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var o = n(e);
            if ("none" == o.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var c = a.isBorderBox = "border-box" == o.boxSizing, d = 0; d < l; d++) {
                var u = h[d], f = o[u], p = parseFloat(f);
                a[u] = isNaN(p) ? 0 : p
            }
            var v = a.paddingLeft + a.paddingRight, g = a.paddingTop + a.paddingBottom,
                m = a.marginLeft + a.marginRight, y = a.marginTop + a.marginBottom,
                E = a.borderLeftWidth + a.borderRightWidth, S = a.borderTopWidth + a.borderBottomWidth, b = c && r,
                x = t(o.width);
            x !== !1 && (a.width = x + (b ? 0 : v + E));
            var C = t(o.height);
            return C !== !1 && (a.height = C + (b ? 0 : g + S)), a.innerWidth = a.width - (v + E), a.innerHeight = a.height - (g + S), a.outerWidth = a.width + m, a.outerHeight = a.height + y, a
        }
    }

    var r, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        },
        h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        l = h.length, c = !1;
    return o
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i], s = n + "MatchesSelector";
            if (t[s]) return s
        }
    }();
    return function (e, i) {
        return e[t](i)
    }
}), function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var i = {};
    i.extend = function (t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function (t, e) {
        return (t % e + e) % e
    }, i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if (t && "object" == typeof t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
        return e
    }, i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var s = [];
        return t.forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!n) return void s.push(t);
                e(t, n) && s.push(t);
                for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++) s.push(i[o])
            }
        }), s
    }, i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e], s = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[s];
            t && clearTimeout(t);
            var e = arguments, o = this;
            this[s] = setTimeout(function () {
                n.apply(o, e), delete o[s]
            }, i || 100)
        }
    }, i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function (e, s) {
        i.docReady(function () {
            var o = i.toDashed(s), r = "data-" + o, a = document.querySelectorAll("[" + r + "]"),
                h = document.querySelectorAll(".js-" + o), l = i.makeArray(a).concat(i.makeArray(h)),
                c = r + "-options", d = t.jQuery;
            l.forEach(function (t) {
                var i, o = t.getAttribute(r) || t.getAttribute(c);
                try {
                    i = o && JSON.parse(o)
                } catch (a) {
                    return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var h = new e(t, i);
                d && d.data(t, s, h)
            })
        })
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {}, t.Flickity.Cell = e(t, t.getSize))
}(window, function (t, e) {
    function i(t, e) {
        this.element = t, this.parent = e, this.create()
    }

    var n = i.prototype;
    return n.create = function () {
        this.element.style.position = "absolute", this.x = 0, this.shift = 0
    }, n.destroy = function () {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.style[t] = ""
    }, n.getSize = function () {
        this.size = e(this.element)
    }, n.setPosition = function (t) {
        this.x = t, this.updateTarget(), this.renderPosition(t)
    }, n.updateTarget = n.setDefaultTarget = function () {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }, n.renderPosition = function (t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }, n.wrapShift = function (t) {
        this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
    }, n.remove = function () {
        this.element.parentNode.removeChild(this.element)
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e())
}(window, function () {
    "use strict";

    function t(t) {
        this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
    }

    var e = t.prototype;
    return e.addCell = function (t) {
        if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }, e.updateTarget = function () {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft", e = this.getLastCell(), i = e ? e.size[t] : 0,
            n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }, e.getLastCell = function () {
        return this.cells[this.cells.length - 1]
    }, e.select = function () {
        this.changeSelectedClass("add")
    }, e.unselect = function () {
        this.changeSelectedClass("remove")
    }, e.changeSelectedClass = function (t) {
        this.cells.forEach(function (e) {
            e.element.classList[t]("is-selected")
        })
    }, e.getCellElements = function () {
        return this.cells.map(function (t) {
            return t.element
        })
    }, t
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
}(window, function (t, e) {
    var i = t.requestAnimationFrame || t.webkitRequestAnimationFrame, n = 0;
    i || (i = function (t) {
        var e = (new Date).getTime(), i = Math.max(0, 16 - (e - n)), s = setTimeout(t, i);
        return n = e + i, s
    });
    var s = {};
    s.startAnimation = function () {
        this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
    }, s.animate = function () {
        this.applyDragForce(), this.applySelectedAttraction();
        var t = this.x;
        if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
            var e = this;
            i(function () {
                e.animate()
            })
        }
    };
    var o = function () {
        var t = document.documentElement.style;
        return "string" == typeof t.transform ? "transform" : "WebkitTransform"
    }();
    return s.positionSlider = function () {
        var t = this.x;
        this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), t += this.cursorPosition, t = this.options.rightToLeft && o ? -t : t;
        var i = this.getPositionValue(t);
        this.slider.style[o] = this.isAnimating ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
        var n = this.slides[0];
        if (n) {
            var s = -this.x - n.target, r = s / this.slidesWidth;
            this.dispatchEvent("scroll", null, [r, s])
        }
    }, s.positionSliderAtSelected = function () {
        this.cells.length && (this.x = -this.selectedSlide.target, this.positionSlider())
    }, s.getPositionValue = function (t) {
        return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
    }, s.settle = function (t) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle"))
    }, s.shiftWrapCells = function (t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1)
    }, s._shiftCells = function (t, e, i) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n], o = e > 0 ? i : 0;
            s.wrapShift(o), e -= s.size.outerWidth
        }
    }, s._unshiftCells = function (t) {
        if (t && t.length) for (var e = 0; e < t.length; e++) t[e].wrapShift(0)
    }, s.integratePhysics = function () {
        this.x += this.velocity, this.velocity *= this.getFrictionFactor()
    }, s.applyForce = function (t) {
        this.velocity += t
    }, s.getFrictionFactor = function () {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }, s.getRestingPosition = function () {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }, s.applyDragForce = function () {
        if (this.isPointerDown) {
            var t = this.dragX - this.x, e = t - this.velocity;
            this.applyForce(e)
        }
    }, s.applySelectedAttraction = function () {
        if (!this.isPointerDown && !this.isFreeScrolling && this.cells.length) {
            var t = this.selectedSlide.target * -1 - this.x, e = t * this.options.selectedAttraction;
            this.applyForce(e)
        }
    }, s
}), function (t, e) {
    if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (i, n, s, o, r, a) {
        return e(t, i, n, s, o, r, a)
    }); else if ("object" == typeof module && module.exports) module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate")); else {
        var i = t.Flickity;
        t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
    }
}(window, function (t, e, i, n, s, o, r) {
    function a(t, e) {
        for (t = n.makeArray(t); t.length;) e.appendChild(t.shift())
    }

    function h(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(d && d.error("Bad element for Flickity: " + (i || t)));
        if (this.element = i, this.element.flickityGUID) {
            var s = f[this.element.flickityGUID];
            return s.option(e), s
        }
        l && (this.$element = l(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e), this._create()
    }

    var l = t.jQuery, c = t.getComputedStyle, d = t.console, u = 0, f = {};
    h.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    }, h.createMethods = [];
    var p = h.prototype;
    n.extend(p, e.prototype), p._create = function () {
        var e = this.guid = ++u;
        this.element.flickityGUID = e, f[e] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this), h.createMethods.forEach(function (t) {
            this[t]()
        }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
    }, p.option = function (t) {
        n.extend(this.options, t)
    }, p.activate = function () {
        if (!this.isActive) {
            this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
            var t = this._filterFindCellElements(this.element.children);
            a(t, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
            var e, i = this.options.initialIndex;
            e = this.isInitActivated ? this.selectedIndex : void 0 !== i && this.cells[i] ? i : 0, this.select(e, !1, !0), this.isInitActivated = !0
        }
    }, p._createSlider = function () {
        var t = document.createElement("div");
        t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
    }, p._filterFindCellElements = function (t) {
        return n.filterFindElements(t, this.options.cellSelector)
    }, p.reloadCells = function () {
        this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
    }, p._makeCells = function (t) {
        var e = this._filterFindCellElements(t), i = e.map(function (t) {
            return new s(t, this)
        }, this);
        return i
    }, p.getLastCell = function () {
        return this.cells[this.cells.length - 1]
    }, p.getLastSlide = function () {
        return this.slides[this.slides.length - 1]
    }, p.positionCells = function () {
        this._sizeCells(this.cells), this._positionCells(0)
    }, p._positionCells = function (t) {
        t = t || 0, this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
        var e = 0;
        if (t > 0) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, s = t; s < n; s++) {
            var o = this.cells[s];
            o.setPosition(e), e += o.size.outerWidth, this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }, p._sizeCells = function (t) {
        t.forEach(function (t) {
            t.getSize()
        })
    }, p.updateSlides = function () {
        if (this.slides = [], this.cells.length) {
            var t = new o(this);
            this.slides.push(t);
            var e = "left" == this.originSide, i = e ? "marginRight" : "marginLeft", n = this._getCanCellFit();
            this.cells.forEach(function (e, s) {
                if (!t.cells.length) return void t.addCell(e);
                var r = t.outerWidth - t.firstMargin + (e.size.outerWidth - e.size[i]);
                n.call(this, s, r) ? t.addCell(e) : (t.updateTarget(), t = new o(this), this.slides.push(t), t.addCell(e))
            }, this), t.updateTarget(), this.updateSelectedSlide()
        }
    }, p._getCanCellFit = function () {
        var t = this.options.groupCells;
        if (!t) return function () {
            return !1
        };
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function (t) {
                return t % e !== 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/), n = i ? parseInt(i[1], 10) / 100 : 1;
        return function (t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    }, p._init = p.reposition = function () {
        this.positionCells(), this.positionSliderAtSelected()
    }, p.getSize = function () {
        this.size = i(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var v = {center: {left: .5, right: .5}, left: {left: 0, right: 1}, right: {right: 0, left: 1}};
    return p.setCellAlign = function () {
        var t = v[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }, p.setGallerySize = function () {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }, p._getWrapShiftCells = function () {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition, e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }, p._getGapCells = function (t, e, i) {
        for (var n = []; t > 0;) {
            var s = this.cells[e];
            if (!s) break;
            n.push(s), e += i, t -= s.size.outerWidth
        }
        return n
    }, p._containSlides = function () {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft, e = t ? "marginRight" : "marginLeft",
                i = t ? "marginLeft" : "marginRight", n = this.slideableWidth - this.getLastCell().size[i],
                s = n < this.size.innerWidth, o = this.cursorPosition + this.cells[0].size[e],
                r = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function (t) {
                s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o), t.target = Math.min(t.target, r))
            }, this)
        }
    }, p.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), l && this.$element) {
            t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            var s = t;
            if (e) {
                var o = l.Event(e);
                o.type = t, s = o
            }
            this.$element.trigger(s, i)
        }
    }, p.select = function (t, e, i) {
        this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)), this.slides[t] && (this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select"), this.dispatchEvent("cellSelect")))
    }, p._wrapSelect = function (t) {
        var e = this.slides.length, i = this.options.wrapAround && e > 1;
        if (!i) return t;
        var s = n.modulo(t, e), o = Math.abs(s - this.selectedIndex), r = Math.abs(s + e - this.selectedIndex),
            a = Math.abs(s - e - this.selectedIndex);
        !this.isDragSelect && r < o ? t += e : !this.isDragSelect && a < o && (t -= e), t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth)
    }, p.previous = function (t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }, p.next = function (t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }, p.updateSelectedSlide = function () {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(), this.selectedSlide = t, t.select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0])
    }, p.unselectSelectedSlide = function () {
        this.selectedSlide && this.selectedSlide.unselect()
    }, p.selectCell = function (t, e, i) {
        var n;
        "number" == typeof t ? n = this.cells[t] : ("string" == typeof t && (t = this.element.querySelector(t)), n = this.getCell(t));
        for (var s = 0; n && s < this.slides.length; s++) {
            var o = this.slides[s], r = o.cells.indexOf(n);
            if (r != -1) return void this.select(s, e, i)
        }
    }, p.getCell = function (t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t) return i
        }
    }, p.getCells = function (t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function (t) {
            var i = this.getCell(t);
            i && e.push(i)
        }, this), e
    }, p.getCellElements = function () {
        return this.cells.map(function (t) {
            return t.element
        })
    }, p.getParentCell = function (t) {
        var e = this.getCell(t);
        return e ? e : (t = n.getParent(t, ".flickity-slider > *"), this.getCell(t))
    }, p.getAdjacentCellElements = function (t, e) {
        if (!t) return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (1 + 2 * t >= i) return this.getCellElements();
        for (var s = [], o = e - t; o <= e + t; o++) {
            var r = this.options.wrapAround ? n.modulo(o, i) : o, a = this.slides[r];
            a && (s = s.concat(a.getCellElements()))
        }
        return s
    }, p.uiChange = function () {
        this.emitEvent("uiChange")
    }, p.childUIPointerDown = function (t) {
        this.emitEvent("childUIPointerDown", [t])
    }, p.onresize = function () {
        this.watchCSS(), this.resize()
    }, n.debounceMethod(h, "onresize", 150), p.resize = function () {
        if (this.isActive) {
            this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }, p.watchCSS = function () {
        var t = this.options.watchCSS;
        if (t) {
            var e = c(this.element, ":after").content;
            e.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
        }
    }, p.onkeydown = function (t) {
        if (this.options.accessibility && (!document.activeElement || document.activeElement == this.element)) if (37 == t.keyCode) {
            var e = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(), this[e]()
        } else if (39 == t.keyCode) {
            var i = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(), this[i]()
        }
    }, p.deactivate = function () {
        this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.cells.forEach(function (t) {
            t.destroy()
        }), this.unselectSelectedSlide(), this.element.removeChild(this.viewport), a(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
    }, p.destroy = function () {
        this.deactivate(), t.removeEventListener("resize", this), this.emitEvent("destroy"), l && this.$element && l.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete f[this.guid]
    }, n.extend(p, r), h.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.flickityGUID;
        return e && f[e]
    }, n.htmlInit(h, "flickity"), l && l.bridget && l.bridget("flickity", h), h.setJQuery = function (t) {
        l = t
    }, h.Cell = s, h
}), function (t, e) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
}(window, function (t, e) {
    function i() {
    }

    function n() {
    }

    var s = n.prototype = Object.create(e.prototype);
    s.bindStartEvent = function (t) {
        this._bindStartEvent(t, !0)
    }, s.unbindStartEvent = function (t) {
        this._bindStartEvent(t, !1)
    }, s._bindStartEvent = function (e, i) {
        i = void 0 === i || !!i;
        var n = i ? "addEventListener" : "removeEventListener";
        t.PointerEvent ? e[n]("pointerdown", this) : (e[n]("mousedown", this), e[n]("touchstart", this))
    }, s.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, s.getTouch = function (t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier) return i
        }
    }, s.onmousedown = function (t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }, s.ontouchstart = function (t) {
        this._pointerDown(t, t.changedTouches[0])
    }, s.onpointerdown = function (t) {
        this._pointerDown(t, t)
    }, s._pointerDown = function (t, e) {
        this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e))
    }, s.pointerDown = function (t, e) {
        this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    };
    var o = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return s._bindPostStartEvents = function (e) {
        if (e) {
            var i = o[e.type];
            i.forEach(function (e) {
                t.addEventListener(e, this)
            }, this), this._boundPointerEvents = i
        }
    }, s._unbindPostStartEvents = function () {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function (e) {
            t.removeEventListener(e, this)
        }, this), delete this._boundPointerEvents)
    }, s.onmousemove = function (t) {
        this._pointerMove(t, t)
    }, s.onpointermove = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }, s.ontouchmove = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }, s._pointerMove = function (t, e) {
        this.pointerMove(t, e)
    }, s.pointerMove = function (t, e) {
        this.emitEvent("pointerMove", [t, e])
    }, s.onmouseup = function (t) {
        this._pointerUp(t, t)
    }, s.onpointerup = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }, s.ontouchend = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }, s._pointerUp = function (t, e) {
        this._pointerDone(), this.pointerUp(t, e)
    }, s.pointerUp = function (t, e) {
        this.emitEvent("pointerUp", [t, e])
    }, s._pointerDone = function () {
        this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerDone()
    }, s.pointerDone = i, s.onpointercancel = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }, s.ontouchcancel = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }, s._pointerCancel = function (t, e) {
        this._pointerDone(), this.pointerCancel(t, e)
    }, s.pointerCancel = function (t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }, n.getPointerPoint = function (t) {
        return {x: t.pageX, y: t.pageY}
    }, n
}), function (t, e) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
}(window, function (t, e) {
    function i() {
    }

    var n = i.prototype = Object.create(e.prototype);
    return n.bindHandles = function () {
        this._bindHandles(!0)
    }, n.unbindHandles = function () {
        this._bindHandles(!1)
    }, n._bindHandles = function (e) {
        e = void 0 === e || !!e;
        for (var i = e ? "addEventListener" : "removeEventListener", n = 0; n < this.handles.length; n++) {
            var s = this.handles[n];
            this._bindStartEvent(s, e), s[i]("click", this), t.PointerEvent && (s.style.touchAction = e ? this._touchActionValue : "")
        }
    }, n._touchActionValue = "none", n.pointerDown = function (t, e) {
        if ("INPUT" == t.target.nodeName && "range" == t.target.type) return this.isPointerDown = !1, void delete this.pointerIdentifier;
        this._dragPointerDown(t, e);
        var i = document.activeElement;
        i && i.blur && i.blur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    }, n._dragPointerDown = function (t, i) {
        this.pointerDownPoint = e.getPointerPoint(i);
        var n = this.canPreventDefaultOnPointerDown(t, i);
        n && t.preventDefault()
    }, n.canPreventDefaultOnPointerDown = function (t) {
        return "SELECT" != t.target.nodeName
    }, n.pointerMove = function (t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i)
    }, n._dragPointerMove = function (t, i) {
        var n = e.getPointerPoint(i), s = {x: n.x - this.pointerDownPoint.x, y: n.y - this.pointerDownPoint.y};
        return !this.isDragging && this.hasDragStarted(s) && this._dragStart(t, i), s
    }, n.hasDragStarted = function (t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
    }, n.pointerUp = function (t, e) {
        this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e)
    }, n._dragPointerUp = function (t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }, n._dragStart = function (t, i) {
        this.isDragging = !0, this.dragStartPoint = e.getPointerPoint(i), this.isPreventingClicks = !0, this.dragStart(t, i)
    }, n.dragStart = function (t, e) {
        this.emitEvent("dragStart", [t, e])
    }, n._dragMove = function (t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }, n.dragMove = function (t, e, i) {
        t.preventDefault(), this.emitEvent("dragMove", [t, e, i])
    }, n._dragEnd = function (t, e) {
        this.isDragging = !1, setTimeout(function () {
            delete this.isPreventingClicks
        }.bind(this)), this.dragEnd(t, e)
    }, n.dragEnd = function (t, e) {
        this.emitEvent("dragEnd", [t, e])
    }, n.onclick = function (t) {
        this.isPreventingClicks && t.preventDefault()
    }, n._staticClick = function (t, e) {
        if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
            var i = t.target.nodeName;
            "INPUT" != i && "TEXTAREA" != i || t.target.focus(), this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
                delete this.isIgnoringMouseUp
            }.bind(this), 400))
        }
    }, n.staticClick = function (t, e) {
        this.emitEvent("staticClick", [t, e])
    }, i.getPointerPoint = e.getPointerPoint, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
}(window, function (t, e, i, n) {
    function s(t) {
        var e = "touchstart" == t.type, i = "touch" == t.pointerType, n = d[t.target.nodeName];
        return e || i || n
    }

    function o() {
        return {x: t.pageXOffset, y: t.pageYOffset}
    }

    n.extend(e.defaults, {draggable: !0, dragThreshold: 3}), e.createMethods.push("_createDrag");
    var r = e.prototype;
    n.extend(r, i.prototype), r._touchActionValue = "pan-y";
    var a = "createTouch" in document, h = !1;
    r._createDrag = function () {
        this.on("activate", this.bindDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.unbindDrag), a && !h && (t.addEventListener("touchmove", function () {
        }), h = !0)
    }, r.bindDrag = function () {
        this.options.draggable && !this.isDragBound && (this.element.classList.add("is-draggable"), this.handles = [this.viewport], this.bindHandles(), this.isDragBound = !0)
    }, r.unbindDrag = function () {
        this.isDragBound && (this.element.classList.remove("is-draggable"), this.unbindHandles(), delete this.isDragBound)
    }, r._uiChangeDrag = function () {
        delete this.isFreeScrolling
    }, r._childUIPointerDownDrag = function (t) {
        t.preventDefault(), this.pointerDownFocus(t)
    };
    var l = {TEXTAREA: !0, INPUT: !0, OPTION: !0},
        c = {radio: !0, checkbox: !0, button: !0, submit: !0, image: !0, file: !0};
    r.pointerDown = function (e, i) {
        var n = l[e.target.nodeName] && !c[e.target.type];
        if (n) return this.isPointerDown = !1, void delete this.pointerIdentifier;
        this._dragPointerDown(e, i);
        var s = document.activeElement;
        s && s.blur && s != this.element && s != document.body && s.blur(), this.pointerDownFocus(e), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this._bindPostStartEvents(e), this.pointerDownScroll = o(), t.addEventListener("scroll", this), this.dispatchEvent("pointerDown", e, [i])
    }, r.pointerDownFocus = function (e) {
        var i = s(e);
        if (this.options.accessibility && !i) {
            var n = t.pageYOffset;
            this.element.focus(), t.pageYOffset != n && t.scrollTo(t.pageXOffset, n)
        }
    };
    var d = {INPUT: !0, SELECT: !0};
    return r.canPreventDefaultOnPointerDown = function (t) {
        var e = s(t);
        return !e
    }, r.hasDragStarted = function (t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }, r.pointerUp = function (t, e) {
        delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e)
    }, r.pointerDone = function () {
        t.removeEventListener("scroll", this), delete this.pointerDownScroll
    }, r.dragStart = function (e, i) {
        this.dragStartPosition = this.x, this.startAnimation(), t.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [i])
    }, r.pointerMove = function (t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i)
    }, r.dragMove = function (t, e, i) {
        t.preventDefault(), this.previousDragX = this.dragX;
        var n = this.options.rightToLeft ? -1 : 1, s = this.dragStartPosition + i.x * n;
        if (!this.options.wrapAround && this.slides.length) {
            var o = Math.max(-this.slides[0].target, this.dragStartPosition);
            s = s > o ? .5 * (s + o) : s;
            var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
            s = s < r ? .5 * (s + r) : s
        }
        this.dragX = s, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", t, [e, i])
    }, r.dragEnd = function (t, e) {
        this.options.freeScroll && (this.isFreeScrolling = !0);
        var i = this.dragEndRestingSelect();
        if (this.options.freeScroll && !this.options.wrapAround) {
            var n = this.getRestingPosition();
            this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
        } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
        delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e])
    }, r.dragEndRestingSelect = function () {
        var t = this.getRestingPosition(), e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
            i = this._getClosestResting(t, e, 1), n = this._getClosestResting(t, e, -1),
            s = i.distance < n.distance ? i.index : n.index;
        return s
    }, r._getClosestResting = function (t, e, i) {
        for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function (t, e) {
            return t <= e
        } : function (t, e) {
            return t < e
        }; o(e, s) && (n += i, s = e, e = this.getSlideDistance(-t, n), null !== e);) e = Math.abs(e);
        return {distance: s, index: n - i}
    }, r.getSlideDistance = function (t, e) {
        var i = this.slides.length, s = this.options.wrapAround && i > 1, o = s ? n.modulo(e, i) : e,
            r = this.slides[o];
        if (!r) return null;
        var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (r.target + a)
    }, r.dragEndBoostSelect = function () {
        if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex), e = this.previousDragX - this.dragX;
        return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0
    }, r.staticClick = function (t, e) {
        var i = this.getParentCell(t.target), n = i && i.element, s = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, s])
    }, r.onscroll = function () {
        var t = o(), e = this.pointerDownScroll.x - t.x, i = this.pointerDownScroll.y - t.y;
        (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.TapListener = e(t, t.Unipointer)
}(window, function (t, e) {
    function i(t) {
        this.bindTap(t)
    }

    var n = i.prototype = Object.create(e.prototype);
    return n.bindTap = function (t) {
        t && (this.unbindTap(), this.tapElement = t, this._bindStartEvent(t, !0))
    }, n.unbindTap = function () {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
    }, n.pointerUp = function (i, n) {
        if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
            var s = e.getPointerPoint(n), o = this.tapElement.getBoundingClientRect(), r = t.pageXOffset,
                a = t.pageYOffset,
                h = s.x >= o.left + r && s.x <= o.right + r && s.y >= o.top + a && s.y <= o.bottom + a;
            if (h && this.emitEvent("tap", [i, n]), "mouseup" != i.type) {
                this.isIgnoringMouseUp = !0;
                var l = this;
                setTimeout(function () {
                    delete l.isIgnoringMouseUp
                }, 400)
            }
        }
    }, n.destroy = function () {
        this.pointerDone(), this.unbindTap()
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function (i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function (t, e, i, n) {
    "use strict";

    function s(t, e) {
        this.direction = t, this.parent = e, this._create()
    }

    function o(t) {
        return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
    }

    var r = "http://www.w3.org/2000/svg";
    s.prototype = new i, s.prototype._create = function () {
        this.isEnabled = !0, this.isPrevious = this.direction == -1;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "previous" : "next");
        var i = this.createSVG();
        e.appendChild(i), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, s.prototype.activate = function () {
        this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
    }, s.prototype.deactivate = function () {
        this.parent.element.removeChild(this.element), i.prototype.destroy.call(this), this.element.removeEventListener("click", this)
    }, s.prototype.createSVG = function () {
        var t = document.createElementNS(r, "svg");
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(r, "path"), i = o(this.parent.options.arrowShape);
        return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t
    }, s.prototype.onTap = function () {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }, s.prototype.handleEvent = n.handleEvent, s.prototype.onclick = function () {
        var t = document.activeElement;
        t && t == this.element && this.onTap()
    }, s.prototype.enable = function () {
        this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
    }, s.prototype.disable = function () {
        this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
    }, s.prototype.update = function () {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && t.length > 1) return void this.enable();
        var e = t.length ? t.length - 1 : 0, i = this.isPrevious ? 0 : e,
            n = this.parent.selectedIndex == i ? "disable" : "enable";
        this[n]()
    }, s.prototype.destroy = function () {
        this.deactivate()
    }, n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30}
    }), e.createMethods.push("_createPrevNextButtons");
    var a = e.prototype;
    return a._createPrevNextButtons = function () {
        this.options.prevNextButtons && (this.prevButton = new s((-1), this), this.nextButton = new s(1, this), this.on("activate", this.activatePrevNextButtons))
    }, a.activatePrevNextButtons = function () {
        this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
    }, a.deactivatePrevNextButtons = function () {
        this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
    }, e.PrevNextButton = s, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function (i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function (t, e, i, n) {
    function s(t) {
        this.parent = t, this._create()
    }

    s.prototype = new i, s.prototype._create = function () {
        this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, s.prototype.activate = function () {
        this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
    }, s.prototype.deactivate = function () {
        this.parent.element.removeChild(this.holder), i.prototype.destroy.call(this)
    }, s.prototype.setDots = function () {
        var t = this.parent.slides.length - this.dots.length;
        t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }, s.prototype.addDots = function (t) {
        for (var e = document.createDocumentFragment(), i = []; t;) {
            var n = document.createElement("li");
            n.className = "dot", e.appendChild(n), i.push(n), t--
        }
        this.holder.appendChild(e), this.dots = this.dots.concat(i)
    }, s.prototype.removeDots = function (t) {
        var e = this.dots.splice(this.dots.length - t, t);
        e.forEach(function (t) {
            this.holder.removeChild(t)
        }, this)
    }, s.prototype.updateSelected = function () {
        this.selectedDot && (this.selectedDot.className = "dot"), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected")
    }, s.prototype.onTap = function (t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }, s.prototype.destroy = function () {
        this.deactivate()
    }, e.PageDots = s, n.extend(e.defaults, {pageDots: !0}), e.createMethods.push("_createPageDots");
    var o = e.prototype;
    return o._createPageDots = function () {
        this.options.pageDots && (this.pageDots = new s(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
    }, o.activatePageDots = function () {
        this.pageDots.activate()
    }, o.updateSelectedPageDots = function () {
        this.pageDots.updateSelected()
    }, o.updatePageDots = function () {
        this.pageDots.setDots()
    }, o.deactivatePageDots = function () {
        this.pageDots.deactivate()
    }, e.PageDots = s, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function (t, i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function (t, e, i) {
    function n(t) {
        this.parent = t, this.state = "stopped", o && (this.onVisibilityChange = function () {
            this.visibilityChange()
        }.bind(this), this.onVisibilityPlay = function () {
            this.visibilityPlay()
        }.bind(this))
    }

    var s, o;
    "hidden" in document ? (s = "hidden", o = "visibilitychange") : "webkitHidden" in document && (s = "webkitHidden", o = "webkitvisibilitychange"), n.prototype = Object.create(t.prototype), n.prototype.play = function () {
        if ("playing" != this.state) {
            var t = document[s];
            if (o && t) return void document.addEventListener(o, this.onVisibilityPlay);
            this.state = "playing", o && document.addEventListener(o, this.onVisibilityChange), this.tick()
        }
    }, n.prototype.tick = function () {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(), this.timeout = setTimeout(function () {
                e.parent.next(!0), e.tick()
            }, t)
        }
    }, n.prototype.stop = function () {
        this.state = "stopped", this.clear(), o && document.removeEventListener(o, this.onVisibilityChange)
    }, n.prototype.clear = function () {
        clearTimeout(this.timeout)
    }, n.prototype.pause = function () {
        "playing" == this.state && (this.state = "paused", this.clear())
    }, n.prototype.unpause = function () {
        "paused" == this.state && this.play()
    }, n.prototype.visibilityChange = function () {
        var t = document[s];
        this[t ? "pause" : "unpause"]()
    }, n.prototype.visibilityPlay = function () {
        this.play(), document.removeEventListener(o, this.onVisibilityPlay)
    }, e.extend(i.defaults, {pauseAutoPlayOnHover: !0}), i.createMethods.push("_createPlayer");
    var r = i.prototype;
    return r._createPlayer = function () {
        this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
    }, r.activatePlayer = function () {
        this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
    }, r.playPlayer = function () {
        this.player.play()
    }, r.stopPlayer = function () {
        this.player.stop()
    }, r.pausePlayer = function () {
        this.player.pause()
    }, r.unpausePlayer = function () {
        this.player.unpause()
    }, r.deactivatePlayer = function () {
        this.player.stop(), this.element.removeEventListener("mouseenter", this)
    }, r.onmouseenter = function () {
        this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
    }, r.onmouseleave = function () {
        this.player.unpause(), this.element.removeEventListener("mouseleave", this)
    }, i.Player = n, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function (t, e, i) {
    function n(t) {
        var e = document.createDocumentFragment();
        return t.forEach(function (t) {
            e.appendChild(t.element)
        }), e
    }

    var s = e.prototype;
    return s.insert = function (t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var s = this.cells.length;
            e = void 0 === e ? s : e;
            var o = n(i), r = e == s;
            if (r) this.slider.appendChild(o); else {
                var a = this.cells[e].element;
                this.slider.insertBefore(o, a)
            }
            if (0 === e) this.cells = i.concat(this.cells); else if (r) this.cells = this.cells.concat(i); else {
                var h = this.cells.splice(e, s - e);
                this.cells = this.cells.concat(i).concat(h)
            }
            this._sizeCells(i);
            var l = e > this.selectedIndex ? 0 : i.length;
            this._cellAddedRemoved(e, l)
        }
    }, s.append = function (t) {
        this.insert(t, this.cells.length)
    }, s.prepend = function (t) {
        this.insert(t, 0)
    }, s.remove = function (t) {
        var e, n, s = this.getCells(t), o = 0, r = s.length;
        for (e = 0; e < r; e++) {
            n = s[e];
            var a = this.cells.indexOf(n) < this.selectedIndex;
            o -= a ? 1 : 0
        }
        for (e = 0; e < r; e++) n = s[e], n.remove(), i.removeFrom(this.cells, n);
        s.length && this._cellAddedRemoved(0, o)
    }, s._cellAddedRemoved = function (t, e) {
        e = e || 0, this.selectedIndex += e, this.selectedIndex = Math.max(0, Math.min(this.slides.length - 1, this.selectedIndex)), this.cellChange(t, !0), this.emitEvent("cellAddedRemoved", [t, e])
    }, s.cellSizeChange = function (t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }, s.cellChange = function (t, e) {
        var i = this.slideableWidth;
        if (this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("cellChange", [t]), this.options.freeScroll) {
            var n = i - this.slideableWidth;
            this.x += n * this.cellAlign, this.positionSlider()
        } else e && this.positionSliderAtSelected(), this.select(this.selectedIndex)
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function (i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function (t, e, i) {
    "use strict";

    function n(t) {
        if ("IMG" == t.nodeName && t.getAttribute("data-flickity-lazyload")) return [t];
        var e = t.querySelectorAll("img[data-flickity-lazyload]");
        return i.makeArray(e)
    }

    function s(t, e) {
        this.img = t, this.flickity = e, this.load()
    }

    e.createMethods.push("_createLazyload");
    var o = e.prototype;
    return o._createLazyload = function () {
        this.on("select", this.lazyLoad)
    }, o.lazyLoad = function () {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0, i = this.getAdjacentCellElements(e), o = [];
            i.forEach(function (t) {
                var e = n(t);
                o = o.concat(e)
            }), o.forEach(function (t) {
                new s(t, this)
            }, this)
        }
    }, s.prototype.handleEvent = i.handleEvent, s.prototype.load = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.img.getAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload")
    }, s.prototype.onload = function (t) {
        this.complete(t, "flickity-lazyloaded")
    }, s.prototype.onerror = function (t) {
        this.complete(t, "flickity-lazyerror")
    }, s.prototype.complete = function (t, e) {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img), n = i && i.element;
        this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n)
    }, e.LazyLoader = s, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function (t) {
    return t
}), function (t, e) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function (t, e) {
    function i(t, e, i) {
        return (e - t) * i + t
    }

    t.createMethods.push("_createAsNavFor");
    var n = t.prototype;
    return n._createAsNavFor = function () {
        this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function () {
                e.setNavCompanion(t)
            })
        }
    }, n.setNavCompanion = function (i) {
        i = e.getQueryElement(i);
        var n = t.data(i);
        if (n && n != this) {
            this.navCompanion = n;
            var s = this;
            this.onNavCompanionSelect = function () {
                s.navCompanionSelect()
            }, n.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
        }
    }, n.navCompanionSelect = function (t) {
        if (this.navCompanion) {
            var e = this.navCompanion.selectedCells[0], n = this.navCompanion.cells.indexOf(e),
                s = n + this.navCompanion.selectedCells.length - 1,
                o = Math.floor(i(n, s, this.navCompanion.cellAlign));
            if (this.selectCell(o, !1, t), this.removeNavSelectedElements(), !(o >= this.cells.length)) {
                var r = this.cells.slice(n, s + 1);
                this.navSelectedElements = r.map(function (t) {
                    return t.element
                }), this.changeNavSelectedClass("add")
            }
        }
    }, n.changeNavSelectedClass = function (t) {
        this.navSelectedElements.forEach(function (e) {
            e.classList[t]("is-nav-selected")
        })
    }, n.activateAsNavFor = function () {
        this.navCompanionSelect(!0)
    }, n.removeNavSelectedElements = function () {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
    }, n.onNavStaticClick = function (t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n)
    }, n.deactivateAsNavFor = function () {
        this.removeNavSelectedElements()
    }, n.destroyAsNavFor = function () {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
    }, t
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function (t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if ("number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
        return e
    }

    function s(t, e, o) {
        return this instanceof s ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? o = e : i(this.options, e), o && this.on("always", o), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(function () {
            this.check()
        }.bind(this))) : new s(t, e, o)
    }

    function o(t) {
        this.img = t
    }

    function r(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }

    var a = t.jQuery, h = t.console;
    s.prototype = Object.create(e.prototype), s.prototype.options = {}, s.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, s.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && l[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var s = i[n];
                this.addImage(s)
            }
            if ("string" == typeof this.options.background) {
                var o = t.querySelectorAll(this.options.background);
                for (n = 0; n < o.length; n++) {
                    var r = o[n];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    };
    var l = {1: !0, 9: !0, 11: !0};
    return s.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
            var s = n && n[2];
            s && this.addBackground(s, t), n = i.exec(e.backgroundImage)
        }
    }, s.prototype.addImage = function (t) {
        var e = new o(t);
        this.images.push(e)
    }, s.prototype.addBackground = function (t, e) {
        var i = new r(t, e);
        this.images.push(i)
    }, s.prototype.check = function () {
        function t(t, i, n) {
            setTimeout(function () {
                e.progress(t, i, n)
            })
        }

        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, s.prototype.progress = function (t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && h && h.log("progress: " + i, t, e)
    }, s.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, o.prototype = Object.create(e.prototype), o.prototype.check = function () {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, o.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, o.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, o.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, o.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, o.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, o.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype = Object.create(o.prototype), r.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, r.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, s.makeJQueryPlugin = function (e) {
        e = e || t.jQuery, e && (a = e, a.fn.imagesLoaded = function (t, e) {
            var i = new s(this, t, e);
            return i.jqDeferred.promise(a(this))
        })
    }, s.makeJQueryPlugin(), s
}), function (t, e) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function (i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
}(window, function (t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return n._createImagesLoaded = function () {
        this.on("activate", this.imagesLoaded)
    }, n.imagesLoaded = function () {
        function t(t, i) {
            var n = e.getParentCell(i.img);
            e.cellSizeChange(n && n.element), e.options.freeScroll || e.positionSliderAtSelected()
        }

        if (this.options.imagesLoaded) {
            var e = this;
            i(this.slider).on("progress", t)
        }
    }, e
});
/*! WOW - v1.1.2 - 2016-04-08
* Copyright (c) 2016 Matthieu Aussaguel;*/
(function () {
    var a, b, c, d, e, f = function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    }, g = [].indexOf || function (a) {
        for (var b = 0, c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
        return -1
    };
    b = function () {
        function a() {
        }

        return a.prototype.extend = function (a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function (a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.createEvent = function (a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
        }, a.prototype.emitEvent = function (a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
        }, a.prototype.addEvent = function (a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function (a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function () {
        function a() {
            this.keys = [], this.values = []
        }

        return a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d) if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e) if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }

        return a.notSupported = !0, a.prototype.observe = function () {
        }, a
    }()), d = this.getComputedStyle || function (a, b) {
        return this.getPropertyValue = function (b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function (a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function () {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }

        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, e.prototype.init = function () {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function () {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function () {
                var a, c, d, e;
                for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                return e
            }.call(this), this.all = function () {
                var a, c, d, e;
                for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                return e
            }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle(); else for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function (a) {
                return function (b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function () {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                        return d
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {childList: !0, subtree: !0}) : void 0
        }, e.prototype.stop = function () {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function (b) {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function (a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function (a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
        }, e.prototype.applyStyle = function (a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
                return function () {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function () {
            return "requestAnimationFrame" in window ? function (a) {
                return window.requestAnimationFrame(a)
            } : function (a) {
                return a()
            }
        }(), e.prototype.resetStyle = function () {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.resetAnimation = function (a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
        }, e.prototype.customStyle = function (a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {animationDuration: c}), d && this.vendorSet(a.style, {animationDelay: d}), e && this.vendorSet(a.style, {animationIterationCount: e}), this.vendorSet(a.style, {animationName: b ? "none" : this.cachedAnimationName(a)}), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function () {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h
            }.call(this));
            return d
        }, e.prototype.vendorCSS = function (a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g
        }, e.prototype.animationName = function (a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function (a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function (a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function () {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function (a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function (a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function () {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
}).call(this);
(function (g, d) {
    "function" === typeof define && define.amd ? define([], d) : "object" === typeof module && module.exports ? module.exports = d() : g.Rellax = d()
})(this, function () {
    var g = function (d, l) {
        var b = Object.create(g.prototype), h = 0, p = 0, k = 0, q = 0, f = [], t = !1,
            y = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (a) {
                setTimeout(a, 1E3 / 60)
            }, z = window.transformProp || function () {
                var a = document.createElement("div");
                if (null == a.style.transform) {
                    var c = ["Webkit", "Moz", "ms"], b;
                    for (b in c) if (void 0 !== a.style[c[b] + "Transform"]) return c[b] + "Transform"
                }
                return "transform"
            }(), r = function (a, b, e) {
                return a <= b ? b : a >= e ? e : a
            };
        b.options = {
            speed: -2, center: !1, round: !0, vertical: !0, horizontal: !1, callback: function () {
            }
        };
        l && Object.keys(l).forEach(function (a) {
            b.options[a] = l[a]
        });
        b.options.speed = r(b.options.speed, -10, 10);
        d || (d = ".rellax");
        var u = document.querySelectorAll(d);
        if (0 < u.length) b.elems = u; else throw Error("The elements you're trying to select don't exist.");
        var A = function (a) {
            var c = a.getAttribute("data-rellax-percentage"), e = a.getAttribute("data-rellax-speed"),
                f = a.getAttribute("data-rellax-zindex") || 0,
                d = b.options.vertical ? c || b.options.center ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop : 0 : 0,
                m = b.options.horizontal ? c || b.options.center ? window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0 : 0,
                g = d + a.getBoundingClientRect().top, h = a.clientHeight || a.offsetHeight || a.scrollHeight,
                k = m + a.getBoundingClientRect().left, l = a.clientWidth || a.offsetWidth || a.scrollWidth;
            d = c ? c : (d - g + p) / (h + p);
            var n = c ? c : (m - k + q) / (l + q);
            b.options.center && (d = n = .5);
            m = e ? r(e, -10, 10) : b.options.speed;
            if (c || b.options.center) m = r(e || b.options.speed, -5, 5);
            c = v(n, d, m);
            a = a.style.cssText;
            e = "";
            0 <= a.indexOf("transform") && (e = a.indexOf("transform"), e = a.slice(e), e = (d = e.indexOf(";")) ? " " + e.slice(11, d).replace(/\s/g, "") : " " + e.slice(11).replace(/\s/g, ""));
            return {
                baseX: c.x,
                baseY: c.y,
                top: g,
                left: k,
                height: h,
                width: l,
                speed: m,
                style: a,
                transform: e,
                zindex: f
            }
        }, w = function () {
            var a = h, c = k;
            h = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            k = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
            return a != h && b.options.vertical || c != k && b.options.horizontal ? !0 : !1
        }, v = function (a, c, e) {
            var d = {};
            a = 100 * e * (1 - a);
            c = 100 * e * (1 - c);
            d.x = b.options.round ? Math.round(a) : Math.round(100 * a) / 100;
            d.y = b.options.round ? Math.round(c) : Math.round(100 * c) / 100;
            return d
        }, x = function () {
            w() && !1 === t && n();
            y(x)
        }, n = function () {
            for (var a = 0; a < b.elems.length; a++) {
                var c = v((k - f[a].left + q) / (f[a].width + q), (h - f[a].top + p) / (f[a].height + p), f[a].speed),
                    e = c.y - f[a].baseY, d = c.x - f[a].baseX;
                b.elems[a].style[z] = "translate3d(" + (b.options.horizontal ? d : "0") + "px," + (b.options.vertical ? e : "0") + "px," + f[a].zindex + "px) " + f[a].transform
            }
            b.options.callback(c)
        };
        b.destroy = function () {
            for (var a = 0; a < b.elems.length; a++) b.elems[a].style.cssText = f[a].style;
            t = !0
        };
        (function () {
            p = window.innerHeight;
            q = window.innerWidth;
            w();
            for (var a = 0; a < b.elems.length; a++) {
                var c = A(b.elems[a]);
                f.push(c)
            }
            window.addEventListener("resize", function () {
                n()
            });
            x();
            n()
        })();
        return b
    };
    return g
});

/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.9.3
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
!function () {
    "use strict";

    function e(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function t(e, t, i) {
        e.addEventListener(t, i)
    }

    function i(e) {
        p = window.innerWidth || document.documentElement.clientWidth, d = window.innerHeight || document.documentElement.clientHeight, "object" !== ("undefined" == typeof e ? "undefined" : a(e)) || "load" !== e.type && "DOMContentLoaded" !== e.type || (f = !0)
    }

    function n() {
        if (g.length) {
            u = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var e = f || !y || y.width !== p || y.height !== d, t = e || !y || y.y !== u;
            f = !1, (e || t) && (g.forEach(function (i) {
                e && i.onResize(), t && i.onScroll()
            }), y = {width: p, height: d, y: u}), m(n)
        }
    }

    var o = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }

            return function (t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(), a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r = function () {
            for (var e = "transform WebkitTransform MozTransform".split(" "), t = document.createElement("div"), i = 0; i < e.length; i++) if (t && void 0 !== t.style[e[i]]) return e[i];
            return !1
        }(), l = navigator.userAgent, s = l.toLowerCase().indexOf("android") > -1,
        c = /iPad|iPhone|iPod/.test(l) && !window.MSStream,
        m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
            setTimeout(e, 1e3 / 60)
        }, p = void 0, d = void 0, u = void 0, f = !1;
    i(), t(window, "resize", i), t(window, "orientationchange", i), t(window, "load", i), t(window, "DOMContentLoaded", i);
    var g = [], y = !1, h = 0, v = function () {
        function t(i, n) {
            e(this, t);
            var o = this;
            o.instanceID = h++, o.$item = i, o.defaults = {
                type: "scroll",
                speed: .5,
                imgSrc: null,
                imgElement: ".jarallax-img",
                imgSize: "cover",
                imgPosition: "50% 50%",
                imgRepeat: "no-repeat",
                keepImg: !1,
                elementInViewport: null,
                zIndex: -100,
                noAndroid: !1,
                noIos: !1,
                videoSrc: null,
                videoStartTime: 0,
                videoEndTime: 0,
                videoVolume: 0,
                videoPlayOnlyVisible: !0,
                onScroll: null,
                onInit: null,
                onDestroy: null,
                onCoverImage: null
            };
            var r = o.$item.getAttribute("data-jarallax"), l = JSON.parse(r || "{}");
            r && console.warn("Detected usage of deprecated data-jarallax JSON options, you should use pure data-attribute options. See info here - https://github.com/nk-o/jarallax/issues/53");
            var m = o.$item.dataset || {}, p = {};
            Object.keys(m).forEach(function (e) {
                var t = e.substr(0, 1).toLowerCase() + e.substr(1);
                t && "undefined" != typeof o.defaults[t] && (p[t] = m[e])
            }), o.options = o.extend({}, o.defaults, l, p, n), o.pureOptions = o.extend({}, o.options), Object.keys(o.options).forEach(function (e) {
                "true" === o.options[e] ? o.options[e] = !0 : "false" === o.options[e] && (o.options[e] = !1)
            }), o.options.speed = Math.min(2, Math.max(-1, parseFloat(o.options.speed)));
            var d = o.options.elementInViewport;
            d && "object" === ("undefined" == typeof d ? "undefined" : a(d)) && "undefined" != typeof d.length && (d = d[0]), d instanceof Element || (d = null), o.options.elementInViewport = d, o.image = {
                src: o.options.imgSrc || null,
                $container: null,
                useImgTag: !1,
                position: s || c ? "absolute" : "fixed"
            }, o.initImg() && o.canInitParallax() && o.init()
        }

        return o(t, [{
            key: "css", value: function (e, t) {
                return "string" == typeof t ? window.getComputedStyle(e).getPropertyValue(t) : (t.transform && r && (t[r] = t.transform), Object.keys(t).forEach(function (i) {
                    e.style[i] = t[i]
                }), e)
            }
        }, {
            key: "extend", value: function (e) {
                var t = arguments;
                return e = e || {}, Object.keys(arguments).forEach(function (i) {
                    t[i] && Object.keys(t[i]).forEach(function (n) {
                        e[n] = t[i][n]
                    })
                }), e
            }
        }, {
            key: "getWindowData", value: function () {
                return {width: p, height: d, y: u}
            }
        }, {
            key: "initImg", value: function () {
                var e = this, t = e.options.imgElement;
                return t && "string" == typeof t && (t = e.$item.querySelector(t)), t instanceof Element || (t = null), t && (e.options.keepImg ? e.image.$item = t.cloneNode(!0) : (e.image.$item = t, e.image.$itemParent = t.parentNode), e.image.useImgTag = !0), !!e.image.$item || (null === e.image.src && (e.image.src = e.css(e.$item, "background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), !(!e.image.src || "none" === e.image.src))
            }
        }, {
            key: "canInitParallax", value: function () {
                return r && !(s && this.options.noAndroid) && !(c && this.options.noIos)
            }
        }, {
            key: "init", value: function () {
                var e = this, t = {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    pointerEvents: "none"
                }, i = {};
                if (!e.options.keepImg) {
                    var n = e.$item.getAttribute("style");
                    if (n && e.$item.setAttribute("data-jarallax-original-styles", n), e.image.useImgTag) {
                        var o = e.image.$item.getAttribute("style");
                        o && e.image.$item.setAttribute("data-jarallax-original-styles", o)
                    }
                }
                if ("static" === e.css(e.$item, "position") && e.css(e.$item, {position: "relative"}), "auto" === e.css(e.$item, "z-index") && e.css(e.$item, {zIndex: 0}), e.image.$container = document.createElement("div"), e.css(e.image.$container, t), e.css(e.image.$container, {"z-index": e.options.zIndex}), e.image.$container.setAttribute("id", "jarallax-container-" + e.instanceID), e.$item.appendChild(e.image.$container), e.image.useImgTag ? i = e.extend({
                    "object-fit": e.options.imgSize,
                    "object-position": e.options.imgPosition,
                    "font-family": "object-fit: " + e.options.imgSize + "; object-position: " + e.options.imgPosition + ";",
                    "max-width": "none"
                }, t, i) : (e.image.$item = document.createElement("div"), i = e.extend({
                    "background-position": e.options.imgPosition,
                    "background-size": e.options.imgSize,
                    "background-repeat": e.options.imgRepeat,
                    "background-image": 'url("' + e.image.src + '")'
                }, t, i)), "opacity" !== e.options.type && "scale" !== e.options.type && "scale-opacity" !== e.options.type && 1 !== e.options.speed || (e.image.position = "absolute"), "fixed" === e.image.position) for (var a = 0, r = e.$item; null !== r && r !== document && 0 === a;) {
                    var l = e.css(r, "-webkit-transform") || e.css(r, "-moz-transform") || e.css(r, "transform");
                    l && "none" !== l && (a = 1, e.image.position = "absolute"), r = r.parentNode
                }
                i.position = e.image.position, e.css(e.image.$item, i), e.image.$container.appendChild(e.image.$item), e.coverImage(), e.clipContainer(), e.onScroll(!0), e.options.onInit && e.options.onInit.call(e), "none" !== e.css(e.$item, "background-image") && e.css(e.$item, {"background-image": "none"}), e.addToParallaxList()
            }
        }, {
            key: "addToParallaxList", value: function () {
                g.push(this), 1 === g.length && n()
            }
        }, {
            key: "removeFromParallaxList", value: function () {
                var e = this;
                g.forEach(function (t, i) {
                    t.instanceID === e.instanceID && g.splice(i, 1)
                })
            }
        }, {
            key: "destroy", value: function () {
                var e = this;
                e.removeFromParallaxList();
                var t = e.$item.getAttribute("data-jarallax-original-styles");
                if (e.$item.removeAttribute("data-jarallax-original-styles"), t ? e.$item.setAttribute("style", t) : e.$item.removeAttribute("style"), e.image.useImgTag) {
                    var i = e.image.$item.getAttribute("data-jarallax-original-styles");
                    e.image.$item.removeAttribute("data-jarallax-original-styles"), i ? e.image.$item.setAttribute("style", t) : e.image.$item.removeAttribute("style"), e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item)
                }
                e.$clipStyles && e.$clipStyles.parentNode.removeChild(e.$clipStyles), e.image.$container && e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax
            }
        }, {
            key: "clipContainer", value: function () {
                if ("fixed" === this.image.position) {
                    var e = this, t = e.image.$container.getBoundingClientRect(), i = t.width, n = t.height;
                    if (!e.$clipStyles) {
                        e.$clipStyles = document.createElement("style"), e.$clipStyles.setAttribute("type", "text/css"), e.$clipStyles.setAttribute("id", "jarallax-clip-" + e.instanceID);
                        var o = document.head || document.getElementsByTagName("head")[0];
                        o.appendChild(e.$clipStyles)
                    }
                    var a = "#jarallax-container-" + e.instanceID + " {\n           clip: rect(0 " + i + "px " + n + "px 0);\n           clip: rect(0, " + i + "px, " + n + "px, 0);\n        }";
                    e.$clipStyles.styleSheet ? e.$clipStyles.styleSheet.cssText = a : e.$clipStyles.innerHTML = a
                }
            }
        }, {
            key: "coverImage", value: function () {
                var e = this, t = e.image.$container.getBoundingClientRect(), i = t.height, n = e.options.speed,
                    o = "scroll" === e.options.type || "scroll-opacity" === e.options.type, a = 0, r = i, l = 0;
                return o && (a = n < 0 ? n * Math.max(i, d) : n * (i + d), n > 1 ? r = Math.abs(a - d) : n < 0 ? r = a / n + Math.abs(a) : r += Math.abs(d - i) * (1 - n), a /= 2), e.parallaxScrollDistance = a, l = o ? (d - r) / 2 : (i - r) / 2, e.css(e.image.$item, {
                    height: r + "px",
                    marginTop: l + "px",
                    left: "fixed" === e.image.position ? t.left + "px" : "0",
                    width: t.width + "px"
                }), e.options.onCoverImage && e.options.onCoverImage.call(e), {
                    image: {height: r, marginTop: l},
                    container: t
                }
            }
        }, {
            key: "isVisible", value: function () {
                return this.isElementInViewport || !1
            }
        }, {
            key: "onScroll", value: function (e) {
                var t = this, i = t.$item.getBoundingClientRect(), n = i.top, o = i.height, a = {}, r = i;
                if (t.options.elementInViewport && (r = t.options.elementInViewport.getBoundingClientRect()), t.isElementInViewport = r.bottom >= 0 && r.right >= 0 && r.top <= d && r.left <= p, e || t.isElementInViewport) {
                    var l = Math.max(0, n), s = Math.max(0, o + n), c = Math.max(0, -n), m = Math.max(0, n + o - d),
                        u = Math.max(0, o - (n + o - d)), f = Math.max(0, -n + d - o), g = 1 - 2 * (d - n) / (d + o),
                        y = 1;
                    if (o < d ? y = 1 - (c || m) / o : s <= d ? y = s / d : u <= d && (y = u / d), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (a.transform = "translate3d(0,0,0)", a.opacity = y), "scale" === t.options.type || "scale-opacity" === t.options.type) {
                        var h = 1;
                        t.options.speed < 0 ? h -= t.options.speed * y : h += t.options.speed * (1 - y), a.transform = "scale(" + h + ") translate3d(0,0,0)"
                    }
                    if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
                        var v = t.parallaxScrollDistance * g;
                        "absolute" === t.image.position && (v -= n), a.transform = "translate3d(0," + v + "px,0)"
                    }
                    t.css(t.image.$item, a), t.options.onScroll && t.options.onScroll.call(t, {
                        section: i,
                        beforeTop: l,
                        beforeTopEnd: s,
                        afterTop: c,
                        beforeBottom: m,
                        beforeBottomEnd: u,
                        afterBottom: f,
                        visiblePercent: y,
                        fromViewportCenter: g
                    })
                }
            }
        }, {
            key: "onResize", value: function () {
                this.coverImage(), this.clipContainer()
            }
        }]), t
    }(), b = function (e) {
        ("object" === ("undefined" == typeof HTMLElement ? "undefined" : a(HTMLElement)) ? e instanceof HTMLElement : e && "object" === ("undefined" == typeof e ? "undefined" : a(e)) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]);
        var t = arguments[1], i = Array.prototype.slice.call(arguments, 2), n = e.length, o = 0, r = void 0;
        for (o; o < n; o++) if ("object" === ("undefined" == typeof t ? "undefined" : a(t)) || "undefined" == typeof t ? e[o].jarallax || (e[o].jarallax = new v(e[o], t)) : e[o].jarallax && (r = e[o].jarallax[t].apply(e[o].jarallax, i)), "undefined" != typeof r) return r;
        return e
    };
    b.constructor = v;
    var x = window.jarallax;
    if (window.jarallax = b, window.jarallax.noConflict = function () {
        return window.jarallax = x, this
    }, "undefined" != typeof jQuery) {
        var w = function () {
            var e = arguments || [];
            Array.prototype.unshift.call(e, this);
            var t = b.apply(window, e);
            return "object" !== ("undefined" == typeof t ? "undefined" : a(t)) ? t : this
        };
        w.constructor = v;
        var $ = jQuery.fn.jarallax;
        jQuery.fn.jarallax = w, jQuery.fn.jarallax.noConflict = function () {
            return jQuery.fn.jarallax = $, this
        }
    }
    t(window, "DOMContentLoaded", function () {
        b(document.querySelectorAll("[data-jarallax]"))
    })
}();
//! moment.js
//! version : 2.20.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.moment = factory()
}(this, (function () {
    'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

// This is done to register the method called with moment()
// without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

// Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

// compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !== 'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

// format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1 = /\d/;            //       0 - 9
    var match2 = /\d\d/;          //      00 - 99
    var match3 = /\d{3}/;         //     000 - 999
    var match4 = /\d{4}/;         //    0000 - 9999
    var match6 = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2 = /\d\d?/;         //       0 - 99
    var match3to4 = /\d\d\d\d?/;     //     999 - 9999
    var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3 = /\d{1,3}/;       //       0 - 999
    var match1to4 = /\d{1,4}/;       //       0 - 9999
    var match1to6 = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned = /\d+/;           //       0 - inf
    var matchSigned = /[+-]?\d+/;      //    -inf - inf

    var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;


    var regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

// FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

    addUnitAlias('year', 'y');

// PRIORITIES

    addUnitPriority('year', 1);

// PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

// HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

// HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

// MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

// MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

// FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

// ALIASES

    addUnitAlias('month', 'M');

// PRIORITY

    addUnitPriority('month', 8);

// PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

// LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

// MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date = new Date(y, m, d, h, M, s, ms);

        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

// start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

// FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

// PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

// PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

// HELPERS

// LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

// MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

// FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

// PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

// PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

// HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

// LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');

    function localeWeekdays(m, format) {
        if (!m) {
            return isArray(this._weekdays) ? this._weekdays :
                this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');

    function localeWeekdaysShort(m) {
        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');

    function localeWeekdaysMin(m) {
        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

// MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

// FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

// ALIASES

    addUnitAlias('hour', 'h');

// PRIORITY
    addUnitPriority('hour', 13);

// PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

// LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
    var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

// internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
            }
        }
        return locales[name];
    }

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    if (!localeFamilies[config.parentLocale]) {
                        localeFamilies[config.parentLocale] = [];
                    }
                    localeFamilies[config.parentLocale].push({
                        name: name,
                        config: config
                    });
                    return null;
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

// returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11 ? MONTH :
                    a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                        a[HOUR] < 0 || a[HOUR] > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                            a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE :
                                a[SECOND] < 0 || a[SECOND] > 59 ? SECOND :
                                    a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                                        -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

// Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

// iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

// date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

// date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

// constant that refers to the ISO standard
    hooks.ISO_8601 = function () {
    };

// constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {
    };

// date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

// date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

// TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

// FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

// PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk = matches[matches.length - 1] || [];
        var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
            0 :
            parts[0] === '+' ? minutes : -minutes;
    }

// Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {
    };

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

// ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

// TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                    'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val;
                val = period;
                period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                        diff < 2 ? 'nextDay' :
                            diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1(time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this._d.valueOf()).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
                createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
                createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    function startOf(units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
            /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
            /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
            /* falls through */
            case 'hour':
                this.minutes(0);
            /* falls through */
            case 'minute':
                this.seconds(0);
            /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf(units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function valueOf() {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

// FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


// PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

// MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

// FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

    addUnitAlias('quarter', 'Q');

// PRIORITY

    addUnitPriority('quarter', 7);

// PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

// MOMENTS

    function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

// FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

    addUnitAlias('date', 'D');

// PRIOROITY
    addUnitPriority('date', 9);

// PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
            (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
            locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

// MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

    addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
    addUnitPriority('dayOfYear', 4);

// PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

// HELPERS

// MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

// FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

    addUnitAlias('minute', 'm');

// PRIORITY

    addUnitPriority('minute', 14);

// PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

    addUnitAlias('second', 's');

// PRIORITY

    addUnitPriority('second', 15);

// PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

// MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


// ALIASES

    addUnitAlias('millisecond', 'ms');

// PRIORITY

    addUnitPriority('millisecond', 16);

// PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
// MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;

// Year
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;

// Week Year
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;

// Quarter
    proto.quarter = proto.quarters = getSetQuarter;

// Month
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;

// Week
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;

// Day
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;

// Hour
    proto.hour = proto.hours = getSetHour;

// Minute
    proto.minute = proto.minutes = getSetMinute;

// Second
    proto.second = proto.seconds = getSetSecond;

// Millisecond
    proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;

// Timezone
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;

// Deprecations
    proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;

// Month
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;

// Week
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

// Hours
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

// Side effect imports
    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

// supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

// supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds;
        var days = this._days;
        var months = this._months;
        var data = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   :
                    return days / 7 + milliseconds / 6048e5;
                case 'day'    :
                    return days + milliseconds / 864e5;
                case 'hour'   :
                    return days * 24 + milliseconds / 36e5;
                case 'minute' :
                    return days * 1440 + milliseconds / 6e4;
                case 'second' :
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

// TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds = makeAs('s');
    var asMinutes = makeAs('m');
    var asHours = makeAs('h');
    var asDays = makeAs('d');
    var asWeeks = makeAs('w');
    var asMonths = makeAs('M');
    var asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds = makeGetter('seconds');
    var minutes = makeGetter('minutes');
    var hours = makeGetter('hours');
    var days = makeGetter('days');
    var months = makeGetter('months');
    var years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s: 45,         // seconds to minute
        m: 45,         // minutes to hour
        h: 22,         // hours to day
        d: 26,         // days to month
        M: 11          // months to year
    };

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds = round(duration.as('s'));
        var minutes = round(duration.as('m'));
        var hours = round(duration.as('h'));
        var days = round(duration.as('d'));
        var months = round(duration.as('M'));
        var years = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds] ||
            seconds < thresholds.s && ['ss', seconds] ||
            minutes <= 1 && ['m'] ||
            minutes < thresholds.m && ['mm', minutes] ||
            hours <= 1 && ['h'] ||
            hours < thresholds.h && ['hh', hours] ||
            days <= 1 && ['d'] ||
            days < thresholds.d && ['dd', days] ||
            months <= 1 && ['M'] ||
            months < thresholds.M && ['MM', months] ||
            years <= 1 && ['y'] || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

// This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

// This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days = abs$1(this._days);
        var months = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

// Deprecations
    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

// Side effect imports

// FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

// PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

// Side effect imports


    hooks.version = '2.20.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

// currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'YYYY-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory) {
    'use strict';

    var moment;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try {
            moment = require('moment');
        } catch (e) {
        }
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req) {
            // Load moment.js as an optional dependency
            var id = 'moment';
            try {
                moment = req(id);
            } catch (e) {
            }
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
}(this, function (moment) {
    'use strict';

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',

        hasEventListeners = !!window.addEventListener,

        document = window.document,

        sto = window.setTimeout,

        addEvent = function (el, e, callback, capture) {
            if (hasEventListeners) {
                el.addEventListener(e, callback, !!capture);
            } else {
                el.attachEvent('on' + e, callback);
            }
        },

        removeEvent = function (el, e, callback, capture) {
            if (hasEventListeners) {
                el.removeEventListener(e, callback, !!capture);
            } else {
                el.detachEvent('on' + e, callback);
            }
        },

        trim = function (str) {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
        },

        hasClass = function (el, cn) {
            return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
        },

        addClass = function (el, cn) {
            if (!hasClass(el, cn)) {
                el.className = (el.className === '') ? cn : el.className + ' ' + cn;
            }
        },

        removeClass = function (el, cn) {
            el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
        },

        isArray = function (obj) {
            return (/Array/).test(Object.prototype.toString.call(obj));
        },

        isDate = function (obj) {
            return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
        },

        isWeekend = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        },

        isLeapYear = function (year) {
            // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },

        getDaysInMonth = function (year, month) {
            return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },

        setToStartOfDay = function (date) {
            if (isDate(date)) date.setHours(0, 0, 0, 0);
        },

        compareDates = function (a, b) {
            // weak date comparison (use setToStartOfDay(date) to ensure correct result)
            return a.getTime() === b.getTime();
        },

        extend = function (to, from, overwrite) {
            var prop, hasProp;
            for (prop in from) {
                hasProp = to[prop] !== undefined;
                if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                    if (isDate(from[prop])) {
                        if (overwrite) {
                            to[prop] = new Date(from[prop].getTime());
                        }
                    }
                    else if (isArray(from[prop])) {
                        if (overwrite) {
                            to[prop] = from[prop].slice(0);
                        }
                    } else {
                        to[prop] = extend({}, from[prop], overwrite);
                    }
                } else if (overwrite || !hasProp) {
                    to[prop] = from[prop];
                }
            }
            return to;
        },

        fireEvent = function (el, eventName, data) {
            var ev;

            if (document.createEvent) {
                ev = document.createEvent('HTMLEvents');
                ev.initEvent(eventName, true, false);
                ev = extend(ev, data);
                el.dispatchEvent(ev);
            } else if (document.createEventObject) {
                ev = document.createEventObject();
                ev = extend(ev, data);
                el.fireEvent('on' + eventName, ev);
            }
        },

        adjustCalendar = function (calendar) {
            if (calendar.month < 0) {
                calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
                calendar.month += 12;
            }
            if (calendar.month > 11) {
                calendar.year += Math.floor(Math.abs(calendar.month) / 12);
                calendar.month -= 12;
            }
            return calendar;
        },

        /**
         * defaults and localisation
         */
        defaults = {

            // bind the picker to a form field
            field: null,

            // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
            bound: undefined,

            // position of the datepicker, relative to the field (default to bottom & left)
            // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
            position: 'bottom left',

            // automatically fit in the viewport even if it means repositioning from the position option
            reposition: true,

            // the default output format for `.toString()` and `field` value
            format: 'YYYY-MM-DD',

            // the toString function which gets passed a current date object and format
            // and returns a string
            toString: null,

            // used to create date object from current input string
            parse: null,

            // the initial date to view when first opened
            defaultDate: null,

            // make the `defaultDate` the initial selected value
            setDefaultDate: false,

            // first day of week (0: Sunday, 1: Monday etc)
            firstDay: 0,

            // the default flag for moment's strict date parsing
            formatStrict: false,

            // the minimum/earliest date that can be selected
            minDate: null,
            // the maximum/latest date that can be selected
            maxDate: null,

            // number of years either side, or array of upper/lower range
            yearRange: 10,

            // show week numbers at head of row
            showWeekNumber: false,

            // Week picker mode
            pickWholeWeek: false,

            // used internally (don't config outside)
            minYear: 0,
            maxYear: 9999,
            minMonth: undefined,
            maxMonth: undefined,

            startRange: null,
            endRange: null,

            isRTL: false,

            // Additional text to append to the year in the calendar title
            yearSuffix: '',

            // Render the month after year in the calendar title
            showMonthAfterYear: false,

            // Render days of the calendar grid that fall in the next or previous month
            showDaysInNextAndPreviousMonths: false,

            // Allows user to select days that fall in the next or previous month
            enableSelectionDaysInNextAndPreviousMonths: false,

            // how many months are visible
            numberOfMonths: 1,

            // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
            // only used for the first display or when a selected date is not visible
            mainCalendar: 'left',

            // Specify a DOM element to render the calendar in
            container: undefined,

            // Blur field when date is selected
            blurFieldOnSelect: true,

            // internationalization
            i18n: {
                previousMonth: 'Previous Month',
                nextMonth: 'Next Month',
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },

            // Theme Classname
            theme: null,

            // events array
            events: [],

            // callback function
            onSelect: null,
            onOpen: null,
            onClose: null,
            onDraw: null,

            // Enable keyboard input
            keyboardInput: true
        },


        /**
         * templating functions to abstract HTML rendering
         */
        renderDayName = function (opts, day, abbr) {
            day += opts.firstDay;
            while (day >= 7) {
                day -= 7;
            }
            return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
        },

        renderDay = function (opts) {
            var arr = [];
            var ariaSelected = 'false';
            if (opts.isEmpty) {
                if (opts.showDaysInNextAndPreviousMonths) {
                    arr.push('is-outside-current-month');

                    if (!opts.enableSelectionDaysInNextAndPreviousMonths) {
                        arr.push('is-selection-disabled');
                    }

                } else {
                    return '<td class="is-empty"></td>';
                }
            }
            if (opts.isDisabled) {
                arr.push('is-disabled');
            }
            if (opts.isToday) {
                arr.push('is-today');
            }
            if (opts.isSelected) {
                arr.push('is-selected');
                ariaSelected = 'true';
            }
            if (opts.hasEvent) {
                arr.push('has-event');
            }
            if (opts.isInRange) {
                arr.push('is-inrange');
            }
            if (opts.isStartRange) {
                arr.push('is-startrange');
            }
            if (opts.isEndRange) {
                arr.push('is-endrange');
            }
            return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
                '<button class="pika-button pika-day" type="button" ' +
                'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
                opts.day +
                '</button>' +
                '</td>';
        },

        renderWeek = function (d, m, y) {
            // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
            var onejan = new Date(y, 0, 1),
                weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay() + 1) / 7);
            return '<td class="pika-week">' + weekNum + '</td>';
        },

        renderRow = function (days, isRTL, pickWholeWeek, isRowSelected) {
            return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
        },

        renderBody = function (rows) {
            return '<tbody>' + rows.join('') + '</tbody>';
        },

        renderHead = function (opts) {
            var i, arr = [];
            if (opts.showWeekNumber) {
                arr.push('<th></th>');
            }
            for (i = 0; i < 7; i++) {
                arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
            }
            return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
        },

        renderTitle = function (instance, c, year, month, refYear, randId) {
            var i, j, arr,
                opts = instance._o,
                isMinYear = year === opts.minYear,
                isMaxYear = year === opts.maxYear,
                html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
                monthHtml,
                yearHtml,
                prev = true,
                next = true;

            for (arr = [], i = 0; i < 12; i++) {
                arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                    (i === month ? ' selected="selected"' : '') +
                    ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled="disabled"' : '') + '>' +
                    opts.i18n.months[i] + '</option>');
            }

            monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

            if (isArray(opts.yearRange)) {
                i = opts.yearRange[0];
                j = opts.yearRange[1] + 1;
            } else {
                i = year - opts.yearRange;
                j = 1 + year + opts.yearRange;
            }

            for (arr = []; i < j && i <= opts.maxYear; i++) {
                if (i >= opts.minYear) {
                    arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"' : '') + '>' + (i) + '</option>');
                }
            }
            yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

            if (opts.showMonthAfterYear) {
                html += yearHtml + monthHtml;
            } else {
                html += monthHtml + yearHtml;
            }

            if (isMinYear && (month === 0 || opts.minMonth >= month)) {
                prev = false;
            }

            if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
                next = false;
            }

            if (c === 0) {
                html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
            }
            if (c === (instance._o.numberOfMonths - 1)) {
                html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
            }

            return html += '</div>';
        },

        renderTable = function (opts, data, randId) {
            return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
        },


        /**
         * Pikaday constructor
         */
        Pikaday = function (options) {
            var self = this,
                opts = self.config(options);

            self._onMouseDown = function (e) {
                if (!self._v) {
                    return;
                }
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (!target) {
                    return;
                }

                if (!hasClass(target, 'is-disabled')) {
                    if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                        self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                        if (opts.bound) {
                            sto(function () {
                                self.hide();
                                if (opts.blurFieldOnSelect && opts.field) {
                                    opts.field.blur();
                                }
                            }, 100);
                        }
                    }
                    else if (hasClass(target, 'pika-prev')) {
                        self.prevMonth();
                    }
                    else if (hasClass(target, 'pika-next')) {
                        self.nextMonth();
                    }
                }
                if (!hasClass(target, 'pika-select')) {
                    // if this is touch event prevent mouse events emulation
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                        return false;
                    }
                } else {
                    self._c = true;
                }
            };

            self._onChange = function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (!target) {
                    return;
                }
                if (hasClass(target, 'pika-select-month')) {
                    self.gotoMonth(target.value);
                }
                else if (hasClass(target, 'pika-select-year')) {
                    self.gotoYear(target.value);
                }
            };

            self._onKeyChange = function (e) {
                e = e || window.event;

                if (self.isVisible()) {

                    switch (e.keyCode) {
                        case 13:
                        case 27:
                            if (opts.field) {
                                opts.field.blur();
                            }
                            break;
                        case 37:
                            e.preventDefault();
                            self.adjustDate('subtract', 1);
                            break;
                        case 38:
                            self.adjustDate('subtract', 7);
                            break;
                        case 39:
                            self.adjustDate('add', 1);
                            break;
                        case 40:
                            self.adjustDate('add', 7);
                            break;
                    }
                }
            };

            self._onInputChange = function (e) {
                var date;

                if (e.firedBy === self) {
                    return;
                }
                if (opts.parse) {
                    date = opts.parse(opts.field.value, opts.format);
                } else if (hasMoment) {
                    date = moment(opts.field.value, opts.format, opts.formatStrict);
                    date = (date && date.isValid()) ? date.toDate() : null;
                }
                else {
                    date = new Date(Date.parse(opts.field.value));
                }
                if (isDate(date)) {
                    self.setDate(date);
                }
                if (!self._v) {
                    self.show();
                }
            };

            self._onInputFocus = function () {
                self.show();
            };

            self._onInputClick = function () {
                self.show();
            };

            self._onInputBlur = function () {
                // IE allows pika div to gain focus; catch blur the input field
                var pEl = document.activeElement;
                do {
                    if (hasClass(pEl, 'pika-single')) {
                        return;
                    }
                }
                while ((pEl = pEl.parentNode));

                if (!self._c) {
                    self._b = sto(function () {
                        self.hide();
                    }, 50);
                }
                self._c = false;
            };

            self._onClick = function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement,
                    pEl = target;
                if (!target) {
                    return;
                }
                if (!hasEventListeners && hasClass(target, 'pika-select')) {
                    if (!target.onchange) {
                        target.setAttribute('onchange', 'return;');
                        addEvent(target, 'change', self._onChange);
                    }
                }
                do {
                    if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                        return;
                    }
                }
                while ((pEl = pEl.parentNode));
                if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                    self.hide();
                }
            };

            self.el = document.createElement('div');
            self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

            addEvent(self.el, 'mousedown', self._onMouseDown, true);
            addEvent(self.el, 'touchend', self._onMouseDown, true);
            addEvent(self.el, 'change', self._onChange);

            if (opts.keyboardInput) {
                addEvent(document, 'keydown', self._onKeyChange);
            }

            if (opts.field) {
                if (opts.container) {
                    opts.container.appendChild(self.el);
                } else if (opts.bound) {
                    document.body.appendChild(self.el);
                } else {
                    opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
                }
                addEvent(opts.field, 'change', self._onInputChange);

                if (!opts.defaultDate) {
                    if (hasMoment && opts.field.value) {
                        opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                    } else {
                        opts.defaultDate = new Date(Date.parse(opts.field.value));
                    }
                    opts.setDefaultDate = true;
                }
            }

            var defDate = opts.defaultDate;

            if (isDate(defDate)) {
                if (opts.setDefaultDate) {
                    self.setDate(defDate, true);
                } else {
                    self.gotoDate(defDate);
                }
            } else {
                self.gotoDate(new Date());
            }

            if (opts.bound) {
                this.hide();
                self.el.className += ' is-bound';
                addEvent(opts.trigger, 'click', self._onInputClick);
                addEvent(opts.trigger, 'focus', self._onInputFocus);
                addEvent(opts.trigger, 'blur', self._onInputBlur);
            } else {
                this.show();
            }
        };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function (options) {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            opts.disableWeekends = !!opts.disableWeekends;

            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                this.setMaxDate(opts.maxDate);
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function (format) {
            format = format || this._o.format;
            if (!isDate(this._d)) {
                return '';
            }
            if (this._o.toString) {
                return this._o.toString(this._d, format);
            }
            if (hasMoment) {
                return moment(this._d).format(format);
            }
            return this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function () {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function (date, preventOnSelect) {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function () {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function (date, preventOnSelect) {
            if (!date) {
                this._d = null;

                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', {firedBy: this});
                }

                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', {firedBy: this});
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function (date) {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                    visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
                lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustDate: function (sign, days) {

            var day = this.getDate() || new Date();
            var difference = parseInt(days) * 24 * 60 * 60 * 1000;

            var newDay;

            if (sign === 'add') {
                newDay = new Date(day.valueOf() + difference);
            } else if (sign === 'subtract') {
                newDay = new Date(day.valueOf() - difference);
            }

            this.setDate(newDay);
        },

        adjustCalendars: function () {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function () {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function (month) {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function () {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function () {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function (year) {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function (value) {
            if (value instanceof Date) {
                setToStartOfDay(value);
                this._o.minDate = value;
                this._o.minYear = value.getFullYear();
                this._o.minMonth = value.getMonth();
            } else {
                this._o.minDate = defaults.minDate;
                this._o.minYear = defaults.minYear;
                this._o.minMonth = defaults.minMonth;
                this._o.startRange = defaults.startRange;
            }

            this.draw();
        },

        /**
         * change the maxDate
         */
        setMaxDate: function (value) {
            if (value instanceof Date) {
                setToStartOfDay(value);
                this._o.maxDate = value;
                this._o.maxYear = value.getFullYear();
                this._o.maxMonth = value.getMonth();
            } else {
                this._o.maxDate = defaults.maxDate;
                this._o.maxYear = defaults.maxYear;
                this._o.maxMonth = defaults.maxMonth;
                this._o.endRange = defaults.endRange;
            }

            this.draw();
        },

        setStartRange: function (value) {
            this._o.startRange = value;
        },

        setEndRange: function (value) {
            this._o.endRange = value;
        },

        /**
         * refresh the HTML
         */
        draw: function (force) {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '',
                randId;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if (opts.field.type !== 'hidden') {
                    sto(function () {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                this._o.onDraw(this);
            }

            if (opts.bound) {
                // let the screen reader user know to use arrow keys
                opts.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
            }
        },

        adjustPosition: function () {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

            if (this._o.container) return;

            this.el.style.position = 'absolute';

            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top = pEl.offsetTop + pEl.offsetHeight;
                while ((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if ((this._o.reposition && left + width > viewportWidth) ||
                (
                    this._o.position.indexOf('right') > -1 &&
                    left - width + field.offsetWidth > 0
                )
            ) {
                left = left - width + field.offsetWidth;
            }
            if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
                (
                    this._o.position.indexOf('top') > -1 &&
                    top - height - field.offsetHeight > 0
                )
            ) {
                top = top - height - field.offsetHeight;
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
        },

        /**
         * render HTML for a particular month
         */
        render: function (year, month, randId) {
            var opts = this._o,
                now = new Date(),
                days = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data = [],
                row = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var previousMonth = month === 0 ? 11 : month - 1,
                nextMonth = month === 11 ? 0 : month + 1,
                yearOfPreviousMonth = month === 0 ? year - 1 : year,
                yearOfNextMonth = month === 11 ? year + 1 : year,
                daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
            var cells = days + before,
                after = cells;
            while (after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            var isWeekSelected = false;
            for (var i = 0, r = 0; i < cells; i++) {
                var day = new Date(year, month, 1 + (i - before)),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
                    isEmpty = i < before || i >= (days + before),
                    dayNumber = 1 + (i - before),
                    monthNumber = month,
                    yearNumber = year,
                    isStartRange = opts.startRange && compareDates(opts.startRange, day),
                    isEndRange = opts.endRange && compareDates(opts.endRange, day),
                    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                    isDisabled = (opts.minDate && day < opts.minDate) ||
                        (opts.maxDate && day > opts.maxDate) ||
                        (opts.disableWeekends && isWeekend(day)) ||
                        (opts.disableDayFn && opts.disableDayFn(day));

                if (isEmpty) {
                    if (i < before) {
                        dayNumber = daysInPreviousMonth + dayNumber;
                        monthNumber = previousMonth;
                        yearNumber = yearOfPreviousMonth;
                    } else {
                        dayNumber = dayNumber - days;
                        monthNumber = nextMonth;
                        yearNumber = yearOfNextMonth;
                    }
                }

                var dayConfig = {
                    day: dayNumber,
                    month: monthNumber,
                    year: yearNumber,
                    hasEvent: hasEvent,
                    isSelected: isSelected,
                    isToday: isToday,
                    isDisabled: isDisabled,
                    isEmpty: isEmpty,
                    isStartRange: isStartRange,
                    isEndRange: isEndRange,
                    isInRange: isInRange,
                    showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths,
                    enableSelectionDaysInNextAndPreviousMonths: opts.enableSelectionDaysInNextAndPreviousMonths
                };

                if (opts.pickWholeWeek && isSelected) {
                    isWeekSelected = true;
                }

                row.push(renderDay(dayConfig));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL, opts.pickWholeWeek, isWeekSelected));
                    row = [];
                    r = 0;
                    isWeekSelected = false;
                }
            }
            return renderTable(opts, data, randId);
        },

        isVisible: function () {
            return this._v;
        },

        show: function () {
            if (!this.isVisible()) {
                this._v = true;
                this.draw();
                removeClass(this.el, 'is-hidden');
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function () {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function () {
            var opts = this._o;

            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'touchend', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (opts.keyboardInput) {
                removeEvent(document, 'keydown', this._onKeyChange);
            }
            if (opts.field) {
                removeEvent(opts.field, 'change', this._onInputChange);
                if (opts.bound) {
                    removeEvent(opts.trigger, 'click', this._onInputClick);
                    removeEvent(opts.trigger, 'focus', this._onInputFocus);
                    removeEvent(opts.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;
}));

// ==================================================
// fancyBox v3.2.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
!function (t, e, n, o) {
    "use strict";

    function a(t) {
        var e = n(t.currentTarget), o = t.data ? t.data.options : {}, a = e.attr("data-fancybox") || "", i = 0, s = [];
        t.isDefaultPrevented() || (t.preventDefault(), a ? (s = o.selector ? n(o.selector) : t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + a + '"]') : n('[data-fancybox="' + a + '"]'), i = s.index(e), i < 0 && (i = 0)) : s = [e], n.fancybox.open(s, o, i))
    }

    if (n) {
        if (n.fn.fancybox) return void("console" in t && console.log("fancyBox already initialized"));
        var i = {
            loop: !1,
            margin: [44, 0],
            gutter: 50,
            keyboard: !0,
            arrows: !0,
            infobar: !0,
            toolbar: !0,
            buttons: ["slideShow", "fullScreen", "thumbs", "share", "close"],
            idleTime: 3,
            smallBtn: "auto",
            protect: !1,
            modal: !1,
            image: {preload: "auto"},
            ajax: {settings: {data: {fancybox: !0}}},
            iframe: {
                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                preload: !0,
                css: {},
                attr: {scrolling: "auto"}
            },
            defaultType: "image",
            animationEffect: "zoom",
            animationDuration: 500,
            zoomOpacity: "auto",
            transitionEffect: "fade",
            transitionDuration: 366,
            slideClass: "",
            baseClass: "",
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
            spinnerTpl: '<div class="fancybox-loading"></div>',
            errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
            btnTpl: {
                download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" /></svg></a>',
                zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" /></svg></button>',
                close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
                smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
                arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>',
                arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>'
            },
            parentEl: "body",
            autoFocus: !1,
            backFocus: !0,
            trapFocus: !0,
            fullScreen: {autoStart: !1},
            touch: {vertical: !0, momentum: !0},
            hash: null,
            media: {},
            slideShow: {autoStart: !1, speed: 4e3},
            thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y"},
            onInit: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop,
            onActivate: n.noop,
            onDeactivate: n.noop,
            clickContent: function (t, e) {
                return "image" === t.type && "zoom"
            },
            clickSlide: "close",
            clickOutside: "close",
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1,
            mobile: {
                margin: 0, clickContent: function (t, e) {
                    return "image" === t.type && "toggleControls"
                }, clickSlide: function (t, e) {
                    return "image" === t.type ? "toggleControls" : "close"
                }, dblclickContent: function (t, e) {
                    return "image" === t.type && "zoom"
                }, dblclickSlide: function (t, e) {
                    return "image" === t.type && "zoom"
                }
            },
            lang: "en",
            i18n: {
                en: {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                    PLAY_START: "Start slideshow",
                    PLAY_STOP: "Pause slideshow",
                    FULL_SCREEN: "Full screen",
                    THUMBS: "Thumbnails",
                    DOWNLOAD: "Download",
                    SHARE: "Share",
                    ZOOM: "Zoom"
                },
                de: {
                    CLOSE: "Schliessen",
                    NEXT: "Weiter",
                    PREV: "Zurück",
                    ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                    PLAY_START: "Diaschau starten",
                    PLAY_STOP: "Diaschau beenden",
                    FULL_SCREEN: "Vollbild",
                    THUMBS: "Vorschaubilder",
                    DOWNLOAD: "Herunterladen",
                    SHARE: "Teilen",
                    ZOOM: "Maßstab"
                }
            }
        }, s = n(t), r = n(e), c = 0, l = function (t) {
            return t && t.hasOwnProperty && t instanceof n
        }, u = function () {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }(), d = function () {
            var t, n = e.createElement("fakeelement"), a = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (t in a) if (n.style[t] !== o) return a[t];
            return "transitionend"
        }(), f = function (t) {
            return t && t.length && t[0].offsetHeight
        }, p = function (t, o, a) {
            var i = this;
            i.opts = n.extend(!0, {index: a}, n.fancybox.defaults, o || {}), n.fancybox.isMobile && (i.opts = n.extend(!0, {}, i.opts, i.opts.mobile)), o && n.isArray(o.buttons) && (i.opts.buttons = o.buttons), i.id = i.opts.id || ++c, i.group = [], i.currIndex = parseInt(i.opts.index, 10) || 0, i.prevIndex = null, i.prevPos = null, i.currPos = 0, i.firstRun = null, i.createGroup(t), i.group.length && (i.$lastFocus = n(e.activeElement).blur(), i.slides = {}, i.init())
        };
        n.extend(p.prototype, {
            init: function () {
                var a, i, s, c = this, l = c.group[c.currIndex], u = l.opts, d = n.fancybox.scrollbarWidth;
                c.scrollTop = r.scrollTop(), c.scrollLeft = r.scrollLeft(), n.fancybox.getInstance() || (n("body").addClass("fancybox-active"), /iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream ? "image" !== l.type && n("body").css("top", n("body").scrollTop() * -1).addClass("fancybox-iosfix") : !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (d === o && (a = n('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"), d = n.fancybox.scrollbarWidth = a[0].offsetWidth - a[0].clientWidth, a.remove()), n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + d + "px; }</style>"), n("body").addClass("compensate-for-scrollbar"))), s = "", n.each(u.buttons, function (t, e) {
                    s += u.btnTpl[e] || ""
                }), i = n(c.translate(c, u.baseTpl.replace("{{buttons}}", s).replace("{{arrows}}", u.btnTpl.arrowLeft + u.btnTpl.arrowRight))).attr("id", "fancybox-container-" + c.id).addClass("fancybox-is-hidden").addClass(u.baseClass).data("FancyBox", c).appendTo(u.parentEl), c.$refs = {container: i}, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (t) {
                    c.$refs[t] = i.find(".fancybox-" + t)
                }), c.trigger("onInit"), c.activate(), c.jumpTo(c.currIndex)
            }, translate: function (t, e) {
                var n = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
                    var a = n[e];
                    return a === o ? t : a
                })
            }, createGroup: function (t) {
                var e = this, a = n.makeArray(t);
                n.each(a, function (t, a) {
                    var i, s, r, c, l = {}, u = {};
                    n.isPlainObject(a) ? (l = a, u = a.opts || a) : "object" === n.type(a) && n(a).length ? (i = n(a), u = i.data(), u = n.extend({}, u, u.options || {}), u.$orig = i, l.src = u.src || i.attr("href"), l.type || l.src || (l.type = "inline", l.src = a)) : l = {
                        type: "html",
                        src: a + ""
                    }, l.opts = n.extend(!0, {}, e.opts, u), n.isArray(u.buttons) && (l.opts.buttons = u.buttons), s = l.type || l.opts.type, r = l.src || "", !s && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? s = "pdf" : "#" === r.charAt(0) && (s = "inline")), s ? l.type = s : e.trigger("objectNeedsType", l), l.index = e.group.length, l.opts.$orig && !l.opts.$orig.length && delete l.opts.$orig, !l.opts.$thumb && l.opts.$orig && (l.opts.$thumb = l.opts.$orig.find("img:first")), l.opts.$thumb && !l.opts.$thumb.length && delete l.opts.$thumb, "function" === n.type(l.opts.caption) && (l.opts.caption = l.opts.caption.apply(a, [e, l])), "function" === n.type(e.opts.caption) && (l.opts.caption = e.opts.caption.apply(a, [e, l])), l.opts.caption instanceof n || (l.opts.caption = l.opts.caption === o ? "" : l.opts.caption + ""), "ajax" === s && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), "auto" == l.opts.smallBtn && (n.inArray(s, ["html", "inline", "ajax"]) > -1 ? (l.opts.toolbar = !1, l.opts.smallBtn = !0) : l.opts.smallBtn = !1), "pdf" === s && (l.type = "iframe", l.opts.iframe.preload = !1), l.opts.modal && (l.opts = n.extend(!0, l.opts, {
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })), e.group.push(l)
                })
            }, addEvents: function () {
                var o = this;
                o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
                    t.stopPropagation(), t.preventDefault(), o.close(t)
                }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (t) {
                    t.stopPropagation(), t.preventDefault(), o.previous()
                }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (t) {
                    t.stopPropagation(), t.preventDefault(), o.next()
                }).on("click.fb", "[data-fancybox-zoom]", function (t) {
                    o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                }), s.on("orientationchange.fb resize.fb", function (t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? u(function () {
                        o.update()
                    }) : (o.$refs.stage.hide(), setTimeout(function () {
                        o.$refs.stage.show(), o.update()
                    }, 600))
                }), r.on("focusin.fb", function (t) {
                    var a = n.fancybox ? n.fancybox.getInstance() : null;
                    a.isClosing || !a.current || !a.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || a && "fixed" !== n(t.target).css("position") && !a.$refs.container.has(t.target).length && (t.stopPropagation(), a.focus(), s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft))
                }), r.on("keydown.fb", function (t) {
                    var e = o.current, a = t.keyCode || t.which;
                    if (e && e.opts.keyboard && !n(t.target).is("input") && !n(t.target).is("textarea")) return 8 === a || 27 === a ? (t.preventDefault(), void o.close(t)) : 37 === a || 38 === a ? (t.preventDefault(), void o.previous()) : 39 === a || 40 === a ? (t.preventDefault(), void o.next()) : void o.trigger("afterKeydown", t, a)
                }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (t) {
                    o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1
                }), o.idleInterval = t.setInterval(function () {
                    o.idleSecondsCounter++, o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls())
                }, 1e3))
            }, removeEvents: function () {
                var e = this;
                s.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
            }, previous: function (t) {
                return this.jumpTo(this.currPos - 1, t)
            }, next: function (t) {
                return this.jumpTo(this.currPos + 1, t)
            }, jumpTo: function (t, e, a) {
                var i, s, r, c, l, u, d, p = this, h = p.group.length;
                if (!(p.isSliding || p.isClosing || p.isAnimating && p.firstRun)) {
                    if (t = parseInt(t, 10), s = p.current ? p.current.opts.loop : p.opts.loop, !s && (t < 0 || t >= h)) return !1;
                    if (i = p.firstRun = null === p.firstRun, !(h < 2 && !i && p.isSliding)) {
                        if (c = p.current, p.prevIndex = p.currIndex, p.prevPos = p.currPos, r = p.createSlide(t), h > 1 && ((s || r.index > 0) && p.createSlide(t - 1), (s || r.index < h - 1) && p.createSlide(t + 1)), p.current = r, p.currIndex = r.index, p.currPos = r.pos, p.trigger("beforeShow", i), p.updateControls(), u = n.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== u.left || 0 !== u.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = o, n.isNumeric(e) ? r.forcedDuration = e : e = r.opts[i ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), i) return r.opts.animationEffect && e && p.$refs.container.css("transition-duration", e + "ms"), p.$refs.container.removeClass("fancybox-is-hidden"), f(p.$refs.container), p.$refs.container.addClass("fancybox-is-open"), r.$slide.addClass("fancybox-slide--current"), p.loadSlide(r), void p.preload();
                        n.each(p.slides, function (t, e) {
                            n.fancybox.stop(e.$slide)
                        }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (l = Math.round(r.$slide.width()), n.each(p.slides, function (t, o) {
                            var a = o.pos - r.pos;
                            n.fancybox.animate(o.$slide, {top: 0, left: a * l + a * o.opts.gutter}, e, function () {
                                o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === p.currPos && (r.isMoved = !1, p.complete())
                            })
                        })) : p.$refs.stage.children().removeAttr("style"), r.isLoaded ? p.revealContent(r) : p.loadSlide(r), p.preload(), c.pos !== r.pos && (d = "fancybox-slide--" + (c.pos > r.pos ? "next" : "previous"), c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), c.isComplete = !1, e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? c.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + r.opts.transitionEffect, n.fancybox.animate(c.$slide, d, e, function () {
                            c.$slide.removeClass(d).removeAttr("style")
                        }))))
                    }
                }
            }, createSlide: function (t) {
                var e, o, a = this;
                return o = t % a.group.length, o = o < 0 ? a.group.length + o : o, !a.slides[t] && a.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(a.$refs.stage), a.slides[t] = n.extend(!0, {}, a.group[o], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }), a.updateSlide(a.slides[t])), a.slides[t]
            }, scaleToActual: function (t, e, a) {
                var i, s, r, c, l, u = this, d = u.current, f = d.$content, p = parseInt(d.$slide.width(), 10),
                    h = parseInt(d.$slide.height(), 10), g = d.width, b = d.height;
                "image" != d.type || d.hasError || !f || u.isAnimating || (n.fancybox.stop(f), u.isAnimating = !0, t = t === o ? .5 * p : t, e = e === o ? .5 * h : e, i = n.fancybox.getTranslate(f), c = g / i.width, l = b / i.height, s = .5 * p - .5 * g, r = .5 * h - .5 * b, g > p && (s = i.left * c - (t * c - t), s > 0 && (s = 0), s < p - g && (s = p - g)), b > h && (r = i.top * l - (e * l - e), r > 0 && (r = 0), r < h - b && (r = h - b)), u.updateCursor(g, b), n.fancybox.animate(f, {
                    top: r,
                    left: s,
                    scaleX: c,
                    scaleY: l
                }, a || 330, function () {
                    u.isAnimating = !1
                }), u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop())
            }, scaleToFit: function (t) {
                var e, o = this, a = o.current, i = a.$content;
                "image" != a.type || a.hasError || !i || o.isAnimating || (n.fancybox.stop(i), o.isAnimating = !0, e = o.getFitPos(a), o.updateCursor(e.width, e.height), n.fancybox.animate(i, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / i.width(),
                    scaleY: e.height / i.height()
                }, t || 330, function () {
                    o.isAnimating = !1
                }))
            }, getFitPos: function (t) {
                var e, o, a, i, s, r = this, c = t.$content, l = t.width, u = t.height, d = t.opts.margin;
                return !(!c || !c.length || !l && !u) && ("number" === n.type(d) && (d = [d, d]), 2 == d.length && (d = [d[0], d[1], d[0], d[1]]), e = parseInt(r.$refs.stage.width(), 10) - (d[1] + d[3]), o = parseInt(r.$refs.stage.height(), 10) - (d[0] + d[2]), a = Math.min(1, e / l, o / u), i = Math.floor(a * l), s = Math.floor(a * u), {
                    top: Math.floor(.5 * (o - s)) + d[0],
                    left: Math.floor(.5 * (e - i)) + d[3],
                    width: i,
                    height: s
                })
            }, update: function () {
                var t = this;
                n.each(t.slides, function (e, n) {
                    t.updateSlide(n)
                })
            }, updateSlide: function (t) {
                var e = this, o = t.$content;
                o && (t.width || t.height) && (e.isAnimating = !1, n.fancybox.stop(o), n.fancybox.setTranslate(o, e.getFitPos(t)), t.pos === e.currPos && e.updateCursor()), t.$slide.trigger("refresh"), e.trigger("onUpdate", t)
            }, updateCursor: function (t, e) {
                var n, a = this,
                    i = a.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                a.current && !a.isClosing && (a.isZoomable() ? (i.addClass("fancybox-is-zoomable"), n = t !== o && e !== o ? t < a.current.width && e < a.current.height : a.isScaledDown(), n ? i.addClass("fancybox-can-zoomIn") : a.current.opts.touch ? i.addClass("fancybox-can-drag") : i.addClass("fancybox-can-zoomOut")) : a.current.opts.touch && i.addClass("fancybox-can-drag"))
            }, isZoomable: function () {
                var t, e = this, o = e.current;
                if (o && !e.isClosing) return !!("image" === o.type && o.isLoaded && !o.hasError && ("zoom" === o.opts.clickContent || n.isFunction(o.opts.clickContent) && "zoom" === o.opts.clickContent(o)) && (t = e.getFitPos(o), o.width > t.width || o.height > t.height))
            }, isScaledDown: function () {
                var t = this, e = t.current, o = e.$content, a = !1;
                return o && (a = n.fancybox.getTranslate(o), a = a.width < e.width || a.height < e.height), a
            }, canPan: function () {
                var t = this, e = t.current, n = e.$content, o = !1;
                return n && (o = t.getFitPos(e), o = Math.abs(n.width() - o.width) > 1 || Math.abs(n.height() - o.height) > 1), o
            }, loadSlide: function (t) {
                var e, o, a, i = this;
                if (!t.isLoading && !t.isLoaded) {
                    switch (t.isLoading = !0, i.trigger("beforeLoad", t), e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass), e) {
                        case"image":
                            i.setImage(t);
                            break;
                        case"iframe":
                            i.setIframe(t);
                            break;
                        case"html":
                            i.setContent(t, t.src || t.content);
                            break;
                        case"inline":
                            n(t.src).length ? i.setContent(t, n(t.src)) : i.setError(t);
                            break;
                        case"ajax":
                            i.showLoading(t), a = n.ajax(n.extend({}, t.opts.ajax.settings, {
                                url: t.src,
                                success: function (e, n) {
                                    "success" === n && i.setContent(t, e)
                                },
                                error: function (e, n) {
                                    e && "abort" !== n && i.setError(t)
                                }
                            })), o.one("onReset", function () {
                                a.abort()
                            });
                            break;
                        default:
                            i.setError(t)
                    }
                    return !0
                }
            }, setImage: function (e) {
                var o, a, i, s, r = this, c = e.opts.srcset || e.opts.image.srcset;
                if (c) {
                    i = t.devicePixelRatio || 1, s = t.innerWidth * i, a = c.split(",").map(function (t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function (t, n) {
                            var o = parseInt(t.substring(0, t.length - 1), 10);
                            return 0 === n ? e.url = t : void(o && (e.value = o, e.postfix = t[t.length - 1]))
                        }), e
                    }), a.sort(function (t, e) {
                        return t.value - e.value
                    });
                    for (var l = 0; l < a.length; l++) {
                        var u = a[l];
                        if ("w" === u.postfix && u.value >= s || "x" === u.postfix && u.value >= i) {
                            o = u;
                            break
                        }
                    }
                    !o && a.length && (o = a[a.length - 1]), o && (e.src = o.url, e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value, e.width = o.value))
                }
                e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide), e.opts.preload !== !1 && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width, e.height = e.opts.height, e.$ghost = n("<img />").one("error", function () {
                    n(this).remove(), e.$ghost = null, r.setBigImage(e)
                }).one("load", function () {
                    r.afterLoad(e), r.setBigImage(e)
                }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e)
            }, setBigImage: function (t) {
                var e = this, o = n("<img />");
                t.$image = o.one("error", function () {
                    e.setError(t)
                }).one("load", function () {
                    clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = this.naturalWidth, t.height = this.naturalHeight, t.opts.image.srcset && o.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), e.hideLoading(t), t.$ghost ? t.timouts = setTimeout(function () {
                        t.timouts = null, t.$ghost.hide()
                    }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t))
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (o[0].complete || "complete" == o[0].readyState) && o[0].naturalWidth && o[0].naturalHeight ? o.trigger("load") : o[0].error ? o.trigger("error") : t.timouts = setTimeout(function () {
                    o[0].complete || t.hasError || e.showLoading(t)
                }, 100)
            }, setIframe: function (t) {
                var e, a = this, i = t.opts.iframe, s = t.$slide;
                t.$content = n('<div class="fancybox-content' + (i.preload ? " fancybox-is-hidden" : "") + '"></div>').css(i.css).appendTo(s), e = n(i.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(i.attr).appendTo(t.$content), i.preload ? (a.showLoading(t), e.on("load.fb error.fb", function (e) {
                    this.isReady = 1, t.$slide.trigger("refresh"), a.afterLoad(t)
                }), s.on("refresh.fb", function () {
                    var n, a, s, r = t.$content, c = i.css.width, l = i.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            a = e.contents(), s = a.find("body")
                        } catch (t) {
                        }
                        s && s.length && (c === o && (n = e[0].contentWindow.document.documentElement.scrollWidth, c = Math.ceil(s.outerWidth(!0) + (r.width() - n)), c += r.outerWidth() - r.innerWidth()), l === o && (l = Math.ceil(s.outerHeight(!0)), l += r.outerHeight() - r.innerHeight()), c && r.width(c), l && r.height(l)), r.removeClass("fancybox-is-hidden")
                    }
                })) : this.afterLoad(t), e.attr("src", t.src), t.opts.smallBtn === !0 && t.$content.prepend(a.translate(t, t.opts.btnTpl.smallBtn)), s.one("onReset", function () {
                    try {
                        n(this).find("iframe").hide().attr("src", "//about:blank")
                    } catch (t) {
                    }
                    n(this).empty(), t.isLoaded = !1
                })
            }, setContent: function (t, e) {
                var o = this;
                o.isClosing || (o.hideLoading(t), t.$slide.empty(), l(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"), t.$placeholder = n("<div></div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(), 3 === e[0].nodeType && (e = n("<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () {
                    t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1)
                }), t.$content = n(e).appendTo(t.$slide), this.afterLoad(t))
            }, setError: function (t) {
                t.hasError = !0, t.$slide.removeClass("fancybox-slide--" + t.type), this.setContent(t, this.translate(t, t.opts.errorTpl))
            }, showLoading: function (t) {
                var e = this;
                t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide))
            }, hideLoading: function (t) {
                var e = this;
                t = t || e.current, t && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
            }, afterLoad: function (t) {
                var e = this;
                e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div,form").first())), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) {
                    return 2 == t.button && t.preventDefault(), !0
                }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.revealContent(t))
            }, revealContent: function (t) {
                var e, a, i, s, r, c = this, l = t.$slide, u = !1;
                return e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"], i = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"], i = parseInt(t.forcedDuration === o ? i : t.forcedDuration, 10), !t.isMoved && t.pos === c.currPos && i || (e = !1), "zoom" !== e || t.pos === c.currPos && i && "image" === t.type && !t.hasError && (u = c.getThumbPos(t)) || (e = "fade"), "zoom" === e ? (r = c.getFitPos(t), r.scaleX = r.width / u.width, r.scaleY = r.height / u.height, delete r.width, delete r.height, s = t.opts.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - u.width / u.height) > .1), s && (u.opacity = .1, r.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), u), f(t.$content), void n.fancybox.animate(t.$content, r, i, function () {
                    c.complete()
                })) : (c.updateSlide(t), e ? (n.fancybox.stop(l), a = "fancybox-animated fancybox-slide--" + (t.pos >= c.prevPos ? "next" : "previous") + " fancybox-fx-" + e, l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(a), t.$content.removeClass("fancybox-is-hidden"), f(l), void n.fancybox.animate(l, "fancybox-slide--current", i, function (e) {
                    l.removeClass(a).removeAttr("style"), t.pos === c.currPos && c.complete()
                }, !0)) : (f(l), t.$content.removeClass("fancybox-is-hidden"), void(t.pos === c.currPos && c.complete())))
            }, getThumbPos: function (o) {
                var a, i = this, s = !1, r = function (e) {
                    for (var o, a = e[0], i = a.getBoundingClientRect(), s = []; null !== a.parentElement;) "hidden" !== n(a.parentElement).css("overflow") && "auto" !== n(a.parentElement).css("overflow") || s.push(a.parentElement.getBoundingClientRect()), a = a.parentElement;
                    return o = s.every(function (t) {
                        var e = Math.min(i.right, t.right) - Math.max(i.left, t.left),
                            n = Math.min(i.bottom, t.bottom) - Math.max(i.top, t.top);
                        return e > 0 && n > 0
                    }), o && i.bottom > 0 && i.right > 0 && i.left < n(t).width() && i.top < n(t).height()
                }, c = o.opts.$thumb, l = c ? c.offset() : 0;
                return l && c[0].ownerDocument === e && r(c) && (a = i.$refs.stage.offset(), s = {
                    top: l.top - a.top + parseFloat(c.css("border-top-width") || 0),
                    left: l.left - a.left + parseFloat(c.css("border-left-width") || 0),
                    width: c.width(),
                    height: c.height(),
                    scaleX: 1,
                    scaleY: 1
                }), s
            }, complete: function () {
                var t = this, o = t.current, a = {};
                o.isMoved || !o.isLoaded || o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), f(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function (e, o) {
                    o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? a[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
                }), t.slides = a, t.updateCursor(), t.trigger("afterShow"), (n(e.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type && "iframe" !== o.type) && t.focus())
            }, preload: function () {
                var t, e, n = this;
                n.group.length < 2 || (t = n.slides[n.currPos + 1], e = n.slides[n.currPos - 1], t && "image" === t.type && n.loadSlide(t), e && "image" === e.type && n.loadSlide(e))
            }, focus: function () {
                var t, e = this.current;
                this.isClosing || (e && e.isComplete && (t = e.$slide.find("input[autofocus]:enabled:visible:first"), t.length || (t = e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))), t = t && t.length ? t : this.$refs.container, t.focus())
            }, activate: function () {
                var t = this;
                n(".fancybox-container").each(function () {
                    var e = n(this).data("FancyBox");
                    e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
                }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
            }, close: function (t, e) {
                var o, a, i, s, r, c, l = this, p = l.current, h = function () {
                    l.cleanUp(t)
                };
                return !l.isClosing && (l.isClosing = !0, l.trigger("beforeClose", t) === !1 ? (l.isClosing = !1, u(function () {
                    l.update()
                }), !1) : (l.removeEvents(), p.timouts && clearTimeout(p.timouts), i = p.$content, o = p.opts.animationEffect, a = n.isNumeric(e) ? e : o ? p.opts.animationDuration : 0, p.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), p.$slide.siblings().trigger("onReset").remove(), a && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), l.hideLoading(p), l.hideControls(), l.updateCursor(), "zoom" !== o || t !== !0 && i && a && "image" === p.type && !p.hasError && (c = l.getThumbPos(p)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(i), r = n.fancybox.getTranslate(i), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, s = p.opts.zoomOpacity, "auto" == s && (s = Math.abs(p.width / p.height - c.width / c.height) > .1), s && (c.opacity = 0), r.scaleX = r.width / c.width, r.scaleY = r.height / c.height, r.width = c.width, r.height = c.height, n.fancybox.setTranslate(p.$content, r), f(p.$content), n.fancybox.animate(p.$content, c, a, h), !0) : (o && a ? t === !0 ? setTimeout(h, a) : n.fancybox.animate(p.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, a, h) : h(), !0)))
            }, cleanUp: function (t) {
                var o, a, i = this, r = n("body");
                i.current.$slide.trigger("onReset"), i.$refs.container.empty().remove(), i.trigger("afterClose", t), i.$lastFocus && i.current.opts.backFocus && i.$lastFocus.focus(), i.current = null, o = n.fancybox.getInstance(), o ? o.activate() : (s.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft), r.removeClass("fancybox-active compensate-for-scrollbar"), r.hasClass("fancybox-iosfix") && (a = parseInt(e.body.style.top, 10), r.removeClass("fancybox-iosfix").css("top", "").scrollTop(a * -1)), n("#fancybox-style-noscroll").remove())
            }, trigger: function (t, e) {
                var o, a = Array.prototype.slice.call(arguments, 1), i = this, s = e && e.opts ? e : i.current;
                return s ? a.unshift(s) : s = i, a.unshift(i), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, a)), o === !1 ? o : void("afterClose" !== t && i.$refs ? i.$refs.container.trigger(t + ".fb", a) : r.trigger(t + ".fb", a))
            }, updateControls: function (t) {
                var e = this, n = e.current, o = n.index, a = n.opts.caption, i = e.$refs.container,
                    s = e.$refs.caption;
                n.$slide.trigger("refresh"), e.$caption = a && a.length ? s.html(a) : null, e.isHiddenControls || e.isIdle || e.showControls(), i.find("[data-fancybox-count]").html(e.group.length), i.find("[data-fancybox-index]").html(o + 1), i.find("[data-fancybox-prev]").prop("disabled", !n.opts.loop && o <= 0), i.find("[data-fancybox-next]").prop("disabled", !n.opts.loop && o >= e.group.length - 1), "image" === n.type ? i.find("[data-fancybox-download]").attr("href", n.opts.image.src || n.src).show() : i.find("[data-fancybox-download],[data-fancybox-zoom]").hide()
            }, hideControls: function () {
                this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
            }, showControls: function () {
                var t = this, e = t.current ? t.current.opts : t.opts, n = t.$refs.container;
                t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption")
            }, toggleControls: function () {
                this.isHiddenControls ? this.showControls() : this.hideControls()
            }
        }), n.fancybox = {
            version: "3.2.5",
            defaults: i,
            getInstance: function (t) {
                var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                    o = Array.prototype.slice.call(arguments, 1);
                return e instanceof p && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
            },
            open: function (t, e, n) {
                return new p(t, e, n)
            },
            close: function (t) {
                var e = this.getInstance();
                e && (e.close(), t === !0 && this.close())
            },
            destroy: function () {
                this.close(!0), r.off("click.fb-start")
            },
            isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: function () {
                var n = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function (t) {
                var e;
                if (!t || !t.length) return !1;
                if (e = t.eq(0).css("transform"), e && e.indexOf("matrix") !== -1 ? (e = e.split("(")[1], e = e.split(")")[0], e = e.split(",")) : e = [], e.length) e = e.length > 10 ? [e[13], e[12], e[0], e[5]] : [e[5], e[4], e[0], e[3]], e = e.map(parseFloat); else {
                    e = [0, 0, 1, 1];
                    var n = /\.*translate\((.*)px,(.*)px\)/i, o = n.exec(t.eq(0).attr("style"));
                    o && (e[0] = parseFloat(o[2]), e[1] = parseFloat(o[1]))
                }
                return {
                    top: e[0],
                    left: e[1],
                    scaleX: e[2],
                    scaleY: e[3],
                    opacity: parseFloat(t.css("opacity")),
                    width: t.width(),
                    height: t.height()
                }
            },
            setTranslate: function (t, e) {
                var n = "", a = {};
                if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o && e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), n.length && (a.transform = n), e.opacity !== o && (a.opacity = e.opacity), e.width !== o && (a.width = e.width), e.height !== o && (a.height = e.height), t.css(a)
            },
            animate: function (t, e, a, i, s) {
                n.isFunction(a) && (i = a, a = null), n.isPlainObject(e) || t.removeAttr("style"), t.on(d, function (a) {
                    (!a || !a.originalEvent || t.is(a.originalEvent.target) && "z-index" != a.originalEvent.propertyName) && (n.fancybox.stop(t), n.isPlainObject(e) ? e.scaleX !== o && e.scaleY !== o && (t.css("transition-duration", ""), e.width = Math.round(t.width() * e.scaleX), e.height = Math.round(t.height() * e.scaleY), e.scaleX = 1, e.scaleY = 1, n.fancybox.setTranslate(t, e)) : s !== !0 && t.removeClass(e), n.isFunction(i) && i(a))
                }), n.isNumeric(a) && t.css("transition-duration", a + "ms"), n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e), e.scaleX && t.hasClass("fancybox-image-wrap") && t.parent().addClass("fancybox-is-scaling"), t.data("timer", setTimeout(function () {
                    t.trigger("transitionend")
                }, a + 16))
            },
            stop: function (t) {
                clearTimeout(t.data("timer")), t.off("transitionend").css("transition-duration", ""), t.hasClass("fancybox-image-wrap") && t.parent().removeClass("fancybox-is-scaling")
            }
        }, n.fn.fancybox = function (t) {
            var e;
            return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {options: t}, a) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, a), this
        }, r.on("click.fb-start", "[data-fancybox]", a)
    }
}(window, document, window.jQuery || jQuery), function (t) {
    "use strict";
    var e = function (e, n, o) {
        if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function (t, n) {
            e = e.replace("$" + t, n || "")
        }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
    }, n = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1},
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1, api: 1},
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        metacafe: {
            matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
            type: "iframe",
            url: "//www.metacafe.com/embed/$1/?ap=1"
        },
        dailymotion: {
            matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
            params: {additionalInfos: 0, autoStart: 1},
            type: "iframe",
            url: "//www.dailymotion.com/embed/video/$1"
        },
        vine: {matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/, type: "iframe", url: "//vine.co/v/$1/embed/simple"},
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function (t) {
                return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function (t) {
                return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    };
    t(document).on("objectNeedsType.fb", function (o, a, i) {
        var s, r, c, l, u, d, f, p = i.src || "", h = !1;
        s = t.extend(!0, {}, n, i.opts.media), t.each(s, function (n, o) {
            if (c = p.match(o.matcher)) {
                if (h = o.type, d = {}, o.paramPlace && c[o.paramPlace]) {
                    u = c[o.paramPlace], "?" == u[0] && (u = u.substring(1)), u = u.split("&");
                    for (var a = 0; a < u.length; ++a) {
                        var s = u[a].split("=", 2);
                        2 == s.length && (d[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                    }
                }
                return l = t.extend(!0, {}, o.params, i.opts[n], d), p = "function" === t.type(o.url) ? o.url.call(this, c, l, i) : e(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, i) : e(o.thumb, c), "vimeo" === n && (p = p.replace("&%23", "#")), !1
            }
        }), h ? (i.src = p, i.type = h, i.opts.thumb || i.opts.$thumb && i.opts.$thumb.length || (i.opts.thumb = r), "iframe" === h && (t.extend(!0, i.opts, {
            iframe: {
                preload: !1,
                attr: {scrolling: "no"}
            }
        }), i.contentProvider = f, i.opts.slideClass += " fancybox-slide--" + ("gmap_place" == f || "gmap_search" == f ? "map" : "video"))) : p && (i.type = i.opts.defaultType)
    })
}(window.jQuery || jQuery), function (t, e, n) {
    "use strict";
    var o = function () {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
            return t.setTimeout(e, 1e3 / 60)
        }
    }(), a = function () {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) {
            t.clearTimeout(e)
        }
    }(), i = function (e) {
        var n = [];
        e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
        for (var o in e) e[o].pageX ? n.push({x: e[o].pageX, y: e[o].pageY}) : e[o].clientX && n.push({
            x: e[o].clientX,
            y: e[o].clientY
        });
        return n
    }, s = function (t, e, n) {
        return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
    }, r = function (t) {
        if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
        for (var e = 0, o = t[0].attributes, a = o.length; e < a; e++) if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
        return !1
    }, c = function (e) {
        var n = t.getComputedStyle(e)["overflow-y"], o = t.getComputedStyle(e)["overflow-x"],
            a = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
            i = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return a || i
    }, l = function (t) {
        for (var e = !1; ;) {
            if (e = c(t.get(0))) break;
            if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
        }
        return e
    }, u = function (t) {
        var e = this;
        e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
    };
    u.prototype.destroy = function () {
        this.$container.off(".fb.touch")
    }, u.prototype.ontouchstart = function (o) {
        var a = this, c = n(o.target), u = a.instance, d = u.current, f = d.$content, p = "touchstart" == o.type;
        if (p && a.$container.off("mousedown.fb.touch"), !d || a.instance.isAnimating || a.instance.isClosing) return o.stopPropagation(), void o.preventDefault();
        if ((!o.originalEvent || 2 != o.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left) && (a.startPoints = i(o), a.startPoints && !(a.startPoints.length > 1 && u.isSliding))) {
            if (a.$target = c, a.$content = f, a.canTap = !0, a.opts = d.opts.touch, n(e).off(".fb.touch"), n(e).on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(a, "ontouchend")), n(e).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(a, "ontouchmove")), !a.opts && !u.canPan() || !c.is(a.$stage) && !a.$stage.find(c).length) return void(c.is("img") && o.preventDefault());
            o.stopPropagation(), n.fancybox.isMobile && (l(a.$target) || l(a.$target.parent())) || o.preventDefault(), a.canvasWidth = Math.round(d.$slide[0].clientWidth), a.canvasHeight = Math.round(d.$slide[0].clientHeight), a.startTime = (new Date).getTime(), a.distanceX = a.distanceY = a.distance = 0, a.isPanning = !1, a.isSwiping = !1, a.isZooming = !1, a.sliderStartPos = a.sliderLastPos || {
                top: 0,
                left: 0
            }, a.contentStartPos = n.fancybox.getTranslate(a.$content), a.contentLastPos = null, 1 !== a.startPoints.length || a.isZooming || (a.canTap = !u.isSliding, "image" === d.type && (a.contentStartPos.width > a.canvasWidth + 1 || a.contentStartPos.height > a.canvasHeight + 1) ? (n.fancybox.stop(a.$content), a.$content.css("transition-duration", "0ms"), a.isPanning = !0) : a.isSwiping = !0, a.$container.addClass("fancybox-controls--isGrabbing")), 2 !== a.startPoints.length || u.isAnimating || d.hasError || "image" !== d.type || !d.isLoaded && !d.$ghost || (a.isZooming = !0, a.isSwiping = !1, a.isPanning = !1, n.fancybox.stop(a.$content), a.$content.css("transition-duration", "0ms"), a.centerPointStartX = .5 * (a.startPoints[0].x + a.startPoints[1].x) - n(t).scrollLeft(), a.centerPointStartY = .5 * (a.startPoints[0].y + a.startPoints[1].y) - n(t).scrollTop(), a.percentageOfImageAtPinchPointX = (a.centerPointStartX - a.contentStartPos.left) / a.contentStartPos.width, a.percentageOfImageAtPinchPointY = (a.centerPointStartY - a.contentStartPos.top) / a.contentStartPos.height, a.startDistanceBetweenFingers = s(a.startPoints[0], a.startPoints[1]))
        }
    }, u.prototype.ontouchmove = function (t) {
        var e = this;
        if (e.newPoints = i(t), n.fancybox.isMobile && (l(e.$target) || l(e.$target.parent()))) return t.stopPropagation(), void(e.canTap = !1);
        if ((e.opts || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0)) {
            if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length) return;
            t.stopPropagation(), t.preventDefault(), e.isSwiping ? e.onSwipe() : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()
        }
    }, u.prototype.onSwipe = function () {
        var e, i = this, s = i.isSwiping, r = i.sliderStartPos.left || 0;
        s === !0 ? Math.abs(i.distance) > 10 && (i.canTap = !1, i.instance.group.length < 2 && i.opts.vertical ? i.isSwiping = "y" : i.instance.isSliding || i.opts.vertical === !1 || "auto" === i.opts.vertical && n(t).width() > 800 ? i.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(i.distanceY, i.distanceX) / Math.PI), i.isSwiping = e > 45 && e < 135 ? "y" : "x"), i.instance.isSliding = i.isSwiping, i.startPoints = i.newPoints, n.each(i.instance.slides, function (t, e) {
            n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", "0ms"), e.inTransition = !1, e.pos === i.instance.current.pos && (i.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left)
        }), i.instance.SlideShow && i.instance.SlideShow.isActive && i.instance.SlideShow.stop()) : ("x" == s && (i.distanceX > 0 && (i.instance.group.length < 2 || 0 === i.instance.current.index && !i.instance.current.opts.loop) ? r += Math.pow(i.distanceX, .8) : i.distanceX < 0 && (i.instance.group.length < 2 || i.instance.current.index === i.instance.group.length - 1 && !i.instance.current.opts.loop) ? r -= Math.pow(-i.distanceX, .8) : r += i.distanceX), i.sliderLastPos = {
            top: "x" == s ? 0 : i.sliderStartPos.top + i.distanceY,
            left: r
        }, i.requestId && (a(i.requestId), i.requestId = null), i.requestId = o(function () {
            i.sliderLastPos && (n.each(i.instance.slides, function (t, e) {
                var o = e.pos - i.instance.currPos;
                n.fancybox.setTranslate(e.$slide, {
                    top: i.sliderLastPos.top,
                    left: i.sliderLastPos.left + o * i.canvasWidth + o * e.opts.gutter
                })
            }), i.$container.addClass("fancybox-is-sliding"))
        }))
    }, u.prototype.onPan = function () {
        var t, e, i, s = this;
        s.canTap = !1, t = s.contentStartPos.width > s.canvasWidth ? s.contentStartPos.left + s.distanceX : s.contentStartPos.left, e = s.contentStartPos.top + s.distanceY, i = s.limitMovement(t, e, s.contentStartPos.width, s.contentStartPos.height), i.scaleX = s.contentStartPos.scaleX, i.scaleY = s.contentStartPos.scaleY, s.contentLastPos = i, s.requestId && (a(s.requestId), s.requestId = null), s.requestId = o(function () {
            n.fancybox.setTranslate(s.$content, s.contentLastPos)
        })
    }, u.prototype.limitMovement = function (t, e, n, o) {
        var a, i, s, r, c = this, l = c.canvasWidth, u = c.canvasHeight, d = c.contentStartPos.left,
            f = c.contentStartPos.top, p = c.distanceX, h = c.distanceY;
        return a = Math.max(0, .5 * l - .5 * n), i = Math.max(0, .5 * u - .5 * o), s = Math.min(l - n, .5 * l - .5 * n), r = Math.min(u - o, .5 * u - .5 * o), n > l && (p > 0 && t > a && (t = a - 1 + Math.pow(-a + d + p, .8) || 0), p < 0 && t < s && (t = s + 1 - Math.pow(s - d - p, .8) || 0)), o > u && (h > 0 && e > i && (e = i - 1 + Math.pow(-i + f + h, .8) || 0), h < 0 && e < r && (e = r + 1 - Math.pow(r - f - h, .8) || 0)), {
            top: e,
            left: t
        }
    }, u.prototype.limitPosition = function (t, e, n, o) {
        var a = this, i = a.canvasWidth, s = a.canvasHeight;
        return n > i ? (t = t > 0 ? 0 : t, t = t < i - n ? i - n : t) : t = Math.max(0, i / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
            top: e,
            left: t
        }
    }, u.prototype.onZoom = function () {
        var e = this, i = e.contentStartPos.width, r = e.contentStartPos.height, c = e.contentStartPos.left,
            l = e.contentStartPos.top, u = s(e.newPoints[0], e.newPoints[1]), d = u / e.startDistanceBetweenFingers,
            f = Math.floor(i * d), p = Math.floor(r * d), h = (i - f) * e.percentageOfImageAtPinchPointX,
            g = (r - p) * e.percentageOfImageAtPinchPointY,
            b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
            m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(), y = b - e.centerPointStartX,
            v = m - e.centerPointStartY, x = c + (h + y), w = l + (g + v),
            $ = {top: w, left: x, scaleX: e.contentStartPos.scaleX * d, scaleY: e.contentStartPos.scaleY * d};
        e.canTap = !1, e.newWidth = f, e.newHeight = p, e.contentLastPos = $, e.requestId && (a(e.requestId), e.requestId = null), e.requestId = o(function () {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }, u.prototype.ontouchend = function (t) {
        var o = this, s = Math.max((new Date).getTime() - o.startTime, 1), r = o.isSwiping, c = o.isPanning,
            l = o.isZooming;
        return o.endPoints = i(t), o.$container.removeClass("fancybox-controls--isGrabbing"), n(e).off(".fb.touch"), o.requestId && (a(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.canTap ? o.onTap(t) : (o.speed = 366, o.velocityX = o.distanceX / s * .5, o.velocityY = o.distanceY / s * .5, o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o.speed)), void(c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r)))
    }, u.prototype.endSwiping = function (t) {
        var e = this, o = !1;
        e.instance.isSliding = !1, e.sliderLastPos = null, "y" == t && Math.abs(e.distanceY) > 50 ? (n.fancybox.animate(e.instance.current.$slide, {
            top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
            opacity: 0
        }, 150), o = e.instance.close(!0, 300)) : "x" == t && e.distanceX > 50 && e.instance.group.length > 1 ? o = e.instance.previous(e.speedX) : "x" == t && e.distanceX < -50 && e.instance.group.length > 1 && (o = e.instance.next(e.speedX)), o !== !1 || "x" != t && "y" != t || e.instance.jumpTo(e.instance.current.index, 150), e.$container.removeClass("fancybox-is-sliding")
    }, u.prototype.endPanning = function () {
        var t, e, o, a = this;
        a.contentLastPos && (a.opts.momentum === !1 ? (t = a.contentLastPos.left, e = a.contentLastPos.top) : (t = a.contentLastPos.left + a.velocityX * a.speed, e = a.contentLastPos.top + a.velocityY * a.speed), o = a.limitPosition(t, e, a.contentStartPos.width, a.contentStartPos.height), o.width = a.contentStartPos.width, o.height = a.contentStartPos.height, n.fancybox.animate(a.$content, o, 330))
    }, u.prototype.endZooming = function () {
        var t, e, o, a, i = this, s = i.instance.current, r = i.newWidth, c = i.newHeight;
        i.contentLastPos && (t = i.contentLastPos.left, e = i.contentLastPos.top, a = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        }, n.fancybox.setTranslate(i.$content, a), r < i.canvasWidth && c < i.canvasHeight ? i.instance.scaleToFit(150) : r > s.width || c > s.height ? i.instance.scaleToActual(i.centerPointStartX, i.centerPointStartY, 150) : (o = i.limitPosition(t, e, r, c), n.fancybox.setTranslate(i.content, n.fancybox.getTranslate(i.$content)), n.fancybox.animate(i.$content, o, 150)))
    }, u.prototype.onTap = function (t) {
        var e, o = this, a = n(t.target), s = o.instance, r = s.current, c = t && i(t) || o.startPoints,
            l = c[0] ? c[0].x - o.$stage.offset().left : 0, u = c[0] ? c[0].y - o.$stage.offset().top : 0,
            d = function (e) {
                var a = r.opts[e];
                if (n.isFunction(a) && (a = a.apply(s, [r, t])), a) switch (a) {
                    case"close":
                        s.close(o.startEvent);
                        break;
                    case"toggleControls":
                        s.toggleControls(!0);
                        break;
                    case"next":
                        s.next();
                        break;
                    case"nextOrClose":
                        s.group.length > 1 ? s.next() : s.close(o.startEvent);
                        break;
                    case"zoom":
                        "image" == r.type && (r.isLoaded || r.$ghost) && (s.canPan() ? s.scaleToFit() : s.isScaledDown() ? s.scaleToActual(l, u) : s.group.length < 2 && s.close(o.startEvent))
                }
            };
        if (!(t.originalEvent && 2 == t.originalEvent.button || s.isSliding || l > a[0].clientWidth + a.offset().left)) {
            if (a.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside"; else if (a.is(".fancybox-slide")) e = "Slide"; else {
                if (!s.current.$content || !s.current.$content.has(t.target).length) return;
                e = "Content"
            }
            if (o.tapped) {
                if (clearTimeout(o.tapped), o.tapped = null, Math.abs(l - o.tapX) > 50 || Math.abs(u - o.tapY) > 50 || s.isSliding) return this;
                d("dblclick" + e)
            } else o.tapX = l, o.tapY = u, r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? o.tapped = setTimeout(function () {
                o.tapped = null, d("click" + e)
            }, 300) : d("click" + e);
            return this
        }
    }, n(e).on("onActivate.fb", function (t, e) {
        e && !e.Guestures && (e.Guestures = new u(e))
    }), n(e).on("beforeClose.fb", function (t, e) {
        e && e.Guestures && e.Guestures.destroy()
    })
}(window, document, window.jQuery || jQuery), function (t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'},
        slideShow: {autoStart: !1, speed: 3e3}
    });
    var n = function (t) {
        this.instance = t, this.init()
    };
    e.extend(n.prototype, {
        timer: null, isActive: !1, $button: null, init: function () {
            var t = this;
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
                t.toggle()
            }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
        }, set: function (t) {
            var e = this;
            e.instance && e.instance.current && (t === !0 || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout(function () {
                e.isActive && e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group.length)
            }, e.instance.current.opts.slideShow.speed) : (e.stop(), e.instance.idleSecondsCounter = 0, e.instance.showControls())
        }, clear: function () {
            var t = this;
            clearTimeout(t.timer), t.timer = null
        }, start: function () {
            var t = this, e = t.instance.current;
            e && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.set(!0))
        }, stop: function () {
            var t = this, e = t.instance.current;
            t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1
        }, toggle: function () {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }), e(t).on({
        "onInit.fb": function (t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        }, "beforeShow.fb": function (t, e, n, o) {
            var a = e && e.SlideShow;
            o ? a && n.opts.slideShow.autoStart && a.start() : a && a.isActive && a.clear()
        }, "afterShow.fb": function (t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set()
        }, "afterKeydown.fb": function (n, o, a, i, s) {
            var r = o && o.SlideShow;
            !r || !a.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (i.preventDefault(), r.toggle())
        }, "beforeClose.fb onDeactivate.fb": function (t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }), e(t).on("visibilitychange", function () {
        var n = e.fancybox.getInstance(), o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set())
    })
}(document, window.jQuery || jQuery), function (t, e) {
    "use strict";
    var n = function () {
        var e, n, o,
            a = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]],
            i = {};
        for (n = 0; n < a.length; n++) if (e = a[n], e && e[1] in t) {
            for (o = 0; o < e.length; o++) i[a[0][o]] = e[o];
            return i
        }
        return !1
    }();
    if (!n) return void(e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1));
    var o = {
        request: function (e) {
            e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
        }, exit: function () {
            t[n.exitFullscreen]()
        }, toggle: function (e) {
            e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
        }, isFullscreen: function () {
            return Boolean(t[n.fullscreenElement])
        }, enabled: function () {
            return Boolean(t[n.fullscreenEnabled])
        }
    };
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>'},
        fullScreen: {autoStart: !1}
    }), e(t).on({
        "onInit.fb": function (t, e) {
            var n;
            e && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
                t.stopPropagation(), t.preventDefault(), o.toggle(n[0])
            }), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(n[0]), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
        }, "afterKeydown.fb": function (t, e, n, o, a) {
            e && e.FullScreen && 70 === a && (o.preventDefault(), e.FullScreen.toggle(e.$refs.container[0]))
        }, "beforeClose.fb": function (t) {
            t && t.FullScreen && o.exit()
        }
    }), e(t).on(n.fullscreenchange, function () {
        var t = o.isFullscreen(), n = e.fancybox.getInstance();
        n && (n.current && "image" === n.current.type && n.isAnimating && (n.current.$content.css("transition", "none"), n.isAnimating = !1, n.update(!0, !0, 0)), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t))
    })
}(document, window.jQuery || jQuery), function (t, e) {
    "use strict";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'},
        thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y"}
    }, e.fancybox.defaults);
    var n = function (t) {
        this.init(t)
    };
    e.extend(n.prototype, {
        $button: null, $grid: null, $list: null, isVisible: !1, isActive: !1, init: function (t) {
            var e = this;
            e.instance = t, t.Thumbs = e;
            var n = t.group[0], o = t.group[1];
            e.opts = t.group[t.currIndex].opts.thumbs, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"), e.opts && n && o && ("image" == n.type || n.opts.thumb || n.opts.$thumb) && ("image" == o.type || o.opts.thumb || o.opts.$thumb) ? (e.$button.show().on("click", function () {
                e.toggle()
            }), e.isActive = !0) : e.$button.hide()
        }, create: function () {
            var t, n, o = this, a = o.instance, i = o.opts.parentEl;
            o.$grid = e('<div class="fancybox-thumbs fancybox-thumbs-' + o.opts.axis + '"></div>').appendTo(a.$refs.container.find(i).addBack().filter(i)), t = "<ul>", e.each(a.group, function (e, o) {
                n = o.opts.thumb || (o.opts.$thumb ? o.opts.$thumb.attr("src") : null), n || "image" !== o.type || (n = o.src), n && n.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + n + '" /></li>')
            }), t += "</ul>", o.$list = e(t).appendTo(o.$grid).on("click", "li", function () {
                a.jumpTo(e(this).data("index"))
            }), o.$list.find("img").hide().one("load", function () {
                var t, n, o, a, i = e(this).parent().removeClass("fancybox-thumbs-loading"), s = i.outerWidth(),
                    r = i.outerHeight();
                t = this.naturalWidth || this.width, n = this.naturalHeight || this.height, o = t / s, a = n / r, o >= 1 && a >= 1 && (o > a ? (t /= a, n = r) : (t = s, n /= o)), e(this).css({
                    width: Math.floor(t),
                    height: Math.floor(n),
                    "margin-top": n > r ? Math.floor(.3 * r - .3 * n) : Math.floor(.5 * r - .5 * n),
                    "margin-left": Math.floor(.5 * s - .5 * t)
                }).show()
            }).each(function () {
                this.src = e(this).data("src")
            }), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right")) + a.group.length * o.$list.children().eq(0).outerWidth(!0) + "px")
        }, focus: function (t) {
            var e, n, o = this, a = o.$list;
            o.instance.current && (e = a.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"), n = e.position(), "y" === o.opts.axis && (n.top < 0 || n.top > a.height() - e.outerHeight()) ? a.stop().animate({scrollTop: a.scrollTop() + n.top}, t) : "x" === o.opts.axis && (n.left < a.parent().scrollLeft() || n.left > a.parent().scrollLeft() + (a.parent().width() - e.outerWidth())) && a.parent().stop().animate({scrollLeft: n.left}, t))
        }, update: function () {
            this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus(0)) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update()
        }, hide: function () {
            this.isVisible = !1, this.update()
        }, show: function () {
            this.isVisible = !0, this.update()
        }, toggle: function () {
            this.isVisible = !this.isVisible, this.update()
        }
    }), e(t).on({
        "onInit.fb": function (t, e) {
            var o;
            e && !e.Thumbs && (o = new n(e), o.isActive && o.opts.autoStart === !0 && o.show())
        }, "beforeShow.fb": function (t, e, n, o) {
            var a = e && e.Thumbs;
            a && a.isVisible && a.focus(o ? 0 : 250)
        }, "afterKeydown.fb": function (t, e, n, o, a) {
            var i = e && e.Thumbs;
            i && i.isActive && 71 === a && (o.preventDefault(), i.toggle())
        }, "beforeClose.fb": function (t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && n.opts.hideOnClose !== !1 && n.$grid.hide()
        }
    })
}(document, window.jQuery), function (t, e) {
    "use strict";

    function n(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(t).replace(/[&<>"'`=\/]/g, function (t) {
            return e[t]
        })
    }

    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'},
        share: {tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg><span>Facebook</span></a><a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg><span>Pinterest</span></a><a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg><span>Twitter</span></a></p><p><input type="text" value="{{src_raw}}" onfocus="this.select()" /></p></div>'}
    }), e(t).on("click", "[data-fancybox-share]", function () {
        var t, o, a = e.fancybox.getInstance();
        a && (t = a.current.opts.hash === !1 ? a.current.src : window.location, o = a.current.opts.share.tpl.replace(/\{\{src\}\}/g, encodeURIComponent(t)).replace(/\{\{src_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, a.$caption ? encodeURIComponent(a.$caption.text()) : ""), e.fancybox.open({
            src: a.translate(a, o),
            type: "html",
            opts: {animationEffect: "fade", animationDuration: 250}
        }))
    })
}(document, window.jQuery || jQuery), function (t, e, n) {
    "use strict";

    function o() {
        var t = e.location.hash.substr(1), n = t.split("-"),
            o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1, a = n.join("-");
        return o < 1 && (o = 1), {hash: t, index: o, gallery: a}
    }

    function a(t) {
        var e;
        "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1), e.length || (e = n("#" + n.escapeSelector(t.gallery))), e.length && (s = !1, e.trigger("click")))
    }

    function i(t) {
        var e;
        return !!t && (e = t.current ? t.current.opts : t.opts, e.hash || (e.$orig ? e.$orig.data("fancybox") : ""))
    }

    n.escapeSelector || (n.escapeSelector = function (t) {
        var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, n = function (t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        };
        return (t + "").replace(e, n)
    });
    var s = !0, r = null, c = null;
    n(function () {
        n.fancybox.defaults.hash !== !1 && (n(t).on({
            "onInit.fb": function (t, e) {
                var n, a;
                e.group[e.currIndex].opts.hash !== !1 && (n = o(), a = i(e), a && n.gallery && a == n.gallery && (e.currIndex = n.index - 1))
            }, "beforeShow.fb": function (n, o, a) {
                var l;
                a && a.opts.hash !== !1 && (l = i(o), l && "" !== l && (e.location.hash.indexOf(l) < 0 && (o.opts.origHash = e.location.hash), r = l + (o.group.length > 1 ? "-" + (a.index + 1) : ""), "replaceState" in e.history ? (c && clearTimeout(c), c = setTimeout(function () {
                    e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + r), c = null, s = !1
                }, 300)) : e.location.hash = r))
            }, "beforeClose.fb": function (o, a, s) {
                var l, u;
                c && clearTimeout(c), s.opts.hash !== !1 && (l = i(a), u = a && a.opts.origHash ? a.opts.origHash : "", l && "" !== l && ("replaceState" in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + u) : (e.location.hash = u, n(e).scrollTop(a.scrollTop).scrollLeft(a.scrollLeft))), r = null)
            }
        }), n(e).on("hashchange.fb", function () {
            var t = o();
            n.fancybox.getInstance() ? !r || r === t.gallery + "-" + t.index || 1 === t.index && r == t.gallery || (r = null, n.fancybox.close()) : "" !== t.gallery && a(t)
        }), setTimeout(function () {
            a(o())
        }, 50))
    })
}(document, window, window.jQuery || jQuery);


/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
        var d = function (a) {
            var b, c = [], d = a.length;
            for (b = 0; b !== d; c.push(a[b++])) ;
            return c
        }, e = function (a, b, c) {
            var d, e, f = a.cycle;
            for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
            delete a.cycle
        }, f = function (a, b, d) {
            c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._repeat && this._uncache(!0), this.render = f.prototype.render
        }, g = 1e-10, h = c._internals, i = h.isSelector, j = h.isArray, k = f.prototype = c.to({}, .1, {}), l = [];
        f.version = "1.20.4", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), c.prototype.invalidate.call(this)
        }, k.updateTo = function (a, b) {
            var d, e = this.ratio, f = this.vars.immediateRender || a.immediateRender;
            b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (d in a) this.vars[d] = a[d];
            if (this._initted || f) if (b) this._initted = !1, f && this.render(0, !0, !0); else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                var g = this._totalTime;
                this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
            } else if (this._initted = !1, this._init(), this._time > 0 || f) for (var h, i = 1 / (1 - e), j = this._firstPT; j;) h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next;
            return this
        }, k.render = function (a, b, d) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var e, f, i, j, k, l, m, n, o, p = this._dirty ? this.totalDuration() : this._totalDuration, q = this._time,
                r = this._totalTime, s = this._cycle, t = this._duration, u = this._rawPrevTime;
            if (a >= p - 1e-7 && a >= 0 ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = t, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (e = !0, f = "onComplete", d = d || this._timeline.autoRemoveChildren), 0 === t && (this._initted || !this.vars.lazy || d) && (this._startTime === this._timeline._duration && (a = 0), (0 > u || 0 >= a && a >= -1e-7 || u === g && "isPause" !== this.data) && u !== a && (d = !0, u > g && (f = "onReverseComplete")), this._rawPrevTime = n = !b || a || u === a ? a : g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== r || 0 === t && u > 0) && (f = "onReverseComplete", e = this._reversed), 0 > a && (this._active = !1, 0 === t && (this._initted || !this.vars.lazy || d) && (u >= 0 && (d = !0), this._rawPrevTime = n = !b || a || u === a ? a : g)), this._initted || (d = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (j = t + this._repeatDelay, this._cycle = this._totalTime / j >> 0, 0 !== this._cycle && this._cycle === this._totalTime / j && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * j, this._yoyo && 0 !== (1 & this._cycle) && (this._time = t - this._time, o = this._yoyoEase || this.vars.yoyoEase, o && (this._yoyoEase || (o !== !0 || this._initted ? this._yoyoEase = o = o === !0 ? this._ease : o instanceof Ease ? o : Ease.map[o] : (o = this.vars.ease, this._yoyoEase = o = o ? o instanceof Ease ? o : "function" == typeof o ? new Ease(o, this.vars.easeParams) : Ease.map[o] || c.defaultEase : c.defaultEase)), this.ratio = o ? 1 - o.getRatio((t - this._time) / t) : 0)), this._time > t ? this._time = t : this._time < 0 && (this._time = 0)), this._easeType && !o ? (k = this._time / t, l = this._easeType, m = this._easePower, (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : this._time / t < .5 ? this.ratio = k / 2 : this.ratio = 1 - k / 2) : o || (this.ratio = this._ease.getRatio(this._time / t))), q === this._time && !d && s === this._cycle) return void(r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
            if (!this._initted) {
                if (this._init(), !this._initted || this._gc) return;
                if (!d && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = q, this._totalTime = r, this._rawPrevTime = u, this._cycle = s, h.lazyTweens.push(this), void(this._lazy = [a, b]);
                !this._time || e || o ? e && this._ease._calcEnd && !o && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / t)
            }
            for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== q && a >= 0 && (this._active = !0), 0 === r && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, !0, d) : f || (f = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === t) && (b || this._callback("onStart"))), i = this._firstPT; i;) i.f ? i.t[i.p](i.c * this.ratio + i.s) : i.t[i.p] = i.c * this.ratio + i.s, i = i._next;
            this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, !0, d), b || (this._totalTime !== r || f) && this._callback("onUpdate")), this._cycle !== s && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), f && (!this._gc || d) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, !0, d), e && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[f] && this._callback(f), 0 === t && this._rawPrevTime === g && n !== g && (this._rawPrevTime = 0))
        }, f.to = function (a, b, c) {
            return new f(a, b, c)
        }, f.from = function (a, b, c) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c)
        }, f.fromTo = function (a, b, c, d) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d)
        }, f.staggerTo = f.allTo = function (a, b, g, h, k, m, n) {
            h = h || 0;
            var o, p, q, r, s = 0, t = [], u = function () {
                g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l)
            }, v = g.cycle, w = g.startAt && g.startAt.cycle;
            for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >= q; q++) {
                p = {};
                for (r in g) p[r] = g[r];
                if (v && (e(p, a, q), null != p.duration && (b = p.duration, delete p.duration)), w) {
                    w = p.startAt = {};
                    for (r in g.startAt) w[r] = g.startAt[r];
                    e(p.startAt, a, q)
                }
                p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q], b, p), s += h
            }
            return t
        }, f.staggerFrom = f.allFrom = function (a, b, c, d, e, g, h) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h)
        }, f.staggerFromTo = f.allFromTo = function (a, b, c, d, e, g, h, i) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i)
        }, f.delayedCall = function (a, b, c, d, e) {
            return new f(b, 0, {
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                callbackScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                immediateRender: !1,
                useFrames: e,
                overwrite: 0
            })
        }, f.set = function (a, b) {
            return new f(a, 0, b)
        }, f.isTweening = function (a) {
            return c.getTweensOf(a, !0).length > 0
        };
        var m = function (a, b) {
            for (var d = [], e = 0, f = a._first; f;) f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next;
            return d
        }, n = f.getAllTweens = function (b) {
            return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b))
        };
        f.killAll = function (a, c, d, e) {
            null == c && (c = !0), null == d && (d = !0);
            var f, g, h, i = n(0 != e), j = i.length, k = c && d && e;
            for (h = 0; j > h; h++) g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
        }, f.killChildTweensOf = function (a, b) {
            if (null != a) {
                var e, g, k, l, m, n = h.tweenLookup;
                if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a)) for (l = a.length; --l > -1;) f.killChildTweensOf(a[l], b); else {
                    e = [];
                    for (k in n) for (g = n[k].target.parentNode; g;) g === a && (e = e.concat(n[k].tweens)), g = g.parentNode;
                    for (m = e.length, l = 0; m > l; l++) b && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1)
                }
            }
        };
        var o = function (a, c, d, e) {
            c = c !== !1, d = d !== !1, e = e !== !1;
            for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;) g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
        };
        return f.pauseAll = function (a, b, c) {
            o(!0, a, b, c)
        }, f.resumeAll = function (a, b, c) {
            o(!1, a, b, c)
        }, f.globalTimeScale = function (b) {
            var d = a._rootTimeline, e = c.ticker.time;
            return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
        }, k.progress = function (a, b) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
        }, k.totalProgress = function (a, b) {
            return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
        }, k.time = function (a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
        }, k.duration = function (b) {
            return arguments.length ? a.prototype.duration.call(this, b) : this._duration
        }, k.totalDuration = function (a) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, k.repeat = function (a) {
            return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, k.repeatDelay = function (a) {
            return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, k.yoyo = function (a) {
            return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, f
    }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
        var d = function (a) {
                b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                var c, d, e = this.vars;
                for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
                i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
            }, e = 1e-10, f = c._internals, g = d._internals = {}, h = f.isSelector, i = f.isArray, j = f.lazyTweens,
            k = f.lazyRender, l = _gsScope._gsDefine.globals, m = function (a) {
                var b, c = {};
                for (b in a) c[b] = a[b];
                return c
            }, n = function (a, b, c) {
                var d, e, f = a.cycle;
                for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
                delete a.cycle
            }, o = g.pauseCallback = function () {
            }, p = function (a) {
                var b, c = [], d = a.length;
                for (b = 0; b !== d; c.push(a[b++])) ;
                return c
            }, q = d.prototype = new b;
        return d.version = "1.20.4", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function (a, b, d, e) {
            var f = d.repeat && l.TweenMax || c;
            return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
        }, q.from = function (a, b, d, e) {
            return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e)
        }, q.fromTo = function (a, b, d, e, f) {
            var g = e.repeat && l.TweenMax || c;
            return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
        }, q.staggerTo = function (a, b, e, f, g, i, j, k) {
            var l, o, q = new d({
                onComplete: i,
                onCompleteParams: j,
                callbackScope: k,
                smoothChildTiming: this.smoothChildTiming
            }), r = e.cycle;
            for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++) l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)), q.to(a[o], b, l, o * f);
            return this.add(q, g)
        }, q.staggerFrom = function (a, b, c, d, e, f, g, h) {
            return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
        }, q.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
        }, q.call = function (a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e)
        }, q.set = function (a, b, d) {
            return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
        }, d.exportRoot = function (a, b) {
            a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var e, f, g, h, i = new d(a), j = i._timeline;
            for (null == b && (b = !0), j._remove(i, !0), i._startTime = 0, i._rawPrevTime = i._time = i._totalTime = j._time, g = j._first; g;) h = g._next, b && g instanceof c && g.target === g.vars.onComplete || (f = g._startTime - g._delay, 0 > f && (e = 1), i.add(g, f)), g = h;
            return j.add(i, 0), e && i.totalDuration(), i
        }, q.add = function (e, f, g, h) {
            var j, k, l, m, n, o;
            if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
                if (e instanceof Array || e && e.push && i(e)) {
                    for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) i(m = e[l]) && (m = new d({tweens: m})), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
                    return this._uncache(!0)
                }
                if ("string" == typeof e) return this.addLabel(e, f);
                if ("function" != typeof e) throw"Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                e = c.delayedCall(0, e)
            }
            if (b.prototype.add.call(this, e, f), e._time && e.render((this.rawTime() - e._startTime) * e._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
            return this
        }, q.remove = function (b) {
            if (b instanceof a) {
                this._remove(b, !1);
                var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
                return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
            }
            if (b instanceof Array || b && b.push && i(b)) {
                for (var d = b.length; --d > -1;) this.remove(b[d]);
                return this
            }
            return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
        }, q._remove = function (a, c) {
            b.prototype._remove.call(this, a, c);
            var d = this._last;
            return d ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, q.append = function (a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
        }, q.insert = q.insertMultiple = function (a, b, c, d) {
            return this.add(a, b || 0, c, d)
        }, q.appendMultiple = function (a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
        }, q.addLabel = function (a, b) {
            return this._labels[a] = this._parseTimeOrLabel(b), this
        }, q.addPause = function (a, b, d, e) {
            var f = c.delayedCall(0, o, d, e || this);
            return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
        }, q.removeLabel = function (a) {
            return delete this._labels[a], this
        }, q.getLabelTime = function (a) {
            return null != this._labels[a] ? this._labels[a] : -1
        }, q._parseTimeOrLabel = function (b, c, d, e) {
            var f, g;
            if (e instanceof a && e.timeline === this) this.remove(e); else if (e && (e instanceof Array || e.push && i(e))) for (g = e.length; --g > -1;) e[g] instanceof a && e[g].timeline === this && this.remove(e[g]);
            if (f = "number" != typeof b || c ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - f : 0, d);
            if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = f); else {
                if (g = b.indexOf("="), -1 === g) return null == this._labels[b] ? d ? this._labels[b] = f + c : c : this._labels[b] + c;
                c = parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1)), b = g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f
            }
            return Number(b) + c
        }, q.seek = function (a, b) {
            return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
        }, q.stop = function () {
            return this.paused(!0)
        }, q.gotoAndPlay = function (a, b) {
            return this.play(a, b)
        }, q.gotoAndStop = function (a, b) {
            return this.pause(a, b)
        }, q.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d, f, g, h, i, l, m, n = this._time, o = this._dirty ? this.totalDuration() : this._totalDuration,
                p = this._startTime, q = this._timeScale, r = this._paused;
            if (n !== this._time && (a += this._time - n), a >= o - 1e-7 && a >= 0) this._totalTime = this._time = o, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = o + 1e-4; else if (1e-7 > a) if (this._totalTime = this._time = 0, (0 !== n || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a; else {
                if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f) for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
                a = 0, this._initted || (i = !0)
            } else {
                if (this._hasPause && !this._forcingPlayhead && !b) {
                    if (a >= n) for (d = this._first; d && d._startTime <= a && !l;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next; else for (d = this._last; d && d._startTime >= a && !l;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
                    l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = a
            }
            if (this._time !== n && this._first || c || i || l) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== n && a > 0 && (this._active = !0), 0 === n && this.vars.onStart && (0 === this._time && this._duration || b || this._callback("onStart")), m = this._time, m >= n) for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r));) (d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g; else for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r));) {
                    if (d._active || d._startTime <= n && !d._paused && !d._gc) {
                        if (l === d) {
                            for (l = d._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev;
                            l = null, this.pause()
                        }
                        d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                    }
                    d = g
                }
                this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || o >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h)))
            }
        }, q._hasPausedChild = function () {
            for (var a = this._first; a;) {
                if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
                a = a._next
            }
            return !1
        }, q.getChildren = function (a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g;) g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
            return f
        }, q.getTweensOf = function (a, b) {
            var d, e, f = this._gc, g = [], h = 0;
            for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;) (d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
            return f && this._enabled(!1, !0), g
        }, q.recent = function () {
            return this._recent
        }, q._contains = function (a) {
            for (var b = a.timeline; b;) {
                if (b === this) return !0;
                b = b.timeline
            }
            return !1
        }, q.shiftChildren = function (a, b, c) {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime += a), e = e._next;
            if (b) for (d in f) f[d] >= c && (f[d] += a);
            return this._uncache(!0)
        }, q._kill = function (a, b) {
            if (!a && !b) return this._enabled(!1, !1);
            for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
            return e
        }, q.clear = function (a) {
            var b = this.getChildren(!1, !0, !0), c = b.length;
            for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}), this._uncache(!0)
        }, q.invalidate = function () {
            for (var b = this._first; b;) b.invalidate(), b = b._next;
            return a.prototype.invalidate.call(this)
        }, q._enabled = function (a, c) {
            if (a === this._gc) for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
            return b.prototype._enabled.call(this, a, c)
        }, q.totalTime = function (b, c, d) {
            this._forcingPlayhead = !0;
            var e = a.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, e
        }, q.duration = function (a) {
            return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
        }, q.totalDuration = function (a) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(e, e._startTime - e._delay), this._calculatingDuration = 0) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale, this._time -= e._startTime, this._totalTime -= e._startTime, this._rawPrevTime -= e._startTime), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
                    this._duration = this._totalDuration = d, this._dirty = !1
                }
                return this._totalDuration
            }
            return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
        }, q.paused = function (b) {
            if (!b) for (var c = this._first, d = this._time; c;) c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
            return a.prototype.paused.apply(this, arguments)
        }, q.usesFrames = function () {
            for (var b = this._timeline; b._timeline;) b = b._timeline;
            return b === a._rootFramesTimeline
        }, q.rawTime = function (a) {
            return a && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(a) - this._startTime) * this._timeScale
        }, d
    }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (a, b, c) {
        var d = function (b) {
                a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
            }, e = 1e-10, f = b._internals, g = f.lazyTweens, h = f.lazyRender, i = _gsScope._gsDefine.globals,
            j = new c(null, null, 1, 0), k = d.prototype = new a;
        return k.constructor = d, k.kill()._gc = !1, d.version = "1.20.4", k.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
        }, k.addCallback = function (a, c, d, e) {
            return this.add(b.delayedCall(0, a, d, e), c)
        }, k.removeCallback = function (a, b) {
            if (a) if (null == b) this._kill(null, a); else for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;) c[d]._startTime === e && c[d]._enabled(!1, !1);
            return this
        }, k.removePause = function (b) {
            return this.removeCallback(a._internals.pauseCallback, b)
        }, k.tweenTo = function (a, c) {
            c = c || {};
            var d, e, f, g = {ease: j, useFrames: this.usesFrames(), immediateRender: !1, lazy: !1},
                h = c.repeat && i.TweenMax || b;
            for (e in c) g[e] = c[e];
            return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new h(this, d, g), g.onStart = function () {
                f.target.paused(!0), f.vars.time === f.target.time() || d !== f.duration() || f.isFromTo || f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale).render(f.time(), !0, !0), c.onStart && c.onStart.apply(c.onStartScope || c.callbackScope || f, c.onStartParams || [])
            }, f
        }, k.tweenFromTo = function (a, b, c) {
            c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = {
                onComplete: this.seek,
                onCompleteParams: [a],
                callbackScope: this
            }, c.immediateRender = c.immediateRender !== !1;
            var d = this.tweenTo(b, c);
            return d.isFromTo = 1, d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
        }, k.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d, f, i, j, k, l, m, n, o = this._time, p = this._dirty ? this.totalDuration() : this._totalDuration,
                q = this._duration, r = this._totalTime, s = this._startTime, t = this._timeScale,
                u = this._rawPrevTime, v = this._paused, w = this._cycle;
            if (o !== this._time && (a += this._time - o), a >= p - 1e-7 && a >= 0) this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (f = !0, j = "onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = q, a = q + 1e-4); else if (1e-7 > a) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== o || 0 === q && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j = "onReverseComplete") : u >= 0 && this._first && (k = !0), this._rawPrevTime = a; else {
                if (this._rawPrevTime = q || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f) for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
                a = 0, this._initted || (k = !0)
            } else if (0 === q && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (l = q + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = q - this._time), this._time > q ? (this._time = q, a = q + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b) {
                if (a = this._time, a >= o || this._repeat && w !== this._cycle) for (d = this._first; d && d._startTime <= a && !m;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (m = d), d = d._next; else for (d = this._last; d && d._startTime >= a && !m;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d), d = d._prev;
                m && m._startTime < q && (this._time = a = m._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== w && !this._locked) {
                var x = this._yoyo && 0 !== (1 & w), y = x === (this._yoyo && 0 !== (1 & this._cycle)),
                    z = this._totalTime, A = this._cycle, B = this._rawPrevTime, C = this._time;
                if (this._totalTime = w * q, this._cycle < w ? x = !x : this._totalTime += q, this._time = o, this._rawPrevTime = 0 === q ? u - 1e-4 : u, this._cycle = w, this._locked = !0, o = x ? 0 : q, this.render(o, b, 0 === q), b || this._gc || this.vars.onRepeat && (this._cycle = A, this._locked = !1, this._callback("onRepeat")), o !== this._time) return;
                if (y && (this._cycle = w, this._locked = !0, o = x ? q + 1e-4 : -1e-4, this.render(o, !0, !1)), this._locked = !1, this._paused && !v) return;
                this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B
            }
            if (!(this._time !== o && this._first || c || k || m)) return void(r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && (0 === this._totalTime && this._totalDuration || b || this._callback("onStart")), n = this._time, n >= o) for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));) (d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = i; else for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused || v));) {
                if (d._active || d._startTime <= o && !d._paused && !d._gc) {
                    if (m === d) {
                        for (m = d._prev; m && m.endTime() > this._time;) m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c), m = m._prev;
                        m = null, this.pause()
                    }
                    d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                }
                d = i
            }
            this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (f && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[j] && this._callback(j)))
        }, k.getActive = function (a, b, c) {
            null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
            var d, e, f = [], g = this.getChildren(a, b, c), h = 0, i = g.length;
            for (d = 0; i > d; d++) e = g[d], e.isActive() && (f[h++] = e);
            return f
        }, k.getLabelAfter = function (a) {
            a || 0 !== a && (a = this._time);
            var b, c = this.getLabelsArray(), d = c.length;
            for (b = 0; d > b; b++) if (c[b].time > a) return c[b].name;
            return null
        }, k.getLabelBefore = function (a) {
            null == a && (a = this._time);
            for (var b = this.getLabelsArray(), c = b.length; --c > -1;) if (b[c].time < a) return b[c].name;
            return null
        }, k.getLabelsArray = function () {
            var a, b = [], c = 0;
            for (a in this._labels) b[c++] = {time: this._labels[a], name: a};
            return b.sort(function (a, b) {
                return a.time - b.time
            }), b
        }, k.invalidate = function () {
            return this._locked = !1, a.prototype.invalidate.call(this)
        }, k.progress = function (a, b) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration() || 0
        }, k.totalProgress = function (a, b) {
            return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration() || 0
        }, k.totalDuration = function (b) {
            return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, k.time = function (a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
        }, k.repeat = function (a) {
            return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, k.repeatDelay = function (a) {
            return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, k.yoyo = function (a) {
            return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, k.currentLabel = function (a) {
            return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
        }, d
    }, !0), function () {
        var a = 180 / Math.PI, b = [], c = [], d = [], e = {}, f = _gsScope._gsDefine.globals,
            g = function (a, b, c, d) {
                c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
            },
            h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            i = function (a, b, c, d) {
                var e = {a: a}, f = {}, g = {}, h = {c: d}, i = (a + b) / 2, j = (b + c) / 2, k = (c + d) / 2,
                    l = (i + j) / 2, m = (j + k) / 2, n = (m - l) / 8;
                return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
            }, j = function (a, e, f, g, h) {
                var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1, x = 0, y = a[0].a;
                for (j = 0; w > j; j++) n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
                n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
            }, k = function (a, d, e, f) {
                var h, i, j, k, l, m, n = [];
                if (f) for (a = [f].concat(a), i = a.length; --i > -1;) "string" == typeof(m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
                if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[0][d]), n;
                for (i = 0; h > i; i++) j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
                return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
            }, l = function (a, f, g, i, l, m) {
                var n, o, p, q, r, s, t, u, v = {}, w = [], x = m || a[0];
                l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
                for (o in a[0]) w.push(o);
                if (a.length > 1) {
                    for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;) if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
                        t = !1;
                        break
                    }
                    t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
                }
                for (b.length = c.length = d.length = 0, n = w.length; --n > -1;) o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
                for (n = b.length; --n > -1;) b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
                if (!i) {
                    for (n = w.length; --n > -1;) if (e[o]) for (p = v[w[n]],
                                                                     s = p.length - 1, q = 0; s > q; q++) r = p[q + 1].da / c[q] + p[q].da / b[q] || 0, d[q] = (d[q] || 0) + r * r;
                    for (n = d.length; --n > -1;) d[n] = Math.sqrt(d[n])
                }
                for (n = w.length, q = g ? 4 : 1; --n > -1;) o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q));
                return v
            }, m = function (a, b, c) {
                b = b || "soft";
                var d, e, f, h, i, j, k, l, m, n, o, p = {}, q = "cubic" === b ? 3 : 2, r = "soft" === b, s = [];
                if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1) throw"invalid Bezier data";
                for (m in a[0]) s.push(m);
                for (j = s.length; --j > -1;) {
                    for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++) d = null == c ? a[k][m] : "string" == typeof(o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d;
                    for (l = n - q + 1, n = 0, k = 0; l > k; k += q) d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
                    i.length = n
                }
                return p
            }, n = function (a, b, c) {
                for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;) for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++) j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d
            }, o = function (a, b) {
                b = b >> 0 || 6;
                var c, d, e, f, g = [], h = [], i = 0, j = 0, k = b - 1, l = [], m = [];
                for (c in a) n(a[c], g, b);
                for (e = g.length, d = 0; e > d; d++) i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
                return {length: j, lengths: h, segments: l}
            }, p = _gsScope._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                version: "1.3.8",
                API: 2,
                global: !0,
                init: function (a, b, c) {
                    this._target = a, b instanceof Array && (b = {values: b}), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                    var d, e, f, g, h, i = b.values || [], j = {}, k = i[0], n = b.autoRotate || c.vars.orientToBezier;
                    this._autoRotate = n ? n instanceof Array ? n : [["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]] : null;
                    for (d in k) this._props.push(d);
                    for (f = this._props.length; --f > -1;) d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j);
                    if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) {
                        var p = o(this._beziers, this._timeRes);
                        this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                    }
                    if (n = this._autoRotate) for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) {
                        for (g = 0; 3 > g; g++) d = n[f][g], this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
                        d = n[f][2], this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0, this._overwriteProps.push(d)
                    }
                    return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
                },
                set: function (b) {
                    var c, d, e, f, g, h, i, j, k, l, m = this._segCount, n = this._func, o = this._target,
                        p = b !== this._startRatio;
                    if (this._timeRes) {
                        if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) {
                            for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;) ;
                            this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0]
                        } else if (b < this._l1 && e > 0) {
                            for (; e > 0 && (this._l1 = k[--e]) >= b;) ;
                            0 === e && b < this._l1 ? this._l1 = 0 : e++, this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si]
                        }
                        if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) {
                            for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;) ;
                            this._s1 = l[e - 1], this._si = e
                        } else if (b < this._s1 && e > 0) {
                            for (; e > 0 && (this._s1 = l[--e]) >= b;) ;
                            0 === e && b < this._s1 ? this._s1 = 0 : e++, this._s2 = l[e], this._si = e
                        }
                        h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                    } else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;
                    for (d = 1 - h, e = this._props.length; --e > -1;) f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i;
                    if (this._autoRotate) {
                        var q, r, s, t, u, v, w, x = this._autoRotate;
                        for (e = x.length; --e > -1;) f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i)
                    }
                }
            }), q = p.prototype;
        p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function (a, b, c) {
            return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
        }, p._cssRegister = function () {
            var a = f.CSSPlugin;
            if (a) {
                var b = a._internals, c = b._parseToProxy, d = b._setPluginRatio, e = b.CSSPropTween;
                b._registerComplexSpecialProp("bezier", {
                    parser: function (a, b, f, g, h, i) {
                        b instanceof Array && (b = {values: b}), i = new p;
                        var j, k, l, m = b.values, n = m.length - 1, o = [], q = {};
                        if (0 > n) return h;
                        for (j = 0; n >= j; j++) l = c(a, m[j], g, h, i, n !== j), o[j] = l.end;
                        for (k in b) q[k] = b[k];
                        return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [["left", "top", "rotation", j, !1]] : null != l.end.x ? [["x", "y", "rotation", j, !1]] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform, l.proxy.rotation = l.autoRotate.rotation || 0, g._overwriteProps.push("rotation")), i._onInitTween(l.proxy, q, g._tween), h
                    }
                })
            }
        }, q._mod = function (a) {
            for (var b, c = this._overwriteProps, d = c.length; --d > -1;) b = a[c[d]], b && "function" == typeof b && (this._mod[c[d]] = b)
        }, q._kill = function (a) {
            var b, c, d = this._props;
            for (b in this._beziers) if (b in a) for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;) d[c] === b && d.splice(c, 1);
            if (d = this._autoRotate) for (c = d.length; --c > -1;) a[d[c][2]] && d.splice(c, 1);
            return this._super._kill.call(this, a)
        }
    }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
        var c, d, e, f, g = function () {
            a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
        }, h = _gsScope._gsDefine.globals, i = {}, j = g.prototype = new a("css");
        j.constructor = g, g.version = "1.20.4", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
            top: j,
            right: j,
            bottom: j,
            left: j,
            width: j,
            height: j,
            fontSize: j,
            padding: j,
            margin: j,
            perspective: j,
            lineHeight: ""
        };
        var k, l, m, n, o, p, q, r, s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
            t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            w = /(?:\d|\-|\+|=|#|\.)*/g, x = /opacity *= *([^)]*)/i, y = /opacity:([^;]*)/i,
            z = /alpha\(opacity *=.+?\)/i, A = /^(rgb|hsl)/, B = /([A-Z])/g, C = /-([a-z])/gi,
            D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, E = function (a, b) {
                return b.toUpperCase()
            }, F = /(?:Left|Right|Width)/i, G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, I = /,(?=[^\)]*(?:\(|$))/gi, J = /[\s,\(]/i,
            K = Math.PI / 180, L = 180 / Math.PI, M = {}, N = {style: {}}, O = _gsScope.document || {
                createElement: function () {
                    return N
                }
            }, P = function (a, b) {
                return O.createElementNS ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a) : O.createElement(a)
            }, Q = P("div"), R = P("img"), S = g._internals = {_specialProps: i},
            T = (_gsScope.navigator || {}).userAgent || "", U = function () {
                var a = T.indexOf("Android"), b = P("a");
                return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
            }(), V = function (a) {
                return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, W = function (a) {
                _gsScope.console && console.log(a)
            }, X = "", Y = "", Z = function (a, b) {
                b = b || Q;
                var c, d, e = b.style;
                if (void 0 !== e[a]) return a;
                for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];) ;
                return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) : null
            }, $ = O.defaultView ? O.defaultView.getComputedStyle : function () {
            }, _ = g.getStyle = function (a, b, c, d, e) {
                var f;
                return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || $(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a)
            }, aa = S.convertToPixels = function (a, c, d, e, f) {
                if ("px" === e || !e && "lineHeight" !== c) return d;
                if ("auto" === e || !d) return 0;
                var h, i, j, k = F.test(c), l = a, m = Q.style, n = 0 > d, o = 1 === d;
                if (n && (d = -d), o && (d *= 100), "lineHeight" !== c || e) if ("%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight); else {
                    if (m.cssText = "border:0 solid red;position:" + _(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e; else {
                        if (l = a.parentNode || O.body, -1 !== _(l, "display").indexOf("flex") && (m.position = "absolute"), i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;
                        m[k ? "width" : "height"] = d + e
                    }
                    l.appendChild(Q), h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(Q), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = aa(a, c, d, e, !0))
                } else i = $(a).lineHeight, a.style.lineHeight = d, h = parseFloat($(a).lineHeight), a.style.lineHeight = i;
                return o && (h /= 100), n ? -h : h
            }, ba = S.calculateOffset = function (a, b, c) {
                if ("absolute" !== _(a, "position", c)) return 0;
                var d = "left" === b ? "Left" : "Top", e = _(a, "margin" + d, c);
                return a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0)
            }, ca = function (a, b) {
                var c, d, e, f = {};
                if (b = b || $(a, null)) if (c = b.length) for (; --c > -1;) e = b[c], (-1 === e.indexOf("-transform") || Da === e) && (f[e.replace(C, E)] = b.getPropertyValue(e)); else for (c in b) (-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]); else if (b = a.currentStyle || a.style) for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
                return U || (f.opacity = V(a)), d = Ra(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Fa && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f
            }, da = function (a, b, c, d, e) {
                var f, g, h, i = {}, j = a.style;
                for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ba(a, g), void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
                if (d) for (g in d) "className" !== g && (i[g] = d[g]);
                return {difs: i, firstMPT: h}
            }, ea = {width: ["Left", "Right"], height: ["Top", "Bottom"]},
            fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ga = function (a, b, c) {
                if ("svg" === (a.nodeName + "").toLowerCase()) return (c || $(a))[b] || 0;
                if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;
                var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight), e = ea[b], f = e.length;
                for (c = c || $(a, null); --f > -1;) d -= parseFloat(_(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0;
                return d
            }, ha = function (a, b) {
                if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
                (null == a || "" === a) && (a = "0 0");
                var c, d = a.split(" "), e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
                    f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
                if (d.length > 3 && !b) {
                    for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) a.push(ha(d[c]));
                    return a.join(",")
                }
                return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a
            }, ia = function (a, b) {
                return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
            }, ja = function (a, b) {
                return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
            }, ka = function (a, b, c, d) {
                var e, f, g, h, i, j = 1e-6;
                return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h
            }, la = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            }, ma = function (a, b, c) {
                return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
            }, na = g.parseColor = function (a, b) {
                var c, d, e, f, g, h, i, j, k, l, m;
                if (a) if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a]; else {
                    if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), la[a]) c = la[a]; else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a]; else if ("hsl" === a.substr(0, 3)) if (c = m = a.match(s), b) {
                        if (-1 !== a.indexOf("=")) return a.match(t)
                    } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(c[3])), c[0] = ma(g + 1 / 3, d, e), c[1] = ma(g, d, e), c[2] = ma(g - 1 / 3, d, e); else c = a.match(s) || la.transparent;
                    c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]))
                } else c = la.black;
                return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
            }, oa = function (a, b) {
                var c, d, e, f = a.match(pa) || [], g = 0, h = "";
                if (!f.length) return a;
                for (c = 0; c < f.length; c++) d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = na(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
                return h + a.substr(g)
            }, pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (j in la) pa += "|" + j + "\\b";
        pa = new RegExp(pa + ")", "gi"), g.colorStringFilter = function (a) {
            var b, c = a[0] + " " + a[1];
            pa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = oa(a[0], b), a[1] = oa(a[1], b)), pa.lastIndex = 0
        }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
        var qa = function (a, b, c, d) {
            if (null == a) return function (a) {
                return a
            };
            var e, f = b ? (a.match(pa) || [""])[0] : "", g = a.split(f).join("").match(u) || [],
                h = a.substr(0, a.indexOf(g[0])), i = ")" === a.charAt(a.length - 1) ? ")" : "",
                j = -1 !== a.indexOf(" ") ? " " : ",", k = g.length, l = k > 0 ? g[0].replace(s, "") : "";
            return k ? e = b ? function (a) {
                var b, m, n, o;
                if ("number" == typeof a) a += l; else if (d && I.test(a)) {
                    for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++) o[n] = e(o[n]);
                    return o.join(",")
                }
                if (b = (a.match(pa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--) for (; ++n < k;) m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
                return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
            } : function (a) {
                var b, f, m;
                if ("number" == typeof a) a += l; else if (d && I.test(a)) {
                    for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++) f[m] = e(f[m]);
                    return f.join(",")
                }
                if (b = a.match(u) || [], m = b.length, k > m--) for (; ++m < k;) b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
                return h + b.join(j) + i
            } : function (a) {
                return a
            }
        }, ra = function (a) {
            return a = a.split(","), function (b, c, d, e, f, g, h) {
                var i, j = (c + "").split(" ");
                for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                return e.parse(b, h, f, g)
            }
        }, sa = (S._setPluginRatio = function (a) {
            this.plugin.setRatio(a);
            for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;) b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
            if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod(h.rotation, this.t) : h.rotation), 1 === a || 0 === a) for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
                if (c = i.t, c.type) {
                    if (1 === c.type) {
                        for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) e += c["xn" + d] + c["xs" + (d + 1)];
                        c[f] = e
                    }
                } else c[f] = c.s + c.xs0;
                i = i._next
            }
        }, function (a, b, c, d, e) {
            this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
        }), ta = (S._parseToProxy = function (a, b, c, d, e, f) {
            var g, h, i, j, k, l = d, m = {}, n = {}, o = c._transform, p = M;
            for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
                if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new sa(d, "s", h, j, d.r), d.c = 0), 1 === d.type)) for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new sa(d, i, h, j, d.rxp[i]));
                d = d._next
            }
            return {proxy: m, end: n, firstMPT: j, pt: k}
        }, S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
            this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ta || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
        }), ua = function (a, b, c, d, e, f) {
            var g = new ta(a, b, c, d - c, e, -1, f);
            return g.b = c, g.e = g.xs0 = d, g
        }, va = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
            c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && pa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);
            var m, n, o, p, u, v, w, x, y, z, A, B, C, D = c.split(", ").join(",").split(" "),
                E = d.split(", ").join(",").split(" "), F = D.length, G = k !== !1;
            for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (-1 !== (d + c).indexOf("rgb") || -1 !== (d + c).indexOf("hsl") ? (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" ")) : (D = D.join(" ").split(",").join(", ").split(" "), E = E.join(" ").split(",").join(", ").split(" ")), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, pa.lastIndex = 0, m = 0; F > m; m++) if (p = D[m], u = E[m], x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ia(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px"), !0); else if (e && pa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""), C = -1 !== u.indexOf("hsl") && U, z = u, p = na(p, C), u = na(u, C), y = p.length + u.length > 6, y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ? h.appendXtra(z.substr(0, z.indexOf("hsl")) + (y ? "hsla(" : "hsl("), p[0], ia(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ia(u[1], p[1]), "%,", !1).appendXtra("", p[2], ia(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(z.substr(0, z.indexOf("rgb")) + (y ? "rgba(" : "rgb("), p[0], u[0] - p[0], ",", !0, !0).appendXtra("", p[1], u[1] - p[1], ",", !0).appendXtra("", p[2], u[2] - p[2], y ? "," : B, !0), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), pa.lastIndex = 0; else if (v = p.match(s)) {
                if (w = u.match(t), !w || w.length !== v.length) return h;
                for (o = 0, n = 0; n < v.length; n++) A = v[n], z = p.indexOf(A, o), h.appendXtra(p.substr(o, z - o), Number(A), ia(w[n], A), "", G && "px" === p.substr(z + A.length, 2), 0 === n), o = z + A.length;
                h["xs" + h.l] += p.substr(o)
            } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
            if (-1 !== d.indexOf("=") && h.data) {
                for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++) B += h["xs" + m] + h.data["xn" + m];
                h.e = B + h["xs" + m]
            }
            return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
        }, wa = 9;
        for (j = ta.prototype, j.l = j.pr = 0; --wa > 0;) j["xn" + wa] = 0, j["xs" + wa] = "";
        j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f) {
            var g = this, h = g.l;
            return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ta(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {s: b + c}, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
        };
        var xa = function (a, b) {
            b = b || {}, this.p = b.prefix ? Z(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || qa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
        }, ya = S._registerComplexSpecialProp = function (a, b, c) {
            "object" != typeof b && (b = {parser: c});
            var d, e, f = a.split(","), g = b.defaultValue;
            for (c = c || [g], d = 0; d < f.length; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new xa(f[d], b)
        }, za = S._registerPluginProp = function (a) {
            if (!i[a]) {
                var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                ya(a, {
                    parser: function (a, c, d, e, f, g, j) {
                        var k = h.com.greensock.plugins[b];
                        return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."), f)
                    }
                })
            }
        };
        j = xa.prototype, j.parseComplex = function (a, b, c, d, e, f) {
            var g, h, i, j, k, l, m = this.keyword;
            if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) {
                for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
                b = h.join(", "), c = i.join(", ")
            }
            return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
        }, j.parse = function (a, b, c, d, f, g, h) {
            return this.parseComplex(a.style, this.format(_(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
        }, g.registerSpecialProp = function (a, b, c) {
            ya(a, {
                parser: function (a, d, e, f, g, h, i) {
                    var j = new ta(a, e, 0, 0, g, 2, e, !1, c);
                    return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
                }, priority: c
            })
        }, g.useSVGTransformAttr = !0;
        var Aa,
            Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            Ca = Z("transform"), Da = X + "transform", Ea = Z("transformOrigin"), Fa = null !== Z("perspective"),
            Ga = S.Transform = function () {
                this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1
            }, Ha = _gsScope.SVGElement, Ia = function (a, b, c) {
                var d, e = O.createElementNS("http://www.w3.org/2000/svg", a), f = /([a-z])([A-Z])/g;
                for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
                return b.appendChild(e), e
            }, Ja = O.documentElement || {}, Ka = function () {
                var a, b, c, d = p || /Android/i.test(T) && !_gsScope.chrome;
                return O.createElementNS && !d && (a = Ia("svg", Ja), b = Ia("rect", a, {
                    width: 100,
                    height: 50,
                    x: 100
                }), c = b.getBoundingClientRect().width, b.style[Ea] = "50% 50%", b.style[Ca] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Fa), Ja.removeChild(a)), d
            }(), La = function (a, b, c, d, e, f) {
                var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform, w = Qa(a, !0);
                v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = {
                    x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0,
                    y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0,
                    width: 0,
                    height: 0
                }), b = ha(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Pa && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j)), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "))
            }, Ma = function (a) {
                var b,
                    c = P("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                    d = this.parentNode, e = this.nextSibling, f = this.style.cssText;
                if (Ja.appendChild(c), c.appendChild(this), this.style.display = "block", a) try {
                    b = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ma
                } catch (g) {
                } else this._originalGetBBox && (b = this._originalGetBBox());
                return e ? d.insertBefore(this, e) : d.appendChild(this), Ja.removeChild(c), this.style.cssText = f, b
            }, Na = function (a) {
                try {
                    return a.getBBox()
                } catch (b) {
                    return Ma.call(a, !0)
                }
            }, Oa = function (a) {
                return !(!Ha || !a.getCTM || a.parentNode && !a.ownerSVGElement || !Na(a))
            }, Pa = [1, 0, 0, 1, 0, 0], Qa = function (a, b) {
                var c, d, e, f, g, h, i = a._gsTransform || new Ga, j = 1e5, k = a.style;
                if (Ca ? d = _(a, Da, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, !Ca || !(h = !$(a) || "none" === $(a).display) && a.parentNode || (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ja.appendChild(a)), d = _(a, Da, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Va(k, "display"), g && Ja.removeChild(a)), (i.svg || a.getCTM && Oa(a)) && (c && -1 !== (k[Ca] + "").indexOf("matrix") && (d = k[Ca], c = 0), e = a.getAttribute("transform"), c && e && (e = a.transform.baseVal.consolidate().matrix, d = "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")", c = 0)), c) return Pa;
                for (e = (d || "").match(s) || [], wa = e.length; --wa > -1;) f = Number(e[wa]), e[wa] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f;
                return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
            }, Ra = S.getTransform = function (a, c, d, e) {
                if (a._gsTransform && d && !e) return a._gsTransform;
                var f, h, i, j, k, l, m = d ? a._gsTransform || new Ga : new Ga, n = m.scaleX < 0, o = 2e-5, p = 1e5,
                    q = Fa ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
                    r = parseFloat(g.defaultTransformPerspective) || 0;
                if (m.svg = !(!a.getCTM || !Oa(a)), m.svg && (La(a, _(a, Ea, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), Aa = g.useSVGTransformAttr || Ka), f = Qa(a), f !== Pa) {
                    if (16 === f.length) {
                        var s, t, u, v, w, x = f[0], y = f[1], z = f[2], A = f[3], B = f[4], C = f[5], D = f[6], E = f[7],
                            F = f[8], G = f[9], H = f[10], I = f[12], J = f[13], K = f[14], M = f[11], N = Math.atan2(D, H);
                        m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L, N && (v = Math.cos(N), w = Math.sin(N), s = x * v + y * w, t = B * v + C * w, u = F * v + G * w, y = y * v - x * w, C = C * v - B * w, G = G * v - F * w, x = s, B = t, F = u), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), N = Math.atan2(B, C), m.scaleX = (Math.sqrt(x * x + y * y + z * z) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + D * D) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(F * F + G * G + H * H) * p + .5 | 0) / p, x /= m.scaleX, B /= m.scaleY, y /= m.scaleX, C /= m.scaleY, Math.abs(N) > o ? (m.skewX = N * L, B = 0, "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N))) : m.skewX = 0, m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C))
                    } else if (!Fa || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
                        var O = f.length >= 6, P = O ? f[0] : 1, Q = f[1] || 0, R = f[2] || 0, S = O ? f[3] : 1;
                        m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Fa && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S))
                    }
                    Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180)), m.zOrigin = q;
                    for (h in m) m[h] < o && m[h] > -o && (m[h] = 0)
                }
                return d && (a._gsTransform = m, m.svg && (Aa && a.style[Ca] ? b.delayedCall(.001, function () {
                    Va(a.style, Ca)
                }) : !Aa && a.getAttribute("transform") && b.delayedCall(.001, function () {
                    a.removeAttribute("transform")
                }))), m
            }, Sa = function (a) {
                var b, c, d = this.data, e = -d.rotation * K, f = e + d.skewX * K, g = 1e5,
                    h = (Math.cos(e) * d.scaleX * g | 0) / g, i = (Math.sin(e) * d.scaleX * g | 0) / g,
                    j = (Math.sin(f) * -d.scaleY * g | 0) / g, k = (Math.cos(f) * d.scaleY * g | 0) / g, l = this.t.style,
                    m = this.t.currentStyle;
                if (m) {
                    c = i, i = -j, j = -c, b = m.filter, l.filter = "";
                    var n, o, q = this.t.offsetWidth, r = this.t.offsetHeight, s = "absolute" !== m.position,
                        t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
                        u = d.x + q * d.xPercent / 100, v = d.y + r * d.yPercent / 100;
                    if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
                        var y, z, A, B = 8 > p ? 1 : -1;
                        for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), wa = 0; 4 > wa; wa++) z = fa[wa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A = c !== d[z] ? 2 > wa ? -d.ieOffsetX : -d.ieOffsetY : 2 > wa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === wa || 2 === wa ? 1 : B))) + "px"
                    }
                }
            }, Ta = S.set3DTransformRatio = S.setTransformRatio = function (a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data, A = this.t.style,
                    B = z.rotation, C = z.rotationX, D = z.rotationY, E = z.scaleX, F = z.scaleY, G = z.scaleZ, H = z.x,
                    I = z.y, J = z.z, L = z.svg, M = z.perspective, N = z.force3D, O = z.skewY, P = z.skewX;
                if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Aa && L || !Fa) return void(B || P || L ? (B *= K, x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b, g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset, Aa && (z.xPercent || z.yPercent) && (q = this.t.getBBox(), H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")", L && Aa ? this.t.setAttribute("transform", "matrix(" + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");
                if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P) B *= K, r = c = Math.cos(B), s = f = Math.sin(B), P && (B -= P * K, r = Math.cos(B), s = Math.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b))), d = -s, g = r; else {
                    if (!(D || C || 1 !== G || M || L)) return void(A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
                    c = g = 1, d = f = 0
                }
                k = 1, e = h = i = j = l = m = 0, o = M ? -1 / M : 0, p = z.zOrigin, q = 1e-6, v = ",", w = "0", B = D * K, B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e = c * s, h = f * s, k = r, o *= r, c *= r, f *= r), B = C * K, B && (r = Math.cos(B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m = o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t), 1 !== G && (e *= G, h *= G, k *= G, o *= G), 1 !== F && (d *= F, g *= F, j *= F, m *= F), 1 !== E && (c *= E, f *= E, i *= E, l *= E), (p || L) && (p && (H += e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (I = w), q > J && J > -q && (J = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i), u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g), C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")", A[Ca] = u
            };
        j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function (a, b, c, d, f, h, i) {
                if (d._lastParsedTransform === i) return f;
                d._lastParsedTransform = i;
                var j, k = i.scale && "function" == typeof i.scale ? i.scale : 0;
                "function" == typeof i[c] && (j = i[c], i[c] = b), k && (i.scale = k(r, a));
                var l, m, n, o, p, s, t, u, v, w = a._gsTransform, x = a.style, y = 1e-6, z = Ba.length, A = i, B = {},
                    C = "transformOrigin", D = Ra(a, e, !0, A.parseTransform),
                    E = A.transform && ("function" == typeof A.transform ? A.transform(r, q) : A.transform);
                if (D.skewType = A.skewType || D.skewType || g.defaultSkewType, d._transform = D, E && "string" == typeof E && Ca) m = Q.style, m[Ca] = E, m.display = "block", m.position = "absolute", O.body.appendChild(Q), l = Ra(Q, null, !1), "simple" === D.skewType && (l.scaleY *= Math.cos(l.skewX * K)), D.svg && (s = D.xOrigin, t = D.yOrigin, l.x -= D.xOffset, l.y -= D.yOffset, (A.transformOrigin || A.svgOrigin) && (E = {}, La(a, ha(A.transformOrigin), E, A.svgOrigin, A.smoothOrigin, !0), s = E.xOrigin, t = E.yOrigin, l.x -= E.xOffset - D.xOffset, l.y -= E.yOffset - D.yOffset), (s || t) && (u = Qa(Q, !0), l.x -= s - (s * u[0] + t * u[2]), l.y -= t - (s * u[1] + t * u[3]))), O.body.removeChild(Q), l.perspective || (l.perspective = D.perspective), null != A.xPercent && (l.xPercent = ja(A.xPercent, D.xPercent)), null != A.yPercent && (l.yPercent = ja(A.yPercent, D.yPercent)); else if ("object" == typeof A) {
                    if (l = {
                        scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX),
                        scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY),
                        scaleZ: ja(A.scaleZ, D.scaleZ),
                        x: ja(A.x, D.x),
                        y: ja(A.y, D.y),
                        z: ja(A.z, D.z),
                        xPercent: ja(A.xPercent, D.xPercent),
                        yPercent: ja(A.yPercent, D.yPercent),
                        perspective: ja(A.transformPerspective, D.perspective)
                    }, p = A.directionalRotation, null != p) if ("object" == typeof p) for (m in p) A[m] = p[m]; else A.rotation = p;
                    "string" == typeof A.x && -1 !== A.x.indexOf("%") && (l.x = 0, l.xPercent = ja(A.x, D.xPercent)), "string" == typeof A.y && -1 !== A.y.indexOf("%") && (l.y = 0, l.yPercent = ja(A.y, D.yPercent)), l.rotation = ka("rotation" in A ? A.rotation : "shortRotation" in A ? A.shortRotation + "_short" : "rotationZ" in A ? A.rotationZ : D.rotation, D.rotation, "rotation", B), Fa && (l.rotationX = ka("rotationX" in A ? A.rotationX : "shortRotationX" in A ? A.shortRotationX + "_short" : D.rotationX || 0, D.rotationX, "rotationX", B), l.rotationY = ka("rotationY" in A ? A.rotationY : "shortRotationY" in A ? A.shortRotationY + "_short" : D.rotationY || 0, D.rotationY, "rotationY", B)), l.skewX = ka(A.skewX, D.skewX), l.skewY = ka(A.skewY, D.skewY)
                }
                for (Fa && null != A.force3D && (D.force3D = A.force3D, o = !0), n = D.force3D || D.z || D.rotationX || D.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, n || null == A.scale || (l.scaleZ = 1); --z > -1;) v = Ba[z], E = l[v] - D[v], (E > y || -y > E || null != A[v] || null != M[v]) && (o = !0, f = new ta(D, v, D[v], E, f), v in B && (f.e = B[v]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
                return E = A.transformOrigin, D.svg && (E || A.svgOrigin) && (s = D.xOffset, t = D.yOffset, La(a, ha(E), l, A.svgOrigin, A.smoothOrigin), f = ua(D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C), f = ua(D, "yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C), (s !== D.xOffset || t !== D.yOffset) && (f = ua(D, "xOffset", w ? s : D.xOffset, D.xOffset, f, C), f = ua(D, "yOffset", w ? t : D.yOffset, D.yOffset, f, C)), E = "0px 0px"), (E || Fa && n && D.zOrigin) && (Ca ? (o = !0, v = Ea, E = (E || _(a, v, e, !1, "50% 50%")) + "", f = new ta(x, v, 0, 0, f, -1, C), f.b = x[v], f.plugin = h, Fa ? (m = D.zOrigin, E = E.split(" "), D.zOrigin = (E.length > 2 && (0 === m || "0px" !== E[2]) ? parseFloat(E[2]) : m) || 0, f.xs0 = f.e = E[0] + " " + (E[1] || "50%") + " 0px", f = new ta(D, "zOrigin", 0, 0, f, -1, f.n), f.b = m, f.xs0 = f.e = D.zOrigin) : f.xs0 = f.e = E) : ha(E + "", D)), o && (d._transformType = D.svg && Aa || !n && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), k && (i.scale = k), f
            }, prefix: !0
        }), ya("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), ya("borderRadius", {
            defaultValue: "0px", parser: function (a, b, c, f, g, h) {
                b = this.format(b);
                var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x,
                    y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    z = a.style;
                for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++) this.p.indexOf("border") && (y[j] = Z(y[j])), m = l = _(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = aa(a, "borderLeft", o, t), w = aa(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = aa(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
                return g
            }, prefix: !0, formatter: qa("0px 0px 0px 0px", !1, !0)
        }), ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function (a, b, c, d, f, g) {
                return va(a.style, c, this.format(_(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f)
            },
            prefix: !0,
            formatter: qa("0px 0px", !1, !0)
        }), ya("backgroundPosition", {
            defaultValue: "0 0", parser: function (a, b, c, d, f, g) {
                var h, i, j, k, l, m, n = "background-position", o = e || $(a, null),
                    q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                    r = this.format(b);
                if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = _(a, "backgroundImage").replace(D, ""), m && "none" !== m)) {
                    for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j = 2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
                    q = h.join(" ")
                }
                return this.parseComplex(a.style, q, r, f, g)
            }, formatter: ha
        }), ya("backgroundSize", {
            defaultValue: "0 0", formatter: function (a) {
                return a += "", ha(-1 === a.indexOf(" ") ? a + " " + a : a)
            }
        }), ya("perspective", {defaultValue: "0px", prefix: !0}), ya("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), ya("transformStyle", {prefix: !0}), ya("backfaceVisibility", {prefix: !0}), ya("userSelect", {prefix: !0}), ya("margin", {parser: ra("marginTop,marginRight,marginBottom,marginLeft")}), ya("padding", {parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft")}), ya("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (a, b, c, d, f, g) {
                var h, i, j;
                return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(_(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
            }
        }), ya("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), ya("autoRound,strictUnits", {
            parser: function (a, b, c, d, e) {
                return e
            }
        }), ya("border", {
            defaultValue: "0px solid #000", parser: function (a, b, c, d, f, g) {
                var h = _(a, "borderTopWidth", e, !1, "0px"), i = this.format(b).split(" "), j = i[0].replace(w, "");
                return "px" !== j && (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + _(a, "borderTopStyle", e, !1, "solid") + " " + _(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g)
            }, color: !0, formatter: function (a) {
                var b = a.split(" ");
                return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0]
            }
        }), ya("borderWidth", {parser: ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), ya("float,cssFloat,styleFloat", {
            parser: function (a, b, c, d, e, f) {
                var g = a.style, h = "cssFloat" in g ? "cssFloat" : "styleFloat";
                return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
            }
        });
        var Ua = function (a) {
            var b, c = this.t, d = c.filter || _(this.data, "filter") || "", e = this.s + this.c * a | 0;
            100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !_(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e))
        };
        ya("opacity,alpha,autoAlpha", {
            defaultValue: "1", parser: function (a, b, c, d, f, g) {
                var h = parseFloat(_(a, "opacity", e, !1, "1")), i = a.style, j = "autoAlpha" === c;
                return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === _(a, "visibility", e) && 0 !== b && (h = 0), U ? f = new ta(i, "opacity", h, b - h, f) : (f = new ta(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ua), j && (f = new ta(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
            }
        });
        var Va = function (a, b) {
            b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b))
        }, Wa = function (a) {
            if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                this.t.setAttribute("class", 0 === a ? this.b : this.e);
                for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Va(c, b.p), b = b._next;
                1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        ya("className", {
            parser: function (a, b, d, f, g, h, i) {
                var j, k, l, m, n, o = a.getAttribute("class") || "", p = a.style.cssText;
                if (g = f._classNamePT = new ta(a, d, 0, 0, g, 2), g.setRatio = Wa, g.pr = -11, c = !0, g.b = o, k = ca(a, e), l = a._gsClassPT) {
                    for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
                    l.setRatio(1)
                }
                return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = da(a, k, ca(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
            }
        });
        var Xa = function (a) {
            if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var b, c, d, e, f, g = this.t.style, h = i.transform.parse;
                if ("all" === this.e) g.cssText = "", e = !0; else for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ea : i[c].p), Va(g, c);
                e && (Va(g, Ca), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
            }
        };
        for (ya("clearProps", {
            parser: function (a, b, d, e, f) {
                return f = new ta(a, d, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
            }
        }), j = "bezier,throwProps,physicsProps,physics2D".split(","), wa = j.length; wa--;) za(j[wa]);
        j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h, j) {
            if (!a.nodeType) return !1;
            this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = $(a, ""), f = this._overwriteProps;
            var n, p, s, t, u, v, w, x, z, A = a.style;
            if (l && "" === A.zIndex && (n = _(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ca(a, e), A.cssText = t + ";" + b, n = da(a, n, ca(a)).difs, !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) {
                for (z = 3 === this._transformType, Ca ? m && (l = !0, "" === A.zIndex && (w = _(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;) s = s._next;
                x = new ta(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio = Ca ? Ta : Sa, x.data = this._transform || Ra(a, e, !0), x.tween = h, x.pr = -1, f.pop()
            }
            if (c) {
                for (; p;) {
                    for (v = p._next, s = t; s && s.pr > p.pr;) s = s._next;
                    (p._prev = s ? s._prev : u) ? p._prev._next = p : t = p, (p._next = s) ? s._prev = p : u = p, p = v
                }
                this._firstPT = t
            }
            return !0
        }, j.parse = function (a, b, c, f) {
            var g, h, j, l, m, n, o, p, s, t, u = a.style;
            for (g in b) {
                if (n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g]) c = h.parse(a, n, g, this, c, f, b); else {
                    if ("--" === g.substr(0, 2)) {
                        this._tween._propLookup[g] = this._addTween.call(this._tween, a.style, "setProperty", $(a).getPropertyValue(g) + "", n + "", g, !1, g);
                        continue
                    }
                    m = _(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = na(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = va(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = va(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ga(a, g, e), o = "px") : "left" === g || "top" === g ? (j = ba(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && ("" !== p || "lineHeight" === g) && (l || 0 === l) && j && (j = aa(a, g, j, o), "%" === p ? (j /= aa(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= aa(a, g, 1, p) : "px" !== p && (l = aa(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ta(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ta(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))
                }
                f && c && !c.plugin && (c.plugin = f)
            }
            return c
        }, j.setRatio = function (a) {
            var b, c, d, e = this._firstPT, f = 1e-6;
            if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; e;) {
                if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type) if (1 === e.type) if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2; else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3; else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4; else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5; else {
                    for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                    e.t[e.p] = c
                } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a); else e.t[e.p] = b + e.xs0;
                e = e._next
            } else for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next; else for (; e;) {
                if (2 !== e.type) if (e.r && -1 !== e.type) if (b = Math.round(e.s + e.c), e.type) {
                    if (1 === e.type) {
                        for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                        e.t[e.p] = c
                    }
                } else e.t[e.p] = b + e.xs0; else e.t[e.p] = e.e; else e.setRatio(a);
                e = e._next
            }
        }, j._enableTransforms = function (a) {
            this._transform = this._transform || Ra(this._target, e, !0), this._transformType = this._transform.svg && Aa || !a && 3 !== this._transformType ? 2 : 3
        };
        var Ya = function (a) {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        j._addLazySet = function (a, b, c) {
            var d = this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2);
            d.e = c, d.setRatio = Ya, d.data = this
        }, j._linkCSSP = function (a, b, c, d) {
            return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
        }, j._mod = function (a) {
            for (var b = this._firstPT; b;) "function" == typeof a[b.p] && a[b.p] === Math.round && (b.r = 1), b = b._next
        }, j._kill = function (b) {
            var c, d, e, f = b;
            if (b.autoAlpha || b.alpha) {
                f = {};
                for (d in b) f[d] = b[d];
                f.opacity = 1, f.autoAlpha && (f.visibility = 1)
            }
            for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;) c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next;
            return a.prototype._kill.call(this, f)
        };
        var Za = function (a, b, c) {
            var d, e, f, g;
            if (a.slice) for (e = a.length; --e > -1;) Za(a[e], b, c); else for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push(ca(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Za(f, b, c)
        };
        return g.cascadeTo = function (a, c, d) {
            var e, f, g, h, i = b.to(a, c, d), j = [i], k = [], l = [], m = [], n = b._internals.reservedProps;
            for (a = i._targets || i.target, Za(a, k, m), i.render(c, !0, !0), Za(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;) if (f = da(m[e], k[e], l[e]), f.firstMPT) {
                f = f.difs;
                for (g in d) n[g] && (f[g] = d[g]);
                h = {};
                for (g in f) h[g] = k[e][g];
                j.push(b.fromTo(m[e], c, h, f))
            }
            return j
        }, a.activate([g]), g
    }, !0), function () {
        var a = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.6.0",
            priority: -1,
            API: 2,
            init: function (a, b, c) {
                return this._tween = c, !0
            }
        }), b = function (a) {
            for (; a;) a.f || a.blob || (a.m = Math.round), a = a._next
        }, c = a.prototype;
        c._onInitAllProps = function () {
            for (var a, c, d, e = this._tween, f = e.vars.roundProps.join ? e.vars.roundProps : e.vars.roundProps.split(","), g = f.length, h = {}, i = e._propLookup.roundProps; --g > -1;) h[f[g]] = Math.round;
            for (g = f.length; --g > -1;) for (a = f[g], c = e._firstPT; c;) d = c._next, c.pg ? c.t._mod(h) : c.n === a && (2 === c.f && c.t ? b(c.t._firstPT) : (this._add(c.t, a, c.s, c.c), d && (d._prev = c._prev), c._prev ? c._prev._next = d : e._firstPT === c && (e._firstPT = d), c._next = c._prev = null, e._propLookup[a] = i)), c = d;
            return !1
        }, c._add = function (a, b, c, d) {
            this._addTween(a, b, c, c + d, b, Math.round), this._overwriteProps.push(b)
        }
    }(), function () {
        _gsScope._gsDefine.plugin({
            propName: "attr", API: 2, version: "0.6.1", init: function (a, b, c, d) {
                var e, f;
                if ("function" != typeof a.setAttribute) return !1;
                for (e in b) f = b[e], "function" == typeof f && (f = f(d, a)), this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e), this._overwriteProps.push(e);
                return !0
            }
        })
    }(), _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function (a, b, c, d) {
            "object" != typeof b && (b = {rotation: b}), this.finals = {};
            var e, f, g, h, i, j, k = b.useRadians === !0 ? 2 * Math.PI : 360, l = 1e-6;
            for (e in b) "useRadians" !== e && (h = b[e], "function" == typeof h && (h = h(d, a)), j = (h + "").split("_"), f = j[0], g = parseFloat("function" != typeof a[e] ? a[e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]()), h = this.finals[e] = "string" == typeof f && "=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2)) : Number(f) || 0, i = h - g, j.length && (f = j.join("_"), -1 !== f.indexOf("short") && (i %= k, i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)), -1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k | 0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) % k - (i / k | 0) * k)), (i > l || -l > i) && (this._addTween(a, e, g, g + i, e), this._overwriteProps.push(e)));
            return !0
        },
        set: function (a) {
            var b;
            if (1 !== a) this._super.setRatio.call(this, a); else for (b = this._firstPT; b;) b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next
        }
    })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) {
        var b, c, d, e, f = _gsScope.GreenSockGlobals || _gsScope, g = f.com.greensock, h = 2 * Math.PI,
            i = Math.PI / 2, j = g._class, k = function (b, c) {
                var d = j("easing." + b, function () {
                }, !0), e = d.prototype = new a;
                return e.constructor = d, e.getRatio = c, d
            }, l = a.register || function () {
            }, m = function (a, b, c, d, e) {
                var f = j("easing." + a, {easeOut: new b, easeIn: new c, easeInOut: new d}, !0);
                return l(f, a), f
            }, n = function (a, b, c) {
                this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
            }, o = function (b, c) {
                var d = j("easing." + b, function (a) {
                    this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
                }, !0), e = d.prototype = new a;
                return e.constructor = d, e.getRatio = c, e.config = function (a) {
                    return new d(a)
                }, d
            }, p = m("Back", o("BackOut", function (a) {
                return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
            }), o("BackIn", function (a) {
                return a * a * ((this._p1 + 1) * a - this._p1)
            }), o("BackInOut", function (a) {
                return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
            })), q = j("easing.SlowMo", function (a, b, c) {
                b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
            }, !0), r = q.prototype = new a;
        return r.constructor = q, r.getRatio = function (a) {
            var b = a + (.5 - a) * this._p;
            return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 === a ? 0 : 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
        }, q.ease = new q(.7, .7), r.config = q.config = function (a, b, c) {
            return new q(a, b, c)
        }, b = j("easing.SteppedEase", function (a, b) {
            a = a || 1, this._p1 = 1 / a, this._p2 = a + (b ? 0 : 1), this._p3 = b ? 1 : 0
        }, !0), r = b.prototype = new a, r.constructor = b, r.getRatio = function (a) {
            return 0 > a ? a = 0 : a >= 1 && (a = .999999999), ((this._p2 * a | 0) + this._p3) * this._p1
        }, r.config = b.config = function (a, c) {
            return new b(a, c)
        }, c = j("easing.ExpoScaleEase", function (a, b, c) {
            this._p1 = Math.log(b / a), this._p2 = b - a, this._p3 = a, this._ease = c
        }, !0), r = c.prototype = new a, r.constructor = c, r.getRatio = function (a) {
            return this._ease && (a = this._ease.getRatio(a)), (this._p3 * Math.exp(this._p1 * a) - this._p3) / this._p2
        }, r.config = c.config = function (a, b, d) {
            return new c(a, b, d)
        }, d = j("easing.RoughEase", function (b) {
            b = b || {};
            for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), m = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --m > -1;) c = o ? Math.random() : 1 / l * m, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : m % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
                x: c,
                y: d
            };
            for (j.sort(function (a, b) {
                return a.x - b.x
            }), h = new n(1, 1, null), m = l; --m > -1;) g = j[m], h = new n(g.x, g.y, h);
            this._prev = new n(0, 0, 0 !== h.t ? h : h.next)
        }, !0), r = d.prototype = new a, r.constructor = d, r.getRatio = function (a) {
            var b = this._prev;
            if (a > b.t) {
                for (; b.next && a >= b.t;) b = b.next;
                b = b.prev
            } else for (; b.prev && a <= b.t;) b = b.prev;
            return this._prev = b, b.v + (a - b.t) / b.gap * b.c
        }, r.config = function (a) {
            return new d(a)
        }, d.ease = new d, m("Bounce", k("BounceOut", function (a) {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }), k("BounceIn", function (a) {
            return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        }), k("BounceInOut", function (a) {
            var b = .5 > a;
            return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
        })), m("Circ", k("CircOut", function (a) {
            return Math.sqrt(1 - (a -= 1) * a)
        }), k("CircIn", function (a) {
            return -(Math.sqrt(1 - a * a) - 1)
        }), k("CircInOut", function (a) {
            return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })), e = function (b, c, d) {
            var e = j("easing." + b, function (a, b) {
                this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / h * (Math.asin(1 / this._p1) || 0), this._p2 = h / this._p2
            }, !0), f = e.prototype = new a;
            return f.constructor = e, f.getRatio = c, f.config = function (a, b) {
                return new e(a, b)
            }, e
        }, m("Elastic", e("ElasticOut", function (a) {
            return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
        }, .3), e("ElasticIn", function (a) {
            return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
        }, .3), e("ElasticInOut", function (a) {
            return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
        }, .45)), m("Expo", k("ExpoOut", function (a) {
            return 1 - Math.pow(2, -10 * a)
        }), k("ExpoIn", function (a) {
            return Math.pow(2, 10 * (a - 1)) - .001
        }), k("ExpoInOut", function (a) {
            return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
        })), m("Sine", k("SineOut", function (a) {
            return Math.sin(a * i)
        }), k("SineIn", function (a) {
            return -Math.cos(a * i) + 1
        }), k("SineInOut", function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        })), j("easing.EaseLookup", {
            find: function (b) {
                return a.map[b]
            }
        }, !0), l(f.SlowMo, "SlowMo", "ease,"), l(d, "RoughEase", "ease,"), l(b, "SteppedEase", "ease,"), p
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a, b) {
    "use strict";
    var c = {}, d = a.document, e = a.GreenSockGlobals = a.GreenSockGlobals || a;
    if (!e.TweenLite) {
        var f, g, h, i, j, k = function (a) {
            var b, c = a.split("."), d = e;
            for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
            return d
        }, l = k("com.greensock"), m = 1e-10, n = function (a) {
            var b, c = [], d = a.length;
            for (b = 0; b !== d; c.push(a[b++])) ;
            return c
        }, o = function () {
        }, p = function () {
            var a = Object.prototype.toString, b = a.call([]);
            return function (c) {
                return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
            }
        }(), q = {}, r = function (d, f, g, h) {
            this.sc = q[d] ? q[d].sc : [], q[d] = this, this.gsClass = null, this.func = g;
            var i = [];
            this.check = function (j) {
                for (var l, m, n, o, p = f.length, s = p; --p > -1;) (l = q[f[p]] || new r(f[p], [])).gsClass ? (i[p] = l.gsClass, s--) : j && l.sc.push(this);
                if (0 === s && g) {
                    if (m = ("com.greensock." + d).split("."), n = m.pop(), o = k(m.join("."))[n] = this.gsClass = g.apply(g, i), h) if (e[n] = c[n] = o, "undefined" != typeof module && module.exports) if (d === b) {
                        module.exports = c[b] = o;
                        for (p in c) o[p] = c[p]
                    } else c[b] && (c[b][n] = o); else "function" == typeof define && define.amd && define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function () {
                        return o
                    });
                    for (p = 0; p < this.sc.length; p++) this.sc[p].check()
                }
            }, this.check(!0)
        }, s = a._gsDefine = function (a, b, c, d) {
            return new r(a, b, c, d)
        }, t = l._class = function (a, b, c) {
            return b = b || function () {
            }, s(a, [], function () {
                return b
            }, c), b
        };
        s.globals = e;
        var u = [0, 0, 1, 1], v = t("easing.Ease", function (a, b, c, d) {
            this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? u.concat(b) : u
        }, !0), w = v.map = {}, x = v.register = function (a, b, c, d) {
            for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;) for (f = i[j], e = d ? t("easing." + f, null, !0) : l.easing[f] || {}, g = k.length; --g > -1;) h = k[g], w[f + "." + h] = w[h + f] = e[h] = a.getRatio ? a : a[h] || new a
        };
        for (h = v.prototype, h._calcEnd = !1, h.getRatio = function (a) {
            if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
            var b = this._type, c = this._power, d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
            return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
        }, f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], g = f.length; --g > -1;) h = f[g] + ",Power" + g, x(new v(null, null, 1, g), h, "easeOut", !0), x(new v(null, null, 2, g), h, "easeIn" + (0 === g ? ",easeNone" : "")), x(new v(null, null, 3, g), h, "easeInOut");
        w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut;
        var y = t("events.EventDispatcher", function (a) {
            this._listeners = {}, this._eventTarget = a || this
        });
        h = y.prototype, h.addEventListener = function (a, b, c, d, e) {
            e = e || 0;
            var f, g, h = this._listeners[a], k = 0;
            for (this !== i || j || i.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -1;) f = h[g], f.c === b && f.s === c ? h.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1);
            h.splice(k, 0, {c: b, s: c, up: d, pr: e})
        }, h.removeEventListener = function (a, b) {
            var c, d = this._listeners[a];
            if (d) for (c = d.length; --c > -1;) if (d[c].c === b) return void d.splice(c, 1)
        }, h.dispatchEvent = function (a) {
            var b, c, d, e = this._listeners[a];
            if (e) for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;) d = e[b], d && (d.up ? d.c.call(d.s || c, {
                type: a,
                target: c
            }) : d.c.call(d.s || c))
        };
        var z = a.requestAnimationFrame, A = a.cancelAnimationFrame, B = Date.now || function () {
            return (new Date).getTime()
        }, C = B();
        for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !z;) z = a[f[g] + "RequestAnimationFrame"], A = a[f[g] + "CancelAnimationFrame"] || a[f[g] + "CancelRequestAnimationFrame"];
        t("Ticker", function (a, b) {
            var c, e, f, g, h, k = this, l = B(), n = b !== !1 && z ? "auto" : !1, p = 500, q = 33, r = "tick",
                s = function (a) {
                    var b, d, i = B() - C;
                    i > p && (l += i - q), C += i, k.time = (C - l) / 1e3, b = k.time - h, (!c || b > 0 || a === !0) && (k.frame++, h += b + (b >= g ? .004 : g - b), d = !0), a !== !0 && (f = e(s)), d && k.dispatchEvent(r)
                };
            y.call(k), k.time = k.frame = 0, k.tick = function () {
                s(!0)
            }, k.lagSmoothing = function (a, b) {
                return arguments.length ? (p = a || 1 / m, void(q = Math.min(b, p, 0))) : 1 / m > p
            }, k.sleep = function () {
                null != f && (n && A ? A(f) : clearTimeout(f), e = o, f = null, k === i && (j = !1))
            }, k.wake = function (a) {
                null !== f ? k.sleep() : a ? l += -C + (C = B()) : k.frame > 10 && (C = B() - p + 5), e = 0 === c ? o : n && z ? z : function (a) {
                    return setTimeout(a, 1e3 * (h - k.time) + 1 | 0)
                }, k === i && (j = !0), s(2)
            }, k.fps = function (a) {
                return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void k.wake()) : c
            }, k.useRAF = function (a) {
                return arguments.length ? (k.sleep(), n = a, void k.fps(c)) : n
            }, k.fps(a), setTimeout(function () {
                "auto" === n && k.frame < 5 && "hidden" !== (d || {}).visibilityState && k.useRAF(!1)
            }, 1500)
        }), h = l.Ticker.prototype = new l.events.EventDispatcher, h.constructor = l.Ticker;
        var D = t("core.Animation", function (a, b) {
            if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, X) {
                j || i.wake();
                var c = this.vars.useFrames ? W : X;
                c.add(this, c._time), this.vars.paused && this.paused(!0)
            }
        });
        i = D.ticker = new l.Ticker, h = D.prototype, h._dirty = h._gc = h._initted = h._paused = !1, h._totalTime = h._time = 0, h._rawPrevTime = -1, h._next = h._last = h._onUpdate = h._timeline = h.timeline = null, h._paused = !1;
        var E = function () {
            j && B() - C > 2e3 && ("hidden" !== (d || {}).visibilityState || !i.lagSmoothing()) && i.wake();
            var a = setTimeout(E, 2e3);
            a.unref && a.unref()
        };
        E(), h.play = function (a, b) {
            return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
        }, h.pause = function (a, b) {
            return null != a && this.seek(a, b), this.paused(!0)
        }, h.resume = function (a, b) {
            return null != a && this.seek(a, b), this.paused(!1)
        }, h.seek = function (a, b) {
            return this.totalTime(Number(a), b !== !1)
        }, h.restart = function (a, b) {
            return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
        }, h.reverse = function (a, b) {
            return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
        }, h.render = function (a, b, c) {
        }, h.invalidate = function () {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        }, h.isActive = function () {
            var a, b = this._timeline, c = this._startTime;
            return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale - 1e-7
        }, h._enabled = function (a, b) {
            return j || i.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
        }, h._kill = function (a, b) {
            return this._enabled(!1, !1)
        }, h.kill = function (a, b) {
            return this._kill(a, b), this
        }, h._uncache = function (a) {
            for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
            return this
        }, h._swapSelfInParams = function (a) {
            for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
            return c
        }, h._callback = function (a) {
            var b = this.vars, c = b[a], d = b[a + "Params"], e = b[a + "Scope"] || b.callbackScope || this,
                f = d ? d.length : 0;
            switch (f) {
                case 0:
                    c.call(e);
                    break;
                case 1:
                    c.call(e, d[0]);
                    break;
                case 2:
                    c.call(e, d[0], d[1]);
                    break;
                default:
                    c.apply(e, d)
            }
        }, h.eventCallback = function (a, b, c, d) {
            if ("on" === (a || "").substr(0, 2)) {
                var e = this.vars;
                if (1 === arguments.length) return e[a];
                null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = p(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
            }
            return this
        }, h.delay = function (a) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
        }, h.duration = function (a) {
            return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, h.totalDuration = function (a) {
            return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
        }, h.time = function (a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
        }, h.totalTime = function (a, b, c) {
            if (j || i.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var d = this._totalDuration, e = this._timeline;
                    if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline) for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (J.length && Z(), this.render(a, b, !1), J.length && Z())
            }
            return this
        }, h.progress = h.totalProgress = function (a, b) {
            var c = this.duration();
            return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
        }, h.startTime = function (a) {
            return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
        }, h.endTime = function (a) {
            return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        }, h.timeScale = function (a) {
            if (!arguments.length) return this._timeScale;
            var b, c;
            for (a = a || m, this._timeline && this._timeline.smoothChildTiming && (b = this._pauseTime, c = b || 0 === b ? b : this._timeline.totalTime(), this._startTime = c - (c - this._startTime) * this._timeScale / a), this._timeScale = a, c = this.timeline; c && c.timeline;) c._dirty = !0, c.totalDuration(), c = c.timeline;
            return this
        }, h.reversed = function (a) {
            return arguments.length ? (a != this._reversed && (this._reversed = a,
                this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, h.paused = function (a) {
            if (!arguments.length) return this._paused;
            var b, c, d = this._timeline;
            return a != this._paused && d && (j || a || i.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
        };
        var F = t("core.SimpleTimeline", function (a) {
            D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        h = F.prototype = new D, h.constructor = F, h.kill()._gc = !1, h._first = h._last = h._recent = null, h._sortChildren = !1, h.add = h.insert = function (a, b, c, d) {
            var e, f;
            if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren) for (f = a._startTime; e && e._startTime > f;) e = e._prev;
            return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
        }, h._remove = function (a, b) {
            return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        }, h.render = function (a, b, c) {
            var d, e = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused && !e._gc) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
        }, h.rawTime = function () {
            return j || i.wake(), this._totalTime
        };
        var G = t("TweenLite", function (b, c, d) {
            if (D.call(this, c, d), this.render = G.prototype.render, null == b) throw"Cannot tween a null target.";
            this.target = b = "string" != typeof b ? b : G.selector(b) || b;
            var e, f, g,
                h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                i = this.vars.overwrite;
            if (this._overwrite = i = null == i ? V[G.defaultOverwrite] : "number" == typeof i ? i >> 0 : V[i], (h || b instanceof Array || b.push && p(b)) && "number" != typeof b[0]) for (this._targets = g = n(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(n(f))) : (this._siblings[e] = $(f, this, !1), 1 === i && this._siblings[e].length > 1 && aa(f, this, null, 1, this._siblings[e])) : (f = g[e--] = G.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1); else this._propLookup = {}, this._siblings = $(b, this, !1), 1 === i && this._siblings.length > 1 && aa(b, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -m, this.render(Math.min(0, -this._delay)))
        }, !0), H = function (b) {
            return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
        }, I = function (a, b) {
            var c, d = {};
            for (c in a) U[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!R[c] || R[c] && R[c]._autoCSS) || (d[c] = a[c], delete a[c]);
            a.css = d
        };
        h = G.prototype = new D, h.constructor = G, h.kill()._gc = !1, h.ratio = 0, h._firstPT = h._targets = h._overwrittenProps = h._startAt = null, h._notifyPluginsOfEnabled = h._lazy = !1, G.version = "1.20.4", G.defaultEase = h._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = i, G.autoSleep = 120, G.lagSmoothing = function (a, b) {
            i.lagSmoothing(a, b)
        }, G.selector = a.$ || a.jQuery || function (b) {
            var c = a.$ || a.jQuery;
            return c ? (G.selector = c, c(b)) : "undefined" == typeof d ? b : d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
        };
        var J = [], K = {}, L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, M = /[\+-]=-?[\.\d]/,
            N = function (a) {
                for (var b, c = this._firstPT, d = 1e-6; c;) b = c.blob ? 1 === a && null != this.end ? this.end : a ? this.join("") : this.start : c.c * a + c.s, c.m ? b = c.m(b, this._target || c.t) : d > b && b > -d && !c.blob && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next
            }, O = function (a, b, c, d) {
                var e, f, g, h, i, j, k, l = [], m = 0, n = "", o = 0;
                for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(L) || [], f = b.match(L) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++) k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
                    _next: l._firstPT,
                    t: l,
                    p: l.length - 1,
                    s: g,
                    c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
                    f: 0,
                    m: o && 4 > o ? Math.round : 0
                }), m += k.length;
                return n += b.substr(m), n && l.push(n), l.setRatio = N, M.test(b) && (l.end = null), l
            }, P = function (a, b, c, d, e, f, g, h, i) {
                "function" == typeof d && (d = d(i || 0, a));
                var j, k = typeof a[b],
                    l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3),
                    m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b], n = "string" == typeof d && "=" === d.charAt(1),
                    o = {
                        t: a,
                        p: b,
                        s: m,
                        f: "function" === k,
                        pg: 0,
                        n: e || b,
                        m: f ? "function" == typeof f ? f : Math.round : 0,
                        pr: 0,
                        c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0
                    };
                return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = O(m, n ? parseFloat(o.s) + o.c + (o.s + "").replace(/[0-9\-\.]/g, "") : d, h || G.defaultStringFilter, o), o = {
                    t: j,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: e || b,
                    pr: 0,
                    m: 0
                }) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0
            }, Q = G._internals = {isArray: p, isSelector: H, lazyTweens: J, blobDif: O}, R = G._plugins = {},
            S = Q.tweenLookup = {}, T = 0, U = Q.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
                stringFilter: 1,
                id: 1,
                yoyoEase: 1
            }, V = {none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0},
            W = D._rootFramesTimeline = new F, X = D._rootTimeline = new F, Y = 30, Z = Q.lazyRender = function () {
                var a, b = J.length;
                for (K = {}; --b > -1;) a = J[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
                J.length = 0
            };
        X._startTime = i.time, W._startTime = i.frame, X._active = W._active = !0, setTimeout(Z, 1), D._updateRoot = G.render = function () {
            var a, b, c;
            if (J.length && Z(), X.render((i.time - X._startTime) * X._timeScale, !1, !1), W.render((i.frame - W._startTime) * W._timeScale, !1, !1), J.length && Z(), i.frame >= Y) {
                Y = i.frame + (parseInt(G.autoSleep, 10) || 120);
                for (c in S) {
                    for (b = S[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
                    0 === b.length && delete S[c]
                }
                if (c = X._first, (!c || c._paused) && G.autoSleep && !W._first && 1 === i._listeners.tick.length) {
                    for (; c && c._paused;) c = c._next;
                    c || i.sleep()
                }
            }
        }, i.addEventListener("tick", D._updateRoot);
        var $ = function (a, b, c) {
            var d, e, f = a._gsTweenID;
            if (S[f || (a._gsTweenID = f = "t" + T++)] || (S[f] = {
                target: a,
                tweens: []
            }), b && (d = S[f].tweens, d[e = d.length] = b, c)) for (; --e > -1;) d[e] === b && d.splice(e, 1);
            return S[f].tweens
        }, _ = function (a, b, c, d) {
            var e, f, g = a.vars.onOverwrite;
            return g && (e = g(a, b, c, d)), g = G.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
        }, aa = function (a, b, c, d, e) {
            var f, g, h, i;
            if (1 === d || d >= 4) {
                for (i = e.length, f = 0; i > f; f++) if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0); else if (5 === d) break;
                return g
            }
            var j, k = b._startTime + m, l = [], n = 0, o = 0 === b._duration;
            for (f = e.length; --f > -1;) (h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || ba(b, 0, o), 0 === ba(h, j, o) && (l[n++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (l[n++] = h)));
            for (f = n; --f > -1;) if (h = l[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
                if (2 !== d && !_(h, b)) continue;
                h._enabled(!1, !1) && (g = !0)
            }
            return g
        }, ba = function (a, b, c) {
            for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
                d = d._timeline
            }
            return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * m > f - b ? m : (f += a.totalDuration() / a._timeScale / e) > b + m ? 0 : f - b - m
        };
        h._init = function () {
            var a, b, c, d, e, f, g = this.vars, h = this._overwrittenProps, i = this._duration,
                j = !!g.immediateRender, k = g.ease;
            if (g.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
                for (d in g.startAt) e[d] = g.startAt[d];
                if (e.data = "isStart", e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, e.onUpdate = g.onUpdate, e.onUpdateParams = g.onUpdateParams, e.onUpdateScope = g.onUpdateScope || g.callbackScope || this, this._startAt = G.to(this.target, 0, e), j) if (this._time > 0) this._startAt = null; else if (0 !== i) return
            } else if (g.runBackwards && 0 !== i) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else {
                0 !== this._time && (j = !1), c = {};
                for (d in g) U[d] && "autoCSS" !== d || (c[d] = g[d]);
                if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = G.to(this.target, 0, c), j) {
                    if (0 === this._time) return
                } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
            }
            if (this._ease = k = k ? k instanceof v ? k : "function" == typeof k ? new v(k, g.easeParams) : w[k] || G.defaultEase : G.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (f = this._targets.length, a = 0; f > a; a++) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0); else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
            if (b && G._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards) for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
            this._onUpdate = g.onUpdate, this._initted = !0
        }, h._initProps = function (b, c, d, e, f) {
            var g, h, i, j, k, l;
            if (null == b) return !1;
            K[b._gsTweenID] && Z(), this.vars.css || b.style && b !== a && b.nodeType && R.css && this.vars.autoCSS !== !1 && I(this.vars, b);
            for (g in this.vars) if (l = this.vars[g], U[g]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this)); else if (R[g] && (j = new R[g])._onInitTween(b, this.vars[g], this, f)) {
                for (this._firstPT = k = {
                    _next: this._firstPT,
                    t: j,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: g,
                    pg: 1,
                    pr: j._priority,
                    m: 0
                }, h = j._overwriteProps.length; --h > -1;) c[j._overwriteProps[h]] = this._firstPT;
                (j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k)
            } else c[g] = P.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
            return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && aa(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), i)
        }, h.render = function (a, b, c) {
            var d, e, f, g, h = this._time, i = this._duration, j = this._rawPrevTime;
            if (a >= i - 1e-7 && a >= 0) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === m && "isPause" !== this.data) && j !== a && (c = !0, j > m && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : m); else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== m || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : m)), (!this._initted || this._startAt && this._startAt.progress()) && (c = !0); else if (this._totalTime = this._time = a, this._easeType) {
                var k = a / i, l = this._easeType, n = this._easePower;
                (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === n ? k *= k : 2 === n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2
            } else this.ratio = this._ease.getRatio(a / i);
            if (this._time !== h || c) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, J.push(this), void(this._lazy = [a, b]);
                    this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, !0, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, !0, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, !0, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === m && g !== m && (this._rawPrevTime = 0))
            }
        }, h._kill = function (a, b, c) {
            if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
            b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b;
            var d, e, f, g, h, i, j, k, l,
                m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
            if ((p(b) || H(b)) && "number" != typeof b[0]) for (d = b.length; --d > -1;) this._kill(a, b[d], c) && (i = !0); else {
                if (this._targets) {
                    for (d = this._targets.length; --d > -1;) if (b === this._targets[d]) {
                        h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                        break
                    }
                } else {
                    if (b !== this.target) return !1;
                    h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                }
                if (h) {
                    if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) {
                        for (f in j) h[f] && (l || (l = []), l.push(f));
                        if ((l || !a) && !_(this, c, b, l)) return !1
                    }
                    for (f in j) (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return i
        }, h.invalidate = function () {
            return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -m, this.render(Math.min(0, -this._delay))), this
        }, h._enabled = function (a, b) {
            if (j || i.wake(), a && this._gc) {
                var c, d = this._targets;
                if (d) for (c = d.length; --c > -1;) this._siblings[c] = $(d[c], this, !0); else this._siblings = $(this.target, this, !0)
            }
            return D.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? G._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
        }, G.to = function (a, b, c) {
            return new G(a, b, c)
        }, G.from = function (a, b, c) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c)
        }, G.fromTo = function (a, b, c, d) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a, b, d)
        }, G.delayedCall = function (a, b, c, d, e) {
            return new G(b, 0, {
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                callbackScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                immediateRender: !1,
                lazy: !1,
                useFrames: e,
                overwrite: 0
            })
        }, G.set = function (a, b) {
            return new G(a, 0, b)
        }, G.getTweensOf = function (a, b) {
            if (null == a) return [];
            a = "string" != typeof a ? a : G.selector(a) || a;
            var c, d, e, f;
            if ((p(a) || H(a)) && "number" != typeof a[0]) {
                for (c = a.length, d = []; --c > -1;) d = d.concat(G.getTweensOf(a[c], b));
                for (c = d.length; --c > -1;) for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
            } else if (a._gsTweenID) for (d = $(a).concat(), c = d.length; --c > -1;) (d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
            return d || []
        }, G.killTweensOf = G.killDelayedCallsTo = function (a, b, c) {
            "object" == typeof b && (c = b, b = !1);
            for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
        };
        var ca = t("plugins.TweenPlugin", function (a, b) {
            this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = ca.prototype
        }, !0);
        if (h = ca.prototype, ca.version = "1.19.0", ca.API = 2, h._firstPT = null, h._addTween = P, h.setRatio = N, h._kill = function (a) {
            var b, c = this._overwriteProps, d = this._firstPT;
            if (null != a[this._propName]) this._overwriteProps = []; else for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
            for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
            return !1
        }, h._mod = h._roundProps = function (a) {
            for (var b, c = this._firstPT; c;) b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b), c = c._next
        }, G._onPluginEvent = function (a, b) {
            var c, d, e, f, g, h = b._firstPT;
            if ("_onInitAllProps" === a) {
                for (; h;) {
                    for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
                    (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h, (h._next = d) ? d._prev = h : f = h, h = g
                }
                h = b._firstPT = e
            }
            for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
            return c
        }, ca.activate = function (a) {
            for (var b = a.length; --b > -1;) a[b].API === ca.API && (R[(new a[b])._propName] = a[b]);
            return !0
        }, s.plugin = function (a) {
            if (!(a && a.propName && a.init && a.API)) throw"illegal plugin definition.";
            var b, c = a.propName, d = a.priority || 0, e = a.overwriteProps, f = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_mod",
                mod: "_mod",
                initAll: "_onInitAllProps"
            }, g = t("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () {
                ca.call(this, c, d), this._overwriteProps = e || []
            }, a.global === !0), h = g.prototype = new ca(c);
            h.constructor = g, g.API = a.API;
            for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
            return g.version = a.version, ca.activate([g]), g
        }, f = a._gsQueue) {
            for (g = 0; g < f.length; g++) f[g]();
            for (h in q) q[h].func || a.console.log("GSAP encountered missing dependency: " + h)
        }
        j = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");


//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function (a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b()
}(this, function () {
    "use strict";

    function a() {
        return sd.apply(null, arguments)
    }

    function b(a) {
        sd = a
    }

    function c(a) {
        return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a)
    }

    function d(a) {
        return null != a && "[object Object]" === Object.prototype.toString.call(a)
    }

    function e(a) {
        var b;
        for (b in a) return !1;
        return !0
    }

    function f(a) {
        return void 0 === a
    }

    function g(a) {
        return "number" == typeof a || "[object Number]" === Object.prototype.toString.call(a)
    }

    function h(a) {
        return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
    }

    function i(a, b) {
        var c, d = [];
        for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
        return d
    }

    function j(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function k(a, b) {
        for (var c in b) j(b, c) && (a[c] = b[c]);
        return j(b, "toString") && (a.toString = b.toString), j(b, "valueOf") && (a.valueOf = b.valueOf), a
    }

    function l(a, b, c, d) {
        return sb(a, b, c, d, !0).utc()
    }

    function m() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }
    }

    function n(a) {
        return null == a._pf && (a._pf = m()), a._pf
    }

    function o(a) {
        if (null == a._isValid) {
            var b = n(a), c = ud.call(b.parsedDateParts, function (a) {
                    return null != a
                }),
                d = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c);
            if (a._strict && (d = d && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour), null != Object.isFrozen && Object.isFrozen(a)) return d;
            a._isValid = d
        }
        return a._isValid
    }

    function p(a) {
        var b = l(NaN);
        return null != a ? k(n(b), a) : n(b).userInvalidated = !0, b
    }

    function q(a, b) {
        var c, d, e;
        if (f(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), f(b._i) || (a._i = b._i), f(b._f) || (a._f = b._f), f(b._l) || (a._l = b._l), f(b._strict) || (a._strict = b._strict), f(b._tzm) || (a._tzm = b._tzm), f(b._isUTC) || (a._isUTC = b._isUTC), f(b._offset) || (a._offset = b._offset), f(b._pf) || (a._pf = n(b)), f(b._locale) || (a._locale = b._locale), vd.length > 0) for (c = 0; c < vd.length; c++) d = vd[c], e = b[d], f(e) || (a[d] = e);
        return a
    }

    function r(b) {
        q(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), wd === !1 && (wd = !0, a.updateOffset(this), wd = !1)
    }

    function s(a) {
        return a instanceof r || null != a && null != a._isAMomentObject
    }

    function t(a) {
        return a < 0 ? Math.ceil(a) || 0 : Math.floor(a)
    }

    function u(a) {
        var b = +a, c = 0;
        return 0 !== b && isFinite(b) && (c = t(b)), c
    }

    function v(a, b, c) {
        var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
        for (d = 0; d < e; d++) (c && a[d] !== b[d] || !c && u(a[d]) !== u(b[d])) && g++;
        return g + f
    }

    function w(b) {
        a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b)
    }

    function x(b, c) {
        var d = !0;
        return k(function () {
            if (null != a.deprecationHandler && a.deprecationHandler(null, b), d) {
                for (var e, f = [], g = 0; g < arguments.length; g++) {
                    if (e = "", "object" == typeof arguments[g]) {
                        e += "\n[" + g + "] ";
                        for (var h in arguments[0]) e += h + ": " + arguments[0][h] + ", ";
                        e = e.slice(0, -2)
                    } else e = arguments[g];
                    f.push(e)
                }
                w(b + "\nArguments: " + Array.prototype.slice.call(f).join("") + "\n" + (new Error).stack), d = !1
            }
            return c.apply(this, arguments)
        }, c)
    }

    function y(b, c) {
        null != a.deprecationHandler && a.deprecationHandler(b, c), xd[b] || (w(c), xd[b] = !0)
    }

    function z(a) {
        return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a)
    }

    function A(a) {
        var b, c;
        for (c in a) b = a[c], z(b) ? this[c] = b : this["_" + c] = b;
        this._config = a, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }

    function B(a, b) {
        var c, e = k({}, a);
        for (c in b) j(b, c) && (d(a[c]) && d(b[c]) ? (e[c] = {}, k(e[c], a[c]), k(e[c], b[c])) : null != b[c] ? e[c] = b[c] : delete e[c]);
        for (c in a) j(a, c) && !j(b, c) && d(a[c]) && (e[c] = k({}, e[c]));
        return e
    }

    function C(a) {
        null != a && this.set(a)
    }

    function D(a, b, c) {
        var d = this._calendar[a] || this._calendar.sameElse;
        return z(d) ? d.call(b, c) : d
    }

    function E(a) {
        var b = this._longDateFormat[a], c = this._longDateFormat[a.toUpperCase()];
        return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
            return a.slice(1)
        }), this._longDateFormat[a])
    }

    function F() {
        return this._invalidDate
    }

    function G(a) {
        return this._ordinal.replace("%d", a)
    }

    function H(a, b, c, d) {
        var e = this._relativeTime[c];
        return z(e) ? e(a, b, c, d) : e.replace(/%d/i, a)
    }

    function I(a, b) {
        var c = this._relativeTime[a > 0 ? "future" : "past"];
        return z(c) ? c(b) : c.replace(/%s/i, b)
    }

    function J(a, b) {
        var c = a.toLowerCase();
        Hd[c] = Hd[c + "s"] = Hd[b] = a
    }

    function K(a) {
        return "string" == typeof a ? Hd[a] || Hd[a.toLowerCase()] : void 0
    }

    function L(a) {
        var b, c, d = {};
        for (c in a) j(a, c) && (b = K(c), b && (d[b] = a[c]));
        return d
    }

    function M(a, b) {
        Id[a] = b
    }

    function N(a) {
        var b = [];
        for (var c in a) b.push({unit: c, priority: Id[c]});
        return b.sort(function (a, b) {
            return a.priority - b.priority
        }), b
    }

    function O(b, c) {
        return function (d) {
            return null != d ? (Q(this, b, d), a.updateOffset(this, c), this) : P(this, b)
        }
    }

    function P(a, b) {
        return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN
    }

    function Q(a, b, c) {
        a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
    }

    function R(a) {
        return a = K(a), z(this[a]) ? this[a]() : this
    }

    function S(a, b) {
        if ("object" == typeof a) {
            a = L(a);
            for (var c = N(a), d = 0; d < c.length; d++) this[c[d].unit](a[c[d].unit])
        } else if (a = K(a), z(this[a])) return this[a](b);
        return this
    }

    function T(a, b, c) {
        var d = "" + Math.abs(a), e = b - d.length, f = a >= 0;
        return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d
    }

    function U(a, b, c, d) {
        var e = d;
        "string" == typeof d && (e = function () {
            return this[d]()
        }), a && (Md[a] = e), b && (Md[b[0]] = function () {
            return T(e.apply(this, arguments), b[1], b[2])
        }), c && (Md[c] = function () {
            return this.localeData().ordinal(e.apply(this, arguments), a)
        })
    }

    function V(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }

    function W(a) {
        var b, c, d = a.match(Jd);
        for (b = 0, c = d.length; b < c; b++) Md[d[b]] ? d[b] = Md[d[b]] : d[b] = V(d[b]);
        return function (b) {
            var e, f = "";
            for (e = 0; e < c; e++) f += z(d[e]) ? d[e].call(b, a) : d[e];
            return f
        }
    }

    function X(a, b) {
        return a.isValid() ? (b = Y(b, a.localeData()), Ld[b] = Ld[b] || W(b), Ld[b](a)) : a.localeData().invalidDate()
    }

    function Y(a, b) {
        function c(a) {
            return b.longDateFormat(a) || a
        }

        var d = 5;
        for (Kd.lastIndex = 0; d >= 0 && Kd.test(a);) a = a.replace(Kd, c), Kd.lastIndex = 0, d -= 1;
        return a
    }

    function Z(a, b, c) {
        ce[a] = z(b) ? b : function (a, d) {
            return a && c ? c : b
        }
    }

    function $(a, b) {
        return j(ce, a) ? ce[a](b._strict, b._locale) : new RegExp(_(a))
    }

    function _(a) {
        return aa(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
            return b || c || d || e
        }))
    }

    function aa(a) {
        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function ba(a, b) {
        var c, d = b;
        for ("string" == typeof a && (a = [a]), g(b) && (d = function (a, c) {
            c[b] = u(a)
        }), c = 0; c < a.length; c++) de[a[c]] = d
    }

    function ca(a, b) {
        ba(a, function (a, c, d, e) {
            d._w = d._w || {}, b(a, d._w, d, e)
        })
    }

    function da(a, b, c) {
        null != b && j(de, a) && de[a](b, c._a, c, a)
    }

    function ea(a, b) {
        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
    }

    function fa(a, b) {
        return a ? c(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || oe).test(b) ? "format" : "standalone"][a.month()] : c(this._months) ? this._months : this._months.standalone
    }

    function ga(a, b) {
        return a ? c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[oe.test(b) ? "format" : "standalone"][a.month()] : c(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }

    function ha(a, b, c) {
        var d, e, f, g = a.toLocaleLowerCase();
        if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; d < 12; ++d) f = l([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
        return c ? "MMM" === b ? (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : null) : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : null) : "MMM" === b ? (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : null)) : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : null))
    }

    function ia(a, b, c) {
        var d, e, f;
        if (this._monthsParseExact) return ha.call(this, a, b, c);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; d < 12; d++) {
            if (e = l([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
            if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
            if (!c && this._monthsParse[d].test(a)) return d
        }
    }

    function ja(a, b) {
        var c;
        if (!a.isValid()) return a;
        if ("string" == typeof b) if (/^\d+$/.test(b)) b = u(b); else if (b = a.localeData().monthsParse(b), !g(b)) return a;
        return c = Math.min(a.date(), ea(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a
    }

    function ka(b) {
        return null != b ? (ja(this, b), a.updateOffset(this, !0), this) : P(this, "Month")
    }

    function la() {
        return ea(this.year(), this.month())
    }

    function ma(a) {
        return this._monthsParseExact ? (j(this, "_monthsRegex") || oa.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (j(this, "_monthsShortRegex") || (this._monthsShortRegex = re), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }

    function na(a) {
        return this._monthsParseExact ? (j(this, "_monthsRegex") || oa.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (j(this, "_monthsRegex") || (this._monthsRegex = se), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex)
    }

    function oa() {
        function a(a, b) {
            return b.length - a.length
        }

        var b, c, d = [], e = [], f = [];
        for (b = 0; b < 12; b++) c = l([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, ""));
        for (d.sort(a), e.sort(a), f.sort(a), b = 0; b < 12; b++) d[b] = aa(d[b]), e[b] = aa(e[b]);
        for (b = 0; b < 24; b++) f[b] = aa(f[b]);
        this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i")
    }

    function pa(a) {
        return qa(a) ? 366 : 365
    }

    function qa(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }

    function ra() {
        return qa(this.year())
    }

    function sa(a, b, c, d, e, f, g) {
        var h = new Date(a, b, c, d, e, f, g);
        return a < 100 && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h
    }

    function ta(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        return a < 100 && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b
    }

    function ua(a, b, c) {
        var d = 7 + b - c, e = (7 + ta(a, 0, d).getUTCDay() - b) % 7;
        return -e + d - 1
    }

    function va(a, b, c, d, e) {
        var f, g, h = (7 + c - d) % 7, i = ua(a, d, e), j = 1 + 7 * (b - 1) + h + i;
        return j <= 0 ? (f = a - 1, g = pa(f) + j) : j > pa(a) ? (f = a + 1, g = j - pa(a)) : (f = a, g = j), {
            year: f,
            dayOfYear: g
        }
    }

    function wa(a, b, c) {
        var d, e, f = ua(a.year(), b, c), g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
        return g < 1 ? (e = a.year() - 1, d = g + xa(e, b, c)) : g > xa(a.year(), b, c) ? (d = g - xa(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), {
            week: d,
            year: e
        }
    }

    function xa(a, b, c) {
        var d = ua(a, b, c), e = ua(a + 1, b, c);
        return (pa(a) - d + e) / 7
    }

    function ya(a) {
        return wa(a, this._week.dow, this._week.doy).week
    }

    function za() {
        return this._week.dow
    }

    function Aa() {
        return this._week.doy
    }

    function Ba(a) {
        var b = this.localeData().week(this);
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function Ca(a) {
        var b = wa(this, 1, 4).week;
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function Da(a, b) {
        return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10)
    }

    function Ea(a, b) {
        return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a
    }

    function Fa(a, b) {
        return a ? c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()] : c(this._weekdays) ? this._weekdays : this._weekdays.standalone
    }

    function Ga(a) {
        return a ? this._weekdaysShort[a.day()] : this._weekdaysShort
    }

    function Ha(a) {
        return a ? this._weekdaysMin[a.day()] : this._weekdaysMin
    }

    function Ia(a, b, c) {
        var d, e, f, g = a.toLocaleLowerCase();
        if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; d < 7; ++d) f = l([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
        return c ? "dddd" === b ? (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : null) : "ddd" === b ? (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : null) : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null) : "dddd" === b ? (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null))) : "ddd" === b ? (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null))) : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : null)))
    }

    function Ja(a, b, c) {
        var d, e, f;
        if (this._weekdaysParseExact) return Ia.call(this, a, b, c);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; d < 7; d++) {
            if (e = l([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;
            if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
            if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
            if (!c && this._weekdaysParse[d].test(a)) return d
        }
    }

    function Ka(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != a ? (a = Da(a, this.localeData()), this.add(a - b, "d")) : b
    }

    function La(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == a ? b : this.add(a - b, "d")
    }

    function Ma(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        if (null != a) {
            var b = Ea(a, this.localeData());
            return this.day(this.day() % 7 ? b : b - 7)
        }
        return this.day() || 7
    }

    function Na(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (j(this, "_weekdaysRegex") || (this._weekdaysRegex = ye), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }

    function Oa(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (j(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = ze), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }

    function Pa(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (j(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ae), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }

    function Qa() {
        function a(a, b) {
            return b.length - a.length
        }

        var b, c, d, e, f, g = [], h = [], i = [], j = [];
        for (b = 0; b < 7; b++) c = l([2e3, 1]).day(b), d = this.weekdaysMin(c, ""), e = this.weekdaysShort(c, ""), f = this.weekdays(c, ""), g.push(d), h.push(e), i.push(f), j.push(d), j.push(e), j.push(f);
        for (g.sort(a), h.sort(a), i.sort(a), j.sort(a), b = 0; b < 7; b++) h[b] = aa(h[b]), i[b] = aa(i[b]), j[b] = aa(j[b]);
        this._weekdaysRegex = new RegExp("^(" + j.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i")
    }

    function Ra() {
        return this.hours() % 12 || 12
    }

    function Sa() {
        return this.hours() || 24
    }

    function Ta(a, b) {
        U(a, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), b)
        })
    }

    function Ua(a, b) {
        return b._meridiemParse
    }

    function Va(a) {
        return "p" === (a + "").toLowerCase().charAt(0)
    }

    function Wa(a, b, c) {
        return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
    }

    function Xa(a) {
        return a ? a.toLowerCase().replace("_", "-") : a
    }

    function Ya(a) {
        for (var b, c, d, e, f = 0; f < a.length;) {
            for (e = Xa(a[f]).split("-"), b = e.length, c = Xa(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                if (d = Za(e.slice(0, b).join("-"))) return d;
                if (c && c.length >= b && v(e, c, !0) >= b - 1) break;
                b--
            }
            f++
        }
        return null
    }

    function Za(a) {
        var b = null;
        if (!Fe[a] && "undefined" != typeof module && module && module.exports) try {
            b = Be._abbr, require("./locale/" + a), $a(b)
        } catch (a) {
        }
        return Fe[a]
    }

    function $a(a, b) {
        var c;
        return a && (c = f(b) ? bb(a) : _a(a, b), c && (Be = c)), Be._abbr
    }

    function _a(a, b) {
        if (null !== b) {
            var c = Ee;
            if (b.abbr = a, null != Fe[a]) y("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = Fe[a]._config; else if (null != b.parentLocale) {
                if (null == Fe[b.parentLocale]) return Ge[b.parentLocale] || (Ge[b.parentLocale] = []), Ge[b.parentLocale].push({
                    name: a,
                    config: b
                }), null;
                c = Fe[b.parentLocale]._config
            }
            return Fe[a] = new C(B(c, b)), Ge[a] && Ge[a].forEach(function (a) {
                _a(a.name, a.config)
            }), $a(a), Fe[a]
        }
        return delete Fe[a], null
    }

    function ab(a, b) {
        if (null != b) {
            var c, d = Ee;
            null != Fe[a] && (d = Fe[a]._config), b = B(d, b), c = new C(b), c.parentLocale = Fe[a], Fe[a] = c, $a(a)
        } else null != Fe[a] && (null != Fe[a].parentLocale ? Fe[a] = Fe[a].parentLocale : null != Fe[a] && delete Fe[a]);
        return Fe[a]
    }

    function bb(a) {
        var b;
        if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return Be;
        if (!c(a)) {
            if (b = Za(a)) return b;
            a = [a]
        }
        return Ya(a)
    }

    function cb() {
        return Ad(Fe)
    }

    function db(a) {
        var b, c = a._a;
        return c && n(a).overflow === -2 && (b = c[fe] < 0 || c[fe] > 11 ? fe : c[ge] < 1 || c[ge] > ea(c[ee], c[fe]) ? ge : c[he] < 0 || c[he] > 24 || 24 === c[he] && (0 !== c[ie] || 0 !== c[je] || 0 !== c[ke]) ? he : c[ie] < 0 || c[ie] > 59 ? ie : c[je] < 0 || c[je] > 59 ? je : c[ke] < 0 || c[ke] > 999 ? ke : -1, n(a)._overflowDayOfYear && (b < ee || b > ge) && (b = ge), n(a)._overflowWeeks && b === -1 && (b = le), n(a)._overflowWeekday && b === -1 && (b = me), n(a).overflow = b), a
    }

    function eb(a) {
        var b, c, d, e, f, g, h = a._i, i = He.exec(h) || Ie.exec(h);
        if (i) {
            for (n(a).iso = !0, b = 0, c = Ke.length; b < c; b++) if (Ke[b][1].exec(i[1])) {
                e = Ke[b][0], d = Ke[b][2] !== !1;
                break
            }
            if (null == e) return void(a._isValid = !1);
            if (i[3]) {
                for (b = 0, c = Le.length; b < c; b++) if (Le[b][1].exec(i[3])) {
                    f = (i[2] || " ") + Le[b][0];
                    break
                }
                if (null == f) return void(a._isValid = !1)
            }
            if (!d && null != f) return void(a._isValid = !1);
            if (i[4]) {
                if (!Je.exec(i[4])) return void(a._isValid = !1);
                g = "Z"
            }
            a._f = e + (f || "") + (g || ""), lb(a)
        } else a._isValid = !1
    }

    function fb(a) {
        var b, c, d, e, f, g, h, i, j = {
            " GMT": " +0000",
            " EDT": " -0400",
            " EST": " -0500",
            " CDT": " -0500",
            " CST": " -0600",
            " MDT": " -0600",
            " MST": " -0700",
            " PDT": " -0700",
            " PST": " -0800"
        }, k = "YXWVUTSRQPONZABCDEFGHIKLM";
        if (b = a._i.replace(/\([^\)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s|\s$/g, ""), c = Ne.exec(b)) {
            if (d = c[1] ? "ddd" + (5 === c[1].length ? ", " : " ") : "", e = "D MMM " + (c[2].length > 10 ? "YYYY " : "YY "), f = "HH:mm" + (c[4] ? ":ss" : ""), c[1]) {
                var l = new Date(c[2]), m = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][l.getDay()];
                if (c[1].substr(0, 3) !== m) return n(a).weekdayMismatch = !0, void(a._isValid = !1)
            }
            switch (c[5].length) {
                case 2:
                    0 === i ? h = " +0000" : (i = k.indexOf(c[5][1].toUpperCase()) - 12, h = (i < 0 ? " -" : " +") + ("" + i).replace(/^-?/, "0").match(/..$/)[0] + "00");
                    break;
                case 4:
                    h = j[c[5]];
                    break;
                default:
                    h = j[" GMT"]
            }
            c[5] = h, a._i = c.splice(1).join(""), g = " ZZ", a._f = d + e + f + g, lb(a), n(a).rfc2822 = !0
        } else a._isValid = !1
    }

    function gb(b) {
        var c = Me.exec(b._i);
        return null !== c ? void(b._d = new Date(+c[1])) : (eb(b), void(b._isValid === !1 && (delete b._isValid, fb(b), b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b)))))
    }

    function hb(a, b, c) {
        return null != a ? a : null != b ? b : c
    }

    function ib(b) {
        var c = new Date(a.now());
        return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]
    }

    function jb(a) {
        var b, c, d, e, f = [];
        if (!a._d) {
            for (d = ib(a), a._w && null == a._a[ge] && null == a._a[fe] && kb(a), null != a._dayOfYear && (e = hb(a._a[ee], d[ee]), (a._dayOfYear > pa(e) || 0 === a._dayOfYear) && (n(a)._overflowDayOfYear = !0), c = ta(e, 0, a._dayOfYear), a._a[fe] = c.getUTCMonth(), a._a[ge] = c.getUTCDate()), b = 0; b < 3 && null == a._a[b]; ++b) a._a[b] = f[b] = d[b];
            for (; b < 7; b++) a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            24 === a._a[he] && 0 === a._a[ie] && 0 === a._a[je] && 0 === a._a[ke] && (a._nextDay = !0, a._a[he] = 0), a._d = (a._useUTC ? ta : sa).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[he] = 24)
        }
    }

    function kb(a) {
        var b, c, d, e, f, g, h, i;
        if (b = a._w, null != b.GG || null != b.W || null != b.E) f = 1, g = 4, c = hb(b.GG, a._a[ee], wa(tb(), 1, 4).year), d = hb(b.W, 1), e = hb(b.E, 1), (e < 1 || e > 7) && (i = !0); else {
            f = a._locale._week.dow, g = a._locale._week.doy;
            var j = wa(tb(), f, g);
            c = hb(b.gg, a._a[ee], j.year), d = hb(b.w, j.week), null != b.d ? (e = b.d, (e < 0 || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f
        }
        d < 1 || d > xa(c, f, g) ? n(a)._overflowWeeks = !0 : null != i ? n(a)._overflowWeekday = !0 : (h = va(c, d, e, f, g), a._a[ee] = h.year, a._dayOfYear = h.dayOfYear)
    }

    function lb(b) {
        if (b._f === a.ISO_8601) return void eb(b);
        if (b._f === a.RFC_2822) return void fb(b);
        b._a = [], n(b).empty = !0;
        var c, d, e, f, g, h = "" + b._i, i = h.length, j = 0;
        for (e = Y(b._f, b._locale).match(Jd) || [], c = 0; c < e.length; c++) f = e[c], d = (h.match($(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && n(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), Md[f] ? (d ? n(b).empty = !1 : n(b).unusedTokens.push(f), da(f, d, b)) : b._strict && !d && n(b).unusedTokens.push(f);
        n(b).charsLeftOver = i - j, h.length > 0 && n(b).unusedInput.push(h), b._a[he] <= 12 && n(b).bigHour === !0 && b._a[he] > 0 && (n(b).bigHour = void 0), n(b).parsedDateParts = b._a.slice(0), n(b).meridiem = b._meridiem, b._a[he] = mb(b._locale, b._a[he], b._meridiem), jb(b), db(b)
    }

    function mb(a, b, c) {
        var d;
        return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && b < 12 && (b += 12), d || 12 !== b || (b = 0), b) : b
    }

    function nb(a) {
        var b, c, d, e, f;
        if (0 === a._f.length) return n(a).invalidFormat = !0, void(a._d = new Date(NaN));
        for (e = 0; e < a._f.length; e++) f = 0, b = q({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], lb(b), o(b) && (f += n(b).charsLeftOver, f += 10 * n(b).unusedTokens.length, n(b).score = f, (null == d || f < d) && (d = f, c = b));
        k(a, c || b)
    }

    function ob(a) {
        if (!a._d) {
            var b = L(a._i);
            a._a = i([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) {
                return a && parseInt(a, 10)
            }), jb(a)
        }
    }

    function pb(a) {
        var b = new r(db(qb(a)));
        return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b
    }

    function qb(a) {
        var b = a._i, d = a._f;
        return a._locale = a._locale || bb(a._l), null === b || void 0 === d && "" === b ? p({nullInput: !0}) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), s(b) ? new r(db(b)) : (h(b) ? a._d = b : c(d) ? nb(a) : d ? lb(a) : rb(a), o(a) || (a._d = null), a))
    }

    function rb(b) {
        var e = b._i;
        f(e) ? b._d = new Date(a.now()) : h(e) ? b._d = new Date(e.valueOf()) : "string" == typeof e ? gb(b) : c(e) ? (b._a = i(e.slice(0), function (a) {
            return parseInt(a, 10)
        }), jb(b)) : d(e) ? ob(b) : g(e) ? b._d = new Date(e) : a.createFromInputFallback(b)
    }

    function sb(a, b, f, g, h) {
        var i = {};
        return f !== !0 && f !== !1 || (g = f, f = void 0), (d(a) && e(a) || c(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = f, i._i = a, i._f = b, i._strict = g, pb(i)
    }

    function tb(a, b, c, d) {
        return sb(a, b, c, d, !1)
    }

    function ub(a, b) {
        var d, e;
        if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return tb();
        for (d = b[0], e = 1; e < b.length; ++e) b[e].isValid() && !b[e][a](d) || (d = b[e]);
        return d
    }

    function vb() {
        var a = [].slice.call(arguments, 0);
        return ub("isBefore", a)
    }

    function wb() {
        var a = [].slice.call(arguments, 0);
        return ub("isAfter", a)
    }

    function xb(a) {
        for (var b in a) if (Re.indexOf(b) === -1 || null != a[b] && isNaN(a[b])) return !1;
        for (var c = !1, d = 0; d < Re.length; ++d) if (a[Re[d]]) {
            if (c) return !1;
            parseFloat(a[Re[d]]) !== u(a[Re[d]]) && (c = !0)
        }
        return !0
    }

    function yb() {
        return this._isValid
    }

    function zb() {
        return Sb(NaN)
    }

    function Ab(a) {
        var b = L(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0,
            h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0;
        this._isValid = xb(b), this._milliseconds = +k + 1e3 * j + 6e4 * i + 1e3 * h * 60 * 60, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = bb(), this._bubble()
    }

    function Bb(a) {
        return a instanceof Ab
    }

    function Cb(a) {
        return a < 0 ? Math.round(-1 * a) * -1 : Math.round(a)
    }

    function Db(a, b) {
        U(a, 0, 0, function () {
            var a = this.utcOffset(), c = "+";
            return a < 0 && (a = -a, c = "-"), c + T(~~(a / 60), 2) + b + T(~~a % 60, 2)
        })
    }

    function Eb(a, b) {
        var c = (b || "").match(a);
        if (null === c) return null;
        var d = c[c.length - 1] || [], e = (d + "").match(Se) || ["-", 0, 0], f = +(60 * e[1]) + u(e[2]);
        return 0 === f ? 0 : "+" === e[0] ? f : -f
    }

    function Fb(b, c) {
        var d, e;
        return c._isUTC ? (d = c.clone(), e = (s(b) || h(b) ? b.valueOf() : tb(b).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), a.updateOffset(d, !1), d) : tb(b).local()
    }

    function Gb(a) {
        return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
    }

    function Hb(b, c, d) {
        var e, f = this._offset || 0;
        if (!this.isValid()) return null != b ? this : NaN;
        if (null != b) {
            if ("string" == typeof b) {
                if (b = Eb(_d, b), null === b) return this
            } else Math.abs(b) < 16 && !d && (b = 60 * b);
            return !this._isUTC && c && (e = Gb(this)), this._offset = b, this._isUTC = !0, null != e && this.add(e, "m"), f !== b && (!c || this._changeInProgress ? Xb(this, Sb(b - f, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this
        }
        return this._isUTC ? f : Gb(this)
    }

    function Ib(a, b) {
        return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
    }

    function Jb(a) {
        return this.utcOffset(0, a)
    }

    function Kb(a) {
        return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Gb(this), "m")), this
    }

    function Lb() {
        if (null != this._tzm) this.utcOffset(this._tzm, !1, !0); else if ("string" == typeof this._i) {
            var a = Eb($d, this._i);
            null != a ? this.utcOffset(a) : this.utcOffset(0, !0)
        }
        return this
    }

    function Mb(a) {
        return !!this.isValid() && (a = a ? tb(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0)
    }

    function Nb() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function Ob() {
        if (!f(this._isDSTShifted)) return this._isDSTShifted;
        var a = {};
        if (q(a, this), a = qb(a), a._a) {
            var b = a._isUTC ? l(a._a) : tb(a._a);
            this._isDSTShifted = this.isValid() && v(a._a, b.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    }

    function Pb() {
        return !!this.isValid() && !this._isUTC
    }

    function Qb() {
        return !!this.isValid() && this._isUTC
    }

    function Rb() {
        return !!this.isValid() && (this._isUTC && 0 === this._offset)
    }

    function Sb(a, b) {
        var c, d, e, f = a, h = null;
        return Bb(a) ? f = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : g(a) ? (f = {}, b ? f[b] = a : f.milliseconds = a) : (h = Te.exec(a)) ? (c = "-" === h[1] ? -1 : 1, f = {
            y: 0,
            d: u(h[ge]) * c,
            h: u(h[he]) * c,
            m: u(h[ie]) * c,
            s: u(h[je]) * c,
            ms: u(Cb(1e3 * h[ke])) * c
        }) : (h = Ue.exec(a)) ? (c = "-" === h[1] ? -1 : 1, f = {
            y: Tb(h[2], c),
            M: Tb(h[3], c),
            w: Tb(h[4], c),
            d: Tb(h[5], c),
            h: Tb(h[6], c),
            m: Tb(h[7], c),
            s: Tb(h[8], c)
        }) : null == f ? f = {} : "object" == typeof f && ("from" in f || "to" in f) && (e = Vb(tb(f.from), tb(f.to)), f = {}, f.ms = e.milliseconds, f.M = e.months), d = new Ab(f), Bb(a) && j(a, "_locale") && (d._locale = a._locale), d
    }

    function Tb(a, b) {
        var c = a && parseFloat(a.replace(",", "."));
        return (isNaN(c) ? 0 : c) * b
    }

    function Ub(a, b) {
        var c = {milliseconds: 0, months: 0};
        return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
    }

    function Vb(a, b) {
        var c;
        return a.isValid() && b.isValid() ? (b = Fb(b, a), a.isBefore(b) ? c = Ub(a, b) : (c = Ub(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
            milliseconds: 0,
            months: 0
        }
    }

    function Wb(a, b) {
        return function (c, d) {
            var e, f;
            return null === d || isNaN(+d) || (y(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Sb(c, d), Xb(this, e, a), this
        }
    }

    function Xb(b, c, d, e) {
        var f = c._milliseconds, g = Cb(c._days), h = Cb(c._months);
        b.isValid() && (e = null == e || e, f && b._d.setTime(b._d.valueOf() + f * d), g && Q(b, "Date", P(b, "Date") + g * d), h && ja(b, P(b, "Month") + h * d), e && a.updateOffset(b, g || h))
    }

    function Yb(a, b) {
        var c = a.diff(b, "days", !0);
        return c < -6 ? "sameElse" : c < -1 ? "lastWeek" : c < 0 ? "lastDay" : c < 1 ? "sameDay" : c < 2 ? "nextDay" : c < 7 ? "nextWeek" : "sameElse"
    }

    function Zb(b, c) {
        var d = b || tb(), e = Fb(d, this).startOf("day"), f = a.calendarFormat(this, e) || "sameElse",
            g = c && (z(c[f]) ? c[f].call(this, d) : c[f]);
        return this.format(g || this.localeData().calendar(f, this, tb(d)))
    }

    function $b() {
        return new r(this)
    }

    function _b(a, b) {
        var c = s(a) ? a : tb(a);
        return !(!this.isValid() || !c.isValid()) && (b = K(f(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf())
    }

    function ac(a, b) {
        var c = s(a) ? a : tb(a);
        return !(!this.isValid() || !c.isValid()) && (b = K(f(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf())
    }

    function bc(a, b, c, d) {
        return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c))
    }

    function cc(a, b) {
        var c, d = s(a) ? a : tb(a);
        return !(!this.isValid() || !d.isValid()) && (b = K(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf()))
    }

    function dc(a, b) {
        return this.isSame(a, b) || this.isAfter(a, b)
    }

    function ec(a, b) {
        return this.isSame(a, b) || this.isBefore(a, b)
    }

    function fc(a, b, c) {
        var d, e, f, g;
        return this.isValid() ? (d = Fb(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = K(b), "year" === b || "month" === b || "quarter" === b ? (g = gc(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : t(g)) : NaN) : NaN
    }

    function gc(a, b) {
        var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()), f = a.clone().add(e, "months");
        return b - f < 0 ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) || 0
    }

    function hc() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function ic() {
        if (!this.isValid()) return null;
        var a = this.clone().utc();
        return a.year() < 0 || a.year() > 9999 ? X(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : z(Date.prototype.toISOString) ? this.toDate().toISOString() : X(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function jc() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var a = "moment", b = "";
        this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", b = "Z");
        var c = "[" + a + '("]', d = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
            e = "-MM-DD[T]HH:mm:ss.SSS", f = b + '[")]';
        return this.format(c + d + e + f)
    }

    function kc(b) {
        b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);
        var c = X(this, b);
        return this.localeData().postformat(c)
    }

    function lc(a, b) {
        return this.isValid() && (s(a) && a.isValid() || tb(a).isValid()) ? Sb({
            to: this,
            from: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function mc(a) {
        return this.from(tb(), a)
    }

    function nc(a, b) {
        return this.isValid() && (s(a) && a.isValid() || tb(a).isValid()) ? Sb({
            from: this,
            to: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function oc(a) {
        return this.to(tb(), a)
    }

    function pc(a) {
        var b;
        return void 0 === a ? this._locale._abbr : (b = bb(a), null != b && (this._locale = b), this)
    }

    function qc() {
        return this._locale
    }

    function rc(a) {
        switch (a = K(a)) {
            case"year":
                this.month(0);
            case"quarter":
            case"month":
                this.date(1);
            case"week":
            case"isoWeek":
            case"day":
            case"date":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function sc(a) {
        return a = K(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"))
    }

    function tc() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }

    function uc() {
        return Math.floor(this.valueOf() / 1e3)
    }

    function vc() {
        return new Date(this.valueOf())
    }

    function wc() {
        var a = this;
        return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
    }

    function xc() {
        var a = this;
        return {
            years: a.year(),
            months: a.month(),
            date: a.date(),
            hours: a.hours(),
            minutes: a.minutes(),
            seconds: a.seconds(),
            milliseconds: a.milliseconds()
        }
    }

    function yc() {
        return this.isValid() ? this.toISOString() : null
    }

    function zc() {
        return o(this)
    }

    function Ac() {
        return k({}, n(this))
    }

    function Bc() {
        return n(this).overflow
    }

    function Cc() {
        return {input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict}
    }

    function Dc(a, b) {
        U(0, [a, a.length], 0, b)
    }

    function Ec(a) {
        return Ic.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }

    function Fc(a) {
        return Ic.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4)
    }

    function Gc() {
        return xa(this.year(), 1, 4)
    }

    function Hc() {
        var a = this.localeData()._week;
        return xa(this.year(), a.dow, a.doy)
    }

    function Ic(a, b, c, d, e) {
        var f;
        return null == a ? wa(this, d, e).year : (f = xa(a, d, e), b > f && (b = f), Jc.call(this, a, b, c, d, e))
    }

    function Jc(a, b, c, d, e) {
        var f = va(a, b, c, d, e), g = ta(f.year, 0, f.dayOfYear);
        return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this
    }

    function Kc(a) {
        return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
    }

    function Lc(a) {
        var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == a ? b : this.add(a - b, "d")
    }

    function Mc(a, b) {
        b[ke] = u(1e3 * ("0." + a))
    }

    function Nc() {
        return this._isUTC ? "UTC" : ""
    }

    function Oc() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function Pc(a) {
        return tb(1e3 * a)
    }

    function Qc() {
        return tb.apply(null, arguments).parseZone()
    }

    function Rc(a) {
        return a
    }

    function Sc(a, b, c, d) {
        var e = bb(), f = l().set(d, b);
        return e[c](f, a)
    }

    function Tc(a, b, c) {
        if (g(a) && (b = a, a = void 0), a = a || "", null != b) return Sc(a, b, c, "month");
        var d, e = [];
        for (d = 0; d < 12; d++) e[d] = Sc(a, d, c, "month");
        return e
    }

    function Uc(a, b, c, d) {
        "boolean" == typeof a ? (g(b) && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, g(b) && (c = b, b = void 0), b = b || "");
        var e = bb(), f = a ? e._week.dow : 0;
        if (null != c) return Sc(b, (c + f) % 7, d, "day");
        var h, i = [];
        for (h = 0; h < 7; h++) i[h] = Sc(b, (h + f) % 7, d, "day");
        return i
    }

    function Vc(a, b) {
        return Tc(a, b, "months")
    }

    function Wc(a, b) {
        return Tc(a, b, "monthsShort")
    }

    function Xc(a, b, c) {
        return Uc(a, b, c, "weekdays")
    }

    function Yc(a, b, c) {
        return Uc(a, b, c, "weekdaysShort")
    }

    function Zc(a, b, c) {
        return Uc(a, b, c, "weekdaysMin")
    }

    function $c() {
        var a = this._data;
        return this._milliseconds = df(this._milliseconds), this._days = df(this._days), this._months = df(this._months), a.milliseconds = df(a.milliseconds), a.seconds = df(a.seconds), a.minutes = df(a.minutes), a.hours = df(a.hours), a.months = df(a.months), a.years = df(a.years), this
    }

    function _c(a, b, c, d) {
        var e = Sb(b, c);
        return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble()
    }

    function ad(a, b) {
        return _c(this, a, b, 1)
    }

    function bd(a, b) {
        return _c(this, a, b, -1)
    }

    function cd(a) {
        return a < 0 ? Math.floor(a) : Math.ceil(a)
    }

    function dd() {
        var a, b, c, d, e, f = this._milliseconds, g = this._days, h = this._months, i = this._data;
        return f >= 0 && g >= 0 && h >= 0 || f <= 0 && g <= 0 && h <= 0 || (f += 864e5 * cd(fd(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = t(f / 1e3), i.seconds = a % 60, b = t(a / 60), i.minutes = b % 60, c = t(b / 60), i.hours = c % 24, g += t(c / 24), e = t(ed(g)), h += e, g -= cd(fd(e)), d = t(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this
    }

    function ed(a) {
        return 4800 * a / 146097
    }

    function fd(a) {
        return 146097 * a / 4800
    }

    function gd(a) {
        if (!this.isValid()) return NaN;
        var b, c, d = this._milliseconds;
        if (a = K(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + ed(b), "month" === a ? c : c / 12;
        switch (b = this._days + Math.round(fd(this._months)), a) {
            case"week":
                return b / 7 + d / 6048e5;
            case"day":
                return b + d / 864e5;
            case"hour":
                return 24 * b + d / 36e5;
            case"minute":
                return 1440 * b + d / 6e4;
            case"second":
                return 86400 * b + d / 1e3;
            case"millisecond":
                return Math.floor(864e5 * b) + d;
            default:
                throw new Error("Unknown unit " + a)
        }
    }

    function hd() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * u(this._months / 12) : NaN
    }

    function id(a) {
        return function () {
            return this.as(a)
        }
    }

    function jd(a) {
        return a = K(a), this.isValid() ? this[a + "s"]() : NaN
    }

    function kd(a) {
        return function () {
            return this.isValid() ? this._data[a] : NaN
        }
    }

    function ld() {
        return t(this.days() / 7)
    }

    function md(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }

    function nd(a, b, c) {
        var d = Sb(a).abs(), e = uf(d.as("s")), f = uf(d.as("m")), g = uf(d.as("h")), h = uf(d.as("d")),
            i = uf(d.as("M")), j = uf(d.as("y")),
            k = e <= vf.ss && ["s", e] || e < vf.s && ["ss", e] || f <= 1 && ["m"] || f < vf.m && ["mm", f] || g <= 1 && ["h"] || g < vf.h && ["hh", g] || h <= 1 && ["d"] || h < vf.d && ["dd", h] || i <= 1 && ["M"] || i < vf.M && ["MM", i] || j <= 1 && ["y"] || ["yy", j];
        return k[2] = b, k[3] = +a > 0, k[4] = c, md.apply(null, k)
    }

    function od(a) {
        return void 0 === a ? uf : "function" == typeof a && (uf = a, !0)
    }

    function pd(a, b) {
        return void 0 !== vf[a] && (void 0 === b ? vf[a] : (vf[a] = b, "s" === a && (vf.ss = b - 1), !0))
    }

    function qd(a) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var b = this.localeData(), c = nd(this, !a, b);
        return a && (c = b.pastFuture(+this, c)), b.postformat(c)
    }

    function rd() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var a, b, c, d = wf(this._milliseconds) / 1e3, e = wf(this._days), f = wf(this._months);
        a = t(d / 60), b = t(a / 60), d %= 60, a %= 60, c = t(f / 12), f %= 12;
        var g = c, h = f, i = e, j = b, k = a, l = d, m = this.asSeconds();
        return m ? (m < 0 ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D"
    }

    var sd, td;
    td = Array.prototype.some ? Array.prototype.some : function (a) {
        for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++) if (d in b && a.call(this, b[d], d, b)) return !0;
        return !1
    };
    var ud = td, vd = a.momentProperties = [], wd = !1, xd = {};
    a.suppressDeprecationWarnings = !1, a.deprecationHandler = null;
    var yd;
    yd = Object.keys ? Object.keys : function (a) {
        var b, c = [];
        for (b in a) j(a, b) && c.push(b);
        return c
    };
    var zd, Ad = yd, Bd = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        }, Cd = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        }, Dd = "Invalid date", Ed = "%d", Fd = /\d{1,2}/, Gd = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }, Hd = {}, Id = {},
        Jd = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        Kd = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Ld = {}, Md = {}, Nd = /\d/, Od = /\d\d/, Pd = /\d{3}/,
        Qd = /\d{4}/, Rd = /[+-]?\d{6}/, Sd = /\d\d?/, Td = /\d\d\d\d?/, Ud = /\d\d\d\d\d\d?/, Vd = /\d{1,3}/,
        Wd = /\d{1,4}/, Xd = /[+-]?\d{1,6}/, Yd = /\d+/, Zd = /[+-]?\d+/, $d = /Z|[+-]\d\d:?\d\d/gi,
        _d = /Z|[+-]\d\d(?::?\d\d)?/gi, ae = /[+-]?\d+(\.\d{1,3})?/,
        be = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        ce = {}, de = {}, ee = 0, fe = 1, ge = 2, he = 3, ie = 4, je = 5, ke = 6, le = 7, me = 8;
    zd = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
        var b;
        for (b = 0; b < this.length; ++b) if (this[b] === a) return b;
        return -1
    };
    var ne = zd;
    U("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
    }), U("MMM", 0, 0, function (a) {
        return this.localeData().monthsShort(this, a)
    }), U("MMMM", 0, 0, function (a) {
        return this.localeData().months(this, a)
    }), J("month", "M"), M("month", 8), Z("M", Sd), Z("MM", Sd, Od), Z("MMM", function (a, b) {
        return b.monthsShortRegex(a)
    }), Z("MMMM", function (a, b) {
        return b.monthsRegex(a)
    }), ba(["M", "MM"], function (a, b) {
        b[fe] = u(a) - 1
    }), ba(["MMM", "MMMM"], function (a, b, c, d) {
        var e = c._locale.monthsParse(a, d, c._strict);
        null != e ? b[fe] = e : n(c).invalidMonth = a
    });
    var oe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        pe = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        qe = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), re = be, se = be;
    U("Y", 0, 0, function () {
        var a = this.year();
        return a <= 9999 ? "" + a : "+" + a
    }), U(0, ["YY", 2], 0, function () {
        return this.year() % 100
    }), U(0, ["YYYY", 4], 0, "year"), U(0, ["YYYYY", 5], 0, "year"), U(0, ["YYYYYY", 6, !0], 0, "year"), J("year", "y"), M("year", 1), Z("Y", Zd), Z("YY", Sd, Od), Z("YYYY", Wd, Qd), Z("YYYYY", Xd, Rd), Z("YYYYYY", Xd, Rd), ba(["YYYYY", "YYYYYY"], ee), ba("YYYY", function (b, c) {
        c[ee] = 2 === b.length ? a.parseTwoDigitYear(b) : u(b)
    }), ba("YY", function (b, c) {
        c[ee] = a.parseTwoDigitYear(b)
    }), ba("Y", function (a, b) {
        b[ee] = parseInt(a, 10)
    }), a.parseTwoDigitYear = function (a) {
        return u(a) + (u(a) > 68 ? 1900 : 2e3)
    };
    var te = O("FullYear", !0);
    U("w", ["ww", 2], "wo", "week"), U("W", ["WW", 2], "Wo", "isoWeek"), J("week", "w"), J("isoWeek", "W"), M("week", 5), M("isoWeek", 5), Z("w", Sd), Z("ww", Sd, Od), Z("W", Sd), Z("WW", Sd, Od), ca(["w", "ww", "W", "WW"], function (a, b, c, d) {
        b[d.substr(0, 1)] = u(a)
    });
    var ue = {dow: 0, doy: 6};
    U("d", 0, "do", "day"), U("dd", 0, 0, function (a) {
        return this.localeData().weekdaysMin(this, a)
    }), U("ddd", 0, 0, function (a) {
        return this.localeData().weekdaysShort(this, a)
    }), U("dddd", 0, 0, function (a) {
        return this.localeData().weekdays(this, a)
    }), U("e", 0, 0, "weekday"), U("E", 0, 0, "isoWeekday"), J("day", "d"), J("weekday", "e"), J("isoWeekday", "E"), M("day", 11), M("weekday", 11), M("isoWeekday", 11), Z("d", Sd), Z("e", Sd), Z("E", Sd), Z("dd", function (a, b) {
        return b.weekdaysMinRegex(a)
    }), Z("ddd", function (a, b) {
        return b.weekdaysShortRegex(a)
    }), Z("dddd", function (a, b) {
        return b.weekdaysRegex(a)
    }), ca(["dd", "ddd", "dddd"], function (a, b, c, d) {
        var e = c._locale.weekdaysParse(a, d, c._strict);
        null != e ? b.d = e : n(c).invalidWeekday = a
    }), ca(["d", "e", "E"], function (a, b, c, d) {
        b[d] = u(a)
    });
    var ve = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        we = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), xe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ye = be, ze = be,
        Ae = be;
    U("H", ["HH", 2], 0, "hour"), U("h", ["hh", 2], 0, Ra), U("k", ["kk", 2], 0, Sa), U("hmm", 0, 0, function () {
        return "" + Ra.apply(this) + T(this.minutes(), 2)
    }), U("hmmss", 0, 0, function () {
        return "" + Ra.apply(this) + T(this.minutes(), 2) + T(this.seconds(), 2)
    }), U("Hmm", 0, 0, function () {
        return "" + this.hours() + T(this.minutes(), 2)
    }), U("Hmmss", 0, 0, function () {
        return "" + this.hours() + T(this.minutes(), 2) + T(this.seconds(), 2)
    }), Ta("a", !0), Ta("A", !1), J("hour", "h"), M("hour", 13), Z("a", Ua), Z("A", Ua), Z("H", Sd), Z("h", Sd), Z("k", Sd), Z("HH", Sd, Od), Z("hh", Sd, Od), Z("kk", Sd, Od), Z("hmm", Td), Z("hmmss", Ud), Z("Hmm", Td), Z("Hmmss", Ud), ba(["H", "HH"], he), ba(["k", "kk"], function (a, b, c) {
        var d = u(a);
        b[he] = 24 === d ? 0 : d
    }), ba(["a", "A"], function (a, b, c) {
        c._isPm = c._locale.isPM(a), c._meridiem = a
    }), ba(["h", "hh"], function (a, b, c) {
        b[he] = u(a), n(c).bigHour = !0
    }), ba("hmm", function (a, b, c) {
        var d = a.length - 2;
        b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d)), n(c).bigHour = !0
    }), ba("hmmss", function (a, b, c) {
        var d = a.length - 4, e = a.length - 2;
        b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d, 2)), b[je] = u(a.substr(e)), n(c).bigHour = !0
    }), ba("Hmm", function (a, b, c) {
        var d = a.length - 2;
        b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d))
    }), ba("Hmmss", function (a, b, c) {
        var d = a.length - 4, e = a.length - 2;
        b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d, 2)), b[je] = u(a.substr(e))
    });
    var Be, Ce = /[ap]\.?m?\.?/i, De = O("Hours", !0), Ee = {
            calendar: Bd,
            longDateFormat: Cd,
            invalidDate: Dd,
            ordinal: Ed,
            dayOfMonthOrdinalParse: Fd,
            relativeTime: Gd,
            months: pe,
            monthsShort: qe,
            week: ue,
            weekdays: ve,
            weekdaysMin: xe,
            weekdaysShort: we,
            meridiemParse: Ce
        }, Fe = {}, Ge = {},
        He = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        Ie = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        Je = /Z|[+-]\d\d(?::?\d\d)?/,
        Ke = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
        Le = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
        Me = /^\/?Date\((\-?\d+)/i,
        Ne = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
    a.createFromInputFallback = x("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (a) {
        a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
    }), a.ISO_8601 = function () {
    }, a.RFC_2822 = function () {
    };
    var Oe = x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
            var a = tb.apply(null, arguments);
            return this.isValid() && a.isValid() ? a < this ? this : a : p()
        }),
        Pe = x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
            var a = tb.apply(null, arguments);
            return this.isValid() && a.isValid() ? a > this ? this : a : p()
        }), Qe = function () {
            return Date.now ? Date.now() : +new Date
        }, Re = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    Db("Z", ":"), Db("ZZ", ""), Z("Z", _d), Z("ZZ", _d), ba(["Z", "ZZ"], function (a, b, c) {
        c._useUTC = !0, c._tzm = Eb(_d, a)
    });
    var Se = /([\+\-]|\d\d)/gi;
    a.updateOffset = function () {
    };
    var Te = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        Ue = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
    Sb.fn = Ab.prototype, Sb.invalid = zb;
    var Ve = Wb(1, "add"), We = Wb(-1, "subtract");
    a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var Xe = x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) {
        return void 0 === a ? this.localeData() : this.locale(a)
    });
    U(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
    }), U(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
    }), Dc("gggg", "weekYear"), Dc("ggggg", "weekYear"), Dc("GGGG", "isoWeekYear"), Dc("GGGGG", "isoWeekYear"), J("weekYear", "gg"), J("isoWeekYear", "GG"), M("weekYear", 1), M("isoWeekYear", 1), Z("G", Zd), Z("g", Zd), Z("GG", Sd, Od), Z("gg", Sd, Od), Z("GGGG", Wd, Qd), Z("gggg", Wd, Qd), Z("GGGGG", Xd, Rd), Z("ggggg", Xd, Rd), ca(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
        b[d.substr(0, 2)] = u(a)
    }), ca(["gg", "GG"], function (b, c, d, e) {
        c[e] = a.parseTwoDigitYear(b)
    }), U("Q", 0, "Qo", "quarter"), J("quarter", "Q"), M("quarter", 7), Z("Q", Nd), ba("Q", function (a, b) {
        b[fe] = 3 * (u(a) - 1)
    }), U("D", ["DD", 2], "Do", "date"), J("date", "D"), M("date", 9), Z("D", Sd), Z("DD", Sd, Od), Z("Do", function (a, b) {
        return a ? b._dayOfMonthOrdinalParse || b._ordinalParse : b._dayOfMonthOrdinalParseLenient
    }), ba(["D", "DD"], ge), ba("Do", function (a, b) {
        b[ge] = u(a.match(Sd)[0], 10)
    });
    var Ye = O("Date", !0);
    U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), J("dayOfYear", "DDD"), M("dayOfYear", 4), Z("DDD", Vd), Z("DDDD", Pd), ba(["DDD", "DDDD"], function (a, b, c) {
        c._dayOfYear = u(a)
    }), U("m", ["mm", 2], 0, "minute"), J("minute", "m"), M("minute", 14), Z("m", Sd), Z("mm", Sd, Od), ba(["m", "mm"], ie);
    var Ze = O("Minutes", !1);
    U("s", ["ss", 2], 0, "second"), J("second", "s"), M("second", 15), Z("s", Sd), Z("ss", Sd, Od), ba(["s", "ss"], je);
    var $e = O("Seconds", !1);
    U("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
    }), U(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
    }), U(0, ["SSS", 3], 0, "millisecond"), U(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond()
    }), U(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond()
    }), U(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond()
    }), U(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond()
    }), U(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond()
    }), U(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond()
    }), J("millisecond", "ms"), M("millisecond", 16), Z("S", Vd, Nd), Z("SS", Vd, Od), Z("SSS", Vd, Pd);
    var _e;
    for (_e = "SSSS"; _e.length <= 9; _e += "S") Z(_e, Yd);
    for (_e = "S"; _e.length <= 9; _e += "S") ba(_e, Mc);
    var af = O("Milliseconds", !1);
    U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0, "zoneName");
    var bf = r.prototype;
    bf.add = Ve, bf.calendar = Zb, bf.clone = $b, bf.diff = fc, bf.endOf = sc, bf.format = kc, bf.from = lc, bf.fromNow = mc, bf.to = nc, bf.toNow = oc, bf.get = R, bf.invalidAt = Bc, bf.isAfter = _b, bf.isBefore = ac, bf.isBetween = bc, bf.isSame = cc, bf.isSameOrAfter = dc, bf.isSameOrBefore = ec, bf.isValid = zc, bf.lang = Xe, bf.locale = pc, bf.localeData = qc, bf.max = Pe, bf.min = Oe, bf.parsingFlags = Ac, bf.set = S, bf.startOf = rc, bf.subtract = We, bf.toArray = wc, bf.toObject = xc, bf.toDate = vc, bf.toISOString = ic, bf.inspect = jc, bf.toJSON = yc, bf.toString = hc, bf.unix = uc, bf.valueOf = tc, bf.creationData = Cc, bf.year = te, bf.isLeapYear = ra, bf.weekYear = Ec, bf.isoWeekYear = Fc, bf.quarter = bf.quarters = Kc, bf.month = ka, bf.daysInMonth = la, bf.week = bf.weeks = Ba, bf.isoWeek = bf.isoWeeks = Ca, bf.weeksInYear = Hc, bf.isoWeeksInYear = Gc, bf.date = Ye, bf.day = bf.days = Ka, bf.weekday = La, bf.isoWeekday = Ma, bf.dayOfYear = Lc, bf.hour = bf.hours = De, bf.minute = bf.minutes = Ze, bf.second = bf.seconds = $e, bf.millisecond = bf.milliseconds = af, bf.utcOffset = Hb, bf.utc = Jb, bf.local = Kb, bf.parseZone = Lb, bf.hasAlignedHourOffset = Mb, bf.isDST = Nb, bf.isLocal = Pb, bf.isUtcOffset = Qb, bf.isUtc = Rb, bf.isUTC = Rb, bf.zoneAbbr = Nc, bf.zoneName = Oc, bf.dates = x("dates accessor is deprecated. Use date instead.", Ye), bf.months = x("months accessor is deprecated. Use month instead", ka), bf.years = x("years accessor is deprecated. Use year instead", te), bf.zone = x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Ib), bf.isDSTShifted = x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Ob);
    var cf = C.prototype;
    cf.calendar = D, cf.longDateFormat = E, cf.invalidDate = F, cf.ordinal = G, cf.preparse = Rc, cf.postformat = Rc, cf.relativeTime = H, cf.pastFuture = I, cf.set = A, cf.months = fa, cf.monthsShort = ga, cf.monthsParse = ia, cf.monthsRegex = na, cf.monthsShortRegex = ma, cf.week = ya, cf.firstDayOfYear = Aa, cf.firstDayOfWeek = za, cf.weekdays = Fa, cf.weekdaysMin = Ha, cf.weekdaysShort = Ga, cf.weekdaysParse = Ja, cf.weekdaysRegex = Na, cf.weekdaysShortRegex = Oa, cf.weekdaysMinRegex = Pa, cf.isPM = Va, cf.meridiem = Wa, $a("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (a) {
            var b = a % 10, c = 1 === u(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        }
    }), a.lang = x("moment.lang is deprecated. Use moment.locale instead.", $a), a.langData = x("moment.langData is deprecated. Use moment.localeData instead.", bb);
    var df = Math.abs, ef = id("ms"), ff = id("s"), gf = id("m"), hf = id("h"), jf = id("d"), kf = id("w"),
        lf = id("M"), mf = id("y"), nf = kd("milliseconds"), of = kd("seconds"), pf = kd("minutes"), qf = kd("hours"),
        rf = kd("days"), sf = kd("months"), tf = kd("years"), uf = Math.round,
        vf = {ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11}, wf = Math.abs, xf = Ab.prototype;
    return xf.isValid = yb, xf.abs = $c, xf.add = ad, xf.subtract = bd, xf.as = gd, xf.asMilliseconds = ef, xf.asSeconds = ff, xf.asMinutes = gf, xf.asHours = hf, xf.asDays = jf, xf.asWeeks = kf, xf.asMonths = lf, xf.asYears = mf, xf.valueOf = hd, xf._bubble = dd, xf.get = jd, xf.milliseconds = nf, xf.seconds = of, xf.minutes = pf, xf.hours = qf, xf.days = rf, xf.weeks = ld, xf.months = sf, xf.years = tf, xf.humanize = qd, xf.toISOString = rd, xf.toString = rd, xf.toJSON = rd, xf.locale = pc, xf.localeData = qc, xf.toIsoString = x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", rd), xf.lang = Xe, U("X", 0, 0, "unix"), U("x", 0, 0, "valueOf"), Z("x", Zd), Z("X", ae), ba("X", function (a, b, c) {
        c._d = new Date(1e3 * parseFloat(a, 10))
    }), ba("x", function (a, b, c) {
        c._d = new Date(u(a))
    }), a.version = "2.18.1", b(tb), a.fn = bf, a.min = vb, a.max = wb, a.now = Qe, a.utc = l, a.unix = Pc, a.months = Vc, a.isDate = h, a.locale = $a, a.invalid = p, a.duration = Sb, a.isMoment = s, a.weekdays = Xc, a.parseZone = Qc, a.localeData = bb, a.isDuration = Bb, a.monthsShort = Wc, a.weekdaysMin = Zc, a.defineLocale = _a, a.updateLocale = ab, a.locales = cb, a.weekdaysShort = Yc, a.normalizeUnits = K, a.relativeTimeRounding = od, a.relativeTimeThreshold = pd, a.calendarFormat = Yb, a.prototype = bf, a
});


// ----- HELPER FUNCTIONS ----- //

// get index of an element in its parent node

function indexInParent(node) {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i = 0; i < children.length; i++) {
        if (children[i] == node) return num;
        if (children[i].nodeType == 1) num++;
    }
    return -1;
}

// element(index) selector

function eq(index) {
    if (index >= 0 && index < this.length)
        return this[index];
    else
        return -1;
}

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}


function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}


function init() {

    // ----- MENU OPEN ----- //

    var nav = document.getElementById('mainNav');

    if (nav) {
        nav.addEventListener('click', function () {
            var resTop = navCont.offsetTop;
            window.scroll(0, resTop)
        });
    }


    if (nav) {

        var cls = document.getElementById('closePop');
        var mob = document.getElementById('navMobile');
        var nam = document.getElementById('navMobileBtn');

        var navCont = document.getElementById('navContent');
        var mainCont = document.getElementById('mainContent');

        var navOver = document.getElementById('navOverlay');
        var navItems = navCont.querySelectorAll('.q_split_wrap');
        var menuScreen = document.getElementById('menu_screen');
        var menuScreenItems = menuScreen.querySelectorAll('.screen_item');

        for (var i = navItems.length - 1; i >= 0; i--) {
            var navItem = navItems[i];
            navHoverHandler(navItem, i);
        }
        ;

        nav.addEventListener('click', function () {
            hideContent();
            openNav();
        });
        nam.addEventListener('click', function () {
            hideContent();
            openNav();
        });
        cls.addEventListener('click', function () {
            showContent();
            closeNav();
        });
        TweenMax.set(navCont, {xPercent: 100});
    }

    function navHoverHandler(item, i) {
        item.addEventListener('mouseover', function () {
            TweenMax.to(
                menuScreenItems[i], .3,
                {alpha: 1, ease: Power1.easeOut}
            );
        });
        item.addEventListener('mouseout', function () {
            TweenMax.to(
                menuScreenItems[i], .3,
                {alpha: 0, ease: Power1.easeOut}
            );
        });
    }

    function hideContent() {
        disableScroll();
        TweenMax.to(
            mainCont, 1,
            {xPercent: "-=50", ease: Expo.easeOut}
        );
        TweenMax.to(
            navOver, 1.5,
            {alpha: 1, ease: Expo.easeOut}
        );
        TweenMax.to(
            nav, .6,
            {right: -200, ease: Power3.easeOut}
        );
        TweenMax.to(
            mob, .6,
            {top: -100, ease: Power3.easeOut}
        );
        TweenMax.to(
            cls, .6,
            {right: -20, ease: Power3.easeOut}
        );
    }

    function showContent() {
        enableScroll();
        TweenMax.to(
            mainCont, 1,
            {xPercent: 0, ease: Expo.easeOut}
        );
        TweenMax.to(
            navOver, 1,
            {alpha: 0, ease: Expo.easeOut}
        );

        setTimeout(function () {
            TweenMax.to(
                nav, .6,
                {right: -20, ease: Power3.easeOut}
            );
            TweenMax.to(
                mob, .6,
                {top: 0, ease: Power3.easeOut}
            );
        }, 1000);

        TweenMax.to(
            cls, .6,
            {right: -200, ease: Power3.easeOut}
        );


    }


    function openNav() {
        TweenMax.to(
            navCont, 1,
            {xPercent: 0, ease: Expo.easeOut}
        );

        TweenMax.staggerFromTo(
            navItems, 1,
            {alpha: 0, y: 100},
            {alpha: 1, y: 0, ease: Expo.easeOut, delay: 0.1}, 0.05
        );
    }


    function closeNav() {
        TweenMax.to(
            navCont, 1,
            {xPercent: 100, ease: Expo.easeOut}
        );
    }

    var magnets = document.querySelectorAll('.q_magnet');
    var q_slide = document.getElementById('q_slide');
    var reveals = document.querySelectorAll('.reveal');

    if (q_slide) {
        qSlide(q_slide)
    }
    ;

    document.addEventListener("DOMContentLoaded", function () {
        if (magnets.length > 0) {
            qMagnet(magnets)
        }
    });


    if (reveals.length > 0) {

        for (var i = reveals.length - 1; i >= 0; i--) {

            var revealContainer = reveals[i];
            var revealItems = revealContainer.querySelectorAll('.rev_item');

            TweenMax.to(revealItems, .5, {alpha: 0});

            // Animate reveal on class change
            var observer = new MutationObserver(function (revealContainer) {
                animateReveal(revealContainer);
            })
            // Class change event listener
            observer.observe(revealContainer, {
                attributes: true,
                attributeFilter: ['class'],
                childList: false,
                characterData: false
            })


        }
        ;

    }

    window.addEventListener('scroll', function () {
        if (reveals) {
            qReveal(reveals)
        }
        ;
    });


    var loadOverlay = document.getElementById('overlay');
    if (loadOverlay) {
        ;(function () {
            function id(v) {
                return document.getElementById(v);
            }

            function loadbar() {
                var ovrl = id("overlay"),
                    stat = id("progstat"),
                    cvrl = id("content-overlay"),
                    pvrl = id("progress-overlay"),
                    itms = id("loading-items"),
                    img = document.images,
                    c = 0,
                    tot = img.length;

                disableScroll();

                if (tot == 0) {
                    setTimeout(function () {
                        doneLoading();
                    }, 200);
                }

                function imgLoaded() {
                    c += 1;
                    var perc = ((100 / tot * c) << 0);

                    stat.innerHTML = "Loading " + perc + "%";

                    if (c === tot) {
                        setTimeout(function () {
                            doneLoading();
                        }, 300);
                    }

                }

                function doneLoading() {

                    enableScroll();


                    TweenMax.to(
                        ovrl, 1.5,
                        {width: 0, ease: Expo.easeInOut, delay: .5}
                    );
                    TweenMax.to(
                        pvrl, 1.5,
                        {width: 0, ease: Expo.easeInOut, delay: .6}
                    );
                    TweenMax.to(
                        cvrl, 1.5,
                        {alpha: 0, ease: Power3.easeInOut, delay: .6}
                    );
                    TweenMax.to(
                        itms, 1.3,
                        {alpha: 0, ease: Expo.easeInOut, delay: .5}
                    );
                    setTimeout(function () {
                        ovrl.style.display = "none";
                        cvrl.style.display = "none";
                    }, 2200);

                    setTimeout(function () {
                        triggerResize();
                        headerAnimate();
                        resizeImg(reveals);
                    }, 600);

                    setTimeout(function () {
                        triggerResize();
                    }, 1200);


                }

                for (var i = 0; i < tot; i++) {
                    var tImg = new Image();
                    tImg.onload = imgLoaded;
                    tImg.onerror = imgLoaded;
                    tImg.src = img[i].src;
                }
            }

            document.addEventListener('DOMContentLoaded', loadbar, false);
        }());
    }


}


// ---------- Loading Screen ---------- //


function triggerResize() {
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent('resize', true, false);
    window.dispatchEvent(ev);
};


// page header

function headerAnimate() {

    var pageHeader = document.getElementById('page-top-banner');
    if (pageHeader) {
        var title = pageHeader.querySelector('.q_splitText');
        var text = pageHeader.querySelector('p');
        var btn = pageHeader.querySelector('.link');

        q_animate(title, 'splitLeft', 100);
        q_animate(text, 'slideTop', 1);
        if (btn) {
            q_animate(btn, 'slideTop', 1);
        }

    }
}


// ScrollTo Link

function qScroll(e) {
    e.preventDefault();

    const targetAnchor = window.innerHeight;
    window.scroll(0, targetAnchor);
}

var qScrolls = document.querySelectorAll('.q_scroll');
if (qScrolls.length > 0) {
    qScrolls.forEach(each => (each.onclick = qScroll));
}


// pages slider
var pageSlider = document.querySelector('.pages-top-banner-slider .slider');
if (pageSlider) {
    var flkty = new Flickity(pageSlider, {
        // options
        pageDots: true,
        prevNextButtons: false,
        contain: true,
        wrapAround: true,
        autoPlay: 6000,
        selectedAttraction: 0.02,
        friction: 0.3,
    });
}


// Testimonials Slider

var testiSliderTwo = document.getElementById('testiTwo');
if (testiSliderTwo) {


    var testiSlideTwo = new Flickity(testiSliderTwo, {
        // options
        pageDots: true,
        prevNextButtons: false,
        contain: true,
        wrapAround: true,
        autoPlay: true,
        draggable: true
    });


}

/**
 * Datepicker
 */
var startDate,
    endDate,
    updateStartDate = function () {
        startPicker.setStartRange(startDate);
        startPickerSide.setStartRange(startDate);
        endPicker.setStartRange(startDate);
        endPickerSide.setStartRange(startDate);
        endPicker.setMinDate(startDate);
        endPickerSide.setMinDate(startDate);
    },

    updateEndDate = function () {
        startPicker.setEndRange(endDate);
        startPickerSide.setEndRange(endDate);
        startPicker.setMaxDate(endDate);
        startPickerSide.setMaxDate(endDate);
        endPicker.setEndRange(endDate);
        endPickerSide.setEndRange(endDate);
    },

    startPicker = new Pikaday({
        field: document.querySelector('#checkin'),
        minDate: new Date(),
        container: document.querySelector('.calendar-container'),
        format: 'DD-MM-YYYY',
        onSelect: function () {
            startDate = this.getDate();
            updateStartDate();

            pushDate = new Date(startDate)

            var updateToo = document.querySelector('#checkin-side')
            updateToo.value = pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear()
        }
    }),

    startPickerSide = new Pikaday({
        field: document.querySelector('#checkin-side'),
        minDate: new Date(),
        container: document.querySelector('.calendar-container-side'),
        format: 'DD-MM-YYYY',
        onSelect: function () {
            startDate = this.getDate();
            updateStartDate();

            pushDate = new Date(startDate)

            var updateToo = document.querySelector('#checkin')
            updateToo.value = pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear()
        }
    }),

    endPicker = new Pikaday({
        field: document.querySelector('#checkout'),
        minDate: new Date(),
        container: document.querySelector('.calendar-container'),
        format: 'DD-MM-YYYY',
        onSelect: function () {
            endDate = this.getDate();
            updateEndDate();

            pushDate = new Date(endDate)

            var updateToo = document.querySelector('#checkout-side')
            updateToo.value = pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear()
        }
    }),

    endPickerSide = new Pikaday({
        field: document.querySelector('#checkout-side'),
        minDate: new Date(),
        container: document.querySelector('.calendar-container-side'),
        format: 'DD-MM-YYYY',
        onSelect: function () {
            endDate = this.getDate();
            updateEndDate();

            pushDate = new Date(endDate)

            var updateToo = document.querySelector('#checkout')
            updateToo.value = pushDate.getDate() + '-' + (pushDate.getMonth() + 1) + '-' + pushDate.getFullYear()

        }
    }),

    _startDate = startPicker.getDate(),
    _endDate = endPicker.getDate();

if (_startDate) {
    startDate = _startDate;
    updateStartDate();
}

if (_endDate) {
    endDate = _endDate;
    updateEndDate();
}


/**
 * add value button quality
 */

function increment(incrementor, target) {
    var value = parseInt(document.getElementById(target).value);
    value += incrementor;

    if (value > 0) {
        // document.getElementById(target).value = value;

        if (target == 'increment_adult' || target == 'increment_adult_popup') {
            document.getElementById('increment_adult').value = value;
            document.getElementById('increment_adult_popup').value = value;
        }

        if (target == 'increment_child' || target == 'increment_child_popup') {
            document.getElementById('increment_child').value = value;
            document.getElementById('increment_child_popup').value = value;
        }
    }
}



/**
 * Open popup exclusive deals
 */

/**
 * Popup exclusive deal carousel
 */
var popExDeals = document.querySelector('.exclusive-deal-popup .carousel')
if (popExDeals) {
    var flktyDeals = new Flickity(popExDeals, {
        // options
        pageDots: false,
        prevNextButtons: true,
        contain: true,
        wrapAround: true,
        imagesLoaded: true,
        draggable: false,
        arrowShape: {
            x0: 10,
            x1: 60, y1: 50,
            x2: 65, y2: 45,
            x3: 20
        },
    })


}

function openExclusiveDeal(index) {
    document.querySelector('.exclusive-deal-popup').classList.add('open');
    document.querySelector('body').style.overflow = 'hidden';
    // document.querySelector('#mainContent').classList.add('popup-open');

    // go to selected index
    this.flktyDeals.next()
    this.flktyDeals.select(index)
}

// close popup exclusive deal
var elClose = document.querySelectorAll('.exclusive-deal-popup .content-item .close');
elClose.forEach(function (el, i) {
    el.addEventListener('click', function () {
        document.querySelector('.exclusive-deal-popup').classList.remove('open');

        // document.querySelector('#mainContent').classList.remove('popup-open')
        document.querySelector('body').style.overflow = 'visible';

    })
});


/**
 * close popup homepage
 */
var btnClosePopupHome = document.querySelector('.popup-homepage .close');
if (btnClosePopupHome) {
    btnClosePopupHome.addEventListener('click', function () {
        document.querySelector('.popup-homepage').classList.remove('open');
    });
}


/**
 * hover menu dropdown
 */
var liMenu = document.querySelectorAll('.main-navigation li');

liMenu.forEach(function (el, i) {
    if (el.querySelector('ul')) {
        el.querySelector('ul').classList.add('sub-menu')
        el.querySelector('ul').parentElement.classList.add('parent-menu')
    }
});


/**
 * years
 */
var copyrightYear = document.getElementById('year_copy');
if (copyrightYear) {
    var d = new Date();
    copyrightYear.innerHTML = d.getFullYear();
}

/**
 * get clock on footer
 */
var fClock = document.getElementById('time__');
if (fClock) {

    let x = setInterval(function () {
        var time = new moment().format('hh:mm'),
            format = new moment().format('A');

        fClock.innerHTML = time;
        document.getElementById('time__format').innerHTML = format;
    }, 1000);
}


/**
 * Accommodation Hover
 */
(function ($) {
    if ($('#accommodations').length) {
        $("#accommodations .accommodation-type").each(function (i) {

            var _this = $(this);
            var _allVillaBackground = $('.accommodation-bg-change');
            var _villaBackground = _this.find('.accommodation-bg-change');


            /*
			** On resize window handle
			*/
            $(window).resize(function () {

                if ($(window).width() < 900) {

                    _villaBackground.css({
                        'background-image': "url(" + _villaBackground.attr('data-src') + ")"
                    });

                }
            });


            _this.hover(function () {

                if ($(window).width() > 900) {
                    _allVillaBackground.css({'background-image': "url(" + _villaBackground.attr('data-src') + ")"});
                } else {
                    _villaBackground.css({'background-image': "url(" + _villaBackground.attr('data-src') + ")"});
                }
                return false;
            });

        });
    }


    /**
     * get weather
     */
    let apiKey = '4d64ee966ea03fd197abf2ec155bb799',
        corLat = '-8.4406',
        corLong = '115.258202';

    function getWeather() {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather',
            data: {
                lat: corLat,
                lon: corLong,
                units: 'metric',
                APPID: apiKey
            },

            success: data => {
                $('.temperature .cc').append((Math.round(data["main"]["temp"])));
            }
        })
    }

    getWeather();

}(jQuery));

// Q ANIMATE

function q_animate(element, animation, delay) {

    if (animation === 'stagTop') {
        TweenMax.staggerFromTo(
            element, 1,
            {alpha: 0, y: 100},
            {alpha: 1, y: 0, ease: Expo.easeOut, delay: delay}, 0.1
        );
    }

    if (animation === 'slideTop') {
        TweenMax.fromTo(
            element, 1.5,
            {alpha: 0, y: 50},
            {alpha: 1, y: 0, ease: Expo.easeOut, delay: delay}
        );
    }

    else if (animation === 'sideLeft') {
        TweenMax.staggerFromTo(
            element, 1.5,
            {alpha: 0, x: 120},
            {alpha: 1, x: 0, ease: Expo.easeOut, delay: delay}, 0.2
        );
    }

    else if (animation === 'sideRight') {
        TweenMax.staggerFromTo(
            element, 1.5,
            {alpha: 0, x: -120},
            {alpha: 1, x: 0, ease: Expo.easeOut, delay: delay}, 0.2
        );
    }

    else if (animation === 'clipRight') {
        TweenMax.staggerTo(
            element, 1,
            {clipPath: 'inset(0px 0px 0px 0px)', ease: Expo.easeInOut, delay: delay}, 0.1
        );
    }

    else if (animation === 'splitLeft') {

        var content = element.textContent;
        var letters = content.split("");
        element.innerHTML = "";

        for (var idx = 0; idx < letters.length; idx++) {
            element.innerHTML += "<span>" + (letters[idx] === " " ? '&nbsp;' : letters[idx]) + "</span>";
        }

        var chars = element.querySelectorAll('span');

        TweenMax.set(chars, {x: 110, alpha: 0});

        setTimeout(function () {
            TweenMax.staggerTo(
                chars, 1.5,
                {x: 0, alpha: 1, ease: Power4.easeInOut}, 0.03
            );
        }, delay);

    }

    else if (animation === 'splitRight') {

        var content = element.textContent;
        var letters = content.split("");
        element.innerHTML = "";

        for (var idx = 0; idx < letters.length; idx++) {
            element.innerHTML += "<span>" + (letters[idx] === " " ? '&nbsp;' : letters[idx]) + "</span>";
        }

        var chars = element.querySelectorAll('span');

        TweenMax.set(chars, {x: -110, alpha: 0});

        setTimeout(function () {
            TweenMax.staggerTo(
                chars, 1.5,
                {x: 0, alpha: 1, ease: Power4.easeInOut}, -0.03
            );
        }, delay);

    }

};


// split text animation

function animateText() {
    var lettr = document.getElementById("lettr");
    var lines = lettr.querySelectorAll('font');
    for (var x = lines.length - 1; x >= 0; x--) {
        var line = lines[x];
        lineHandler(line);
    }
    ;

    function lineHandler(line) {
        var text = line.textContent;
        var wordSplit = text.split("");
        line.innerHTML = "";
        for (w = 0; w < wordSplit.length; w++) {
            line.innerHTML += "<span>" + wordSplit[w] + "</span>";
        }
        chars = line.querySelectorAll('span');
        for (var x = chars.length - 1; x >= 0; x--) {
            var char = chars[x];
            charHandler(char, x);
        }
        ;

        function charHandler(char, x) {
            char.style.transitionDelay = x * .1 + "s";
        }
    }
}

// ----- Q MAGNET ----- //


function qMagnet(magnets) {

    if (window.innerWidth > 540) {

        for (var i = magnets.length - 1; i >= 0; i--) {
            var magnet = magnets[i];

            var friction = magnet.getAttribute('friction') || .2;

            magnet.addEventListener("mouseover", function () {
                this.classList.add('hovered');
            });
            magnet.addEventListener("mouseout", function () {
                this.classList.remove('hovered');
                this.style.transform = 'translate(0px, 0px)';

            });

            magnet.addEventListener("mousemove", function (e) {

                const bounds = this.getBoundingClientRect();
                const centerX = bounds.left + (bounds.width / 2);
                const centerY = bounds.top + (bounds.height / 2);

                const deltaX = Math.floor((centerX - e.clientX)) * friction * -1;
                const deltaY = Math.floor((centerY - e.clientY)) * friction * -1;

                //this.style.transform = 'translate('+deltaX+'px, '+deltaY+'px)';

                TweenMax.to(this, 0, {
                    x: deltaX,
                    y: deltaY,
                });


            });
        }
        ;

    }
    ;

}


// ----- Q REVEAL ----- //


// Animate Reveal


function resizeImg(reveals) {

    for (var i = reveals.length - 1; i >= 0; i--) {

        var revealContainer = reveals[i];
        var clipReveal = revealContainer.querySelectorAll('.rev_clip');


        if (clipReveal.length > 0) {
            var w = clipReveal[0].clientWidth;

            var img = clipReveal[0].querySelector('.clip_image');
            var wrap = clipReveal[0].parentNode;
            var h = img.clientHeight;

            if (h != 0) {
                wrap.style.height = h + 'px';
                img.style.height = h * 1.5 + 'px';
                img.style.width = 'auto';
            }
        }
        ;
    }
}


function animateReveal(e) {
    var container = e[0].target;
    var revealItems = container.querySelectorAll('.rev_item');

    if (container.classList.contains("q_active")) {
        q_animate(revealItems, 'stagTop', .3);
    } else {
        TweenMax.to(revealItems, .5, {alpha: 0});
    }


    // image clipping mask reveal

    var clipReveal = container.querySelectorAll('.rev_clip');

    if (clipReveal.length > 0) {
        var w = clipReveal[0].clientWidth;
        if (container.classList.contains("q_active")) {
            TweenMax.fromTo(clipReveal, 1.4,
                {
                    x: -50,
                    alpha: 1,
                    clipPath: 'inset(0px ' + w + 'px 0px 0px)',
                    webkitClipPath: 'inset(0px ' + w + 'px 0px 0px)'
                },
                {
                    x: 0,
                    alpha: 1,
                    clipPath: 'inset(0px 0px 0px 0px)',
                    webkitClipPath: 'inset(0px 0px 0px 0px)',
                    ease: Expo.easeInOut
                })
        } else {
            TweenMax.to(clipReveal, 1,
                {alpha: 0, x: -50, ease: Power4.easeInOut})
        }
    }


}


function qReveal(reveals) {
    var scrollPos = window.scrollY;
    for (var i = reveals.length - 1; i >= 0; i--) {
        var revealContainer = reveals[i];
        revealHandler(revealContainer, scrollPos);
    }
    ;

    function revealHandler(revealContainer, scrollPos) {
        var elemTop = revealContainer.offsetTop - (window.innerHeight / 2);
        var elemBtm = elemTop + (revealContainer.clientHeight * 1.5);
        var revealItems = revealContainer.querySelectorAll('.rev_item');

        if (scrollPos > elemTop) {
            if (revealContainer.classList.contains("q_active")) return;
            revealContainer.classList.add("q_active");
        } else {
            if (!revealContainer.classList.contains("q_active")) return;
            revealContainer.classList.remove("q_active");
        }
    }
}


// ----- Q SLIDE ----- //


function qSlide(q_slide) {

    q_slide.classList.add('q_slide')

    // global vars

    var slides = q_slide.querySelectorAll('.slide');
    var pagination = q_slide.querySelector('.pagination');

    if (pagination.children[0]) {
        pagination.children[0].classList.add('q_current')
    }
	else if (!pagination.children[0]) {
        pagination.children[0].classList.add('q_current1')
    }

    // trigger resize

    function triggerResize() {
        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('resize', true, false);
        window.dispatchEvent(ev);
    };

    // autoplay function

    function autoPlay() {
        if (q_slide.getAttribute('autoplay') != null) {
            var q_slideDuration = q_slide.getAttribute('autoplay') || 6000;
            var timeout = setTimeout(function () {
                q_slideNext(q_slide, false, true);
            }, q_slideDuration);
        }
    };

    // parallax init

    var q_slideFriction = 1; // no parallax
    if (q_slide.getAttribute('parallax') != null) {
        var q_slideFriction = q_slide.getAttribute('parallax') || 0.25;
    }

    // opacity init

    if (q_slide.getAttribute('opacity') != null) {
        var slideOpacity = q_slide.getAttribute('opacity') || 0.6;
    }

    // pagination update function

    function pageUpdate() {
        if (pagination) {
            var pages = pagination.querySelectorAll('.item');
            var activePage = pagination.querySelector('.q_current');
            var newSlide = q_slide.querySelector('.is-new');
            var index = indexInParent(newSlide);

            activePage.classList.remove('q_current');
            pages[index].classList.add('q_current');
        }
    }


    // switch slide function

    function q_slideSwitch(q_slide, index, auto) {


        if (q_slide.getAttribute('wait') === 'true') return;


        var activeSlide = q_slide.querySelector('.q_current');
        var activeSlideImage = activeSlide.querySelector('.image-container');
        var newSlide = eq.call(slides, index);
        var newSlideImage = newSlide.querySelector('.image-container');
        var newSlideContent = newSlide.querySelector('.slide-content');
        var newSlideElements = newSlide.querySelectorAll('.caption > *');


        if (newSlide === activeSlide) return;

        newSlide.classList.add('is-new');

        var timeout = 0;
        clearTimeout(timeout);
        pageUpdate();


        q_slide.setAttribute('wait', 'true');

        if (indexInParent(newSlide) > indexInParent(activeSlide)) {
            // next slide
            var newSlideRight = 0;
            var newSlideLeft = 'auto';
            var newSlideImageLeft = -q_slide.clientWidth * (1 - q_slideFriction) + 'px';
            var newSlideContentLeft = 'auto';
            var newSlideContentRight = 0;
            var activeSlideImageLeft = -q_slide.clientWidth * q_slideFriction + 'px';
            var sideAnim = 'sideLeft';
            var splitAnim = 'splitLeft';
        } else {
            // prev slide
            var newSlideRight = '';
            var newSlideLeft = 0;
            var newSlideImageLeft = -q_slide.clientWidth * q_slideFriction + 'px';
            var newSlideContentLeft = 0;
            var newSlideContentRight = 'auto';
            var activeSlideImageLeft = q_slide.clientWidth * q_slideFriction + 'px';
            var sideAnim = 'sideRight';
            var splitAnim = 'splitRight';

        }

        newSlide.style.display = 'block';
        newSlide.style.width = 0;
        newSlide.style.right = newSlideRight;
        newSlide.style.left = newSlideLeft;
        newSlide.style.zIndex = 2;

        newSlideImage.style.width = q_slide.clientWidth + 'px';
        activeSlideImage.style.transform = 'translateX(0)';

        TweenMax.set(newSlideImage, {x: newSlideImageLeft});

        if (slideOpacity) {
            newSlideImage.style.opacity = slideOpacity;
        }

        newSlideContent.style.width = q_slide.clientWidth + 'px';
        newSlideContent.style.right = newSlideContentRight;
        newSlideContent.style.left = newSlideContentLeft;

        if (slideOpacity) {
            TweenMax.to(activeSlideImage, 1.5, {
                x: activeSlideImageLeft,
                opacity: slideOpacity,
                ease: Expo.easeInOut
            });
        } else {
            TweenMax.to(activeSlideImage, 1.5, {
                x: activeSlideImageLeft,
                ease: Expo.easeInOut
            });
        }
        ;


        TweenMax.to(newSlide, 1.5, {
            width: q_slide.clientWidth,
            ease: Expo.easeInOut
        });

        TweenMax.to(newSlideImage, 1.5, {
            x: 0,
            opacity: 1,
            ease: Expo.easeInOut,
            onComplete: function () {
                // switch active class
                newSlide.classList.add('q_current');
                newSlide.classList.remove('is-new');
                activeSlide.classList.remove('q_current');
                newSlideElements[0].removeAttribute('style');
                newSlide.removeAttribute('style');
                // reset all styles
                newSlideImage.removeAttribute('style');
                newSlideContent.removeAttribute('style');
                activeSlideImage.removeAttribute('style');
                q_slide.setAttribute('wait', 'false');

                if (auto) {
                    autoPlay()
                }
            }
        });


        // caption animation

        if (q_slide.getAttribute('animate') != null) {
            var animation = q_slide.getAttribute('animate') || 'stagTop';

            if (q_slide.getAttribute('animate') === 'side') {
                var animation = sideAnim;

            }

            var letters = newSlide.querySelectorAll('.q_splitText');
            if (letters) {
                for (var i = letters.length - 1; i >= 0; i--) {
                    var letter = letters[i];
                    q_animate(letter, splitAnim, 100);
                }
                ;

            }
            q_animate(newSlideElements, animation, .3);
        }
        ;

    }


    // next/prev slide switch calls

    function q_slideNext(q_slide, previous, auto) {

        var activeSlide = q_slide.querySelector('.q_current');
        var newSlide = null;
        if (previous) {
            newSlide = activeSlide.previousElementSibling;
            if (!newSlide) {
                newSlide = slides[slides.length - 1];
            }
        } else {
            newSlide = activeSlide.nextElementSibling;
            if (!newSlide)
                newSlide = slides[0];
        }
        q_slideSwitch(q_slide, indexInParent(newSlide), auto);

        triggerResize();

    }


    document.addEventListener("DOMContentLoaded", function () {

        for (var i = slides.length - 1; i >= 0; i--) {
            var slide = slides[i];
            slide.classList.add('is-loaded');
        }
        ;

// arrows click event

        var arrows = q_slide.querySelector('.arrows');

        if (arrows) {
            var next = arrows.querySelector('.next');
            var prev = arrows.querySelector('.prev');

            /*next.addEventListener('click', function (e) {
                q_slideNext(q_slide, false);
            });*/
            /*prev.addEventListener('click', function (e) {
                q_slideNext(q_slide, true);
            });*/
        }

        // pagination click event

        if (pagination) {
            var pages = pagination.querySelectorAll('.item');
            for (var i = pages.length - 1; i >= 0; i--) {
                var page = pages[i];
                page.addEventListener('click', function (e) {

                    q_slideSwitch(q_slide, indexInParent(e.target));
                    triggerResize();
                })
            }
            ;
        }

        autoPlay(); // autoplay init

    });


    // ----- SLIDESHOW PLUGINS ----- //

    // mousemove background animation

    if (q_slide.getAttribute('mousefollow') != null) {
        if (window.innerWidth > 540) {
            for (var i = slides.length - 1; i >= 0; i--) {
                var slide = slides[i].querySelector('.image-wrapper');
                TweenMax.set(slide, {scale: 1.1});
            }

            function moveBackground(e) {
                var lMouseX = Math.max(-100, Math.min(100, q_slide.clientWidth / 2 - e.clientX));
                var lMouseY = Math.max(-100, Math.min(100, q_slide.clientHeight / 2 - e.clientY));
                x = (25 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
                y = (15 * lMouseY) / 100;
                for (var i = slides.length - 1; i >= 0; i--) {
                    var slide = slides[i].querySelector('.image-wrapper');
                    TweenMax.to(slide, 3, {autoAlpha: 1, x: x, y: y, ease: Power1.easeOut});
                }
                ;
            }

            q_slide.onmousemove = function (e) {
                moveBackground(e)
            };
        }
        ;
    }

    // kenburns background animation

    if (q_slide.getAttribute('kenburns') != null) {
        for (var i = slides.length - 1; i >= 0; i--) {
            var img = slides[i].querySelector('.image-wrapper img');
            var freewayEaseTween = new TimelineMax({
                paused: true,
                repeat: -1,
                yoyo: true,
            });

            freewayEaseTween.set(img, {scale: 1})
                .to(img, 10, {scale: 1.08, autoRound: false, ease: Power1.easeOut})
                .progress(1).progress(0).play();
        }
    }
    ;

};

// Q SMOOTH

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {exports: {}};
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }

    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            if (object === null) object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);
                if (parent === null) {
                    return undefined;
                } else {
                    return get(parent, property, receiver);
                }
            } else if ("value" in desc) {
                return desc.value;
            } else {
                var getter = desc.get;
                if (getter === undefined) {
                    return undefined;
                }
                return getter.call(receiver);
            }
        };
        var _index = require('../../index');
        var _index2 = _interopRequireDefault(_index);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Parallax = function (_Smooth) {
            _inherits(Parallax, _Smooth);

            function Parallax(opt) {
                _classCallCheck(this, Parallax);

                var _this = _possibleConstructorReturn(this, (Parallax.__proto__ || Object.getPrototypeOf(Parallax)).call(this, opt));

                _this.createExtraBound();

                _this.resizing = false;
                _this.cache = null;
                _this.dom.divs = Array.prototype.slice.call(opt.divs, 0);
                return _this;
            }

            _createClass(Parallax, [{
                key: 'createExtraBound',
                value: function createExtraBound() {
                    var _this2 = this;

                    ['getCache', 'inViewport'].forEach(function (fn) {
                        return _this2[fn] = _this2[fn].bind(_this2);
                    });
                }
            }, {
                key: 'resize',
                value: function resize() {

                    this.resizing = true;

                    this.getCache();
                    _get(Parallax.prototype.__proto__ || Object.getPrototypeOf(Parallax.prototype), 'resize', this).call(this);

                    this.resizing = false;
                }
            }, {
                key: 'getCache',
                value: function getCache() {
                    var _this3 = this;

                    this.cache = [];

                    this.dom.divs.forEach(function (el, index) {

                        el.style.display = 'block';
                        el.style.transform = 'none';

                        var scrollY = _this3.vars.target;
                        var bounding = el.getBoundingClientRect();
                        var bounds = {
                            el: el,
                            state: true,
                            top: bounding.top + scrollY,
                            left: bounding.left,
                            center: bounding.height / 2,
                            bottom: bounding.bottom + scrollY,
                            speed: el.getAttribute('data-speed') || '0'
                        };

                        if (index === 4) {
                            //console.log(bounding.top, scrollY, bounds.top);
                        }

                        // this.vars.bounding = bounding.bottom > this.vars.bounding ? bounding.bottom - window.innerHeight : this.vars.bounding;
                        _this3.cache.push(bounds);
                    });


                    this.vars.bounding = this.dom.section.getBoundingClientRect().height - (this.vars.native ? 0 : this.vars.height);
                }
            }, {
                key: 'run',
                value: function run() {

                    this.dom.divs.forEach(this.inViewport);

                    this.dom.section.style[this.prefix] = this.getTransform(this.vars.current * -1);

                    _get(Parallax.prototype.__proto__ || Object.getPrototypeOf(Parallax.prototype), 'run', this).call(this);
                }
            }, {
                key: 'inViewport',
                value: function inViewport(el, index) {

                    if (!this.cache || this.resizing) return;

                    var cache = this.cache[index];
                    var current = this.vars.current;

                    var transform = (cache.top - current) * cache.speed
                    var top = Math.round(cache.top + transform - current);
                    var bottom = Math.round(cache.bottom + transform - current);
                    var inview = bottom > 0 && top < this.vars.height;

                    if (inview) {
                        el.style.display = 'block';
                        el.style[this.prefix] = this.getTransform(transform);
                    } else {


                    }
                }
            }]);

            return Parallax;
        }(_index2.default);

        exports.default = Parallax;

    }, {"../../index": 3}],

    2: [

        function (require, module, exports) {


            var _custom = require('./custom');
            var _custom2 = _interopRequireDefault(_custom);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var qSmooth = new _custom2.default({
                touchMultiplier: 1.8,
                forceVS: !0,
                preload: true,
                native: true,
                section: document.querySelector('.q_smooth'),
                divs: document.querySelectorAll('.vs-div'),
                vs: {

                    //limitInertia: true
                }
            });


            var nav = document.getElementById('mainNav');

            if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
                document.addEventListener("DOMContentLoaded", function () {


                    if (nav) {

                        var cls = document.getElementById('closePop');
                        var mainCont = document.getElementById('mainContent');

                        nav.addEventListener('click', function () {
                            TweenMax.set(mainCont, {y: -scrollY});
                            qSmooth.off();

                        });

                        cls.addEventListener('click', function () {
                            setTimeout(function () {
                                qSmooth.on();
                            }, 1000);
                        });


                        window.scroll(0, 0);

                        setTimeout(function () {
                            window.scroll(0, 0);
                        }, 100);
                    }

                    qSmooth.init();

                });
            }

        }

        , {"./custom": 1}],
    3: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _domClasses = require('dom-classes');
        var _domClasses2 = _interopRequireDefault(_domClasses);
        var _domCreateElement = require('dom-create-element');
        var _domCreateElement2 = _interopRequireDefault(_domCreateElement);
        var _prefix = require('prefix');
        var _prefix2 = _interopRequireDefault(_prefix);
        var _virtualScroll = require('virtual-scroll');
        var _virtualScroll2 = _interopRequireDefault(_virtualScroll);
        var _domEvents = require('dom-events');
        var _domEvents2 = _interopRequireDefault(_domEvents);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var Smooth = function () {
            function Smooth() {
                var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                _classCallCheck(this, Smooth);

                this.createBound();

                this.options = opt;

                this.prefix = (0, _prefix2.default)('transform');
                this.rAF = undefined;

                // It seems that under heavy load, Firefox will still call the RAF callback even though the RAF has been canceled
                // To prevent that we set a flag to prevent any callback to be executed when RAF is removed
                this.isRAFCanceled = false;

                var constructorName = this.constructor.name ? this.constructor.name : 'Smooth';
                this.extends = constructorName != 'Smooth';

                this.callback = this.options.callback || null;

                this.vars = {
                    direction: this.options.direction || 'vertical',
                    native: this.options.native || false,
                    ease: this.options.ease || 0.075,
                    preload: this.options.preload || false,
                    current: 0,
                    last: 0,
                    target: 0,
                    height: window.innerHeight,
                    width: window.innerWidth,
                    bounding: 0,
                    timer: null,
                    ticking: false
                };

                this.vs = this.vars.native ? null : new _virtualScroll2.default({
                    limitInertia: this.options.vs && this.options.vs.limitInertia || false,
                    mouseMultiplier: this.options.vs && this.options.vs.mouseMultiplier || 1,
                    touchMultiplier: this.options.vs && this.options.vs.touchMultiplier || 1.5,
                    firefoxMultiplier: this.options.vs && this.options.vs.firefoxMultiplier || 30,
                    preventTouch: this.options.vs && this.options.vs.preventTouch || true
                });

                this.dom = {
                    listener: this.options.listener || document.body,
                    section: this.options.section || document.querySelector('.q_smooth') || null,
                    scrollbar: this.vars.native || this.options.noscrollbar ? null : {
                        state: {
                            clicked: false,
                            x: 0
                        },
                        el: (0, _domCreateElement2.default)({
                            selector: 'div',
                            styles: 'vs-scrollbar vs-' + this.vars.direction + ' vs-scrollbar-' + constructorName.toLowerCase()
                        }),
                        drag: {
                            el: (0, _domCreateElement2.default)({selector: 'div', styles: 'vs-scrolldrag'}),
                            delta: 0,
                            height: 50
                        }
                    }
                };
            }

            _createClass(Smooth, [{
                key: 'createBound',
                value: function createBound() {
                    var _this = this;

                    ['run', 'calc', 'debounce', 'resize', 'mouseUp', 'mouseDown', 'mouseMove', 'calcScroll', 'scrollTo'].forEach(function (fn) {
                        return _this[fn] = _this[fn].bind(_this);
                    });
                }
            }, {
                key: 'init',
                value: function init() {

                    this.addClasses();

                    this.vars.preload && this.preloadImages();
                    this.vars.native ? this.addFakeScrollHeight() : !this.options.noscrollbar && this.addFakeScrollBar();

                    this.addEvents();
                    this.resize();
                }
            }, {
                key: 'addClasses',
                value: function addClasses() {

                    var type = this.vars.native ? 'native' : 'virtual';
                    var direction = this.vars.direction === 'vertical' ? 'y' : 'x';

                    _domClasses2.default.add(this.dom.listener, 'is-' + type + '-scroll');
                    _domClasses2.default.add(this.dom.listener, direction + '-scroll');
                }
            }, {
                key: 'preloadImages',
                value: function preloadImages() {
                    var _this2 = this;

                    var images = Array.prototype.slice.call(this.dom.listener.querySelectorAll('img'), 0);

                    images.forEach(function (image) {

                        var img = document.createElement('img');

                        _domEvents2.default.once(img, 'load', function () {

                            images.splice(images.indexOf(image), 1);
                            images.length === 0 && _this2.resize();
                        });

                        img.src = image.getAttribute('src');
                    });
                }
            }, {
                key: 'calc',
                value: function calc(e) {

                    var delta = this.vars.direction == 'horizontal' ? e.deltaX : e.deltaY;

                    this.vars.target += delta * -1;
                    this.clampTarget();
                }
            }, {
                key: 'debounce',
                value: function debounce() {
                    var _this3 = this;

                    var win = this.dom.listener === document.body;

                    this.vars.target = this.vars.direction === 'vertical' ? win ? window.scrollY || window.pageYOffset : this.dom.listener.scrollTop : win ? window.scrollX || window.pageXOffset : this.dom.listener.scrollLeft;

                    clearTimeout(this.vars.timer);

                    if (!this.vars.ticking) {
                        this.vars.ticking = true;
                        _domClasses2.default.add(this.dom.listener, 'is-scrolling');
                    }

                    this.vars.timer = setTimeout(function () {
                        _this3.vars.ticking = false;
                        _domClasses2.default.remove(_this3.dom.listener, 'is-scrolling');
                    }, 200);
                }
            }, {
                key: 'run',
                value: function run() {
                    if (this.isRAFCanceled) return;

                    this.vars.current += (this.vars.target - this.vars.current) * this.vars.ease;
                    this.vars.current < .1 && (this.vars.current = 0);

                    this.rAF = requestAnimationFrame(this.run);

                    if (!this.extends) {
                        this.dom.section.style[this.prefix] = this.getTransform(-this.vars.current.toFixed(2));
                    }

                    if (!this.vars.native && !this.options.noscrollbar) {
                        var size = this.dom.scrollbar.drag.height;
                        var bounds = this.vars.direction === 'vertical' ? this.vars.height : this.vars.width;
                        var value = Math.abs(this.vars.current) / (this.vars.bounding / (bounds - size)) + size / .5 - size;
                        var clamp = Math.max(0, Math.min(value - size, value + size));
                        this.dom.scrollbar.drag.el.style[this.prefix] = this.getTransform(clamp.toFixed(2));
                    }

                    if (this.callback && this.vars.current !== this.vars.last) {
                        this.callback(this.vars.current);
                    }

                    this.vars.last = this.vars.current;
                }
            }, {
                key: 'getTransform',
                value: function getTransform(value) {

                    return this.vars.direction === 'vertical' ? 'translate3d(0,' + value.toFixed(2) + 'px,0)' : 'translate3d(' + value.toFixed(2) + 'px,0,0)';
                }
            }, {
                key: 'on',
                value: function on() {
                    var requestAnimationFrame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                    if (this.isRAFCanceled) {
                        this.isRAFCanceled = false;
                    }

                    var node = this.dom.listener === document.body ? window : this.dom.listener;

                    this.vars.native ? _domEvents2.default.on(node, 'scroll', this.debounce) : this.vs && this.vs.on(this.calc);

                    requestAnimationFrame && this.requestAnimationFrame();
                }
            }, {
                key: 'off',
                value: function off() {
                    var cancelAnimationFrame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


                    var node = this.dom.listener === document.body ? window : this.dom.listener;

                    this.vars.native ? _domEvents2.default.off(node, 'scroll', this.debounce) : this.vs && this.vs.off(this.calc);

                    cancelAnimationFrame && this.cancelAnimationFrame();
                }
            }, {
                key: 'requestAnimationFrame',
                value: function (_requestAnimationFrame) {
                    function requestAnimationFrame() {
                        return _requestAnimationFrame.apply(this, arguments);
                    }

                    requestAnimationFrame.toString = function () {
                        return _requestAnimationFrame.toString();
                    };

                    return requestAnimationFrame;
                }(function () {

                    this.rAF = requestAnimationFrame(this.run);
                })
            }, {
                key: 'cancelAnimationFrame',
                value: function (_cancelAnimationFrame) {
                    function cancelAnimationFrame() {
                        return _cancelAnimationFrame.apply(this, arguments);
                    }

                    cancelAnimationFrame.toString = function () {
                        return _cancelAnimationFrame.toString();
                    };

                    return cancelAnimationFrame;
                }(function () {
                    this.isRAFCanceled = true;
                    cancelAnimationFrame(this.rAF);
                })
            }, {
                key: 'addEvents',
                value: function addEvents() {

                    this.on();

                    _domEvents2.default.on(window, 'resize', this.resize);
                }
            }, {
                key: 'removeEvents',
                value: function removeEvents() {

                    this.off();

                    _domEvents2.default.off(window, 'resize', this.resize);
                }
            }, {
                key: 'addFakeScrollBar',
                value: function addFakeScrollBar() {

                    this.dom.listener.appendChild(this.dom.scrollbar.el);
                    this.dom.scrollbar.el.appendChild(this.dom.scrollbar.drag.el);

                    _domEvents2.default.on(this.dom.scrollbar.el, 'click', this.calcScroll);
                    _domEvents2.default.on(this.dom.scrollbar.el, 'mousedown', this.mouseDown);

                    _domEvents2.default.on(document, 'mousemove', this.mouseMove);
                    _domEvents2.default.on(document, 'mouseup', this.mouseUp);
                }
            }, {
                key: 'removeFakeScrollBar',
                value: function removeFakeScrollBar() {

                    _domEvents2.default.off(this.dom.scrollbar.el, 'click', this.calcScroll);
                    _domEvents2.default.off(this.dom.scrollbar.el, 'mousedown', this.mouseDown);

                    _domEvents2.default.off(document, 'mousemove', this.mouseMove);
                    _domEvents2.default.off(document, 'mouseup', this.mouseUp);

                    this.dom.listener.removeChild(this.dom.scrollbar.el);
                }
            }, {
                key: 'mouseDown',
                value: function mouseDown(e) {

                    e.preventDefault();
                    e.which == 1 && (this.dom.scrollbar.state.clicked = true);
                }
            }, {
                key: 'mouseUp',
                value: function mouseUp(e) {

                    this.dom.scrollbar.state.clicked = false;

                    _domClasses2.default.remove(this.dom.listener, 'is-dragging');
                }
            }, {
                key: 'mouseMove',
                value: function mouseMove(e) {

                    this.dom.scrollbar.state.clicked && this.calcScroll(e);
                }
            }, {
                key: 'addFakeScrollHeight',
                value: function addFakeScrollHeight() {

                    this.dom.scroll = (0, _domCreateElement2.default)({
                        selector: 'div',
                        styles: 'vs-scroll-view'
                    });

                    this.dom.listener.appendChild(this.dom.scroll);
                }
            }, {
                key: 'removeFakeScrollHeight',
                value: function removeFakeScrollHeight() {

                    this.dom.listener.removeChild(this.dom.scroll);
                }
            }, {
                key: 'calcScroll',
                value: function calcScroll(e) {

                    var client = this.vars.direction == 'vertical' ? e.clientY : e.clientX;
                    var bounds = this.vars.direction == 'vertical' ? this.vars.height : this.vars.width;
                    var delta = client * (this.vars.bounding / bounds);

                    _domClasses2.default.add(this.dom.listener, 'is-dragging');

                    this.vars.target = delta;
                    this.clampTarget();
                    this.dom.scrollbar && (this.dom.scrollbar.drag.delta = this.vars.target);
                }
            }, {
                key: 'scrollTo',
                value: function scrollTo(offset) {

                    if (this.vars.native) {

                        this.vars.direction == 'vertical' ? window.scrollTo(0, offset) : window.scrollTo(offset, 0);
                    } else {

                        this.vars.target = offset;
                        this.clampTarget();
                    }
                }
            }, {
                key: 'resize',
                value: function resize() {

                    var prop = this.vars.direction === 'vertical' ? 'height' : 'width';

                    this.vars.height = window.innerHeight;
                    this.vars.width = window.innerWidth;

                    if (!this.extends) {
                        var bounding = this.dom.section.getBoundingClientRect();
                        this.vars.bounding = this.vars.direction === 'vertical' ? bounding.height - (this.vars.native ? 0 : this.vars.height) : bounding.right - (this.vars.native ? 0 : this.vars.width);
                    }

                    if (!this.vars.native && !this.options.noscrollbar) {
                        this.dom.scrollbar.drag.height = this.vars.height * (this.vars.height / (this.vars.bounding + this.vars.height));
                        this.dom.scrollbar.drag.el.style[prop] = this.dom.scrollbar.drag.height + 'px';
                    } else if (this.vars.native) {
                        this.dom.scroll.style[prop] = this.vars.bounding + 'px';
                    }

                    !this.vars.native && this.clampTarget();
                }
            }, {
                key: 'clampTarget',
                value: function clampTarget() {

                    this.vars.target = Math.round(Math.max(0, Math.min(this.vars.target, this.vars.bounding)));
                }
            }, {
                key: 'destroy',
                value: function destroy() {

                    if (this.vars.native) {

                        _domClasses2.default.remove(this.dom.listener, 'is-native-scroll');

                        this.removeFakeScrollHeight();
                    } else {

                        _domClasses2.default.remove(this.dom.listener, 'is-virtual-scroll');

                        !this.options.noscrollbar && this.removeFakeScrollBar();
                    }

                    this.vars.direction === 'vertical' ? _domClasses2.default.remove(this.dom.listener, 'y-scroll') : _domClasses2.default.remove(this.dom.listener, 'x-scroll');
                    this.vars.current = 0;

                    this.vs && (this.vs.destroy(), this.vs = null);

                    this.removeEvents();
                }
            }]);

            return Smooth;
        }();

        exports.default = Smooth;


        window.Smooth = Smooth;

    }, {"dom-classes": 5, "dom-create-element": 6, "dom-events": 7, "prefix": 11, "virtual-scroll": 17}],
    4: [function (require, module, exports) {
        'use strict';

        var toString = Object.prototype.toString,
            hasOwnProperty = Object.prototype.hasOwnProperty;

        module.exports = function (object) {
            if (!object) return console.warn('bindAll requires at least one argument.');

            var functions = Array.prototype.slice.call(arguments, 1);

            if (functions.length === 0) {

                for (var method in object) {
                    if (hasOwnProperty.call(object, method)) {
                        if (typeof object[method] == 'function' && toString.call(object[method]) == "[object Function]") {
                            functions.push(method);
                        }
                    }
                }
            }

            for (var i = 0; i < functions.length; i++) {
                var f = functions[i];
                object[f] = bind(object[f], object);
            }
        };

        /*
            Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
            bindAll is only needed for events binding so no need to make slow fixes for constructor
            or partial application.
        */
        function bind(func, context) {
            return function () {
                return func.apply(context, arguments);
            };
        }
    }, {}],
    5: [function (require, module, exports) {
        /**
         * Module dependencies.
         */

        var index = require('indexof');

        /**
         * Whitespace regexp.
         */

        var whitespaceRe = /\s+/;

        /**
         * toString reference.
         */

        var toString = Object.prototype.toString;

        module.exports = classes;
        module.exports.add = add;
        module.exports.contains = has;
        module.exports.has = has;
        module.exports.toggle = toggle;
        module.exports.remove = remove;
        module.exports.removeMatching = removeMatching;

        function classes(el) {
            if (el.classList) {
                return el.classList;
            }

            var str = el.className.replace(/^\s+|\s+$/g, '');
            var arr = str.split(whitespaceRe);
            if ('' === arr[0]) arr.shift();
            return arr;
        }

        function add(el, name) {
            // classList
            if (el.classList) {
                el.classList.add(name);
                return;
            }

            // fallback
            var arr = classes(el);
            var i = index(arr, name);
            if (!~i) arr.push(name);
            el.className = arr.join(' ');
        }

        function has(el, name) {
            return el.classList
                ? el.classList.contains(name)
                : !!~index(classes(el), name);
        }

        function remove(el, name) {
            if ('[object RegExp]' == toString.call(name)) {
                return removeMatching(el, name);
            }

            // classList
            if (el.classList) {
                el.classList.remove(name);
                return;
            }

            // fallback
            var arr = classes(el);
            var i = index(arr, name);
            if (~i) arr.splice(i, 1);
            el.className = arr.join(' ');
        }

        function removeMatching(el, re, ref) {
            var arr = Array.prototype.slice.call(classes(el));
            for (var i = 0; i < arr.length; i++) {
                if (re.test(arr[i])) {
                    remove(el, arr[i]);
                }
            }
        }

        function toggle(el, name) {
            // classList
            if (el.classList) {
                return el.classList.toggle(name);
            }

            // fallback
            if (has(el, name)) {
                remove(el, name);
            } else {
                add(el, name);
            }
        }

    }, {"indexof": 8}],
    6: [function (require, module, exports) {
        /*
        `dom-create-element`

        var create = require('dom-create-element');

        var el = create({
          selector: 'div',
          styles: 'preloader',
          html: '<span>Text</span>'
        });
        */

        module.exports = create;

        function create(opt) {

            opt = opt || {};

            var el = document.createElement(opt.selector);

            if (opt.attr) for (var index in opt.attr)
                opt.attr.hasOwnProperty(index) && el.setAttribute(index, opt.attr[index]);

            "a" == opt.selector && opt.link && (
                el.href = opt.link,
                opt.target && el.setAttribute("target", opt.target)
            );

            "img" == opt.selector && opt.src && (
                el.src = opt.src,
                opt.lazyload && (
                    el.style.opacity = 0,
                        el.onload = function () {
                            el.style.opacity = 1;
                        }
                )
            );

            opt.id && (el.id = opt.id);
            opt.styles && (el.className = opt.styles);

            opt.html && (el.innerHTML = opt.html);
            opt.children && (el.appendChild(opt.children));

            return el;
        };
    }, {}],
    7: [function (require, module, exports) {

        var synth = require('synthetic-dom-events');

        var on = function (element, name, fn, capture) {
            return element.addEventListener(name, fn, capture || false);
        };

        var off = function (element, name, fn, capture) {
            return element.removeEventListener(name, fn, capture || false);
        };

        var once = function (element, name, fn, capture) {
            function tmp(ev) {
                off(element, name, tmp, capture);
                fn(ev);
            }

            on(element, name, tmp, capture);
        };

        var emit = function (element, name, opt) {
            var ev = synth(name, opt);
            element.dispatchEvent(ev);
        };

        if (!document.addEventListener) {
            on = function (element, name, fn) {
                return element.attachEvent('on' + name, fn);
            };
        }

        if (!document.removeEventListener) {
            off = function (element, name, fn) {
                return element.detachEvent('on' + name, fn);
            };
        }

        if (!document.dispatchEvent) {
            emit = function (element, name, opt) {
                var ev = synth(name, opt);
                return element.fireEvent('on' + ev.type, ev);
            };
        }

        module.exports = {
            on: on,
            off: off,
            once: once,
            emit: emit
        };

    }, {"synthetic-dom-events": 12}],
    8: [function (require, module, exports) {

        var indexOf = [].indexOf;

        module.exports = function (arr, obj) {
            if (indexOf) return arr.indexOf(obj);
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === obj) return i;
            }
            return -1;
        };
    }, {}],
    9: [function (require, module, exports) {
// Generated by CoffeeScript 1.9.2
        (function () {
            var root;

            root = typeof exports !== "undefined" && exports !== null ? exports : this;

            root.Lethargy = (function () {
                function Lethargy(stability, sensitivity, tolerance, delay) {
                    this.stability = stability != null ? Math.abs(stability) : 8;
                    this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
                    this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
                    this.delay = delay != null ? delay : 150;
                    this.lastUpDeltas = (function () {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
                            results.push(null);
                        }
                        return results;
                    }).call(this);
                    this.lastDownDeltas = (function () {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
                            results.push(null);
                        }
                        return results;
                    }).call(this);
                    this.deltasTimestamp = (function () {
                        var i, ref, results;
                        results = [];
                        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
                            results.push(null);
                        }
                        return results;
                    }).call(this);
                }

                Lethargy.prototype.check = function (e) {
                    var lastDelta;
                    e = e.originalEvent || e;
                    if (e.wheelDelta != null) {
                        lastDelta = e.wheelDelta;
                    } else if (e.deltaY != null) {
                        lastDelta = e.deltaY * -40;
                    } else if ((e.detail != null) || e.detail === 0) {
                        lastDelta = e.detail * -40;
                    }
                    this.deltasTimestamp.push(Date.now());
                    this.deltasTimestamp.shift();
                    if (lastDelta > 0) {
                        this.lastUpDeltas.push(lastDelta);
                        this.lastUpDeltas.shift();
                        return this.isInertia(1);
                    } else {
                        this.lastDownDeltas.push(lastDelta);
                        this.lastDownDeltas.shift();
                        return this.isInertia(-1);
                    }
                    return false;
                };

                Lethargy.prototype.isInertia = function (direction) {
                    var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
                    lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
                    if (lastDeltas[0] === null) {
                        return direction;
                    }
                    if (this.deltasTimestamp[(this.stability * 2) - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[(this.stability * 2) - 1]) {
                        return false;
                    }
                    lastDeltasOld = lastDeltas.slice(0, this.stability);
                    lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
                    oldSum = lastDeltasOld.reduce(function (t, s) {
                        return t + s;
                    });
                    newSum = lastDeltasNew.reduce(function (t, s) {
                        return t + s;
                    });
                    oldAverage = oldSum / lastDeltasOld.length;
                    newAverage = newSum / lastDeltasNew.length;
                    if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && (this.sensitivity < Math.abs(newAverage))) {
                        return direction;
                    } else {
                        return false;
                    }
                };

                Lethargy.prototype.showLastUpDeltas = function () {
                    return this.lastUpDeltas;
                };

                Lethargy.prototype.showLastDownDeltas = function () {
                    return this.lastDownDeltas;
                };

                return Lethargy;

            })();

        }).call(this);

    }, {}],
    10: [function (require, module, exports) {
        /*
        object-assign
        (c) Sindre Sorhus
        @license MIT
        */

        'use strict';
        /* eslint-disable no-unused-vars */
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;

        function toObject(val) {
            if (val === null || val === undefined) {
                throw new TypeError('Object.assign cannot be called with null or undefined');
            }

            return Object(val);
        }

        function shouldUseNative() {
            try {
                if (!Object.assign) {
                    return false;
                }

                // Detect buggy property enumeration order in older V8 versions.

                // https://bugs.chromium.org/p/v8/issues/detail?id=4118
                var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
                test1[5] = 'de';
                if (Object.getOwnPropertyNames(test1)[0] === '5') {
                    return false;
                }

                // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                var test2 = {};
                for (var i = 0; i < 10; i++) {
                    test2['_' + String.fromCharCode(i)] = i;
                }
                var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                    return test2[n];
                });
                if (order2.join('') !== '0123456789') {
                    return false;
                }

                // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                var test3 = {};
                'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
                    test3[letter] = letter;
                });
                if (Object.keys(Object.assign({}, test3)).join('') !==
                    'abcdefghijklmnopqrst') {
                    return false;
                }

                return true;
            } catch (err) {
                // We don't expect any of the above to throw, but better to be safe.
                return false;
            }
        }

        module.exports = shouldUseNative() ? Object.assign : function (target, source) {
            var from;
            var to = toObject(target);
            var symbols;

            for (var s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);

                for (var key in from) {
                    if (hasOwnProperty.call(from, key)) {
                        to[key] = from[key];
                    }
                }

                if (getOwnPropertySymbols) {
                    symbols = getOwnPropertySymbols(from);
                    for (var i = 0; i < symbols.length; i++) {
                        if (propIsEnumerable.call(from, symbols[i])) {
                            to[symbols[i]] = from[symbols[i]];
                        }
                    }
                }
            }

            return to;
        };

    }, {}],
    11: [function (require, module, exports) {
// check document first so it doesn't error in node.js
        var style = typeof document != 'undefined'
            ? document.createElement('p').style
            : {}

        var prefixes = ['O', 'ms', 'Moz', 'Webkit']
        var upper = /([A-Z])/g
        var memo = {}

        /**
         * prefix `key`
         *
         *   prefix('transform') // => WebkitTransform
         *
         * @param {String} key
         * @return {String}
         * @api public
         */
        function prefix(key) {
            // Camel case
            key = key.replace(/-([a-z])/g, function (_, char) {
                return char.toUpperCase()
            })

            // Without prefix
            if (style[key] !== undefined) return key

            // With prefix
            var Key = key.charAt(0).toUpperCase() + key.slice(1)
            var i = prefixes.length
            while (i--) {
                var name = prefixes[i] + Key
                if (style[name] !== undefined) return name
            }

            return key
        }

        /**
         * Memoized version of `prefix`
         *
         * @param {String} key
         * @return {String}
         * @api public
         */
        function prefixMemozied(key) {
            return key in memo
                ? memo[key]
                : memo[key] = prefix(key)
        }

        /**
         * Create a dashed prefix
         *
         * @param {String} key
         * @return {String}
         * @api public
         */
        function prefixDashed(key) {
            key = prefix(key)
            if (upper.test(key)) {
                key = '-' + key.replace(upper, '-$1')
                upper.lastIndex = 0
            }
            return key.toLowerCase()
        }

        module.exports = prefixMemozied
        module.exports.dash = prefixDashed

    }, {}],
    12: [function (require, module, exports) {

// for compression
        var win = window;
        var doc = document || {};
        var root = doc.documentElement || {};

// detect if we need to use firefox KeyEvents vs KeyboardEvents
        var use_key_event = true;
        try {
            doc.createEvent('KeyEvents');
        }
        catch (err) {
            use_key_event = false;
        }

// Workaround for https://bugs.webkit.org/show_bug.cgi?id=16735
        function check_kb(ev, opts) {
            if (ev.ctrlKey != (opts.ctrlKey || false) ||
                ev.altKey != (opts.altKey || false) ||
                ev.shiftKey != (opts.shiftKey || false) ||
                ev.metaKey != (opts.metaKey || false) ||
                ev.keyCode != (opts.keyCode || 0) ||
                ev.charCode != (opts.charCode || 0)) {

                ev = document.createEvent('Event');
                ev.initEvent(opts.type, opts.bubbles, opts.cancelable);
                ev.ctrlKey = opts.ctrlKey || false;
                ev.altKey = opts.altKey || false;
                ev.shiftKey = opts.shiftKey || false;
                ev.metaKey = opts.metaKey || false;
                ev.keyCode = opts.keyCode || 0;
                ev.charCode = opts.charCode || 0;
            }

            return ev;
        }

// modern browsers, do a proper dispatchEvent()
        var modern = function (type, opts) {
            opts = opts || {};

            // which init fn do we use
            var family = typeOf(type);
            var init_fam = family;
            if (family === 'KeyboardEvent' && use_key_event) {
                family = 'KeyEvents';
                init_fam = 'KeyEvent';
            }

            var ev = doc.createEvent(family);
            var init_fn = 'init' + init_fam;
            var init = typeof ev[init_fn] === 'function' ? init_fn : 'initEvent';

            var sig = initSignatures[init];
            var args = [];
            var used = {};

            opts.type = type;
            for (var i = 0; i < sig.length; ++i) {
                var key = sig[i];
                var val = opts[key];
                // if no user specified value, then use event default
                if (val === undefined) {
                    val = ev[key];
                }
                used[key] = true;
                args.push(val);
            }
            ev[init].apply(ev, args);

            // webkit key event issue workaround
            if (family === 'KeyboardEvent') {
                ev = check_kb(ev, opts);
            }

            // attach remaining unused options to the object
            for (var key in opts) {
                if (!used[key]) {
                    ev[key] = opts[key];
                }
            }

            return ev;
        };

        var legacy = function (type, opts) {
            opts = opts || {};
            var ev = doc.createEventObject();

            ev.type = type;
            for (var key in opts) {
                if (opts[key] !== undefined) {
                    ev[key] = opts[key];
                }
            }

            return ev;
        };

// expose either the modern version of event generation or legacy
// depending on what we support
// avoids if statements in the code later
        module.exports = doc.createEvent ? modern : legacy;

        var initSignatures = require('./init.json');
        var types = require('./types.json');
        var typeOf = (function () {
            var typs = {};
            for (var key in types) {
                var ts = types[key];
                for (var i = 0; i < ts.length; i++) {
                    typs[ts[i]] = key;
                }
            }

            return function (name) {
                return typs[name] || 'Event';
            };
        })();

    }, {"./init.json": 13, "./types.json": 14}],
    13: [function (require, module, exports) {
        module.exports = {
            "initEvent": [
                "type",
                "bubbles",
                "cancelable"
            ],
            "initUIEvent": [
                "type",
                "bubbles",
                "cancelable",
                "view",
                "detail"
            ],
            "initMouseEvent": [
                "type",
                "bubbles",
                "cancelable",
                "view",
                "detail",
                "screenX",
                "screenY",
                "clientX",
                "clientY",
                "ctrlKey",
                "altKey",
                "shiftKey",
                "metaKey",
                "button",
                "relatedTarget"
            ],
            "initMutationEvent": [
                "type",
                "bubbles",
                "cancelable",
                "relatedNode",
                "prevValue",
                "newValue",
                "attrName",
                "attrChange"
            ],
            "initKeyboardEvent": [
                "type",
                "bubbles",
                "cancelable",
                "view",
                "ctrlKey",
                "altKey",
                "shiftKey",
                "metaKey",
                "keyCode",
                "charCode"
            ],
            "initKeyEvent": [
                "type",
                "bubbles",
                "cancelable",
                "view",
                "ctrlKey",
                "altKey",
                "shiftKey",
                "metaKey",
                "keyCode",
                "charCode"
            ]
        }

    }, {}],
    14: [function (require, module, exports) {
        module.exports = {
            "MouseEvent": [
                "click",
                "mousedown",
                "mouseup",
                "mouseover",
                "mousemove",
                "mouseout"
            ],
            "KeyboardEvent": [
                "keydown",
                "keyup",
                "keypress"
            ],
            "MutationEvent": [
                "DOMSubtreeModified",
                "DOMNodeInserted",
                "DOMNodeRemoved",
                "DOMNodeRemovedFromDocument",
                "DOMNodeInsertedIntoDocument",
                "DOMAttrModified",
                "DOMCharacterDataModified"
            ],
            "HTMLEvents": [
                "load",
                "unload",
                "abort",
                "error",
                "select",
                "change",
                "submit",
                "reset",
                "focus",
                "blur",
                "resize",
                "scroll"
            ],
            "UIEvent": [
                "DOMFocusIn",
                "DOMFocusOut",
                "DOMActivate"
            ]
        }

    }, {}],
    15: [function (require, module, exports) {
        function E() {
            // Keep this empty so it's easier to inherit from
            // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
        }

        E.prototype = {
            on: function (name, callback, ctx) {
                var e = this.e || (this.e = {});

                (e[name] || (e[name] = [])).push({
                    fn: callback,
                    ctx: ctx
                });

                return this;
            },

            once: function (name, callback, ctx) {
                var self = this;

                function listener() {
                    self.off(name, listener);
                    callback.apply(ctx, arguments);
                };

                listener._ = callback
                return this.on(name, listener, ctx);
            },

            emit: function (name) {
                var data = [].slice.call(arguments, 1);
                var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                var i = 0;
                var len = evtArr.length;

                for (i; i < len; i++) {
                    evtArr[i].fn.apply(evtArr[i].ctx, data);
                }

                return this;
            },

            off: function (name, callback) {
                var e = this.e || (this.e = {});
                var evts = e[name];
                var liveEvents = [];

                if (evts && callback) {
                    for (var i = 0, len = evts.length; i < len; i++) {
                        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                            liveEvents.push(evts[i]);
                    }
                }

                // Remove event from queue to prevent memory leak
                // Suggested by https://github.com/lazd
                // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

                (liveEvents.length)
                    ? e[name] = liveEvents
                    : delete e[name];

                return this;
            }
        };

        module.exports = E;

    }, {}],
    16: [function (require, module, exports) {
        'use strict';

        module.exports = function (source) {
            return JSON.parse(JSON.stringify(source));
        };
    }, {}],
    17: [function (require, module, exports) {
        'use strict';

        var objectAssign = require('object-assign');
        var Emitter = require('tiny-emitter');
        var Lethargy = require('lethargy').Lethargy;
        var support = require('./support');
        var clone = require('./clone');
        var bindAll = require('bindall-standalone');
        var EVT_ID = 'virtualscroll';

        module.exports = VirtualScroll;

        var keyCodes = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

        function VirtualScroll(options) {
            bindAll(this, '_onWheel', '_onMouseWheel', '_onTouchStart', '_onTouchMove', '_onKeyDown');

            this.el = window;
            if (options && options.el) {
                this.el = options.el;
                delete options.el;
            }
            this.options = objectAssign({
                mouseMultiplier: 1,
                touchMultiplier: 2,
                firefoxMultiplier: 15,
                keyStep: 120,
                preventTouch: false,
                unpreventTouchClass: 'vs-touchmove-allowed',
                limitInertia: false
            }, options);

            if (this.options.limitInertia) this._lethargy = new Lethargy();

            this._emitter = new Emitter();
            this._event = {
                y: 0,
                x: 0,
                deltaX: 0,
                deltaY: 0
            };

            this.touchStartX = null;
            this.touchStartY = null;
            this.bodyTouchAction = null;
        }

        VirtualScroll.prototype._notify = function (e) {
            var evt = this._event;
            evt.x += evt.deltaX;
            evt.y += evt.deltaY;

            this._emitter.emit(EVT_ID, {
                x: evt.x,
                y: evt.y,
                deltaX: evt.deltaX,
                deltaY: evt.deltaY,
                originalEvent: e
            });
        };

        VirtualScroll.prototype._onWheel = function (e) {
            var options = this.options;
            if (this._lethargy && this._lethargy.check(e) === false) return;

            var evt = this._event;

            // In Chrome and in Firefox (at least the new one)
            evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
            evt.deltaY = e.wheelDeltaY || e.deltaY * -1;

            // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
            // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
            if (support.isFirefox && e.deltaMode == 1) {
                evt.deltaX *= options.firefoxMultiplier;
                evt.deltaY *= options.firefoxMultiplier;
            }

            evt.deltaX *= options.mouseMultiplier;
            evt.deltaY *= options.mouseMultiplier;

            this._notify(e);
        };

        VirtualScroll.prototype._onMouseWheel = function (e) {
            if (this.options.limitInertia && this._lethargy.check(e) === false) return;

            var evt = this._event;

            // In Safari, IE and in Chrome if 'wheel' isn't defined
            evt.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
            evt.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

            this._notify(e);
        };

        VirtualScroll.prototype._onTouchStart = function (e) {
            var t = (e.targetTouches) ? e.targetTouches[0] : e;
            this.touchStartX = t.pageX;
            this.touchStartY = t.pageY;
        };

        VirtualScroll.prototype._onTouchMove = function (e) {
            var options = this.options;
            if (options.preventTouch
                && !e.target.classList.contains(options.unpreventTouchClass)) {
                e.preventDefault();
            }

            var evt = this._event;

            var t = (e.targetTouches) ? e.targetTouches[0] : e;

            evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
            evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;

            this.touchStartX = t.pageX;
            this.touchStartY = t.pageY;

            this._notify(e);
        };

        VirtualScroll.prototype._onKeyDown = function (e) {
            var evt = this._event;
            evt.deltaX = evt.deltaY = 0;

            switch (e.keyCode) {
                case keyCodes.LEFT:
                case keyCodes.UP:
                    evt.deltaY = this.options.keyStep;
                    break;

                case keyCodes.RIGHT:
                case keyCodes.DOWN:
                    evt.deltaY = -this.options.keyStep;
                    break;

                default:
                    return;
            }

            this._notify(e);
        };

        VirtualScroll.prototype._bind = function () {
            if (support.hasWheelEvent) this.el.addEventListener('wheel', this._onWheel);
            if (support.hasMouseWheelEvent) this.el.addEventListener('mousewheel', this._onMouseWheel);

            if (support.hasTouch) {
                this.el.addEventListener('touchstart', this._onTouchStart);
                this.el.addEventListener('touchmove', this._onTouchMove);
            }

            if (support.hasPointer && support.hasTouchWin) {
                this.bodyTouchAction = document.body.style.msTouchAction;
                document.body.style.msTouchAction = 'none';
                this.el.addEventListener('MSPointerDown', this._onTouchStart, true);
                this.el.addEventListener('MSPointerMove', this._onTouchMove, true);
            }

            if (support.hasKeyDown) document.addEventListener('keydown', this._onKeyDown);
        };

        VirtualScroll.prototype._unbind = function () {
            if (support.hasWheelEvent) this.el.removeEventListener('wheel', this._onWheel);
            if (support.hasMouseWheelEvent) this.el.removeEventListener('mousewheel', this._onMouseWheel);

            if (support.hasTouch) {
                this.el.removeEventListener('touchstart', this._onTouchStart);
                this.el.removeEventListener('touchmove', this._onTouchMove);
            }

            if (support.hasPointer && support.hasTouchWin) {
                document.body.style.msTouchAction = this.bodyTouchAction;
                this.el.removeEventListener('MSPointerDown', this._onTouchStart, true);
                this.el.removeEventListener('MSPointerMove', this._onTouchMove, true);
            }

            if (support.hasKeyDown) document.removeEventListener('keydown', this._onKeyDown);
        };

        VirtualScroll.prototype.on = function (cb, ctx) {
            this._emitter.on(EVT_ID, cb, ctx);

            var events = this._emitter.e;
            if (events && events[EVT_ID] && events[EVT_ID].length === 1) this._bind();
        };

        VirtualScroll.prototype.off = function (cb, ctx) {
            this._emitter.off(EVT_ID, cb, ctx);

            var events = this._emitter.e;
            if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
        };

        VirtualScroll.prototype.reset = function () {
            var evt = this._event;
            evt.x = 0;
            evt.y = 0;
        };

        VirtualScroll.prototype.destroy = function () {
            this._emitter.off();
            this._unbind();
        };

    }, {
        "./clone": 16,
        "./support": 18,
        "bindall-standalone": 4,
        "lethargy": 9,
        "object-assign": 10,
        "tiny-emitter": 15
    }],
    18: [function (require, module, exports) {
        'use strict';

        module.exports = (function getSupport() {
            return {
                hasWheelEvent: 'onwheel' in document,
                hasMouseWheelEvent: 'onmousewheel' in document,
                hasTouch: 'ontouchstart' in document,
                hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                hasPointer: !!window.navigator.msPointerEnabled,
                hasKeyDown: 'onkeydown' in document,
                isFirefox: navigator.userAgent.indexOf('Firefox') > -1
            };
        })();
    }, {}]
}, {}, [2]);






