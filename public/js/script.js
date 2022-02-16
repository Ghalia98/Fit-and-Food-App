document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("recipe-app JS imported successfully!");
        //add one row when the user press the "Add more ingredients" button in the newRecipe form
        document.querySelector('.add-ingredients').addEventListener('click', () => {
                const ingredientsContainer = document.querySelector('.ingredients-container');

                ingredientsContainer.appendChild(htmlToElement(`<input type="text" class="form-control" name="ingredients" placeholder="Add more ingredients"/>`));
            })
            //add one row when the user press the "Add more steps<" button in the newRecipe form
        document.querySelector('.add-steps').addEventListener('click', () => {
            const instructionSteps = document.querySelector('.instruction-steps');

            instructionSteps.appendChild(htmlToElement(`<textarea class="form-control" name="instructions" rows="3" placeholder="Add next steps"></textarea>`));
        })

    },
    false);

// https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
function htmlToElement(html) {
    const template = document.createElement('template');

    html = html.trim();
    template.innerHTML = html;

    return template.content.firstChild;
}