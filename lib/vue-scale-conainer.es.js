import { isVue2 as w, h as f, defineComponent as g, ref as s, watchEffect as v, onMounted as H, onUnmounted as x } from "vue-demi";
const y = (e) => e ? Object.entries(e).reduce((t, [i, n]) => (i = i.charAt(0).toUpperCase() + i.slice(1), i = `on${i}`, { ...t, [i]: n }), {}) : {};
function m(e, t = {}, i) {
  if (w)
    return f(e, t, i);
  const { props: n, domProps: c, on: h, ...o } = t, d = h ? y(h) : {};
  return f(e, { ...o, ...n, ...c, ...d }, i);
}
const b = (e) => typeof e == "function" ? e() : e;
let r;
const W = (e) => {
  var h;
  if (r !== void 0)
    return r;
  const t = document.createElement("div");
  t.className = `${e}-scrollbar__wrap`, t.style.visibility = "hidden", t.style.width = "100px", t.style.position = "absolute", t.style.top = "-9999px", document.body.appendChild(t);
  const i = t.offsetWidth;
  t.style.overflow = "scroll";
  const n = document.createElement("div");
  n.style.width = "100%", t.appendChild(n);
  const c = n.offsetWidth;
  return (h = t.parentNode) == null || h.removeChild(t), r = i - c, r;
}, u = g({
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
    const t = s(1), i = s(1), n = s(e.height);
    v(() => {
      document.documentElement.style.setProperty("--scale-x", t.value), document.documentElement.style.setProperty("--scale-y", i.value);
    });
    const c = () => {
      if ((!e.minHeight || e.minHeight > e.height) && (!e.maxHeight || e.maxHeight < e.height)) {
        n.value = e.height;
        return;
      }
      const o = window.innerWidth / e.width, d = window.innerHeight / e.height;
      if (o === d) {
        n.value = e.height;
        return;
      }
      const l = o * window.innerHeight;
      let a = e.height;
      l < e.height && e.minHeight ? e.minHeight < l ? a = l : e.minHeight >= l && (a = e.minHeight) : l > e.height && e.maxHeight && (e.maxHeight > l ? a = l : e.maxHeight <= l && (a = e.maxHeight)), n.value = a;
    }, h = () => {
      c();
      const o = e.width, d = n.value;
      if (e.fit === "fill")
        t.value = window.innerWidth / o, i.value = window.innerHeight / d;
      else if (e.fit === "w-full") {
        if (t.value = window.innerWidth / o, i.value = t.value, t.value > window.innerHeight / d) {
          const l = W(""), a = (window.innerWidth - l) / o;
          a < window.innerHeight / d ? i.value = window.innerHeight / d : (t.value = a, i.value = a);
        }
      } else
        console.warn(`vue-scale-container.fit不支持${e.fit}参数`);
    };
    return H(() => {
      h(), window.addEventListener("resize", h);
    }), x(() => {
      window.removeEventListener("resize", h);
    }), {
      scaleX: t,
      scaleY: i,
      domHeight: n
      // el
    };
  },
  render() {
    const { domHeight: e, width: t, scaleX: i, scaleY: n } = this;
    return m(
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
        m(
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
          [this.$slots.default ? b(this.$slots.default) : void 0]
        )
      ]
    );
  }
});
u.install = function(e) {
  e.component(u.name, u);
};
export {
  u as default
};
