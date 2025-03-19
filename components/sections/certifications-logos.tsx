import Image from "next/image";

const certifications = [
  { name: "Cisco", width: 100 },
  { name: "Microsoft", width: 120 },
  { name: "NVIDIA", width: 120 },
  { name: "Google", width: 110 },
  { name: "Oracle", width: 130 },
  { name: "AWS", width: 90 },
];

export default function CertificationsLogo() {
  return (
    <section className="w-full bg-black py-12 text-white md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-2xl font-medium md:text-3xl">
          Our popular certifications
        </h2>

        <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex h-12 items-center justify-center"
            >
              <Image
                src={`/placeholder.svg?height=48&width=${cert.width}&text=${cert.name}`}
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
