document.addEventListener("DOMContentLoaded", function () {
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");
  const addTransactionBtn = document.getElementById("addTransaction");
  const viewTransactionsBtn = document.getElementById("viewTransactions");
  const totalAmountDisplay = document.getElementById("totalAmount");
  const totalIncomeDisplay = document.getElementById("totalIncome");
  const totalExpenseDisplay = document.getElementById("totalExpense");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  function updateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        totalExpense += transaction.amount;
      } else {
        totalIncome += transaction.amount;
      }
    });

    const netTotal = totalIncome - totalExpense;

    totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    totalExpenseDisplay.textContent = totalExpense.toFixed(2);
    totalAmountDisplay.textContent = netTotal.toFixed(2);
  }

  function showPopup() {
    popup.style.display = "flex";
  }

  function hidePopup() {
    popup.style.display = "none";
  }

  function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid description and amount.");
      return;
    }

    const transaction = { description, amount, type };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTotals();

    // Show popup
    showPopup();

    descriptionInput.value = "";
    amountInput.value = "";
  }

  addTransactionBtn.addEventListener("click", addTransaction);

  viewTransactionsBtn.addEventListener("click", function () {
    window.location.href = "transactions.html";
  });

  closePopup.addEventListener("click", hidePopup);

  // Initial render
  updateTotals();
});
