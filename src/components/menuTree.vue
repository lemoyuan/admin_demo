<template>
    <div>
        <!-- 只获取菜单栏 menuType='menu' -->
        <div v-if='menuType == "menu"' class='menu'>
            <div class='item-tree' v-for="(item,index) in model" :key='index' >
                <span class='check-span' @click="isShow(item)">
                    {{item.isUnfold ? '-' : '+'}}
                </span>
                <div class='item-tree-menu' :class='{"active": item.isActive}' @click="isActive(item)">{{item.name}}</div>
                <div v-if='item.children' v-show='item.isUnfold'>
                    <tree :model="item.children" :menuType='"menu"' @showClick='getShowClick' @isItemActive='getISItemActive'></tree>
                </div>
            </div>
        </div>
        <!-- 获取菜单栏和操作栏  menuType='menuAddOperate'-->
        <div v-if='menuType == "menuAddOperate"' class='menuAddOperate'>
            <div class='item-tree' v-for="(item,index) in model" :key='index'>
                <span class='check-span' @click="isShow(item)" v-if='!item.isRole'>
                    {{item.isUnfold ? '-' : '+'}}
                </span>
                <div class='item-tree-menu' :class='{"operating-item":item.isRole == 1}'>
                    <span class='txt'>{{item.name}}</span>
                    <span class='check-change' :class='"check_"+ item.id' @click="changeCheck(item,model)">
                        <i class='iconfont icon-gou' :class='item.checked ? "check-i" : ""'></i>
                        <i class='iconfont icon-yuandianzhong' :class='!item.checked && item.check_isAuth? "check-i" : ""'></i>
                    </span>
                </div>
                <div v-if='item.children' v-show='item.isUnfold'>
                    <tree :model="item.children" @changeCheck="getchangeCheck" @showClick='getShowClick' :treeRoot='model' :menuType='"menuAddOperate"'></tree>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import api from '../fetch/api'
  export default {
    name: 'tree',
    data() {
        return {
        }
    },
    props: {
      model: Array,
      treeRoot: Array,
      menuType: '',
    },
    computed: {

    },
    mounted() {

	},
    methods: {
        // 是否展开
        isShow(item) {
            item.isUnfold = !item.isUnfold;
            if (item.isUnfold) {
                this.$emit('showClick',item);
            }
        },
        getShowClick(item) {
            this.$emit('showClick',item);
        },
        // 是否选择item id
        isActive(item) {
            this.$emit('isItemActive',item);
        },
        getISItemActive(item) {
            this.$emit('isItemActive',item);
        },
        // 勾选
        changeCheck(item,parent) {
            item.checked = !item.checked;
            item.check_isAuth = false;
            this.ifAllCheck(item.children,parent);
            if (item.children) {
                this.recursionTree(item.children,item.checked);
            }
            this.$emit('changeCheck',item);
        },
        getchangeCheck(val) {
            this.$emit('changeCheck',val);
        },
        // 是否全选
        ifAllCheck(arr,parentArr) {
            var self = this;
            var checkedIndex = 0;
            parentArr.forEach(function(key,index) {
                if (key.checked) {
                   checkedIndex ++ ;
                }
            }, this);
            // 下级有全选  上级打钩
            function treeFun(arrList) {
                for( var i = 0 ; i < arrList.length ; i++) {
                    if (parentArr == arrList[i].children) {
                        if (checkedIndex == parentArr.length) {
                            arrList[i].checked = true;
                            arrList[i].check_isAuth = false;
                        } else if (checkedIndex >= 1 && checkedIndex < parentArr.length) {
                            arrList[i].checked = false;
                            arrList[i].check_isAuth = true;
                        } else {
                            arrList[i].checked = false;
                            arrList[i].check_isAuth = false;
                        }
                    } else if (typeof (arrList[i].children) == "object") {
                        treeFun(arrList[i].children);
                    }
                }
            }
            if (self.treeRoot) {
                treeFun(self.treeRoot);
            }
        },
        // 判断  下一级是否全部勾选
        recursionTree(arr,checked) {
            function treeFun(arr) {
                for( var i = 0 ; i < arr.length ; i++) {
                    if (!checked) {
                       arr[i].checked = false;
                       arr[i].check_isAuth = false;
                    } else {
                       arr[i].checked = true;
                       arr[i].check_isAuth = false;
                    }
                    if (typeof (arr[i].children) == "object") {
                        treeFun(arr[i].children);
                    }
                }
            }
            treeFun(arr);
        },
    }
  }
</script>
<style lang="scss" scoped>
.menu .item-tree{
    min-width: 100px;
    box-sizing: border-box;
    .item-tree-menu {
        cursor: pointer;
    }
    .item-tree-menu:hover,.item-tree-menu.active {
        background: #48affa;
    }
}
.item-tree {
    min-width: 320px;
    height: auto;
    padding-left: 40px;
    margin-top: 10px;
    position: relative;
    .check-span {
        font-size: 30px;
        font-weight: bold;
        color: #4F95D6;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        left: -10px;
    }
    .item-tree-menu {
        width: 100%;
        min-height: 30px;
        display: inline-block;
        line-height: 30px;
        padding-left: 20px;
        color: #fff;
        font-size: 14px;
        border-radius: 10px;
        background: #1c86d4;
        vertical-align: middle;
        .check-change {
            width: 24px;
            height: 20px;
            background: #fff;
            display: inline-block;
            float: right;
            border-radius: 6px;
            margin: 4px;
            margin-right: 6px;
            vertical-align: middle;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
            i {
                color: #1c86d4;
                font-size: 20px;
                display: none;
            }
            i.check-i {
                display: block;
            }
        }
    }
    .operating-item {
        width: 340px;
        background: #fff;
        border: 1px solid #77B4ED;
        color: #1c86d4;
        margin-top: 10px;
        display: block;
        span.txt {
            float: left;
            display: inline-block;
            width: 270px;
            line-height: 28px;
            height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span.check-change {
            border: 1px solid #77B4ED;
            i {
                color: #77B4ED;
            }
        }
    }
}
</style>

