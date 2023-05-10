const newFormHandler = async (event) => {
  event.preventDefault();

  const q1_value = Number(document.querySelector("#question1").value.trim());
  const q2_value = Number(document.querySelector("#question2").value.trim());
  const q3_value = Number(document.querySelector("#question3").value.trim());
  const q4_value = Number(document.querySelector("#question4").value.trim());
  const day_id = Number(document.querySelector(".id").value.trim());

  if (q1_value && q2_value && q3_value && q4_value) {
    const response = await fetch(`/api/score`, {
      method: "POST",
      body: JSON.stringify({ q1_value, q2_value, q3_value, q4_value, day_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to submit answers to daily check-in");
    }
  }
};

document.querySelector("form").addEventListener("submit", newFormHandler);
