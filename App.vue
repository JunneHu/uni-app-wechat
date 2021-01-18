<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "static/css/main.wxss";
	@import "static/css/icon.wxss";
	button,
	view,
	text {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	
	button {
		border: none !important;
	}
</style>
