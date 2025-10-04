export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
}

export const guestLessons: Lesson[] = [
  {
    id: 'guest-1',
    title: 'Getting Started',
    duration: '5 min',
    completed: false,
    content: `
      <h3>Welcome to LoadBoard AI</h3>
      <p>This lesson introduces you to the basics of our platform.</p>
      <ul>
        <li>Browse available loads without registration</li>
        <li>View load details and pricing information</li>
        <li>Understand guest limitations and benefits</li>
      </ul>
      <p><strong>Key Features for Guests:</strong></p>
      <ul>
        <li>View up to 10 loads per day</li>
        <li>Basic load information display</li>
        <li>Access to pricing calculator</li>
      </ul>
    `
  },
  {
    id: 'guest-2',
    title: 'Browsing Loads',
    duration: '8 min',
    completed: false,
    content: `
      <h3>How to Browse Loads</h3>
      <p>Learn to navigate the load board effectively.</p>
      <ol>
        <li>Use the search filters to narrow down results</li>
        <li>Sort by distance, rate, or pickup date</li>
        <li>Click on load cards to view details</li>
      </ol>
      <p><strong>Filter Options:</strong></p>
      <ul>
        <li>Equipment type (Van, Flatbed, Reefer)</li>
        <li>Distance radius from your location</li>
        <li>Rate per mile minimum</li>
        <li>Pickup and delivery dates</li>
      </ul>
    `
  },
  {
    id: 'guest-3',
    title: 'Understanding Pricing',
    duration: '6 min',
    completed: false,
    content: `
      <h3>Pricing and Registration</h3>
      <p>Learn about our pricing structure and how to upgrade.</p>
      <p><strong>Current Plans:</strong></p>
      <ul>
        <li><strong>Starter (Free):</strong> 10 loads/day, basic features</li>
        <li><strong>Basic ($49/month):</strong> 100 loads/day, email alerts</li>
        <li><strong>Pro ($149/month):</strong> Unlimited loads, AI dispatch</li>
        <li><strong>Enterprise ($399/month):</strong> Full TMS, priority support</li>
      </ul>
      <p>Ready to upgrade? Click the "Upgrade" button in the top navigation.</p>
    `
  },
  {
    id: 'guest-4',
    title: 'Booking a Load as a Guest',
    duration: '7 min',
    completed: false,
    content: `
      <h3>Booking Loads Without an Account</h3>
      <p>As a guest, you can preview loads without an account:</p>
      <ul>
        <li>Go to the <strong>Load Board</strong> section</li>
        <li>Apply filters like origin, equipment, or urgency</li>
        <li>Click a load to view basic details</li>
        <li>Click "Book Now" to create an account and confirm</li>
      </ul>
      <p><em>Note: Guests have limited access to pricing, analytics, and automation.</em></p>
    `
  },
  {
    id: 'guest-5',
    title: 'Viewing Pricing & Upgrading',
    duration: '6 min',
    completed: false,
    content: `
      <h3>How to Upgrade Your Account</h3>
      <p>To unlock full features, you'll need to subscribe:</p>
      <ol>
        <li>Click "Pricing" in the top navigation</li>
        <li>Compare Guest vs Subscriber benefits</li>
        <li>Click "Upgrade" to begin checkout</li>
        <li>Choose monthly or annual plan and submit payment</li>
      </ol>
      <p><em>You'll get immediate access to advanced dispatch, automation, and AI tools.</em></p>
    `
  },
  {
    id: 'guest-6',
    title: 'Guest Access Limitations',
    duration: '5 min',
    completed: false,
    content: `
      <h3>Understanding Guest Limitations</h3>
      <p>Guest users have limited access to the platform to help them explore:</p>
      <ul>
        <li>No access to dispatch automation or analytics</li>
        <li>Can preview but not confirm load bookings</li>
        <li>AI recommendations and insights are disabled</li>
        <li>Upgrading unlocks real-time matching and routing tools</li>
      </ul>
      <p><em>Ready to upgrade? Visit the pricing page and become a full subscriber.</em></p>
    `
  }
];

export const subscriberLessons: Lesson[] = [
  {
    id: 'sub-1',
    title: 'Dashboard Overview',
    duration: '10 min',
    completed: false,
    content: `
      <h3>Your Dispatch Dashboard</h3>
      <p>Welcome to your command center for logistics operations.</p>
      <p><strong>Dashboard Sections:</strong></p>
      <ul>
        <li><strong>Left Panel:</strong> Navigation (Load Board, Dispatch, Analytics)</li>
        <li><strong>Center:</strong> Active loads and AI recommendations</li>
        <li><strong>Right Panel:</strong> Insights, notifications, and support</li>
      </ul>
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>Real-time load updates</li>
        <li>AI-powered load matching</li>
        <li>Automated dispatch suggestions</li>
        <li>Performance analytics</li>
      </ul>
    `
  },
  {
    id: 'sub-2',
    title: 'AI Dispatch Tools',
    duration: '15 min',
    completed: false,
    content: `
      <h3>Leveraging AI for Dispatch</h3>
      <p>Learn how our AI system optimizes your operations.</p>
      <p><strong>AI Features:</strong></p>
      <ul>
        <li><strong>Smart Matching:</strong> Automatically matches loads to your fleet</li>
        <li><strong>Route Optimization:</strong> Suggests most efficient routes</li>
        <li><strong>Rate Prediction:</strong> Forecasts market rates</li>
        <li><strong>Carrier Scoring:</strong> Evaluates carrier performance</li>
      </ul>
      <p><strong>How to Use:</strong></p>
      <ol>
        <li>Set your preferences in the AI settings</li>
        <li>Review AI recommendations daily</li>
        <li>Accept or modify suggested dispatches</li>
        <li>Monitor performance metrics</li>
      </ol>
    `
  },
  {
    id: 'sub-3',
    title: 'Automation Setup',
    duration: '12 min',
    completed: false,
    content: `
      <h3>Setting Up Automation</h3>
      <p>Configure automated workflows to save time.</p>
      <p><strong>Automation Options:</strong></p>
      <ul>
        <li><strong>Auto-Dispatch:</strong> Automatically assign loads to carriers</li>
        <li><strong>Rate Alerts:</strong> Get notified of high-value loads</li>
        <li><strong>Carrier Notifications:</strong> Auto-send load offers</li>
        <li><strong>Document Processing:</strong> Automated paperwork handling</li>
      </ul>
      <p><strong>Setup Steps:</strong></p>
      <ol>
        <li>Go to Settings > Automation</li>
        <li>Define your automation rules</li>
        <li>Set approval thresholds</li>
        <li>Test with sample loads</li>
        <li>Monitor and adjust as needed</li>
      </ol>
    `
  },
  {
    id: 'sub-4',
    title: 'Advanced Features',
    duration: '18 min',
    completed: false,
    content: `
      <h3>Advanced Platform Features</h3>
      <p>Explore premium features for power users.</p>
      <p><strong>TMS Integration:</strong></p>
      <ul>
        <li>Fleet management tools</li>
        <li>Driver communication portal</li>
        <li>Real-time tracking</li>
        <li>Maintenance scheduling</li>
      </ul>
      <p><strong>Analytics & Reporting:</strong></p>
      <ul>
        <li>Performance dashboards</li>
        <li>Profit/loss analysis</li>
        <li>Market trend reports</li>
        <li>Custom report builder</li>
      </ul>
      <p><strong>API Access:</strong></p>
      <ul>
        <li>Connect with existing systems</li>
        <li>Custom integrations</li>
        <li>Real-time data feeds</li>
      </ul>
    `
  }
];