<template>
	<view>
		<view class="crad-bg">
			<myShare :shareImg="shareImg" :imgScan="imgScan" :txtArr="txtArr" :shareImgW="750" :shareImgH="1448" :imgArr="imgArr" />
		</view>
	</view>
</template>

<script>
	import myShare from '@/components/my-share/my-share.vue'
	export default {
		components: {
			myShare
		},
		data() {
			return {
				fit: false,
				shareImg: 'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/fb0b217c189648b7a0e576f4e440c156.png',
				imgScan: "https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png",
				txtArr: [{
					x: 80,
					y: 600,
					txt: '这是标题',
					color: '#ffffff',
					size: 32,
				}, {
					x: 80,
					y: 700,
					txt: '这是内容这是内容这是内容这是内容这是内容这是内容',
					color: '#ffffff',
					size: 28,
				}, {
					x: 80,
					y: 800,
					txt: '这是内容这是内容这是内容这是内容这是内容这是内容',
					color: '#ffffff',
					size: 28,
				}, {
					x: 80,
					y: 900,
					txt: '这是内容这是内容这是内容这是内容这是内容这是内容',
					color: '#ffffff',
					size: 28,
				}],
				imgArr: [{
					path: 'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png',
					w: 140,
					h: 140,
					x: 375,
					y: 900,
				}, {
					path: 'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png',
					w: 140,
					h: 140,
					x: 375,
					y: 1200,
				}]
			};
		},
		onLoad() {
			const res = uni.getSystemInfoSync()
			if (res.model.search('iPhone X') != -1) {
				this.fit = true
			} else {
				this.fit = false
			}
		},
	}
</script>

<style lang="less">
	.fit {
		padding-top: 32px;
	}

	.crad-bg {
		width: 100%;
		height: 100vh;
	}
</style>
