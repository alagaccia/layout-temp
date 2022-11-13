window.sourceInputTags = function(event)
{
	const tagsInput = document.querySelectorAll('[type="tags"]');

    tagsInput.forEach(function(input) {

        if ( input.hasAttribute('data-url') ) {
            var source = input.getAttribute('data-url');

            new BulmaTagsInput(input, {
				caseSensitive: false,
                source: async function(value) {
                    // Value equal input value
                    // We can then use it to request data from external API
                    return await fetch(source + "/" + value)
	                    .then(function(response) {
	                        return response.json();
	                    });
                }
            });
        }
    });
}
