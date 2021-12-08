import ResizeObserver from "resize-observer-polyfill";
import _ from "lodash";

export default {
  mounted() {
    this.echartResizeObserver();
  },
  beforeDestroy() {
    this.$nextTick(() => {
      this._echartResizeObserver && this._echartResizeObserver.disconnect && this._echartResizeObserver.disconnect();
    });
  },
  methods: {
    echartResizeObserver() {
      if (this.$refs.chart) {
        const cb = (entries, observer) => {
          for (const entry of entries) {
            // 当元素宽或高不存在时（如隐藏），无需resize
            if (entry.target.offsetWidth && entry.target.offsetHeight) {
              this.chart && this.chart.resize();
            }
          }
        };
        // 防抖主要是resize过程长或者有过渡（比如menu收起或则持续拖动resize），减少触发
        this._echartResizeObserver = new ResizeObserver(_.debounce(cb, 100));
        this._echartResizeObserver.observe(this.$refs.chart);
      }
    }
  }
};
