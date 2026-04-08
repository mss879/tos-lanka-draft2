export function generateProposalEmail(
  name: string,
  company: string,
  employeeCount: number | string,
  services: string[],
  totalPrice: number | string
): string {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Custom Proposal from TOS Lanka</title>
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #000000; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #ffffff; margin: 0; }
        .brand-red { color: #cc0000; }
        .content { background-color: #111111; border: 1px solid #222222; border-radius: 8px; padding: 32px; margin-bottom: 30px; }
        h1 { font-size: 20px; font-weight: 500; margin-top: 0; margin-bottom: 24px; color: #ffffff; }
        p { font-size: 15px; line-height: 1.6; color: #aaaaaa; margin-top: 0; margin-bottom: 20px; }
        .details-box { background-color: #1a1a1a; pading: 20px; border-left: 3px solid #cc0000; margin: 24px 0; padding: 16px; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .detail-row:last-child { margin-bottom: 0; }
        .detail-label { color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        .detail-value { color: #ffffff; font-size: 14px; font-weight: 500; }
        .price-row { margin-top: 16px; padding-top: 16px; border-top: 1px solid #333333; display: flex; justify-content: space-between; align-items: center; }
        .price-label { color: #ffffff; font-size: 16px; font-weight: bold; }
        .price-value { color: #cc0000; font-size: 24px; font-weight: bold; }
        .services-list { margin: 0; padding-left: 20px; color: #aaaaaa; font-size: 14px; }
        .services-list li { margin-bottom: 8px; }
        .footer { text-align: center; color: #666666; font-size: 12px; border-top: 1px solid #333333; padding-top: 24px; }
        .btn { display: inline-block; background-color: #cc0000; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 600; font-size: 14px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="logo">TOS<span class="brand-red"> LANKA</span></p>
        </div>
        
        <div class="content">
          <h1>Hello ${name},</h1>
          <p>Thank you for inquiring about electronics manufacturing solutions through our AI concierge. Based on our conversation regarding <strong>${company}</strong>, we've prepared a preliminary proposal overview.</p>
          
          <div class="details-box">
            <div class="detail-row">
              <span class="detail-label">Company Structure</span>
              <span class="detail-value">${company} (${employeeCount} employees)</span>
            </div>
            
            <div style="margin-top: 16px;">
              <span class="detail-label" style="display: block; margin-bottom: 8px;">Target Services</span>
              <ul class="services-list">
                ${services.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
            
            <div class="price-row">
              <span class="price-label">Estimated Baseline Estimate</span>
              <span class="price-value">$${Number(totalPrice).toLocaleString()}</span>
            </div>
          </div>
          
          <p>Please note that this is an AI-generated baseline estimate. Our engineering team requires your Gerber files and BOM to provide a formalized quotation and DFM review.</p>
          
          <p>One of our specialists will reach out to you within the next 24 business hours to discuss the specific parameters of your project.</p>
          
          <div style="text-align: center;">
            <a href="mailto:dexter@toslanka.com?subject=Re: Proposal Discussion - ${company}" class="btn">Reply to Engineering Team</a>
          </div>
        </div>
        
        <div class="footer">
          <p>TOS Lanka Co. (Pvt.) Ltd.<br>Block "B", Export Processing Zone, Biyagama, 11672, Sri Lanka</p>
          <p>ISO 9001 • ISO 14001 • ISO 45001</p>
        </div>
      </div>
    </body>
  </html>
  `;
}
