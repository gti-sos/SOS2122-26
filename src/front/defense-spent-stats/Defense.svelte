<script>
    import { onMount } from 'svelte';
    import Table from 'sveltestrap/src/Table.svelte';
    import Button from 'sveltestrap/src/Button.svelte';
	import { Alert } from 'sveltestrap';
    
    var BASE_API_PATH = "/api/v2/defense-spent-stats";

    let entries = [];
	let newEntry = {
		country: "",
		year: null,
		spen_mill_eur: null,
        public_percent: null,
        pib_percent: null,
        per_capita: null,
        var: null
	}
    let checkMSG = "";
    let visible = false;
    let color = "danger";
    let page = 1;
    let totaldata=6;
    
    onMount(getEntries);

    //GET

    async function getEntries(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v2/defense-spent-stats"); 
        if(res.ok){
            console.log("Ok:");
            const data = await res.json();
            entries = data;
            console.log("Received entries: "+entries.length);
        }else {
                checkMSG= res.status + ": Recursos no encontrados ";
                console.log("ERROR! no encontrado");
            }
    }

    //GET INITIALDATA

    async function loadStats() {
 
        console.log("Fetching entry data...");
        await fetch(BASE_API_PATH + "/loadInitialData");
        const res = await fetch(BASE_API_PATH + "?limit=10&offset=0");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            entries = json;
            visible = true;
            totaldata=6;
            console.log("Received " + entries.length + " entry data.");
            color = "success";
            checkMSG = "Datos cargados correctamente";
        } else {
            color = "danger";
            checkMSG= res.status + ": " + "No se pudo cargar los datos";
            console.log("ERROR! ");
        }
    }

    //INSERT DATA

    async function insertStat(){
		 
         console.log("Inserting resources...");
         if (newEntry.country == "" || newEntry.year == null ||
            newEntry.spen_mill_eur == null || newEntry.public_percent == null || newEntry.pib_percent == null 
            || newEntry.per_capita == null || newEntry.var == null) {
             alert("Los campos no pueden estar vacios");
         } else{
             const res = await fetch(BASE_API_PATH,{
                 method:"POST",
                 body:JSON.stringify({
                        country: newEntry.country,
                        year: parseInt(newEntry.year),
                        spen_mill_eur: parseFloat(newEntry.spen_mill_eur),
                        public_percent: parseFloat(newEntry.public_percent),
                        pib_percent: parseFloat(newEntry.pib_percent),
                        per_capita: parseFloat(newEntry.per_capita),
                        var: parseFloat(newEntry.var) 
                    }),
                 headers:{
                     "Content-Type": "application/json"
                }
            }).then(function (res) {
                 visible=true;
                if (res.status == 201){
                     getEntries()
                     totaldata++;
                     console.log("Data introduced");
                     color = "success";
                     checkMSG="Entrada introducida correctamente a la base de datos";
                }else if(res.status == 400){
                     console.log("ERROR Data was not correctly introduced");
                     color = "danger";
                     checkMSG= "Los datos de la entrada no fueron introducidos correctamente";
                }else if(res.status == 409){
                     console.log("ERROR There is already a data with that country and year in the da tabase");
                     color = "danger";
                     checkMSG= "Ya existe una entrada en la base de datos con el pais y el año introducido";
                }
            });	
        }
    }

    //DELETE STAT

    async function deleteStat(countryD, yearD) {
        
        const res = await fetch(BASE_API_PATH+ "/" + countryD + "/" + yearD, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getEntries();      
            if (res.status==200) {
                totaldata--;
                color = "success";
                checkMSG = "Recurso "+countryD+" "+yearD+ " borrado correctamente";
                console.log("Deleted " + countryD);            
            } else if (res.status==404) {
                color = "danger";
                checkMSG = "No se ha encontrado el objeto " + countryD;
                console.log("Resource NOT FOUND");            
            } else {
                color = "danger";
                checkMSG= res.status + ": " + "No se pudo borrar el recurso";
                console.log("ERROR!");
            }      
        });
    }

    //DELETE ALL STATS

    async function deleteALL() {
		console.log("Deleting entry data...");
		if (confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all entry data...");
			const res = await fetch(BASE_API_PATH, {
				method: "DELETE"
			}).then(function (res) {
                visible=true;
				if (res.ok && totaldata>0){
                    totaldata = 0;
					getEntries();
                    color = "success";
					checkMSG="Datos eliminados correctamente";
					console.log("OK All data erased");
				} else if (totaldata == 0){
                    console.log("ERROR Data was not erased");
                    color = "danger";
					checkMSG= "¡No hay datos para borrar!";
                } else{
					console.log("ERROR Data was not erased");
                    color = "danger";
					checkMSG= "No se han podido eliminar los datos";
				}
			});
		}
	}

</script>

<main>

    <h1 style ="text-align: center;">Tabla de datos de Esperanza de vida</h1>

        {#await entries}
            Loading entry stats data...
        {:then entries}
        
        <Alert color={color} isOpen={visible} toggle={() => (visible = false)}>
            {#if checkMSG}
                {checkMSG}
            {/if}
        </Alert>

        <br>

        <Table bordered responsive> 
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Gasto en millones</th>
                    <th>Gasto publico</th>
                    <th>Porcentaje PiB</th>
                    <th>Per Capita</th>
                    <th>Var</th>
                    <th colspan="2">Acciones</th>
                </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type = "text" placeholder="spain" bind:value="{newEntry.country}"></td> 
                <td><input type = "text" placeholder="2017" bind:value="{newEntry.year}"></td> 
                <td><input type = "number" placeholder="15730.3" bind:value="{newEntry.spen_mill_eur}"></td>    
                <td><input type = "number" placeholder="2.66" bind:value="{newEntry.public_percent}"></td>  
                <td><input type = "number" placeholder="1.40" bind:value="{newEntry.pib_percent}"></td>
                <td><input type = "number" placeholder="332" bind:value="{newEntry.per_capita}"></td>
                <td><input type = "number" placeholder="4.46" bind:value="{newEntry.var}"></td>

                <td colspan="2" style="text-align: center;"><Button outline color="primary" on:click={insertStat}>Insertar</Button></td>  
            </tr>

        {#each entries as entry}
            <tr>
                
                <td><a href="api/v2/defense-spent-stats/{entry.country}/{entry.year}">{entry.country}</a></td>
                <td>{entry.year}</td>
                <td>{entry.spen_mill_eur}</td>
                <td>{entry.public_percent}</td>
                <td>{entry.pib_percent}</td>
                <td>{entry.per_capita}</td>
                <td>{entry.var}</td>
                <td><Button outline color="danger" on:click="{deleteStat(entry.country, entry.year)}">Borrar</Button></td>
                <td><a href="#/defense-spent-stats/{entry.country}/{entry.year}"><Button outline color="primary">Editar</Button></a></td>
            </tr>
                
        {/each}
        </tbody>
        <br>
        </Table>
        <Button color="success" on:click="{loadStats}">
            Cargar datos inciales
        </Button>
        <Button color="danger" on:click="{deleteALL}">
            Eliminar todo
        </Button>


        {/await} 
</main>