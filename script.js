// Menu toggle functionality
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
});

// Sample events data
const events = [
    {
        day: '18',
        month: 'FEB',
        title: 'Ash Wednesday Service',
        time: 'Service at 6:30 PM',
        description: 'It will be in the CLC'
    }, 
    {
        day: '23',
        month: 'FEB',
        title: 'IGNITE Show Practice 1',
        time: 'Starts 6 PM',
        description: 'This is the first practice for the IGNITE show.'
    },
    {
        day: '28',
        month: 'FEB',
        title: 'IGNITE Show Practice 2',
        time: 'Starts 10 AM',
        description: 'This is the last practice for the IGNITE show. TAKE PICS FOR INTERMISSION SLIDES!'
    },
    {
        day: '28',
        month: 'FEB',
        title: 'IGNITE Show',
        time: 'Show starts at 4 PM',
        description: 'Only 1 show this year!'
    },
];

// Render events
function renderEvents() {
    const eventList = document.getElementById('eventList');
    
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        
        eventItem.innerHTML = `
            <div class="event-date">
                <span class="event-day">${event.day}</span>
                <span class="event-month">${event.month}</span>
            </div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <p class="event-time">${event.time}</p>
                <p class="event-time">${event.description}</p>
            </div>
        `;
        
        eventList.appendChild(eventItem);
    });
}

// Clock functionality
function updateClock() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('en-US', options);
    
    // You can add a clock element to the header if desired
    // document.getElementById('clock').textContent = dateTimeString;
}

// Greeting based on time of day
function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
}

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    updateClock();
    
    // Update clock every minute
    setInterval(updateClock, 60000);
    
    // Add greeting to console (could be displayed in UI)
    console.log(`${getGreeting()}! Welcome to the PVMC Staff Dashboard`);
});

// Notification handling (placeholder)
document.querySelector('.notification-btn').addEventListener('click', () => {
    alert('No new notifications');
});

// User profile click (placeholder)
document.querySelector('.user-profile').addEventListener('click', () => {
    // Could open a profile menu/modal
    console.log('Profile clicked');
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Search functionality
document.querySelector('.search-bar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // This would filter content based on search term
    // For now, just log it
    if (searchTerm.length > 2) {
        console.log('Searching for:', searchTerm);
    }
});

// Responsive sidebar for mobile
function handleResize() {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('hidden');
        mainContent.classList.add('expanded');
    } else {
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('expanded');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on load

function formatDate(dateString) {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }



