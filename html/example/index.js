const templates = (opts ={}) => {
  const name = opts.name || 'todo-item';
  return {
    name,
    props:["todo"],
    data: function () {
      return {
        count: 0,
        to:{
          text:'test'
        }
      }
    },
    template: '<div><button v-on:click="count++">You clicked me {{ count }} times.</button><p>{{todo.text}}</p></div>'
  }
}
const install = (Vue, opts) => {
  Vue.Test = function(){
    return 'Test'
  }
  Vue.component(opts.name, templates());
}
