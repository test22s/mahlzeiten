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
                    id: Date.now(), // Eindeutige ID für jede Mahlzeit
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
        feedItem.dataset.id = meal.id;

        const mealName = document.createElement("h3");
        mealName.textContent = "✪ " + meal.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function() {
            deleteMeal(meal.id, feedItem);
        });

        const mealImage = document.createElement("img");
        mealImage.src = meal.image;

        feedItem.appendChild(mealName);
        feedItem.appendChild(mealImage);
        feedItem.appendChild(deleteBtn);

        feedItem.classList.add('hidden'); // Füge die Klasse 'hidden' hinzu
        feed.prepend(feedItem); // Das neue Item oben hinzufügen

        // Warte einen kurzen Moment und entferne dann die 'hidden'-Klasse, um die Transition auszulösen
        setTimeout(() => {
            feedItem.classList.remove('hidden');
        }, 10);
    }

    function deleteMeal(id, feedItem) {
        let meals = JSON.parse(localStorage.getItem("meals")) || [];
        meals = meals.filter(meal => meal.id !== id);
        localStorage.setItem("meals", JSON.stringify(meals));
        feed.removeChild(feedItem);
    }

    function showSuccessPopup() {
        const successPopup = document.getElementById('successPopup');
        successPopup.classList.add('show', 'slide-in');

        setTimeout(() => {
            successPopup.classList.remove('slide-in');
            successPopup.classList.add('slide-out');
        }, 1600);

        setTimeout(() => {
            successPopup.classList.remove('show', 'slide-out');
        }, 2000);
    }

    function clearForm() {
        document.getElementById("name").value = "";
        document.getElementById("image-upload").value = "";
    }

    function showErrorPopup() {
        const popup = document.querySelector(".popup4");
        popup.classList.add('show', 'slide-in');

        setTimeout(() => {
            popup.classList.remove('slide-in');
            popup.classList.add('slide-out');
        }, 1600);

        setTimeout(() => {
            popup.classList.remove('show', 'slide-out');
        }, 2000);
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
