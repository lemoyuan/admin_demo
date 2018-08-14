<template>
  <div class='header-div'>
    <div class='main_menu'>
        <div class='menu-item' v-for="(item,index) in menuList" :key='index' :class='{"active": isActive == item.name}' @click="toHome(item,index)">{{item.name}}</div>
    </div>
    <div class="dropdown">
        <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
                <span class='name'>用户名</span>  
               <i class="iconfont icon-xiangxiajiantou" style='color:#666;font-size:14px;'></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">网站首页</el-dropdown-item>
                <el-dropdown-item command="b">后台首页</el-dropdown-item>
                <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>
<script>

export default {
    data() {
        return {
           menuObj: '',
           isActive:"1111",
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
                {
                    name:"2222",
                    menus:[
                        {
                                name:"c",
                            menus:[
                                {
                                    name:"c1",
                                    menus:[

                                    ]
                                },
                                {
                                    name:"c2",
                                    menus:[

                                    ]
                                },
                            ]
                        },
                        {
                                name:"d",
                            menus:[

                            ]
                        }
                        
                    ]
                }
            ],
        };
    },
    watch: {
        '$route': function (to,form) {
            //this.getAdminData();
        },
		adminInfo: function (newValue){ 
		}
    },
    props: {
        meuId: '',
    },
    created() {

    },
    mounted() {

    },
    computed: {
    },
    methods: {   
          
        toHome(item,ind) {
            this.isActive = item.name;
            this.$emit('changeMenu',ind);
            // if (item.menus && item.menus[0] && item.menus[0].menus.length > 0) {
            //    this.$router.push(item.menus[0].menus[0].vuePath);
            // } else if (item.menus && item.menus[0]) {
            //     this.$router.push(item.menus[0].vuePath);
            // }
        },
        handleCommand(command) {
            console.log(1);
            var self = this;
            switch (command) {
                case 'a':
                    break;
                case 'b':
                    this.$router.push('/home');
                    break;
                case 'c':
 
                    self.$router.push('/login');

            }
        },
    }
}
</script>
<style lang="scss" scoped>
.header-div {
    width: 100%;
    height: 90px;
    background-color: #fff;
    box-shadow: 0 5px 5px -3px #ccc; /*底部阴影*/ 
    position: fixed;
    z-index: 1000;
    .main_menu {
        position: absolute;
        left: -180px;
        width: 100%;
        height: 50px;
        top: 90px;
        background: #305f96;
        padding-left: 180px;
        .menu-item {
            width: 150px;
            line-height: 50px;
            height: 50px;
            text-align: center;
            font-size: 18px;
            color: #fff;
            float: left;
            cursor: pointer;
        }
        .menu-item:hover {
            background: #6e7f99
        }
        .menu-item.active {
            background: #6e7f99
        }
    }
    .dropdown{
        position: absolute;
        top: 0;
        right: 220px;
        img {
            width: 50px;
            border-radius: 50%;
        }
        .el-dropdown-link {
            height: 90px;
            line-height: 90px;
            cursor: pointer;
            margin-right: 20px;
            .name {
                margin: 0 10px;
                font-size:16px;
            }
            img {
                vertical-align: middle;
                margin-right:20px;
            }
        }
        .xx-header {
            display: inline-block;
            margin-right: 20px;
            cursor: pointer;
            float: left;
            margin-top: 32px;
            i {
                font-size: 30px;
                color: #999;
            }
           
        }
        .xx-header:hover {
            i {
                color: #20a0ff;
            }
        }
    }
}

</style>