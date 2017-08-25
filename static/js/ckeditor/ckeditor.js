﻿(function() {
    if (window.CKEDITOR && window.CKEDITOR.dom) return;
    window.CKEDITOR || (window.CKEDITOR = function() {
        var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
            d = {
                timestamp: "H5SC",
                version: "4.7.1",
                revision: "08ffd39",
                rnd: Math.floor(900 * Math.random()) + 100,
                _: { pending: [], basePathSrcPattern: a },
                status: "unloaded",
                basePath: function() {
                    var b = window.CKEDITOR_BASEPATH || "";
                    if (!b)
                        for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) { var k = c[d].src.match(a); if (k) { b = k[1]; break } } - 1 == b.indexOf(":/") && "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] +
                            b : location.href.match(/^[^\?]*\/(?:)/)[0] + b);
                    if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                    return b
                }(),
                getUrl: function(a) {
                    -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                    this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
                    return a
                },
                domReady: function() {
                    function a() {
                        try {
                            document.addEventListener ? (document.removeEventListener("DOMContentLoaded",
                                a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                        } catch (c) {}
                    }

                    function b() { for (var a; a = c.shift();) a() }
                    var c = [];
                    return function(b) {
                        function d() { try { document.documentElement.doScroll("left") } catch (f) { setTimeout(d, 1); return } a() } c.push(b);
                        "complete" === document.readyState && setTimeout(a, 1);
                        if (1 == c.length)
                            if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                            else if (document.attachEvent) {
                            document.attachEvent("onreadystatechange",
                                a);
                            window.attachEvent("onload", a);
                            b = !1;
                            try { b = !window.frameElement } catch (q) {} document.documentElement.doScroll && b && d()
                        }
                    }
                }()
            },
            b = window.CKEDITOR_GETURL;
        if (b) {
            var c = d.getUrl;
            d.getUrl = function(a) { return b.call(d, a) || c.call(d, a) }
        }
        return d
    }());
    CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(a) {
        var d = CKEDITOR.event.prototype,
            b;
        for (b in d) null == a[b] && (a[b] = d[b])
    }, CKEDITOR.event.prototype = function() {
        function a(a) { var e = d(this); return e[a] || (e[a] = new b(a)) }
        var d = function(a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) },
            b = function(a) {
                this.name = a;
                this.listeners = []
            };
        b.prototype = {
            getListenerIndex: function(a) {
                for (var b = 0, d = this.listeners; b < d.length; b++)
                    if (d[b].fn == a) return b;
                return -1
            }
        };
        return {
            define: function(b, d) {
                var g = a.call(this, b);
                CKEDITOR.tools.extend(g, d, !0)
            },
            on: function(b, d, g, h, k) {
                function n(a, f, C, k) { a = { name: b, sender: this, editor: a, data: f, listenerData: h, stop: C, cancel: k, removeListener: q }; return !1 === d.call(g, a) ? !1 : a.data }

                function q() { C.removeListener(b, d) }
                var f = a.call(this, b);
                if (0 > f.getListenerIndex(d)) {
                    f = f.listeners;
                    g || (g = this);
                    isNaN(k) && (k = 10);
                    var C = this;
                    n.fn = d;
                    n.priority = k;
                    for (var w = f.length - 1; 0 <= w; w--)
                        if (f[w].priority <= k) return f.splice(w + 1, 0, n), { removeListener: q };
                    f.unshift(n)
                }
                return { removeListener: q }
            },
            once: function() {
                var a = Array.prototype.slice.call(arguments),
                    b = a[1];
                a[1] = function(a) { a.removeListener(); return b.apply(this, arguments) };
                return this.on.apply(this, a)
            },
            capture: function() {
                CKEDITOR.event.useCapture = 1;
                var a = this.on.apply(this, arguments);
                CKEDITOR.event.useCapture = 0;
                return a
            },
            fire: function() {
                var a = 0,
                    b = function() { a = 1 },
                    g = 0,
                    h = function() { g = 1 };
                return function(k, n, q) {
                    var f = d(this)[k];
                    k = a;
                    var C = g;
                    a = g = 0;
                    if (f) {
                        var w = f.listeners;
                        if (w.length)
                            for (var w = w.slice(0), A, E = 0; E < w.length; E++) {
                                if (f.errorProof) try {
                                    A =
                                        w[E].call(this, q, n, b, h)
                                } catch (x) {} else A = w[E].call(this, q, n, b, h);
                                !1 === A ? g = 1 : "undefined" != typeof A && (n = A);
                                if (a || g) break
                            }
                    }
                    n = g ? !1 : "undefined" == typeof n ? !0 : n;
                    a = k;
                    g = C;
                    return n
                }
            }(),
            fireOnce: function(a, b, g) {
                b = this.fire(a, b, g);
                delete d(this)[a];
                return b
            },
            removeListener: function(a, b) {
                var g = d(this)[a];
                if (g) {
                    var h = g.getListenerIndex(b);
                    0 <= h && g.listeners.splice(h, 1)
                }
            },
            removeAllListeners: function() {
                var a = d(this),
                    b;
                for (b in a) delete a[b]
            },
            hasListeners: function(a) { return (a = d(this)[a]) && 0 < a.listeners.length }
        }
    }());
    CKEDITOR.editor || (CKEDITOR.editor = function() {
        CKEDITOR._.pending.push([this, arguments]);
        CKEDITOR.event.call(this)
    }, CKEDITOR.editor.prototype.fire = function(a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fire.call(this, a, d, this) }, CKEDITOR.editor.prototype.fireOnce = function(a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, a, d, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
    CKEDITOR.env || (CKEDITOR.env = function() {
        var a = navigator.userAgent.toLowerCase(),
            d = a.match(/edge[ \/](\d+.?\d*)/),
            b = -1 < a.indexOf("trident/"),
            b = !(!d && !b),
            b = {
                ie: b,
                edge: !!d,
                webkit: !b && -1 < a.indexOf(" applewebkit/"),
                air: -1 < a.indexOf(" adobeair/"),
                mac: -1 < a.indexOf("macintosh"),
                quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode),
                mobile: -1 < a.indexOf("mobile"),
                iOS: /(ipad|iphone|ipod)/.test(a),
                isCustomDomain: function() {
                    if (!this.ie) return !1;
                    var a = document.domain,
                        b = window.location.hostname;
                    return a != b && a != "[" + b + "]"
                },
                secure: "https:" == location.protocol
            };
        b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie;
        b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0);
        var c = 0;
        b.ie && (c = d ? parseFloat(d[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks);
        b.gecko && (d = a.match(/rv:([\d\.]+)/)) && (d = d[1].split("."), c = 1E4 * d[0] + 100 * (d[1] || 0) + 1 * (d[2] || 0));
        b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
        b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
        b.version = c;
        b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit && 534 > c);
        b.hidpi = 2 <= window.devicePixelRatio;
        b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c;
        b.needsNbspFiller = b.ie && 11 > c;
        b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown");
        b.quirks && (b.cssClass += " cke_browser_quirks");
        b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version));
        b.air && (b.cssClass += " cke_browser_air");
        b.iOS && (b.cssClass += " cke_browser_ios");
        b.hidpi && (b.cssClass += " cke_hidpi");
        return b
    }());
    "unloaded" == CKEDITOR.status && function() {
        CKEDITOR.event.implementOn(CKEDITOR);
        CKEDITOR.loadFullCore = function() {
            if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1;
            else {
                delete CKEDITOR.loadFullCore;
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.src = CKEDITOR.basePath + "ckeditor.js";
                document.getElementsByTagName("head")[0].appendChild(a)
            }
        };
        CKEDITOR.loadFullCoreTimeout = 0;
        CKEDITOR.add = function(a) {
            (this._.pending || (this._.pending = [])).push(a)
        };
        (function() {
            CKEDITOR.domReady(function() {
                var a =
                    CKEDITOR.loadFullCore,
                    d = CKEDITOR.loadFullCoreTimeout;
                a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : d && setTimeout(function() { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * d))
            })
        })();
        CKEDITOR.status = "basic_loaded"
    }();
    "use strict";
    CKEDITOR.VERBOSITY_WARN = 1;
    CKEDITOR.VERBOSITY_ERROR = 2;
    CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR;
    CKEDITOR.warn = function(a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: a, additionalData: d }) };
    CKEDITOR.error = function(a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", { type: "error", errorCode: a, additionalData: d }) };
    CKEDITOR.on("log", function(a) {
        if (window.console && window.console.log) {
            var d = console[a.data.type] ? a.data.type : "log",
                b = a.data.errorCode;
            if (a = a.data.additionalData) console[d]("[CKEDITOR] Error code: " + b + ".", a);
            else console[d]("[CKEDITOR] Error code: " + b + ".");
            console[d]("[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-" + b)
        }
    }, null, null, 999);
    CKEDITOR.dom = {};
    (function() {
        var a = [],
            d = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
            b = /&/g,
            c = />/g,
            e = /</g,
            g = /"/g,
            h = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
            k = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" },
            n = function(a, f) { return "#" == f[0] ? String.fromCharCode(parseInt(f.slice(1), 10)) : k[f] };
        CKEDITOR.on("reset", function() { a = [] });
        CKEDITOR.tools = {
            arrayCompare: function(a, f) {
                if (!a && !f) return !0;
                if (!a || !f || a.length != f.length) return !1;
                for (var b = 0; b < a.length; b++)
                    if (a[b] != f[b]) return !1;
                return !0
            },
            getIndex: function(a, f) {
                for (var b = 0; b < a.length; ++b)
                    if (f(a[b])) return b;
                return -1
            },
            clone: function(a) {
                var f;
                if (a && a instanceof Array) { f = []; for (var b = 0; b < a.length; b++) f[b] = CKEDITOR.tools.clone(a[b]); return f }
                if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a;
                f = new a.constructor;
                for (b in a) f[b] = CKEDITOR.tools.clone(a[b]);
                return f
            },
            capitalize: function(a, f) {
                return a.charAt(0).toUpperCase() +
                    (f ? a.slice(1) : a.slice(1).toLowerCase())
            },
            extend: function(a) {
                var f = arguments.length,
                    b, c;
                "boolean" == typeof(b = arguments[f - 1]) ? f-- : "boolean" == typeof(b = arguments[f - 2]) && (c = arguments[f - 1], f -= 2);
                for (var k = 1; k < f; k++) {
                    var d = arguments[k],
                        n;
                    for (n in d)
                        if (!0 === b || null == a[n])
                            if (!c || n in c) a[n] = d[n]
                }
                return a
            },
            prototypedCopy: function(a) {
                var f = function() {};
                f.prototype = a;
                return new f
            },
            copy: function(a) {
                var f = {},
                    b;
                for (b in a) f[b] = a[b];
                return f
            },
            isArray: function(a) { return "[object Array]" == Object.prototype.toString.call(a) },
            isEmpty: function(a) {
                for (var f in a)
                    if (a.hasOwnProperty(f)) return !1;
                return !0
            },
            cssVendorPrefix: function(a, f, b) {
                if (b) return d + a + ":" + f + ";" + a + ":" + f;
                b = {};
                b[a] = f;
                b[d + a] = f;
                return b
            },
            cssStyleToDomStyle: function() {
                var a = document.createElement("div").style,
                    f = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float";
                return function(a) { return "float" == a ? f : a.replace(/-./g, function(a) { return a.substr(1).toUpperCase() }) }
            }(),
            buildStyleHtml: function(a) {
                a = [].concat(a);
                for (var f,
                        b = [], c = 0; c < a.length; c++)
                    if (f = a[c]) /@import|[{}]/.test(f) ? b.push("\x3cstyle\x3e" + f + "\x3c/style\x3e") : b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + f + '"\x3e');
                return b.join("")
            },
            htmlEncode: function(a) { return void 0 === a || null === a ? "" : String(a).replace(b, "\x26amp;").replace(c, "\x26gt;").replace(e, "\x26lt;") },
            htmlDecode: function(a) { return a.replace(h, n) },
            htmlEncodeAttr: function(a) { return CKEDITOR.tools.htmlEncode(a).replace(g, "\x26quot;") },
            htmlDecodeAttr: function(a) { return CKEDITOR.tools.htmlDecode(a) },
            transformPlainTextToHtml: function(a, f) {
                var b = f == CKEDITOR.ENTER_BR,
                    c = this.htmlEncode(a.replace(/\r\n/g, "\n")),
                    c = c.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"),
                    k = f == CKEDITOR.ENTER_P ? "p" : "div";
                if (!b) {
                    var d = /\n{2}/g;
                    if (d.test(c)) var n = "\x3c" + k + "\x3e",
                        m = "\x3c/" + k + "\x3e",
                        c = n + c.replace(d, function() { return m + n }) + m
                }
                c = c.replace(/\n/g, "\x3cbr\x3e");
                b || (c = c.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + k + "\x3e)"), function(a) { return CKEDITOR.tools.repeat(a, 2) }));
                c = c.replace(/^ | $/g, "\x26nbsp;");
                return c = c.replace(/(>|\s) /g,
                    function(a, f) { return f + "\x26nbsp;" }).replace(/ (?=<)/g, "\x26nbsp;")
            },
            getNextNumber: function() { var a = 0; return function() { return ++a } }(),
            getNextId: function() { return "cke_" + this.getNextNumber() },
            getUniqueId: function() { for (var a = "e", f = 0; 8 > f; f++) a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); return a },
            override: function(a, f) {
                var b = f(a);
                b.prototype = a.prototype;
                return b
            },
            setTimeout: function(a, f, b, c, k) {
                k || (k = window);
                b || (b = k);
                return k.setTimeout(function() { c ? a.apply(b, [].concat(c)) : a.apply(b) },
                    f || 0)
            },
            trim: function() { var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function(f) { return f.replace(a, "") } }(),
            ltrim: function() { var a = /^[ \t\n\r]+/g; return function(f) { return f.replace(a, "") } }(),
            rtrim: function() { var a = /[ \t\n\r]+$/g; return function(f) { return f.replace(a, "") } }(),
            indexOf: function(a, f) {
                if ("function" == typeof f)
                    for (var b = 0, c = a.length; b < c; b++) { if (f(a[b])) return b } else {
                        if (a.indexOf) return a.indexOf(f);
                        b = 0;
                        for (c = a.length; b < c; b++)
                            if (a[b] === f) return b
                    }
                return -1
            },
            search: function(a, f) {
                var b = CKEDITOR.tools.indexOf(a,
                    f);
                return 0 <= b ? a[b] : null
            },
            bind: function(a, f) { return function() { return a.apply(f, arguments) } },
            createClass: function(a) {
                var f = a.$,
                    b = a.base,
                    c = a.privates || a._,
                    k = a.proto;
                a = a.statics;
                !f && (f = function() { b && this.base.apply(this, arguments) });
                if (c) var d = f,
                    f = function() {
                        var a = this._ || (this._ = {}),
                            f;
                        for (f in c) {
                            var b = c[f];
                            a[f] = "function" == typeof b ? CKEDITOR.tools.bind(b, this) : b
                        }
                        d.apply(this, arguments)
                    };
                b && (f.prototype = this.prototypedCopy(b.prototype), f.prototype.constructor = f, f.base = b, f.baseProto = b.prototype, f.prototype.base =
                    function() {
                        this.base = b.prototype.base;
                        b.apply(this, arguments);
                        this.base = arguments.callee
                    });
                k && this.extend(f.prototype, k, !0);
                a && this.extend(f, a, !0);
                return f
            },
            addFunction: function(b, f) { return a.push(function() { return b.apply(f || this, arguments) }) - 1 },
            removeFunction: function(b) { a[b] = null },
            callFunction: function(b) { var f = a[b]; return f && f.apply(window, Array.prototype.slice.call(arguments, 1)) },
            cssLength: function() {
                var a = /^-?\d+\.?\d*px$/,
                    f;
                return function(b) {
                    f = CKEDITOR.tools.trim(b + "") + "px";
                    return a.test(f) ?
                        f : b || ""
                }
            }(),
            convertToPx: function() { var a; return function(f) { a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a)); return /%$/.test(f) ? f : (a.setStyle("width", f), a.$.clientWidth) } }(),
            repeat: function(a, f) { return Array(f + 1).join(a) },
            tryThese: function() { for (var a, f = 0, b = arguments.length; f < b; f++) { var c = arguments[f]; try { a = c(); break } catch (k) {} } return a },
            genKey: function() { return Array.prototype.slice.call(arguments).join("-") },
            defer: function(a) {
                return function() {
                    var f = arguments,
                        b = this;
                    window.setTimeout(function() { a.apply(b, f) }, 0)
                }
            },
            normalizeCssText: function(a, f) {
                var b = [],
                    c, k = CKEDITOR.tools.parseCssText(a, !0, f);
                for (c in k) b.push(c + ":" + k[c]);
                b.sort();
                return b.length ? b.join(";") + ";" : ""
            },
            convertRgbToHex: function(a) {
                return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, c, k) {
                    a = [b, c, k];
                    for (b = 0; 3 > b; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                    return "#" + a.join("")
                })
            },
            normalizeHex: function(a) {
                return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function(a, b, c, k) {
                    a = b.toLowerCase();
                    3 == a.length && (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join(""));
                    return "#" + a + k
                })
            },
            parseCssText: function(a, f, b) {
                var c = {};
                b && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || "");
                a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));
                if (!a || ";" == a) return c;
                a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
                    function(a, b, k) {
                        f && (b = b.toLowerCase(), "font-family" == b && (k = k.replace(/\s*,\s*/g, ",")), k = CKEDITOR.tools.trim(k));
                        c[b] = k
                    });
                return c
            },
            writeCssText: function(a, f) {
                var b, c = [];
                for (b in a) c.push(b + ":" + a[b]);
                f && c.sort();
                return c.join("; ")
            },
            objectCompare: function(a, f, b) {
                var c;
                if (!a && !f) return !0;
                if (!a || !f) return !1;
                for (c in a)
                    if (a[c] != f[c]) return !1;
                if (!b)
                    for (c in f)
                        if (a[c] != f[c]) return !1;
                return !0
            },
            objectKeys: function(a) {
                var f = [],
                    b;
                for (b in a) f.push(b);
                return f
            },
            convertArrayToObject: function(a, b) {
                var c = {};
                1 ==
                    arguments.length && (b = !0);
                for (var k = 0, d = a.length; k < d; ++k) c[a[k]] = b;
                return c
            },
            fixDomain: function() {
                for (var a;;) try { a = window.parent.document.domain; break } catch (b) {
                    a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain;
                    if (!a) break;
                    document.domain = a
                }
                return !!a
            },
            eventsBuffer: function(a, b, c) {
                function k() {
                    n = (new Date).getTime();
                    d = !1;
                    c ? b.call(c) : b()
                }
                var d, n = 0;
                return {
                    input: function() {
                        if (!d) {
                            var b = (new Date).getTime() - n;
                            b < a ? d = setTimeout(k, a - b) : k()
                        }
                    },
                    reset: function() {
                        d && clearTimeout(d);
                        d = n = 0
                    }
                }
            },
            enableHtml5Elements: function(a,
                b) { for (var c = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), k = c.length, d; k--;) d = a.createElement(c[k]), b && a.appendChild(d) },
            checkIfAnyArrayItemMatches: function(a, b) {
                for (var c = 0, k = a.length; c < k; ++c)
                    if (a[c].match(b)) return !0;
                return !1
            },
            checkIfAnyObjectPropertyMatches: function(a, b) {
                for (var c in a)
                    if (c.match(b)) return !0;
                return !1
            },
            keystrokeToString: function(a, b) {
                var c = b & 16711680,
                    k =
                    b & 65535,
                    d = CKEDITOR.env.mac,
                    n = [],
                    e = [];
                c & CKEDITOR.CTRL && (n.push(d ? "⌘" : a[17]), e.push(d ? a[224] : a[17]));
                c & CKEDITOR.ALT && (n.push(d ? "⌥" : a[18]), e.push(a[18]));
                c & CKEDITOR.SHIFT && (n.push(d ? "⇧" : a[16]), e.push(a[16]));
                k && (a[k] ? (n.push(a[k]), e.push(a[k])) : (n.push(String.fromCharCode(k)), e.push(String.fromCharCode(k))));
                return { display: n.join("+"), aria: e.join("+") }
            },
            transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
            getCookie: function(a) {
                a = a.toLowerCase();
                for (var b = document.cookie.split(";"), c, k, d = 0; d < b.length; d++)
                    if (c = b[d].split("\x3d"), k = decodeURIComponent(CKEDITOR.tools.trim(c[0]).toLowerCase()), k === a) return decodeURIComponent(1 < c.length ? c[1] : "");
                return null
            },
            setCookie: function(a, b) { document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(b) + ";path\x3d/" },
            getCsrfToken: function() {
                var a = CKEDITOR.tools.getCookie("ckCsrfToken");
                if (!a || 40 != a.length) {
                    var a = [],
                        b = "";
                    if (window.crypto && window.crypto.getRandomValues) a = new Uint8Array(40), window.crypto.getRandomValues(a);
                    else
                        for (var c = 0; 40 > c; c++) a.push(Math.floor(256 * Math.random()));
                    for (c = 0; c < a.length; c++) var k = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[c] % 36),
                        b = b + (.5 < Math.random() ? k.toUpperCase() : k);
                    a = b;
                    CKEDITOR.tools.setCookie("ckCsrfToken", a)
                }
                return a
            },
            escapeCss: function(a) { return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : "" },
            style: {
                parse: {
                    _colors: {
                        aliceblue: "#F0F8FF",
                        antiquewhite: "#FAEBD7",
                        aqua: "#00FFFF",
                        aquamarine: "#7FFFD4",
                        azure: "#F0FFFF",
                        beige: "#F5F5DC",
                        bisque: "#FFE4C4",
                        black: "#000000",
                        blanchedalmond: "#FFEBCD",
                        blue: "#0000FF",
                        blueviolet: "#8A2BE2",
                        brown: "#A52A2A",
                        burlywood: "#DEB887",
                        cadetblue: "#5F9EA0",
                        chartreuse: "#7FFF00",
                        chocolate: "#D2691E",
                        coral: "#FF7F50",
                        cornflowerblue: "#6495ED",
                        cornsilk: "#FFF8DC",
                        crimson: "#DC143C",
                        cyan: "#00FFFF",
                        darkblue: "#00008B",
                        darkcyan: "#008B8B",
                        darkgoldenrod: "#B8860B",
                        darkgray: "#A9A9A9",
                        darkgreen: "#006400",
                        darkgrey: "#A9A9A9",
                        darkkhaki: "#BDB76B",
                        darkmagenta: "#8B008B",
                        darkolivegreen: "#556B2F",
                        darkorange: "#FF8C00",
                        darkorchid: "#9932CC",
                        darkred: "#8B0000",
                        darksalmon: "#E9967A",
                        darkseagreen: "#8FBC8F",
                        darkslateblue: "#483D8B",
                        darkslategray: "#2F4F4F",
                        darkslategrey: "#2F4F4F",
                        darkturquoise: "#00CED1",
                        darkviolet: "#9400D3",
                        deeppink: "#FF1493",
                        deepskyblue: "#00BFFF",
                        dimgray: "#696969",
                        dimgrey: "#696969",
                        dodgerblue: "#1E90FF",
                        firebrick: "#B22222",
                        floralwhite: "#FFFAF0",
                        forestgreen: "#228B22",
                        fuchsia: "#FF00FF",
                        gainsboro: "#DCDCDC",
                        ghostwhite: "#F8F8FF",
                        gold: "#FFD700",
                        goldenrod: "#DAA520",
                        gray: "#808080",
                        green: "#008000",
                        greenyellow: "#ADFF2F",
                        grey: "#808080",
                        honeydew: "#F0FFF0",
                        hotpink: "#FF69B4",
                        indianred: "#CD5C5C",
                        indigo: "#4B0082",
                        ivory: "#FFFFF0",
                        khaki: "#F0E68C",
                        lavender: "#E6E6FA",
                        lavenderblush: "#FFF0F5",
                        lawngreen: "#7CFC00",
                        lemonchiffon: "#FFFACD",
                        lightblue: "#ADD8E6",
                        lightcoral: "#F08080",
                        lightcyan: "#E0FFFF",
                        lightgoldenrodyellow: "#FAFAD2",
                        lightgray: "#D3D3D3",
                        lightgreen: "#90EE90",
                        lightgrey: "#D3D3D3",
                        lightpink: "#FFB6C1",
                        lightsalmon: "#FFA07A",
                        lightseagreen: "#20B2AA",
                        lightskyblue: "#87CEFA",
                        lightslategray: "#778899",
                        lightslategrey: "#778899",
                        lightsteelblue: "#B0C4DE",
                        lightyellow: "#FFFFE0",
                        lime: "#00FF00",
                        limegreen: "#32CD32",
                        linen: "#FAF0E6",
                        magenta: "#FF00FF",
                        maroon: "#800000",
                        mediumaquamarine: "#66CDAA",
                        mediumblue: "#0000CD",
                        mediumorchid: "#BA55D3",
                        mediumpurple: "#9370DB",
                        mediumseagreen: "#3CB371",
                        mediumslateblue: "#7B68EE",
                        mediumspringgreen: "#00FA9A",
                        mediumturquoise: "#48D1CC",
                        mediumvioletred: "#C71585",
                        midnightblue: "#191970",
                        mintcream: "#F5FFFA",
                        mistyrose: "#FFE4E1",
                        moccasin: "#FFE4B5",
                        navajowhite: "#FFDEAD",
                        navy: "#000080",
                        oldlace: "#FDF5E6",
                        olive: "#808000",
                        olivedrab: "#6B8E23",
                        orange: "#FFA500",
                        orangered: "#FF4500",
                        orchid: "#DA70D6",
                        palegoldenrod: "#EEE8AA",
                        palegreen: "#98FB98",
                        paleturquoise: "#AFEEEE",
                        palevioletred: "#DB7093",
                        papayawhip: "#FFEFD5",
                        peachpuff: "#FFDAB9",
                        peru: "#CD853F",
                        pink: "#FFC0CB",
                        plum: "#DDA0DD",
                        powderblue: "#B0E0E6",
                        purple: "#800080",
                        rebeccapurple: "#663399",
                        red: "#FF0000",
                        rosybrown: "#BC8F8F",
                        royalblue: "#4169E1",
                        saddlebrown: "#8B4513",
                        salmon: "#FA8072",
                        sandybrown: "#F4A460",
                        seagreen: "#2E8B57",
                        seashell: "#FFF5EE",
                        sienna: "#A0522D",
                        silver: "#C0C0C0",
                        skyblue: "#87CEEB",
                        slateblue: "#6A5ACD",
                        slategray: "#708090",
                        slategrey: "#708090",
                        snow: "#FFFAFA",
                        springgreen: "#00FF7F",
                        steelblue: "#4682B4",
                        tan: "#D2B48C",
                        teal: "#008080",
                        thistle: "#D8BFD8",
                        tomato: "#FF6347",
                        turquoise: "#40E0D0",
                        violet: "#EE82EE",
                        wheat: "#F5DEB3",
                        white: "#FFFFFF",
                        whitesmoke: "#F5F5F5",
                        yellow: "#FFFF00",
                        yellowgreen: "#9ACD32"
                    },
                    _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,
                    _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,
                    background: function(a) {
                        var b = {},
                            c = this._findColor(a);
                        c.length && (b.color = c[0], CKEDITOR.tools.array.forEach(c, function(b) { a = a.replace(b, "") }));
                        if (a = CKEDITOR.tools.trim(a)) b.unprocessed = a;
                        return b
                    },
                    margin: function(a) {
                        function b(a) {
                            c.top = k[a[0]];
                            c.right = k[a[1]];
                            c.bottom = k[a[2]];
                            c.left = k[a[3]]
                        }
                        var c = {},
                            k = a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ["0px"];
                        switch (k.length) {
                            case 1:
                                b([0, 0, 0, 0]);
                                break;
                            case 2:
                                b([0, 1, 0, 1]);
                                break;
                            case 3:
                                b([0, 1, 2, 1]);
                                break;
                            case 4:
                                b([0, 1, 2, 3])
                        }
                        return c
                    },
                    _findColor: function(a) {
                        var b = [],
                            c = CKEDITOR.tools.array,
                            b =
                            b.concat(a.match(this._rgbaRegExp) || []),
                            b = b.concat(a.match(this._hslaRegExp) || []);
                        return b = b.concat(c.filter(a.split(/\s+/), function(a) { return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors }))
                    }
                }
            },
            array: {
                filter: function(a, b, c) {
                    var k = [];
                    this.forEach(a, function(d, n) { b.call(c, d, n, a) && k.push(d) });
                    return k
                },
                forEach: function(a, b, c) {
                    var k = a.length,
                        d;
                    for (d = 0; d < k; d++) b.call(c, a[d], d, a)
                },
                map: function(a, b, c) {
                    for (var k = [], d = 0; d < a.length; d++) k.push(b.call(c,
                        a[d], d, a));
                    return k
                },
                reduce: function(a, b, c, k) { for (var d = 0; d < a.length; d++) c = b.call(k, c, a[d], d, a); return c }
            },
            object: {
                findKey: function(a, b) {
                    if ("object" !== typeof a) return null;
                    for (var c in a)
                        if (a[c] === b) return c;
                    return null
                }
            }
        };
        CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf;
        CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray
    })();
    CKEDITOR.dtd = function() {
        var a = CKEDITOR.tools.extend,
            d = function(a, b) { for (var c = CKEDITOR.tools.clone(a), k = 1; k < arguments.length; k++) { b = arguments[k]; for (var d in b) delete c[d] } return c },
            b = {},
            c = {},
            e = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 },
            g = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 },
            h = {},
            k = { "#": 1 },
            n = { center: 1, dir: 1, noframes: 1 };
        a(b, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1 }, k, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 });
        a(c, e, b, n);
        d = {
            a: d(b, { a: 1, button: 1 }),
            abbr: b,
            address: c,
            area: h,
            article: c,
            aside: c,
            audio: a({ source: 1, track: 1 }, c),
            b: b,
            base: h,
            bdi: b,
            bdo: b,
            blockquote: c,
            body: c,
            br: h,
            button: d(b, { a: 1, button: 1 }),
            canvas: b,
            caption: c,
            cite: b,
            code: b,
            col: h,
            colgroup: { col: 1 },
            command: h,
            datalist: a({ option: 1 }, b),
            dd: c,
            del: b,
            details: a({ summary: 1 }, c),
            dfn: b,
            div: c,
            dl: { dt: 1, dd: 1 },
            dt: c,
            em: b,
            embed: h,
            fieldset: a({ legend: 1 }, c),
            figcaption: c,
            figure: a({ figcaption: 1 }, c),
            footer: c,
            form: c,
            h1: b,
            h2: b,
            h3: b,
            h4: b,
            h5: b,
            h6: b,
            head: a({ title: 1, base: 1 }, g),
            header: c,
            hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
            hr: h,
            html: a({
                head: 1,
                body: 1
            }, c, g),
            i: b,
            iframe: k,
            img: h,
            input: h,
            ins: b,
            kbd: b,
            keygen: h,
            label: b,
            legend: b,
            li: c,
            link: h,
            main: c,
            map: c,
            mark: b,
            menu: a({ li: 1 }, c),
            meta: h,
            meter: d(b, { meter: 1 }),
            nav: c,
            noscript: a({ link: 1, meta: 1, style: 1 }, b),
            object: a({ param: 1 }, b),
            ol: { li: 1 },
            optgroup: { option: 1 },
            option: k,
            output: b,
            p: b,
            param: h,
            pre: b,
            progress: d(b, { progress: 1 }),
            q: b,
            rp: b,
            rt: b,
            ruby: a({ rp: 1, rt: 1 }, b),
            s: b,
            samp: b,
            script: k,
            section: c,
            select: { optgroup: 1, option: 1 },
            small: b,
            source: h,
            span: b,
            strong: b,
            style: k,
            sub: b,
            summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, b),
            sup: b,
            table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 },
            tbody: { tr: 1 },
            td: c,
            textarea: k,
            tfoot: { tr: 1 },
            th: c,
            thead: { tr: 1 },
            time: d(b, { time: 1 }),
            title: k,
            tr: { th: 1, td: 1 },
            track: h,
            u: b,
            ul: { li: 1 },
            "var": b,
            video: a({ source: 1, track: 1 }, c),
            wbr: h,
            acronym: b,
            applet: a({ param: 1 }, c),
            basefont: h,
            big: b,
            center: c,
            dialog: h,
            dir: { li: 1 },
            font: b,
            isindex: h,
            noframes: c,
            strike: b,
            tt: b
        };
        a(d, {
            $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, e, n),
            $blockLimit: {
                article: 1,
                aside: 1,
                audio: 1,
                body: 1,
                caption: 1,
                details: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figcaption: 1,
                figure: 1,
                footer: 1,
                form: 1,
                header: 1,
                hgroup: 1,
                main: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                section: 1,
                table: 1,
                td: 1,
                th: 1,
                tr: 1,
                ul: 1,
                video: 1
            },
            $cdata: { script: 1, style: 1 },
            $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 },
            $empty: {
                area: 1,
                base: 1,
                basefont: 1,
                br: 1,
                col: 1,
                command: 1,
                dialog: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                isindex: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                track: 1,
                wbr: 1
            },
            $inline: b,
            $list: { dl: 1, ol: 1, ul: 1 },
            $listItem: { dd: 1, dt: 1, li: 1 },
            $nonBodyContent: a({ body: 1, head: 1, html: 1 }, d.head),
            $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 },
            $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                mark: 1,
                meter: 1,
                output: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                time: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 },
            $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 },
            $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 },
            $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
        });
        return d
    }();
    CKEDITOR.dom.event = function(a) { this.$ = a };
    CKEDITOR.dom.event.prototype = {
        getKey: function() { return this.$.keyCode || this.$.which },
        getKeystroke: function() {
            var a = this.getKey();
            if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL;
            this.$.shiftKey && (a += CKEDITOR.SHIFT);
            this.$.altKey && (a += CKEDITOR.ALT);
            return a
        },
        preventDefault: function(a) {
            var d = this.$;
            d.preventDefault ? d.preventDefault() : d.returnValue = !1;
            a && this.stopPropagation()
        },
        stopPropagation: function() {
            var a = this.$;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        },
        getTarget: function() {
            var a =
                this.$.target || this.$.srcElement;
            return a ? new CKEDITOR.dom.node(a) : null
        },
        getPhase: function() { return this.$.eventPhase || 2 },
        getPageOffset: function() { var a = this.getTarget().getDocument().$; return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) } }
    };
    CKEDITOR.CTRL = 1114112;
    CKEDITOR.SHIFT = 2228224;
    CKEDITOR.ALT = 4456448;
    CKEDITOR.EVENT_PHASE_CAPTURING = 1;
    CKEDITOR.EVENT_PHASE_AT_TARGET = 2;
    CKEDITOR.EVENT_PHASE_BUBBLING = 3;
    CKEDITOR.dom.domObject = function(a) { a && (this.$ = a) };
    CKEDITOR.dom.domObject.prototype = function() {
        var a = function(a, b) { return function(c) { "undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c)) } };
        return {
            getPrivate: function() {
                var a;
                (a = this.getCustomData("_")) || this.setCustomData("_", a = {});
                return a
            },
            on: function(d) {
                var b = this.getCustomData("_cke_nativeListeners");
                b || (b = {}, this.setCustomData("_cke_nativeListeners", b));
                b[d] || (b = b[d] = a(this, d), this.$.addEventListener ? this.$.addEventListener(d, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" +
                    d, b));
                return CKEDITOR.event.prototype.on.apply(this, arguments)
            },
            removeListener: function(a) {
                CKEDITOR.event.prototype.removeListener.apply(this, arguments);
                if (!this.hasListeners(a)) {
                    var b = this.getCustomData("_cke_nativeListeners"),
                        c = b && b[a];
                    c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a])
                }
            },
            removeAllListeners: function() {
                var a = this.getCustomData("_cke_nativeListeners"),
                    b;
                for (b in a) {
                    var c = a[b];
                    this.$.detachEvent ? this.$.detachEvent("on" +
                        b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1);
                    delete a[b]
                }
                CKEDITOR.event.prototype.removeAllListeners.call(this)
            }
        }
    }();
    (function(a) {
        var d = {};
        CKEDITOR.on("reset", function() { d = {} });
        a.equals = function(a) { try { return a && a.$ === this.$ } catch (c) { return !1 } };
        a.setCustomData = function(a, c) {
            var e = this.getUniqueId();
            (d[e] || (d[e] = {}))[a] = c;
            return this
        };
        a.getCustomData = function(a) { var c = this.$["data-cke-expando"]; return (c = c && d[c]) && a in c ? c[a] : null };
        a.removeCustomData = function(a) {
            var c = this.$["data-cke-expando"],
                c = c && d[c],
                e, g;
            c && (e = c[a], g = a in c, delete c[a]);
            return g ? e : null
        };
        a.clearCustomData = function() {
            this.removeAllListeners();
            var a =
                this.$["data-cke-expando"];
            a && delete d[a]
        };
        a.getUniqueId = function() { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) };
        CKEDITOR.event.implementOn(a)
    })(CKEDITOR.dom.domObject.prototype);
    CKEDITOR.dom.node = function(a) { return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this };
    CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.NODE_ELEMENT = 1;
    CKEDITOR.NODE_DOCUMENT = 9;
    CKEDITOR.NODE_TEXT = 3;
    CKEDITOR.NODE_COMMENT = 8;
    CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11;
    CKEDITOR.POSITION_IDENTICAL = 0;
    CKEDITOR.POSITION_DISCONNECTED = 1;
    CKEDITOR.POSITION_FOLLOWING = 2;
    CKEDITOR.POSITION_PRECEDING = 4;
    CKEDITOR.POSITION_IS_CONTAINED = 8;
    CKEDITOR.POSITION_CONTAINS = 16;
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function(a, d) { a.append(this, d); return a },
        clone: function(a, d) {
            function b(c) {
                c["data-cke-expando"] && (c["data-cke-expando"] = !1);
                if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
                    if (d || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) { c = c.childNodes; for (var e = 0; e < c.length; e++) b(c[e]) }
            }

            function c(b) {
                if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                    if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d =
                            b.getName();
                        ":" == d[0] && b.renameNode(d.substring(1))
                    }
                    if (a)
                        for (d = 0; d < b.getChildCount(); d++) c(b.getChild(d))
                }
            }
            var e = this.$.cloneNode(a);
            b(e);
            e = new CKEDITOR.dom.node(e);
            CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(e);
            return e
        },
        hasPrevious: function() { return !!this.$.previousSibling },
        hasNext: function() { return !!this.$.nextSibling },
        insertAfter: function(a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a },
        insertBefore: function(a) {
            a.$.parentNode.insertBefore(this.$,
                a.$);
            return a
        },
        insertBeforeMe: function(a) { this.$.parentNode.insertBefore(a.$, this.$); return a },
        getAddress: function(a) {
            for (var d = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) {
                var e = c.parentNode;
                e && d.unshift(this.getIndex.call({ $: c }, a));
                c = e
            }
            return d
        },
        getDocument: function() { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) },
        getIndex: function(a) {
            function d(a, c) {
                var n = c ? a.nextSibling : a.previousSibling;
                return n && n.nodeType == CKEDITOR.NODE_TEXT ? b(n) ? d(n,
                    c) : n : null
            }

            function b(a) { return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE }
            var c = this.$,
                e = -1,
                g;
            if (!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !d(c) && !d(c, !0)) return -1;
            do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (g || b(c)) || (e++, g = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling);
            return e
        },
        getNextSourceNode: function(a, d, b) {
            if (b && !b.call) {
                var c = b;
                b = function(a) { return !a.equals(c) }
            }
            a = !a && this.getFirst && this.getFirst();
            var e;
            if (!a) {
                if (this.type ==
                    CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
                a = this.getNext()
            }
            for (; !a && (e = (e || this).getParent());) {
                if (b && !1 === b(e, !0)) return null;
                a = e.getNext()
            }
            return !a || b && !1 === b(a) ? null : d && d != a.type ? a.getNextSourceNode(!1, d, b) : a
        },
        getPreviousSourceNode: function(a, d, b) {
            if (b && !b.call) {
                var c = b;
                b = function(a) { return !a.equals(c) }
            }
            a = !a && this.getLast && this.getLast();
            var e;
            if (!a) {
                if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
                a = this.getPrevious()
            }
            for (; !a && (e = (e || this).getParent());) {
                if (b && !1 ===
                    b(e, !0)) return null;
                a = e.getPrevious()
            }
            return !a || b && !1 === b(a) ? null : d && a.type != d ? a.getPreviousSourceNode(!1, d, b) : a
        },
        getPrevious: function(a) {
            var d = this.$,
                b;
            do b = (d = d.previousSibling) && 10 != d.nodeType && new CKEDITOR.dom.node(d); while (b && a && !a(b));
            return b
        },
        getNext: function(a) {
            var d = this.$,
                b;
            do b = (d = d.nextSibling) && new CKEDITOR.dom.node(d); while (b && a && !a(b));
            return b
        },
        getParent: function(a) {
            var d = this.$.parentNode;
            return d && (d.nodeType == CKEDITOR.NODE_ELEMENT || a && d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ?
                new CKEDITOR.dom.node(d) : null
        },
        getParents: function(a) {
            var d = this,
                b = [];
            do b[a ? "push" : "unshift"](d); while (d = d.getParent());
            return b
        },
        getCommonAncestor: function(a) {
            if (a.equals(this)) return this;
            if (a.contains && a.contains(this)) return a;
            var d = this.contains ? this : this.getParent();
            do
                if (d.contains(a)) return d; while (d = d.getParent());
            return null
        },
        getPosition: function(a) {
            var d = this.$,
                b = a.$;
            if (d.compareDocumentPosition) return d.compareDocumentPosition(b);
            if (d == b) return CKEDITOR.POSITION_IDENTICAL;
            if (this.type ==
                CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) { if (d.contains) { if (d.contains(b)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING; if (b.contains(d)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING } if ("sourceIndex" in d) return 0 > d.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : d.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING } d = this.getAddress();
            a = a.getAddress();
            for (var b = Math.min(d.length, a.length), c = 0; c < b; c++)
                if (d[c] !=
                    a[c]) return d[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
            return d.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        },
        getAscendant: function(a, d) {
            var b = this.$,
                c, e;
            d || (b = b.parentNode);
            "function" == typeof a ? (e = !0, c = a) : (e = !1, c = function(b) { b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : ""; return "string" == typeof a ? b == a : b in a });
            for (; b;) {
                if (c(e ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b);
                try { b = b.parentNode } catch (g) { b = null }
            }
            return null
        },
        hasAscendant: function(a, d) {
            var b = this.$;
            d || (b = b.parentNode);
            for (; b;) {
                if (b.nodeName && b.nodeName.toLowerCase() == a) return !0;
                b = b.parentNode
            }
            return !1
        },
        move: function(a, d) { a.append(this.remove(), d) },
        remove: function(a) {
            var d = this.$,
                b = d.parentNode;
            if (b) {
                if (a)
                    for (; a = d.firstChild;) b.insertBefore(d.removeChild(a), d);
                b.removeChild(d)
            }
            return this
        },
        replace: function(a) {
            this.insertBefore(a);
            a.remove()
        },
        trim: function() {
            this.ltrim();
            this.rtrim()
        },
        ltrim: function() {
            for (var a; this.getFirst &&
                (a = this.getFirst());) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var d = CKEDITOR.tools.ltrim(a.getText()),
                        b = a.getLength();
                    if (d) d.length < b && (a.split(b - d.length), this.$.removeChild(this.$.firstChild));
                    else { a.remove(); continue }
                }
                break
            }
        },
        rtrim: function() {
            for (var a; this.getLast && (a = this.getLast());) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var d = CKEDITOR.tools.rtrim(a.getText()),
                        b = a.getLength();
                    if (d) d.length < b && (a.split(d.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
                    else { a.remove(); continue }
                }
                break
            }
            CKEDITOR.env.needsBrFiller &&
                (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
        },
        isReadOnly: function(a) {
            var d = this;
            this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent());
            CKEDITOR.env.edge && d && d.is("textarea", "input") && (a = !0);
            if (!a && d && "undefined" != typeof d.$.isContentEditable) return !(d.$.isContentEditable || d.data("cke-editable"));
            for (; d;) {
                if (d.data("cke-editable")) return !1;
                if (d.hasAttribute("contenteditable")) return "false" == d.getAttribute("contenteditable");
                d = d.getParent()
            }
            return !0
        }
    });
    CKEDITOR.dom.window = function(a) { CKEDITOR.dom.domObject.call(this, a) };
    CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function() { this.$.focus() },
        getViewPaneSize: function() {
            var a = this.$.document,
                d = "CSS1Compat" == a.compatMode;
            return { width: (d ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (d ? a.documentElement.clientHeight : a.body.clientHeight) || 0 }
        },
        getScrollPosition: function() {
            var a = this.$;
            if ("pageXOffset" in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 };
            a = a.document;
            return {
                x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
                y: a.documentElement.scrollTop ||
                    a.body.scrollTop || 0
            }
        },
        getFrame: function() { var a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
    });
    CKEDITOR.dom.document = function(a) { CKEDITOR.dom.domObject.call(this, a) };
    CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT,
        appendStyleSheet: function(a) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(a);
            else {
                var d = new CKEDITOR.dom.element("link");
                d.setAttributes({ rel: "stylesheet", type: "text/css", href: a });
                this.getHead().append(d)
            }
        },
        appendStyleText: function(a) {
            if (this.$.createStyleSheet) {
                var d = this.$.createStyleSheet("");
                d.cssText = a
            } else {
                var b = new CKEDITOR.dom.element("style", this);
                b.append(new CKEDITOR.dom.text(a, this));
                this.getHead().append(b)
            }
            return d ||
                b.$.sheet
        },
        createElement: function(a, d) {
            var b = new CKEDITOR.dom.element(a, this);
            d && (d.attributes && b.setAttributes(d.attributes), d.styles && b.setStyles(d.styles));
            return b
        },
        createText: function(a) { return new CKEDITOR.dom.text(a, this) },
        focus: function() { this.getWindow().focus() },
        getActive: function() { var a; try { a = this.$.activeElement } catch (d) { return null } return new CKEDITOR.dom.element(a) },
        getById: function(a) { return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null },
        getByAddress: function(a, d) {
            for (var b =
                    this.$.documentElement, c = 0; b && c < a.length; c++) {
                var e = a[c];
                if (d)
                    for (var g = -1, h = 0; h < b.childNodes.length; h++) {
                        var k = b.childNodes[h];
                        if (!0 !== d || 3 != k.nodeType || !k.previousSibling || 3 != k.previousSibling.nodeType)
                            if (g++, g == e) { b = k; break }
                    } else b = b.childNodes[e]
            }
            return b ? new CKEDITOR.dom.node(b) : null
        },
        getElementsByTag: function(a, d) { CKEDITOR.env.ie && 8 >= document.documentMode || !d || (a = d + ":" + a); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) },
        getHead: function() {
            var a = this.$.getElementsByTagName("head")[0];
            return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
        },
        getBody: function() { return new CKEDITOR.dom.element(this.$.body) },
        getDocumentElement: function() { return new CKEDITOR.dom.element(this.$.documentElement) },
        getWindow: function() { return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) },
        write: function(a) {
            this.$.open("text/html", "replace");
            CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' +
                CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e"));
            this.$.write(a);
            this.$.close()
        },
        find: function(a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) },
        findOne: function(a) { return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null },
        _getHtml5ShivFrag: function() {
            var a = this.getCustomData("html5ShivFrag");
            a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a));
            return a
        }
    });
    CKEDITOR.dom.nodeList = function(a) { this.$ = a };
    CKEDITOR.dom.nodeList.prototype = { count: function() { return this.$.length }, getItem: function(a) { return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null } };
    CKEDITOR.dom.element = function(a, d) {
        "string" == typeof a && (a = (d ? d.$ : document).createElement(a));
        CKEDITOR.dom.domObject.call(this, a)
    };
    CKEDITOR.dom.element.get = function(a) { return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a)) };
    CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node;
    CKEDITOR.dom.element.createFromHtml = function(a, d) {
        var b = new CKEDITOR.dom.element("div", d);
        b.setHtml(a);
        return b.getFirst().remove()
    };
    CKEDITOR.dom.element.setMarker = function(a, d, b, c) {
        var e = d.getCustomData("list_marker_id") || d.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
            g = d.getCustomData("list_marker_names") || d.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        a[e] = d;
        g[b] = 1;
        return d.setCustomData(b, c)
    };
    CKEDITOR.dom.element.clearAllMarkers = function(a) { for (var d in a) CKEDITOR.dom.element.clearMarkers(a, a[d], 1) };
    CKEDITOR.dom.element.clearMarkers = function(a, d, b) {
        var c = d.getCustomData("list_marker_names"),
            e = d.getCustomData("list_marker_id"),
            g;
        for (g in c) d.removeCustomData(g);
        d.removeCustomData("list_marker_names");
        b && (d.removeCustomData("list_marker_id"), delete a[e])
    };
    (function() {
        function a(a, b) { return -1 < (" " + a + " ").replace(g, " ").indexOf(" " + b + " ") }

        function d(a) {
            var b = !0;
            a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1);
            return function() { b || a.removeAttribute("id") }
        }

        function b(a, b) { var c = CKEDITOR.tools.escapeCss(a.$.id); return "#" + c + " " + b.split(/,\s*/).join(", #" + c + " ") }

        function c(a) { for (var b = 0, c = 0, f = h[a].length; c < f; c++) b += parseFloat(this.getComputedStyle(h[a][c]) || 0, 10) || 0; return b }
        var e = document.createElement("_").classList,
            e = "undefined" !== typeof e &&
            null !== String(e.add).match(/\[Native code\]/gi),
            g = /[\n\t\r]/g;
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT,
            addClass: e ? function(a) { this.$.classList.add(a); return this } : function(b) {
                var c = this.$.className;
                c && (a(c, b) || (c += " " + b));
                this.$.className = c || b;
                return this
            },
            removeClass: e ? function(a) {
                var b = this.$;
                b.classList.remove(a);
                b.className || b.removeAttribute("class");
                return this
            } : function(b) {
                var c = this.getAttribute("class");
                c && a(c, b) && ((c = c.replace(new RegExp("(?:^|\\s+)" +
                    b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", c) : this.removeAttribute("class"));
                return this
            },
            hasClass: function(b) { return a(this.$.className, b) },
            append: function(a, b) {
                "string" == typeof a && (a = this.getDocument().createElement(a));
                b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
                return a
            },
            appendHtml: function(a) {
                if (this.$.childNodes.length) {
                    var b = new CKEDITOR.dom.element("div", this.getDocument());
                    b.setHtml(a);
                    b.moveChildren(this)
                } else this.setHtml(a)
            },
            appendText: function(a) {
                null !=
                    this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a))
            },
            appendBogus: function(a) {
                if (a || CKEDITOR.env.needsBrFiller) {
                    for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
                    a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a))
                }
            },
            breakParent: function(a, b) {
                var c = new CKEDITOR.dom.range(this.getDocument());
                c.setStartAfter(this);
                c.setEndAfter(a);
                var f = c.extractContents(!1, b || !1),
                    d;
                c.insertNode(this.remove());
                if (CKEDITOR.env.ie && !CKEDITOR.env.edge) {
                    for (c = new CKEDITOR.dom.element("div"); d = f.getFirst();) d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), c.append(d);
                    c.insertAfter(this);
                    c.remove(!0)
                } else f.insertAfterNode(this)
            },
            contains: document.compareDocumentPosition ? function(a) { return !!(this.$.compareDocumentPosition(a.$) & 16) } : function(a) {
                var b = this.$;
                return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) :
                    b != a.$ && b.contains(a.$)
            },
            focus: function() {
                function a() { try { this.$.focus() } catch (b) {} }
                return function(b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) }
            }(),
            getHtml: function() { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a },
            getOuterHtml: function() {
                if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var a = this.$.ownerDocument.createElement("div");
                a.appendChild(this.$.cloneNode(!0));
                return a.innerHTML
            },
            getClientRect: function() {
                var a = CKEDITOR.tools.extend({},
                    this.$.getBoundingClientRect());
                !a.width && (a.width = a.right - a.left);
                !a.height && (a.height = a.bottom - a.top);
                return a
            },
            setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function(a) {
                try {
                    var b = this.$;
                    if (this.getParent()) return b.innerHTML = a;
                    var c = this.getDocument()._getHtml5ShivFrag();
                    c.appendChild(b);
                    b.innerHTML = a;
                    c.removeChild(b);
                    return a
                } catch (f) {
                    this.$.innerHTML = "";
                    b = new CKEDITOR.dom.element("body", this.getDocument());
                    b.$.innerHTML = a;
                    for (b = b.getChildren(); b.count();) this.append(b.getItem(0));
                    return a
                }
            } : function(a) { return this.$.innerHTML = a },
            setText: function() {
                var a = document.createElement("p");
                a.innerHTML = "x";
                a = a.textContent;
                return function(b) { this.$[a ? "textContent" : "innerText"] = b }
            }(),
            getAttribute: function() {
                var a = function(a) { return this.$.getAttribute(a, 2) };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
                    switch (a) {
                        case "class":
                            a = "className";
                            break;
                        case "http-equiv":
                            a = "httpEquiv";
                            break;
                        case "name":
                            return this.$.name;
                        case "tabindex":
                            return a = this.$.getAttribute(a,
                                2), 0 !== a && 0 === this.$.tabIndex && (a = null), a;
                        case "checked":
                            return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
                        case "hspace":
                        case "value":
                            return this.$[a];
                        case "style":
                            return this.$.style.cssText;
                        case "contenteditable":
                        case "contentEditable":
                            return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                    }
                    return this.$.getAttribute(a, 2)
                } : a
            }(),
            getAttributes: function(a) {
                var b = {},
                    c = this.$.attributes,
                    f;
                a = CKEDITOR.tools.isArray(a) ?
                    a : [];
                for (f = 0; f < c.length; f++) - 1 === CKEDITOR.tools.indexOf(a, c[f].name) && (b[c[f].name] = c[f].value);
                return b
            },
            getChildren: function() { return new CKEDITOR.dom.nodeList(this.$.childNodes) },
            getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function(a) { var b = this.getWindow().$.getComputedStyle(this.$, null); return b ? b.getPropertyValue(a) : "" } : function(a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] },
            getDtd: function() {
                var a = CKEDITOR.dtd[this.getName()];
                this.getDtd =
                    function() { return a };
                return a
            },
            getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: function() { var a = this.$.tabIndex; return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 },
            getText: function() { return this.$.textContent || this.$.innerText || "" },
            getWindow: function() { return this.getDocument().getWindow() },
            getId: function() { return this.$.id || null },
            getNameAtt: function() { return this.$.name || null },
            getName: function() {
                var a = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && 8 >= document.documentMode) { var b = this.$.scopeName; "HTML" != b && (a = b.toLowerCase() + ":" + a) } this.getName = function() { return a };
                return this.getName()
            },
            getValue: function() { return this.$.value },
            getFirst: function(a) {
                var b = this.$.firstChild;
                (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a));
                return b
            },
            getLast: function(a) {
                var b = this.$.lastChild;
                (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a));
                return b
            },
            getStyle: function(a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
            is: function() {
                var a = this.getName();
                if ("object" == typeof arguments[0]) return !!arguments[0][a];
                for (var b = 0; b < arguments.length; b++)
                    if (arguments[b] == a) return !0;
                return !1
            },
            isEditable: function(a) {
                var b = this.getName();
                return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] ||
                    CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
            },
            isIdentical: function(a) {
                var b = this.clone(0, 1);
                a = a.clone(0, 1);
                b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                if (b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$);
                b = b.getOuterHtml();
                a =
                    a.getOuterHtml();
                if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) {
                    var c = this.getParent();
                    c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml())
                }
                return b == a
            },
            isVisible: function() {
                var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"),
                    b, c;
                a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible()));
                return !!a
            },
            isEmptyInlineRemoveable: function() {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) {
                    var f = a.getItem(b);
                    if (f.type != CKEDITOR.NODE_ELEMENT || !f.data("cke-bookmark"))
                        if (f.type == CKEDITOR.NODE_ELEMENT && !f.isEmptyInlineRemoveable() || f.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(f.getText())) return !1
                }
                return !0
            },
            hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function() {
                for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                    var c = a[b];
                    switch (c.nodeName) {
                        case "class":
                            if (this.getAttribute("class")) return !0;
                        case "data-cke-expando":
                            continue;
                        default:
                            if (c.specified) return !0
                    }
                }
                return !1
            } : function() {
                var a = this.$.attributes,
                    b = a.length,
                    c = { "data-cke-expando": 1, _moz_dirty: 1 };
                return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName])
            },
            hasAttribute: function() {
                function a(b) {
                    var c = this.$.attributes.getNamedItem(b);
                    if ("input" == this.getName()) switch (b) {
                        case "class":
                            return 0 < this.$.className.length;
                        case "checked":
                            return !!this.$.checked;
                        case "value":
                            return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value
                    }
                    return c ?
                        c.specified : !1
                }
                return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function(b) { return "name" == b ? !!this.$.name : a.call(this, b) } : a : function(a) { return !!this.$.attributes.getNamedItem(a) }
            }(),
            hide: function() { this.setStyle("display", "none") },
            moveChildren: function(a, b) {
                var c = this.$;
                a = a.$;
                if (c != a) {
                    var f;
                    if (b)
                        for (; f = c.lastChild;) a.insertBefore(c.removeChild(f), a.firstChild);
                    else
                        for (; f = c.firstChild;) a.appendChild(c.removeChild(f))
                }
            },
            mergeSiblings: function() {
                function a(b, c, f) {
                    if (c && c.type == CKEDITOR.NODE_ELEMENT) {
                        for (var d = []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();)
                            if (d.push(c), c = f ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT) return;
                        if (b.isIdentical(c)) {
                            for (var k = f ? b.getLast() : b.getFirst(); d.length;) d.shift().move(b, !f);
                            c.moveChildren(b, !f);
                            c.remove();
                            k && k.type == CKEDITOR.NODE_ELEMENT && k.mergeSiblings()
                        }
                    }
                }
                return function(b) { if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious()) }
            }(),
            show: function() {
                this.setStyles({
                    display: "",
                    visibility: ""
                })
            },
            setAttribute: function() {
                var a = function(a, b) { this.$.setAttribute(a, b); return this };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(b, c) { "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments); return this } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, c) {
                    if ("src" == b && c.match(/^http:\/\//)) try {
                        a.apply(this,
                            arguments)
                    } catch (f) {} else a.apply(this, arguments);
                    return this
                } : a
            }(),
            setAttributes: function(a) { for (var b in a) this.setAttribute(b, a[b]); return this },
            setValue: function(a) { this.$.value = a; return this },
            removeAttribute: function() {
                var a = function(a) { this.$.removeAttribute(a) };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
                    "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable");
                    this.$.removeAttribute(a)
                } : a
            }(),
            removeAttributes: function(a) {
                if (CKEDITOR.tools.isArray(a))
                    for (var b =
                            0; b < a.length; b++) this.removeAttribute(a[b]);
                else
                    for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
            },
            removeStyle: function(a) {
                var b = this.$.style;
                if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style");
                else {
                    var c = ["top", "left", "right", "bottom"],
                        f;
                    "border" == a && (f = ["color", "style", "width"]);
                    for (var b = [], d = 0; d < c.length; d++)
                        if (f)
                            for (var w =
                                    0; w < f.length; w++) b.push([a, c[d], f[w]].join("-"));
                        else b.push([a, c[d]].join("-"));
                    for (a = 0; a < b.length; a++) this.removeStyle(b[a])
                }
            },
            setStyle: function(a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this },
            setStyles: function(a) { for (var b in a) this.setStyle(b, a[b]); return this },
            setOpacity: function(a) { CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a) },
            unselectable: function() {
                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
                    "none"));
                if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, b = this.getElementsByTag("*"), c = 0, f = b.count(); c < f; c++) a = b.getItem(c), a.setAttribute("unselectable", "on") }
            },
            getPositionedAncestor: function() {
                for (var a = this;
                    "html" != a.getName();) {
                    if ("static" != a.getComputedStyle("position")) return a;
                    a = a.getParent()
                }
                return null
            },
            getDocumentPosition: function(a) {
                var b = 0,
                    c = 0,
                    f = this.getDocument(),
                    d = f.getBody(),
                    w = "BackCompat" == f.$.compatMode;
                if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
                        8 !== CKEDITOR.env.version : 1)) {
                    var e = this.$.getBoundingClientRect(),
                        g = f.$.documentElement,
                        x = g.clientTop || d.$.clientTop || 0,
                        m = g.clientLeft || d.$.clientLeft || 0,
                        h = !0;
                    CKEDITOR.env.ie && (h = f.getDocumentElement().contains(this), f = f.getBody().contains(this), h = w && f || !w && h);
                    h && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || g.scrollLeft, c = d.$.scrollTop || g.scrollTop) : (c = w ? d.$ : g, b = c.scrollLeft, c = c.scrollTop), b = e.left + b - m, c = e.top + c - x)
                } else
                    for (x = this, m = null; x && "body" != x.getName() &&
                        "html" != x.getName();) {
                        b += x.$.offsetLeft - x.$.scrollLeft;
                        c += x.$.offsetTop - x.$.scrollTop;
                        x.equals(this) || (b += x.$.clientLeft || 0, c += x.$.clientTop || 0);
                        for (; m && !m.equals(x);) b -= m.$.scrollLeft, c -= m.$.scrollTop, m = m.getParent();
                        m = x;
                        x = (e = x.$.offsetParent) ? new CKEDITOR.dom.element(e) : null
                    }
                a && (e = this.getWindow(), x = a.getWindow(), !e.equals(x) && e.$.frameElement && (a = (new CKEDITOR.dom.element(e.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y));
                document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
                    w || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0);
                return { x: b, y: c }
            },
            scrollIntoView: function(a) {
                var b = this.getParent();
                if (b) {
                    do
                        if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) {
                            var c = b.getWindow();
                            try {
                                var f = c.$.frameElement;
                                f && (b = new CKEDITOR.dom.element(f))
                            } catch (d) {}
                        }
                    while (b = b.getParent())
                }
            },
            scrollIntoParent: function(a, b, c) {
                var f, d, w, e;

                function g(b, c) {
                    /body|html/.test(a.getName()) ?
                        a.getWindow().$.scrollBy(b, c) : (a.$.scrollLeft += b, a.$.scrollTop += c)
                }

                function x(a, b) {
                    var c = { x: 0, y: 0 };
                    if (!a.is(h ? "body" : "html")) {
                        var f = a.$.getBoundingClientRect();
                        c.x = f.left;
                        c.y = f.top
                    }
                    f = a.getWindow();
                    f.equals(b) || (f = x(CKEDITOR.dom.element.get(f.$.frameElement), b), c.x += f.x, c.y += f.y);
                    return c
                }

                function m(a, b) { return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 }!a && (a = this.getWindow());
                w = a.getDocument();
                var h = "BackCompat" == w.$.compatMode;
                a instanceof CKEDITOR.dom.window && (a = h ? w.getBody() : w.getDocumentElement());
                CKEDITOR.env.webkit && (w = this.getEditor(!1)) && (w._.previousScrollTop = null);
                w = a.getWindow();
                d = x(this, w);
                var y = x(a, w),
                    H = this.$.offsetHeight;
                f = this.$.offsetWidth;
                var l = a.$.clientHeight,
                    u = a.$.clientWidth;
                w = d.x - m(this, "left") - y.x || 0;
                e = d.y - m(this, "top") - y.y || 0;
                f = d.x + f + m(this, "right") - (y.x + u) || 0;
                d = d.y + H + m(this, "bottom") - (y.y + l) || 0;
                (0 > e || 0 < d) && g(0, !0 === b ? e : !1 === b ? d : 0 > e ? e : d);
                c && (0 > w || 0 < f) && g(0 > w ? w : f, 0)
            },
            setState: function(a, b, c) {
                b = b || "cke";
                switch (a) {
                    case CKEDITOR.TRISTATE_ON:
                        this.addClass(b + "_on");
                        this.removeClass(b +
                            "_off");
                        this.removeClass(b + "_disabled");
                        c && this.setAttribute("aria-pressed", !0);
                        c && this.removeAttribute("aria-disabled");
                        break;
                    case CKEDITOR.TRISTATE_DISABLED:
                        this.addClass(b + "_disabled");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_on");
                        c && this.setAttribute("aria-disabled", !0);
                        c && this.removeAttribute("aria-pressed");
                        break;
                    default:
                        this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
                }
            },
            getFrameDocument: function() { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) },
            copyAttributes: function(a, b) {
                var c = this.$.attributes;
                b = b || {};
                for (var f = 0; f < c.length; f++) {
                    var d = c[f],
                        w = d.nodeName.toLowerCase(),
                        e;
                    if (!(w in b))
                        if ("checked" == w && (e = this.getAttribute(w))) a.setAttribute(w, e);
                        else if (!CKEDITOR.env.ie || this.hasAttribute(w)) e = this.getAttribute(w), null === e && (e = d.nodeValue), a.setAttribute(w, e)
                }
                "" !== this.$.style.cssText &&
                    (a.$.style.cssText = this.$.style.cssText)
            },
            renameNode: function(a) {
                if (this.getName() != a) {
                    var b = this.getDocument();
                    a = new CKEDITOR.dom.element(a, b);
                    this.copyAttributes(a);
                    this.moveChildren(a);
                    this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
                    a.$["data-cke-expando"] = this.$["data-cke-expando"];
                    this.$ = a.$;
                    delete this.getName
                }
            },
            getChild: function() {
                function a(b, c) { var f = b.childNodes; if (0 <= c && c < f.length) return f[c] }
                return function(b) {
                    var c = this.$;
                    if (b.slice)
                        for (b = b.slice(); 0 < b.length && c;) c = a(c,
                            b.shift());
                    else c = a(c, b);
                    return c ? new CKEDITOR.dom.node(c) : null
                }
            }(),
            getChildCount: function() { return this.$.childNodes.length },
            disableContextMenu: function() {
                function a(b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") } this.on("contextmenu", function(b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() })
            },
            getDirection: function(a) {
                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
                    "ltr" : this.getStyle("direction") || this.getAttribute("dir")
            },
            data: function(a, b) { a = "data-" + a; if (void 0 === b) return this.getAttribute(a);!1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null },
            getEditor: function(a) {
                var b = CKEDITOR.instances,
                    c, f, d;
                a = a || void 0 === a;
                for (c in b)
                    if (f = b[c], f.element.equals(this) && f.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (d = f.editable()) && (d.equals(this) || d.contains(this))) return f;
                return null
            },
            find: function(a) {
                var c = d(this);
                a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
                    a)));
                c();
                return a
            },
            findOne: function(a) {
                var c = d(this);
                a = this.$.querySelector(b(this, a));
                c();
                return a ? new CKEDITOR.dom.element(a) : null
            },
            forEach: function(a, b, c) { if (!(c || b && this.type != b)) var f = a(this); if (!1 !== f) { c = this.getChildren(); for (var d = 0; d < c.count(); d++) f = c.getItem(d), f.type == CKEDITOR.NODE_ELEMENT ? f.forEach(a, b) : b && f.type != b || a(f) } }
        });
        var h = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] };
        CKEDITOR.dom.element.prototype.setSize = function(a, b, d) { "number" == typeof b && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px")) };
        CKEDITOR.dom.element.prototype.getSize = function(a, b) {
            var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
            b && (d -= c.call(this, a));
            return d
        }
    })();
    CKEDITOR.dom.documentFragment = function(a) {
        a = a || CKEDITOR.document;
        this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a
    };
    CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function(a) {
            a = a.$;
            a.parentNode.insertBefore(this.$, a.nextSibling)
        },
        getHtml: function() {
            var a = new CKEDITOR.dom.element("div");
            this.clone(1, 1).appendTo(a);
            return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "")
        }
    }, !0, {
        append: 1,
        appendBogus: 1,
        clone: 1,
        getFirst: 1,
        getHtml: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    });
    (function() {
        function a(a, b) {
            var c = this.range;
            if (this._.end) return null;
            if (!this._.start) {
                this._.start = 1;
                if (c.collapsed) return this.end(), null;
                c.optimize()
            }
            var f, d = c.startContainer;
            f = c.endContainer;
            var e = c.startOffset,
                C = c.endOffset,
                g, l = this.guard,
                u = this.type,
                I = a ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!a && !this._.guardLTR) {
                var J = f.type == CKEDITOR.NODE_ELEMENT ? f : f.getParent(),
                    h = f.type == CKEDITOR.NODE_ELEMENT ? f.getChild(C) : f.getNext();
                this._.guardLTR = function(a, b) {
                    return (!b || !J.equals(a)) && (!h ||
                        !a.equals(h)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                }
            }
            if (a && !this._.guardRTL) {
                var r = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
                    z = d.type == CKEDITOR.NODE_ELEMENT ? e ? d.getChild(e - 1) : null : d.getPrevious();
                this._.guardRTL = function(a, b) { return (!b || !r.equals(a)) && (!z || !a.equals(z)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) }
            }
            var v = a ? this._.guardRTL : this._.guardLTR;
            g = l ? function(a, b) { return !1 === v(a, b) ? !1 : l(a, b) } : v;
            this.current ? f = this.current[I](!1, u, g) : (a ? f.type == CKEDITOR.NODE_ELEMENT &&
                (f = 0 < C ? f.getChild(C - 1) : !1 === g(f, !0) ? null : f.getPreviousSourceNode(!0, u, g)) : (f = d, f.type == CKEDITOR.NODE_ELEMENT && ((f = f.getChild(e)) || (f = !1 === g(d, !0) ? null : d.getNextSourceNode(!0, u, g)))), f && !1 === g(f) && (f = null));
            for (; f && !this._.end;) {
                this.current = f;
                if (!this.evaluator || !1 !== this.evaluator(f)) { if (!b) return f } else if (b && this.evaluator) return !1;
                f = f[I](!1, u, g)
            }
            this.end();
            return this.current = null
        }

        function d(b) { for (var c, f = null; c = a.call(this, b);) f = c; return f } CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function(a) {
                this.range =
                    a;
                this._ = {}
            },
            proto: {
                end: function() { this._.end = 1 },
                next: function() { return a.call(this) },
                previous: function() { return a.call(this, 1) },
                checkForward: function() { return !1 !== a.call(this, 0, 1) },
                checkBackward: function() { return !1 !== a.call(this, 1, 1) },
                lastForward: function() { return d.call(this) },
                lastBackward: function() { return d.call(this, 1) },
                reset: function() {
                    delete this.current;
                    this._ = {}
                }
            }
        });
        var b = {
                block: 1,
                "list-item": 1,
                table: 1,
                "table-row-group": 1,
                "table-header-group": 1,
                "table-footer-group": 1,
                "table-row": 1,
                "table-column-group": 1,
                "table-column": 1,
                "table-cell": 1,
                "table-caption": 1
            },
            c = { absolute: 1, fixed: 1 };
        CKEDITOR.dom.element.prototype.isBlockBoundary = function(a) { return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 };
        CKEDITOR.dom.walker.blockBoundary = function(a) { return function(b) { return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } };
        CKEDITOR.dom.walker.listItemBoundary = function() { return this.blockBoundary({ br: 1 }) };
        CKEDITOR.dom.walker.bookmark = function(a, b) {
            function c(a) { return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") }
            return function(f) {
                var d, e;
                d = f && f.type != CKEDITOR.NODE_ELEMENT && (e = f.getParent()) && c(e);
                d = a ? d : d || c(f);
                return !!(b ^ d)
            }
        };
        CKEDITOR.dom.walker.whitespaces = function(a) {
            return function(b) {
                var c;
                b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
                return !!(a ^ c)
            }
        };
        CKEDITOR.dom.walker.invisible =
            function(a) {
                var b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.env.webkit ? 1 : 0;
                return function(f) { b(f) ? f = 1 : (f.type == CKEDITOR.NODE_TEXT && (f = f.getParent()), f = f.$.offsetWidth <= c); return !!(a ^ f) }
            };
        CKEDITOR.dom.walker.nodeType = function(a, b) { return function(c) { return !!(b ^ c.type == a) } };
        CKEDITOR.dom.walker.bogus = function(a) {
            function b(a) { return !g(a) && !h(a) }
            return function(c) {
                var f = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && e.test(c.getText());
                f && (f = c.getParent(), c = c.getNext(b), f = f.isBlockBoundary() &&
                    (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary()));
                return !!(a ^ f)
            }
        };
        CKEDITOR.dom.walker.temp = function(a) {
            return function(b) {
                b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                b = b && b.hasAttribute("data-cke-temp");
                return !!(a ^ b)
            }
        };
        var e = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            g = CKEDITOR.dom.walker.whitespaces(),
            h = CKEDITOR.dom.walker.bookmark(),
            k = CKEDITOR.dom.walker.temp(),
            n = function(a) { return h(a) || g(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) };
        CKEDITOR.dom.walker.ignored =
            function(a) { return function(b) { b = g(b) || h(b) || k(b); return !!(a ^ b) } };
        var q = CKEDITOR.dom.walker.ignored();
        CKEDITOR.dom.walker.empty = function(a) {
            return function(b) {
                for (var c = 0, f = b.getChildCount(); c < f; ++c)
                    if (!q(b.getChild(c))) return !!a;
                return !a
            }
        };
        var f = CKEDITOR.dom.walker.empty(),
            C = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function(a) {
                var b = {},
                    c;
                for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1);
                return b
            }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 });
        CKEDITOR.dom.walker.editable = function(a) {
            return function(b) {
                b =
                    q(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(C) && f(b)) ? !0 : !1;
                return !!(a ^ b)
            }
        };
        CKEDITOR.dom.element.prototype.getBogus = function() {
            var a = this;
            do a = a.getPreviousSourceNode(); while (n(a));
            return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && e.test(a.getText())) ? a : !1
        }
    })();
    CKEDITOR.dom.range = function(a) {
        this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
        this.collapsed = !0;
        var d = a instanceof CKEDITOR.dom.document;
        this.document = d ? a : a.getDocument();
        this.root = d ? a.getBody() : a
    };
    (function() {
        function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset }

        function d(a, b, c, d, e) {
            function g(a, b, c, f) {
                var d = c ? a.getPrevious() : a.getNext();
                if (f && k) return d;
                l || f ? b.append(a.clone(!0, e), c) : (a.remove(), q && b.append(a));
                return d
            }

            function m() {
                var a, b, c, f = Math.min(O.length, p.length);
                for (a = 0; a < f; a++)
                    if (b = O[a], c = p[a], !b.equals(c)) return a;
                return a - 1
            }

            function h() {
                var b = F - 1,
                    c = v && B && !u.equals(I);
                b < t - 1 || b < G - 1 || c ? (c ? a.moveToPosition(I,
                    CKEDITOR.POSITION_BEFORE_START) : G == b + 1 && z ? a.moveToPosition(p[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(p[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = O[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({ startNode: c }))) : a.collapse(!0)
            }
            a.optimizeBookmark();
            var k = 0 === b,
                q = 1 == b,
                l = 2 == b;
            b = l || q;
            var u = a.startContainer,
                I = a.endContainer,
                J = a.startOffset,
                D = a.endOffset,
                r, z, v, B, L, n;
            if (l && I.type == CKEDITOR.NODE_TEXT && u.equals(I)) u = a.document.createText(u.substring(J, D)), c.append(u);
            else {
                I.type == CKEDITOR.NODE_TEXT ? l ? n = !0 : I = I.split(D) : 0 < I.getChildCount() ? D >= I.getChildCount() ? (I = I.getChild(D - 1), z = !0) : I = I.getChild(D) : B = z = !0;
                u.type == CKEDITOR.NODE_TEXT ? l ? L = !0 : u.split(J) : 0 < u.getChildCount() ? 0 === J ? (u = u.getChild(J), r = !0) : u = u.getChild(J - 1) : v = r = !0;
                for (var O = u.getParents(), p = I.getParents(), F = m(), t = O.length - 1, G = p.length - 1, N = c, Z, X, U, ea = -1, P = F; P <= t; P++) {
                    X =
                        O[P];
                    U = X.getNext();
                    for (P != t || X.equals(p[P]) && t < G ? b && (Z = N.append(X.clone(0, e))) : r ? g(X, N, !1, v) : L && N.append(a.document.createText(X.substring(J))); U;) { if (U.equals(p[P])) { ea = P; break } U = g(U, N) } N = Z
                }
                N = c;
                for (P = F; P <= G; P++)
                    if (c = p[P], U = c.getPrevious(), c.equals(O[P])) b && (N = N.getChild(0));
                    else {
                        P != G || c.equals(O[P]) && G < t ? b && (Z = N.append(c.clone(0, e))) : z ? g(c, N, !1, B) : n && N.append(a.document.createText(c.substring(0, D)));
                        if (P > ea)
                            for (; U;) U = g(U, N, !0);
                        N = Z
                    }
                l || h()
            }
        }

        function b() {
            var a = !1,
                b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(!0),
                d = CKEDITOR.dom.walker.bogus();
            return function(e) { return c(e) || b(e) ? !0 : d(e) && !a ? a = !0 : e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant("pre") || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(g) ? !1 : !0 }
        }

        function c(a) {
            var b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(1);
            return function(d) { return c(d) || b(d) ? !0 : !a && h(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty) }
        }

        function e(a) {
            return function() {
                var b;
                return this[a ?
                    "getPreviousNode" : "getNextNode"](function(a) {!b && q(a) && (b = a); return n(a) && !(h(a) && a.equals(b)) })
            }
        }
        var g = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 },
            h = CKEDITOR.dom.walker.bogus(),
            k = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            n = CKEDITOR.dom.walker.editable(),
            q = CKEDITOR.dom.walker.ignored(!0);
        CKEDITOR.dom.range.prototype = {
            clone: function() {
                var a = new CKEDITOR.dom.range(this.root);
                a._setStartContainer(this.startContainer);
                a.startOffset = this.startOffset;
                a._setEndContainer(this.endContainer);
                a.endOffset = this.endOffset;
                a.collapsed = this.collapsed;
                return a
            },
            collapse: function(a) {
                a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset);
                this.collapsed = !0
            },
            cloneContents: function(a) {
                var b = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || d(this, 2, b, !1, "undefined" == typeof a ? !0 : a);
                return b
            },
            deleteContents: function(a) {
                this.collapsed ||
                    d(this, 0, null, a)
            },
            extractContents: function(a, b) {
                var c = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || d(this, 1, c, a, "undefined" == typeof b ? !0 : b);
                return c
            },
            createBookmark: function(a) {
                var b, c, d, e, g = this.collapsed;
                b = this.document.createElement("span");
                b.data("cke-bookmark", 1);
                b.setStyle("display", "none");
                b.setHtml("\x26nbsp;");
                a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (g ? "C" : "S")));
                g || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", d + "E"), e = this.clone(),
                    e.collapse(), e.insertNode(c));
                e = this.clone();
                e.collapse(!0);
                e.insertNode(b);
                c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                return { startNode: a ? d + (g ? "C" : "S") : b, endNode: a ? d + "E" : c, serializable: a, collapsed: g }
            },
            createBookmark2: function() {
                function a(b) {
                    var f = b.container,
                        d = b.offset,
                        e;
                    e = f;
                    var g = d;
                    e = e.type != CKEDITOR.NODE_ELEMENT || 0 === g || g == e.getChildCount() ? 0 : e.getChild(g - 1).type == CKEDITOR.NODE_TEXT && e.getChild(g).type == CKEDITOR.NODE_TEXT;
                    e && (f = f.getChild(d -
                        1), d = f.getLength());
                    if (f.type == CKEDITOR.NODE_ELEMENT && 0 < d) {
                        a: {
                            for (e = f; d--;)
                                if (g = e.getChild(d).getIndex(!0), 0 <= g) { d = g; break a }
                            d = -1
                        }
                        d += 1
                    }
                    if (f.type == CKEDITOR.NODE_TEXT) {
                        e = f;
                        for (g = 0;
                            (e = e.getPrevious()) && e.type == CKEDITOR.NODE_TEXT;) g += e.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
                        e = g;
                        f.getText() ? d += e : (g = f.getPrevious(c), e ? (d = e, f = g ? g.getNext() : f.getParent().getFirst()) : (f = f.getParent(), d = g ? g.getIndex(!0) + 1 : 0))
                    }
                    b.container = f;
                    b.offset = d
                }

                function b(a, c) {
                    var f = c.getCustomData("cke-fillingChar");
                    if (f) {
                        var d = a.container;
                        f.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = d.getIndex(), a.container = d.getParent()))
                    }
                }
                var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
                return function(c) {
                    var d = this.collapsed,
                        e = { container: this.startContainer, offset: this.startOffset },
                        m = { container: this.endContainer, offset: this.endOffset };
                    c && (a(e), b(e, this.root), d || (a(m), b(m, this.root)));
                    return {
                        start: e.container.getAddress(c),
                        end: d ? null : m.container.getAddress(c),
                        startOffset: e.offset,
                        endOffset: m.offset,
                        normalized: c,
                        collapsed: d,
                        is2: !0
                    }
                }
            }(),
            moveToBookmark: function(a) {
                if (a.is2) {
                    var b = this.document.getByAddress(a.start, a.normalized),
                        c = a.startOffset,
                        d = a.end && this.document.getByAddress(a.end, a.normalized);
                    a = a.endOffset;
                    this.setStart(b, c);
                    d ? this.setEnd(d, a) : this.collapse(!0)
                } else b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) :
                    this.collapse(!0)
            },
            getBoundaryNodes: function() {
                var a = this.startContainer,
                    b = this.endContainer,
                    c = this.startOffset,
                    d = this.endOffset,
                    e;
                if (a.type == CKEDITOR.NODE_ELEMENT)
                    if (e = a.getChildCount(), e > c) a = a.getChild(c);
                    else if (1 > e) a = a.getPreviousSourceNode();
                else {
                    for (a = a.$; a.lastChild;) a = a.lastChild;
                    a = new CKEDITOR.dom.node(a);
                    a = a.getNextSourceNode() || a
                }
                if (b.type == CKEDITOR.NODE_ELEMENT)
                    if (e = b.getChildCount(), e > d) b = b.getChild(d).getPreviousSourceNode(!0);
                    else if (1 > e) b = b.getPreviousSourceNode();
                else {
                    for (b = b.$; b.lastChild;) b =
                        b.lastChild;
                    b = new CKEDITOR.dom.node(b)
                }
                a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                return { startNode: a, endNode: b }
            },
            getCommonAncestor: function(a, b) {
                var c = this.startContainer,
                    d = this.endContainer,
                    c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d);
                return b && !c.is ? c.getParent() : c
            },
            optimize: function() {
                var a = this.startContainer,
                    b = this.startOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) :
                    this.setStartBefore(a));
                a = this.endContainer;
                b = this.endOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
            },
            optimizeBookmark: function() {
                var a = this.startContainer,
                    b = this.endContainer;
                a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
            },
            trim: function(a, b) {
                var c = this.startContainer,
                    d = this.startOffset,
                    e = this.collapsed;
                if ((!a ||
                        e) && c && c.type == CKEDITOR.NODE_TEXT) {
                    if (d)
                        if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent();
                        else {
                            var g = c.split(d),
                                d = c.getIndex() + 1,
                                c = c.getParent();
                            this.startContainer.equals(this.endContainer) ? this.setEnd(g, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1)
                        }
                    else d = c.getIndex(), c = c.getParent();
                    this.setStart(c, d);
                    if (e) { this.collapse(!0); return }
                }
                c = this.endContainer;
                d = this.endOffset;
                b || e || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) :
                    d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
            },
            enlarge: function(a, b) {
                function c(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a }
                var d = new RegExp(/[^\s\ufeff]/);
                switch (a) {
                    case CKEDITOR.ENLARGE_INLINE:
                        var e = 1;
                    case CKEDITOR.ENLARGE_ELEMENT:
                        var g = function(a, b) {
                            var c = new CKEDITOR.dom.range(h);
                            c.setStart(a, b);
                            c.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                            var c = new CKEDITOR.dom.walker(c),
                                f;
                            for (c.guard = function(a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; f =
                                c.next();) {
                                if (f.type != CKEDITOR.NODE_TEXT) return !1;
                                r = f != a ? f.getText() : f.substring(b);
                                if (d.test(r)) return !1
                            }
                            return !0
                        };
                        if (this.collapsed) break;
                        var m = this.getCommonAncestor(),
                            h = this.root,
                            k, q, l, u, I, J = !1,
                            D, r;
                        D = this.startContainer;
                        var z = this.startOffset;
                        D.type == CKEDITOR.NODE_TEXT ? (z && (D = !CKEDITOR.tools.trim(D.substring(0, z)).length && D, J = !!D), D && ((u = D.getPrevious()) || (l = D.getParent()))) : (z && (u = D.getChild(z - 1) || D.getLast()), u || (l = D));
                        for (l = c(l); l || u;) {
                            if (l && !u) {
                                !I && l.equals(m) && (I = !0);
                                if (e ? l.isBlockBoundary() :
                                    !h.contains(l)) break;
                                J && "inline" == l.getComputedStyle("display") || (J = !1, I ? k = l : this.setStartBefore(l));
                                u = l.getPrevious()
                            }
                            for (; u;)
                                if (D = !1, u.type == CKEDITOR.NODE_COMMENT) u = u.getPrevious();
                                else {
                                    if (u.type == CKEDITOR.NODE_TEXT) r = u.getText(), d.test(r) && (u = null), D = /[\s\ufeff]$/.test(r);
                                    else if ((u.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && u.is("br")) && !u.data("cke-bookmark"))
                                        if (J && CKEDITOR.dtd.$removeEmpty[u.getName()]) {
                                            r = u.getText();
                                            if (d.test(r)) u = null;
                                            else
                                                for (var z = u.$.getElementsByTagName("*"), v = 0, B; B =
                                                    z[v++];)
                                                    if (!CKEDITOR.dtd.$removeEmpty[B.nodeName.toLowerCase()]) { u = null; break }
                                            u && (D = !!r.length)
                                        } else u = null;
                                    D && (J ? I ? k = l : l && this.setStartBefore(l) : J = !0);
                                    if (u) {
                                        D = u.getPrevious();
                                        if (!l && !D) {
                                            l = u;
                                            u = null;
                                            break
                                        }
                                        u = D
                                    } else l = null
                                }
                            l && (l = c(l.getParent()))
                        }
                        D = this.endContainer;
                        z = this.endOffset;
                        l = u = null;
                        I = J = !1;
                        D.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(D.substring(z)).length ? J = !0 : (J = !D.getLength(), z == D.getLength() ? (u = D.getNext()) || (l = D.getParent()) : g(D, z) && (l = D.getParent())) : (u = D.getChild(z)) || (l = D);
                        for (; l ||
                            u;) {
                            if (l && !u) {
                                !I && l.equals(m) && (I = !0);
                                if (e ? l.isBlockBoundary() : !h.contains(l)) break;
                                J && "inline" == l.getComputedStyle("display") || (J = !1, I ? q = l : l && this.setEndAfter(l));
                                u = l.getNext()
                            }
                            for (; u;) {
                                D = !1;
                                if (u.type == CKEDITOR.NODE_TEXT) r = u.getText(), g(u, 0) || (u = null), D = /^[\s\ufeff]/.test(r);
                                else if (u.type == CKEDITOR.NODE_ELEMENT) {
                                    if ((0 < u.$.offsetWidth || b && u.is("br")) && !u.data("cke-bookmark"))
                                        if (J && CKEDITOR.dtd.$removeEmpty[u.getName()]) {
                                            r = u.getText();
                                            if (d.test(r)) u = null;
                                            else
                                                for (z = u.$.getElementsByTagName("*"), v =
                                                    0; B = z[v++];)
                                                    if (!CKEDITOR.dtd.$removeEmpty[B.nodeName.toLowerCase()]) { u = null; break }
                                            u && (D = !!r.length)
                                        } else u = null
                                } else D = 1;
                                D && J && (I ? q = l : this.setEndAfter(l));
                                if (u) {
                                    D = u.getNext();
                                    if (!l && !D) {
                                        l = u;
                                        u = null;
                                        break
                                    }
                                    u = D
                                } else l = null
                            }
                            l && (l = c(l.getParent()))
                        }
                        k && q && (m = k.contains(q) ? q : k, this.setStartBefore(m), this.setEndAfter(m));
                        break;
                    case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                    case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                        l = new CKEDITOR.dom.range(this.root);
                        h = this.root;
                        l.setStartAt(h, CKEDITOR.POSITION_AFTER_START);
                        l.setEnd(this.startContainer,
                            this.startOffset);
                        l = new CKEDITOR.dom.walker(l);
                        var L, n, O = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null),
                            p = null,
                            F = function(a) {
                                if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable"))
                                    if (p) { if (p.equals(a)) { p = null; return } } else p = a;
                                else if (p) return;
                                var b = O(a);
                                b || (L = a);
                                return b
                            },
                            e = function(a) { var b = F(a);!b && a.is && a.is("br") && (n = a); return b };
                        l.guard = F;
                        l = l.lastBackward();
                        L = L || h;
                        this.setStartAt(L, !L.is("br") && (!l && this.checkStartOfBlock() || l && L.contains(l)) ?
                            CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                        if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                            l = this.clone();
                            l = new CKEDITOR.dom.walker(l);
                            var t = CKEDITOR.dom.walker.whitespaces(),
                                G = CKEDITOR.dom.walker.bookmark();
                            l.evaluator = function(a) { return !t(a) && !G(a) };
                            if ((l = l.previous()) && l.type == CKEDITOR.NODE_ELEMENT && l.is("br")) break
                        }
                        l = this.clone();
                        l.collapse();
                        l.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                        l = new CKEDITOR.dom.walker(l);
                        l.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? e : F;
                        L = p = n = null;
                        l = l.lastForward();
                        L = L || h;
                        this.setEndAt(L, !l && this.checkEndOfBlock() || l && L.contains(l) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                        n && this.setEndAfter(n)
                }
            },
            shrink: function(a, b, c) {
                var d = "boolean" === typeof c ? c : c && "boolean" === typeof c.shrinkOnBlockBoundary ? c.shrinkOnBlockBoundary : !0,
                    e = c && c.skipBogus;
                if (!this.collapsed) {
                    a = a || CKEDITOR.SHRINK_TEXT;
                    var g = this.clone(),
                        m = this.startContainer,
                        h = this.endContainer,
                        k = this.startOffset,
                        q = this.endOffset,
                        l = c = 1;
                    m && m.type == CKEDITOR.NODE_TEXT && (k ? k >= m.getLength() ? g.setStartAfter(m) :
                        (g.setStartBefore(m), c = 0) : g.setStartBefore(m));
                    h && h.type == CKEDITOR.NODE_TEXT && (q ? q >= h.getLength() ? g.setEndAfter(h) : (g.setEndAfter(h), l = 0) : g.setEndBefore(h));
                    var g = new CKEDITOR.dom.walker(g),
                        u = CKEDITOR.dom.walker.bookmark(),
                        I = CKEDITOR.dom.walker.bogus();
                    g.evaluator = function(b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) };
                    var J;
                    g.guard = function(b, c) {
                        if (e && I(b) || u(b)) return !0;
                        if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || c && b.equals(J) || !1 === d && b.type ==
                            CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1;
                        c || b.type != CKEDITOR.NODE_ELEMENT || (J = b);
                        return !0
                    };
                    c && (m = g[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(m, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                    l && (g.reset(), (g = g[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(g, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
                    return !(!c && !l)
                }
            },
            insertNode: function(a) {
                this.optimizeBookmark();
                this.trim(!1, !0);
                var b = this.startContainer,
                    c = b.getChild(this.startOffset);
                c ? a.insertBefore(c) : b.append(a);
                a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                this.setStartBefore(a)
            },
            moveToPosition: function(a, b) {
                this.setStartAt(a, b);
                this.collapse(!0)
            },
            moveToRange: function(a) {
                this.setStart(a.startContainer, a.startOffset);
                this.setEnd(a.endContainer, a.endOffset)
            },
            selectNodeContents: function(a) {
                this.setStart(a, 0);
                this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
            },
            setStart: function(b, c) {
                b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent());
                this._setStartContainer(b);
                this.startOffset = c;
                this.endContainer || (this._setEndContainer(b), this.endOffset = c);
                a(this)
            },
            setEnd: function(b, c) {
                b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, b = b.getParent());
                this._setEndContainer(b);
                this.endOffset = c;
                this.startContainer || (this._setStartContainer(b), this.startOffset = c);
                a(this)
            },
            setStartAfter: function(a) {
                this.setStart(a.getParent(),
                    a.getIndex() + 1)
            },
            setStartBefore: function(a) { this.setStart(a.getParent(), a.getIndex()) },
            setEndAfter: function(a) { this.setEnd(a.getParent(), a.getIndex() + 1) },
            setEndBefore: function(a) { this.setEnd(a.getParent(), a.getIndex()) },
            setStartAt: function(b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setStart(b, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setStartBefore(b);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setStartAfter(b)
                }
                a(this)
            },
            setEndAt: function(b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setEnd(b, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setEndBefore(b);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setEndAfter(b)
                }
                a(this)
            },
            fixBlock: function(a, b) {
                var c = this.createBookmark(),
                    d = this.document.createElement(b);
                this.collapse(a);
                this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                this.extractContents().appendTo(d);
                d.trim();
                this.insertNode(d);
                var e = d.getBogus();
                e && e.remove();
                d.appendBogus();
                this.moveToBookmark(c);
                return d
            },
            splitBlock: function(a, b) {
                var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                    d = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                    e = c.block,
                    g = d.block,
                    m = null;
                if (!c.blockLimit.equals(d.blockLimit)) return null;
                "br" != a && (e || (e = this.fixBlock(!0, a), g = (new CKEDITOR.dom.elementPath(this.endContainer,
                    this.root)).block), g || (g = this.fixBlock(!1, a)));
                c = e && this.checkStartOfBlock();
                d = g && this.checkEndOfBlock();
                this.deleteContents();
                e && e.equals(g) && (d ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(g, CKEDITOR.POSITION_AFTER_END), g = null) : c ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e = null) : (g = this.splitElement(e, b || !1), e.is("ul", "ol") || e.appendBogus()));
                return {
                    previousBlock: e,
                    nextBlock: g,
                    wasStartOfBlock: c,
                    wasEndOfBlock: d,
                    elementPath: m
                }
            },
            splitElement: function(a, b) {
                if (!this.collapsed) return null;
                this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                var c = this.extractContents(!1, b || !1),
                    d = a.clone(!1, b || !1);
                c.appendTo(d);
                d.insertAfter(a);
                this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                return d
            },
            removeEmptyBlocksAtEnd: function() {
                function a(d) { return function(a) { return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || d.is("table") && a.is("caption") ? !1 : !0 } }
                var b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.dom.walker.bookmark(!1);
                return function(b) {
                    for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), e = d.block || d.blockLimit, g; e && !e.equals(d.root) && !e.getFirst(a(e));) g = e.getParent(), this[b ? "setEndAt" : "setStartAt"](e, CKEDITOR.POSITION_AFTER_END), e.remove(1), e = g;
                    this.moveToBookmark(c)
                }
            }(),
            startPath: function() { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) },
            endPath: function() { return new CKEDITOR.dom.elementPath(this.endContainer, this.root) },
            checkBoundaryOfElement: function(a,
                b) {
                var d = b == CKEDITOR.START,
                    e = this.clone();
                e.collapse(d);
                e[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                e = new CKEDITOR.dom.walker(e);
                e.evaluator = c(d);
                return e[d ? "checkBackward" : "checkForward"]()
            },
            checkStartOfBlock: function() {
                var a = this.startContainer,
                    c = this.startOffset;
                CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, c)), k.test(a) && this.trim(0, 1));
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                c = this.clone();
                c.collapse(!0);
                c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkBackward()
            },
            checkEndOfBlock: function() {
                var a = this.endContainer,
                    c = this.endOffset;
                CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), k.test(a) && this.trim(1, 0));
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                c = this.clone();
                c.collapse(!1);
                c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkForward()
            },
            getPreviousNode: function(a, b, c) {
                var d = this.clone();
                d.collapse(1);
                d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.previous()
            },
            getNextNode: function(a, b, c) {
                var d = this.clone();
                d.collapse();
                d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.next()
            },
            checkReadOnly: function() {
                function a(b, c) {
                    for (; b;) {
                        if (b.type ==
                            CKEDITOR.NODE_ELEMENT) { if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0; if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break } b = b.getParent()
                    }
                    return 1
                }
                return function() {
                    var b = this.startContainer,
                        c = this.endContainer;
                    return !(a(b, c) && a(c, b))
                }
            }(),
            moveToElementEditablePosition: function(a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0;
                for (var c = 0; a;) {
                    if (a.type == CKEDITOR.NODE_TEXT) {
                        b && this.endContainer && this.checkEndOfBlock() && k.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                        c = 1;
                        break
                    }
                    if (a.type == CKEDITOR.NODE_ELEMENT)
                        if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1;
                        else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                    else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0;
                    var d = a,
                        e = c,
                        g = void 0;
                    d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (g = d[b ? "getLast" : "getFirst"](q));
                    e || g || (g = d[b ? "getPrevious" : "getNext"](q));
                    a = g
                }
                return !!c
            },
            moveToClosestEditablePosition: function(a, b) {
                var c, d = 0,
                    e, g, m = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
                a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, m[b ? 0 : 1])) : c = this.clone();
                if (a &&
                    !a.is(CKEDITOR.dtd.$block)) d = 1;
                else if (e = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) d = 1, (g = e.type == CKEDITOR.NODE_ELEMENT) && e.is(CKEDITOR.dtd.$block) && "false" == e.getAttribute("contenteditable") ? (c.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(e, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && g && e.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(e, 0), c.collapse()) : c.moveToPosition(e, m[b ? 1 : 0]);
                d && this.moveToRange(c);
                return !!d
            },
            moveToElementEditStart: function(a) { return this.moveToElementEditablePosition(a) },
            moveToElementEditEnd: function(a) { return this.moveToElementEditablePosition(a, !0) },
            getEnclosedNode: function() {
                var a = this.clone();
                a.optimize();
                if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
                var a = new CKEDITOR.dom.walker(a),
                    b = CKEDITOR.dom.walker.bookmark(!1, !0),
                    c = CKEDITOR.dom.walker.whitespaces(!0);
                a.evaluator = function(a) { return c(a) && b(a) };
                var d = a.next();
                a.reset();
                return d && d.equals(a.previous()) ? d : null
            },
            getTouchedStartNode: function() {
                var a = this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
            },
            getTouchedEndNode: function() { var a = this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a },
            getNextEditableNode: e(),
            getPreviousEditableNode: e(1),
            _getTableElement: function(a) {
                a = a || { td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1 };
                var b = this.startContainer,
                    c = this.endContainer,
                    d = b.getAscendant("table", !0),
                    e = c.getAscendant("table", !0);
                return CKEDITOR.env.safari && d && c.equals(this.root) ?
                    b.getAscendant(a, !0) : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : d && e && (d.equals(e) || d.contains(e) || e.contains(d)) ? b.getAscendant(a, !0) : null
            },
            scrollIntoView: function() {
                var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document),
                    b, c, d, e = this.clone();
                e.optimize();
                (d = e.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = e.startContainer.getText(), b = e.startContainer.split(e.startOffset), a.insertAfter(e.startContainer)) : e.insertNode(a);
                a.scrollIntoView();
                d && (e.startContainer.setText(c), b.remove());
                a.remove()
            },
            _setStartContainer: function(a) { this.startContainer = a },
            _setEndContainer: function(a) { this.endContainer = a },
            _find: function(a, b) {
                var c = this.getCommonAncestor(),
                    d = this.getBoundaryNodes(),
                    e = [],
                    g, m, h, k;
                if (c && c.find)
                    for (m = c.find(a), g = 0; g < m.count(); g++)
                        if (c = m.getItem(g), b || !c.isReadOnly()) h = c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING || d.startNode.equals(c), k = c.getPosition(d.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED ||
                            d.endNode.equals(c), h && k && e.push(c);
                return e
            }
        };
        CKEDITOR.dom.range.mergeRanges = function(a) {
            return CKEDITOR.tools.array.reduce(a, function(a, b) {
                var c = a[a.length - 1],
                    d = !1;
                b = b.clone();
                b.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                if (c) {
                    var e = new CKEDITOR.dom.range(b.root),
                        d = new CKEDITOR.dom.walker(e),
                        f = CKEDITOR.dom.walker.whitespaces();
                    e.setStart(c.endContainer, c.endOffset);
                    e.setEnd(b.startContainer, b.startOffset);
                    for (e = d.next(); f(e) || b.endContainer.equals(e);) e = d.next();
                    d = !e
                }
                d ? c.setEnd(b.endContainer, b.endOffset) :
                    a.push(b);
                return a
            }, [])
        }
    })();
    CKEDITOR.POSITION_AFTER_START = 1;
    CKEDITOR.POSITION_BEFORE_END = 2;
    CKEDITOR.POSITION_BEFORE_START = 3;
    CKEDITOR.POSITION_AFTER_END = 4;
    CKEDITOR.ENLARGE_ELEMENT = 1;
    CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2;
    CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3;
    CKEDITOR.ENLARGE_INLINE = 4;
    CKEDITOR.START = 1;
    CKEDITOR.END = 2;
    CKEDITOR.SHRINK_ELEMENT = 1;
    CKEDITOR.SHRINK_TEXT = 2;
    "use strict";
    (function() {
        function a(a) { 1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {})) }

        function d(a) {
            var b = [];
            a.forEach(function(a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0);
            return b
        }

        function b(a, c, e, g) {
            a: {
                null == g && (g = d(e));
                for (var h; h = g.shift();)
                    if (h.getDtd().p) { g = { element: h, remaining: g }; break a }
                g = null
            }
            if (!g) return 0;
            if ((h = CKEDITOR.filter.instances[g.element.data("cke-filter")]) && !h.check(c)) return b(a,
                c, e, g.remaining);c = new CKEDITOR.dom.range(g.element);c.selectNodeContents(g.element);c = c.createIterator();c.enlargeBr = a.enlargeBr;c.enforceRealBlocks = a.enforceRealBlocks;c.activeFilter = c.filter = h;a._.nestedEditable = { element: g.element, container: e, remaining: g.remaining, iterator: c };
            return 1
        }

        function c(a, b, c) {
            if (!b) return !1;
            a = a.clone();
            a.collapse(!c);
            return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END)
        }
        var e = /^[\r\n\t ]+$/,
            g = CKEDITOR.dom.walker.bookmark(!1, !0),
            h = CKEDITOR.dom.walker.whitespaces(!0),
            k = function(a) { return g(a) && h(a) },
            n = { dd: 1, dt: 1, li: 1 };
        a.prototype = {
            getNextParagraph: function(a) {
                var d, h, w, A, E;
                a = a || "p";
                if (this._.nestedEditable) {
                    if (d = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, d;
                    this.activeFilter = this.filter;
                    if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a);
                    this._.nestedEditable =
                        null
                }
                if (!this.range.root.getDtd()[a]) return null;
                if (!this._.started) {
                    var x = this.range.clone();
                    h = x.startPath();
                    var m = x.endPath(),
                        K = !x.collapsed && c(x, h.block),
                        y = !x.collapsed && c(x, m.block, 1);
                    x.shrink(CKEDITOR.SHRINK_ELEMENT, !0);
                    K && x.setStartAt(h.block, CKEDITOR.POSITION_BEFORE_END);
                    y && x.setEndAt(m.block, CKEDITOR.POSITION_AFTER_START);
                    h = x.endContainer.hasAscendant("pre", !0) || x.startContainer.hasAscendant("pre", !0);
                    x.enlarge(this.forceBrBreak && !h || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    x.collapsed || (h = new CKEDITOR.dom.walker(x.clone()), m = CKEDITOR.dom.walker.bookmark(!0, !0), h.evaluator = m, this._.nextNode = h.next(), h = new CKEDITOR.dom.walker(x.clone()), h.evaluator = m, h = h.previous(), this._.lastNode = h.getNextSourceNode(!0, null, x.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (m = this.range.clone(), m.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), m.checkEndOfBlock() &&
                        (m = new CKEDITOR.dom.elementPath(m.endContainer, m.root), this._.lastNode = (m.block || m.blockLimit).getNextSourceNode(!0))), this._.lastNode && x.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = x.document.createText(""), this._.lastNode.insertAfter(h)), x = null);
                    this._.started = 1;
                    h = x
                }
                m = this._.nextNode;
                x = this._.lastNode;
                for (this._.nextNode = null; m;) {
                    var K = 0,
                        y = m.hasAscendant("pre"),
                        H = m.type != CKEDITOR.NODE_ELEMENT,
                        l = 0;
                    if (H) m.type == CKEDITOR.NODE_TEXT && e.test(m.getText()) && (H = 0);
                    else {
                        var u = m.getName();
                        if (CKEDITOR.dtd.$block[u] && "false" == m.getAttribute("contenteditable")) {
                            d = m;
                            b(this, a, d);
                            break
                        } else if (m.isBlockBoundary(this.forceBrBreak && !y && { br: 1 })) {
                            if ("br" == u) H = 1;
                            else if (!h && !m.getChildCount() && "hr" != u) {
                                d = m;
                                w = m.equals(x);
                                break
                            }
                            h && (h.setEndAt(m, CKEDITOR.POSITION_BEFORE_START), "br" != u && (this._.nextNode = m));
                            K = 1
                        } else {
                            if (m.getFirst()) {
                                h || (h = this.range.clone(), h.setStartAt(m, CKEDITOR.POSITION_BEFORE_START));
                                m = m.getFirst();
                                continue
                            }
                            H = 1
                        }
                    }
                    H && !h && (h = this.range.clone(), h.setStartAt(m, CKEDITOR.POSITION_BEFORE_START));
                    w = (!K || H) && m.equals(x);
                    if (h && !K)
                        for (; !m.getNext(k) && !w;) {
                            u = m.getParent();
                            if (u.isBlockBoundary(this.forceBrBreak && !y && { br: 1 })) {
                                K = 1;
                                H = 0;
                                w || u.equals(x);
                                h.setEndAt(u, CKEDITOR.POSITION_BEFORE_END);
                                break
                            }
                            m = u;
                            H = 1;
                            w = m.equals(x);
                            l = 1
                        }
                    H && h.setEndAt(m, CKEDITOR.POSITION_AFTER_END);
                    m = this._getNextSourceNode(m, l, x);
                    if ((w = !m) || K && h) break
                }
                if (!d) {
                    if (!h) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
                    d = new CKEDITOR.dom.elementPath(h.startContainer, h.root);
                    m = d.blockLimit;
                    K = { div: 1, th: 1, td: 1 };
                    d = d.block;
                    !d && m && !this.enforceRealBlocks && K[m.getName()] && h.checkStartOfBlock() && h.checkEndOfBlock() && !m.equals(h.root) ? d = m : !d || this.enforceRealBlocks && d.is(n) ? (d = this.range.document.createElement(a), h.extractContents().appendTo(d), d.trim(), h.insertNode(d), A = E = !0) : "li" != d.getName() ? h.checkStartOfBlock() && h.checkEndOfBlock() || (d = d.clone(!1), h.extractContents().appendTo(d), d.trim(), E = h.splitBlock(), A = !E.wasStartOfBlock, E = !E.wasEndOfBlock, h.insertNode(d)) : w || (this._.nextNode = d.equals(x) ? null : this._getNextSourceNode(h.getBoundaryNodes().endNode,
                        1, x))
                }
                A && (A = d.getPrevious()) && A.type == CKEDITOR.NODE_ELEMENT && ("br" == A.getName() ? A.remove() : A.getLast() && "br" == A.getLast().$.nodeName.toLowerCase() && A.getLast().remove());
                E && (A = d.getLast()) && A.type == CKEDITOR.NODE_ELEMENT && "br" == A.getName() && (!CKEDITOR.env.needsBrFiller || A.getPrevious(g) || A.getNext(g)) && A.remove();
                this._.nextNode || (this._.nextNode = w || d.equals(x) || !x ? null : this._getNextSourceNode(d, 1, x));
                return d
            },
            _getNextSourceNode: function(a, b, c) {
                function d(a) { return !(a.equals(c) || a.equals(e)) }
                var e =
                    this.range.root;
                for (a = a.getNextSourceNode(b, null, d); !g(a);) a = a.getNextSourceNode(b, null, d);
                return a
            }
        };
        CKEDITOR.dom.range.prototype.createIterator = function() { return new a(this) }
    })();
    CKEDITOR.command = function(a, d) {
        this.uiItems = [];
        this.exec = function(b) {
            if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1;
            this.editorFocus && a.focus();
            return !1 === this.fire("exec") ? !0 : !1 !== d.exec.call(this, a, b)
        };
        this.refresh = function(a, b) {
            if (!this.readOnly && a.readOnly) return !0;
            if (this.context && !b.isContextFor(this.context) || !this.checkAllowed(!0)) return this.disable(), !0;
            this.startDisabled || this.enable();
            this.modes && !this.modes[a.mode] && this.disable();
            return !1 === this.fire("refresh", { editor: a, path: b }) ? !0 : d.refresh && !1 !== d.refresh.apply(this, arguments)
        };
        var b;
        this.checkAllowed = function(c) { return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b };
        CKEDITOR.tools.extend(this, d, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!d.context, state: CKEDITOR.TRISTATE_DISABLED });
        CKEDITOR.event.call(this)
    };
    CKEDITOR.command.prototype = {
        enable: function() { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) },
        disable: function() { this.setState(CKEDITOR.TRISTATE_DISABLED) },
        setState: function(a) {
            if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1;
            this.previousState = this.state;
            this.state = a;
            this.fire("state");
            return !0
        },
        toggleState: function() {
            this.state == CKEDITOR.TRISTATE_OFF ?
                this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    };
    CKEDITOR.event.implementOn(CKEDITOR.command.prototype);
    CKEDITOR.ENTER_P = 1;
    CKEDITOR.ENTER_BR = 2;
    CKEDITOR.ENTER_DIV = 3;
    CKEDITOR.config = { customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"), extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85] };
    (function() {
        function a(a, b, c, d, e) {
            var l, f;
            a = [];
            for (l in b) {
                f = b[l];
                f = "boolean" == typeof f ? {} : "function" == typeof f ? { match: f } : v(f);
                "$" != l.charAt(0) && (f.elements = l);
                c && (f.featureName = c.toLowerCase());
                var t = f;
                t.elements = h(t.elements, /\s+/) || null;
                t.propertiesOnly = t.propertiesOnly || !0 === t.elements;
                var r = /\s*,\s*/,
                    g = void 0;
                for (g in V) {
                    t[g] = h(t[g], r) || null;
                    var p = t,
                        u = O[g],
                        m = h(t[O[g]], r),
                        G = t[g],
                        z = [],
                        B = !0,
                        F = void 0;
                    m ? B = !1 : m = {};
                    for (F in G) "!" == F.charAt(0) && (F = F.slice(1), z.push(F), m[F] = !0, B = !1);
                    for (; F = z.pop();) G[F] =
                        G["!" + F], delete G["!" + F];
                    p[u] = (B ? !1 : m) || null
                }
                t.match = t.match || null;
                d.push(f);
                a.push(f)
            }
            b = e.elements;
            e = e.generic;
            var I;
            c = 0;
            for (d = a.length; c < d; ++c) {
                l = v(a[c]);
                f = !0 === l.classes || !0 === l.styles || !0 === l.attributes;
                t = l;
                g = u = r = void 0;
                for (r in V) t[r] = K(t[r]);
                p = !0;
                for (g in O) {
                    r = O[g];
                    u = t[r];
                    m = [];
                    G = void 0;
                    for (G in u) - 1 < G.indexOf("*") ? m.push(new RegExp("^" + G.replace(/\*/g, ".*") + "$")) : m.push(G);
                    u = m;
                    u.length && (t[r] = u, p = !1)
                }
                t.nothingRequired = p;
                t.noProperties = !(t.attributes || t.classes || t.styles);
                if (!0 === l.elements ||
                    null === l.elements) e[f ? "unshift" : "push"](l);
                else
                    for (I in t = l.elements, delete l.elements, t)
                        if (b[I]) b[I][f ? "unshift" : "push"](l);
                        else b[I] = [l]
            }
        }

        function d(a, c, d, e) {
            if (!a.match || a.match(c))
                if (e || k(a, c))
                    if (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = b(a.attributes, c.attributes, d.validAttributes)), d.allStyles || (d.allStyles = b(a.styles, c.styles, d.validStyles)), !d.allClasses) {
                        a = a.classes;
                        c = c.classes;
                        e = d.validClasses;
                        if (a)
                            if (!0 === a) a = !0;
                            else {
                                for (var l = 0, f = c.length, t; l < f; ++l) t = c[l], e[t] ||
                                    (e[t] = a(t));
                                a = !1
                            }
                        else a = !1;
                        d.allClasses = a
                    }
        }

        function b(a, b, c) { if (!a) return !1; if (!0 === a) return !0; for (var d in b) c[d] || (c[d] = a(d)); return !1 }

        function c(a, b, c) {
            if (!a.match || a.match(b)) {
                if (a.noProperties) return !1;
                c.hadInvalidAttribute = e(a.attributes, b.attributes) || c.hadInvalidAttribute;
                c.hadInvalidStyle = e(a.styles, b.styles) || c.hadInvalidStyle;
                a = a.classes;
                b = b.classes;
                if (a) {
                    for (var d = !1, l = !0 === a, t = b.length; t--;)
                        if (l || a(b[t])) b.splice(t, 1), d = !0;
                    a = d
                } else a = !1;
                c.hadInvalidClass = a || c.hadInvalidClass
            }
        }

        function e(a,
            b) {
            if (!a) return !1;
            var c = !1,
                d = !0 === a,
                e;
            for (e in b)
                if (d || a(e)) delete b[e], c = !0;
            return c
        }

        function g(a, b, c) {
            if (a.disabled || a.customConfig && !c || !b) return !1;
            a._.cachedChecks = {};
            return !0
        }

        function h(a, b) {
            if (!a) return !1;
            if (!0 === a) return a;
            if ("string" == typeof a) return a = B(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b));
            if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1;
            var c = {},
                d = 0,
                e;
            for (e in a) c[e] = a[e], d++;
            return d ? c : !1
        }

        function k(a, b) {
            if (a.nothingRequired) return !0;
            var c, d, e, l;
            if (e = a.requiredClasses)
                for (l = b.classes, c = 0; c < e.length; ++c)
                    if (d = e[c], "string" == typeof d) { if (-1 == CKEDITOR.tools.indexOf(l, d)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(l, d)) return !1;
            return n(b.styles, a.requiredStyles) && n(b.attributes, a.requiredAttributes)
        }

        function n(a, b) {
            if (!b) return !0;
            for (var c = 0, d; c < b.length; ++c)
                if (d = b[c], "string" == typeof d) { if (!(d in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d)) return !1;
            return !0
        }

        function q(a) {
            if (!a) return {};
            a = a.split(/\s*,\s*/).sort();
            for (var b = {}; a.length;) b[a.shift()] = "cke-test";
            return b
        }

        function f(a) {
            var b, c, d, e, l = {},
                t = 1;
            for (a = B(a); b = a.match(p);)(c = b[2]) ? (d = C(c, "styles"), e = C(c, "attrs"), c = C(c, "classes")) : d = e = c = null, l["$" + t++] = { elements: b[1], classes: c, styles: d, attributes: e }, a = a.slice(b[0].length);
            return l
        }

        function C(a, b) { var c = a.match(F[b]); return c ? B(c[1]) : null }

        function w(a) {
            var b = a.styleBackup = a.attributes.style,
                c = a.classBackup = a.attributes["class"];
            a.styles || (a.styles = CKEDITOR.tools.parseCssText(b ||
                "", 1));
            a.classes || (a.classes = c ? c.split(/\s+/) : [])
        }

        function A(a, b, e, l) {
            var f = 0,
                r;
            l.toHtml && (b.name = b.name.replace(t, "$1"));
            if (l.doCallbacks && a.elementCallbacks) {
                a: {
                    r = a.elementCallbacks;
                    for (var v = 0, g = r.length, p; v < g; ++v)
                        if (p = r[v](b)) { r = p; break a }
                    r = void 0
                }
                if (r) return r
            }
            if (l.doTransform && (r = a._.transformations[b.name])) {
                w(b);
                for (v = 0; v < r.length; ++v) u(a, b, r[v]);
                x(b)
            }
            if (l.doFilter) {
                a: {
                    v = b.name;g = a._;a = g.allowedRules.elements[v];r = g.allowedRules.generic;v = g.disallowedRules.elements[v];g = g.disallowedRules.generic;
                    p = l.skipRequired;
                    var z = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 },
                        h, B;
                    if (a || r) {
                        w(b);
                        if (v)
                            for (h = 0, B = v.length; h < B; ++h)
                                if (!1 === c(v[h], b, z)) { a = null; break a }
                        if (g)
                            for (h = 0, B = g.length; h < B; ++h) c(g[h], b, z);
                        if (a)
                            for (h = 0, B = a.length; h < B; ++h) d(a[h], b, z, p);
                        if (r)
                            for (h = 0, B = r.length; h < B; ++h) d(r[h], b, z, p);
                        a = z
                    } else a = null
                }
                if (!a || !a.valid) return e.push(b), 1;B = a.validAttributes;
                var F = a.validStyles;
                r = a.validClasses;
                var v = b.attributes,
                    I = b.styles,
                    g = b.classes;p = b.classBackup;
                var J = b.styleBackup,
                    k, N, D = [],
                    z = [],
                    O = /^data-cke-/;h = !1;delete v.style;delete v["class"];delete b.classBackup;delete b.styleBackup;
                if (!a.allAttributes)
                    for (k in v) B[k] || (O.test(k) ? k == (N = k.replace(/^data-cke-saved-/, "")) || B[N] || (delete v[k], h = !0) : (delete v[k], h = !0));
                if (!a.allStyles || a.hadInvalidStyle) {
                    for (k in I) a.allStyles || F[k] ? D.push(k + ":" + I[k]) : h = !0;
                    D.length && (v.style = D.sort().join("; "))
                } else J && (v.style = J);
                if (!a.allClasses ||
                    a.hadInvalidClass) {
                    for (k = 0; k < g.length; ++k)(a.allClasses || r[g[k]]) && z.push(g[k]);
                    z.length && (v["class"] = z.sort().join(" "));
                    p && z.length < p.split(/\s+/).length && (h = !0)
                } else p && (v["class"] = p);h && (f = 1);
                if (!l.skipFinalValidation && !m(b)) return e.push(b), 1
            }
            l.toHtml && (b.name = b.name.replace(G, "cke:$1"));
            return f
        }

        function E(a) {
            var b = [],
                c;
            for (c in a) - 1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*"));
            return b.length ? new RegExp("^(?:" + b.join("|") + ")$") : null
        }

        function x(a) {
            var b = a.attributes,
                c;
            delete b.style;
            delete b["class"];
            if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c;
            a.classes.length && (b["class"] = a.classes.sort().join(" "))
        }

        function m(a) {
            switch (a.name) {
                case "a":
                    if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1;
                    break;
                case "img":
                    if (!a.attributes.src) return !1
            }
            return !0
        }

        function K(a) { if (!a) return !1; if (!0 === a) return !0; var b = E(a); return function(c) { return c in a || b && c.match(b) } }

        function y() { return new CKEDITOR.htmlParser.element("br") }

        function H(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && ("br" ==
                a.name || z.$block[a.name])
        }

        function l(a, b, c) {
            var d = a.name;
            if (z.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(y()) : (a.parent && c.push({ check: "it", el: a.parent }), a.remove());
            else if (z.$block[d] || "tr" == d)
                if ("br" == b) a.previous && !H(a.previous) && (b = y(), b.insertBefore(a)), a.next && !H(a.next) && (b = y(), b.insertAfter(a)), a.replaceWithChildren();
                else {
                    var d = a.children,
                        e;
                    b: {
                        e = z[b];
                        for (var l = 0, t = d.length, f; l < t; ++l)
                            if (f = d[l], f.type == CKEDITOR.NODE_ELEMENT && !e[f.name]) { e = !1; break b }
                        e = !0
                    }
                    if (e) a.name = b, a.attributes = {}, c.push({ check: "parent-down", el: a });
                    else {
                        e = a.parent;
                        for (var l = e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == e.name, v, r, t = d.length; 0 < t;) f = d[--t], l && (f.type == CKEDITOR.NODE_TEXT || f.type == CKEDITOR.NODE_ELEMENT && z.$inline[f.name]) ? (v || (v = new CKEDITOR.htmlParser.element(b), v.insertAfter(a), c.push({ check: "parent-down", el: v })), v.add(f, 0)) : (v = null, r = z[e.name] || z.span, f.insertAfter(a), e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || f.type != CKEDITOR.NODE_ELEMENT || r[f.name] || c.push({ check: "el-up", el: f }));
                        a.remove()
                    }
                }
            else d in { style: 1, script: 1 } ? a.remove() : (a.parent && c.push({ check: "it", el: a.parent }), a.replaceWithChildren())
        }

        function u(a, b, c) {
            var d, e;
            for (d = 0; d < c.length; ++d)
                if (e = c[d], !(e.check && !a.check(e.check, !1) || e.left && !e.left(b))) { e.right(b, N); break }
        }

        function I(a, b) {
            var c = b.getDefinition(),
                d = c.attributes,
                e = c.styles,
                l, f, t, v;
            if (a.name != c.element) return !1;
            for (l in d)
                if ("class" == l)
                    for (c = d[l].split(/\s+/), t = a.classes.join("|"); v = c.pop();) { if (-1 == t.indexOf(v)) return !1 } else if (a.attributes[l] != d[l]) return !1;
            for (f in e)
                if (a.styles[f] !=
                    e[f]) return !1;
            return !0
        }

        function J(a, b) { var c, d; "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]); return [{ element: c, left: d, right: function(a, c) { c.transform(a, b) } }] }

        function D(a) { return function(b) { return I(b, a) } }

        function r(a) { return function(b, c) { c[a](b) } }
        var z = CKEDITOR.dtd,
            v = CKEDITOR.tools.copy,
            B = CKEDITOR.tools.trim,
            L = ["", "p", "br", "div"];
        CKEDITOR.FILTER_SKIP_TREE = 2;
        CKEDITOR.filter = function(a) {
            this.allowedContent = [];
            this.disallowedContent = [];
            this.elementCallbacks = null;
            this.disabled = !1;
            this.editor = null;
            this.id = CKEDITOR.tools.getNextNumber();
            this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {} };
            CKEDITOR.filter.instances[this.id] = this;
            if (a instanceof CKEDITOR.editor) {
                a = this.editor = a;
                this.customConfig = !0;
                var b = a.config.allowedContent;
                !0 === b ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), this.allow(a.config.extraAllowedContent, "extra", 1), this.allow(L[a.enterMode] + " " + L[a.shiftEnterMode], "default",
                    1), this.disallow(a.config.disallowedContent))
            } else this.customConfig = !1, this.allow(a, "default", 1)
        };
        CKEDITOR.filter.instances = {};
        CKEDITOR.filter.prototype = {
            allow: function(b, c, d) {
                if (!g(this, b, d)) return !1;
                var e, l;
                if ("string" == typeof b) b = f(b);
                else if (b instanceof CKEDITOR.style) {
                    if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d);
                    e = b.getDefinition();
                    b = {};
                    d = e.attributes;
                    b[e.element] = e = { styles: e.styles, requiredStyles: e.styles && CKEDITOR.tools.objectKeys(e.styles) };
                    d && (d =
                        v(d), e.classes = d["class"] ? d["class"].split(/\s+/) : null, e.requiredClasses = e.classes, delete d["class"], e.attributes = d, e.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
                } else if (CKEDITOR.tools.isArray(b)) { for (e = 0; e < b.length; ++e) l = this.allow(b[e], c, d); return l } a(this, b, c, this.allowedContent, this._.allowedRules);
                return !0
            },
            applyTo: function(a, b, c, d) {
                if (this.disabled) return !1;
                var e = this,
                    f = [],
                    t = this.editor && this.editor.config.protectedSource,
                    v, r = !1,
                    g = { doFilter: !c, doTransform: !0, doCallbacks: !0, toHtml: b };
                a.forEach(function(a) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        if ("off" == a.attributes["data-cke-filter"]) return !1;
                        if (!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))
                            if (v = A(e, a, f, g), v & 1) r = !0;
                            else if (v & 2) return !1
                    } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var c;
                        a: {
                            var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));c = [];
                            var l, p, u;
                            if (t)
                                for (p = 0; p < t.length; ++p)
                                    if ((u = d.match(t[p])) && u[0].length == d.length) {
                                        c = !0;
                                        break a
                                    }
                            d = CKEDITOR.htmlParser.fragment.fromHtml(d);1 == d.children.length && (l = d.children[0]).type == CKEDITOR.NODE_ELEMENT && A(e, l, c, g);c = !c.length
                        }
                        c || f.push(a)
                    }
                }, null, !0);
                f.length && (r = !0);
                var p;
                a = [];
                d = L[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)];
                for (var u; c = f.pop();) c.type == CKEDITOR.NODE_ELEMENT ? l(c, d, a) : c.remove();
                for (; p = a.pop();)
                    if (c = p.el, c.parent) switch (u = z[c.parent.name] || z.span, p.check) {
                        case "it":
                            z.$removeEmpty[c.name] && !c.children.length ? l(c, d, a) : m(c) || l(c, d, a);
                            break;
                        case "el-up":
                            c.parent.type ==
                                CKEDITOR.NODE_DOCUMENT_FRAGMENT || u[c.name] || l(c, d, a);
                            break;
                        case "parent-down":
                            c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || u[c.name] || l(c.parent, d, a)
                    }
                return r
            },
            checkFeature: function(a) {
                if (this.disabled || !a) return !0;
                a.toFeature && (a = a.toFeature(this.editor));
                return !a.requiredContent || this.check(a.requiredContent)
            },
            disable: function() { this.disabled = !0 },
            disallow: function(b) {
                if (!g(this, b, !0)) return !1;
                "string" == typeof b && (b = f(b));
                a(this, b, null, this.disallowedContent, this._.disallowedRules);
                return !0
            },
            addContentForms: function(a) {
                if (!this.disabled && a) {
                    var b, c, d = [],
                        e;
                    for (b = 0; b < a.length && !e; ++b) c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (e = c);
                    if (e) {
                        for (b = 0; b < a.length; ++b) d.push(J(a[b], e));
                        this.addTransformations(d)
                    }
                }
            },
            addElementCallback: function(a) {
                this.elementCallbacks || (this.elementCallbacks = []);
                this.elementCallbacks.push(a)
            },
            addFeature: function(a) {
                if (this.disabled || !a) return !0;
                a.toFeature && (a = a.toFeature(this.editor));
                this.allow(a.allowedContent, a.name);
                this.addTransformations(a.contentTransformations);
                this.addContentForms(a.contentForms);
                return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
            },
            addTransformations: function(a) {
                var b, c;
                if (!this.disabled && a) {
                    var d = this._.transformations,
                        e;
                    for (e = 0; e < a.length; ++e) {
                        b = a[e];
                        var l = void 0,
                            f = void 0,
                            t = void 0,
                            v = void 0,
                            g = void 0,
                            p = void 0;
                        c = [];
                        for (f = 0; f < b.length; ++f) t = b[f], "string" == typeof t ? (t = t.split(/\s*:\s*/), v = t[0], g = null, p = t[1]) : (v = t.check, g = t.left, p = t.right), l || (l = t, l = l.element ? l.element : v ? v.match(/^([a-z0-9]+)/i)[0] :
                            l.left.getDefinition().element), g instanceof CKEDITOR.style && (g = D(g)), c.push({ check: v == l ? null : v, left: g, right: "string" == typeof p ? r(p) : p });
                        b = l;
                        d[b] || (d[b] = []);
                        d[b].push(c)
                    }
                }
            },
            check: function(a, b, c) {
                if (this.disabled) return !0;
                if (CKEDITOR.tools.isArray(a)) {
                    for (var d = a.length; d--;)
                        if (this.check(a[d], b, c)) return !0;
                    return !1
                }
                var e, l;
                if ("string" == typeof a) {
                    l = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e";
                    if (l in this._.cachedChecks) return this._.cachedChecks[l];
                    d = f(a).$1;
                    e = d.styles;
                    var t = d.classes;
                    d.name = d.elements;
                    d.classes = t = t ? t.split(/\s*,\s*/) : [];
                    d.styles = q(e);
                    d.attributes = q(d.attributes);
                    d.children = [];
                    t.length && (d.attributes["class"] = t.join(" "));
                    e && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles));
                    e = d
                } else d = a.getDefinition(), e = d.styles, t = d.attributes || {}, e && !CKEDITOR.tools.isEmpty(e) ? (e = v(e), t.style = CKEDITOR.tools.writeCssText(e, !0)) : e = {}, e = { name: d.element, attributes: t, classes: t["class"] ? t["class"].split(/\s+/) : [], styles: e, children: [] };
                var t = CKEDITOR.tools.clone(e),
                    r = [],
                    g;
                if (!1 !== b && (g = this._.transformations[e.name])) {
                    for (d =
                        0; d < g.length; ++d) u(this, e, g[d]);
                    x(e)
                }
                A(this, t, r, { doFilter: !0, doTransform: !1 !== b, skipRequired: !c, skipFinalValidation: !c });
                b = 0 < r.length ? !1 : CKEDITOR.tools.objectCompare(e.attributes, t.attributes, !0) ? !0 : !1;
                "string" == typeof a && (this._.cachedChecks[l] = b);
                return b
            },
            getAllowedEnterMode: function() {
                var a = ["p", "div", "br"],
                    b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR };
                return function(c, d) {
                    var e = a.slice(),
                        l;
                    if (this.check(L[c])) return c;
                    for (d || (e = e.reverse()); l = e.pop();)
                        if (this.check(l)) return b[l];
                    return CKEDITOR.ENTER_BR
                }
            }(),
            destroy: function() {
                delete CKEDITOR.filter.instances[this.id];
                delete this._;
                delete this.allowedContent;
                delete this.disallowedContent
            }
        };
        var V = { styles: 1, attributes: 1, classes: 1 },
            O = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" },
            p = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
            F = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ },
            t = /^cke:(object|embed|param)$/,
            G = /^(object|embed|param)$/,
            N;
        N = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function(a) {
                this.lengthToStyle(a, "width");
                this.lengthToStyle(a, "height")
            },
            sizeToAttribute: function(a) {
                this.lengthToAttribute(a, "width");
                this.lengthToAttribute(a, "height")
            },
            lengthToStyle: function(a, b, c) {
                c = c || b;
                if (!(c in a.styles)) {
                    var d = a.attributes[b];
                    d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d)
                }
                delete a.attributes[b]
            },
            lengthToAttribute: function(a, b, c) {
                c = c || b;
                if (!(c in a.attributes)) {
                    var d = a.styles[b],
                        e = d && d.match(/^(\d+)(?:\.\d*)?px$/);
                    e ? a.attributes[c] = e[1] : "cke-test" == d && (a.attributes[c] = "cke-test")
                }
                delete a.styles[b]
            },
            alignmentToStyle: function(a) { if (!("float" in a.styles)) { var b = a.attributes.align; if ("left" == b || "right" == b) a.styles["float"] = b } delete a.attributes.align },
            alignmentToAttribute: function(a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if ("left" == b || "right" == b) a.attributes.align = b } delete a.styles["float"] },
            splitBorderShorthand: function(a) {
                function b(d) {
                    a.styles["border-top-width"] = c[d[0]];
                    a.styles["border-right-width"] =
                        c[d[1]];
                    a.styles["border-bottom-width"] = c[d[2]];
                    a.styles["border-left-width"] = c[d[3]]
                }
                if (a.styles.border) {
                    var c = a.styles.border.match(/([\.\d]+\w+)/g) || ["0px"];
                    switch (c.length) {
                        case 1:
                            a.styles["border-width"] = c[0];
                            break;
                        case 2:
                            b([0, 1, 0, 1]);
                            break;
                        case 3:
                            b([0, 1, 2, 1]);
                            break;
                        case 4:
                            b([0, 1, 2, 3])
                    }
                    a.styles["border-style"] = a.styles["border-style"] || (a.styles.border.match(/(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit)/) || [])[0];
                    a.styles["border-style"] || delete a.styles["border-style"];
                    delete a.styles.border
                }
            },
            listTypeToStyle: function(a) {
                if (a.attributes.type) switch (a.attributes.type) {
                    case "a":
                        a.styles["list-style-type"] = "lower-alpha";
                        break;
                    case "A":
                        a.styles["list-style-type"] = "upper-alpha";
                        break;
                    case "i":
                        a.styles["list-style-type"] = "lower-roman";
                        break;
                    case "I":
                        a.styles["list-style-type"] = "upper-roman";
                        break;
                    case "1":
                        a.styles["list-style-type"] = "decimal";
                        break;
                    default:
                        a.styles["list-style-type"] = a.attributes.type
                }
            },
            splitMarginShorthand: function(a) {
                function b(d) {
                    a.styles["margin-top"] =
                        c[d[0]];
                    a.styles["margin-right"] = c[d[1]];
                    a.styles["margin-bottom"] = c[d[2]];
                    a.styles["margin-left"] = c[d[3]]
                }
                if (a.styles.margin) {
                    var c = a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"];
                    switch (c.length) {
                        case 1:
                            b([0, 0, 0, 0]);
                            break;
                        case 2:
                            b([0, 1, 0, 1]);
                            break;
                        case 3:
                            b([0, 1, 2, 1]);
                            break;
                        case 4:
                            b([0, 1, 2, 3])
                    }
                    delete a.styles.margin
                }
            },
            matchesStyle: I,
            transform: function(a, b) {
                if ("string" == typeof b) a.name = b;
                else {
                    var c = b.getDefinition(),
                        d = c.styles,
                        e = c.attributes,
                        l, t, f, v;
                    a.name = c.element;
                    for (l in e)
                        if ("class" == l)
                            for (c =
                                a.classes.join("|"), f = e[l].split(/\s+/); v = f.pop();) - 1 == c.indexOf(v) && a.classes.push(v);
                        else a.attributes[l] = e[l];
                    for (t in d) a.styles[t] = d[t]
                }
            }
        }
    })();
    (function() {
        CKEDITOR.focusManager = function(a) {
            if (a.focusManager) return a.focusManager;
            this.hasFocus = !1;
            this.currentActive = null;
            this._ = { editor: a };
            return this
        };
        CKEDITOR.focusManager._ = { blurDelay: 200 };
        CKEDITOR.focusManager.prototype = {
            focus: function(a) {
                this._.timer && clearTimeout(this._.timer);
                a && (this.currentActive = a);
                this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus"))
            },
            lock: function() {
                this._.locked =
                    1
            },
            unlock: function() { delete this._.locked },
            blur: function(a) {
                function d() {
                    if (this.hasFocus) {
                        this.hasFocus = !1;
                        var a = this._.editor.container;
                        a && a.removeClass("cke_focus");
                        this._.editor.fire("blur")
                    }
                }
                if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer);
                    var b = CKEDITOR.focusManager._.blurDelay;
                    a || !b ? d.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
                        delete this._.timer;
                        d.call(this)
                    }, b, this)
                }
            },
            add: function(a, d) {
                var b = a.getCustomData("focusmanager");
                if (!b || b != this) {
                    b && b.remove(a);
                    var b =
                        "focus",
                        c = "blur";
                    d && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1);
                    var e = { blur: function() { a.equals(this.currentActive) && this.blur() }, focus: function() { this.focus(a) } };
                    a.on(b, e.focus, this);
                    a.on(c, e.blur, this);
                    d && (CKEDITOR.event.useCapture = 0);
                    a.setCustomData("focusmanager", this);
                    a.setCustomData("focusmanager_handlers", e)
                }
            },
            remove: function(a) {
                a.removeCustomData("focusmanager");
                var d = a.removeCustomData("focusmanager_handlers");
                a.removeListener("blur", d.blur);
                a.removeListener("focus",
                    d.focus)
            }
        }
    })();
    CKEDITOR.keystrokeHandler = function(a) {
        if (a.keystrokeHandler) return a.keystrokeHandler;
        this.keystrokes = {};
        this.blockedKeystrokes = {};
        this._ = { editor: a };
        return this
    };
    (function() {
        var a, d = function(b) {
                b = b.data;
                var d = b.getKeystroke(),
                    g = this.keystrokes[d],
                    h = this._.editor;
                a = !1 === h.fire("key", { keyCode: d, domEvent: b });
                a || (g && (a = !1 !== h.execCommand(g, { from: "keystrokeHandler" })), a || (a = !!this.blockedKeystrokes[d]));
                a && b.preventDefault(!0);
                return !a
            },
            b = function(b) { a && (a = !1, b.data.preventDefault(!0)) };
        CKEDITOR.keystrokeHandler.prototype = { attach: function(a) { a.on("keydown", d, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this) } }
    })();
    (function() {
        CKEDITOR.lang = {
            languages: { af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1 },
            rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 },
            load: function(a, d, b) {
                a && CKEDITOR.lang.languages[a] ||
                    (a = this.detect(d, a));
                var c = this;
                d = function() {
                    c[a].dir = c.rtl[a] ? "rtl" : "ltr";
                    b(a, c[a])
                };
                this[a] ? d() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), d, this)
            },
            detect: function(a, d) {
                var b = this.languages;
                d = d || navigator.userLanguage || navigator.language || a;
                var c = d.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                    e = c[1],
                    c = c[2];
                b[e + "-" + c] ? e = e + "-" + c : b[e] || (e = null);
                CKEDITOR.lang.detect = e ? function() { return e } : function(a) { return a };
                return e || a
            }
        }
    })();
    CKEDITOR.scriptLoader = function() {
        var a = {},
            d = {};
        return {
            load: function(b, c, e, g) {
                var h = "string" == typeof b;
                h && (b = [b]);
                e || (e = CKEDITOR);
                var k = b.length,
                    n = [],
                    q = [],
                    f = function(a) { c && (h ? c.call(e, a) : c.call(e, n, q)) };
                if (0 === k) f(!0);
                else {
                    var C = function(a, b) {
                            (b ? n : q).push(a);
                            0 >= --k && (g && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), f(b))
                        },
                        w = function(b, c) {
                            a[b] = 1;
                            var e = d[b];
                            delete d[b];
                            for (var f = 0; f < e.length; f++) e[f](b, c)
                        },
                        A = function(b) {
                            if (a[b]) C(b, !0);
                            else {
                                var e = d[b] || (d[b] = []);
                                e.push(C);
                                if (!(1 < e.length)) {
                                    var f =
                                        new CKEDITOR.dom.element("script");
                                    f.setAttributes({ type: "text/javascript", src: b });
                                    c && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? f.$.onreadystatechange = function() { if ("loaded" == f.$.readyState || "complete" == f.$.readyState) f.$.onreadystatechange = null, w(b, !0) } : (f.$.onload = function() { setTimeout(function() { w(b, !0) }, 0) }, f.$.onerror = function() { w(b, !1) }));
                                    f.appendTo(CKEDITOR.document.getHead())
                                }
                            }
                        };
                    g && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                    for (var E = 0; E < k; E++) A(b[E])
                }
            },
            queue: function() {
                function a() {
                    var b;
                    (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0)
                }
                var c = [];
                return function(d, g) {
                    var h = this;
                    c.push({
                        scriptUrl: d,
                        callback: function() {
                            g && g.apply(this, arguments);
                            c.shift();
                            a.call(h)
                        }
                    });
                    1 == c.length && a.call(this)
                }
            }()
        }
    }();
    CKEDITOR.resourceManager = function(a, d) {
        this.basePath = a;
        this.fileName = d;
        this.registered = {};
        this.loaded = {};
        this.externals = {};
        this._ = { waitingList: {} }
    };
    CKEDITOR.resourceManager.prototype = {
        add: function(a, d) {
            if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.');
            var b = this.registered[a] = d || {};
            b.name = a;
            b.path = this.getPath(a);
            CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
            return this.get(a)
        },
        get: function(a) { return this.registered[a] || null },
        getPath: function(a) { var d = this.externals[a]; return CKEDITOR.getUrl(d && d.dir || this.basePath + a + "/") },
        getFilePath: function(a) {
            var d = this.externals[a];
            return CKEDITOR.getUrl(this.getPath(a) + (d ? d.file : this.fileName + ".js"))
        },
        addExternal: function(a, d, b) {
            a = a.split(",");
            for (var c = 0; c < a.length; c++) {
                var e = a[c];
                b || (d = d.replace(/[^\/]+$/, function(a) { b = a; return "" }));
                this.externals[e] = { dir: d, file: b || this.fileName + ".js" }
            }
        },
        load: function(a, d, b) {
            CKEDITOR.tools.isArray(a) || (a = a ? [a] : []);
            for (var c = this.loaded, e = this.registered, g = [], h = {}, k = {}, n = 0; n < a.length; n++) {
                var q = a[n];
                if (q)
                    if (c[q] || e[q]) k[q] = this.get(q);
                    else {
                        var f = this.getFilePath(q);
                        g.push(f);
                        f in h || (h[f] = []);
                        h[f].push(q)
                    }
            }
            CKEDITOR.scriptLoader.load(g, function(a, e) {
                if (e.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + h[e[0]].join(",") + '" was not found at "' + e[0] + '".');
                for (var f = 0; f < a.length; f++)
                    for (var g = h[a[f]], n = 0; n < g.length; n++) {
                        var m = g[n];
                        k[m] = this.get(m);
                        c[m] = 1
                    }
                d.call(b, k)
            }, this)
        }
    };
    CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin");
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(a) {
        var d = {};
        return function(b, c, e) {
            var g = {},
                h = function(b) {
                    a.call(this, b, function(a) {
                        CKEDITOR.tools.extend(g, a);
                        var b = [],
                            f;
                        for (f in a) {
                            var k = a[f],
                                w = k && k.requires;
                            if (!d[f]) {
                                if (k.icons)
                                    for (var A = k.icons.split(","), E = A.length; E--;) CKEDITOR.skin.addIcon(A[E], k.path + "icons/" + (CKEDITOR.env.hidpi && k.hidpi ? "hidpi/" : "") + A[E] + ".png");
                                d[f] = 1
                            }
                            if (w)
                                for (w.split && (w = w.split(",")), k = 0; k < w.length; k++) g[w[k]] || b.push(w[k])
                        }
                        if (b.length) h.call(this,
                            b);
                        else {
                            for (f in g) k = g[f], k.onLoad && !k.onLoad._called && (!1 === k.onLoad() && delete g[f], k.onLoad._called = 1);
                            c && c.call(e || window, g)
                        }
                    }, this)
                };
            h.call(this, b)
        }
    });
    CKEDITOR.plugins.setLang = function(a, d, b) {
        var c = this.get(a);
        a = c.langEntries || (c.langEntries = {});
        c = c.lang || (c.lang = []);
        c.split && (c = c.split(",")); - 1 == CKEDITOR.tools.indexOf(c, d) && c.push(d);
        a[d] = b
    };
    CKEDITOR.ui = function(a) {
        if (a.ui) return a.ui;
        this.items = {};
        this.instances = {};
        this.editor = a;
        this._ = { handlers: {} };
        return this
    };
    CKEDITOR.ui.prototype = {
        add: function(a, d, b) {
            b.name = a.toLowerCase();
            var c = this.items[a] = { type: d, command: b.command || null, args: Array.prototype.slice.call(arguments, 2) };
            CKEDITOR.tools.extend(c, b)
        },
        get: function(a) { return this.instances[a] },
        create: function(a) {
            var d = this.items[a],
                b = d && this._.handlers[d.type],
                c = d && d.command && this.editor.getCommand(d.command),
                b = b && b.create.apply(this, d.args);
            this.instances[a] = b;
            c && c.uiItems.push(b);
            b && !b.type && (b.type = d.type);
            return b
        },
        addHandler: function(a, d) {
            this._.handlers[a] =
                d
        },
        space: function(a) { return CKEDITOR.document.getById(this.spaceId(a)) },
        spaceId: function(a) { return this.editor.id + "_" + a }
    };
    CKEDITOR.event.implementOn(CKEDITOR.ui);
    (function() {
        function a(a, e, f) {
            CKEDITOR.event.call(this);
            a = a && CKEDITOR.tools.clone(a);
            if (void 0 !== e) {
                if (!(e instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
                if (!f) throw Error("One of the element modes must be specified.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                if (!b(e, f)) throw Error('The specified element mode is not supported on element: "' + e.getName() + '".');
                this.element = e;
                this.elementMode = f;
                this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (e.getId() || e.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {};
            this.commands = {};
            this.templates = {};
            this.name = this.name || d();
            this.id = CKEDITOR.tools.getNextId();
            this.status = "unloaded";
            this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
            this.ui = new CKEDITOR.ui(this);
            this.focusManager = new CKEDITOR.focusManager(this);
            this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
            this.on("readOnly",
                c);
            this.on("selectionChange", function(a) { g(this, a.data.path) });
            this.on("activeFilterChange", function() { g(this, this.elementPath(), !0) });
            this.on("mode", c);
            this.on("instanceReady", function() { this.config.startupFocus && this.focus() });
            CKEDITOR.fire("instanceCreated", null, this);
            CKEDITOR.add(this);
            CKEDITOR.tools.setTimeout(function() { "destroyed" !== this.status ? k(this, a) : CKEDITOR.warn("editor-incorrect-destroy") }, 0, this)
        }

        function d() { do var a = "editor" + ++E; while (CKEDITOR.instances[a]); return a }

        function b(a,
            b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 }

        function c() {
            var a = this.commands,
                b;
            for (b in a) e(this, a[b])
        }

        function e(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() }

        function g(a, b, c) { if (b) { var d, e, f = a.commands; for (e in f) d = f[e], (c || d.contextSensitive) && d.refresh(a, b) } }

        function h(a) {
            var b = a.config.customConfig;
            if (!b) return !1;
            var b =
                CKEDITOR.getUrl(b),
                c = x[b] || (x[b] = {});
            c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && h(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function() {
                c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
                h(a)
            });
            return !0
        }

        function k(a, b) {
            a.on("customConfigLoaded", function() {
                if (b) {
                    if (b.on)
                        for (var c in b.on) a.on(c, b.on[c]);
                    CKEDITOR.tools.extend(a.config, b, !0);
                    delete a.config.on
                }
                c = a.config;
                a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ?
                    a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1;
                a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1;
                a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
                a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
                c.skin && (CKEDITOR.skinName = c.skin);
                a.fireOnce("configLoaded");
                a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
                a.filter = a.activeFilter = new CKEDITOR.filter(a);
                n(a)
            });
            b && null != b.customConfig && (a.config.customConfig = b.customConfig);
            h(a) || a.fireOnce("customConfigLoaded")
        }

        function n(a) { CKEDITOR.skin.loadPart("editor", function() { q(a) }) }

        function q(a) {
            CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b,
                c) {
                var d = a.config.title;
                a.langCode = b;
                a.lang = CKEDITOR.tools.prototypedCopy(c);
                a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", ");
                a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir);
                a.fire("langLoaded");
                f(a)
            })
        }

        function f(a) {
            a.getStylesSet(function(b) {
                a.once("loaded", function() { a.fire("stylesSet", { styles: b }) }, null, null, 1);
                C(a)
            })
        }

        function C(a) {
            var b = a.config,
                c = b.plugins,
                d = b.extraPlugins,
                e =
                b.removePlugins;
            if (d) var f = new RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
                c = c.replace(f, ""),
                c = c + ("," + d);
            if (e) var g = new RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
                c = c.replace(g, "");
            CKEDITOR.env.air && (c += ",adobeair");
            CKEDITOR.plugins.load(c.split(","), function(c) {
                var d = [],
                    e = [],
                    f = [];
                a.plugins = c;
                for (var l in c) {
                    var u = c[l],
                        h = u.lang,
                        k = null,
                        O = u.requires,
                        p;
                    CKEDITOR.tools.isArray(O) && (O = O.join(","));
                    if (O && (p = O.match(g)))
                        for (; O = p.pop();) CKEDITOR.error("editor-plugin-required", { plugin: O.replace(",", ""), requiredBy: l });
                    h && !a.lang[l] && (h.split && (h = h.split(",")), 0 <= CKEDITOR.tools.indexOf(h, a.langCode) ? k = a.langCode : (k = a.langCode.replace(/-.*/, ""), k = k != a.langCode && 0 <= CKEDITOR.tools.indexOf(h, k) ? k : 0 <= CKEDITOR.tools.indexOf(h, "en") ? "en" : h[0]), u.langEntries && u.langEntries[k] ? (a.lang[l] = u.langEntries[k], k = null) : f.push(CKEDITOR.getUrl(u.path + "lang/" + k + ".js")));
                    e.push(k);
                    d.push(u)
                }
                CKEDITOR.scriptLoader.load(f, function() {
                    for (var c = ["beforeInit", "init", "afterInit"], f = 0; f < c.length; f++)
                        for (var l =
                                0; l < d.length; l++) {
                            var v = d[l];
                            0 === f && e[l] && v.lang && v.langEntries && (a.lang[v.name] = v.langEntries[e[l]]);
                            if (v[c[f]]) v[c[f]](a)
                        }
                    a.fireOnce("pluginsLoaded");
                    b.keystrokes && a.setKeystroke(a.config.keystrokes);
                    for (l = 0; l < a.config.blockedKeystrokes.length; l++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[l]] = 1;
                    a.status = "loaded";
                    a.fireOnce("loaded");
                    CKEDITOR.fire("instanceLoaded", null, a)
                })
            })
        }

        function w() {
            var a = this.element;
            if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var b = this.getData();
                this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                return !0
            }
            return !1
        }

        function A(a, b) {
            function c(a) {
                var b = a.startContainer,
                    d = a.endContainer;
                return b.is && (b.is("tr") || b.is("td") && b.equals(d) && a.endOffset === b.getChildCount()) ? !0 : !1
            }

            function d(a) { var b = a.startContainer; return b.is("tr") ? a.cloneContents() : b.clone(!0) }
            for (var e = new CKEDITOR.dom.documentFragment, f, g, h, k = 0; k < a.length; k++) {
                var r = a[k],
                    z = r.startContainer.getAscendant("tr", !0);
                c(r) ? (f ||
                    (f = z.getAscendant("table").clone(), f.append(z.getAscendant({ thead: 1, tbody: 1, tfoot: 1 }).clone()), e.append(f), f = f.findOne("thead, tbody, tfoot")), g && g.equals(z) || (g = z, h = z.clone(), f.append(h)), h.append(d(r))) : e.append(r.cloneContents())
            }
            return f ? e : b.getHtmlFromRange(a[0])
        }
        a.prototype = CKEDITOR.editor.prototype;
        CKEDITOR.editor = a;
        var E = 0,
            x = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function(a, b) {
                b.name = a.toLowerCase();
                var c = new CKEDITOR.command(this, b);
                this.mode && e(this, c);
                return this.commands[a] =
                    c
            },
            _attachToForm: function() {
                function a(b) {
                    c.updateElement();
                    c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault()
                }

                function b(a) { return !!(a && a.call && a.apply) }
                var c = this,
                    d = c.element,
                    e = new CKEDITOR.dom.element(d.$.form);
                d.is("textarea") && e && (e.on("submit", a), b(e.$.submit) && (e.$.submit = CKEDITOR.tools.override(e.$.submit, function(b) {
                    return function() {
                        a();
                        b.apply ? b.apply(this) : b()
                    }
                })), c.on("destroy", function() { e.removeListener("submit", a) }))
            },
            destroy: function(a) {
                this.fire("beforeDestroy");
                !a && w.call(this);
                this.editable(null);
                this.filter && (this.filter.destroy(), delete this.filter);
                delete this.activeFilter;
                this.status = "destroyed";
                this.fire("destroy");
                this.removeAllListeners();
                CKEDITOR.remove(this);
                CKEDITOR.fire("instanceDestroyed", null, this)
            },
            elementPath: function(a) {
                if (!a) {
                    a = this.getSelection();
                    if (!a) return null;
                    a = a.getStartElement()
                }
                return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
            },
            createRange: function() { var a = this.editable(); return a ? new CKEDITOR.dom.range(a) : null },
            execCommand: function(a,
                b) {
                var c = this.getCommand(a),
                    d = { name: a, commandData: b || {}, command: c };
                return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1
            },
            getCommand: function(a) { return this.commands[a] },
            getData: function(a) {
                !a && this.fire("beforeGetData");
                var b = this._.data;
                "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() :
                    "");
                b = { dataValue: b };
                !a && this.fire("getData", b);
                return b.dataValue
            },
            getSnapshot: function() { var a = this.fire("getSnapshot"); "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""); return a },
            loadSnapshot: function(a) { this.fire("loadSnapshot", a) },
            setData: function(a, b, c) {
                var d = !0,
                    e = b;
                b && "object" == typeof b && (c = b.internal, e = b.callback, d = !b.noSnapshot);
                !c && d && this.fire("saveSnapshot");
                if (e || !c) this.once("dataReady", function(a) {
                    !c &&
                        d && this.fire("saveSnapshot");
                    e && e.call(a.editor)
                });
                a = { dataValue: a };
                !c && this.fire("setData", a);
                this._.data = a.dataValue;
                !c && this.fire("afterSetData", a)
            },
            setReadOnly: function(a) {
                a = null == a || a;
                this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly"))
            },
            insertHtml: function(a, b, c) { this.fire("insertHtml", { dataValue: a, mode: b, range: c }) },
            insertText: function(a) { this.fire("insertText", a) },
            insertElement: function(a) {
                this.fire("insertElement",
                    a)
            },
            getSelectedHtml: function(a) {
                var b = this.editable(),
                    c = this.getSelection(),
                    c = c && c.getRanges();
                if (!b || !c || 0 === c.length) return null;
                b = A(c, b);
                return a ? b.getHtml() : b
            },
            extractSelectedHtml: function(a, b) {
                var c = this.editable(),
                    d = this.getSelection().getRanges(),
                    e = new CKEDITOR.dom.documentFragment,
                    f;
                if (!c || 0 === d.length) return null;
                for (f = 0; f < d.length; f++) e.append(c.extractHtmlFromRange(d[f], b));
                b || this.getSelection().selectRanges([d[0]]);
                return a ? e.getHtml() : e
            },
            focus: function() { this.fire("beforeFocus") },
            checkDirty: function() {
                return "ready" ==
                    this.status && this._.previousValue !== this.getSnapshot()
            },
            resetDirty: function() { this._.previousValue = this.getSnapshot() },
            updateElement: function() { return w.call(this) },
            setKeystroke: function() {
                for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
                        [].slice.call(arguments, 0)
                    ], c, d, e = b.length; e--;) c = b[e], d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
            },
            getCommandKeystroke: function(a) {
                if (a = "string" === typeof a ? this.getCommand(a) : a) {
                    var b = CKEDITOR.tools.object.findKey(this.commands,
                            a),
                        c = this.keystrokeHandler.keystrokes,
                        d;
                    if (a.fakeKeystroke) return a.fakeKeystroke;
                    for (d in c)
                        if (c.hasOwnProperty(d) && c[d] == b) return d
                }
                return null
            },
            addFeature: function(a) { return this.filter.addFeature(a) },
            setActiveFilter: function(a) {
                a || (a = this.filter);
                this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
            },
            setActiveEnterMode: function(a,
                b) {
                a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
                b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
                if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange")
            },
            showNotification: function(a) { alert(a) }
        })
    })();
    CKEDITOR.ELEMENT_MODE_NONE = 0;
    CKEDITOR.ELEMENT_MODE_REPLACE = 1;
    CKEDITOR.ELEMENT_MODE_APPENDTO = 2;
    CKEDITOR.ELEMENT_MODE_INLINE = 3;
    CKEDITOR.htmlParser = function() { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } };
    (function() {
        var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
            d = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 };
        CKEDITOR.htmlParser.prototype = {
            onTagOpen: function() {},
            onTagClose: function() {},
            onText: function() {},
            onCDATA: function() {},
            onComment: function() {},
            parse: function(b) {
                for (var c, e, g = 0, h; c = this._.htmlPartsRegex.exec(b);) {
                    e = c.index;
                    if (e > g)
                        if (g = b.substring(g, e), h) h.push(g);
                        else this.onText(g);
                    g = this._.htmlPartsRegex.lastIndex;
                    if (e = c[1])
                        if (e = e.toLowerCase(), h && CKEDITOR.dtd.$cdata[e] && (this.onCDATA(h.join("")), h = null), !h) { this.onTagClose(e); continue }
                    if (h) h.push(c[0]);
                    else if (e = c[3]) {
                        if (e = e.toLowerCase(), !/="/.test(e)) {
                            var k = {},
                                n, q = c[4];
                            c = !!c[5];
                            if (q)
                                for (; n = a.exec(q);) {
                                    var f = n[1].toLowerCase();
                                    n = n[2] || n[3] || n[4] || "";
                                    k[f] = !n && d[f] ? f : CKEDITOR.tools.htmlDecodeAttr(n)
                                }
                            this.onTagOpen(e, k, c);
                            !h && CKEDITOR.dtd.$cdata[e] && (h = [])
                        }
                    } else if (e = c[2]) this.onComment(e)
                }
                if (b.length > g) this.onText(b.substring(g,
                    b.length))
            }
        }
    })();
    CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function() { this._ = { output: [] } },
        proto: {
            openTag: function(a) { this._.output.push("\x3c", a) },
            openTagClose: function(a, d) { d ? this._.output.push(" /\x3e") : this._.output.push("\x3e") },
            attribute: function(a, d) {
                "string" == typeof d && (d = CKEDITOR.tools.htmlEncodeAttr(d));
                this._.output.push(" ", a, '\x3d"', d, '"')
            },
            closeTag: function(a) { this._.output.push("\x3c/", a, "\x3e") },
            text: function(a) { this._.output.push(a) },
            comment: function(a) {
                this._.output.push("\x3c!--", a,
                    "--\x3e")
            },
            write: function(a) { this._.output.push(a) },
            reset: function() {
                this._.output = [];
                this._.indent = !1
            },
            getHtml: function(a) {
                var d = this._.output.join("");
                a && this.reset();
                return d
            }
        }
    });
    "use strict";
    (function() {
        CKEDITOR.htmlParser.node = function() {};
        CKEDITOR.htmlParser.node.prototype = {
            remove: function() {
                var a = this.parent.children,
                    d = CKEDITOR.tools.indexOf(a, this),
                    b = this.previous,
                    c = this.next;
                b && (b.next = c);
                c && (c.previous = b);
                a.splice(d, 1);
                this.parent = null
            },
            replaceWith: function(a) {
                var d = this.parent.children,
                    b = CKEDITOR.tools.indexOf(d, this),
                    c = a.previous = this.previous,
                    e = a.next = this.next;
                c && (c.next = a);
                e && (e.previous = a);
                d[b] = a;
                a.parent = this.parent;
                this.parent = null
            },
            insertAfter: function(a) {
                var d = a.parent.children,
                    b = CKEDITOR.tools.indexOf(d, a),
                    c = a.next;
                d.splice(b + 1, 0, this);
                this.next = a.next;
                this.previous = a;
                a.next = this;
                c && (c.previous = this);
                this.parent = a.parent
            },
            insertBefore: function(a) {
                var d = a.parent.children,
                    b = CKEDITOR.tools.indexOf(d, a);
                d.splice(b, 0, this);
                this.next = a;
                (this.previous = a.previous) && (a.previous.next = this);
                a.previous = this;
                this.parent = a.parent
            },
            getAscendant: function(a) {
                var d = "function" == typeof a ? a : "string" == typeof a ? function(b) { return b.name == a } : function(b) { return b.name in a },
                    b = this.parent;
                for (; b &&
                    b.type == CKEDITOR.NODE_ELEMENT;) {
                    if (d(b)) return b;
                    b = b.parent
                }
                return null
            },
            wrapWith: function(a) {
                this.replaceWith(a);
                a.add(this);
                return a
            },
            getIndex: function() { return CKEDITOR.tools.indexOf(this.parent.children, this) },
            getFilterContext: function(a) { return a || {} }
        }
    })();
    "use strict";
    CKEDITOR.htmlParser.comment = function(a) {
        this.value = a;
        this._ = { isBlockLike: !1 }
    };
    CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_COMMENT,
        filter: function(a, d) {
            var b = this.value;
            if (!(b = a.onComment(d, b, this))) return this.remove(), !1;
            if ("string" != typeof b) return this.replaceWith(b), !1;
            this.value = b;
            return !0
        },
        writeHtml: function(a, d) {
            d && this.filter(d);
            a.comment(this.value)
        }
    });
    "use strict";
    (function() {
        CKEDITOR.htmlParser.text = function(a) {
            this.value = a;
            this._ = { isBlockLike: !1 }
        };
        CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function(a, d) { if (!(this.value = a.onText(d, this.value, this))) return this.remove(), !1 },
            writeHtml: function(a, d) {
                d && this.filter(d);
                a.text(this.value)
            }
        })
    })();
    "use strict";
    (function() {
        CKEDITOR.htmlParser.cdata = function(a) { this.value = a };
        CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function() {}, writeHtml: function(a) { a.write(this.value) } })
    })();
    "use strict";
    CKEDITOR.htmlParser.fragment = function() {
        this.children = [];
        this.parent = null;
        this._ = { isBlockLike: !0, hasInlineStarted: !1 }
    };
    (function() {
        function a(a) { return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] }
        var d = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
            b = { ol: 1, ul: 1 },
            c = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }),
            e = { ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td" };
        CKEDITOR.htmlParser.fragment.fromHtml =
            function(g, h, k) {
                function n(a) {
                    var b;
                    if (0 < m.length)
                        for (var c = 0; c < m.length; c++) {
                            var d = m[c],
                                e = d.name,
                                f = CKEDITOR.dtd[e],
                                l = y.name && CKEDITOR.dtd[y.name];
                            l && !l[e] || a && f && !f[a] && CKEDITOR.dtd[a] ? e == y.name && (C(y, y.parent, 1), c--) : (b || (q(), b = 1), d = d.clone(), d.parent = y, y = d, m.splice(c, 1), c--)
                        }
                }

                function q() { for (; K.length;) C(K.shift(), y) }

                function f(a) {
                    if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                        var b = a.children.length,
                            c = a.children[b - 1],
                            d;
                        c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ?
                            c.value = d : a.children.length = b - 1)
                    }
                }

                function C(b, c, d) {
                    c = c || y || x;
                    var e = y;
                    void 0 === b.previous && (w(c, b) && (y = c, E.onTagOpen(k, {}), b.returnPoint = c = y), f(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (l = !1), "textarea" == b.name && (H = !1));
                    b.returnPoint ? (y = b.returnPoint, delete b.returnPoint) : y = d ? c : e
                }

                function w(a, b) {
                    if ((a == x || "body" == a.name) && k && (!a.name || CKEDITOR.dtd[a.name][k])) {
                        var c, d;
                        return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) &&
                            !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                    }
                }

                function A(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 }
                var E = new CKEDITOR.htmlParser,
                    x = h instanceof CKEDITOR.htmlParser.element ? h : "string" == typeof h ? new CKEDITOR.htmlParser.element(h) : new CKEDITOR.htmlParser.fragment,
                    m = [],
                    K = [],
                    y = x,
                    H = "textarea" == x.name,
                    l = "pre" == x.name;
                E.onTagOpen = function(e, f, g, h) {
                    f = new CKEDITOR.htmlParser.element(e, f);
                    f.isUnknown && g && (f.isEmpty = !0);
                    f.isOptionalClose = h;
                    if (a(f)) m.push(f);
                    else {
                        if ("pre" == e) l = !0;
                        else { if ("br" == e && l) { y.add(new CKEDITOR.htmlParser.text("\n")); return } "textarea" == e && (H = !0) }
                        if ("br" == e) K.push(f);
                        else {
                            for (; !(h = (g = y.name) ? CKEDITOR.dtd[g] || (y._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, f.isUnknown || y.isUnknown || h[e]);)
                                if (y.isOptionalClose) E.onTagClose(g);
                                else if (e in b && g in b) g = y.children, (g = g[g.length - 1]) && "li" == g.name || C(g = new CKEDITOR.htmlParser.element("li"), y), !f.returnPoint && (f.returnPoint = y), y = g;
                            else if (e in CKEDITOR.dtd.$listItem &&
                                !A(e, g)) E.onTagOpen("li" == e ? "ul" : "dl", {}, 0, 1);
                            else if (g in d && !A(e, g)) !f.returnPoint && (f.returnPoint = y), y = y.parent;
                            else if (g in CKEDITOR.dtd.$inline && m.unshift(y), y.parent) C(y, y.parent, 1);
                            else { f.isOrphan = 1; break } n(e);
                            q();
                            f.parent = y;
                            f.isEmpty ? C(f) : y = f
                        }
                    }
                };
                E.onTagClose = function(a) {
                    for (var b = m.length - 1; 0 <= b; b--)
                        if (a == m[b].name) { m.splice(b, 1); return }
                    for (var c = [], d = [], e = y; e != x && e.name != a;) e._.isBlockLike || d.unshift(e), c.push(e), e = e.returnPoint || e.parent;
                    if (e != x) {
                        for (b = 0; b < c.length; b++) {
                            var f = c[b];
                            C(f, f.parent)
                        }
                        y =
                            e;
                        e._.isBlockLike && q();
                        C(e, e.parent);
                        e == y && (y = y.parent);
                        m = m.concat(d)
                    }
                    "body" == a && (k = !1)
                };
                E.onText = function(a) {
                    if (!(y._.hasInlineStarted && !K.length || l || H) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return;
                    var b = y.name,
                        f = b ? CKEDITOR.dtd[b] || (y._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
                    if (!H && !f["#"] && b in d) E.onTagOpen(e[b] || ""), E.onText(a);
                    else {
                        q();
                        n();
                        l || H || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                        a = new CKEDITOR.htmlParser.text(a);
                        if (w(y, a)) this.onTagOpen(k, {}, 0, 1);
                        y.add(a)
                    }
                };
                E.onCDATA =
                    function(a) { y.add(new CKEDITOR.htmlParser.cdata(a)) };
                E.onComment = function(a) {
                    q();
                    n();
                    y.add(new CKEDITOR.htmlParser.comment(a))
                };
                E.parse(g);
                for (q(); y != x;) C(y, y.parent, 1);
                f(x);
                return x
            };
        CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
            add: function(a, b) {
                isNaN(b) && (b = this.children.length);
                var c = 0 < b ? this.children[b - 1] : null;
                if (c) {
                    if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 0 === c.value.length)) {
                        this.children.pop();
                        this.add(a);
                        return
                    }
                    c.next =
                        a
                }
                a.previous = c;
                a.parent = this;
                this.children.splice(b, 0, a);
                this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
            },
            filter: function(a, b) {
                b = this.getFilterContext(b);
                a.onRoot(b, this);
                this.filterChildren(a, !1, b)
            },
            filterChildren: function(a, b, c) {
                if (this.childrenFilteredBy != a.id) {
                    c = this.getFilterContext(c);
                    if (b && !this.parent) a.onRoot(c, this);
                    this.childrenFilteredBy = a.id;
                    for (b = 0; b < this.children.length; b++) !1 === this.children[b].filter(a,
                        c) && b--
                }
            },
            writeHtml: function(a, b) {
                b && this.filter(b);
                this.writeChildrenHtml(a)
            },
            writeChildrenHtml: function(a, b, c) {
                var d = this.getFilterContext();
                if (c && !this.parent && b) b.onRoot(d, this);
                b && this.filterChildren(b, !1, d);
                b = 0;
                c = this.children;
                for (d = c.length; b < d; b++) c[b].writeHtml(a)
            },
            forEach: function(a, b, c) { if (!(c || b && this.type != b)) var d = a(this); if (!1 !== d) { c = this.children; for (var e = 0; e < c.length; e++) d = c[e], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : b && d.type != b || a(d) } },
            getFilterContext: function(a) {
                return a || {}
            }
        }
    })();
    "use strict";
    (function() {
        function a() { this.rules = [] }

        function d(b, c, d, g) { var h, k; for (h in c)(k = b[h]) || (k = b[h] = new a), k.add(c[h], d, g) } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function(b) {
                this.id = CKEDITOR.tools.getNextNumber();
                this.elementNameRules = new a;
                this.attributeNameRules = new a;
                this.elementsRules = {};
                this.attributesRules = {};
                this.textRules = new a;
                this.commentRules = new a;
                this.rootRules = new a;
                b && this.addRules(b, 10)
            },
            proto: {
                addRules: function(a, c) {
                    var e;
                    "number" == typeof c ? e = c : c && "priority" in c && (e =
                        c.priority);
                    "number" != typeof e && (e = 10);
                    "object" != typeof c && (c = {});
                    a.elementNames && this.elementNameRules.addMany(a.elementNames, e, c);
                    a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, e, c);
                    a.elements && d(this.elementsRules, a.elements, e, c);
                    a.attributes && d(this.attributesRules, a.attributes, e, c);
                    a.text && this.textRules.add(a.text, e, c);
                    a.comment && this.commentRules.add(a.comment, e, c);
                    a.root && this.rootRules.add(a.root, e, c)
                },
                applyTo: function(a) { a.filter(this) },
                onElementName: function(a, c) {
                    return this.elementNameRules.execOnName(a,
                        c)
                },
                onAttributeName: function(a, c) { return this.attributeNameRules.execOnName(a, c) },
                onText: function(a, c, d) { return this.textRules.exec(a, c, d) },
                onComment: function(a, c, d) { return this.commentRules.exec(a, c, d) },
                onRoot: function(a, c) { return this.rootRules.exec(a, c) },
                onElement: function(a, c) {
                    for (var d = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], g, h = 0; 3 > h; h++)
                        if (g = d[h]) { g = g.exec(a, c, this); if (!1 === g) return null; if (g && g != c) return this.onNode(a, g); if (c.parent && !c.name) break }
                    return c
                },
                onNode: function(a, c) { var d = c.type; return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null },
                onAttribute: function(a, c, d, g) { return (d = this.attributesRules[d]) ? d.exec(a, g, c, this) : g }
            }
        });
        CKEDITOR.htmlParser.filterRulesGroup = a;
        a.prototype = {
            add: function(a, c, d) { this.rules.splice(this.findIndex(c), 0, { value: a, priority: c, options: d }) },
            addMany: function(a,
                c, d) {
                for (var g = [this.findIndex(c), 0], h = 0, k = a.length; h < k; h++) g.push({ value: a[h], priority: c, options: d });
                this.rules.splice.apply(this.rules, g)
            },
            findIndex: function(a) { for (var c = this.rules, d = c.length - 1; 0 <= d && a < c[d].priority;) d--; return d + 1 },
            exec: function(a, c) {
                var d = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment,
                    g = Array.prototype.slice.call(arguments, 1),
                    h = this.rules,
                    k = h.length,
                    n, q, f, C;
                for (C = 0; C < k; C++)
                    if (d && (n = c.type, q = c.name), f = h[C], !(a.nonEditable && !f.options.applyToAll ||
                            a.nestedEditable && f.options.excludeNestedEditable)) {
                        f = f.value.apply(null, g);
                        if (!1 === f || d && f && (f.name != q || f.type != n)) return f;
                        null != f && (g[0] = c = f)
                    }
                return c
            },
            execOnName: function(a, c) { for (var d = 0, g = this.rules, h = g.length, k; c && d < h; d++) k = g[d], a.nonEditable && !k.options.applyToAll || a.nestedEditable && k.options.excludeNestedEditable || (c = c.replace(k.value[0], k.value[1])); return c }
        }
    })();
    (function() {
        function a(a, d) {
            function f(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) }

            function v(a, d) {
                return function(e) {
                    if (e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var l = [],
                            t = b(e),
                            v, p;
                        if (t)
                            for (r(t, 1) && l.push(t); t;) g(t) && (v = c(t)) && r(v) && ((p = c(v)) && !g(p) ? l.push(v) : (f(z).insertAfter(v), v.remove())), t = t.previous;
                        for (t = 0; t < l.length; t++) l[t].remove();
                        if (l = !a || !1 !== ("function" == typeof d ? d(e) : d)) z || CKEDITOR.env.needsBrFiller ||
                            e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? z || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || e.name in CKEDITOR.dtd.tr || e.name in CKEDITOR.dtd.$listItem) ? (l = b(e), l = !l || "form" == e.name && "input" == l.name) : l = !1 : l = !1;
                        l && e.add(f(a))
                    }
                }
            }

            function r(a, b) {
                if ((!z || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0;
                var c;
                return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(m)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a),
                    a.value = c[0]), !CKEDITOR.env.needsBrFiller && z && (!b || a.parent.name in B) || !z && ((c = a.previous) && "br" == c.name || !c || g(c))) ? !0 : !1
            }
            var p = { elements: {} },
                z = "html" == d,
                B = CKEDITOR.tools.extend({}, l),
                F;
            for (F in B) "#" in y[F] || delete B[F];
            for (F in B) p.elements[F] = v(z, a.config.fillEmptyBlocks);
            p.root = v(z, !1);
            p.elements.br = function(a) {
                return function(b) {
                    if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d = b.attributes;
                        if ("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"];
                        else {
                            for (d = b.next; d && e(d);) d =
                                d.next;
                            var l = c(b);
                            !d && g(b.parent) ? h(b.parent, f(a)) : g(d) && l && !g(l) && f(a).insertBefore(d)
                        }
                    }
                }
            }(z);
            return p
        }

        function d(a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 }

        function b(a) { for (a = a.children[a.children.length - 1]; a && e(a);) a = a.previous; return a }

        function c(a) { for (a = a.previous; a && e(a);) a = a.previous; return a }

        function e(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] }

        function g(a) {
            return a &&
                (a.type == CKEDITOR.NODE_ELEMENT && a.name in l || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        }

        function h(a, b) {
            var c = a.children[a.children.length - 1];
            a.children.push(b);
            b.parent = a;
            c && (c.next = b, b.previous = c)
        }

        function k(a) {
            a = a.attributes;
            "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
            a.contenteditable = "false"
        }

        function n(a) {
            a = a.attributes;
            switch (a["data-cke-editable"]) {
                case "true":
                    a.contenteditable = "true";
                    break;
                case "1":
                    delete a.contenteditable
            }
        }

        function q(a) {
            return a.replace(r,
                function(a, b, c) { return "\x3c" + b + c.replace(z, function(a, b) { return v.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + "\x3e" })
        }

        function f(a, b) { return a.replace(b, function(a, b, c) { 0 === a.indexOf("\x3ctextarea") && (a = b + A(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e"); return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e" }) }

        function C(a) { return a.replace(V, function(a, b) { return decodeURIComponent(b) }) }

        function w(a) {
            return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                function(a) { return "\x3c!--" + K + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" })
        }

        function A(a) { return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function(a, b) { return decodeURIComponent(b) }) }

        function E(a, b) { var c = b._.dataStore; return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function(a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) { return c && c[b] || "" }) }

        function x(a, b) {
            var c = [],
                d = b.config.protectedSource,
                e = b._.dataStore || (b._.dataStore = { id: 1 }),
                f = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,
                d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d);
            a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function(a) { return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e" });
            for (var l = 0; l < d.length; l++) a = a.replace(d[l], function(a) { a = a.replace(f, function(a, b, d) { return c[d] }); return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e" });
            a = a.replace(f, function(a, b, d) {
                return "\x3c!--" + K + (b ? "{C}" :
                    "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e"
            });
            a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function(a) { return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function(a, b) { e[e.id] = decodeURIComponent(b); return "{cke_protected_" + e.id++ + "}" }) });
            return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(a, c, d, e) { return "\x3c" + c + d + "\x3e" + E(A(e), b) + "\x3c/" + c + "\x3e" })
        }
        CKEDITOR.htmlDataProcessor = function(b) {
            var c,
                e, l = this;
            this.editor = b;
            this.dataFilter = c = new CKEDITOR.htmlParser.filter;
            this.htmlFilter = e = new CKEDITOR.htmlParser.filter;
            this.writer = new CKEDITOR.htmlParser.basicWriter;
            c.addRules(u);
            c.addRules(I, { applyToAll: !0 });
            c.addRules(a(b, "data"), { applyToAll: !0 });
            e.addRules(J);
            e.addRules(D, { applyToAll: !0 });
            e.addRules(a(b, "html"), { applyToAll: !0 });
            b.on("toHtml", function(a) {
                a = a.data;
                var c = a.dataValue,
                    e, c = x(c, b),
                    c = f(c, L),
                    c = q(c),
                    c = f(c, B),
                    c = c.replace(O, "$1cke:$2"),
                    c = c.replace(F, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
                    c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
                    c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
                e = a.context || b.editable().getName();
                var l;
                CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == e && (e = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", l = 1);
                e = b.document.createElement(e);
                e.setHtml("a" + c);
                c = e.getHtml().substr(1);
                c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), "");
                l && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
                c = c.replace(p, "$1$2");
                c = C(c);
                c = A(c);
                e = !1 === a.fixForBody ? !1 :
                    d(a.enterMode, b.config.autoParagraph);
                c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, e);
                e && (l = c, !l.children.length && CKEDITOR.dtd[l.name][e] && (e = new CKEDITOR.htmlParser.element(e), l.add(e)));
                a.dataValue = c
            }, null, null, 5);
            b.on("toHtml", function(a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6);
            b.on("toHtml", function(a) { a.data.dataValue.filterChildren(l.dataFilter, !0) }, null, null, 10);
            b.on("toHtml", function(a) {
                a = a.data;
                var b = a.dataValue,
                    c = new CKEDITOR.htmlParser.basicWriter;
                b.writeChildrenHtml(c);
                b = c.getHtml(!0);
                a.dataValue = w(b)
            }, null, null, 15);
            b.on("toDataFormat", function(a) {
                var c = a.data.dataValue;
                a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, ""));
                a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, d(a.data.enterMode, b.config.autoParagraph))
            }, null, null, 5);
            b.on("toDataFormat", function(a) { a.data.dataValue.filterChildren(l.htmlFilter, !0) }, null, null, 10);
            b.on("toDataFormat", function(a) {
                a.data.filter.applyTo(a.data.dataValue, !1, !0)
            }, null, null, 11);
            b.on("toDataFormat", function(a) {
                var c = a.data.dataValue,
                    d = l.writer;
                d.reset();
                c.writeChildrenHtml(d);
                c = d.getHtml(!0);
                c = A(c);
                c = E(c, b);
                a.data.dataValue = c
            }, null, null, 15)
        };
        CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function(a, b, c, d) {
                var e = this.editor,
                    f, l, v, g;
                b && "object" == typeof b ? (f = b.context, c = b.fixForBody, d = b.dontFilter, l = b.filter, v = b.enterMode, g = b.protectedWhitespaces) : f = b;
                f || null === f || (f = e.editable().getName());
                return e.fire("toHtml", {
                    dataValue: a,
                    context: f,
                    fixForBody: c,
                    dontFilter: d,
                    filter: l || e.filter,
                    enterMode: v || e.enterMode,
                    protectedWhitespaces: g
                }).dataValue
            },
            toDataFormat: function(a, b) {
                var c, d, e;
                b && (c = b.context, d = b.filter, e = b.enterMode);
                c || null === c || (c = this.editor.editable().getName());
                return this.editor.fire("toDataFormat", { dataValue: a, filter: d || this.editor.filter, context: c, enterMode: e || this.editor.enterMode }).dataValue
            }
        };
        var m = /(?:&nbsp;|\xa0)$/,
            K = "{cke_protected}",
            y = CKEDITOR.dtd,
            H = "caption colgroup col thead tfoot tbody".split(" "),
            l = CKEDITOR.tools.extend({}, y.$blockLimit,
                y.$block),
            u = { elements: { input: k, textarea: k } },
            I = {
                attributeNames: [
                    [/^on/, "data-cke-pa-on"],
                    [/^srcdoc/, "data-cke-pa-srcdoc"],
                    [/^data-cke-expando$/, ""]
                ],
                elements: { iframe: function(a) { if (a.attributes && a.attributes.src) { var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi, ""); if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src } } }
            },
            J = {
                elements: {
                    embed: function(a) {
                        var b = a.parent;
                        if (b && "object" == b.name) {
                            var c = b.attributes.width,
                                b = b.attributes.height;
                            c && (a.attributes.width = c);
                            b && (a.attributes.height = b)
                        }
                    },
                    a: function(a) { var b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 }
                }
            },
            D = {
                elementNames: [
                    [/^cke:/, ""],
                    [/^\?xml:namespace$/, ""]
                ],
                attributeNames: [
                    [/^data-cke-(saved|pa)-/, ""],
                    [/^data-cke-.*/, ""],
                    ["hidefocus", ""]
                ],
                elements: {
                    $: function(a) { var b = a.attributes; if (b) { if (b["data-cke-temp"]) return !1; for (var c = ["name", "href", "src"], d, e = 0; e < c.length; e++) d = "data-cke-saved-" + c[e], d in b && delete b[c[e]] } return a },
                    table: function(a) {
                        a.children.slice(0).sort(function(a, b) {
                            var c, d;
                            a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(H, a.name), d = CKEDITOR.tools.indexOf(H, b.name)); - 1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1);
                            return c > d ? 1 : -1
                        })
                    },
                    param: function(a) {
                        a.children = [];
                        a.isEmpty = !0;
                        return a
                    },
                    span: function(a) { "Apple-style-span" == a.attributes["class"] && delete a.name },
                    html: function(a) {
                        delete a.attributes.contenteditable;
                        delete a.attributes["class"]
                    },
                    body: function(a) {
                        delete a.attributes.spellcheck;
                        delete a.attributes.contenteditable
                    },
                    style: function(a) {
                        var b = a.children[0];
                        b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
                        a.attributes.type || (a.attributes.type = "text/css")
                    },
                    title: function(a) {
                        var b = a.children[0];
                        !b && h(a, b = new CKEDITOR.htmlParser.text);
                        b.value = a.attributes["data-cke-title"] || ""
                    },
                    input: n,
                    textarea: n
                },
                attributes: { "class": function(a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1 } }
            };
        CKEDITOR.env.ie && (D.attributes.style = function(a) {
            return a.replace(/(^|;)([^\:]+)/g,
                function(a) { return a.toLowerCase() })
        });
        var r = /<(a|area|img|input|source)\b([^>]*)>/gi,
            z = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
            v = /^(href|src|name)$/i,
            B = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            L = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
            V = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
            O = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
            p = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
            F = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    })();
    "use strict";
    CKEDITOR.htmlParser.element = function(a, d) {
        this.name = a;
        this.attributes = d || {};
        this.children = [];
        var b = a || "",
            c = b.match(/^cke:(.*)/);
        c && (b = c[1]);
        b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b);
        this.isEmpty = !!CKEDITOR.dtd.$empty[a];
        this.isUnknown = !CKEDITOR.dtd[a];
        this._ = { isBlockLike: b, hasInlineStarted: this.isEmpty || !b }
    };
    CKEDITOR.htmlParser.cssStyle = function(a) {
        var d = {};
        ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, e) {
            "font-family" == c && (e = e.replace(/["']/g, ""));
            d[c.toLowerCase()] = e
        });
        return {
            rules: d,
            populate: function(a) {
                var c = this.toString();
                c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c)
            },
            toString: function() {
                var a = [],
                    c;
                for (c in d) d[c] && a.push(c, ":", d[c], ";");
                return a.join("")
            }
        }
    };
    (function() {
        function a(a) { return function(b) { return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a) } }
        var d = function(a, b) {
                a = a[0];
                b = b[0];
                return a < b ? -1 : a > b ? 1 : 0
            },
            b = CKEDITOR.htmlParser.fragment.prototype;
        CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT,
            add: b.add,
            clone: function() { return new CKEDITOR.htmlParser.element(this.name, this.attributes) },
            filter: function(a, b) {
                var d = this,
                    h, k;
                b = d.getFilterContext(b);
                if (b.off) return !0;
                if (!d.parent) a.onRoot(b, d);
                for (;;) {
                    h = d.name;
                    if (!(k = a.onElementName(b, h))) return this.remove(), !1;
                    d.name = k;
                    if (!(d = a.onElement(b, d))) return this.remove(), !1;
                    if (d !== this) return this.replaceWith(d), !1;
                    if (d.name == h) break;
                    if (d.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(d), !1;
                    if (!d.name) return this.replaceWithChildren(), !1
                }
                h = d.attributes;
                var n, q;
                for (n in h) {
                    for (k = h[n];;)
                        if (q = a.onAttributeName(b, n))
                            if (q != n) delete h[n], n = q;
                            else break;
                    else { delete h[n]; break } q && (!1 === (k = a.onAttribute(b, d, q, k)) ? delete h[q] :
                        h[q] = k)
                }
                d.isEmpty || this.filterChildren(a, !1, b);
                return !0
            },
            filterChildren: b.filterChildren,
            writeHtml: function(a, b) {
                b && this.filter(b);
                var g = this.name,
                    h = [],
                    k = this.attributes,
                    n, q;
                a.openTag(g, k);
                for (n in k) h.push([n, k[n]]);
                a.sortAttributes && h.sort(d);
                n = 0;
                for (q = h.length; n < q; n++) k = h[n], a.attribute(k[0], k[1]);
                a.openTagClose(g, this.isEmpty);
                this.writeChildrenHtml(a);
                this.isEmpty || a.closeTag(g)
            },
            writeChildrenHtml: b.writeChildrenHtml,
            replaceWithChildren: function() {
                for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
                this.remove()
            },
            forEach: b.forEach,
            getFirst: function(b) {
                if (!b) return this.children.length ? this.children[0] : null;
                "function" != typeof b && (b = a(b));
                for (var d = 0, g = this.children.length; d < g; ++d)
                    if (b(this.children[d])) return this.children[d];
                return null
            },
            getHtml: function() {
                var a = new CKEDITOR.htmlParser.basicWriter;
                this.writeChildrenHtml(a);
                return a.getHtml()
            },
            setHtml: function(a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (var b = 0, d = a.length; b < d; ++b) a[b].parent = this },
            getOuterHtml: function() {
                var a =
                    new CKEDITOR.htmlParser.basicWriter;
                this.writeHtml(a);
                return a.getHtml()
            },
            split: function(a) {
                for (var b = this.children.splice(a, this.children.length - a), d = this.clone(), h = 0; h < b.length; ++h) b[h].parent = d;
                d.children = b;
                b[0] && (b[0].previous = null);
                0 < a && (this.children[a - 1].next = null);
                this.parent.add(d, this.getIndex() + 1);
                return d
            },
            find: function(a, b) {
                void 0 === b && (b = !1);
                var d = [],
                    h;
                for (h = 0; h < this.children.length; h++) {
                    var k = this.children[h];
                    "function" == typeof a && a(k) ? d.push(k) : "string" == typeof a && k.name === a && d.push(k);
                    b && k.find && (d = d.concat(k.find(a, b)))
                }
                return d
            },
            addClass: function(a) {
                if (!this.hasClass(a)) {
                    var b = this.attributes["class"] || "";
                    this.attributes["class"] = b + (b ? " " : "") + a
                }
            },
            removeClass: function(a) {
                var b = this.attributes["class"];
                b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"])
            },
            hasClass: function(a) { var b = this.attributes["class"]; return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1 },
            getFilterContext: function(a) {
                var b = [];
                a || (a = { off: !1, nonEditable: !1, nestedEditable: !1 });
                a.off || "off" != this.attributes["data-cke-processor"] || b.push("off", !0);
                a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0);
                if (b.length) { a = CKEDITOR.tools.copy(a); for (var d = 0; d < b.length; d += 2) a[b[d]] = b[d + 1] }
                return a
            }
        }, !0)
    })();
    (function() {
        var a = /{([^}]+)}/g;
        CKEDITOR.template = function(a) { this.source = String(a) };
        CKEDITOR.template.prototype.output = function(d, b) { var c = this.source.replace(a, function(a, b) { return void 0 !== d[b] ? d[b] : a }); return b ? b.push(c) : c }
    })();
    delete CKEDITOR.loadFullCore;
    CKEDITOR.instances = {};
    CKEDITOR.document = new CKEDITOR.dom.document(document);
    CKEDITOR.add = function(a) {
        CKEDITOR.instances[a.name] = a;
        a.on("focus", function() { CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance")) });
        a.on("blur", function() { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) });
        CKEDITOR.fire("instance", null, a)
    };
    CKEDITOR.remove = function(a) { delete CKEDITOR.instances[a.name] };
    (function() {
        var a = {};
        CKEDITOR.addTemplate = function(d, b) {
            var c = a[d];
            if (c) return c;
            c = { name: d, source: b };
            CKEDITOR.fire("template", c);
            return a[d] = new CKEDITOR.template(c.source)
        };
        CKEDITOR.getTemplate = function(d) { return a[d] }
    })();
    (function() {
        var a = [];
        CKEDITOR.addCss = function(d) { a.push(d) };
        CKEDITOR.getCss = function() { return a.join("\n") }
    })();
    CKEDITOR.on("instanceDestroyed", function() { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") });
    CKEDITOR.TRISTATE_ON = 1;
    CKEDITOR.TRISTATE_OFF = 2;
    CKEDITOR.TRISTATE_DISABLED = 0;
    (function() {
        CKEDITOR.inline = function(a, d) {
            if (!CKEDITOR.env.isCompatible) return null;
            a = CKEDITOR.dom.element.get(a);
            if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var b = new CKEDITOR.editor(d, a, CKEDITOR.ELEMENT_MODE_INLINE),
                c = a.is("textarea") ? a : null;
            c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document),
                a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0);
            b.on("loaded", function() {
                b.fire("uiReady");
                b.editable(a);
                b.container = a;
                b.ui.contentsElement = a;
                b.setData(b.getData(1));
                b.resetDirty();
                b.fire("contentDom");
                b.mode = "wysiwyg";
                b.fire("mode");
                b.status = "ready";
                b.fireOnce("instanceReady");
                CKEDITOR.fire("instanceReady", null, b)
            }, null, null, 1E4);
            b.on("destroy", function() {
                c && (b.container.clearCustomData(), b.container.remove(), c.show());
                b.element.clearCustomData();
                delete b.element
            });
            return b
        };
        CKEDITOR.inlineAll = function() {
            var a, d, b;
            for (b in CKEDITOR.dtd.$editable)
                for (var c = CKEDITOR.document.getElementsByTag(b), e = 0, g = c.count(); e < g; e++) a = c.getItem(e), "true" == a.getAttribute("contenteditable") && (d = { element: a, config: {} }, !1 !== CKEDITOR.fire("inline", d) && CKEDITOR.inline(a, d.config))
        };
        CKEDITOR.domReady(function() {!CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
    })();
    CKEDITOR.replaceClass = "ckeditor";
    (function() {
        function a(a, e, g, h) {
            if (!CKEDITOR.env.isCompatible) return null;
            a = CKEDITOR.dom.element.get(a);
            if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var k = new CKEDITOR.editor(e, a, h);
            h == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), k._.required = a.hasAttribute("required"), a.removeAttribute("required"));
            g && k.setData(g, null, !0);
            k.on("loaded", function() {
                b(k);
                h == CKEDITOR.ELEMENT_MODE_REPLACE && k.config.autoUpdateElement &&
                    a.$.form && k._attachToForm();
                k.setMode(k.config.startupMode, function() {
                    k.resetDirty();
                    k.status = "ready";
                    k.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady", null, k)
                })
            });
            k.on("destroy", d);
            return k
        }

        function d() {
            var a = this.container,
                b = this.element;
            a && (a.clearCustomData(), a.remove());
            b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element)
        }

        function b(a) {
            var b = a.name,
                d = a.element,
                h = a.elementMode,
                k =
                a.fire("uiSpace", { space: "top", html: "" }).html,
                n = a.fire("uiSpace", { space: "bottom", html: "" }).html,
                q = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
                b = CKEDITOR.dom.element.createFromHtml(q.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: k ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + k + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: n ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + n + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" }));
            h == CKEDITOR.ELEMENT_MODE_REPLACE ?
                (d.hide(), b.insertAfter(d)) : d.append(b);
            a.container = b;
            a.ui.contentsElement = a.ui.space("contents");
            k && a.ui.space("top").unselectable();
            n && a.ui.space("bottom").unselectable();
            d = a.config.width;
            h = a.config.height;
            d && b.setStyle("width", CKEDITOR.tools.cssLength(d));
            h && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(h));
            b.disableContextMenu();
            CKEDITOR.env.webkit && b.on("focus", function() { a.focus() });
            a.fireOnce("uiReady")
        }
        CKEDITOR.replace = function(b, d) { return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
        CKEDITOR.appendTo = function(b, d, g) { return a(b, d, g, CKEDITOR.ELEMENT_MODE_APPENDTO) };
        CKEDITOR.replaceAll = function() {
            for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
                var d = null,
                    h = a[b];
                if (h.name || h.id) {
                    if ("string" == typeof arguments[0]) { if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(h.className)) continue } else if ("function" == typeof arguments[0] && (d = {}, !1 === arguments[0](h, d))) continue;
                    this.replace(h, d)
                }
            }
        };
        CKEDITOR.editor.prototype.addMode = function(a, b) {
            (this._.modes || (this._.modes = {}))[a] = b
        };
        CKEDITOR.editor.prototype.setMode = function(a, b) {
            var d = this,
                h = this._.modes;
            if (a != d.mode && h && h[a]) {
                d.fire("beforeSetMode", a);
                if (d.mode) {
                    var k = d.checkDirty(),
                        h = d._.previousModeData,
                        n, q = 0;
                    d.fire("beforeModeUnload");
                    d.editable(0);
                    d._.previousMode = d.mode;
                    d._.previousModeData = n = d.getData(1);
                    "source" == d.mode && h == n && (d.fire("lockSnapshot", { forceUpdate: !0 }), q = 1);
                    d.ui.space("contents").setHtml("");
                    d.mode = ""
                } else d._.previousModeData = d.getData(1);
                this._.modes[a](function() {
                    d.mode = a;
                    void 0 !== k && !k &&
                        d.resetDirty();
                    q ? d.fire("unlockSnapshot") : "wysiwyg" == a && d.fire("saveSnapshot");
                    setTimeout(function() {
                        d.fire("mode");
                        b && b.call(d)
                    }, 0)
                })
            }
        };
        CKEDITOR.editor.prototype.resize = function(a, b, d, h) {
            var k = this.container,
                n = this.ui.space("contents"),
                q = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
            h = h ? this.container.getFirst(function(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : k;
            h.setSize("width", a, !0);
            q && (q.style.width = "1%");
            var f = (h.$.offsetHeight || 0) - (n.$.clientHeight ||
                    0),
                k = Math.max(b - (d ? 0 : f), 0);
            b = d ? b + f : b;
            n.setStyle("height", k + "px");
            q && (q.style.width = "100%");
            this.fire("resize", { outerHeight: b, contentsHeight: k, outerWidth: a || h.getSize("width") })
        };
        CKEDITOR.editor.prototype.getResizable = function(a) { return a ? this.ui.space("contents") : this.container };
        CKEDITOR.domReady(function() { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
    })();
    CKEDITOR.config.startupMode = "wysiwyg";
    (function() {
        function a(a) {
            var b = a.editor,
                e = a.data.path,
                f = e.blockLimit,
                g = a.data.selection,
                r = g.getRanges()[0],
                z;
            if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller)
                if (g = d(g, e)) g.appendBogus(), z = CKEDITOR.env.ie;
            h(b, e.block, f) && r.collapsed && !r.getCommonAncestor().isReadOnly() && (e = r.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), f = new CKEDITOR.dom.walker(e), f.guard = function(a) { return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() }, !f.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) &&
                (b = r.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), z = 1, a.cancel());
            z && r.select()
        }

        function d(a, b) {
            if (a.isFake) return 0;
            var d = b.block || b.blockLimit,
                e = d && d.getLast(c);
            if (!(!d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is("pre") || d.getBogus())) return d
        }

        function b(a) {
            var b = a.data.getTarget();
            b.is("input") &&
                (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault())
        }

        function c(a) { return f(a) && C(a) }

        function e(a, b) {
            return function(c) {
                var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget;
                (d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c)
            }
        }

        function g(a) {
            function b(a) { return function(b, e) { e && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (d = b); if (!(e || !c(b) || a && A(b))) return !1 } }
            var d, e = a.getRanges()[0];
            a = a.root;
            var f = { table: 1, ul: 1, ol: 1, dl: 1 };
            if (e.startPath().contains(f)) {
                var r = e.clone();
                r.collapse(1);
                r.setStartAt(a, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(r);
                a.guard = b();
                a.checkBackward();
                if (d) return r = e.clone(), r.collapse(), r.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(r), a.guard = b(!0), d = !1, a.checkForward(), d
            }
            return null
        }

        function h(a, b, c) { return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable")) }

        function k(a) { return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 }

        function n(a) {
            var b = a.editor;
            b.getSelection().scrollIntoView();
            setTimeout(function() { b.fire("saveSnapshot") }, 0)
        }

        function q(a, b, c) {
            var d = a.getCommonAncestor(b);
            for (b = a = c ? b : a;
                (a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();) b = a;
            b.remove()
        }
        var f, C, w, A, E, x, m, K, y, H;
        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element,
            $: function(a, b) {
                this.base(b.$ ||
                    b);
                this.editor = a;
                this.status = "unloaded";
                this.hasFocus = !1;
                this.setup()
            },
            proto: {
                focus: function() {
                    var a;
                    if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) { a.focus(); return } CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop);
                    try {
                        if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document))
                            if (CKEDITOR.env.chrome) {
                                var b =
                                    this.$.scrollTop;
                                this.$.focus();
                                this.$.scrollTop = b
                            } else this.$.focus();
                        else this.$.setActive()
                    } catch (c) { if (!CKEDITOR.env.ie) throw c; } CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                },
                on: function(a, b) {
                    var c = Array.prototype.slice.call(arguments, 0);
                    CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = e(b, this), c[0] = a, c[1] = b);
                    return CKEDITOR.dom.element.prototype.on.apply(this, c)
                },
                attachListener: function(a) {
                    !this._.listeners &&
                        (this._.listeners = []);
                    var b = Array.prototype.slice.call(arguments, 1),
                        b = a.on.apply(a, b);
                    this._.listeners.push(b);
                    return b
                },
                clearListeners: function() { var a = this._.listeners; try { for (; a.length;) a.pop().removeListener() } catch (b) {} },
                restoreAttrs: function() {
                    var a = this._.attrChanges,
                        b, c;
                    for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c))
                },
                attachClass: function(a) {
                    var b = this.getCustomData("classes");
                    this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes",
                        b), this.addClass(a))
                },
                changeAttr: function(a, b) {
                    var c = this.getAttribute(a);
                    b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b))
                },
                insertText: function(a) {
                    this.editor.focus();
                    this.insertHtml(this.transformPlainTextToHtml(a), "text")
                },
                transformPlainTextToHtml: function(a) {
                    var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
                    return CKEDITOR.tools.transformPlainTextToHtml(a,
                        b)
                },
                insertHtml: function(a, b, c) {
                    var d = this.editor;
                    d.focus();
                    d.fire("saveSnapshot");
                    c || (c = d.getSelection().getRanges()[0]);
                    x(this, b || "html", a, c);
                    c.select();
                    n(this);
                    this.editor.fire("afterInsertHtml", {})
                },
                insertHtmlIntoRange: function(a, b, c) {
                    x(this, c || "html", a, b);
                    this.editor.fire("afterInsertHtml", { intoRange: b })
                },
                insertElement: function(a, b) {
                    var d = this.editor;
                    d.focus();
                    d.fire("saveSnapshot");
                    var e = d.activeEnterMode,
                        d = d.getSelection(),
                        f = a.getName(),
                        f = CKEDITOR.dtd.$block[f];
                    b || (b = d.getRanges()[0]);
                    this.insertElementIntoRange(a,
                        b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), f && ((f = a.getNext(function(a) { return c(a) && !A(a) })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()["#"] ? b.moveToElementEditStart(f) : b.moveToElementEditEnd(a) : f || e == CKEDITOR.ENTER_BR || (f = b.fixBlock(!0, e == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(f))));
                    d.selectRanges([b]);
                    n(this)
                },
                insertElementIntoSelection: function(a) { this.insertElement(a) },
                insertElementIntoRange: function(a, b) {
                    var c = this.editor,
                        d = c.config.enterMode,
                        e = a.getName(),
                        f = CKEDITOR.dtd.$block[e];
                    if (b.checkReadOnly()) return !1;
                    b.deleteContents(1);
                    b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) ? m(b) : b.startContainer.is(CKEDITOR.dtd.$list) && K(b));
                    var g, v;
                    if (f)
                        for (;
                            (g = b.getCommonAncestor(0, 1)) && (v = CKEDITOR.dtd[g.getName()]) && (!v || !v[e]);) g.getName() in CKEDITOR.dtd.span ? b.splitElement(g) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(g), b.collapse(!0), g.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ?
                            "div" : "p", c.editable());
                    b.insertNode(a);
                    return !0
                },
                setData: function(a, b) {
                    b || (a = this.editor.dataProcessor.toHtml(a));
                    this.setHtml(a);
                    this.fixInitialSelection();
                    "unloaded" == this.status && (this.status = "ready");
                    this.editor.fire("dataReady")
                },
                getData: function(a) {
                    var b = this.getHtml();
                    a || (b = this.editor.dataProcessor.toDataFormat(b));
                    return b
                },
                setReadOnly: function(a) { this.setAttribute("contenteditable", !a) },
                detach: function() {
                    this.removeClass("cke_editable");
                    this.status = "detached";
                    var a = this.editor;
                    this._.detach();
                    delete a.document;
                    delete a.window
                },
                isInline: function() { return this.getDocument().equals(CKEDITOR.document) },
                fixInitialSelection: function() {
                    function a() {
                        var b = c.getDocument().$,
                            d = b.getSelection(),
                            e;
                        a: if (d.anchorNode && d.anchorNode == c.$) e = !0;
                            else { if (CKEDITOR.env.webkit && (e = c.getDocument().getActive()) && e.equals(c) && !d.anchorNode) { e = !0; break a } e = void 0 }
                        e && (e = new CKEDITOR.dom.range(c), e.moveToElementEditStart(c), b = b.createRange(), b.setStart(e.startContainer.$, e.startOffset), b.collapse(!0), d.removeAllRanges(),
                            d.addRange(b))
                    }

                    function b() {
                        var a = c.getDocument().$,
                            d = a.selection,
                            e = c.getDocument().getActive();
                        "None" == d.type && e.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select())
                    }
                    var c = this;
                    if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b());
                    else if (this.hasFocus) this.focus(), a();
                    else this.once("focus",
                        function() { a() }, null, null, -999)
                },
                getHtmlFromRange: function(a) {
                    if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
                    a = { doc: this.getDocument(), range: a.clone() };
                    y.eol.detect(a, this);
                    y.bogus.exclude(a);
                    y.cell.shrink(a);
                    a.fragment = a.range.cloneContents();
                    y.tree.rebuild(a, this);
                    y.eol.fix(a, this);
                    return new CKEDITOR.dom.documentFragment(a.fragment.$)
                },
                extractHtmlFromRange: function(a, b) {
                    var c = H,
                        d = { range: a, doc: a.document },
                        e = this.getHtmlFromRange(a);
                    if (a.collapsed) return a.optimize(), e;
                    a.enlarge(CKEDITOR.ENLARGE_INLINE,
                        1);
                    c.table.detectPurge(d);
                    d.bookmark = a.createBookmark();
                    delete d.range;
                    var f = this.editor.createRange();
                    f.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);
                    d.targetBookmark = f.createBookmark();
                    c.list.detectMerge(d, this);
                    c.table.detectRanges(d, this);
                    c.block.detectMerge(d, this);
                    d.tableContentsRanges ? (c.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d)));
                    a.moveToBookmark(d.targetBookmark);
                    a.optimize();
                    c.fixUneditableRangePosition(a);
                    c.list.merge(d, this);
                    c.table.purge(d, this);
                    c.block.merge(d, this);
                    if (b) {
                        c = a.startPath();
                        if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) {
                            a: {
                                var d = c.block.getElementsByTag("span"),
                                    f = 0,
                                    g;
                                if (d)
                                    for (; g = d.getItem(f++);)
                                        if (!C(g)) { d = !0; break a }
                                d = !1
                            }
                            d = !d
                        }
                        d && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove())
                    } else c.autoParagraph(this.editor, a), w(a.startContainer) && a.startContainer.appendBogus();
                    a.startContainer.mergeSiblings();
                    return e
                },
                setup: function() {
                    var a = this.editor;
                    this.attachListener(a, "beforeGetData", function() {
                        var b = this.getData();
                        this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(E, function(a, b) { return b }));
                        a.setData(b, null, 1)
                    }, this);
                    this.attachListener(a, "getSnapshot", function(a) { a.data = this.getData(1) }, this);
                    this.attachListener(a, "afterSetData", function() { this.setData(a.getData(1)) }, this);
                    this.attachListener(a, "loadSnapshot", function(a) { this.setData(a.data, 1) }, this);
                    this.attachListener(a,
                        "beforeFocus",
                        function() {
                            var b = a.getSelection();
                            (b = b && b.getNative()) && "Control" == b.type || this.focus()
                        }, this);
                    this.attachListener(a, "insertHtml", function(a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this);
                    this.attachListener(a, "insertElement", function(a) { this.insertElement(a.data) }, this);
                    this.attachListener(a, "insertText", function(a) { this.insertText(a.data) }, this);
                    this.setReadOnly(a.readOnly);
                    this.attachClass("cke_editable");
                    a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") :
                        a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed");
                    this.attachClass("cke_contents_" + a.config.contentsLangDirection);
                    a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
                    a.keystrokeHandler.attach(this);
                    this.on("blur", function() { this.hasFocus = !1 }, null, null, -1);
                    this.on("focus", function() { this.hasFocus = !0 }, null, null, -1);
                    if (CKEDITOR.env.webkit) this.on("scroll", function() { a._.previousScrollTop = a.editable().$.scrollTop }, null,
                        null, -1);
                    if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
                        var d = function() {
                            var b = a.editable();
                            null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d))
                        };
                        this.on("scroll", d)
                    }
                    a.focusManager.add(this);
                    this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function() { a.focusManager.focus(this) }, this));
                    this.isInline() && this.changeAttr("tabindex", a.tabIndex);
                    if (!this.is("textarea")) {
                        a.document =
                            this.getDocument();
                        a.window = this.getWindow();
                        var e = a.document;
                        this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                        var h = a.config.contentsLangDirection;
                        this.getDirection(1) != h && this.changeAttr("dir", h);
                        var k = CKEDITOR.getCss();
                        if (k) {
                            var h = e.getHead(),
                                r = h.getCustomData("stylesheet");
                            r ? k != r.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? r.$.styleSheet.cssText = k : r.setText(k)) : (k = e.appendStyleText(k), k = new CKEDITOR.dom.element(k.ownerNode || k.owningElement), h.setCustomData("stylesheet",
                                k), k.data("cke-temp", 1))
                        }
                        h = e.getCustomData("stylesheet_ref") || 0;
                        e.setCustomData("stylesheet_ref", h + 1);
                        this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
                        this.attachListener(this, "click", function(a) {
                            a = a.data;
                            var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
                            b && 2 != a.$.button && b.isReadOnly() && a.preventDefault()
                        });
                        var z = { 8: 1, 46: 1 };
                        this.attachListener(a, "key", function(b) {
                            if (a.readOnly) return !0;
                            var c = b.data.domEvent.getKey(),
                                d;
                            b = a.getSelection();
                            if (0 !== b.getRanges().length) {
                                if (c in
                                    z) {
                                    var e, r = b.getRanges()[0],
                                        p = r.startPath(),
                                        h, t, k, c = 8 == c;
                                    CKEDITOR.env.ie && 11 > CKEDITOR.env.version && (e = b.getSelectedElement()) || (e = g(b)) ? (a.fire("saveSnapshot"), r.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e.remove(), r.select(), a.fire("saveSnapshot"), d = 1) : r.collapsed && ((h = p.block) && (k = h[c ? "getPrevious" : "getNext"](f)) && k.type == CKEDITOR.NODE_ELEMENT && k.is("table") && r[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), r[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && h.remove(), r["moveToElementEdit" +
                                        (c ? "End" : "Start")](k), r.select(), a.fire("saveSnapshot"), d = 1) : p.blockLimit && p.blockLimit.is("td") && (t = p.blockLimit.getAscendant("table")) && r.checkBoundaryOfElement(t, c ? CKEDITOR.START : CKEDITOR.END) && (k = t[c ? "getPrevious" : "getNext"](f)) ? (a.fire("saveSnapshot"), r["moveToElementEdit" + (c ? "End" : "Start")](k), r.checkStartOfBlock() && r.checkEndOfBlock() ? k.remove() : r.select(), a.fire("saveSnapshot"), d = 1) : (t = p.contains(["td", "th", "caption"])) && r.checkBoundaryOfElement(t, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
                                }
                                return !d
                            }
                        });
                        a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function(b) { b.data.getKeystroke() in z && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select()) });
                        this.attachListener(this, "dblclick", function(b) {
                            if (a.readOnly) return !1;
                            b = { element: b.data.getTarget() };
                            a.fire("doubleclick", b)
                        });
                        CKEDITOR.env.ie && this.attachListener(this, "click", b);
                        CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown",
                            function(b) {
                                var c = b.data.getTarget();
                                c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault())
                            });
                        CKEDITOR.env.edge && this.attachListener(this, "mouseup", function(b) {
                            (b = b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b)
                        });
                        CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) {
                            if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(E, ""))) {
                                var c = a.createRange();
                                c.moveToElementEditStart(b);
                                c.select(!0)
                            }
                        });
                        CKEDITOR.env.webkit && (this.attachListener(this, "click", function(a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function(a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() }));
                        CKEDITOR.env.webkit && this.attachListener(a, "key", function(b) {
                            if (a.readOnly) return !0;
                            var c = b.data.domEvent.getKey();
                            if (c in z && (b = a.getSelection(), 0 !== b.getRanges().length)) {
                                var c = 8 == c,
                                    d = b.getRanges()[0];
                                b = d.startPath();
                                if (d.collapsed) a: {
                                    var e = b.block;
                                    if (e && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && d.moveToClosestEditablePosition(e, !c) && d.collapsed) {
                                        if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                                            var f = d.startContainer.getChild(d.startOffset - (c ? 1 : 0));
                                            if (f && f.type == CKEDITOR.NODE_ELEMENT && f.is("hr")) {
                                                a.fire("saveSnapshot");
                                                f.remove();
                                                b = !0;
                                                break a
                                            }
                                        }
                                        d = d.startPath().block;
                                        if (!d || d && d.contains(e)) b = void 0;
                                        else {
                                            a.fire("saveSnapshot");
                                            var p;
                                            (p = (c ? d : e).getBogus()) && p.remove();
                                            p = a.getSelection();
                                            f = p.createBookmarks();
                                            (c ? e : d).moveChildren(c ? d : e, !1);
                                            b.lastElement.mergeSiblings();
                                            q(e, d, !c);
                                            p.selectBookmarks(f);
                                            b = !0
                                        }
                                    } else b = !1
                                }
                                else c = d, p = b.block, d = c.endPath().block, p && d && !p.equals(d) ? (a.fire("saveSnapshot"), (e = p.getBogus()) && e.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(p, !1), b.lastElement.mergeSiblings(), q(p, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1;
                                if (!b) return;
                                a.getSelection().scrollIntoView();
                                a.fire("saveSnapshot");
                                return !1
                            }
                        }, this, null, 100)
                    }
                }
            },
            _: {
                detach: function() {
                    this.editor.setData(this.editor.getData(), 0, 1);
                    this.clearListeners();
                    this.restoreAttrs();
                    var a;
                    if (a = this.removeCustomData("classes"))
                        for (; a.length;) this.removeClass(a.pop());
                    if (!this.is("textarea")) { a = this.getDocument(); var b = a.getHead(); if (b.getCustomData("stylesheet")) { var c = a.getCustomData("stylesheet_ref");--c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove()) } } this.editor.fire("contentDomUnload");
                    delete this.editor
                }
            }
        });
        CKEDITOR.editor.prototype.editable = function(a) {
            var b = this._.editable;
            if (b && a) return 0;
            arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null));
            return b
        };
        CKEDITOR.on("instanceLoaded", function(b) {
            var c = b.editor;
            c.on("insertElement", function(a) {
                a = a.data;
                a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ?
                    "true" : "1"), a.setAttribute("contentEditable", !1))
            });
            c.on("selectionChange", function(b) {
                if (!c.readOnly) {
                    var d = c.getSelection();
                    d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty())
                }
            })
        });
        CKEDITOR.on("instanceCreated", function(a) {
            var b = a.editor;
            b.on("mode", function() {
                var a = b.editable();
                if (a && a.isInline()) {
                    var c = b.title;
                    a.changeAttr("role", "textbox");
                    a.changeAttr("aria-label", c);
                    c && a.changeAttr("title", c);
                    var d = b.fire("ariaEditorHelpLabel", {}).label;
                    if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
                        var e = CKEDITOR.tools.getNextId(),
                            d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + e + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e");
                        c.append(d);
                        a.changeAttr("aria-describedby", e)
                    }
                }
            })
        });
        CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        f = CKEDITOR.dom.walker.whitespaces(!0);
        C = CKEDITOR.dom.walker.bookmark(!1, !0);
        w = CKEDITOR.dom.walker.empty();
        A = CKEDITOR.dom.walker.bogus();
        E = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;
        x = function() {
            function a(b) { return b.type == CKEDITOR.NODE_ELEMENT }

            function b(c, d) {
                var e, f, r, g, h = [],
                    z = d.range.startContainer;
                e = d.range.startPath();
                for (var z = v[z.getName()], k = 0, B = c.getChildren(), n = B.count(), L = -1, q = -1, D = 0, m = e.contains(v.$list); k < n; ++k) e = B.getItem(k), a(e) ? (r = e.getName(), m && r in CKEDITOR.dtd.$list ? h = h.concat(b(e, d)) : (g = !!z[r],
                    "br" != r || !e.data("cke-eol") || k && k != n - 1 || (D = (f = k ? h[k - 1].node : B.getItem(k + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && v.$block[f.getName()]), -1 != L || g || (L = k), g || (q = k), h.push({ isElement: 1, isLineBreak: D, isBlock: e.isBlockBoundary(), hasBlockSibling: f, node: e, name: r, allowed: g }), f = D = 0)) : h.push({ isElement: 0, node: e, allowed: 1 }); - 1 < L && (h[L].firstNotAllowed = 1); - 1 < q && (h[q].lastNotAllowed = 1);
                return h
            }

            function d(b, c) {
                var e = [],
                    f = b.getChildren(),
                    r = f.count(),
                    g, h = 0,
                    z = v[c],
                    k = !b.is(v.$inline) || b.is("br");
                for (k && e.push(" "); h < r; h++) g =
                    f.getItem(h), a(g) && !g.is(z) ? e = e.concat(d(g, c)) : e.push(g);
                k && e.push(" ");
                return e
            }

            function e(b) { return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) }

            function f(b) { return b && a(b) && (b.is(v.$removeEmpty) || b.is("a") && !b.isBlockBoundary()) }

            function r(b, c, d, e) {
                var f = b.clone(),
                    g, v;
                f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                (g = (new CKEDITOR.dom.walker(f)).next()) && a(g) && B[g.getName()] && (v = g.getPrevious()) && a(v) && !v.getParent().equals(b.startContainer) && d.contains(v) && e.contains(g) && g.isIdentical(v) &&
                    (g.moveChildren(v), g.remove(), r(b, c, d, e))
            }

            function g(b, c) {
                function d(b, c) { if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1 }
                var e = c.endContainer.getChild(c.endOffset),
                    f = c.endContainer.getChild(c.endOffset - 1);
                e && d(e, b[b.length - 1]);
                f && d(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse())
            }
            var v = CKEDITOR.dtd,
                B = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 },
                L = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
                n = CKEDITOR.tools.extend({},
                    v.$inline);
            delete n.br;
            return function(B, p, F, t) {
                var G = B.editor,
                    N = !1;
                "unfiltered_html" == p && (p = "html", N = !0);
                if (!t.checkReadOnly()) {
                    var q = (new CKEDITOR.dom.elementPath(t.startContainer, t.root)).blockLimit || t.root;
                    B = { type: p, dontFilter: N, editable: B, editor: G, range: t, blockLimit: q, mergeCandidates: [], zombies: [] };
                    p = B.range;
                    t = B.mergeCandidates;
                    var m, w;
                    "text" == B.type && p.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (m = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", p.document), p.insertNode(m),
                        p.setStartAfter(m));
                    N = new CKEDITOR.dom.elementPath(p.startContainer);
                    B.endPath = q = new CKEDITOR.dom.elementPath(p.endContainer);
                    if (!p.collapsed) {
                        var G = q.block || q.blockLimit,
                            x = p.getCommonAncestor();
                        G && !G.equals(x) && !G.contains(x) && p.checkEndOfBlock() && B.zombies.push(G);
                        p.deleteContents()
                    }
                    for (;
                        (w = e(p)) && a(w) && w.isBlockBoundary() && N.contains(w);) p.moveToPosition(w, CKEDITOR.POSITION_BEFORE_END);
                    r(p, B.blockLimit, N, q);
                    m && (p.setEndBefore(m), p.collapse(), m.remove());
                    m = p.startPath();
                    if (G = m.contains(f, !1, 1)) p.splitElement(G),
                        B.inlineStylesRoot = G, B.inlineStylesPeak = m.lastElement;
                    m = p.createBookmark();
                    (G = m.startNode.getPrevious(c)) && a(G) && f(G) && t.push(G);
                    (G = m.startNode.getNext(c)) && a(G) && f(G) && t.push(G);
                    for (G = m.startNode;
                        (G = G.getParent()) && f(G);) t.push(G);
                    p.moveToBookmark(m);
                    if (m = F) {
                        m = B.range;
                        if ("text" == B.type && B.inlineStylesRoot) {
                            w = B.inlineStylesPeak;
                            p = w.getDocument().createText("{cke-peak}");
                            for (t = B.inlineStylesRoot.getParent(); !w.equals(t);) p = p.appendTo(w.clone()), w = w.getParent();
                            F = p.getOuterHtml().split("{cke-peak}").join(F)
                        }
                        w =
                            B.blockLimit.getName();
                        if (/^\s+|\s+$/.test(F) && "span" in CKEDITOR.dtd[w]) {
                            var C = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';
                            F = C + F + C
                        }
                        F = B.editor.dataProcessor.toHtml(F, { context: null, fixForBody: !1, protectedWhitespaces: !!C, dontFilter: B.dontFilter, filter: B.editor.activeFilter, enterMode: B.editor.activeEnterMode });
                        w = m.document.createElement("body");
                        w.setHtml(F);
                        C && (w.getFirst().remove(), w.getLast().remove());
                        if ((C = m.startPath().block) && (1 != C.getChildCount() || !C.getBogus())) a: {
                            var A;
                            if (1 ==
                                w.getChildCount() && a(A = w.getFirst()) && A.is(L) && !A.hasAttribute("contenteditable")) {
                                C = A.getElementsByTag("*");
                                m = 0;
                                for (t = C.count(); m < t; m++)
                                    if (p = C.getItem(m), !p.is(n)) break a;
                                A.moveChildren(A.getParent(1));
                                A.remove()
                            }
                        }
                        B.dataWrapper = w;
                        m = F
                    }
                    if (m) {
                        A = B.range;
                        m = A.document;
                        var M;
                        w = B.blockLimit;
                        t = 0;
                        var y, C = [],
                            E, S;
                        F = G = 0;
                        var H, K;
                        p = A.startContainer;
                        var N = B.endPath.elements[0],
                            W, q = N.getPosition(p),
                            x = !!N.getCommonAncestor(p) && q != CKEDITOR.POSITION_IDENTICAL && !(q & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                        p = b(B.dataWrapper, B);
                        for (g(p, A); t < p.length; t++) {
                            q = p[t];
                            if (M = q.isLineBreak) {
                                M = A;
                                H = w;
                                var R = void 0,
                                    Y = void 0;
                                q.hasBlockSibling ? M = 1 : (R = M.startContainer.getAscendant(v.$block, 1)) && R.is({ div: 1, p: 1 }) ? (Y = R.getPosition(H), Y == CKEDITOR.POSITION_IDENTICAL || Y == CKEDITOR.POSITION_CONTAINS ? M = 0 : (H = M.splitElement(R), M.moveToPosition(H, CKEDITOR.POSITION_AFTER_START), M = 1)) : M = 0
                            }
                            if (M) F = 0 < t;
                            else {
                                M = A.startPath();
                                !q.isBlock && h(B.editor, M.block, M.blockLimit) && (S = k(B.editor)) && (S = m.createElement(S), S.appendBogus(), A.insertNode(S),
                                    CKEDITOR.env.needsBrFiller && (y = S.getBogus()) && y.remove(), A.moveToPosition(S, CKEDITOR.POSITION_BEFORE_END));
                                if ((M = A.startPath().block) && !M.equals(E)) {
                                    if (y = M.getBogus()) y.remove(), C.push(M);
                                    E = M
                                }
                                q.firstNotAllowed && (G = 1);
                                if (G && q.isElement) {
                                    M = A.startContainer;
                                    for (H = null; M && !v[M.getName()][q.name];) {
                                        if (M.equals(w)) { M = null; break } H = M;
                                        M = M.getParent()
                                    }
                                    if (M) H && (K = A.splitElement(H), B.zombies.push(K), B.zombies.push(H));
                                    else {
                                        H = w.getName();
                                        W = !t;
                                        M = t == p.length - 1;
                                        H = d(q.node, H);
                                        for (var R = [], Y = H.length, aa = 0, ca = void 0,
                                                da = 0, T = -1; aa < Y; aa++) ca = H[aa], " " == ca ? (da || W && !aa || (R.push(new CKEDITOR.dom.text(" ")), T = R.length), da = 1) : (R.push(ca), da = 0);
                                        M && T == R.length && R.pop();
                                        W = R
                                    }
                                }
                                if (W) {
                                    for (; M = W.pop();) A.insertNode(M);
                                    W = 0
                                } else A.insertNode(q.node);
                                q.lastNotAllowed && t < p.length - 1 && ((K = x ? N : K) && A.setEndAt(K, CKEDITOR.POSITION_AFTER_START), G = 0);
                                A.collapse()
                            }
                        }
                        1 != p.length ? y = !1 : (y = p[0], y = y.isElement && "false" == y.node.getAttribute("contenteditable"));
                        y && (F = !0, M = p[0].node, A.setStartAt(M, CKEDITOR.POSITION_BEFORE_START), A.setEndAt(M, CKEDITOR.POSITION_AFTER_END));
                        B.dontMoveCaret = F;
                        B.bogusNeededBlocks = C
                    }
                    y = B.range;
                    var Q;
                    K = B.bogusNeededBlocks;
                    for (W = y.createBookmark(); E = B.zombies.pop();) E.getParent() && (S = y.clone(), S.moveToElementEditStart(E), S.removeEmptyBlocksAtEnd());
                    if (K)
                        for (; E = K.pop();) CKEDITOR.env.needsBrFiller ? E.appendBogus() : E.append(y.document.createText(" "));
                    for (; E = B.mergeCandidates.pop();) E.mergeSiblings();
                    y.moveToBookmark(W);
                    if (!B.dontMoveCaret) {
                        for (E = e(y); E && a(E) && !E.is(v.$empty);) {
                            if (E.isBlockBoundary()) y.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END);
                            else {
                                if (f(E) && E.getHtml().match(/(\s|&nbsp;)$/g)) { Q = null; break } Q = y.clone();
                                Q.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END)
                            }
                            E = E.getLast(c)
                        }
                        Q && y.moveToRange(Q)
                    }
                }
            }
        }();
        m = function() {
            function a(b) {
                b = new CKEDITOR.dom.walker(b);
                b.guard = function(a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) };
                b.evaluator = function(a) { return a.type == CKEDITOR.NODE_ELEMENT };
                return b
            }

            function b(a, c, d) {
                c = a.getDocument().createElement(c);
                a.append(c, d);
                return c
            }

            function c(a) {
                var b = a.count(),
                    d;
                for (b; 0 < b--;) d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove())
            }
            return function(d) {
                var e = d.startContainer,
                    f = e.getAscendant("table", 1),
                    g = !1;
                c(f.getElementsByTag("td"));
                c(f.getElementsByTag("th"));
                f = d.clone();
                f.setStart(e, 0);
                f = a(f).lastBackward();
                f || (f = d.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), g = !0);
                f || (f = e);
                f.is("table") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START),
                    d.collapse(!0), f.remove()) : (f.is({ tbody: 1, thead: 1, tfoot: 1 }) && (f = b(f, "tr", g)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", g)), (e = f.getBogus()) && e.remove(), d.moveToPosition(f, g ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
            }
        }();
        K = function() {
            function a(b) {
                b = new CKEDITOR.dom.walker(b);
                b.guard = function(a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) };
                b.evaluator = function(a) {
                    return a.type == CKEDITOR.NODE_ELEMENT &&
                        a.is(CKEDITOR.dtd.$listItem)
                };
                return b
            }
            return function(b) {
                var c = b.startContainer,
                    d = !1,
                    e;
                e = b.clone();
                e.setStart(c, 0);
                e = a(e).lastBackward();
                e || (e = b.clone(), e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), e = a(e).lastForward(), d = !0);
                e || (e = c);
                e.is(CKEDITOR.dtd.$list) ? (b.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), e.remove()) : ((c = e.getBogus()) && c.remove(), b.moveToPosition(e, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select())
            }
        }();
        y = {
            eol: {
                detect: function(a, b) {
                    var c = a.range,
                        d = c.clone(),
                        e = c.clone(),
                        f = new CKEDITOR.dom.elementPath(c.startContainer, b),
                        g = new CKEDITOR.dom.elementPath(c.endContainer, b);
                    d.collapse(1);
                    e.collapse();
                    f.block && d.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1);
                    g.block && e.checkBoundaryOfElement(g.block, CKEDITOR.START) && (c.setEndBefore(g.block), a.appendEolBr = 1)
                },
                fix: function(a, b) {
                    var c = b.getDocument(),
                        d;
                    a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d));
                    !a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c),
                        1)
                },
                createEolBr: function(a) { return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
            },
            bogus: {
                exclude: function(a) {
                    var b = a.range.getBoundaryNodes(),
                        c = b.startNode,
                        b = b.endNode;
                    !b || !A(b) || c && c.equals(b) || a.range.setEndBefore(b)
                }
            },
            tree: {
                rebuild: function(a, b) {
                    var c = a.range,
                        d = c.getCommonAncestor(),
                        e = new CKEDITOR.dom.elementPath(d, b),
                        f = new CKEDITOR.dom.elementPath(c.startContainer, b),
                        c = new CKEDITOR.dom.elementPath(c.endContainer, b),
                        g;
                    d.type == CKEDITOR.NODE_TEXT && (d = d.getParent());
                    if (e.blockLimit.is({
                            tr: 1,
                            table: 1
                        })) {
                        var v = e.contains("table").getParent();
                        g = function(a) { return !a.equals(v) }
                    } else if (e.block && e.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) {
                        var h = e.contains(CKEDITOR.dtd.$list).getParent();
                        g = function(a) { return !a.equals(h) }
                    }
                    g || (g = function(a) { return !a.equals(e.block) && !a.equals(e.blockLimit) });
                    this.rebuildFragment(a, b, d, g)
                },
                rebuildFragment: function(a, b, c, d) {
                    for (var e; c && !c.equals(b) && d(c);) e = c.clone(0, 1), a.fragment.appendTo(e),
                        a.fragment = e, c = c.getParent()
                }
            },
            cell: {
                shrink: function(a) {
                    a = a.range;
                    var b = a.startContainer,
                        c = a.endContainer,
                        d = a.startOffset,
                        e = a.endOffset;
                    b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == e && a.shrink(CKEDITOR.SHRINK_TEXT)
                }
            }
        };
        H = function() {
            function a(b, c) { var d = b.getParent(); if (d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d) }

            function b(c, d, e) {
                a(d);
                a(e, 1);
                for (var f; f = e.getNext();) f.insertAfter(d), d = f;
                w(c) && c.remove()
            }

            function c(a, b) {
                var d = new CKEDITOR.dom.range(a);
                d.setStartAfter(b.startNode);
                d.setEndBefore(b.endNode);
                return d
            }
            return {
                list: {
                    detectMerge: function(a, b) {
                        var d = c(b, a.bookmark),
                            e = d.startPath(),
                            f = d.endPath(),
                            g = e.contains(CKEDITOR.dtd.$list),
                            h = f.contains(CKEDITOR.dtd.$list);
                        a.mergeList = g && h && g.getParent().equals(h.getParent()) && !g.equals(h);
                        a.mergeListItems = e.block && f.block && e.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem);
                        if (a.mergeList || a.mergeListItems) d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark =
                            d.createBookmark()
                    },
                    merge: function(a, c) {
                        if (a.mergeListBookmark) {
                            var d = a.mergeListBookmark.startNode,
                                e = a.mergeListBookmark.endNode,
                                f = new CKEDITOR.dom.elementPath(d, c),
                                g = new CKEDITOR.dom.elementPath(e, c);
                            if (a.mergeList) {
                                var h = f.contains(CKEDITOR.dtd.$list),
                                    k = g.contains(CKEDITOR.dtd.$list);
                                h.equals(k) || (k.moveChildren(h), k.remove())
                            }
                            a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem), g = g.contains(CKEDITOR.dtd.$listItem), f.equals(g) || b(g, d, e));
                            d.remove();
                            e.remove()
                        }
                    }
                },
                block: {
                    detectMerge: function(a,
                        b) {
                        if (!a.tableContentsRanges && !a.mergeListBookmark) {
                            var c = new CKEDITOR.dom.range(b);
                            c.setStartBefore(a.bookmark.startNode);
                            c.setEndAfter(a.bookmark.endNode);
                            a.mergeBlockBookmark = c.createBookmark()
                        }
                    },
                    merge: function(a, c) {
                        if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                            var d = a.mergeBlockBookmark.startNode,
                                e = a.mergeBlockBookmark.endNode,
                                f = new CKEDITOR.dom.elementPath(d, c),
                                g = new CKEDITOR.dom.elementPath(e, c),
                                f = f.block,
                                g = g.block;
                            f && g && !f.equals(g) && b(g, d, e);
                            d.remove();
                            e.remove()
                        }
                    }
                },
                table: function() {
                    function a(c) {
                        var e = [],
                            f, g = new CKEDITOR.dom.walker(c),
                            h = c.startPath().contains(d),
                            k = c.endPath().contains(d),
                            p = {};
                        g.guard = function(a, g) {
                            if (a.type == CKEDITOR.NODE_ELEMENT) {
                                var l = "visited_" + (g ? "out" : "in");
                                if (a.getCustomData(l)) return;
                                CKEDITOR.dom.element.setMarker(p, a, l, 1)
                            }
                            if (g && h && a.equals(h)) f = c.clone(), f.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), e.push(f);
                            else if (!g && k && a.equals(k)) f = c.clone(), f.setStartAt(k, CKEDITOR.POSITION_AFTER_START), e.push(f);
                            else {
                                if (l = !g) l = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!h || b(a, h)) && (!k ||
                                    b(a, k));
                                l && (f = c.clone(), f.selectNodeContents(a), e.push(f))
                            }
                        };
                        g.lastForward();
                        CKEDITOR.dom.element.clearAllMarkers(p);
                        return e
                    }

                    function b(a, c) {
                        var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED,
                            e = a.getPosition(c);
                        return e === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (e & d)
                    }
                    var d = { td: 1, th: 1, caption: 1 };
                    return {
                        detectPurge: function(a) {
                            var b = a.range,
                                c = b.clone();
                            c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                            var c = new CKEDITOR.dom.walker(c),
                                e = 0;
                            c.evaluator = function(a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++e };
                            c.checkForward();
                            if (1 < e) {
                                var c = b.startPath().contains("table"),
                                    f = b.endPath().contains("table");
                                c && f && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(f), a.purgeTableBookmark = b.createBookmark())
                            }
                        },
                        detectRanges: function(e, f) {
                            var g = c(f, e.bookmark),
                                h = g.clone(),
                                k, l, p = g.getCommonAncestor();
                            p.is(CKEDITOR.dtd.$tableContent) && !p.is(d) && (p = p.getAscendant("table", !0));
                            l = p;
                            p = new CKEDITOR.dom.elementPath(g.startContainer,
                                l);
                            l = new CKEDITOR.dom.elementPath(g.endContainer, l);
                            p = p.contains("table");
                            l = l.contains("table");
                            if (p || l) p && l && b(p, l) ? (e.tableSurroundingRange = h, h.setStartAt(p, CKEDITOR.POSITION_AFTER_END), h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), h = g.clone(), h.setEndAt(p, CKEDITOR.POSITION_AFTER_END), k = g.clone(), k.setStartAt(l, CKEDITOR.POSITION_BEFORE_START), k = a(h).concat(a(k))) : p ? l || (e.tableSurroundingRange = h, h.setStartAt(p, CKEDITOR.POSITION_AFTER_END), g.setEndAt(p, CKEDITOR.POSITION_AFTER_END)) : (e.tableSurroundingRange =
                                h, h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), g.setStartAt(l, CKEDITOR.POSITION_AFTER_START)), e.tableContentsRanges = k ? k : a(g)
                        },
                        deleteRanges: function(a) {
                            for (var b; b = a.tableContentsRanges.pop();) b.extractContents(), w(b.startContainer) && b.startContainer.appendBogus();
                            a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
                        },
                        purge: function(a) {
                            if (a.purgeTableBookmark) {
                                var b = a.doc,
                                    c = a.range.clone(),
                                    b = b.createElement("p");
                                b.insertBefore(a.purgeTableBookmark.startNode);
                                c.moveToBookmark(a.purgeTableBookmark);
                                c.deleteContents();
                                a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
                            }
                        }
                    }
                }(),
                detectExtractMerge: function(a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) },
                fixUneditableRangePosition: function(a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0) },
                autoParagraph: function(a, b) {
                    var c = b.startPath(),
                        d;
                    h(a, c.block, c.blockLimit) && (d = k(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d,
                        CKEDITOR.POSITION_AFTER_START))
                }
            }
        }()
    })();
    (function() {
        function a(a, b) {
            if (0 === a.length) return !1;
            var c, d;
            if ((c = !b && 1 === a.length) && !(c = a[0].collapsed)) {
                var e = a[0];
                c = e.startContainer.getAscendant({ td: 1, th: 1 }, !0);
                var f = e.endContainer.getAscendant({ td: 1, th: 1 }, !0);
                d = CKEDITOR.tools.trim;
                c && c.equals(f) && !c.findOne("td, th, tr, tbody, table") ? (e = e.cloneContents(), c = e.getFirst() ? d(e.getFirst().getText()) !== d(c.getText()) : !0) : c = !1
            }
            if (c) return !1;
            for (d = 0; d < a.length; d++)
                if (c = a[d]._getTableElement(), !c) return !1;
            return !0
        }

        function d(a) {
            function b(a) {
                a = a.find("td, th");
                var c = [],
                    d;
                for (d = 0; d < a.count(); d++) c.push(a.getItem(d));
                return c
            }
            var c = [],
                d, e;
            for (e = 0; e < a.length; e++) d = a[e]._getTableElement(), d.is && d.is({ td: 1, th: 1 }) ? c.push(d) : c = c.concat(b(d));
            return c
        }

        function b(a) {
            a = d(a);
            var b = "",
                c = [],
                e, f;
            for (f = 0; f < a.length; f++) e && !e.equals(a[f].getAscendant("tr")) ? (b += c.join("\t") + "\n", e = a[f].getAscendant("tr"), c = []) : 0 === f && (e = a[f].getAscendant("tr")), c.push(a[f].getText());
            return b += c.join("\t")
        }

        function c(a) {
            var c = this.root.editor,
                d = c.getSelection(1);
            this.reset();
            H = !0;
            d.root.once("selectionchange",
                function(a) { a.cancel() }, null, null, 0);
            d.selectRanges([a[0]]);
            d = this._.cache;
            d.ranges = new CKEDITOR.dom.rangeList(a);
            d.type = CKEDITOR.SELECTION_TEXT;
            d.selectedElement = a[0]._getTableElement();
            d.selectedText = b(a);
            d.nativeSel = null;
            this.isFake = 1;
            this.rev = m++;
            c._.fakeSelection = this;
            H = !1;
            this.root.fire("selectionchange")
        }

        function e() {
            var b = this._.fakeSelection,
                c;
            if (b) {
                c = this.getSelection(1);
                var d;
                if (!(d = !c) && (d = !c.isHidden())) {
                    d = b;
                    var e = c.getRanges(),
                        f = d.getRanges(),
                        g = e.length && e[0]._getTableElement() && e[0]._getTableElement().getAscendant("table", !0),
                        h = f.length && f[0]._getTableElement() && f[0]._getTableElement().getAscendant("table", !0),
                        p = 1 === e.length && e[0]._getTableElement() && e[0]._getTableElement().is("table"),
                        k = 1 === f.length && f[0]._getTableElement() && f[0]._getTableElement().is("table"),
                        t = 1 === e.length && e[0].collapsed,
                        f = a(e, !!CKEDITOR.env.webkit) && a(f);
                    g = g && h ? g.equals(h) || h.contains(g) : !1;
                    g && (t || f) ? (p && !k && d.selectRanges(e), d = !0) : d = !1;
                    d = !d
                }
                d && (b.reset(), b = 0)
            }
            if (!b && (b = c || this.getSelection(1), !b || b.getType() == CKEDITOR.SELECTION_NONE)) return;
            this.fire("selectionCheck", b);
            c = this.elementPath();
            c.compare(this._.selectionPreviousPath) || (d = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), CKEDITOR.env.webkit && !d && (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange", { selection: b, path: c }))
        }

        function g() {
            u = !0;
            l || (h.call(this), l = CKEDITOR.tools.setTimeout(h, 200, this))
        }

        function h() {
            l = null;
            u && (CKEDITOR.tools.setTimeout(e, 0, this), u = !1)
        }

        function k(a) {
            return I(a) ||
                a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1
        }

        function n(a) {
            function b(c, d) { return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1 }
            if (!(a.root instanceof CKEDITOR.editable)) return !1;
            var c = a.startContainer,
                d = a.getPreviousNode(k, null, c),
                e = a.getNextNode(k, null, c);
            return b(d) || b(e, 1) || !(d || e || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1
        }

        function q(a) {
            f(a, !1);
            var b = a.getDocument().createText(K);
            a.setCustomData("cke-fillingChar",
                b);
            return b
        }

        function f(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar");
            if (c) {
                if (!1 !== b) {
                    var d = a.getDocument().getSelection().getNative(),
                        e = d && "None" != d.type && d.getRangeAt(0),
                        f = K.length;
                    if (c.getLength() > f && e && e.intersectsNode(c.$)) {
                        var g = [{ node: d.anchorNode, offset: d.anchorOffset }, { node: d.focusNode, offset: d.focusOffset }];
                        d.anchorNode == c.$ && d.anchorOffset > f && (g[0].offset -= f);
                        d.focusNode == c.$ && d.focusOffset > f && (g[1].offset -= f)
                    }
                }
                c.setText(C(c.getText(), 1));
                g && (c = a.getDocument().$, d = c.getSelection(),
                    c = c.createRange(), c.setStart(g[0].node, g[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(g[1].node, g[1].offset))
            }
        }

        function C(a, b) { return b ? a.replace(y, function(a, b) { return b ? " " : "" }) : a.replace(K, "") }

        function w(a, b) {
            var c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px") + '"\x3e' + (b || "\x26nbsp;") + "\x3c/div\x3e", a.document);
            a.fire("lockSnapshot");
            a.editable().append(c);
            var d = a.getSelection(1),
                e = a.createRange(),
                f = d.root.on("selectionchange", function(a) { a.cancel() }, null, null, 0);
            e.setStartAt(c, CKEDITOR.POSITION_AFTER_START);
            e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
            d.selectRanges([e]);
            f.removeListener();
            a.fire("unlockSnapshot");
            a._.hiddenSelectionContainer = c
        }

        function A(a) {
            var b = { 37: 1, 39: 1, 8: 1, 46: 1 };
            return function(c) {
                var d = c.data.getKeystroke();
                if (b[d]) {
                    var e = a.getSelection().getRanges(),
                        f = e[0];
                    1 == e.length && f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" :
                        "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel())
                }
            }
        }

        function E(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                c.getCommonAncestor().isReadOnly() && a.splice(b, 1);
                if (!c.collapsed) {
                    if (c.startContainer.isReadOnly())
                        for (var d = c.startContainer, e; d && !((e = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());) e && "false" == d.getAttribute("contentEditable") && c.setStartAfter(d), d = d.getParent();
                    d = c.startContainer;
                    e = c.endContainer;
                    var f = c.startOffset,
                        g = c.endOffset,
                        p = c.clone();
                    d && d.type == CKEDITOR.NODE_TEXT && (f >= d.getLength() ? p.setStartAfter(d) : p.setStartBefore(d));
                    e && e.type == CKEDITOR.NODE_TEXT && (g ? p.setEndAfter(e) : p.setEndBefore(e));
                    d = new CKEDITOR.dom.walker(p);
                    d.evaluator = function(d) {
                        if (d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) {
                            var e = c.clone();
                            c.setEndBefore(d);
                            c.collapsed && a.splice(b--, 1);
                            d.getPosition(p.endContainer) & CKEDITOR.POSITION_CONTAINS || (e.setStartAfter(d), e.collapsed || a.splice(b +
                                1, 0, e));
                            return !0
                        }
                        return !1
                    };
                    d.next()
                }
            }
            return a
        }
        var x = "function" != typeof window.getSelection,
            m = 1,
            K = CKEDITOR.tools.repeat("​", 7),
            y = new RegExp(K + "( )?", "g"),
            H, l, u, I = CKEDITOR.dom.walker.invisible(1),
            J = function() {
                function a(b) {
                    return function(a) {
                        var c = a.editor.createRange();
                        c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                        return !1
                    }
                }

                function b(a) {
                    return function(b) {
                        var c = b.editor,
                            d = c.createRange(),
                            e;
                        (e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a));
                        e && c.getSelection().selectRanges([d]);
                        c.fire("saveSnapshot");
                        b.selected.remove();
                        e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d]));
                        c.fire("saveSnapshot");
                        return !1
                    }
                }
                var c = a(),
                    d = a(1);
                return { 37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1) }
            }();
        CKEDITOR.on("instanceCreated", function(a) {
            function b() {
                var a = c.getSelection();
                a && a.removeAllRanges()
            }
            var c = a.editor;
            c.on("contentDom", function() {
                function a() {
                    q = new CKEDITOR.dom.selection(c.getSelection());
                    q.lock()
                }

                function b() {
                    p.removeListener("mouseup",
                        b);
                    l.removeListener("mouseup", b);
                    var a = CKEDITOR.document.$.selection,
                        c = a.createRange();
                    "None" != a.type && c.parentElement().ownerDocument == h.$ && c.select()
                }

                function d(a) { if (CKEDITOR.env.ie) { var b = (a = a.getRanges()[0]) ? a.startContainer.getAscendant(function(a) { return a.type == CKEDITOR.NODE_ELEMENT && ("false" == a.getAttribute("contenteditable") || "true" == a.getAttribute("contenteditable")) }, !0) : null; return a && "false" == b.getAttribute("contenteditable") && b } }
                var h = c.document,
                    p = CKEDITOR.document,
                    k = c.editable(),
                    t =
                    h.getBody(),
                    l = h.getDocumentElement(),
                    r = k.isInline(),
                    z, q;
                CKEDITOR.env.gecko && k.attachListener(k, "focus", function(a) {
                    a.removeListener();
                    0 !== z && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == k.$ && (a = c.createRange(), a.moveToElementEditStart(k), a.select())
                }, null, null, -2);
                k.attachListener(k, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                    z && CKEDITOR.env.webkit && (z = c._.previousActive && c._.previousActive.equals(h.getActive())) && null != c._.previousScrollTop && c._.previousScrollTop != k.$.scrollTop &&
                        (k.$.scrollTop = c._.previousScrollTop);
                    c.unlockSelection(z);
                    z = 0
                }, null, null, -1);
                k.attachListener(k, "mousedown", function() { z = 0 });
                if (CKEDITOR.env.ie || r) x ? k.attachListener(k, "beforedeactivate", a, null, null, -1) : k.attachListener(c, "selectionCheck", a, null, null, -1), k.attachListener(k, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() {
                    c.lockSelection(q);
                    z = 1
                }, null, null, -1), k.attachListener(k, "mousedown", function() { z = 0 });
                if (CKEDITOR.env.ie && !r) {
                    var n;
                    k.attachListener(k, "mousedown", function(a) {
                        2 == a.data.$.button &&
                            ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (n = c.window.getScrollPosition()))
                    });
                    k.attachListener(k, "mouseup", function(a) {
                        2 == a.data.$.button && n && (c.document.$.documentElement.scrollLeft = n.x, c.document.$.documentElement.scrollTop = n.y);
                        n = null
                    });
                    if ("BackCompat" != h.$.compatMode) {
                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                            var m, w;
                            l.on("mousedown", function(a) {
                                function b(a) {
                                    a = a.data.$;
                                    if (m) {
                                        var c = t.$.createTextRange();
                                        try { c.moveToPoint(a.clientX, a.clientY) } catch (d) {} m.setEndPoint(0 >
                                            w.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c);
                                        m.select()
                                    }
                                }

                                function c() {
                                    l.removeListener("mousemove", b);
                                    p.removeListener("mouseup", c);
                                    l.removeListener("mouseup", c);
                                    m.select()
                                }
                                a = a.data;
                                if (a.getTarget().is("html") && a.$.y < l.$.clientHeight && a.$.x < l.$.clientWidth) {
                                    m = t.$.createTextRange();
                                    try { m.moveToPoint(a.$.clientX, a.$.clientY) } catch (d) {} w = m.duplicate();
                                    l.on("mousemove", b);
                                    p.on("mouseup", c);
                                    l.on("mouseup", c)
                                }
                            })
                        }
                        if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) l.on("mousedown", function(a) {
                            a.data.getTarget().is("html") &&
                                (p.on("mouseup", b), l.on("mouseup", b))
                        })
                    }
                }
                k.attachListener(k, "selectionchange", e, c);
                k.attachListener(k, "keyup", g, c);
                k.attachListener(k, "keydown", function(a) {
                    var b = this.getSelection(1);
                    d(b) && (b.selectElement(d(b)), a.data.preventDefault())
                }, c);
                k.attachListener(k, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                    c.forceNextSelectionCheck();
                    c.selectionChange(1)
                });
                if (r && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                    var u;
                    k.attachListener(k, "mousedown", function() { u = 1 });
                    k.attachListener(h.getDocumentElement(),
                        "mouseup",
                        function() {
                            u && g.call(c);
                            u = 0
                        })
                } else k.attachListener(CKEDITOR.env.ie ? k : h.getDocumentElement(), "mouseup", g, c);
                CKEDITOR.env.webkit && k.attachListener(h, "keydown", function(a) {
                    switch (a.data.getKey()) {
                        case 13:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                        case 39:
                        case 8:
                        case 45:
                        case 46:
                            k.hasFocus && f(k)
                    }
                }, null, null, -1);
                k.attachListener(k, "keydown", A(c), null, null, -1)
            });
            c.on("setData", function() {
                c.unlockSelection();
                CKEDITOR.env.webkit && b()
            });
            c.on("contentDomUnload", function() { c.unlockSelection() });
            if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy",
                b, null, null, 9);
            c.on("dataReady", function() {
                delete c._.fakeSelection;
                delete c._.hiddenSelectionContainer;
                c.selectionChange(1)
            });
            c.on("loadSnapshot", function() {
                var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
                    b = c.editable().getLast(a);
                b && b.hasAttribute("data-cke-hidden-sel") && (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
            }, null, null, 100);
            c.on("key", function(a) {
                if ("wysiwyg" == c.mode) {
                    var b = c.getSelection();
                    if (b.isFake) {
                        var d =
                            J[a.data.keyCode];
                        if (d) return d({ editor: c, selected: b.getSelectedElement(), selection: b, keyEvent: a })
                    }
                }
            })
        });
        if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function(a) {
            var b = a.editor;
            b.on("selectionChange", function() {
                var a = b.editable(),
                    c = a.getCustomData("cke-fillingChar");
                c && (c.getCustomData("ready") ? (f(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1))
            }, null, null, -1);
            b.on("beforeSetMode", function() { f(b.editable()) }, null, null, -1);
            b.on("getSnapshot", function(a) { a.data && (a.data = C(a.data)) },
                b, null, 20);
            b.on("toDataFormat", function(a) { a.data.dataValue = C(a.data.dataValue) }, null, null, 0)
        });
        CKEDITOR.editor.prototype.selectionChange = function(a) {
            (a ? e : g).call(this)
        };
        CKEDITOR.editor.prototype.getSelection = function(a) { return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection };
        CKEDITOR.editor.prototype.lockSelection = function(a) {
            a = a || this.getSelection(1);
            return a.getType() != CKEDITOR.SELECTION_NONE ?
                (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1
        };
        CKEDITOR.editor.prototype.unlockSelection = function(a) { var b = this._.savedSelection; return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 };
        CKEDITOR.editor.prototype.forceNextSelectionCheck = function() { delete this._.selectionPreviousPath };
        CKEDITOR.dom.document.prototype.getSelection = function() { return new CKEDITOR.dom.selection(this) };
        CKEDITOR.dom.range.prototype.select = function() {
            var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() :
                new CKEDITOR.dom.selection(this.root);
            a.selectRanges([this]);
            return a
        };
        CKEDITOR.SELECTION_NONE = 1;
        CKEDITOR.SELECTION_TEXT = 2;
        CKEDITOR.SELECTION_ELEMENT = 3;
        CKEDITOR.dom.selection = function(a) {
            if (a instanceof CKEDITOR.dom.selection) {
                var b = a;
                a = a.root
            }
            var c = a instanceof CKEDITOR.dom.element;
            this.rev = b ? b.rev : m++;
            this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
            this.root = c ? a : this.document.getBody();
            this.isLocked = 0;
            this._ = { cache: {} };
            if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache),
                this.isFake = b.isFake, this.isLocked = b.isLocked, this;
            a = this.getNative();
            var d, e;
            if (a)
                if (a.getRangeAt) d = (e = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer);
                else { try { e = a.createRange() } catch (f) {} d = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement()) }
            if (!d || d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement =
                null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList;
            return this
        };
        var D = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 };
        CKEDITOR.tools.extend(CKEDITOR.dom.selection, { _removeFillingCharSequenceString: C, _createFillingCharSequenceNode: q, FILLING_CHAR_SEQUENCE: K });
        CKEDITOR.dom.selection.prototype = {
            getNative: function() {
                return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel =
                    x ? this.document.$.selection : this.document.getWindow().$.getSelection()
            },
            getType: x ? function() {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_NONE;
                try {
                    var c = this.getNative(),
                        d = c.type;
                    "Text" == d && (b = CKEDITOR.SELECTION_TEXT);
                    "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT);
                    c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT)
                } catch (e) {}
                return a.type = b
            } : function() {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_TEXT,
                    c = this.getNative();
                if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
                else if (1 == c.rangeCount) {
                    var c = c.getRangeAt(0),
                        d = c.startContainer;
                    d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset - c.startOffset && D[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT)
                }
                return a.type = b
            },
            getRanges: function() {
                var a = x ? function() {
                    function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() }
                    var b = function(b, c) {
                        b = b.duplicate();
                        b.collapse(c);
                        var d = b.parentElement();
                        if (!d.hasChildNodes()) return { container: d, offset: 0 };
                        for (var e = d.children, f, g, h = b.duplicate(), k = 0,
                                l = e.length - 1, r = -1, q, n; k <= l;)
                            if (r = Math.floor((k + l) / 2), f = e[r], h.moveToElementText(f), q = h.compareEndPoints("StartToStart", b), 0 < q) l = r - 1;
                            else if (0 > q) k = r + 1;
                        else return { container: d, offset: a(f) };
                        if (-1 == r || r == e.length - 1 && 0 > q) {
                            h.moveToElementText(d);
                            h.setEndPoint("StartToStart", b);
                            h = h.text.replace(/(\r\n|\r)/g, "\n").length;
                            e = d.childNodes;
                            if (!h) return f = e[e.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? { container: d, offset: e.length } : { container: f, offset: f.nodeValue.length };
                            for (d = e.length; 0 < h && 0 < d;) g = e[--d], g.nodeType ==
                                CKEDITOR.NODE_TEXT && (n = g, h -= g.nodeValue.length);
                            return { container: n, offset: -h }
                        }
                        h.collapse(0 < q ? !0 : !1);
                        h.setEndPoint(0 < q ? "StartToStart" : "EndToStart", b);
                        h = h.text.replace(/(\r\n|\r)/g, "\n").length;
                        if (!h) return { container: d, offset: a(f) + (0 < q ? 0 : 1) };
                        for (; 0 < h;) try { g = f[0 < q ? "previousSibling" : "nextSibling"], g.nodeType == CKEDITOR.NODE_TEXT && (h -= g.nodeValue.length, n = g), f = g } catch (m) { return { container: d, offset: a(f) } }
                        return { container: n, offset: 0 < q ? -h : n.nodeValue.length + h }
                    };
                    return function() {
                        var a = this.getNative(),
                            c = a &&
                            a.createRange(),
                            d = this.getType();
                        if (!a) return [];
                        if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a];
                        if (d == CKEDITOR.SELECTION_ELEMENT) {
                            for (var d = [], e = 0; e < c.length; e++) {
                                for (var f = c.item(e), g = f.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h <
                                    g.childNodes.length && g.childNodes[h] != f; h++);
                                a.setStart(new CKEDITOR.dom.node(g), h);
                                a.setEnd(new CKEDITOR.dom.node(g), h + 1);
                                d.push(a)
                            }
                            return d
                        }
                        return []
                    }
                }() : function() {
                    var a = [],
                        b, c = this.getNative();
                    if (!c) return a;
                    for (var d = 0; d < c.rangeCount; d++) {
                        var e = c.getRangeAt(d);
                        b = new CKEDITOR.dom.range(this.root);
                        b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset);
                        b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
                        a.push(b)
                    }
                    return a
                };
                return function(b) {
                    var c = this._.cache,
                        d = c.ranges;
                    d || (c.ranges =
                        d = new CKEDITOR.dom.rangeList(a.call(this)));
                    return b ? E(new CKEDITOR.dom.rangeList(d.slice())) : d
                }
            }(),
            getStartElement: function() {
                var a = this._.cache;
                if (void 0 !== a.startElement) return a.startElement;
                var b;
                switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT:
                        return this.getSelectedElement();
                    case CKEDITOR.SELECTION_TEXT:
                        var c = this.getRanges()[0];
                        if (c) {
                            if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                            else {
                                for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ?
                                        b.getChildCount() : b.getLength()) && !b.isBlockBoundary();) c.setStartAfter(b);
                                b = c.startContainer;
                                if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                                if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT)
                                    for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) b = c, c = c.getFirst();
                                else b = c.startContainer
                            }
                            b = b.$
                        }
                }
                return a.startElement = b ? new CKEDITOR.dom.element(b) : null
            },
            getSelectedElement: function() {
                var a = this._.cache;
                if (void 0 !== a.selectedElement) return a.selectedElement;
                var b = this,
                    c = CKEDITOR.tools.tryThese(function() { return b.getNative().createRange().item(0) },
                        function() { for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && D[c.getName()] && (d = c)); e--) a.shrink(CKEDITOR.SHRINK_ELEMENT); return d && d.$ });
                return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
            },
            getSelectedText: function() {
                var a = this._.cache;
                if (void 0 !== a.selectedText) return a.selectedText;
                var b = this.getNative(),
                    b = x ? "Control" == b.type ? "" : b.createRange().text : b.toString();
                return a.selectedText = b
            },
            lock: function() {
                this.getRanges();
                this.getStartElement();
                this.getSelectedElement();
                this.getSelectedText();
                this._.cache.nativeSel = null;
                this.isLocked = 1
            },
            unlock: function(b) {
                if (this.isLocked) {
                    if (b) var d = this.getSelectedElement(),
                        e = this.getRanges(),
                        f = this.isFake;
                    this.isLocked = 0;
                    this.reset();
                    b && (b = d || e[0] && e[0].getCommonAncestor()) && b.getAscendant("body", 1) && (a(e) ? c.call(this, e) : f ? this.fake(d) : d ? this.selectElement(d) : this.selectRanges(e))
                }
            },
            reset: function() {
                this._.cache = {};
                this.isFake = 0;
                var a = this.root.editor;
                if (a && a._.fakeSelection)
                    if (this.rev == a._.fakeSelection.rev) {
                        delete a._.fakeSelection;
                        var b = a._.hiddenSelectionContainer;
                        if (b) {
                            var c = a.checkDirty();
                            a.fire("lockSnapshot");
                            b.remove();
                            a.fire("unlockSnapshot");
                            !c && a.resetDirty()
                        }
                        delete a._.hiddenSelectionContainer
                    } else CKEDITOR.warn("selection-fake-reset");
                this.rev = m++
            },
            selectElement: function(a) {
                var b = new CKEDITOR.dom.range(this.root);
                b.setStartBefore(a);
                b.setEndAfter(a);
                this.selectRanges([b])
            },
            selectRanges: function(b) {
                var d = this.root.editor,
                    e = d && d._.hiddenSelectionContainer;
                this.reset();
                if (e)
                    for (var e = this.root, g, h = 0; h < b.length; ++h) g =
                        b[h], g.endContainer.equals(e) && (g.endOffset = Math.min(g.endOffset, e.getChildCount()));
                if (b.length)
                    if (this.isLocked) {
                        var k = CKEDITOR.document.getActive();
                        this.unlock();
                        this.selectRanges(b);
                        this.lock();
                        k && !k.equals(this.root) && k.focus()
                    } else {
                        var l;
                        a: {
                            var p, F;
                            if (1 == b.length && !(F = b[0]).collapsed && (l = F.getEnclosedNode()) && l.type == CKEDITOR.NODE_ELEMENT && (F = F.clone(), F.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (p = F.getEnclosedNode()) && p.type == CKEDITOR.NODE_ELEMENT && (l = p), "false" == l.getAttribute("contenteditable"))) break a;
                            l = void 0
                        }
                        if (l) this.fake(l);
                        else if (d && d.plugins.tableselection && CKEDITOR.plugins.tableselection.isSupportedEnvironment && a(b) && !H) c.call(this, b);
                        else {
                            if (x) {
                                p = CKEDITOR.dom.walker.whitespaces(!0);
                                l = /\ufeff|\u00a0/;
                                F = { table: 1, tbody: 1, tr: 1 };
                                1 < b.length && (d = b[b.length - 1], b[0].setEnd(d.endContainer, d.endOffset));
                                d = b[0];
                                b = d.collapsed;
                                var t, G, m;
                                if ((e = d.getEnclosedNode()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in D && (!e.is("a") || !e.getText())) try {
                                    m = e.$.createControlRange();
                                    m.addElement(e.$);
                                    m.select();
                                    return
                                } catch (w) {}
                                if (d.startContainer.type ==
                                    CKEDITOR.NODE_ELEMENT && d.startContainer.getName() in F || d.endContainer.type == CKEDITOR.NODE_ELEMENT && d.endContainer.getName() in F) d.shrink(CKEDITOR.NODE_ELEMENT, !0), b = d.collapsed;
                                m = d.createBookmark();
                                F = m.startNode;
                                b || (k = m.endNode);
                                m = d.document.$.body.createTextRange();
                                m.moveToElementText(F.$);
                                m.moveStart("character", 1);
                                k ? (l = d.document.$.body.createTextRange(), l.moveToElementText(k.$), m.setEndPoint("EndToEnd", l), m.moveEnd("character", -1)) : (t = F.getNext(p), G = F.hasAscendant("pre"), t = !(t && t.getText && t.getText().match(l)) &&
                                    (G || !F.hasPrevious() || F.getPrevious().is && F.getPrevious().is("br")), G = d.document.createElement("span"), G.setHtml("\x26#65279;"), G.insertBefore(F), t && d.document.createText("﻿").insertBefore(F));
                                d.setStartBefore(F);
                                F.remove();
                                b ? (t ? (m.moveStart("character", -1), m.select(), d.document.$.selection.clear()) : m.select(), d.moveToPosition(G, CKEDITOR.POSITION_BEFORE_START), G.remove()) : (d.setEndBefore(k), k.remove(), m.select())
                            } else {
                                k = this.getNative();
                                if (!k) return;
                                this.removeAllRanges();
                                for (m = 0; m < b.length; m++) {
                                    if (m <
                                        b.length - 1 && (t = b[m], G = b[m + 1], l = t.clone(), l.setStart(t.endContainer, t.endOffset), l.setEnd(G.startContainer, G.startOffset), !l.collapsed && (l.shrink(CKEDITOR.NODE_ELEMENT, !0), d = l.getCommonAncestor(), l = l.getEnclosedNode(), d.isReadOnly() || l && l.isReadOnly()))) {
                                        G.setStart(t.startContainer, t.startOffset);
                                        b.splice(m--, 1);
                                        continue
                                    }
                                    d = b[m];
                                    G = this.document.$.createRange();
                                    d.collapsed && CKEDITOR.env.webkit && n(d) && (l = q(this.root), d.insertNode(l), (t = l.getNext()) && !l.getPrevious() && t.type == CKEDITOR.NODE_ELEMENT && "br" ==
                                        t.getName() ? (f(this.root), d.moveToPosition(t, CKEDITOR.POSITION_BEFORE_START)) : d.moveToPosition(l, CKEDITOR.POSITION_AFTER_END));
                                    G.setStart(d.startContainer.$, d.startOffset);
                                    try { G.setEnd(d.endContainer.$, d.endOffset) } catch (u) {
                                        if (0 <= u.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) d.collapse(1), G.setEnd(d.endContainer.$, d.endOffset);
                                        else throw u;
                                    }
                                    k.addRange(G)
                                }
                            }
                            this.reset();
                            this.root.fire("selectionchange")
                        }
                    }
            },
            fake: function(a, b) {
                var c = this.root.editor;
                void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label"));
                this.reset();
                w(c, b);
                var d = this._.cache,
                    e = new CKEDITOR.dom.range(this.root);
                e.setStartBefore(a);
                e.setEndAfter(a);
                d.ranges = new CKEDITOR.dom.rangeList(e);
                d.selectedElement = d.startElement = a;
                d.type = CKEDITOR.SELECTION_ELEMENT;
                d.selectedText = d.nativeSel = null;
                this.isFake = 1;
                this.rev = m++;
                c._.fakeSelection = this;
                this.root.fire("selectionchange")
            },
            isHidden: function() {
                var a = this.getCommonAncestor();
                a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
                return !(!a || !a.data("cke-hidden-sel"))
            },
            isInTable: function() { return a(this.getRanges()) },
            createBookmarks: function(a) {
                a = this.getRanges().createBookmarks(a);
                this.isFake && (a.isFake = 1);
                return a
            },
            createBookmarks2: function(a) {
                a = this.getRanges().createBookmarks2(a);
                this.isFake && (a.isFake = 1);
                return a
            },
            selectBookmarks: function(b) {
                for (var c = [], d, e = 0; e < b.length; e++) {
                    var f = new CKEDITOR.dom.range(this.root);
                    f.moveToBookmark(b[e]);
                    c.push(f)
                }
                b.isFake && (d = a(c) ? c[0]._getTableElement() : c[0].getEnclosedNode(), d && d.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), b.isFake = 0));
                b.isFake &&
                    !a(c) ? this.fake(d) : this.selectRanges(c);
                return this
            },
            getCommonAncestor: function() { var a = this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null },
            scrollIntoView: function() { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() },
            removeAllRanges: function() { if (this.getType() != CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[x ? "empty" : "removeAllRanges"]() } catch (b) {} this.reset() } }
        }
    })();
    "use strict";
    CKEDITOR.STYLE_BLOCK = 1;
    CKEDITOR.STYLE_INLINE = 2;
    CKEDITOR.STYLE_OBJECT = 3;
    (function() {
        function a(a, b) {
            for (var c, d;
                (a = a.getParent()) && !a.equals(b);)
                if (a.getAttribute("data-nostyle")) c = a;
                else if (!d) { var e = a.getAttribute("contentEditable"); "false" == e ? c = a : "true" == e && (d = 1) }
            return c
        }

        function d(a, b, c, d) { return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a)) }

        function b(c) {
            var f = c.document;
            if (c.collapsed) f = K(this, f), c.insertNode(f), c.moveToPosition(f, CKEDITOR.POSITION_BEFORE_END);
            else {
                var g = this.element,
                    h = this._.definition,
                    k, l = h.ignoreReadonly,
                    m = l || h.includeReadonly;
                null ==
                    m && (m = c.root.getCustomData("cke_includeReadonly"));
                var q = CKEDITOR.dtd[g];
                q || (k = !0, q = CKEDITOR.dtd.span);
                c.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                c.trim();
                var n = c.createBookmark(),
                    w = n.startNode,
                    u = n.endNode,
                    r = w,
                    v;
                if (!l) {
                    var x = c.getCommonAncestor(),
                        l = a(w, x),
                        x = a(u, x);
                    l && (r = l.getNextSourceNode(!0));
                    x && (u = x)
                }
                for (r.getPosition(u) == CKEDITOR.POSITION_FOLLOWING && (r = 0); r;) {
                    l = !1;
                    if (r.equals(u)) r = null, l = !0;
                    else {
                        var A = r.type == CKEDITOR.NODE_ELEMENT ? r.getName() : null,
                            x = A && "false" == r.getAttribute("contentEditable"),
                            C = A &&
                            r.getAttribute("data-nostyle");
                        if (A && r.data("cke-bookmark")) { r = r.getNextSourceNode(!0); continue }
                        if (x && m && CKEDITOR.dtd.$block[A])
                            for (var y = r, z = e(y), D = void 0, H = z.length, I = 0, y = H && new CKEDITOR.dom.range(y.getDocument()); I < H; ++I) {
                                var D = z[I],
                                    J = CKEDITOR.filter.instances[D.data("cke-filter")];
                                if (J ? J.check(this) : 1) y.selectNodeContents(D), b.call(this, y)
                            }
                        z = A ? !q[A] || C ? 0 : x && !m ? 0 : d(r, u, h, V) : 1;
                        if (z)
                            if (D = r.getParent(), z = h, H = g, I = k, !D || !(D.getDtd() || CKEDITOR.dtd.span)[H] && !I || z.parentRule && !z.parentRule(D)) l = !0;
                            else {
                                if (v ||
                                    A && CKEDITOR.dtd.$removeEmpty[A] && (r.getPosition(u) | V) != V || (v = c.clone(), v.setStartBefore(r)), A = r.type, A == CKEDITOR.NODE_TEXT || x || A == CKEDITOR.NODE_ELEMENT && !r.getChildCount()) {
                                    for (var A = r, L;
                                        (l = !A.getNext(B)) && (L = A.getParent(), q[L.getName()]) && d(L, w, h, O);) A = L;
                                    v.setEndAfter(A)
                                }
                            }
                        else l = !0;
                        r = r.getNextSourceNode(C || x)
                    }
                    if (l && v && !v.collapsed) {
                        for (var l = K(this, f), x = l.hasAttributes(), C = v.getCommonAncestor(), A = {}, z = {}, D = {}, H = {}, T, Q, ba; l && C;) {
                            if (C.getName() == g) {
                                for (T in h.attributes) !H[T] && (ba = C.getAttribute(Q)) &&
                                    (l.getAttribute(T) == ba ? z[T] = 1 : H[T] = 1);
                                for (Q in h.styles) !D[Q] && (ba = C.getStyle(Q)) && (l.getStyle(Q) == ba ? A[Q] = 1 : D[Q] = 1)
                            }
                            C = C.getParent()
                        }
                        for (T in z) l.removeAttribute(T);
                        for (Q in A) l.removeStyle(Q);
                        x && !l.hasAttributes() && (l = null);
                        l ? (v.extractContents().appendTo(l), v.insertNode(l), E.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie || l.$.normalize()) : (l = new CKEDITOR.dom.element("span"), v.extractContents().appendTo(l), v.insertNode(l), E.call(this, l), l.remove(!0));
                        v = null
                    }
                }
                c.moveToBookmark(n);
                c.shrink(CKEDITOR.SHRINK_TEXT);
                c.shrink(CKEDITOR.NODE_ELEMENT, !0)
            }
        }

        function c(a) {
            function b() {
                for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(q.getParent()), e = null, f = null, g = 0; g < a.elements.length; g++) {
                    var h = a.elements[g];
                    if (h == a.block || h == a.blockLimit) break;
                    n.checkElementRemovable(h, !0) && (e = h)
                }
                for (g = 0; g < c.elements.length; g++) {
                    h = c.elements[g];
                    if (h == c.block || h == c.blockLimit) break;
                    n.checkElementRemovable(h, !0) && (f = h)
                }
                f && q.breakParent(f);
                e && d.breakParent(e)
            }
            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var c =
                a.createBookmark(),
                d = c.startNode,
                e = this._.definition.alwaysRemoveElement;
            if (a.collapsed) {
                for (var f = new CKEDITOR.dom.elementPath(d.getParent(), a.root), g, h = 0, k; h < f.elements.length && (k = f.elements[h]) && k != f.block && k != f.blockLimit; h++)
                    if (this.checkElementRemovable(k)) { var m;!e && a.collapsed && (a.checkBoundaryOfElement(k, CKEDITOR.END) || (m = a.checkBoundaryOfElement(k, CKEDITOR.START))) ? (g = k, g.match = m ? "start" : "end") : (k.mergeSiblings(), k.is(this.element) ? A.call(this, k) : x(k, l(this)[k.getName()])) }
                if (g) {
                    e = d;
                    for (h =
                        0;; h++) {
                        k = f.elements[h];
                        if (k.equals(g)) break;
                        else if (k.match) continue;
                        else k = k.clone();
                        k.append(e);
                        e = k
                    }
                    e["start" == g.match ? "insertBefore" : "insertAfter"](g)
                }
            } else {
                var q = c.endNode,
                    n = this;
                b();
                for (f = d; !f.equals(q);) g = f.getNextSourceNode(), f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f) && (f.getName() == this.element ? A.call(this, f) : x(f, l(this)[f.getName()]), g.type == CKEDITOR.NODE_ELEMENT && g.contains(d) && (b(), g = d.getNext())), f = g
            }
            a.moveToBookmark(c);
            a.shrink(CKEDITOR.NODE_ELEMENT, !0)
        }

        function e(a) {
            var b = [];
            a.forEach(function(a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0);
            return b
        }

        function g(a) {
            var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0);
            (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && y(a, this)
        }

        function h(a) {
            var b = a.getCommonAncestor(!0, !0);
            if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                var b = this._.definition,
                    c = b.attributes;
                if (c)
                    for (var d in c) a.removeAttribute(d, c[d]);
                if (b.styles)
                    for (var e in b.styles) b.styles.hasOwnProperty(e) &&
                        a.removeStyle(e)
            }
        }

        function k(a) {
            var b = a.createBookmark(!0),
                c = a.createIterator();
            c.enforceRealBlocks = !0;
            this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
            for (var d, e = a.document, f; d = c.getNextParagraph();) !d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = K(this, e, d), q(d, f));
            a.moveToBookmark(b)
        }

        function n(a) {
            var b = a.createBookmark(1),
                c = a.createIterator();
            c.enforceRealBlocks = !0;
            c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d, e; d = c.getNextParagraph();) this.checkElementRemovable(d) &&
                (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(e), q(d, e)) : A.call(this, d));
            a.moveToBookmark(b)
        }

        function q(a, b) {
            var c = !b;
            c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
            var d = b && b.is("pre"),
                e = a.is("pre"),
                g = !d && e;
            if (d && !e) {
                e = b;
                (g = a.getBogus()) && g.remove();
                g = a.getHtml();
                g = C(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                g = g.replace(/([ \t\n\r]+|&nbsp;)/g,
                    " ");
                g = g.replace(/<br\b[^>]*>/gi, "\n");
                if (CKEDITOR.env.ie) {
                    var h = a.getDocument().createElement("div");
                    h.append(e);
                    e.$.outerHTML = "\x3cpre\x3e" + g + "\x3c/pre\x3e";
                    e.copyAttributes(h.getFirst());
                    e = h.getFirst().remove()
                } else e.setHtml(g);
                b = e
            } else g ? b = w(c ? [a.getHtml()] : f(a), b) : a.moveChildren(b);
            b.replace(a);
            if (d) {
                var c = b,
                    k;
                (k = c.getPrevious(L)) && k.type == CKEDITOR.NODE_ELEMENT && k.is("pre") && (d = C(k.getHtml(), /\n$/, "") + "\n\n" + C(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" :
                    c.setHtml(d), k.remove())
            } else c && m(b)
        }

        function f(a) {
            var b = [];
            C(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) { return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) { b.push(c) });
            return b
        }

        function C(a, b, c) {
            var d = "",
                e = "";
            a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
                b && (d = b);
                c && (e = c);
                return ""
            });
            return d + a.replace(b, c) + e
        }

        function w(a, b) {
            var c;
            1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
            for (var d = 0; d < a.length; d++) {
                var e = a[d],
                    e = e.replace(/(\r\n|\r)/g, "\n"),
                    e = C(e, /^[ \t]*\n/, ""),
                    e = C(e, /\n$/, ""),
                    e = C(e, /^[ \t]+|[ \t]+$/g, function(a, b) { return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }),
                    e = e.replace(/\n/g, "\x3cbr\x3e"),
                    e = e.replace(/[ \t]{2,}/g, function(a) { return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " });
                if (c) {
                    var f = b.clone();
                    f.setHtml(e);
                    c.append(f)
                } else b.setHtml(e)
            }
            return c || b
        }

        function A(a, b) {
            var c = this._.definition,
                d = c.attributes,
                c = c.styles,
                e = l(this)[a.getName()],
                f = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c),
                g;
            for (g in d)
                if ("class" != g && !this._.definition.fullMatch || a.getAttribute(g) == u(g, d[g])) b && "data-" == g.slice(0, 5) || (f = a.hasAttribute(g), a.removeAttribute(g));
            for (var h in c) this._.definition.fullMatch && a.getStyle(h) != u(h, c[h], !0) || (f = f || !!a.getStyle(h), a.removeStyle(h));
            x(a, e, D[a.getName()]);
            f && (this._.definition.alwaysRemoveElement ?
                m(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? m(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        }

        function E(a) {
            for (var b = l(this), c = a.getElementsByTag(this.element), d, e = c.count(); 0 <= --e;) d = c.getItem(e), d.isReadOnly() || A.call(this, d, !0);
            for (var f in b)
                if (f != this.element)
                    for (c = a.getElementsByTag(f), e = c.count() - 1; 0 <= e; e--) d = c.getItem(e), d.isReadOnly() || x(d, b[f])
        }

        function x(a, b, c) {
            if (b = b && b.attributes)
                for (var d = 0; d < b.length; d++) {
                    var e = b[d][0],
                        f;
                    if (f = a.getAttribute(e)) {
                        var g = b[d][1];
                        (null === g || g.test && g.test(f) || "string" == typeof g && f == g) && a.removeAttribute(e)
                    }
                }
            c || m(a)
        }

        function m(a, b) {
            if (!a.hasAttributes() || b)
                if (CKEDITOR.dtd.$block[a.getName()]) {
                    var c = a.getPrevious(L),
                        d = a.getNext(L);
                    !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br", 1);
                    !d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({ br: 1 }) || a.append("br");
                    a.remove(!0)
                } else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
                    d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
        }

        function K(a, b, c) {
            var d;
            d = a.element;
            "*" == d && (d = "span");
            d = new CKEDITOR.dom.element(d, b);
            c && c.copyAttributes(d);
            d = y(d, a);
            b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
            return d
        }

        function y(a, b) {
            var c = b._.definition,
                d = c.attributes,
                c = CKEDITOR.style.getStyleText(c);
            if (d)
                for (var e in d) a.setAttribute(e, d[e]);
            c && a.setAttribute("style", c);
            return a
        }

        function H(a,
            b) { for (var c in a) a[c] = a[c].replace(v, function(a, c) { return b[c] }) }

        function l(a) {
            if (a._.overrides) return a._.overrides;
            var b = a._.overrides = {},
                c = a._.definition.overrides;
            if (c) {
                CKEDITOR.tools.isArray(c) || (c = [c]);
                for (var d = 0; d < c.length; d++) {
                    var e = c[d],
                        f, g;
                    "string" == typeof e ? f = e.toLowerCase() : (f = e.element ? e.element.toLowerCase() : a.element, g = e.attributes);
                    e = b[f] || (b[f] = {});
                    if (g) {
                        var e = e.attributes = e.attributes || [],
                            h;
                        for (h in g) e.push([h.toLowerCase(), g[h]])
                    }
                }
            }
            return b
        }

        function u(a, b, c) {
            var d = new CKEDITOR.dom.element("span");
            d[c ? "setStyle" : "setAttribute"](a, b);
            return d[c ? "getStyle" : "getAttribute"](a)
        }

        function I(a, b) {
            function c(a, b) { return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a }
            "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a));
            "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0));
            for (var d in a)
                if (!(d in b) || c(b[d], d) != c(a[d], d) && "inherit" != a[d] && "inherit" != b[d]) return !1;
            return !0
        }

        function J(a, b, c) {
            var d = a.document,
                e = a.getRanges();
            b = b ? this.removeFromRange : this.applyToRange;
            var f, g;
            if (a.isFake && a.isInTable())
                for (f = [], g = 0; g < e.length; g++) f.push(e[g].clone());
            for (var h = e.createIterator(); g = h.getNextRange();) b.call(this, g, c);
            a.selectRanges(f || e);
            d.removeCustomData("doc_processing_style")
        }
        var D = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 },
            r = {
                a: 1,
                blockquote: 1,
                embed: 1,
                hr: 1,
                img: 1,
                li: 1,
                object: 1,
                ol: 1,
                table: 1,
                td: 1,
                tr: 1,
                th: 1,
                ul: 1,
                dl: 1,
                dt: 1,
                dd: 1,
                form: 1,
                audio: 1,
                video: 1
            },
            z = /\s*(?:;\s*|$)/,
            v = /#\((.+?)\)/g,
            B = CKEDITOR.dom.walker.bookmark(0, 1),
            L = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function(a, b) {
            if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a);
            var c = a.attributes;
            c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style);
            b && (a = CKEDITOR.tools.clone(a), H(a.attributes, b), H(a.styles, b));
            c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() :
                a.element : "*";
            this.type = a.type || (D[c] ? CKEDITOR.STYLE_BLOCK : r[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
            "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT);
            this._ = { definition: a }
        };
        CKEDITOR.style.prototype = {
            apply: function(a) {
                if (a instanceof CKEDITOR.dom.document) return J.call(this, a.getSelection());
                if (this.checkApplicable(a.elementPath(), a)) {
                    var b = this._.enterMode;
                    b || (this._.enterMode = a.activeEnterMode);
                    J.call(this, a.getSelection(), 0, a);
                    this._.enterMode = b
                }
            },
            remove: function(a) {
                if (a instanceof CKEDITOR.dom.document) return J.call(this, a.getSelection(), 1);
                if (this.checkApplicable(a.elementPath(), a)) {
                    var b = this._.enterMode;
                    b || (this._.enterMode = a.activeEnterMode);
                    J.call(this, a.getSelection(), 1, a);
                    this._.enterMode = b
                }
            },
            applyToRange: function(a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? k : this.type == CKEDITOR.STYLE_OBJECT ? g : null; return this.applyToRange(a) },
            removeFromRange: function(a) {
                this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ?
                    n : this.type == CKEDITOR.STYLE_OBJECT ? h : null;
                return this.removeFromRange(a)
            },
            applyToObject: function(a) { y(a, this) },
            checkActive: function(a, b) {
                switch (this.type) {
                    case CKEDITOR.STYLE_BLOCK:
                        return this.checkElementRemovable(a.block || a.blockLimit, !0, b);
                    case CKEDITOR.STYLE_OBJECT:
                    case CKEDITOR.STYLE_INLINE:
                        for (var c = a.elements, d = 0, e; d < c.length; d++)
                            if (e = c[d], this.type != CKEDITOR.STYLE_INLINE || e != a.block && e != a.blockLimit) {
                                if (this.type == CKEDITOR.STYLE_OBJECT) {
                                    var f = e.getName();
                                    if (!("string" == typeof this.element ?
                                            f == this.element : f in this.element)) continue
                                }
                                if (this.checkElementRemovable(e, !0, b)) return !0
                            }
                }
                return !1
            },
            checkApplicable: function(a, b, c) {
                b && b instanceof CKEDITOR.filter && (c = b);
                if (c && !c.check(this)) return !1;
                switch (this.type) {
                    case CKEDITOR.STYLE_OBJECT:
                        return !!a.contains(this.element);
                    case CKEDITOR.STYLE_BLOCK:
                        return !!a.blockLimit.getDtd()[this.element]
                }
                return !0
            },
            checkElementMatch: function(a, b) {
                var c = this._.definition;
                if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
                var d = a.getName();
                if ("string" == typeof this.element ?
                    d == this.element : d in this.element) {
                    if (!b && !a.hasAttributes()) return !0;
                    if (d = c._AC) c = d;
                    else {
                        var d = {},
                            e = 0,
                            f = c.attributes;
                        if (f)
                            for (var g in f) e++, d[g] = f[g];
                        if (g = CKEDITOR.style.getStyleText(c)) d.style || e++, d.style = g;
                        d._length = e;
                        c = c._AC = d
                    }
                    if (c._length) {
                        for (var h in c)
                            if ("_length" != h)
                                if (d = a.getAttribute(h) || "", "style" == h ? I(c[h], d) : c[h] == d) { if (!b) return !0 } else if (b) return !1;
                        if (b) return !0
                    } else return !0
                }
                return !1
            },
            checkElementRemovable: function(a, b, c) {
                if (this.checkElementMatch(a, b, c)) return !0;
                if (b = l(this)[a.getName()]) {
                    var d;
                    if (!(b = b.attributes)) return !0;
                    for (c = 0; c < b.length; c++)
                        if (d = b[c][0], d = a.getAttribute(d)) { var e = b[c][1]; if (null === e) return !0; if ("string" == typeof e) { if (d == e) return !0 } else if (e.test(d)) return !0 }
                }
                return !1
            },
            buildPreview: function(a) {
                var b = this._.definition,
                    c = [],
                    d = b.element;
                "bdo" == d && (d = "span");
                var c = ["\x3c", d],
                    e = b.attributes;
                if (e)
                    for (var f in e) c.push(" ", f, '\x3d"', e[f], '"');
                (e = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', e, '"');
                c.push("\x3e", a || b.name, "\x3c/", d, "\x3e");
                return c.join("")
            },
            getDefinition: function() { return this._.definition }
        };
        CKEDITOR.style.getStyleText = function(a) {
            var b = a._ST;
            if (b) return b;
            var b = a.styles,
                c = a.attributes && a.attributes.style || "",
                d = "";
            c.length && (c = c.replace(z, ";"));
            for (var e in b) {
                var f = b[e],
                    g = (e + ":" + f).replace(z, ";");
                "inherit" == f ? d += g : c += g
            }
            c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0));
            return a._ST = c + d
        };
        CKEDITOR.style.customHandlers = {};
        CKEDITOR.style.addCustomHandler = function(a) {
            var b = function(a) {
                this._ = { definition: a };
                this.setup && this.setup(a)
            };
            b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), { assignedTo: CKEDITOR.STYLE_OBJECT }, a, !0);
            return this.customHandlers[a.type] = b
        };
        var V = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
            O = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    })();
    CKEDITOR.styleCommand = function(a, d) {
        this.requiredContent = this.allowedContent = this.style = a;
        CKEDITOR.tools.extend(this, d, !0)
    };
    CKEDITOR.styleCommand.prototype.exec = function(a) {
        a.focus();
        this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style)
    };
    CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet");
    CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet);
    CKEDITOR.loadStylesSet = function(a, d, b) {
        CKEDITOR.stylesSet.addExternal(a, d, "");
        CKEDITOR.stylesSet.load(a, b)
    };
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        attachStyleStateChange: function(a, d) {
            var b = this._.styleStateChangeCallbacks;
            b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(a) {
                for (var d = 0; d < b.length; d++) {
                    var g = b[d],
                        h = g.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                    g.fn.call(this, h)
                }
            }));
            b.push({ style: a, fn: d })
        },
        applyStyle: function(a) { a.apply(this) },
        removeStyle: function(a) { a.remove(this) },
        getStylesSet: function(a) {
            if (this._.stylesDefinitions) a(this._.stylesDefinitions);
            else {
                var d = this,
                    b = d.config.stylesCombo_stylesSet || d.config.stylesSet;
                if (!1 === b) a(null);
                else if (b instanceof Array) d._.stylesDefinitions = b, a(b);
                else {
                    b || (b = "default");
                    var b = b.split(":"),
                        c = b[0];
                    CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                    CKEDITOR.stylesSet.load(c, function(b) {
                        d._.stylesDefinitions = b[c];
                        a(d._.stylesDefinitions)
                    })
                }
            }
        }
    });
    CKEDITOR.dom.comment = function(a, d) {
        "string" == typeof a && (a = (d ? d.$ : document).createComment(a));
        CKEDITOR.dom.domObject.call(this, a)
    };
    CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function() { return "\x3c!--" + this.$.nodeValue + "--\x3e" } });
    "use strict";
    (function() {
        var a = {},
            d = {},
            b;
        for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1);
        for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (d[b] = 1);
        CKEDITOR.dom.elementPath = function(b, e) {
            var g = null,
                h = null,
                k = [],
                n = b,
                q;
            e = e || b.getDocument().getBody();
            n || (n = e);
            do
                if (n.type == CKEDITOR.NODE_ELEMENT) {
                    k.push(n);
                    if (!this.lastElement && (this.lastElement = n, n.is(CKEDITOR.dtd.$object) || "false" == n.getAttribute("contenteditable"))) continue;
                    if (n.equals(e)) break;
                    if (!h && (q = n.getName(),
                            "true" == n.getAttribute("contenteditable") ? h = n : !g && d[q] && (g = n), a[q])) { if (q = !g && "div" == q) { a: { q = n.getChildren(); for (var f = 0, C = q.count(); f < C; f++) { var w = q.getItem(f); if (w.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[w.getName()]) { q = !0; break a } } q = !1 } q = !q } q ? g = n : h = n }
                }
            while (n = n.getParent());
            h || (h = e);
            this.block = g;
            this.blockLimit = h;
            this.root = e;
            this.elements = k
        }
    })();
    CKEDITOR.dom.elementPath.prototype = {
        compare: function(a) {
            var d = this.elements;
            a = a && a.elements;
            if (!a || d.length != a.length) return !1;
            for (var b = 0; b < d.length; b++)
                if (!d[b].equals(a[b])) return !1;
            return !0
        },
        contains: function(a, d, b) {
            var c;
            "string" == typeof a && (c = function(b) { return b.getName() == a });
            a instanceof CKEDITOR.dom.element ? c = function(b) { return b.equals(a) } : CKEDITOR.tools.isArray(a) ? c = function(b) { return -1 < CKEDITOR.tools.indexOf(a, b.getName()) } : "function" == typeof a ? c = a : "object" == typeof a && (c = function(b) {
                return b.getName() in
                    a
            });
            var e = this.elements,
                g = e.length;
            d && g--;
            b && (e = Array.prototype.slice.call(e, 0), e.reverse());
            for (d = 0; d < g; d++)
                if (c(e[d])) return e[d];
            return null
        },
        isContextFor: function(a) { var d; return a in CKEDITOR.dtd.$block ? (d = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!d.getDtd()[a]) : !0 },
        direction: function() { return (this.block || this.blockLimit || this.root).getDirection(1) }
    };
    CKEDITOR.dom.text = function(a, d) {
        "string" == typeof a && (a = (d ? d.$ : document).createTextNode(a));
        this.$ = a
    };
    CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT,
        getLength: function() { return this.$.nodeValue.length },
        getText: function() { return this.$.nodeValue },
        setText: function(a) { this.$.nodeValue = a },
        split: function(a) {
            var d = this.$.parentNode,
                b = d.childNodes.length,
                c = this.getLength(),
                e = this.getDocument(),
                g = new CKEDITOR.dom.text(this.$.splitText(a), e);
            d.childNodes.length == b && (a >= c ? (g = e.createText(""), g.insertAfter(this)) : (a = e.createText(""), a.insertAfter(g), a.remove()));
            return g
        },
        substring: function(a,
            d) { return "number" != typeof d ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, d) }
    });
    (function() {
        function a(a, c, d) {
            var g = a.serializable,
                h = c[d ? "endContainer" : "startContainer"],
                k = d ? "endOffset" : "startOffset",
                n = g ? c.document.getById(a.startNode) : a.startNode;
            a = g ? c.document.getById(a.endNode) : a.endNode;
            h.equals(n.getPrevious()) ? (c.startOffset = c.startOffset - h.getLength() - a.getPrevious().getLength(), h = a.getNext()) : h.equals(a.getPrevious()) && (c.startOffset -= h.getLength(), h = a.getNext());
            h.equals(n.getParent()) && c[k]++;
            h.equals(a.getParent()) && c[k]++;
            c[d ? "endContainer" : "startContainer"] = h;
            return c
        }
        CKEDITOR.dom.rangeList = function(a) {
            if (a instanceof CKEDITOR.dom.rangeList) return a;
            a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
            return CKEDITOR.tools.extend(a, d)
        };
        var d = {
            createIterator: function() {
                var a = this,
                    c = CKEDITOR.dom.walker.bookmark(),
                    d = [],
                    g;
                return {
                    getNextRange: function(h) {
                        g = void 0 === g ? 0 : g + 1;
                        var k = a[g];
                        if (k && 1 < a.length) {
                            if (!g)
                                for (var n = a.length - 1; 0 <= n; n--) d.unshift(a[n].createBookmark(!0));
                            if (h)
                                for (var q = 0; a[g + q + 1];) {
                                    var f = k.document;
                                    h = 0;
                                    n = f.getById(d[q].endNode);
                                    for (f = f.getById(d[q + 1].startNode);;) {
                                        n =
                                            n.getNextSourceNode(!1);
                                        if (f.equals(n)) h = 1;
                                        else if (c(n) || n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) continue;
                                        break
                                    }
                                    if (!h) break;
                                    q++
                                }
                            for (k.moveToBookmark(d.shift()); q--;) n = a[++g], n.moveToBookmark(d.shift()), k.setEnd(n.endContainer, n.endOffset)
                        }
                        return k
                    }
                }
            },
            createBookmarks: function(b) { for (var c = [], d, g = 0; g < this.length; g++) { c.push(d = this[g].createBookmark(b, !0)); for (var h = g + 1; h < this.length; h++) this[h] = a(d, this[h]), this[h] = a(d, this[h], !0) } return c },
            createBookmarks2: function(a) {
                for (var c = [], d = 0; d <
                    this.length; d++) c.push(this[d].createBookmark2(a));
                return c
            },
            moveToBookmarks: function(a) { for (var c = 0; c < this.length; c++) this[c].moveToBookmark(a[c]) }
        }
    })();
    (function() {
        function a() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") }

        function d(b) {
            var c = CKEDITOR.skin["ua_" + b],
                d = CKEDITOR.env;
            if (c)
                for (var c = c.split(",").sort(function(a, b) { return a > b ? -1 : 1 }), e = 0, g; e < c.length; e++)
                    if (g = c[e], d.ie && (g.replace(/^ie/, "") == d.version || d.quirks && "iequirks" == g) && (g = "ie"), d[g]) { b += "_" + c[e]; break }
            return CKEDITOR.getUrl(a() + b + ".css")
        }

        function b(a, b) {
            g[a] || (CKEDITOR.document.appendStyleSheet(d(a)), g[a] = 1);
            b && b()
        }

        function c(a) {
            var b =
                a.getById(h);
            b || (b = a.getHead().append("style"), b.setAttribute("id", h), b.setAttribute("type", "text/css"));
            return b
        }

        function e(a, b, c) {
            var d, e, g;
            if (CKEDITOR.env.webkit)
                for (b = b.split("}").slice(0, -1), e = 0; e < b.length; e++) b[e] = b[e].split("{");
            for (var h = 0; h < a.length; h++)
                if (CKEDITOR.env.webkit)
                    for (e = 0; e < b.length; e++) {
                        g = b[e][1];
                        for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]);
                        a[h].$.sheet.addRule(b[e][0], g)
                    } else {
                        g = b;
                        for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]);
                        CKEDITOR.env.ie && 11 > CKEDITOR.env.version ?
                            a[h].$.styleSheet.cssText += g : a[h].$.innerHTML += g
                    }
        }
        var g = {};
        CKEDITOR.skin = {
            path: a,
            loadPart: function(c, d) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() { b(c, d) }) : b(c, d) },
            getPath: function(a) { return CKEDITOR.getUrl(d(a)) },
            icons: {},
            addIcon: function(a, b, c, d) {
                a = a.toLowerCase();
                this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: d || "16px" })
            },
            getIconStyle: function(a, b, c, d, e) {
                var g;
                a && (a = a.toLowerCase(), b && (g = this.icons[a + "-rtl"]),
                    g || (g = this.icons[a]));
                a = c || g && g.path || "";
                d = d || g && g.offset;
                e = e || g && g.bgsize || "16px";
                a && (a = a.replace(/'/g, "\\'"));
                return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + e + ";"
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function() { return this.uiColor },
            setUiColor: function(a) {
                var b = c(CKEDITOR.document);
                return (this.setUiColor = function(a) {
                    this.uiColor = a;
                    var c = CKEDITOR.skin.chameleon,
                        d = "",
                        g = "";
                    "function" == typeof c && (d = c(this, "editor"), g =
                        c(this, "panel"));
                    a = [
                        [n, a]
                    ];
                    e([b], d, a);
                    e(k, g, a)
                }).call(this, a)
            }
        });
        var h = "cke_ui_color",
            k = [],
            n = /\$color/g;
        CKEDITOR.on("instanceLoaded", function(a) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var b = a.editor;
                a = function(a) {
                    a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                    if (!a.getById("cke_ui_color")) {
                        a = c(a);
                        k.push(a);
                        var d = b.getUiColor();
                        d && e([a], CKEDITOR.skin.chameleon(b, "panel"), [
                            [n, d]
                        ])
                    }
                };
                b.on("panelShow", a);
                b.on("menuShow", a);
                b.config.uiColor && b.setUiColor(b.config.uiColor)
            }
        })
    })();
    (function() {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1;
        else {
            var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document);
            a.appendTo(CKEDITOR.document.getHead());
            try {
                var d = a.getComputedStyle("border-top-color"),
                    b = a.getComputedStyle("border-right-color");
                CKEDITOR.env.hc = !(!d || d != b)
            } catch (c) { CKEDITOR.env.hc = !1 } a.remove()
        }
        CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc");
        CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
        CKEDITOR.status = "loaded";
        CKEDITOR.fireOnce("loaded");
        if (a = CKEDITOR._.pending)
            for (delete CKEDITOR._.pending, d = 0; d < a.length; d++) CKEDITOR.editor.prototype.constructor.apply(a[d][0], a[d][1]), CKEDITOR.add(a[d][0])
    })();
    /*
     Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
     For licensing, see LICENSE.md or http://ckeditor.com/license
    */
    CKEDITOR.skin.name = "moono-lisa";
    CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko";
    CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8";
    CKEDITOR.skin.chameleon = function() {
        var b = function() {
                return function(b, d) {
                    for (var a = b.match(/[^#]./g), e = 0; 3 > e; e++) {
                        var f = e,
                            c;
                        c = parseInt(a[e], 16);
                        c = ("0" + (0 > d ? 0 | c * (1 + d) : 0 | c + (255 - c) * d).toString(16)).slice(-2);
                        a[f] = c
                    }
                    return "#" + a.join("")
                }
            }(),
            f = { editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "), panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ") };
        return function(g, d) {
            var a = b(g.uiColor, .4),
                a = { id: "." + g.id, defaultBorder: b(a, -.2), toolbarElementsBorder: b(a, -.25), defaultBackground: a, lightBackground: b(a, .8), darkBackground: b(a, -.15), ckeButtonOn: b(a, .4), ckeResizer: b(a, -.4), ckeColorauto: b(a, .8), dialogBody: b(a, .7), dialogTab: b(a, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: b(a, -.6), menubuttonHover: b(a, .1), menubuttonIcon: b(a, .5), menubuttonIconHover: b(a, .3) };
            return f[d].output(a).replace(/\[/g, "{").replace(/\]/g, "}")
        }
    }();
    CKEDITOR.plugins.add("dialogui", {
        onLoad: function() {
            var h = function(b) {
                    this._ || (this._ = {});
                    this._["default"] = this._.initValue = b["default"] || "";
                    this._.required = b.required || !1;
                    for (var a = [this._], d = 1; d < arguments.length; d++) a.push(arguments[d]);
                    a.push(!0);
                    CKEDITOR.tools.extend.apply(CKEDITOR.tools, a);
                    return this._
                },
                v = { build: function(b, a, d) { return new CKEDITOR.ui.dialog.textInput(b, a, d) } },
                n = { build: function(b, a, d) { return new CKEDITOR.ui.dialog[a.type](b, a, d) } },
                q = {
                    isChanged: function() {
                        return this.getValue() !=
                            this.getInitValue()
                    },
                    reset: function(b) { this.setValue(this.getInitValue(), b) },
                    setInitValue: function() { this._.initValue = this.getValue() },
                    resetInitValue: function() { this._.initValue = this._["default"] },
                    getInitValue: function() { return this._.initValue }
                },
                r = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onChange: function(b, a) {
                        this._.domOnChangeRegistered || (b.on("load", function() {
                            this.getInputElement().on("change", function() { b.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                                this)
                        }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", a)
                    }
                }, !0),
                x = /^on([A-Z]\w+)/,
                t = function(b) { for (var a in b)(x.test(a) || "title" == a || "type" == a) && delete b[a]; return b },
                w = function(b) {
                    b = b.data.getKeystroke();
                    b == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : b == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl")
                };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function(b, a, d, f) {
                    if (!(4 > arguments.length)) {
                        var c = h.call(this, a);
                        c.labelId = CKEDITOR.tools.getNextId() +
                            "_label";
                        this._.children = [];
                        var e = { role: a.role || "presentation" };
                        a.includeLabel && (e["aria-labelledby"] = c.labelId);
                        CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "div", null, e, function() {
                            var e = [],
                                g = a.required ? " cke_required" : "";
                            "horizontal" != a.labelLayout ? e.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + c.labelId + '"', c.inputId ? ' for\x3d"' + c.inputId + '"' : "", (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", a.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                                a.controlStyle ? ' style\x3d"' + a.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', f.call(this, b, a), "\x3c/div\x3e") : (g = {
                                type: "hbox",
                                widths: a.widths,
                                padding: 0,
                                children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + c.labelId + '" for\x3d"' + c.inputId + '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(a.label) + "\x3c/label\x3e" }, {
                                    type: "html",
                                    html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style\x3d"' + a.controlStyle +
                                        '"' : "") + "\x3e" + f.call(this, b, a) + "\x3c/span\x3e"
                                }]
                            }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, g, e));
                            return e.join("")
                        })
                    }
                },
                textInput: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                            c = { "class": "cke_dialog_ui_input_" + a.type, id: f, type: a.type };
                        a.validate && (this.validate = a.validate);
                        a.maxLength && (c.maxlength = a.maxLength);
                        a.size && (c.size = a.size);
                        a.inputStyle && (c.style = a.inputStyle);
                        var e = this,
                            m = !1;
                        b.on("load", function() {
                            e.getInputElement().on("keydown",
                                function(a) { 13 == a.data.getKeystroke() && (m = !0) });
                            e.getInputElement().on("keyup", function(a) {
                                13 == a.data.getKeystroke() && m && (b.getButton("ok") && setTimeout(function() { b.getButton("ok").click() }, 0), m = !1);
                                e.bidi && w.call(e, a)
                            }, null, null, 1E3)
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            var b = ['\x3cdiv class\x3d"cke_dialog_ui_input_', a.type, '" role\x3d"presentation"'];
                            a.width && b.push('style\x3d"width:' + a.width + '" ');
                            b.push("\x3e\x3cinput ");
                            c["aria-labelledby"] = this._.labelId;
                            this._.required &&
                                (c["aria-required"] = this._.required);
                            for (var e in c) b.push(e + '\x3d"' + c[e] + '" ');
                            b.push(" /\x3e\x3c/div\x3e");
                            return b.join("")
                        })
                    }
                },
                textarea: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        var f = this,
                            c = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                            e = {};
                        a.validate && (this.validate = a.validate);
                        e.rows = a.rows || 5;
                        e.cols = a.cols || 20;
                        e["class"] = "cke_dialog_ui_input_textarea " + (a["class"] || "");
                        "undefined" != typeof a.inputStyle && (e.style = a.inputStyle);
                        a.dir && (e.dir = a.dir);
                        if (f.bidi) b.on("load",
                            function() { f.getInputElement().on("keyup", w) }, f);
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            e["aria-labelledby"] = this._.labelId;
                            this._.required && (e["aria-required"] = this._.required);
                            var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', c, '" '],
                                b;
                            for (b in e) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(e[b]) + '" ');
                            a.push("\x3e", CKEDITOR.tools.htmlEncode(f._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
                            return a.join("")
                        })
                    }
                },
                checkbox: function(b,
                    a, d) {
                    if (!(3 > arguments.length)) {
                        var f = h.call(this, a, { "default": !!a["default"] });
                        a.validate && (this.validate = a.validate);
                        CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "span", null, null, function() {
                            var c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0),
                                e = [],
                                d = CKEDITOR.tools.getNextId() + "_label",
                                g = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": d };
                            t(c);
                            a["default"] && (g.checked = "checked");
                            "undefined" != typeof c.inputStyle && (c.style = c.inputStyle);
                            f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, c, e, "input", null, g);
                            e.push(' \x3clabel id\x3d"', d, '" for\x3d"', g.id, '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(a.label), "\x3c/label\x3e");
                            return e.join("")
                        })
                    }
                },
                radio: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        this._["default"] || (this._["default"] = this._.initValue = a.items[0][1]);
                        a.validate && (this.validate = a.validate);
                        var f = [],
                            c = this;
                        a.role = "radiogroup";
                        a.includeLabel = !0;
                        CKEDITOR.ui.dialog.labeledElement.call(this,
                            b, a, d,
                            function() {
                                for (var e = [], d = [], g = (a.id ? a.id : CKEDITOR.tools.getNextId()) + "_radio", k = 0; k < a.items.length; k++) {
                                    var l = a.items[k],
                                        h = void 0 !== l[2] ? l[2] : l[0],
                                        n = void 0 !== l[1] ? l[1] : l[0],
                                        p = CKEDITOR.tools.getNextId() + "_radio_input",
                                        q = p + "_label",
                                        p = CKEDITOR.tools.extend({}, a, { id: p, title: null, type: null }, !0),
                                        h = CKEDITOR.tools.extend({}, p, { title: h }, !0),
                                        r = { type: "radio", "class": "cke_dialog_ui_radio_input", name: g, value: n, "aria-labelledby": q },
                                        u = [];
                                    c._["default"] == n && (r.checked = "checked");
                                    t(p);
                                    t(h);
                                    "undefined" != typeof p.inputStyle &&
                                        (p.style = p.inputStyle);
                                    p.keyboardFocusable = !0;
                                    f.push(new CKEDITOR.ui.dialog.uiElement(b, p, u, "input", null, r));
                                    u.push(" ");
                                    new CKEDITOR.ui.dialog.uiElement(b, h, u, "label", null, { id: q, "for": r.id }, l[0]);
                                    e.push(u.join(""))
                                }
                                new CKEDITOR.ui.dialog.hbox(b, f, e, d);
                                return d.join("")
                            });
                        this._.children = f
                    }
                },
                button: function(b, a, d) {
                    if (arguments.length) {
                        "function" == typeof a && (a = a(b.getParentEditor()));
                        h.call(this, a, { disabled: a.disabled || !1 });
                        CKEDITOR.event.implementOn(this);
                        var f = this;
                        b.on("load", function() {
                            var a = this.getElement();
                            (function() {
                                a.on("click", function(a) {
                                    f.click();
                                    a.data.preventDefault()
                                });
                                a.on("keydown", function(a) { a.data.getKeystroke() in { 32: 1 } && (f.click(), a.data.preventDefault()) })
                            })();
                            a.unselectable()
                        }, this);
                        var c = CKEDITOR.tools.extend({}, a);
                        delete c.style;
                        var e = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "a", null, { style: a.style, href: "javascript:void(0)", title: a.label, hidefocus: "true", "class": a["class"], role: "button", "aria-labelledby": e }, '\x3cspan id\x3d"' + e + '" class\x3d"cke_dialog_ui_button"\x3e' +
                            CKEDITOR.tools.htmlEncode(a.label) + "\x3c/span\x3e")
                    }
                },
                select: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        var f = h.call(this, a);
                        a.validate && (this.validate = a.validate);
                        f.inputId = CKEDITOR.tools.getNextId() + "_select";
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            var c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0),
                                e = [],
                                d = [],
                                g = { id: f.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId };
                            e.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                                a.type, '" role\x3d"presentation"');
                            a.width && e.push('style\x3d"width:' + a.width + '" ');
                            e.push("\x3e");
                            void 0 !== a.size && (g.size = a.size);
                            void 0 !== a.multiple && (g.multiple = a.multiple);
                            t(c);
                            for (var k = 0, l; k < a.items.length && (l = a.items[k]); k++) d.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(l[0]));
                            "undefined" != typeof c.inputStyle && (c.style = c.inputStyle);
                            f.select = new CKEDITOR.ui.dialog.uiElement(b, c, e, "select", null,
                                g, d.join(""));
                            e.push("\x3c/div\x3e");
                            return e.join("")
                        })
                    }
                },
                file: function(b, a, d) {
                    if (!(3 > arguments.length)) {
                        void 0 === a["default"] && (a["default"] = "");
                        var f = CKEDITOR.tools.extend(h.call(this, a), { definition: a, buttons: [] });
                        a.validate && (this.validate = a.validate);
                        b.on("load", function() { CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file") });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function() {
                            f.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var b = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                                f.frameId, '" title\x3d"', a.label, '" src\x3d"javascript:void('
                            ];
                            b.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                            b.push(')"\x3e\x3c/iframe\x3e');
                            return b.join("")
                        })
                    }
                },
                fileButton: function(b, a, d) {
                    var f = this;
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        a.validate && (this.validate = a.validate);
                        var c = CKEDITOR.tools.extend({}, a),
                            e = c.onClick;
                        c.className = (c.className ? c.className + " " : "") + "cke_dialog_ui_button";
                        c.onClick = function(c) {
                            var d =
                                a["for"];
                            e && !1 === e.call(this, c) || (b.getContentElement(d[0], d[1]).submit(), this.disable())
                        };
                        b.on("load", function() { b.getContentElement(a["for"][0], a["for"][1])._.buttons.push(f) });
                        CKEDITOR.ui.dialog.button.call(this, b, c, d)
                    }
                },
                html: function() {
                    var b = /^\s*<[\w:]+\s+([^>]*)?>/,
                        a = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                        d = /\/$/;
                    return function(f, c, e) {
                        if (!(3 > arguments.length)) {
                            var m = [],
                                g = c.html;
                            "\x3c" != g.charAt(0) && (g = "\x3cspan\x3e" + g + "\x3c/span\x3e");
                            var k = c.focus;
                            if (k) {
                                var l = this.focus;
                                this.focus = function() {
                                    ("function" ==
                                        typeof k ? k : l).call(this);
                                    this.fire("focus")
                                };
                                c.isFocusable && (this.isFocusable = this.isFocusable);
                                this.keyboardFocusable = !0
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, f, c, m, "span", null, null, "");
                            m = m.join("").match(b);
                            g = g.match(a) || ["", "", ""];
                            d.test(g[1]) && (g[1] = g[1].slice(0, -1), g[2] = "/" + g[2]);
                            e.push([g[1], " ", m[1] || "", g[2]].join(""))
                        }
                    }
                }(),
                fieldset: function(b, a, d, f, c) {
                    var e = c.label;
                    this._ = { children: a };
                    CKEDITOR.ui.dialog.uiElement.call(this, b, c, f, "fieldset", null, null, function() {
                        var a = [];
                        e && a.push("\x3clegend" +
                            (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + e + "\x3c/legend\x3e");
                        for (var b = 0; b < d.length; b++) a.push(d[b]);
                        return a.join("")
                    })
                }
            }, !0);
            CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
            CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function(b) {
                    var a = CKEDITOR.document.getById(this._.labelId);
                    1 > a.getChildCount() ? (new CKEDITOR.dom.text(b, CKEDITOR.document)).appendTo(a) : a.getChild(0).$.nodeValue = b;
                    return this
                },
                getLabel: function() {
                    var b =
                        CKEDITOR.document.getById(this._.labelId);
                    return !b || 1 > b.getChildCount() ? "" : b.getChild(0).getText()
                },
                eventProcessors: r
            }, !0);
            CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function() { return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) },
                enable: function() {
                    this._.disabled = !1;
                    var b = this.getElement();
                    b && b.removeClass("cke_disabled")
                },
                disable: function() {
                    this._.disabled = !0;
                    this.getElement().addClass("cke_disabled")
                },
                isVisible: function() { return this.getElement().getFirst().isVisible() },
                isEnabled: function() { return !this._.disabled },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function(b, a) { this.on("click", function() { a.apply(this, arguments) }) } }, !0),
                accessKeyUp: function() { this.click() },
                accessKeyDown: function() { this.focus() },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function() { return CKEDITOR.document.getById(this._.inputId) },
                focus: function() {
                    var b = this.selectParentTab();
                    setTimeout(function() {
                        var a = b.getInputElement();
                        a && a.$.focus()
                    }, 0)
                },
                select: function() {
                    var b = this.selectParentTab();
                    setTimeout(function() {
                        var a = b.getInputElement();
                        a && (a.$.focus(), a.$.select())
                    }, 0)
                },
                accessKeyUp: function() { this.select() },
                setValue: function(b) {
                    if (this.bidi) {
                        var a = b && b.charAt(0);
                        (a = "‪" == a ? "ltr" : "‫" == a ? "rtl" : null) && (b = b.slice(1));
                        this.setDirectionMarker(a)
                    }
                    b || (b = "");
                    return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                },
                getValue: function() {
                    var b = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
                    if (this.bidi && b) {
                        var a = this.getDirectionMarker();
                        a && (b = ("ltr" == a ? "‪" : "‫") + b)
                    }
                    return b
                },
                setDirectionMarker: function(b) {
                    var a = this.getInputElement();
                    b ? a.setAttributes({ dir: b, "data-cke-dir-marker": b }) : this.getDirectionMarker() && a.removeAttributes(["dir", "data-cke-dir-marker"])
                },
                getDirectionMarker: function() { return this.getInputElement().data("cke-dir-marker") },
                keyboardFocusable: !0
            }, q, !0);
            CKEDITOR.ui.dialog.textarea.prototype =
                new CKEDITOR.ui.dialog.textInput;
            CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function() { return this._.select.getElement() },
                add: function(b, a, d) {
                    var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                        c = this.getInputElement().$;
                    f.$.text = b;
                    f.$.value = void 0 === a || null === a ? b : a;
                    void 0 === d || null === d ? CKEDITOR.env.ie ? c.add(f.$) : c.add(f.$, null) : c.add(f.$, d);
                    return this
                },
                remove: function(b) {
                    this.getInputElement().$.remove(b);
                    return this
                },
                clear: function() { for (var b = this.getInputElement().$; 0 < b.length;) b.remove(0); return this },
                keyboardFocusable: !0
            }, q, !0);
            CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getInputElement: function() { return this._.checkbox.getElement() },
                setValue: function(b, a) { this.getInputElement().$.checked = b;!a && this.fire("change", { value: b }) },
                getValue: function() { return this.getInputElement().$.checked },
                accessKeyUp: function() { this.setValue(!this.getValue()) },
                eventProcessors: {
                    onChange: function(b,
                        a) {
                        if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return r.onChange.apply(this, arguments);
                        b.on("load", function() {
                            var a = this._.checkbox.getElement();
                            a.on("propertychange", function(b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) }, this)
                        }, this);
                        this.on("change", a);
                        return null
                    }
                },
                keyboardFocusable: !0
            }, q, !0);
            CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setValue: function(b, a) {
                    for (var d = this._.children, f, c = 0; c < d.length && (f = d[c]); c++) f.getElement().$.checked =
                        f.getValue() == b;
                    !a && this.fire("change", { value: b })
                },
                getValue: function() {
                    for (var b = this._.children, a = 0; a < b.length; a++)
                        if (b[a].getElement().$.checked) return b[a].getValue();
                    return null
                },
                accessKeyUp: function() {
                    var b = this._.children,
                        a;
                    for (a = 0; a < b.length; a++)
                        if (b[a].getElement().$.checked) { b[a].getElement().focus(); return }
                    b[0].getElement().focus()
                },
                eventProcessors: {
                    onChange: function(b, a) {
                        if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return r.onChange.apply(this, arguments);
                        b.on("load", function() {
                            for (var a =
                                    this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) })
                        }, this);
                        this.on("change", a);
                        return null
                    }
                }
            }, q, !0);
            CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, q, {
                getInputElement: function() {
                    var b = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return 0 < b.$.forms.length ? new CKEDITOR.dom.element(b.$.forms[0].elements[0]) :
                        this.getElement()
                },
                submit: function() { this.getInputElement().getParent().$.submit(); return this },
                getAction: function() { return this.getInputElement().getParent().$.action },
                registerEvents: function(b) {
                    var a = /^on([A-Z]\w+)/,
                        d, f = function(a, b, c, d) { a.on("formLoaded", function() { a.getInputElement().on(c, d, a) }) },
                        c;
                    for (c in b)
                        if (d = c.match(a)) this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, b[c]) : f(this, this._.dialog, d[1].toLowerCase(), b[c]);
                    return this
                },
                reset: function() {
                    function b() {
                        d.$.open();
                        var b = "";
                        f.size && (b = f.size - (CKEDITOR.env.ie ? 7 : 0));
                        var h = a.frameId + "_input";
                        d.$.write(['\x3chtml dir\x3d"' + g + '" lang\x3d"' + k + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + g + '" lang\x3d"' + k + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', a.labelId, '" for\x3d"', h, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
                            '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', h, '" aria-labelledby\x3d"', a.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < b ? b : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + e + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + m + ")}", "\x3c/script\x3e"
                        ].join(""));
                        d.$.close();
                        for (b = 0; b < c.length; b++) c[b].enable()
                    }
                    var a = this._,
                        d = CKEDITOR.document.getById(a.frameId).getFrameDocument(),
                        f = a.definition,
                        c = a.buttons,
                        e = this.formLoadedNumber,
                        m = this.formUnloadNumber,
                        g = a.dialog._.editor.lang.dir,
                        k = a.dialog._.editor.langCode;
                    e || (e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() { this.fire("formLoaded") }, this), m = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(e);
                        CKEDITOR.tools.removeFunction(m)
                    }));
                    CKEDITOR.env.gecko ? setTimeout(b, 500) : b()
                },
                getValue: function() { return this.getInputElement().$.value || "" },
                setInitValue: function() { this._.initValue = "" },
                eventProcessors: {
                    onChange: function(b, a) {
                        this._.domOnChangeRegistered || (this.on("formLoaded", function() { this.getInputElement().on("change", function() { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", a)
                    }
                },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.fileButton.prototype =
                new CKEDITOR.ui.dialog.button;
            CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
            CKEDITOR.dialog.addUIElement("text", v);
            CKEDITOR.dialog.addUIElement("password", v);
            CKEDITOR.dialog.addUIElement("textarea", n);
            CKEDITOR.dialog.addUIElement("checkbox", n);
            CKEDITOR.dialog.addUIElement("radio", n);
            CKEDITOR.dialog.addUIElement("button", n);
            CKEDITOR.dialog.addUIElement("select", n);
            CKEDITOR.dialog.addUIElement("file", n);
            CKEDITOR.dialog.addUIElement("fileButton", n);
            CKEDITOR.dialog.addUIElement("html",
                n);
            CKEDITOR.dialog.addUIElement("fieldset", {
                build: function(b, a, d) {
                    for (var f = a.children, c, e = [], h = [], g = 0; g < f.length && (c = f[g]); g++) {
                        var k = [];
                        e.push(k);
                        h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b, c, k))
                    }
                    return new CKEDITOR.ui.dialog[a.type](b, h, e, d, a)
                }
            })
        }
    });
    CKEDITOR.DIALOG_RESIZE_NONE = 0;
    CKEDITOR.DIALOG_RESIZE_WIDTH = 1;
    CKEDITOR.DIALOG_RESIZE_HEIGHT = 2;
    CKEDITOR.DIALOG_RESIZE_BOTH = 3;
    CKEDITOR.DIALOG_STATE_IDLE = 1;
    CKEDITOR.DIALOG_STATE_BUSY = 2;
    (function() {
        function x() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
                if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null
        }

        function A() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
                if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null
        }

        function K(a, b) {
            for (var c = a.$.getElementsByTagName("input"),
                    e = 0, d = c.length; e < d; e++) { var f = new CKEDITOR.dom.element(c[e]); "text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", ""))) }
        }

        function T(a, b) {
            var c = this.getInputElement();
            c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
            a || (this.select ? this.select() : this.focus());
            b && alert(b);
            this.fire("validated", { valid: a, msg: b })
        }

        function U() {
            var a = this.getInputElement();
            a && a.removeAttribute("aria-invalid")
        }

        function V(a) {
            var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", W).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })),
                c = b.getChild([0, 0, 0, 0, 0]),
                e = c.getChild(0),
                d = c.getChild(1);
            a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
            !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));
            e.unselectable();
            d.unselectable();
            return {
                element: b,
                parts: {
                    dialog: b.getChild(0),
                    title: e,
                    close: d,
                    tabs: c.getChild(2),
                    contents: c.getChild([3, 0, 0, 0]),
                    footer: c.getChild([3, 0, 1, 0])
                }
            }
        }

        function L(a, b, c) {
            this.element = b;
            this.focusIndex = c;
            this.tabIndex = 0;
            this.isFocusable = function() { return !b.getAttribute("disabled") && b.isVisible() };
            this.focus = function() {
                a._.currentFocusIndex = this.focusIndex;
                this.element.focus()
            };
            b.on("keydown", function(a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") });
            b.on("focus", function() { this.fire("mouseover") });
            b.on("blur", function() { this.fire("mouseout") })
        }

        function X(a) {
            function b() { a.layout() }
            var c = CKEDITOR.document.getWindow();
            c.on("resize", b);
            a.on("hide", function() { c.removeListener("resize", b) })
        }

        function M(a, b) {
            this._ = { dialog: a };
            CKEDITOR.tools.extend(this, b)
        }

        function Y(a) {
            function b(b) {
                var c = a.getSize(),
                    k = CKEDITOR.document.getWindow().getViewPaneSize(),
                    q = b.data.$.screenX,
                    n = b.data.$.screenY,
                    r = q - e.x,
                    l = n - e.y;
                e = { x: q, y: n };
                d.x += r;
                d.y += l;
                a.move(d.x + h[3] < g ? -h[3] : d.x - h[1] > k.width - c.width - g ? k.width - c.width + ("rtl" == f.lang.dir ? 0 : h[1]) : d.x, d.y + h[0] < g ? -h[0] : d.y - h[2] > k.height - c.height - g ? k.height - c.height + h[2] : d.y, 1);
                b.data.preventDefault()
            }

            function c() {
                CKEDITOR.document.removeListener("mousemove", b);
                CKEDITOR.document.removeListener("mouseup", c);
                if (CKEDITOR.env.ie6Compat) {
                    var a = u.getChild(0).getFrameDocument();
                    a.removeListener("mousemove", b);
                    a.removeListener("mouseup", c)
                }
            }
            var e = null,
                d = null,
                f = a.getParentEditor(),
                g = f.config.dialog_magnetDistance,
                h = CKEDITOR.skin.margins || [0, 0, 0, 0];
            "undefined" == typeof g && (g = 20);
            a.parts.title.on("mousedown", function(g) {
                e = { x: g.data.$.screenX, y: g.data.$.screenY };
                CKEDITOR.document.on("mousemove", b);
                CKEDITOR.document.on("mouseup",
                    c);
                d = a.getPosition();
                if (CKEDITOR.env.ie6Compat) {
                    var f = u.getChild(0).getFrameDocument();
                    f.on("mousemove", b);
                    f.on("mouseup", c)
                }
                g.data.preventDefault()
            }, a)
        }

        function Z(a) {
            function b(b) {
                var c = "rtl" == f.lang.dir,
                    n = k.width,
                    q = k.height,
                    G = n + (b.data.$.screenX - m.x) * (c ? -1 : 1) * (a._.moved ? 1 : 2),
                    H = q + (b.data.$.screenY - m.y) * (a._.moved ? 1 : 2),
                    B = a._.element.getFirst(),
                    B = c && B.getComputedStyle("right"),
                    C = a.getPosition();
                C.y + H > p.height && (H = p.height - C.y);
                (c ? B : C.x) + G > p.width && (G = p.width - (c ? B : C.x));
                if (d == CKEDITOR.DIALOG_RESIZE_WIDTH ||
                    d == CKEDITOR.DIALOG_RESIZE_BOTH) n = Math.max(e.minWidth || 0, G - g);
                if (d == CKEDITOR.DIALOG_RESIZE_HEIGHT || d == CKEDITOR.DIALOG_RESIZE_BOTH) q = Math.max(e.minHeight || 0, H - h);
                a.resize(n, q);
                a._.moved || a.layout();
                b.data.preventDefault()
            }

            function c() {
                CKEDITOR.document.removeListener("mouseup", c);
                CKEDITOR.document.removeListener("mousemove", b);
                q && (q.remove(), q = null);
                if (CKEDITOR.env.ie6Compat) {
                    var a = u.getChild(0).getFrameDocument();
                    a.removeListener("mouseup", c);
                    a.removeListener("mousemove", b)
                }
            }
            var e = a.definition,
                d = e.resizable;
            if (d != CKEDITOR.DIALOG_RESIZE_NONE) {
                var f = a.getParentEditor(),
                    g, h, p, m, k, q, n = CKEDITOR.tools.addFunction(function(d) {
                        k = a.getSize();
                        var e = a.parts.contents;
                        e.$.getElementsByTagName("iframe").length && (q = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), e.append(q));
                        h = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                        g = k.width - a.parts.contents.getSize("width",
                            1);
                        m = { x: d.screenX, y: d.screenY };
                        p = CKEDITOR.document.getWindow().getViewPaneSize();
                        CKEDITOR.document.on("mousemove", b);
                        CKEDITOR.document.on("mouseup", c);
                        CKEDITOR.env.ie6Compat && (e = u.getChild(0).getFrameDocument(), e.on("mousemove", b), e.on("mouseup", c));
                        d.preventDefault && d.preventDefault()
                    });
                a.on("load", function() {
                    var b = "";
                    d == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : d == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                    b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
                        b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e");
                    a.parts.footer.append(b, 1)
                });
                f.on("destroy", function() { CKEDITOR.tools.removeFunction(n) })
            }
        }

        function I(a) { a.data.preventDefault(1) }

        function N(a) {
            var b = CKEDITOR.document.getWindow(),
                c = a.config,
                e = CKEDITOR.skinName || a.config.skin,
                d = c.dialog_backgroundCoverColor || ("moono-lisa" == e ? "black" : "white"),
                e = c.dialog_backgroundCoverOpacity,
                f = c.baseFloatZIndex,
                c = CKEDITOR.tools.genKey(d, e, f),
                g = z[c];
            g ? g.show() : (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + d, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (d = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + d + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),
                    f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(f.join("")), g.setOpacity(void 0 !== e ? e : .5), g.on("keydown", I), g.on("keypress", I), g.on("keyup", I), g.appendTo(CKEDITOR.document.getBody()),
                z[c] = g);
            a.focusManager.add(g);
            u = g;
            a = function() {
                var a = b.getViewPaneSize();
                g.setStyles({ width: a.width + "px", height: a.height + "px" })
            };
            var h = function() {
                var a = b.getScrollPosition(),
                    c = CKEDITOR.dialog._.currentTop;
                g.setStyles({ left: a.x + "px", top: a.y + "px" });
                if (c) { do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog) }
            };
            J = a;
            b.on("resize", a);
            a();
            CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus();
            if (CKEDITOR.env.ie6Compat) {
                var p = function() {
                    h();
                    arguments.callee.prevScrollHandler.apply(this, arguments)
                };
                b.$.setTimeout(function() {
                    p.prevScrollHandler =
                        window.onscroll || function() {};
                    window.onscroll = p
                }, 0);
                h()
            }
        }

        function O(a) { u && (a.focusManager.remove(u), a = CKEDITOR.document.getWindow(), u.hide(), a.removeListener("resize", J), CKEDITOR.env.ie6Compat && a.$.setTimeout(function() { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0), J = null) }
        var v = CKEDITOR.tools.cssLength,
            W = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
            CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
        CKEDITOR.dialog = function(a, b) {
            function c() {
                var a = l._.focusList;
                a.sort(function(a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex });
                for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c
            }

            function e(a) {
                var b = l._.focusList;
                a = a || 0;
                if (!(1 > b.length)) {
                    var c = l._.currentFocusIndex;
                    l._.tabBarMode && 0 > a && (c = 0);
                    try { b[c].getInputElement().$.blur() } catch (d) {}
                    var e = c,
                        g = 1 < l._.pageCount;
                    do {
                        e += a;
                        if (g && !l._.tabBarMode && (e == b.length || -1 == e)) {
                            l._.tabBarMode = !0;
                            l._.tabs[l._.currentTabId][0].focus();
                            l._.currentFocusIndex = -1;
                            return
                        }
                        e = (e + b.length) % b.length;
                        if (e == c) break
                    } while (a && !b[e].isFocusable());
                    b[e].focus();
                    "text" == b[e].type && b[e].select()
                }
            }

            function d(b) {
                if (l == CKEDITOR.dialog._.currentTop) {
                    var c = b.data.getKeystroke(),
                        d = "rtl" == a.lang.dir,
                        g = [37, 38, 39, 40];
                    q = n = 0;
                    if (9 == c || c == CKEDITOR.SHIFT + 9) e(c == CKEDITOR.SHIFT + 9 ? -1 : 1), q = 1;
                    else if (c == CKEDITOR.ALT + 121 && !l._.tabBarMode && 1 < l.getPageCount()) l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1, q = 1;
                    else if (-1 != CKEDITOR.tools.indexOf(g,
                            c) && l._.tabBarMode) c = -1 != CKEDITOR.tools.indexOf([d ? 39 : 37, 38], c) ? x.call(l) : A.call(l), l.selectPage(c), l._.tabs[c][0].focus(), q = 1;
                    else if (13 != c && 32 != c || !l._.tabBarMode)
                        if (13 == c) c = b.data.getTarget(), c.is("a", "button", "select", "textarea") || c.is("input") && "button" == c.$.type || ((c = this.getButton("ok")) && CKEDITOR.tools.setTimeout(c.click, 0, c), q = 1), n = 1;
                        else if (27 == c)(c = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), n = 1;
                    else return;
                    else this.selectPage(this._.currentTabId),
                        this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1), q = 1;
                    f(b)
                }
            }

            function f(a) { q ? a.data.preventDefault(1) : n && a.data.stopPropagation() }
            var g = CKEDITOR.dialog._.dialogDefinitions[b],
                h = CKEDITOR.tools.clone(aa),
                p = a.config.dialog_buttonsOrder || "OS",
                m = a.lang.dir,
                k = {},
                q, n;
            ("OS" == p && CKEDITOR.env.mac || "rtl" == p && "ltr" == m || "ltr" == p && "rtl" == m) && h.buttons.reverse();
            g = CKEDITOR.tools.extend(g(a), h);
            g = CKEDITOR.tools.clone(g);
            g = new P(this, g);
            h = V(a);
            this._ = {
                editor: a,
                element: h.element,
                name: b,
                contentSize: { width: 0, height: 0 },
                size: { width: 0, height: 0 },
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: !1,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: !1
            };
            this.parts = h.parts;
            CKEDITOR.tools.setTimeout(function() { a.fire("ariaWidget", this.parts.contents) }, 0, this);
            h = { position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden" };
            h["rtl" == m ? "right" : "left"] = 0;
            this.parts.dialog.setStyles(h);
            CKEDITOR.event.call(this);
            this.definition = g = CKEDITOR.fire("dialogDefinition", { name: b, definition: g }, a).definition;
            if (!("removeDialogTabs" in a._) && a.config.removeDialogTabs) {
                h = a.config.removeDialogTabs.split(";");
                for (m = 0; m < h.length; m++)
                    if (p = h[m].split(":"), 2 == p.length) {
                        var r = p[0];
                        k[r] || (k[r] = []);
                        k[r].push(p[1])
                    }
                a._.removeDialogTabs = k
            }
            if (a._.removeDialogTabs && (k = a._.removeDialogTabs[b]))
                for (m = 0; m < k.length; m++) g.removeContents(k[m]);
            if (g.onLoad) this.on("load", g.onLoad);
            if (g.onShow) this.on("show", g.onShow);
            if (g.onHide) this.on("hide", g.onHide);
            if (g.onOk) this.on("ok", function(b) {
                a.fire("saveSnapshot");
                setTimeout(function() { a.fire("saveSnapshot") }, 0);
                !1 === g.onOk.call(this, b) && (b.data.hide = !1)
            });
            this.state = CKEDITOR.DIALOG_STATE_IDLE;
            if (g.onCancel) this.on("cancel", function(a) {!1 === g.onCancel.call(this, a) && (a.data.hide = !1) });
            var l = this,
                t = function(a) {
                    var b = l._.contents,
                        c = !1,
                        d;
                    for (d in b)
                        for (var e in b[d])
                            if (c = a.call(this, b[d][e])) return
                };
            this.on("ok", function(a) {
                t(function(b) {
                    if (b.validate) {
                        var c = b.validate(this),
                            d = "string" == typeof c || !1 === c;
                        d && (a.data.hide = !1, a.stop());
                        T.call(b, !d, "string" == typeof c ?
                            c : void 0);
                        return d
                    }
                })
            }, this, null, 0);
            this.on("cancel", function(b) { t(function(c) { if (c.isChanged()) return a.config.dialog_noConfirmCancel || confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0 }) }, this, null, 0);
            this.parts.close.on("click", function(a) {
                !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide();
                a.data.preventDefault()
            }, this);
            this.changeFocus = e;
            var y = this._.element;
            a.focusManager.add(y, 1);
            this.on("show", function() { y.on("keydown", d, this); if (CKEDITOR.env.gecko) y.on("keypress", f, this) });
            this.on("hide",
                function() {
                    y.removeListener("keydown", d);
                    CKEDITOR.env.gecko && y.removeListener("keypress", f);
                    t(function(a) { U.apply(a) })
                });
            this.on("iframeAdded", function(a) {
                (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", d, this, null, 0)
            });
            this.on("show", function() {
                c();
                var b = 1 < l._.pageCount;
                a.config.dialog_startupFocusTab && b ? (l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = b ? -1 : this._.focusList.length - 1, g.onFocus ?
                    (b = g.onFocus.call(this)) && b.focus() : e(1))
            }, this, null, 4294967295);
            if (CKEDITOR.env.ie6Compat) this.on("load", function() {
                var a = this.getElement(),
                    b = a.getFirst();
                b.remove();
                b.appendTo(a)
            }, this);
            Y(this);
            Z(this);
            (new CKEDITOR.dom.text(g.title, CKEDITOR.document)).appendTo(this.parts.title);
            for (m = 0; m < g.contents.length; m++)(k = g.contents[m]) && this.addPage(k);
            this.parts.tabs.on("click", function(a) {
                var b = a.data.getTarget();
                b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
                    this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1)), a.data.preventDefault())
            }, this);
            m = [];
            k = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: g.buttons }, m).getChild();
            this.parts.footer.setHtml(m.join(""));
            for (m = 0; m < k.length; m++) this._.buttons[k[m].id] = k[m]
        };
        CKEDITOR.dialog.prototype = {
            destroy: function() {
                this.hide();
                this._.element.remove()
            },
            resize: function() {
                return function(a, b) {
                    this._.contentSize && this._.contentSize.width ==
                        a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", { dialog: this, width: a, height: b }, this._.editor), this.fire("resize", { width: a, height: b }, this._.editor), this.parts.contents.setStyles({ width: a + "px", height: b + "px" }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = { width: a, height: b })
                }
            }(),
            getSize: function() {
                var a = this._.element.getFirst();
                return { width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 }
            },
            move: function(a, b, c) {
                var e = this._.element.getFirst(),
                    d = "rtl" == this._.editor.lang.dir,
                    f = "fixed" == e.getComputedStyle("position");
                CKEDITOR.env.ie && e.setStyle("zoom", "100%");
                f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = { x: a, y: b }, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), d && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = { top: (0 < b ? b : 0) + "px" },
                    b[d ? "right" : "left"] = (0 < a ? a : 0) + "px", e.setStyles(b), c && (this._.moved = 1))
            },
            getPosition: function() { return CKEDITOR.tools.extend({}, this._.position) },
            show: function() {
                var a = this._.element,
                    b = this.definition;
                a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody());
                this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
                this.reset();
                this.selectPage(this.definition.contents[0].id);
                null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
                this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
                null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, N(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this);
                a.on("keydown", Q);
                a.on("keyup", R);
                this._.hasFocus = !1;
                for (var c in b.contents)
                    if (b.contents[c]) {
                        var a = b.contents[c],
                            e = this._.tabs[a.id],
                            d = a.requiredContent,
                            f = 0;
                        if (e) { for (var g in this._.contents[a.id]) { var h = this._.contents[a.id][g]; "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() : (h.enable(), f++)) }!f || d && !this._.editor.activeFilter.check(d) ? e[0].addClass("cke_dialog_tab_disabled") : e[0].removeClass("cke_dialog_tab_disabled") }
                    }
                CKEDITOR.tools.setTimeout(function() {
                    this.layout();
                    X(this);
                    this.parts.dialog.setStyle("visibility", "");
                    this.fireOnce("load", {});
                    CKEDITOR.ui.fire("ready", this);
                    this.fire("show", {});
                    this._.editor.fire("dialogShow", this);
                    this._.parentDialog || this._.editor.focusManager.lock();
                    this.foreach(function(a) { a.setInitValue && a.setInitValue() })
                }, 100, this)
            },
            layout: function() {
                var a = this.parts.dialog,
                    b = this.getSize(),
                    c = CKEDITOR.document.getWindow().getViewPaneSize(),
                    e = (c.width - b.width) / 2,
                    d = (c.height - b.height) / 2;
                CKEDITOR.env.ie6Compat || (b.height + (0 < d ? d : 0) > c.height ||
                    b.width + (0 < e ? e : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                this.move(this._.moved ? this._.position.x : e, this._.moved ? this._.position.y : d)
            },
            foreach: function(a) {
                for (var b in this._.contents)
                    for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
                return this
            },
            reset: function() { var a = function(a) { a.reset && a.reset(1) }; return function() { this.foreach(a); return this } }(),
            setupContent: function() {
                var a = arguments;
                this.foreach(function(b) { b.setup && b.setup.apply(b, a) })
            },
            commitContent: function() {
                var a = arguments;
                this.foreach(function(b) {
                    CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                    b.commit && b.commit.apply(b, a)
                })
            },
            hide: function() {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {});
                    this._.editor.fire("dialogHide", this);
                    this.selectPage(this._.tabIdList[0]);
                    var a = this._.element;
                    a.setStyle("display", "none");
                    this.parts.dialog.setStyle("visibility", "hidden");
                    for (ba(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var b = this._.parentDialog.getElement().getFirst();
                        b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                    } else O(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10;
                    else {
                        CKEDITOR.dialog._.currentZIndex = null;
                        a.removeListener("keydown", Q);
                        a.removeListener("keyup", R);
                        var c = this._.editor;
                        c.focus();
                        setTimeout(function() {
                            c.focusManager.unlock();
                            CKEDITOR.env.iOS && c.window.focus()
                        }, 0)
                    }
                    delete this._.parentDialog;
                    this.foreach(function(a) { a.resetInitValue && a.resetInitValue() });
                    this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                }
            },
            addPage: function(a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;" }, b), d = this._.contents[a.id] = {}, f = e.getChild(),
                            g = 0; e = f.shift();) e.notAllowed || "hbox" == e.type || "vbox" == e.type || g++, d[e.id] = e, "function" == typeof e.getChild && f.push.apply(f, e.getChild());
                    g || (a.hidden = !0);
                    b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                    b.setAttribute("role", "tabpanel");
                    e = CKEDITOR.env;
                    d = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
                    c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', d, '"', e.gecko && !e.hc ? "" : ' href\x3d"javascript:void(0)"',
                        ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"
                    ].join(""));
                    b.setAttribute("aria-labelledby", d);
                    this._.tabs[a.id] = [c, b];
                    this._.tabIdList.push(a.id);
                    !a.hidden && this._.pageCount++;
                    this._.lastTab = c;
                    this.updateStyle();
                    b.setAttribute("name", a.id);
                    b.appendTo(this.parts.contents);
                    c.unselectable();
                    this.parts.tabs.append(c);
                    a.accessKey && (S(this, this, "CTRL+" + a.accessKey, ca, da), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                }
            },
            selectPage: function(a) {
                if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") &&
                    !1 !== this.fire("selectPage", { page: a, currentPage: this._.currentTabId })) {
                    for (var b in this._.tabs) {
                        var c = this._.tabs[b][0],
                            e = this._.tabs[b][1];
                        b != a && (c.removeClass("cke_dialog_tab_selected"), e.hide());
                        e.setAttribute("aria-hidden", b != a)
                    }
                    var d = this._.tabs[a];
                    d[0].addClass("cke_dialog_tab_selected");
                    CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (K(d[1]), d[1].show(), setTimeout(function() { K(d[1], 1) }, 0)) : d[1].show();
                    this._.currentTabId = a;
                    this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            },
            updateStyle: function() { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") },
            hidePage: function(a) {
                var b = this._.tabs[a] && this._.tabs[a][0];
                b && 1 != this._.pageCount && b.isVisible() && (a == this._.currentTabId && this.selectPage(x.call(this)), b.hide(), this._.pageCount--, this.updateStyle())
            },
            showPage: function(a) { if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle() },
            getElement: function() { return this._.element },
            getName: function() { return this._.name },
            getContentElement: function(a, b) { var c = this._.contents[a]; return c && c[b] },
            getValueOf: function(a, b) { return this.getContentElement(a, b).getValue() },
            setValueOf: function(a, b, c) { return this.getContentElement(a, b).setValue(c) },
            getButton: function(a) { return this._.buttons[a] },
            click: function(a) { return this._.buttons[a].click() },
            disableButton: function(a) { return this._.buttons[a].disable() },
            enableButton: function(a) { return this._.buttons[a].enable() },
            getPageCount: function() { return this._.pageCount },
            getParentEditor: function() { return this._.editor },
            getSelectedElement: function() { return this.getParentEditor().getSelection().getSelectedElement() },
            addFocusable: function(a, b) {
                if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new L(this, a, b));
                else { this._.focusList.splice(b, 0, new L(this, a, b)); for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++ }
            },
            setState: function(a) {
                if (this.state != a) {
                    this.state = a;
                    if (a == CKEDITOR.DIALOG_STATE_BUSY) {
                        if (!this.parts.spinner) {
                            var b = this.getParentEditor().lang.dir,
                                c = {
                                    attributes: { "class": "cke_dialog_spinner" },
                                    styles: { "float": "rtl" == b ? "right" : "left" }
                                };
                            c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px";
                            this.parts.spinner = CKEDITOR.document.createElement("div", c);
                            this.parts.spinner.setHtml("\x26#8987;");
                            this.parts.spinner.appendTo(this.parts.title, 1)
                        }
                        this.parts.spinner.show();
                        this.getButton("ok").disable()
                    } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
                    this.fire("state", a)
                }
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function(a, b) {
                this._.dialogDefinitions[a] &&
                    "function" != typeof b || (this._.dialogDefinitions[a] = b)
            },
            exists: function(a) { return !!this._.dialogDefinitions[a] },
            getCurrent: function() { return CKEDITOR.dialog._.currentTop },
            isTabEnabled: function(a, b, c) { a = a.config.removeDialogTabs; return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i"))) },
            okButton: function() {
                var a = function(a, c) {
                    c = c || {};
                    return CKEDITOR.tools.extend({
                        id: "ok",
                        type: "button",
                        label: a.lang.common.ok,
                        "class": "cke_dialog_ui_button_ok",
                        onClick: function(a) {
                            a = a.data.dialog;
                            !1 !== a.fire("ok", { hide: !0 }).hide && a.hide()
                        }
                    }, c, !0)
                };
                a.type = "button";
                a.override = function(b) { return CKEDITOR.tools.extend(function(c) { return a(c, b) }, { type: "button" }, !0) };
                return a
            }(),
            cancelButton: function() {
                var a = function(a, c) { c = c || {}; return CKEDITOR.tools.extend({ id: "cancel", type: "button", label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel", onClick: function(a) { a = a.data.dialog;!1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() } }, c, !0) };
                a.type = "button";
                a.override = function(b) {
                    return CKEDITOR.tools.extend(function(c) {
                        return a(c,
                            b)
                    }, { type: "button" }, !0)
                };
                return a
            }(),
            addUIElement: function(a, b) { this._.uiElementBuilders[a] = b }
        });
        CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null };
        CKEDITOR.event.implementOn(CKEDITOR.dialog);
        CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var aa = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] },
            D = function(a, b, c) {
                for (var e = 0, d; d = a[e]; e++)
                    if (d.id == b || c && d[c] && (d = D(d[c],
                            b, c))) return d;
                return null
            },
            E = function(a, b, c, e, d) { if (c) { for (var f = 0, g; g = a[f]; f++) { if (g.id == c) return a.splice(f, 0, b), b; if (e && g[e] && (g = E(g[e], b, c, e, !0))) return g } if (d) return null } a.push(b); return b },
            F = function(a, b, c) { for (var e = 0, d; d = a[e]; e++) { if (d.id == b) return a.splice(e, 1); if (c && d[c] && (d = F(d[c], b, c))) return d } return null },
            P = function(a, b) {
                this.dialog = a;
                for (var c = b.contents, e = 0, d; d = c[e]; e++) c[e] = d && new M(a, d);
                CKEDITOR.tools.extend(this, b)
            };
        P.prototype = {
            getContents: function(a) {
                return D(this.contents,
                    a)
            },
            getButton: function(a) { return D(this.buttons, a) },
            addContents: function(a, b) { return E(this.contents, a, b) },
            addButton: function(a, b) { return E(this.buttons, a, b) },
            removeContents: function(a) { F(this.contents, a) },
            removeButton: function(a) { F(this.buttons, a) }
        };
        M.prototype = { get: function(a) { return D(this.elements, a, "children") }, add: function(a, b) { return E(this.elements, a, b, "children") }, remove: function(a) { F(this.elements, a, "children") } };
        var J, z = {},
            u, w = {},
            Q = function(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey,
                    c =
                    a.data.$.altKey,
                    e = a.data.$.shiftKey,
                    d = String.fromCharCode(a.data.$.keyCode);
                (b = w[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
            },
            R = function(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey,
                    c = a.data.$.altKey,
                    e = a.data.$.shiftKey,
                    d = String.fromCharCode(a.data.$.keyCode);
                (b = w[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key),
                    a.data.preventDefault()))
            },
            S = function(a, b, c, e, d) {
                (w[c] || (w[c] = [])).push({ uiElement: a, dialog: b, key: c, keyup: d || a.accessKeyUp, keydown: e || a.accessKeyDown })
            },
            ba = function(a) {
                for (var b in w) {
                    for (var c = w[b], e = c.length - 1; 0 <= e; e--) c[e].dialog != a && c[e].uiElement != a || c.splice(e, 1);
                    0 === c.length && delete w[b]
                }
            },
            da = function(a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) },
            ca = function() {};
        (function() {
            CKEDITOR.ui.dialog = {
                uiElement: function(a, b, c, e, d, f, g) {
                    if (!(4 > arguments.length)) {
                        var h = (e.call ? e(b) : e) ||
                            "div",
                            p = ["\x3c", h, " "],
                            m = (d && d.call ? d(b) : d) || {},
                            k = (f && f.call ? f(b) : f) || {},
                            q = (g && g.call ? g.call(this, a, b) : g) || "",
                            n = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement";
                        b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0);
                        k.id = n;
                        var r = {};
                        b.type && (r["cke_dialog_ui_" + b.type] = 1);
                        b.className && (r[b.className] = 1);
                        b.disabled && (r.cke_disabled = 1);
                        for (var l = k["class"] && k["class"].split ? k["class"].split(" ") : [], n = 0; n < l.length; n++) l[n] && (r[l[n]] = 1);
                        l = [];
                        for (n in r) l.push(n);
                        k["class"] = l.join(" ");
                        b.title && (k.title = b.title);
                        r = (b.style || "").split(";");
                        b.align && (l = b.align, m["margin-left"] = "left" == l ? 0 : "auto", m["margin-right"] = "right" == l ? 0 : "auto");
                        for (n in m) r.push(n + ":" + m[n]);
                        b.hidden && r.push("display:none");
                        for (n = r.length - 1; 0 <= n; n--) "" === r[n] && r.splice(n, 1);
                        0 < r.length && (k.style = (k.style ? k.style + "; " : "") + r.join("; "));
                        for (n in k) p.push(n + '\x3d"' + CKEDITOR.tools.htmlEncode(k[n]) + '" ');
                        p.push("\x3e", q, "\x3c/", h, "\x3e");
                        c.push(p.join(""));
                        (this._ || (this._ = {})).dialog = a;
                        "boolean" == typeof b.isChanged && (this.isChanged = function() { return b.isChanged });
                        "function" == typeof b.isChanged && (this.isChanged = b.isChanged);
                        "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(a) { return function(c) { a.call(this, b.setValue.call(this, c)) } }));
                        "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(a) { return function() { return b.getValue.call(this, a.call(this)) } }));
                        CKEDITOR.event.implementOn(this);
                        this.registerEvents(b);
                        this.accessKeyUp && this.accessKeyDown && b.accessKey && S(this, a, "CTRL+" + b.accessKey);
                        var t = this;
                        a.on("load", function() {
                            var b = t.getInputElement();
                            if (b) {
                                var c = t.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : "";
                                b.on("focus", function() {
                                    a._.tabBarMode = !1;
                                    a._.hasFocus = !0;
                                    t.fire("focus");
                                    c && this.addClass(c)
                                });
                                b.on("blur", function() {
                                    t.fire("blur");
                                    c && this.removeClass(c)
                                })
                            }
                        });
                        CKEDITOR.tools.extend(this, b);
                        this.keyboardFocusable && (this.tabIndex =
                            b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function() { a._.currentFocusIndex = t.focusIndex }))
                    }
                },
                hbox: function(a, b, c, e, d) {
                    if (!(4 > arguments.length)) {
                        this._ || (this._ = {});
                        var f = this._.children = b,
                            g = d && d.widths || null,
                            h = d && d.height || null,
                            p, m = { role: "presentation" };
                        d && d.align && (m.align = d.align);
                        CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "hbox" }, e, "table", {}, m, function() {
                            var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];
                            for (p = 0; p < c.length; p++) {
                                var b = "cke_dialog_ui_hbox_child",
                                    e = [];
                                0 === p && (b = "cke_dialog_ui_hbox_first");
                                p == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" ');
                                g ? g[p] && e.push("width:" + v(g[p])) : e.push("width:" + Math.floor(100 / c.length) + "%");
                                h && e.push("height:" + v(h));
                                d && void 0 !== d.padding && e.push("padding:" + v(d.padding));
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && f[p].align && e.push("text-align:" + f[p].align);
                                0 < e.length && a.push('style\x3d"' + e.join("; ") + '" ');
                                a.push("\x3e", c[p], "\x3c/td\x3e")
                            }
                            a.push("\x3c/tr\x3e\x3c/tbody\x3e");
                            return a.join("")
                        })
                    }
                },
                vbox: function(a, b, c, e, d) {
                    if (!(3 > arguments.length)) {
                        this._ || (this._ = {});
                        var f = this._.children = b,
                            g = d && d.width || null,
                            h = d && d.heights || null;
                        CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "vbox" }, e, "div", null, { role: "presentation" }, function() {
                            var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
                            b.push('style\x3d"');
                            d && d.expand && b.push("height:100%;");
                            b.push("width:" + v(g || "100%"), ";");
                            CKEDITOR.env.webkit && b.push("float:none;");
                            b.push('"');
                            b.push('align\x3d"',
                                CKEDITOR.tools.htmlEncode(d && d.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
                            b.push("\x3e\x3ctbody\x3e");
                            for (var e = 0; e < c.length; e++) {
                                var k = [];
                                b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');
                                g && k.push("width:" + v(g || "100%"));
                                h ? k.push("height:" + v(h[e])) : d && d.expand && k.push("height:" + Math.floor(100 / c.length) + "%");
                                d && void 0 !== d.padding && k.push("padding:" + v(d.padding));
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && f[e].align && k.push("text-align:" + f[e].align);
                                0 < k.length && b.push('style\x3d"',
                                    k.join("; "), '" ');
                                b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[e], "\x3c/td\x3e\x3c/tr\x3e")
                            }
                            b.push("\x3c/tbody\x3e\x3c/table\x3e");
                            return b.join("")
                        })
                    }
                }
            }
        })();
        CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function() { return CKEDITOR.document.getById(this.domId) },
            getInputElement: function() { return this.getElement() },
            getDialog: function() { return this._.dialog },
            setValue: function(a, b) { this.getInputElement().setValue(a);!b && this.fire("change", { value: a }); return this },
            getValue: function() { return this.getInputElement().getValue() },
            isChanged: function() { return !1 },
            selectParentTab: function() {
                for (var a = this.getInputElement();
                    (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
                if (!a) return this;
                a = a.getAttribute("name");
                this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                return this
            },
            focus: function() { this.selectParentTab().getInputElement().focus(); return this },
            registerEvents: function(a) {
                var b = /^on([A-Z]\w+)/,
                    c, e = function(a, b, c, d) { b.on("load", function() { a.getInputElement().on(c, d, a) }) },
                    d;
                for (d in a)
                    if (c =
                        d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : e(this, this._.dialog, c[1].toLowerCase(), a[d]);
                return this
            },
            eventProcessors: { onLoad: function(a, b) { a.on("load", b, this) }, onShow: function(a, b) { a.on("show", b, this) }, onHide: function(a, b) { a.on("hide", b, this) } },
            accessKeyDown: function() { this.focus() },
            accessKeyUp: function() {},
            disable: function() {
                var a = this.getElement();
                this.getInputElement().setAttribute("disabled", "true");
                a.addClass("cke_disabled")
            },
            enable: function() {
                var a =
                    this.getElement();
                this.getInputElement().removeAttribute("disabled");
                a.removeClass("cke_disabled")
            },
            isEnabled: function() { return !this.getElement().hasClass("cke_disabled") },
            isVisible: function() { return this.getInputElement().isVisible() },
            isFocusable: function() { return this.isEnabled() && this.isVisible() ? !0 : !1 }
        };
        CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
            getChild: function(a) {
                if (1 > arguments.length) return this._.children.concat();
                a.splice || (a = [a]);
                return 2 >
                    a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
            }
        }, !0);
        CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
        (function() {
            var a = {
                build: function(a, c, e) {
                    for (var d = c.children, f, g = [], h = [], p = 0; p < d.length && (f = d[p]); p++) {
                        var m = [];
                        g.push(m);
                        h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, m))
                    }
                    return new CKEDITOR.ui.dialog[c.type](a, h, g, e, c)
                }
            };
            CKEDITOR.dialog.addUIElement("hbox", a);
            CKEDITOR.dialog.addUIElement("vbox",
                a)
        })();
        CKEDITOR.dialogCommand = function(a, b) {
            this.dialogName = a;
            CKEDITOR.tools.extend(this, b, !0)
        };
        CKEDITOR.dialogCommand.prototype = { exec: function(a) { a.openDialog(this.dialogName) }, canUndo: !1, editorFocus: 1 };
        (function() {
            var a = /^([a]|[^a])+$/,
                b = /^\d*$/,
                c = /^\d*(?:\.\d+)?$/,
                e = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                d = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            CKEDITOR.VALIDATE_OR = 1;
            CKEDITOR.VALIDATE_AND = 2;
            CKEDITOR.dialog.validate = {
                functions: function() {
                    var a =
                        arguments;
                    return function() {
                        var b = this && this.getValue ? this.getValue() : a[0],
                            c, d = CKEDITOR.VALIDATE_AND,
                            e = [],
                            f;
                        for (f = 0; f < a.length; f++)
                            if ("function" == typeof a[f]) e.push(a[f]);
                            else break;
                        f < a.length && "string" == typeof a[f] && (c = a[f], f++);
                        f < a.length && "number" == typeof a[f] && (d = a[f]);
                        var n = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
                        for (f = 0; f < e.length; f++) n = d == CKEDITOR.VALIDATE_AND ? n && e[f](b) : n || e[f](b);
                        return n ? !0 : c
                    }
                },
                regex: function(a, b) { return function(c) { c = this && this.getValue ? this.getValue() : c; return a.test(c) ? !0 : b } },
                notEmpty: function(b) { return this.regex(a, b) },
                integer: function(a) { return this.regex(b, a) },
                number: function(a) { return this.regex(c, a) },
                cssLength: function(a) { return this.functions(function(a) { return d.test(CKEDITOR.tools.trim(a)) }, a) },
                htmlLength: function(a) { return this.functions(function(a) { return e.test(CKEDITOR.tools.trim(a)) }, a) },
                inlineStyle: function(a) { return this.functions(function(a) { return f.test(CKEDITOR.tools.trim(a)) }, a) },
                equals: function(a, b) { return this.functions(function(b) { return b == a }, b) },
                notEqual: function(a, b) { return this.functions(function(b) { return b != a }, b) }
            };
            CKEDITOR.on("instanceDestroyed", function(a) {
                if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                    for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
                    for (var c in z) z[c].remove();
                    z = {}
                }
                a = a.editor._.storedDialogs;
                for (var d in a) a[d].destroy()
            })
        })();
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function(a, b) {
                var c = null,
                    e = CKEDITOR.dialog._.dialogDefinitions[a];
                null === CKEDITOR.dialog._.currentTop && N(this);
                if ("function" == typeof e) c =
                    this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show();
                else {
                    if ("failed" == e) throw O(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                    "string" == typeof e && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e), function() {
                        "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                        this.openDialog(a, b)
                    }, this, 0, 1)
                }
                CKEDITOR.skin.loadPart("dialog");
                return c
            }
        })
    })();
    CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function(x) { x.on("doubleclick", function(A) { A.data.dialog && x.openDialog(A.data.dialog) }, null, null, 999) } });
    CKEDITOR.plugins.add("about", {
        requires: "dialog",
        init: function(a) {
            var b = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
            b.modes = { wysiwyg: 1, source: 1 };
            b.canUndo = !1;
            b.readOnly = 1;
            a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.title, command: "about", toolbar: "about" });
            CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
        }
    });
    CKEDITOR.plugins.add("basicstyles", {
        init: function(c) {
            var e = 0,
                d = function(g, d, b, a) {
                    if (a) {
                        a = new CKEDITOR.style(a);
                        var f = h[b];
                        f.unshift(a);
                        c.attachStyleStateChange(a, function(a) {!c.readOnly && c.getCommand(b).setState(a) });
                        c.addCommand(b, new CKEDITOR.styleCommand(a, { contentForms: f }));
                        c.ui.addButton && c.ui.addButton(g, { label: d, command: b, toolbar: "basicstyles," + (e += 10) })
                    }
                },
                h = {
                    bold: ["strong", "b", ["span", function(a) { a = a.styles["font-weight"]; return "bold" == a || 700 <= +a }]],
                    italic: ["em", "i", ["span", function(a) {
                        return "italic" ==
                            a.styles["font-style"]
                    }]],
                    underline: ["u", ["span", function(a) { return "underline" == a.styles["text-decoration"] }]],
                    strike: ["s", "strike", ["span", function(a) { return "line-through" == a.styles["text-decoration"] }]],
                    subscript: ["sub"],
                    superscript: ["sup"]
                },
                b = c.config,
                a = c.lang.basicstyles;
            d("Bold", a.bold, "bold", b.coreStyles_bold);
            d("Italic", a.italic, "italic", b.coreStyles_italic);
            d("Underline", a.underline, "underline", b.coreStyles_underline);
            d("Strike", a.strike, "strike", b.coreStyles_strike);
            d("Subscript", a.subscript,
                "subscript", b.coreStyles_subscript);
            d("Superscript", a.superscript, "superscript", b.coreStyles_superscript);
            c.setKeystroke([
                [CKEDITOR.CTRL + 66, "bold"],
                [CKEDITOR.CTRL + 73, "italic"],
                [CKEDITOR.CTRL + 85, "underline"]
            ])
        }
    });
    CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" };
    CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" };
    CKEDITOR.config.coreStyles_underline = { element: "u" };
    CKEDITOR.config.coreStyles_strike = { element: "s", overrides: "strike" };
    CKEDITOR.config.coreStyles_subscript = { element: "sub" };
    CKEDITOR.config.coreStyles_superscript = { element: "sup" };
    (function() {
        var c = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (c +=
            ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
        var c = c + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'),
            c = c + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
            t = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"),
            u = CKEDITOR.addTemplate("button", c);
        CKEDITOR.plugins.add("button", { beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } });
        CKEDITOR.UI_BUTTON = "button";
        CKEDITOR.ui.button = function(a) {
            CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function(b) { b.execCommand(a.command) } });
            this._ = {}
        };
        CKEDITOR.ui.button.handler = { create: function(a) { return new CKEDITOR.ui.button(a) } };
        CKEDITOR.ui.button.prototype = {
            render: function(a, b) {
                function c() {
                    var f = a.mode;
                    f && (f = this.modes[f] ? void 0 !== m[f] ? m[f] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, f = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : f, this.setState(f), this.refresh && this.refresh())
                }
                var n = CKEDITOR.env,
                    p = this._.id = CKEDITOR.tools.getNextId(),
                    g = "",
                    d = this.command,
                    q, k, h;
                this._.editor = a;
                var e = { id: p, button: this, editor: a, focus: function() { CKEDITOR.document.getById(p).focus() }, execute: function() { this.button.click(a) }, attach: function(a) { this.button.attach(a) } },
                    v = CKEDITOR.tools.addFunction(function(a) { if (e.onkey) return a = new CKEDITOR.dom.event(a), !1 !== e.onkey(e, a.getKeystroke()) }),
                    w = CKEDITOR.tools.addFunction(function(a) {
                        var b;
                        e.onfocus && (b = !1 !== e.onfocus(e, new CKEDITOR.dom.event(a)));
                        return b
                    }),
                    r = 0;
                e.clickFn = q = CKEDITOR.tools.addFunction(function() {
                    r && (a.unlockSelection(1), r = 0);
                    e.execute();
                    n.iOS && a.focus()
                });
                if (this.modes) {
                    var m = {};
                    a.on("beforeModeUnload", function() { a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (m[a.mode] = this._.state) }, this);
                    a.on("activeFilterChange",
                        c, this);
                    a.on("mode", c, this);
                    !this.readOnly && a.on("readOnly", c, this)
                } else d && (d = a.getCommand(d)) && (d.on("state", function() { this.setState(d.state) }, this), g += d.state == CKEDITOR.TRISTATE_ON ? "on" : d.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
                if (this.directional) a.on("contentDirChanged", function(b) {
                    var c = CKEDITOR.document.getById(this._.id),
                        d = c.getFirst();
                    b = b.data;
                    b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl");
                    d.setAttribute("style", CKEDITOR.skin.getIconStyle(l,
                        "rtl" == b, this.icon, this.iconOffset))
                }, this);
                d ? (k = a.getCommandKeystroke(d)) && (h = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, k)) : g += "off";
                var l = k = this.name || this.command;
                this.icon && !/\./.test(this.icon) && (l = this.icon, this.icon = null);
                g = {
                    id: p,
                    name: k,
                    iconName: l,
                    label: this.label,
                    cls: this.className || "",
                    state: g,
                    ariaDisabled: "disabled" == g ? "true" : "false",
                    title: this.title + (h ? " (" + h.display + ")" : ""),
                    ariaShortcut: h ? a.lang.common.keyboardShortcut + " " + h.aria : "",
                    titleJs: n.gecko && !n.hc ? "" : (this.title ||
                        "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: v,
                    focusFn: w,
                    clickFn: q,
                    style: CKEDITOR.skin.getIconStyle(l, "rtl" == a.lang.dir, this.icon, this.iconOffset),
                    arrowHtml: this.hasArrow ? t.output() : ""
                };
                u.output(g, b);
                if (this.onRender) this.onRender();
                return e
            },
            setState: function(a) {
                if (this._.state == a) return !1;
                this._.state = a;
                var b = CKEDITOR.document.getById(this._.id);
                return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"),
                    this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(a)) : a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
            },
            getState: function() { return this._.state },
            toFeature: function(a) {
                if (this._.feature) return this._.feature;
                var b = this;
                this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b);
                return this._.feature =
                    b
            }
        };
        CKEDITOR.ui.prototype.addButton = function(a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
    })();
    (function() {
        function D(a) {
            function d() {
                for (var b = f(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || v(a), n = 0; n < e.length; n++) {
                    var g = e[n];
                    if ("/" != g) {
                        "string" == typeof g && (g = e[n] = { name: g });
                        var l, d = g.groups;
                        if (d)
                            for (var h = 0; h < d.length; h++) l = d[h], (l = b[l]) && c(g, l);
                        (l = b[g.name]) && c(g, l)
                    }
                }
                return e
            }

            function f() {
                var b = {},
                    c, e, g;
                for (c in a.ui.items) e = a.ui.items[c], g = e.toolbar || "others", g = g.split(","), e = g[0], g = parseInt(g[1] || -1, 10), b[e] || (b[e] = []), b[e].push({ name: c, order: g });
                for (e in b) b[e] = b[e].sort(function(b,
                    a) { return b.order == a.order ? 0 : 0 > a.order ? -1 : 0 > b.order ? 1 : b.order < a.order ? -1 : 1 });
                return b
            }

            function c(c, e) { if (e.length) { c.items ? c.items.push(a.ui.create("-")) : c.items = []; for (var d; d = e.shift();) d = "string" == typeof d ? d : d.name, b && -1 != CKEDITOR.tools.indexOf(b, d) || (d = a.ui.create(d)) && a.addFeature(d) && c.items.push(d) } }

            function h(b) {
                var a = [],
                    e, d, h;
                for (e = 0; e < b.length; ++e) d = b[e], h = {}, "/" == d ? a.push(d) : CKEDITOR.tools.isArray(d) ? (c(h, CKEDITOR.tools.clone(d)), a.push(h)) : d.items && (c(h, CKEDITOR.tools.clone(d.items)),
                    h.name = d.name, a.push(h));
                return a
            }
            var b = a.config.removeButtons,
                b = b && b.split(","),
                e = a.config.toolbar;
            "string" == typeof e && (e = a.config["toolbar_" + e]);
            return a.toolbar = e ? h(e) : d()
        }

        function v(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, {
                name: "paragraph",
                groups: ["list",
                    "indent", "blocks", "align", "bidi"
                ]
            }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
        }
        var z = function() {
            this.toolbars = [];
            this.focusCommandExecuted = !1
        };
        z.prototype.focus = function() {
            for (var a = 0, d; d = this.toolbars[a++];)
                for (var f = 0, c; c = d.items[f++];)
                    if (c.focus) { c.focus(); return }
        };
        var E = {
            modes: { wysiwyg: 1, source: 1 },
            readOnly: 1,
            exec: function(a) {
                a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() { a.toolbox.focus() },
                    100) : a.toolbox.focus())
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button",
            init: function(a) {
                var d, f = function(c, h) {
                    var b, e = "rtl" == a.lang.dir,
                        k = a.config.toolbarGroupCycling,
                        q = e ? 37 : 39,
                        e = e ? 39 : 37,
                        k = void 0 === k || k;
                    switch (h) {
                        case 9:
                        case CKEDITOR.SHIFT + 9:
                            for (; !b || !b.items.length;)
                                if (b = 9 == h ? (b ? b.next : c.toolbar.next) || a.toolbox.toolbars[0] : (b ? b.previous : c.toolbar.previous) || a.toolbox.toolbars[a.toolbox.toolbars.length - 1], b.items.length)
                                    for (c = b.items[d ? b.items.length - 1 : 0]; c && !c.focus;)(c = d ? c.previous : c.next) ||
                                        (b = 0);
                            c && c.focus();
                            return !1;
                        case q:
                            b = c;
                            do b = b.next, !b && k && (b = c.toolbar.items[0]); while (b && !b.focus);
                            b ? b.focus() : f(c, 9);
                            return !1;
                        case 40:
                            return c.button && c.button.hasArrow ? c.execute() : f(c, 40 == h ? q : e), !1;
                        case e:
                        case 38:
                            b = c;
                            do b = b.previous, !b && k && (b = c.toolbar.items[c.toolbar.items.length - 1]); while (b && !b.focus);
                            b ? b.focus() : (d = 1, f(c, CKEDITOR.SHIFT + 9), d = 0);
                            return !1;
                        case 27:
                            return a.focus(), !1;
                        case 13:
                        case 32:
                            return c.execute(), !1
                    }
                    return !0
                };
                a.on("uiSpace", function(c) {
                    if (c.data.space == a.config.toolbarLocation) {
                        c.removeListener();
                        a.toolbox = new z;
                        var d = CKEDITOR.tools.getNextId(),
                            b = ['\x3cspan id\x3d"', d, '" class\x3d"cke_voice_label"\x3e', a.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + a.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', d, '" onmousedown\x3d"return false;"\x3e'],
                            d = !1 !== a.config.toolbarStartupExpanded,
                            e, k;
                        a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && b.push('\x3cspan class\x3d"cke_toolbox_main"' + (d ? "\x3e" : ' style\x3d"display:none"\x3e'));
                        for (var q = a.toolbox.toolbars, n = D(a), g = n.length, l = 0; l < g; l++) {
                            var r, m = 0,
                                w, p = n[l],
                                v = "/" !== p && ("/" === n[l + 1] || l == g - 1),
                                x;
                            if (p)
                                if (e && (b.push("\x3c/span\x3e"), k = e = 0), "/" === p) b.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');
                                else {
                                    x = p.items || p;
                                    for (var y = 0; y < x.length; y++) {
                                        var t = x[y],
                                            A;
                                        if (t) {
                                            var B = function(c) {
                                                c = c.render(a, b);
                                                u = m.items.push(c) - 1;
                                                0 < u && (c.previous = m.items[u - 1], c.previous.next = c);
                                                c.toolbar = m;
                                                c.onkey = f;
                                                c.onfocus = function() { a.toolbox.focusCommandExecuted || a.focus() }
                                            };
                                            if (t.type == CKEDITOR.UI_SEPARATOR) k =
                                                e && t;
                                            else {
                                                A = !1 !== t.canGroup;
                                                if (!m) {
                                                    r = CKEDITOR.tools.getNextId();
                                                    m = { id: r, items: [] };
                                                    w = p.name && (a.lang.toolbar.toolbarGroups[p.name] || p.name);
                                                    b.push('\x3cspan id\x3d"', r, '" class\x3d"cke_toolbar' + (v ? ' cke_toolbar_last"' : '"'), w ? ' aria-labelledby\x3d"' + r + '_label"' : "", ' role\x3d"toolbar"\x3e');
                                                    w && b.push('\x3cspan id\x3d"', r, '_label" class\x3d"cke_voice_label"\x3e', w, "\x3c/span\x3e");
                                                    b.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');
                                                    var u = q.push(m) - 1;
                                                    0 < u && (m.previous = q[u - 1], m.previous.next =
                                                        m)
                                                }
                                                A ? e || (b.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), e = 1) : e && (b.push("\x3c/span\x3e"), e = 0);
                                                k && (B(k), k = 0);
                                                B(t)
                                            }
                                        }
                                    }
                                    e && (b.push("\x3c/span\x3e"), k = e = 0);
                                    m && b.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                                }
                        }
                        a.config.toolbarCanCollapse && b.push("\x3c/span\x3e");
                        if (a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var C = CKEDITOR.tools.addFunction(function() { a.execCommand("toolbarCollapse") });
                            a.on("destroy", function() { CKEDITOR.tools.removeFunction(C) });
                            a.addCommand("toolbarCollapse", {
                                readOnly: 1,
                                exec: function(b) {
                                    var a = b.ui.space("toolbar_collapser"),
                                        c = a.getPrevious(),
                                        d = b.ui.space("contents"),
                                        e = c.getParent(),
                                        h = parseInt(d.$.style.height, 10),
                                        g = e.$.offsetHeight,
                                        f = a.hasClass("cke_toolbox_collapser_min");
                                    f ? (c.show(), a.removeClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarCollapse)) : (c.hide(), a.addClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarExpand));
                                    a.getFirst().setText(f ? "▲" : "◀");
                                    d.setStyle("height",
                                        h - (e.$.offsetHeight - g) + "px");
                                    b.fire("resize", { outerHeight: b.container.$.offsetHeight, contentsHeight: d.$.offsetHeight, outerWidth: b.container.$.offsetWidth })
                                },
                                modes: { wysiwyg: 1, source: 1 }
                            });
                            a.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                            b.push('\x3ca title\x3d"' + (d ? a.lang.toolbar.toolbarCollapse : a.lang.toolbar.toolbarExpand) + '" id\x3d"' + a.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                            d || b.push(" cke_toolbox_collapser_min");
                            b.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + C + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                        }
                        b.push("\x3c/span\x3e");
                        c.data.html += b.join("")
                    }
                });
                a.on("destroy", function() {
                    if (this.toolbox) {
                        var a, d = 0,
                            b, e, f;
                        for (a = this.toolbox.toolbars; d < a.length; d++)
                            for (e = a[d].items, b = 0; b < e.length; b++) f = e[b], f.clickFn && CKEDITOR.tools.removeFunction(f.clickFn), f.keyDownFn && CKEDITOR.tools.removeFunction(f.keyDownFn)
                    }
                });
                a.on("uiReady", function() {
                    var c = a.ui.space("toolbox");
                    c && a.focusManager.add(c,
                        1)
                });
                a.addCommand("toolbarFocus", E);
                a.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
                a.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                a.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function() { return { render: function(a, d) { d.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
            }
        });
        CKEDITOR.ui.prototype.addToolbarGroup = function(a, d, f) {
            var c = v(this.editor),
                h = 0 === d,
                b = { name: a };
            if (f) {
                if (f = CKEDITOR.tools.search(c, function(a) { return a.name == f })) {
                    !f.groups && (f.groups = []);
                    if (d &&
                        (d = CKEDITOR.tools.indexOf(f.groups, d), 0 <= d)) { f.groups.splice(d + 1, 0, a); return } h ? f.groups.splice(0, 0, a) : f.groups.push(a);
                    return
                }
                d = null
            }
            d && (d = CKEDITOR.tools.indexOf(c, function(a) { return a.name == d }));
            h ? c.splice(0, 0, a) : "number" == typeof d ? c.splice(d + 1, 0, b) : c.push(a)
        }
    })();
    CKEDITOR.UI_SEPARATOR = "separator";
    CKEDITOR.config.toolbarLocation = "top";
    CKEDITOR.plugins.add("notification", {
        requires: "toolbar",
        init: function(b) {
            function a(b) {
                var a = new CKEDITOR.dom.element("div");
                a.setStyles({ position: "fixed", "margin-left": "-9999px" });
                a.setAttributes({ "aria-live": "assertive", "aria-atomic": "true" });
                a.setText(b);
                CKEDITOR.document.getBody().append(a);
                setTimeout(function() { a.remove() }, 100)
            }
            b._.notificationArea = new Area(b);
            b.showNotification = function(a, d, e) {
                var g, m;
                "progress" == d ? g = e : m = e;
                a = new CKEDITOR.plugins.notification(b, { message: a, type: d, progress: g, duration: m });
                a.show();
                return a
            };
            b.on("key", function(c) {
                if (27 == c.data.keyCode) {
                    var d = b._.notificationArea.notifications;
                    d.length && (a(b.lang.notification.closed), d[d.length - 1].hide(), c.cancel())
                }
            })
        }
    });

    function Notification(b, a) {
        CKEDITOR.tools.extend(this, a, { editor: b, id: "cke-" + CKEDITOR.tools.getUniqueId(), area: b._.notificationArea });
        a.type || (this.type = "info");
        this.element = this._createElement();
        b.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)
    }
    Notification.prototype = {
        show: function() {!1 !== this.editor.fire("notificationShow", { notification: this }) && (this.area.add(this), this._hideAfterTimeout()) },
        update: function(b) {
            var a = !0;
            !1 === this.editor.fire("notificationUpdate", { notification: this, options: b }) && (a = !1);
            var c = this.element,
                d = c.findOne(".cke_notification_message"),
                e = c.findOne(".cke_notification_progress"),
                g = b.type;
            c.removeAttribute("role");
            b.progress && "progress" != this.type && (g = "progress");
            g && (c.removeClass(this._getClass()), c.removeAttribute("aria-label"),
                this.type = g, c.addClass(this._getClass()), c.setAttribute("aria-label", this.type), "progress" != this.type || e ? "progress" != this.type && e && e.remove() : (e = this._createProgressElement(), e.insertBefore(d)));
            void 0 !== b.message && (this.message = b.message, d.setHtml(this.message));
            void 0 !== b.progress && (this.progress = b.progress, e && e.setStyle("width", this._getPercentageProgress()));
            a && b.important && (c.setAttribute("role", "alert"), this.isVisible() || this.area.add(this));
            this.duration = b.duration;
            this._hideAfterTimeout()
        },
        hide: function() {!1 !== this.editor.fire("notificationHide", { notification: this }) && this.area.remove(this) },
        isVisible: function() { return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this) },
        _createElement: function() {
            var b = this,
                a, c, d = this.editor.lang.common.close;
            a = new CKEDITOR.dom.element("div");
            a.addClass("cke_notification");
            a.addClass(this._getClass());
            a.setAttributes({ id: this.id, role: "alert", "aria-label": this.type });
            "progress" == this.type && a.append(this._createProgressElement());
            c = new CKEDITOR.dom.element("p");
            c.addClass("cke_notification_message");
            c.setHtml(this.message);
            a.append(c);
            c = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' + d + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e');
            a.append(c);
            c.on("click", function() {
                b.editor.focus();
                b.hide()
            });
            return a
        },
        _getClass: function() { return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type },
        _createProgressElement: function() {
            var b =
                new CKEDITOR.dom.element("span");
            b.addClass("cke_notification_progress");
            b.setStyle("width", this._getPercentageProgress());
            return b
        },
        _getPercentageProgress: function() { return Math.round(100 * (this.progress || 0)) + "%" },
        _hideAfterTimeout: function() {
            var b = this,
                a;
            this._hideTimeoutId && clearTimeout(this._hideTimeoutId);
            if ("number" == typeof this.duration) a = this.duration;
            else if ("info" == this.type || "success" == this.type) a = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration :
                5E3;
            a && (b._hideTimeoutId = setTimeout(function() { b.hide() }, a))
        }
    };

    function Area(b) {
        var a = this;
        this.editor = b;
        this.notifications = [];
        this.element = this._createElement();
        this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this);
        this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this);
        b.on("destroy", function() {
            a._removeListeners();
            a.element.remove()
        })
    }
    Area.prototype = {
        add: function(b) {
            this.notifications.push(b);
            this.element.append(b.element);
            1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners());
            this._layout()
        },
        remove: function(b) {
            var a = CKEDITOR.tools.indexOf(this.notifications, b);
            0 > a || (this.notifications.splice(a, 1), b.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
        },
        _createElement: function() {
            var b = this.editor,
                a = b.config,
                c = new CKEDITOR.dom.element("div");
            c.addClass("cke_notifications_area");
            c.setAttribute("id", "cke_notifications_area_" + b.name);
            c.setStyle("z-index", a.baseFloatZIndex - 2);
            return c
        },
        _attachListeners: function() {
            var b = CKEDITOR.document.getWindow(),
                a = this.editor;
            b.on("scroll", this._uiBuffer.input);
            b.on("resize", this._uiBuffer.input);
            a.on("change", this._changeBuffer.input);
            a.on("floatingSpaceLayout", this._layout, this, null, 20);
            a.on("blur", this._layout, this, null, 20)
        },
        _removeListeners: function() {
            var b = CKEDITOR.document.getWindow(),
                a = this.editor;
            b.removeListener("scroll", this._uiBuffer.input);
            b.removeListener("resize", this._uiBuffer.input);
            a.removeListener("change", this._changeBuffer.input);
            a.removeListener("floatingSpaceLayout", this._layout);
            a.removeListener("blur", this._layout)
        },
        _layout: function() {
            function b() { a.setStyle("left", k(n + d.width - f - h)) }
            var a = this.element,
                c = this.editor,
                d = c.ui.contentsElement.getClientRect(),
                e = c.ui.contentsElement.getDocumentPosition(),
                c = c.ui.space("top"),
                g = c.getClientRect(),
                m = a.getClientRect(),
                l, f = this._notificationWidth,
                h = this._notificationMargin;
            l = CKEDITOR.document.getWindow();
            var p = l.getScrollPosition(),
                q = l.getViewPaneSize(),
                r = CKEDITOR.document.getBody(),
                t = r.getDocumentPosition(),
                k = CKEDITOR.tools.cssLength;
            f && h || (l = this.element.getChild(0), f = this._notificationWidth = l.getClientRect().width, h = this._notificationMargin = parseInt(l.getComputedStyle("margin-left"), 10) + parseInt(l.getComputedStyle("margin-right"), 10));
            c.isVisible() && g.bottom > d.top && g.bottom < d.bottom - m.height ? a.setStyles({ position: "fixed", top: k(g.bottom) }) :
                0 < d.top ? a.setStyles({ position: "absolute", top: k(e.y) }) : e.y + d.height - m.height > p.y ? a.setStyles({ position: "fixed", top: 0 }) : a.setStyles({ position: "absolute", top: k(e.y + d.height - m.height) });
            var n = "fixed" == a.getStyle("position") ? d.left : "static" != r.getComputedStyle("position") ? e.x - t.x : e.x;
            d.width < f + h ? e.x + f + h > p.x + q.width ? b() : a.setStyle("left", k(n)) : e.x + f + h > p.x + q.width ? a.setStyle("left", k(n)) : e.x + d.width / 2 + f / 2 + h > p.x + q.width ? a.setStyle("left", k(n - e.x + p.x + q.width - f - h)) : 0 > d.left + d.width - f - h ? b() : 0 > d.left + d.width /
                2 - f / 2 ? a.setStyle("left", k(n - e.x + p.x)) : a.setStyle("left", k(n + d.width / 2 - f / 2 - h / 2))
        }
    };
    CKEDITOR.plugins.notification = Notification;
    (function() {
        function q(b, a, c) {
            a.type || (a.type = "auto");
            if (c && !1 === b.fire("beforePaste", a) || !a.dataValue && a.dataTransfer.isEmpty()) return !1;
            a.dataValue || (a.dataValue = "");
            if (CKEDITOR.env.gecko && "drop" == a.method && b.toolbox) b.once("afterPaste", function() { b.toolbox.focus() });
            return b.fire("paste", a)
        }

        function y(b) {
            function a() {
                var a = b.editable();
                if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
                    var c = function(a) {
                        b.readOnly && "cut" == a.name || m.initPasteDataTransfer(a, b);
                        a.data.preventDefault()
                    };
                    a.on("copy",
                        c);
                    a.on("cut", c);
                    a.on("cut", function() { b.readOnly || b.extractSelectedHtml() }, null, null, 999)
                }
                a.on(m.mainPasteEvent, function(b) { "beforepaste" == m.mainPasteEvent && n || t(b) });
                "beforepaste" == m.mainPasteEvent && (a.on("paste", function(b) { u || (f(), b.data.preventDefault(), t(b), e("paste")) }), a.on("contextmenu", g, null, null, 0), a.on("beforepaste", function(b) {!b.data || b.data.$.ctrlKey || b.data.$.shiftKey || g() }, null, null, 0));
                a.on("beforecut", function() {!n && h(b) });
                var d;
                a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(),
                    "mouseup",
                    function() { d = setTimeout(function() { r() }, 0) });
                b.on("destroy", function() { clearTimeout(d) });
                a.on("keyup", r)
            }

            function c(a) {
                return {
                    type: a,
                    canUndo: "cut" == a,
                    startDisabled: !0,
                    fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67,
                    exec: function() {
                        "cut" == this.type && h();
                        var a;
                        var c = this.type;
                        if (CKEDITOR.env.ie) a = e(c);
                        else try { a = b.document.$.execCommand(c, !1, null) } catch (d) { a = !1 } a || b.showNotification(b.lang.clipboard[this.type + "Error"]);
                        return a
                    }
                }
            }

            function d() {
                return {
                    canUndo: !1,
                    async: !0,
                    fakeKeystroke: CKEDITOR.CTRL +
                        86,
                    exec: function(b, a) {
                        function c(a, g) {
                            g = "undefined" !== typeof g ? g : !0;
                            a ? (a.method = "paste", a.dataTransfer || (a.dataTransfer = m.initPasteDataTransfer()), q(b, a, g)) : d && b.showNotification(l, "info", b.config.clipboard_notificationDuration);
                            b.fire("afterCommandExec", { name: "paste", command: e, returnValue: !!a })
                        }
                        a = "undefined" !== typeof a && null !== a ? a : {};
                        var e = this,
                            d = "undefined" !== typeof a.notification ? a.notification : !0,
                            g = a.type,
                            h = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard, b.getCommandKeystroke(this)),
                            l =
                            "string" === typeof d ? d : b.lang.clipboard.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + h.aria + '"\x3e' + h.display + "\x3c/kbd\x3e"),
                            h = "string" === typeof a ? a : a.dataValue;
                        g ? b._.nextPasteType = g : delete b._.nextPasteType;
                        "string" === typeof h ? c({ dataValue: h }) : b.getClipboardData(c)
                    }
                }
            }

            function f() {
                u = 1;
                setTimeout(function() { u = 0 }, 100)
            }

            function g() {
                n = 1;
                setTimeout(function() { n = 0 }, 10)
            }

            function e(a) {
                var c = b.document,
                    d = c.getBody(),
                    e = !1,
                    g = function() { e = !0 };
                d.on(a, g);
                7 < CKEDITOR.env.version ? c.$.execCommand(a) : c.$.selection.createRange().execCommand(a);
                d.removeListener(a, g);
                return e
            }

            function h() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var a = b.getSelection(),
                        c, d, e;
                    a.getType() == CKEDITOR.SELECTION_ELEMENT && (c = a.getSelectedElement()) && (d = a.getRanges()[0], e = b.document.createText(""), e.insertBefore(c), d.setStartBefore(e), d.setEndAfter(c), a.selectRanges([d]), setTimeout(function() { c.getParent() && (e.remove(), a.selectElement(c)) }, 0))
                }
            }

            function k(a, c) {
                var d = b.document,
                    e = b.editable(),
                    g = function(b) { b.cancel() },
                    h;
                if (!d.getById("cke_pastebin")) {
                    var l = b.getSelection(),
                        t = l.createBookmarks();
                    CKEDITOR.env.ie && l.root.fire("selectionchange");
                    var f = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !e.is("body") || CKEDITOR.env.ie ? "div" : "body", d);
                    f.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" });
                    var k = 0,
                        d = d.getWindow();
                    CKEDITOR.env.webkit ? (e.append(f), f.addClass("cke_editable"), e.is("body") || (k = "static" != e.getComputedStyle("position") ? e : CKEDITOR.dom.element.get(e.$.offsetParent), k = k.getDocumentPosition().y)) : e.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(f);
                    f.setStyles({ position: "absolute", top: d.getScrollPosition().y - k + 10 + "px", width: "1px", height: Math.max(1, d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 });
                    CKEDITOR.env.safari && f.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text"));
                    (k = f.getParent().isReadOnly()) ? (f.setOpacity(0), f.setAttribute("contenteditable", !0)) : f.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px");
                    b.on("selectionChange", g, null, null, 0);
                    if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) h =
                        e.once("blur", g, null, null, -100);
                    k && f.focus();
                    k = new CKEDITOR.dom.range(f);
                    k.selectNodeContents(f);
                    var r = k.select();
                    CKEDITOR.env.ie && (h = e.once("blur", function() { b.lockSelection(r) }));
                    var p = CKEDITOR.document.getWindow().getScrollPosition().y;
                    setTimeout(function() {
                        CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = p);
                        h && h.removeListener();
                        CKEDITOR.env.ie && e.focus();
                        l.selectBookmarks(t);
                        f.remove();
                        var a;
                        CKEDITOR.env.webkit && (a = f.getFirst()) && a.is && a.hasClass("Apple-style-span") && (f = a);
                        b.removeListener("selectionChange",
                            g);
                        c(f.getHtml())
                    }, 0)
                }
            }

            function v() {
                if ("paste" == m.mainPasteEvent) return b.fire("beforePaste", { type: "auto", method: "paste" }), !1;
                b.focus();
                f();
                var a = b.focusManager;
                a.lock();
                if (b.editable().fire(m.mainPasteEvent) && !e("paste")) return a.unlock(), !1;
                a.unlock();
                return !0
            }

            function l(a) {
                if ("wysiwyg" == b.mode) switch (a.data.keyCode) {
                    case CKEDITOR.CTRL + 86:
                    case CKEDITOR.SHIFT + 45:
                        a = b.editable();
                        f();
                        "paste" == m.mainPasteEvent && a.fire("beforepaste");
                        break;
                    case CKEDITOR.CTRL + 88:
                    case CKEDITOR.SHIFT + 46:
                        b.fire("saveSnapshot"),
                            setTimeout(function() { b.fire("saveSnapshot") }, 50)
                }
            }

            function t(a) {
                var c = { type: "auto", method: "paste", dataTransfer: m.initPasteDataTransfer(a) };
                c.dataTransfer.cacheData();
                var e = !1 !== b.fire("beforePaste", c);
                e && m.canClipboardApiBeTrusted(c.dataTransfer, b) ? (a.data.preventDefault(), setTimeout(function() { q(b, c) }, 0)) : k(a, function(a) {
                    c.dataValue = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                    e && q(b, c)
                })
            }

            function r() {
                if ("wysiwyg" == b.mode) {
                    var a = p("paste");
                    b.getCommand("cut").setState(p("cut"));
                    b.getCommand("copy").setState(p("copy"));
                    b.getCommand("paste").setState(a);
                    b.fire("pasteState", a)
                }
            }

            function p(a) {
                if (w && a in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED;
                if ("paste" == a) return CKEDITOR.TRISTATE_OFF;
                a = b.getSelection();
                var c = a.getRanges();
                return a.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
            }
            var m = CKEDITOR.plugins.clipboard,
                n = 0,
                u = 0,
                w = 0;
            (function() {
                b.on("key", l);
                b.on("contentDom", a);
                b.on("selectionChange", function(b) {
                    w = b.data.selection.getRanges()[0].checkReadOnly();
                    r()
                });
                b.contextMenu && b.contextMenu.addListener(function(b, a) { w = a.getRanges()[0].checkReadOnly(); return { cut: p("cut"), copy: p("copy"), paste: p("paste") } })
            })();
            (function() {
                function a(c, e, d, g, h) {
                    var l = b.lang.clipboard[e];
                    b.addCommand(e, d);
                    b.ui.addButton && b.ui.addButton(c, { label: l, command: e, toolbar: "clipboard," + g });
                    b.addMenuItems && b.addMenuItem(e, { label: l, command: e, group: "clipboard", order: h })
                }
                a("Cut", "cut", c("cut"), 10, 1);
                a("Copy", "copy", c("copy"), 20, 4);
                a("Paste", "paste", d(), 30, 8)
            })();
            b.getClipboardData =
                function(a, c) {
                    function e(b) {
                        b.removeListener();
                        b.cancel();
                        c(b.data)
                    }
                    c || (c = a, a = null);
                    b.on("paste", e, null, null, 0);
                    !1 === v() && (b.removeListener("paste", e), c(null))
                }
        }

        function z(b) {
            if (CKEDITOR.env.webkit) { if (!b.match(/^[^<]*$/g) && !b.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) { if (!b.match(/^([^<]|<br( ?\/)?>)*$/gi) && !b.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!b.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html";
            return "htmlifiedtext"
        }

        function A(b, a) {
            function c(b) { return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(b / 2)) + (1 == b % 2 ? "\x3cbr\x3e" : "") } a = a.replace(/\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e");
            a = a.replace(/<\/?[A-Z]+>/g, function(b) { return b.toLowerCase() });
            if (a.match(/^[^<]$/)) return a;
            CKEDITOR.env.webkit && -1 < a.indexOf("\x3cdiv\x3e") && (a = a.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"),
                a.match(/<div>(<br>|)<\/div>/) && (a = "\x3cp\x3e" + a.replace(/(<div>(<br>|)<\/div>)+/g, function(b) { return c(b.split("\x3c/div\x3e\x3cdiv\x3e").length + 1) }) + "\x3c/p\x3e"), a = a.replace(/<\/div><div>/g, "\x3cbr\x3e"), a = a.replace(/<\/?div>/g, ""));
            CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (a = a.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < a.indexOf("\x3cbr\x3e\x3cbr\x3e") && (a = "\x3cp\x3e" + a.replace(/(<br>){2,}/g, function(b) { return c(b.length / 4) }) + "\x3c/p\x3e"));
            return B(b, a)
        }

        function C() {
            function b() {
                var b = {},
                    a;
                for (a in CKEDITOR.dtd) "$" != a.charAt(0) && "div" != a && "span" != a && (b[a] = 1);
                return b
            }
            var a = {};
            return { get: function(c) { return "plain-text" == c ? a.plainText || (a.plainText = new CKEDITOR.filter("br")) : "semantic-content" == c ? ((c = a.semanticContent) || (c = new CKEDITOR.filter, c.allow({ $1: { elements: b(), attributes: !0, styles: !1, classes: !1 } }), c = a.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null } }
        }

        function x(b, a, c) {
            a = CKEDITOR.htmlParser.fragment.fromHtml(a);
            var d = new CKEDITOR.htmlParser.basicWriter;
            c.applyTo(a, !0, !1,
                b.activeEnterMode);
            a.writeHtml(d);
            return d.getHtml()
        }

        function B(b, a) { b.enterMode == CKEDITOR.ENTER_BR ? a = a.replace(/(<\/p><p>)+/g, function(b) { return CKEDITOR.tools.repeat("\x3cbr\x3e", b.length / 7 * 2) }).replace(/<\/?p>/g, "") : b.enterMode == CKEDITOR.ENTER_DIV && (a = a.replace(/<(\/)?p>/g, "\x3c$1div\x3e")); return a }

        function D(b) {
            b.data.preventDefault();
            b.data.$.dataTransfer.dropEffect = "none"
        }

        function E(b) {
            var a = CKEDITOR.plugins.clipboard;
            b.on("contentDom", function() {
                function c(a, c, e) {
                    c.select();
                    q(b, {
                        dataTransfer: e,
                        method: "drop"
                    }, 1);
                    e.sourceEditor.fire("saveSnapshot");
                    e.sourceEditor.editable().extractHtmlFromRange(a);
                    e.sourceEditor.getSelection().selectRanges([a]);
                    e.sourceEditor.fire("saveSnapshot")
                }

                function d(c, e) {
                    c.select();
                    q(b, { dataTransfer: e, method: "drop" }, 1);
                    a.resetDragDataTransfer()
                }

                function f(a, c, e) {
                    var g = { $: a.data.$, target: a.data.getTarget() };
                    c && (g.dragRange = c);
                    e && (g.dropRange = e);
                    !1 === b.fire(a.name, g) && a.data.preventDefault()
                }

                function g(b) { b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); return b.getChildCount() }
                var e = b.editable(),
                    h = CKEDITOR.plugins.clipboard.getDropTarget(b),
                    k = b.ui.space("top"),
                    v = b.ui.space("bottom");
                a.preventDefaultDropOnElement(k);
                a.preventDefaultDropOnElement(v);
                e.attachListener(h, "dragstart", f);
                e.attachListener(b, "dragstart", a.resetDragDataTransfer, a, null, 1);
                e.attachListener(b, "dragstart", function(c) { a.initDragDataTransfer(c, b) }, null, null, 2);
                e.attachListener(b, "dragstart", function() {
                    var c = a.dragRange = b.getSelection().getRanges()[0];
                    CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (a.dragStartContainerChildCount =
                        c ? g(c.startContainer) : null, a.dragEndContainerChildCount = c ? g(c.endContainer) : null)
                }, null, null, 100);
                e.attachListener(h, "dragend", f);
                e.attachListener(b, "dragend", a.initDragDataTransfer, a, null, 1);
                e.attachListener(b, "dragend", a.resetDragDataTransfer, a, null, 100);
                e.attachListener(h, "dragover", function(b) {
                    if (CKEDITOR.env.edge) b.data.preventDefault();
                    else {
                        var a = b.data.getTarget();
                        a && a.is && a.is("html") ? b.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && b.data.$.dataTransfer.types.contains("Files") &&
                            b.data.preventDefault()
                    }
                });
                e.attachListener(h, "drop", function(c) {
                    if (!c.data.$.defaultPrevented) {
                        c.data.preventDefault();
                        var e = c.data.getTarget();
                        if (!e.isReadOnly() || e.type == CKEDITOR.NODE_ELEMENT && e.is("html")) {
                            var e = a.getRangeAtDropPosition(c, b),
                                g = a.dragRange;
                            e && f(c, g, e)
                        }
                    }
                }, null, null, 9999);
                e.attachListener(b, "drop", a.initDragDataTransfer, a, null, 1);
                e.attachListener(b, "drop", function(e) {
                    if (e = e.data) {
                        var g = e.dropRange,
                            h = e.dragRange,
                            f = e.dataTransfer;
                        f.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ?
                            setTimeout(function() { a.internalDrop(h, g, f, b) }, 0) : f.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c(h, g, f) : d(g, f)
                    }
                }, null, null, 9999)
            })
        }
        CKEDITOR.plugins.add("clipboard", {
            requires: "notification",
            init: function(b) {
                var a, c = C();
                b.config.forcePasteAsPlainText ? a = "plain-text" : b.config.pasteFilter ? a = b.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in b.config || (a = "semantic-content");
                b.pasteFilter = c.get(a);
                y(b);
                E(b);
                if (CKEDITOR.env.gecko) {
                    var d = ["image/png", "image/jpeg", "image/gif"],
                        f;
                    b.on("paste",
                        function(a) {
                            var c = a.data,
                                h = c.dataTransfer;
                            if (!c.dataValue && "paste" == c.method && h && 1 == h.getFilesCount() && f != h.id && (h = h.getFile(0), -1 != CKEDITOR.tools.indexOf(d, h.type))) {
                                var k = new FileReader;
                                k.addEventListener("load", function() {
                                    a.data.dataValue = '\x3cimg src\x3d"' + k.result + '" /\x3e';
                                    b.fire("paste", a.data)
                                }, !1);
                                k.addEventListener("abort", function() { b.fire("paste", a.data) }, !1);
                                k.addEventListener("error", function() { b.fire("paste", a.data) }, !1);
                                k.readAsDataURL(h);
                                f = c.dataTransfer.id;
                                a.stop()
                            }
                        }, null, null, 1)
                }
                b.on("paste",
                    function(a) {
                        a.data.dataTransfer || (a.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer);
                        if (!a.data.dataValue) {
                            var c = a.data.dataTransfer,
                                d = c.getData("text/html");
                            if (d) a.data.dataValue = d, a.data.type = "html";
                            else if (d = c.getData("text/plain")) a.data.dataValue = b.editable().transformPlainTextToHtml(d), a.data.type = "text"
                        }
                    }, null, null, 1);
                b.on("paste", function(b) {
                        var a = b.data.dataValue,
                            c = CKEDITOR.dtd.$block; - 1 < a.indexOf("Apple-") && (a = a.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi,
                            " "), "html" != b.data.type && (a = a.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) { return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;") })), -1 < a.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (b.data.startsWithEOL = 1, b.data.preSniffing = "html", a = a.replace(/<br class="Apple-interchange-newline">/, "")), a = a.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
                        if (a.match(/^<[^<]+cke_(editable|contents)/i)) {
                            var d, f, l = new CKEDITOR.dom.element("div");
                            for (l.setHtml(a); 1 == l.getChildCount() &&
                                (d = l.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));) l = f = d;
                            f && (a = f.getHtml().replace(/<br>$/i, ""))
                        }
                        CKEDITOR.env.ie ? a = a.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(a, e) { return e.toLowerCase() in c ? (b.data.preSniffing = "html", "\x3c" + e) : a }) : CKEDITOR.env.webkit ? a = a.replace(/<\/(\w+)><div><br><\/div>$/, function(a, e) { return e in c ? (b.data.endsWithEOL = 1, "\x3c/" + e + "\x3e") : a }) : CKEDITOR.env.gecko && (a = a.replace(/(\s)<br>$/, "$1"));
                        b.data.dataValue = a
                    }, null,
                    null, 3);
                b.on("paste", function(a) {
                    a = a.data;
                    var e = b._.nextPasteType || a.type,
                        d = a.dataValue,
                        f, n = b.config.clipboard_defaultContentType || "html",
                        l = a.dataTransfer.getTransferType(b);
                    f = "html" == e || "html" == a.preSniffing ? "html" : z(d);
                    delete b._.nextPasteType;
                    "htmlifiedtext" == f && (d = A(b.config, d));
                    "text" == e && "html" == f ? d = x(b, d, c.get("plain-text")) : l == CKEDITOR.DATA_TRANSFER_EXTERNAL && b.pasteFilter && !a.dontFilter && (d = x(b, d, b.pasteFilter));
                    a.startsWithEOL && (d = '\x3cbr data-cke-eol\x3d"1"\x3e' + d);
                    a.endsWithEOL && (d += '\x3cbr data-cke-eol\x3d"1"\x3e');
                    "auto" == e && (e = "html" == f || "html" == n ? "html" : "text");
                    a.type = e;
                    a.dataValue = d;
                    delete a.preSniffing;
                    delete a.startsWithEOL;
                    delete a.endsWithEOL
                }, null, null, 6);
                b.on("paste", function(a) {
                    a = a.data;
                    a.dataValue && (b.insertHtml(a.dataValue, a.type, a.range), setTimeout(function() { b.fire("afterPaste") }, 0))
                }, null, null, 1E3)
            }
        });
        CKEDITOR.plugins.clipboard = {
            isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
            isCustomDataTypesSupported: !CKEDITOR.env.ie,
            isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version,
            mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
            canClipboardApiBeTrusted: function(b, a) { return b.getTransferType(a) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !b.isEmpty() || CKEDITOR.env.gecko && (b.getData("text/html") || b.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS ? !0 : !1 },
            getDropTarget: function(b) { var a = b.editable(); return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || a.isInline() ? a : b.document },
            fixSplitNodesAfterDrop: function(b,
                a, c, d) {
                function f(b, c, d) {
                    var f = b;
                    f.type == CKEDITOR.NODE_TEXT && (f = b.getParent());
                    if (f.equals(c) && d != c.getChildCount()) return b = a.startContainer.getChild(a.startOffset - 1), c = a.startContainer.getChild(a.startOffset), b && b.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = b.getLength(), b.setText(b.getText() + c.getText()), c.remove(), a.setStart(b, d), a.collapse(!0)), !0
                }
                var g = a.startContainer;
                "number" == typeof d && "number" == typeof c && g.type == CKEDITOR.NODE_ELEMENT && (f(b.startContainer, g, c) || f(b.endContainer,
                    g, d))
            },
            isDropRangeAffectedByDragRange: function(b, a) {
                var c = a.startContainer,
                    d = a.endOffset;
                return b.endContainer.equals(c) && b.endOffset <= d || b.startContainer.getParent().equals(c) && b.startContainer.getIndex() < d || b.endContainer.getParent().equals(c) && b.endContainer.getIndex() < d ? !0 : !1
            },
            internalDrop: function(b, a, c, d) {
                var f = CKEDITOR.plugins.clipboard,
                    g = d.editable(),
                    e, h;
                d.fire("saveSnapshot");
                d.fire("lockSnapshot", { dontUpdate: 1 });
                CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, a, f.dragStartContainerChildCount,
                    f.dragEndContainerChildCount);
                (h = this.isDropRangeAffectedByDragRange(b, a)) || (e = b.createBookmark(!1));
                f = a.clone().createBookmark(!1);
                h && (e = b.createBookmark(!1));
                b = e.startNode;
                a = e.endNode;
                h = f.startNode;
                a && b.getPosition(h) & CKEDITOR.POSITION_PRECEDING && a.getPosition(h) & CKEDITOR.POSITION_FOLLOWING && h.insertBefore(b);
                b = d.createRange();
                b.moveToBookmark(e);
                g.extractHtmlFromRange(b, 1);
                a = d.createRange();
                a.moveToBookmark(f);
                q(d, { dataTransfer: c, method: "drop", range: a }, 1);
                d.fire("unlockSnapshot")
            },
            getRangeAtDropPosition: function(b,
                a) {
                var c = b.data.$,
                    d = c.clientX,
                    f = c.clientY,
                    g = a.getSelection(!0).getRanges()[0],
                    e = a.createRange();
                if (b.data.testRange) return b.data.testRange;
                if (document.caretRangeFromPoint && a.document.$.caretRangeFromPoint(d, f)) c = a.document.$.caretRangeFromPoint(d, f), e.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), e.collapse(!0);
                else if (c.rangeParent) e.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), e.collapse(!0);
                else {
                    if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && g && a.editable().hasFocus) return g;
                    if (document.body.createTextRange) {
                        a.focus();
                        c = a.document.getBody().$.createTextRange();
                        try {
                            for (var h = !1, k = 0; 20 > k && !h; k++) {
                                if (!h) try { c.moveToPoint(d, f - k), h = !0 } catch (n) {}
                                if (!h) try { c.moveToPoint(d, f + k), h = !0 } catch (l) {}
                            }
                            if (h) {
                                var t = "cke-temp-" + (new Date).getTime();
                                c.pasteHTML('\x3cspan id\x3d"' + t + '"\x3e​\x3c/span\x3e');
                                var r = a.document.getById(t);
                                e.moveToPosition(r, CKEDITOR.POSITION_BEFORE_START);
                                r.remove()
                            } else {
                                var p = a.document.$.elementFromPoint(d, f),
                                    m = new CKEDITOR.dom.element(p),
                                    q;
                                if (m.equals(a.editable()) ||
                                    "html" == m.getName()) return g && g.startContainer && !g.startContainer.equals(a.editable()) ? g : null;
                                q = m.getClientRect();
                                d < q.left ? e.setStartAt(m, CKEDITOR.POSITION_AFTER_START) : e.setStartAt(m, CKEDITOR.POSITION_BEFORE_END);
                                e.collapse(!0)
                            }
                        } catch (u) { return null }
                    } else return null
                }
                return e
            },
            initDragDataTransfer: function(b, a) {
                var c = b.data.$ ? b.data.$.dataTransfer : null,
                    d = new this.dataTransfer(c, a);
                c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData =
                    d;
                b.data.dataTransfer = d
            },
            resetDragDataTransfer: function() { this.dragData = null },
            initPasteDataTransfer: function(b, a) {
                if (this.isCustomCopyCutSupported) {
                    if (b && b.data && b.data.$) {
                        var c = new this.dataTransfer(b.data.$.clipboardData, a);
                        this.copyCutData && c.id == this.copyCutData.id ? (c = this.copyCutData, c.$ = b.data.$.clipboardData) : this.copyCutData = c;
                        return c
                    }
                    return new this.dataTransfer(null, a)
                }
                return new this.dataTransfer(CKEDITOR.env.edge && b && b.data.$ && b.data.$.clipboardData || null, a)
            },
            preventDefaultDropOnElement: function(b) {
                b &&
                    b.on("dragover", D)
            }
        };
        var n = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text";
        CKEDITOR.plugins.clipboard.dataTransfer = function(b, a) {
            b && (this.$ = b);
            this._ = { metaRegExp: /^<meta.*?>/i, bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g, data: {}, files: [], normalizeType: function(a) { a = a.toLowerCase(); return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a } };
            this.id = this.getData(n);
            this.id || (this.id = "Text" == n ? "" : "cke-" + CKEDITOR.tools.getUniqueId());
            if ("Text" != n) try { this.$.setData(n, this.id) } catch (c) {} a && (this.sourceEditor = a, this.setData("text/html", a.getSelectedHtml(1)), "Text" == n || this.getData("text/plain") || this.setData("text/plain", a.getSelection().getSelectedText()))
        };
        CKEDITOR.DATA_TRANSFER_INTERNAL = 1;
        CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2;
        CKEDITOR.DATA_TRANSFER_EXTERNAL = 3;
        CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
            getData: function(b, a) {
                b = this._.normalizeType(b);
                var c = this._.data[b],
                    d;
                if (void 0 === c || null === c || "" === c) try { c = this.$.getData(b) } catch (f) {}
                if (void 0 ===
                    c || null === c || "" === c) c = "";
                "text/html" != b || a ? "Text" == b && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == c.substring(0, 7) && (c = "") : (c = c.replace(this._.metaRegExp, ""), (d = this._.bodyRegExp.exec(c)) && d.length && (c = d[1], c = c.replace(this._.fragmentRegExp, "")));
                "string" === typeof c && (d = c.indexOf("\x3c/html\x3e"), c = -1 !== d ? c.substring(0, d + 7) : c);
                return c
            },
            setData: function(b, a) {
                b = this._.normalizeType(b);
                this._.data[b] = a;
                if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == b || "Text" == b) {
                    "Text" == n &&
                        "Text" == b && (this.id = a);
                    try { this.$.setData(b, a) } catch (c) {}
                }
            },
            getTransferType: function(b) { return this.sourceEditor ? this.sourceEditor == b ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL },
            cacheData: function() {
                function b(b) {
                    b = a._.normalizeType(b);
                    var c = a.getData(b, !0);
                    c && (a._.data[b] = c)
                }
                if (this.$) {
                    var a = this,
                        c, d;
                    if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                        if (this.$.types)
                            for (c = 0; c < this.$.types.length; c++) b(this.$.types[c])
                    } else b("Text"),
                        b("URL");
                    d = this._getImageFromClipboard();
                    if (this.$ && this.$.files || d) {
                        this._.files = [];
                        if (this.$.files && this.$.files.length)
                            for (c = 0; c < this.$.files.length; c++) this._.files.push(this.$.files[c]);
                        0 === this._.files.length && d && this._.files.push(d)
                    }
                }
            },
            getFilesCount: function() { return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0 },
            getFile: function(b) {
                return this._.files.length ? this._.files[b] : this.$ && this.$.files && this.$.files.length ?
                    this.$.files[b] : 0 === b ? this._getImageFromClipboard() : void 0
            },
            isEmpty: function() {
                var b = {},
                    a;
                if (this.getFilesCount()) return !1;
                for (a in this._.data) b[a] = 1;
                if (this.$)
                    if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                        if (this.$.types)
                            for (var c = 0; c < this.$.types.length; c++) b[this.$.types[c]] = 1
                    } else b.Text = 1, b.URL = 1;
                "Text" != n && (b[n] = 0);
                for (a in b)
                    if (b[a] && "" !== this.getData(a)) return !1;
                return !0
            },
            _getImageFromClipboard: function() {
                var b;
                if (this.$ && this.$.items && this.$.items[0]) try {
                    if ((b = this.$.items[0].getAsFile()) &&
                        b.type) return b
                } catch (a) {}
            }
        }
    })();
    CKEDITOR.config.clipboard_notificationDuration = 1E4;
    (function() {
        function q(b, d, a) {
            a = b.config.forceEnterMode || a;
            if ("wysiwyg" == b.mode) {
                d || (d = b.activeEnterMode);
                var h = b.elementPath();
                h && !h.isContextFor("p") && (d = CKEDITOR.ENTER_BR, a = 1);
                b.fire("saveSnapshot");
                d == CKEDITOR.ENTER_BR ? t(b, d, null, a) : u(b, d, null, a);
                b.fire("saveSnapshot")
            }
        }

        function v(b) { b = b.getSelection().getRanges(!0); for (var d = b.length - 1; 0 < d; d--) b[d].deleteContents(); return b[0] }

        function y(b) {
            var d = b.startContainer.getAscendant(function(a) { return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable") }, !0);
            if (b.root.equals(d)) return b;
            d = new CKEDITOR.dom.range(d);
            d.moveToRange(b);
            return d
        }
        CKEDITOR.plugins.add("enterkey", {
            init: function(b) {
                b.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function(b) { q(b) } });
                b.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function(b) { q(b, b.activeShiftEnterMode, 1) } });
                b.setKeystroke([
                    [13, "enter"],
                    [CKEDITOR.SHIFT + 13, "shiftEnter"]
                ])
            }
        });
        var z = CKEDITOR.dom.walker.whitespaces(),
            A = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function(b,
                d, a, h) {
                if (a = a || v(b)) {
                    a = y(a);
                    var f = a.document,
                        k = a.checkStartOfBlock(),
                        m = a.checkEndOfBlock(),
                        l = b.elementPath(a.startContainer),
                        c = l.block,
                        n = d == CKEDITOR.ENTER_DIV ? "div" : "p",
                        e;
                    if (k && m) {
                        if (c && (c.is("li") || c.getParent().is("li"))) {
                            c.is("li") || (c = c.getParent());
                            a = c.getParent();
                            e = a.getParent();
                            h = !c.hasPrevious();
                            var p = !c.hasNext(),
                                n = b.getSelection(),
                                g = n.createBookmarks(),
                                k = c.getDirection(1),
                                m = c.getAttribute("class"),
                                r = c.getAttribute("style"),
                                q = e.getDirection(1) != k;
                            b = b.enterMode != CKEDITOR.ENTER_BR || q || r || m;
                            if (e.is("li")) h || p ? (h && p && a.remove(), c[p ? "insertAfter" : "insertBefore"](e)) : c.breakParent(e);
                            else {
                                if (b)
                                    if (l.block.is("li") ? (e = f.createElement(d == CKEDITOR.ENTER_P ? "p" : "div"), q && e.setAttribute("dir", k), r && e.setAttribute("style", r), m && e.setAttribute("class", m), c.moveChildren(e)) : e = l.block, h || p) e[h ? "insertBefore" : "insertAfter"](a);
                                    else c.breakParent(a), e.insertAfter(a);
                                else if (c.appendBogus(!0), h || p)
                                    for (; f = c[h ? "getFirst" : "getLast"]();) f[h ? "insertBefore" : "insertAfter"](a);
                                else
                                    for (c.breakParent(a); f = c.getLast();) f.insertAfter(a);
                                c.remove()
                            }
                            n.selectBookmarks(g);
                            return
                        }
                        if (c && c.getParent().is("blockquote")) {
                            c.breakParent(c.getParent());
                            c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove();
                            c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove();
                            a.moveToElementEditStart(c);
                            a.select();
                            return
                        }
                    } else if (c && c.is("pre") && !m) { t(b, d, a, h); return }
                    if (k = a.splitBlock(n)) {
                        d = k.previousBlock;
                        c = k.nextBlock;
                        l = k.wasStartOfBlock;
                        b = k.wasEndOfBlock;
                        c ? (g = c.getParent(), g.is("li") && (c.breakParent(g),
                            c.move(c.getNext(), 1))) : d && (g = d.getParent()) && g.is("li") && (d.breakParent(g), g = d.getNext(), a.moveToElementEditStart(g), d.move(d.getPrevious()));
                        if (l || b) {
                            if (d) { if (d.is("li") || !w.test(d.getName()) && !d.is("pre")) e = d.clone() } else c && (e = c.clone());
                            e ? h && !e.is("li") && e.renameNode(n) : g && g.is("li") ? e = g : (e = f.createElement(n), d && (p = d.getDirection()) && e.setAttribute("dir", p));
                            if (f = k.elementPath)
                                for (h = 0, n = f.elements.length; h < n; h++) {
                                    g = f.elements[h];
                                    if (g.equals(f.block) || g.equals(f.blockLimit)) break;
                                    CKEDITOR.dtd.$removeEmpty[g.getName()] &&
                                        (g = g.clone(), e.moveChildren(g), e.append(g))
                                }
                            e.appendBogus();
                            e.getParent() || a.insertNode(e);
                            e.is("li") && e.removeAttribute("value");
                            !CKEDITOR.env.ie || !l || b && d.getChildCount() || (a.moveToElementEditStart(b ? d : e), a.select());
                            a.moveToElementEditStart(l && !b ? c : e)
                        } else c.is("li") && (e = a.clone(), e.selectNodeContents(c), e = new CKEDITOR.dom.walker(e), e.evaluator = function(a) { return !(A(a) || z(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty)) }, (g = e.next()) &&
                            g.type == CKEDITOR.NODE_ELEMENT && g.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? f.createElement("br") : f.createText(" ")).insertBefore(g)), c && a.moveToElementEditStart(c);
                        a.select();
                        a.scrollIntoView()
                    }
                }
            },
            enterBr: function(b, d, a, h) {
                if (a = a || v(b)) {
                    var f = a.document,
                        k = a.checkEndOfBlock(),
                        m = new CKEDITOR.dom.elementPath(b.getSelection().getStartElement()),
                        l = m.block,
                        c = l && m.block.getName();
                    h || "li" != c ? (!h && k && w.test(c) ? (k = l.getDirection()) ? (f = f.createElement("div"), f.setAttribute("dir", k), f.insertAfter(l), a.setStart(f,
                        0)) : (f.createElement("br").insertAfter(l), CKEDITOR.env.gecko && f.createText("").insertAfter(l), a.setStartAt(l.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (b = "pre" == c && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? f.createText("\r") : f.createElement("br"), a.deleteContents(), a.insertNode(b), CKEDITOR.env.needsBrFiller ? (f.createText("﻿").insertAfter(b), k && (l || m.blockLimit).appendBogus(), b.getNext().$.nodeValue = "", a.setStartAt(b.getNext(), CKEDITOR.POSITION_AFTER_START)) :
                        a.setStartAt(b, CKEDITOR.POSITION_AFTER_END)), a.collapse(!0), a.select(), a.scrollIntoView()) : u(b, d, a, h)
                }
            }
        };
        var x = CKEDITOR.plugins.enterkey,
            t = x.enterBr,
            u = x.enterBlock,
            w = /^h[1-6]$/
    })();
    (function() {
        function k(b, f) {
            var g = {},
                c = [],
                e = { nbsp: " ", shy: "­", gt: "\x3e", lt: "\x3c", amp: "\x26", apos: "'", quot: '"' };
            b = b.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(b, a) {
                var d = f ? "\x26" + a + ";" : e[a];
                g[d] = f ? e[a] : "\x26" + a + ";";
                c.push(d);
                return ""
            });
            if (!f && b) {
                b = b.split(",");
                var a = document.createElement("div"),
                    d;
                a.innerHTML = "\x26" + b.join(";\x26") + ";";
                d = a.innerHTML;
                a = null;
                for (a = 0; a < d.length; a++) {
                    var h = d.charAt(a);
                    g[h] = "\x26" + b[a] + ";";
                    c.push(h)
                }
            }
            g.regex = c.join(f ? "|" : "");
            return g
        }
        CKEDITOR.plugins.add("entities", {
            afterInit: function(b) {
                function f(a) { return h[a] }

                function g(b) { return "force" != c.entities_processNumerical && a[b] ? a[b] : "\x26#" + b.charCodeAt(0) + ";" }
                var c = b.config;
                if (b = (b = b.dataProcessor) && b.htmlFilter) {
                    var e = [];
                    !1 !== c.basicEntities && e.push("nbsp,gt,lt,amp");
                    c.entities && (e.length && e.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                        c.entities_latin && e.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), c.entities_greek && e.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                        c.entities_additional && e.push(c.entities_additional));
                    var a = k(e.join(",")),
                        d = a.regex ? "[" + a.regex + "]" : "a^";
                    delete a.regex;
                    c.entities && c.entities_processNumerical && (d = "[^ -~]|" + d);
                    var d = new RegExp(d, "g"),
                        h = k("nbsp,gt,lt,amp,shy", !0),
                        l = new RegExp(h.regex, "g");
                    b.addRules({ text: function(a) { return a.replace(l, f).replace(d, g) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                }
            }
        })
    })();
    CKEDITOR.config.basicEntities = !0;
    CKEDITOR.config.entities = !0;
    CKEDITOR.config.entities_latin = !0;
    CKEDITOR.config.entities_greek = !0;
    CKEDITOR.config.entities_additional = "#39";
    (function() {
        function k(a) {
            var l = a.config,
                p = a.fire("uiSpace", { space: "top", html: "" }).html,
                t = function() {
                    function f(a, c, e) {
                        b.setStyle(c, w(e));
                        b.setStyle("position", a)
                    }

                    function e(a) {
                        var b = k.getDocumentPosition();
                        switch (a) {
                            case "top":
                                f("absolute", "top", b.y - q - r);
                                break;
                            case "pin":
                                f("fixed", "top", x);
                                break;
                            case "bottom":
                                f("absolute", "top", b.y + (c.height || c.bottom - c.top) + r)
                        }
                        m = a
                    }
                    var m, k, n, c, h, q, v, p = l.floatSpaceDockedOffsetX || 0,
                        r = l.floatSpaceDockedOffsetY || 0,
                        u = l.floatSpacePinnedOffsetX || 0,
                        x = l.floatSpacePinnedOffsetY ||
                        0;
                    return function(d) {
                        if (k = a.editable()) {
                            var f = d && "focus" == d.name;
                            f && b.show();
                            a.fire("floatingSpaceLayout", { show: f });
                            b.removeStyle("left");
                            b.removeStyle("right");
                            n = b.getClientRect();
                            c = k.getClientRect();
                            h = g.getViewPaneSize();
                            q = n.height;
                            v = "pageXOffset" in g.$ ? g.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
                            m ? (q + r <= c.top ? e("top") : q + r > h.height - c.bottom ? e("pin") : e("bottom"), d = h.width / 2, d = l.floatSpacePreferRight ? "right" : 0 < c.left && c.right < h.width && c.width > n.width ? "rtl" == l.contentsLangDirection ?
                                "right" : "left" : d - c.left > c.right - d ? "left" : "right", n.width > h.width ? (d = "left", f = 0) : (f = "left" == d ? 0 < c.left ? c.left : 0 : c.right < h.width ? h.width - c.right : 0, f + n.width > h.width && (d = "left" == d ? "right" : "left", f = 0)), b.setStyle(d, w(("pin" == m ? u : p) + f + ("pin" == m ? 0 : "left" == d ? v : -v)))) : (m = "pin", e("pin"), t(d))
                        }
                    }
                }();
            if (p) {
                var k = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ?
                        " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),
                    b = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(k.output({
                        content: p,
                        id: a.id,
                        langDir: a.lang.dir,
                        langCode: a.langCode,
                        name: a.name,
                        style: "display:none;z-index:" + (l.baseFloatZIndex - 1),
                        topId: a.ui.spaceId("top"),
                        voiceLabel: a.title
                    }))),
                    u = CKEDITOR.tools.eventsBuffer(500, t),
                    e = CKEDITOR.tools.eventsBuffer(100, t);
                b.unselectable();
                b.on("mousedown", function(a) {
                    a = a.data;
                    a.getTarget().hasAscendant("a", 1) || a.preventDefault()
                });
                a.on("focus", function(b) {
                    t(b);
                    a.on("change", u.input);
                    g.on("scroll", e.input);
                    g.on("resize", e.input)
                });
                a.on("blur", function() {
                    b.hide();
                    a.removeListener("change", u.input);
                    g.removeListener("scroll",
                        e.input);
                    g.removeListener("resize", e.input)
                });
                a.on("destroy", function() {
                    g.removeListener("scroll", e.input);
                    g.removeListener("resize", e.input);
                    b.clearCustomData();
                    b.remove()
                });
                a.focusManager.hasFocus && b.show();
                a.focusManager.add(b, 1)
            }
        }
        var g = CKEDITOR.document.getWindow(),
            w = CKEDITOR.tools.cssLength;
        CKEDITOR.plugins.add("floatingspace", { init: function(a) { a.on("loaded", function() { k(this) }, null, null, 20) } })
    })();
    (function() {
        function m(a) {
            function f(a) {
                var b = !1;
                g.attachListener(g, "keydown", function() {
                    var d = c.getBody().getElementsByTag(a);
                    if (!b) {
                        for (var e = 0; e < d.count(); e++) d.getItem(e).setCustomData("retain", !0);
                        b = !0
                    }
                }, null, null, 1);
                g.attachListener(g, "keyup", function() {
                    var d = c.getElementsByTag(a);
                    b && (1 != d.count() || d.getItem(0).getCustomData("retain") || d.getItem(0).hasAttribute("data-cke-temp") || d.getItem(0).remove(1), b = !1)
                })
            }
            var b = this.editor,
                c = a.document,
                d = c.body,
                e = c.getElementById("cke_actscrpt");
            e && e.parentNode.removeChild(e);
            (e = c.getElementById("cke_shimscrpt")) && e.parentNode.removeChild(e);
            (e = c.getElementById("cke_basetagscrpt")) && e.parentNode.removeChild(e);
            d.contentEditable = !0;
            CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, d.removeAttribute("disabled"));
            delete this._.isLoadingData;
            this.$ = d;
            c = new CKEDITOR.dom.document(c);
            this.setup();
            this.fixInitialSelection();
            var g = this;
            CKEDITOR.env.ie && !CKEDITOR.env.edge && c.getDocumentElement().addClass(c.$.compatMode);
            CKEDITOR.env.ie && !CKEDITOR.env.edge && b.enterMode != CKEDITOR.ENTER_P ?
                f("p") : CKEDITOR.env.edge && b.enterMode != CKEDITOR.ENTER_DIV && f("div");
            if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) c.getDocumentElement().on("mousedown", function(a) { a.data.getTarget().is("html") && setTimeout(function() { b.editable().focus() }) });
            n(b);
            try { b.document.$.execCommand("2D-position", !1, !0) } catch (h) {}(CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == b.document.$.compatMode) && this.attachListener(this, "keydown", function(a) {
                var c = a.data.getKeystroke();
                if (33 == c || 34 == c)
                    if (CKEDITOR.env.ie) setTimeout(function() { b.getSelection().scrollIntoView() },
                        0);
                    else if (b.window.$.innerHeight > this.$.offsetHeight) {
                    var d = b.createRange();
                    d[33 == c ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                    d.select();
                    a.data.preventDefault()
                }
            });
            CKEDITOR.env.ie && this.attachListener(c, "blur", function() { try { c.$.selection.empty() } catch (a) {} });
            CKEDITOR.env.iOS && this.attachListener(c, "touchend", function() { a.focus() });
            d = b.document.getElementsByTag("title").getItem(0);
            d.data("cke-title", d.getText());
            CKEDITOR.env.ie && (b.document.$.title = this._.docTitle);
            CKEDITOR.tools.setTimeout(function() {
                "unloaded" ==
                this.status && (this.status = "ready");
                b.fire("contentDom");
                this._.isPendingFocus && (b.focus(), this._.isPendingFocus = !1);
                setTimeout(function() { b.fire("dataReady") }, 0)
            }, 0, this)
        }

        function n(a) {
            function f() {
                var c;
                a.editable().attachListener(a, "selectionChange", function() {
                    var d = a.getSelection().getSelectedElement();
                    d && (c && (c.detachEvent("onresizestart", b), c = null), d.$.attachEvent("onresizestart", b), c = d.$)
                })
            }

            function b(a) { a.returnValue = !1 }
            if (CKEDITOR.env.gecko) try {
                var c = a.document.$;
                c.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing);
                c.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
            } catch (d) {} else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && f(a)
        }

        function p() {
            var a = [];
            if (8 <= CKEDITOR.document.$.documentMode) {
                a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
                var f = [],
                    b;
                for (b in CKEDITOR.dtd.$removeEmpty) f.push("html.CSS1Compat " + b + "[contenteditable\x3dfalse]");
                a.push(f.join(",") + "{display:inline-block}")
            } else CKEDITOR.env.gecko &&
                (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
            a.push("html{cursor:text;*cursor:auto}");
            a.push("img,input,textarea{cursor:default}");
            return a.join("\n")
        }
        var l;
        CKEDITOR.plugins.add("wysiwygarea", {
            init: function(a) {
                a.config.fullPage && a.addFeature({ allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]", requiredContent: "body" });
                a.addMode("wysiwyg", function(f) {
                    function b(b) {
                        b && b.removeListener();
                        a.editable(new l(a, d.$.contentWindow.document.body));
                        a.setData(a.getData(1), f)
                    }
                    var c = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();",
                        c = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(c) + "}())" : "",
                        d = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + c + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
                    d.setStyles({ width: "100%", height: "100%" });
                    d.addClass("cke_wysiwyg_frame").addClass("cke_reset");
                    c = a.ui.space("contents");
                    c.append(d);
                    var e = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
                    if (e) d.on("load", b);
                    var g = a.title,
                        h = a.fire("ariaEditorHelpLabel", {}).label;
                    g && (CKEDITOR.env.ie && h && (g += ", " + h), d.setAttribute("title", g));
                    if (h) {
                        var g = CKEDITOR.tools.getNextId(),
                            k = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + h + "\x3c/span\x3e");
                        c.append(k, 1);
                        d.setAttribute("aria-describedby", g)
                    }
                    a.on("beforeModeUnload", function(a) {
                        a.removeListener();
                        k && k.remove()
                    });
                    d.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" });
                    !e && b();
                    a.fire("ariaWidget", d)
                })
            }
        });
        CKEDITOR.editor.prototype.addContentsCss = function(a) {
            var f = this.config,
                b = f.contentsCss;
            CKEDITOR.tools.isArray(b) || (f.contentsCss = b ? [b] : []);
            f.contentsCss.push(a)
        };
        l = CKEDITOR.tools.createClass({
            $: function() {
                this.base.apply(this, arguments);
                this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(a) { CKEDITOR.tools.setTimeout(m, 0, this, a) }, this);
                this._.docTitle = this.getWindow().getFrame().getAttribute("title")
            },
            base: CKEDITOR.editable,
            proto: {
                setData: function(a, f) {
                    var b = this.editor;
                    if (f) this.setHtml(a), this.fixInitialSelection(), b.fire("dataReady");
                    else {
                        this._.isLoadingData = !0;
                        b._.dataStore = { id: 1 };
                        var c = b.config,
                            d = c.fullPage,
                            e = c.docType,
                            g = CKEDITOR.tools.buildStyleHtml(p()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e');
                        d || (g += CKEDITOR.tools.buildStyleHtml(b.config.contentsCss));
                        var h = c.baseHref ? '\x3cbase href\x3d"' + c.baseHref + '" data-cke-temp\x3d"1" /\x3e' : "";
                        d && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
                            b.docType =
                                e = a;
                            return ""
                        }).replace(/<\?xml\s[^\?]*\?>/i, function(a) { b.xmlDeclaration = a; return "" }));
                        a = b.dataProcessor.toHtml(a);
                        d ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"), h && (a = a.replace(/<head[^>]*?>/, "$\x26" + h)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a =
                            e + a) : a = c.docType + '\x3chtml dir\x3d"' + c.contentsLangDirection + '" lang\x3d"' + (c.contentsLanguage || b.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + h + g + "\x3c/head\x3e\x3cbody" + (c.bodyId ? ' id\x3d"' + c.bodyId + '"' : "") + (c.bodyClass ? ' class\x3d"' + c.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e";
                        CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e")));
                        c = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e";
                        CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (c += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
                        h && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
                        a = a.replace(/(?=\s*<\/(:?head)>)/, c);
                        this.clearCustomData();
                        this.clearListeners();
                        b.fire("contentDomUnload");
                        var k = this.getDocument();
                        try { k.write(a) } catch (l) { setTimeout(function() { k.write(a) }, 0) }
                    }
                },
                getData: function(a) {
                    if (a) return this.getHtml();
                    a = this.editor;
                    var f = a.config,
                        b = f.fullPage,
                        c = b && a.docType,
                        d = b && a.xmlDeclaration,
                        e = this.getDocument(),
                        b = b ? e.getDocumentElement().getOuterHtml() : e.getBody().getHtml();
                    CKEDITOR.env.gecko && f.enterMode != CKEDITOR.ENTER_BR && (b = b.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                    b = a.dataProcessor.toDataFormat(b);
                    d && (b = d + "\n" + b);
                    c && (b = c + "\n" + b);
                    return b
                },
                focus: function() { this._.isLoadingData ? this._.isPendingFocus = !0 : l.baseProto.focus.call(this) },
                detach: function() {
                    var a = this.editor,
                        f = a.document,
                        b;
                    try { b = a.window.getFrame() } catch (c) {} l.baseProto.detach.call(this);
                    this.clearCustomData();
                    f.getDocumentElement().clearCustomData();
                    CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                    b && b.getParent() ? (b.clearCustomData(), (a = b.removeCustomData("onResize")) && a.removeListener(), b.remove()) : CKEDITOR.warn("editor-destroy-iframe")
                }
            }
        })
    })();
    CKEDITOR.config.disableObjectResizing = !1;
    CKEDITOR.config.disableNativeTableHandles = !0;
    CKEDITOR.config.disableNativeSpellChecker = !0;
    (function() {
        function m(a, b) {
            var e, f;
            b.on("refresh", function(a) {
                var b = [k],
                    c;
                for (c in a.data.states) b.push(a.data.states[c]);
                this.setState(CKEDITOR.tools.search(b, p) ? p : k)
            }, b, null, 100);
            b.on("exec", function(b) {
                e = a.getSelection();
                f = e.createBookmarks(1);
                b.data || (b.data = {});
                b.data.done = !1
            }, b, null, 0);
            b.on("exec", function() {
                a.forceNextSelectionCheck();
                e.selectBookmarks(f)
            }, b, null, 100)
        }
        var k = CKEDITOR.TRISTATE_DISABLED,
            p = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indent", {
            init: function(a) {
                var b = CKEDITOR.plugins.indent.genericDefinition;
                m(a, a.addCommand("indent", new b(!0)));
                m(a, a.addCommand("outdent", new b));
                a.ui.addButton && (a.ui.addButton("Indent", { label: a.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }), a.ui.addButton("Outdent", { label: a.lang.indent.outdent, command: "outdent", directional: !0, toolbar: "indent,10" }));
                a.on("dirChanged", function(b) {
                    var f = a.createRange(),
                        l = b.data.node;
                    f.setStartBefore(l);
                    f.setEndAfter(l);
                    for (var n = new CKEDITOR.dom.walker(f), c; c = n.next();)
                        if (c.type == CKEDITOR.NODE_ELEMENT)
                            if (!c.equals(l) &&
                                c.getDirection()) f.setStartAfter(c), n = new CKEDITOR.dom.walker(f);
                            else {
                                var d = a.config.indentClasses;
                                if (d)
                                    for (var g = "ltr" == b.data.dir ? ["_rtl", ""] : ["", "_rtl"], h = 0; h < d.length; h++) c.hasClass(d[h] + g[0]) && (c.removeClass(d[h] + g[0]), c.addClass(d[h] + g[1]));
                                d = c.getStyle("margin-right");
                                g = c.getStyle("margin-left");
                                d ? c.setStyle("margin-left", d) : c.removeStyle("margin-left");
                                g ? c.setStyle("margin-right", g) : c.removeStyle("margin-right")
                            }
                })
            }
        });
        CKEDITOR.plugins.indent = {
            genericDefinition: function(a) {
                this.isIndent = !!a;
                this.startDisabled = !this.isIndent
            },
            specificDefinition: function(a, b, e) {
                this.name = b;
                this.editor = a;
                this.jobs = {};
                this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR;
                this.isIndent = !!e;
                this.relatedGlobal = e ? "indent" : "outdent";
                this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9;
                this.database = {}
            },
            registerCommands: function(a, b) {
                a.on("pluginsLoaded", function() {
                    for (var a in b)(function(a, b) {
                        var e = a.getCommand(b.relatedGlobal),
                            c;
                        for (c in b.jobs) e.on("exec", function(d) {
                            d.data.done || (a.fire("lockSnapshot"), b.execJob(a, c) && (d.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
                        }, this, null, c), e.on("refresh", function(d) {
                            d.data.states || (d.data.states = {});
                            d.data.states[b.name + "@" + c] = b.refreshJob(a, c, d.data.path)
                        }, this, null, c);
                        a.addFeature(b)
                    })(this, b[a])
                })
            }
        };
        CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function() {} };
        CKEDITOR.plugins.indent.specificDefinition.prototype = {
            execJob: function(a, b) { var e = this.jobs[b]; if (e.state != k) return e.exec.call(this, a) },
            refreshJob: function(a,
                b, e) {
                b = this.jobs[b];
                a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, e) : b.state = k;
                return b.state
            },
            getContext: function(a) { return a.contains(this.context) }
        }
    })();
    (function() {
        function w(d) {
            function f(b) {
                for (var e = c.startContainer, a = c.endContainer; e && !e.getParent().equals(b);) e = e.getParent();
                for (; a && !a.getParent().equals(b);) a = a.getParent();
                if (!e || !a) return !1;
                for (var g = e, e = [], k = !1; !k;) g.equals(a) && (k = !0), e.push(g), g = g.getNext();
                if (1 > e.length) return !1;
                g = b.getParents(!0);
                for (a = 0; a < g.length; a++)
                    if (g[a].getName && p[g[a].getName()]) { b = g[a]; break }
                for (var g = l.isIndent ? 1 : -1, a = e[0], e = e[e.length - 1], k = CKEDITOR.plugins.list.listToArray(b, q), h = k[e.getCustomData("listarray_index")].indent,
                        a = a.getCustomData("listarray_index"); a <= e.getCustomData("listarray_index"); a++)
                    if (k[a].indent += g, 0 < g) {
                        var n = k[a].parent;
                        k[a].parent = new CKEDITOR.dom.element(n.getName(), n.getDocument())
                    }
                for (a = e.getCustomData("listarray_index") + 1; a < k.length && k[a].indent > h; a++) k[a].indent += g;
                e = CKEDITOR.plugins.list.arrayToList(k, q, null, d.config.enterMode, b.getDirection());
                if (!l.isIndent) {
                    var f;
                    if ((f = b.getParent()) && f.is("li"))
                        for (var g = e.listNode.getChildren(), r = [], m, a = g.count() - 1; 0 <= a; a--)(m = g.getItem(a)) && m.is && m.is("li") &&
                            r.push(m)
                }
                e && e.listNode.replace(b);
                if (r && r.length)
                    for (a = 0; a < r.length; a++) {
                        for (m = b = r[a];
                            (m = m.getNext()) && m.is && m.getName() in p;) CKEDITOR.env.needsNbspFiller && !b.getFirst(x) && b.append(c.document.createText(" ")), b.append(m);
                        b.insertAfter(f)
                    }
                e && d.fire("contentDomInvalidated");
                return !0
            }
            for (var l = this, q = this.database, p = this.context, c, n = d.getSelection(), n = (n && n.getRanges()).createIterator(); c = n.getNextRange();) {
                for (var b = c.getCommonAncestor(); b && (b.type != CKEDITOR.NODE_ELEMENT || !p[b.getName()]);) {
                    if (d.editable().equals(b)) {
                        b = !1;
                        break
                    }
                    b = b.getParent()
                }
                b || (b = c.startPath().contains(p)) && c.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
                if (!b) {
                    var h = c.getEnclosedNode();
                    h && h.type == CKEDITOR.NODE_ELEMENT && h.getName() in p && (c.setStartAt(h, CKEDITOR.POSITION_AFTER_START), c.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), b = h)
                }
                b && c.startContainer.type == CKEDITOR.NODE_ELEMENT && c.startContainer.getName() in p && (h = new CKEDITOR.dom.walker(c), h.evaluator = t, c.startContainer = h.next());
                b && c.endContainer.type == CKEDITOR.NODE_ELEMENT && c.endContainer.getName() in
                    p && (h = new CKEDITOR.dom.walker(c), h.evaluator = t, c.endContainer = h.previous());
                if (b) return f(b)
            }
            return 0
        }

        function t(d) { return d.type == CKEDITOR.NODE_ELEMENT && d.is("li") }

        function x(d) { return y(d) && z(d) }
        var y = CKEDITOR.dom.walker.whitespaces(!0),
            z = CKEDITOR.dom.walker.bookmark(!1, !0),
            u = CKEDITOR.TRISTATE_DISABLED,
            v = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentlist", {
            requires: "indent",
            init: function(d) {
                function f(d) {
                    l.specificDefinition.apply(this, arguments);
                    this.requiredContent = ["ul", "ol"];
                    d.on("key",
                        function(f) { var c = d.elementPath(); if ("wysiwyg" == d.mode && f.data.keyCode == this.indentKey && c) { var n = this.getContext(c);!n || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, n) || (d.execCommand(this.relatedGlobal), f.cancel()) } }, this);
                    this.jobs[this.isIndent ? 10 : 30] = {
                        refresh: this.isIndent ? function(d, c) {
                            var f = this.getContext(c),
                                b = CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, f);
                            return f && this.isIndent && !b ? v : u
                        } : function(d, c) { return !this.getContext(c) || this.isIndent ? u : v },
                        exec: CKEDITOR.tools.bind(w, this)
                    }
                }
                var l = CKEDITOR.plugins.indent;
                l.registerCommands(d, { indentlist: new f(d, "indentlist", !0), outdentlist: new f(d, "outdentlist") });
                CKEDITOR.tools.extend(f.prototype, l.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
            }
        });
        CKEDITOR.plugins.indentList = {};
        CKEDITOR.plugins.indentList.firstItemInPath = function(d, f, l) {
            var q = f.contains(t);
            l || (l = f.contains(d));
            return l && q && q.equals(l.getFirst(t))
        }
    })();
    (function() {
        function g(a, b) {
            var c = l.exec(a),
                d = l.exec(b);
            if (c) { if (!c[2] && "px" == d[2]) return d[1]; if ("px" == c[2] && !d[2]) return d[1] + "px" }
            return b
        }
        var k = CKEDITOR.htmlParser.cssStyle,
            h = CKEDITOR.tools.cssLength,
            l = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
            m = {
                elements: {
                    $: function(a) {
                        var b = a.attributes;
                        if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
                            var c = (new k(a)).rules;
                            a = b.attributes;
                            var d = c.width,
                                c = c.height;
                            d && (a.width = g(a.width, d));
                            c && (a.height = g(a.height, c))
                        }
                        return b
                    }
                }
            };
        CKEDITOR.plugins.add("fakeobjects", {
            init: function(a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") },
            afterInit: function(a) {
                (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(m, { applyToAll: !0 })
            }
        });
        CKEDITOR.editor.prototype.createFakeElement = function(a, b, c, d) {
            var e = this.lang.fakeobjects,
                e = e[c] || e.unknown;
            b = {
                "class": b,
                "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                "data-cke-real-node-type": a.type,
                alt: e,
                title: e,
                align: a.getAttribute("align") || ""
            };
            CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData);
            c && (b["data-cke-real-element-type"] = c);
            d && (b["data-cke-resizable"] = d, c = new k, d = a.getAttribute("width"), a = a.getAttribute("height"), d && (c.rules.width = h(d)), a && (c.rules.height = h(a)), c.populate(b));
            return this.document.createElement("img", { attributes: b })
        };
        CKEDITOR.editor.prototype.createFakeParserElement = function(a, b, c, d) {
            var e = this.lang.fakeobjects,
                e = e[c] || e.unknown,
                f;
            f = new CKEDITOR.htmlParser.basicWriter;
            a.writeHtml(f);
            f = f.getHtml();
            b = { "class": b, "data-cke-realelement": encodeURIComponent(f), "data-cke-real-node-type": a.type, alt: e, title: e, align: a.attributes.align || "" };
            CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData);
            c && (b["data-cke-real-element-type"] = c);
            d && (b["data-cke-resizable"] = d, d = a.attributes, a = new k, c = d.width, d = d.height, void 0 !== c && (a.rules.width = h(c)), void 0 !== d && (a.rules.height = h(d)), a.populate(b));
            return new CKEDITOR.htmlParser.element("img", b)
        };
        CKEDITOR.editor.prototype.restoreRealElement =
            function(a) {
                if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
                var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document);
                if (a.data("cke-resizable")) {
                    var c = a.getStyle("width");
                    a = a.getStyle("height");
                    c && b.setAttribute("width", g(b.getAttribute("width"), c));
                    a && b.setAttribute("height", g(b.getAttribute("height"), a))
                }
                return b
            }
    })();
    (function() {
        function p(c) { return c.replace(/'/g, "\\$\x26") }

        function q(c) { for (var b, a = c.length, d = [], f = 0; f < a; f++) b = c.charCodeAt(f), d.push(b); return "String.fromCharCode(" + d.join(",") + ")" }

        function r(c, b) {
            var a = c.plugins.link,
                d = a.compiledProtectionFunction.params,
                f, e;
            e = [a.compiledProtectionFunction.name, "("];
            for (var g = 0; g < d.length; g++) a = d[g].toLowerCase(), f = b[a], 0 < g && e.push(","), e.push("'", f ? p(encodeURIComponent(b[a])) : "", "'");
            e.push(")");
            return e.join("")
        }

        function n(c) {
            c = c.config.emailProtection || "";
            var b;
            c && "encode" != c && (b = {}, c.replace(/^([^(]+)\(([^)]+)\)$/, function(a, c, f) {
                b.name = c;
                b.params = [];
                f.replace(/[^,\s]+/g, function(a) { b.params.push(a) })
            }));
            return b
        }
        CKEDITOR.plugins.add("link", {
            requires: "dialog,fakeobjects",
            onLoad: function() {
                function c(b) { return a.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b) }
                var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
                    a = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
                CKEDITOR.addCss(c("ltr") + c("rtl"))
            },
            init: function(c) {
                var b = "a[!href]";
                CKEDITOR.dialog.isTabEnabled(c, "link", "advanced") && (b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));
                CKEDITOR.dialog.isTabEnabled(c, "link", "target") &&
                    (b = b.replace("]", ",target,onclick]"));
                c.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: b, requiredContent: "a[href]" }));
                c.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" }));
                c.addCommand("unlink", new CKEDITOR.unlinkCommand);
                c.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
                c.setKeystroke(CKEDITOR.CTRL + 76, "link");
                c.ui.addButton && (c.ui.addButton("Link", { label: c.lang.link.toolbar, command: "link", toolbar: "links,10" }),
                    c.ui.addButton("Unlink", { label: c.lang.link.unlink, command: "unlink", toolbar: "links,20" }), c.ui.addButton("Anchor", { label: c.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" }));
                CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
                CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
                c.on("doubleclick", function(a) {
                    var b = CKEDITOR.plugins.link.getSelectedLink(c) || a.data.element.getAscendant("a", 1);
                    b && !b.isReadOnly() && (b.is("a") ? (a.data.dialog = !b.getAttribute("name") || b.getAttribute("href") &&
                        b.getChildCount() ? "link" : "anchor", a.data.link = b) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, b) && (a.data.dialog = "anchor"))
                }, null, null, 0);
                c.on("doubleclick", function(a) { a.data.dialog in { link: 1, anchor: 1 } && a.data.link && c.getSelection().selectElement(a.data.link) }, null, null, 20);
                c.addMenuItems && c.addMenuItems({
                    anchor: { label: c.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 },
                    removeAnchor: { label: c.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 },
                    link: {
                        label: c.lang.link.menu,
                        command: "link",
                        group: "link",
                        order: 1
                    },
                    unlink: { label: c.lang.link.unlink, command: "unlink", group: "link", order: 5 }
                });
                c.contextMenu && c.contextMenu.addListener(function(a) {
                    if (!a || a.isReadOnly()) return null;
                    a = CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a);
                    if (!a && !(a = CKEDITOR.plugins.link.getSelectedLink(c))) return null;
                    var b = {};
                    a.getAttribute("href") && a.getChildCount() && (b = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF });
                    a && a.hasAttribute("name") && (b.anchor = b.removeAnchor = CKEDITOR.TRISTATE_OFF);
                    return b
                });
                this.compiledProtectionFunction = n(c)
            },
            afterInit: function(c) {
                c.dataProcessor.dataFilter.addRules({ elements: { a: function(a) { return a.attributes.name ? a.children.length ? null : c.createFakeParserElement(a, "cke_anchor", "anchor") : null } } });
                var b = c._.elementsPath && c._.elementsPath.filters;
                b && b.push(function(a, b) { if ("a" == b && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a) || a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount()))) return "anchor" })
            }
        });
        var t = /^javascript:/,
            u = /^mailto:([^?]+)(?:\?(.+))?$/,
            v = /subject=([^;?:@&=$,\/]*)/i,
            w = /body=([^;?:@&=$,\/]*)/i,
            x = /^#(.*)$/,
            y = /^((?:http|https|ftp|news):\/\/)?(.*)$/,
            z = /^(_(?:self|top|parent|blank))$/,
            A = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
            B = /^javascript:([^(]+)\(([^)]+)\)$/,
            C = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
            D = /(?:^|,)([^=]+)=(\d+|yes|no)/gi,
            m = {
                id: "advId",
                dir: "advLangDir",
                accessKey: "advAccessKey",
                name: "advName",
                lang: "advLangCode",
                tabindex: "advTabIndex",
                title: "advTitle",
                type: "advContentType",
                "class": "advCSSClasses",
                charset: "advCharset",
                style: "advStyles",
                rel: "advRel"
            };
        CKEDITOR.plugins.link = {
            getSelectedLink: function(c, b) {
                var a = c.getSelection(),
                    d = a.getSelectedElement(),
                    f = a.getRanges(),
                    e = [],
                    g;
                if (!b && d && d.is("a")) return d;
                for (d = 0; d < f.length; d++)
                    if (g = a.getRanges()[d], g.shrink(CKEDITOR.SHRINK_TEXT, !1, { skipBogus: !0 }), (g = c.elementPath(g.getCommonAncestor()).contains("a", 1)) && b) e.push(g);
                    else if (g) return g;
                return b ? e : null
            },
            getEditorAnchors: function(c) {
                for (var b =
                        c.editable(), a = b.isInline() && !c.plugins.divarea ? c.document : b, b = a.getElementsByTag("a"), a = a.getElementsByTag("img"), d = [], f = 0, e; e = b.getItem(f++);)(e.data("cke-saved-name") || e.hasAttribute("name")) && d.push({ name: e.data("cke-saved-name") || e.getAttribute("name"), id: e.getAttribute("id") });
                for (f = 0; e = a.getItem(f++);)(e = this.tryRestoreFakeAnchor(c, e)) && d.push({ name: e.getAttribute("name"), id: e.getAttribute("id") });
                return d
            },
            fakeAnchor: !0,
            tryRestoreFakeAnchor: function(c, b) {
                if (b && b.data("cke-real-element-type") &&
                    "anchor" == b.data("cke-real-element-type")) { var a = c.restoreRealElement(b); if (a.data("cke-saved-name")) return a }
            },
            parseLinkAttributes: function(c, b) {
                var a = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "",
                    d = c.plugins.link.compiledProtectionFunction,
                    f = c.config.emailProtection,
                    e, g = {};
                a.match(t) && ("encode" == f ? a = a.replace(A, function(a, b, c) { c = c || ""; return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'") }) : f && a.replace(B, function(a, b, c) {
                    if (b == d.name) {
                        g.type = "email";
                        a = g.email = {};
                        b = /(^')|('$)/g;
                        c = c.match(/[^,\s]+/g);
                        for (var e = c.length, f, h, k = 0; k < e; k++) f = decodeURIComponent, h = c[k].replace(b, "").replace(/\\'/g, "'"), h = f(h), f = d.params[k].toLowerCase(), a[f] = h;
                        a.address = [a.name, a.domain].join("@")
                    }
                }));
                if (!g.type)
                    if (f = a.match(x)) g.type = "anchor", g.anchor = {}, g.anchor.name = g.anchor.id = f[1];
                    else if (f = a.match(u)) {
                    e = a.match(v);
                    a = a.match(w);
                    g.type = "email";
                    var k = g.email = {};
                    k.address = f[1];
                    e && (k.subject = decodeURIComponent(e[1]));
                    a && (k.body = decodeURIComponent(a[1]))
                } else a && (e = a.match(y)) &&
                    (g.type = "url", g.url = {}, g.url.protocol = e[1], g.url.url = e[2]);
                if (b) {
                    if (a = b.getAttribute("target")) g.target = { type: a.match(z) ? a : "frame", name: a };
                    else if (a = (a = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && a.match(C))
                        for (g.target = { type: "popup", name: a[1] }; f = D.exec(a[2]);) "yes" != f[2] && "1" != f[2] || f[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(f[2]) && (g.target[f[1]] = f[2]) : g.target[f[1]] = !0;
                    null !== b.getAttribute("download") && (g.download = !0);
                    var a = {},
                        h;
                    for (h in m)(f = b.getAttribute(h)) && (a[m[h]] = f);
                    if (h =
                        b.data("cke-saved-name") || a.advName) a.advName = h;
                    CKEDITOR.tools.isEmpty(a) || (g.advanced = a)
                }
                return g
            },
            getLinkAttributes: function(c, b) {
                var a = c.config.emailProtection || "",
                    d = {};
                switch (b.type) {
                    case "url":
                        var a = b.url && void 0 !== b.url.protocol ? b.url.protocol : "http://",
                            f = b.url && CKEDITOR.tools.trim(b.url.url) || "";
                        d["data-cke-saved-href"] = 0 === f.indexOf("/") ? f : a + f;
                        break;
                    case "anchor":
                        a = b.anchor && b.anchor.id;
                        d["data-cke-saved-href"] = "#" + (b.anchor && b.anchor.name || a || "");
                        break;
                    case "email":
                        var e = b.email,
                            f = e.address;
                        switch (a) {
                            case "":
                            case "encode":
                                var g = encodeURIComponent(e.subject || ""),
                                    k = encodeURIComponent(e.body || ""),
                                    e = [];
                                g && e.push("subject\x3d" + g);
                                k && e.push("body\x3d" + k);
                                e = e.length ? "?" + e.join("\x26") : "";
                                "encode" == a ? (a = ["javascript:void(location.href\x3d'mailto:'+", q(f)], e && a.push("+'", p(e), "'"), a.push(")")) : a = ["mailto:", f, e];
                                break;
                            default:
                                a = f.split("@", 2), e.name = a[0], e.domain = a[1], a = ["javascript:", r(c, e)]
                        }
                        d["data-cke-saved-href"] = a.join("")
                }
                if (b.target)
                    if ("popup" == b.target.type) {
                        for (var a = ["window.open(this.href, '",
                                b.target.name || "", "', '"
                            ], h = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), f = h.length, g = function(a) { b.target[a] && h.push(a + "\x3d" + b.target[a]) }, e = 0; e < f; e++) h[e] += b.target[h[e]] ? "\x3dyes" : "\x3dno";
                        g("width");
                        g("left");
                        g("height");
                        g("top");
                        a.push(h.join(","), "'); return false;");
                        d["data-cke-pa-onclick"] = a.join("")
                    } else "notSet" != b.target.type && b.target.name && (d.target = b.target.name);
                b.download && (d.download = "");
                if (b.advanced) {
                    for (var l in m)(a = b.advanced[m[l]]) &&
                        (d[l] = a);
                    d.name && (d["data-cke-saved-name"] = d.name)
                }
                d["data-cke-saved-href"] && (d.href = d["data-cke-saved-href"]);
                l = { target: 1, onclick: 1, "data-cke-pa-onclick": 1, "data-cke-saved-name": 1, download: 1 };
                b.advanced && CKEDITOR.tools.extend(l, m);
                for (var n in d) delete l[n];
                return { set: d, removed: CKEDITOR.tools.objectKeys(l) }
            },
            showDisplayTextForElement: function(c, b) {
                var a = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 },
                    d = b.getSelection();
                return b.widgets && b.widgets.focused || d && 1 < d.getRanges().length ?
                    !1 : !c || !c.getName || !c.is(a)
            }
        };
        CKEDITOR.unlinkCommand = function() {};
        CKEDITOR.unlinkCommand.prototype = {
            exec: function(c) {
                if (CKEDITOR.env.ie) {
                    var b = c.getSelection().getRanges()[0],
                        a = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) || b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0),
                        d;
                    b.collapsed && a && (d = b.createBookmark(), b.selectNodeContents(a), b.select())
                }
                a = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 });
                c.removeStyle(a);
                d && (b.moveToBookmark(d), b.select())
            },
            refresh: function(c, b) {
                var a = b.lastElement && b.lastElement.getAscendant("a", !0);
                a && "a" == a.getName() && a.getAttribute("href") && a.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            contextSensitive: 1,
            startDisabled: 1,
            requiredContent: "a[href]",
            editorFocus: 1
        };
        CKEDITOR.removeAnchorCommand = function() {};
        CKEDITOR.removeAnchorCommand.prototype = {
            exec: function(c) {
                var b = c.getSelection(),
                    a = b.createBookmarks(),
                    d;
                if (b && (d = b.getSelectedElement()) &&
                    (d.getChildCount() ? d.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, d))) d.remove(1);
                else if (d = CKEDITOR.plugins.link.getSelectedLink(c)) d.hasAttribute("href") ? (d.removeAttributes({ name: 1, "data-cke-saved-name": 1 }), d.removeClass("cke_anchor")) : d.remove(1);
                b.selectBookmarks(a)
            },
            requiredContent: "a[name]"
        };
        CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0 })
    })();
    (function() {
        function I(b, m, e) {
            function c(c) { if (!(!(a = d[c ? "getFirst" : "getLast"]()) || a.is && a.isBlockBoundary() || !(p = m.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || p.is && p.isBlockBoundary({ br: 1 }))) b.document.createElement("br")[c ? "insertBefore" : "insertAfter"](a) }
            for (var f = CKEDITOR.plugins.list.listToArray(m.root, e), g = [], k = 0; k < m.contents.length; k++) {
                var h = m.contents[k];
                (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(e,
                    h, "list_item_processed", !0))
            }
            h = null;
            for (k = 0; k < g.length; k++) h = g[k].getCustomData("listarray_index"), f[h].indent = -1;
            for (k = h + 1; k < f.length; k++)
                if (f[k].indent > f[k - 1].indent + 1) {
                    g = f[k - 1].indent + 1 - f[k].indent;
                    for (h = f[k].indent; f[k] && f[k].indent >= h;) f[k].indent += g, k++;
                    k--
                }
            var d = CKEDITOR.plugins.list.arrayToList(f, e, null, b.config.enterMode, m.root.getAttribute("dir")).listNode,
                a, p;
            c(!0);
            c();
            d.replace(m.root);
            b.fire("contentDomInvalidated")
        }

        function B(b, m) {
            this.name = b;
            this.context = this.type = m;
            this.allowedContent =
                m + " li";
            this.requiredContent = m
        }

        function E(b, m, e, c) { for (var f, g; f = b[c ? "getLast" : "getFirst"](J);)(g = f.getDirection(1)) !== m.getDirection(1) && f.setAttribute("dir", g), f.remove(), e ? f[c ? "insertBefore" : "insertAfter"](e) : m.append(f, c) }

        function F(b) {
            function m(e) {
                var c = b[e ? "getPrevious" : "getNext"](u);
                c && c.type == CKEDITOR.NODE_ELEMENT && c.is(b.getName()) && (E(b, c, null, !e), b.remove(), b = c)
            }
            m();
            m(1)
        }

        function G(b) {
            return b.type == CKEDITOR.NODE_ELEMENT && (b.getName() in CKEDITOR.dtd.$block || b.getName() in CKEDITOR.dtd.$listItem) &&
                CKEDITOR.dtd[b.getName()]["#"]
        }

        function C(b, m, e) {
            b.fire("saveSnapshot");
            e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var c = e.extractContents();
            m.trim(!1, !0);
            var f = m.createBookmark(),
                g = new CKEDITOR.dom.elementPath(m.startContainer),
                k = g.block,
                g = g.lastElement.getAscendant("li", 1) || k,
                h = new CKEDITOR.dom.elementPath(e.startContainer),
                d = h.contains(CKEDITOR.dtd.$listItem),
                h = h.contains(CKEDITOR.dtd.$list);
            k ? (k = k.getBogus()) && k.remove() : h && (k = h.getPrevious(u)) && z(k) && k.remove();
            (k = c.getLast()) && k.type == CKEDITOR.NODE_ELEMENT &&
                k.is("br") && k.remove();
            (k = m.startContainer.getChild(m.startOffset)) ? c.insertBefore(k): m.startContainer.append(c);
            d && (c = A(d)) && (g.contains(d) ? (E(c, d.getParent(), d), c.remove()) : g.append(c));
            for (; e.checkStartOfBlock() && e.checkEndOfBlock();) {
                h = e.startPath();
                c = h.block;
                if (!c) break;
                c.is("li") && (g = c.getParent(), c.equals(g.getLast(u)) && c.equals(g.getFirst(u)) && (c = g));
                e.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START);
                c.remove()
            }
            e = e.clone();
            c = b.editable();
            e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
            e = new CKEDITOR.dom.walker(e);
            e.evaluator = function(a) { return u(a) && !z(a) };
            (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && F(e);
            m.moveToBookmark(f);
            m.select();
            b.fire("saveSnapshot")
        }

        function A(b) { return (b = b.getLast(u)) && b.type == CKEDITOR.NODE_ELEMENT && b.getName() in v ? b : null }
        var v = { ol: 1, ul: 1 },
            K = CKEDITOR.dom.walker.whitespaces(),
            H = CKEDITOR.dom.walker.bookmark(),
            u = function(b) { return !(K(b) || H(b)) },
            z = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function(b, m, e, c, f) {
                if (!v[b.getName()]) return [];
                c || (c = 0);
                e || (e = []);
                for (var g = 0, k = b.getChildCount(); g < k; g++) {
                    var h = b.getChild(g);
                    h.type == CKEDITOR.NODE_ELEMENT && h.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(h, m, e, c + 1);
                    if ("li" == h.$.nodeName.toLowerCase()) {
                        var d = { parent: b, indent: c, element: h, contents: [] };
                        f ? d.grandparent = f : (d.grandparent = b.getParent(), d.grandparent && "li" == d.grandparent.$.nodeName.toLowerCase() && (d.grandparent = d.grandparent.getParent()));
                        m && CKEDITOR.dom.element.setMarker(m, h, "listarray_index", e.length);
                        e.push(d);
                        for (var a = 0, p = h.getChildCount(), l; a < p; a++) l = h.getChild(a), l.type == CKEDITOR.NODE_ELEMENT && v[l.getName()] ? CKEDITOR.plugins.list.listToArray(l, m, e, c + 1, d.grandparent) : d.contents.push(l)
                    }
                }
                return e
            },
            arrayToList: function(b, m, e, c, f) {
                e || (e = 0);
                if (!b || b.length < e + 1) return null;
                for (var g, k = b[e].parent.getDocument(), h = new CKEDITOR.dom.documentFragment(k), d = null, a = e, p = Math.max(b[e].indent, 0), l = null, q, n, t = c == CKEDITOR.ENTER_P ? "p" : "div";;) {
                    var r = b[a];
                    g = r.grandparent;
                    q = r.element.getDirection(1);
                    if (r.indent == p) {
                        d && b[a].parent.getName() ==
                            d.getName() || (d = b[a].parent.clone(!1, 1), f && d.setAttribute("dir", f), h.append(d));
                        l = d.append(r.element.clone(0, 1));
                        q != d.getDirection(1) && l.setAttribute("dir", q);
                        for (g = 0; g < r.contents.length; g++) l.append(r.contents[g].clone(1, 1));
                        a++
                    } else if (r.indent == Math.max(p, 0) + 1) r = b[a - 1].element.getDirection(1), a = CKEDITOR.plugins.list.arrayToList(b, null, a, c, r != q ? q : null), !l.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= k.$.documentMode && l.append(k.createText(" ")), l.append(a.listNode), a = a.nextIndex;
                    else if (-1 ==
                        r.indent && !e && g) {
                        v[g.getName()] ? (l = r.element.clone(!1, !0), q != g.getDirection(1) && l.setAttribute("dir", q)) : l = new CKEDITOR.dom.documentFragment(k);
                        var d = g.getDirection(1) != q,
                            y = r.element,
                            D = y.getAttribute("class"),
                            z = y.getAttribute("style"),
                            A = l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (c != CKEDITOR.ENTER_BR || d || z || D),
                            w, B = r.contents.length,
                            x;
                        for (g = 0; g < B; g++)
                            if (w = r.contents[g], H(w) && 1 < B) A ? x = w.clone(1, 1) : l.append(w.clone(1, 1));
                            else if (w.type == CKEDITOR.NODE_ELEMENT && w.isBlockBoundary()) {
                            d && !w.getDirection() &&
                                w.setAttribute("dir", q);
                            n = w;
                            var C = y.getAttribute("style");
                            C && n.setAttribute("style", C.replace(/([^;])$/, "$1;") + (n.getAttribute("style") || ""));
                            D && w.addClass(D);
                            n = null;
                            x && (l.append(x), x = null);
                            l.append(w.clone(1, 1))
                        } else A ? (n || (n = k.createElement(t), l.append(n), d && n.setAttribute("dir", q)), z && n.setAttribute("style", z), D && n.setAttribute("class", D), x && (n.append(x), x = null), n.append(w.clone(1, 1))) : l.append(w.clone(1, 1));
                        x && ((n || l).append(x), x = null);
                        l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && a != b.length - 1 && (CKEDITOR.env.needsBrFiller &&
                            (q = l.getLast()) && q.type == CKEDITOR.NODE_ELEMENT && q.is("br") && q.remove(), (q = l.getLast(u)) && q.type == CKEDITOR.NODE_ELEMENT && q.is(CKEDITOR.dtd.$block) || l.append(k.createElement("br")));
                        q = l.$.nodeName.toLowerCase();
                        "div" != q && "p" != q || l.appendBogus();
                        h.append(l);
                        d = null;
                        a++
                    } else return null;
                    n = null;
                    if (b.length <= a || Math.max(b[a].indent, 0) < p) break
                }
                if (m)
                    for (b = h.getFirst(); b;) {
                        if (b.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(m, b), b.getName() in CKEDITOR.dtd.$listItem && (e = b, k = f = c = void 0, c = e.getDirection()))) {
                            for (f =
                                e.getParent(); f && !(k = f.getDirection());) f = f.getParent();
                            c == k && e.removeAttribute("dir")
                        }
                        b = b.getNextSourceNode()
                    }
                return { listNode: h, nextIndex: a }
            }
        };
        var L = /^h[1-6]$/,
            J = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        B.prototype = {
            exec: function(b) {
                this.refresh(b, b.elementPath());
                var m = b.config,
                    e = b.getSelection(),
                    c = e && e.getRanges();
                if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var f = b.editable();
                    if (f.getFirst(u)) {
                        var g = 1 == c.length && c[0];
                        (m = g && g.getEnclosedNode()) && m.is && this.type == m.getName() && this.setState(CKEDITOR.TRISTATE_ON)
                    } else m.enterMode ==
                        CKEDITOR.ENTER_BR ? f.appendBogus() : c[0].fixBlock(1, m.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), e.selectRanges(c)
                }
                for (var m = e.createBookmarks(!0), f = [], k = {}, c = c.createIterator(), h = 0;
                    (g = c.getNextRange()) && ++h;) {
                    var d = g.getBoundaryNodes(),
                        a = d.startNode,
                        p = d.endNode;
                    a.type == CKEDITOR.NODE_ELEMENT && "td" == a.getName() && g.setStartAt(d.startNode, CKEDITOR.POSITION_AFTER_START);
                    p.type == CKEDITOR.NODE_ELEMENT && "td" == p.getName() && g.setEndAt(d.endNode, CKEDITOR.POSITION_BEFORE_END);
                    g = g.createIterator();
                    for (g.forceBrBreak =
                        this.state == CKEDITOR.TRISTATE_OFF; d = g.getNextParagraph();)
                        if (!d.getCustomData("list_block")) {
                            CKEDITOR.dom.element.setMarker(k, d, "list_block", 1);
                            for (var l = b.elementPath(d), a = l.elements, p = 0, l = l.blockLimit, q, n = a.length - 1; 0 <= n && (q = a[n]); n--)
                                if (v[q.getName()] && l.contains(q)) {
                                    l.removeCustomData("list_group_object_" + h);
                                    (a = q.getCustomData("list_group_object")) ? a.contents.push(d): (a = { root: q, contents: [d] }, f.push(a), CKEDITOR.dom.element.setMarker(k, q, "list_group_object", a));
                                    p = 1;
                                    break
                                }
                            p || (p = l, p.getCustomData("list_group_object_" +
                                h) ? p.getCustomData("list_group_object_" + h).contents.push(d) : (a = { root: p, contents: [d] }, CKEDITOR.dom.element.setMarker(k, p, "list_group_object_" + h, a), f.push(a)))
                        }
                }
                for (q = []; 0 < f.length;)
                    if (a = f.shift(), this.state == CKEDITOR.TRISTATE_OFF)
                        if (v[a.root.getName()]) {
                            c = b;
                            h = a;
                            a = k;
                            g = q;
                            p = CKEDITOR.plugins.list.listToArray(h.root, a);
                            l = [];
                            for (d = 0; d < h.contents.length; d++) n = h.contents[d], (n = n.getAscendant("li", !0)) && !n.getCustomData("list_item_processed") && (l.push(n), CKEDITOR.dom.element.setMarker(a, n, "list_item_processed", !0));
                            for (var n = h.root.getDocument(), t = void 0, r = void 0, d = 0; d < l.length; d++) {
                                var y = l[d].getCustomData("listarray_index"),
                                    t = p[y].parent;
                                t.is(this.type) || (r = n.createElement(this.type), t.copyAttributes(r, { start: 1, type: 1 }), r.removeStyle("list-style-type"), p[y].parent = r)
                            }
                            a = CKEDITOR.plugins.list.arrayToList(p, a, null, c.config.enterMode);
                            p = void 0;
                            l = a.listNode.getChildCount();
                            for (d = 0; d < l && (p = a.listNode.getChild(d)); d++) p.getName() == this.type && g.push(p);
                            a.listNode.replace(h.root);
                            c.fire("contentDomInvalidated")
                        } else {
                            p =
                                b;
                            g = a;
                            d = q;
                            l = g.contents;
                            c = g.root.getDocument();
                            h = [];
                            1 == l.length && l[0].equals(g.root) && (a = c.createElement("div"), l[0].moveChildren && l[0].moveChildren(a), l[0].append(a), l[0] = a);
                            g = g.contents[0].getParent();
                            for (n = 0; n < l.length; n++) g = g.getCommonAncestor(l[n].getParent());
                            t = p.config.useComputedState;
                            p = a = void 0;
                            t = void 0 === t || t;
                            for (n = 0; n < l.length; n++)
                                for (r = l[n]; y = r.getParent();) {
                                    if (y.equals(g)) {
                                        h.push(r);
                                        !p && r.getDirection() && (p = 1);
                                        r = r.getDirection(t);
                                        null !== a && (a = a && a != r ? null : r);
                                        break
                                    }
                                    r = y
                                }
                            if (!(1 > h.length)) {
                                l =
                                    h[h.length - 1].getNext();
                                n = c.createElement(this.type);
                                d.push(n);
                                for (t = d = void 0; h.length;) d = h.shift(), t = c.createElement("li"), r = d, r.is("pre") || L.test(r.getName()) || "false" == r.getAttribute("contenteditable") ? d.appendTo(t) : (d.copyAttributes(t), a && d.getDirection() && (t.removeStyle("direction"), t.removeAttribute("dir")), d.moveChildren(t), d.remove()), t.appendTo(n);
                                a && p && n.setAttribute("dir", a);
                                l ? n.insertBefore(l) : n.appendTo(g)
                            }
                        }
                else this.state == CKEDITOR.TRISTATE_ON && v[a.root.getName()] && I.call(this, b, a, k);
                for (n = 0; n < q.length; n++) F(q[n]);
                CKEDITOR.dom.element.clearAllMarkers(k);
                e.selectBookmarks(m);
                b.focus()
            },
            refresh: function(b, m) {
                var e = m.contains(v, 1),
                    c = m.blockLimit || m.root;
                e && c.contains(e) ? this.setState(e.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
            }
        };
        CKEDITOR.plugins.add("list", {
            requires: "indentlist",
            init: function(b) {
                b.blockless || (b.addCommand("numberedlist", new B("numberedlist", "ol")), b.addCommand("bulletedlist", new B("bulletedlist", "ul")), b.ui.addButton &&
                    (b.ui.addButton("NumberedList", { label: b.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), b.ui.addButton("BulletedList", { label: b.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), b.on("key", function(m) {
                        var e = m.data.domEvent.getKey(),
                            c;
                        if ("wysiwyg" == b.mode && e in { 8: 1, 46: 1 }) {
                            var f = b.getSelection().getRanges()[0],
                                g = f && f.startPath();
                            if (f && f.collapsed) {
                                var k = 8 == e,
                                    h = b.editable(),
                                    d = new CKEDITOR.dom.walker(f.clone());
                                d.evaluator = function(a) {
                                    return u(a) &&
                                        !z(a)
                                };
                                d.guard = function(a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) };
                                e = f.clone();
                                if (k) {
                                    var a;
                                    (a = g.contains(v)) && f.checkBoundaryOfElement(a, CKEDITOR.START) && (a = a.getParent()) && a.is("li") && (a = A(a)) ? (c = a, a = a.getPrevious(u), e.moveToPosition(a && z(a) ? a : c, CKEDITOR.POSITION_BEFORE_START)) : (d.range.setStartAt(h, CKEDITOR.POSITION_AFTER_START), d.range.setEnd(f.startContainer, f.startOffset), (a = d.previous()) && a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in v || a.is("li")) && (a.is("li") || (d.range.selectNodeContents(a),
                                        d.reset(), d.evaluator = G, a = d.previous()), c = a, e.moveToElementEditEnd(c), e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END)));
                                    if (c) C(b, e, f), m.cancel();
                                    else {
                                        var p = g.contains(v);
                                        p && f.checkBoundaryOfElement(p, CKEDITOR.START) && (c = p.getFirst(u), f.checkBoundaryOfElement(c, CKEDITOR.START) && (a = p.getPrevious(u), A(c) ? a && (f.moveToElementEditEnd(a), f.select()) : b.execCommand("outdent"), m.cancel()))
                                    }
                                } else if (c = g.contains("li")) {
                                    if (d.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), k = (h = c.getLast(u)) &&
                                        G(h) ? h : c, g = 0, (a = d.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in v && a.equals(h) ? (g = 1, a = d.next()) : f.checkBoundaryOfElement(k, CKEDITOR.END) && (g = 2), g && a) {
                                        f = f.clone();
                                        f.moveToElementEditStart(a);
                                        if (1 == g && (e.optimize(), !e.startContainer.equals(c))) {
                                            for (c = e.startContainer; c.is(CKEDITOR.dtd.$inline);) p = c, c = c.getParent();
                                            p && e.moveToPosition(p, CKEDITOR.POSITION_AFTER_END)
                                        }
                                        2 == g && (e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END), f.endPath().block && f.moveToPosition(f.endPath().block, CKEDITOR.POSITION_AFTER_START));
                                        C(b, e, f);
                                        m.cancel()
                                    }
                                } else d.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), (a = d.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.is(v) && (a = a.getFirst(u), g.block && f.checkStartOfBlock() && f.checkEndOfBlock() ? (g.block.remove(), f.moveToElementEditStart(a), f.select()) : A(a) ? (f.moveToElementEditStart(a), f.select()) : (f = f.clone(), f.moveToElementEditStart(a), C(b, e, f)), m.cancel());
                                setTimeout(function() { b.selectionChange(1) })
                            }
                        }
                    }))
            }
        })
    })();
    (function() {
        var g = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90],
            n = { 8: 1, 46: 1 };
        CKEDITOR.plugins.add("undo", {
            init: function(a) {
                function b(a) { d.enabled && !1 !== a.data.command.canUndo && d.save() }

                function c() {
                    d.enabled = a.readOnly ? !1 : "wysiwyg" == a.mode;
                    d.onChange()
                }
                var d = a.undoManager = new e(a),
                    l = d.editingHandler = new k(d),
                    f = a.addCommand("undo", { exec: function() { d.undo() && (a.selectionChange(), this.fire("afterUndo")) }, startDisabled: !0, canUndo: !1 }),
                    h = a.addCommand("redo", {
                        exec: function() {
                            d.redo() &&
                                (a.selectionChange(), this.fire("afterRedo"))
                        },
                        startDisabled: !0,
                        canUndo: !1
                    });
                a.setKeystroke([
                    [g[0], "undo"],
                    [g[1], "redo"],
                    [g[2], "redo"]
                ]);
                d.onChange = function() {
                    f.setState(d.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                    h.setState(d.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                };
                a.on("beforeCommandExec", b);
                a.on("afterCommandExec", b);
                a.on("saveSnapshot", function(a) { d.save(a.data && a.data.contentOnly) });
                a.on("contentDom", l.attachListeners, l);
                a.on("instanceReady", function() { a.fire("saveSnapshot") });
                a.on("beforeModeUnload", function() { "wysiwyg" == a.mode && d.save(!0) });
                a.on("mode", c);
                a.on("readOnly", c);
                a.ui.addButton && (a.ui.addButton("Undo", { label: a.lang.undo.undo, command: "undo", toolbar: "undo,10" }), a.ui.addButton("Redo", { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" }));
                a.resetUndo = function() {
                    d.reset();
                    a.fire("saveSnapshot")
                };
                a.on("updateSnapshot", function() { d.currentImage && d.update() });
                a.on("lockSnapshot", function(a) {
                    a = a.data;
                    d.lock(a && a.dontUpdate, a && a.forceUpdate)
                });
                a.on("unlockSnapshot",
                    d.unlock, d)
            }
        });
        CKEDITOR.plugins.undo = {};
        var e = CKEDITOR.plugins.undo.UndoManager = function(a) {
            this.strokesRecorded = [0, 0];
            this.locked = null;
            this.previousKeyGroup = -1;
            this.limit = a.config.undoStackSize || 20;
            this.strokesLimit = 25;
            this.editor = a;
            this.reset()
        };
        e.prototype = {
            type: function(a, b) {
                var c = e.getKeyGroup(a),
                    d = this.strokesRecorded[c] + 1;
                b = b || d >= this.strokesLimit;
                this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange());
                b ? (d = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change");
                this.strokesRecorded[c] =
                    d;
                this.previousKeyGroup = c
            },
            keyGroupChanged: function(a) { return e.getKeyGroup(a) != this.previousKeyGroup },
            reset: function() {
                this.snapshots = [];
                this.index = -1;
                this.currentImage = null;
                this.hasRedo = this.hasUndo = !1;
                this.locked = null;
                this.resetType()
            },
            resetType: function() {
                this.strokesRecorded = [0, 0];
                this.typing = !1;
                this.previousKeyGroup = -1
            },
            refreshState: function() {
                this.hasUndo = !!this.getNextImage(!0);
                this.hasRedo = !!this.getNextImage(!1);
                this.resetType();
                this.onChange()
            },
            save: function(a, b, c) {
                var d = this.editor;
                if (this.locked ||
                    "ready" != d.status || "wysiwyg" != d.mode) return !1;
                var e = d.editable();
                if (!e || "ready" != e.status) return !1;
                e = this.snapshots;
                b || (b = new f(d));
                if (!1 === b.contents) return !1;
                if (this.currentImage)
                    if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== c && d.fire("change");
                e.splice(this.index + 1, e.length - this.index - 1);
                e.length == this.limit && e.shift();
                this.index = e.push(b) - 1;
                this.currentImage = b;
                !1 !== c && this.refreshState();
                return !0
            },
            restoreImage: function(a) {
                var b = this.editor,
                    c;
                a.bookmarks && (b.focus(), c = b.getSelection());
                this.locked = { level: 999 };
                this.editor.loadSnapshot(a.contents);
                a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select());
                this.locked = null;
                this.index = a.index;
                this.currentImage = this.snapshots[this.index];
                this.update();
                this.refreshState();
                b.fire("change")
            },
            getNextImage: function(a) {
                var b = this.snapshots,
                    c = this.currentImage,
                    d;
                if (c)
                    if (a)
                        for (d = this.index - 1; 0 <= d; d--) {
                            if (a = b[d], !c.equalsContent(a)) return a.index =
                                d, a
                        } else
                            for (d = this.index + 1; d < b.length; d++)
                                if (a = b[d], !c.equalsContent(a)) return a.index = d, a;
                return null
            },
            redoable: function() { return this.enabled && this.hasRedo },
            undoable: function() { return this.enabled && this.hasUndo },
            undo: function() { if (this.undoable()) { this.save(!0); var a = this.getNextImage(!0); if (a) return this.restoreImage(a), !0 } return !1 },
            redo: function() { if (this.redoable() && (this.save(!0), this.redoable())) { var a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 },
            update: function(a) {
                if (!this.locked) {
                    a ||
                        (a = new f(this.editor));
                    for (var b = this.index, c = this.snapshots; 0 < b && this.currentImage.equalsContent(c[b - 1]);) --b;
                    c.splice(b, this.index - b + 1, a);
                    this.index = b;
                    this.currentImage = a
                }
            },
            updateSelection: function(a) {
                if (!this.snapshots.length) return !1;
                var b = this.snapshots,
                    c = b[b.length - 1];
                return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1
            },
            lock: function(a, b) {
                if (this.locked) this.locked.level++;
                else if (a) this.locked = { level: 1 };
                else {
                    var c = null;
                    if (b) c = !0;
                    else {
                        var d = new f(this.editor, !0);
                        this.currentImage && this.currentImage.equalsContent(d) && (c = d)
                    }
                    this.locked = { update: c, level: 1 }
                }
            },
            unlock: function() {
                if (this.locked && !--this.locked.level) {
                    var a = this.locked.update;
                    this.locked = null;
                    if (!0 === a) this.update();
                    else if (a) {
                        var b = new f(this.editor, !0);
                        a.equalsContent(b) || this.update()
                    }
                }
            }
        };
        e.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 };
        e.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 };
        e.isNavigationKey = function(a) { return !!e.navigationKeyCodes[a] };
        e.getKeyGroup = function(a) {
            var b = e.keyGroups;
            return n[a] ? b.FUNCTIONAL : b.PRINTABLE
        };
        e.getOppositeKeyGroup = function(a) { var b = e.keyGroups; return a == b.FUNCTIONAL ? b.PRINTABLE : b.FUNCTIONAL };
        e.ieFunctionalKeysBug = function(a) { return CKEDITOR.env.ie && e.getKeyGroup(a) == e.keyGroups.FUNCTIONAL };
        var f = CKEDITOR.plugins.undo.Image = function(a, b) {
                this.editor = a;
                a.fire("beforeUndoImage");
                var c = a.getSnapshot();
                CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
                this.contents = c;
                b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0));
                a.fire("afterUndoImage")
            },
            h = /\b(?:href|src|name)="[^"]*?"/gi;
        f.prototype = {
            equalsContent: function(a) {
                var b = this.contents;
                a = a.contents;
                CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(h, ""), a = a.replace(h, ""));
                return b != a ? !1 : !0
            },
            equalsSelection: function(a) {
                var b = this.bookmarks;
                a = a.bookmarks;
                if (b || a) {
                    if (!b || !a || b.length != a.length) return !1;
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c],
                            e = a[c];
                        if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end,
                                e.end)) return !1
                    }
                }
                return !0
            }
        };
        var k = CKEDITOR.plugins.undo.NativeEditingHandler = function(a) {
            this.undoManager = a;
            this.ignoreInputEvent = !1;
            this.keyEventsStack = new m;
            this.lastKeydownImage = null
        };
        k.prototype = {
            onKeydown: function(a) {
                var b = a.data.getKey();
                if (229 !== b)
                    if (-1 < CKEDITOR.tools.indexOf(g, a.data.getKeystroke())) a.data.preventDefault();
                    else if (this.keyEventsStack.cleanUp(a), a = this.undoManager, this.keyEventsStack.getLast(b) || this.keyEventsStack.push(b), this.lastKeydownImage = new f(a.editor), e.isNavigationKey(b) ||
                    this.undoManager.keyGroupChanged(b))
                    if (a.strokesRecorded[0] || a.strokesRecorded[1]) a.save(!1, this.lastKeydownImage, !1), a.resetType()
            },
            onInput: function() {
                if (this.ignoreInputEvent) this.ignoreInputEvent = !1;
                else {
                    var a = this.keyEventsStack.getLast();
                    a || (a = this.keyEventsStack.push(0));
                    this.keyEventsStack.increment(a.keyCode);
                    this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs())
                }
            },
            onKeyup: function(a) {
                var b = this.undoManager;
                a = a.data.getKey();
                var c = this.keyEventsStack.getTotalInputs();
                this.keyEventsStack.remove(a);
                if (!(e.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new f(b.editor, !0))))
                    if (0 < c) b.type(a);
                    else if (e.isNavigationKey(a)) this.onNavigationKey(!0)
            },
            onNavigationKey: function(a) {
                var b = this.undoManager;
                !a && b.save(!0, null, !1) || b.updateSelection(new f(b.editor));
                b.resetType()
            },
            ignoreInputEventListener: function() { this.ignoreInputEvent = !0 },
            attachListeners: function() {
                var a = this.undoManager.editor,
                    b = a.editable(),
                    c = this;
                b.attachListener(b, "keydown", function(a) { c.onKeydown(a); if (e.ieFunctionalKeysBug(a.data.getKey())) c.onInput() }, null, null, 999);
                b.attachListener(b, CKEDITOR.env.ie ? "keypress" : "input", c.onInput, c, null, 999);
                b.attachListener(b, "keyup", c.onKeyup, c, null, 999);
                b.attachListener(b, "paste", c.ignoreInputEventListener, c, null, 999);
                b.attachListener(b, "drop", c.ignoreInputEventListener, c, null, 999);
                b.attachListener(b.isInline() ? b : a.document.getDocumentElement(), "click", function() { c.onNavigationKey() },
                    null, null, 999);
                b.attachListener(this.undoManager.editor, "blur", function() { c.keyEventsStack.remove(9) }, null, null, 999)
            }
        };
        var m = CKEDITOR.plugins.undo.KeyEventsStack = function() { this.stack = [] };
        m.prototype = {
            push: function(a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] },
            getLastIndex: function(a) {
                if ("number" != typeof a) return this.stack.length - 1;
                for (var b = this.stack.length; b--;)
                    if (this.stack[b].keyCode == a) return b;
                return -1
            },
            getLast: function(a) {
                a = this.getLastIndex(a);
                return -1 != a ? this.stack[a] :
                    null
            },
            increment: function(a) { this.getLast(a).inputs++ },
            remove: function(a) { a = this.getLastIndex(a); - 1 != a && this.stack.splice(a, 1) },
            resetInputs: function(a) {
                if ("number" == typeof a) this.getLast(a).inputs = 0;
                else
                    for (a = this.stack.length; a--;) this.stack[a].inputs = 0
            },
            getTotalInputs: function() { for (var a = this.stack.length, b = 0; a--;) b += this.stack[a].inputs; return b },
            cleanUp: function(a) {
                a = a.data.$;
                a.ctrlKey || a.metaKey || this.remove(17);
                a.shiftKey || this.remove(16);
                a.altKey || this.remove(18)
            }
        }
    })();
    CKEDITOR.config.plugins = 'dialogui,dialog,about,basicstyles,button,toolbar,notification,clipboard,enterkey,entities,floatingspace,wysiwygarea,indent,indentlist,fakeobjects,link,list,undo';
    CKEDITOR.config.skin = 'moono-lisa';
    (function() {
        var setIcons = function(icons, strip) {
            var path = CKEDITOR.getUrl('plugins/' + strip);
            icons = icons.split(',');
            for (var i = 0; i < icons.length; i++) CKEDITOR.skin.icons[icons[i]] = { path: path, offset: -icons[++i], bgsize: icons[++i] };
        };
        if (CKEDITOR.env.hidpi) setIcons('about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,copy-rtl,168,,copy,192,,cut-rtl,216,,cut,240,,paste-rtl,264,,paste,288,,indent-rtl,312,,indent,336,,outdent-rtl,360,,outdent,384,,anchor-rtl,408,,anchor,432,,link,456,,unlink,480,,bulletedlist-rtl,504,,bulletedlist,528,,numberedlist-rtl,552,,numberedlist,576,,redo-rtl,600,,redo,624,,undo-rtl,648,,undo,672,', 'icons_hidpi.png');
        else setIcons('about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,copy-rtl,168,auto,copy,192,auto,cut-rtl,216,auto,cut,240,auto,paste-rtl,264,auto,paste,288,auto,indent-rtl,312,auto,indent,336,auto,outdent-rtl,360,auto,outdent,384,auto,anchor-rtl,408,auto,anchor,432,auto,link,456,auto,unlink,480,auto,bulletedlist-rtl,504,auto,bulletedlist,528,auto,numberedlist-rtl,552,auto,numberedlist,576,auto,redo-rtl,600,auto,redo,624,auto,undo-rtl,648,auto,undo,672,auto', 'icons.png');
    })();
    CKEDITOR.lang.languages = { "af": 1, "sq": 1, "ar": 1, "az": 1, "eu": 1, "bn": 1, "bs": 1, "bg": 1, "ca": 1, "zh-cn": 1, "zh": 1, "hr": 1, "cs": 1, "da": 1, "nl": 1, "en": 1, "en-au": 1, "en-ca": 1, "en-gb": 1, "eo": 1, "et": 1, "fo": 1, "fi": 1, "fr": 1, "fr-ca": 1, "gl": 1, "ka": 1, "de": 1, "de-ch": 1, "el": 1, "gu": 1, "he": 1, "hi": 1, "hu": 1, "is": 1, "id": 1, "it": 1, "ja": 1, "km": 1, "ko": 1, "ku": 1, "lv": 1, "lt": 1, "mk": 1, "ms": 1, "mn": 1, "no": 1, "nb": 1, "oc": 1, "fa": 1, "pl": 1, "pt-br": 1, "pt": 1, "ro": 1, "ru": 1, "sr": 1, "sr-latn": 1, "si": 1, "sk": 1, "sl": 1, "es": 1, "es-mx": 1, "sv": 1, "tt": 1, "th": 1, "tr": 1, "ug": 1, "uk": 1, "vi": 1, "cy": 1 };
}());