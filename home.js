$(document).ready(function() {
    // Add 'active' class to labels when their inputs are clicked for visual feedback
    $('.selections label').on('click', function() {
        let inputType = $(this).find('input').attr('type');
        if (inputType === 'radio') {
            // If it's a radio button, remove 'active' from all siblings
            $(this).siblings().removeClass('active');
        }
        // Toggle 'active' class on the current label for checkboxes and radios
        $(this).toggleClass('active');
    });

    // Handle form submission event
    $('#quizForm').on('submit', function(event) {
        event.preventDefault();  // Stop the form from submitting the traditional way

        // Function to validate the form
        if (validateForm()) {
            // If validation passes, redirect to the success page
            window.location.href = 'success.html';  // Change 'success.html' to your target URL
        } else {
            // If validation fails, show an alert
            alert('Please answer all questions before submitting.');
        }
    });

    // Function to validate the form
    function validateForm() {
        let isValid = true;

        // Check if each question has at least one option selected
        $('.questions').each(function() {
            if ($(this).next('.selections').find('input:checked').length === 0) {
                isValid = false;  // Set isValid to false if any question is unanswered
                // Optionally highlight unanswered question, e.g., by adding a warning class
                $(this).addClass('warning');
            }
        });

        return isValid;  // Return the boolean result of the validation
    }

    
});


