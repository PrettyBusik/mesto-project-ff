const editingForm = document.forms['edit-profile'];
const addingForm = document.forms['new-place'];
const newAvatarForm = document.forms['avatar-form']
const nameInputInEditingForm = editingForm.elements.name;
const descriptionInputInEditingForm = editingForm.elements.description;

/**
 *
 * @param {string} userName
 * @param {string} userJob
 */
export function fillEditingForm(userName, userJob) {
    const nameInput = editingForm.elements.name
    const jobInput = editingForm.elements.description;

    nameInput.value = userName;
    jobInput.value = userJob;
}

/**
 *
 * @param {function(string, string)} callback
 */
export function subscribeToEditingFormSubmitting(callback) {
    editingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newName = editingForm.elements.name.value;
        const newJob = editingForm.elements.description.value;
        callback(newName, newJob);
    })
}

/**
 *
 * @param {function(string, string)} callback
 */
export function subscribeToAddingFormSubmitting(callback) {
    addingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newCityValue = addingForm.elements['place-name'].value;
        const newLinkValue = addingForm.elements.link.value;
        callback(newCityValue, newLinkValue);
        addingForm.reset();
    })
}

export function subscribeToNewAvatarFormSubmitting(callback){
    newAvatarForm.addEventListener('submit', function (event){
        event.preventDefault();
        const  newAvatarLink = newAvatarForm.elements.avatar.value;
        callback(newAvatarLink);
    })
}



