<main>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <div class="header">
        <img src="./assets/logo_ETSII_US.png" alt="logo etsii us">
    </div>
    <div class="content">

        <h1>Grupo 26</h1>
        <h2>TEAM</h2>
        <div class="team">
            <div class="card manu_card">
                <img src="./assets/Manu_profile.JPG" alt="Manu" >
                <div class="container">
                  <h4 class="name"><b>
                      <a href="https://github.com/manueljgb">
                    [Manuel Jesús González Bueno]
                </a></b>
                </h4>
                  <p>- electricity-generation-stats</p>
                </div>
            </div>
            <div class="card pablo_card">
                <img src="./assets/Pablo_profile.jpeg" alt="Pablo" >
                <div class="container">
                  <h4 class="name"><b>
                      <a href="https://github.com/pabgalace">
                        [Pablo Galán Acedo]
                </a></b>
                </h4>
                  <p>- defense-spent-stats</p>
                </div>
            </div>
            
        </div>
        <div class="minor-sections">

            <div class="section project-info">
                
                <h2>PROJECT DESCRIPTION:</h2>
                
                <span style="font-weight: 800;"> Estudio y análisis de la relación entre el gasto público en defensa, generación energética e indice de desarrollo</span>
            </div>
            
            <div class="section project-repo">
                <h2>PROJECT REPO:</h2>
                    <span >
                        <a href="https://github.com/gti-sos/SOS2122-26">
                            [gti-sos/SOS2122-26]
                        </a>
                    </span>
            </div>
            <div class="section url">
                    <h2 >
                        URL:
                    </h2>
                    <span><a href="http://sos2122-26.herokuapp.com">[http://sos2122-26.herokuapp.com]</a></span>
            </div>
        </div>
        <div class="big-sections">
            <div>

                
                <h2>
                    Documentación:
                </h2>
                
                <p>
                    <a href="https://sos2122-26.herokuapp.com/api/v2/electricity-generation-stats/docs">electricity-generation-stats v.2 Docs</a>
                    (developed by <a href="https://github.com/manueljgb">Manuel Jesús González Bueno</a>)
                </p>
                <p> 
                    <span><a href="https://sos2122-26.herokuapp.com/api/v1/defense-spent-stats/docs">defense-spent-stats v.1 Docs</a> </span>
                    <span><a href="https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats/docs">defense-spent-stats v.2 Docs</a></span>
                    (developed by <a href="https://github.com/pabgalace">Pablo Galán Acedo</a>)
                </p>
                
                <p><a href="https://sos2122-26.herokuapp.com/api/v1/developement-indicators-stats/docs">developement-indicators-stats v.1 Docs</a> 
                    (developed by <a href="https://github.com/brico1994">Bruno Alvaro Rico Barrilero</a>)
                </p>
            </div>
            <div>

                <h2 >
                    APIs:
                </h2>
                
                <p>
                    <a href="https://sos2122-26.herokuapp.com/api/v2/electricity-generation-stats">electricity-generation-stats v.2</a>
                    (developed by <a href="https://github.com/manueljgb">Manuel Jesús González Bueno</a>)
                </p>
                <p> 
                    <a href="https://sos2122-26.herokuapp.com/api/v1/defense-spent-stats">defense-spent-stats v.1</a> 
                    <a href="https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats">defense-spent-stats v.2</a>
                    (developed by <a href="https://github.com/pabgalace">Pablo Galán Acedo</a>)
                </p>
                <p><a href="https://sos2122-26.herokuapp.com/api/v1/developement-indicators-stats/docs">developement-indicators-stats v.1</a> 
                    (developed by <a href="https://github.com/brico1994">Bruno Alvaro Rico Barrilero</a>)
                </p>
            </div>
            <div>

                
                <h2>
                    Front Ends:
                </h2>
                
                <p>
                    <a href="https://sos2122-26.herokuapp.com/#/electricity-generation-stats">electricity-generation-stats</a>
                    (developed by <a href="https://github.com/manueljgb">Manuel Jesús González Bueno</a>)
                </p>
                <p> 
                    <a href="https://sos2122-26.herokuapp.com/#/defense-spent-stats">defense-spent-stats</a>
                    (developed by <a href="https://github.com/pabgalace">Pablo Galán Acedo</a>)
                </p>
                
            </div>
            <div>

                
                <h2 >
                    Gráfica conjunta:
                </h2>
                
                <p>
                    <a href="https://sos2122-26.herokuapp.com/#/analytics">[https://sos2122-26.herokuapp.com/#/analytics]</a>
                </p>
            </div>
        </div>
        <a class="home" href="/#"><i class="material-icons">home</i></a>
    </div>
</main>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
    main {
        text-align: center;
        font-family: 'Open Sans', sans-serif;
        padding-bottom: 30px;
    }
    .header img {
        width: 30vw;
        height: auto;        
    }
    h1,h2 {
        font-weight: 600;
    }
    h1{
        margin-top: 15px;
        margin-bottom: 40px;
    }
    h2{
        color: green;
        letter-spacing: 2px;
    }
    .team{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        max-width: 55vw;
        margin: 20px auto;
        
    }

    .card {        
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: 15px;
        transition: 0.3s;
    }
    .card img{
        height: 55vh;
        object-fit: cover;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        
    }
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
    }
    .name{
        margin-top: 10px;
    }
    .manu_card img{
        
        object-position: 85% 15%;;
    }
    .pablo_card img{
        
        object-position: 80% 20%;;
    }
        
    .container {
        padding: 2px 16px;
    }
    .minor-sections{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        max-width: 80vw;
        margin: 20px auto;
    }
    .big-sections{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        max-width: 80vw;
        margin: 30px auto;
    }
    .section {
        margin: 20px auto;
    }
    .home{
        color: green;
    }
    .home:hover{
        color: rgb(33, 74, 211);
    }
    
</style>