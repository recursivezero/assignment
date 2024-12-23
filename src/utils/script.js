fetch("./main.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    data.forEach((branch) => {
      const card = document.createElement("div");
      card.className = "card";

      const surnamesHTML = `
        <p><strong>Surnames:</strong> ${branch.Surnames.join(", ")}</p>
        <p><strong>Deity:</strong> ${branch.Deity}</p>
        <p><strong>Branch Name:</strong> ${branch.Branch_Name}</p>
        <p><strong>Gotra:</strong> ${branch.Gotra}</p>
        <p><strong>Location:</strong> ${branch.Location}</p>
      `;

      const cardContent = `
        <div class="card-header">
          <h2>${branch.Gotra}</h2>
        </div>
        <div class="card-body">
          ${surnamesHTML}
        </div>
      `;

      card.innerHTML = cardContent;

      card.querySelector(".card-header").addEventListener("click", (event) => {
        // Close any other open cards
        document.querySelectorAll(".card.open").forEach((openCard) => {
          if (openCard !== card) {
            openCard.classList.remove("open");
          }
        });

        // Toggle the clicked card
        card.classList.toggle("open");

        // Prevent event bubbling
        event.stopPropagation();
      });

      // Add keyboard event listener for accessibility
      card.querySelector(".card-header").addEventListener("keypress", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          // Simulate click on Enter or Space
          card.querySelector(".card-header").click();
          event.preventDefault();
        }
      });

      cardContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Fetch error:", error));