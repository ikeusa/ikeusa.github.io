window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const inventoryCanvas = document.getElementById('inventoryCanvas');
    const inventoryCtx = inventoryCanvas.getContext('2d');
    const randomIndex = Math.floor(Math.random() * mathProblems.length);
    let selectedProblem = mathProblems[randomIndex];
    let currentImage = images.find(image => image.src === 'images/original_title_screen.jpg'); // Replace 'initialSource' with the src of the initial image
    let currentPolygons = currentImage ? currentImage.polygons : [];
    let inventoryItems = [];
    let selectedPolygon = null; //makes local variable global
    let inventorystatus = null; //makes local variable global
    let binocularsIndex = null;
    let mapsIndex = null;
    let currentDragRegions = dragregions;
    let dragregionsimage = null;


    function drawInventory() {
        inventoryCtx.clearRect(0, 0, inventoryCanvas.width, inventoryCanvas.height);
        let x = 10;
        const y = 10;
        inventoryItems.forEach(item => {
            inventorystatus = inventoryItems;
            const img = new Image();
            img.src = item.image; // Directly use the image property of the item
            img.onload = () => {
                inventoryCtx.drawImage(img, x, y, 120, 100);
                x += 120;
            };
        });
    }

    const img = new Image();
    img.src = currentImage ? currentImage.src : 'images/original_title_screen.jpg'; // This should be the source of your initial image
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    function changeImage(src) {
        newImageObject = images.find(image => image.src === src);
        
        if (!newImageObject) {
            console.error(`Image with src ${src} not found`);
            return;
        } 
    
        currentImage = newImageObject; // Update the current image object
        img.src = currentImage.src; // Set new image source
        currentPolygons = currentImage.polygons; // Load polygons of the new image
        updateDragRegions(currentImage.src);

        
        // Clear and Draw new Image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

    }
    

    // Main and Inventory canvas event listener - since the inventory canvas is top, it has the name priority.
    inventoryCanvas.addEventListener('click', function(event) {
        for (let polygon of currentPolygons) {
            inventoryCtx.beginPath();
            inventoryCtx.moveTo(polygon.coords[0].x, polygon.coords[0].y);
            for (let i = 1; i < polygon.coords.length; i++) {
                inventoryCtx.lineTo(polygon.coords[i].x, polygon.coords[i].y);
            }
            inventoryCtx.closePath();
    
            if (inventoryCtx.isPointInPath(event.offsetX, event.offsetY)) {
                selectedPolygon = polygon; //exports the polygon to a global audience
                if (polygon.action === 'popup') {
                    openpopup(polygon);
                } else if (polygon.action === 'changeImage') {
                    changeImage(polygon.replacementImage); // Updated this line.
                } else if (polygon.action === 'itemquizpopup') {
                    itemquizpopup(polygon);
                }
                break;
            }
        }
    });
    
    inventoryCanvas.addEventListener('mousemove', updateCursor);

    function updateCursor(event) {
        const hoverPosition = {
            x: event.clientX - inventoryCanvas.getBoundingClientRect().left,
            y: event.clientY - inventoryCanvas.getBoundingClientRect().top
        };

        let isOverPolygon = false;
        for (let polygon of currentPolygons) {
            inventoryCtx.beginPath();
            inventoryCtx.moveTo(polygon.coords[0].x, polygon.coords[0].y);
            for (let i = 1; i < polygon.coords.length; i++) {
                inventoryCtx.lineTo(polygon.coords[i].x, polygon.coords[i].y);
            }
            inventoryCtx.closePath();

            if (inventoryCtx.isPointInPath(hoverPosition.x, hoverPosition.y)) {
                isOverPolygon = true;
                break;
            }
        }

        // Update the cursor style based on its position
       inventoryCanvas.style.cursor = isOverPolygon ? 'pointer' : 'default';
    };

    //end inventory canvas listener


    function openpopup(polygon) {
        // Open the popup container
        const popup = document.querySelector('.popupcontainer');
        popup.classList.add('open-popupcontainer');
    
        // Display the image associated with the polygon in dynamicText1
        const imageElement = document.createElement('img');
        imageElement.src = polygon.image;
        //imageElement.alt = polygon.name; // using the name of the polygon as the alt text
        const dynamicText1 = document.getElementById('dynamicText1');
        dynamicText1.innerHTML = ""; // Clear any existing content
        dynamicText1.appendChild(imageElement);
    
        // Display the description associated with the polygon in dynamicText2
        const dynamicText2 = document.getElementById('dynamicText2');
        dynamicText2.textContent = polygon.description;
    };

    function itemquizpopup(polygon) {
        getRandomProblem();
        // Open the popup container
        const itemquizpopup = document.querySelector('.popupcontainer-quiz');
        itemquizpopup.classList.add('open-popupcontainer-quiz');
    
        // Display the image associated with the inventory item
        const imageElement = document.createElement('img');
        imageElement.src = polygon.image;
        //imageElement.alt = polygon.name; // using the name of the polygon as the alt text
        const itemquizpopupphoto = document.getElementById('itemquizpopupphoto');
        itemquizpopupphoto.innerHTML = ""; // Clear any existing content
        itemquizpopupphoto.appendChild(imageElement);
    
        // Display the description associated with the polygon inventory item
        const itemquizpopuptext1 = document.getElementById('itemquizpopuptext1');
        itemquizpopuptext1.textContent = polygon.description;

        // Display the randomized math problem
        const itemquizpopuptext2 = document.getElementById('itemquizpopuptext2');
        itemquizpopuptext2.textContent = selectedProblem.problem;
    };

    window.closepopup = function() {
        const popup = document.querySelector('.popupcontainer');
        popup.classList.remove('open-popupcontainer');
    };

    window.closequizpopup = function() { //close the popup container quiz-inventory item
        const popup = document.querySelector('.popupcontainer-quiz');
        popup.classList.remove('open-popupcontainer-quiz'); 
        document.getElementById('answerInput').value = ''; //erase answer values       
    };

    window.checkanswer = function() {
        const userAnswer = document.getElementById('answerInput').value;
  
        if (Number(userAnswer) === selectedProblem.answer) {
            //showPositiveFeedback();
            correct(); 
            //closequizpopup();
            }
        else {
            wrong();
        }
    };

    function correct() {
        const currentItem = items[selectedPolygon.name];
        inventoryItems.push(currentItem);
        drawInventory();
        inventorycheck();
  
        //TENT SCENE CHANGE
        if (inventorystatus.some(items => items.name === 'Map') && (inventorystatus.length === 1 && inventorystatus[0].name === 'Map')) { //check if maps is first
            selectedPolygon.replacementImage=TentStates[3]; //Set current background to the alternative state
        } 
        

        if (selectedPolygon.replacementImage) {
            changeImage(selectedPolygon.replacementImage);
           
        }
      
        closequizpopup();
    };

    function inventorycheck(){ //this will help set the order of SCENE STATES
        
        //TENT SCENES
        
        binocularsIndex = inventorystatus.findIndex(item => item.name === 'Binoculars');
        mapsIndex = inventorystatus.findIndex(item => item.name === 'Map');

            
        if (inventorystatus.some(items => items.name === 'Binoculars') && (inventorystatus.length === 1 && inventorystatus[0].name === 'Binoculars')) { //check if binocs is first
            CurrentTentState=TentStates[selectedPolygon.finalarraystate]; //Set currenttentstate based on the final array from the polygon
            images[1].polygons[0].replacementImage=CurrentTentState;
        } 

        if (inventorystatus.some(items => items.name === 'Map') && (inventorystatus.length === 2 && inventorystatus[1].name === 'Map')) { //check if maps is second
            CurrentTentState=TentStates[selectedPolygon.finalarraystate]; //Set currenttentstate based on the final array from the polygon
            images[1].polygons[0].replacementImage=CurrentTentState;
        } 

        if (inventorystatus.some(items => items.name === 'Map') && (inventorystatus.length === 1 && inventorystatus[0].name === 'Map')) { //check if maps is first
            CurrentTentState=TentStates[3]; //Set currenttentstate based on the final array from the polygon
            images[1].polygons[0].replacementImage=CurrentTentState;
        } 
        if (inventorystatus.some(items => items.name === 'Map') && inventorystatus.some(items => items.name === 'Binoculars')) { //check if maps is first
            CurrentTentState=TentStates[2]; //Set currenttentstate based on the final array from the polygon
            images[1].polygons[0].replacementImage=CurrentTentState;
        } 
    };

    function getRandomProblem() { //randomized the math problem
        const randomIndex = Math.floor(Math.random() * mathProblems.length);
        selectedProblem = mathProblems[randomIndex];
    };

     
    // Drag Test
    let draggingItem = null;
    let offsetX, offsetY;

// Assume you have a canvas and its context as inventoryCanvas and inventoryCtx

inventoryCanvas.addEventListener('mousedown', function (e) {
    let x = 10;
    const y = 10;
    inventoryItems.forEach(item => {
        if (e.offsetX > x && e.offsetX < x + 120 && e.offsetY > y && e.offsetY < y + 100) {
            draggingItem = item;
            offsetX = e.offsetX - x;
            offsetY = e.offsetY - y;
        }
        x += 120;
    });
});

inventoryCanvas.addEventListener('mousemove', function (e) {
    if (draggingItem) {
        inventoryCtx.clearRect(0, 0, inventoryCanvas.width, inventoryCanvas.height); // Clear the canvas
        // Redraw the inventory
        
        // Draw the dragging item at the mouse position
        const img = new Image();
        img.src = draggingItem.image;
        inventoryCtx.drawImage(img, e.offsetX - offsetX, e.offsetY - offsetY, 120, 100);
    }
});


inventoryCanvas.addEventListener('mouseup', function (e) {
    if (draggingItem) {
        drawInventory();  // Redraw the inventory

        console.log('currentDragRegions:', currentDragRegions);
        console.log('draggingItem:', draggingItem);
        
        // Check if the item is dropped in any defined polygon
        currentDragRegions.forEach(polygon => {
            inventoryCtx.beginPath();
            inventoryCtx.moveTo(polygon.coords[0].x, polygon.coords[0].y);
            for (let i = 1; i < polygon.coords.length; i++) {
                inventoryCtx.lineTo(polygon.coords[i].x, polygon.coords[i].y);
            }
            inventoryCtx.closePath();
            
            if (inventoryCtx.isPointInPath(e.offsetX, e.offsetY)) {
                console.log(`Dropped item in ${polygon.name}`);
                console.log(draggingItem.name); //Can name the item being dropped.
                // Call the function associated with the polygon action
                if (polygon.action === 'changeImage') {
                    dragregionsimage = polygon.replacementImage;
                    changeImage(polygon.replacementImage);
                }
                // ... handle other actions
            }
        });

        draggingItem = null;  // Reset the dragging item
    }
});

function updateDragRegions(src) {
    const regionSet = dragregions.find(region => region.src === src);
    currentDragRegions = regionSet ? regionSet.polygons : [];
}

};