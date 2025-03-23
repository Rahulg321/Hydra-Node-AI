import Image from "next/image";

const certifications = [
  { name: "Cisco", width: 100, logoSrc: "/logos/cisco-logo.png" },
  { name: "AWS", width: 100, logoSrc: "/logos/aws-logo.png" },
  { name: "NVIDIA", width: 120, logoSrc: "/logos/nvidia-logo.png" },
  { name: "Google", width: 110, logoSrc: "/logos/google-logo.png" },
  { name: "Oracle", width: 90, logoSrc: "/logos/oracle-logo.png" },
  { name: "Microsoft", width: 90, logoSrc: "/logos/microsoft-logo.png" },
];

export default function CertificationsLogo() {
  return (
    <section className="w-full bg-black py-12 text-white md:py-16">
      <div className="container mx-auto px-4">
        <h5 className="mb-12 text-center text-gray-400">
          Our popular certifications
        </h5>

        <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex h-12 items-center justify-center"
            >
              <Image
                src={cert.logoSrc || ""}
                alt={`${cert.name} logo`}
                width={cert.width}
                height={48}
                className="opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
