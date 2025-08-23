import Reveal from './Reveal'
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Title */}
        <Reveal direction='up'>
        <h2 className="font-brand text-2xl font-semibold text-gray-900 mb-8">
          The Hacker Network
        </h2>
        </Reveal>
        
        {/* Social Icons */}
        <Reveal direction='up'>
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="#" 
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="YouTube"
          >
            <Youtube size={24} />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
        </div>
        </Reveal>
        
        {/* Copyright */}
        <Reveal direction='up'>
        <div className="font-lightItalic text-sm text-gray-500">
          © {new Date().getFullYear()} The Hacker Network. All rights reserved.
        </div>
        </Reveal>
      </div>
    </footer>
  )
}