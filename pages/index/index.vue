<template>
	<view class="fit" v-if="fit">
		11
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fit:false
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync()
			if(res.model.search('iPhone X') != -1){
				this.fit = true
			}else {
				this.fit = false
			}
		},
		mounted() {
			
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.fit{
		padding-top: 30px;
	}
</style>
