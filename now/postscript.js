(function () {// quartz/components/scripts/quartz/components/scripts/clipboard.inline.ts
var svgCopy = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
var svgCheck = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';
document.addEventListener("nav", () => {
  const els = document.getElementsByTagName("pre");
  for (let i = 0; i < els.length; i++) {
    const codeBlock = els[i].getElementsByTagName("code")[0];
    if (codeBlock) {
      const source = codeBlock.innerText.replace(/\n\n/g, "\n");
      const button = document.createElement("button");
      button.className = "clipboard-button";
      button.type = "button";
      button.innerHTML = svgCopy;
      button.ariaLabel = "Copy source";
      button.addEventListener("click", () => {
        navigator.clipboard.writeText(source).then(
          () => {
            button.blur();
            button.innerHTML = svgCheck;
            setTimeout(() => {
              button.innerHTML = svgCopy;
              button.style.borderColor = "";
            }, 2e3);
          },
          (error) => console.error(error)
        );
      });
      els[i].prepend(button);
    }
  }
});
})();
(function () {// quartz/components/scripts/quartz/components/scripts/explorer.inline.ts
var explorerState;
var observer = new IntersectionObserver((entries) => {
  const explorer = document.getElementById("explorer-ul");
  for (const entry of entries) {
    if (entry.isIntersecting) {
      explorer?.classList.add("no-background");
    } else {
      explorer?.classList.remove("no-background");
    }
  }
});
function toggleExplorer() {
  this.classList.toggle("collapsed");
  const content = this.nextElementSibling;
  content.classList.toggle("collapsed");
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px";
}
function toggleFolder(evt) {
  evt.stopPropagation();
  const target = evt.target;
  const isSvg = target.nodeName === "svg";
  let childFolderContainer;
  let currentFolderParent;
  if (isSvg) {
    childFolderContainer = target.parentElement?.nextSibling;
    currentFolderParent = target.nextElementSibling;
    childFolderContainer.classList.toggle("open");
  } else {
    childFolderContainer = target.parentElement?.parentElement?.nextElementSibling;
    currentFolderParent = target.parentElement;
    childFolderContainer.classList.toggle("open");
  }
  if (!childFolderContainer)
    return;
  const isCollapsed = childFolderContainer.classList.contains("open");
  setFolderState(childFolderContainer, !isCollapsed);
  const clickFolderPath = currentFolderParent.dataset.folderpath;
  const fullFolderPath = clickFolderPath.substring(1);
  toggleCollapsedByPath(explorerState, fullFolderPath);
  const stringifiedFileTree = JSON.stringify(explorerState);
  localStorage.setItem("fileTree", stringifiedFileTree);
}
function setupExplorer() {
  const explorer = document.getElementById("explorer");
  const storageTree = localStorage.getItem("fileTree");
  const useSavedFolderState = explorer?.dataset.savestate === "true";
  if (explorer) {
    const collapseBehavior = explorer.dataset.behavior;
    if (collapseBehavior === "collapse") {
      Array.prototype.forEach.call(
        document.getElementsByClassName("folder-button"),
        function(item) {
          item.removeEventListener("click", toggleFolder);
          item.addEventListener("click", toggleFolder);
        }
      );
    }
    explorer.removeEventListener("click", toggleExplorer);
    explorer.addEventListener("click", toggleExplorer);
  }
  Array.prototype.forEach.call(document.getElementsByClassName("folder-icon"), function(item) {
    item.removeEventListener("click", toggleFolder);
    item.addEventListener("click", toggleFolder);
  });
  if (storageTree && useSavedFolderState) {
    explorerState = JSON.parse(storageTree);
    explorerState.map((folderUl) => {
      const folderLi = document.querySelector(
        `[data-folderpath='/${folderUl.path}']`
      );
      if (folderLi) {
        const folderUL = folderLi.parentElement?.nextElementSibling;
        if (folderUL) {
          setFolderState(folderUL, folderUl.collapsed);
        }
      }
    });
  } else if (explorer?.dataset.tree) {
    explorerState = JSON.parse(explorer.dataset.tree);
  }
}
window.addEventListener("resize", setupExplorer);
document.addEventListener("nav", () => {
  setupExplorer();
  observer.disconnect();
  const lastItem = document.getElementById("explorer-end");
  if (lastItem) {
    observer.observe(lastItem);
  }
});
function setFolderState(folderElement, collapsed) {
  if (collapsed) {
    folderElement?.classList.remove("open");
  } else {
    folderElement?.classList.add("open");
  }
}
function toggleCollapsedByPath(array, path) {
  const entry = array.find((item) => item.path === path);
  if (entry) {
    entry.collapsed = !entry.collapsed;
  }
}
})();
(function () {// node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs
function t(t2) {
  return t2.split("-")[1];
}
function e(t2) {
  return "y" === t2 ? "height" : "width";
}
function n(t2) {
  return t2.split("-")[0];
}
function o(t2) {
  return ["top", "bottom"].includes(n(t2)) ? "x" : "y";
}
function i(i3, r3, a3) {
  let { reference: l3, floating: s3 } = i3;
  const c3 = l3.x + l3.width / 2 - s3.width / 2, f3 = l3.y + l3.height / 2 - s3.height / 2, m3 = o(r3), u3 = e(m3), g3 = l3[u3] / 2 - s3[u3] / 2, d3 = "x" === m3;
  let p4;
  switch (n(r3)) {
    case "top":
      p4 = { x: c3, y: l3.y - s3.height };
      break;
    case "bottom":
      p4 = { x: c3, y: l3.y + l3.height };
      break;
    case "right":
      p4 = { x: l3.x + l3.width, y: f3 };
      break;
    case "left":
      p4 = { x: l3.x - s3.width, y: f3 };
      break;
    default:
      p4 = { x: l3.x, y: l3.y };
  }
  switch (t(r3)) {
    case "start":
      p4[m3] -= g3 * (a3 && d3 ? -1 : 1);
      break;
    case "end":
      p4[m3] += g3 * (a3 && d3 ? -1 : 1);
  }
  return p4;
}
var r = async (t2, e2, n3) => {
  const { placement: o3 = "bottom", strategy: r3 = "absolute", middleware: a3 = [], platform: l3 } = n3, s3 = a3.filter(Boolean), c3 = await (null == l3.isRTL ? void 0 : l3.isRTL(e2));
  let f3 = await l3.getElementRects({ reference: t2, floating: e2, strategy: r3 }), { x: m3, y: u3 } = i(f3, o3, c3), g3 = o3, d3 = {}, p4 = 0;
  for (let n4 = 0; n4 < s3.length; n4++) {
    const { name: a4, fn: h3 } = s3[n4], { x: y2, y: x3, data: w3, reset: v3 } = await h3({ x: m3, y: u3, initialPlacement: o3, placement: g3, strategy: r3, middlewareData: d3, rects: f3, platform: l3, elements: { reference: t2, floating: e2 } });
    m3 = null != y2 ? y2 : m3, u3 = null != x3 ? x3 : u3, d3 = { ...d3, [a4]: { ...d3[a4], ...w3 } }, v3 && p4 <= 50 && (p4++, "object" == typeof v3 && (v3.placement && (g3 = v3.placement), v3.rects && (f3 = true === v3.rects ? await l3.getElementRects({ reference: t2, floating: e2, strategy: r3 }) : v3.rects), { x: m3, y: u3 } = i(f3, g3, c3)), n4 = -1);
  }
  return { x: m3, y: u3, placement: g3, strategy: r3, middlewareData: d3 };
};
function a(t2, e2) {
  return "function" == typeof t2 ? t2(e2) : t2;
}
function l(t2) {
  return "number" != typeof t2 ? function(t3) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...t3 };
  }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
}
function s(t2) {
  return { ...t2, top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height };
}
async function c(t2, e2) {
  var n3;
  void 0 === e2 && (e2 = {});
  const { x: o3, y: i3, platform: r3, rects: c3, elements: f3, strategy: m3 } = t2, { boundary: u3 = "clippingAncestors", rootBoundary: g3 = "viewport", elementContext: d3 = "floating", altBoundary: p4 = false, padding: h3 = 0 } = a(e2, t2), y2 = l(h3), x3 = f3[p4 ? "floating" === d3 ? "reference" : "floating" : d3], w3 = s(await r3.getClippingRect({ element: null == (n3 = await (null == r3.isElement ? void 0 : r3.isElement(x3))) || n3 ? x3 : x3.contextElement || await (null == r3.getDocumentElement ? void 0 : r3.getDocumentElement(f3.floating)), boundary: u3, rootBoundary: g3, strategy: m3 })), v3 = "floating" === d3 ? { ...c3.floating, x: o3, y: i3 } : c3.reference, b3 = await (null == r3.getOffsetParent ? void 0 : r3.getOffsetParent(f3.floating)), A3 = await (null == r3.isElement ? void 0 : r3.isElement(b3)) && await (null == r3.getScale ? void 0 : r3.getScale(b3)) || { x: 1, y: 1 }, R2 = s(r3.convertOffsetParentRelativeRectToViewportRelativeRect ? await r3.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: v3, offsetParent: b3, strategy: m3 }) : v3);
  return { top: (w3.top - R2.top + y2.top) / A3.y, bottom: (R2.bottom - w3.bottom + y2.bottom) / A3.y, left: (w3.left - R2.left + y2.left) / A3.x, right: (R2.right - w3.right + y2.right) / A3.x };
}
var f = Math.min;
var m = Math.max;
function u(t2, e2, n3) {
  return m(t2, f(e2, n3));
}
var d = ["top", "right", "bottom", "left"];
var p = d.reduce((t2, e2) => t2.concat(e2, e2 + "-start", e2 + "-end"), []);
var h = { left: "right", right: "left", bottom: "top", top: "bottom" };
function y(t2) {
  return t2.replace(/left|right|bottom|top/g, (t3) => h[t3]);
}
function x(n3, i3, r3) {
  void 0 === r3 && (r3 = false);
  const a3 = t(n3), l3 = o(n3), s3 = e(l3);
  let c3 = "x" === l3 ? a3 === (r3 ? "end" : "start") ? "right" : "left" : "start" === a3 ? "bottom" : "top";
  return i3.reference[s3] > i3.floating[s3] && (c3 = y(c3)), { main: c3, cross: y(c3) };
}
var w = { start: "end", end: "start" };
function v(t2) {
  return t2.replace(/start|end/g, (t3) => w[t3]);
}
var A = function(e2) {
  return void 0 === e2 && (e2 = {}), { name: "flip", options: e2, async fn(o3) {
    var i3;
    const { placement: r3, middlewareData: l3, rects: s3, initialPlacement: f3, platform: m3, elements: u3 } = o3, { mainAxis: g3 = true, crossAxis: d3 = true, fallbackPlacements: p4, fallbackStrategy: h3 = "bestFit", fallbackAxisSideDirection: w3 = "none", flipAlignment: b3 = true, ...A3 } = a(e2, o3), R2 = n(r3), P2 = n(f3) === f3, E3 = await (null == m3.isRTL ? void 0 : m3.isRTL(u3.floating)), T3 = p4 || (P2 || !b3 ? [y(f3)] : function(t2) {
      const e3 = y(t2);
      return [v(t2), e3, v(e3)];
    }(f3));
    p4 || "none" === w3 || T3.push(...function(e3, o4, i4, r4) {
      const a3 = t(e3);
      let l4 = function(t2, e4, n3) {
        const o5 = ["left", "right"], i5 = ["right", "left"], r5 = ["top", "bottom"], a4 = ["bottom", "top"];
        switch (t2) {
          case "top":
          case "bottom":
            return n3 ? e4 ? i5 : o5 : e4 ? o5 : i5;
          case "left":
          case "right":
            return e4 ? r5 : a4;
          default:
            return [];
        }
      }(n(e3), "start" === i4, r4);
      return a3 && (l4 = l4.map((t2) => t2 + "-" + a3), o4 && (l4 = l4.concat(l4.map(v)))), l4;
    }(f3, b3, w3, E3));
    const D3 = [f3, ...T3], L3 = await c(o3, A3), k2 = [];
    let O3 = (null == (i3 = l3.flip) ? void 0 : i3.overflows) || [];
    if (g3 && k2.push(L3[R2]), d3) {
      const { main: t2, cross: e3 } = x(r3, s3, E3);
      k2.push(L3[t2], L3[e3]);
    }
    if (O3 = [...O3, { placement: r3, overflows: k2 }], !k2.every((t2) => t2 <= 0)) {
      var B3, C3;
      const t2 = ((null == (B3 = l3.flip) ? void 0 : B3.index) || 0) + 1, e3 = D3[t2];
      if (e3)
        return { data: { index: t2, overflows: O3 }, reset: { placement: e3 } };
      let n3 = null == (C3 = O3.filter((t3) => t3.overflows[0] <= 0).sort((t3, e4) => t3.overflows[1] - e4.overflows[1])[0]) ? void 0 : C3.placement;
      if (!n3)
        switch (h3) {
          case "bestFit": {
            var H2;
            const t3 = null == (H2 = O3.map((t4) => [t4.placement, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e4) => t5 + e4, 0)]).sort((t4, e4) => t4[1] - e4[1])[0]) ? void 0 : H2[0];
            t3 && (n3 = t3);
            break;
          }
          case "initialPlacement":
            n3 = f3;
        }
      if (r3 !== n3)
        return { reset: { placement: n3 } };
    }
    return {};
  } };
};
function T(t2) {
  const e2 = f(...t2.map((t3) => t3.left)), n3 = f(...t2.map((t3) => t3.top));
  return { x: e2, y: n3, width: m(...t2.map((t3) => t3.right)) - e2, height: m(...t2.map((t3) => t3.bottom)) - n3 };
}
var D = function(t2) {
  return void 0 === t2 && (t2 = {}), { name: "inline", options: t2, async fn(e2) {
    const { placement: i3, elements: r3, rects: c3, platform: u3, strategy: g3 } = e2, { padding: d3 = 2, x: p4, y: h3 } = a(t2, e2), y2 = Array.from(await (null == u3.getClientRects ? void 0 : u3.getClientRects(r3.reference)) || []), x3 = function(t3) {
      const e3 = t3.slice().sort((t4, e4) => t4.y - e4.y), n3 = [];
      let o3 = null;
      for (let t4 = 0; t4 < e3.length; t4++) {
        const i4 = e3[t4];
        !o3 || i4.y - o3.y > o3.height / 2 ? n3.push([i4]) : n3[n3.length - 1].push(i4), o3 = i4;
      }
      return n3.map((t4) => s(T(t4)));
    }(y2), w3 = s(T(y2)), v3 = l(d3);
    const b3 = await u3.getElementRects({ reference: { getBoundingClientRect: function() {
      if (2 === x3.length && x3[0].left > x3[1].right && null != p4 && null != h3)
        return x3.find((t3) => p4 > t3.left - v3.left && p4 < t3.right + v3.right && h3 > t3.top - v3.top && h3 < t3.bottom + v3.bottom) || w3;
      if (x3.length >= 2) {
        if ("x" === o(i3)) {
          const t4 = x3[0], e4 = x3[x3.length - 1], o3 = "top" === n(i3), r5 = t4.top, a4 = e4.bottom, l4 = o3 ? t4.left : e4.left, s4 = o3 ? t4.right : e4.right;
          return { top: r5, bottom: a4, left: l4, right: s4, width: s4 - l4, height: a4 - r5, x: l4, y: r5 };
        }
        const t3 = "left" === n(i3), e3 = m(...x3.map((t4) => t4.right)), r4 = f(...x3.map((t4) => t4.left)), a3 = x3.filter((n3) => t3 ? n3.left === r4 : n3.right === e3), l3 = a3[0].top, s3 = a3[a3.length - 1].bottom;
        return { top: l3, bottom: s3, left: r4, right: e3, width: e3 - r4, height: s3 - l3, x: r4, y: l3 };
      }
      return w3;
    } }, floating: r3.floating, strategy: g3 });
    return c3.reference.x !== b3.reference.x || c3.reference.y !== b3.reference.y || c3.reference.width !== b3.reference.width || c3.reference.height !== b3.reference.height ? { reset: { rects: b3 } } : {};
  } };
};
function k(t2) {
  return "x" === t2 ? "y" : "x";
}
var O = function(t2) {
  return void 0 === t2 && (t2 = {}), { name: "shift", options: t2, async fn(e2) {
    const { x: i3, y: r3, placement: l3 } = e2, { mainAxis: s3 = true, crossAxis: f3 = false, limiter: m3 = { fn: (t3) => {
      let { x: e3, y: n3 } = t3;
      return { x: e3, y: n3 };
    } }, ...g3 } = a(t2, e2), d3 = { x: i3, y: r3 }, p4 = await c(e2, g3), h3 = o(n(l3)), y2 = k(h3);
    let x3 = d3[h3], w3 = d3[y2];
    if (s3) {
      const t3 = "y" === h3 ? "bottom" : "right";
      x3 = u(x3 + p4["y" === h3 ? "top" : "left"], x3, x3 - p4[t3]);
    }
    if (f3) {
      const t3 = "y" === y2 ? "bottom" : "right";
      w3 = u(w3 + p4["y" === y2 ? "top" : "left"], w3, w3 - p4[t3]);
    }
    const v3 = m3.fn({ ...e2, [h3]: x3, [y2]: w3 });
    return { ...v3, data: { x: v3.x - i3, y: v3.y - r3 } };
  } };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
function n2(t2) {
  var e2;
  return (null == (e2 = t2.ownerDocument) ? void 0 : e2.defaultView) || window;
}
function o2(t2) {
  return n2(t2).getComputedStyle(t2);
}
function i2(t2) {
  return t2 instanceof n2(t2).Node;
}
function r2(t2) {
  return i2(t2) ? (t2.nodeName || "").toLowerCase() : "#document";
}
function c2(t2) {
  return t2 instanceof n2(t2).HTMLElement;
}
function l2(t2) {
  return t2 instanceof n2(t2).Element;
}
function s2(t2) {
  return "undefined" != typeof ShadowRoot && (t2 instanceof n2(t2).ShadowRoot || t2 instanceof ShadowRoot);
}
function f2(t2) {
  const { overflow: e2, overflowX: n3, overflowY: i3, display: r3 } = o2(t2);
  return /auto|scroll|overlay|hidden|clip/.test(e2 + i3 + n3) && !["inline", "contents"].includes(r3);
}
function u2(t2) {
  return ["table", "td", "th"].includes(r2(t2));
}
function a2(t2) {
  const e2 = d2(), n3 = o2(t2);
  return "none" !== n3.transform || "none" !== n3.perspective || !!n3.containerType && "normal" !== n3.containerType || !e2 && !!n3.backdropFilter && "none" !== n3.backdropFilter || !e2 && !!n3.filter && "none" !== n3.filter || ["transform", "perspective", "filter"].some((t3) => (n3.willChange || "").includes(t3)) || ["paint", "layout", "strict", "content"].some((t3) => (n3.contain || "").includes(t3));
}
function d2() {
  return !("undefined" == typeof CSS || !CSS.supports) && CSS.supports("-webkit-backdrop-filter", "none");
}
function h2(t2) {
  return ["html", "body", "#document"].includes(r2(t2));
}
var p2 = Math.min;
var m2 = Math.max;
var g2 = Math.round;
var w2 = (t2) => ({ x: t2, y: t2 });
function x2(t2) {
  const e2 = o2(t2);
  let n3 = parseFloat(e2.width) || 0, i3 = parseFloat(e2.height) || 0;
  const r3 = c2(t2), l3 = r3 ? t2.offsetWidth : n3, s3 = r3 ? t2.offsetHeight : i3, f3 = g2(n3) !== l3 || g2(i3) !== s3;
  return f3 && (n3 = l3, i3 = s3), { width: n3, height: i3, $: f3 };
}
function v2(t2) {
  return l2(t2) ? t2 : t2.contextElement;
}
function b2(t2) {
  const e2 = v2(t2);
  if (!c2(e2))
    return w2(1);
  const n3 = e2.getBoundingClientRect(), { width: o3, height: i3, $: r3 } = x2(e2);
  let l3 = (r3 ? g2(n3.width) : n3.width) / o3, s3 = (r3 ? g2(n3.height) : n3.height) / i3;
  return l3 && Number.isFinite(l3) || (l3 = 1), s3 && Number.isFinite(s3) || (s3 = 1), { x: l3, y: s3 };
}
var L2 = w2(0);
function T2(t2, e2, o3) {
  var i3, r3;
  if (void 0 === e2 && (e2 = true), !d2())
    return L2;
  const c3 = t2 ? n2(t2) : window;
  return !o3 || e2 && o3 !== c3 ? L2 : { x: (null == (i3 = c3.visualViewport) ? void 0 : i3.offsetLeft) || 0, y: (null == (r3 = c3.visualViewport) ? void 0 : r3.offsetTop) || 0 };
}
function R(e2, o3, i3, r3) {
  void 0 === o3 && (o3 = false), void 0 === i3 && (i3 = false);
  const c3 = e2.getBoundingClientRect(), s3 = v2(e2);
  let f3 = w2(1);
  o3 && (r3 ? l2(r3) && (f3 = b2(r3)) : f3 = b2(e2));
  const u3 = T2(s3, i3, r3);
  let a3 = (c3.left + u3.x) / f3.x, d3 = (c3.top + u3.y) / f3.y, h3 = c3.width / f3.x, p4 = c3.height / f3.y;
  if (s3) {
    const t2 = n2(s3), e3 = r3 && l2(r3) ? n2(r3) : r3;
    let o4 = t2.frameElement;
    for (; o4 && r3 && e3 !== t2; ) {
      const t3 = b2(o4), e4 = o4.getBoundingClientRect(), i4 = getComputedStyle(o4), r4 = e4.left + (o4.clientLeft + parseFloat(i4.paddingLeft)) * t3.x, c4 = e4.top + (o4.clientTop + parseFloat(i4.paddingTop)) * t3.y;
      a3 *= t3.x, d3 *= t3.y, h3 *= t3.x, p4 *= t3.y, a3 += r4, d3 += c4, o4 = n2(o4).frameElement;
    }
  }
  return s({ width: h3, height: p4, x: a3, y: d3 });
}
function S(t2) {
  return ((i2(t2) ? t2.ownerDocument : t2.document) || window.document).documentElement;
}
function E2(t2) {
  return l2(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function C2(t2) {
  return R(S(t2)).left + E2(t2).scrollLeft;
}
function F(t2) {
  if ("html" === r2(t2))
    return t2;
  const e2 = t2.assignedSlot || t2.parentNode || s2(t2) && t2.host || S(t2);
  return s2(e2) ? e2.host : e2;
}
function O2(t2) {
  const e2 = F(t2);
  return h2(e2) ? t2.ownerDocument ? t2.ownerDocument.body : t2.body : c2(e2) && f2(e2) ? e2 : O2(e2);
}
function D2(t2, e2) {
  var o3;
  void 0 === e2 && (e2 = []);
  const i3 = O2(t2), r3 = i3 === (null == (o3 = t2.ownerDocument) ? void 0 : o3.body), c3 = n2(i3);
  return r3 ? e2.concat(c3, c3.visualViewport || [], f2(i3) ? i3 : []) : e2.concat(i3, D2(i3));
}
function W(e2, i3, r3) {
  let s3;
  if ("viewport" === i3)
    s3 = function(t2, e3) {
      const o3 = n2(t2), i4 = S(t2), r4 = o3.visualViewport;
      let c3 = i4.clientWidth, l3 = i4.clientHeight, s4 = 0, f3 = 0;
      if (r4) {
        c3 = r4.width, l3 = r4.height;
        const t3 = d2();
        (!t3 || t3 && "fixed" === e3) && (s4 = r4.offsetLeft, f3 = r4.offsetTop);
      }
      return { width: c3, height: l3, x: s4, y: f3 };
    }(e2, r3);
  else if ("document" === i3)
    s3 = function(t2) {
      const e3 = S(t2), n3 = E2(t2), i4 = t2.ownerDocument.body, r4 = m2(e3.scrollWidth, e3.clientWidth, i4.scrollWidth, i4.clientWidth), c3 = m2(e3.scrollHeight, e3.clientHeight, i4.scrollHeight, i4.clientHeight);
      let l3 = -n3.scrollLeft + C2(t2);
      const s4 = -n3.scrollTop;
      return "rtl" === o2(i4).direction && (l3 += m2(e3.clientWidth, i4.clientWidth) - r4), { width: r4, height: c3, x: l3, y: s4 };
    }(S(e2));
  else if (l2(i3))
    s3 = function(t2, e3) {
      const n3 = R(t2, true, "fixed" === e3), o3 = n3.top + t2.clientTop, i4 = n3.left + t2.clientLeft, r4 = c2(t2) ? b2(t2) : w2(1);
      return { width: t2.clientWidth * r4.x, height: t2.clientHeight * r4.y, x: i4 * r4.x, y: o3 * r4.y };
    }(i3, r3);
  else {
    const t2 = T2(e2);
    s3 = { ...i3, x: i3.x - t2.x, y: i3.y - t2.y };
  }
  return s(s3);
}
function H(t2, e2) {
  const n3 = F(t2);
  return !(n3 === e2 || !l2(n3) || h2(n3)) && ("fixed" === o2(n3).position || H(n3, e2));
}
function z(t2, e2) {
  return c2(t2) && "fixed" !== o2(t2).position ? e2 ? e2(t2) : t2.offsetParent : null;
}
function M(t2, e2) {
  const i3 = n2(t2);
  if (!c2(t2))
    return i3;
  let l3 = z(t2, e2);
  for (; l3 && u2(l3) && "static" === o2(l3).position; )
    l3 = z(l3, e2);
  return l3 && ("html" === r2(l3) || "body" === r2(l3) && "static" === o2(l3).position && !a2(l3)) ? i3 : l3 || function(t3) {
    let e3 = F(t3);
    for (; c2(e3) && !h2(e3); ) {
      if (a2(e3))
        return e3;
      e3 = F(e3);
    }
    return null;
  }(t2) || i3;
}
function P(t2, e2, n3) {
  const o3 = c2(e2), i3 = S(e2), l3 = "fixed" === n3, s3 = R(t2, true, l3, e2);
  let u3 = { scrollLeft: 0, scrollTop: 0 };
  const a3 = w2(0);
  if (o3 || !o3 && !l3)
    if (("body" !== r2(e2) || f2(i3)) && (u3 = E2(e2)), c2(e2)) {
      const t3 = R(e2, true, l3, e2);
      a3.x = t3.x + e2.clientLeft, a3.y = t3.y + e2.clientTop;
    } else
      i3 && (a3.x = C2(i3));
  return { x: s3.left + u3.scrollLeft - a3.x, y: s3.top + u3.scrollTop - a3.y, width: s3.width, height: s3.height };
}
var A2 = { getClippingRect: function(t2) {
  let { element: e2, boundary: n3, rootBoundary: i3, strategy: c3 } = t2;
  const s3 = "clippingAncestors" === n3 ? function(t3, e3) {
    const n4 = e3.get(t3);
    if (n4)
      return n4;
    let i4 = D2(t3).filter((t4) => l2(t4) && "body" !== r2(t4)), c4 = null;
    const s4 = "fixed" === o2(t3).position;
    let u4 = s4 ? F(t3) : t3;
    for (; l2(u4) && !h2(u4); ) {
      const e4 = o2(u4), n5 = a2(u4);
      n5 || "fixed" !== e4.position || (c4 = null), (s4 ? !n5 && !c4 : !n5 && "static" === e4.position && c4 && ["absolute", "fixed"].includes(c4.position) || f2(u4) && !n5 && H(t3, u4)) ? i4 = i4.filter((t4) => t4 !== u4) : c4 = e4, u4 = F(u4);
    }
    return e3.set(t3, i4), i4;
  }(e2, this._c) : [].concat(n3), u3 = [...s3, i3], d3 = u3[0], g3 = u3.reduce((t3, n4) => {
    const o3 = W(e2, n4, c3);
    return t3.top = m2(o3.top, t3.top), t3.right = p2(o3.right, t3.right), t3.bottom = p2(o3.bottom, t3.bottom), t3.left = m2(o3.left, t3.left), t3;
  }, W(e2, d3, c3));
  return { width: g3.right - g3.left, height: g3.bottom - g3.top, x: g3.left, y: g3.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e2, offsetParent: n3, strategy: o3 } = t2;
  const i3 = c2(n3), l3 = S(n3);
  if (n3 === l3)
    return e2;
  let s3 = { scrollLeft: 0, scrollTop: 0 }, u3 = w2(1);
  const a3 = w2(0);
  if ((i3 || !i3 && "fixed" !== o3) && (("body" !== r2(n3) || f2(l3)) && (s3 = E2(n3)), c2(n3))) {
    const t3 = R(n3);
    u3 = b2(n3), a3.x = t3.x + n3.clientLeft, a3.y = t3.y + n3.clientTop;
  }
  return { width: e2.width * u3.x, height: e2.height * u3.y, x: e2.x * u3.x - s3.scrollLeft * u3.x + a3.x, y: e2.y * u3.y - s3.scrollTop * u3.y + a3.y };
}, isElement: l2, getDimensions: function(t2) {
  return x2(t2);
}, getOffsetParent: M, getDocumentElement: S, getScale: b2, async getElementRects(t2) {
  let { reference: e2, floating: n3, strategy: o3 } = t2;
  const i3 = this.getOffsetParent || M, r3 = this.getDimensions;
  return { reference: P(e2, await i3(n3), o3), floating: { x: 0, y: 0, ...await r3(n3) } };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === o2(t2).direction };
var B2 = (t2, n3, o3) => {
  const i3 = /* @__PURE__ */ new Map(), r3 = { platform: A2, ...o3 }, c3 = { ...r3.platform, _c: i3 };
  return r(t2, n3, { ...r3, platform: c3 });
};

// node_modules/github-slugger/index.js
var own = Object.hasOwnProperty;

// quartz/util/path.ts
var _rebaseHtmlElement = (el, attr, newBase) => {
  const rebased = new URL(el.getAttribute(attr), newBase);
  el.setAttribute(attr, rebased.pathname + rebased.hash);
};
function normalizeRelativeURLs(el, destination) {
  el.querySelectorAll('[href^="./"], [href^="../"]').forEach(
    (item) => _rebaseHtmlElement(item, "href", destination)
  );
  el.querySelectorAll('[src^="./"], [src^="../"]').forEach(
    (item) => _rebaseHtmlElement(item, "src", destination)
  );
}

// quartz/components/scripts/quartz/components/scripts/popover.inline.ts
var p3 = new DOMParser();
async function mouseEnterHandler({ clientX, clientY }) {
  const link = this;
  if (link.dataset.noPopover === "true") {
    return;
  }
  async function setPosition(popoverElement2) {
    const { x: x3, y: y2 } = await B2(link, popoverElement2, {
      middleware: [D({ x: clientX, y: clientY }), O(), A()]
    });
    Object.assign(popoverElement2.style, {
      left: `${x3}px`,
      top: `${y2}px`
    });
  }
  const hasAlreadyBeenFetched = () => [...link.children].some((child) => child.classList.contains("popover"));
  if (hasAlreadyBeenFetched()) {
    return setPosition(link.lastChild);
  }
  const thisUrl = new URL(document.location.href);
  thisUrl.hash = "";
  thisUrl.search = "";
  const targetUrl = new URL(link.href);
  const hash = targetUrl.hash;
  targetUrl.hash = "";
  targetUrl.search = "";
  const contents = await fetch(`${targetUrl}`).then((res) => res.text()).catch((err) => {
    console.error(err);
  });
  if (hasAlreadyBeenFetched()) {
    return;
  }
  if (!contents)
    return;
  const html = p3.parseFromString(contents, "text/html");
  normalizeRelativeURLs(html, targetUrl);
  const elts = [...html.getElementsByClassName("popover-hint")];
  if (elts.length === 0)
    return;
  const popoverElement = document.createElement("div");
  popoverElement.classList.add("popover");
  const popoverInner = document.createElement("div");
  popoverInner.classList.add("popover-inner");
  popoverElement.appendChild(popoverInner);
  elts.forEach((elt) => popoverInner.appendChild(elt));
  setPosition(popoverElement);
  link.appendChild(popoverElement);
  if (hash !== "") {
    const heading = popoverInner.querySelector(hash);
    if (heading) {
      popoverInner.scroll({ top: heading.offsetTop - 12, behavior: "instant" });
    }
  }
}
document.addEventListener("nav", () => {
  const links = [...document.getElementsByClassName("internal")];
  for (const link of links) {
    link.removeEventListener("mouseenter", mouseEnterHandler);
    link.addEventListener("mouseenter", mouseEnterHandler);
  }
});
})();
(function () {// node_modules/micromorph/dist/index.js
var T = (e) => (t, r) => t[`node${e}`] === r[`node${e}`];
var b = T("Name");
var C = T("Type");
var g = T("Value");
function M(e, t) {
  if (e.attributes.length === 0 && t.attributes.length === 0)
    return [];
  let r = [], n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (let s of e.attributes)
    n.set(s.name, s.value);
  for (let s of t.attributes) {
    let a = n.get(s.name);
    s.value === a ? n.delete(s.name) : (typeof a < "u" && n.delete(s.name), o.set(s.name, s.value));
  }
  for (let s of n.keys())
    r.push({ type: 5, name: s });
  for (let [s, a] of o.entries())
    r.push({ type: 4, name: s, value: a });
  return r;
}
function N(e, t = true) {
  let r = `${e.localName}`;
  for (let { name: n, value: o } of e.attributes)
    t && n.startsWith("data-") || (r += `[${n}=${o}]`);
  return r += e.innerHTML, r;
}
function h(e) {
  switch (e.tagName) {
    case "BASE":
    case "TITLE":
      return e.localName;
    case "META": {
      if (e.hasAttribute("name"))
        return `meta[name="${e.getAttribute("name")}"]`;
      if (e.hasAttribute("property"))
        return `meta[name="${e.getAttribute("property")}"]`;
      break;
    }
    case "LINK": {
      if (e.hasAttribute("rel") && e.hasAttribute("href"))
        return `link[rel="${e.getAttribute("rel")}"][href="${e.getAttribute("href")}"]`;
      if (e.hasAttribute("href"))
        return `link[href="${e.getAttribute("href")}"]`;
      break;
    }
  }
  return N(e);
}
function x(e) {
  let [t, r = ""] = e.split("?");
  return `${t}?t=${Date.now()}&${r.replace(/t=\d+/g, "")}`;
}
function c(e) {
  if (e.nodeType === 1 && e.hasAttribute("data-persist"))
    return e;
  if (e.nodeType === 1 && e.localName === "script") {
    let t = document.createElement("script");
    for (let { name: r, value: n } of e.attributes)
      r === "src" && (n = x(n)), t.setAttribute(r, n);
    return t.innerHTML = e.innerHTML, t;
  }
  return e.cloneNode(true);
}
function R(e, t) {
  if (e.children.length === 0 && t.children.length === 0)
    return [];
  let r = [], n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (let a of e.children)
    n.set(h(a), a);
  for (let a of t.children) {
    let i = h(a), u = n.get(i);
    u ? N(a, false) !== N(u, false) && o.set(i, c(a)) : s.set(i, c(a)), n.delete(i);
  }
  for (let a of e.childNodes) {
    if (a.nodeType === 1) {
      let i = h(a);
      if (n.has(i)) {
        r.push({ type: 1 });
        continue;
      } else if (o.has(i)) {
        let u = o.get(i);
        r.push({ type: 3, attributes: M(a, u), children: I(a, u) });
        continue;
      }
    }
    r.push(void 0);
  }
  for (let a of s.values())
    r.push({ type: 0, node: c(a) });
  return r;
}
function I(e, t) {
  let r = [], n = Math.max(e.childNodes.length, t.childNodes.length);
  for (let o = 0; o < n; o++) {
    let s = e.childNodes.item(o), a = t.childNodes.item(o);
    r[o] = p(s, a);
  }
  return r;
}
function p(e, t) {
  if (!e)
    return { type: 0, node: c(t) };
  if (!t)
    return { type: 1 };
  if (C(e, t)) {
    if (e.nodeType === 3) {
      let r = e.nodeValue, n = t.nodeValue;
      if (r.trim().length === 0 && n.trim().length === 0)
        return;
    }
    if (e.nodeType === 1) {
      if (b(e, t)) {
        let r = e.tagName === "HEAD" ? R : I;
        return { type: 3, attributes: M(e, t), children: r(e, t) };
      }
      return { type: 2, node: c(t) };
    } else
      return e.nodeType === 9 ? p(e.documentElement, t.documentElement) : g(e, t) ? void 0 : { type: 2, value: t.nodeValue };
  }
  return { type: 2, node: c(t) };
}
function $(e, t) {
  if (t.length !== 0)
    for (let { type: r, name: n, value: o } of t)
      r === 5 ? e.removeAttribute(n) : r === 4 && e.setAttribute(n, o);
}
async function O(e, t, r) {
  if (!t)
    return;
  let n;
  switch (e.nodeType === 9 ? (e = e.documentElement, n = e) : r ? n = r : n = e, t.type) {
    case 0: {
      let { node: o } = t;
      e.appendChild(o);
      return;
    }
    case 1: {
      if (!n)
        return;
      e.removeChild(n);
      return;
    }
    case 2: {
      if (!n)
        return;
      let { node: o, value: s } = t;
      if (typeof s == "string") {
        n.nodeValue = s;
        return;
      }
      n.replaceWith(o);
      return;
    }
    case 3: {
      if (!n)
        return;
      let { attributes: o, children: s } = t;
      $(n, o);
      let a = Array.from(n.childNodes);
      await Promise.all(s.map((i, u) => O(n, i, a[u])));
      return;
    }
  }
}
function P(e, t) {
  let r = p(e, t);
  return O(e, r);
}

// node_modules/github-slugger/index.js
var own = Object.hasOwnProperty;

// quartz/util/path.ts
function getFullSlug(window2) {
  const res = window2.document.body.dataset.slug;
  return res;
}
var _rebaseHtmlElement = (el, attr, newBase) => {
  const rebased = new URL(el.getAttribute(attr), newBase);
  el.setAttribute(attr, rebased.pathname + rebased.hash);
};
function normalizeRelativeURLs(el, destination) {
  el.querySelectorAll('[href^="./"], [href^="../"]').forEach(
    (item) => _rebaseHtmlElement(item, "href", destination)
  );
  el.querySelectorAll('[src^="./"], [src^="../"]').forEach(
    (item) => _rebaseHtmlElement(item, "src", destination)
  );
}

// quartz/components/scripts/quartz/components/scripts/spa.inline.ts
var NODE_TYPE_ELEMENT = 1;
var announcer = document.createElement("route-announcer");
var isElement = (target) => target?.nodeType === NODE_TYPE_ELEMENT;
var isLocalUrl = (href) => {
  try {
    const url = new URL(href);
    if (window.location.origin === url.origin) {
      return true;
    }
  } catch (e) {
  }
  return false;
};
var isSamePage = (url) => {
  const sameOrigin = url.origin === window.location.origin;
  const samePath = url.pathname === window.location.pathname;
  return sameOrigin && samePath;
};
var getOpts = ({ target }) => {
  if (!isElement(target))
    return;
  if (target.attributes.getNamedItem("target")?.value === "_blank")
    return;
  const a = target.closest("a");
  if (!a)
    return;
  if ("routerIgnore" in a.dataset)
    return;
  const { href } = a;
  if (!isLocalUrl(href))
    return;
  return { url: new URL(href), scroll: "routerNoscroll" in a.dataset ? false : void 0 };
};
function notifyNav(url) {
  const event = new CustomEvent("nav", { detail: { url } });
  document.dispatchEvent(event);
}
var p2;
async function navigate(url, isBack = false) {
  p2 = p2 || new DOMParser();
  const contents = await fetch(`${url}`).then((res) => {
    const contentType = res.headers.get("content-type");
    if (contentType?.startsWith("text/html")) {
      return res.text();
    } else {
      window.location.assign(url);
    }
  }).catch(() => {
    window.location.assign(url);
  });
  if (!contents)
    return;
  const html = p2.parseFromString(contents, "text/html");
  normalizeRelativeURLs(html, url);
  let title = html.querySelector("title")?.textContent;
  if (title) {
    document.title = title;
  } else {
    const h1 = document.querySelector("h1");
    title = h1?.innerText ?? h1?.textContent ?? url.pathname;
  }
  if (announcer.textContent !== title) {
    announcer.textContent = title;
  }
  announcer.dataset.persist = "";
  html.body.appendChild(announcer);
  P(document.body, html.body);
  if (!isBack) {
    if (url.hash) {
      const el = document.getElementById(decodeURIComponent(url.hash.substring(1)));
      el?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0 });
    }
  }
  const elementsToRemove = document.head.querySelectorAll(":not([spa-preserve])");
  elementsToRemove.forEach((el) => el.remove());
  const elementsToAdd = html.head.querySelectorAll(":not([spa-preserve])");
  elementsToAdd.forEach((el) => document.head.appendChild(el));
  if (!isBack) {
    history.pushState({}, "", url);
  }
  notifyNav(getFullSlug(window));
  delete announcer.dataset.persist;
}
window.spaNavigate = navigate;
function createRouter() {
  if (typeof window !== "undefined") {
    window.addEventListener("click", async (event) => {
      const { url } = getOpts(event) ?? {};
      if (!url || event.ctrlKey || event.metaKey)
        return;
      event.preventDefault();
      if (isSamePage(url) && url.hash) {
        const el = document.getElementById(decodeURIComponent(url.hash.substring(1)));
        el?.scrollIntoView();
        history.pushState({}, "", url);
        return;
      }
      try {
        navigate(url, false);
      } catch (e) {
        window.location.assign(url);
      }
    });
    window.addEventListener("popstate", (event) => {
      const { url } = getOpts(event) ?? {};
      if (window.location.hash && window.location.pathname === url?.pathname)
        return;
      try {
        navigate(new URL(window.location.toString()), true);
      } catch (e) {
        window.location.reload();
      }
      return;
    });
  }
  return new class Router {
    go(pathname) {
      const url = new URL(pathname, window.location.toString());
      return navigate(url, false);
    }
    back() {
      return window.history.back();
    }
    forward() {
      return window.history.forward();
    }
  }();
}
createRouter();
notifyNav(getFullSlug(window));
if (!customElements.get("route-announcer")) {
  const attrs = {
    "aria-live": "assertive",
    "aria-atomic": "true",
    style: "position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"
  };
  customElements.define(
    "route-announcer",
    class RouteAnnouncer extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        for (const [key, value] of Object.entries(attrs)) {
          this.setAttribute(key, value);
        }
      }
    }
  );
}
})();