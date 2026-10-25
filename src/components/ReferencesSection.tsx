import React, { useState, useMemo } from 'react';
import { 
  BookOpen, ExternalLink, Search, Copy, Check, 
  Sparkles, Award, ArrowUpRight, ShieldCheck, Bookmark, FileText, Globe
} from 'lucide-react';
import { REFERENCES_10, ReferenceItem } from '../data/references10';

export const ReferencesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const publishers = useMemo(() => {
    return Array.from(new Set(REFERENCES_10.map(r => r.publisherType)));
  }, []);

  const filteredReferences = useMemo(() => {
    return REFERENCES_10.filter(item => {
      const matchPub = selectedPublisher === 'all' || item.publisherType === selectedPublisher;
      const term = searchTerm.toLowerCase();
      const matchSearch = !term || 
        item.authors.toLowerCase().includes(term) ||
        item.title.toLowerCase().includes(term) ||
        String(item.year).includes(term) ||
        item.appliedInProject.toLowerCase().includes(term) ||
        item.notes.toLowerCase().includes(term);
      return matchPub && matchSearch;
    });
  }, [searchTerm, selectedPublisher]);

  const handleCopyCitation = (item: ReferenceItem) => {
    const citation = `${item.authors} (${item.year}). ${item.title}. ${item.publication}. ${item.doi || item.directUrl}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getPublisherBadge = (type: ReferenceItem['publisherType']) => {
    switch (type) {
      case 'Springer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      case 'Wiley':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700';
      case 'SAGE':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'Harvard':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-700';
      case 'Government':
        return 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-300 dark:border-red-700';
      case 'GoogleBooks':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      case 'OpenAccess':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700';
      case 'AcademicPDF':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  return (
    <section id="tailieuthamkhao" className="w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 font-ui">
            <Bookmark size={13} />
            CƠ SỞ KHOA HỌC & HỌC THUẬT
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
            Danh Mục Tài Liệu Tham Khảo (Chuẩn APA)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Hệ thống 10 tài liệu khoa học nền tảng định hình cơ sở lý luận, phương pháp trắc lượng và công nghệ AI cho đề tài FMATH12, tích hợp liên kết trực tiếp tới các nhà xuất bản uy tín (Springer, Wiley, SAGE, Harvard, Thư viện pháp luật).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Tổng cộng: 10 Nguồn Hàn Lâm
          </span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm tác giả, năm, từ khóa, ứng dụng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">Tất cả nguồn xuất bản</option>
            {publishers.map((pub) => (
              <option key={pub} value={pub}>{pub}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reference Cards List */}
      <div className="space-y-4">
        {filteredReferences.map((item) => (
          <div 
            key={item.id}
            className="group relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all duration-200 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-heading font-black text-sm flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800/60">
                  {item.id}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-ui uppercase tracking-wider">
                      {item.authors}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ({item.year})
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${getPublisherBadge(item.publisherType)}`}>
                      {item.publisherType}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {item.publication}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                <button
                  onClick={() => handleCopyCitation(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
                  title="Sao chép trích dẫn APA"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Trích dẫn</span>
                    </>
                  )}
                </button>

                <a
                  href={item.directUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xs shadow-blue-500/20 transition"
                >
                  <span>Mở Link Trực Tiếp</span>
                  <ExternalLink size={13} />
                </a>

                {item.backupUrl && (
                  <a
                    href={item.backupUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 transition"
                    title="Liên kết phụ (Cổng thông tin / ERIC)"
                  >
                    <Globe size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Note & Applied in Project */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/50">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FileText size={12} className="text-slate-400" />
                  Ý nghĩa học thuật & Lý luận
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.notes}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/40">
                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-blue-500" />
                  Hiện thực hóa trong phần mềm FMATH12
                </p>
                <p className="text-blue-900 dark:text-blue-200 leading-relaxed font-medium">
                  {item.appliedInProject}
                </p>
              </div>
            </div>

            {/* DOI Link pill if available */}
            {item.doi && (
              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 font-mono">
                <span>DOI định danh:</span>
                <a 
                  href={item.doi} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-500 hover:underline inline-flex items-center gap-1"
                >
                  {item.doi}
                  <ArrowUpRight size={11} />
                </a>
              </div>
            )}
          </div>
        ))}

        {filteredReferences.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500">Không tìm thấy tài liệu nào khớp với từ khóa tìm kiếm.</p>
          </div>
        )}
      </div>
    </section>
  );
};
