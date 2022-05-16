<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import Info from "./Info.svelte";
	import Defense from "./defense-spent-stats/Defense.svelte";
	import DefenseEdit from "./defense-spent-stats/DefenseEdit.svelte";
	import DefenseGraph from "./defense-spent-stats/GraphDefense.svelte";
	import Electricity from "./electricity-generation-stats/Electricity.svelte";
	import ElectricityEdit from "./electricity-generation-stats/ElectricityEdit.svelte";
	import GraphElectricity from "./electricity-generation-stats/GraphElectricity.svelte";
	import CommonGraph from "./CommonGraph.svelte";
	import {Navbar,NavbarBrand,Nav,NavItem,NavLink } from 'sveltestrap';
	
	const routes = {
		
		"/": Home,
		"/defense-spent-stats" : Defense,
		"/defense-spent-stats/:country/:year" : DefenseEdit,
		"/defense-graph" : DefenseGraph,
		"/electricity-generation-stats" : Electricity,
		"/electricity-graph" : GraphElectricity,
		"/electricity-generation-stats/:country/:year" : ElectricityEdit,
		"/info": Info,
		"/common-graph" : CommonGraph
	};
</script>

<main>
	<body >
        <Navbar color="dark" dark expand = "md" >
            <NavbarBrand href="/">SOS2021-26</NavbarBrand>
            <Nav navbar class='ms-auto'>
              <NavItem  >
                <NavLink href="#/">Inicio</NavLink>
              </NavItem>
              <NavItem  >
                <NavLink href="#/info">Información</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/defense-spent-stats">Tabla defensa</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/electricity-generation-stats">Tabla electricidad</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/common-graph">Tabla conjunta</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    
    </body>




	<Router {routes} />

</main>