const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendBookingNotification = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { adminEmail, bookingData } = req.body;

    if (!adminEmail || !bookingData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Booking Request from ${bookingData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">New Booking Request</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${bookingData.email}">${bookingData.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${bookingData.phone}">${bookingData.phone}</a></p>
            <p><strong>Preferred Date:</strong> ${bookingData.date}</p>
            <p><strong>Preferred Time:</strong> ${bookingData.time}</p>
          </div>

          ${bookingData.message ? `
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #c9a84c; margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p>${bookingData.message}</p>
            </div>
          ` : ''}

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This is an automated email from Velfound. Please log in to your admin panel to manage this booking.
          </p>
        </div>
      `,
    };

    // Email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingData.email,
      subject: 'Booking Confirmation - Velfound',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">Booking Confirmed!</h2>
          
          <p>Hi ${bookingData.name},</p>
          
          <p>Thank you for booking a call with Velfound. We've received your booking request and will contact you shortly to confirm the details.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Booking Details:</strong></p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Phone:</strong> +91 83098 27125</p>
          </div>

          <p>If you need to reschedule or have any questions, please reply to this email or contact us at velfound1@gmail.com</p>
          
          <p style="color: #666; margin-top: 30px;">
            Best regards,<br/>
            <strong>Velfound Team</strong>
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email notification' });
  }
});
