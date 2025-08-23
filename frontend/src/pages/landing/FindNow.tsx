import Reveal from './Reveal';
import { Button } from '@/components/ui/button';

export default function FindNow() {
  return (
    <div className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <Reveal direction='up'>
            <h1 className="font-montserrat text-2xl sm:text-md lg:text-2xl xl:text-4xl font-black text-gray-900 leading-tight">
              Ready To Find Your
              <br />
              Hacker House Crew?
            </h1>
            </Reveal>
          </div>
          
          {/* Button */}
          <div className="flex-shrink-0">
            <Reveal direction='up'>
            <Button 
              size="lg" 
              className="font-inter bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Find Now
            </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}