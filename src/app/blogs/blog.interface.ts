export interface BlogPreview {
    _id: string;
    title: string;
    summary: string;
    tags: string[];
    author: {
      id: string;
      name: string;
    };
    likes: number;
    views: number;
    createdAt: string;
    updatedAt: string;
  }
  
export interface Author {
    total: number;
    _id: string;
}

export interface Tag {
    total: number;
    _id: string;
}

/*Blog seleccionado:  {_id: '67c77a72be2c40e2f0137669', content: '<figure>\n  <img src="./../../assets/info/ecosistem…de la tesina elaborada junto con este sitio web.*',
 author: {…}, categories: Array(1), comments: Array(0), …}author: {id: '603d1b5f3b9f1c001f0f1234', name: 'Fabián Macías'}categories: ['Medio Ambiente']comments: []content: "<figure>\n  <img src=\"./../../assets/info/ecosistema1.jpg\" alt=\"Cañón Potrero de los López\">\n  <figcaption>Cañón Potrero de los López, San José de Gracia</figcaption>\n</figure>\n\nAguascalientes, a pesar de su ubicación geográfica alejada de la costa, cuenta con una sorprendente diversidad de ecosistemas acuáticos. Estos incluyen arroyos, lagunas, manantiales y embalses que sirven de hábitat para numerosas especies de flora y fauna.\n\nEn particular, la **Estación Biológica Agua Zarca (EBAZ)** de la **Universidad Autónoma de Aguascalientes (UAA)** es un refugio clave para la [ictiofauna nativa](https://es.wikipedia.org/wiki/Ictiofauna). Especies como *Yuriria alta* (sardina blanca), *Algansea tincella* (sardina plateada) y *Moxostoma austrinum* (burro) son parte del valioso ecosistema local. Estas especies desempeñan un rol fundamental en la cadena alimenticia y en la regulación del equilibrio ecológico.\n\n<div class=\"blogContent\">\n    <div class=\"galery\">\n      <figure>\n        <img src=\"./../../assets/info/nativas/carpitaBlanca.jpg\" alt=\"Yuriria alta (sardina blanca)\">\n        <figcaption>Yuriria alta (sardina blanca)</figcaption>\n      </figure>\n      <figure>\n        <img src=\"./../../assets/info/nativas/matalote.jpg\" alt=\"Algansea tincella (sardina plateada)\">\n        <figcaption>Algansea tincella (sardina plateada)</figcaption>\n      </figure>\n      <figure>\n        <img src=\"./../../assets/info/nativas/sardinitaPlateada.jpg\" alt=\"Moxostoma austrinum (burro)\">\n        <figcaption>Moxostoma austrinum (burro)</figcaption>\n      </figure>\n    </div>\n    \n  </div>\n\nSin embargo, los ecosistemas acuáticos enfrentan múltiples amenazas, como la contaminación, la pérdida de hábitats y la introducción de especies invasoras. Es crucial concientizar a la población sobre la importancia de estos ecosistemas y promover acciones para su conservación.\n\n*Este artículo fue generado con asistencia de IA, basado en la información de la tesina elaborada junto con este sitio web.*"
 createdAt: "2024-03-04T12:00:00.000Z"likes: 23published: trueslug: "biodiversidad-ecosistemas-acuaticos-ags"summary: "Un recorrido por la biodiversidad de los ecosistemas acuáticos de Aguascalientes y su importancia para el medio ambiente."tags: (3) ['biodiversidad', 'ecosistemas acuáticos', 'Aguascalientes']title: "La biodiversidad de los ecosistemas acuáticos de Aguascalientes"updatedAt: "2000-01-01T06:00:00.000Z"views: 85_id: "67c77a72be2c40e2f0137669"[[Prototype]]: Object*/

export interface Blog {
    _id: string;
    content: string;
    title: string;
    summary: string;
    tags: string[];
    author: {
        id: string;
        name: string;
    };
    categories: string[];
    comments: string[];
    likes: number;
    published: boolean;
    slug: string;
    views: number;
    createdAt: string;
    updatedAt: string;
}