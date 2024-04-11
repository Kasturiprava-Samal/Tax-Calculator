document.getElementById("age").addEventListener("focus", function () {
  this.removeChild(this.querySelector('option[value=""][disabled]'));
});

document.getElementById("income").addEventListener("input", function () {
  const income = this.value;

  if (isNaN(income)) {
    document.getElementById("incomeError").style.display = "inline";
  } else {
    document.getElementById("incomeError").style.display = "none";
  }
});

document.getElementById("extraIncome").addEventListener("input", function () {
  const extraIncome = this.value;

  if (isNaN(extraIncome)) {
    document.getElementById("extraIncomeError").style.display = "inline";
  } else {
    document.getElementById("extraIncomeError").style.display = "none";
  }
});

document.getElementById("deductions").addEventListener("input", function () {
  const deductions = this.value;

  if (isNaN(deductions)) {
    document.getElementById("deductionsError").style.display = "inline";
  } else {
    document.getElementById("deductionsError").style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const taxForm = document.getElementById("taxForm");
  const modal = document.getElementById("taxModal");
  const modalBody = document.getElementById("incomeModalBody");
  const closeButton = document.querySelector(".close-button");

  taxForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form input values
    const incomeInput = document.getElementById("income");
    const extraIncomeInput = document.getElementById("extraIncome");
    const deductionsInput = document.getElementById("deductions");

    // Check if any input field is not a number
    if (
      isNaN(incomeInput.value) ||
      isNaN(extraIncomeInput.value) ||
      isNaN(deductionsInput.value)
    ) {
      alert("Please check the entered values.");
      return;
    }

    const income = parseFloat(document.getElementById("income").value || 0);
    const extraIncome = parseFloat(
      document.getElementById("extraIncome").value || 0
    );
    const age = document.getElementById("age").value;
    const deductions = parseFloat(
      document.getElementById("deductions").value || 0
    );

    // Calculate total income and overall income
    const overallIncome = income + extraIncome;
    const taxableIncome = overallIncome - deductions;

    // Calculate tax based on age and taxable income
    var tax = 0;
    var totalAmount = 0;
    if (taxableIncome > 800000) {
      if (age === "<40") {
        tax = 0.3 * (taxableIncome - 80000);
      } else if (age === "≥40 < 60") {
        tax = 0.4 * (taxableIncome - 80000);
      } else if (age === "≥60") {
        tax = 0.1 * (taxableIncome - 80000);
      }
    }

    // Display overall income and tax in the modal
    modalBody.innerHTML = `<h2>Your overall income will be </h2>
                               <h2>${
                                 taxableIncome > 800000
                                   ? (overallIncome - tax).toFixed(2)
                                   : taxableIncome
                               }</h2>`;

    // Show the modal
    modal.style.display = "flex";
  });

  closeButton.addEventListener("click", function () {
    // Hide the modal when close button is clicked
    modal.style.display = "none";
    document
      .getElementById("age")
      .insertAdjacentHTML(
        "afterbegin",
        '<option value="" disabled selected>Select Age Group</option>'
      );
  });

  window.addEventListener("click", function (event) {
    // Hide the modal when clicking outside the modal content
    if (event.target === modal) {
      modal.style.display = "none";
      document
        .getElementById("age")
        .insertAdjacentHTML(
          "afterbegin",
          '<option value="" disabled selected>Select Age Group</option>'
        );
    }
  });
});
