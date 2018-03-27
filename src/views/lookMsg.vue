<template>
    <div id="lookMsg">
        <div>
            {{ content }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content:'',
        }
    },
    created(){
        this.content = this.$route.query.content;
        console.log(this.content);
    }
}
</script>

