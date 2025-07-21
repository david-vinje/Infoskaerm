import styled from "styled-components"


export const Wrapper = styled.div`



* {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    ${'' /* line-height: 1.75; */}
}
.container, .container-fluid {
    height: 98vh;
    padding: 5rem;
}


.list-group-item, .card, .infobox {
    border-radius: 10px; 
}

.right-border {
    border-right: 0.5em solid lightgray;
    
}

.left-border {
    border-left: 0.5em solid lightgray;
}

h1 {
    font-weight: 500;
}

.project-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 20; /* Adjust the number of lines to show */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 2em;
}

.project-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* Adjust the number of lines to show */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.roller-og-tilgang{
    overflow: hidden;
    ${'' /* height: 100%; */}
}

.roller-og-tilgang-knap{
    ${'' /* border-radius: 1em; */}
    border: 1px solid lightgray;
    margin-top: 1em;
    font-size: 2em;
    font-weight: 300;
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

.employeephoto {
    object-fit: cover;
    height: 12.5em;
    width: 12.5em;
    border-radius: 50%;
}

.clientlogoborder {
    border: 2px solid rgba(69, 89, 119, 0.5);
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