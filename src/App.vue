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
	components :{
		slideBar,
		mainWrap
	},
}
</script>

<style lang="less">
	@import './assets/less/common.less';
</style>
