<script>
    import { onMount }from "svelte";
    import { pop }from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
    import { Alert } from 'sveltestrap';

    var BASE_API_PATH = "/api/v2/defense-spent-stats";
    let visible = false;
    let color = "danger";

    export let params = {};
    
    let defenseStats = {};
    let updatedSpen_mill_eur = "";
    let updatedPublic_percent = "";
    let updatedPib_percent = "";
    let updatedPer_capita = "";
    let updatedVar = "";
    let errorMsg = "";

    onMount(getStat);

    async function getStat(){
        console.log("Fetching datas...");
        const res = await fetch(BASE_API_PATH + "/" + params.country + "/" + params.year);
        if(res.ok){
            console.log("Ok");
            const json = await res.json();
            updatedSpen_mill_eur = defenseStats.updatedSpen_mill_eur;
            updatedPublic_percent = defenseStats.updatedPublic_percent;
            updatedPib_percent = defenseStats.updatedPib_percent;
            updatedPer_capita = defenseStats.updatedPer_capita;
            updatedVar = defenseStats.updatedVar;

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
                        spen_mill_eur: parseFloat(updatedSpen_mill_eur),
                        public_percent: parseFloat(updatedPublic_percent),
                        pib_percent: parseFloat(updatedPib_percent),
                        per_capita: parseFloat(updatedPer_capita),
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
                    }else{
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
                <th>País</th>
                <th>Año</th>
                <th>Gasto en millones</th>
                <th>Gasto publico</th>
                <th>Porcentaje PiB</th>
                <th>Per Capita</th>
                <th>Var</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{params.country}</td>
                <td>{params.year}</td>
                <td><input bind:value="{updatedSpen_mill_eur}"></td>
                <td><input bind:value="{updatedPublic_percent}"></td>
                <td><input bind:value="{updatedPib_percent}"></td>
                <td><input bind:value="{updatedPer_capita}"></td>
                <td><input bind:value="{updatedVar}"></td>
                <td><Button outline color="primary" on:click={updateStat}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>

    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>