// Get the canvas element
    const canvas = document.getElementById('gameCanvas');

    // Get the 2D drawing context
    const ctx = canvas.getContext('2d');

    // Draw a white rectangle covering the entire canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 300, 300);

    // Draw a black border around the rectangle
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, 300, 300);