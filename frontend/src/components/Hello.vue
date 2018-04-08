<template>
	<div>
		<banner>Hello I am hello</banner>
		<section id='intro'>
			<card type='centered'>
				<h1 slot="title" >Hello there</h1>
				<div slot="description" >
					<p>This is an open source trello clone made with vueJs.
					It is absolutely not finished, this is just a test server. There is some functionality, but it's not really usable as full product yet. If you have suggestions or want to contribute, the github repo is available below.</p>
					<a href="https://github.com/JBuma/VueTrello">This One</a>
				</div>
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
