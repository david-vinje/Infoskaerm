import styled from "styled-components"


export const Wrapper = styled.div`
@media screen and (orientation: portrait) {
    .card-body > .row {
        height: auto;
    }

    .card-img {
        width: 66%;
    }

}

@media (max-width: 1100px) {
    .list-group-item, .card, .infobox {
        border-radius: 10px; 
    }
    
    .right-border {
        border-right: 0.5em solid #eee;
    }
    
    .left-border {
        border-left: 0.5em solid lightgray;
    }

    .clientlogoborder {
        border: 2px solid rgba(69, 89, 119, 0.5);
    }

    .roller-og-tilgang-knap{
        margin-top: 1em;
        font-size: 1em;
    }
    
    .project-description, .project-description-title {
        font-size: 0.5em; 
    }

    .employeephoto {
        height: 6em;
        width: 6em;
    }

}

@media (min-width: 1200px) {
    .list-group-item, .card, .infobox {
        border-radius: 10px; 
    }
    
    .right-border {
        border-right: 0.5em solid #eee;
    }
    
    .left-border {
        border-left: 0.5em solid lightgray;
    }

    .clientlogoborder {
        border: 2px solid rgba(69, 89, 119, 0.5);
    }

    .roller-og-tilgang-knap{
        margin-top: 1em;
        font-size: 2.5em;
    }
    
    .project-description, .project-description-title {
        font-size: 2em; //before 3em 
    }
    
    .employeephoto {
        height: 12.5em;
        width: 12.5em;
    }

}

//FOR ALL 

* {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
}

.container, .container-fluid {
    height: 98vh;
    padding: 8rem;
}

.clientLogo {
    height: auto;
    max-width: auto;
}

.row-1{
    height: 20vh; 
}

.row-2{
    height: 50vh;
}

.row-3{
    height: 20vh;
}

h1{
    font-weight: 500;
}

.project-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* Adjust the number of lines to show */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.project-description-title {
    font-weight: 700;
}

.project-description, .project-description-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 20; /* Adjust the number of lines to show */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.roller-og-tilgang{
    overflow: hidden;   
}

.roller-og-tilgang-knap{
    border: 1px solid lightgray;
    font-weight: 300;
}

.roller, .tilgang {
    background-color: #eaf3ff;
    border-radius: 0.3em;
}

.roller{
    color: #374B05;
}

.tilgang{
    color: #FF7201;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.counter {
    display: flex;
    justify-content: center;
    align-items: center;
}

.employeephoto {
    object-fit: cover;
    border-radius: 50%;
}


.carousel-control-prev-icon,
.carousel-control-next-icon {
    display: none; /* Hide the default icons */
}

.carousel-indicators {
    margin: 0;
    padding: 0 5%;
}

.carousel-indicators button {
    background-color: lightgray;
    margin: 0; /* Space between line segments */
    border: none;
    width: 100%;
}


.carousel-indicators .active, .button {
    background: linear-gradient(to right, #e3ddd5, #455977);
    border-radius: 10px;
    padding: 0.1em 5vw;
}


`
