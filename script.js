document.addEventListener("DOMContentLoaded", () => {
    
    // Navbar menu toggle
    const menu = document.querySelector(".menu");
    const menuBtn = document.querySelector(".menu-btn");
    let menuOpen = false;

    menuBtn.addEventListener("click", () => {
        if(menuOpen === false) {
            menuBtn.firstElementChild.innerHTML = "close";
            menuOpen = true;
        } else {
            menuBtn.firstElementChild.innerHTML = "menu";
            menuOpen = false;
        }
        menu.classList.toggle("menu-open");
    });

    // Slider functionality
    const btnPrev = document.querySelector("#btnPrev");
    const btnNext = document.querySelector("#btnNext");
    const colorName = document.querySelector(".name");
    const image = document.querySelector(".img");
    const themeNumber = document.querySelector(".theme-number");
    const paginationSpans = document.querySelectorAll(".pagination span");

    if (btnPrev && btnNext && colorName && image && themeNumber && paginationSpans.length > 0) {
        let themeId = 0;

        const names = [
            "Pro Deck",
            "Street Cruiser",
            "PARK Dominator",
            "All-Terrain Beast"
        ];

        const themes = [
            "theme-1",
            "theme-2",
            "theme-3",
            "theme-4"
        ];

        const images = [
            "skateboard.png",
            "skateboard-2.png",
            "skateboard-3.png",
            "skateboard-4.png"
        ];

        function changeTheme(themeId) {
            document.body.className = themes[themeId];
            image.src = `images/${images[themeId]}`;
            console.log(`Image source set to ${image.src}`);

            // Reset animation and apply fade-up animation
            image.style.animation = "none";
            setTimeout(() => {
                image.style.animation = "imgFadeUp 800ms ease-out";
                image.style.opacity = "1"; // Ensure the image is visible
                image.style.visibility = "visible"; // Ensure visibility
            }, 100);

            // Update pagination
            paginationSpans.forEach((span, index) => {
                span.classList.toggle("active", index === themeId);
            });

            colorName.textContent = names[themeId];
            themeNumber.textContent = themeId + 1;    
        }
    

        btnPrev.addEventListener("click", () => {
            themeId--;
            if(themeId < 0) {
                themeId = names.length - 1;
            }
            changeTheme(themeId);
        });

        btnNext.addEventListener("click", () => {
            themeId++;
            if(themeId > names.length - 1) {
                themeId = 0;
            }
            changeTheme(themeId);
        });

        paginationSpans.forEach((span, id) => {
            span.addEventListener("click", () => {
                changeTheme(id);
            });
        });

        // Initialize first theme
        changeTheme(0);

        // Automatically cycle through themes
        setInterval(() => {
            themeId++;
            if (themeId > names.length - 1) {
                themeId = 0;
            }
            changeTheme(themeId);
        }, 5000); //Change theme every 5000ms (5 seconds)
    }

    //FAQ functionality
    const faqQuestions = document.querySelectorAll(".faq-question");

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener("click", () => {
                const answer = question.nextElementSibling;
                const isActive = question.classList.contains("active");

                // Close all others
                faqQuestions.forEach(q => {
                    q.classList.remove("active");
                    q.nextElementSibling.classList.remove("active");
                });

                // Reopen current if not active
                if (!isActive) {
                    question.classList.add("active");
                    answer.classList.add("active");
                }
            });
        });
    }
});
