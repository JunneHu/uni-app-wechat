<template>
	<view :class="fit ? 'fit bg-red' : 'bg-red'">
		<view class="title">标题标题</view>
		<view class="banner">
			<image src="https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/39005a56c1604a76826f74b2212ceab8.png"></image>
		</view>
		<view class="content">
			<view class="search-bg">
				<view class="txt-bg"><view class="cuIcon-search"></view>请输入搜索内容</view>
				<view class="btn bg-red">搜索</view>
			</view>
			<view class="menu-bg">
				<view class="item" v-for="(item,index) in kingKongArea" :key="index">
					<image :src="item.bannerUrl" />
					<view class="name text-cut">{{item.bannerName}}</view>
				</view>
			</view>
			<view class="pro-con" v-for="(item,index) in goodList">
				<view class="line-banner">
					<swiper class="swiper" :indicator-dots="true" indicator-color="rgba(255, 255, 255, .7)" indicator-active-color="#fff" :autoplay="true">
						<swiper-item class="swiper-item">
							<image src="https://fulu-mall.oss-cn-hangzhou.aliyuncs.com/e688b1b967c6478b830adbe970cd4cd1.png" class="img" />
						</swiper-item>
					</swiper>
				</view>
				<view class="ul-name">{{item.categoryName}}<view class="more">更多<view class="cuIcon-right"></view></view></view>
				<view class="ul">
					<view class="li" v-for="(v,i) in item.list">
						<image :src="v.productImage" />
						<view class="c-name text-cut">{{v.proTitle}}</view>
						<view class="price">{{v.price}}<text class="text-xs">元</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script src='./index.js'></script>
<style src='./index.less' lang="less"></style>