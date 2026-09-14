/* ==========================================================================
   Alberto Watch Co. - Master JavaScript Code
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. jQuery Dependent Features (Store Locator, Filters, Newsletter)
// --------------------------------------------------------------------------
$(document).ready(function () {

    // 50 Countries Database - 3 Branches per Country (150 Total Locations)
    const countriesData = [
        { name: "Switzerland", cities: ["Geneva", "Zurich", "Lugano"] },
        { name: "United Kingdom", cities: ["London", "Manchester", "Edinburgh"] },
        { name: "United States", cities: ["New York", "Los Angeles", "Miami"] },
        { name: "United Arab Emirates", cities: ["Dubai", "Abu Dhabi", "Sharjah"] },
        { name: "France", cities: ["Paris", "Nice", "Lyon"] },
        { name: "Germany", cities: ["Munich", "Berlin", "Frankfurt"] },
        { name: "Italy", cities: ["Milan", "Rome", "Florence"] },
        { name: "Japan", cities: ["Tokyo", "Osaka", "Kyoto"] },
        { name: "Singapore", cities: ["Marina Bay", "Orchard Road", "Changi"] },
        { name: "China", cities: ["Shanghai", "Beijing", "Shenzhen"] },
        { name: "Australia", cities: ["Sydney", "Melbourne", "Brisbane"] },
        { name: "Canada", cities: ["Toronto", "Vancouver", "Montreal"] },
        { name: "Spain", cities: ["Madrid", "Barcelona", "Valencia"] },
        { name: "Saudi Arabia", cities: ["Riyadh", "Jeddah", "Khobar"] },
        { name: "Pakistan", cities: ["Karachi", "Lahore", "Islamabad"] },
        { name: "India", cities: ["Mumbai", "New Delhi", "Bengaluru"] },
        { name: "Turkey", cities: ["Istanbul", "Ankara", "Izmir"] },
        { name: "Netherlands", cities: ["Amsterdam", "Rotterdam", "The Hague"] },
        { name: "Sweden", cities: ["Stockholm", "Gothenburg", "Malmo"] },
        { name: "South Korea", cities: ["Seoul", "Busan", "Incheon"] },
        { name: "Brazil", cities: ["São Paulo", "Rio de Janeiro", "Brasília"] },
        { name: "Mexico", cities: ["Mexico City", "Guadalajara", "Monterrey"] },
        { name: "Qatar", cities: ["Doha", "Lusail", "The Pearl"] },
        { name: "Kuwait", cities: ["Kuwait City", "Salmiya", "Ahmadi"] },
        { name: "Malaysia", cities: ["Kuala Lumpur", "Penang", "Johor Bahru"] },
        { name: "Thailand", cities: ["Bangkok", "Phuket", "Chiang Mai"] },
        { name: "South Africa", cities: ["Cape Town", "Johannesburg", "Durban"] },
        { name: "Austria", cities: ["Vienna", "Salzburg", "Innsbruck"] },
        { name: "Belgium", cities: ["Brussels", "Antwerp", "Ghent"] },
        { name: "Denmark", cities: ["Copenhagen", "Aarhus", "Odense"] },
        { name: "Norway", cities: ["Oslo", "Bergen", "Trondheim"] },
        { name: "Finland", cities: ["Helsinki", "Espoo", "Tampere"] },
        { name: "Greece", cities: ["Athens", "Thessaloniki", "Mykonos"] },
        { name: "Portugal", cities: ["Lisbon", "Porto", "Faro"] },
        { name: "Ireland", cities: ["Dublin", "Cork", "Galway"] },
        { name: "New Zealand", cities: ["Auckland", "Wellington", "Christchurch"] },
        { name: "Egypt", cities: ["Cairo", "Alexandria", "Giza"] },
        { name: "Argentina", cities: ["Buenos Aires", "Mendoza", "Cordoba"] },
        { name: "Chile", cities: ["Santiago", "Valparaíso", "Concepción"] },
        { name: "Colombia", cities: ["Bogotá", "Medellín", "Cartagena"] },
        { name: "Poland", cities: ["Warsaw", "Kraków", "Gdańsk"] },
        { name: "Czech Republic", cities: ["Prague", "Brno", "Ostrava"] },
        { name: "Hungary", cities: ["Budapest", "Debrecen", "Szeged"] },
        { name: "Bahrain", cities: ["Manama", "Riffa", "Muharraq"] },
        { name: "Oman", cities: ["Muscat", "Salalah", "Sohar"] },
        { name: "Vietnam", cities: ["Ho Chi Minh City", "Hanoi", "Da Nang"] },
        { name: "Indonesia", cities: ["Jakarta", "Bali", "Surabaya"] },
        { name: "Philippines", cities: ["Manila", "Cebu", "Davao"] },
        { name: "Morocco", cities: ["Casablanca", "Marrakech", "Rabat"] },
        { name: "Monaco", cities: ["Monte Carlo", "La Condamine", "Fontvieille"] }
    ];

    // Dynamic generation of 150 stores
    let allStores = [];

    countriesData.forEach((c) => {
        c.cities.forEach((city, idx) => {
            let branchTypes = ["Flagship Boutique", "Luxury Lounge", "Authorized Salon"];
            let badges = ["Flagship", "Boutique", "Official"];
            let query = encodeURIComponent(`Alberto Watch Co, ${city}, ${c.name}`);
            let mapUrl = `https://maps.google.com/maps?q=${query}&output=embed`;

            allStores.push({
                country: c.name,
                city: city,
                name: `${city} ${branchTypes[idx]}`,
                badge: badges[idx],
                address: `Grand Boulevard ${idx + 10}, ${city}, ${c.name}`,
                hours: "Mon - Sat: 10:00 AM - 8:00 PM",
                phone: `+${Math.floor(100 + Math.random() * 899)} ${Math.floor(1000000 + Math.random() * 8999999)}`,
                map: mapUrl
            });
        });
    });

    // Populate Country Dropdown
    const $countrySelect = $('#countrySelect');
    if ($countrySelect.length) {
        countriesData.forEach((c) => {
            $countrySelect.append(`<option value="${c.name}">${c.name} (3 Branches)</option>`);
        });
    }

    // Render Store Cards Function
    function renderStores(storesToRender) {
        const $storeList = $('#storeList');
        if (!$storeList.length) return;

        $storeList.empty();

        if (storesToRender.length === 0) {
            $storeList.html('<p class="text-muted p-3 text-center">No boutiques found matching your search.</p>');
            $('#storeCountText').text('Showing 0 Stores');
            return;
        }

        $('#storeCountText').text(`Showing ${storesToRender.length} Stores`);

        storesToRender.forEach((s, idx) => {
            let activeClass = idx === 0 ? 'active' : '';
            let html = `
                <div class="store-item ${activeClass}" data-map="${s.map}">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                        <div>
                            <span class="store-country">${s.country}</span>
                            <h5 class="store-name mb-0">${s.name}</h5>
                        </div>
                        <span class="badge bg-gold text-dark">${s.badge}</span>
                    </div>
                    <p class="store-address mb-1"><i class="fa-solid fa-location-dot me-1 text-gold"></i> ${s.address}</p>
                    <p class="store-hours mb-1"><i class="fa-regular fa-clock me-1 text-gold"></i> ${s.hours}</p>
                    <a href="tel:${s.phone}" class="store-phone"><i class="fa-solid fa-phone me-1"></i> ${s.phone}</a>
                </div>
            `;
            $storeList.append(html);
        });

        if (storesToRender.length > 0) {
            $('#storeMapIframe').attr('src', storesToRender[0].map);
        }
    }

    // Initial store render
    renderStores(allStores);

    // Filter Stores
    function filterStores() {
        let countryVal = $('#countrySelect').val();
        let searchVal = $('#storeSearchInput').val().toLowerCase().trim();

        let filtered = allStores.filter((s) => {
            let matchesCountry = (countryVal === 'ALL' || s.country === countryVal);
            let matchesSearch = (
                s.name.toLowerCase().includes(searchVal) ||
                s.city.toLowerCase().includes(searchVal) ||
                s.country.toLowerCase().includes(searchVal) ||
                s.address.toLowerCase().includes(searchVal)
            );
            return matchesCountry && matchesSearch;
        });

        renderStores(filtered);
    }

    $('#countrySelect').on('change', filterStores);
    $('#storeSearchInput').on('keyup', filterStores);

    // Store Card Selection
    $(document).on('click', '.store-item', function () {
        $('.store-item').removeClass('active');
        $(this).addClass('active');

        let newMapUrl = $(this).data('map');
        if (newMapUrl) {
            $('#storeMapIframe').attr('src', newMapUrl);
        }
    });

    // Area Search Simulation
    $('#searchAreaBtn').on('click', function () {
        let currentActiveStore = $('.store-item.active .store-name').text();
        let btn = $(this);
        btn.html('<i class="fa-solid fa-spinner fa-spin me-2"></i> Searching area...');
        
        setTimeout(() => {
            btn.html('<i class="fa-solid fa-location-crosshairs me-2"></i> Search in this area');
            alert(`Area updated for ${currentActiveStore || 'selected location'}. Displaying nearest Alberto Watch Co. boutiques.`);
        }, 800);
    });

    // Newsletter Form Submission
    $('.newsletter-form').on('submit', function (e) {
        e.preventDefault();
        alert('Thank you for joining the Alberto Watch Co. newsletter!');
        $(this).find('input[type="email"]').val('');
    });
});


// --------------------------------------------------------------------------
// 2. Vanilla JavaScript Features (Gallery, QC, Accordion, Counter, Ticker)
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

    // --- A. Gallery Filtering ---
    const filterButtons = document.querySelectorAll('#gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-gold', 'active');
                btn.classList.add('btn-outline-gold');
            });
            this.classList.remove('btn-outline-gold');
            this.classList.add('btn-gold', 'active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- B. Quality Control Hover Effect ---
    const qcCards = document.querySelectorAll('.qc-step-card');
    qcCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            qcCards.forEach(c => c.classList.remove('active-qc'));
            this.classList.add('active-qc');
        });
        card.addEventListener('mouseleave', function () {
            this.classList.remove('active-qc');
        });
    });

    // Accordion Gold Border Highlight
    const customAccordionBtns = document.querySelectorAll('.custom-dark-accordion .accordion-button');
    customAccordionBtns.forEach(button => {
        button.addEventListener('click', function () {
            customAccordionBtns.forEach(btn => btn.parentElement.parentElement.classList.remove('border-gold'));
            if (!this.classList.contains('collapsed')) {
                this.parentElement.parentElement.classList.add('border-gold');
            }
        });
    });

    // Scroll Reveal Effect
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.technique-card, .technique-img-wrap').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(25px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });

    // --- C. Accordion Manual Toggle Backup ---
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-bs-target');
            if (!targetId) return;
            const targetElement = document.querySelector(targetId);
            const parentAccordion = this.closest('.accordion');

            if (parentAccordion && targetElement) {
                parentAccordion.querySelectorAll('.accordion-collapse').forEach(item => {
                    if (item !== targetElement) {
                        item.classList.remove('show');
                    }
                });
                parentAccordion.querySelectorAll('.accordion-button').forEach(btn => {
                    if (btn !== this) {
                        btn.classList.add('collapsed');
                    }
                });
            }

            if (targetElement) {
                this.classList.toggle('collapsed');
                targetElement.classList.toggle('show');
            }
        });
    });

    // --- D. Live Visitor Counter System ---
    const counterElement = document.getElementById('visitorCount');

    if (counterElement) {
        const baseCount = 1248;
        let currentVisitorCount = localStorage.getItem('alberto_visitor_count');

        if (!currentVisitorCount) {
            currentVisitorCount = baseCount;
        } else {
            currentVisitorCount = parseInt(currentVisitorCount, 10) + 1;
        }

        localStorage.setItem('alberto_visitor_count', currentVisitorCount);

        let startCount = Math.max(0, currentVisitorCount - 35);
        const targetCount = currentVisitorCount;
        const animationDuration = 1200;
        const stepInterval = Math.max(15, Math.floor(animationDuration / (targetCount - startCount)));

        const countAnimation = setInterval(() => {
            startCount++;
            counterElement.textContent = startCount.toLocaleString();

            if (startCount >= targetCount) {
                clearInterval(countAnimation);
            }
        }, stepInterval);

        setInterval(() => {
            let liveCount = parseInt(localStorage.getItem('alberto_visitor_count') || targetCount, 10);
            liveCount += Math.floor(Math.random() * 3) + 1;

            localStorage.setItem('alberto_visitor_count', liveCount);
            counterElement.textContent = liveCount.toLocaleString();
        }, 12000);
    }

    // --- E. Dynamic Live Date, Time & Location Ticker ---
    function updateLiveDateTime() {
        const now = new Date();
        const optionsDate = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        
        const dateEl = document.getElementById("ticker-date");
        const timeEl = document.getElementById("ticker-time");

        if (dateEl) dateEl.innerText = now.toLocaleDateString('en-US', optionsDate);
        if (timeEl) timeEl.innerText = now.toLocaleTimeString('en-US', { hour12: true });
    }

    updateLiveDateTime();
    setInterval(updateLiveDateTime, 1000);

    function getDynamicUserLocation() {
        const locationElement = document.getElementById("ticker-location");
        if (!locationElement) return;

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
        let defaultCity = userTimeZone.split('/')[1]?.replace('_', ' ') || userTimeZone;

        locationElement.innerText = `${defaultCity} (Detecting...)`;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                        const data = await response.json();
                        
                        const city = data.address.city || data.address.town || data.address.village || data.address.state || defaultCity;
                        const country = data.address.country || "";

                        locationElement.innerText = `${city}${country ? ', ' + country : ''}`;
                    } catch (error) {
                        locationElement.innerText = defaultCity;
                    }
                },
                (error) => {
                    locationElement.innerText = defaultCity;
                },
                { timeout: 7000 }
            );
        } else {
            locationElement.innerText = defaultCity;
        }
    }

    getDynamicUserLocation();
});
document.addEventListener("DOMContentLoaded", () => {
    
    function updateLiveDateTime() {
        const now = new Date();

        const optionsDate = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', optionsDate);

        const formattedTime = now.toLocaleTimeString('en-US', { hour12: true });

        document.getElementById("ticker-date").innerText = formattedDate;
        document.getElementById("ticker-time").innerText = formattedTime;
    }

    setInterval(updateLiveDateTime, 1000);
    updateLiveDateTime();

    function getUserLocation() {
        const locationElement = document.getElementById("ticker-location");

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(2);
                    const lon = position.coords.longitude.toFixed(2);
                    
                    locationElement.innerText = `Lat: ${lat}°, Lon: ${lon}° (Location Access Granted)`;
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            locationElement.innerText = "Karachi, Pakistan (Default)";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            locationElement.innerText = "Location Unavailable";
                            break;
                        case error.TIMEOUT:
                            locationElement.innerText = "Location Request Timed Out";
                            break;
                        default:
                            locationElement.innerText = "Location Error";
                    }
                }
            );
        } else {
            locationElement.innerText = "Geolocation Not Supported by Browser";
        }
    }

    getUserLocation();
});
document.addEventListener("DOMContentLoaded", () => {

    let visitorCount = localStorage.getItem("visitorCount");

    if (visitorCount === null) {
        visitorCount = 1;
    } else {
        visitorCount = Number(visitorCount) + 1;
    }

    localStorage.setItem("visitorCount", visitorCount);

    document.getElementById("visitor-count").innerText = visitorCount;

});