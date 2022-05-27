<script>
    import { onMount } from 'svelte';
    import Table from 'sveltestrap/src/Table.svelte';
    import Button from 'sveltestrap/src/Button.svelte';
	import { Alert } from 'sveltestrap';

    let redStyle = "redTable";
    let blueStyle = "blueTable";
    
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
    let totaldata=24; //Numero total de datos en la DB

    let sCountry = "";
    let sYear = "";
    let sSpen_mill_eur = "";
    let sPublic_percent = "";
    let sPib_percent = "";
    let sPer_capita = "";
    let sVar = "";

    onMount(getEntries);

    //GET

    async function getEntries(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v2/defense-spent-stats"+ "?limit=12&offset=0"); 
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
        const res = await fetch(BASE_API_PATH + "?limit=12&offset=0");
        const total = await fetch(BASE_API_PATH);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            entries = json;
            visible = true;
            totaldata=24;
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

    //SEARCH DATA

    async function search (sCountry, sYear, sSpen_mill_eur, sPublic_percent, sPib_percent, sPer_capita, sVar){
            
            if(sCountry==null){
                sCountry="";
            }
            if(sYear==null){
                sYear="";
            }
            if(sSpen_mill_eur==null){
                sSpen_mill_eur="";
            }
            if(sPublic_percent==null){
                sPublic_percent="";
            }
            if(sPib_percent==null){
                sPib_percent="";
            }
            if(sPer_capita==null){
                sPer_capita="";
            }
            if(sVar==null){
                sVar = "";
            }
            visible = true;
            const res = await fetch(BASE_API_PATH + "?country="+sCountry
            +"&year="+sYear
            +"&spen_mill_eur="+sSpen_mill_eur
            +"&public_percent="+sPublic_percent
            +"&pib_percent="+sPib_percent
            +"&per_capita="+sPer_capita
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
                if (page+12 > totaldata) {
                    page = 1
                } else {
                    page+=12
                }
                
                visible = true;
                console.log("Charging page... Listing since: "+page);
                const res = await fetch(BASE_API_PATH + "?limit=12&offset="+(-1+page));
                //condicional imprime msg
                color = "success";
                checkMSG= (page+6 > totaldata) ? "Mostrando elementos "+(page)+"-"+totaldata : "Mostrando elementos "+(page)+"-"+(page+11);
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
            if (page-12 > 1) {
                page-=12; 
            } else page = 1
            visible = true;
            console.log("Charging page... Listing since: "+page);
            const res = await fetch(BASE_API_PATH + "?limit=12&offset="+(-1+page));
            color = "success";
            checkMSG = (page+6 > totaldata) ? "Mostrando elementos "+(page)+"-"+totaldata : "Mostrando elementos "+(page)+"-"+(page+11);
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

    <h1 style ="text-align: center;">Tabla de datos de Gasto en defensa por países</h1>

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
            <th>Búsqueda por país</th>
            <th>Búsqueda por año</th>
            <th>Búsqueda por gasto en millones</th>
            <th>Búsqueda por % gasto publico</th>
            <th>Búsqueda por % PiB</th>
            <th>Búsqueda por gasto Per Capita</th>
            <th>Búsqueda por Var.</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td><input type = "text" placeholder="País" bind:value="{sCountry}"></td>
                <td><input type = "number" placeholder="2020" bind:value="{sYear}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sSpen_mill_eur}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sPublic_percent}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sPib_percent}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sPer_capita}"></td>
                <td><input type = "number" placeholder="0.0" bind:value="{sVar}"></td>

            </tr>
            </tbody>
        </Table>
        <div style="text-align:center">
            <Button outline color="primary" on:click="{search (sCountry, sYear, sSpen_mill_eur, sPublic_percent, sPib_percent,sPer_capita,sVar)}">Buscar</Button>
        </div>

        <br>

        <Table bordered responsive> 
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Gasto en millones</th>
                    <th>% Gasto publico</th>
                    <th>% PiB</th>
                    <th>Gasto Per Capita</th>
                    <th>Var</th>
                    <th colspan="2">Acciones</th>
                </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type = "text" placeholder="spain" bind:value="{newEntry.country}" ></td> 
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
        
        <a href="#/defense-spent-stats/defense-graph-1"><Button outline color="primary">Ver gráfico</Button></a>
        <a href="#/defense-spent-stats/defense-graph-2"><Button outline color="primary">Ver gráfico Fusion</Button></a>

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