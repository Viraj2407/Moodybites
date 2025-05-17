document.addEventListener('DOMContentLoaded', () => {
    // Get modal elements
    const quizOverlay = document.querySelector('.mood-quiz-overlay');
    const closeQuizBtn = document.querySelector('.close-quiz-btn');
    const getStartedBtn = document.querySelector('.get-started-btn');
    const justMeBtn = document.querySelector('.just-me-btn');

    // Quiz elements
    const quizContainer = document.querySelector('.quiz-container');
    const slides = document.querySelectorAll('.question-slide');
    const progressBar = document.getElementById('quizProgress');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const resultsSection = document.querySelector('.results-section');
    const restartBtn = document.querySelector('.restart-btn');

    let currentSlide = 0;
    const totalSlides = slides.length;
    const userAnswers = {
        mood: '',
        flavors: '',
        dietary: []
    };

    // Open quiz modal
    const openQuizModal = () => {
        quizOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        resetQuiz();
    };

    // Close quiz modal
    const closeQuizModal = () => {
        quizOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    };

    // Event listeners for opening modal
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', openQuizModal);
    }
    if (justMeBtn) {
        justMeBtn.addEventListener('click', openQuizModal);
    }

    // Event listeners for closing modal
    closeQuizBtn.addEventListener('click', closeQuizModal);
    quizOverlay.addEventListener('click', (e) => {
        if (e.target === quizOverlay) {
            closeQuizModal();
        }
    });

    // Reset quiz state
    const resetQuiz = () => {
        currentSlide = 0;
        userAnswers.mood = '';
        userAnswers.flavors = '';
        userAnswers.dietary = [];
        
        // Reset selections
        document.querySelectorAll('.mood-btn, .flavor-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelectorAll('input[name="dietary"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Reset view
        showSlide(currentSlide);
        quizContainer.style.display = 'block';
        resultsSection.style.display = 'none';
    };

    // Update progress bar
    const updateProgress = () => {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    };

    // Show current slide
    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // Update buttons
        prevBtn.disabled = index === 0;
        nextBtn.style.display = index === totalSlides - 1 ? 'none' : 'block';
        submitBtn.style.display = index === totalSlides - 1 ? 'block' : 'none';
        
        updateProgress();
    };

    // Handle option selection
    const handleOptionSelection = (type, element) => {
        const parent = element.closest('.question-slide');
        const options = parent.querySelectorAll(`[data-${type}]`);
        
        options.forEach(opt => opt.classList.remove('selected'));
        element.classList.add('selected');
        
        userAnswers[type] = element.dataset[type];
    };

    // Event listeners for mood and flavor buttons
    document.querySelectorAll('.mood-btn, .flavor-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const type = e.target.closest('button').dataset.mood ? 'mood' : 'flavor';
            handleOptionSelection(type, e.target.closest('button'));
        });
    });

    // Handle dietary preferences
    document.querySelectorAll('input[name="dietary"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.value === 'none') {
                // If "No Restrictions" is selected, uncheck others
                document.querySelectorAll('input[name="dietary"]').forEach(cb => {
                    if (cb !== e.target) cb.checked = false;
                });
                userAnswers.dietary = ['none'];
            } else {
                // Uncheck "No Restrictions" if other options are selected
                document.querySelector('input[value="none"]').checked = false;
                
                // Update dietary preferences array
                userAnswers.dietary = Array.from(document.querySelectorAll('input[name="dietary"]:checked'))
                    .map(cb => cb.value)
                    .filter(val => val !== 'none');
            }
        });
    });

    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (validateCurrentSlide()) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });

    // Validate current slide
    const validateCurrentSlide = () => {
        if (currentSlide === 0 && !userAnswers.mood) {
            alert('Please select your mood to continue.');
            return false;
        }
        
        if (currentSlide === 1 && !userAnswers.flavors) {
            alert('Please select your flavor preference to continue.');
            return false;
        }
        
        if (currentSlide === 2 && userAnswers.dietary.length === 0) {
            alert('Please select at least one dietary preference to continue.');
            return false;
        }
        
        return true;
    };

    // Generate food recommendations based on user answers
    const generateRecommendations = () => {
        const recommendations = {
            happy: {
                spicy: ['Tacos al Pastor', 'Pad Thai', 'Buffalo Wings'],
                sweet: ['Ice Cream Sundae', 'Chocolate Cake', 'Fresh Fruit Parfait'],
                savory: ['Gourmet Burger', 'Pizza', 'Mac and Cheese'],
                fresh: ['Greek Salad', 'Poke Bowl', 'Spring Rolls']
            },
            stressed: {
                spicy: ['Thai Green Curry', 'Spicy Ramen', 'Indian Curry'],
                sweet: ['Comfort Cookies', 'Warm Apple Pie', 'Hot Chocolate'],
                savory: ['Chicken Soup', 'Mashed Potatoes', 'Grilled Cheese'],
                fresh: ['Smoothie Bowl', 'Garden Salad', 'Fresh Juice']
            },
            energetic: {
                spicy: ['Mexican Street Corn', 'Spicy Tuna Roll', 'Jalapeño Poppers'],
                sweet: ['Acai Bowl', 'Energy Bars', 'Fruit Smoothie'],
                savory: ['Quinoa Bowl', 'Grilled Chicken', 'Protein Pack'],
                fresh: ['Mediterranean Bowl', 'Sushi', 'Veggie Wrap']
            },
            relaxed: {
                spicy: ['Butter Chicken', 'Fajitas', 'Spicy Noodles'],
                sweet: ['Tiramisu', 'Crème Brûlée', 'Cheesecake'],
                savory: ['Pasta Carbonara', 'Risotto', 'Roast Dinner'],
                fresh: ['Caprese Salad', 'Buddha Bowl', 'Fresh Spring Rolls']
            }
        };

        let foodList = recommendations[userAnswers.mood][userAnswers.flavors];
        
        if (userAnswers.dietary.includes('vegetarian')) {
            const vegetarianOptions = {
                'Tacos al Pastor': 'Vegetable Tacos',
                'Buffalo Wings': 'Cauliflower Wings',
                'Gourmet Burger': 'Veggie Burger',
                // Add more mappings as needed
            };
            foodList = foodList.map(food => vegetarianOptions[food] || food);
        }

        return foodList;
    };

    // Submit handler
    submitBtn.addEventListener('click', () => {
        if (validateCurrentSlide()) {
            const recommendations = generateRecommendations();
            
            // Display results
            const resultsHtml = `
                <div class="recommendations-grid">
                    ${recommendations.map(food => `
                        <div class="recommendation-card">
                            <img src="images/foods/${food.toLowerCase().replace(/\s+/g, '-')}.jpg" 
                                 alt="${food}" 
                                 onerror="this.src='images/placeholder-food.jpg'">
                            <h4>${food}</h4>
                            <p>Based on your ${userAnswers.mood} mood and ${userAnswers.flavors} preference</p>
                        </div>
                    `).join('')}
                </div>
            `;
            
            document.getElementById('recommendationResults').innerHTML = resultsHtml;
            
            // Hide quiz, show results
            quizContainer.style.display = 'none';
            resultsSection.style.display = 'block';

            // Save to MongoDB
            saveToDatabase();
        }
    });

    // Restart quiz
    restartBtn.addEventListener('click', resetQuiz);

    // Function to save results to MongoDB
    const saveToDatabase = async () => {
        try {
            const response = await fetch('/api/save-quiz-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp: new Date(),
                    answers: userAnswers,
                    recommendations: generateRecommendations()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save quiz results');
            }
        } catch (error) {
            console.error('Error saving quiz results:', error);
        }
    };

    // Initialize quiz
    showSlide(currentSlide);
}); 