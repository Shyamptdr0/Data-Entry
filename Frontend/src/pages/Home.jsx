import React from 'react'

const Home = () => {
  return (
    <div>
      <div><img src="../../public/Capital Q Tech Services 1.jpg" alt="" /></div>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Capital Q Tech Services</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Your Trusted Partner for Professional Data Entry Solutions
        </p>
      </header>

      {/* About Section */}
      <section className="py-12 px-6 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">About Us</h2>
          <p className="text-lg leading-relaxed">
            At Capital Q Tech Services, we specialize in delivering high-quality
            data entry services tailored to meet the unique needs of businesses
            worldwide. Our dedicated team of experts ensures data accuracy,
            security, and efficiency to empower our clients to focus on their core
            business operations.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Data Entry</h3>
              <p>
                We provide fast and accurate data entry services to help you manage
                your business operations seamlessly.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Data Processing</h3>
              <p>
                Transform raw data into meaningful insights with our efficient data
                processing solutions.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Database Management</h3>
              <p>
                Let us handle your database to ensure consistent, reliable, and
                scalable data management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">
            Get in touch with us for tailored data entry solutions that meet your
            business needs.
          </p>
          <p className="text-lg">
            Email: <a href="mailto:info@capitalqtech.com" className="underline">info@capitalqtech.com</a>
          </p>
          <p className="text-lg">
            Phone: <a href="tel:+1234567890" className="underline">+1 234-567-890</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          © 2024 Capital Q Tech Services. All Rights Reserved.
        </p>
      </footer>
    </div>
 
    </div>
  )
}

export default Home