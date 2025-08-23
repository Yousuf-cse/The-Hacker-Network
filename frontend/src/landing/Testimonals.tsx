import Reveal from './Reveal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const Testimonials = () => {
  const testimonials = [
    {
      quote: "Hacker House helped me find teammates who think big, work hard, and actually want to co-live and build",
      author: "Yash",
      title: "founder of Rezime",
      avatar: "/api/placeholder/40/40"
    },
    {
      quote: "I always wanted to find people who were as passionate about building and living together as I was. Through The Hacker Network, I not only found my perfect team, but also made friends for life. The energy in our group is incredible—we're already planning our first real project together!",
      author: "Zinat Sultana",
      title: "College Student",
      avatar: "/api/placeholder/40/40"
    },
    {
      quote: "The platform's matching was spot-on. I never thought forming a hacker house with ambitious students beyond my campus would be this easy",
      author: "asis",
      title: "college Student",
      avatar: "/api/placeholder/40/40"
    }
  ];

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <Reveal direction='up'>
        <h2 className="font-montserrat text-2xl md:text-3xl lg:text-5xl font-bold text-gray-800 text-center mb-16 leading-tight">
          Why Founders Love Hacker House
        </h2>
        </Reveal>
        
        {/* Testimonials Grid */}
        <Reveal direction='up'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              {/* Quote */}
              <blockquote className="text-gray-900 text-base lg:text-lg leading-relaxed mb-6 font-normal">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
                    {testimonial.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Testimonials;