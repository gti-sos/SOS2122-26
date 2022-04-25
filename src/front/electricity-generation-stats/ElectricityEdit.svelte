<script>
    import { onMount }from "svelte";
    import { pop }from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
    import { Alert } from 'sveltestrap';

    var BASE_API_PATH = "/api/v2/electricity-generation-stats";
    let visible = false;
    let color = "danger";

    export let params = {};
     /**
            * country: "spain",
                       year: 2020,
                       installed_capacity_mw: 110287,
                       generation_gwh: 502797,
                       renovable_inst_cap_mw: 55492,
                       renovable_gen_gwh: 110605,
                       renovable_percentage: 22.0,
                       var: 3.23,
            */

    let electricityStats = {};
    let updatedInstalled_capacity_mw = "";
    let updatedGeneration_gwh = "";
    let updatedRenovable_inst_cap_mw = "";
    let updatedRenovable_gen_gwh = "";
    let updatedRenovable_percentage = "";
    let updatedVar = "";
    let errorMsg = "";

    onMount(getStat);

    async function getStat(){
        console.log("Fetching datas...");
        const res = await fetch(BASE_API_PATH + "/" + params.country + "/" + params.year);
        if(res.ok){
            console.log("Ok");
            const json = await res.json();
            updatedInstalled_capacity_mw = electricityStats.updatedInstalled_capacity_mw;
            updatedGeneration_gwh = electricityStats.updatedGeneration_gwh;
            updatedRenovable_inst_cap_mw = electricityStats.updatedRenovable_inst_cap_mw;
            updatedRenovable_gen_gwh = electricityStats.updatedRenovable_gen_gwh;
            updatedRenovable_percentage = electricityStats.updatedRenovable_percentage;
            updatedVar = electricityStats.updatedVar;

            console.log("Recived data");
        }else{
            visible = true;
            color = "danger"
            errorMsg = "Error " + res.status + " : " + "Ningún recurso con los parametros " + params.country +" " + params.year;
            console.log("ERROR" + errorMsg);
        }
    }
    async function updateStat(){            
            console.log("Editing life stats data...");
            const res = await fetch(BASE_API_PATH + "/" + params.country + "/" + params.year, {
                    method:"PUT",
                    body : JSON.stringify({
                        country: params.country,
                        year: parseInt(params.year),
                        installed_capacity_mw: parseInt(updatedInstalled_capacity_mw),
                        generation_gwh: parseInt(updatedGeneration_gwh),
                        renovable_inst_cap_mw: parseInt(updatedRenovable_inst_cap_mw),
                        renovable_gen_gwh: parseInt(updatedRenovable_gen_gwh),
                        renovable_percentage: parseFloat(updatedRenovable_percentage),
                        var: parseFloat(updatedVar)
                    }),
                    headers:{
                        "Content-Type": "application/json"
                    }
                }).then(function (res) {
                    visible = true;
                    if(res.status == 200){
                        getStat(); 
                        console.log("Data introduced");
                        color = "success";
                        errorMsg="Recurso actualizado correctamente";
                    }else if(res.status == 400){
                        console.log("Data incorrect");
                        errorMsg="Campos incorrectos";
                    }
                    else{
                        console.log("Data not edited");
                        errorMsg= "Rellene todos los campos";
                    }
                });	
    }
</script>

<main>

    <Alert color={color} isOpen={visible} toggle={() => (visible = false)}>
        {#if errorMsg}
		    {errorMsg}
	    {/if}
    </Alert>

    <h1>Recurso '{params.country} , {params.year} ' listo para editar</h1>
    <Table bordered>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Capacidad Instalada (MW)</th>
                <th>Generación (GW/h)</th>
                <th>Capacidad Instalada Renovable (MW)</th>
                <th>Generación renovable (GW/h)</th>
                <th>% Renovable</th>
                <th>Var</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                
                <td>{params.country}</td>
                <td>{params.year}</td>
                <td><input bind:value="{updatedInstalled_capacity_mw}"></td>
                <td><input bind:value="{updatedGeneration_gwh}"></td>
                <td><input bind:value="{updatedRenovable_inst_cap_mw}"></td>
                <td><input bind:value="{updatedRenovable_gen_gwh}"></td>
                <td><input bind:value="{updatedRenovable_percentage}"></td>
                <td><input bind:value="{updatedVar}"></td>
                <td><Button outline color="primary" on:click={updateStat}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>

    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>