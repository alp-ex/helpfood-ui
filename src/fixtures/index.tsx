// TODO : add env variable logic, to switch from db to fixtures when triggering call in the app
const users = [
    {
        username: 'patrick',
        password: 'patouchedu92',
        selected_hue: 224,
    },
    {
        username: 'alain',
        password: 'alandu92',
        selected_hue: 4,
    },
    {
        username: 'gisèle',
        password: 'giselelafollichine',
        selected_hue: 302,
    },
    {
        username: 'mahmoud',
        password: 'soleillevant',
        selected_hue: 68,
    },
    {
        username: 'tchan',
        password: 'motdepassedetchan',
        selected_hue: 12,
    },
    {
        username: 'cuillère',
        password: 'soupe',
        selected_hue: 32,
    },
]

const recipes = [
    {
        name: 'cacoune pie',
        description:
            "It's like a real dish, but it's actually poo. That is my best dish when I receive people at my house.",
        steps: ['faire cuire le prout', 'renverser le caca'],
        ingredients: [
            {
                name: 'prout',
                meat: false,
                from_animals: true,
                dairy_product: false,
                pregnant_compliant: true,
            },
            {
                name: 'cacoune',
                meat: true,
                from_animals: true,
                dairy_product: false,
                pregnant_compliant: false,
            },
        ],
    },
    {
        name: 'pipoune',
        description:
            "It's like a real dish, but it's actually pee. That is my best dish when I receive people at my house.",
        steps: ['faire cuire le prout', 'renverser le thé'],
        ingredients: [
            {
                name: 'prout',
                meat: false,
                from_animals: true,
                dairy_product: false,
                pregnant_compliant: true,
            },
            {
                name: 'tea',
                meat: false,
                from_animals: false,
                dairy_product: false,
                pregnant_compliant: true,
            },
        ],
    },
    {
        name: 'tarte au cacoune',
        description:
            "It's like a real pie, but it's actually a poo pie. That is my best dish when I receive people at my house.",
        steps: ['mélanger le prout', 'renverser le thé'],
        ingredients: [
            {
                name: 'prout',
                meat: false,
                from_animals: true,
                dairy_product: false,
                pregnant_compliant: true,
            },
            {
                name: 'tea',
                meat: false,
                from_animals: false,
                dairy_product: false,
                pregnant_compliant: true,
            },
        ],
    },
    {
        name: 'smoothie au pipoune',
        description:
            "It's like a real smoothie, but it's actually a pee smoothie. That is my best dish when I receive people at my house.",
        steps: ['faire cuire le caca', 'mélanger le prout'],
        ingredients: [
            {
                name: 'prout',
                meat: false,
                from_animals: true,
                dairy_product: false,
                pregnant_compliant: true,
            },
            {
                name: 'cacoune',
                meat: true,
                from_animals: true,
                dairy_product: false,
                pregnant_compliant: false,
            },
        ],
    },
]

const ingredients = [
    {
        name: 'prout',
        meat: false,
        from_animals: true,
        dairy_product: false,
        pregnant_compliant: true,
    },
    {
        name: 'cacoune',
        meat: true,
        from_animals: true,
        dairy_product: false,
        pregnant_compliant: false,
    },
    {
        name: 'tea',
        meat: false,
        from_animals: false,
        dairy_product: false,
        pregnant_compliant: true,
    },
]

const meals = [
    {
        user: 'patrick',
        weekday: 'sunday',
        typeOfMeal: 'dinner',
        recipe: {
            name: 'smoothie au pipoune',
            description:
                "It's like a real smoothie, but it's actually a pee smoothie. That is my best dish when I receive people at my house.",
            steps: ['faire cuire le caca', 'mélanger le prout'],
            ingredients: [
                {
                    name: 'prout',
                    meat: false,
                    from_animals: true,
                    dairy_product: false,
                    pregnant_compliant: true,
                },
                {
                    name: 'cacoune',
                    meat: true,
                    from_animals: true,
                    dairy_product: false,
                    pregnant_compliant: false,
                },
            ],
        },
        confirmed: false,
    },
    {
        user: 'alain',
        weekday: 'sunday',
        typeOfMeal: 'launch',
        recipe: {
            name: 'tarte au cacoune',
            description:
                "It's like a real pie, but it's actually a poo pie. That is my best dish when I receive people at my house.",
            steps: ['mélanger le prout', 'renverser le thé'],
            ingredients: [
                {
                    name: 'prout',
                    meat: false,
                    from_animals: true,
                    dairy_product: false,
                    pregnant_compliant: true,
                },
                {
                    name: 'tea',
                    meat: false,
                    from_animals: false,
                    dairy_product: false,
                    pregnant_compliant: true,
                },
            ],
        },
        confirmed: false,
    },
]

export { meals, recipes, users, ingredients }
