import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, Search, Download, Eye, FileSpreadsheet,
  CheckCircle2, AlertCircle, Sparkles, X, ChevronLeft, ChevronRight,
  School, Clock, Award, ShieldCheck, ExternalLink
} from 'lucide-react';
import { teacherSurvey35, TeacherSurveyRow } from '../data/teacherSurvey35';

export const TeacherSurveySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [expFilter, setExpFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherSurveyRow | null>(null);

  const schools = useMemo(() => {
    const list = Array.from(new Set(teacherSurvey35.map(r => r.school))).filter(Boolean);
    return list.sort();
  }, []);

  const filteredData = useMemo(() => {
    return teacherSurvey35.filter((r) => {
      const matchSchool = schoolFilter === 'all' || r.school === schoolFilter;
      const matchExp = expFilter === 'all' || r.experience === expFilter;
      const matchDiff = diffFilter === 'all' || String(r.difficultyTrack) === diffFilter;

      const term = searchTerm.toLowerCase();
      const matchSearch = !term ||
        r.school.toLowerCase().includes(term) ||
        r.experience.toLowerCase().includes(term) ||
        r.homeworkChallenges.toLowerCase().includes(term) ||
        r.platformWeaknesses.toLowerCase().includes(term) ||
        r.desiredFeatures.toLowerCase().includes(term) ||
        r.feedback.toLowerCase().includes(term);

      return matchSchool && matchExp && matchDiff && matchSearch;
    });
  }, [searchTerm, schoolFilter, expFilter, diffFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleExportCSV = () => {
    const headers = [
      "STT", "Thời gian", "Trường THPT", "Kinh nghiệm", "Độ khó theo dõi cá nhân hóa (1-5)",
      "Khó khăn giao BTVN", "Đánh giá công cụ hiện tại (1-5)", "Hạn chế cốt lõi",
      "AI đưa sẵn làm giảm tư duy (A)", "Gia sư AI Scaffolding tốt hơn (B)", "Cần biểu đồ năng lực lớp (C)",
      "Tính năng mong muốn cho GV", "Góp ý / Kỳ vọng"
    ];

    const rows = filteredData.map((r, i) => [
      i + 1,
      `"${r.timestamp}"`,
      `"${r.school}"`,
      `"${r.experience}"`,
      r.difficultyTrack,
      `"${r.homeworkChallenges.replace(/"/g, '""')}"`,
      r.currentToolsRating,
      `"${r.platformWeaknesses.replace(/"/g, '""')}"`,
      r.agreeA_aiHarmsThinking,
      r.agreeB_scaffoldingBetter,
      r.agreeC_needClassStats,
      `"${r.desiredFeatures.replace(/"/g, '""')}"`,
      `"${r.feedback.replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(",")].concat(rows.map(e => e.join(","))).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Khao_Sat_Thuc_Trang_Giao_Vien_FMATH12_${filteredData.length}_Dong.csv`;
    link.click();
  };

  return (
    <section id="khao-sat-giao-vien" className="w-full space-y-6 pt-4">
      {/* Header of Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 font-ui">
            <GraduationCap size={13} />
            DỮ LIỆU CHUYÊN GIA SƯ PHẠM (N = 35)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
            Kết Quả Khảo Sát Thực Trạng Giáo Viên
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Công bố toàn bộ <strong className="text-emerald-600 dark:text-emerald-400">35 dòng dữ liệu khảo sát gốc</strong> từ quý thầy cô giảng dạy môn Toán cấp THPT tại TP. Cần Thơ.
          </p>
        </div>

        {/* Action Downloads */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSenuPY4c57LB4vgwAsHlO1ln5sBQecebtBs3OC23But5VPnQA/viewform?usp=header"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800/60 shadow-xs transition active:scale-[0.98]"
            title="Mở biểu mẫu khảo sát thực trạng giáo viên trên Google Forms"
          >
            <ExternalLink size={13} className="text-purple-600 dark:text-purple-400" />
            <span>Form Khảo Sát Gốc (Google Form)</span>
          </a>

          <a
            href="/Khao_Sat_Giao_Vien_35.xlsx"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-600/20 transition active:scale-[0.98]"
            title="Tải toàn bộ file Excel khảo sát giáo viên gốc"
          >
            <FileSpreadsheet size={15} />
            <span>Tải File Excel GV (.xlsx)</span>
          </a>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs transition active:scale-[0.98]"
            title="Xuất bảng dữ liệu giáo viên hiện tại thành tệp CSV"
          >
            <Download size={14} />
            <span>Xuất CSV ({filteredData.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Số Thầy/Cô Khảo Sát</p>
          <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            35 <span className="text-xs font-normal text-slate-400">giáo viên</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            ✓ 100% đầy đủ dòng
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Ủng Hộ AI Scaffolding</p>
          <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-600 dark:text-emerald-400 mt-1">
            4.60 <span className="text-xs font-normal text-slate-400">/ 5 điểm</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Gợi ý từng bước thay vì giải hộ
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Độ Khó Cá Nhân Hóa</p>
          <div className="text-2xl sm:text-3xl font-black font-heading text-amber-600 dark:text-amber-400 mt-1">
            4.11 <span className="text-xs font-normal text-slate-400">/ 5 điểm</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Sĩ số đông gây khó theo dõi
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Cần Dashboard Lớp</p>
          <div className="text-2xl sm:text-3xl font-black font-heading text-blue-600 dark:text-blue-400 mt-1">
            4.29 <span className="text-xs font-normal text-slate-400">/ 5 điểm</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Tự động thống kê điểm yếu lớp
          </p>
        </div>
      </div>

      {/* Aggregate Teacher Survey Analysis Box */}
      <div className="p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-emerald-200/80 dark:border-emerald-900/50 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-600" />
            <span>Phân Tích Quan Điểm Sư Phạm Của Giáo Viên Môn Toán (N = 35)</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">Dữ liệu thực tế phục vụ báo cáo KHKT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <strong className="text-slate-800 dark:text-slate-200 block border-b border-slate-100 dark:border-slate-800 pb-1.5">
              1. Kinh nghiệm giảng dạy:
            </strong>
            <div className="space-y-1">
              <div className="flex justify-between"><span>Từ 5 - 10 năm kinh nghiệm:</span><strong className="font-mono text-emerald-600">15 GV (42.9%)</strong></div>
              <div className="flex justify-between"><span>Trên 10 năm kinh nghiệm:</span><strong className="font-mono text-blue-600">13 GV (37.1%)</strong></div>
              <div className="flex justify-between"><span>Dưới 5 năm kinh nghiệm:</span><strong className="font-mono text-slate-600">7 GV (20.0%)</strong></div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <strong className="text-slate-800 dark:text-slate-200 block border-b border-slate-100 dark:border-slate-800 pb-1.5">
              2. Khó khăn lớn nhất khi giao BTVN:
            </strong>
            <div className="space-y-1">
              <div className="text-slate-600 dark:text-slate-400">• Mất quá nhiều thời gian để chấm và chữa bài chi tiết cho từng em (88.6%).</div>
              <div className="text-slate-600 dark:text-slate-400">• Học sinh có xu hướng chép lời giải trên mạng/app mà không hiểu bản chất (82.9%).</div>
              <div className="text-slate-600 dark:text-slate-400">• Thiếu công cụ tự động phát hiện chuyên đề học sinh bị hổng (77.1%).</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <strong className="text-slate-800 dark:text-slate-200 block border-b border-slate-100 dark:border-slate-800 pb-1.5">
              3. Tính năng FMATH12 kỳ vọng nhất:
            </strong>
            <div className="space-y-1">
              <div className="text-slate-600 dark:text-slate-400">• Bảng điều khiển (Dashboard) thống kê phổ điểm và chuyên đề lớp yếu (94.3%).</div>
              <div className="text-slate-600 dark:text-slate-400">• Tạo lớp học ảo & giao đề thi thích ứng nhanh chóng (85.7%).</div>
              <div className="text-slate-600 dark:text-slate-400">• Theo dõi lịch sử tương tác AI để biết học sinh bị "bí" ở bước nào (74.3%).</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo trường, kinh nghiệm, từ khóa ý kiến giáo viên..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={schoolFilter}
            onChange={(e) => {
              setSchoolFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">Tất cả các trường ({teacherSurvey35.length})</option>
            {schools.map(sch => (
              <option key={sch} value={sch}>{sch}</option>
            ))}
          </select>

          <select
            value={expFilter}
            onChange={(e) => {
              setExpFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">Kinh nghiệm: Tất cả</option>
            <option value="Trên 10 năm">Trên 10 năm</option>
            <option value="Từ 5 - 10 năm">Từ 5 - 10 năm</option>
            <option value="Dưới 5 năm">Dưới 5 năm</option>
          </select>

          <select
            value={diffFilter}
            onChange={(e) => {
              setDiffFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">Độ khó theo dõi: Tất cả</option>
            <option value="5">Mức 5 (Rất khó khăn)</option>
            <option value="4">Mức 4 (Khó khăn)</option>
            <option value="3">Mức 3 (Bình thường)</option>
            <option value="2">Mức 2 (Ít khó khăn)</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-heading uppercase tracking-wider text-[11px]">
                <th className="p-3 font-bold w-12 text-center">STT</th>
                <th className="p-3 font-bold">Thời gian</th>
                <th className="p-3 font-bold">Trường THPT</th>
                <th className="p-3 font-bold">Kinh Nghiệm</th>
                <th className="p-3 font-bold text-center">Độ Khó Theo Dõi</th>
                <th className="p-3 font-bold text-center">Ủng Hộ Scaffolding</th>
                <th className="p-3 font-bold text-center">Cần Dashboard</th>
                <th className="p-3 font-bold text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    Không tìm thấy dữ liệu giáo viên khớp với bộ lọc.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr 
                    key={row.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-3 text-center font-mono font-bold text-slate-400">
                      {row.id}
                    </td>
                    <td className="p-3 whitespace-nowrap font-mono text-[11px] text-slate-500">
                      {row.timestamp}
                    </td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {row.school}
                    </td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40">
                        {row.experience}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold">
                      <span className="font-mono text-amber-600">{row.difficultyTrack} / 5</span>
                    </td>
                    <td className="p-3 text-center font-bold">
                      <span className="font-mono text-emerald-600">{row.agreeB_scaffoldingBetter} / 5</span>
                    </td>
                    <td className="p-3 text-center font-bold">
                      <span className="font-mono text-blue-600">{row.agreeC_needClassStats} / 5</span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedTeacher(row)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-lg transition"
                        title="Xem toàn bộ phản hồi chi tiết của giáo viên"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Hiển thị <strong className="text-slate-800 dark:text-slate-200">{filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> - <strong className="text-slate-800 dark:text-slate-200">{Math.min(currentPage * pageSize, filteredData.length)}</strong> trên tổng số <strong className="text-emerald-600 dark:text-emerald-400">{filteredData.length}</strong> dòng giáo viên
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase font-heading">
                  Phiếu Khảo Sát Giáo Viên #{selectedTeacher.id}
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-0.5">
                  {selectedTeacher.school}
                </h3>
                <span className="text-xs font-mono text-slate-400">Kinh nghiệm: {selectedTeacher.experience} • Ghi nhận: {selectedTeacher.timestamp}</span>
              </div>
              <button
                onClick={() => setSelectedTeacher(null)}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 font-medium">Độ khó cá nhân hóa:</span>
                <div className="text-base font-bold text-amber-600 mt-1">{selectedTeacher.difficultyTrack} / 5 điểm</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 font-medium">Đánh giá công cụ hiện tại:</span>
                <div className="text-base font-bold text-slate-700 dark:text-slate-300 mt-1">{selectedTeacher.currentToolsRating} / 5 điểm</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/50">
                <span className="text-emerald-700 dark:text-emerald-300 font-medium">Ủng hộ AI Scaffolding:</span>
                <div className="text-base font-bold text-emerald-600 mt-1">{selectedTeacher.agreeB_scaffoldingBetter} / 5 điểm</div>
              </div>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Khó khăn lớn nhất khi giao bài tập về nhà:</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedTeacher.homeworkChallenges || "Không chọn"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Hạn chế cốt lõi của các nền tảng học tập hiện nay:</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedTeacher.platformWeaknesses || "Không chọn"}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10.5px] text-slate-400 block">AI đưa sẵn làm giảm tư duy:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedTeacher.agreeA_aiHarmsThinking} / 5</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10.5px] text-slate-400 block">AI gợi ý Scaffolding tốt hơn:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{selectedTeacher.agreeB_scaffoldingBetter} / 5</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10.5px] text-slate-400 block">Cần vẽ biểu đồ năng lực lớp:</span>
                  <strong className="text-blue-600 dark:text-blue-400">{selectedTeacher.agreeC_needClassStats} / 5</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Tính năng FMATH12 mong muốn nhất dành cho Giáo viên:</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedTeacher.desiredFeatures || "Không chọn"}</p>
              </div>

              {selectedTeacher.feedback && (
                <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/40">
                  <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">Đóng góp / Kỳ vọng thêm của Thầy/Cô:</strong>
                  <p className="text-slate-700 dark:text-slate-300 italic">"{selectedTeacher.feedback}"</p>
                </div>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
