<template>
	<view>
		<tabs ref="child" :tabData="dataList" :activeIndex="activeTab" @tabClick='choseTab' :config='config' />
		<swiper class="swiper" :current="activeTab" @change="change">
			<swiper-item class="swiper-item" v-for="(item,index) in dataList" :key="index">
				<view class="li" v-for="(v,i) in item.list">
					{{v.name}}
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import tabs from "@/components/tabs/tabs.vue";
	export default {
		components: {
			tabs
		},
		data() {
			return {
				activeTab: 0,
				config:{
					key: 'title',
				},
				dataList: [{
					title: '全部',
					list: [{
						"name": "1"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "2"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "3"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "4"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "5"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "6"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "7"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "8"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "9"
					}]
				},{
					title: '热门推荐',
					list: [{
						"name": "10"
					}]
				}]
			};
		},
		methods: {
			choseTab(index) {
				this.activeTab = index;
			},
			change(e){
				this.activeTab = e.detail.current;
				this.$refs.child.tabToIndex(this.activeTab)
			}
		}
	}
</script>

<style lang="less">
	.swiper-item{
		.li{
			padding: 36rpx;
			box-sizing: border-box;
		}
	}
</style>
