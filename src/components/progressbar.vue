<template>
  <div
    class="el-progress"
    :class="[
      'el-progress--' + type,
      status ? 'is-' + status : '',
      {
        'el-progress--without-text': !showText,
        'el-progress--text-inside': textInside,
      }
    ]"
  >
    <div class="el-progress-bar" v-if="type === 'line'">
      <div class="el-progress-bar__outer" :style="{height: strokeWidth + 'px'}">
        
        <div class="el-progress-bar__inner" :style="barStyle1">
          <div class="el-progress-bar__innerText" v-if="showText && textInside">{{ percentage1}}%</div>
        </div>
        <div class="el-progress-bar__inner1" :style="barStyle">
          <div class="el-progress-bar__innerText" v-if="showText && textInside">{{percentage }}%</div>
        </div>
      </div>
    </div>
    <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
      <svg viewBox="0 0 100 100">
        <path class="el-progress-circle__track" :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path class="el-progress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
        <path class="el-progress-circle__path1" :d="trackPath" stroke-linecap="round" :stroke="stroke1" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle1"></path>
      </svg>
    </div>
    <div
      class="el-progress__text"
      v-if="showText && !textInside"
      :style="{fontSize: progressTextSize + 'px'}"
    >
      <template v-if="!status">{{percentage + percentage1}}%</template>
      <i v-else :class="iconClass"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "ElProgress",
  props: {
    type: {
      type: String,
      default: "line",
      validator: val => ["line", "circle"].indexOf(val) > -1
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    percentage1: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    status: {
      type: String
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 126
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    barStyle() {
      var style = {};
      style.width = this.percentage + "%";
      return style;
    },
    barStyle1() {
      var style = {};
      style.width = this.percentage1+this.percentage + "%";
      return style;
    },
    relativeStrokeWidth() {
      return (this.strokeWidth / this.width * 100).toFixed(1);
    },
    trackPath() {
      var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);

      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius *
        2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    },
    perimeter() {
      var radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * radius;
    },
    circlePathStyle() {
      var perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        // 左半圆
        strokeDashoffset: (this.percentage / 100-1) * perimeter + "px",
        transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
      };
    },
    circlePathStyle1() {
      var perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        // 右半圆
        strokeDashoffset: (1 -this.percentage1 / 100) * perimeter + "px",
        transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
      };
    },
    stroke() {
      var ret;
      switch (this.status) {
        case "success":
          ret = "#13ce66";
          break;
        case "exception":
          ret = "#ff4949";
          break;
        default:
          ret = "#20a0ff";
      }
      return ret;
    },
    stroke1() {
      var ret;
      switch (this.status) {
        case "success":
          ret = "#13ce66";
          break;
        case "exception":
          ret = "#ff4949";
          break;
        default:
          ret = "blue";
      }
      return ret;
    },
    iconClass() {
      if (this.type === "line") {
        return this.status === "success"
          ? "el-icon-circle-check"
          : "el-icon-circle-cross";
      } else {
        return this.status === "success" ? "el-icon-check" : "el-icon-close";
      }
    },
    progressTextSize() {
      return this.type === "line"
        ? 12 + this.strokeWidth * 0.4
        : this.width * 0.111111 + 2;
    }
  }
};
</script>
<style scoped>
@charset "UTF-8";
.el-progress-bar__inner:after {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
}

.el-progress {
  position: relative;
  line-height: 1;
}

.el-progress.is-exception .el-progress-bar__inner {
  background-color: #ff4949;
}

.el-progress.is-exception .el-progress__text {
  color: #ff4949;
}

.el-progress.is-success .el-progress-bar__inner {
  background-color: #13ce66;
}

.el-progress.is-success .el-progress__text {
  color: #13ce66;
}

.el-progress__text {
  font-size: 14px;
  color: #48576a;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  line-height: 1;
}

.el-progress__text i {
  vertical-align: middle;
  display: block;
}

.el-progress--circle {
  display: inline-block;
}

.el-progress--circle .el-progress__text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

.el-progress--circle .el-progress__text i {
  vertical-align: middle;
  display: inline-block;
}

.el-progress--without-text .el-progress__text {
  display: none;
}

.el-progress--without-text .el-progress-bar {
  padding-right: 0;
  margin-right: 0;
  display: block;
}

.el-progress--text-inside .el-progress-bar {
  padding-right: 0;
  margin-right: 0;
}

.el-progress-bar {
  padding-right: 50px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  margin-right: -55px;
  box-sizing: border-box;
}

.el-progress-bar__outer {
  height: 6px;
  border-radius: 100px;
  background-color: #e4e8f1;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}

.el-progress-bar__inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #20a0ff;
  text-align: right;
  border-radius: 100px;
  line-height: 1;
  white-space: nowrap;
  position: absolute;
}
.el-progress-bar__inner1 {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: blue;
  text-align: right;
  border-radius: 100px;
  line-height: 1;
  white-space: nowrap;
  position: absolute;
}

.el-progress-bar__innerText {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  font-size: 12px;
  margin: 0 5px;
}

@keyframes progress {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 32px 0;
  }
}
</style>
