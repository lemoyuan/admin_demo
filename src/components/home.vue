<template>
  <div id='mg-div'>
  	<div class="tac" id='tac'>
	  	<div class='el-col-tac'>
		    <div class='logo-div'>
				<h2><img @click="$router.push('/a')" src="../assets/images/22.jpg"></h2>
		    </div>
			<el-menu class="el-menu-vertical-demo" background-color="transparent" :style='{"min-height":minHeight}' @select="handleSelect"
			 text-color="#fff" :unique-opened='true' >
				<div v-for='(item_one,index_one) in menuList' :key='index_one'>
					<div class='menu-for' v-for='(item,index) in item_one.menus' :key='index'>
						<el-menu-item :index="item.ipath" v-if='item.menus.length <= 0'>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
						<el-submenu :index="item.name" v-if='item.menus.length > 0'>
							<template slot="title">
								{{item.name}}
							</template>
							<el-menu-item-group>
								<template slot="title"></template>
								<el-menu-item  v-for="(key,i) in item.menus" :key='i' :index="key.ipath">
									<i class="iconfont icon-arrRight-fill"></i>{{key.name}}
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</div>
				</div>
			</el-menu>
	  	</div>
	  	<div style="height: 100%;overflow: auto;min-width:1040px;width: 83%;" class='el-col-tac2'>
			<head-top></head-top>
			<div style='margin-top: 160px;'>
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</div>
		</div>
  	</div>
  </div>
</template>
<script>
    import headTop from './header'
	export default {
		data() {
			return {
				// menuArray: menuList,
                minHeight: '',
                defaultActive:0,
                menuList:[
                    {
                        name:"1111",
                        menus:[
                             {
                                 name:"a",
                                 ipath:'/a',
                                menus:[

                                ]
                            },
                            {
                                 name:"b",
                                menus:[
                                    {
                                        name:"b1",
                                        ipath:"/b1",
                                        menus:[

                                        ]
                                    },
                                    {
                                        name:"b2",
                                        ipath:"/b2",
                                        menus:[

                                        ]
                                    },
                                ]
                            },
                           
                           
                        ]
                    },
                    // {
                    //     name:"2222",
                    //     menus:[
                    //         {
                    //              name:"a",
                    //             menus:[
                    //                 {
                    //                     name:"aaaaaaa1",
                    //                     menus:[

                    //                     ]
                    //                 },
                    //                 {
                    //                     name:"aaaaaaa2",
                    //                     menus:[

                    //                     ]
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //              name:"b",
                    //             menus:[

                    //             ]
                    //         }
                           
                    //     ]
                    // }
                ]
			}
		},
		watch: {
			adminInfo: function (newValue){
			},
        },
		computed: {

		},
		created() {
			this.minHeight = (window.innerHeight - 140) + 'px';
		},
		mounted() {

			this.$nextTick(function() {

			})
		},
		methods: {
            handleSelect(key, keyPath) {
                var self = this;
                self.$router.push(key);
				// switch (key) {
				// 	case 'a1'://首页
				// 		self.$router.push('/a1');break;
				// 	case 'b'://表单管理
				// 		self.$router.push('/b');break;
				// }
            }
		
		},
		components: {
			headTop
		},
	}
</script>
<style lang="scss" scoped>
.logo-div{
    img{
        width: 290px;
        height: 72px ;
    }
}
@import '../assets/scss/pages/manage.scss';
</style>
