<script>
    import { onMount } from 'svelte';
    import Table from 'sveltestrap/src/Table.svelte';
    import Button from 'sveltestrap/src/Button.svelte';
	import { Alert } from 'sveltestrap';

    let redStyle = "redTable";
    let blueStyle = "blueTable";
    
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
    let totaldata=20;

    let sCountry="";
	let sYear="";
	let sInstalled_capacity_mw="";
    let sGeneration_gwh="";
    let sRenovable_inst_cap_mw="";
    let sRenovable_gen_gwh="";
    let sRenovable_percentage="";
    let sVar="";
    
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
            totaldata=20;
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

//SEARCH DATA

async function search (sCountry, sYear, sInstalled_capacity_mw, sGeneration_gwh, sRenovable_inst_cap_mw, sRenovable_gen_gwh, sRenovable_percentage, sVar){
            
            if(sCountry==null){
                sCountry="";
            }
            if(sYear==null){
                sYear="";
            }
            if(sInstalled_capacity_mw==null){
                sInstalled_capacity_mw="";
            }
            if(sGeneration_gwh==null){
                sGeneration_gwh="";
            }
            if(sRenovable_inst_cap_mw==null){
                sRenovable_inst_cap_mw="";
            }
            if(sRenovable_gen_gwh==null){
                sRenovable_gen_gwh="";
            }
            if(sRenovable_percentage==null){
                sRenovable_percentage="";
            }
            if(sVar==null){
                sVar = "";
            }
            visible = true;
           
            const res = await fetch(BASE_API_PATH + "?country="+sCountry
            +"&year="+sYear
            +"&installed_capacity_mw="+sInstalled_capacity_mw
            +"&generation_gwh="+sGeneration_gwh
            +"&renovable_inst_cap_mw="+sRenovable_inst_cap_mw
            +"&renovable_gen_gwh="+sRenovable_gen_gwh
            +"&renovable_percentage="+sRenovable_percentage
            +"&var="+sVar)

            if (res.ok){
                const json = await res.json();
                entries = json;
                console.log("Found "+ entries.length + " data");
                if(entries.length==1){
                    color = "success"
                    checkMSG = "Se ha encontrado un dato para tu búsqueda";
                }else{
                    color = "success"
                    checkMSG = "Se han encontrado " + entries.length + " datos para tu búsqueda";
                }
            }
    }

    /*-------------------------PAGINACIÓN-------------------------*/

        //getNextPage (B)
        async function getNextPage() {
    
                console.log(totaldata);
                if (page+10 > totaldata) {
                    page = 1
                } else {
                    page+=10
                }
                
                visible = true;
                console.log("Charging page... Listing since: "+page);
                const res = await fetch(BASE_API_PATH + "?limit=10&offset="+(-1+page));
                //condicional imprime msg
                color = "success";
                checkMSG= (page+5 > totaldata) ? "Mostrando elementos "+(page)+"-"+totaldata : "Mostrando elementos "+(page)+"-"+(page+9);
                if (totaldata == 0){
                    console.log("ERROR Data was not erased");
                    color = "danger";
                    checkMSG= "¡No hay datos!";
                }else if (res.ok) {
                    console.log("Ok:");
                    const json = await res.json();
                    entries = json;
                    console.log("Received " + entries.length + " resources.");
                } else {
                    checkMSG= res.status + ": " + res.statusText;
                    console.log("ERROR!");
                }
            }
    //getPreviewPage (B)
        async function getPreviewPage() {
            
            console.log(totaldata);
            if (page-10 > 1) {
                page-=10; 
            } else page = 1
            visible = true;
            console.log("Charging page... Listing since: "+page);
            const res = await fetch(BASE_API_PATH + "?limit=10&offset="+(-1+page));
            color = "success";
            checkMSG = (page+5 > totaldata) ? "Mostrando elementos "+(page)+"-"+totaldata : "Mostrando elementos "+(page)+"-"+(page+9);
            if (totaldata == 0){
                console.log("ERROR Data was not erased");
                color = "danger";
                checkMSG = "¡No hay datos!";
            }else if (res.ok) {
                console.log("Ok:");
                const json = await res.json();
                entries = json;
                console.log("Received "+entries.length+" resources.");
            } else {
                checkMSG = res.status+": "+res.statusText;
                console.log("ERROR!");
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
        <h4 style="text-align:center"><strong>Búsqueda general de parámetros</strong></h4>
        <br>

        <Table bordered responsive>
            <thead>
                <tr>
            <th>Búsqueda por Pais</th>
            <th>Búsqueda por Año</th>
            <th>Búsqueda por Capacidad Instalada (MW)</th>
            <th>Búsqueda por Generación (GW/h)</th>
            <th>Búsqueda por Capacidad Instalada Renovable (MW)</th>
            <th>Búsqueda por Generación renovable (GW/h)</th>
            <th>Búsqueda por % Renovable</th>
            <th>Búsqueda por Var</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td><input type = "text" placeholder="País" bind:value="{sCountry}"></td>
                <td><input type = "number" placeholder="2020" bind:value="{sYear}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sInstalled_capacity_mw}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sGeneration_gwh}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sRenovable_inst_cap_mw}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sRenovable_gen_gwh}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sRenovable_percentage}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sVar}"></td>

            </tr>
            </tbody>
        </Table>
        <div style="text-align:center">
            <Button outline color="primary" on:click="{search (sCountry, sYear, sInstalled_capacity_mw, sGeneration_gwh, sRenovable_inst_cap_mw, sRenovable_gen_gwh, sRenovable_percentage, sVar)}">Buscar</Button>
        </div>


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
        <Button outline color="primary" on:click="{getPreviewPage}">
            Atrás
         </Button>
         <Button outline color="primary" on:click="{getNextPage}">
             Siguiente
          </Button>

        {/await} 
</main>
<style>

    input{
        width: 100%;
    }
    
    thead{
        background-color: #246355;
        border-bottom: solid 5px #0F362D;
        color: white;
    }
    
    tr:nth-child(even){
        background-color: #ddd;
    }
    
    tr:hover td{
        background-color: #369681;
        color: white;
    }
    
    
    </style>