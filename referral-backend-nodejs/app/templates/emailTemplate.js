const COMPANY_NAME = `XYZ`;

const ContactBodyForCompany = (name, email, number, message, code) => {
  return `
  Dear,
  A new Query is raised:
  Name: ${name}
  Email: ${email} 
  Phone number: ${number}
  Message: ${message}
  Referral code: ${code.length > 0 ? code : "No referral used"}
  `;
};

const ReferralCodeUsed = (name, email, code) => {
  return `
  Dear,
  A new Query is raised on ${COMPANY_NAME} with your referral Code:
  Name: ${name}
  Email: ${email} 
  Referral code: ${code}
  `;
};

const ReferralCreated = (name, referral) => {
  return `
  Dear ${name},
  ${COMPANY_NAME} created a referral code for you: ${referral}

  Thank you and Regards,
  ${COMPANY_NAME}
  `;
};

module.exports = {
  ContactBodyForCompany,
  ReferralCodeUsed,
  ReferralCreated,
};
