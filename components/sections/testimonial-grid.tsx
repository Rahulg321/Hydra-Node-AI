import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Testimonial data
const testimonials = [
  {
    quote:
      "Aligno has simplified project management for us—everything we need in one place!",
    name: "Emma James",
    company: "DigitalEdge",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "The real-time collaboration feature has transformed the way we work globally.",
    name: "Michael Davis",
    company: "CreativeCrew",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote: "Our team productivity has skyrocketed since switching to Aligno!",
    name: "Rachel Kim",
    company: "DevSync",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "Managing global teams has never been easier thanks to Aligno's real-time features.",
    name: "David Foster",
    company: "NextGen Solutions",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote: "We love how easy it is to customize Aligno for our specific needs.",
    name: "Isabella White",
    company: "StartUpWorks",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "Aligno's user-friendly interface helped our team get started quickly, no learning curve!",
    name: "Olivia Turner",
    company: "DesignHub",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "The advanced analytics have given us better insight into project performance than ever.",
    name: "Jonathan Reed",
    company: "DataDrive",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "Aligno's customizable features made it the perfect fit for our growing business.",
    name: "Samantha Lee",
    company: "BrightStar Studios",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "Aligno's sprint management tools made tracking our progress effortless!",
    name: "Liam Cooper",
    company: "Innovatex",
    avatar: "/placeholder.svg?height=60&width=60",
  },
];

export default function TestimonialGrid() {
  return (
    <div className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="transducer-font mb-16 text-center text-4xl font-bold md:text-5xl">
          PEOPLE CANT STOP TALKING ABOUT US
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 backdrop-blur-sm"
            >
              <p className="mb-6 flex-grow text-gray-400">
                {testimonial.quote}
              </p>

              <div className="flex items-center">
                <div className="mr-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
