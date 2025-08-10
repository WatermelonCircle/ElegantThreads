# Form Setup Instructions

## Quick Setup for Formspree Contact Form

Your contact form is almost ready! You just need to set up the Formspree endpoint to receive emails at `elegantthread.wp@gmail.com`.

### Step 1: Create Formspree Account
1. Go to [https://formspree.io/create](https://formspree.io/create)
2. Enter your email: `elegantthread.wp@gmail.com`
3. Click "Create"
4. Complete the account creation process (it's free!)

### Step 2: Get Your Form ID
1. After creating your account, you'll get a unique Form ID (looks like: `xabydefg`)
2. Copy this Form ID

### Step 3: Update Your Website
1. Open `index.html` 
2. Find the line: `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Replace `YOUR_FORM_ID` with your actual Form ID
4. Example: `action="https://formspree.io/f/xabydefg"`

### Step 4: Deploy and Test
1. Save the changes and push to GitHub
2. Test your form - it should now send emails to `elegantthread.wp@gmail.com`
3. First submission will require email verification from Formspree

## That's it!

Your contact form will now:
- ✅ Send emails to `elegantthread.wp@gmail.com`
- ✅ Show a thank you page after submission
- ✅ Block spam automatically
- ✅ Work on all devices

## Troubleshooting

**Form shows "Form not found" error?**
- Make sure you replaced `YOUR_FORM_ID` with your actual Formspree ID
- Check that the email address matches exactly: `elegantthread.wp@gmail.com`

**Not receiving emails?**
- Check spam folder
- Verify the email address in your Formspree dashboard
- Make sure you confirmed the verification email from Formspree

Need help? Contact Formspree support or check their documentation at [https://help.formspree.io](https://help.formspree.io) 