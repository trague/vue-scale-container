import { watchEffect, ref, onMounted, onUnmounted, defineComponent } from 'vue-demi'
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
    const scaleX = ref(1)
    const scaleY = ref(1)
    // const el = ref()

    watchEffect(() => {
      document.documentElement.style.setProperty('--scale-x', scaleX.value as unknown as string)
      document.documentElement.style.setProperty('--scale-y', scaleY.value as unknown as string)
    })

    const onResize = () => {
      if (props.fit === 'fill') {
        scaleX.value = window.innerWidth / props.width
        scaleY.value = window.innerHeight / props.height
      } else if (props.fit === 'w-full') {
        scaleX.value = window.innerWidth / props.width
        scaleY.value = scaleX.value

        // 按宽度缩放，高度大于可是高度，出现滚动条
        if (scaleX.value > window.innerHeight / props.height) {
          const scrollBarWidth = getScrollBarWidth('')
          const barScaleX = (window.innerWidth - scrollBarWidth) / props.width
          // 比例差仅在滚动条宽度之内，让高度上全屏，不产生滚动条
          if (barScaleX < window.innerHeight / props.height) {
            scaleY.value = window.innerHeight / props.height
          } else {
            scaleX.value = barScaleX
            scaleY.value = barScaleX
          }
        }
      } else {
        console.warn(`vue-scale-container.fit不支持${props.fit}参数`)
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
      scaleY
      // el
    }
  },
  render() {
    const { height, width, scaleX, scaleY } = this
    return h(
      'div',
      {
        class: 'scale-container-wrap',
        style: {
          height: height * scaleY + 'px',
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
              height: height + 'px',
              width: width + 'px',
              transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
              transformOrigin: '0 0'
            } as unknown as string
          },
          [this.$slots.default ? slot(this.$slots.default) : undefined]
        )
      ]
    )
  }
})
