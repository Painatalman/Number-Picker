// criar uma funcao para garantir pops unicos de um array.

var lIpsum = {
    generate_spiritualist: function generate_spiritualist(node, title_data, subtitle_data, text_data, guarantee_data, schedule_data, address_data, contact_data) {
        // in future versions, should generate an object
        // and then a function parse_specialist can be made

        // whole node with spiritualist data
        var text = document.createElement("article");

        var data = {}

        // TODO: assegurar que os _data tem formato {class:, node:}
        if (!title_data) {
            data['title'] = {
                "class": "",
                "node": "h1"
            }
        }
        if (!subtitle_data) {
            data['subtitle'] = {
                "class": "",
                "node": "h2"
            }
        }
        if (!text_data) {
            data['text'] = {
                "class": "",
                "node": "p"
            }
        }
        if (!guarantee_data) {
            data.guarantee = {
                "class": "",
                "node": "h4"
            }
        }
        if (!schedule_data) {
            data['schedule'] = {
                "class": "",
                "node": "h4"
            }
        }
        if (!address_data) {
            data['address'] = {
                "class": "",
                "node": "h6"
            }
        }
        if (!contact_data) {
            data['contact'] = {
                "class": "",
                "node": "h3"
            }
        }

        for (property in data) {
            var article_section = document.createElement(data[property].node);
            if (data[property].class !== "") {
                article_section.classList.add(data[property].class);
            }
            
            if (property == "title") {
                article_section.innerHTML = this.spiritualists.rank[Math.floor(Math.random() * this.spiritualists['rank'].length)] + " " + this.spiritualists.name[Math.floor(Math.random() * this.spiritualists.name.length)];
            }
            else if (property == "subtitle") {
                article_section.innerHTML = this.spiritualists.speciality[Math.floor(Math.random() * this.spiritualists['speciality'].length)];
            }
            else if (property == "text"){
                var text_parts = this.spiritualists.text[Math.floor(Math.random()* this.spiritualists.text.length)].split("%specialities%");
                article_section.innerHTML = text_parts[0]
                if (text_parts.length > 1){
                article_section.innerHTML += this.spiritualists.problem.toString() + text_parts[1];
                }
            }
            else{
                article_section.innerHTML = this.spiritualists[property][Math.floor(Math.random() * this.spiritualists[property].length)]
            }

            text.appendChild(article_section);
        }

        // final node
        if (node) {
            node.appendChild(text);
            return node;
        } else {
            console.log(text);
            return text;
        }
    },
    parse_spiritualist: function parse_spiritualist(spiritualist, node, title_data, subtitle_data, text_data, guarantee_data, schedule_data,address_data, contact_data)
    soccerPlayers: {
        "name": ["miguel", "tiago", "josé", "rodrigo", "izmael"],
        "lastName": ["castro", "fava", "rosa"],
        "nickname": ["roddick", "spidi", "pizzi"]
    },
    bootlegs: ['rookman'],
    spiritualists: {
        "rank": ['professor', 'mestre'],
        "name": ['turé','bambo','iziaca','cadri'],
        "speciality": [
            'professor', 
            'espiritualista', 
            'médico', 
            'astrólogo',
            'curandeiro',
            'cientista',
            'especialista'
        ],
        "problem": [
            "saúde",
            "amor",
            "negócios",
            "união familiar",
            "desviar e prender",
            "afastar e aproximar",
            "pessoas amadas",
            "exames",
            "doenças",
            "vícios de alcoolismo e droga",
            "impotência sexual",
            "maus olhados",
            "poder com super magia negra e branca",
            "sobrenaturais",
            "justiça",
            "doenças espirituais",
            "sexo"
        ],
        "text": [
            "Grande espiritualista, ajuda a resolver qualquer que seja o seu caso, mesmo grave ou difícil solução, tal como: %specialities%, etc... é um dos melhores profissionais do País. O seu assunto estará resolvido muito rapidamente. Lê a sorte e faz trabalho à distância.",
            "Dotado de conhecimentos e poderes, ajuda a resolver problemas em menos de 3 dias, difíceis ou graves, com eficácia e garantia, como: %specialities%, etc... Lê sorte, dá previsão de Vida, faz consulta à distância. Se quer prender a si uma vida nova, com segurança e pondo fim a tudo o que o/a preocupa. Contacte o %name% pois não deixe agravar os seus problemas nos casos acima mencionados.",
            "Grande mestre das ciências ocultas, dotado de grandes poderes e conhecimentos científicos das ciências ocultas herdadas da família. %specialities%. O seu futuro depende da sua decisão de contactar o %title% e se quer uma solução honesta para os seus problemas, sejam grandes, graves ou antigos, contacte-o. Sigilo absoluto. Efectua trabalhos com %methods%. Faz trabalhos à distância. Consulta pessoalmente ou por cartas."
        ],
        "methods": [
            "cadeado verde",
            "técnica simples",
            "aproximação",
            "afastamento rápido"
        ]
        "guarantee": ["Resultados máximos em 7 dias","Bons resultados"],
        "schedule":['Consultas de Astrologia das 24h',"2ª a sábado das 09h às 21h"],
        "address": ['Rua Coronel António dos Santos Fonseca, nº6, 3º Esq.º, Faro', 'Rua Dr. Coelho Carvalho, nº7 r/c, 8000 - FARO'], // will be deprecated by an address generator
        "contact":["999 999 999"], // will be deprecated by a number generator
        get_title: function() {
            // return a random rank and name and speciality in a format that is acceptable
        },
        get_problems: function(nProblems){
            // TODO: get a number of unique problems
        },
        get_specialities: function (nSpecialities){
            // TODO: get a number of unique specialities
            // can also be used for subtitle
        },
        get_methods: function (nSpecialities){
            // TODO: get a number of unique methods
            // if required
        
        },
        get_text: function(specialities, title){
            // TODO: do shit, will probably add specialities along the way
            // TODO might also include the title!
            // Must check for position of
        },
        get_contacts: function(nContacts, types){
            // TODO:
            // nContacts: number of contacts
            //types: cellphone, phone, email...
        }
    },
    "ads": [
    "Senhora séria e responsável oferece-se para fazer limpezas em casas particulares, lojas, oficinas... Dá informações."
    ],
    "lipsum": []
}
