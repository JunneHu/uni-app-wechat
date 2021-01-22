<template>
	<view :class="fit ? 'fit' : ''">
		<eimlFlow :list="list" :columnNum="2"></eimlFlow>
	</view>
</template>

<script>
	import config from '../../config/index.js'
	import {
		httpsRequest
	} from '../../utils/index.js';
	import eimlFlow from '@/components/eiml-flow-layout/eiml-flow-layout.vue'
	export default {
		components: {
			eimlFlow
		},
		data() {
			return {
				fit:false,
				list: [],
				total: -1,
				pageTotal: 0,
				isLoading: false,
				noMoreData: false,
				postData: {
					citycode: '330100',
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		methods: {
			getList() {
				if (this.isLoading) return;
				this.isLoading = true
				uni.showLoading({
					title: '正在加载更多'
				})
				httpsRequest(config.api.DuMovieHotMovieList, 'GET', this.postData, (data) => {
					this.isLoading = false
					uni.hideLoading()
					if (data.code === '1000') {
						const {
							list,
							pageTotal,
							total,
							current
						} = data.data
						this.list = [...this.list, ...list]
						this.total = total
						this.pageTotal = pageTotal
						if (current === pageTotal) {
							this.noMoreData = true
						} else {
							this.noMoreData = false
						}
					}
				}, false);
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync()
			if (res.model.search('iPhone X') != -1) {
				this.fit = true
			} else {
				this.fit = false
			}
			this.getList()
		},
		onReachBottom() {
			if (this.pageTotal > this.postData.pageIndex) {
				this.postData.pageIndex += 1;
				this.getList()
			}
		},
		onPullDownRefresh() {
			this.list = [];
			this.postData.pageIndex = 1;
			this.getList()
			uni.stopPullDownRefresh()
		}
	}
</script>

<style>
	.fit {
		padding-top: 120rpx;
	}
</style>
