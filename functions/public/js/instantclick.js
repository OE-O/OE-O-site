/** InstantClick Framework */
var instantclick, InstantClick = instantclick = function (t, e, n) {
    var r, i, o, a, l, f, s, d, c, u, p = 0,
        h = {},
        v = !1,
        g = !1,
        m = !1,
        y = 0,
        b = !1,
        w = !1,
        E = !1,
        x = [],
        k = 65,
        A = {
            preload: [],
            receive: [],
            wait: [],
            change: [],
            restore: [],
            exit: []
        },
        L = {},
        P = [],
        S = {},
        T = {};

    function C(t) {
        var e = t.indexOf("#");
        return -1 == e ? t : t.substr(0, e)
    }

    function O(t) {
        for (; t && "A" != t.nodeName;) t = t.parentNode;
        return t
    }

    function D(t) {
        var n = e.protocol + "//" + e.host;
        return !(t.target || t.hasAttribute("download") || 0 != t.href.indexOf(n + "/") || t.href.indexOf("#") > -1 && C(t.href) == r || function (t) {
            do {
                if (!t.hasAttribute) break;
                if (t.hasAttribute("data-instant")) return !1;
                if (t.hasAttribute("data-no-instant")) return !0
            } while (t = t.parentNode);
            return !1
        }(t))
    }

    function q(t) {
        for (var e = Array.prototype.slice.call(arguments, 1), n = !1, r = 0; r < A[t].length; r++)
            if ("receive" == t) {
                var i = A[t][r].apply(window, e);
                i && ("body" in i && (e[1] = i.body), "title" in i && (e[2] = i.title), n = i)
            } else A[t][r].apply(window, e);
        return n
    }

    function I(i, o, a, l) {
        if (function () {
                for (var t = 0; t < P.length; t++) "object" == typeof P[t] && "abort" in P[t] && (P[t].instantclickAbort = !0, P[t].abort());
                P = []
            }(), t.documentElement.replaceChild(o, t.body), t.title = i, a) {
            F("remove"), a != e.href && (history.pushState(null, null, a), n.indexOf(" CriOS/") > -1 && (t.title == i ? t.title = i + String.fromCharCode(160) : t.title = i));
            var f = a.indexOf("#"),
                d = f > -1 && t.getElementById(a.substr(f + 1)),
                c = 0;
            if (d)
                for (; d.offsetParent;) c += d.offsetTop, d = d.offsetParent;
            "requestAnimationFrame" in window ? requestAnimationFrame(function () {
                scrollTo(0, c)
            }) : scrollTo(0, c), N(), (r = C(a)) in S && (S[r] = []), L[r] = {}, H(function (t) {
                return !t.hasAttribute("data-instant-track")
            }), q("change", !1)
        } else scrollTo(0, l), s.abort(), M(), H(function (t) {
                return t.hasAttribute("data-instant-restore")
            }),
            function () {
                for (var t in L[r])
                    if ("delayLeft" in L[r][t]) {
                        for (var e = [L[r][t].callback, L[r][t].delayLeft], n = 0; n < L[r][t].params.length; n++) e.push(L[r][t].params[n]);
                        Y(e, L[r][t].isRepeating, L[r][t].delay), delete L[r][t]
                    }
            }(), q("restore")
    }

    function M() {
        b = !1, w = !1
    }

    function N() {
        for (var t in L[r]) {
            var e = L[r][t];
            window.clearTimeout(e.realId), e.delayLeft = e.delay - +new Date + e.timestamp
        }
    }

    function B() {
        s.abort(), M()
    }

    function F(t) {
        if (r in S)
            for (var e = 0; e < S[r].length; e++) window[t + "EventListener"].apply(window, S[r][e])
    }

    function H(e) {
        var n, r, i, o, a, l = t.body.getElementsByTagName("script"),
            f = [];
        for (a = 0; a < l.length; a++) f.push(l[a]);
        for (a = 0; a < f.length; a++)
            if ((n = f[a]) && e(n)) {
                r = t.createElement("script");
                for (var s = 0; s < n.attributes.length; s++) r.setAttribute(n.attributes[s].name, n.attributes[s].value);
                r.textContent = n.textContent, i = n.parentNode, o = n.nextSibling, i.removeChild(n), i.insertBefore(r, o)
            }
    }

    function R() {
        for (var e, n, r = t.querySelectorAll("[data-instant-track]"), i = 0; i < r.length; i++) n = (e = r[i]).getAttribute("href") || e.getAttribute("src") || e.textContent, x.push(n)
    }

    function Y(t, e, n) {
        var i, o = t[0],
            a = t[1],
            l = [].slice.call(t, 2),
            f = +new Date,
            s = ++p;
        i = e ? function (e) {
            o(e), delete L[r][s], t[0] = o, t[1] = a, Y(t, !0)
        } : function (t) {
            o(t), delete L[r][s]
        }, t[0] = i, null != n && (f += a - n, a = n);
        var d = window.setTimeout.apply(window, t);
        return L[r][s] = {
            realId: d,
            timestamp: f,
            callback: o,
            delay: a,
            params: l,
            isRepeating: e
        }, -s
    }

    function K(t) {
        var e = O(t.target);
        e && D(e) && V(e.href)
    }

    function j(t) {
        if (!(a > +new Date - 500 || +new Date - y < 100)) {
            var e = O(t.target);
            e && e != O(t.relatedTarget) && D(e) && (e.addEventListener("mouseout", X), w || (i = e.href, o = rt(V, k)))
        }
    }

    function G(t) {
        a = +new Date;
        var e = O(t.target);
        e && D(e) && (f && (it(f), f = !1), e.addEventListener("touchend", z), e.addEventListener("touchcancel", z), V(e.href))
    }

    function U() {
        t.addEventListener("click", W)
    }

    function W(e) {
        if (t.removeEventListener("click", W), f && (it(f), f = !1), !e.defaultPrevented) {
            var n = O(e.target);
            n && D(n) && (0 != e.button || e.metaKey || e.ctrlKey || (e.preventDefault(), Z(n.href)))
        }
    }

    function X(t) {
        if (O(t.target) != O(t.relatedTarget)) return o ? (it(o), void(o = !1)) : void(b && !w && (s.abort(), M()))
    }

    function z(t) {
        b && !w && (f = rt(B, 500))
    }

    function J() {
        if (2 == s.readyState) {
            var n = s.getResponseHeader("Content-Type");
            n && /^text\/html/i.test(n) || (d = !0)
        }
        if (!(s.readyState < 4)) {
            if (0 == s.status) return E = !0, void(w && (q("exit", v, "network error"), e.href = v));
            if (d) w && (q("exit", v, "non-html content-type"), e.href = v);
            else {
                var r = t.implementation.createHTMLDocument("");
                r.documentElement.innerHTML = s.responseText.replace(/<noscript[\s\S]+?<\/noscript>/gi, ""), g = r.title, m = r.body;
                var i = q("receive", v, m, g);
                i && ("body" in i && (m = i.body), "title" in i && (g = i.title));
                var o = C(v);
                h[o] = {
                    body: m,
                    title: g,
                    scrollPosition: o in h ? h[o].scrollPosition : 0
                };
                var a, l, f = r.querySelectorAll("[data-instant-track]");
                if (f.length != x.length) c = !0;
                else
                    for (var u = 0; u < f.length; u++) l = (a = f[u]).getAttribute("href") || a.getAttribute("src") || a.textContent, -1 == x.indexOf(l) && (c = !0);
                w && (w = !1, Z(v))
            }
        }
    }

    function Q() {
        var t = C(e.href);
        if (t != r) {
            if (w && (M(), s.abort()), !(t in h)) return q("exit", e.href, "not in history"), void(t == e.href ? e.href = e.href : e.reload());
            h[r].scrollPosition = pageYOffset, N(), F("remove"), r = t, I(h[t].title, h[t].body, !1, h[t].scrollPosition), F("add")
        }
    }

    function V(t) {
        o && (it(o), o = !1), t || (t = i), b && (t == v || w) || (b = !0, w = !1, v = t, m = !1, d = !1, E = !1, c = !1, q("preload"), s.open("GET", t), s.timeout = 9e4, s.send())
    }

    function Z(t) {
        return y = +new Date, o || !b ? o && v && v != t ? (q("exit", t, "click occured while preloading planned"), void(e.href = t)) : (V(t), q("wait"), void(w = !0)) : w ? (q("exit", t, "clicked on a link while waiting for another page to display"), void(e.href = t)) : d ? (q("exit", v, "non-html content-type"), void(e.href = v)) : E ? (q("exit", v, "network error"), void(e.href = v)) : c ? (q("exit", v, "different assets"), void(e.href = v)) : m ? (h[r].scrollPosition = pageYOffset, M(), void I(g, m, v)) : (q("wait"), void(w = !0))
    }
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector || function (e) {
        for (var n = t.querySelectorAll(e), r = 0; r < n.length; r++)
            if (n[r] == this) return !0;
        return !1
    });
    var $ = !1;
    if ("pushState" in history && "file:" != e.protocol) {
        $ = !0;
        var _ = n.indexOf("Android ");
        if (_ > -1) {
            var tt = parseFloat(n.substr(_ + "Android ".length));
            if (tt < 4.4 && ($ = !1, tt >= 4))
                for (var et = [/ Chrome\//, / UCBrowser\//, / Firefox\//, / Windows Phone /], nt = 0; nt < et.length; nt++)
                    if (et[nt].test(n)) {
                        $ = !0;
                        break
                    }
        }
    }

    function rt() {
        return Y(arguments, !1)
    }

    function it(t) {
        for (var e in t = -t, L) t in L[e] && (window.clearTimeout(L[e][t].realId), delete L[e][t])
    }

    function ot(t, e, n) {
        var r = T[e][t].indexOf(n);
        r > -1 && T[e][t].splice(r, 1)
    }
    return {
        supported: $,
        init: function (n) {
            $ ? l || (l = !0, "mousedown" == n ? u = !0 : "number" == typeof n && (k = n), r = C(e.href), L[r] = {}, h[r] = {
                body: t.body,
                title: t.title,
                scrollPosition: pageYOffset
            }, "loading" == t.readyState ? t.addEventListener("DOMContentLoaded", R) : R(), (s = new XMLHttpRequest).addEventListener("readystatechange", J), t.addEventListener("touchstart", G, !0), u ? t.addEventListener("mousedown", K, !0) : t.addEventListener("mouseover", j, !0), t.addEventListener("click", U, !0), addEventListener("popstate", Q)) : q("change", !0)
        },
        on: function (t, e) {
            A[t].push(e), "change" == t && e(!y)
        },
        setTimeout: rt,
        setInterval: function () {
            return Y(arguments, !0)
        },
        clearTimeout: it,
        xhr: function (t) {
            P.push(t)
        },
        addPageEvent: function () {
            r in S || (S[r] = []), S[r].push(arguments), addEventListener.apply(window, arguments)
        },
        removePageEvent: function () {
            if (r in S) t: for (var t = 0; t < S[r].length; t++)
                if (arguments.length == S[r][t].length) {
                    for (var e = 0; e < S[r][t].length; e++)
                        if (arguments[e] != S[r][t][e]) continue t;
                    S[r].splice(t, 1)
                }
        },
        addEvent: function (e, r, i) {
            if (!(r in T) && (T[r] = {}, t.addEventListener(r, function (t) {
                    var e = t.target;
                    for (t.originalStopPropagation = t.stopPropagation, t.stopPropagation = function () {
                            this.isPropagationStopped = !0, this.originalStopPropagation()
                        }; e && 1 == e.nodeType;) {
                        for (var n in T[r])
                            if (e.matches(n)) {
                                for (var i = 0; i < T[r][n].length; i++) T[r][n][i].call(e, t);
                                if (t.isPropagationStopped) return;
                                break
                            } e = e.parentNode
                    }
                }, !1), "click" == r && /iP(?:hone|ad|od)/.test(n))) {
                var o = t.createElement("style");
                o.setAttribute("instantclick-mobile-safari-cursor", ""), o.textContent = "body { cursor: pointer !important; }", t.head.appendChild(o)
            }
            e in T[r] || (T[r][e] = []), ot(e, r, i), T[r][e].push(i)
        },
        removeEvent: ot
    }
}(document, location, navigator.userAgent);