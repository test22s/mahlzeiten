document.addEventListener("DOMContentLoaded", function() {
    const feed = document.getElementById("feed");
    const saveBtn = document.getElementById("save-btn");

    // Lade den gespeicherten Feed beim Start
    loadFeed();

    // Mahlzeit hinzufügen
    saveBtn.addEventListener("click", function() {
        const nameInput = document.getElementById("name").value.trim();
        const imageUpload = document.getElementById("image-upload").files[0];

        if (nameInput && imageUpload) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const meal = {
                    name: nameInput,
                    image: e.target.result,
                };
                saveMeal(meal);
                addMealToFeed(meal);
                showSuccessPopup();
                clearForm();
            };
            reader.readAsDataURL(imageUpload);
        } else {
            showErrorPopup();
        }
    });

    function saveMeal(meal) {
        let meals = JSON.parse(localStorage.getItem("meals")) || [];
        meals.unshift(meal); // Neue Mahlzeit oben hinzufügen
        localStorage.setItem("meals", JSON.stringify(meals));
    }

    function loadFeed() {
        const meals = JSON.parse(localStorage.getItem("meals")) || [];
        meals.forEach(addMealToFeed);
    }

    function addMealToFeed(meal) {
        const feedItem = document.createElement("div");
        feedItem.className = "feed-item";

        const mealName = document.createElement("h3");
        mealName.textContent = "✪ " + meal.name;

        const mealImage = document.createElement("img");
        mealImage.src = meal.image;

        feedItem.appendChild(mealName);
        feedItem.appendChild(mealImage);
        feed.prepend(feedItem); // Das neue Item oben hinzufügen
    }

    function showSuccessPopup() {
        const successPopup = document.getElementById('successPopup');
        successPopup.classList.add('show');

        setTimeout(() => {
            successPopup.classList.remove('show');
            successPopup.classList.add('hide');
        }, 1600);

        setTimeout(() => {
            successPopup.classList.remove('hide');
        }, 2200);
    }

    function clearForm() {
        document.getElementById("name").value = "";
        document.getElementById("image-upload").value = "";
    }

    function showErrorPopup() {
        const popup = document.querySelector(".popup4");
        popup.style.display = "block"; // Popup anzeigen

        setTimeout(() => {
            popup.style.display = "none"; // Popup nach kurzer Zeit wieder ausblenden
        }, 720);
    }
});

document.getElementById('menu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
    document.getElementById('overlay').classList.add('active');
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
    document.getElementById('overlay').classList.remove('active');
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
    document.getElementById('overlay').classList.remove('active');
});

document.querySelectorAll('.menuBtn').forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        var target = this.getAttribute('data-target');
        document.getElementById('sideMenu').style.width = '0';
        document.getElementById('overlay').classList.remove('active');
        setTimeout(function() {
            window.location.href = target;
        }, 300);
    });
});

