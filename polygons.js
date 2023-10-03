const images = [
    {
        src: 'images/inside_tent_image.jpg', //default tent image
        polygons: [
            {
                name: "Picture of Dr. Capella and Roscoe",
                description: "A framed photograph capturing a candid moment between Dr. Capella and Roscoe. Their bond is evident from their smiles and gleaming eyes.",
                action: "popup",
                image: 'images/dr_capella_and_roscoe_placeholder.jpg',
                coords: CommonCoords.picture,
            },
            {
                name: "Outside the Tent",
                description: "This goes outside the tent.",
                action: 'changeImage',
                replacementImage: CurrentFirstSceneState,
                coords: CommonCoords.outsidethetent,
            },
            {
                name: "Binoculars",
                description: "Looks like Dr. Capella left her binoculars. Maybe we should take these with us. Solve the math problem below to add the item to your inventory.",
                action: 'itemquizpopup',
                image: 'images/binocsmini.png',
                replacementImage:'images/inside_tent_image_2.jpg',
                finalarraystate: 1,
                coords: CommonCoords.binoculars,
            },
            {
                name: "Map",
                description: "An intricate map with detailed depictions of the terrain and landmarks. A piece seems to be missing, perhaps holding the key to an undiscovered location.",
                action: 'itemquizpopup',
                image: 'images/mapmini.png',
                replacementImage:'images/inside_tent_image_3.jpg',
                finalarraystate: 2,
                coords: CommonCoords.map,
            },           
        ]
    },
    {
        src: 'images/original_title_screen.jpg',
        polygons: [
            {
                name: "Tent",
                description: "Goes inside the tent.",
                action: 'changeImage',
                replacementImage: CurrentTentState,
                coords: CommonCoords.tentfirstscene,
            },
        ]
    },
    {
        src: 'images/inside_tent_image_2.jpg', //inside the tent alternative one, after binoculars are first choice
        polygons: [
            {
                name: "Picture of Dr. Capella and Roscoe",
                description: "A framed photograph capturing a candid moment between Dr. Capella and Roscoe. Their bond is evident from their smiles and gleaming eyes.",
                action: 'popup',
                image: 'images/dr_capella_and_roscoe_placeholder.jpg',
                coords: CommonCoords.picture,
            },
            {
                name: "Outside the Tent",
                description: "This goes outside the tent.",
                action: 'changeImage',
                replacementImage: CurrentFirstSceneState, // index of the target image in the images array
                coords: CommonCoords.outsidethetent,
            },
            {
                name: "Map",
                description: "An intricate map with detailed depictions of the terrain and landmarks. A piece seems to be missing, perhaps holding the key to an undiscovered location.",
                action: 'itemquizpopup',
                image: 'images/mapmini.png',
                replacementImage:'images/inside_tent_image_3.jpg',
                finalarraystate: 2,
                coords: CommonCoords.map,
            }, 
        ]
    },
    {
        src: 'images/inside_tent_image_3.jpg', //inside the tent alternative one, after binoculars are first choice
        polygons: [
            {
                name: "Picture of Dr. Capella and Roscoe",
                description: "A framed photograph capturing a candid moment between Dr. Capella and Roscoe. Their bond is evident from their smiles and gleaming eyes.",
                action: 'popup',
                image: 'images/dr_capella_and_roscoe_placeholder.jpg',
                coords: CommonCoords.picture,
            },
            {
                name: "Outside the Tent",
                description: "This goes outside the tent.",
                action: 'changeImage',
                replacementImage: CurrentFirstSceneState, // index of the target image in the images array
                coords: CommonCoords.outsidethetent,
            },
        ]
    },
    {
        src: 'images/inside_tent_image_4.jpg', //inside the tent alternative one, after binoculars are first choice
        polygons: [
            {
                name: "Picture of Dr. Capella and Roscoe",
                description: "A framed photograph capturing a candid moment between Dr. Capella and Roscoe. Their bond is evident from their smiles and gleaming eyes.",
                action: 'popup',
                image: 'images/dr_capella_and_roscoe_placeholder.jpg',
                coords: CommonCoords.picture,
            },
            {
                name: "Outside the Tent",
                description: "This goes outside the tent.",
                action: 'changeImage',
                replacementImage: CurrentFirstSceneState, // index of the target image in the images array
                coords: CommonCoords.outsidethetent,
            },
            {
                name: "Binoculars",
                description: "Looks like Dr. Capella left her binoculars. Maybe we should take these with us. Solve the math problem below to add the item to your inventory.",
                action: 'itemquizpopup',
                image: 'images/binocsmini.png',
                replacementImage:'images/inside_tent_image_3.jpg',
                finalarraystate: 2,
                coords: CommonCoords.binoculars,
            },
        ]
    },
    {
        src: 'images/jungle escape.png',
        polygons: [
                {
                    name: "Path2",
                    action: 'changeImage',
                    replacementImage: 'images/jungle escape.png',
                    coords: [
                        {x: 211, y: 447},
                        {x: 290, y: 556},
                        {x: 368, y: 559},
                        {x: 430, y: 578},
                        {x: 452, y: 512},
                        {x: 527, y: 557},
                        {x: 599, y: 572},
                        {x: 609, y: 493},
                        {x: 639, y: 461},
                        {x: 698, y: 462},
                        {x: 723, y: 499},
                        {x: 779, y: 394},
                        {x: 806, y: 314},
                        {x: 752, y: 239},
                        {x: 654, y: 122},
                        {x: 615, y: 66},
                        {x: 571, y: 76},
                        {x: 465, y: 148},
                        {x: 345, y: 230},
                        {x: 380, y: 307},
                        {x: 343, y: 325},
                        {x: 248, y: 325},
                        {x: 237, y: 380},
                        {x: 258, y: 432}
                    ]
                },
            ]
    },
];

