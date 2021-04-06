<template>
  <div>
    <el-date-picker
      type="date"
      :editable="false"
      @change="dateChange"
      v-model="date"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
    <el-select v-model="start" @change="getStartTimeChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
    <el-select v-model="end" @change="getEndTimeChange" :disabled="timeEndStr">
      <el-option
        v-for="item in endOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "time-slot-picker",
  props: {
    getOptions: Array,
    timeOccupied: Array,
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
      options: this.getOptions,
      optionValue: "",
      endOptions: [],
    };
  },
  computed: {
    selectableRange() {
      const startHour = this.defaultStart.split(":")[0];
      const endHour = this.defaultEnd.split(":")[0];

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
                timeSelectStart.push([this.defaultStart, val[i][0]]);
              }
              if (val[i][1].split(":")[0] !== val[x][0].split(":")[0]) {
                timeSelectStart.push([val[i][1], val[x][0]]);
              } else if (val[i][1].split(":")[0] == val[x][0].split(":")[0]) {
                if (val[i][1].split(":")[1] !== val[x][0].split(":")[1]) {
                  timeSelectStart.push([val[i][1], val[x][0]]);
                }
              }
            } else {
              if (val[i][1].split(":")[0] !== val[x][0].split(":")[0]) {
                timeSelectStart.push([val[i][1], val[x][0]]);
              } else if (val[i][1].split(":")[0] == val[x][0].split(":")[0]) {
                if (val[i][1].split(":")[1] !== val[x][0].split(":")[1]) {
                  timeSelectStart.push([val[i][1], val[x][0]]);
                }
              }
            }
          } else if (j == len - 1) {
            if (j == 0) {
              if (val[i][0].split(":")[0] !== startHour) {
                timeSelectStart.push([this.defaultStart, val[i][0]]);
              }
              if (val[i][1].split(":")[0] !== endHour) {
                timeSelectStart.push([val[i][1], this.defaultEnd]);
              }
            } else {
              if (val[i][1].split(":")[0] !== endHour) {
                timeSelectStart.push([val[i][1], this.defaultEnd]);
              }
            }
          }
        }
        return timeSelectStart;
      } else {
        return this.timeRange;
      }
    },
  },
  watch: {
    selectableRange(val) {
      let options = this.options;
      const len = options.length;
      for (let time of val) {
        const timeLine = time;
        const timeStart = timeLine[0];
        const timeEnd = timeLine[1];
        for (let i in options) {
          if (options[i].value == timeStart) {
            options[i].start = true;
            options[i].disabled = false;
            let nowValue = options[i].value;
            let j = Number(i);
            do {
              j += 1;
              nowValue = options[j].value;
              options[j].disabled = false;
              if (nowValue == timeEnd) {
                options[j].end = true;
              }
            } while (nowValue !== timeEnd && j < len - 1);
          }
        }
        const dateNow = new Date();
        const year = dateNow.getFullYear();
        let month = dateNow.getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        let day = dateNow.getDate();
        day = day > 9 ? day : "0" + day;
        const date = year + "-" + month + "-" + day;
        if (this.date == date) {
          let hours = dateNow.getHours();
          hours = hours > 9 ? hours : "0" + hours;
          let minutes = dateNow.getMinutes();
          minutes = minutes > 9 ? minutes : "0" + minutes;
          for (let opt of options) {
            const hour = opt.value.split(":")[0];
            const minites = opt.value.split(":")[1];
            if (hour < hours) {
              opt.disabled = true;
            } else if (hour == hours) {
              if (minites < minutes) {
                opt.disabled = true;
              }
            }
          }
        }
      }
      this.options = options;
    },
  },
  methods: {
    getStartTimeChange(time) {
      if (this.start != "") {
        this.timeEndStr = false;
        let options = this.options;
        let endOptions = [];
        let x = 0;
        for (let r in options) {
          if (options[r].value == time) {
            x = Number(r);
            endOptions.push(options[x]);
            if (options[x].end !== true) {
              do {
                x += 1;
                endOptions.push(options[x]);
              } while (options[x].disabled == false && options[x].end !== true);
            }
          }
        }
        this.endOptions = endOptions;
        this.$emit("update:start", this.start);
      } else {
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

<style scoped>
.el-select {
  width: 100px;
  margin-left: 10px;
}
</style>
