<script>
    import { onMount } from 'svelte';
    import Table from 'sveltestrap/src/Table.svelte';
    import Button from 'sveltestrap/src/Button.svelte';
	import { Alert } from 'sveltestrap';
    
    var BASE_API_PATH = "/api/v2/electricity-generation-stats";

    
    let entries = [];
	let newEntry = {
		country: "",
		year: null,
		installed_capacity_mw: null,
        generation_gwh: null,
        renovable_inst_cap_mw: null,
        renovable_gen_gwh: null,
        renovable_percentage: null,
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
        const res = await fetch("/api/v2/electricity-generation-stats"); 
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
            newEntry.installed_capacity_mw == null || newEntry.generation_gwh == null || newEntry.renovable_inst_cap_mw == null || newEntry.renovable_gen_gwh == null
            || newEntry.renovable_percentage == null || newEntry.var == null) {
             alert("Los campos no pueden estar vacios");
         } else{
             const res = await fetch(BASE_API_PATH,{
                 method:"POST",
                 body:JSON.stringify({
                        country: newEntry.country,
                        year: parseInt(newEntry.year),
                        installed_capacity_mw: parseInt(newEntry.installed_capacity_mw),
                        generation_gwh: parseInt(newEntry.generation_gwh),
                        renovable_inst_cap_mw: parseInt(newEntry.renovable_inst_cap_mw),
                        renovable_gen_gwh: parseInt(newEntry.renovable_gen_gwh),
                        renovable_percentage: parseFloat(newEntry.renovable_percentage),
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

    <h1 style ="text-align: center;">Tabla de datos de Generación de Electricidad por países</h1>

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
                    <th>Capacidad Instalada (MW)</th>
                    <th>Generación (GW/h)</th>
                    <th>Capacidad Instalada Renovable (MW)</th>
                    <th>Generación renovable (GW/h)</th>
                    <th>% Renovable</th>
                    <th>Var</th>
                    <th colspan="2">Acciones</th>
                </tr>
        </thead>
        <tbody>
           
            <tr>
                <td><input type = "text" placeholder="spain" bind:value="{newEntry.country}"></td> 
                <td><input type = "text" placeholder="2017" bind:value="{newEntry.year}"></td> 
                <td><input type = "number" placeholder="110287" bind:value="{newEntry.installed_capacity_mw}"></td>    
                <td><input type = "number" placeholder="502797" bind:value="{newEntry.generation_gwh}"></td>  
                <td><input type = "number" placeholder="55492" bind:value="{newEntry.renovable_inst_cap_mw}"></td>
                <td><input type = "number" placeholder="110605" bind:value="{newEntry.renovable_gen_gwh}"></td>
                <td><input type = "number" placeholder="22.0" bind:value="{newEntry.renovable_percentage}"></td>
                <td><input type = "number" placeholder="3.23" bind:value="{newEntry.var}"></td>

                <td colspan="2" style="text-align: center;"><Button outline color="primary" on:click={insertStat}>Insertar</Button></td>  
            </tr>

        {#each entries as entry}
            <tr>
                
                <td><a href="api/v2/electricity-generation-stats/{entry.country}/{entry.year}">{entry.country}</a></td>
                <td>{entry.year}</td>
                <td>{entry.installed_capacity_mw}</td>
                <td>{entry.generation_gwh}</td>
                <td>{entry.renovable_inst_cap_mw}</td>
                <td>{entry.renovable_gen_gwh}</td>
                <td>{entry.renovable_percentage}</td>
                <td>{entry.var}</td>
                <td><Button outline color="danger" on:click="{deleteStat(entry.country, entry.year)}">Borrar</Button></td>
                <td><a href="#/electricity-generation-stats/{entry.country}/{entry.year}"><Button outline color="primary">Editar</Button></a></td>
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