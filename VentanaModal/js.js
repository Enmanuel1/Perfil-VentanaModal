// Crear elementos con atributos e hijo
const addAttributes = (element, attrObj) => {
    for (let attr in attrObj) {
        if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr])
    }
};
const createCustomElement = (element, attributes, children) => {
    let customElement = document.createElement(element);
    if (children !== undefined) children.forEach(el => {
        if (el.nodeType) {
            if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
        } else {
            customElement.innerHTML += el;
        }
    });
    addAttributes(customElement, attributes);
    return customElement;
};

//imprimir modal

const printModal = content => {
    //crear contenedor interno
    const modalContentEl = createCustomElement("div",{
        id:"ed-modal-content",
        class:"ed-modal-content"
    },[content]),
     modalContainerEl = createCustomElement("div", {
        id:"ed-modal-container",
        class:"ed-modal-container"
    },[modalContentEl]);

    //imprimir el modal
    document.body.appendChild(modalContainerEl);

    //quitar el modal

    const removeModal = () => document.body.removeChild(modalContainerEl);
    modalContainerEl.addEventListener("click", e=>{
        if(e.target === modalContainerEl) removeModal();
    })
}

let item =  "<div class='contenedor-elementos-modal'>"+
                "<div class='titulo-elementos-modal'>"+
                    "<div class='titulo-elemento'>" +
                        "<h1>Editar perfil</h1>"+
                    "</div>"+
                "</div>"+
                "<div class='contenedor-formulario-modal'>"+
                    "<div class='elementos-modal'>"+
                            "<input type ='text' placeholder = 'nombre' id='nombreinput'>"+
                            "<input type ='text' placeholder= 'Apellido' id='apellidoinput'>"+
                            "<button  onclick ='registrarPersona();' id='Registrar'>Guardar cambios</button>" +
                    "</div>"+
                "</div>" +
            "</div>";
document.getElementById("show-modal").addEventListener("click", () => {
    printModal(item);
});

let Nombre;
let Apellido;

const registrarPersona = () => {
    let nombre = document.querySelector("#nombreinput").value;
    let apellido = document.querySelector("#apellidoinput").value;
    if(isNaN(nombre) && isNaN(apellido)){
      if ((nombre.length && apellido.length)!== 0) {
          Nombre = nombre;
          Apellido = apellido;
          localStorage.setItem("Nombre", JSON.stringify(Nombre));
          localStorage.setItem("Apellido", JSON.stringify(Apellido));
          mostrardatos();
      }else{
          alert("Campos importantes vacios");
      }
    }else{
      alert("No puede ingresar numeros en estos campos")
    }


}

const mostrardatos = () => {
    let divprincipal = document.querySelector("#datos");
    divprincipal.innerHTML = "";

    let nombre = JSON.parse(localStorage.getItem("Nombre"));
    let apellido = JSON.parse(localStorage.getItem("Apellido"));

    let nombrecompletodiv = document.createElement("h1");
    nombrecompletodiv.setAttribute("class", "nombrecom-localstorage");
    nombrecompletodiv.innerHTML = nombre+" "+apellido;
    divprincipal.appendChild(nombrecompletodiv);
}
mostrardatos()
