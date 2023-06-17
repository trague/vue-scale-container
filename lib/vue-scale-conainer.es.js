import { isVue2 as f, h as a, defineComponent as w, ref as d, watchEffect as m, onMounted as v, onUnmounted as g } from "vue-demi";
const p = (e) => e ? Object.entries(e).reduce((t, [n, i]) => (n = n.charAt(0).toUpperCase() + n.slice(1), n = `on${n}`, { ...t, [n]: i }), {}) : {};
function c(e, t = {}, n) {
  if (f)
    return a(e, t, n);
  const { props: i, domProps: o, on: l, ...h } = t, u = l ? p(l) : {};
  return a(e, { ...h, ...i, ...o, ...u }, n);
}
const y = (e) => typeof e == "function" ? e() : e;
let r;
const x = (e) => {
  var l;
  if (r !== void 0)
    return r;
  const t = document.createElement("div");
  t.className = `${e}-scrollbar__wrap`, t.style.visibility = "hidden", t.style.width = "100px", t.style.position = "absolute", t.style.top = "-9999px", document.body.appendChild(t);
  const n = t.offsetWidth;
  t.style.overflow = "scroll";
  const i = document.createElement("div");
  i.style.width = "100%", t.appendChild(i);
  const o = i.offsetWidth;
  return (l = t.parentNode) == null || l.removeChild(t), r = n - o, r;
}, s = w({
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
    const t = d(1), n = d(1);
    m(() => {
      document.documentElement.style.setProperty("--scale-x", t.value), document.documentElement.style.setProperty("--scale-y", n.value);
    });
    const i = () => {
      if (e.fit === "fill")
        t.value = window.innerWidth / e.width, n.value = window.innerHeight / e.height;
      else if (e.fit === "w-full") {
        if (t.value = window.innerWidth / e.width, n.value = t.value, t.value > window.innerHeight / e.height) {
          const o = x(""), l = (window.innerWidth - o) / e.width;
          l < window.innerHeight / e.height ? n.value = window.innerHeight / e.height : (t.value = l, n.value = l);
        }
      } else
        console.warn(`vue-scale-container.fit不支持${e.fit}参数`);
    };
    return v(() => {
      i(), window.addEventListener("resize", i);
    }), g(() => {
      window.removeEventListener("resize", i);
    }), {
      scaleX: t,
      scaleY: n
      // el
    };
  },
  render() {
    const { height: e, width: t, scaleX: n, scaleY: i } = this;
    return c(
      "div",
      {
        class: "scale-container-wrap",
        style: {
          height: e * i + "px",
          width: t * n + "px",
          overflow: "hidden"
        }
        // ref: 'el'
      },
      [
        c(
          "div",
          {
            class: "scale-container",
            style: {
              height: e + "px",
              width: t + "px",
              transform: `scaleX(${n}) scaleY(${i})`,
              transformOrigin: "0 0"
            }
          },
          [this.$slots.default ? y(this.$slots.default) : void 0]
        )
      ]
    );
  }
});
s.install = function(e) {
  e.component(s.name, s);
};
export {
  s as default
};
