<template>
	<div id="app">
		<slide-bar></slide-bar>
		<main-wrap></main-wrap>
	</div>
</template>

<script>
import slideBar from './components/slideBar.vue';
import mainWrap from './components/mainWrap.vue';
export default {
	data () {
	    return {
		    msg: 'Want something new?'
		}
	},
	components :{
		slideBar,
		mainWrap
	},
	methods: {
		startHacking () {
			this.$notify({
				title: 'Shhh',
				message: 'Just be patient...',
				duration: 6000
			})
		}
	}
}
</script>

<style lang="less">
	@import './assets/less/common.less';
</style>
