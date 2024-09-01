document.addEventListener("DOMContentLoaded", function () {
    const transactionList = document.getElementById("transactionList");
    const backToHomeBtn = document.getElementById("backToHome");

    function renderTransactions() {
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactionList.innerHTML = "";

        transactions.forEach((transaction) => {
            const li = document.createElement("li");
            li.className = transaction.type;
            li.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
            transactionList.appendChild(li);
        });
    }

    backToHomeBtn.addEventListener("click", function() {
        window.location.href = "index.html";
    });

    // Initial render
    renderTransactions();
});
