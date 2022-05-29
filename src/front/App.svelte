<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import Info from "./Info.svelte";
	import Defense from "./defense-spent-stats/Defense.svelte";
	import DefenseEdit from "./defense-spent-stats/DefenseEdit.svelte";
	import DefenseGraph1 from "./defense-spent-stats/GraphDefense.svelte";
	import Electricity from "./electricity-generation-stats/Electricity.svelte";
	import ElectricityEdit from "./electricity-generation-stats/ElectricityEdit.svelte";
	import GraphElectricity from "./electricity-generation-stats/GraphElectricity.svelte";
	import CommonGraph from "./CommonGraph.svelte";
	import {Navbar,NavbarBrand,Nav,NavItem,NavLink } from 'sveltestrap';
	import Integraciones from "./Integraciones.svelte";
	import Videos from "./Videos.svelte";

	//Integraciones Pablo
	import DefenseGraph2 from "./defense-spent-stats/FusionGraphDefense.svelte";
	import Prueba from "./defense-spent-stats/integrations/prueba.svelte";
	import Integration1 from "./defense-spent-stats/integrations/Integration1.svelte";
	import Integration2 from "./defense-spent-stats/integrations/Integration2.svelte";
	import Integration3 from "./defense-spent-stats/integrations/Integration3.svelte";
	import Integration4 from "./defense-spent-stats/integrations/Integration4.svelte";
	import Integration5 from "./defense-spent-stats/integrations/Integration5.svelte";
	import Integration6 from "./defense-spent-stats/integrations/Integration6.svelte";
	
	const routes = {
		
		"/": Home,
		"/defense-spent-stats" : Defense,
		"/defense-spent-stats/:country/:year" : DefenseEdit,
		"/defense-spent-stats/defense-graph-1" : DefenseGraph1,
		"/electricity-generation-stats" : Electricity,
		"/electricity-graph" : GraphElectricity,
		"/electricity-generation-stats/:country/:year" : ElectricityEdit,
		"/info": Info,
		"/analytics" : CommonGraph,
		"/prueba" : Prueba,
		"/defense-spent-stats/int-1" : Integration1,
		"/defense-spent-stats/int-2" : Integration2,
		"/defense-spent-stats/int-3" : Integration3,
		"/defense-spent-stats/int-4" : Integration4,
		"/defense-spent-stats/int-5" : Integration5,
		"/defense-spent-stats/int-6" : Integration6,
		"/defense-spent-stats/defense-graph-2" : DefenseGraph2,
		"/integrations" : Integraciones,
		"/about" : Videos
		
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
                <NavLink href="#/analytics">Gráfica conjunta</NavLink>
              </NavItem>
			  <NavItem>
                <NavLink href="#/integrations">Integraciones</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    
    </body>




	<Router {routes} />

</main>