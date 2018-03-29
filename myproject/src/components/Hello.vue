<template>
	<div>
		<banner>Hello I am hello</banner>
		<section id='intro'>
			<card type='centered'>
				<h1 slot="title" >Hello there</h1>
				<p slot="description" >
					This is a trello clone made with vueJs
				</p>
			</card>
		</section>
	</div>
</template>
<script>
import Banner from './Banner.vue';
import Card from './ui/card.vue';
export default {
	components: {
		Banner,
		Card,
	},
	data() {
		return {};
	},
};
</script>
