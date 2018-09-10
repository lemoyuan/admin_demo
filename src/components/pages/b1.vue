<template>
  <div class='header-div'>
   bbbbbbbbbbbbbbbbbbbbbbbbbbbb111111111111111111123
   <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuObj: "",
      isActive: "1111",
      menuList: [
        {
          name: "1111",
          menus: [
            {
              name: "a",
              menus: [
                {
                  name: "aaaaaaa1",
                  menus: []
                },
                {
                  name: "aaaaaaa2",
                  menus: []
                }
              ]
            },
            {
              name: "b",
              menus: []
            }
          ]
        },
        {
          name: "2222",
          menus: [
            {
              name: "a",
              menus: [
                {
                  name: "aaaaaaa1",
                  menus: []
                },
                {
                  name: "aaaaaaa2",
                  menus: []
                }
              ]
            },
            {
              name: "b",
              menus: []
            }
          ]
        }
      ]
    };
  },
  watch: {
    $route: function(to, form) {
      //this.getAdminData();
    },
    adminInfo: function(newValue) {}
  },
  props: {
    meuId: ""
  },
  created() {},
  mounted() {
      this.$nextTick(()=>{
            // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });

      });
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>