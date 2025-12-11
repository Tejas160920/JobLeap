const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "JobLeap <notifications@jobleap.com>";

// Send job alert email with matching jobs
const sendJobAlertEmail = async (user, jobs, alertName) => {
  if (!user.email || jobs.length === 0) return { success: false };

  const jobListHtml = jobs.slice(0, 10).map(job => `
    <tr>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <h3 style="margin: 0 0 4px 0; color: #111827; font-size: 16px;">${job.title}</h3>
        <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">${job.company} • ${job.location}</p>
        ${job.salary ? `<p style="margin: 0 0 8px 0; color: #059669; font-size: 14px;">${job.salary}</p>` : ''}
        <a href="${job.applyUrl || job.url}" style="color: #0d6d6e; text-decoration: none; font-size: 14px;">View Job →</a>
      </td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
          <td style="padding: 32px 24px; background-color: #0d6d6e; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">JobLeap</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 24px;">
            <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 20px;">New Jobs Matching "${alertName}"</h2>
            <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 14px;">We found ${jobs.length} new job${jobs.length > 1 ? 's' : ''} that match your saved search.</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              ${jobListHtml}
            </table>

            ${jobs.length > 10 ? `<p style="margin: 16px 0 0 0; color: #6b7280; font-size: 14px; text-align: center;">And ${jobs.length - 10} more jobs...</p>` : ''}

            <div style="margin-top: 24px; text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'https://job-leap-wokg.vercel.app'}" style="display: inline-block; padding: 12px 24px; background-color: #0d6d6e; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 500;">View All Jobs</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">You're receiving this because you set up a job alert on JobLeap.</p>
            <a href="${process.env.FRONTEND_URL || 'https://job-leap-wokg.vercel.app'}/settings" style="color: #0d6d6e; text-decoration: none; font-size: 12px;">Manage notification preferences</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `${jobs.length} new job${jobs.length > 1 ? 's' : ''} matching "${alertName}"`,
      html
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
};

// Send application status update email
const sendApplicationUpdateEmail = async (user, jobTitle, company, newStatus) => {
  if (!user.email) return { success: false };

  const statusMessages = {
    pending: "is being reviewed",
    reviewing: "is under review",
    interview: "has advanced to the interview stage! 🎉",
    offered: "has received an offer! 🎉",
    rejected: "has been closed",
    hired: "was successful - congratulations! 🎉"
  };

  const statusMessage = statusMessages[newStatus] || `has been updated to ${newStatus}`;
  const isPositive = ["interview", "offered", "hired"].includes(newStatus);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
          <td style="padding: 32px 24px; background-color: #0d6d6e; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">JobLeap</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 24px; text-align: center;">
            <div style="width: 64px; height: 64px; margin: 0 auto 16px; background-color: ${isPositive ? '#d1fae5' : '#f3f4f6'}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">${isPositive ? '🎉' : '📋'}</span>
            </div>
            <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 20px;">Application Update</h2>
            <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 16px;">
              Your application for <strong>${jobTitle}</strong> at <strong>${company}</strong> ${statusMessage}.
            </p>

            <div style="padding: 16px; background-color: #f9fafb; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0; color: #111827; font-size: 14px;">
                <strong>Status:</strong> <span style="color: ${isPositive ? '#059669' : '#6b7280'}; text-transform: capitalize;">${newStatus}</span>
              </p>
            </div>

            <a href="${process.env.FRONTEND_URL || 'https://job-leap-wokg.vercel.app'}/my-applications" style="display: inline-block; padding: 12px 24px; background-color: #0d6d6e; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 500;">View My Applications</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">You're receiving this because you applied for a job on JobLeap.</p>
            <a href="${process.env.FRONTEND_URL || 'https://job-leap-wokg.vercel.app'}/settings" style="color: #0d6d6e; text-decoration: none; font-size: 12px;">Manage notification preferences</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `Application Update: ${jobTitle} at ${company}`,
      html
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
};

// Send welcome email to new users
const sendWelcomeEmail = async (user) => {
  if (!user.email) return { success: false };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
          <td style="padding: 32px 24px; background-color: #0d6d6e; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Welcome to JobLeap! 🚀</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 24px;">
            <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 20px;">Hi${user.name ? ` ${user.name}` : ''}!</h2>
            <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
              Thanks for joining JobLeap! We're excited to help you find your next opportunity.
            </p>

            <h3 style="margin: 0 0 12px 0; color: #111827; font-size: 16px;">Here's what you can do:</h3>
            <ul style="margin: 0 0 24px 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.8;">
              <li><strong>Search Jobs</strong> - Browse thousands of jobs from top companies</li>
              <li><strong>H1B Sponsors</strong> - Find companies that sponsor work visas</li>
              <li><strong>Resume Builder</strong> - Create a professional ATS-friendly resume</li>
              <li><strong>ATS Optimizer</strong> - Optimize your resume for specific jobs</li>
              <li><strong>Job Alerts</strong> - Get notified when new matching jobs are posted</li>
            </ul>

            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'https://job-leap-wokg.vercel.app'}" style="display: inline-block; padding: 12px 24px; background-color: #0d6d6e; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 500;">Start Exploring Jobs</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">Good luck with your job search!</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: "Welcome to JobLeap! 🚀",
      html
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
};

module.exports = {
  sendJobAlertEmail,
  sendApplicationUpdateEmail,
  sendWelcomeEmail
};
