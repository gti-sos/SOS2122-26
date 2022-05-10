<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import Info from "./Info.svelte";
	import Defense from "./defense-spent-stats/Defense.svelte";
	import DefenseEdit from "./defense-spent-stats/DefenseEdit.svelte";
	import DefenseGraph from "./defense-spent-stats/GraphDefense.svelte";
	import Electricity from "./electricity-generation-stats/Electricity.svelte";
	import ElectricityEdit from "./electricity-generation-stats/ElectricityEdit.svelte";
	import CommonGraph from "./CommonGraph.svelte";
	
	const routes = {
		
		"/": Home,
		"/defense-spent-stats" : Defense,
		"/defense-spent-stats/:country/:year" : DefenseEdit,
		"/defense-graph" : DefenseGraph,
		"/electricity-generation-stats" : Electricity,
		"/electricity-generation-stats/:country/:year" : ElectricityEdit,
		"/info": Info,
		"/common-graph" : CommonGraph
	};
</script>

<main>
	<Router {routes} />
</main>