var elementUI = (function (exports) {
  'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$1 = {
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

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      [
        _c("el-date-picker", {
          attrs: {
            type: "date",
            editable: false,
            "picker-options": _vm.pickerOptions,
            "value-format": "yyyy-MM-dd"
          },
          on: { change: _vm.dateChange },
          model: {
            value: _vm.date,
            callback: function($$v) {
              _vm.date = $$v;
            },
            expression: "date"
          }
        }),
        _vm._v(" "),
        _c(
          "el-select",
          {
            on: { change: _vm.getStartTimeChange },
            model: {
              value: _vm.start,
              callback: function($$v) {
                _vm.start = $$v;
              },
              expression: "start"
            }
          },
          _vm._l(_vm.options, function(item) {
            return _c("el-option", {
              key: item.value,
              attrs: {
                label: item.label,
                value: item.value,
                disabled: item.disabled
              }
            })
          }),
          1
        ),
        _vm._v(" "),
        _c(
          "el-select",
          {
            attrs: { disabled: _vm.timeEndStr },
            on: { change: _vm.getEndTimeChange },
            model: {
              value: _vm.end,
              callback: function($$v) {
                _vm.end = $$v;
              },
              expression: "end"
            }
          },
          _vm._l(_vm.endOptions, function(item) {
            return _c("el-option", {
              key: item.value,
              attrs: {
                label: item.label,
                value: item.value,
                disabled: item.disabled
              }
            })
          }),
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-781f9d38_0", { source: "\n.el-select[data-v-781f9d38] {\r\n  width: 100px;\r\n  margin-left: 10px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\huangyh\\Desktop\\git\\element2-time-picker\\src\\components\\timeSlotPicker\\TimeSlotPicker.vue"],"names":[],"mappings":";AAoNA;EACA,YAAA;EACA,iBAAA;AACA","file":"TimeSlotPicker.vue","sourcesContent":["<template>\r\n  <div>\r\n    <el-date-picker\r\n      type=\"date\"\r\n      :editable=\"false\"\r\n      @change=\"dateChange\"\r\n      v-model=\"date\"\r\n      :picker-options=\"pickerOptions\"\r\n      value-format=\"yyyy-MM-dd\"\r\n    ></el-date-picker>\r\n    <el-select v-model=\"start\" @change=\"getStartTimeChange\">\r\n      <el-option\r\n        v-for=\"item in options\"\r\n        :key=\"item.value\"\r\n        :label=\"item.label\"\r\n        :value=\"item.value\"\r\n        :disabled=\"item.disabled\"\r\n      >\r\n      </el-option>\r\n    </el-select>\r\n    <el-select v-model=\"end\" @change=\"getEndTimeChange\" :disabled=\"timeEndStr\">\r\n      <el-option\r\n        v-for=\"item in endOptions\"\r\n        :key=\"item.value\"\r\n        :label=\"item.label\"\r\n        :value=\"item.value\"\r\n        :disabled=\"item.disabled\"\r\n      >\r\n      </el-option>\r\n    </el-select>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \"time-slot-picker\",\r\n  props: {\r\n    getOptions: Array,\r\n    timeOccupied: Array,\r\n    timeRange: {\r\n      type: Array,\r\n      default: function () {\r\n        return [\"08:30:00 - 18:00:00\"];\r\n      },\r\n    },\r\n    defaultStart: { type: String, default: \"09:00\" },\r\n    defaultEnd: { type: String, default: \"18:00\" },\r\n  },\r\n  data() {\r\n    return {\r\n      date: \"\",\r\n      start: \"\",\r\n      end: \"\",\r\n      timeEndStr: true,\r\n      timeLists: this.timeOccupied,\r\n      pickerOptions: {\r\n        disabledDate(time) {\r\n          return time.getTime() + 3600 * 1000 * 24 < Date.now();\r\n        },\r\n      },\r\n      options: this.getOptions,\r\n      optionValue: \"\",\r\n      endOptions: [],\r\n    };\r\n  },\r\n  computed: {\r\n    selectableRange() {\r\n      const startHour = this.defaultStart.split(\":\")[0];\r\n      const endHour = this.defaultEnd.split(\":\")[0];\r\n\r\n      const val = this.timeOccupied;\r\n      const len = val.length;\r\n      let timeSelectStart = [];\r\n      if (len !== 0) {\r\n        for (let i in val) {\r\n          const j = Number(i);\r\n          const x = j + 1;\r\n          if (j < len - 1) {\r\n            if (j == 0) {\r\n              if (val[i][0].split(\":\")[0] !== startHour) {\r\n                timeSelectStart.push([this.defaultStart, val[i][0]]);\r\n              }\r\n              if (val[i][1].split(\":\")[0] !== val[x][0].split(\":\")[0]) {\r\n                timeSelectStart.push([val[i][1], val[x][0]]);\r\n              } else if (val[i][1].split(\":\")[0] == val[x][0].split(\":\")[0]) {\r\n                if (val[i][1].split(\":\")[1] !== val[x][0].split(\":\")[1]) {\r\n                  timeSelectStart.push([val[i][1], val[x][0]]);\r\n                }\r\n              }\r\n            } else {\r\n              if (val[i][1].split(\":\")[0] !== val[x][0].split(\":\")[0]) {\r\n                timeSelectStart.push([val[i][1], val[x][0]]);\r\n              } else if (val[i][1].split(\":\")[0] == val[x][0].split(\":\")[0]) {\r\n                if (val[i][1].split(\":\")[1] !== val[x][0].split(\":\")[1]) {\r\n                  timeSelectStart.push([val[i][1], val[x][0]]);\r\n                }\r\n              }\r\n            }\r\n          } else if (j == len - 1) {\r\n            if (j == 0) {\r\n              if (val[i][0].split(\":\")[0] !== startHour) {\r\n                timeSelectStart.push([this.defaultStart, val[i][0]]);\r\n              }\r\n              if (val[i][1].split(\":\")[0] !== endHour) {\r\n                timeSelectStart.push([val[i][1], this.defaultEnd]);\r\n              }\r\n            } else {\r\n              if (val[i][1].split(\":\")[0] !== endHour) {\r\n                timeSelectStart.push([val[i][1], this.defaultEnd]);\r\n              }\r\n            }\r\n          }\r\n        }\r\n        return timeSelectStart;\r\n      } else {\r\n        return this.timeRange;\r\n      }\r\n    },\r\n  },\r\n  watch: {\r\n    selectableRange(val) {\r\n      let options = this.options;\r\n      const len = options.length;\r\n      for (let time of val) {\r\n        const timeLine = time;\r\n        const timeStart = timeLine[0];\r\n        const timeEnd = timeLine[1];\r\n        for (let i in options) {\r\n          if (options[i].value == timeStart) {\r\n            options[i].start = true;\r\n            options[i].disabled = false;\r\n            let nowValue = options[i].value;\r\n            let j = Number(i);\r\n            do {\r\n              j += 1;\r\n              nowValue = options[j].value;\r\n              options[j].disabled = false;\r\n              if (nowValue == timeEnd) {\r\n                options[j].end = true;\r\n              }\r\n            } while (nowValue !== timeEnd && j < len - 1);\r\n          }\r\n        }\r\n        const dateNow = new Date();\r\n        const year = dateNow.getFullYear();\r\n        let month = dateNow.getMonth() + 1;\r\n        month = month > 9 ? month : \"0\" + month;\r\n        let day = dateNow.getDate();\r\n        day = day > 9 ? day : \"0\" + day;\r\n        const date = year + \"-\" + month + \"-\" + day;\r\n        if (this.date == date) {\r\n          let hours = dateNow.getHours();\r\n          hours = hours > 9 ? hours : \"0\" + hours;\r\n          let minutes = dateNow.getMinutes();\r\n          minutes = minutes > 9 ? minutes : \"0\" + minutes;\r\n          for (let opt of options) {\r\n            const hour = opt.value.split(\":\")[0];\r\n            const minites = opt.value.split(\":\")[1];\r\n            if (hour < hours) {\r\n              opt.disabled = true;\r\n            } else if (hour == hours) {\r\n              if (minites < minutes) {\r\n                opt.disabled = true;\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n      this.options = options;\r\n    },\r\n  },\r\n  methods: {\r\n    getStartTimeChange(time) {\r\n      if (this.start != \"\") {\r\n        this.timeEndStr = false;\r\n        let options = this.options;\r\n        let endOptions = [];\r\n        let x = 0;\r\n        for (let r in options) {\r\n          if (options[r].value == time) {\r\n            x = Number(r);\r\n            endOptions.push(options[x]);\r\n            if (options[x].end !== true) {\r\n              do {\r\n                x += 1;\r\n                endOptions.push(options[x]);\r\n              } while (options[x].disabled == false && options[x].end !== true);\r\n            }\r\n          }\r\n        }\r\n        this.endOptions = endOptions;\r\n        this.$emit(\"update:start\", this.start);\r\n      } else {\r\n        this.$emit(\"update:start\", \"\");\r\n      }\r\n      this.end = \"\";\r\n      this.$emit(\"update:end\", this.end);\r\n    },\r\n    getEndTimeChange() {\r\n      this.$emit(\"update:end\", this.end);\r\n    },\r\n    dateChange() {\r\n      this.start = \"\";\r\n      this.end = \"\";\r\n      this.timeEndStr = true;\r\n      this.$emit(\"update:date\", this.date);\r\n    },\r\n  },\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.el-select {\r\n  width: 100px;\r\n  margin-left: 10px;\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-781f9d38";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  __vue_component__$1.install = function (app) {
    app.component("TimeSlotPicker", __vue_component__$1);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
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

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { attrs: { id: "rangeLists" } },
      [
        _c("el-date-picker", {
          attrs: {
            type: "date",
            editable: false,
            "picker-options": _vm.pickerOptions,
            "value-format": "yyyy-MM-dd"
          },
          on: { change: _vm.dateChange },
          model: {
            value: _vm.date,
            callback: function($$v) {
              _vm.date = $$v;
            },
            expression: "date"
          }
        }),
        _vm._v(" "),
        _c("el-time-picker", {
          attrs: {
            editable: false,
            "picker-options": _vm.timeSelectStart,
            "value-format": "HH:mm",
            format: "HH:mm"
          },
          on: { change: _vm.getStartTimeChange },
          model: {
            value: _vm.start,
            callback: function($$v) {
              _vm.start = $$v;
            },
            expression: "start"
          }
        }),
        _vm._v(" "),
        _c("el-time-picker", {
          attrs: {
            disabled: _vm.timeEndStr,
            editable: false,
            "picker-options": _vm.timeSelectEnd,
            "value-format": "HH:mm",
            format: "HH:mm"
          },
          on: { change: _vm.getEndTimeChange },
          model: {
            value: _vm.end,
            callback: function($$v) {
              _vm.end = $$v;
            },
            expression: "end"
          }
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-3c24922a_0", { source: "\n.el-date-editor--time[data-v-3c24922a] {\r\n  width: 100px;\r\n  margin-left: 10px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\huangyh\\Desktop\\git\\element2-time-picker\\src\\components\\timePointPicker\\TimePointPicker.vue"],"names":[],"mappings":";AAkJA;EACA,YAAA;EACA,iBAAA;AACA","file":"TimePointPicker.vue","sourcesContent":["<template>\r\n  <div id=\"rangeLists\">\r\n    <el-date-picker\r\n      type=\"date\"\r\n      :editable=\"false\"\r\n      @change=\"dateChange\"\r\n      v-model=\"date\"\r\n      :picker-options=\"pickerOptions\"\r\n      value-format=\"yyyy-MM-dd\"\r\n    ></el-date-picker>\r\n    <el-time-picker\r\n      @change=\"getStartTimeChange\"\r\n      v-model=\"start\"\r\n      :editable=\"false\"\r\n      :picker-options=\"timeSelectStart\"\r\n      value-format=\"HH:mm\"\r\n      format=\"HH:mm\"\r\n    ></el-time-picker>\r\n    <el-time-picker\r\n      :disabled=\"timeEndStr\"\r\n      @change=\"getEndTimeChange\"\r\n      v-model=\"end\"\r\n      :editable=\"false\"\r\n      :picker-options=\"timeSelectEnd\"\r\n      value-format=\"HH:mm\"\r\n      format=\"HH:mm\"\r\n    ></el-time-picker>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \"time-point-picker\",\r\n  props: {\r\n    timeOccupied: Array,\r\n    startRange: {\r\n      type: Array,\r\n      default: function () {\r\n        return [\"08:30:00 - 18:00:00\"];\r\n      },\r\n    },\r\n    timeRange: {\r\n      type: Array,\r\n      default: function () {\r\n        return [\"08:30:00 - 18:00:00\"];\r\n      },\r\n    },\r\n    defaultStart: { type: String, default: \"09:00\" },\r\n    defaultEnd: { type: String, default: \"18:00\" },\r\n  },\r\n  data() {\r\n    return {\r\n      date: \"\",\r\n      start: \"\",\r\n      end: \"\",\r\n      timeEndStr: true,\r\n      timeLists: this.timeOccupied,\r\n      pickerOptions: {\r\n        disabledDate(time) {\r\n          return time.getTime() + 3600 * 1000 * 24 < Date.now();\r\n        },\r\n      },\r\n      timeSelectEnd: {\r\n        selectableRange: [],\r\n      },\r\n    };\r\n  },\r\n  computed: {\r\n    timeSelectStart() {\r\n      const startHour = this.defaultStart.split(\":\")[0];\r\n\r\n      const val = this.timeOccupied;\r\n      const len = val.length;\r\n      let timeSelectStart = [];\r\n      if (len !== 0) {\r\n        for (let i in val) {\r\n          const j = Number(i);\r\n          const x = j + 1;\r\n          if (j < len - 1) {\r\n            if (j == 0) {\r\n              if (val[i][0].split(\":\")[0] !== startHour) {\r\n                timeSelectStart.push(\r\n                  this.defaultStart + \" - \" + val[i][0] + \":00\"\r\n                );\r\n              }\r\n            }\r\n            if (val[i][1].split(\":\")[0] !== val[x][0].split(\":\")[0]) {\r\n              timeSelectStart.push(val[i][1] + \":00 - \" + val[x][0] + \":00\");\r\n            }\r\n          } else if (j == len - 1) {\r\n            if (j == 0) {\r\n              if (val[i][0].split(\":\")[0] !== startHour) {\r\n                timeSelectStart.push(\r\n                  this.defaultStart + \" - \" + val[i][0] + \":00\"\r\n                );\r\n              }\r\n            }\r\n            timeSelectStart.push(val[i][1] + \":00 - \" + this.defaultEnd);\r\n          }\r\n        }\r\n        return { selectableRange: timeSelectStart };\r\n      } else {\r\n        return { selectableRange: this.timeRange };\r\n      }\r\n    },\r\n  },\r\n  methods: {\r\n    getStartTimeChange(time) {\r\n      if (this.start != \"\" && this.start != null) {\r\n        this.timeEndStr = false;\r\n        let timeSelectEnd = [];\r\n        let range = this.timeSelectStart.selectableRange;\r\n        for (let r of range) {\r\n          let rr = r.split(\" - \");\r\n          let sss = rr[0].split(\":\");\r\n          let rrr = rr[1].split(\":\");\r\n          let lll = time.split(\":\");\r\n          if (lll[0] - sss[0] >= 0 && lll[0] - rrr[0] <= 0) {\r\n            timeSelectEnd = time + \":00 - \" + rr[1];\r\n          }\r\n        }\r\n        this.timeSelectEnd.selectableRange = timeSelectEnd;\r\n        this.$emit(\"update:start\", this.start);\r\n      } else {\r\n        this.timeEndStr = false;\r\n        let timeSelectEnd = [];\r\n        this.timeSelectEnd.selectableRange = timeSelectEnd;\r\n        this.$emit(\"update:start\", \"\");\r\n      }\r\n      this.end = \"\";\r\n      this.$emit(\"update:end\", this.end);\r\n    },\r\n    getEndTimeChange() {\r\n      this.$emit(\"update:end\", this.end);\r\n    },\r\n    dateChange() {\r\n      this.start = \"\";\r\n      this.end = \"\";\r\n      this.timeEndStr = true;\r\n      this.$emit(\"update:date\", this.date);\r\n    },\r\n  },\r\n};\r\n</script>\r\n\r\n<style lang=\"css\" scoped>\r\n.el-date-editor--time {\r\n  width: 100px;\r\n  margin-left: 10px;\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-3c24922a";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  __vue_component__.install = function (app) {
    app.component(__vue_component__.name, __vue_component__);
  };

  var components = [__vue_component__$1, __vue_component__];

  var install = function install(app) {
    if (install.installed) return;
    components.forEach(function (component) {
      app.component(component.name, component);
    });
  };

  if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
  }

  var elementUI = {
    install: install
  };

  exports.TimePointPicker = __vue_component__;
  exports.TimeSlotPicker = __vue_component__$1;
  exports.default = elementUI;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
