//Keep track of userId for updating
const user_id = Number(document.querySelector("#user-data").dataset.userId);
const titleInput = document.querySelector("#title")
const textInput = document.querySelector("#title")
const logForm = document.querySelector("#log-form");

console.log(`Title: ${title}, Text: ${text}, user_id: ${user_id}`)
logForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    try {
        const putBody = {
            title : titleInput.value,
            text: textInput.value,
            user_id
        }
        const response = await fetch(`/api/logs/`, {
            method: "POST",
            body: JSON.stringify(putBody),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        }
    } catch (err) {
        console.error(err);
    }
})
