<template>
	<view class="player-bg">
		
	</view>
</template>

<script>
	import imtAudio from 'components/imt-audio/imt-audio'
	export default {
		components: {
			imtAudio
		},
		data() {
			return {
				audio: [
					{
						name:'ahahahahahhahah',
						img:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/fb0b217c189648b7a0e576f4e440c156.png',
						url:'http://xiaozhang.php-cli.cn/music-1.mp3'
					},
					{
						name:'1111',
						img:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/fb0b217c189648b7a0e576f4e440c156.png',
						url:'http://xiaozhang.php-cli.cn/music-2.mp3'
					},
					{
						name:'2222',
						img:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/fb0b217c189648b7a0e576f4e440c156.png',
						url:'http://xiaozhang.php-cli.cn/music-3.mp3'
					},
					{
						name:'333444',
						img:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/fb0b217c189648b7a0e576f4e440c156.png',
						url:'http://xiaozhang.php-cli.cn/music-4.mp3'
					},
					{
						name:'5555555',
						img:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/fb0b217c189648b7a0e576f4e440c156.png',
						url:'http://xiaozhang.php-cli.cn/music-5.mp3'
					}
				]
			}
		},
		methods: {
		}
	}
</script>

<style lang="less">
	@import url('./index.less');
</style>
