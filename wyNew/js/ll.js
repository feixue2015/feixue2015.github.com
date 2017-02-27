"use strict";
! function(t, e) {
	for (var i, n = 0, o = "webkit moz ms o".split(" "), a = window.requestAnimationFrame, s = window.cancelAnimationFrame, r = 0; r < o.length && (!a || !s); r++) i = o[r], a = a || window[i + "RequestAnimationFrame"], s = s || window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"];
	a && s || (a = function(t, e) {
		var i = (new Date).getTime(),
			o = Math.max(0, 16 - (i - n)),
			a = window.setTimeout(function() {
				t(i + o)
			}, o);
		return n = i + o, a
	}, s = function(t) {
		window.clearTimeout(t)
	}), window.requestAnimationFrame = a, window.cancelAnimationFrame = s, e.tools = {
		uaMatch: {
			iOS5: null != navigator.userAgent.match(/OS 5_/i),
			isIos9: null != navigator.userAgent.match(/OS 9_/i),
			isIphone: !!navigator.userAgent.match(/iphone/gi),
			isIos: !!navigator.userAgent.match(/iphone|ipad/gi),
			isIpad: !!navigator.userAgent.match(/ipad/gi),
			isNewsapp: !!navigator.userAgent.match(/NewsApp/gi),
			isWinPhone: !!navigator.userAgent.match(/Windows Phone/gi),
			isWeixin: !!navigator.userAgent.match(/MicroMessenger/gi),
			isSogou: !!navigator.userAgent.match(/sogoumobilebrowser/gi),
			isUCBrowser: !!navigator.userAgent.match(/UCBrowser/gi),
			isQQBrowser: !(!navigator.userAgent.match(/MQQBrowser/gi) || navigator.userAgent.match(/MicroMessenger/gi)),
			isBaidu: !!navigator.userAgent.match(/baidu/gi),
			isTrident: navigator.userAgent.indexOf("Trident") > -1,
			isPresto: navigator.userAgent.indexOf("Presto") > -1,
			isWebKit: navigator.userAgent.indexOf("AppleWebKit") > -1,
			isGecko: navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1,
			isMobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),
			isTIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			isAndroid: navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1,
			iswebApp: navigator.userAgent.indexOf("Safari") == -1,
			isQQ: !!navigator.userAgent.match(/QQ\//i),
			isIosSafari: function() {
				var t = navigator.userAgent,
					e = /applewebkit\/\d+(\.\d+)*\d+\s*\(KHTML,\s*like\s*Gecko\)\s*version\/\d+(\.\d+)*\.\d+\s*mobile\/\d+\w\d+\s*safari\/\d+(\.\d+)*\.\d+$/i,
					i = window.hasOwnProperty("isLBBrowser");
				return e.test(t) && !i
			}()
		},
		publicMethod: {
			localParam: function(t, e) {
				var i;
				return t = t || window.location.search, e = e || window.location.hash, i = function(t, e) {
					var i;
					if (t) return i = {}, t.replace(e, function(t, e, n, o) {
						i[e] = o
					}), i
				}, {
					search: i(t, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
					hash: i(e, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
				}
			},
			preDefault: function(t) {
				t.preventDefault()
			},
			fetchdata: function(i, n, o) {
				function a(i, n) {
					i ? t.ajax(n) : e.AJAX = e.DP.ajax(n)
				}
				var s = this;
				1 === arguments.length && "function" == typeof i && (n = i, i = {}), i = "object" == typeof i ? i : {};
				var r = i.offset || 0,
					c = i.size || 10,
					l = i.channel || "0001",
					h = i.url,
					p = void 0 === i.cache || i.cache,
					d = i.child || "all",
					u = (i.abort, !!i.notformat),
					m = "undefined" == typeof i.useflag || i.useflag,
					f = {
						type: i.type || "GET",
						cache: p,
						url: h || "newap_article_list?offset=" + r + "&size=" + c + "&channel=" + l + "&child=" + d,
						dataType: i.dataType || "jsonp",
						success: function(t) {
							s._runflag = !1, n && n.call(s, t)
						},
						error: function(t) {
							s._runflag = !1, o && o.call(s)
						}
					};
				m ? 0 == this._runflag && (this._runflag = !0, a(u, f)) : a(u, f)
			},
			fetch: function(i) {
				function n(i, n) {
					i ? t.ajax(n) : e.AJAX = e.DP.ajax(n)
				}
				var o, a, s = this,
					r = "newap_article_list",
					c = i.DPData || {},
					l = i.success,
					h = i.error,
					p = t.Deferred(),
					d = !!i.notformat,
					u = "undefined" == typeof i.useflag || i.useflag;
				return c.offset = c.offset || 0, c.size = c.size || 10, i.url ? (o = i.url + "?", d || t.each(c, function(t, e) {
					o += t + "=" + e + "&"
				})) : (o = r + "?", t.each(c, function(t, e) {
					o += t + "=" + e + "&"
				})), o = o.slice(0, -1), i.url = o, a = t.extend(i, {
					success: function(t) {
						s._runflag = !1, p.resolve(t), l && l.call(s, t)
					},
					error: function(t) {
						s._runflag = !1, p.reject(t), h && h.call(s, t)
					}
				}), u ? this._runflag || (this._runflag = !0, n(d, a)) : n(d, a), p
			},
			jsonp: function(e, i) {
				var n = document.getElementsByTagName("head")[0],
					o = e.callbackName,
					a = e.url,
					s = t.Deferred && t.Deferred();
				window[o] = void 0, window[o] = function(t) {
					r.parentNode && n.removeChild(r), i && i(t), s && s.resolve(t)
				};
				var r = document.createElement("script");
				return r.src = a, n.appendChild(r), r.onerror = function(t) {
					n.removeChild(r), s && s.reject(t)
				}, s && s.promise()
			},
			generateHtml: function(e, i, n, o, a) {
				var s, r, c, l, h = "",
					p = o ? e.find("section").length : 0,
					d = [],
					u = 0;
				if ("string" == typeof n && (o = n, n = void 0), "object" == t.type(i)) {
					if (n) {
						var m, f = n.focus ? n.focus : [];
						for (s = f ? this.arrToObj(f, "adposition") : {}, c = i.data.slice(0, 4), l = c.length + f.slice(0, c.length).length; d.length < l;) u += 1, s[u] ? d.push({
							link: "#",
							pic_info: [{
								url: "http://img1.cache.netease.com/f2e/wap/touch_index_rc/images/bg_img_sm.png"
							}]
						}) : (m = c.shift(), d.push(m))
					} else d = i.data;
					try {
						h = Handlebars.templates.headslide_tpl({
							data: d
						})
					} catch (g) {
						console.trace(g)
					}
				} else "array" == t.type(i) && (r = n && n.list ? this.arrToObj(n.list, "adposition") : {}, t.each(r, function(t, e) {
					var n, o = parseInt(t) - 1;
					o >= p && o <= p + i.length && (n = 0 == p ? o : o - p, i.splice(n, 0, e))
				}), t.each(i, function(t, e) {
					if (e.type)
						if ("photoset" == e.type) try {
							h += e.pic_info.length < 3 ? Handlebars.templates.doc_tpl(e) : Handlebars.templates.photoset_tpl(e)
						} catch (i) {
							console.log(i)
						} else try {
							h += Handlebars.templates[e.type + "_tpl"](e)
						} catch (i) {
							console.trace(i)
						} else if (void 0 !== e.adposition) try {
							h += Handlebars.templates[a || "noAD_tpl"]({})
						} catch (i) {
							console.log(i)
						}
				}));
				"before" === o ? e.prepend(h) : "after" === o ? e.append(h) : e.html(h)
			},
			getDayDvalue: function(e) {
				var i, n = "number" != t.type(e) ? e.replace(/\-/g, "/") : e,
					o = new Date(n).getTime(),
					a = new Date,
					s = a.getTime(),
					r = 60 * a.getTimezoneOffset() * 1e3,
					c = s + r + 288e5,
					l = c - o,
					h = Math.ceil(l / 1e3 / 60);
				return i = h < 60 ? h.toFixed() + "\u5206\u949f\u524d" : h >= 60 && h < 1440 ? (h / 60).toFixed() + "\u5c0f\u65f6\u524d" : h >= 1440 && h < 2880 ? "\u6628\u5929" : h >= 2880 && h < 4320 ? "\u524d\u5929" : "3\u5929\u524d"
			},
			arrToObj: function(t, e) {
				for (var i = {}, n = 0, o = t.length; n < o; n++) t[n][e] && (i[t[n][e]] = t[n]);
				return i
			},
			getDirection: function() {
				function t(t) {
					n.x = t.touches[0].clientX, n.y = t.touches[0].clientY
				}

				function e(t) {
					if (o.x = t.changedTouches[0].clientX - n.x, o.y = t.changedTouches[0].clientY - n.y, Math.abs(o.x) > Math.abs(o.y)) {
						if (o.x > 0) return "right";
						if (o.x < 0) return "left"
					} else if (Math.abs(o.x) < Math.abs(o.y)) {
						if (o.y > 0) return "bottom";
						if (o.y < 0) return "top"
					}
				}

				function i(t) {
					o = {}
				}
				var n = {},
					o = {};
				return {
					start: t,
					move: e,
					end: i
				}
			},
			find: function(t, e) {
				for (var i, n = 0, o = t.length; n < o; n++)
					if (e(n, t[n])) {
						i = t[n];
						break
					}
				return i
			},
			reviseViewPort: function(e, i) {
				var n = e || 200,
					o = 0,
					a = i || 5,
					s = setInterval(function() {
						var e, i = screen.width > 0 && window.innerWidth >= screen.width ? screen.width : window.innerWidth;
						i < window.screenWidth_ ? (window.screenWidth_ = i, t(window).trigger("viewPort:changed", i), e = i > 1080 ? 144 : i / 7.5, e = e > 32 ? e : 32, document.getElementsByTagName("html")[0].style.fontSize = e + "px", clearInterval(s)) : o++, o >= a && clearInterval(s)
					}, n)
			},
			isSupportSticky: function() {
				for (var t = ["", "-webkit-", "-ms-", "-moz-", "-o-"], e = "", i = 0; i < t.length; i++) e += "position:" + t[i] + "sticky;";
				var n = document.createElement("div"),
					o = document.body;
				n.style.cssText = "display:none;" + e, o.appendChild(n);
				var a = /sticky/i.test(window.getComputedStyle(n).position);
				return o.removeChild(n), n = null, a
			},
			cookie: {
				getItem: function(t) {
					return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
				},
				setItem: function(t, e, i, n, o, a) {
					if (!t || /^(?:expires|max\-age|path|domain|secure)$/i.test(t)) return !1;
					var s = "";
					if (i) switch (i.constructor) {
						case Number:
							s = i === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + i;
							break;
						case String:
							s = "; expires=" + i;
							break;
						case Date:
							s = "; expires=" + i.toUTCString()
					}
					return document.cookie = encodeURIComponent(t) + "=" + encodeURIComponent(e) + s + (o ? "; domain=" + o : "") + (n ? "; path=" + n : "") + (a ? "; secure" : ""), !0
				},
				removeItem: function(t, e, i) {
					return !(!t || !this.hasItem(t)) && (document.cookie = encodeURIComponent(t) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (i ? "; domain=" + i : "") + (e ? "; path=" + e : ""), !0)
				},
				hasItem: function(t) {
					return new RegExp("(?:^|;\\s*)" + encodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
				},
				keys: function() {
					for (var t = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), e = 0; e < t.length; e++) t[e] = decodeURIComponent(t[e]);
					return t
				}
			},
			getRandom: function(t, e) {
				return Math.round(Math.random() * (e - t) + t)
			},
			doTrackerQueue: function() {
				var t, i, n, o = e.trackerQueue;
				try {
					for (var a = 0; a <= o.length - 1; a++) t = o[a].key || "error", i = o[a].name || "forManual", n = o[a].desc || "\u9519\u8bef\u7684\u5217\u8868\u4f7f\u7528", neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/" + t + "/#" + i, n, "wapclick")
				} catch (s) {}
			},
			isLocalStorageSupported: function() {
				var t = "test",
					e = window.localStorage;
				try {
					e.setItem(t, "testValue")
				} catch (i) {
					return console.log("localStorage.setItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
				}
				try {
					return "testValue" == e.getItem(t) && (e.removeItem(t), !0)
				} catch (i) {
					return console.log("localStorage.getItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
				}
			},
			isCookieSupported: function() {
				var t = "test",
					i = e.tools.publicMethod.cookie;
				try {
					i.setItem(t, "testValue")
				} catch (n) {
					return console.log("docCookies.setItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
				}
				try {
					return "testValue" == i.getItem(t) && (i.removeItem(t), !0)
				} catch (n) {
					return console.log("docCookies.getItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
				}
			},
			urlAddSearch: function(t, e, i) {
				var n, o = !i || i,
					a = function(t) {
						var e = document.createElement("a");
						return e.href = t, e
					},
					t = new a(t),
					s = t.href.match(/\?/) && t.href.match(/\?$/) ? "?" : "",
					r = t.search;
				s || t.href.match(/\?/) || (s = "?"), r += s;
				for (var c in e)
					if (e[c] && ("string" == typeof e[c] || "number" == typeof e[c]))
						if (o) {
							var l = this.localParam(r);
							if (l.search[c]) {
								var h = new RegExp(c + "=([^&]*)", "");
								r = r.replace(h, function(t, i) {
									return c + "=" + e[c]
								})
							} else r += "&" + c + "=" + e[c]
						} else r += "&" + c + "=" + e[c];
				return r = r.replace(/\?&/g, function() {
					return "?"
				}), n = t.origin + t.pathname + r + t.hash
			},
			inheritSearch: function(t, e, i) {
				var n = i ? i : location.href,
					o = n.replace(/.*(\?.*)/, function(t, e) {
						return e
					}),
					a = e,
					s = {},
					r = this.localParam(o).search;
				return t.forEach(function(t, e, i) {
					r[t] && (s[t] = r[t])
				}), a = this.urlAddSearch(a, s)
			},
			getLoginInfo: function() {
				try {
					document.domain = "163.com"
				} catch (e) {}
				var i = t.Deferred(),
					n = this.cookie.getItem("P_INFO") ? this.cookie.getItem("P_INFO").split("|") : "",
					o = this.cookie.getItem("S_INFO"),
					a = n[0],
					s = {
						userName: a ? a.split("@")[0] : "",
						userMail: a,
						userDomain: a ? a.split("@")[1] : "",
						userIp: this.cookie.getItem("USERTRACK"),
						logined: !(!a || !o && 1 != n[2])
					};
				return s.logined ? this.fetch({
					url: "http://sdk.comment.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/users/myInfo",
					dataType: "jsonp",
					notformat: !0,
					success: function(e) {
						var n = {
							nickname: e.nickname,
							avatar: e.avatar
						};
						t.extend(!0, s, n), i.resolve(s)
					}
				}) : i.resolve(s), i
			},
			scrollY: function() {
				return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
			},
			simpleTransition: function(t, e, i, n) {
				var o = function(t) {
						t += (e - t) * i, t = Math.abs(e - t) < 1 ? e : t, n(t), t !== e && a(function() {
							o(t)
						})
					},
					r = a(function() {
						o(t)
					});
				return {
					stop: function() {
						s(r)
					}
				}
			},
			getQD: function() {
				var t = this.localParam(),
					e = "";
				return t.search.qd ? e += t.search.qd : !t.search.from || "gionee" != t.search.from && "sogou" != t.search.from ? t.search.lb && "gionee" == t.search.lb ? e += t.search.lb : e = "" : e += t.search.from, e
			},
			transURL: function(t) {
				var e, i = window.location.href,
					n = document.createElement("a"),
					o = document.createElement("a");
				return n.href = t, o.href = i, e = (o.search.match(/&qd=[^&]+/) ? o.search.match(/&qd=[^&]+/)[0] : "") + (o.search.match(/&from=[^&]+/) ? o.search.match(/&from=[^&]+/)[0] : "") + (o.search.match(/&lb=[^&]+/) ? o.search.match(/&lb=[^&]+/)[0] : ""), n.search = n.search.match(/\?/) ? n.search + e : "?" + e.replace("&", ""), n.href
			}
		},
		RedPacket: function() {
			function i(t) {
				return t = t || {}, this.hadOpenKey = t.hadOpenKey || "NEWAP_RedPacket_HadOpen", this.noOpenKey = t.noOpenKey || "NEWAP_RedPacket_NoOpen", this.toBeGrace = this.isLocalStorageSupported(), !!this.toBeGrace && void this.init()
			}
			var n = window.localStorage;
			return i.prototype = {
				init: function() {
					var t, e, i, o, a = (new Date).getTime(),
						s = parseInt(a / 864e5),
						r = {},
						c = {};
					t = JSON.parse(n.getItem(this.hadOpenKey)) || {}, e = JSON.parse(n.getItem(this.noOpenKey)) || {}, i = t[s] || [], o = e[s] || [], r[s] = i, c[s] = o, n.setItem(this.hadOpenKey, JSON.stringify(r)), n.setItem(this.noOpenKey, JSON.stringify(c))
				},
				showEntry: function(i) {
					var o = (new Date).getTime(),
						a = parseInt(o / 864e5);
					if ("string" !== t.type(i)) return !1;
					var s, r, c;
					return !!e.tools.publicMethod.isLocalStorageSupported && (s = JSON.parse(n.getItem(this.hadOpenKey)) || {}, r = s[a] || [], c = t.grep(r, function(t) {
						return t === i
					}), !c.length > 0)
				},
				writeIn: function(i) {
					var o = (new Date).getTime(),
						a = parseInt(o / 864e5);
					if ("string" !== t.type(i)) return !1;
					if (!e.tools.publicMethod.isLocalStorageSupported) return !1;
					var s = JSON.parse(n.getItem(this.noOpenKey)) || {};
					s[a] = s[a] || [], s[a].push(i), n.setItem(this.noOpenKey, JSON.stringify(s))
				},
				isLocalStorageSupported: function() {
					var t = "test",
						e = window.localStorage;
					try {
						e.setItem(t, "testValue")
					} catch (i) {
						return console.log("localStorage.setItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
					}
					try {
						return "testValue" == e.getItem(t) && (e.removeItem(t), !0)
					} catch (i) {
						return console.log("localStorage.getItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
					}
				}
			}, i
		}(),
		checkMethod: {
			checkWakeupClientFlag: function() {
				var t = function(t) {
					if (e.tools.publicMethod.isLocalStorageSupported()) {
						var i, n, o = window.localStorage;
						try {
							i = o.getItem(t), n = i
						} catch (a) {
							console.log("localStorage.getItem\u4e0d\u80fd\u6267\u884c")
						}
						return n
					}
					return !1
				}("NEWAP_Article_WakeupclientFlag");
				return !!t && (t = JSON.parse(t), !!t.flag && "wakeup" == t.flag)
			}
		}
	}
}(Zepto, window.NEWAP = window.NEWAP || {}),
function(t, e) {
	t.extend(e.tools, {
		commentMethod: {
			submitReply: function(t, e, i, n) {
				var o = this.createCORSRequest("post", t);
				if (o) {
					o.withCredentials = !0, o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.onload = function() {
						i && i(o.responseText)
					}, o.onerror = function() {
						n && n(o.responseText)
					};
					var a = this.serialize(e);
					o.send(a)
				} else this.postForm(t, e, i, n)
			},
			createCORSRequest: function(t, e) {
				var i = new XMLHttpRequest;
				return "withCredentials" in i ? i.open(t, e, !0) : "undefined" != typeof XDomainRequest ? (i = new XDomainRequest, i.open(t, e)) : i = null, i
			},
			serialize: function(e) {
				return e ? "string" == typeof e ? e : t.param(e) : null
			},
			replayHandle: function(t) {
				var e = +t.rcount + +t.cmtVote + +t.cmtAgainst;
				parseInt(e) > 99999 && (e = parseInt(e / 1e4) + "\u4e07");
				var i = "http://3g.163.com/touch/comment.html?docid=" + t.docId;
				return {
					comCount: e,
					comLink: i
				}
			},
			postForm: function(e, i, n, o) {
				var a = 1e5 * Math.random() | 0,
					s = t("<iframe id='touchPostHelperIframe" + a + "' name='touchPostHelperIframe" + a + "'>").css({
						display: "none"
					}).appendTo($body),
					r = t("<form id='touchPostHelperForm" + a + "'  style='display: none;'>").appendTo($body);
				r.attr({
					action: e,
					method: "post",
					target: "touchPostHelperIframe" + a
				});
				for (var c in i) i.hasOwnProperty(c) && t("<input type='text'>").attr({
					name: c,
					value: i[c]
				}).appendTo(r);
				s.on("load", function(t) {
					n && n(t)
				}).on("error", function(t) {
					o && o(t)
				}), r[0].submit()
			}
		}
	})
}(Zepto, window.NEWAP = window.NEWAP || {}),
function() {
	var t = {
		tuijian: {
			name: "\u63a8\u8350",
			channel: "all",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		war: {
			name: "\u519b\u4e8b",
			channel: "war",
			route: "",
			articleList: {
				topicid: "BAI67OGGwangning",
				topdataPriority: 89
			},
			tiename: "news",
			logoclassname: "war_logo"
		},
		"0001": {
			name: "\u65b0\u95fb",
			channel: "news",
			route: "",
			articleList: {
				topicid: "BBM54PGAwangning",
				topdataPriority: 999
			},
			tiename: "news",
			logoclassname: "news_logo",
			appointList: {
				size: 5,
				offset: 0,
				topicid: "BHB31870wangning"
			},
			child: {
				discovery: {
					name: "\u63a2\u7d22",
					channel: "news",
					route: "",
					articleList: {
						topicid: "BD29JDBPwangning",
						topdataPriority: 999
					}
				},
				society: {
					name: "\u793e\u4f1a",
					channel: "news",
					route: "",
					articleList: {
						topicid: "BCR1UC1Qwangning",
						topdataPriority: 999
					}
				},
				domestic: {
					name: "\u56fd\u5185",
					channel: "news",
					route: "",
					articleList: {
						topicid: "BD29LPUBwangning",
						topdataPriority: 999
					}
				},
				international: {
					name: "\u56fd\u9645",
					channel: "news",
					route: "",
					articleList: {
						topicid: "BD29MJTVwangning",
						topdataPriority: 999
					}
				},
				history: {
					name: "\u5386\u53f2",
					channel: "news",
					route: "",
					articleList: {
						topicid: "C275ML7Gwangning",
						topdataPriority: 999
					}
				}
			}
		},
		"0003": {
			name: "\u5a31\u4e50",
			channel: "ent",
			route: "",
			articleList: {
				topicid: "BA10TA81wangning",
				topdataPriority: 200
			},
			tiename: "ent",
			logoclassname: "ent_logo",
			child: {
				television: {
					name: "\u7535\u89c6",
					channel: "ent",
					route: "",
					articleList: {
						topicid: "BD2A86BEwangning",
						topdataPriority: 999
					}
				},
				movie: {
					name: "\u7535\u5f71",
					channel: "ent",
					route: "",
					articleList: {
						topicid: "BD2A9LEIwangning",
						topdataPriority: 999
					}
				},
				star: {
					name: "\u660e\u661f",
					channel: "ent",
					route: "",
					articleList: {
						topicid: "BD2AB5L9wangning",
						topdataPriority: 999
					}
				},
				music: {
					name: "\u97f3\u4e50",
					channel: "ent",
					route: "",
					articleList: {
						topicid: "BD2AC4LMwangning",
						topdataPriority: 999
					}
				},
				entevent: {
					name: "\u5f71\u89c6\u6b4c",
					channel: "ent",
					route: "",
					articleList: {
						topicid: "C2769L6Ewangning",
						topdataPriority: 999
					}
				}
			}
		},
		"0004": {
			name: "\u72ec\u5bb6",
			channel: "exclusive",
			route: "",
			articleList: {
				topicid: "BAI5E21Owangning",
				topdataPriority: 100
			},
			tiename: "news",
			logoclassname: "exclusive_logo",
			child: {
				qsyk: {
					name: "\u8f7b\u677e\u4e00\u523b",
					channel: "exclusive",
					route: "",
					articleList: {
						topicid: "BD21K0DLwangning",
						topdataPriority: 999
					}
				},
				pbgt: {
					name: "\u80d6\u7f16\u602a\u8c08",
					channel: "exclusive",
					route: "",
					articleList: {
						topicid: "BD27I3V6wangning",
						topdataPriority: 999
					}
				},
				ydictionary: {
					name: "\u6613\u767e\u79d1",
					channel: "exclusive",
					route: "",
					articleList: {
						topicid: "BD27JIQ4wangning",
						topdataPriority: 999
					}
				},
				chatinnight: {
					name: "\u6df1\u591c\u7545\u804a",
					channel: "exclusive",
					route: "",
					articleList: {
						topicid: "BD27RALJwangning",
						topdataPriority: 999
					}
				},
				realityshow: {
					name: "\u771f\u4eba\u79c0",
					channel: "exclusive",
					route: "",
					articleList: {
						topicid: "BD27T12Kwangning",
						topdataPriority: 999
					}
				},
				clock7news: {
					name: "\u65b0\u95fb\u4e03\u70b9\u6574",
					channel: "exclusive",
					route: "",
					articleList: {
						topicid: "BD27UEEMwangning",
						topdataPriority: 999
					}
				},
				todayvoice: {
					name: "\u4eca\u65e5\u4e4b\u58f0",
					channel: "exclusive",
					route: "",
					articleList: {
						topicid: "BD284UM8wangning",
						topdataPriority: 999
					}
				}
			}
		},
		air: {
			name: "\u822a\u7a7a",
			channel: "air",
			route: "",
			articleList: {
				topicid: "C276R52Iwangning",
				topdataPriority: 999
			}
		},
		"0005": {
			name: "\u4f53\u80b2",
			channel: "sports",
			route: "",
			articleList: {
				topicid: "BA8E6OEOwangning",
				topdataPriority: 250
			},
			tiename: "sports",
			logoclassname: "sports_logo",
			secondFocus: {
				topicid: "BBM8S6RFwangning",
				topdataPriority: 999
			},
			articleListHead: {
				topicid: "BBUOPQ56wangning",
				topdataPriority: 999
			},
			child: {
				nba: {
					name: "NBA",
					channel: "sports",
					route: "",
					articleList: {
						topicid: "BD2AQH4Qwangning",
						topdataPriority: 999
					}
				},
				cba: {
					name: "CBA",
					channel: "sports",
					route: "",
					articleList: {
						topicid: "BD2ARVG2wangning",
						topdataPriority: 999
					}
				},
				csl: {
					name: "\u4e2d\u8d85",
					channel: "sports",
					route: "",
					articleList: {
						topicid: "BD2ASUDCwangning",
						topdataPriority: 999
					}
				},
				isocce: {
					name: "\u56fd\u9645\u8db3\u7403",
					channel: "sports",
					route: "",
					articleList: {
						topicid: "BD2ATMK0wangning",
						topdataPriority: 999
					}
				},
				synthesis: {
					name: "\u7efc\u5408",
					channel: "sports",
					route: "",
					articleList: {
						topicid: "BD2B0KQ2wangning",
						topdataPriority: 999
					}
				}
			}
		},
		"0006": {
			name: "\u65c5\u6e38",
			channel: "travel",
			route: "",
			articleList: {
				topicid: "BEO4GINLwangning",
				topdataPriority: 999
			}
		},
		"0007": {
			name: "\u81ea\u8425\u623f\u4ea7",
			channel: "house",
			route: "",
			articleList: {
				topicid: "BAI6MTODwangning",
				topdataPriority: 97
			}
		},
		"0008": {
			name: "\u6c7d\u8f66",
			channel: "auto",
			route: "",
			articleList: {
				topicid: "BA8DOPCSwangning",
				topdataPriority: 100
			},
			tiename: "auto",
			logoclassname: "auto_logo",
			secondFocus: {
				topicid: "BBM9IU4Cwangning",
				topdataPriority: 999
			}
		},
		"0009": {
			name: "\u79d1\u6280",
			channel: "tech",
			route: "",
			hybridStyle: !0,
			articleList: {
				topicid: "BA8D4A3Rwangning",
				topdataPriority: 200
			},
			tiename: "tech",
			logoclassname: "tech_logo",
			secondFocus: {
				topicid: "BBM95HDLwangning",
				topdataPriority: 999
			},
			child: {
				club: {
					name: "\u521b\u4e1aClub",
					channel: "tech",
					route: "",
					hybridStyle: !0,
					articleList: {
						topicid: "BGGMPEISwangning",
						topdataPriority: 999
					}
				},
				intelligent: {
					name: "\u667a\u80fd\u786c\u4ef6",
					channel: "tech",
					route: "",
					hybridStyle: !0,
					articleList: {
						topicid: "BGGN1FHGwangning",
						topdataPriority: 999
					}
				},
				vr: {
					name: "VR\u8fdb\u5316\u8bba",
					channel: "tech",
					route: "",
					hybridStyle: !0,
					articleList: {
						topicid: "BS8KBUQSwangning",
						topdataPriority: 999
					}
				},
				neview: {
					name: "\u6613\u89c1",
					channel: "tech",
					route: "",
					articleList: {
						topicid: "BGGN3FV3wangning",
						topdataPriority: 999
					}
				},
				threeclock: {
					name: "\u4e09\u70b9\u6574",
					channel: "tech",
					route: "",
					articleList: {
						topicid: "BGGN5IDVwangning",
						topdataPriority: 999
					}
				},
				nejudge: {
					name: "\u6613\u8bc4",
					channel: "tech",
					route: "",
					articleList: {
						topicid: "BGGN89A5wangning",
						topdataPriority: 999
					}
				}
			}
		},
		"0010": {
			name: "\u5bb6\u5c45",
			channel: "home",
			route: "",
			articleList: {
				topicid: "BAI6P3NDwangning",
				topdataPriority: 90
			},
			tiename: "home",
			logoclassname: "home_logo"
		},
		"0011": {
			name: "\u624b\u673a",
			channel: "mobile",
			route: "",
			articleList: {
				topicid: "BAI6I0O5wangning",
				topdataPriority: 999
			},
			tiename: "news",
			logoclassname: "mobile_logo",
			child: {
				"new": {
					name: "\u65b0\u673a",
					channel: "mobile",
					route: "",
					articleList: {
						topicid: "BD2CG18Nwangning",
						topdataPriority: 999
					}
				},
				test: {
					name: "\u8bc4\u6d4b",
					channel: "mobile",
					route: "",
					articleList: {
						topicid: "BD2CH14Pwangning",
						topdataPriority: 999
					}
				},
				buy: {
					name: "\u8d2d\u673a",
					channel: "mobile",
					route: "",
					articleList: {
						topicid: "BD2CHIMLwangning",
						topdataPriority: 999
					}
				},
				ios: {
					name: "\u82f9\u679c",
					channel: "mobile",
					route: "",
					articleList: {
						topicid: "BV5U6ON6wangning",
						topdataPriority: 999
					}
				},
				android: {
					name: "\u5b89\u5353",
					channel: "mobile",
					route: "",
					articleList: {
						topicid: "BV5U5EOVwangning",
						topdataPriority: 999
					}
				}
			}
		},
		"0016": {
			name: "\u6570\u7801",
			channel: "digi",
			route: "",
			articleList: {
				topicid: "BAI6JOD9wangning",
				topdataPriority: 99
			},
			tiename: "digi",
			logoclassname: "digi_logo",
			child: {
				notebook: {
					name: "\u7b14\u8bb0\u672c\u8bc4\u6d4b",
					channel: "digi",
					route: "",
					articleList: {
						topicid: "BD2CPSRDwangning",
						topdataPriority: 99
					}
				},
				cameratest: {
					name: "\u76f8\u673a\u8bc4\u6d4b",
					channel: "digi",
					route: "",
					articleList: {
						topicid: "BD2CQPTLwangning",
						topdataPriority: 99
					}
				},
				camera: {
					name: "\u76f8\u673a\u884c\u60c5",
					channel: "digi",
					route: "",
					articleList: {
						topicid: "BD2CSJEGwangning",
						topdataPriority: 99
					}
				},
				hea: {
					name: "\u5bb6\u7535",
					channel: "digi",
					route: "",
					articleList: {
						topicid: "BD2CU0MCwangning",
						topdataPriority: 99
					}
				}
			}
		},
		"0021": {
			name: "\u8bfb\u4e66",
			channel: "yuedu",
			route: "",
			articleList: {
				topicid: "BCGIKK4Vwangning",
				topdataPriority: 999
			},
			extraParameter: "utm_campaign=163ad2016&utm_source=163touchhome&utm_medium=tab_*&"
		},
		"0023": {
			name: "\u653f\u52a1",
			channel: "gov",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		"0025": {
			name: "\u8d22\u7ecf",
			channel: "money",
			route: "",
			articleList: {
				topicid: "BA8EE5GMwangning",
				topdataPriority: 254
			},
			tiename: "money",
			logoclassname: "money_logo",
			secondFocus: {
				topicid: "BBM9DIC9wangning",
				topdataPriority: 999
			},
			child: {
				shares: {
					name: "\u80a1\u7968",
					channel: "money",
					route: "",
					articleList: {
						topicid: "BD2C01CQwangning",
						topdataPriority: 999
					}
				},
				fund: {
					name: "\u57fa\u91d1",
					channel: "money",
					route: "",
					articleList: {
						topicid: "BD2C1904wangning",
						topdataPriority: 999
					}
				},
				commercial: {
					name: "\u5546\u4e1a",
					channel: "money",
					route: "",
					articleList: {
						topicid: "BD2C24VCwangning",
						topdataPriority: 999
					}
				}
			}
		},
		"0026": {
			name: "\u65f6\u5c1a",
			channel: "lady",
			route: "",
			articleList: {
				topicid: "BA8F6ICNwangning",
				topdataPriority: 160
			},
			tiename: "lady",
			logoclassname: "lady_logo",
			child: {
				love: {
					name: "\u60c5\u7231",
					channel: "lady",
					route: "",
					hybridStyle: !0,
					articleList: {
						topicid: "BD2BDNBPwangning",
						topdataPriority: 999
					}
				},
				beauty: {
					name: "\u7f8e\u5bb9",
					channel: "lady",
					route: "",
					articleList: {
						topicid: "BD2BFD4Pwangning",
						topdataPriority: 999
					}
				},
				dress: {
					name: "\u670d\u9970",
					channel: "lady",
					route: "",
					articleList: {
						topicid: "BDC4UI29wangning",
						topdataPriority: 999
					}
				},
				art: {
					name: "\u827a\u672f",
					channel: "lady",
					route: "",
					articleList: {
						topicid: "C2763SNLwangning",
						topdataPriority: 999
					}
				}
			}
		},
		"0029": {
			name: "\u6559\u80b2",
			channel: "edu",
			route: "",
			articleList: {
				topicid: "BA8FF5PRwangning",
				topdataPriority: 98
			},
			tiename: "edu",
			logoclassname: "edu_logo",
			child: {
				aboard: {
					name: "\u7559\u5b66",
					channel: "edu",
					route: "",
					articleList: {
						topicid: "BD2DGFADwangning",
						topdataPriority: 98
					}
				},
				migrant: {
					name: "\u79fb\u6c11",
					channel: "edu",
					route: "",
					articleList: {
						topicid: "BD2DHAH1wangning",
						topdataPriority: 98
					}
				},
				pmschool: {
					name: "\u4e2d\u5c0f\u5b66",
					channel: "edu",
					route: "",
					articleList: {
						topicid: "BD2DI0QJwangning",
						topdataPriority: 98
					}
				},
				foreign: {
					name: "\u5916\u8bed",
					channel: "edu",
					route: "",
					articleList: {
						topicid: "BD2DIR3Gwangning",
						topdataPriority: 98
					}
				}
			}
		},
		"0030": {
			name: "\u56fe\u7247",
			channel: "photo",
			tiename: "news",
			logoclassname: "photo_logo",
			route: "",
			type: "photolist",
			setList: {
				channelid: "0001",
				topicid: "00AN0001,00AO0001",
				channel: "photo"
			},
			topList: {
				channelid: "0001",
				topicid: "00AP0001,3R710001,4T8E0001",
				channel: "photo",
				size: 3
			},
			child: {
				news: {
					name: "\u65b0\u95fb",
					channel: "photo",
					route: "",
					type: "photolist",
					setList: {
						channelid: "0001",
						topicid: "00AP0001,3R710001,4T8E0001",
						channel: "photo"
					},
					topList: {
						channelid: "0001",
						topicid: "00AP0001,3R710001,4T8E0001",
						channel: "photo",
						size: 3
					}
				},
				star: {
					name: "\u660e\u661f",
					channel: "photo",
					route: "",
					type: "photolist",
					setList: {
						channelid: "0003",
						topicid: "00AJ0003,0AJQ0003,3LF60003,00B70003,00B50003",
						channel: "photo"
					},
					topList: {
						channelid: "0001",
						topicid: "00AP0001,3R710001,4T8E0001",
						channel: "photo",
						size: 3
					}
				},
				sports: {
					name: "\u4f53\u575b",
					channel: "photo",
					route: "",
					type: "photolist",
					setList: {
						channelid: "0005",
						topicid: "00D80005,00DE0005,4TM10005,5GUP0005,00BV0005,00750005",
						channel: "photo"
					},
					topList: {
						channelid: "0001",
						topicid: "00AP0001,3R710001,4T8E0001",
						channel: "photo",
						size: 3
					}
				},
				beauty: {
					name: "\u7f8e\u56fe",
					channel: "photo",
					route: "",
					type: "photolist",
					setList: {
						channelid: "0031",
						topicid: "6LRK0031,6LRI0031",
						channel: "photo",
						anchor: "qd=163game"
					},
					topList: {
						channelid: "0001",
						topicid: "00AP0001,3R710001,4T8E0001",
						channel: "photo",
						size: 3
					}
				}
			}
		},
		"0031": {
			name: "\u6e38\u620f",
			channel: "game",
			route: "",
			articleList: {
				topicid: "BAI6RHDKwangning",
				topdataPriority: 140
			},
			tiename: "game",
			logoclassname: "game_logo"
		},
		"0035": {
			name: "BOBO",
			channel: "bobo",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		"0036": {
			name: "\u4eb2\u5b50",
			channel: "baby",
			route: "",
			hybridStyle: !0,
			articleList: {
				topicid: "BEO4PONRwangning",
				topdataPriority: 999
			}
		},
		"0038": {
			name: "\u5065\u5eb7",
			channel: "jiankang",
			route: "",
			articleList: {
				topicid: "BDC4QSV3wangning",
				topdataPriority: 999
			},
			tiename: "jiankang",
			logoclassname: "jiankang_logo"
		},
		"0039": {
			name: "\u70ed\u523a",
			channel: "tottenhamhotspur",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		"0041": {
			name: "\u6536\u85cf",
			channel: "shoucang",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		"0082": {
			name: "\u9152\u9999",
			channel: "jiu",
			route: "",
			articleList: {
				topicid: "C2US5BNIwangning",
				topdataPriority: 999
			}
		},
		"0087": {
			name: "\u623f\u4ea7",
			channel: "house",
			route: "",
			articleList: {
				topicid: "BAI6MTODwangning",
				topdataPriority: 97
			},
			tiename: "house",
			logoclassname: "house_logo"
		},
		"0091": {
			name: "\u6821\u56ed",
			channel: "daxue",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		"0093": {
			name: "\u516c\u76ca",
			channel: "gongyi",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		"0095": {
			name: "\u541b\u5b50",
			channel: "men",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		"0096": {
			name: "\u63a8\u8350",
			channel: "all",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		joke: {
			name: "\u6bb5\u5b50",
			channel: "joke",
			route: "",
			type: "jokelist",
			tiename: "news",
			logoclassname: "joke_logo"
		},
		idol: {
			name: "\u661f\u95fb",
			channel: "idol",
			route: "",
			type: "idollist",
			tiename: "news",
			logoclassname: "idol_logo"
		},
		local: {
			name: "\u672c\u5730",
			channel: "local",
			route: "",
			articleList: {
				topicid: "\u5317\u4eac\u5e02",
				topdataPriority: 999
			},
			tiename: "news",
			logoclassname: "local_logo"
		},
		world: {
			name: "\u56fd\u9645",
			channel: "world",
			route: "",
			articleList: {
				topicid: "BA8J7DG9wangning",
				topdataPriority: 999
			}
		},
		dy: {
			name: "\u8ba2\u9605",
			channel: "dy",
			route: "",
			articleList: {
				topicid: "BBM50AKDwangning",
				topdataPriority: 999
			},
			tiename: "news",
			logoclassname: "dy_logo"
		},
		topdata: {
			name: "\u7126\u70b9\u56fe",
			channel: "tuijian",
			route: "",
			articleList: {
				topicid: "BABDD7EAwangning",
				topdataPriority: 254
			}
		},
		ozb: {
			name: "\u6b27\u6d32\u676f",
			channel: "ozb",
			route: "",
			articleList: {
				topicid: "BONRMBCSwangning",
				topdataPriority: 999
			}
		},
		"": {},
		caipiao: {
			name: "\u5f69\u7968",
			channel: "caipiao",
			route: "",
			articleList: {
				topicid: "BVATQC54wangning",
				topdataPriority: 999
			},
			child: {
				news: {
					name: "\u5f69\u5e02\u65b0\u95fb",
					channel: "caipiao",
					route: "",
					articleList: {
						topicid: "BVAU05FVwangning",
						topdataPriority: 999
					}
				},
				ssq: {
					name: "\u53cc\u8272\u7403",
					channel: "caipiao",
					route: "",
					articleList: {
						topicid: "BVAU19R7wangning",
						topdataPriority: 999
					}
				},
				dlt: {
					name: "\u5927\u4e50\u900f",
					channel: "caipiao",
					route: "",
					articleList: {
						topicid: "BVAU268Hwangning",
						topdataPriority: 999
					}
				},
				jczq: {
					name: "\u8db3\u5f69",
					channel: "caipiao",
					route: "",
					articleList: {
						topicid: "BVAU318Uwangning",
						topdataPriority: 999
					}
				}
			}
		},
		2016: {
			name: "\u5965\u8fd0",
			channel: "2016",
			articleList: {
				topicid: "BRFCGL31jiaoyu",
				topdataPriority: 999
			},
			logoclassname: "2016_logo",
			child: {
				news: {
					name: "\u8981\u95fb",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BRFCGL31jiaoyu",
						topdataPriority: 999
					}
				},
				China: {
					name: "\u4e2d\u56fd",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BRNE1IECjiaoyu",
						topdataPriority: 999
					}
				},
				plan: {
					name: "\u7b56\u5212",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BRFCGL31jiaoyu",
						topdataPriority: 999
					}
				},
				exclusive: {
					name: "\u72ec\u5bb6",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BRFCGL31jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-pingpong": {
					name: "\u4e52\u4e53\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8VSQBjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-badminton": {
					name: "\u7fbd\u6bdb\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB5S0NHjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-football": {
					name: "\u8db3\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB72IM0jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-swim": {
					name: "\u6e38\u6cf3",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8JOJHjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-basketball": {
					name: "\u7bee\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB6GDANjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-athletics": {
					name: "\u7530\u5f84",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB5POUUjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-tennis": {
					name: "\u7f51\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8MRNAjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-diving": {
					name: "\u8df3\u6c34",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB9GUALjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-weightlifting": {
					name: "\u4e3e\u91cd",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB941O2jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-boxing": {
					name: "\u62f3\u51fb",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB9LP49jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-fencing": {
					name: "\u51fb\u5251",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB74PMUjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-rowing": {
					name: "\u8d5b\u8247",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB7TMEHjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-equestrian": {
					name: "\u9a6c\u672f",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB6VT3Rjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-archery": {
					name: "\u5c04\u7bad",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB5H88Ijiaoyu",
						topdataPriority: 999
					}
				},
				"rss-volleyball": {
					name: "\u6392\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB922LUjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-judo": {
					name: "\u67d4\u9053",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB7KDG6jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-golf": {
					name: "\u9ad8\u5c14\u592b",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB77985jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-bicycle": {
					name: "\u81ea\u884c\u8f66",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB6QRM3jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-windsurfingsailball": {
					name: "\u5e06\u7403\u5e06\u677f",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8GP0Tjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-triathlon": {
					name: "\u94c1\u4eba\u4e09\u9879",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSBDROJNjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-rugbysevens": {
					name: "\u4e03\u4eba\u6a44\u6984\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8EOB6jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-modernpentathlon": {
					name: "\u73b0\u4ee3\u4e94\u9879",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8EOB6jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-canoeing": {
					name: "\u76ae\u5212\u8247",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB6OABKjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-wrestling": {
					name: "\u6454\u8de4",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB9961Jjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-synchronizedswimming": {
					name: "\u82b1\u6837\u6e38\u6cf3",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8LMAPjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-artisticgymnastics": {
					name: "\u4f53\u64cd",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSEAK2IUjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-shooting": {
					name: "\u5c04\u51fb",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8I23Kjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-handball": {
					name: "\u624b\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB7BHHIjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-hockey": {
					name: "\u66f2\u68cd\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB7I5PSjiaoyu",
						topdataPriority: 999
					}
				},
				"rss-taekwondo": {
					name: "\u8dc6\u62f3\u9053",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB8RLB3jiaoyu",
						topdataPriority: 999
					}
				},
				"rss-waterpolo": {
					name: "\u6c34\u7403",
					channel: "2016",
					route: "",
					articleList: {
						topicid: "BSB96NQDjiaoyu",
						topdataPriority: 999
					}
				}
			}
		}
	};
	this._channelMap = t
}.call(window.NEWAP),
	function() {
		! function(t, e) {
			var i = function() {
				this.name = "data for touch, na~", this.version = "1.0"
			};
			i.channelMap = t._channelMap, i.importjs = function(t, e, i) {
				var n = document.createElement("script");
				n.src = t, i && (n.charset = i), n.onload = function() {
					this.onload = this.onerror = null, this.parentNode.removeChild(this)
				}, n.onerror = function() {
					this.onload = this.onerror = null, this.parentNode.removeChild(this), e && e(!0)
				}, document.head.appendChild(n)
			}, i.loc = function() {
				var t = 0,
					n = function() {
						var n = e.Deferred(),
							o = "http://ipservice.163.com/locate/api/getLoc?key=734FC2BD86B2CD0B8CF534073AD36EB2",
							a = "locBack" + t++;
						return o = o + "&callback=" + a, window[a] = function(t) {
							"success" === t.reason && (i.loc.result = t.result, i.channelMap.local.articleList.topicid = t.result.province + "_" + t.result.city, n.resolve(t)), delete window[a]
						}, i.importjs(o, function(t) {
							t && (n.reject(), delete window[a])
						}), n.promise()
					};
				return {
					update: (n(), n)
				}
			}(), i.dateFormat = function(t) {
				var e = {
					"M+": this.getMonth() + 1,
					"d+": this.getDate(),
					"h+": this.getHours(),
					"m+": this.getMinutes(),
					"s+": this.getSeconds(),
					"q+": Math.floor((this.getMonth() + 3) / 3),
					S: this.getMilliseconds()
				};
				/(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
				for (var i in e) new RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[i] : ("00" + e[i]).substr(("" + e[i]).length)));
				return t
			}, i.stringTrim = function(t) {
				return "string" == typeof t ? t.replace(/(^\s*)|(\s*$)/g, "") : t
			}, i.tplLink = function() {
				var t = {
					docid: "http://3g.163.com/touch/article.html",
					setid: "http://3g.163.com/touch/photoview.html",
					sid: "http://3g.163.com/touch/specail_view.html",
					roomid: "http://3g.163.com/touch/live.html",
					vid: "http://3g.163.com/touch/videoplay.html",
					exid: "http://3g.163.com/ntes/special/00342G8T/touch_question.html",
					update: function(t) {
						for (var e in this) this.hasOwnProperty(e) && "string" == typeof this[e] && t.indexOf(e + "=") !== -1 && (this[e] = t.replace(new RegExp(".*" + e + "=([^&]*).*"), "$1"), t = t.replace(new RegExp("(.*)(" + e + "=" + this[e] + "&?)(.*)"), "$1$3"));
						return t
					}
				};
				if (location.href.indexOf("_qa_") != -1 ? (t.docid = "http://3g.163.com/ntes/special/003417TF/article_qa_2016.html", t.setid = "http://3g.163.com/ntes/special/003417TF/photoset_qa_2016.html") : location.href.indexOf("trunk_") != -1 && (t.docid = "http://3g.163.com/ntes/special/003417TF/trunk_article_lazyload_es6.html", t.setid = "http://3g.163.com/ntes/special/003417TF/trunk_photoset_2016.html"), location.href.indexOf("dev.f2e.163.com") != -1) {
					var e = "http://img2.cache.netease.com/f2e";
					t.docid = e + "/wap/touch_article_2016/trunk_lazyload_es6/dist/article.shtml", t.sid = e + "/wap/touch_special_view/index.shtml", t.roomid = e + "/wap/touch_live/index.shtml", t.vid = e + "/wap/touch_video_2016/trunk/index.html", t.setid = e + "/wap/touch_photoset_2016/trunk/photoset.shtml"
				}
				var i = NEWAP.tools.checkMethod.checkWakeupClientFlag() || location.href.lastIndexOf("&newsapp=true") != -1;
				return /MQQBrowser|MicroMessenger/i.test(navigator.userAgent) && (i = !1), i = !1, i && (t.docid += "?from=wakeupclient_index&", t.docid = "http://m.163.com/newsapp/applinks.html?docid=<#=docid#>&s=wap_3g_201608_15&redirect=" + encodeURIComponent(t.docid)), t
			}(), i.simpleParse = function(t, e) {
				return e ? String(t).replace(/<#=(\w+)#>/g, function(t, i) {
					return null != e[i] ? e[i] : t
				}) : t
			}, i.docidFromURL = function(t) {
				try {
					if (t.length > 22) {
						var e = t.substring(t.lastIndexOf("/")),
							i = e.substring(1, 17);
						return t.indexOf(i + ".html") != -1 && /[0-9A-Z]{16}/.test(i) ? i : ""
					}
					return 16 === t.length && t.toUpperCase() === t ? t : ""
				} catch (n) {
					return ""
				}
			}, i.routereg = function(t) {
				var n = i.channelMap,
					t = e.extend(!0, {}, t);
				if ("undefined" != typeof n[t.data.channelId]) return n[t.data.channelId].route = t.route, !0;
				var o = {
					name: "",
					articleList: {
						topicid: "",
						topdataPriority: 0
					}
				};
				return o.name = t.data.name, o.channel = t.data.channel, o.route = t.route, o.articleList = t.data.articleList, n[t.data.channelId] = o, !0
			}, i.channelidFromRoute = function(t) {
				var e = i.channelMap;
				for (var n in e)
					if (e.hasOwnProperty(n) && e[n].route === t) return n.toString();
				return "tuijian"
			}, i.channelidFromChannel = function(t) {
				var e = i.channelMap;
				for (var n in e)
					if (e.hasOwnProperty(n) && e[n].channel === t) return n.toString();
				return "tuijian"
			}, i.removeURLImportantProperty = function(t, e) {
				var n = e ? i.o.inheritSearchList : i.o.inheritSearchBlockedList,
					o = t || "";
				if (e) {
					for (var a = {}, s = "", r = 0; r < n.length; r++) o.indexOf(n[r] + "=") !== -1 && (a[n[r]] = o.replace(new RegExp(".*" + n[r] + "=([^&]*).*"), "$1"), s += n[r] + "=" + a[n[r]] + "&");
					o = s
				} else
					for (var r = 0; r < n.length; r++) o = o.replace(new RegExp(n[r] + "=[^&]*[&]?", "gi"), "");
				return "&" === o[o.length - 1] && (o = o.substring(0, o.length - 1)), o
			}, i.locsearch = function() {
				if (!i.o.enableInheritSearch) return "";
				var t = location.search.substring(1);
				switch (i.o.enableInheritSearch) {
					case 1:
						t = i.removeURLImportantProperty(t, !1);
					case 2:
						t = i.removeURLImportantProperty(t, !0)
				}
				return t.length > 0 && "&" != t[t.length - 1] && (t += "&"), t
			}, i.extraFromURL = function(t) {
				var e = "",
					n = "";
				return t = i.removeURLImportantProperty(t), t.indexOf("?") !== -1 && (e = t.replace(/.*\?([^#]*).*/, "$1"), e.length > 0 && "&" !== e[e.length - 1] && (e += "&")), e = i.locsearch() + e, t.indexOf("#") !== -1 && (n = t.replace(/.*(#[^\?]*).*/, "$1")), {
					parameter: e,
					anchor: n
				}
			}, i.diff = {}, i.dataList = function() {
				var t = {
					code: 200,
					listdata: {
						page: 1,
						data: []
					},
					topdata: {
						page: 1,
						data: []
					},
					otherinfo: {}
				};
				return t
			}(), i.docItem = function() {
				var t = {
					docid: "",
					uuid: 0,
					ptime: "",
					title: "",
					stitle: "",
					digest: "",
					priority: "",
					link: "",
					type: "",
					source: "",
					category: "",
					adposition: 0,
					prevent: "",
					pic_info: [],
					ugc: {
						boardid: "",
						postid: "",
						channel: ""
					},
					tcount: 0,
					thot: {
						isopen: 0,
						comment: "\u70ed\u95e8\u8ddf\u8d34\u7528\u6237\u7559\u8a00"
					},
					tag: ""
				};
				return t
			}(), i.picItem = function() {
				var t = {
					height: 0,
					width: 0,
					picType: 0,
					title: "",
					ref: null,
					url: ""
				};
				return t
			}(), i.adItem = function() {
				var t = {
					adposition: -1,
					prevent: "",
					url: "",
					data: {
						uuid: "",
						ptime: "",
						title: "",
						link: "",
						type: "",
						source: "",
						impression: "",
						pic_info: []
					}
				};
				return t
			}(), i.locItem = function() {
				var t = {
					province: "",
					city: ""
				};
				return t
			}, i.formater = function(t, e) {
				this.url = t, this.callback = e, this.URLType = -1, this.docid, this.channelid, this.child, this.channelData = {}, this.pagesize = 0, this.hasTopimg = !1
			}, i.formater.prototype.getURLType = function(t) {
				var e = this.url;
				return "string" == typeof t && (e = t), 0 === e.indexOf("http://") ? this.URLType = 5 : 0 === e.indexOf("newap_article_list?") ? this.URLType = 0 : 0 === e.indexOf("newap_advertise_list?") ? this.URLType = 1 : 0 === e.indexOf("newap_article_full?") ? this.URLType = 2 : 0 === e.indexOf("newap_photo_list?") ? this.URLType = 3 : 0 === e.indexOf("newap_joke_list?") ? this.URLType = 4 : this.URLType = -1, this.URLType
			}, i.formater.prototype.transurl = function(t) {
				var n = this.url;
				switch (this.getURLType(n), this.URLType) {
					case -1:
						this.callback("url formate error");
						break;
					case 0:
						var o = {
							offset: 0,
							size: 10,
							channel: "0096",
							child: "all",
							topicid: void 0,
							city: void 0
						};
						for (var a in o) o.hasOwnProperty(a) && n.indexOf(a + "=") !== -1 && (o[a] = n.replace(new RegExp(".*" + a + "=([^&]*).*"), "$1"), n = n.replace(new RegExp("(.*)(" + a + "=" + o[a] + "&?)(.*)"), "$1$3"));
						this.offset = parseInt(o.offset), this.channelid = o.channel, this.child = o.child;
						var s = i.channelMap[this.channelid];
						"all" !== this.child && "object" == typeof s.child && s.child[this.child] ? this.channelData = e.extend(!0, {}, s.child[this.child]) : this.channelData = e.extend(!0, {}, s);
						var r = this.channelData.articleList;
						if ("undefined" == typeof i.diff[this.channelid + this.child] || 0 === this.offset) {
							var c = {
								docidList: []
							};
							i.diff[this.channelid + this.child] = c
						}
						0 === this.offset && (this.hasTopimg = !0);
						var l = this.offset,
							h = parseInt(o.size);
						this.pagesize = h;
						var p = parseInt(i.o.articleListMaxStart);
						l > p && (h += l - p, l = p, h = 10, this.pagesize = h);
						var d = r.topicid;
						"undefined" != typeof o.topicid && (d = o.topicid, r.topicid = d);
						var u = n.replace("newap_article_list?", "");
						n = "http://3g.163.com/touch/reconstruct/article/list/" + d + "/" + l + "-" + h + ".html", u.length > 0 && ("&" === u[u.length - 1] && (u = u.substring(0, u.length - 1)), n += "?" + u), this.channelData.hybridStyle && (n = "http://3g.163.com/touch/reconstruct/article/list/" + d + "/" + l + "-" + h + ".html"), "local" === this.channelid && (o.city && (d = o.city, r.topicid = d), n = "http://3g.163.com/touch/jsonp/article/local/" + d + "/" + l + "-" + h + ".html");
						break;
					case 1:
						break;
					case 2:
						break;
					case 3:
						var o = {
							offset: 0,
							size: 10,
							channel: "0030",
							child: "all",
							channelid: void 0,
							topicid: void 0
						};
						for (var a in o) o.hasOwnProperty(a) && n.indexOf(a + "=") !== -1 && (o[a] = n.replace(new RegExp(".*" + a + "=([^&]*).*"), "$1"));
						this.offset = parseInt(o.offset), this.channelid = o.channel, this.pchannelid = o.channelid, this.child = o.child;
						var s = i.channelMap[this.channelid];
						"all" !== this.child && "object" == typeof s.child && s.child[this.child] ? this.channelData = e.extend(!0, {}, s.child[this.child]) : this.channelData = e.extend(!0, {}, s);
						var m = this.channelData.setList;
						0 === this.offset && (this.hasTopimg = !0);
						var l = this.offset,
							h = parseInt(o.size);
						this.pagesize = h, this.pchannelid = m.channelid;
						var d = m.topicid;
						"undefined" != typeof o.topicid && (d = o.topicid, m.topicid = d, this.jsonpNum = "top"), "undefined" != typeof o.channelid && (this.pchannelid = o.channelid, m.channelid = this.pchannelid), this.jsonpNum = "_" + (this.jsonpNum || ""), this.callbackName = "cache_" + d.replace(/,/gi, "_") + this.jsonpNum, this.callbackName = this.callbackName.replace(new RegExp(m.channelid + "_", "gi"), "_"), n = "http://pic.news.163.com/photocenter/api/list/" + this.pchannelid + "/" + d + "/" + l + "/" + this.pagesize + "/" + this.callbackName + ".json";
						break;
					case 4:
						var o = {
							offset: 0,
							size: 10,
							channel: "0529",
							child: "all"
						};
						for (var a in o) o.hasOwnProperty(a) && n.indexOf(a + "=") !== -1 && (o[a] = n.replace(new RegExp(".*" + a + "=([^&]*).*"), "$1"));
						this.offset = parseInt(o.offset), this.channelid = o.channel;
						var s = i.channelMap[this.channelid],
							l = this.offset,
							f = parseInt(o.size);
						this.pagesize = f, this.callbackName = s.channel + i.jsonpNum[this.channelid]++, n = "http://3g.163.com/touch/jsonp/joke/chanListNews/T1419316284722/2/" + l + "-" + f + ".html?callback=" + this.callbackName;
						break;
					case 5:
						var g = parseInt(n.replace(/.*\/(\d+)-(\d+)\.html.*/, "$1")) || 0;
						g = g > 300 ? 300 : g;
						var o = {
							offset: g,
							channel: "tuijian",
							child: void 0
						};
						if (this.offset = parseInt(o.offset), this.channelid = o.channel, this.child = o.child, "undefined" == typeof i.diff[this.channelid + this.child] || 0 === this.offset) {
							var c = {
								docidList: []
							};
							i.diff[this.channelid + this.child] = c
						}
						this.callbackName = "syrec" + i.jsonpNum.tuijian++, n = n.indexOf("?") !== -1 ? n + "&callback=" + this.callbackName : n + "?callback=" + this.callbackName
				}
				return n
			}, i.formater.prototype.beforeReplaceURLProperty = function(t) {
				var e, i = "",
					n = t.url;
				if (!t.hasOwnProperty("skipType"))
					if ((e = n.split("|")).length > 1) {
						var o = e[0].substr(-4, 4),
							a = e[1];
						t.skipType = "photoset", t.skipURL = "http://3g.163.com/touch/photoview.html?channelid=" + o + "&setid=" + a + i
					} else if (e = /\/photoview\/([0-9A-Z]{8})\/(\d{1,7})\.html/.exec(n)) {
					var o = e[1].substr(-4, 4),
						a = e[2];
					n.indexOf("#") !== -1 && (i = n.replace(/.*(#[^\?]*).*/, "$1")), t.skipType = "photoset", t.skipURL = "http://3g.163.com/touch/photoview.html?channelid=" + o + "&setid=" + a + i
				}
			}, i.formater.prototype.replaceURLProperty = function(t, e) {
				this.beforeReplaceURLProperty(t), e = "offset=" + (this.offset + e) + "&";
				var n = "",
					o = t.url || "",
					a = t.stitle || "",
					s = parseInt(t.imgsrc3gtype) || 0,
					r = this.channelid,
					c = i.channelMap[r].channel,
					l = this.child;
				c = l && "undefined" != l ? "channel=" + c + "&child=" + this.child + "&" : "channel=" + c + "&";
				var h = "",
					p = "",
					d = "",
					u = "",
					m = "",
					f = i.channelMap[r].name,
					g = i.extraFromURL(o),
					v = g.parameter,
					y = g.anchor,
					w = "",
					b = null,
					x = i.docidFromURL(o);
				if (16 !== x.length && (x = t.docid, "dy" === this.channelid && (v = "", y = "")), t.hasOwnProperty("skipType")) {
					if (o = t.skipURL || "", g = i.extraFromURL(o), v = g.parameter, y = g.anchor, o = o.replace(/([^#]*)#.*/, "$1"), "special" === t.skipType) {
						h = "", p = "", d = "";
						try {
							r = x.substring(8, 12), f = i.channelMap[r].name
						} catch (S) {
							f = i.channelMap[this.channelid].name
						}
						u = "doc", m = "\u4e13\u9898";
						var k = t.stitle,
							P = k.lastIndexOf("#");
						P != -1 && (k = k.substring(0, P)), k.indexOf("Sop") !== -1 ? i.tplLink.sid = "http://c.3g.163.com/nc/qa/gold/gold.html" : i.tplLink.sid = "http://3g.163.com/touch/specail_view.html", n = "?" + c + v + e + "sid=" + k + y, w = "sid"
					} else if ("photoset" === t.skipType) {
						var L = i.stringTrim(o.replace(/.*setid=([^&]*).*/, "$1"));
						r = o.replace(/.*channelid=([^&]*).*/, "$1"), h = "photoview_bbs", p = "", d = r;
						try {
							f = i.channelMap[r].name
						} catch (S) {
							f = i.channelMap[this.channelid].name
						}
						u = "photoset", m = "\u56fe\u96c6", n = "?" + c + v + e + "setid=" + L + "&channelid=" + r + y, w = "setid"
					} else if ("live" === t.skipType) {
						var T = o.replace(/.*roomid=([^&]*).*/, "$1");
						h = "", p = "", d = "", u = "doc", m = "\u76f4\u64ad", n = "?" + c + v + e + "roomid=" + T + y, w = "roomid"
					} else if ("video" === t.skipType) {
						var _ = a;
						h = "", p = "", d = "", u = "doc", m = "\u89c6\u9891", n = "?" + c + v + e + "vid=" + _ + y, w = "vid"
					}
				} else if (0 === a.indexOf("V")) {
					var _ = a;
					h = "", p = "", d = "", u = "doc", m = "\u89c6\u9891", n = "?" + c + v + e + "vid=" + _ + y, w = "vid"
				} else if (0 === a.indexOf("EX")) {
					var I = a;
					h = "", p = "", d = "", u = "doc", m = "\u95ee\u5427", n = "?" + c + v + e + "exid=" + I + y, w = "exid"
				} else if (16 === x.length && x.toUpperCase() === x) {
					r = x.substring(8, 12), h = "3g_bbs", p = x, d = r;
					try {
						f = i.channelMap[r].name
					} catch (S) {
						f = i.channelMap[this.channelid].name
					}
					u = "doc", "\u89c6\u9891" === a ? m = "\u89c6\u9891" : "LIVE" === a ? m = "LIVE" : "\u72ec\u5bb6" === a ? m = "\u72ec\u5bb6" : 0 === a.indexOf("v") && (m = "\u6295\u7968"), t.imgextra && t.imgextra.length >= 2 && t.imgsrc && (u = "photoset");
					var A = this.channelData.extraParameter || "";
					n = "?" + c + A + v + e + "docid=" + x + y, w = "docid", b = {
						docid: x
					}
				}
				if (n.length > 0 && i.tplLink.hasOwnProperty(w) && (o = i.simpleParse(i.tplLink[w], b), o.indexOf("newsapp/applinks.html") != -1 ? (n = n.substring(1), o += encodeURIComponent(n)) : o += n), u.length > 0) switch (s) {
					case 0:
						break;
					case 1:
						break;
					case 2:
						u = "photoset";
						break;
					case 3:
						u = "bigimg";
						break;
					case 4:
						u = "bigimg"
				}
				return "tuijian" != this.channelid && (f = ""), this.isArticleListHead && (o += o.indexOf("?") != -1 ? "&s=163" : "?s=163", u = "colums"), i.diff[this.channelid + this.child].docidList.indexOf(x) != -1 ? u = "" : i.diff[this.channelid + this.child].docidList.push(x), {
					type: u,
					url: o,
					ugc: {
						boardid: h,
						postid: p,
						channel: d
					},
					docid: x,
					tag: m,
					category: f
				}
			}, i.formater.prototype.fixPhotoview = function(t) {
				var n = e.Deferred(),
					o = t.listdata.data,
					a = t.topdata.data;
				return async.eachLimit(o.concat(a), 1, function(t, n) {
					if ("photoset" === t.type && t.pic_info.length < 3) {
						var o = t.link.replace(/([^#]*)#.*/, "$1"),
							a = o.replace(/.*setid=([^&]*).*/, "$1"),
							s = o.replace(/.*channelid=([^&]*).*/, "$1");
						t.pic_info = [], e.ajax({
							type: "GET",
							dataType: "jsonp",
							url: "http://c.3g.163.com/photo/api/jsonp/set/" + s + "/" + a + ".json",
							success: function(o) {
								t.ugc.postid = o.postid;
								for (var a = 0; a < o.photos.length && t.pic_info.length < 3; a++) {
									var s = e.extend(!0, {}, i.picItem);
									s.url = o.photos[a].imgurl, t.pic_info.push(s)
								}
								n()
							}
						})
					} else n()
				}, function(e) {
					e ? n.resolve(t) : n.resolve(t)
				}), n.promise()
			}, i.formater.prototype.fixLaunchSpecial = function(t) {
				var n = e.Deferred(),
					o = t.listdata.data,
					a = (t.topdata.data, this);
				return async.eachLimit(o, 1, function(t, n) {
					if ("launchSpecial" === t.type) {
						var o = t.link.replace(/([^#]*)#.*/, "$1"),
							s = o.replace(/.*sid=([^&]*).*/, "$1");
						e.ajax({
							type: "GET",
							dataType: "jsonp",
							cache: !0,
							url: "http://c.3g.163.com/nc/special/" + s + ".html",
							success: function(o) {
								for (var o = o[s], r = o.topics[0].docs.splice(0, 3), c = [], l = 0; l < r.length; l++) {
									var h = r[l],
										p = e.extend(!0, {}, i.docItem),
										d = e.extend(!0, {}, i.picItem),
										u = a.replaceURLProperty(h, l);
									if (!(u.type.length <= 0)) {
										if (p.docid = u.docid, p.ptime = h.ptime, p.title = h.title, p.digest = h.digest, p.tcount = h.replyCount, p.ipadcomment = h.ipadcomment, p.priority = h.priority || 60, p.link = u.url, p.type = u.type, p.ugc = u.ugc, p.tag = u.tag, p.category = u.category, "undefined" != typeof h.imgsrc && h.imgsrc.length > 7 && (d.url = h.imgsrc, p.pic_info.push(d)), "photoset" === p.type && "undefined" != typeof h.imgextra && h.imgextra instanceof Array)
											for (var m = 0; m < h.imgextra.length; m++) {
												var f = e.extend(!0, {}, i.picItem);
												f.url = h.imgextra[m].imgsrc, p.pic_info.push(f)
											}
										c.push(p)
									}
								}
								t.launchSpecialList = c, n()
							}
						})
					} else n()
				}, function(e) {
					e ? n.resolve(t) : n.resolve(t)
				}), n.promise()
			}, i.nosImageViewConfig = function() {
				var t = {
						type: "jpg"
					},
					e = !1;
				try {
					var i = document.createElement("canvas");
					e = "image/webp" === i.toDataURL("image/webp").substring(5, 15)
				} catch (n) {
					e = !1
				}
				return e && (t.type = "webp"), t
			}(), i.formater.prototype.resizePhoto = function(t) {
				for (var e = t.listdata.data, n = t.topdata.data, o = i.nosImageViewConfig, a = 0; a < n.length; a++)
					for (var s = n[a], r = 0; r < s.pic_info.length; r++) {
						var c = s.pic_info[r],
							l = i.stringTrim(c.url);
						0 === l.indexOf("http://imgsize.ph.126.net/?imgurl=") && (l = l.substring(l.lastIndexOf("?imgurl=") + 8, l.indexOf("_"))), c.o_url = l, l.lastIndexOf(".gif") !== -1 && "joke" !== this.channelid || (c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_750x380x1x45.jpg&enlarge=true", l.indexOf("nosdn.127.net/") != -1 && (l = l.replace(/(\?.*)/, ""), c.o_url = l, c.url = l + "?imageView&thumbnail=750y380&quality=45&type=" + o.type + "&interlace=1&enlarge=1"), this.isArticleListHead && (c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_690x140x1x45.jpg&enlarge=true"))
					}
				for (var a = 0; a < e.length; a++) {
					for (var s = e[a], r = 0; r < s.pic_info.length; r++) {
						var c = s.pic_info[r],
							l = i.stringTrim(c.url);
						0 === l.indexOf("http://imgsize.ph.126.net/?imgurl=") && (l = l.substring(l.lastIndexOf("?imgurl=") + 8, l.indexOf("_"))), c.o_url = l, l.lastIndexOf(".gif") !== -1 && "joke" !== this.channelid || (c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_220x165x1x45.jpg&enlarge=true", "bigimg" === s.type && (c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_690x230x1x45.jpg&enlarge=true"), "joke" === this.channelid && (c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_" + c.width + "x" + c.height + "x1x45.jpg&enlarge=true", "number" != typeof c.width && (c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_380x228x1x45.jpg&enlarge=true")), "0030" === this.channelid && (c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_375x500x0x45.jpg&enlarge=true"), l.indexOf("nosdn.127.net/") != -1 && (l = l.replace(/(\?.*)/, ""), c.o_url = l, c.url = l + "?imageView&thumbnail=220y165&quality=45&type=" + o.type + "&interlace=1&enlarge=1", "bigimg" === s.type && (c.url = l + "?imageView&thumbnail=690y230&quality=45&type=" + o.type + "&interlace=1&enlarge=1"), "joke" === this.channelid && (c.url = l + "?imageView&thumbnail=" + c.width + "y" + c.height + "&quality=45&type=" + o.type + "&interlace=1&enlarge=1", "number" != typeof c.width && (c.url = l + "?imageView&thumbnail=380y228&quality=45&type=" + o.type + "&interlace=1&enlarge=1")), "0030" === this.channelid && (c.url = l + "?imageView&thumbnail=375y500&quality=45&type=" + o.type + "&interlace=1&enlarge=1")))
					}
					if (s.launchSpecialList)
						for (var h = s.launchSpecialList, p = 0; p < h.length; p++)
							for (var s = h[p], r = 0; r < s.pic_info.length; r++) {
								var c = s.pic_info[r],
									l = i.stringTrim(c.url);
								try {
									c.o_url = l, c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_220x165x1x45.jpg&enlarge=true", "bigimg" === s.type && (c.url = "http://imgsize.ph.126.net/?imgurl=" + l + "_690x230x1x45.jpg&enlarge=true"), l.indexOf("nosdn.127.net/") != -1 && (l = l.replace(/(\?.*)/, ""), c.o_url = l, c.url = l + "?imageView&thumbnail=220y165&quality=45&type=" + o.type + "&interlace=1&enlarge=1", "bigimg" === s.type && (c.url = l + "?imageView&thumbnail=690y230&quality=45&type=" + o.type + "&interlace=1&enlarge=1"))
								} catch (d) {
									console.log(d)
								}
							}
				}
				return t
			}, i.formater.prototype.updateAppointData = function(t) {
				for (var n = t.listdata.data, o = (t.topdata.data, []), a = (new Date).getTime(), s = 0; s < n.length; s++) {
					var r = e.extend(!0, {}, i.adItem),
						c = n[s];
					r.data = c, delete r.data.adposition, delete r.data.prevent;
					try {
						var l = JSON.parse(c.digest);
						if (!(a >= l.startTime && a <= l.endTime)) continue;
						r.adposition = l.adPosition, r.prevent = l.prevent, r.isfocus = l.isfocus, r.data.impression = l.impression, r.data.digest = l.digest, l.link && l.link.length > 7 && (r.data.link = l.link), o.push(r)
					} catch (h) {}
				}
				for (var p = {
						focus: [],
						list: []
					}, s = 0; s < o.length; s++) o[s].isfocus ? p.focus.push(o[s]) : p.list.push(o[s]);
				t.otherinfo.appointArticle = p
			}, i.formater.prototype.updateAppointLongData = function(t) {
				for (var n = t.listdata.data, o = (t.topdata.data, []), a = this.channelData.appointLong.limitSize, s = this.channelData.appointLong.positionArray, r = 0; r < n.length && r < a; r++) {
					var c = e.extend(!0, {}, i.adItem),
						l = n[r];
					c.adposition = s[r] || -1, c.data = l, delete c.data.adposition, delete c.data.prevent, c.isfocus = !1, o.push(c)
				}
				for (var h = {
						focus: [],
						list: []
					}, r = 0; r < o.length; r++) o[r].isfocus ? h.focus.push(o[r]) : h.list.push(o[r]);
				t.otherinfo.appointLongArticle = h
			}, i.formater.prototype.transdata = function(t) {
				var n = e.Deferred(),
					o = t,
					a = e.extend(!0, {}, i.dataList),
					s = this;
				switch (this.URLType) {
					case -1:
						break;
					case 0:
						var r = this.channelData.articleList,
							c = o[r.topicid],
							l = c.length - this.pagesize;
						c = c.slice(l <= 1 ? 0 : l), "object" == typeof this.channelData.topList && (this.hasTopimg = !1);
						var h = this.channelData.topList || {};
						if (r.topicid === h.topicid) var p = parseInt(h.size) || 1;
						var d = this.channelData.secondFocus || {};
						if (r.topicid === d.topicid) var p = parseInt(d.size) || 1;
						var u = this.channelData.articleListHead || {};
						r.topicid === u.topicid && (this.isArticleListHead = !0, this.hasTopimg = !0);
						var m = this.channelData.appointList || {};
						r.topicid === m.topicid && (this.isAppointList = !0, this.hasTopimg = !1);
						var f = this.channelData.appointLong || {};
						r.topicid === f.topicid && (this.isAppointLong = !0, this.hasTopimg = !1), "local" === this.channelData.channel && (a.otherinfo.province = t.province, a.otherinfo.city = t.city),
							function(t) {
								for (var o = a.listdata.data, r = a.topdata.data, c = !1, l = 0; l < t.length; l++) {
									var h = t[l],
										d = e.extend(!0, {}, i.docItem),
										u = e.extend(!0, {}, i.picItem),
										m = this.replaceURLProperty(h, l);
									if (!(m.type.length <= 0)) {
										if (d.docid = h.docid, d.ptime = h.ptime, d.title = h.title, d.digest = h.digest, d.tcount = h.commentCount, d.priority = h.priority, d.link = m.url, d.type = m.type, d.ugc = m.ugc, d.tag = m.tag, d.category = m.category, "undefined" != typeof h.imgsrc && h.imgsrc.length > 7 && (u.url = h.imgsrc, d.pic_info.push(u)), "photoset" === d.type && "undefined" != typeof h.imgextra && h.imgextra instanceof Array)
											for (var f = 0; f < h.imgextra.length; f++) {
												var g = e.extend(!0, {}, i.picItem);
												g.url = h.imgextra[f].imgsrc, d.pic_info.push(g)
											}
										p && r.length < p ? r.push(d) : this.hasTopimg && !c ? (r.push(d), c = !0) : o.push(d)
									}
								}
								if ("0021" == this.channelid)
									for (var v = r.concat(o), y = 0; y < v.length; y++) {
										var h = v[y];
										h.link = h.link.replace(/utm_medium=tab_\*/gi, "utm_medium=tab_" + (this.offset + y + 1))
									}
								if (this.isAppointList) {
									this.updateAppointData(a), a.topdata.data = [], a.listdata.data = [];
									for (var l = 0; l < a.otherinfo.appointArticle.focus.length; l++) a.topdata.data.push(a.otherinfo.appointArticle.focus[l].data);
									for (var l = 0; l < a.otherinfo.appointArticle.list.length; l++) a.topdata.data.push(a.otherinfo.appointArticle.list[l].data)
								}
								if (this.isAppointLong) {
									this.updateAppointLongData(a), a.topdata.data = [], a.listdata.data = [];
									for (var l = 0; l < a.otherinfo.appointLongArticle.focus.length; l++) a.topdata.data.push(a.otherinfo.appointLongArticle.focus[l].data);
									for (var l = 0; l < a.otherinfo.appointLongArticle.list.length; l++) a.topdata.data.push(a.otherinfo.appointLongArticle.list[l].data)
								}
								i.o.enableFixPhotoview ? this.fixPhotoview(a).done(function(t) {
									s.resizePhoto(t), n.resolve(t)
								}) : i.o.enableFixLaunchSpecial ? this.fixLaunchSpecial(a).done(function(t) {
									s.resizePhoto(a), n.resolve(a)
								}) : (s.resizePhoto(a), n.resolve(a))
							}.call(this, c);
						break;
					case 1:
						break;
					case 2:
						break;
					case 3:
						var g = this.channelData.setList;
						"object" == typeof this.channelData.topList && (this.hasTopimg = !1);
						var h = this.channelData.topList || {};
						if (g.topicid === h.topicid) var p = parseInt(h.size) || 1;
						var v;
						this.jsonpNum.indexOf("top") == -1 && (v = this.child),
							function(t) {
								for (var o = a.listdata.data, r = a.topdata.data, c = 0; c < t.length; c++) {
									var l = t[c],
										h = e.extend(!0, {}, i.docItem),
										d = e.extend(!0, {}, i.picItem);
									h.docid = l.setid, h.ptime = l.createdate, h.title = l.setname, h.digest = l.desc, h.tcount = l.replynum;
									var u = l.seturl;
									u = u.replace(/([^#]*)#.*/, "$1");
									var m = u.replace(/.*\/(\d+).html.*/, "$1"),
										f = u.replace(/.*\/photoview\/(.*)\/(\d+).html.*/, "$1").replace(/.*(.{4})$/, "$1");
									h.link = i.tplLink.setid + "?channel=photo&" + i.locsearch() + "setid=" + m + "&channelid=" + f + "&offset=" + (this.offset + c), v && (h.link += "&child=" + v), h.type = "photoset", h.tag = "\u56fe\u96c6", h.imgsum = l.imgsum, d.url = l.cover, h.pic_info.push(d);
									for (var g = 0; g < l.pics.length && g < 3; g++) {
										var y = e.extend(!0, {}, i.picItem);
										y.url = l.pics[g], h.pic_info.push(y)
									}
									p && r.length < p ? r.push(h) : o.push(h)
								}
								s.resizePhoto(a), n.resolve(a)
							}.call(this, o);
						break;
					case 4:
						(function(t) {
							t = t["\u6bb5\u5b50"];
							for (var o = a.listdata.data, r = a.topdata.data, c = 0; c < t.length; c++) {
								var l = t[c],
									h = e.extend(!0, {}, i.docItem);
								e.extend(!0, {}, i.picItem);
								h.docid = l.docid, h.title = l.title, h.digest = l.digest, h.tcount = l.replyCount + l.upTimes + l.downTimes, h.category = l.source, h.priority = l.priority, h.type = "doc", h.tag = "";
								var d = "?channel=joke&" + i.locsearch() + "offset=" + (this.offset + c) + "&docid=" + l.docid,
									u = "docid",
									m = {
										docid: l.docID
									},
									f = i.simpleParse(i.tplLink[u], m);
								f.indexOf("newsapp/applinks.html") != -1 ? (d = d.substring(1), f += encodeURIComponent(d)) : f += d, h.link = f, l.pic_url && (h.pic_info = JSON.parse(l.pic_url)), p && r.length < p ? r.push(h) : o.push(h)
							}
							s.resizePhoto(a), n.resolve(a)
						}).call(this, o);
						break;
					case 5:
						(function(t) {
							var e = ["code", "banner", "news", "live", "bottom", "other", "reverse"];
							for (var i in t)
								if (e.indexOf(i) === -1 && t.hasOwnProperty(i) && t[i] instanceof Array)
									for (var o = 0, a = 0; a < t[i].length; a++) {
										var s = t[i][a];
										if (null === s.addata || "undefined" == typeof s.addata) {
											var r = this.updateNewListItem(s, a - o);
											null === r && t[i].splice(a, 1)
										} else o++
									}
								this.resizeNewListPhoto(t), n.resolve(t)
						}).call(this, o)
				}
				return n.promise()
			}, i.formater.prototype.imgSize = function(t, e, n) {
				if (t.pic_info = [], t.picInfo instanceof Array)
					for (var o = 0; o < t.picInfo.length; o++) {
						var a = t.picInfo[o],
							s = i.stringTrim(a.url);
						a.url = s, "string" == typeof s && (t.pic_info.push(a), 0 === s.indexOf("http://imgsize.ph.126.net/?imgurl=") && (s = s.substring(s.lastIndexOf("?imgurl=") + 8, s.indexOf("_"))), a.o_url = s, s.lastIndexOf(".gif") === -1 && (a.url = "http://imgsize.ph.126.net/?imgurl=" + s + e, s.indexOf("nosdn.127.net/") != -1 && (s = s.replace(/(\?.*)/, ""), a.o_url = s, a.url = s + n)))
					}
			}, i.formater.prototype.resizeNewListPhoto = function(t) {
				var e = i.nosImageViewConfig,
					n = function(t, e, i) {
						for (var n = 0; n < t.length; n++) {
							var o = t[n];
							this.imgSize(o, e, i)
						}
					},
					o = function(t, i, n) {
						for (var o = i, a = n, s = 0; s < t.length; s++) {
							var r = t[s];
							"bigimg" == r.type ? (i = "_690x230x1x45.jpg&enlarge=true", n = "?imageView&thumbnail=690y230&quality=45&type=" + e.type + "&interlace=1&enlarge=1") : (i = o, n = a), this.imgSize(r, i, n)
						}
					},
					a = null;
				for (var s in t)
					if (t.hasOwnProperty(s) && t[s] instanceof Array) {
						a = n;
						var r = "_220x165x1x45.jpg&enlarge=true",
							c = "?imageView&thumbnail=220y165&quality=45&type=" + e.type + "&interlace=1&enlarge=1";
						switch (s) {
							case "list":
								r = "_220x165x1x45.jpg&enlarge=true", c = "?imageView&thumbnail=220y165&quality=45&type=" + e.type + "&interlace=1&enlarge=1", a = o;
								break;
							case "focus":
								r = "_750x380x1x45.jpg&enlarge=true", c = "?imageView&thumbnail=750y380&quality=45&type=" + e.type + "&interlace=1&enlarge=1";
								break;
							case "news":
								break;
							case "live":
								break;
							case "banner":
								break;
							case "bottom":
								break;
							case "other":
						}
						a.call(this, t[s], r, c)
					}
			}, i.formater.prototype.updateNewListItem = function(t, e) {
				e = "offset=" + (this.offset + e) + "&";
				var n = "",
					o = t.link || "",
					a = this.channelid,
					s = i.channelMap[a].channel,
					r = this.child;
				s = r && "undefined" != r ? "channel=" + s + "&child=" + this.child + "&" : "channel=" + s + "&";
				var c = i.extraFromURL(o),
					l = c.parameter,
					h = c.anchor,
					p = "",
					d = null,
					u = t.typeid,
					m = t.tag,
					f = (t.type, ""),
					g = "",
					v = parseInt(t.imgsrc3gtype) || 0,
					y = t.docid || "",
					w = this.channelData.extraParameter || "";
				if (t.hasOwnProperty("type") && t.type)
					if ("special" === t.type) {
						var b = u,
							x = b.lastIndexOf("#");
						x != -1 && (b = b.substring(0, x)), b.indexOf("Sop") !== -1 ? i.tplLink.sid = "http://c.3g.163.com/nc/qa/gold/gold.html" : i.tplLink.sid = "http://3g.163.com/touch/specail_view.html", n = "?" + s + l + e + "sid=" + b + h, f = "doc", p = "sid"
					} else if ("photoset" === t.type) {
					var S = u.split("|"),
						k = S[0].substr(-4, 4),
						P = i.stringTrim(S[1]);
					n = "?" + s + l + e + "setid=" + P + "&channelid=" + k + h, f = "photoset", p = "setid"
				} else if ("live" === t.type) {
					var L = u;
					n = "?" + s + l + e + "roomid=" + L + h, f = "doc", p = "roomid"
				} else if ("video" === t.type) {
					var T = u;
					n = "?" + s + l + e + "vid=" + T + h, f = "doc", p = "vid"
				} else if ("expert" === t.type) {
					var _ = u;
					n = "?" + s + l + e + "exid=" + _ + h, f = "doc", p = "exid"
				} else "doc" === t.type ? (n = "?" + s + w + l + e + "docid=" + y + h, f = "doc", p = "docid", d = {
					docid: y
				}, "\u89c6\u9891" === u ? m = "\u89c6\u9891" : "LIVE" === u ? m = "LIVE" : "\u72ec\u5bb6" === u ? m = "\u72ec\u5bb6" : 0 === u.indexOf("v") && (m = "\u6295\u7968")) : "docjoke" === t.type ? (n = "?" + s + w + l + e + "docid=" + y + h, f = "docjoke", p = "docid", d = {
					docid: y
				}) : 0 === t.type.indexOf("wap-doc") ? f = "doc" : 0 === t.type.indexOf("wap-photoset") ? f = "photoset" : "docStarAttitude" === t.type ? (f = "", g = t.type) : "channel_entry" === t.type && (f = "", g = t.type);
				if (t.tag = m, n.length > 0 && i.tplLink.hasOwnProperty(p) && (o = i.simpleParse(i.tplLink[p], d), o.indexOf("newsapp/applinks.html") != -1 ? (n = n.substring(1), o += encodeURIComponent(n)) : o += n, t.link = o), f.length > 0 && t.picInfo && t.picInfo.length >= 2 && (f = "photoset"), f.length > 0) switch (v) {
					case 0:
						break;
					case 1:
						break;
					case 2:
						f = "photoset";
						break;
					case 3:
						f = "bigimg";
						break;
					case 4:
						f = "bigimg"
				}
				return i.diff[this.channelid + this.child].docidList.indexOf(y) != -1 ? null : (i.diff[this.channelid + this.child].docidList.push(y), t.type = f || g, t)
			}, i.Transf2016HeadLineData = function(t) {
				this.channelid = t.channelid, this.channel = t.channel || i.channelMap[this.channelid].channel, this.child = "", t.child && (this.child = "&child=" + t.child), this.extraParameter = t.extraParameter || ""
			}, i.Transf2016HeadLineData.prototype.repleaceSkipType = function(t) {
				var e = "";
				if (t.skipType) {
					if ("photoset" === t.skipType) {
						var n = t.skipID.split("|"),
							o = n[1],
							a = n[0].substr(-4);
						e = i.tplLink.setid + "?setid=" + o + "&channelid=" + a + "&channel=" + this.channel + this.child + this.extraParameter
					} else if ("live" === t.skipType) e = i.tplLink.roomid + "?roomid=" + t.skipID + "&channel=" + this.channel + this.child + this.extraParameter;
					else if ("special" === t.skipType) {
						var s = t.skipID,
							r = s.lastIndexOf("#");
						r != -1 && (s = s.substring(0, r)), e = i.tplLink.sid + "?sid=" + s + "&channel=" + this.channel + this.child + this.extraParameter
					}
				} else t.docid.toUpperCase() === t.docid && (e = i.tplLink.docid + "?docid=" + t.docid + "&channel=" + this.channel + this.child + this.extraParameter);
				return e
			}, i.Transf2016HeadLineData.prototype.transdata = function(t) {
				try {
					var e = t.headLine,
						i = this.repleaceSkipType(e.matchSubtitles);
					if (i && (e.matchSubtitles.link = i), "object" == typeof e.matchNews && e.matchNews instanceof Array)
						for (var n = e.matchNews.length, o = 0; o < n; o++) i = this.repleaceSkipType(e.matchNews[o]), i && (e.matchNews[o].link = i);
					return t
				} catch (a) {
					return console.log(a), null
				}
			}, i.cache = {}, i.jsonpNum = {
				joke: 0,
				tuijian: 0
			}, i.jsonpCallbackArtiList = [], i.handleNetworkError = function(t, n) {
				switch (t.URLType) {
					case 0:
						for (var o, a = -1, s = t.channelData.articleList.topicid, r = i.jsonpCallbackArtiList, c = 0; c < r.length; c++)
							if (r[c].id == s) {
								a = c;
								break
							}
						if (a == -1) return;
						o = r[a], i.jsonpCallbackArtiList.splice(a, 1), n = o.dtd;
						break;
					case 3:
						var l = t.callbackName;
						delete window[l]
				}
				var h = e.extend(!0, {}, i.dataList);
				h.code = "network_error", n && n.resolve(h)
			}, i.fectch = function(t) {
				var n = e.Deferred(),
					o = t.url,
					a = t.success,
					s = new i.formater(o, a);
				switch (t.url = s.transurl(), t.cache = !0, s.URLType) {
					case -1:
						break;
					case 0:
						var r = function(t) {
							var e, n, o = -1;
							for (var a in t)
								if (t.hasOwnProperty(a) && t[a] instanceof Array) {
									e = a;
									break
								}
							for (var s = i.jsonpCallbackArtiList, r = 0; r < s.length; r++)
								if (s[r].id == e) {
									o = r;
									break
								}
							if (o != -1) {
								n = s[o], i.jsonpCallbackArtiList.splice(o, 1);
								try {
									n.context.transdata(t).done(function(t) {
										n.dtd.resolve(t)
									})
								} catch (c) {
									throw c
								}
							}
						};
						i.jsonpCallbackArtiList.push({
							id: s.channelData.articleList.topicid,
							context: s,
							dtd: n
						}), window.artiList = r;
						break;
					case 1:
						break;
					case 2:
						break;
					case 3:
						var c = s.callbackName;
						window[c] = function(t) {
							delete window[c], s.transdata(t).done(function(t) {
								n.resolve(t)
							})
						};
						break;
					case 4:
						var c = s.callbackName;
						window[c] = function(t) {
							delete window[c], s.transdata(t).done(function(t) {
								n.resolve(t)
							})
						};
					case 5:
						var c = s.callbackName;
						window[c] = function(t) {
							delete window[c], s.transdata(t).done(function(t) {
								n.resolve(t)
							})
						}
				}
				return i.importjs(t.url, function(t) {
					t && i.handleNetworkError(s, n)
				}), n.promise()
			}, i.ajax = function(t) {
				if (t["new"]) {
					t.cache = !0, t.dataType = "jsonp";
					var n = t.url,
						o = t.url.replace(/.*channel=([^&]*).*/, "$1"),
						a = i.channelMap[o],
						s = {
							offset: 0,
							size: 10,
							channel: "0001",
							child: "all"
						};
					for (var r in s) s.hasOwnProperty(r) && n.indexOf(r + "=") !== -1 && (s[r] = n.replace(new RegExp(".*" + r + "=([^&]*).*"), "$1"));
					s.channel = a.channel, "undefined" === s.child && (s.child = "all"), t.url = "http://3g.163.com/touch/jsonp/article/list/" + s.channel + "_" + s.child + "/" + s.offset + "-" + s.size + ".html";
					var c = t.success;
					return window.artiList = function(t) {
						void 0 === t.otherinfo && (t.otherinfo = {}), c(t)
					}, e.ajax(t)
				}
				var l = e.Deferred(),
					h = t.success,
					p = t.error,
					o = t.url.replace(/.*channel=([^&]*).*/, "$1"),
					a = i.channelMap[o];
				"object" != typeof a && (t.url = t.url.replace(/channel=[^&]*[&]?/, "channel=tuijian"), a = i.channelMap.tuijian, o = "tuijian");
				var d = t.url.replace(/.*child=([^&]*).*/, "$1");
				"object" == typeof a.child && "object" == typeof a.child[d] && (a = a.child[d]);
				var u = t.url.replace(/.*offset=([^&]*).*/, "$1"),
					m = "object" == typeof a.topList,
					f = "object" == typeof a.secondFocus,
					g = "object" == typeof a.articleListHead && 0 == u,
					v = "object" == typeof a.appointList && u >= a.appointList.offset,
					y = "object" == typeof a.appointLong && u >= a.appointLong.offset,
					w = a.hasOwnProperty("type"),
					b = w && "photolist" === a.type;
				return t.url = i.tplLink.update(t.url), async.parallel({
					topdata: function(t) {
						if (!m) return t(null, null);
						var e = a.topList.topicid;
						if ("undefined" != typeof i.cache[e] && i.cache[e].data.length > 0) return t(null, i.cache[e]);
						var n = a.topList.size,
							s = a.topList.offset,
							r = {
								type: "GET",
								url: "newap_article_list?offset=" + s + "&size=" + n + "&channel=" + o + "&topicid=" + e,
								dataType: "jsonp",
								success: function(t) {
									console.log("na~")
								}
							};
						b && (r.url = "newap_photo_list?offset=0&size=" + n + "&channel=" + o + "&channelid=" + a.topList.channelid + "&topicid=" + e), i.fectch(r).done(function(n) {
							return 200 !== n.code ? t(n.code, n.topdata) : (i.cache[e] = n.topdata, void t(null, n.topdata))
						})
					},
					secondFocus: function(t) {
						if (!f) return t(null, null);
						var e = a.secondFocus.topicid,
							n = a.secondFocus.size || 1;
						if ("undefined" != typeof i.cache[e] && i.cache[e].data.length > 0) return t(null, i.cache[e]);
						var s = {
							type: "GET",
							url: "newap_article_list?offset=0&size=" + n + "&channel=" + o + "&topicid=" + e,
							dataType: "jsonp",
							success: function(t) {
								console.log("na~")
							}
						};
						i.fectch(s).done(function(n) {
							return 200 !== n.code ? t(n.code, n.topdata) : (i.cache[e] = n.topdata, void t(null, n.topdata))
						})
					},
					listHead: function(t) {
						if (!g) return t(null, null);
						var e = a.articleListHead.topicid;
						if ("undefined" != typeof i.cache[e] && i.cache[e].data.length > 0) return t(null, i.cache[e]);
						var n = {
							type: "GET",
							url: "newap_article_list?offset=0&size=1&channel=" + o + "&topicid=" + e,
							dataType: "jsonp",
							success: function(t) {
								console.log("na~")
							}
						};
						i.fectch(n).done(function(n) {
							return 200 !== n.code ? t(n.code, n.topdata) : (i.cache[e] = n.topdata, void t(null, n.topdata))
						})
					},
					appointdataList: function(t) {
						if (!v) return t(null, null);
						var e = a.appointList.topicid;
						if (i.cache[e] instanceof Array && i.cache[e].length > 0) return t(null, i.cache[e]);
						var n = a.appointList.size,
							s = {
								type: "GET",
								url: "newap_article_list?offset=0&size=" + n + "&channel=" + o + "&topicid=" + e,
								dataType: "jsonp",
								success: function(t) {}
							};
						i.fectch(s).done(function(n) {
							return 200 !== n.code ? t(n.code, n.otherinfo) : (i.cache[e] = n.otherinfo.appointArticle, void t(null, n.otherinfo.appointArticle))
						})
					},
					appointdataLong: function(t) {
						if (!y) return t(null, null);
						var e = a.appointLong.topicid;
						if (i.cache[e] instanceof Array && i.cache[e].length > 0) return t(null, i.cache[e]);
						var n = a.appointLong.size,
							s = {
								type: "GET",
								url: "newap_article_list?offset=0&size=" + n + "&channel=" + o + "&topicid=" + e,
								dataType: "jsonp",
								success: function(t) {}
							};
						i.fectch(s).done(function(n) {
							return 200 !== n.code ? t(n.code, n.otherinfo) : (i.cache[e] = n.otherinfo.appointLongArticle, void t(null, n.otherinfo.appointLongArticle))
						})
					},
					listdata: function(e) {
						i.fectch(t).done(function(t) {
							return 200 !== t.code ? e(t.code, t.topdata) : void e(null, t)
						})
					}
				}, function(t, e) {
					if (t && "function" == typeof p && (l.reject(t), "function" == typeof p)) return p(t);
					var i = e.listdata;
					m && (i.topdata = e.topdata), f && (i.topdata.data = i.topdata.data.concat(e.secondFocus.data)), g && (i.listdata.data = e.listHead.data.concat(i.listdata.data)), v && (i.otherinfo.appointArticle = e.appointdataList), y && (i.otherinfo.appointArticle = e.appointdataLong), "function" == typeof h && h(i), l.resolve(i)
				}), l.promise()
			}, i.o = {
				name: "data provider",
				description: "let fecth and format data reasonable"
			}, i.o.ajax = i.ajax, i.o.tplLink = i.tplLink, i.o.routereg = i.routereg, i.o.channelidFromRoute = i.channelidFromRoute, i.o.channelidFromChannel = i.channelidFromChannel, i.o.loc = i.loc, i.o.Transf2016HeadLineData = i.Transf2016HeadLineData, i.o.nosImageViewConfig = i.nosImageViewConfig, i.o.articleListMaxStart = 300, i.o.enableFixLaunchSpecial = !1, i.o.enableFixPhotoview = !1, i.o.inheritSearchBlockedList = ["docid", "sid", "setid", "channel", "channelid", "roomid", "vid", "exid"], i.o.inheritSearchList = ["qd"], i.o.enableInheritSearch = 1, void 0 === t.DP && (t.DP = i.o)
		}(this.NEWAP, this.Zepto)
	}.call(window),
	function(t, e, i) {
		i.Static = i.Static || {};
		var n = i.Static,
			o = i.tools;
		n.handlebars_helper = function() {
			e.registerHelper("hasimg", function(t, e) {
				return t.length > 0 ? e.fn(this) : e.inverse(this)
			}), e.registerHelper("getone", function(t, e, i, n) {
				return (i ? t[e][i] : t[e]) || ""
			}), e.registerHelper("isFirst", function(t, e) {
				0 == t ? e.fn(this) : e.inverse(this)
			}), e.registerHelper("tcounthandle", function(t, e, i) {
				var n = (e + "").length,
					o = 99999;
				return t > parseInt(e) && t <= o ? (t / Math.pow(10, n)).toFixed(1) + "\u4e07" : t > o ? (t / Math.pow(10, n)).toFixed(0) + "\u4e07" : t
			}), e.registerHelper("nozero", function(t, e) {
				var i = !1;
				return "0" == t && i ? e.inverse(this) : e.fn(this)
			}), e.registerHelper("getDvalueDay", function(t, e) {
				return o.publicMethod.getDayDvalue(t)
			}), e.registerHelper("arrLengthNot", function(t, e, i) {
				return t.length != e ? i.fn(this) : i.inverse(this)
			}), e.registerHelper("notIosSafari", function(t) {
				return o.uaMatch.isIos ? t.inverse(this) : t.fn(this)
			}), e.registerHelper("isSpecial", function(t, e) {
				return "\u4e13\u9898" == t ? e.fn(this) : e.inverse(this)
			}), e.registerHelper("isBigVideo", function(t, e) {
				return "\u89c6\u9891" == t ? e.fn(this) : e.inverse(this)
			}), e.registerHelper("bothEnClass", function(t, e, i) {
				return e % t === 0 ? " first" : e % t === t - 1 ? " tail" : ""
			})
		}
	}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}),
	function(t, e, i) {
		function n(t, i) {
			this.container = t, this.wrapper = "string" == typeof t ? e.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
				resizeScrollbars: !0,
				mouseWheelSpeed: 20,
				snapThreshold: .334,
				startX: 0,
				startY: 0,
				scrollY: !0,
				directionLockThreshold: 5,
				momentum: !0,
				bounce: !0,
				bounceTime: 600,
				bounceEasing: "",
				preventDefault: !0,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
					className: /(js-briefIntro)/
				},
				HWCompositing: !0,
				useTransition: !0,
				useTransform: !0
			};
			for (var n in i) this.options[n] = i[n];
			this.translateZ = this.options.HWCompositing && c.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = c.hasTransition && this.options.useTransition, this.options.useTransform = c.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? c.ease[this.options.bounceEasing] || c.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable(), this.clickMove = !1, this.scrollMove = !1
		}

		function o(t, i, n) {
			var o = e.createElement("div"),
				a = e.createElement("div");
			return n === !0 && (o.style.cssText = "position:absolute;z-index:9999", a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), a.className = "iScrollIndicator", "h" == t ? (n === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", a.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (n === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", a.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", i || (o.style.pointerEvents = "none"), o.appendChild(a), o
		}

		function s(t, i) {
			this.wrapper = "string" == typeof i.el ? e.querySelector(i.el) : i.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = t, this.options = {
				listenX: !0,
				listenY: !0,
				interactive: !1,
				resize: !0,
				defaultScrollbars: !1,
				shrink: !1,
				fade: !1,
				speedRatioX: 0,
				speedRatioY: 0
			};
			for (var n in i) this.options[n] = i[n];
			this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (c.addEvent(this.indicator, "touchstart", this), c.addEvent(a, "touchend", this)), this.options.disablePointer || (c.addEvent(this.indicator, "MSPointerDown", this), c.addEvent(a, "MSPointerUp", this)), this.options.disableMouse || (c.addEvent(this.indicator, "mousedown", this), c.addEvent(a, "mouseup", this))), this.options.fade && (this.wrapperStyle[c.style.transform] = this.scroller.translateZ, this.wrapperStyle[c.style.transitionDuration] = c.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
		}
		var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
				t.setTimeout(e, 1e3 / 60)
			},
			c = function() {
				function n(t) {
					return s !== !1 && ("" === s ? t : s + t.charAt(0).toUpperCase() + t.substr(1))
				}
				var o = {},
					a = e.createElement("div").style,
					s = function() {
						for (var t, e = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, n = e.length; n > i; i++)
							if (t = e[i] + "ransform", t in a) return e[i].substr(0, e[i].length - 1);
						return !1
					}();
				o.getTime = Date.now || function() {
					return (new Date).getTime()
				}, o.extend = function(t, e) {
					for (var i in e) t[i] = e[i]
				}, o.addEvent = function(t, e, i, n) {
					t.addEventListener(e, i, !!n)
				}, o.removeEvent = function(t, e, i, n) {
					t.removeEventListener(e, i, !!n)
				}, o.momentum = function(t, e, n, o, a, s) {
					var r, c, l = t - e,
						h = i.abs(l) / n;
					return s = void 0 === s ? 6e-4 : s, r = t + h * h / (2 * s) * (0 > l ? -1 : 1), c = h / s, o > r ? (r = a ? o - a / 2.5 * (h / 8) : o, l = i.abs(r - t), c = l / h) : r > 0 && (r = a ? a / 2.5 * (h / 8) : 0, l = i.abs(t) + r, c = l / h), {
						destination: i.round(r),
						duration: c
					}
				};
				var r = n("transform");
				return o.extend(o, {
					hasTransform: r !== !1,
					hasPerspective: n("perspective") in a,
					hasTouch: "ontouchstart" in t,
					hasPointer: navigator.msPointerEnabled,
					hasTransition: n("transition") in a
				}), o.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion), o.extend(o.style = {}, {
					transform: r,
					transitionTimingFunction: n("transitionTimingFunction"),
					transitionDuration: n("transitionDuration"),
					transitionDelay: n("transitionDelay"),
					transformOrigin: n("transformOrigin")
				}), o.hasClass = function(t, e) {
					var i = new RegExp("(^|\\s)" + e + "(\\s|$)");
					return i.test(t.className)
				}, o.addClass = function(t, e) {
					if (!o.hasClass(t, e)) {
						var i = t.className.split(" ");
						i.push(e), t.className = i.join(" ")
					}
				}, o.removeClass = function(t, e) {
					if (o.hasClass(t, e)) {
						var i = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
						t.className = t.className.replace(i, " ")
					}
				}, o.offset = function(t) {
					for (var e = -t.offsetLeft, i = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft, i -= t.offsetTop;
					return {
						left: e,
						top: i
					}
				}, o.preventDefaultException = function(t, e) {
					for (var i in e)
						if (e[i].test(t[i])) return !0;
					return !1
				}, o.extend(o.eventType = {}, {
					touchstart: 1,
					touchmove: 1,
					touchend: 1,
					mousedown: 2,
					mousemove: 2,
					mouseup: 2,
					MSPointerDown: 3,
					MSPointerMove: 3,
					MSPointerUp: 3
				}), o.extend(o.ease = {}, {
					quadratic: {
						style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
						fn: function(t) {
							return t * (2 - t)
						}
					},
					circular: {
						style: "cubic-bezier(0, 0.68, 0.68, 1)",
						fn: function(t) {
							return i.sqrt(1 - --t * t)
						}
					},
					back: {
						style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
						fn: function(t) {
							var e = 4;
							return (t -= 1) * t * ((e + 1) * t + e) + 1
						}
					},
					bounce: {
						style: "",
						fn: function(t) {
							return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
						}
					},
					elastic: {
						style: "",
						fn: function(t) {
							var e = .22,
								n = .4;
							return 0 === t ? 0 : 1 == t ? 1 : n * i.pow(2, -10 * t) * i.sin(2 * (t - e / 4) * i.PI / e) + 1
						}
					}
				}), o.tap = function(t, i) {
					var n = e.createEvent("Event");
					n.initEvent(i, !0, !0), n.pageX = t.pageX, n.pageY = t.pageY, t.target.dispatchEvent(n)
				}, o.click = function(t) {
					var i, n = t.target;
					/(SELECT|INPUT|TEXTAREA)/i.test(n.tagName) || (i = e.createEvent("MouseEvents"), i.initMouseEvent("click", !0, !0, t.view, 1, t.screenX, t.screenY, t.clientX, t.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), i._constructed = !0, n.dispatchEvent(i))
				}, o
			}();
		n.prototype = {
			version: "5.1.1",
			_init: function() {
				this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
			},
			destroy: function() {
				this._initEvents(!0), this._execEvent("destroy")
			},
			_transitionEnd: function(t) {
				this.clickMove = !1, this.scrollMove = !1, t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1))
			},
			_start: function(t) {
				var e = Zepto("#guide img")[0];
				if (t.target == e && this.options.click && c.click(t), !(1 != c.eventType[t.type] && 0 !== t.button || !this.enabled || this.initiated && c.eventType[t.type] !== this.initiated)) {
					var n = c.preventDefaultException(t.target, this.options.preventDefaultException);
					!this.options.preventDefault || c.isBadAndroid || n || t.preventDefault();
					var o, a = t.touches ? t.touches[0] : t;
					this.initiated = c.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = c.getTime(), this.clickMove || (this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, o = this.getComputedPosition(), this._translate(i.round(o.x), i.round(o.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd"))), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = a.pageX, this.pointY = a.pageY, this.screenX = a.screenX, this.screenY = a.screenY, this.clientX = a.clientX, this.clientY = a.clientY, this._execEvent("beforeScrollStart")
				}
			},
			_move: function(t) {
				if (".last-page" == this.container && this.x <= 0) {
					if (t.stopPropagation(), this.enabled && c.eventType[t.type] === this.initiated) {
						this.options.preventDefault && t.preventDefault();
						var e, n, o, a, s, r = t.touches ? t.touches[0] : t,
							l = r.pageX - this.pointX,
							h = r.pageY - this.pointY;
						if (e = c.getTime(), this.pointX = r.pageX, this.pointY = r.pageY, this.distX += l, this.distY += h, a = i.abs(this.distX), s = i.abs(this.distY), !(e - this.endTime > 300 && 10 > a && 10 > s)) {
							if (this.directionLocked || this.options.freeScroll || (this.directionLocked = a > s + this.options.directionLockThreshold ? "h" : s >= a + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
								if ("vertical" == this.options.eventPassthrough) t.preventDefault();
								else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
								h = 0
							} else if ("v" == this.directionLocked) {
								if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
								else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
								l = 0
							}
							l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, n = this.x + l, o = this.y + h, (n > 0 || n < this.maxScrollX) && (n = this.options.bounce ? this.x + l / 3 : n > 0 ? 0 : this.maxScrollX), (o > 0 || o < this.maxScrollY) && (o = this.options.bounce ? this.y + h / 3 : o > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : 0 > l ? 1 : 0, this.directionY = h > 0 ? -1 : 0 > h ? 1 : 0, this.moved && this._execEvent("scroll") || this._execEvent("scrollStart"), this.moved = !0, this._translate(n, o)
						}
					}
				} else if ((".currentPhoto" == this.container || ".last-page" == this.container) && this.enabled && c.eventType[t.type] === this.initiated) {
					this.options.preventDefault && t.preventDefault();
					var e, n, o, a, s, r = t.touches ? t.touches[0] : t,
						l = r.pageX - this.pointX,
						h = r.pageY - this.pointY;
					if (e = c.getTime(), this.pointX = r.pageX, this.pointY = r.pageY, this.distX += l, this.distY += h, a = i.abs(this.distX), s = i.abs(this.distY), !(e - this.endTime > 300 && 10 > a && 10 > s)) {
						if (this.directionLocked || this.options.freeScroll || (this.directionLocked = a > s + this.options.directionLockThreshold ? "h" : s >= a + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
							if ("vertical" == this.options.eventPassthrough) t.preventDefault();
							else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
							h = 0
						} else if ("v" == this.directionLocked) {
							if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
							else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
							l = 0
						}
						l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, n = this.x + l, o = this.y + h, (n > 0 || n < this.maxScrollX) && (n = this.options.bounce && !NEWAP.tools.uaMatch.isIos ? this.x + l / 2 : n > 0 ? 0 : this.maxScrollX), (o > 0 || o < this.maxScrollY) && (o = this.options.bounce ? this.y + h / 2 : o > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : 0 > l ? 1 : 0, this.directionY = h > 0 ? -1 : 0 > h ? 1 : 0, this.moved && this._execEvent("scroll") || this._execEvent("scrollStart"), this.moved = !0, this._translate(n, o)
					}
				}
			},
			_end: function(t) {
				try {
					t.screenX = this.screenX, t.screenY = this.screenY, t.clientX = this.clientX, t.clientY = this.clientY
				} catch (e) {
					console.warn(e)
				}
				if (".last-page" == this.container && this.x <= 0) {
					if (t.stopPropagation(), this.enabled && c.eventType[t.type] === this.initiated) {
						this.options.preventDefault && !c.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
						var n, o, e = (t.changedTouches ? t.changedTouches[0] : t, c.getTime() - this.startTime),
							a = i.round(this.x),
							s = i.round(this.y),
							r = i.abs(a - this.startX),
							l = i.abs(s - this.startY),
							h = 0,
							p = "";
						if (this.isInTransition = 0, this.initiated = 0, this.endTime = c.getTime(), void this._execEvent("beforeScrollEnd"), !this.resetPosition(this.options.bounceTime)) {
							if (this.scrollTo(a, s), !this.moved) return this.options.click && c.click(t), this.options.tap && c.tap(t, this.options.tap);
							if (void this._execEvent("scrollCancel"), this._events.flick && 200 > e && 100 > r && 100 > l) return void this._execEvent("flick");
							if (this.options.momentum && 300 > e && (n = this.hasHorizontalScroll ? c.momentum(this.x, this.startX, e, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
									destination: a,
									duration: 0
								}, o = this.hasVerticalScroll ? c.momentum(this.y, this.startY, e, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
									destination: s,
									duration: 0
								}, a = n.destination, s = o.destination, h = i.max(n.duration, o.duration), this.isInTransition = 1), this.options.snap) {
								var d = this._nearestSnap(a, s);
								this.currentPage = d, h = this.options.snapSpeed || i.max(i.max(i.min(i.abs(a - d.x), 1e3), i.min(i.abs(s - d.y), 1e3)), 300), a = d.x, s = d.y, this.directionX = 0, this.directionY = 0, p = this.options.bounceEasing
							}
							return this.scrollMove = !0, this._execEvent("scrollEnd"), a != this.x || s != this.y ? ((a > 0 || a < this.maxScrollX || s > 0 || s < this.maxScrollY) && (p = c.ease.quadratic), void this.scrollTo(a, s, h, p)) : void 0
						}
					}
				} else if ((".currentPhoto" == this.container || ".last-page" == this.container) && this.enabled && c.eventType[t.type] === this.initiated) {
					this.options.preventDefault && !c.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
					var n, o, e = (t.changedTouches ? t.changedTouches[0] : t, c.getTime() - this.startTime),
						a = i.round(this.x),
						s = i.round(this.y),
						r = i.abs(a - this.startX),
						l = i.abs(s - this.startY),
						h = 0,
						p = "";
					if (this.isInTransition = 0, this.initiated = 0, this.endTime = c.getTime(), void this._execEvent("beforeScrollEnd"), !this.resetPosition(this.options.bounceTime)) {
						if (this.scrollTo(a, s), !this.moved) return this.options.click && c.click(t), void this._execEvent("scrollCancel"), this.options.tap && c.tap(t, this.options.tap);
						if (this._events.flick && 200 > e && 100 > r && 100 > l) return void this._execEvent("flick");
						if (this.options.momentum && 300 > e && (n = this.hasHorizontalScroll ? c.momentum(this.x, this.startX, e, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
								destination: a,
								duration: 0
							}, o = this.hasVerticalScroll ? c.momentum(this.y, this.startY, e, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
								destination: s,
								duration: 0
							}, a = n.destination, s = o.destination, h = i.max(n.duration, o.duration), this.isInTransition = 1), this.options.snap) {
							var d = this._nearestSnap(a, s);
							this.currentPage = d, h = this.options.snapSpeed || i.max(i.max(i.min(i.abs(a - d.x), 1e3), i.min(i.abs(s - d.y), 1e3)), 300), a = d.x, s = d.y, this.directionX = 0, this.directionY = 0, p = this.options.bounceEasing
						}
						return this.scrollMove = !0, this._execEvent("scrollEnd"), a != this.x || s != this.y ? ((a > 0 || a < this.maxScrollX || s > 0 || s < this.maxScrollY) && (p = c.ease.quadratic), void this.scrollTo(a, s, h, p)) : void 0
					}
				}
			},
			_resize: function() {
				var t = this;
				clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
					t.refresh()
				}, this.options.resizePolling)
			},
			resetPosition: function(t) {
				var e = this.x,
					i = this.y,
					t = t || 0;
				return !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX), this.hasHorizontalScroll && (this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX)), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), this.hasVerticalScroll && (this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY)), (e != this.x || i != this.y) && (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
			},
			disable: function() {
				this.enabled = !1
			},
			enable: function() {
				this.enabled = !0
			},
			refresh: function() {
				this.wrapper.offsetHeight, this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = c.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
			},
			on: function(t, e) {
				this._events[t] || (this._events[t] = []), this._events[t].push(e)
			},
			off: function(t, e) {
				if (this._events[t]) {
					var i = this._events[t].indexOf(e);
					i > -1 && this._events[t].splice(i, 1)
				}
			},
			_execEvent: function(t) {
				if (this._events[t]) {
					var e = 0,
						i = this._events[t].length;
					if (i)
						for (; i > e; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
				}
			},
			scrollBy: function(t, e, i, n) {
				t = this.x + t, e = this.y + e, i = i || 0, this.scrollTo(t, e, i, n)
			},
			scrollTo: function(t, e, i, n) {
				n = n || c.ease.circular, this.isInTransition = this.options.useTransition && i > 0, !i || this.options.useTransition && n.style ? (this._transitionTimingFunction(n.style), this._transitionTime(i), this._translate(t, e)) : this._animate(t, e, i, n.fn)
			},
			scrollToElement: function(t, e, n, o, a) {
				if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
					var s = c.offset(t);
					s.left -= this.wrapperOffset.left, s.top -= this.wrapperOffset.top, n === !0 && (n = i.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = i.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), s.left -= n || 0, s.top -= o || 0, s.left = s.left > 0 ? 0 : s.left < this.maxScrollX ? this.maxScrollX : s.left, s.top = s.top > 0 ? 0 : s.top < this.maxScrollY ? this.maxScrollY : s.top, e = void 0 === e || null === e || "auto" === e ? i.max(i.abs(this.x - s.left), i.abs(this.y - s.top)) : e, this.scrollTo(s.left, s.top, e, a)
				}
			},
			_transitionTime: function(t) {
				if (t = t || 0, this.scrollerStyle[c.style.transitionDuration] = t + "ms", !t && c.isBadAndroid && (this.scrollerStyle[c.style.transitionDuration] = "0.001s"), this.indicators)
					for (var e = this.indicators.length; e--;) this.indicators[e].transitionTime(t)
			},
			_transitionTimingFunction: function(t) {
				if (this.scrollerStyle[c.style.transitionTimingFunction] = t, this.indicators)
					for (var e = this.indicators.length; e--;) this.indicators[e].transitionTimingFunction(t)
			},
			_translate: function(t, e) {
				if (this.options.useTransform ? this.scrollerStyle[c.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ : (t = i.round(t), e = i.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"), this.x = t, this.y = e, this.indicators)
					for (var n = this.indicators.length; n--;) this.indicators[n].updatePosition()
			},
			_initEvents: function(e) {
				var i = e ? c.removeEvent : c.addEvent,
					n = this.options.bindToWrapper ? this.wrapper : t;
				i(t, "orientationchange", this), i(t, "resize", this), this.options.click && i(this.wrapper, "click", this, !0), this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(n, "mousemove", this), i(n, "mousecancel", this), i(n, "mouseup", this)), c.hasPointer && !this.options.disablePointer && (i(this.wrapper, "MSPointerDown", this), i(n, "MSPointerMove", this), i(n, "MSPointerCancel", this), i(n, "MSPointerUp", this)), c.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(this.scroller, "touchmove", this), i(this.scroller, "touchcancel", this), i(this.scroller, "touchend", this)), i(this.scroller, "transitionend", this), i(this.scroller, "webkitTransitionEnd", this), i(this.scroller, "oTransitionEnd", this), i(this.scroller, "MSTransitionEnd", this)
			},
			getComputedPosition: function() {
				var e, i, n = t.getComputedStyle(this.scroller, null);
				return this.options.useTransform ? (n = n[c.style.transform].split(")")[0].split(", "), e = +(n[12] || n[4]), i = +(n[13] || n[5])) : (e = +n.left.replace(/[^-\d.]/g, ""), i = +n.top.replace(/[^-\d.]/g, "")), {
					x: e,
					y: i
				}
			},
			_initIndicators: function() {
				function t(t) {
					for (var e = r.indicators.length; e--;) t.call(r.indicators[e])
				}
				var e, i = this.options.interactiveScrollbars,
					n = "string" != typeof this.options.scrollbars,
					a = [],
					r = this;
				this.indicators = [], this.options.scrollbars && (this.options.scrollY && (e = {
					el: o("v", i, this.options.scrollbars),
					interactive: i,
					defaultScrollbars: !0,
					customStyle: n,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: !1
				}, this.wrapper.appendChild(e.el), a.push(e)), this.options.scrollX && (e = {
					el: o("h", i, this.options.scrollbars),
					interactive: i,
					defaultScrollbars: !0,
					customStyle: n,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: !1
				}, this.wrapper.appendChild(e.el), a.push(e))), this.options.indicators && (a = a.concat(this.options.indicators));
				for (var c = a.length; c--;) this.indicators.push(new s(this, a[c]));
				this.options.fadeScrollbars && (this.on("scrollEnd", function() {
					t(function() {
						this.fade()
					})
				}), this.on("scrollCancel", function() {
					t(function() {
						this.fade()
					})
				}), this.on("scrollStart", function() {
					t(function() {
						this.fade(1)
					})
				}), this.on("beforeScrollStart", function() {
					t(function() {
						this.fade(1, !0)
					})
				})), this.on("refresh", function() {
					t(function() {
						this.refresh()
					})
				}), this.on("destroy", function() {
					t(function() {
						this.destroy()
					}), delete this.indicators
				})
			},
			_initWheel: function() {
				c.addEvent(this.wrapper, "wheel", this), c.addEvent(this.wrapper, "mousewheel", this), c.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
					c.removeEvent(this.wrapper, "wheel", this), c.removeEvent(this.wrapper, "mousewheel", this), c.removeEvent(this.wrapper, "DOMMouseScroll", this)
				})
			},
			_wheel: function(t) {
				if (this.enabled) {
					t.preventDefault(), t.stopPropagation();
					var e, n, o, a, s = this;
					if (void 0 === this.wheelTimeout && s._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
							s._execEvent("scrollEnd"), s.wheelTimeout = void 0
						}, 400), "deltaX" in t) e = -t.deltaX, n = -t.deltaY;
					else if ("wheelDeltaX" in t) e = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, n = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
					else if ("wheelDelta" in t) e = n = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
					else {
						if (!("detail" in t)) return;
						e = n = -t.detail / 3 * this.options.mouseWheelSpeed
					}
					if (e *= this.options.invertWheelDirection, n *= this.options.invertWheelDirection, this.hasVerticalScroll || (e = n, n = 0), this.options.snap) return o = this.currentPage.pageX, a = this.currentPage.pageY, e > 0 ? o-- : 0 > e && o++, n > 0 ? a-- : 0 > n && a++, void this.goToPage(o, a);
					o = this.x + i.round(this.hasHorizontalScroll ? e : 0), a = this.y + i.round(this.hasVerticalScroll ? n : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), a > 0 ? a = 0 : a < this.maxScrollY && (a = this.maxScrollY), this.scrollTo(o, a, 0)
				}
			},
			_initSnap: function() {
				this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
					var t, e, n, o, a, s, r = 0,
						c = 0,
						l = 0,
						h = this.options.snapStepX || this.wrapperWidth,
						p = this.options.snapStepY || this.wrapperHeight;
					if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
						if (this.options.snap === !0)
							for (n = i.round(h / 2), o = i.round(p / 2); l > -this.scrollerWidth;) {
								for (this.pages[r] = [], t = 0, a = 0; a > -this.scrollerHeight;) this.pages[r][t] = {
									x: i.max(l, this.maxScrollX),
									y: i.max(a, this.maxScrollY),
									width: h,
									height: p,
									cx: l - n,
									cy: a - o
								}, a -= p, t++;
								l -= h, r++
							} else
								for (s = this.options.snap, t = s.length, e = -1; t > r; r++)(0 === r || s[r].offsetLeft <= s[r - 1].offsetLeft) && (c = 0, e++), this.pages[c] || (this.pages[c] = []), l = i.max(-s[r].offsetLeft, this.maxScrollX), a = i.max(-s[r].offsetTop, this.maxScrollY), n = l - i.round(s[r].offsetWidth / 2), o = a - i.round(s[r].offsetHeight / 2), this.pages[c][e] = {
									x: l,
									y: a,
									width: s[r].offsetWidth,
									height: s[r].offsetHeight,
									cx: n,
									cy: o
								}, l > this.maxScrollX && c++;
						this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
					}
				}), this.on("flick", function() {
					var t = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.x - this.startX), 1e3), i.min(i.abs(this.y - this.startY), 1e3)), 300);
					this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
				})
			},
			_nearestSnap: function(t, e) {
				if (!this.pages.length) return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				};
				var n = 0,
					o = this.pages.length,
					a = 0;
				if (i.abs(t - this.absStartX) < this.snapThresholdX && i.abs(e - this.absStartY) < this.snapThresholdY) return this.currentPage;
				for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), e > 0 ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY); o > n; n++)
					if (t >= this.pages[n][0].cx) {
						t = this.pages[n][0].x;
						break
					}
				for (o = this.pages[n].length; o > a; a++)
					if (e >= this.pages[0][a].cy) {
						e = this.pages[0][a].y;
						break
					}
				return n == this.currentPage.pageX && (n += this.directionX, 0 > n ? n = 0 : n >= this.pages.length && (n = this.pages.length - 1), t = this.pages[n][0].x), a == this.currentPage.pageY && (a += this.directionY, 0 > a ? a = 0 : a >= this.pages[0].length && (a = this.pages[0].length - 1), e = this.pages[0][a].y), {
					x: t,
					y: e,
					pageX: n,
					pageY: a
				}
			},
			goToPage: function(t, e, n, o) {
				o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : 0 > t && (t = 0), e >= this.pages[t].length ? e = this.pages[t].length - 1 : 0 > e && (e = 0);
				var a = this.pages[t][e].x,
					s = this.pages[t][e].y;
				n = void 0 === n ? this.options.snapSpeed || i.max(i.max(i.min(i.abs(a - this.x), 1e3), i.min(i.abs(s - this.y), 1e3)), 300) : n, this.currentPage = {
					x: a,
					y: s,
					pageX: t,
					pageY: e
				}, this.scrollTo(a, s, n, o), this._execEvent("scrollEnd", "clickEnd")
			},
			next: function(t, e) {
				var i = this.currentPage.pageX,
					n = this.currentPage.pageY;
				i++, i >= this.pages.length && this.hasVerticalScroll && (i = 0, n++), this.goToPage(i, n, t, e)
			},
			prev: function(t, e) {
				var i = this.currentPage.pageX,
					n = this.currentPage.pageY;
				i--, 0 > i && this.hasVerticalScroll && (i = 0, n--), this.goToPage(i, n, t, e)
			},
			_initKeys: function() {
				var t, e = {
					pageUp: 33,
					pageDown: 34,
					end: 35,
					home: 36,
					left: 37,
					up: 38,
					right: 39,
					down: 40
				};
				if ("object" == typeof this.options.keyBindings)
					for (t in this.options.keyBindings) "string" == typeof this.options.keyBindings[t] && (this.options.keyBindings[t] = this.options.keyBindings[t].toUpperCase().charCodeAt(0));
				else this.options.keyBindings = {};
				for (t in e) this.options.keyBindings[t] = this.options.keyBindings[t] || e[t];
				c.addEvent(a, "keydown", this), this.on("destroy", function() {
					c.removeEvent(a, "keydown", this)
				})
			},
			_key: function(t) {
				if (this.enabled) {
					var e, n = this.options.snap,
						o = n ? this.currentPage.pageX : this.x,
						a = n ? this.currentPage.pageY : this.y,
						s = c.getTime(),
						r = this.keyTime || 0,
						l = .25;
					switch (this.options.useTransition && this.isInTransition && (e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this.isInTransition = !1), this.keyAcceleration = 200 > s - r ? i.min(this.keyAcceleration + l, 50) : 0, t.keyCode) {
						case this.options.keyBindings.pageUp:
							this.hasHorizontalScroll && !this.hasVerticalScroll ? o += n ? 1 : this.wrapperWidth : a += n ? 1 : this.wrapperHeight;
							break;
						case this.options.keyBindings.pageDown:
							this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= n ? 1 : this.wrapperWidth : a -= n ? 1 : this.wrapperHeight;
							break;
						case this.options.keyBindings.end:
							o = n ? this.pages.length - 1 : this.maxScrollX, a = n ? this.pages[0].length - 1 : this.maxScrollY;
							break;
						case this.options.keyBindings.home:
							o = 0, a = 0;
							break;
						case this.options.keyBindings.left:
							o += n ? -1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.up:
							a += n ? 1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.right:
							o -= n ? -1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.down:
							a -= n ? 1 : 5 + this.keyAcceleration >> 0;
							break;
						default:
							return
					}
					if (n) return void this.goToPage(o, a);
					o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), a > 0 ? (a = 0, this.keyAcceleration = 0) : a < this.maxScrollY && (a = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, a, 0), this.keyTime = s
				}
			},
			_animate: function(t, e, i, n) {
				function o() {
					var d, u, m, f = c.getTime();
					return f >= p ? (a.isAnimating = !1, a._translate(t, e), void(a.resetPosition(a.options.bounceTime) || a._execEvent("scrollEnd"))) : (f = (f - h) / i, m = n(f), d = (t - s) * m + s, u = (e - l) * m + l, a._translate(d, u), void(a.isAnimating && r(o)))
				}
				var a = this,
					s = this.x,
					l = this.y,
					h = c.getTime(),
					p = h + i;
				this.isAnimating = !0, o()
			},
			handleEvent: function(t) {
				switch (t.type) {
					case "click":
						break;
					case "touchstart":
					case "MSPointerDown":
					case "mousedown":
						this._start(t);
						break;
					case "touchmove":
					case "MSPointerMove":
					case "mousemove":
						this._move(t);
						break;
					case "touchend":
					case "MSPointerUp":
					case "mouseup":
					case "touchcancel":
					case "MSPointerCancel":
					case "mousecancel":
						this._end(t);
						break;
					case "orientationchange":
					case "resize":
						this._resize();
						break;
					case "transitionend":
					case "webkitTransitionEnd":
					case "oTransitionEnd":
					case "MSTransitionEnd":
						this._transitionEnd(t);
						break;
					case "wheel":
					case "DOMMouseScroll":
					case "mousewheel":
						this._wheel(t);
						break;
					case "keydown":
						this._key(t)
				}
			}
		}, s.prototype = {
			handleEvent: function(t) {
				switch (t.type) {
					case "touchstart":
					case "MSPointerDown":
					case "mousedown":
						this._start(t);
						break;
					case "touchmove":
					case "MSPointerMove":
					case "mousemove":
						this._move(t);
						break;
					case "touchend":
					case "MSPointerUp":
					case "mouseup":
					case "touchcancel":
					case "MSPointerCancel":
					case "mousecancel":
						this._end(t)
				}
			},
			destroy: function() {
				this.options.interactive && (c.removeEvent(this.indicator, "touchstart", this), c.removeEvent(this.indicator, "MSPointerDown", this), c.removeEvent(this.indicator, "mousedown", this), c.removeEvent(a, "touchmove", this), c.removeEvent(a, "MSPointerMove", this), c.removeEvent(a, "mousemove", this), c.removeEvent(a, "touchend", this), c.removeEvent(a, "MSPointerUp", this), c.removeEvent(a, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
			},
			_start: function(t) {
				var e = t.touches ? t.touches[0] : t;
				t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = c.getTime(), this.options.disableTouch || c.addEvent(a, "touchmove", this), this.options.disablePointer || c.addEvent(a, "MSPointerMove", this), this.options.disableMouse || c.addEvent(a, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
			},
			_move: function(t) {
				var e, i, n, o, a = t.touches ? t.touches[0] : t;
				c.getTime(), this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, e = a.pageX - this.lastPointX, this.lastPointX = a.pageX, i = a.pageY - this.lastPointY, this.lastPointY = a.pageY, n = this.x + e, o = this.y + i, this._pos(n, o), t.preventDefault(), t.stopPropagation()
			},
			_end: function(t) {
				if (this.initiated) {
					if (this.initiated = !1, t.preventDefault(), t.stopPropagation(), c.removeEvent(a, "touchmove", this), c.removeEvent(a, "MSPointerMove", this), c.removeEvent(a, "mousemove", this), this.scroller.options.snap) {
						var e = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
							n = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.scroller.x - e.x), 1e3), i.min(i.abs(this.scroller.y - e.y), 1e3)), 300);
						(this.scroller.x != e.x || this.scroller.y != e.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = e, this.scroller.scrollTo(e.x, e.y, n, this.scroller.options.bounceEasing))
					}
					this.moved && this.scroller._execEvent("scrollEnd")
				}
			},
			transitionTime: function(t) {
				t = t || 0, this.indicatorStyle[c.style.transitionDuration] = t + "ms", !t && c.isBadAndroid && (this.indicatorStyle[c.style.transitionDuration] = "0.001s")
			},
			transitionTimingFunction: function(t) {
				this.indicatorStyle[c.style.transitionTimingFunction] = t
			},
			refresh: function() {
				this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (c.addClass(this.wrapper, "iScrollBothScrollbars"), c.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (c.removeClass(this.wrapper, "iScrollBothScrollbars"), c.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")), this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = i.max(i.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = i.max(i.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
			},
			updatePosition: function() {
				var t = this.options.listenX && i.round(this.sizeRatioX * this.scroller.x) || 0,
					e = this.options.listenY && i.round(this.sizeRatioY * this.scroller.y) || 0;
				this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = i.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = i.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), e < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = i.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px"), e = this.minBoundaryY) : e > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = i.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : e = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = e, this.scroller.options.useTransform ? this.indicatorStyle[c.style.transform] = "translate(" + t + "px," + e + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = e + "px")
			},
			_pos: function(t, e) {
				0 > t ? t = 0 : t > this.maxPosX && (t = this.maxPosX), 0 > e ? e = 0 : e > this.maxPosY && (e = this.maxPosY), t = this.options.listenX ? i.round(t / this.sizeRatioX) : this.scroller.x, e = this.options.listenY ? Mathc.round(e / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, e)
			},
			fade: function(t, e) {
				if (!e || this.visible) {
					clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
					var i = t ? 250 : 500,
						n = t ? 0 : 300;
					t = t ? "1" : "0", this.wrapperStyle[c.style.transitionDuration] = i + "ms", this.fadeTimeout = setTimeout(function(t) {
						this.wrapperStyle.opacity = t, this.visible = +t
					}.bind(this, t), n)
				}
			}
		}, n.utils = c, "undefined" != typeof module && module.exports ? module.exports = d : t.IScroll = n
	}(window, document, Math),
	function(t) {
		function e(t, e, i, n) {
			return Math.abs(t - e) >= Math.abs(i - n) ? t - e > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down"
		}

		function i() {
			h = null, d.last && (d.el.trigger("longTap"), d = {})
		}

		function n() {
			h && clearTimeout(h), h = null
		}

		function o() {
			r && clearTimeout(r), c && clearTimeout(c), l && clearTimeout(l), h && clearTimeout(h), r = c = l = h = null, d = {}
		}

		function a(t) {
			return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
		}

		function s(t, e) {
			return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
		}
		var r, c, l, h, p, d = {},
			u = 750,
			m = t(document);
		m.ready(function() {
			var f, g, v, y, w = 0,
				b = 0;
			"MSGesture" in window && (window.gesture = new window.MSGesture, p.target = document.body), m.on("MSGestureEnd", function(t) {
				var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
				e && (d.el.trigger("swipe"), d.el.trigger("swipe" + e))
			}).on("touchstart MSPointerDown pointerdown", function(e) {
				(y = s(e, "down")) && !a(e) || (v = y ? e : e.touches[0], e.touches && 1 === e.touches.length && d.x2 && (d.x2 = void 0, d.y2 = void 0), f = Date.now(), g = f - (d.last || f), d.el = t("tagName" in v.target ? v.target : v.target.parentNode), r && clearTimeout(r), d.x1 = v.pageX, d.y1 = v.pageY, g > 0 && g <= 250 && (d.isDoubleTap = !0), d.last = f, h = setTimeout(i, u), p && y && p.addPointer(e.pointerId))
			}).on("touchmove MSPointerMove pointermove", function(t) {
				(y = s(t, "move")) && !a(t) || (v = y ? t : t.touches[0], n(), d.x2 = v.pageX, d.y2 = v.pageY, w += Math.abs(d.x1 - d.x2), b += Math.abs(d.y1 - d.y2))
			}).on("touchend MSPointerUp pointerup", function(i) {
				(y = s(i, "up")) && !a(i) || (n(), d.x2 && Math.abs(d.x1 - d.x2) > 30 || d.y2 && Math.abs(d.y1 - d.y2) > 30 ? l = setTimeout(function() {
					d.el.trigger("swipe"), d.el.trigger("swipe" + e(d.x1, d.x2, d.y1, d.y2)), d = {}
				}, 0) : "last" in d && (w < 30 && b < 30 ? c = setTimeout(function() {
					var e = t.Event("tap");
					e.cancelTouch = o, d.el.trigger(e), d.isDoubleTap ? (d.el && d.el.trigger("doubleTap"), d = {}) : r = setTimeout(function() {
						r = null, d.el && d.el.trigger("singleTap"), d = {}
					}, 250)
				}, 0) : d = {}), w = b = 0)
			}).on("touchcancel MSPointerCancel pointercancel", o), t(window).on("scroll", o)
		}), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
			t.fn[e] = function(t) {
				return this.on(e, t)
			}
		})
	}(window.Zepto),
	function(t, e) {
		e.photosetTools = e.photosetTools || {};
		var i = "http://img2.cache.netease.com/f2e",
			n = e.tools.publicMethod.localParam().search,
			o = n.offset ? +n.offset + 1 : 0;
		t.extend(e.photosetTools, {
			offset: o,
			env: {
				isDev: !!location.href.match("http://img2.cache.netease.com/f2e/"),
				isOnline: !!location.href.match("http://3g.163.com/touch/photoview.html"),
				isOnlineQA: !!location.href.match("http://3g.163.com/ntes/special/003417TF/photoset_qa_2016.html"),
				isOnlineTest: !!location.href.match("http://3g.163.com/ntes/special/003417TF/trunk_photoset_2016.html")
			},
			logourlConfig: {
				isOnline: "http://3g.163.com/touch/photo",
				isDev: i + "/wap/touch_index_2016/trunk/index.shtml?hash=true#/channel=photo",
				isOnlineQA: "http://3g.163.com/ntes/special/003417TF/index_qa_2016.html?hash=true#/channel=photo",
				isOnlineTest: "http://3g.163.com/ntes/special/003417TF/trunk_index_2016.html?hash=true#/channel=photo"
			},
			innerWidth: screen.width > 0 && (window.innerWidth >= screen.width || 0 == window.innerWidth) ? screen.width : window.innerWidth,
			innerHeight: screen.height > 0 && (window.innerHeight >= screen.height || 0 == window.innerHeight) ? screen.height : window.innerHeight,
			indexUrl: function() {
				var t = {
						isDev: !!location.href.match("http://img2.cache.netease.com/f2e/"),
						isOnline: !!location.href.match("http://3g.163.com/touch/"),
						isOnlineQA: !!location.href.match("http://3g.163.com/ntes/special/003417TF/photoset_qa_2016.html"),
						isOnlineTest: !!location.href.match("http://3g.163.com/ntes/special/003417TF/trunk_photoset_2016.html")
					},
					e = {
						isOnline: "http://3g.163.com/touch/photo",
						isDev: i + "/wap/touch_index_2016/trunk/index.shtml?hash=true#/channel=photo",
						isOnlineQA: "http://3g.163.com/ntes/special/003417TF/index_qa_2016.html?hash=true#/channel=photo",
						isOnlineTest: "http://3g.163.com/ntes/special/003417TF/trunk_index_2016.html?hash=true#/channel=photo"
					};
				for (var n in t)
					if (t[n]) {
						t = n;
						break
					}
				return e[t]
			}(),
			articleListIsBottom: function(e, i, n) {
				t(e)[0].onscroll = function() {
					var o = t(e).scrollTop(),
						a = t(e).height(),
						s = t(e + " .content-list").height();
					s - a <= o + (i || 80) && n && n()
				}
			},
			reValueTitle: function(e) {
				e && t("title").html(e + "_\u624b\u673a\u7f51\u6613\u7f51")
			},
			reValueKeyWords: function(e) {
				var i = e.replace(/\uff0c/g, ",");
				t("meta[name='keywords']").attr("content", i)
			},
			reValueDesc: function(e) {
				var i = e;
				i = i.replace(/\s/g, "");
				var n = i.indexOf("\u3002", 80);
				n > -1 ? (i = i.slice(0, n), t("meta[name='description']").attr("content", i + ".")) : t("meta[name='description']").attr("content", i)
			},
			parseUrlParams: function(e) {
				e || (e = location.href);
				var i = t.extend({}, n),
					o = e.match(/\/touch\/photoview\/(\d+)\/(\d+)\.html/);
				return o && (i.channelid = o[1], i.setid = o[2]), i
			},
			generatePhotosetURL: function(t, e) {
				function i(t) {
					var e = [];
					for (var i in t) t[i] && e.push(i + "=" + t[i]);
					return e.join("&")
				}
				var n = location.href.match(/\/touch\/photoview\/(\d+)\/(\d+)\.html/),
					o = this.parseUrlParams();
				return o.setid = t, o.channelid = e, n ? (delete o.setid, delete o.channelid, "http://3g.163.com/touch/photoview/" + e + "/" + t + ".html?" + i(o)) : t && e ? "http://3g.163.com/touch/photoview.html?channelid=" + e + "&setid=" + t + "&clickfrom=recommend" : "http://3g.163.com/touch/photoview.html?" + i(o)
			}
		})
	}(Zepto, window.NEWAP = window.NEWAP || {}),
	function(t, e, i) {
		i.Static = i.Static || {};
		var n = i.Static,
			o = i.tools,
			a = i.photosetTools,
			s = a.parseUrlParams();
		n.Topbar = function(t) {
			this.container = t, this.template = e.templates.topbar_tpl({})
		}, n.Topbar.prototype = {
			logoUrl: function() {
				var t = a.indexUrl;
				return t = o.publicMethod.inheritSearch(["qd"], t)
			},
			addLogoUrl: function() {
				this.indexurl = this.logoUrl(), t(".a_logo", this.container).attr("href", this.indexurl), t(".returnlink", this.container).attr("href", this.indexurl)
			},
			addComment: function(e) {
				var i = e.comCount,
					n = e.comLink;
				n = o.publicMethod.inheritSearch(["qd"], n) + "&from=photoset_topbar", t(".js-replycount", this.container).html(i), t(".js-replylink", this.container).attr("href", n)
			},
			historyBack: function() {
				var t = document.referrer;
				return !!t && (location.href = t, !0)
			},
			run: function() {
				var e = this;
				t(this.container).html(this.template), this.addLogoUrl(), ("string" == typeof s.from && s.from.indexOf("idol") > -1 || "idol" == s.channel) && (t(".a_logo", this.container).bind("click", function(t) {
					document.referrer && t.preventDefault(), e.historyBack()
				}), t(".returnlink", this.container).bind("click", function(t) {
					document.referrer && t.preventDefault(), e.historyBack()
				})), t(window).on("topbarAddComment", function(t, i) {
					e.addComment(i)
				}), t(this.container).bind("click", ".js-share", function() {
					t(window).trigger("Share:before"), "function" == typeof neteaseTracker && neteaseTracker(null, "http://click.portal.163.com/wap/wap3garticle/#cooper_jump_clickshare", document.title, "clickp")
				})
			}
		}
	}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}),
	function(t, e) {
		e.Static = e.Static || {};
		var i = e.Static || {},
			n = (e.tools, e.photosetTools),
			o = n.parseUrlParams("http://3g.163.com/touch/photoview/0001/2211465.html");
		e.showRecommend = !0, i.elementsControl = {
			elementsControlmap: {
				body: {
					children: {
						listcomment: {
							status: "show",
							hiddenclass: "hidden_listcomment",
							handledom: "body"
						}
					}
				},
				header: {
					status: "show",
					hiddenclass: "hidden_topbar",
					handledom: "header"
				},
				".currentPhoto": {
					children: {
						tbAd: {
							status: "show",
							hiddenclass: "hidden_tbAd",
							handledom: ".currentPhoto"
						},
						recommend: {
							status: "show",
							hiddenclass: "hidden_recommend",
							handledom: ".currentPhoto"
						}
					}
				},
				".botbuttons": {
					children: {
						moreDoc: {
							status: "show",
							hiddenclass: "hidden_moreDoc",
							handledom: ".botbuttons"
						}
					}
				}
			},
			eleControlSearchObj: {
				gdwf_top: "gdwf_top|allReplay||",
				xmoy: "xiaomi|moreDoc||0",
				jinlisp_page: "jinlisp_page|tbAd||",
				wnys_page: "wnys_page|topbar_moreDoc_recommendPage||"
			},
			run: function() {
				var t = this.elementsControlmap;
				this.handleDom(t)
			},
			handleDom: function(t) {
				var e = this;
				for (var i in t) {
					var n = t[i].handledom;
					if (t[i].status && "show" != t[i].status) {
						var o = t[i].status,
							a = t[i][o + "class"];
						e.handleDomStyle(n, o, a)
					}
					t[i].children && e.handleDom(t[i].children)
				}
			},
			handleDomStyle: function(e, i, n) {
				n && t(e).addClass(n)
			}
		};
		var a = o.qd || "",
			s = a.split("|");
		if (1 == s.length && (s = i.elementsControl.eleControlSearchObj[a] && i.elementsControl.eleControlSearchObj[a].split("|") || [a]), s.length >= 4) {
			a = s[0];
			var r = o.forbid || s[1],
				c = (o.add || s[2], o.allad || s[3])
		}
		if (r)
			for (var l = r.split("_"), h = i.elementsControl.elementsControlmap, p = 0; p < l.length; p++) switch (l[p]) {
				case "allReplay":
					h.body.children.listcomment.status = "hidden";
					break;
				case "moreDoc":
					h[".botbuttons"].children.moreDoc.status = "hidden";
					break;
				case "tbAd":
					h[".currentPhoto"].children.tbAd.status = "hidden";
					break;
				case "topbar":
					h.header.status = "hidden";
					break;
				case "recommendPage":
					h[".currentPhoto"].children.recommend.status = "hidden", e.showRecommend = !1
			}
		0 === c && (e.showAD = !1)
	}(Zepto, window.NEWAP = window.NEWAP || {}),
	function(t, e, i) {
		i.Static = i.Static || {};
		var n = i.Static;
		i.tools, i.photosetTools;
		n.selfAdaption = function() {
			var e = function() {
					"onorientationchange" in window ? window.onorientationchange = function(t) {
						90 != window.orientation && window.orientation != -90 || (document.body.classList.add("resize"), a()), 0 == window.orientation && (document.body.classList.remove("resize"), a())
					} : window.onresize = function(t) {
						n(), a()
					}
				},
				n = function() {
					window.innerWidth < window.innerHeight ? document.body.classList.remove("resize") : document.body.classList.add("resize")
				},
				o = function() {
					document.addEventListener("touchmove", function(t) {
						var t = t || window.event,
							e = t.target || t.srcElement;
						if (e.className.indexOf("js-introwords") == -1)
							for (; e && "BODY" != e.tagName;)(e.className && e.className.indexOf("arrow_down") != -1 || e.className.indexOf("currentPhoto") != -1 || e.className.indexOf("photoshare") != -1 || e.className.indexOf("js-albumTitle") != -1 || e.className.indexOf("js-touchmove") != -1 || e.className.indexOf("photoComment") != -1) && t.preventDefault(), e = e.parentNode
					}, !0)
				},
				a = function() {
					var e = (window.innerWidth > 1080 ? 1080 : window.innerWidth, window.innerHeight);
					t(".img-wrap");
					if (document.body.className.indexOf("swipeup") != -1) {
						var n = (parseInt(document.documentElement.style.fontSize), 0);
						t(".photo").css({
							transform: "translate(0px, -" + (e - n) + "px) translateZ(0px)",
							"-webkit-transform": "translate(0px, -" + (e - n) + "px) translateZ(0px)"
						})
					}
					i.InstanceList.content && i.InstanceList.content.onresizeChangeStyle && i.InstanceList.content.onresizeChangeStyle()
				};
			return {
				_init: a,
				_resizeHandle: e,
				_touchmoveHandle: o,
				_resizeClassHandle: n
			}
		}
	}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}),
	function() {
		var t = Handlebars.template,
			e = Handlebars.templates = Handlebars.templates || {};
		e.botbuttons_tpl = t({
			compiler: [7, ">= 4.0.0"],
			main: function(t, e, i, n, o) {
				return '<div id="guide" class="arrow_down">\r\n    <span class="iconfont">&#xe618;</span> \r\n</div>\r\n<a href="http://3g.163.com/touch" class="checksource" target="_blank">\u67e5\u770b\u539f\u56fe</a>\r\n<div class="gotop js-gotop"></div>\r\n'
			},
			useData: !0
		}), e.desc_tpl = t({
			compiler: [7, ">= 4.0.0"],
			main: function(t, e, i, n, o) {
				return '<div class="albumdesc clearfix">\r\n    <div class="photoNum">\r\n        <span class="currentNum js-currentNum"></span>\r\n        <span class="sumNum js-sumNum" ></span>\r\n    </div>\r\n    <h2 class="albumTitle js-albumTitle"></h2>\r\n    <p class="des briefIntro js-briefIntro">\r\n        <span class="js-introwords"></span>\r\n    </p>\r\n</div>'
			},
			useData: !0
		}), e.loading_tpl = t({
			compiler: [7, ">= 4.0.0"],
			main: function(t, e, i, n, o) {
				return '<div class="list-more">\r\n\t<div class="loading-wrap">\r\n\t\t<div class="loading">\r\n\t\t\t<div class="loading-icon iconfont">&#xe600;</div>\r\n\t\t</div>\r\n\t\t<div class="loadtext">\u6b63\u5728\u52a0\u8f7d</div>\r\n\t</div>\r\n</div>'
			},
			useData: !0
		}), e.topbar_tpl = t({
			compiler: [7, ">= 4.0.0"],
			main: function(t, e, i, n, o) {
				return '<div class="topbar">\r\n    <a class="back_home iconfont returnlink" id="return" href="http://3g.163.com/touch/photo/?from=largePhoto">&#xe60c;</a>\r\n    <a class="a_logo" href="http://3g.163.com/touch/photo" title="\u7f51\u6613\u65b0\u95fb"></a>\r\n    <div class="photoshare js-share"></div>\r\n    <a class="suggest" href="http://3g.163.com/touch/suggest.html?from=photoview"></a>\r\n    <a id="comment" class="reply_count js-replylink " href=""><span class="iconfont">&#xe606;</span><span class="js-replycount">0</span>\u8ddf\u8d34 </a>\r\n</div>'
			},
			useData: !0
		}), e["content/comlink_tpl"] = t({
			compiler: [7, ">= 4.0.0"],
			main: function(t, e, i, n, o) {
				var a, s = null != e ? e : {},
					r = i.helperMissing,
					c = "function",
					l = t.escapeExpression;
				return "http://3g.163.com/touch/comment.html?docid=" + l((a = null != (a = i.docid || (null != e ? e.docid : e)) ? a : r, typeof a === c ? a.call(s, {
					name: "docid",
					hash: {},
					data: o
				}) : a)) + "&from=largePhoto&title=" + l((a = null != (a = i.title || (null != e ? e.title : e)) ? a : r, typeof a === c ? a.call(s, {
					name: "title",
					hash: {},
					data: o
				}) : a))
			},
			useData: !0
		}), e["content/largeimg_tpl"] = t({
			compiler: [7, ">= 4.0.0"],
			main: function(t, e, i, n, o) {
				var a, s;
				return '<li>\r\n\t<div class="img-wrap"><img data-src="' + (null != (s = null != (s = i.src || (null != e ? e.src : e)) ? s : i.helperMissing, a = "function" == typeof s ? s.call(null != e ? e : {}, {
					name: "src",
					hash: {},
					data: o
				}) : s) ? a : "") + '">\r\n\t</div>\r\n</li>'
			},
			useData: !0
		}), e["content/recomcon_tpl"] = t({
			1: function(t, e, i, n, o) {
				var a;
				return null != (a = i.each.call(null != e ? e : {}, null != e ? e.content : e, {
					name: "each",
					hash: {},
					fn: t.program(2, o, 0),
					inverse: t.noop,
					data: o
				})) ? a : ""
			},
			2: function(t, e, i, n, o) {
				var a, s = null != e ? e : {},
					r = i.helperMissing,
					c = "function",
					l = t.escapeExpression;
				return '        <li>\r\n            <a class="img-wrapper" href="' + l((a = null != (a = i.src || (null != e ? e.src : e)) ? a : r, typeof a === c ? a.call(s, {
					name: "src",
					hash: {},
					data: o
				}) : a)) + '">\r\n            <img data-src=' + l((a = null != (a = i.cover || (null != e ? e.cover : e)) ? a : r, typeof a === c ? a.call(s, {
					name: "cover",
					hash: {},
					data: o
				}) : a)) + ' src="' + l((a = null != (a = i.cover || (null != e ? e.cover : e)) ? a : r, typeof a === c ? a.call(s, {
					name: "cover",
					hash: {},
					data: o
				}) : a)) + '" onerror="this.src=\'http://img2.cache.netease.com/3g/img11/3gtouch13/default.jpg\'">\r\n            </a>\r\n            <span>\r\n            <a href="' + l((a = null != (a = i.src || (null != e ? e.src : e)) ? a : r, typeof a === c ? a.call(s, {
					name: "src",
					hash: {},
					data: o
				}) : a)) + '">' + l((a = null != (a = i.title || (null != e ? e.title : e)) ? a : r, typeof a === c ? a.call(s, {
					name: "title",
					hash: {},
					data: o
				}) : a)) + "\r\n            </a>\r\n            </span>\r\n        </li>\r\n"
			},
			4: function(t, e, i, n, o) {
				return '    <div class="recommend_no_data"></div>\r\n'
			},
			6: function(t, e, i, n, o) {
				var a;
				return '    <li class="tbAd">\r\n        <iframe style="width:100%;height:100%;" src="' + t.escapeExpression((a = null != (a = i.tbsrc || (null != e ? e.tbsrc : e)) ? a : i.helperMissing, "function" == typeof a ? a.call(null != e ? e : {}, {
					name: "tbsrc",
					hash: {},
					data: o
				}) : a)) + '"></iframe>\r\n    </li>\r\n'
			},
			compiler: [7, ">= 4.0.0"],
			main: function(t, e, i, n, o) {
				var a, s = null != e ? e : {};
				return "<ul class='last clearfix'>\r\n" + (null != (a = i["if"].call(s, null != e ? e.hasData : e, {
					name: "if",
					hash: {},
					fn: t.program(1, o, 0),
					inverse: t.program(4, o, 0),
					data: o
				})) ? a : "") + (null != (a = i["if"].call(s, null != e ? e.tbsrc : e, {
					name: "if",
					hash: {},
					fn: t.program(6, o, 0),
					inverse: t.noop,
					data: o
				})) ? a : "") + "</ul>"
			},
			useData: !0
		}), e["content/recom_tpl"] = t({
			compiler: [7, ">= 4.0.0"],
			main: function(t, e, i, n, o) {
				return '<li>\r\n    <div class="last-page" >\r\n        <h2 class="recommed_logo">\u56fe\u96c6\u63a8\u8350</h2>\r\n        <div class="recommed_album js-recommed" data-loaded="0">\r\n        </div>\r\n        <div class="botnav">\r\n            <span class="prevlogo">\u4e0b\u4e00\u56fe\u96c6</span>\r\n            <span class="title"></span>\r\n            <span class="secondlogo iconfont">&#xe61d;</span>\r\n        </div>\r\n    </div>\r\n    <div class="next_album">\r\n        <img class="next_album_img" src="http://imgsize.ph.126.net/?imgurl=http://img4.cache.netease.com/photo/0001/2016-05-05/t_BM9RRJTE00AP0001.jpg_165x125x1x85.jpg&enlarge=true">\r\n        <div class="next_album_mark">\r\n            <div class="next_album_mark_icon"></div>\r\n        </div>\r\n    </div>\r\n</li>'
			},
			useData: !0
		})
	}(),
	function(t, e, i) {
		i.Static = i.Static || {};
		var n = i.Static,
			o = i.tools,
			a = i.photosetTools,
			s = a.parseUrlParams(),
			r = s.photosetid;
		n.RecomAblum = function(t) {
			var e = s.setid,
				i = s.channelid;
			this.setid = e, this.channelid = i, this.container = t, this.logoUrlinheritSearch = ["qd"], this.reconCount = 4
		}, n.RecomAblum.prototype = {
			transRecommendUrl: function() {
				if ("photo" == s.channel && s.child && i._channelMap["0030"].child[s.child]) {
					var t = i._channelMap["0030"].child[s.child],
						e = t.setList.channelid,
						n = t.setList.topicid,
						o = +s.offset + 1 || 1;
					this.recommendUrl = "http://pic.news.163.com/photocenter/api/list/" + e + "/" + n + "/" + o + "/" + this.reconCount + "/albumRecommend.json", this.recomoffset = o
				} else if ("idol" == s.channel && r) {
					var a = "http://star.3g.163.com";
					this.recommendUrl = a + "/star/photoset/related/" + r + "/4.html?callback=albumRecommend"
				} else this.recommendUrl = "http://c.3g.163.com/photo/api/related/" + this.channelid + "/" + this.setid + "/albumRecommend.json?callback=albumRecommend";
				this.reliableRecommendUrl = "http://pic.news.163.com/photocenter/api/list/" + i._channelMap["0030"].child.news.setList.channelid + "/" + i._channelMap["0030"].child.news.setList.topicid + "/0/" + this.reconCount + "/albumRecommendreliable.json?"
			},
			albumRecommend: function(n, a) {
				var c = t(this.container)[0].dataset.loaded,
					l = this;
				this.channelid = "reliable" == a ? i._channelMap["0030"].child.news.setList.channelid : this.channelid;
				var h = [];
				if (n && 0 != n.length)
					if (0 == c && n && n.length > 0) {
						for (var p, d = 0; d < this.reconCount; d++)
							if (n[d] && Object.getOwnPropertyNames(n[d]).length > 0) {
								var u = "http://imgsize.ph.126.net/?imgurl=" + n[d].cover + "_165x125x1x85.jpg&enlarge=true",
									m = "idol" == s.channel && r ? n[d].seturl : this.recomItemHref(n[d].setid, this.channelid),
									f = {
										cover: u,
										title: n[d].setname,
										src: m
									};
								0 == d && (this.nextUrl = this.recomItemHref(n[d].setid, this.channelid) + "&from=botnav", this.nextTitle = n[d].setname), h.push(f)
							}
						var g = "http://img1.126.net/channel4/html/taobao_tuji160505.html";
						i.showAD === !1 && (g = ""), p = e.templates["content/recomcon_tpl"]({
							content: h,
							tbsrc: g,
							hasData: !0
						}), t(this.container).html(p), t(this.container)[0].dataset && t(this.container)[0].dataset.loaded++, this.botnav()
					} else o.publicMethod.jsonp({
						url: l.reliableRecommendUrl,
						callbackName: "albumRecommendreliable"
					}, function(t) {
						l.albumRecommend(t, "reliable"), l.runcallback ? l.runcallback(t) : void 0
					});
				else {
					var g = "http://img1.126.net/channel4/html/taobao_tuji160505.html";
					i.showAD === !1 && (g = ""), p = e.templates["content/recomcon_tpl"]({
						content: h,
						tbsrc: g,
						hasData: !1
					}), t(this.container).html(p), t(this.container)[0].dataset && t(this.container)[0].dataset.loaded++, t(".recommend_no_data").bind("click", function() {
						document.referrer ? history.back() : location.href = "http://3g.163.com/touch/?from=photoset_no_recom"
					})
				}
			},
			recomItemHref: function(t, e) {
				var i, n = s;
				return this.recomoffset && (n.offset = this.recomoffset++), n.setid = t, n.channelid = e, i = a.generatePhotosetURL(t, e)
			},
			run: function(t) {
				var e = this;
				this.runcallback = t, this.transRecommendUrl(), o.publicMethod.jsonp({
					url: e.recommendUrl,
					callbackName: "albumRecommend"
				}, function(t) {
					e.albumRecommend(t), e.runcallback ? e.runcallback(t) : void 0
				})
			},
			botnav: function() {
				var e = this;
				t(".botnav").bind("click", function() {
					location.href = e.nextUrl
				}).css({
					display: "inline-block"
				}), t(".botnav .title").html(this.nextTitle)
			},
			_nextAlbum: function() {
				var e = t(".last li a")[0].href;
				return e
			}
		}
	}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}),
	function(t, e, i) {
		i.Static = i.Static || {};
		var n = i.Static,
			o = i.tools,
			a = i.photosetTools,
			s = a.parseUrlParams(),
			r = window.innerWidth,
			c = (window.innerHeight, screen.width, !0),
			l = parseInt(document.documentElement.style.fontSize);
		n.Content = function(t, e) {
			var i = s.setid,
				n = s.channelid || "0096";
			this.channelid = n, this.channelconfig = e, this.recomRequests = 1;
			var o = s.photosetid;
			if ("idol" == s.channel && o) {
				var a = "http://star.3g.163.com";
				this.photosetUrl = a + "/star/photoset/" + o + ".html?callback=photosetinfo", this.recommendUrl = a + "/star/photoset/related/" + o + "/4.html?callback=albumRecommend"
			} else this.photosetUrl = "http://c.3g.163.com/photo/api/jsonp/set/" + n + "/" + i + ".json?callback=photosetinfo", this.recommendUrl = "http://c.3g.163.com/photo/api/related/" + n + "/" + i + "/albumRecommend.json?callback=albumRecommend";
			this.photoIndex = parseInt(s.photoIndex) || 0, this.preloadImgNum = 2
		}, n.Content.prototype = {
			imgShow: function(t) {
				var e = t.width <= r ? t.height : parseInt(r * t.height / t.width);
				return e <= this.midphotowrapChangeHeight && e >= this.lowphotowrapChangeHeight ? "middle" : e < this.lowphotowrapChangeHeight ? "small" : "big"
			},
			imgLoad: function(e) {
				var i = this.photoCtrls[this.photoIndex + e].querySelector("img"),
					n = this.photoCtrls[this.photoIndex + e].querySelector(".img-wrap"),
					o = new Image,
					a = this;
				o.src = i.dataset ? i.dataset.src : i.getAttribute("data-src"), o.onload = function() {
					var e = a.imgShow(o);
					t(n).addClass(e), t(n).css(a.showRules[e]), t(n).css({
						"-webkit-transition": "0s",
						transition: "0s"
					}), t(i).on("load", function() {
						requestAnimationFrame(function() {
							t(n).css({
								"-webkit-transition": "",
								transition: ""
							})
						})
					}), requestAnimationFrame(function() {
						i.src = i.dataset ? i.dataset.src : i.getAttribute("data-src")
					})
				}
			},
			onresizeChangeStyle: function() {
				this.refreshShowRules();
				var e = this,
					i = t(".img-wrap");
				i.each(function(n, o) {
					var a = o.children[0];
					if (n < i.length - 1 && a.src) {
						var s = e.imgShow(a);
						t(o).removeClass(Object.getOwnPropertyNames(e.showRules).join(" ")), t(o).addClass(s), t(o).css(e.showRules[s])
					}
				})
			},
			refreshShowRules: function() {
				var e = window.innerHeight,
					i = t(".photoComment"),
					n = parseInt(i.height()),
					o = parseInt(i.css("bottom")),
					a = e - n - o,
					s = t("header").height();
				this.lowphotowrapChangeHeight = a - s | 0, this.midphotowrapChangeHeight = a;
				var r = s + this.lowphotowrapChangeHeight / 2 - e / 2,
					c = (a - e) / 2;
				this.showRules = {
					small: {
						"-webkit-transform": "translate3d(0,-50%,0) translate3d(0," + r + "px,0)",
						transform: "translate3d(0,-50%,0) translate3d(0," + r + "px,0)",
						height: ""
					},
					middle: {
						"-webkit-transform": "translate3d(0,-50%,0) translate3d(0," + c + "px,0)",
						transform: "translate3d(0,-50%,0) translate3d(0," + c + "px,0)",
						height: ""
					},
					big: {
						"-webkit-transform": "",
						transform: "",
						height: "100%"
					}
				}
			},
			getPosts: function(e) {
				var i = o.commentMethod.replayHandle(e);
				t(window).trigger("topbarAddComment", i)
			},
			photosetinfo: function(h) {
				var p = this;
				if (h) {
					var d = h.postid;
					h.boardid;
					"xmoy" == s.qd && makexmoyReply(d), o.publicMethod.jsonp({
						url: "http://comment.news.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/" + d + "?ibc=newswap&callback=getPosts",
						callbackName: "getPosts"
					}, function(t) {
						p.getPosts(t)
					});
					var u = "",
						m = 0;
					for (h.photos.length; m < h.photos.length; m++) u += e.templates["content/largeimg_tpl"]({
						src: h.photos[m].imgurl
					});
					var f = i.showRecommend ? e.templates["content/recom_tpl"]({}) : "";
					t(".js-sumNum")[0].innerHTML = "/" + h.imgsum, t(".lar_photoList")[0].innerHTML = u + f, c && (t(".photo")[0].style.display = "block", c = !1), i.InstanceList.selfAdaption._init();
					var g = t(".currentPhoto .lar_photoList")[0],
						v = t(".currentPhoto .lar_photoList li");
					this.photoCtrls = v, g.style.width = 7.5 * v.length + "rem";
					Date.now();
					g.addEventListener("click", function(t) {
						var e = p.photoScroll.currentPage.pageX;
						i.showRecommend && e === p.photoCtrls.length - 1 || o.uaMatch.isMobile && p.photoWrapClickActions(t, r)
					}, !1), this.photoScroll = new IScroll(".currentPhoto", {
						scrollX: !0,
						scrollY: !0,
						momentum: !1,
						snap: "li",
						snapSpeed: 600,
						snapThreshold: .08,
						click: !0
					});
					var y = h.photos[this.photoIndex].note || h.photos[this.photoIndex].imgtitle;
					t(".js-currentNum")[0].innerHTML = this.photoIndex + 1, t(".js-introwords")[0].innerHTML = y, t(".js-albumTitle")[0].innerHTML = h.setname, t(".checksource")[0].href = h.photos[this.photoIndex].imgurl;
					var w = h.desc || y,
						b = h.settag || h.setname;
					a.reValueTitle(h.setname), a.reValueKeyWords(b), a.reValueDesc(w), this.refreshShowRules();
					for (var m = 0; m < this.preloadImgNum; m++) this.imgLoad(m);
					t(".open")[0].dataset.src = this.photoCtrls[this.photoIndex].querySelector("img").getAttribute("data-src");
					var x = t(".next_album_mark"),
						S = t(".next_album_mark_icon"),
						k = t(".next_album_img");
					this.photoScroll.on("scroll", function() {
						var t = p.photoScroll.currentPage.pageX;
						if (t === p.photoCtrls.length - 1) {
							var e = this.hasPassedHalf ? (this.distX + this.wrapperWidth / 4) / -4 : 0,
								i = this.distX / this.wrapperWidth / 4 * 100,
								n = Math.pow(4 * this.distX / this.wrapperWidth, 6);
							n = n > 1 ? 1 : n, k.css({
								transform: "translate3d(" + i + "%,-50%,0)",
								"-webkit-transform": "translate3d(" + i + "%,-50%,0)"
							}), x.css({
								transform: "translate3d(" + e + "px,0,0) scale(" + n + ")",
								"-webkit-transform": "translate3d(" + e + "px,0,0) scale(" + n + ")"
							}), !this.hasPassedHalf && this.distX * -4 > this.wrapperWidth ? (this.hasPassedHalf = !0, S.addClass("next")) : this.hasPassedHalf && this.distX * -4 < this.wrapperWidth && (this.hasPassedHalf = !1, S.removeClass("next"))
						}
						0 === t && (this.jumptoPrev = 4 * this.distX > this.wrapperWidth)
					}), this.photoScroll.on("beforeScrollEnd", function() {
						var t = p.photoScroll.currentPage.pageX;
						t === p.photoCtrls.length - 1 && this.hasPassedHalf && (neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/wap3gphotoset/swipenext", "\u56fe\u96c6\u8be6\u60c5\u9875\u6ed1\u5411\u4e0b\u4e00\u9875\u4f7f\u7528\u6b21\u6570", "wapclick"),
							setTimeout(function() {
								p.nextUrl && (location.href = p.nextUrl)
							}, 0)), 0 === t && this.jumptoPrev && p.prevUrl && (neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/wap3gphotoset/swipeprev", "\u56fe\u96c6\u8be6\u60c5\u9875\u6ed1\u5411\u4e0a\u4e00\u9875\u4f7f\u7528\u6b21\u6570", "wapclick"), setTimeout(function() {
							history.back()
						}, 0))
					}), this.photoScroll.on("scrollEnd", function(e) {
						var o = p.photoScroll.currentPage.pageX;
						if (o === p.photoCtrls.length - 1 && i.showRecommend) {
							if (neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/photoview#recommend", "\u56fe\u96c6\u63a8\u8350\u9875", "wapclick"), !p.hasShowedNextTip) {
								p.hasShowedNextTip = !0, n.versionModel.writeVersionflag("NEWAP_photosetNextGesture", "1");
								var a = t(".next_album_tip");
								setTimeout(function() {
									a.addClass("show"), setTimeout(function() {
										a.removeClass("show")
									}, 2e3)
								}, 1e3)
							}
							document.body.classList.add("endpage"), document.body.classList.add("active");
							var s = t(".js-recommed"),
								r = s[0].dataset ? s[0].dataset.loaded : s[0].getAttribute("data-loaded");
							if ("0" === r) {
								var c = new n.RecomAblum(".js-recommed", p.channelconfig);
								c.run(function(e) {
									var i = t(".last-page .last .img-wrapper").eq(0);
									k[0].src = e[0] && e[0].cover, p.nextUrl = i[0] && i[0].href
								})
							}
							t(".photoComment")[0].classList.add("e-hidden")
						} else {
							document.body.classList.remove("endpage");
							var d = p.photoCtrls[o].querySelector("img"),
								u = p.photoCtrls[o + 1] && p.photoCtrls[o + 1].querySelector("img");
							t(".open")[0].dataset.src = d.getAttribute("data-src"), 0 <= o && o < p.photoCtrls.length - (i.showRecommend ? 2 : 1) && !u.src && p.imgLoad(o + 1), t(".photoComment")[0].classList.remove("e-hidden"), t(".js-currentNum")[0].textContent = o + 1, t(".js-briefIntro")[0].style.height = 1.5 * l + "px", t(".js-introwords")[0].textContent = h.photos[o].note || h.photos[o].imgtitle, t(".checksource")[0].href = h.photos[o].imgurl
						}
						"function" == typeof neteaseTracker && neteaseTracker()
					})
				}
			},
			findPrevUrl: function() {
				var t = document.referrer,
					e = /(photoset|photoview).*html\?.*(setid|channelid).*(setid|channelid).*/;
				t.match(e) ? this.prevUrl = t : this.prevUrl = ""
			},
			photoWrapClickActions: function(t, e) {
				var i = t.clientX;
				i <= e / 10 * 3 ? (this.photoScroll.prev(), this.photoScroll.clickMove = !0, "function" == typeof neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/wap3gPhotoset/clickToPrev", document.title, "wapclick")) : i >= e / 10 * 6 ? (this.photoScroll.next(), this.photoScroll.clickMove = !0, "function" == typeof neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/wap3gPhotoset/clickToNext", document.title, "wapclick")) : (document.body.classList.toggle("active"), "function" == typeof neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/wap3gPhotoset/clickMiddle", document.title, "wapclick"))
			},
			run: function() {
				this.findPrevUrl(), this.hasShowedNextTip = !1;
				var e = n.versionModel.findVersionflag("NEWAP_photosetNextGesture");
				1 == e && (this.hasShowedNextTip = !0);
				var i = this;
				o.publicMethod.jsonp({
					url: this.photosetUrl,
					callbackName: "photosetinfo"
				}, function(t) {
					i.photosetinfo(t)
				}), t(".checksource").bind("click", function(t) {
					t.preventDefault();
					var e = this;
					neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/wap3gphotoset/checksource", "\u56fe\u96c6\u8be6\u60c5\u9875\u67e5\u770b\u539f\u56fe\u70b9\u51fb\u6b21\u6570", "wapclick"), setTimeout(function() {
						window.open(e.href, "_blank")
					}, 500)
				})
			}
		}
	}($, Handlebars, window.NEWAP = window.NEWAP || {}),
	function(t, e) {
		e.Static = e.Static || {};
		var i = e.Static,
			n = e.tools,
			o = e.photosetTools;
		i.InfoFlow = function(t, e, i) {
			this.container = t, this.bottomFlow = i, "undefined" == typeof this.bottomFlow && (this.bottomFlow = !0), e && "joke" == e.channelID || "idol" == e.channelID ? this.channelId = "tuijian" : this.channelId = e && e.channelID, this._runflag = !1
		}, i.InfoFlow.prototype = {
			bottom: function() {
				t(window).trigger("listLoading:start"), n.publicMethod.fetchdata({
					offset: o.offset,
					size: 10,
					channel: this.channelId,
					child: "all"
				}, function(e) {
					o.offset += 10, n.publicMethod.generateHtml(t(".content-list"), e.listdata.data, "after"), t(window).trigger("listLoading:end")
				})
			},
			run: function() {
				var i = this;
				t(window).trigger("listLoading:start"), n.publicMethod.fetchdata({
					offset: o.offset,
					size: 10,
					channel: i.channelId,
					child: "all",
					abort: !0,
					useflag: !1
				}, function(e) {
					o.offset += 10, n.publicMethod.generateHtml(t(".content-list"), e.listdata.data, "after"), t(window).trigger("listLoading:end")
				}), this.bottomFlow && o.articleListIsBottom(".flowlist", 1, function() {
					i.bottom()
				}), t(this.container).bind("click", ".open", function(i) {
					document.body.classList.remove("swipeup"), t("meta[name=theme-color]").attr("content", "#000000"), t(".photo").css({
						transform: "translate(0px, 0px) translateZ(0px)",
						"-webkit-transform": "translate(0px, 0px) translateZ(0px)"
					}), t("header").removeClass("unwrap"), e.InstanceList.content && e.InstanceList.content.onresizeChangeStyle && e.InstanceList.content.onresizeChangeStyle()
				})
			},
			handlebarsHelper: function() {}
		}
	}(Zepto, window.NEWAP = window.NEWAP || {}),
	function(t, e) {
		e.photosetTools = e.photosetTools || {};
		var i = (e.tools, e.photosetTools);
		i.Loading = function(t, e) {
			this.container = t, this.template = Handlebars.templates.loading_tpl({}), this.name = e
		}, i.Loading.prototype.render = function(e) {
			e ? "after" == e ? t(this.container).append(this.template) : "before" == e && t(this.container).prepend(this.template) : t(this.container).html(this.template), this.listenLoadStart(this.name), this.listenLoadEnd(this.name)
		}, i.Loading.prototype.hide = function() {
			t(this.container + " .list-more").hide()
		}, i.Loading.prototype.show = function() {
			t(this.container + " .list-more").show()
		}, i.Loading.prototype.listenLoadStart = function(e) {
			var i = this;
			t(window).on(e + ":start", function() {
				i.show()
			})
		}, i.Loading.prototype.listenLoadEnd = function(e) {
			var i = this;
			t(window).on(e + ":end", function() {
				i.hide()
			})
		}
	}(Zepto, window.NEWAP = window.NEWAP ? window.NEWAP : {}),
	function(t, e, i) {
		i.Static = i.Static || {};
		var n = i.Static;
		i.tools, i.photosetTools;
		n.PhotoDesc = function(t) {
			this.container = t, this.template = e.templates.desc_tpl({})
		}, n.PhotoDesc.prototype = {
			run: function() {
				t(this.container).html(this.template);
				var e = t(".photoComment");
				e[0].addEventListener("touchstart", function(t) {
					t.preventDefault();
					var e = t.touches ? t.touches[0] : t;
					this.y = e.pageY, this.dire = 0, this.variable = Zepto(".js-briefIntro").height(), this.fontsize = parseInt(document.documentElement.style.fontSize), this.bottomdelt = 1.5 * this.fontsize, this.topdelt = Zepto(".js-introwords").height() > this.bottomdelt ? Zepto(".js-introwords").height() : this.bottomdelt, this.distY = 0
				}), e[0].addEventListener("touchmove", function(t) {
					t.preventDefault();
					var e = t.touches ? t.touches[0] : t,
						i = e.pageY - this.y;
					this.distY += i;
					var n = Math.abs(this.distY);
					if (n > 10) {
						if (this.dire = i > 0 ? 1 : -1, this.bottomdelt == this.topdelt) return;
						var o = Zepto(".js-briefIntro").height();
						if (o <= this.bottomdelt && 1 == this.dire) return;
						if (o >= this.topdelt && this.dire == -1) return;
						o = this.variable - i, Zepto(".js-briefIntro").css({
							height: o + "px"
						})
					}
				}), e[0].addEventListener("touchend", function(t) {
					var e = Zepto(".js-briefIntro").height(),
						i = Math.abs(e - this.bottomdelt),
						n = Math.abs(e - this.topdelt);
					1 == this.dire && i > 10 && Zepto(".js-briefIntro").css({
						height: this.bottomdelt + "px",
						"-webkit-transition-duration": "600ms"
					}), this.dire == -1 && n > 10 && Zepto(".js-briefIntro").css({
						height: this.topdelt + "px",
						"-webkit-transition-duration": "600ms"
					})
				}), e[0].addEventListener("touchcancel", function(t) {
					var e = Zepto(".js-briefIntro").height(),
						i = Math.abs(e - this.bottomdelt),
						n = Math.abs(e - this.topdelt);
					1 == this.dire && i > 5 && Zepto(".js-briefIntro").css({
						height: this.bottomdelt + "px",
						"-webkit-transition-duration": "600ms"
					}), this.dire == -1 && n > 5 && Zepto(".js-briefIntro").css({
						height: this.topdelt + "px",
						"-webkit-transition-duration": "600ms"
					})
				});
				var i = t(".js-briefIntro");
				i[0].addEventListener("webkitTransitionEnd", function(e) {
					t(this).css({
						"-webkit-transition-duration": "0ms"
					})
				}), window.innerWidth >= 1080 && i.hide()
			}
		}
	}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}),
	function(t, e, i) {
		i.Static = i.Static || {};
		var n = i.Static;
		i.tools, i.photosetTools;
		n.Botbuttons = function(t) {
			this.container = t, this.template = e.templates.botbuttons_tpl({})
		}, n.Botbuttons.prototype = {
			run: function() {
				t(this.container).html(this.template), t(this.container).bind("click", "#guide span", function(e) {
					document.body.classList.add("active"), document.body.classList.add("swipeup"), t("meta[name=theme-color]").attr("content", "#ff3333");
					var n = window.innerHeight,
						o = (parseInt(document.documentElement.style.fontSize), 0);
					Zepto(".photo").css({
						transform: "translate(0px, -" + (n - o) + "px) translateZ(0px)",
						"-webkit-transform": "translate(0px, -" + (n - o) + "px) translateZ(0px)"
					}), Zepto("header").addClass("unwrap");
					var a = Zepto(".open")[0].dataset.src;
					Zepto(".open")[0].style.backgroundImage = "url(" + a + ")", i.flowScrollTop > 100 && (document.querySelector(".flowlist").scrollTop = i.flowScrollTop - 100)
				}), t(this.container).bind("click", ".js-gotop", function() {
					document.querySelector(".flowlist").scrollTop = 1
				}), t(this.container).bind("click", ".checksource", function(t) {
					t.preventDefault();
					var e = this;
					neteaseTracker && neteaseTracker(!1, "http://click.3g.163.com/wap/wap3gphotoset/checksource", "\u56fe\u96c6\u8be6\u60c5\u9875\u67e5\u770b\u539f\u56fe\u70b9\u51fb\u6b21\u6570", "wapclick"), setTimeout(function() {
						window.open(e.href, "_blank")
					}, 500)
				})
			}
		}
	}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}),
	function(t, e, i) {
		i.Static = i.Static || {};
		var n = i.Static,
			o = i.tools;
		n.versionModel = {
			findVersionflag: function(t) {
				if (this.isLocalStorageSupported()) {
					var e = this.getStorage(t);
					if (e) {
						var i = JSON.parse(e).flag;
						if (i && i <= 100 && i >= 1) return i
					}
				}
				if (this.isCookieSupported()) {
					var n = this.getCookie(t);
					if (n) {
						var i = JSON.parse(n).flag;
						if (i && i <= 100 && i >= 1) return i
					}
				}
				return console.log("\u6ca1\u6709\u627e\u5230flag\u6807\u5fd7\u6216\u8005\u64cd\u4f5c\u5931\u8d25\uff01"), !1
			},
			writeVersionflag: function(t, e) {
				return !(!this.isLocalStorageSupported() || !this.writeStorage(t, e)) || (!(!this.isCookieSupported() || !this.writeCookie(t, e)) || (this.failedPlantVersion(this.analysisKeyname, "versionPlantFail", "AB\u7248\u672c\u968f\u673a\u503c\u79cd\u690d\u5931\u8d25\u7684\u91cf"), console.log("localStorage\u3001cookie\u90fd\u65e0\u6cd5\u4f7f\u7528"), !1))
			},
			getRandom: o.publicMethod.getRandom,
			isLocalStorageSupported: o.publicMethod.isLocalStorageSupported,
			isCookieSupported: o.publicMethod.isCookieSupported,
			docCookies: o.publicMethod.cookie,
			writeStorage: function(t, e) {
				var i = '{"flag":' + e + ',"pushdate":' + (new Date).getTime() + "}";
				try {
					return window.localStorage.setItem(t, i), this.failedPlantVersion(this.analysisKeyname, "versionAllCount", "AB\u7248\u672c\u968f\u673a\u503c\u603b\u91cf"), this.failedPlantVersion(this.analysisKeyname, "versionRandom" + e, "AB\u7248\u672c\u968f\u673a\u503c"), !0
				} catch (n) {
					return console.log("localStorage.setItem\u5931\u8d25"), !1
				}
			},
			writeCookie: function(t, e) {
				var i = '{"flag":' + e + ',"pushdate":' + (new Date).getTime() + "}";
				console.log("docCookies.setItem\u5931\u8d25");
				try {
					return this.docCookies.setItem(t, i, 1 / 0), this.failedPlantVersion(this.analysisKeyname, "versionAllCount", "AB\u7248\u672c\u968f\u673a\u503c\u603b\u91cf"), this.failedPlantVersion(this.analysisKeyname, "versionRandom" + e, "AB\u7248\u672c\u968f\u673a\u503c"), !0
				} catch (n) {
					return this.failedPlantVersion(this.analysisKeyname, "versionPlantFail", "AB\u7248\u672c\u968f\u673a\u503c\u79cd\u690d\u5931\u8d25\u7684\u91cf"), !1
				}
			},
			failedPlantVersion: function(t, e, n) {
				"object" == typeof i.trackerQueue ? i.trackerQueue.push({
					key: t,
					name: e,
					desc: n
				}) : (i.trackerQueue = [], i.trackerQueue.push({
					key: t,
					name: e,
					desc: n
				}))
			},
			getStorage: function(t) {
				var e, i, n = window.localStorage;
				try {
					e = n.getItem(t), i = e
				} catch (o) {
					console.log("localStorage.getItem\u4e0d\u80fd\u6267\u884c")
				}
				return i
			},
			getCookie: function(t) {
				var e, i, n = this.docCookies;
				try {
					e = n.getItem(t), i = e
				} catch (o) {
					console.log("docCookies.getItem\u4e0d\u80fd\u6267\u884c")
				}
				return i
			},
			matchVersions: function(t, e) {
				if (t && e) {
					for (var i in t)
						if (t[i] instanceof Array) {
							for (var n = 0; n < t[i].length; n++)
								if (t[i][n] == e) return i
						} else if ("string" == typeof t[i] && t[i].indexOf("-")) {
						var o = t[i].split("-");
						if (2 == o.length && e >= o[0] && e <= o[1]) return i
					}
					return "normal"
				}
				return "normal"
			},
			changeSearch: function(t, e) {
				var i = o.publicMethod.localParam().search,
					n = window.location.href;
				if (!i.debug)
					if ("normal" != t) {
						if (i[e]) {
							var a = new RegExp(e + "=([^&|^#]*)", "");
							n = n.replace(a, function(i, n) {
								return e + "=" + t
							})
						} else {
							var s = {};
							s[e] = t, n = o.publicMethod.urlAddSearch(n, s, 1)
						}
						try {
							history.replaceState(null, "", n)
						} catch (r) {
							console.warn("html5--history.pushState on error!")
						}
					} else {
						if (i[e]) {
							var a = new RegExp("(&)?" + e + "=([^&]*)(&)?", "");
							n = n.replace(a, function(t, e, i, n) {
								return e && n ? "&" : ""
							})
						}
						try {
							history.replaceState(null, "", n)
						} catch (r) {
							console.warn("html5--history.pushState on error!")
						}
					}
			},
			run: function(t, e, i) {
				this.analysisKeyname = i;
				var n, o = this.findVersionflag(e);
				if (0 == o) {
					var a = this.getRandom(1, 100);
					if (n = this.writeVersionflag(e, a), 0 == n) return "normal";
					n = a
				} else n = +o;
				return n ? this.matchVersions(t, n) : "normal"
			}
		}
	}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}),
	function(t, e, i) {
		i.InstanceList = i.InstanceList || {};
		var n = i.tools,
			o = i.photosetTools,
			a = i.Static || {},
			s = o.parseUrlParams();
		i.photosetTools = i.photosetTools || {};
		var o = i.photosetTools,
			r = s.setid || "",
			c = s.channel,
			l = s.channelid || "0001",
			h = {};
		c && "all" != c && "photo" != c && (l = i.DP.channelidFromChannel(c)), i._channelMap[l] ? c = i._channelMap[l].channel : (l = "0001", c = "news"), h = {
			setid: r,
			channelID: l,
			channelname: c
		};
		var p = a.selfAdaption();
		p._resizeClassHandle(), p._init(), p._resizeHandle(), p._touchmoveHandle(), i.InstanceList.selfAdaption = p;
		var d = new a.PhotoDesc(".photoComment");
		d.run(), i.InstanceList.photoDesc = d;
		var u = new a.Content("", h);
		u.run(), i.InstanceList.content = u, t(window).on("Share:before", function() {
			if (n.uaMatch.isWeixin) {
				if (!i.InstanceList.wxinnershare) {
					var e = new a.WXinnerShare(".js-share-mask");
					e.render(), i.InstanceList.wxinnershare = e
				}
			} else if (!i.InstanceList.share) {
				var o = Zepto(".js-albumTitle")[0].innerHTML,
					s = Zepto(".lar_photoList img")[0].dataset.src,
					r = {
						shareSummary: "",
						shareTitle: o,
						shareImg: s
					},
					c = new a.Share(".js-share-mask", r);
				c.render(), i.InstanceList.share = c
			}
			t(window).trigger("Share:show")
		});
		var d = new a.PhotoDesc(".photoComment");
		d.run(), i.InstanceList.photoDesc = d, a.handlebars_helper(), a.elementsControl.run();
		var m = new a.Topbar("header");
		m.run(), i.InstanceList.topbar = m;
		var f = new a.InfoFlow(".content-list", h);
		f.run(), f.handlebarsHelper(), i.InstanceList.flow = f;
		var g = new o.Loading(".flowlist", "listLoading");
		g.render("after"), i.InstanceList.listLoading = g;
		var v = new a.Botbuttons(".botbuttons");
		v.run(), i.InstanceList.botbuttons = v, "xmoy" == s.qd && (t("body").addClass("xmoy"), t(".js-replylink").bind("click", function(t) {
			t.preventDefault(), miui && miui.enterNewsCommentMode()
		}), t(".topbar .returnlink").bind("click", function(t) {
			document.referrer && history && history.back()
		}), window.makexmoyReply = function(t) {
			window.xmoyReply = function(e, n, o) {
				var a = "http://comment.news.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/" + t + "/comments?ibc=newswap";
				i.tools.commentMethod.submitReply(a, e, n, o)
			}
		})
	}(Zepto, Handlebars, window.NEWAP = window.NEWAP || {}),
	function(t) {
		var e = t.tools;
		e || (t.tools = {
			publicMethod: {
				localParam: function(t, e) {
					var i;
					return t = t || window.location.search, e = e || window.location.hash, i = function(t, e) {
						var i;
						if (t) return i = {}, t.replace(e, function(t, e, n, o) {
							i[e] = o
						}), i
					}, {
						search: i(t, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
						hash: i(e, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
					}
				},
				cookie: {
					getItem: function(t) {
						return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
					},
					setItem: function(t, e, i, n, o, a) {
						if (!t || /^(?:expires|max\-age|path|domain|secure)$/i.test(t)) return !1;
						var s = "";
						if (i) switch (i.constructor) {
							case Number:
								s = i === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + i;
								break;
							case String:
								s = "; expires=" + i;
								break;
							case Date:
								s = "; expires=" + i.toUTCString()
						}
						return document.cookie = encodeURIComponent(t) + "=" + encodeURIComponent(e) + s + (o ? "; domain=" + o : "") + (n ? "; path=" + n : "") + (a ? "; secure" : ""), !0
					},
					removeItem: function(t, e, i) {
						return !(!t || !this.hasItem(t)) && (document.cookie = encodeURIComponent(t) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (i ? "; domain=" + i : "") + (e ? "; path=" + e : ""), !0)
					},
					hasItem: function(t) {
						return new RegExp("(?:^|;\\s*)" + encodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
					},
					keys: function() {
						for (var t = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), e = 0; e < t.length; e++) t[e] = decodeURIComponent(t[e]);
						return t
					}
				},
				isLocalStorageSupported: function() {
					var t = "test",
						e = window.localStorage;
					try {
						e.setItem(t, "testValue")
					} catch (i) {
						return console.log("localStorage.setItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
					}
					try {
						return "testValue" == e.getItem(t) && (e.removeItem(t), !0)
					} catch (i) {
						return console.log("localStorage.getItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
					}
				},
				isCookieSupported: function() {
					var e = "test",
						i = t.tools.publicMethod.cookie;
					try {
						i.setItem(e, "testValue")
					} catch (n) {
						return console.log("docCookies.setItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
					}
					try {
						return "testValue" == i.getItem(e) && (i.removeItem(e), !0)
					} catch (n) {
						return console.log("docCookies.getItem\u4e0d\u53ef\u4ee5\u6267\u884c"), !1
					}
				},
				urlAddSearch: function(t, e, i) {
					var n, o = !i || i,
						a = function(t) {
							var e = document.createElement("a");
							return e.href = t, e
						},
						t = new a(t),
						s = t.href.match(/\?/) && t.href.match(/\?$/) ? "?" : "",
						r = t.search;
					s || t.href.match(/\?/) || (s = "?"), r += s;
					for (var c in e)
						if (e[c] && ("string" == typeof e[c] || "number" == typeof e[c]))
							if (o) {
								var l = this.localParam(r);
								if (l.search[c]) {
									var h = new RegExp(c + "=([^&]*)", "");
									r = r.replace(h, function(t, i) {
										return c + "=" + e[c]
									})
								} else r += "&" + c + "=" + e[c]
							} else r += "&" + c + "=" + e[c];
					return r = r.replace(/\?&/g, function() {
						return "?"
					}), n = t.origin + t.pathname + r + t.hash
				}
			}
		}, e = t.tools);
		var i = (e.publicMethod.localParam().search, {
				A: "2-34",
				B: "35-67"
			}),
			n = function(t) {
				if (e.publicMethod.isLocalStorageSupported()) {
					var i = localStorage.getItem(t);
					if (i) {
						var n = JSON.parse(i).flag;
						if (n && n <= 100 && n >= 1) return n
					}
				}
				if (e.publicMethod.isCookieSupported()) {
					var o = e.publicMethod.cookie.getItem(t);
					if (o) {
						var n = JSON.parse(o).flag;
						if (n && n <= 100 && n >= 1) return n
					}
				}
				return !1
			},
			o = function(t, i) {
				var n = e.publicMethod.localParam().search,
					o = window.location.href;
				if ("normal" != t) {
					if (n[i]) {
						var a = new RegExp(i + "=([^&|^#]*)", "");
						o = o.replace(a, function(e, n) {
							return i + "=" + t
						})
					} else {
						var s = {};
						s[i] = t, o = e.publicMethod.urlAddSearch(o, s, 1)
					}
					try {
						history.replaceState(null, "", o)
					} catch (r) {
						console.warn("html5--history.pushState on error!")
					}
				} else {
					if (n[i] && !n.debug) {
						var a = new RegExp("&" + i + "=([^&]*)", "");
						o = o.replace(a, function(t, e) {
							return ""
						})
					}
					try {
						history.replaceState(null, "", o)
					} catch (r) {
						console.warn("html5--history.pushState on error!")
					}
				}
			},
			a = function(t, e) {
				if (t && e) {
					for (var i in t)
						if (t[i] instanceof Array) {
							for (var n = 0; n < t[i].length; n++)
								if (t[i][n] == e) return i
						} else if ("string" == typeof t[i] && t[i].indexOf("-")) {
						var o = t[i].split("-");
						if (2 == o.length && e >= o[0] && e <= o[1]) return i
					}
					return "normal"
				}
				return "normal"
			},
			s = n("NEWAP_ABVersion");
		if (s) {
			var r = a(i, s);
			o(r, "articleversion")
		}
	}(window.NEWAP = window.NEWAP || {});