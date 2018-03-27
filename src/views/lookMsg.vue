<template>
    <div id="lookMsg">
        <div class="ql-container ql-snow">
            <div class="ql-editor" v-html="content" ref="editor">
                <div style="position: absolute;top: 162px;left: 704px;width:98px;height:38px;line-height: 38px;border-radius: 4px;border: solid 1px #ff9819;font-size: 14px;color: #ff9819;text-align: center;cursor: pointer;" click="alert(222)">查看详情</div>
            </div>
        </div>
    </div>
</template>

<script>
let qs = require('qs');
export default {
    data() {
        return {
            noticeId: '',       //id
            content: '',        //内容
            copyContent: '',        //内容
            url: '',             //url
            count: 0,
        }
    },
    methods: {
    },
    watch: {
        url(v) {
            console.log(v);
            this.$ajax.post('/api/http/NoticeInfo/createCard.jhtml',
                qs.stringify({
                    cardUrl: v
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            ).then(res => {
                console.log(res);
                console.log(this.$refs.editor);
                this.copyContent.split('<p>链接：').slice(1).map(v => {
                    this.url = this.url + v.split('</p><p>sku')[0] + ',';
                });
            })
        }
    },
    created() {
        this.$route.query.content ? this.content = this.$route.query.content : null;
        if (this.$route.query.id) {
            this.noticeId = this.$route.query.id;
            this.$ajax.post('/api/http/NoticeInfo/getNoticeInfoDetail.jhtml',
                qs.stringify({
                    'noticeId': this.noticeId,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            ).then(res => {
                if (res.data.success === 1) {
                    this.content = `<div style="width: 100%;height: 240px;background-color: #f7f9fa;position: relative;">
                    <img style="width: 200px;position: absolute;top: 20px;left: 20px;" src="http://imgcbt.oss-cn-hangzhou.aliyuncs.com/22">
                    <p style="position: absolute;top: 25px;left: 240px;line-height: 18px;font-size: 18px;font-weight: 600;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:700px" title="标题：宜兴紫砂壶 国营一厂 潘梅强定制 220ml 黑料点砂钟式壶标题：宜兴紫砂壶 国营一厂 潘梅强定制 220ml 黑料点砂钟式壶">标题：宜兴紫砂壶 国营一厂 潘梅强定制 220ml 黑料点砂钟式壶标题：宜兴紫砂壶 国营一厂 潘梅强定制 220ml 黑料点砂钟式壶</p>
                    <p style="position: absolute;top: 59px;left: 240px;line-height: 14px;font-size: 14px;color: #999999;width:700px" title="标题：宜兴紫砂壶 国营一厂 潘梅强定制 220ml 黑料点砂钟式壶标题：宜兴紫砂壶 国营一厂 潘梅强定制 220ml 黑料点砂钟式壶">标题：宜兴紫砂壶 国营一厂 潘梅强定制 220ml 黑料点砂钟式壶</p>
                    <p style="position: absolute;top: 114px;left: 240px;line-height: 14px;font-size: 14px;color: #999999;">醉品价：</p>
                    <p style="position: absolute;top: 116px;left: 335px;line-height: 14px;font-size: 14px;color: #333333;font-weight:550;">￥500</p>
                    <p style="position: absolute;top: 147px;left: 240px;line-height: 14px;font-size: 14px;color: #999999;">代理价：</p>
                    <p style="position: absolute;top: 147px;left: 335px;line-height: 16px;font-size: 16px;color: #ff9819;font-weight:550;">￥500</p>
                    <div style="position: absolute;top: 162px;left: 704px;width:98px;height:38px;line-height: 38px;border-radius: 4px;border: solid 1px #ff9819;font-size: 14px;color: #ff9819;text-align: center;cursor: pointer;" onClick="alert(222)">查看详情</div>
                    </div>`
                    this.content = res.data.result.noticeContent.replace('/(<p>&lt;卡片&gt;</p>).*?(<p>&lt;/卡片&gt;</p>)/', '222222')
                        .split('<p>链接：')[0].split('<p>&lt;卡片&gt;</p>')[0];
                    this.copyContent = res.data.result.noticeContent;
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.ql-container {
    margin: 20px auto;
    background: #ffffff;
    width: 1002px;
}
</style>


