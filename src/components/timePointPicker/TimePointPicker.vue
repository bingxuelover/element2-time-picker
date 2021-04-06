<template>
  <div id="rangeLists">
    <el-date-picker
      type="date"
      :editable="false"
      @change="dateChange"
      v-model="date"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
    <el-time-picker
      @change="getStartTimeChange"
      v-model="start"
      :editable="false"
      :picker-options="timeSelectStart"
      value-format="HH:mm"
      format="HH:mm"
    ></el-time-picker>
    <el-time-picker
      :disabled="timeEndStr"
      @change="getEndTimeChange"
      v-model="end"
      :editable="false"
      :picker-options="timeSelectEnd"
      value-format="HH:mm"
      format="HH:mm"
    ></el-time-picker>
  </div>
</template>

<script>
export default {
  name: "time-point-picker",
  props: {
    timeOccupied: Array,
    startRange: {
      type: Array,
      default: function () {
        return ["08:30:00 - 18:00:00"];
      },
    },
    timeRange: {
      type: Array,
      default: function () {
        return ["08:30:00 - 18:00:00"];
      },
    },
    defaultStart: { type: String, default: "09:00" },
    defaultEnd: { type: String, default: "18:00" },
  },
  data() {
    return {
      date: "",
      start: "",
      end: "",
      timeEndStr: true,
      timeLists: this.timeOccupied,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        },
      },
      timeSelectEnd: {
        selectableRange: [],
      },
    };
  },
  computed: {
    timeSelectStart() {
      const startHour = this.defaultStart.split(":")[0];

      const val = this.timeOccupied;
      const len = val.length;
      let timeSelectStart = [];
      if (len !== 0) {
        for (let i in val) {
          const j = Number(i);
          const x = j + 1;
          if (j < len - 1) {
            if (j == 0) {
              if (val[i][0].split(":")[0] !== startHour) {
                timeSelectStart.push(
                  this.defaultStart + " - " + val[i][0] + ":00"
                );
              }
            }
            if (val[i][1].split(":")[0] !== val[x][0].split(":")[0]) {
              timeSelectStart.push(val[i][1] + ":00 - " + val[x][0] + ":00");
            }
          } else if (j == len - 1) {
            if (j == 0) {
              if (val[i][0].split(":")[0] !== startHour) {
                timeSelectStart.push(
                  this.defaultStart + " - " + val[i][0] + ":00"
                );
              }
            }
            timeSelectStart.push(val[i][1] + ":00 - " + this.defaultEnd);
          }
        }
        return { selectableRange: timeSelectStart };
      } else {
        return { selectableRange: this.timeRange };
      }
    },
  },
  methods: {
    getStartTimeChange(time) {
      if (this.start != "" && this.start != null) {
        this.timeEndStr = false;
        let timeSelectEnd = [];
        let range = this.timeSelectStart.selectableRange;
        for (let r of range) {
          let rr = r.split(" - ");
          let sss = rr[0].split(":");
          let rrr = rr[1].split(":");
          let lll = time.split(":");
          if (lll[0] - sss[0] >= 0 && lll[0] - rrr[0] <= 0) {
            timeSelectEnd = time + ":00 - " + rr[1];
          }
        }
        this.timeSelectEnd.selectableRange = timeSelectEnd;
        this.$emit("update:start", this.start);
      } else {
        this.timeEndStr = false;
        let timeSelectEnd = [];
        this.timeSelectEnd.selectableRange = timeSelectEnd;
        this.$emit("update:start", "");
      }
      this.end = "";
      this.$emit("update:end", this.end);
    },
    getEndTimeChange() {
      this.$emit("update:end", this.end);
    },
    dateChange() {
      this.start = "";
      this.end = "";
      this.timeEndStr = true;
      this.$emit("update:date", this.date);
    },
  },
};
</script>

<style lang="css" scoped>
.el-date-editor--time {
  width: 100px;
  margin-left: 10px;
}
</style>
