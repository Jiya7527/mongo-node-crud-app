// Select all delete forms
let deleteForms = document.querySelectorAll('.delete-form');

// Add event listener to each form
deleteForms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
        // Show confirmation box
        let confirmDelete = confirm("Are you sure you want to delete this chat?");
        if (!confirmDelete) {
            // If user cancels, stop form from submitting
            event.preventDefault();
        }
        // Otherwise (if OK), it will submit automatically
    });
});

