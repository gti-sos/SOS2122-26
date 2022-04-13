<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import Defense from "./defense-spent-stats/Defense.svelte";
	import DefenseEdit from "./defense-spent-stats/DefenseEdit.svelte";
	
	const routes = {
		
		"/": Home,
		"/defense-spent-stats" : Defense,
		"/defense-spent-stats/:country/:year" : DefenseEdit
	};
</script>

<main>
	<Router {routes} />
</main>