const { Resend } = require("resend");

// Lazy initialize Resend to avoid crashing if API key is missing
let resend = null;
const getResend = () => {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

const FROM_EMAIL = "JobLeap <notifications@jobleap.work>";
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://job-leap-wokg.vercel.app';

// Common email wrapper
const emailWrapper = (content, preheader = '') => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JobLeap</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; -webkit-font-smoothing: antialiased;">
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>

  <!-- Email container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 32px 40px; background: linear-gradient(135deg, #0d6d6e 0%, #0a5a5b 100%); text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="width: 50px; height: 50px; background-color: rgba(255,255,255,0.2); border-radius: 12px; display: inline-block; line-height: 50px; margin-bottom: 12px;">
                      <span style="color: #ffffff; font-size: 24px; font-weight: bold;">JL</span>
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">JobLeap</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          ${content}

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 13px;">
                      Find your dream job at <a href="${FRONTEND_URL}" style="color: #0d6d6e; text-decoration: none; font-weight: 500;">jobleap.work</a>
                    </p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="${FRONTEND_URL}" style="color: #9ca3af; text-decoration: none; font-size: 12px;">Home</a>
                        </td>
                        <td style="color: #d1d5db;">•</td>
                        <td style="padding: 0 8px;">
                          <a href="${FRONTEND_URL}/job-alerts" style="color: #9ca3af; text-decoration: none; font-size: 12px;">Job Alerts</a>
                        </td>
                        <td style="color: #d1d5db;">•</td>
                        <td style="padding: 0 8px;">
                          <a href="${FRONTEND_URL}/settings" style="color: #9ca3af; text-decoration: none; font-size: 12px;">Unsubscribe</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Bottom text -->
        <p style="margin: 24px 0 0 0; color: #9ca3af; font-size: 11px; text-align: center;">
          © ${new Date().getFullYear()} JobLeap. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Send job alert email with matching jobs
const sendJobAlertEmail = async (user, jobs, alertName) => {
  if (!user.email || jobs.length === 0) return { success: false };

  const jobListHtml = jobs.slice(0, 5).map((job, index) => `
    <tr>
      <td style="padding: ${index === 0 ? '0' : '20px 0 0 0'};">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 6px 0; color: #111827; font-size: 16px; font-weight: 600;">${job.title}</h3>
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                      <span style="font-weight: 500; color: #374151;">${job.company}</span> • ${job.location}
                    </p>
                    ${job.salary ? `<p style="margin: 0 0 12px 0; color: #059669; font-size: 14px; font-weight: 500;">💰 ${job.salary}</p>` : ''}
                    <a href="${job.applyUrl || job.url || FRONTEND_URL}" style="display: inline-block; padding: 8px 16px; background-color: #0d6d6e; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">View Job →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  const content = `
    <tr>
      <td style="padding: 40px;">
        <!-- Greeting -->
        <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 24px; font-weight: 700;">
          Good news, ${user.name || 'there'}! 🎉
        </h2>
        <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
          We found <strong style="color: #0d6d6e;">${jobs.length} new job${jobs.length > 1 ? 's' : ''}</strong> matching your alert "<strong>${alertName}</strong>"
        </p>

        <!-- Job Cards -->
        <table width="100%" cellpadding="0" cellspacing="0">
          ${jobListHtml}
        </table>

        ${jobs.length > 5 ? `
          <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; text-align: center;">
            + ${jobs.length - 5} more matching jobs
          </p>
        ` : ''}

        <!-- CTA Button -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
          <tr>
            <td align="center">
              <a href="${FRONTEND_URL}/?title=${encodeURIComponent(alertName)}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #0d6d6e 0%, #0a5a5b 100%); color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(13, 109, 110, 0.3);">
                View All Matching Jobs
              </a>
            </td>
          </tr>
        </table>

        <!-- Tip Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
          <tr>
            <td style="padding: 20px; background-color: #fef3c7; border-radius: 12px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                💡 <strong>Pro tip:</strong> Apply early! Jobs posted within 24 hours get 3x more responses.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  const preheader = `${jobs.length} new jobs matching "${alertName}" - Don't miss out!`;

  try {
    const resendClient = getResend();
    if (!resendClient) {
      console.warn("Email not sent - Resend API key not configured");
      return { success: false, error: "Email service not configured" };
    }

    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `🔥 ${jobs.length} new job${jobs.length > 1 ? 's' : ''} matching "${alertName}"`,
      html: emailWrapper(content, preheader)
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

  const statusConfig = {
    pending: { emoji: '📋', color: '#6b7280', message: 'is being reviewed', bg: '#f3f4f6' },
    reviewing: { emoji: '👀', color: '#3b82f6', message: 'is under review', bg: '#eff6ff' },
    interview: { emoji: '🎉', color: '#059669', message: 'has advanced to interview!', bg: '#d1fae5' },
    offered: { emoji: '🎊', color: '#7c3aed', message: 'has received an offer!', bg: '#ede9fe' },
    rejected: { emoji: '📝', color: '#6b7280', message: 'has been closed', bg: '#f3f4f6' },
    hired: { emoji: '🏆', color: '#059669', message: 'was successful!', bg: '#d1fae5' }
  };

  const config = statusConfig[newStatus] || { emoji: '📋', color: '#6b7280', message: `status: ${newStatus}`, bg: '#f3f4f6' };
  const isPositive = ["interview", "offered", "hired"].includes(newStatus);

  const content = `
    <tr>
      <td style="padding: 40px; text-align: center;">
        <!-- Status Icon -->
        <div style="width: 80px; height: 80px; margin: 0 auto 24px; background-color: ${config.bg}; border-radius: 50%; line-height: 80px;">
          <span style="font-size: 40px;">${config.emoji}</span>
        </div>

        <!-- Title -->
        <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 24px; font-weight: 700;">
          Application Update
        </h2>

        <!-- Message -->
        <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
          Your application for<br>
          <strong style="color: #111827; font-size: 18px;">${jobTitle}</strong><br>
          at <strong style="color: #111827;">${company}</strong><br>
          <span style="color: ${config.color}; font-weight: 600;">${config.message}</span>
        </p>

        <!-- Status Badge -->
        <div style="display: inline-block; padding: 8px 20px; background-color: ${config.bg}; border-radius: 20px; margin-bottom: 32px;">
          <span style="color: ${config.color}; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${newStatus}</span>
        </div>

        ${isPositive ? `
          <p style="margin: 0 0 32px 0; color: #6b7280; font-size: 15px;">
            Congratulations! Keep up the great work! 🚀
          </p>
        ` : ''}

        <!-- CTA Button -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${FRONTEND_URL}/my-applications" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #0d6d6e 0%, #0a5a5b 100%); color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(13, 109, 110, 0.3);">
                View All Applications
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  const preheader = `Your application for ${jobTitle} at ${company} ${config.message}`;

  try {
    const resendClient = getResend();
    if (!resendClient) {
      console.warn("Email not sent - Resend API key not configured");
      return { success: false, error: "Email service not configured" };
    }

    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `${config.emoji} Application Update: ${jobTitle} at ${company}`,
      html: emailWrapper(content, preheader)
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

  const features = [
    { emoji: '🔍', title: 'Search Jobs', desc: 'Browse thousands of jobs from top companies' },
    { emoji: '🎯', title: 'Job Alerts', desc: 'Get notified when matching jobs are posted' },
    { emoji: '📄', title: 'Resume Builder', desc: 'Create an ATS-friendly professional resume' },
    { emoji: '✨', title: 'ATS Optimizer', desc: 'Optimize your resume for each application' },
    { emoji: '🌎', title: 'H1B Sponsors', desc: 'Find companies that sponsor work visas' },
  ];

  const featuresHtml = features.map(f => `
    <tr>
      <td style="padding: 12px 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="50" valign="top">
              <div style="width: 40px; height: 40px; background-color: #e6f3f3; border-radius: 10px; text-align: center; line-height: 40px;">
                <span style="font-size: 20px;">${f.emoji}</span>
              </div>
            </td>
            <td valign="top">
              <h4 style="margin: 0 0 4px 0; color: #111827; font-size: 15px; font-weight: 600;">${f.title}</h4>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">${f.desc}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  const content = `
    <tr>
      <td style="padding: 40px;">
        <!-- Welcome Message -->
        <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 28px; font-weight: 700; text-align: center;">
          Welcome to JobLeap! 🚀
        </h2>
        <p style="margin: 0 0 32px 0; color: #6b7280; font-size: 16px; line-height: 1.6; text-align: center;">
          Hi${user.name ? ` <strong>${user.name}</strong>` : ''}! We're thrilled to have you on board.<br>
          Your journey to landing your dream job starts now!
        </p>

        <!-- Features -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; padding: 24px;">
          <tr>
            <td style="padding: 24px;">
              <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 16px; font-weight: 600;">What you can do on JobLeap:</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${featuresHtml}
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA Button -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
          <tr>
            <td align="center">
              <a href="${FRONTEND_URL}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #0d6d6e 0%, #0a5a5b 100%); color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(13, 109, 110, 0.3);">
                Start Exploring Jobs
              </a>
            </td>
          </tr>
        </table>

        <!-- Tip -->
        <p style="margin: 32px 0 0 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6;">
          💡 <strong>Quick tip:</strong> Set up job alerts to be the first to know when your dream job is posted!
        </p>
      </td>
    </tr>
  `;

  const preheader = "Your journey to landing your dream job starts now!";

  try {
    const resendClient = getResend();
    if (!resendClient) {
      console.warn("Email not sent - Resend API key not configured");
      return { success: false, error: "Email service not configured" };
    }

    const { data, error } = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: "🚀 Welcome to JobLeap - Let's find your dream job!",
      html: emailWrapper(content, preheader)
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
