import { isVue2 as v, h as w, defineComponent as H, ref as s, watchEffect as x, onMounted as y, onUnmounted as b, nextTick as W } from "vue-demi";
const $ = (e) => e ? Object.entries(e).reduce((t, [i, n]) => (i = i.charAt(0).toUpperCase() + i.slice(1), i = `on${i}`, { ...t, [i]: n }), {}) : {};
function g(e, t = {}, i) {
  if (v)
    return w(e, t, i);
  const { props: n, domProps: a, on: o, ...c } = t, d = o ? $(o) : {};
  return w(e, { ...c, ...n, ...a, ...d }, i);
}
const C = (e) => typeof e == "function" ? e() : e;
let u;
const E = (e) => {
  var o;
  if (u !== void 0)
    return u;
  const t = document.createElement("div");
  t.className = `${e}-scrollbar__wrap`, t.style.visibility = "hidden", t.style.width = "100px", t.style.position = "absolute", t.style.top = "-9999px", document.body.appendChild(t);
  const i = t.offsetWidth;
  t.style.overflow = "scroll";
  const n = document.createElement("div");
  n.style.width = "100%", t.appendChild(n);
  const a = n.offsetWidth;
  return (o = t.parentNode) == null || o.removeChild(t), u = i - a, u;
}, m = H({
  name: "VueScaleContainer",
  props: {
    /**
     * 设计图像素宽度
     * @default 1920
     */
    width: {
      type: Number,
      default: 1920
    },
    /**
     * 设计图像素高度
     * @default 1080
     */
    height: {
      type: Number,
      default: 1080
    },
    /**
     * 代码最小支持尺寸，为0时忽略此设置
     * @default 0
     */
    minHeight: {
      type: Number,
      default: 0
    },
    /**
     * 代码最大支持尺寸，为0时忽略此设置
     * @default 0
     */
    maxHeight: {
      type: Number,
      default: 0
    },
    /**
     * resize事件，重新渲染slot内容
     */
    forceUpdateOnResize: {
      type: Boolean,
      default: !1
    },
    /**
     * 缩放类型
     * fill: 填充满，会变形
     *
     * @default fill
     */
    fit: {
      type: String,
      default: "fill"
    }
  },
  setup(e) {
    const t = s(!0), i = s(1), n = s(1), a = s(e.height);
    x(() => {
      document.documentElement.style.setProperty("--scale-x", i.value), document.documentElement.style.setProperty("--scale-y", n.value);
    });
    const o = () => {
      if ((!e.minHeight || e.minHeight > e.height) && (!e.maxHeight || e.maxHeight < e.height)) {
        a.value = e.height;
        return;
      }
      const d = window.innerWidth / e.width, r = window.innerHeight / e.height;
      if (d === r) {
        a.value = e.height;
        return;
      }
      const l = d * window.innerHeight;
      let h = e.height;
      l < e.height && e.minHeight ? e.minHeight < l ? h = l : e.minHeight >= l && (h = e.minHeight) : l > e.height && e.maxHeight && (e.maxHeight > l ? h = l : e.maxHeight <= l && (h = e.maxHeight)), a.value = h;
    }, c = (d) => {
      o();
      const r = e.width, l = a.value;
      if (e.fit === "fill")
        i.value = window.innerWidth / r, n.value = window.innerHeight / l;
      else if (e.fit === "w-full") {
        if (i.value = window.innerWidth / r, n.value = i.value, i.value > window.innerHeight / l) {
          const h = E(""), f = (window.innerWidth - h) / r;
          f < window.innerHeight / l ? n.value = window.innerHeight / l : (i.value = f, n.value = f);
        }
      } else
        console.warn(`vue-scale-container.fit不支持${e.fit}参数`);
      d && e.forceUpdateOnResize && (t.value = !1, W(() => {
        t.value = !0;
      }));
    };
    return y(() => {
      c(), window.addEventListener("resize", c);
    }), b(() => {
      window.removeEventListener("resize", c);
    }), {
      scaleX: i,
      scaleY: n,
      domHeight: a,
      renderSlot: t
      // el
    };
  },
  render() {
    const { domHeight: e, width: t, scaleX: i, scaleY: n, renderSlot: a, forceUpdateOnResize: o } = this;
    return g(
      "div",
      {
        class: "scale-container-wrap",
        style: {
          height: e * n + "px",
          width: t * i + "px",
          overflow: "hidden"
        }
        // ref: 'el'
      },
      [
        g(
          "div",
          {
            class: "scale-container",
            style: {
              height: e + "px",
              width: t + "px",
              transform: `scaleX(${i}) scaleY(${n})`,
              transformOrigin: "0 0"
            }
          },
          [
            this.$slots.default && (!o || a) ? C(this.$slots.default) : void 0
          ]
        )
      ]
    );
  }
});
m.install = function(e) {
  e.component(m.name, m);
};
export {
  m as default
};
