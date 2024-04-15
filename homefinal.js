$(document).ready(function() {
    $('#generateButton').click(function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        const imageDisplay = $('#imageDisplay');
        imageDisplay.empty(); // Clear existing images

        const inputs = $('input[type="checkbox"]:checked, input[type="radio"]:checked');
        const errorDisplay = $('#errorDisplay'); // Using jQuery for consistency in error handling

        if (inputs.length === 0) {
            errorDisplay.text('Please select at least one option to generate an outfit.'); // Show error message
            return; // Stop further execution if no options are selected
        } else {
            errorDisplay.text(''); // Clear any existing error messages
        }

        // Define the number of image variations for each type of item
        const variations = {
            'dress': 2,
            'skirt': 2,
            'trousers': 2,
            'shorts': 2,
            'jeans': 2,
            'hoodie': 2,
            'coat': 2,
            'cardigan': 2,
            'leggings': 1,
            'blouse': 2,
            'tshirt': 2,
            'sweatpants': 2,
            'sweater': 2,
            'onepiece': 2,
            'bikini': 2,
            'vest': 2,
            'tanktop': 2,

            'slippers': 1,
            'heels': 2,
            'loafers': 1,
            'sneakers': 2,
            'boots': 1,
        };

        // Handle checked checkboxes and selected radio buttons
        inputs.each(function() {
            const value = $(this).val().toLowerCase().replace(/\s+/g, ''); // Remove all spaces and convert to lowercase
            let imageName = value + '.jpg'; // Assume a default image name like "croptop.jpg"

            if (variations[value]) {
                const randomIndex = Math.floor(Math.random() * variations[value]) + 1; // Generate a random index
                imageName = value + '_' + randomIndex + '.jpg'; // Construct the random image file name
            }

            const imagePath = 'images/' + imageName; // Full path without subfolder in this case
            const image = $('<img>').attr('src', imagePath); // Create an image element with the source set to the constructed path
            image.attr('alt', value); // Set the alt attribute for accessibility
            image.css('width', '100px').css('margin', '10px'); // Styling images
            imageDisplay.append(image); // Append the image to the display area
        });
    });
});
