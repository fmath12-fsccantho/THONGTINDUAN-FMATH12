import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, Search, Download, Eye, FileSpreadsheet,
  CheckCircle2, Sparkles, X, ChevronLeft, ChevronRight,
  School, Clock, Award, ShieldCheck, BarChart3, Table, ExternalLink
} from 'lucide-react';
import { teacherSurveyExp35, TeacherExpSurveyRow, EXP_QUESTIONS } from '../data/teacherSurveyExp35';

export const TeacherExpSurveySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [freqFilter, setFreqFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherExpSurveyRow | null>(null);

  const schools = useMemo(() => {
    const list = Array.from(new Set(teacherSurveyExp35.map(r => r.school))).filter(Boolean);
    return list.sort();
  }, []);

  const frequencies = useMemo(() => {
    const list = Array.from(new Set(teacherSurveyExp35.map(r => r.frequency))).filter(Boolean);
    return list.sort();
  }, []);

  const filteredData = useMemo(() => {
    return teacherSurveyExp35.filter((r) => {
      const matchSchool = schoolFilter === 'all' || r.school === schoolFilter;
      const matchFreq = freqFilter === 'all' || r.frequency === freqFilter;
      const term = searchTerm.toLowerCase();
      const matchSearch = !term ||
        r.school.toLowerCase().includes(term) ||
        r.frequency.toLowerCase().includes(term) ||
        (r.qAiExperience && r.qAiExperience.toLowerCase().includes(term)) ||
        (r.qFeedback && r.qFeedback.toLowerCase().includes(term));
      return matchSchool && matchFreq && matchSearch;
    });
  }, [schoolFilter, freqFilter, searchTerm]);

  // Aggregate stats
  const stats = useMemo(() => {
    const total = teacherSurveyExp35.length;
    const avgOverall = (teacherSurveyExp35.reduce((acc, r) => acc + r.avgScore, 0) / total).toFixed(2);
    const avgWeb = (teacherSurveyExp35.reduce((acc, r) => acc + r.groupWebAvg, 0) / total).toFixed(2);
    const avgAi = (teacherSurveyExp35.reduce((acc, r) => acc + r.groupAiAvg, 0) / total).toFixed(2);
    const avgContent = (teacherSurveyExp35.reduce((acc, r) => acc + r.groupContentAvg, 0) / total).toFixed(2);
    const avgImpact = (teacherSurveyExp35.reduce((acc, r) => acc + r.groupImpactAvg, 0) / total).toFixed(2);
    return { total, avgOverall, avgWeb, avgAi, avgContent, avgImpact };
  }, []);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Export CSV
  const handleExportCSV = () => {
    const header = [
      'STT', 'Timestamp', 'Trường THPT', 'Tần suất sử dụng',
      'TB Phù hợp Web', 'TB Cá nhân hóa AI', 'TB Học liệu TT32', 'TB Hiệu quả dạy học',
      'Điểm TB Chung', 'Trải nghiệm AI & Radar', 'Đề xuất góp ý'
    ];
    const rows = filteredData.map(r => [
      r.id,
      `"${r.timestamp}"`,
      `"${r.school}"`,
      `"${r.frequency}"`,
      r.groupWebAvg,
      r.groupAiAvg,
      r.groupContentAvg,
      r.groupImpactAvg,
      r.avgScore,
      `"${(r.qAiExperience || '').replace(/"/g, '""')}"`,
      `"${(r.qFeedback || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = '\uFEFF' + [header.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Khao_Sat_Thuc_Nghiem_Giao_Vien_FMATH12_${filteredData.length}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="thucnghiem-giaovien" className="w-full space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 font-ui">
            <GraduationCap size={13} />
            THỰC NGHIỆM SƯ PHẠM — PHÂN HỆ GIÁO VIÊN
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
            Khảo Sát Thực Nghiệm Giáo Viên (35 Phiếu Đầy Đủ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Đánh giá chuyên môn từ 35 thầy cô giáo dạy Toán THPT tại các trường THPT Cần Thơ về phân hệ giáo viên, ngân hàng đề TT32, radar chart năng lực học sinh và trợ lý AI gợi mở từng bước.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfqUwR95kBsl7b2SyjqGZ-pL88vNUDftG2NqQ453lBuRUDA0g/viewform?usp=header"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800/60 shadow-xs transition active:scale-[0.98]"
            title="Mở biểu mẫu khảo sát thực nghiệm giáo viên trên Google Forms"
          >
            <ExternalLink size={13} className="text-purple-600 dark:text-purple-400" />
            <span>Form Khảo Sát Gốc (Google Form)</span>
          </a>

          <a
            href="/Thuc_Nghiem_Giao_Vien_35.xlsx"
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700/60 shadow-xs transition"
          >
            <FileSpreadsheet size={14} />
            <span>Tải Excel Gốc (35 Dòng)</span>
          </a>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs transition"
          >
            <Download size={14} />
            <span>Xuất CSV ({filteredData.length})</span>
          </button>
        </div>
      </div>

      {/* Aggregate KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Đánh Giá Chung GV</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-emerald-600 dark:text-emerald-400">
              {stats.avgOverall}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 5.0</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
            <CheckCircle2 size={11} /> 100% Đồng thuận
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Giao Diện & Vận Hành</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">
              {stats.avgWeb}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 5.0</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Dễ giao bài, chấm tự động</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">AI & Radar Chart</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-indigo-600 dark:text-indigo-400">
              {stats.avgAi}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 5.0</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Phản hồi sư phạm chuẩn</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Học Liệu & Đề Thi</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-amber-600 dark:text-amber-400">
              {stats.avgContent}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 5.0</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Phân hóa & chuẩn xác</p>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Hỗ Trợ Giảng Dạy</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-blue-600 dark:text-blue-400">
              {stats.avgImpact}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 5.0</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Giảm tải chấm bài, quản lý tốt</p>
        </div>
      </div>

      {/* Control bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo trường, tần suất, ý kiến đóng góp..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <select
            value={schoolFilter}
            onChange={(e) => { setSchoolFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">Tất cả các trường THPT ({schools.length})</option>
            {schools.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={freqFilter}
            onChange={(e) => { setFreqFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">Tất cả tần suất</option>
            {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {/* TABLE VIEW */}
      <div className="space-y-4">
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider font-heading">
                <th className="py-3.5 px-3 text-center w-12">#</th>
                <th className="py-3.5 px-3 min-w-[170px]">Trường Giảng Dạy</th>
                <th className="py-3.5 px-3 min-w-[140px]">Tần suất sử dụng</th>
                <th className="py-3.5 px-3 text-center min-w-[95px]">Vận hành Web</th>
                <th className="py-3.5 px-3 text-center min-w-[95px]">Cá nhân AI</th>
                <th className="py-3.5 px-3 text-center min-w-[95px]">Ngân hàng Đề</th>
                <th className="py-3.5 px-3 text-center min-w-[95px]">Tác động Dạy</th>
                <th className="py-3.5 px-3 text-center min-w-[85px]">Điểm TB</th>
                <th className="py-3.5 px-3 text-center w-20">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {paginatedData.map((row) => (
                <tr 
                  key={row.id}
                  className="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors"
                >
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-400">
                    {row.id}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-100">
                    {row.school}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-medium">
                      <Clock size={11} className="text-slate-400" />
                      {row.frequency}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-700 dark:text-slate-200">
                    {row.groupWebAvg}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {row.groupAiAvg}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                    {row.groupContentAvg}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                    {row.groupImpactAvg}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full font-mono font-bold text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {row.avgScore}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => setSelectedTeacher(row)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400 transition"
                      title="Xem toàn bộ phiếu đánh giá"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-2">
          <div className="flex items-center gap-2">
            <span>Hiển thị</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium focus:outline-none"
            >
              <option value={20}>20 dòng</option>
              <option value={35}>Tất cả 35 dòng</option>
            </select>
            <span>trên tổng số <strong className="text-slate-800 dark:text-slate-200">{filteredData.length}</strong> giáo viên</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="px-3 py-1 font-mono font-medium">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CHI TIẾT 1 GIÁO VIÊN */}
      {selectedTeacher && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedTeacher(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                  #{selectedTeacher.id}
                </span>
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                    Chi Tiết Đánh Giá Thực Nghiệm Của Giáo Viên
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {selectedTeacher.school} • Tần suất dùng: {selectedTeacher.frequency}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTeacher(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">Điểm Đánh Giá Trung Bình:</span>
                <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {selectedTeacher.avgScore} / 5.0
                </span>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                  Bảng Điểm 19 Tiêu Chí Đánh Giá Của Giáo Viên:
                </p>
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {EXP_QUESTIONS.map((q, idx) => {
                    const score = selectedTeacher.scores[idx] || 0;
                    return (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-700 dark:text-slate-300 pr-2 leading-relaxed">{q}</span>
                        <span className="font-mono font-black text-xs px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                          {score} ★
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedTeacher.qAiExperience && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Đánh giá về Chatbot AI gợi mở & Biểu đồ Radar:</p>
                  <p className="text-slate-600 dark:text-slate-400 italic">"{selectedTeacher.qAiExperience}"</p>
                </div>
              )}

              {selectedTeacher.qFeedback && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Đề xuất hoàn thiện:</p>
                  <p className="text-slate-600 dark:text-slate-400 italic">"{selectedTeacher.qFeedback}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
