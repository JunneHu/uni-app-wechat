<template>
	<view>
		<tabs :tabData="dataList" :activeIndex="activeTab" @tabClick='choseTab' />
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
				dataList: [{
					name: '全部',
					list: [{
						"name": "1",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
					}]
				},{
					name: '热门推荐',
					list: [{
						"name": "2",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
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
