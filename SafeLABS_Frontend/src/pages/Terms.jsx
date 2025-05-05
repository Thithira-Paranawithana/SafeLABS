
import React from "react";

const Terms = () => {
  return (
    <div className="terms-page bg-[#0A192F] min-h-screen py-10 px-5 text-[#E0E0E0] font-sans">
      <div className="terms-container bg-[#112240] rounded-2xl p-8 shadow-lg max-w-5xl mx-auto overflow-x-auto">
        <h1 className="terms-main-header text-white text-4xl mb-8 pl-10 border-l-5 border-l-[#64FFDA]">
          Terms & Privacy Policy
        </h1>

        <div className="terms-content">
          <section className="terms-privacy-section mb-12">
            <h2 className="terms-section-header text-[#64FFDA] text-2xl mb-6">
              Privacy Policy
            </h2>
            <div className="terms-privacy-content bg-[#172A46] rounded-lg p-6 border-l-4 border-l-[#64FFDA]">
              <p className="terms-effective-date text-gray-300 mb-4">
                <strong>Effective Date:</strong> March 14, 2025
              </p>
              <p className="terms-intro mb-6 leading-relaxed">
                Welcome to SafeLABS. This Privacy Policy outlines how we handle your laboratory data and personal information in compliance with applicable regulations.
              </p>

              <div className="terms-policy-details space-y-6">
                <div className="terms-policy-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    1. Information We Collect
                  </h3>
                  <ul className="terms-collection-list list-disc pl-6 space-y-2 text-gray-300">
                    <li>Personal Identifiable Information: Name, email address, employee ID, credentials</li>
                    <li>Lab Usage Data: Equipment usage, resource allocation, lab occupancy times</li>
                    <li>Research Data: Experiment logs, chemical inventory management records</li>
                    <li>System Usage Data: Login information, access patterns, device information</li>
                  </ul>
                </div>

                <div className="terms-policy-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    2. How We Use Your Data
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We use collected data to provide and improve laboratory management services, including resource scheduling, occupancy tracking, experiment monitoring, and ensuring safety compliance within the facility.
                  </p>
                </div>

                <div className="terms-policy-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    3. Data Security
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We implement industry-standard security measures to protect your laboratory and personal information. All data is encrypted both in transit and at rest. Access controls are strictly enforced based on user roles and permissions.
                  </p>
                </div>

                <div className="terms-policy-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    4. Data Sharing
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We do not sell your data. However, we may share anonymized analytical data with trusted partners for system optimization. Experiment and chemical data may be shared with regulatory authorities as required by law.
                  </p>
                </div>

                <div className="terms-policy-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    5. Your Rights
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    You have the right to access, update, or request deletion of your personal data. For any concerns or data requests, contact us at <a href="mailto:privacy@SafeLABS.com" className="text-[#64FFDA] underline hover:text-opacity-80">privacy@SafeLABS.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="terms-conditions-section">
            <h2 className="terms-section-header text-[#64FFDA] text-2xl mb-6">
              Terms and Conditions
            </h2>
            <div className="terms-conditions-content bg-[#172A46] rounded-lg p-6 border-l-4 border-l-[#64FFDA]">
              <p className="terms-conditions-intro text-gray-300 mb-6 leading-relaxed">
                By using SafeLABS, you agree to comply with the following terms and conditions.
              </p>

              <div className="terms-conditions-details space-y-6">
                <div className="terms-condition-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    1. Acceptable Use
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    The services provided by SafeLABS are strictly for authorized laboratory personnel. Users must comply with all laboratory safety protocols and institutional policies. Misuse of the system or falsification of laboratory data is strictly prohibited.
                  </p>
                </div>

                <div className="terms-condition-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    2. User Responsibilities
                  </h3>
                  <ul className="terms-responsibilities-list list-disc pl-6 space-y-2 text-gray-300">
                    <li>Maintain the confidentiality of their login credentials</li>
                    <li>Report any security concerns or system malfunctions immediately</li>
                    <li>Keep resource bookings and lab occupancy information accurate</li>
                    <li>Record chemical usage and waste disposal according to regulations</li>
                    <li>Follow all safety procedures when using laboratory equipment</li>
                  </ul>
                </div>

                <div className="terms-condition-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    3. System Access
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Access to SafeLABS is granted based on user roles and permissions. Unauthorized access attempts or credential sharing will result in immediate account suspension and possible disciplinary action.
                  </p>
                </div>

                <div className="terms-condition-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    4. Limitation of Liability
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    SafeLABS is not liable for any damages resulting from system downtime, data loss, or consequences of erroneous data entry. Users are responsible for verifying critical information and maintaining appropriate backup procedures for experimental data.
                  </p>
                </div>

                <div className="terms-condition-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    5. Regulatory Compliance
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Users must ensure all activities recorded in the system comply with relevant chemical safety, waste management, and laboratory regulations. The system is designed to facilitate compliance but ultimate responsibility remains with the users and laboratory administrators.
                  </p>
                </div>

                <div className="terms-condition-section">
                  <h3 className="terms-subsection-header text-xl text-[#64FFDA] mb-4">
                    6. Changes to Terms
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We reserve the right to modify these Terms and Conditions. Users will be notified of significant changes, and continued use signifies acceptance of updated terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer className="terms-footer mt-12 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2025 SafeLABS. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Terms;