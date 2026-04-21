import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 text-gray-700">
      <h1 className="text-3xl font-bold text-black">Privacy Policy</h1>

      <p>
        At Camz Cleaning, we are committed to protecting the privacy and personal information of our
        customers, website visitors, and individuals who contact us for residential, commercial,
        vehicle, or seasonal property cleaning services. This Privacy Policy explains how we
        collect, use, disclose, and safeguard your information when you visit our website, submit a
        contact form, request a quote, or communicate with our team.
      </p>

      <p>
        By using our website or providing your information to Camz Cleaning, you agree to the
        practices outlined in this Privacy Policy.
      </p>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">Information We Collect</h2>
        <p className="mb-3">
          When you contact us or request a quote for our cleaning services, we may collect personal
          information that helps us respond to your inquiry and provide our services effectively.
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Full name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Property or service location</li>
          <li>Details about the cleaning service requested</li>
          <li>Preferred appointment date and time</li>
          <li>Any additional information you choose to provide</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To respond to inquiries and quote requests</li>
          <li>To provide estimates for cleaning services</li>
          <li>To schedule and manage appointments</li>
          <li>To communicate about services</li>
          <li>To provide customer support</li>
          <li>To improve website and service quality</li>
          <li>To maintain business records</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">
          Advertising, Lead Forms, and Marketing
        </h2>
        <p>
          Camz Cleaning may advertise through platforms like Google, Facebook, and Instagram. If you
          submit your information through ads or forms, your details may be shared with us so we can
          contact you regarding your request.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">Sharing of Information</h2>
        <p>
          Camz Cleaning does not sell or trade personal information. We may only share information
          with authorized team members, service providers, or when required by law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">Data Security</h2>
        <p>
          We take reasonable measures to protect your information. However, no method of data
          transmission or storage can be guaranteed to be completely secure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">Third-Party Websites</h2>
        <p>
          Our website may contain links to third-party sites. We are not responsible for their
          privacy practices and encourage you to review their policies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">Cookies and Website Usage</h2>
        <p>
          We may use cookies to improve website functionality and user experience. You can disable
          cookies in your browser settings if you prefer.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">Policy Updates</h2>
        <p>
          This Privacy Policy may be updated from time to time. Any changes will be posted on this
          page with the updated date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black mb-2">Contact Us</h2>
        <p>Camz Cleaning</p>
        <p>Calgary, Alberta, Canada</p>
        <p>Email: info@camzcleaning.com</p>
        <p>Phone: +1 587-837-1977</p>
      </section>
    </div>
  );
}
