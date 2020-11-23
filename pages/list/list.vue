<template>
	<view>
		<wfalls-flow :list="list" ref="wfalls" @finishLoad="getLoadNum"></wfalls-flow>
	</view>
</template>

<script>
	import wfallsFlow from '@/components/wfalls-flow/wfalls-flow.vue'
	const list =[{
		image:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/fb0b217c189648b7a0e576f4e440c156.png',
		id:'222',
		content:'111'
	},
	{
		image:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png',
		id:'222',
		content:'111'
	},
	{
		image:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png',
		id:'222',
		content:'111'
	},
	{
		image:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png',
		id:'222',
		content:'111'
	},
	{
		image:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png',
		id:'222',
		content:'111'
	},
	{
		image:'https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/f8a01eb3aa0b4df08501f87d3f8bf956.png',
		id:'222',
		content:'111'
	}]
	export default {
		components: {
			wfallsFlow
		},
		data() {
			return {
				list: [],
				isNewRenderDone: false //锁的作用
			}
		},
		methods: {
			getLoadNum(num) {
				console.log('共加载了:' + num);
				!this.isNewRenderDone && uni.hideLoading()
				this.isNewRenderDone = true
			}
		},
		onLoad() {
			// 模拟首次加载列表数据
			setTimeout(() => {
				this.list = list;
				this.$refs.wfalls.init();
			}, 1000)
		},
		onReachBottom() {
			console.log('onReachBottom');
			// 加锁，避免在加载更多时用户频繁下拉导致的重复触发而渲染异常
			if (!this.isNewRenderDone) return;
			this.isNewRenderDone = false
			uni.showLoading({
				title: '正在加载更多'
			})
			// 模拟分页请求 (加载更多)
			setTimeout(() => {
				const nextData = JSON.parse(JSON.stringify(this.list.slice(0, 10)))
				this.list.push(...nextData);
				// this.$nextTick(()=>{
				//     this.$refs.wfalls.handleViewRender();
				// })
				// APP上触发不了还是setTimeout万能
				setTimeout(() => {
					this.$refs.wfalls.handleViewRender();
				}, 0)
			}, 800)
		},
		onPullDownRefresh() {
			// 模拟更新新数据
			const newData = JSON.parse(JSON.stringify(this.list.slice(0, 10)))
			setTimeout(() => {
				this.list = newData;
				this.$refs.wfalls.init()
				uni.stopPullDownRefresh()
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				})
			}, 800)
		}
	}
</script>

<style>

</style>
