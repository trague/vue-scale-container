import { watchEffect, ref, onMounted, onUnmounted, defineComponent, nextTick } from 'vue-demi'
import h, { slot } from '../../utils/h-demi'
import type { PropType } from 'vue-demi'
import { getScrollBarWidth } from '../../utils/scrollbar-width'

export default defineComponent({
  name: 'VueScaleContainer',
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
      default: false
    },

    /**
     * 缩放类型
     * fill: 填充满，会变形
     *
     * @default fill
     */
    fit: {
      type: String as PropType<'fill' | 'w-full'>,
      default: 'fill'
    }
  },

  setup(props) {
    const renderSlot = ref(true)
    const scaleX = ref(1)
    const scaleY = ref(1)
    const domHeight = ref(props.height)
    // const el = ref()

    watchEffect(() => {
      document.documentElement.style.setProperty('--scale-x', scaleX.value as unknown as string)
      document.documentElement.style.setProperty('--scale-y', scaleY.value as unknown as string)
    })

    const calcDomHeight = () => {
      // 最大最小高度不合法，不再计算，使用设计图高度
      if (
        (!props.minHeight || props.minHeight > props.height) &&
        (!props.maxHeight || props.maxHeight < props.height)
      ) {
        domHeight.value = props.height
        return
      }
      const xRatio = window.innerWidth / props.width
      const yRatio = window.innerHeight / props.height
      // 缩放比率相同，不再计算，使用设计图高度
      if (xRatio === yRatio) {
        domHeight.value = props.height
        return
      }
      const ratioHeight = xRatio * window.innerHeight
      let _domHeight = props.height
      if (ratioHeight < props.height && props.minHeight) {
        if (props.minHeight < ratioHeight) {
          _domHeight = ratioHeight
        } else if (props.minHeight >= ratioHeight) {
          _domHeight = props.minHeight
        }
      } else if (ratioHeight > props.height && props.maxHeight) {
        if (props.maxHeight > ratioHeight) {
          _domHeight = ratioHeight
        } else if (props.maxHeight <= ratioHeight) {
          _domHeight = props.maxHeight
        }
      }
      domHeight.value = _domHeight
    }

    const onResize = (event?: UIEvent) => {
      calcDomHeight()
      const width = props.width
      const height = domHeight.value
      if (props.fit === 'fill') {
        scaleX.value = window.innerWidth / width
        scaleY.value = window.innerHeight / height
      } else if (props.fit === 'w-full') {
        scaleX.value = window.innerWidth / width
        scaleY.value = scaleX.value

        // 按宽度缩放，高度大于可是高度，出现滚动条
        if (scaleX.value > window.innerHeight / height) {
          const scrollBarWidth = getScrollBarWidth('')
          const barScaleX = (window.innerWidth - scrollBarWidth) / width
          // 比例差仅在滚动条宽度之内，让高度上全屏，不产生滚动条
          if (barScaleX < window.innerHeight / height) {
            scaleY.value = window.innerHeight / height
          } else {
            scaleX.value = barScaleX
            scaleY.value = barScaleX
          }
        }
      } else {
        console.warn(`vue-scale-container.fit不支持${props.fit}参数`)
      }
      // 没有，说明是第一次出发，不需要重新渲染
      if (event) {
        if (props.forceUpdateOnResize) {
          renderSlot.value = false
          nextTick(() => {
            renderSlot.value = true
          })
        }
      }
    }

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
    })

    return {
      scaleX,
      scaleY,
      domHeight,
      renderSlot
      // el
    }
  },
  render() {
    const { domHeight, width, scaleX, scaleY, renderSlot, forceUpdateOnResize } = this
    return h(
      'div',
      {
        class: 'scale-container-wrap',
        style: {
          height: domHeight * scaleY + 'px',
          width: width * scaleX + 'px',
          overflow: 'hidden'
        } as unknown as string
        // ref: 'el'
      },
      [
        h(
          'div',
          {
            class: 'scale-container',
            style: {
              height: domHeight + 'px',
              width: width + 'px',
              transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
              transformOrigin: '0 0'
            } as unknown as string
          },
          [
            this.$slots.default && (!forceUpdateOnResize || renderSlot)
              ? slot(this.$slots.default)
              : undefined
          ]
        )
      ]
    )
  }
})
