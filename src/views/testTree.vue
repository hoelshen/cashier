<template>
    <div>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
        <el-tree :data="brandClassList" :props="defaultProps" node-key="id" @node-click="handleNodeClick"></el-tree>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          defaultProps: {        //品类数配置
              label: 'catName',
              children: 'children'
          },
          brandClassList: [
            {
              "id": 3,
              "parentId": 0,
              "catName": "主站点根目录",
              "catSeq": 16,
              "icoUrl": null,
              "children": [
                {
                  "id": 26,
                  "parentId": 3,
                  "catName": "乌龙茶",
                  "catSeq": 1,
                  "icoUrl": null,
                  "children": [
                    {
                      "id": 27,
                      "parentId": 26,
                      "catName": "安溪铁观音",
                      "catSeq": 1,
                      "icoUrl": "//img1.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%AE%89%E6%BA%AA%E9%93%81%E8%A7%82%E9%9F%B3.jpg",
                      "children": []
                    },
                    {
                      "id": 28,
                      "parentId": 26,
                      "catName": "武夷大红袍",
                      "catSeq": 6,
                      "icoUrl": "//img0.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E6%AD%A6%E5%A4%B7%E5%A4%A7%E7%BA%A2%E8%A2%8D.jpg",
                      "children": []
                    },
                    {
                      "id": 29,
                      "parentId": 26,
                      "catName": "台湾高山茶",
                      "catSeq": 8,
                      "icoUrl": "//img1.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%8F%B0%E6%B9%BE%E9%AB%98%E5%B1%B1%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 98,
                      "parentId": 26,
                      "catName": "广东单枞",
                      "catSeq": 10,
                      "icoUrl": "//img2.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%B9%BF%E4%B8%9C%E5%8D%95%E4%BB%8E.jpg",
                      "children": []
                    },
                    {
                      "id": 91,
                      "parentId": 26,
                      "catName": "漳平水仙",
                      "catSeq": 11,
                      "icoUrl": "//img0.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E6%BC%B3%E5%B9%B3%E6%B0%B4%E4%BB%99.jpg",
                      "children": []
                    },
                    {
                      "id": 97,
                      "parentId": 26,
                      "catName": "其他乌龙茶",
                      "catSeq": 13,
                      "icoUrl": "//img3.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%85%B6%E4%BB%96%E4%B9%8C%E9%BE%99%E8%8C%B6.jpg",
                      "children": []
                    }
                  ]
                },
                {
                  "id": 35,
                  "parentId": 3,
                  "catName": "红茶",
                  "catSeq": 2,
                  "icoUrl": null,
                  "children": [
                    {
                      "id": 72,
                      "parentId": 35,
                      "catName": "金骏眉",
                      "catSeq": 6,
                      "icoUrl": "//img1.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E9%87%91%E9%AA%8F%E7%9C%89.jpg",
                      "children": []
                    },
                    {
                      "id": 36,
                      "parentId": 35,
                      "catName": "正山小种",
                      "catSeq": 7,
                      "icoUrl": null,
                      "children": []
                    },
                    {
                      "id": 37,
                      "parentId": 35,
                      "catName": "祁门红茶",
                      "catSeq": 8,
                      "icoUrl": null,
                      "children": []
                    },
                    {
                      "id": 38,
                      "parentId": 35,
                      "catName": "云南滇红",
                      "catSeq": 11,
                      "icoUrl": null,
                      "children": []
                    },
                    {
                      "id": 105,
                      "parentId": 35,
                      "catName": "英德红茶",
                      "catSeq": 19,
                      "icoUrl": "//img2.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E8%8B%B1%E5%BE%B7%E7%BA%A2%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 107,
                      "parentId": 35,
                      "catName": "锡兰红茶",
                      "catSeq": 20,
                      "icoUrl": "//img3.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E9%94%A1%E5%85%B0%E7%BA%A2%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 109,
                      "parentId": 35,
                      "catName": "九曲红梅",
                      "catSeq": 21,
                      "icoUrl": "//img1.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E4%B9%9D%E6%9B%B2%E7%BA%A2%E6%A2%85.jpg",
                      "children": []
                    }
                  ]
                },
                {
                  "id": 30,
                  "parentId": 3,
                  "catName": "绿茶",
                  "catSeq": 3,
                  "icoUrl": null,
                  "children": [
                    {
                      "id": 34,
                      "parentId": 30,
                      "catName": "龙井",
                      "catSeq": 15,
                      "icoUrl": "//img1.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E9%BE%99%E4%BA%95.jpg",
                      "children": []
                    },
                    {
                      "id": 59,
                      "parentId": 30,
                      "catName": "碧螺春",
                      "catSeq": 17,
                      "icoUrl": "//img0.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E7%A2%A7%E8%9E%BA%E6%98%A5.jpg",
                      "children": []
                    },
                    {
                      "id": 31,
                      "parentId": 30,
                      "catName": "黄山毛峰",
                      "catSeq": 18,
                      "icoUrl": "//img0.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E9%BB%84%E5%B1%B1%E6%AF%9B%E5%B3%B0.jpg",
                      "children": []
                    },
                    {
                      "id": 32,
                      "parentId": 30,
                      "catName": "六安瓜片",
                      "catSeq": 20,
                      "icoUrl": "//im2.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%85%AD%E5%AE%89%E7%93%9C%E7%89%87.jpg",
                      "children": []
                    },
                    {
                      "id": 33,
                      "parentId": 30,
                      "catName": "太平猴魁",
                      "catSeq": 21,
                      "icoUrl": "//img3.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%A4%AA%E5%B9%B3%E7%8C%B4%E9%AD%81.jpg",
                      "children": []
                    },
                    {
                      "id": 82,
                      "parentId": 30,
                      "catName": "安吉白茶",
                      "catSeq": 24,
                      "icoUrl": "//img0.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%AE%89%E5%90%89%E7%99%BD%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 104,
                      "parentId": 30,
                      "catName": "云南滇绿",
                      "catSeq": 26,
                      "icoUrl": "//img1.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E4%BA%91%E5%8D%97%E6%BB%87%E7%BB%BF.jpg",
                      "children": []
                    },
                    {
                      "id": 106,
                      "parentId": 30,
                      "catName": "四川绿茶",
                      "catSeq": 30,
                      "icoUrl": "//img2.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%9B%9B%E5%B7%9D%E7%BB%BF%E8%8C%B6.jpg",
                      "children": []
                    }
                  ]
                },
                {
                  "id": 39,
                  "parentId": 3,
                  "catName": "黑茶",
                  "catSeq": 14,
                  "icoUrl": null,
                  "children": [
                    {
                      "id": 40,
                      "parentId": 39,
                      "catName": "普洱茶",
                      "catSeq": 1,
                      "icoUrl": "//img4.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E6%99%AE%E6%B4%B1%E7%94%9F%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 85,
                      "parentId": 39,
                      "catName": "安化黑茶",
                      "catSeq": 6,
                      "icoUrl": "//img4.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%AE%89%E5%8C%96%E9%BB%91%E8%8C%B6.jpg",
                      "children": []
                    }
                  ]
                },
                {
                  "id": 60,
                  "parentId": 3,
                  "catName": "黄茶",
                  "catSeq": 21,
                  "icoUrl": null,
                  "children": [
                    {
                      "id": 61,
                      "parentId": 60,
                      "catName": "君山银针",
                      "catSeq": 1,
                      "icoUrl": null,
                      "children": []
                    },
                    {
                      "id": 86,
                      "parentId": 60,
                      "catName": "霍山黄芽",
                      "catSeq": 6,
                      "icoUrl": null,
                      "children": []
                    }
                  ]
                },
                {
                  "id": 41,
                  "parentId": 3,
                  "catName": "其它",
                  "catSeq": 22,
                  "icoUrl": null,
                  "children": [
                    {
                      "id": 101,
                      "parentId": 41,
                      "catName": "白茶",
                      "catSeq": 25,
                      "icoUrl": "//img4.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E7%99%BD%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 108,
                      "parentId": 41,
                      "catName": "茉莉花茶",
                      "catSeq": 26,
                      "icoUrl": "//img3.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E8%8C%89%E8%8E%89%E8%8A%B1%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 89,
                      "parentId": 41,
                      "catName": "玫瑰花茶",
                      "catSeq": 27,
                      "icoUrl": "//img2.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E7%8E%AB%E7%91%B0%E8%8A%B1%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 94,
                      "parentId": 41,
                      "catName": "养生茶",
                      "catSeq": 28,
                      "icoUrl": "//img0.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%85%BB%E7%94%9F%E8%8C%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 90,
                      "parentId": 41,
                      "catName": "其他花茶",
                      "catSeq": 29,
                      "icoUrl": "//img4.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E5%85%B6%E4%BB%96%E8%8A%B1%E8%8C%B6.jpg",
                      "children": []
                    }
                  ]
                },
                {
                  "id": 48,
                  "parentId": 3,
                  "catName": "茶具",
                  "catSeq": 23,
                  "icoUrl": null,
                  "children": [
                    {
                      "id": 49,
                      "parentId": 48,
                      "catName": "陶瓷茶具",
                      "catSeq": 1,
                      "icoUrl": "//img4.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E9%99%B6%E7%93%B7%E8%8C%B6%E5%85%B7.jpg",
                      "children": []
                    },
                    {
                      "id": 50,
                      "parentId": 48,
                      "catName": "紫砂茶具",
                      "catSeq": 6,
                      "icoUrl": "//img1.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E7%B4%AB%E7%A0%82%E8%8C%B6%E5%85%B7.jpg",
                      "children": []
                    },
                    {
                      "id": 51,
                      "parentId": 48,
                      "catName": "玻璃茶具",
                      "catSeq": 8,
                      "icoUrl": "//img3.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E7%8E%BB%E7%92%83%E8%8C%B6%E5%85%B7.jpg",
                      "children": []
                    },
                    {
                      "id": 52,
                      "parentId": 48,
                      "catName": "茶盘",
                      "catSeq": 14,
                      "icoUrl": "//img4.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E8%8C%B6%E7%9B%98.jpg",
                      "children": []
                    },
                    {
                      "id": 53,
                      "parentId": 48,
                      "catName": "茶道配件",
                      "catSeq": 16,
                      "icoUrl": "//img0.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E8%8C%B6%E9%81%93%E9%85%8D%E4%BB%B6.jpg",
                      "children": []
                    },
                    {
                      "id": 93,
                      "parentId": 48,
                      "catName": "铁壶",
                      "catSeq": 17,
                      "icoUrl": "//img2.zuipin.cn/new_pc/%E5%AF%BC%E8%88%AA%E6%A0%8F%E4%B8%89%E7%BA%A7%E5%88%86%E7%B1%BB/%E9%93%81%E5%A3%B6.jpg",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ],


        };
      },
      created(){
        //获取表格数据
        // getTableData(){
            // this.$ajax({
            //     method: 'get',
            //     url: `/apitest/propInfo/isCanEditProp?propId=215`             
            // }).then(function(response){
            //     if(response.data.status == 1){
            //        console.log(response)
            //     }else{
            //         alert(response.data.error_msg);
            //     }
            // }).catch(function(error){

            // });
        // },
        // this.$setContentName('测试树');
      },
      methods: {
        handleNodeClick(data) {
          console.log(data.catName);
        },
        //ajax获取数据
        getData(obj) {
            obj.uri = obj.uri || this.uri;
            obj.url = obj.url || '';
            obj.success = obj.success || function() {};
            obj.fail = obj.fail || function() {};
            obj.method = obj.method || 'post';
            obj.data = obj.data || {};
            obj.type = obj.type || 'form';
            const self = this;
            self.$ajax({
                method: 'post',
                url: `/admin/reqjava/reqdata?javauri=${obj.url}&javaReqMethod=${obj.method}&application=${obj.type}`,
                data: obj.data
            }).then(function(response){
                if(response.data.status === 1){
                    obj.success.call(self,response);
                }else{
                    console.log(response);
                    obj.fail.call(self,response);
                }

            }).catch(function(error){});
        },
      }
    };
</script>