'use client';

import { useState } from 'react';
import SocialLinks from '@/components/SocialLinks';

export default function About() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加表单提交逻辑
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* About 部分 */}
        <section className="mb-20 md:mb-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* 左侧：文字内容 */}
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                About
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                ASBEEL/D4nn9
              </h2>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                Electronic music producer, Beatmaker, DJ based in London. I do Bass/Leftfield/Trap/Drill music. Originally from Shenzhen, China.
              </p>
              
              {/* 社交链接 */}
              <div className="flex gap-4">
                <SocialLinks />
              </div>
            </div>

            {/* 右侧：图片占位符 */}
            <div className="relative">
              <div className="bg-gray-900/50 backdrop-blur-sm h-96 md:h-[500px] rounded border border-gray-800/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 transform rotate-45" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/10 transform -rotate-45" />
                </div>
                <p className="text-gray-400 text-sm">艺术家照片占位符</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact 部分 */}
        <section>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* 左侧：联系表单 */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Contact
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-400 text-sm mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800/50 rounded px-4 py-2 text-white focus:outline-none focus:border-gray-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-400 text-sm mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800/50 rounded px-4 py-2 text-white focus:outline-none focus:border-gray-700 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
                      Email <span className="text-white">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800/50 rounded px-4 py-2 text-white focus:outline-none focus:border-gray-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-400 text-sm mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800/50 rounded px-4 py-2 text-white focus:outline-none focus:border-gray-700 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-400 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-800/50 rounded px-4 py-2 text-white focus:outline-none focus:border-gray-700 transition-colors resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>

            {/* 右侧：联系信息 */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Contact
              </h2>
              <div className="space-y-6 text-white">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Wechat</p>
                  <p className="text-lg">smokinlonely</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-lg">dzeng001@gold.ac.uk</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Instagram</p>
                  <p className="text-lg">Asbeel24</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
