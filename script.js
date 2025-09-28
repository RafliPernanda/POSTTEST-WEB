/**
 * AyoBasket JavaScript - Interactive Basketball Court Reservation System
 * Features: Dark mode, booking modal, smooth scrolling, form validation
 */

class AyoBasket {
    constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.bookingData = {
            selectedCourt: null,
            selectedDate: null,
            selectedTime: null,
            playerName: '',
            playerPhone: ''
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initDarkMode();
        this.createBookingModal();
        this.createDarkModeToggle();
        this.updateYear();
        this.initSmoothScrolling();
    }

    setupEventListeners() {
        // Booking buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn[href="#"]') || e.target.closest('.btn[href="#"]')) {
                e.preventDefault();
                const courtName = this.getCourtName(e.target);
                this.openBookingModal(courtName);
            }
        });

        // Navigation smooth scroll
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                if (targetId !== '#') {
                    this.smoothScrollTo(targetId);
                }
            }
        });

        // Form validation on input
        document.addEventListener('input', (e) => {
            if (e.target.matches('#playerPhone')) {
                this.validatePhone(e.target);
            }
            if (e.target.matches('#playerName')) {
                this.validateName(e.target);
            }
        });
    }

    initDarkMode() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    createDarkModeToggle() {
        // Add toggle to header - better position
        const header = document.querySelector('header .container');
        const tagline = header.querySelector('.tagline');
        
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'dark-mode-toggle position-absolute top-0 end-0 mt-2 me-2';
        toggleContainer.innerHTML = `
            <button class="btn btn-sm border-0 p-2" id="darkModeToggle" title="Toggle Dark Mode">
                <span class="mode-icon fs-5">${this.isDarkMode ? '☀️' : '🌙'}</span>
            </button>
        `;
        
        header.style.position = 'relative';
        header.appendChild(toggleContainer);

        // Add event listener
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Add dark mode styles
        this.addDarkModeStyles();
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.isDarkMode.toString());
        
        const icon = document.querySelector('.mode-icon');
        icon.textContent = this.isDarkMode ? '☀️' : '🌙';
    }

    addDarkModeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Dark Mode - Modern Design */
            .dark-mode {
                background-color: #0f172a !important;
                color: #e2e8f0 !important;
            }
            
            .dark-mode .bg-white,
            .dark-mode header {
                background-color: #1e293b !important;
                border-color: #334155 !important;
            }
            
            .dark-mode .card {
                background-color: #1e293b !important;
                border-color: #334155 !important;
                color: #e2e8f0 !important;
            }
            
            .dark-mode .bg-light {
                background-color: #1e293b !important;
            }
            
            .dark-mode .text-muted {
                color: #94a3b8 !important;
            }
            
            .dark-mode .border-top {
                border-color: #334155 !important;
            }
            
            .dark-mode .modal-content {
                background-color: #1e293b !important;
                border-color: #334155 !important;
                color: #e2e8f0 !important;
            }
            
            .dark-mode .form-control {
                background-color: #334155 !important;
                border-color: #475569 !important;
                color: #e2e8f0 !important;
            }
            
            .dark-mode .form-control:focus {
                background-color: #334155 !important;
                border-color: #0d6efd !important;
                color: #e2e8f0 !important;
                box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
            }
            
            .dark-mode .bg-dark {
                background-color: #020617 !important;
            }

            /* Dark Mode Toggle Styling */
            #darkModeToggle {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                transition: all 0.3s ease;
            }
            
            #darkModeToggle:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }
            
            .dark-mode #darkModeToggle {
                background: rgba(0, 0, 0, 0.2);
            }
            
            .dark-mode #darkModeToggle:hover {
                background: rgba(0, 0, 0, 0.3);
            }

            /* Booking Modal Enhancements */
            .booking-summary {
                background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                border: 1px solid #cbd5e1;
                border-radius: 12px;
                padding: 20px;
                margin: 15px 0;
            }
            
            .dark-mode .booking-summary {
                background: linear-gradient(135deg, #334155, #475569) !important;
                border-color: #64748b !important;
            }
            
            .time-slots {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 12px;
                margin: 20px 0;
            }
            
            .time-slot {
                padding: 12px 16px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
                background: #f8fafc;
            }
            
            .time-slot:hover {
                border-color: #0d6efd;
                background: rgba(13, 110, 253, 0.1);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(13, 110, 253, 0.2);
            }
            
            .time-slot.selected {
                border-color: #0d6efd;
                background: #0d6efd;
                color: white;
                box-shadow: 0 4px 12px rgba(13, 110, 253, 0.4);
            }
            
            .time-slot.unavailable {
                border-color: #dc3545;
                background: #fee;
                cursor: not-allowed;
                opacity: 0.6;
                color: #dc3545;
            }
            
            .time-slot.unavailable:hover {
                transform: none;
                box-shadow: none;
            }
            
            .dark-mode .time-slot {
                border-color: #475569;
                background: #334155;
                color: #e2e8f0;
            }
            
            .dark-mode .time-slot:hover {
                background: rgba(13, 110, 253, 0.3);
                border-color: #0d6efd;
            }

            /* Card hover effects enhancement */
            .card-featured {
                transition: all 0.3s ease;
            }
            
            .card-featured:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(13, 110, 253, 0.15);
            }
            
            .dark-mode .card-featured:hover {
                box-shadow: 0 8px 25px rgba(13, 110, 253, 0.3);
            }

            /* Hero section enhancement */
            .hero {
                background: radial-gradient(1200px 600px at 10% -10%, rgba(13, 110, 253, 0.1), transparent), 
                           linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            }
            
            .dark-mode .hero {
                background: radial-gradient(1200px 600px at 10% -10%, rgba(13, 110, 253, 0.2), transparent), 
                           linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            }
        `;
        document.head.appendChild(style);
    }



    createBookingModal() {
        const modalHtml = `
            <div class="modal fade" id="bookingModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title">🏀 Reservasi Lapangan Basket</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="bookingForm">
                                <div class="mb-4">
                                    <label class="form-label fw-semibold">📍 Lapangan Terpilih</label>
                                    <input type="text" class="form-control" id="selectedCourt" readonly>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label fw-semibold">👤 Nama Lengkap *</label>
                                        <input type="text" class="form-control" id="playerName" placeholder="Masukkan nama lengkap" required>
                                        <div class="invalid-feedback">Nama harus diisi minimal 2 karakter</div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label fw-semibold">📱 Nomor Telepon *</label>
                                        <input type="tel" class="form-control" id="playerPhone" placeholder="081234567890" required>
                                        <div class="invalid-feedback">Nomor telepon tidak valid</div>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="form-label fw-semibold">📅 Tanggal Bermain *</label>
                                    <input type="date" class="form-control" id="playDate" required>
                                </div>

                                <div class="mb-4">
                                    <label class="form-label fw-semibold">⏰ Pilih Waktu *</label>
                                    <div class="time-slots" id="timeSlots"></div>
                                    <small class="text-muted">Klik pada waktu yang tersedia untuk memilih</small>
                                </div>

                                <div class="booking-summary" id="bookingSummary" style="display: none;">
                                    <h6 class="mb-3">📋 Ringkasan Pemesanan</h6>
                                    <div id="summaryContent"></div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-primary px-4" id="confirmBooking" disabled>
                                Konfirmasi Pemesanan 🚀
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.setupModalEventListeners();
    }

    setupModalEventListeners() {
        // Date change
        document.getElementById('playDate').addEventListener('change', (e) => {
            this.bookingData.selectedDate = e.target.value;
            this.generateTimeSlots();
            this.updateBookingSummary();
        });

        // Confirm booking
        document.getElementById('confirmBooking').addEventListener('click', () => {
            this.processBooking();
        });

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('playDate').min = today;
    }

    getCourtName(element) {
        const card = element.closest('.card');
        const title = card.querySelector('.card-title');
        return title.textContent.trim();
    }

    openBookingModal(courtName) {
        this.bookingData.selectedCourt = courtName;
        document.getElementById('selectedCourt').value = courtName;
        
        // Show modal (using Bootstrap's modal functionality)
        const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
        modal.show();
    }

    generateTimeSlots() {
        const slotsContainer = document.getElementById('timeSlots');
        const timeSlots = [
            '08:00', '09:00', '10:00', '11:00', '12:00',
            '13:00', '14:00', '15:00', '16:00', '17:00',
            '18:00', '19:00', '20:00', '21:00'
        ];

        // Simulate some randomly unavailable slots
        const unavailableSlots = ['12:00', '15:00', '18:00'].filter(() => Math.random() > 0.3);
        
        slotsContainer.innerHTML = '';
        
        timeSlots.forEach(time => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.textContent = time;
            
            if (unavailableSlots.includes(time)) {
                slot.classList.add('unavailable');
                slot.title = 'Waktu tidak tersedia';
            } else {
                slot.addEventListener('click', () => this.selectTimeSlot(slot, time));
            }
            
            slotsContainer.appendChild(slot);
        });
    }

    selectTimeSlot(element, time) {
        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Select current slot
        element.classList.add('selected');
        this.bookingData.selectedTime = time;
        this.updateBookingSummary();
        this.validateForm();
    }

    updateBookingSummary() {
        const summary = document.getElementById('bookingSummary');
        const content = document.getElementById('summaryContent');
        
        if (this.bookingData.selectedDate && this.bookingData.selectedTime) {
            const price = this.bookingData.selectedCourt.includes('A') ? 150000 : 80000;
            const formattedDate = new Date(this.bookingData.selectedDate).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            content.innerHTML = `
                <div class="row g-3">
                    <div class="col-6"><strong>🏀 Lapangan:</strong><br>${this.bookingData.selectedCourt}</div>
                    <div class="col-6"><strong>📅 Tanggal:</strong><br>${formattedDate}</div>
                    <div class="col-6"><strong>⏰ Waktu:</strong><br>${this.bookingData.selectedTime} - ${parseInt(this.bookingData.selectedTime) + 1}:00</div>
                    <div class="col-6"><strong>💰 Harga:</strong><br>Rp ${price.toLocaleString('id-ID')}</div>
                </div>
            `;
            summary.style.display = 'block';
        } else {
            summary.style.display = 'none';
        }
    }

    validateName(input) {
        const isValid = input.value.trim().length >= 2;
        input.classList.toggle('is-valid', isValid);
        input.classList.toggle('is-invalid', !isValid);
        this.bookingData.playerName = input.value.trim();
        this.validateForm();
    }

    validatePhone(input) {
        const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
        const isValid = phoneRegex.test(input.value.trim());
        input.classList.toggle('is-valid', isValid);
        input.classList.toggle('is-invalid', !isValid);
        this.bookingData.playerPhone = input.value.trim();
        this.validateForm();
    }

    validateForm() {
        const isValid = 
            this.bookingData.playerName.length >= 2 &&
            this.bookingData.playerPhone &&
            /^(\+62|62|0)[0-9]{9,13}$/.test(this.bookingData.playerPhone) &&
            this.bookingData.selectedDate &&
            this.bookingData.selectedTime;
        
        document.getElementById('confirmBooking').disabled = !isValid;
    }

    processBooking() {
        const confirmBtn = document.getElementById('confirmBooking');
        const originalText = confirmBtn.innerHTML;
        
        confirmBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';
        confirmBtn.disabled = true;
        
        setTimeout(() => {
            const bookingCode = `AYB${Date.now().toString().slice(-6)}`;
            const price = this.bookingData.selectedCourt.includes('A') ? 150000 : 80000;
            
            alert(`🎉 Pemesanan Berhasil!\n\n` +
                  `📋 Detail Pemesanan:\n` +
                  `🏀 Lapangan: ${this.bookingData.selectedCourt}\n` +
                  `📅 Tanggal: ${this.bookingData.selectedDate}\n` +
                  `⏰ Waktu: ${this.bookingData.selectedTime}\n` +
                  `👤 Nama: ${this.bookingData.playerName}\n` +
                  `📱 Telepon: ${this.bookingData.playerPhone}\n` +
                  `💰 Total: Rp ${price.toLocaleString('id-ID')}\n\n` +
                  `🎫 Kode Booking: ${bookingCode}\n\n` +
                  `Silakan datang 15 menit sebelum waktu bermain. Terima kasih! 🏀`);
            
            // Reset form
            document.getElementById('bookingForm').reset();
            this.bookingData = { selectedCourt: null, selectedDate: null, selectedTime: null, playerName: '', playerPhone: '' };
            
            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
            
            confirmBtn.innerHTML = originalText;
            confirmBtn.disabled = false;
        }, 2000);
    }

    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    initSmoothScrolling() {
        const navItems = document.querySelectorAll('.nav-link[href^="#"]');
        const sections = document.querySelectorAll('section[id], main > div[id]');
        
        window.addEventListener('scroll', () => {
            let currentSection = '';
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                if (section.offsetTop <= scrollPos) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    updateYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AyoBasket();
});

// Add Bootstrap JS for modal functionality if not already included
if (typeof bootstrap === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    script.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
}