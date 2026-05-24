import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Validation schema
interface RecoveryFormData {
  fullName: string;
  country: string;
  phoneNumber: string;
  emailAddress: string;
  scammerUsername: string;
  totalAmount: string;
  paymentDate: string;
  proofOfPaymentBase64: string;
  fileName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: RecoveryFormData = await request.json();

    // Validation
    if (!formData.fullName || !formData.country || !formData.phoneNumber || 
        !formData.emailAddress || !formData.scammerUsername || !formData.totalAmount || 
        !formData.paymentDate || !formData.proofOfPaymentBase64) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Calculate 80% compensation
    const totalAmount = parseFloat(formData.totalAmount.replace(/[^\d.-]/g, ''));
    if (isNaN(totalAmount) || totalAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    const compensationAmount = totalAmount * 0.8;

    // Convert base64 to buffer for attachment
    const imageBuffer = Buffer.from(formData.proofOfPaymentBase64.split(',')[1] || formData.proofOfPaymentBase64, 'base64');
    const fileName = formData.fileName || `proof_${Date.now()}.jpg`;

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #8b5cf6; padding-bottom: 10px;">
            New Scam Recovery Application Submitted
          </h2>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Applicant Information:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Full Name:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Country:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.country}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone Number:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email Address:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.emailAddress}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Scammer's Username:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.scammerUsername}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Total Amount Reported:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">$${totalAmount.toFixed(2)}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Payment Date:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${formData.paymentDate}</td>
              </tr>
              <tr style="background-color: #e8f5e9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #2e7d32;">80% Compensation Amount:</td>
                <td style="padding: 10px; border: 1px solid #ddd; color: #2e7d32; font-weight: bold;">$${compensationAmount.toFixed(2)}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
              <p style="margin: 0; color: #e65100;">
                <strong>Note:</strong> This is an automated calculation showing 80% of the reported loss. 
                Please verify all information and contact the applicant if additional documentation is needed.
              </p>
            </div>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Proof of payment attachment is included with this email.</p>
            <p>Application submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Scam Recovery Application - ${formData.fullName}`,
      html: emailHtml,
      attachments: [
        {
          filename: fileName,
          content: imageBuffer,
        },
      ],
    });

    // Send confirmation email to applicant
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2e7d32; margin-bottom: 20px;">Application Received ✓</h2>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Dear ${formData.fullName},
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Thank you for submitting your scam recovery application. We have successfully received your submission and will begin processing your claim.
          </p>

          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2e7d32; margin-top: 0;">Estimated Compensation Amount:</h3>
            <p style="font-size: 24px; font-weight: bold; color: #2e7d32; margin: 0;">
              $${compensationAmount.toFixed(2)}
            </p>
            <p style="color: #556e4d; margin: 10px 0 0 0; font-size: 14px;">
              (80% of your reported loss of $${totalAmount.toFixed(2)})
            </p>
          </div>

          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            Our team will review your application and verify all submitted information. You will receive updates about your case via email. 
            Processing typically takes 5-10 business days.
          </p>

          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            If you have any questions, please don't hesitate to contact us using the information provided.
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
            <p>Reference Number: APP-${Date.now()}</p>
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: formData.emailAddress,
      subject: 'Your Scam Recovery Application - Confirmation',
      html: confirmationHtml,
    });

    return NextResponse.json({
      success: true,
      compensationAmount: compensationAmount.toFixed(2),
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('[v0] Email submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process application. Please try again.' },
      { status: 500 }
    );
  }
}
