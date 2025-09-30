import { useState } from 'react';

const faqData = [
  { q: 'How do I request a ride?', a: 'You can request a ride from your dashboard after logging in as a rider.' },
  { q: 'How do I become a driver?', a: 'You can register as a driver from our registration page. Your account will need to be approved by an admin.' },
  { q: 'Is RideX safe?', a: 'Yes, all our drivers are verified, and we offer in-ride safety features.' },
  { q: 'What are the payment methods?', a: 'We currently support cash payments, with credit card options coming soon.' },
];

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqData.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="max-w-2xl mx-auto mb-8">
        <input 
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="max-w-2xl mx-auto space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h3 className="font-semibold text-lg">{faq.q}</h3>
            <p className="text-gray-600 mt-2">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;