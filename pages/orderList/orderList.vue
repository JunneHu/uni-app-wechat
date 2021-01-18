<template>
	<view>
		<tabs :tabData="dataList" :activeIndex="activeTab" @tabClick='choseTab' />
		<swiper class="swiper" current="activeTab" @change="change">
			<swiper-item class="swiper-item" v-for="(item,index) in dataList">
				<view class="li" v-for="(v,i) in item.list">
					{{v.name}}
					<image :src="v.logo"></image>
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
				activeTab: 1,
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
				},{
					name: '野性的呼唤',
					list: [{
						"name": "3",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
					}]
				},{
					name: '哈哈哈哈',
					list: [{
						"name": "4",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
					}]
				},{
					name: '热门',
					list: [{
						"name": "5",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
					}]
				},{
					name: '热门',
					list: [{
						"name": "6",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
					}]
				},{
					name: '热门',
					list: [{
						"name": "7",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
					}]
				},{
					name: '热门',
					list: [{
						"name": "8",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
					}]
				},{
					name: '热门',
					list: [{
						"name": "9",
						"logo": "https://gw.alicdn.com/tfscom/i3/O1CN01tbQl4m1EiN7QSdXns_!!6000000000385-0-alipicbeacon.jpg"
					}]
				},{
					name: '热门',
					list: [{
						"name": "10",
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
				console.log(e,'---')
			}
		}
	}
</script>

<style lang="less">

</style>
