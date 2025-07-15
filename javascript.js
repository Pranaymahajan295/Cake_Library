      // Loading screen
      window.addEventListener("load", () => {
        const loading = document.getElementById("loading");
        setTimeout(() => {
          loading.style.opacity = "0";
          setTimeout(() => {
            loading.style.display = "none";
          }, 500);
        }, 1000);
      });

      // Navbar scroll effect
      window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });

      // Mobile menu toggle
      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("nav-menu");

      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });

      // Close menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active");
        });
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
      });

      // Modal functionality
      const modal = document.getElementById("modal");
      const modalTitle = document.getElementById("modal-title");
      const modalText = document.getElementById("modal-text");

      const categoryDetails = {
        "Birthday Cakes":
          "Custom birthday cakes made fresh for your special day. Available in various flavors including chocolate, vanilla, strawberry, and more. We can create personalized designs with names and messages.",
        "Wedding Cakes":
          "Elegant multi-tier wedding cakes designed to make your special day unforgettable. Choose from classic designs or custom creations that match your wedding theme.",
        Pastries:
          "Fresh baked pastries made daily with premium ingredients. Including croissants, Danish pastries, eclairs, and seasonal specialties.",
        Cookies:
          "Handcrafted cookies and biscuits perfect for gifting or enjoying with tea. Available in chocolate chip, oatmeal, sugar cookies, and seasonal flavors.",
        Cupcakes:
          "Individual treats perfect for parties and events. Available in dozens of flavors with beautiful frosting designs and decorations.",
        "Chocolate Specialties":
          "Rich chocolate creations including truffles, chocolate cakes, brownies, and artisan chocolate treats made with premium cocoa.",
      };

      function openModal(category) {
        modalTitle.textContent = category;
        modalText.textContent =
          categoryDetails[category] ||
          "Delicious treats made with love and premium ingredients.";
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }

      function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }

      // Close modal when clicking outside
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      // Close modal with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
          closeModal();
        }
      });

      // Add parallax effect to hero section
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector(".hero");
        if (hero) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      });

      // Add typing effect to hero title
      function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = "";
        function type() {
          if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        }
        type();
      }

      // Initialize typing effect when page loads
      setTimeout(() => {
        const heroTitle = document.querySelector(".hero h1");
        if (heroTitle) {
          const originalText = heroTitle.textContent;
          typeWriter(heroTitle, originalText, 80);
        }
      }, 1500);

      // Add hover effects to product cards
      document
        .querySelectorAll(".product-card, .category-card")
        .forEach((card) => {
          card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px) scale(1.02)";
          });

          card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
          });
        });

      // Add ripple effect to buttons
      document.querySelectorAll(".cta-button").forEach((button) => {
        button.addEventListener("click", function (e) {
          const ripple = document.createElement("span");
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          ripple.style.width = ripple.style.height = size + "px";
          ripple.style.left = x + "px";
          ripple.style.top = y + "px";
          ripple.classList.add("ripple");

          this.appendChild(ripple);

          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });

      // Add CSS for ripple effect
      const style = document.createElement("style");
      style.textContent = `
            .cta-button {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
      document.head.appendChild(style);

      // Add scroll progress indicator
      const progressBar = document.createElement("div");
      progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #d4a574, #ff6b6b);
            z-index: 10001;
            transition: width 0.3s ease;
        `;
      document.body.appendChild(progressBar);

      window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
      });

      // Add floating action button for quick order
      const fab = document.createElement("div");
      fab.innerHTML = '<i class="fas fa-phone"></i>';
      fab.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ff6b6b, #d4a574);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        `;

      const pulseStyle = document.createElement("style");
      pulseStyle.textContent = `
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(255, 107, 107, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
            }
        `;
      document.head.appendChild(pulseStyle);

      fab.addEventListener("click", () => {
        window.open("tel:+919876543210", "_self");
      });

      fab.addEventListener("mouseenter", () => {
        fab.style.transform = "scale(1.1)";
      });

      fab.addEventListener("mouseleave", () => {
        fab.style.transform = "scale(1)";
      });

      document.body.appendChild(fab);

      // Add lazy loading for images
      const images = document.querySelectorAll("img[data-src]");
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));

      // Add current year to footer
      document.querySelector(
        ".footer p:last-child"
      ).innerHTML = `&copy; ${new Date().getFullYear()} Shree's Cake Library. All rights reserved.`;

      // Add weather-based recommendations (mock data)
      function addWeatherRecommendations() {
        const weatherRecommendations = {
          hot: ["Ice Cream Cakes", "Frozen Yogurt Treats", "Cold Pastries"],
          cold: ["Hot Chocolate Cakes", "Warm Muffins", "Spiced Cookies"],
          rainy: ["Comfort Cakes", "Tea Cakes", "Warm Brownies"],
        };

        // Mock weather (you could integrate with a real weather API)
        const currentWeather = "hot"; // This would come from weather API
        const recommendations = weatherRecommendations[currentWeather];

        if (recommendations) {
          const weatherSection = document.createElement("div");
          weatherSection.style.cssText = `
                    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
                    padding: 2rem;
                    margin: 2rem 0;
                    border-radius: 15px;
                    text-align: center;
                `;

          weatherSection.innerHTML = `
                    <h3 style="color: #1976d2; margin-bottom: 1rem;">
                        <i class="fas fa-sun"></i> Perfect for Today's Weather
                    </h3>
                    <p style="color: #666; margin-bottom: 1rem;">
                        Beat the heat with our refreshing treats!
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        ${recommendations
                          .map(
                            (item) =>
                              `<span style="background: white; padding: 0.5rem 1rem; border-radius: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">${item}</span>`
                          )
                          .join("")}
                    </div>
                `;

          const categoriesSection = document.getElementById("categories");
          categoriesSection
            .querySelector(".container")
            .appendChild(weatherSection);
        }
      }

      // Initialize weather recommendations
      setTimeout(addWeatherRecommendations, 2000);

      console.log("🎂 Shree's Cake Library - Website Loaded Successfully! 🍰");
