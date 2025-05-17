// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 0.7}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class when page is fully loaded
    document.body.classList.remove('fade-out');
    
    // Hide all forms initially to prevent flashing
    document.querySelectorAll('form').forEach(form => {
        form.style.opacity = '0';
        form.style.visibility = 'hidden';
    });
    
    // Show forms after a short delay to ensure smooth transition
    setTimeout(() => {
        document.querySelectorAll('form').forEach(form => {
            form.style.opacity = '1';
            form.style.visibility = 'visible';
            form.style.transition = 'opacity 0.5s ease';
        });
    }, 300);

    // Handle smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for revealing sections on scroll
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('features-grid')) {
                    entry.target.querySelectorAll('.feature-card').forEach(card => {
                        card.classList.add('visible');
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections and elements that need animation
    document.querySelectorAll('section, .about-content, .features-grid').forEach(section => {
        observer.observe(section);
    });

    // Handle image loading animations
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // Loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Show loading overlay when navigating
    document.querySelectorAll('a:not([href^="#"])').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.target !== '_blank' && !link.hasAttribute('download')) {
                e.preventDefault();
                
                // Hide all forms before transition
                document.querySelectorAll('form').forEach(form => {
                    form.style.opacity = '0';
                    form.style.visibility = 'hidden';
                });
                
                loadingOverlay.classList.add('active');
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            }
        });
    });

    // Handle form submissions with loading state
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            const submitBtn = form.querySelector('[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            }
        });
    });

    // Smooth modal transitions
    const modalTriggers = document.querySelectorAll('[data-option]');
    const moodQuizOverlay = document.querySelector('.mood-quiz-overlay');
    
    if (modalTriggers && moodQuizOverlay) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                moodQuizOverlay.style.display = 'flex';
                setTimeout(() => {
                    moodQuizOverlay.classList.add('active');
                }, 10);
            });
        });
    }

    // Close modal smoothly
    const closeModalBtn = document.querySelector('.close-quiz-btn');
    if (closeModalBtn && moodQuizOverlay) {
        closeModalBtn.addEventListener('click', () => {
            moodQuizOverlay.classList.remove('active');
            setTimeout(() => {
                moodQuizOverlay.style.display = 'none';
            }, 400);
        });
    }

    // Handle quiz navigation smoothly
    const questionSlides = document.querySelectorAll('.question-slide');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');

    let currentSlide = 0;

    function showSlide(index) {
        questionSlides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.transform = 'translateY(20px)';
            setTimeout(() => {
                slide.style.display = 'none';
            }, 300);
        });

        setTimeout(() => {
            questionSlides[index].style.display = 'block';
            setTimeout(() => {
                questionSlides[index].style.opacity = '1';
                questionSlides[index].style.transform = 'translateY(0)';
            }, 50);
        }, 300);

        // Update progress bar
        const progress = ((index + 1) / questionSlides.length) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentSlide < questionSlides.length - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        });
    });
});

// Add fade-out class to body initially
document.body.classList.add('fade-out');

// Prevent transition on page load
window.addEventListener('beforeunload', () => {
    document.body.classList.add('fade-out');
});

// Add page load event to handle initial state
window.addEventListener('load', () => {
    // Hide all forms initially
    document.querySelectorAll('form').forEach(form => {
        form.style.opacity = '0';
        form.style.visibility = 'hidden';
    });
    
    // Show forms after a short delay
    setTimeout(() => {
        document.querySelectorAll('form').forEach(form => {
            form.style.opacity = '1';
            form.style.visibility = 'visible';
            form.style.transition = 'opacity 0.5s ease';
        });
    }, 300);
});

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation class to service cards on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Function to scroll to recommendation system
function scrollToRecommendation() {
    const recommendationSection = document.getElementById('recommendation-system');
    if (recommendationSection) {
        recommendationSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Show the first step of the recommendation system
        const groupSelection = document.getElementById('group-selection');
        if (groupSelection) {
            // Hide all steps first
            document.querySelectorAll('.step').forEach(step => {
                step.style.display = 'none';
            });
            // Show the first step
            groupSelection.style.display = 'block';
        }
    }
}

// Recommendation System
document.addEventListener('DOMContentLoaded', function() {
    // Get all steps
    const steps = document.querySelectorAll('.step');
    const groupSelection = document.getElementById('group-selection');
    const groupSize = document.getElementById('group-size');
    const dietaryPreferences = document.getElementById('dietary-preferences');
    const moodSelection = document.getElementById('mood-selection');
    const results = document.getElementById('results');

    // Get all option buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    const nextButtons = document.querySelectorAll('.next-btn');
    const moodButtons = document.querySelectorAll('.mood-btn');
    const shareButtons = document.querySelectorAll('.share-btn');
    const restartButton = document.querySelector('.restart-btn');

    // State management
    let currentStep = 1;
    let selectedOption = '';
    let groupSizeValue = 2;
    let dietaryRestrictions = [];
    let selectedMood = '';

    // Handle option selection (Just Me or Groups)
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedOption = this.getAttribute('data-option');
            
            // Hide current step
            groupSelection.style.display = 'none';
            
            if (selectedOption === 'just-me') {
                // Show dietary preferences directly for single order
                dietaryPreferences.style.display = 'block';
                currentStep = 3;
            } else {
                // Show group size for group orders
                groupSize.style.display = 'block';
                currentStep = 2;
            }
        });
    });

    // Handle group size input
    const groupSizeInput = document.querySelector('.group-size-input');
    if (groupSizeInput) {
        groupSizeInput.addEventListener('change', function() {
            groupSizeValue = parseInt(this.value);
        });
    }

    // Handle next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep === 2) {
                // Moving from group size to dietary preferences
                groupSize.style.display = 'none';
                dietaryPreferences.style.display = 'block';
                currentStep = 3;
            } else if (currentStep === 3) {
                // Moving from dietary preferences to mood selection
                dietaryPreferences.style.display = 'none';
                moodSelection.style.display = 'block';
                currentStep = 4;
            }
        });
    });

    // Handle mood selection
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedMood = this.getAttribute('data-mood');
            moodSelection.style.display = 'none';
            results.style.display = 'block';
            currentStep = 5;
            
            // Generate recommendations based on selections
            generateRecommendations();
        });
    });

    // Handle social sharing
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            shareRecommendations(platform);
        });
    });

    // Handle restart
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            resetRecommendationSystem();
        });
    }

    // Function to generate recommendations
    function generateRecommendations() {
        const recommendationsGrid = document.querySelector('.recommendations-grid');
        recommendationsGrid.innerHTML = ''; // Clear existing recommendations

        // Add sample recommendations (replace with actual data)
        const recommendations = [
            {
                title: 'Perfect Match',
                description: 'Based on your mood and preferences',
                image: 'images/food1.jpg'
            },
            {
                title: 'Alternative Option',
                description: 'Another great choice for you',
                image: 'images/food2.jpg'
            }
        ];

        recommendations.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <img src="${rec.image}" alt="${rec.title}">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            `;
            recommendationsGrid.appendChild(card);
        });
    }

    // Function to share recommendations
    function shareRecommendations(platform) {
        const text = `Check out my food recommendations from Moodybites!`;
        let url = '';
        
        switch(platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`;
                break;
        }
        
        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
        }
    }

    // Function to reset the recommendation system
    function resetRecommendationSystem() {
        // Reset state
        currentStep = 1;
        selectedOption = '';
        groupSizeValue = 2;
        dietaryRestrictions = [];
        selectedMood = '';

        // Reset form elements
        if (groupSizeInput) {
            groupSizeInput.value = 2;
        }
        
        // Reset checkboxes
        document.querySelectorAll('.checkbox-group input').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Show first step
        steps.forEach(step => step.style.display = 'none');
        groupSelection.style.display = 'block';
    }
});

// Mood Questionnaire Functionality
const questionnaire = {
    currentSlide: 0,
    slides: document.querySelectorAll('.question-slide'),
    progressBar: document.querySelector('.progress'),
    selectedMood: null,
    selectedFlavors: [],
    dietaryPreferences: [],

    init() {
        this.setupEventListeners();
        this.showSlide(0);
        this.updateProgress();
    },

    setupEventListeners() {
        // Mood buttons
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedMood = btn.dataset.mood;
            });
        });

        // Flavor buttons
        document.querySelectorAll('.flavor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
                const flavor = btn.dataset.flavor;
                if (btn.classList.contains('selected')) {
                    this.selectedFlavors.push(flavor);
                } else {
                    this.selectedFlavors = this.selectedFlavors.filter(f => f !== flavor);
                }
            });
        });

        // Dietary checkboxes
        document.querySelectorAll('.dietary-checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    this.dietaryPreferences.push(checkbox.value);
                } else {
                    this.dietaryPreferences = this.dietaryPreferences.filter(pref => pref !== checkbox.value);
                }
            });
        });

        // Navigation buttons
        document.querySelectorAll('.prev-btn').forEach(btn => {
            btn.addEventListener('click', () => this.prevSlide());
        });

        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.addEventListener('click', () => this.nextSlide());
        });

        // Submit button
        document.querySelector('.submit-btn').addEventListener('click', () => this.submitForm());
    },

    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        this.slides[index].classList.add('active');
        this.currentSlide = index;
        this.updateProgress();
    },

    nextSlide() {
        if (this.validateCurrentSlide()) {
            if (this.currentSlide < this.slides.length - 1) {
                this.showSlide(this.currentSlide + 1);
            }
        }
    },

    prevSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    },

    updateProgress() {
        const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    },

    validateCurrentSlide() {
        switch(this.currentSlide) {
            case 0: // Mood selection
                if (!this.selectedMood) {
                    alert('Please select your current mood');
                    return false;
                }
                break;
            case 1: // Flavor preferences
                if (this.selectedFlavors.length === 0) {
                    alert('Please select at least one flavor preference');
                    return false;
                }
                break;
        }
        return true;
    },

    async submitForm() {
        if (!this.validateCurrentSlide()) return;

        const formData = {
            mood: this.selectedMood,
            flavors: this.selectedFlavors,
            dietary: this.dietaryPreferences
        };

        try {
            // Show loading state
            document.querySelector('.submit-btn').disabled = true;
            document.querySelector('.submit-btn').textContent = 'Processing...';

            // Here you would typically make an API call to get food recommendations
            // For now, we'll simulate a response
            await this.getFoodRecommendations(formData);

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            document.querySelector('.submit-btn').disabled = false;
            document.querySelector('.submit-btn').textContent = 'Submit';
        }
    },

    async getFoodRecommendations(formData) {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Sample recommendations based on mood and preferences
        const recommendations = this.generateRecommendations(formData);
        this.showResults(recommendations);
    },

    generateRecommendations(formData) {
        const recommendations = {
            happy: {
                spicy: ['Pad Thai', 'Chicken Tikka Masala'],
                sweet: ['Chocolate Cake', 'Ice Cream Sundae'],
                savory: ['Grilled Steak', 'Burger'],
                fresh: ['Mediterranean Salad', 'Fruit Bowl']
            },
            stressed: {
                spicy: ['Tom Yum Soup', 'Spicy Ramen'],
                sweet: ['Comfort Cookies', 'Brownies'],
                savory: ['Mac and Cheese', 'Mashed Potatoes'],
                fresh: ['Green Smoothie', 'Buddha Bowl']
            },
            energetic: {
                spicy: ['Tacos', 'Buffalo Wings'],
                sweet: ['Acai Bowl', 'Energy Bars'],
                savory: ['Quinoa Bowl', 'Grilled Chicken'],
                fresh: ['Greek Salad', 'Sushi']
            },
            relaxed: {
                spicy: ['Curry', 'Bibimbap'],
                sweet: ['Pancakes', 'French Toast'],
                savory: ['Pizza', 'Pasta'],
                fresh: ['Poke Bowl', 'Caprese Salad']
            }
        };

        let foodSuggestions = [];
        formData.flavors.forEach(flavor => {
            if (recommendations[formData.mood] && recommendations[formData.mood][flavor]) {
                foodSuggestions = [...foodSuggestions, ...recommendations[formData.mood][flavor]];
            }
        });

        // Filter based on dietary preferences
        if (formData.dietary.length > 0) {
            // In a real application, you would have a more sophisticated filtering system
            // This is just a simple example
            foodSuggestions = foodSuggestions.filter(food => {
                // Simple filtering logic - you would need a proper database of foods and their dietary properties
                if (formData.dietary.includes('vegetarian')) {
                    if (food.toLowerCase().includes('chicken') || food.toLowerCase().includes('steak')) {
                        return false;
                    }
                }
                if (formData.dietary.includes('vegan')) {
                    if (food.toLowerCase().includes('cheese') || food.toLowerCase().includes('ice cream')) {
                        return false;
                    }
                }
                return true;
            });
        }

        return foodSuggestions.slice(0, 3); // Return top 3 recommendations
    },

    showResults(recommendations) {
        const resultsContainer = document.querySelector('.results-container');
        const recommendationsList = document.createElement('div');
        recommendationsList.classList.add('recommendations-list');

        recommendations.forEach(food => {
            const foodItem = document.createElement('div');
            foodItem.classList.add('food-item');
            foodItem.innerHTML = `
                <h4>${food}</h4>
                <p>Based on your mood and preferences</p>
            `;
            recommendationsList.appendChild(foodItem);
        });

        resultsContainer.innerHTML = '';
        resultsContainer.innerHTML = '<h3>Your Food Recommendations</h3>';
        resultsContainer.appendChild(recommendationsList);

        // Show results section
        document.querySelector('.questionnaire-container').style.display = 'none';
        document.querySelector('.results-section').style.display = 'block';
    }
};

// Initialize questionnaire when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    questionnaire.init();
});

// Show popup when page loads
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('initialPopup');
    const form = document.getElementById('initialForm');

    // Check if user has already created a nickname
    const hasCreatedNickname = localStorage.getItem('moodybites_nickname');
    
    // Only show popup if user hasn't created a nickname yet
    if (!hasCreatedNickname) {
        popup.style.display = 'flex';
    } else {
        popup.style.display = 'none';
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const nickname = document.getElementById('nickname').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const tableNo = document.getElementById('tableNo').value;
        
        if (!nickname || !phone || !email || !tableNo) {
            alert('Please fill in all required fields');
            return;
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Basic phone validation
        const phonePattern = /^\+?[\d\s-]{10,}$/;
        if (!phonePattern.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }

        // If validation passes, store the data and close popup
        localStorage.setItem('moodybites_nickname', nickname);
        localStorage.setItem('moodybites_phone', phone);
        localStorage.setItem('moodybites_email', email);
        localStorage.setItem('moodybites_table', tableNo);
        
        // Hide the popup
        popup.style.display = 'none';
        
        // You can store the data or send it to a server here
        console.log('Form submitted:', {
            nickname,
            phone,
            email,
            tableNo
        });
    });
});

// Welcome Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const welcomeFormOverlay = document.getElementById('welcomeFormOverlay');
    const welcomeForm = document.getElementById('welcomeForm');
    
    // Check if user has already submitted the form
    const hasSubmittedForm = localStorage.getItem('hasSubmittedWelcomeForm');
    
    // If user has already submitted the form, hide it
    if (hasSubmittedForm === 'true') {
        welcomeFormOverlay.classList.add('hidden');
    }
    
    // Handle form submission
    welcomeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nickname = document.getElementById('nicknameInput').value;
        const phone = document.getElementById('phoneInput').value;
        const email = document.getElementById('emailInput').value;
        const address = document.getElementById('addressInput').value;
        const table = document.getElementById('tableInput').value;
        
        // Validate form
        if (!nickname || !phone || !email || !address || !table) {
            alert('Please fill in all fields');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Validate phone format
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Save form data to localStorage
        localStorage.setItem('userNickname', nickname);
        localStorage.setItem('userPhone', phone);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userAddress', address);
        localStorage.setItem('userTable', table);
        localStorage.setItem('hasSubmittedWelcomeForm', 'true');
        
        // Add loading state to button
        const submitBtn = welcomeForm.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission delay
        setTimeout(() => {
            // Hide the form with animation
            welcomeFormOverlay.style.opacity = '0';
            welcomeFormOverlay.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                welcomeFormOverlay.classList.add('hidden');
                welcomeFormOverlay.style.opacity = '1';
                welcomeFormOverlay.style.transition = '';
            }, 500);
        }, 1000);
    });
});