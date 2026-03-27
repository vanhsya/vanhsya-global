import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'Complete Guide to Canada Express Entry 2024',
    excerpt: "Everything you need to know about Canada's Express Entry system, including CRS score requirements, draw updates, and application tips.",
    author: 'Immigration Expert',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Canada',
    tags: ['Express Entry', 'Canada', 'Immigration'],
  },
  {
    id: 2,
    title: 'Australia PR vs Canada PR: Which is Better?',
    excerpt: 'Comprehensive comparison of permanent residency programs in Australia and Canada, including processing times, costs, and benefits.',
    author: 'Migration Specialist',
    date: '2024-01-12',
    readTime: '12 min read',
    category: 'Comparison',
    tags: ['Australia', 'Canada', 'PR'],
  },
  {
    id: 3,
    title: 'Top 10 In-Demand Jobs for Immigration in 2024',
    excerpt: 'Discover the most sought-after professions that can fast-track your immigration process to popular destinations.',
    author: 'Career Advisor',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Career',
    tags: ['Jobs', 'Skills', 'Immigration'],
  },
  {
    id: 4,
    title: 'Student Visa Success Stories: Real Experiences',
    excerpt: 'Inspiring stories from students who successfully obtained visas and are now studying in their dream countries.',
    author: 'Student Counselor',
    date: '2024-01-08',
    readTime: '10 min read',
    category: 'Success Stories',
    tags: ['Student Visa', 'Success', 'Education'],
  },
  {
    id: 5,
    title: "German EU Blue Card: Complete Application Guide",
    excerpt: "Step-by-step guide to applying for Germany's EU Blue Card, including eligibility requirements and processing timeline.",
    author: 'Europe Specialist',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Germany',
    tags: ['Germany', 'EU Blue Card', 'Work Visa'],
  },
  {
    id: 6,
    title: 'Common Immigration Mistakes to Avoid',
    excerpt: 'Learn about the most common mistakes applicants make during the immigration process and how to avoid them.',
    author: 'Legal Advisor',
    date: '2024-01-03',
    readTime: '5 min read',
    category: 'Tips',
    tags: ['Mistakes', 'Tips', 'Application'],
  },
];

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) notFound();

  const post = blogPosts.find(p => p.id === id);
  if (!post) notFound();

  return (
    <div className="min-h-screen text-white">
      <Navigation />

      <main className="container-max pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/blog"
              className="text-sm font-black text-purple-200 hover:text-white transition-colors"
            >
              Back to Blog
            </Link>
            <div className="text-xs text-white/50">
              {post.category}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-8">
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <article className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-10">
            <p className="text-lg text-slate-200 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="space-y-6 text-slate-200 leading-relaxed">
              <p>
                This article is part of the VANHSYA knowledge base. It’s designed to help you understand the decision points,
                document requirements, and common pitfalls before you start your application.
              </p>
              <p>
                For a personalized path, use the eligibility tools and then follow the recommended checklist. If you’re unsure about
                your best route, the consultation flow is the fastest way to confirm strategy before you invest time and money.
              </p>
              <p>
                Always verify requirements with official government sources and keep your documents consistent across forms,
                resumes, and supporting evidence.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="neo-badge neo-badge-popular"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
