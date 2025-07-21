// Main JavaScript file for Ganpati Donation & Expense Tracker

// Global variables with sample data
let donations = [
    {
        id: 'GP1704009600001ABC',
        name: 'Rajesh Kumar',
        email: 'rajesh@email.com',
        phone: '+91 98765 43210',
        wing: 'A',
        floor: '3',
        flat: '302',
        flatDisplay: 'Wing A - 302',
        amount: '1001',
        paymentMode: 'UPI',
        date: '2024-01-01',
        note: 'Ganpati Bappa Morya',
        timestamp: '2024-01-01T10:00:00.000Z'
    },
    {
        id: 'GP1704009600002DEF',
        name: 'Priya Sharma',
        email: 'priya@email.com',
        phone: '+91 87654 32109',
        wing: 'B',
        floor: '0',
        flat: '001+002',
        flatDisplay: 'Wing B - 001+002',
        amount: '501',
        paymentMode: 'Cash',
        date: '2024-01-02',
        note: 'Happy to contribute',
        timestamp: '2024-01-02T11:00:00.000Z'
    },
    {
        id: 'GP1704009600003GHI',
        name: 'Amit Patel',
        email: 'amit@email.com',
        phone: '+91 76543 21098',
        wing: 'C',
        floor: '7',
        flat: '701+702+703+704',
        flatDisplay: 'Wing C - 701+702+703+704',
        amount: '2001',
        paymentMode: 'Bank Transfer',
        date: '2024-01-03',
        note: 'For decoration - Entire 7th floor',
        timestamp: '2024-01-03T12:00:00.000Z'
    }
];

let expenses = [
    {
        id: 'EX1704009600001ABC',
        item: 'Decoration Materials',
        cost: '1500',
        date: '2024-01-05',
        reason: 'Flowers, lights, and decorative items for mandap',
        category: 'Decoration',
        timestamp: '2024-01-05T09:00:00.000Z'
    },
    {
        id: 'EX1704009600002DEF',
        item: 'Sound System',
        cost: '800',
        date: '2024-01-06',
        reason: 'Rental for speakers and microphones',
        category: 'Sound & Music',
        timestamp: '2024-01-06T10:00:00.000Z'
    },
    {
        id: 'EX1704009600003GHI',
        item: 'Prasad Ingredients',
        cost: '600',
        date: '2024-01-07',
        reason: 'Modak ingredients and fruits for prasad',
        category: 'Food & Prasad',
        timestamp: '2024-01-07T08:00:00.000Z'
    }
];

// Make arrays globally accessible
window.donations = donations;
window.expenses = expenses;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    updateAnalytics();
    displayRecentActivities();
    setupFormHandlers();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Update analytics on homepage
function updateAnalytics() {
    const totalDonationsEl = document.getElementById('total-donations');
    const totalExpensesEl = document.getElementById('total-expenses');
    const balanceEl = document.getElementById('balance');
    const totalDonorsEl = document.getElementById('total-donors');
    
    if (totalDonationsEl) {
        try {
            const totalDonations = donations.reduce((sum, donation) => sum + parseFloat(donation.amount || 0), 0);
            const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.cost || 0), 0);
            const balance = totalDonations - totalExpenses;
            const totalDonors = donations.length;
            
            totalDonationsEl.textContent = `₹${totalDonations.toLocaleString('en-IN')}`;
            if (totalExpensesEl) totalExpensesEl.textContent = `₹${totalExpenses.toLocaleString('en-IN')}`;
            if (balanceEl) {
                balanceEl.textContent = `₹${balance.toLocaleString('en-IN')}`;
                balanceEl.className = balance >= 0 ? 'success' : 'error';
            }
            if (totalDonorsEl) totalDonorsEl.textContent = totalDonors;
        } catch (error) {
            console.error('Error updating analytics:', error);
        }
    }
}

// Display recent activities
function displayRecentActivities() {
    const recentDonationsEl = document.getElementById('recent-donations');
    const recentExpensesEl = document.getElementById('recent-expenses');
    
    if (recentDonationsEl) {
        const recentDonations = donations.slice(-5).reverse();
        if (recentDonations.length > 0) {
            recentDonationsEl.innerHTML = recentDonations.map(donation => `
                <div class="activity-item">
                    <h4>${donation.name} ${donation.flatDisplay ? `(${donation.flatDisplay})` : ''}</h4>
                    <p>₹${parseFloat(donation.amount).toLocaleString('en-IN')} - ${donation.date}</p>
                    <p>${donation.paymentMode}</p>
                </div>
            `).join('');
        }
    }
    
    if (recentExpensesEl) {
        const recentExpenses = expenses.slice(-5).reverse();
        if (recentExpenses.length > 0) {
            recentExpensesEl.innerHTML = recentExpenses.map(expense => `
                <div class="activity-item">
                    <h4>${expense.item}</h4>
                    <p>₹${parseFloat(expense.cost).toLocaleString('en-IN')} - ${expense.date}</p>
                    <p>${expense.reason}</p>
                </div>
            `).join('');
        }
    }
}

// Setup form handlers
function setupFormHandlers() {
    // Donation form
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }
    
    // Expense form
    const expenseForm = document.getElementById('expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', handleExpenseSubmit);
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Handle donation form submission
function handleDonationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const donation = {
        id: generateUniqueId(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        wing: formData.get('wing'),
        floor: formData.get('floor'),
        flat: formData.get('flat'),
        flatDisplay: formData.get('flatDisplay'),
        amount: formData.get('amount'),
        paymentMode: formData.get('paymentMode'),
        date: formData.get('date'),
        note: formData.get('note') || '',
        timestamp: new Date().toISOString()
    };
    
    // Validate required fields
    if (!donation.name || !donation.wing || !donation.floor || !donation.flat || !donation.amount || !donation.paymentMode || !donation.date) {
        showMessage('Please fill in all required fields including Wing, Floor, and Flat Number.', 'error');
        return;
    }
    
    // Add donation to array
    donations.push(donation);
    
    // Data is now stored in memory only
    console.log('Donation added to in-memory storage');
    
    // Show success message
    showMessage('Donation recorded successfully! Thank you for your contribution.', 'success');
    
    // Reset form
    e.target.reset();
    
    // Update analytics if on homepage
    updateAnalytics();
    displayRecentActivities();
    
    // Update recent donations list on donation page
    if (typeof displayRecentDonationsList === 'function') {
        displayRecentDonationsList();
    }
    
    // Update donations table if refreshDonationsTable function exists
    if (typeof refreshDonationsTable === 'function') {
        refreshDonationsTable();
    }
    
    // Auto-export to Excel after each donation
    setTimeout(() => {
        exportToExcel('donations');
        showMessage('Live database updated! Excel file auto-generated.', 'info');
    }, 1500);
    
    // Show receipt option
    showReceiptOption(donation);
}

// Handle expense form submission
function handleExpenseSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const expense = {
        id: generateUniqueId(),
        item: formData.get('item'),
        cost: formData.get('cost'),
        date: formData.get('date'),
        reason: formData.get('reason'),
        category: formData.get('category') || 'General',
        timestamp: new Date().toISOString()
    };
    
    // Validate required fields
    if (!expense.item || !expense.cost || !expense.date || !expense.reason) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Add expense to array
    expenses.push(expense);
    
    // Data is now stored in memory only
    console.log('Expense added to in-memory storage');
    
    // Show success message
    showMessage('Expense recorded successfully!', 'success');
    
    // Reset form
    e.target.reset();
    
    // Update analytics if on homepage
    updateAnalytics();
    displayRecentActivities();
    
    // Refresh expense table if on expenses page
    displayExpenses();
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contact = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // In a real application, this would be sent to a server
    console.log('Contact form submitted:', contact);
    
    // Show success message
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Generate unique ID
function generateUniqueId() {
    return 'GP' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Show message to user
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.style.cssText = `
        position: fixed;
        inset-block-start: 100px;
        inset-inline-end: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    messageEl.textContent = message;
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

// Show receipt option
function showReceiptOption(donation) {
    const receiptModal = document.createElement('div');
    receiptModal.className = 'receipt-modal';
    receiptModal.style.cssText = `
        position: fixed;
        inset-block-start: 0;
        inset-inline-start: 0;
        inline-size: 100%;
        block-size: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
    `;
    
    receiptModal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 10px; max-inline-size: 400px; text-align: center;">
            <h3>Donation Successful!</h3>
            <p>Your donation ID: <strong>${donation.id}</strong></p>
            <p>Amount: <strong>₹${parseFloat(donation.amount).toLocaleString('en-IN')}</strong></p>
            <div style="margin-block-start: 2rem;">
                <button onclick="downloadReceipt('${donation.id}')" class="btn btn-primary" style="margin-inline-end: 1rem;">Download Receipt</button>
                <button onclick="closeReceiptModal()" class="btn btn-secondary">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(receiptModal);
    
    // Close modal when clicking outside
    receiptModal.addEventListener('click', (e) => {
        if (e.target === receiptModal) {
            closeReceiptModal();
        }
    });
}

// Close receipt modal
function closeReceiptModal() {
    const modal = document.querySelector('.receipt-modal');
    if (modal) {
        modal.remove();
    }
}

// Download receipt
function downloadReceipt(donationId) {
    const donation = donations.find(d => d.id === donationId);
    if (!donation) {
        showMessage('Donation not found!', 'error');
        return;
    }
    
    // Create receipt content
    const receiptContent = `
        GANPATI DONATION RECEIPT
        ========================
        
        Receipt ID: ${donation.id}
        Date: ${donation.date}
        Time: ${new Date(donation.timestamp).toLocaleString()}
        
        Donor Details:
        Name: ${donation.name}
        Address: ${donation.flatDisplay || 'N/A'}
        Wing: ${donation.wing || 'N/A'}
        Floor: ${donation.floor || 'N/A'}
        Flat: ${donation.flat || 'N/A'}
        Email: ${donation.email || 'N/A'}
        Phone: ${donation.phone || 'N/A'}
        
        Donation Details:
        Amount: ₹${parseFloat(donation.amount).toLocaleString('en-IN')}
        Payment Mode: ${donation.paymentMode}
        Note: ${donation.note || 'N/A'}
        
        Thank you for your generous contribution to Ganpati Utsav!
        
        Ganpati Bappa Morya!
    `;
    
    // Create and download file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ganpati_Receipt_${donation.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    closeReceiptModal();
    showMessage('Receipt downloaded successfully!', 'success');
}

// Display expenses table
function displayExpenses() {
    const expenseTableBody = document.getElementById('expense-table-body');
    if (!expenseTableBody) return;
    
    if (expenses.length === 0) {
        expenseTableBody.innerHTML = '<tr><td colspan="6" class="text-center">No expenses recorded yet</td></tr>';
        return;
    }
    
    expenseTableBody.innerHTML = expenses.map((expense, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${expense.item}</td>
            <td>₹${parseFloat(expense.cost).toLocaleString('en-IN')}</td>
            <td>${expense.date}</td>
            <td>${expense.reason}</td>
            <td>
                <button onclick="deleteExpense('${expense.id}')" class="btn btn-sm" style="background: #dc3545; color: white; padding: 0.25rem 0.5rem; font-size: 0.8rem;">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Delete expense
function deleteExpense(expenseId) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(expense => expense.id !== expenseId);
        console.log('Expense deleted from in-memory storage');
        displayExpenses();
        updateAnalytics();
        displayRecentActivities();
        showMessage('Expense deleted successfully!', 'success');
    }
}

// Export data to Excel
function exportToExcel(type) {
    let data, filename;
    
    if (type === 'donations') {
        data = donations.map(d => ({
            'Receipt ID': d.id,
            'Name': d.name,
            'Wing': d.wing || '',
            'Floor': d.floor || '',
            'Flat': d.flat || '',
            'Address': d.flatDisplay || '',
            'Email': d.email || '',
            'Phone': d.phone || '',
            'Amount': d.amount,
            'Payment Mode': d.paymentMode,
            'Date': d.date,
            'Note': d.note || '',
            'Timestamp': new Date(d.timestamp).toLocaleString()
        }));
        filename = 'Ganpati_Donations.csv';
    } else {
        data = expenses.map(e => ({
            'ID': e.id,
            'Item': e.item,
            'Cost': e.cost,
            'Date': e.date,
            'Reason': e.reason,
            'Category': e.category || 'General',
            'Timestamp': new Date(e.timestamp).toLocaleString()
        }));
        filename = 'Ganpati_Expenses.csv';
    }
    
    if (data.length === 0) {
        showMessage(`No ${type} data to export!`, 'warning');
        return;
    }
    
    // Convert to CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} exported successfully!`, 'success');
}

// Search functionality
function searchData(query, type) {
    const searchQuery = query.toLowerCase();
    let filteredData;
    
    if (type === 'donations') {
        filteredData = donations.filter(d =>
            d.name.toLowerCase().includes(searchQuery) ||
            d.id.toLowerCase().includes(searchQuery) ||
            d.paymentMode.toLowerCase().includes(searchQuery) ||
            (d.wing && d.wing.toLowerCase().includes(searchQuery)) ||
            (d.floor && d.floor.toLowerCase().includes(searchQuery)) ||
            (d.flat && d.flat.toLowerCase().includes(searchQuery)) ||
            (d.flatDisplay && d.flatDisplay.toLowerCase().includes(searchQuery))
        );
    } else {
        filteredData = expenses.filter(e => 
            e.item.toLowerCase().includes(searchQuery) ||
            e.reason.toLowerCase().includes(searchQuery) ||
            e.category.toLowerCase().includes(searchQuery)
        );
    }
    
    return filteredData;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);