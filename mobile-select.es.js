/*
* mobile-select v1.4.0
* Homepage: https://github.com/onlyhom/mobile-select
* Released under the MIT License.
* (c) 2017-present
*/
var C = Object.defineProperty;
var v = (g, t, e) => t in g ? C(g, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : g[t] = e;
var o = (g, t, e) => (v(g, typeof t != "symbol" ? t + "" : t, e), e);
import "./style/mobile-select.css";
function S() {
  return !navigator.userAgent.toLowerCase().match(/ipad|iphone os|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/);
}
function y(g, t = 2) {
  return (Math.floor(g * 100) / 100).toFixed(t);
}
const r = class {
  constructor(t) {
    o(this, "mobileSelect");
    o(this, "trigger");
    o(this, "wheelList");
    o(this, "sliderList");
    o(this, "wheelsContain");
    o(this, "panel");
    o(this, "ensureBtn");
    o(this, "cancelBtn");
    o(this, "grayLayer");
    o(this, "popUp");
    o(this, "initPosition");
    o(this, "initColWidth");
    o(this, "wheelsData");
    o(this, "displayJson");
    o(this, "curValue");
    o(this, "curIndexArr");
    o(this, "isCascade");
    o(this, "isJsonType");
    o(this, "startY");
    o(this, "moveEndY");
    o(this, "moveY");
    o(this, "preMoveY");
    o(this, "offsetY");
    o(this, "offsetSum");
    o(this, "oversizeBorder");
    o(this, "enableClickStatus");
    o(this, "optionHeight");
    o(this, "curDistance");
    o(this, "cascadeJsonData");
    o(this, "eventHandleMap");
    o(this, "initDeepCount");
    o(this, "config");
    !r.checkRequiredConfig(t) || (this.config = Object.assign({}, r.defaultConfig, t), this.wheelsData = t.wheels, this.isJsonType = !1, this.cascadeJsonData = [], this.displayJson = [], this.curValue = [], this.curIndexArr = [], this.isCascade = !1, this.startY, this.moveEndY, this.moveY, this.preMoveY, this.offsetY = 0, this.offsetSum = 0, this.oversizeBorder, this.curDistance = [], this.enableClickStatus = !1, this.optionHeight = 0, this.initPosition = t.position || [], this.initColWidth = t.colWidth || [], this.init());
  }
  init() {
    if (!this.checkTriggerAvailable())
      return;
    const { config: t } = this;
    if (this.isJsonType = r.checkDataType(this.wheelsData), this.renderComponent(this.wheelsData), this.wheelList = this.mobileSelect.getElementsByClassName("ms-wheel"), this.sliderList = this.mobileSelect.getElementsByClassName("ms-select-container"), this.panel = this.mobileSelect.querySelector(".ms-panel"), this.wheelsContain = this.mobileSelect.querySelector(".ms-wheels"), this.ensureBtn = this.mobileSelect.querySelector(".ms-ensure"), this.cancelBtn = this.mobileSelect.querySelector(".ms-cancel"), this.grayLayer = this.mobileSelect.querySelector(".ms-gray-layer"), this.popUp = this.mobileSelect.querySelector(".ms-content"), this.optionHeight = this.mobileSelect.querySelector("li").offsetHeight, t.initValue && this.setTriggerInnerText(t.initValue), this.setStyle(t), this.isCascade = this.checkCascade(), this.isCascade && this.initCascade(), t.initValue && (this.initPosition = this.getPositionByInitValue()), this.initPosition.length < this.sliderList.length) {
      const e = this.sliderList.length - this.initPosition.length;
      for (let i = 0; i < e; i++)
        this.initPosition.push(0);
    }
    this.isCascade ? this.initPosition.forEach((e, i) => {
      this.checkRange(i, this.initPosition);
    }) : this.setCurDistance(this.initPosition), this.eventHandleMap = {
      cancelBtn: {
        event: "click",
        fn: () => {
          var e, i, s, n;
          this.hide(), (i = (e = this.config).cancel) == null || i.call(e, this.curIndexArr, this.curValue, this), (n = (s = this.config).onCancel) == null || n.call(s, this.curValue, this.curIndexArr, this);
        }
      },
      ensureBtn: {
        event: "click",
        fn: () => {
          var e, i, s, n;
          this.hide(), this.optionHeight || (this.optionHeight = this.mobileSelect.querySelector("li").offsetHeight), this.setTriggerInnerText(this.getConnectedString()), this.curIndexArr = this.getIndexArr(), this.curValue = this.getCurValue(), (i = (e = this.config).callback) == null || i.call(e, this.curIndexArr, this.curValue, this), (n = (s = this.config).onChange) == null || n.call(s, this.curValue, this.curIndexArr, this);
        }
      },
      trigger: {
        event: "click",
        fn: () => {
          this.show();
        }
      },
      grayLayer: {
        event: "click",
        fn: () => this.hide()
      },
      popUp: {
        event: "click",
        fn: (e) => e.stopPropagation()
      },
      panel: {
        event: ["touchstart", "touchend", "touchmove"],
        fn: (e) => this.touch(e)
      }
    }, S() && (this.eventHandleMap.panel.event = ["mousedown", "mousemove", "mouseup"]), this.registerEvents("add"), this.fixRowStyle(), t.autoFocus && this.show();
  }
  static checkDataType(t) {
    var e, i;
    return typeof ((i = (e = t[0]) == null ? void 0 : e.data) == null ? void 0 : i[0]) == "object";
  }
  static checkRequiredConfig(t) {
    const e = r.REQUIRED_PARAMS;
    if (!t) {
      const i = e.map((s) => `'${s}'`);
      return r.log("error", `missing required param ${i.join(" and ")}.`), !1;
    }
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (!t[s])
        return r.log("error", `missing required param '${s}'.`), !1;
    }
    return !0;
  }
  static log(t, e) {
    var i;
    (i = console[t]) == null || i.call(console, `[mobile-select]: ${e}`);
  }
  checkTriggerAvailable() {
    const { config: t } = this;
    return this.trigger = t.trigger instanceof HTMLElement ? t.trigger : document.querySelector(t.trigger), this.trigger ? !0 : (r.log("error", "trigger HTMLElement does not found on your document."), !1);
  }
  getPositionByInitValue() {
    var n;
    const { keyMap: t, connector: e, initValue: i } = this.config, s = (i == null ? void 0 : i.split(e)) || [];
    if (this.isJsonType) {
      let h = (n = this.wheelsData[0]) == null ? void 0 : n.data;
      return s.reduce((l, c) => {
        var d;
        const a = h == null ? void 0 : h.findIndex((u) => u[t.value] == c);
        return l.push(a < 0 ? 0 : a), h = (d = h[a]) == null ? void 0 : d[t.childs], l;
      }, []);
    }
    return s.reduce((h, l, c) => {
      var d, u;
      const a = (u = (d = this.wheelsData[c]) == null ? void 0 : d.data) == null ? void 0 : u.findIndex((f) => f == l);
      return h.push(a < 0 ? 0 : a), h;
    }, []);
  }
  getConnectedString() {
    let t = "";
    for (let e = 0; e < this.wheelList.length; e++)
      e == this.wheelList.length - 1 ? t += this.getInnerText(e) : t += this.getInnerText(e) + this.config.connector;
    return t;
  }
  setTriggerInnerText(t) {
    this.config.triggerDisplayValue && (this.trigger.textContent = t);
  }
  setValue(t) {
    if (!t || !t.length)
      return;
    if (this.isJsonType && typeof t[0] != "object" || !this.isJsonType && typeof t[0] == "object") {
      r.log("error", `The setValue() input format should be same with getValue(), like: ${JSON.stringify(this.getValue())}`);
      return;
    }
    const { keyMap: e } = this.config;
    t.forEach((i, s) => {
      var l;
      const n = this.isCascade ? this.displayJson[s] : (l = this.wheelsData[s]) == null ? void 0 : l.data, h = n == null ? void 0 : n.findIndex((c) => this.isJsonType ? i[e.id] == c[e.id] || i[e.value] == c[e.value] : i == c);
      this.locatePosition(s, h);
    }), this.setTriggerInnerText(this.getConnectedString());
  }
  setTitle(t) {
    this.mobileSelect.querySelector(".ms-title").innerHTML = t;
  }
  setStyle(t) {
    if (t.ensureBtnColor && (this.ensureBtn.style.color = t.ensureBtnColor), t.cancelBtnColor && (this.cancelBtn.style.color = t.cancelBtnColor), t.titleColor) {
      const e = this.mobileSelect.querySelector(".ms-title");
      e.style.color = t.titleColor;
    }
    if (t.textColor && (this.panel = this.mobileSelect.querySelector(".ms-panel"), this.panel.style.color = t.textColor), t.titleBgColor) {
      const e = this.mobileSelect.querySelector(".ms-btn-bar");
      e.style.backgroundColor = t.titleBgColor;
    }
    if (t.bgColor) {
      this.panel = this.mobileSelect.querySelector(".ms-panel");
      const e = this.mobileSelect.querySelector(".ms-shadow-mask");
      this.panel.style.backgroundColor = t.bgColor, e.style.background = "linear-gradient(to bottom, " + t.bgColor + ", rgba(255, 255, 255, 0), " + t.bgColor + ")";
    }
    if (typeof t.maskOpacity == "number") {
      const e = this.mobileSelect.querySelector(".ms-gray-layer");
      e.style.background = "rgba(0, 0, 0, " + t.maskOpacity + ")";
    }
  }
  show() {
    var t, e, i;
    this.mobileSelect.classList.add("ms-show"), (t = document.querySelector("body")) == null || t.classList.add("ms-show"), typeof this.config.onShow == "function" && ((i = (e = this.config).onShow) == null || i.call(e, this.curValue, this.curIndexArr, this));
  }
  hide() {
    var t, e, i;
    this.mobileSelect.classList.remove("ms-show"), (t = document.querySelector("body")) == null || t.classList.remove("ms-show"), typeof this.config.onHide == "function" && ((i = (e = this.config).onHide) == null || i.call(e, this.curValue, this.curIndexArr, this));
  }
  registerEvents(t) {
    for (const [e, i] of Object.entries(this.eventHandleMap))
      typeof i.event == "string" ? this[e][`${t}EventListener`](i.event, i.fn, { passive: !1 }) : i.event.forEach((s) => {
        this[e][`${t}EventListener`](s, i.fn, { passive: !1 });
      });
  }
  destroy() {
    var t, e;
    this.registerEvents("remove"), (e = (t = this.mobileSelect) == null ? void 0 : t.parentNode) == null || e.removeChild(this.mobileSelect);
  }
  getOptionsHtmlStr(t) {
    const { keyMap: e } = this.config;
    let i = "";
    if (this.isJsonType)
      for (let s = 0; s < t.length; s++) {
        const n = t[s][e.id], h = t[s][e.value];
        i += `<li data-id="${n}">${h}</li>`;
      }
    else
      for (let s = 0; s < t.length; s++)
        i += "<li>" + t[s] + "</li>";
    return i;
  }
  renderComponent(t) {
    this.mobileSelect = document.createElement("div"), this.mobileSelect.className = "ms-mobile-select", this.mobileSelect.innerHTML = `<div class="ms-gray-layer"></div>
        <div class="ms-content">
          <div class="ms-btn-bar">
            <div class="ms-fix-width">
              <div class="ms-cancel">${this.config.cancelBtnText}</div>  
              <div class="ms-title">${this.config.title || ""}</div>
              <div class="ms-ensure">${this.config.ensureBtnText}</div>
            </div>
          </div>
          <div class="ms-panel">
            <div class="ms-fix-width">
            <div class="ms-wheels"></div>
            <div class="ms-select-line"></div>
            <div class="ms-shadow-mask"></div>
          </div>
        </div>`, document.body.appendChild(this.mobileSelect);
    let e = "";
    for (let i = 0; i < t.length; i++)
      e += `<div class="ms-wheel" data-index="${i}"><ul class="ms-select-container">`, e += this.getOptionsHtmlStr(t[i].data), e += "</ul></div>";
    this.mobileSelect.querySelector(".ms-wheels").innerHTML = e;
  }
  reRenderWheels() {
    const t = this.wheelList.length - this.displayJson.length;
    if (t > 0)
      for (let e = 0; e < t; e++)
        this.wheelsContain.removeChild(this.wheelList[this.wheelList.length - 1]);
    for (let e = 0; e < this.displayJson.length; e++)
      if (this.wheelList[e])
        this.sliderList[e].innerHTML = this.getOptionsHtmlStr(this.displayJson[e]);
      else {
        const i = document.createElement("div");
        i.className = "ms-wheel", i.innerHTML = `<ul class="ms-select-container">${this.getOptionsHtmlStr(this.displayJson[e])}</ul>`, i.setAttribute("data-index", e.toString()), this.wheelsContain.appendChild(i);
      }
  }
  checkCascade() {
    var e;
    const { keyMap: t } = this.config;
    if (this.isJsonType) {
      const i = this.wheelsData[0].data;
      for (let s = 0; s < i.length; s++)
        if (t.childs in i[s] && ((e = i[s][t.childs]) == null ? void 0 : e.length) > 0)
          return this.cascadeJsonData = this.wheelsData[0].data, !0;
    }
    return !1;
  }
  initCascade() {
    this.displayJson.push(this.cascadeJsonData), this.initPosition.length > 0 ? (this.initDeepCount = 0, this.initCheckArrDeep(this.cascadeJsonData[this.initPosition[0]])) : this.checkArrDeep(this.cascadeJsonData[0]), this.reRenderWheels();
  }
  initCheckArrDeep(t) {
    if (t) {
      const { keyMap: e } = this.config;
      if (e.childs in t && t[e.childs].length > 0) {
        this.displayJson.push(t[e.childs]), this.initDeepCount++;
        const i = t[e.childs][this.initPosition[this.initDeepCount]];
        i ? this.initCheckArrDeep(i) : this.checkArrDeep(t[e.childs][0]);
      }
    }
  }
  checkArrDeep(t) {
    if (!t)
      return;
    const { keyMap: e } = this.config;
    e.childs in t && t[e.childs].length > 0 && (this.displayJson.push(t[e.childs]), this.checkArrDeep(t[e.childs][0]));
  }
  checkRange(t, e) {
    var h;
    const i = this.displayJson.length - 1 - t, { keyMap: s } = this.config;
    for (let l = 0; l < i; l++)
      this.displayJson.pop();
    let n;
    for (let l = 0; l <= t; l++)
      n = l == 0 ? this.cascadeJsonData[e[0]] : (h = n == null ? void 0 : n[s.childs]) == null ? void 0 : h[e[l]];
    this.checkArrDeep(n), this.reRenderWheels(), this.fixRowStyle(), this.setCurDistance(this.resetPosition(t, e));
  }
  resetPosition(t, e) {
    const i = [...e];
    let s;
    if (this.sliderList.length > e.length) {
      s = this.sliderList.length - e.length;
      for (let n = 0; n < s; n++)
        i.push(0);
    } else if (this.sliderList.length < e.length) {
      s = e.length - this.sliderList.length;
      for (let n = 0; n < s; n++)
        i.pop();
    }
    for (let n = t + 1; n < i.length; n++)
      i[n] = 0;
    return i;
  }
  updateWheels(t) {
    if (this.isCascade) {
      if (this.cascadeJsonData = t, this.displayJson = [], this.initCascade(), this.initPosition.length < this.sliderList.length) {
        const e = this.sliderList.length - this.initPosition.length;
        for (let i = 0; i < e; i++)
          this.initPosition.push(0);
      }
      this.setCurDistance(this.initPosition), this.fixRowStyle();
    }
  }
  updateWheel(t, e) {
    if (this.isCascade) {
      r.log("error", "'updateWheel()' not support cascade json data, please use 'updateWheels()' instead to update the whole data source");
      return;
    }
    let i = "";
    i += this.getOptionsHtmlStr(e), this.wheelsData[t] = this.isJsonType ? { data: e } : e, this.sliderList[t].innerHTML = i;
  }
  fixRowStyle() {
    if (this.initColWidth.length && this.initColWidth.length === this.wheelList.length) {
      const e = this.initColWidth.reduce((i, s) => i + s, 0);
      this.initColWidth.forEach((i, s) => {
        this.wheelList[s].style.width = y(i / e) + "%";
      });
      return;
    }
    const t = y(100 / this.wheelList.length) + "%";
    for (let e = 0; e < this.wheelList.length; e++)
      this.wheelList[e].style.width = t;
  }
  getIndex(t) {
    return Math.round((2 * this.optionHeight - t) / this.optionHeight);
  }
  getIndexArr() {
    const t = [];
    for (let e = 0; e < this.curDistance.length; e++)
      t.push(this.getIndex(this.curDistance[e]));
    return t;
  }
  getCurValue() {
    const t = [], e = this.getIndexArr(), { keyMap: i } = this.config;
    if (this.isCascade)
      for (let s = 0; s < this.wheelList.length; s++) {
        const n = this.displayJson[s][e[s]];
        n && t.push({
          [i.id]: n[i.id],
          [i.value]: n[i.value]
        });
      }
    else if (this.isJsonType)
      for (let s = 0; s < this.curDistance.length; s++)
        t.push(this.wheelsData[s].data[this.getIndex(this.curDistance[s])]);
    else
      for (let s = 0; s < this.curDistance.length; s++)
        t.push(this.getInnerText(s));
    return t;
  }
  getValue() {
    return this.getCurValue();
  }
  calcDistance(t) {
    return 2 * this.optionHeight - t * this.optionHeight;
  }
  setCurDistance(t) {
    const e = [];
    for (let i = 0; i < this.sliderList.length; i++)
      e.push(this.calcDistance(t[i])), this.movePosition(this.sliderList[i], e[i]);
    this.curDistance = e;
  }
  fixPosition(t) {
    return -(this.getIndex(t) - 2) * this.optionHeight;
  }
  movePosition(t, e) {
    t.style.transform = "translate3d(0," + e + "px, 0)";
  }
  locatePosition(t, e) {
    t === void 0 || e === void 0 || e < 0 || (this.curDistance[t] = this.calcDistance(e), this.movePosition(this.sliderList[t], this.curDistance[t]), this.isCascade && this.checkRange(t, this.getIndexArr()));
  }
  updateCurDistance(t, e) {
    this.curDistance[e] = parseInt(t.style.transform.split(",")[1]);
  }
  getInnerText(t) {
    var s;
    const e = this.sliderList[t].getElementsByTagName("li").length;
    let i = this.getIndex(this.curDistance[t]);
    return i >= e ? i = e - 1 : i < 0 && (i = 0), ((s = this.sliderList[t].getElementsByTagName("li")[i]) == null ? void 0 : s.textContent) || "";
  }
  touch(t) {
    var l, c, a, d;
    const i = (t.composedPath && t.composedPath()).find((u) => {
      var f;
      return (f = u.classList) == null ? void 0 : f.contains("ms-wheel");
    });
    if (!i)
      return;
    let s = !1;
    const n = i.firstChild, h = parseInt(i.getAttribute("data-index") || "0");
    switch (t.type) {
      case "touchstart":
      case "mousedown":
        n.style.transition = "none 0s ease-out", this.startY = Math.floor(t instanceof TouchEvent ? t.touches[0].clientY : t.clientY), this.preMoveY = this.startY, t.type === "mousedown" && (this.enableClickStatus = !0);
        break;
      case "touchmove":
      case "mousemove":
        if (t.preventDefault(), t.type === "mousemove" && !this.enableClickStatus)
          break;
        this.moveY = Math.floor(t instanceof TouchEvent ? t.touches[0].clientY : t.clientY), this.offsetY = (this.moveY - this.preMoveY) * this.config.scrollSpeed, this.updateCurDistance(n, h), this.curDistance[h] = this.curDistance[h] + this.offsetY, this.movePosition(n, this.curDistance[h]), this.preMoveY = this.moveY;
        break;
      case "touchend":
      case "mouseup":
        if (n.style.transition = "transform 0.18s ease-out", this.moveEndY = Math.floor(t instanceof TouchEvent ? t.changedTouches[0].clientY : t.clientY), this.offsetSum = this.moveEndY - this.startY, this.oversizeBorder = -(n.getElementsByTagName("li").length - 3) * this.optionHeight, this.offsetSum == 0) {
          const u = Math.floor((window.innerHeight - this.moveEndY) / 40);
          if (u != 2) {
            const f = u - 2, p = this.curDistance[h] + f * this.optionHeight;
            p <= 2 * this.optionHeight && p >= this.oversizeBorder && (this.curDistance[h] = p, this.movePosition(n, this.curDistance[h]), s = !0);
          }
        } else
          this.updateCurDistance(n, h), this.curDistance[h] = this.fixPosition(this.curDistance[h]), this.curDistance[h] > 2 * this.optionHeight ? this.curDistance[h] = 2 * this.optionHeight : this.curDistance[h] < this.oversizeBorder && (this.curDistance[h] = this.oversizeBorder), this.movePosition(n, this.curDistance[h]), s = !0;
        t.type === "mouseup" && (this.enableClickStatus = !1), this.isCascade && this.checkRange(h, this.getIndexArr()), s && ((c = (l = this.config).transitionEnd) == null || c.call(l, this.getIndexArr(), this.getCurValue(), this), (d = (a = this.config).onTransitionEnd) == null || d.call(a, this.getCurValue(), this.getIndexArr(), this));
    }
  }
};
let m = r;
o(m, "defaultConfig", {
  keyMap: { id: "id", value: "value", childs: "childs" },
  position: [],
  colWidth: [],
  title: "",
  connector: " ",
  ensureBtnText: "\u786E\u8BA4",
  cancelBtnText: "\u53D6\u6D88",
  triggerDisplayValue: !0,
  scrollSpeed: 1
}), o(m, "REQUIRED_PARAMS", ["trigger", "wheels"]);
export {
  m as default
};
