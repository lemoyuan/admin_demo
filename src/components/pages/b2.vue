<template>
  <div class='header-div'>
   bbbbbbbbbbbbbbbbbbbbbbbbbb22222222222222
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
                                menus:[
                                    {
                                        name:"aaaaaaa1",
                                        menus:[

                                        ]
                                    },
                                    {
                                        name:"aaaaaaa2",
                                        menus:[

                                        ]
                                    },
                                ]
                            },
                            {
                                 name:"b",
                                menus:[

                                ]
                            }
                           
                        ]
                    },
                    {
                        name:"2222",
                        menus:[
                            {
                                 name:"a",
                                menus:[
                                    {
                                        name:"aaaaaaa1",
                                        menus:[

                                        ]
                                    },
                                    {
                                        name:"aaaaaaa2",
                                        menus:[

                                        ]
                                    },
                                ]
                            },
                            {
                                 name:"b",
                                menus:[

                                ]
                            }
                           
                        ]
                    }
                ]
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

    }
}
</script>
<style lang="scss" scoped>


</style>