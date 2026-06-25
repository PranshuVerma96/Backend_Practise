export function generateOtp(){
  return Math.floor(10000 + Math.random() * 90000).toString();
}

export function getOtpHtml(otp) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; text-align: center;">
      <h2 style="color: #333;">Verify Your Account</h2>

      <p style="font-size: 16px; color: #555;">
        Use the OTP below to verify your account.
      </p>

      <div style="
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 8px;
        color: #2563eb;
        margin: 20px 0;
      ">
        ${otp}
      </div>

      <p style="color: #777;">
        This OTP is valid for 10 minutes.
      </p>

      <p style="color: #777;">
        If you didn't request this OTP, please ignore this email.
      </p>

      <hr />

      <p style="font-size: 12px; color: #999;">
        © 2026 Your App. All rights reserved.
      </p>
    </div>
  </body>
  </html>
  `;
}
