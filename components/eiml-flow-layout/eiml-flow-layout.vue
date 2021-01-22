<template>
	<view class="viewSpaceBetween">
		<view class="column" :style="{'width':columnWidth+'%'}" v-for="(itemTab,indexTab) in tabList" v-bind:key="indexTab">
			<view v-for="(item,index) in itemTab" v-bind:key="index">
				<view style="padding: 10rpx 5rpx 0rpx 5rpx;">
					<view style="padding: 10rpx;border-radius: 10rpx;background: white;">
						<image :src="item.logo" mode="widthFix" style="width: 100%;"></image>
						<view class="itemName">
							{{item.name}}
						</view>
						<view class="itemTitle" v-if="item.director">
							{{item.director}}
						</view>
						<view class="itemPrice" v-if="item.actors">
							{{item.actors}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--下段代码是预加载，渲染出来后遍能读取到组件的属性了，然后进行排版想要代码简单且通用，就需要牺牲一些东西-->
		<scroll-view style="width: 0rpx;height: 0rpx;">
			<view :id="'child'+index" v-for="(item,index) in list" v-bind:key="index">
				<view style="padding: 10rpx 5rpx 0rpx 5rpx;">
					<view style="padding: 10rpx;border-radius: 10rpx;background: white;">
						<image :src="item.logo" mode="widthFix" style="width: 100%;"></image>
						<view class="itemName">
							{{item.name}}
						</view>
						<view class="itemTitle" v-if="item.director">
							{{item.director}}
						</view>
						<view class="itemPrice" v-if="item.actors">
							{{item.actors}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		props: ["columnNum", "list"],
		watch: {
			list(data1, data2) {
				if (this.lastChildCount != this.list.length) {
					this.queryHeight();
				}
			}
		},
		data() {
			return {
				defColumnNum: 2, //默认列数，如果不传，则默认两列
				columnWidth: 0,

				lastChildCount: 0,

				tabList: []

			}
		},
		mounted() {
			// console.log("------------mounted")
			// this.queryHeight();
		},
		methods: {
			queryHeight() {
				if (this.columnNum == null || this.columnNum == "") {
					this.columnNum = this.defColumnNum;
				}
				this.columnWidth = 100 / this.columnNum;

				var that = this;
				var temHeightList = {};
				const query = uni.createSelectorQuery().in(this);
				for (var i = 0; i < this.list.length; i++) {
					query.select('#child' + i).boundingClientRect(data => {
						temHeightList[data.id] = data.height;

						if (data.id == ('child' + (that.list.length - 1))) {
							that.refreshLayout(temHeightList);
						}
					}).exec();
				}
			},
			refreshLayout(listHeight) {
				var temTabList = [];
				var temTabHeightList = [];
				for (var i = 0; i < this.columnNum; i++) {
					var temArr = [];
					temTabList[i] = temArr;
					temTabHeightList[i] = 0;
				}


				for (var i = 0; i < this.list.length; i++) {
					var item = this.list[i];
					var itemHeight = listHeight['child' + i];

					var minHeight = 1000000;
					var minIndex = 0;
					for (var j = 0; j < temTabHeightList.length; j++) {
						var tempHeight = temTabHeightList[j];
						if (tempHeight < minHeight) {
							minHeight = tempHeight;
							minIndex = j;
						}
					}
					temTabList[minIndex].push(item);
					temTabHeightList[minIndex] += itemHeight;
				}

				this.tabList = temTabList;

				this.lastChildCount = this.list.length;
				// console.log("=======刷新完成======",temTabList)
			}

		}
	}
</script>

<style>
	.viewSpaceBetween {
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		align-items: flex-start;
	}

	.column {
		flex-grow: 1;
	}

	.itemTitle {
		font-size: 26rpx;
		color: #666;
		line-height: 40rpx;
		margin-bottom: 10rpx;
	}

	.itemName {
		font-size: 32rpx;
		margin: 20rpx 0;
		line-height: 40rpx;
	}

	.itemPrice {
		font-size: 24rpx;
		color: #666;
		line-height: 30rpx;
		margin-bottom: 20rpx;
	}
</style>
