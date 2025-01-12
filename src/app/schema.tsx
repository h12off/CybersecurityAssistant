export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI-Powered Cybersecurity Assistant",
    "applicationCategory": "SecurityApplication",
    "description": "Expert cybersecurity guidance with AI-powered real-time threat analysis and security best practices",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Salma Ait Nassir"
    },
    "keywords": "cybersecurity, AI security, threat analysis, security guidance, cybersecurity expert, security best practices",
    "softwareVersion": "1.0.0"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
