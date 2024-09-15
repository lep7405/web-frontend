const Footer = () => {
  return (
    <div className="w-full bg-gray-800 text-white">
      <div className="w-[80%] mx-auto p-6 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Company Name</h2>
          <p className="mb-2">123 Main Street, City, Country</p>
          <p className="mb-2">Email: contact@company.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <ul>
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 text-center py-2">
        <p className="text-sm">© {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
