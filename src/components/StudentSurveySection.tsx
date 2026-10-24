import React, { useState, useMemo } from 'react';
import { 
  Users, Search, Filter, Download, ArrowUpDown, Eye, 
  CheckCircle2, AlertTriangle, Sparkles, X, ChevronLeft, ChevronRight,
  School, Laptop, Clock, Star, HelpCircle, FileSpreadsheet,
  BarChart3, Table, PieChart, Layers, Award
} from 'lucide-react';
import { studentSurvey574, StudentSurveyRow } from '../data/studentSurvey574';

export const StudentSurveySection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'charts'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [needFilter, setNeedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedStudent, setSelectedStudent] = useState<StudentSurveyRow | null>(null);

  // List of unique schools
  const schools = useMemo(() => {
    const list = Array.from(new Set(studentSurvey574.map(r => r.school))).filter(Boolean);
    return list.sort();
  }, []);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return studentSurvey574.filter((r) => {
      const matchSchool = schoolFilter === 'all' || r.school === schoolFilter;
      const matchScore = scoreFilter === 'all' || r.scoreRange === scoreFilter;
      const matchNeed = needFilter === 'all' || String(r.needFMath12) === needFilter;
      
      const term = searchTerm.toLowerCase();
      const matchSearch = !term || 
        r.school.toLowerCase().includes(term) ||
        r.scoreRange.toLowerCase().includes(term) ||
        r.device.toLowerCase().includes(term) ||
        r.difficulties.toLowerCase().includes(term) ||
        r.desiredFeatures.toLowerCase().includes(term) ||
        r.openFeedback.toLowerCase().includes(term);

      return matchSchool && matchScore && matchNeed && matchSearch;
    });
  }, [searchTerm, schoolFilter, scoreFilter, needFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Aggregate stats from Data_BieuDo_An
  const schoolStats = [
    { name: "Trường THPT FPT Cần Thơ", count: 220, percent: 38.3, color: "from-blue-600 to-sky-500" },
    { name: "Trường THPT Châu Văn Liêm", count: 150, percent: 26.1, color: "from-blue-500 to-cyan-500" },
    { name: "Trường THPT Trần Đại Nghĩa", count: 150, percent: 26.1, color: "from-indigo-600 to-blue-500" },
    { name: "THPT Chuyên Lý Tự Trọng", count: 15, percent: 2.6, color: "from-purple-600 to-indigo-500" },
    { name: "THPT Phan Ngọc Hiển", count: 12, percent: 2.1, color: "from-teal-600 to-emerald-500" },
    { name: "THPT An Khánh", count: 9, percent: 1.6, color: "from-amber-500 to-yellow-500" },
    { name: "THPT Nguyễn Việt Hồng", count: 9, percent: 1.6, color: "from-orange-500 to-amber-500" },
    { name: "THPT Thực hành Sư phạm – ĐH Cần Thơ", count: 5, percent: 0.9, color: "from-rose-500 to-pink-500" },
    { name: "THPT Bùi Hữu Nghĩa", count: 4, percent: 0.7, color: "from-slate-600 to-slate-400" },
  ];

  const scoreStats = [
    { label: "Từ 7 đến dưới 8.5 điểm (Khá/Tốt)", count: 213, percent: 37.1, color: "bg-emerald-500" },
    { label: "Từ 5 đến dưới 7 điểm (Đang nắm cơ bản)", count: 204, percent: 35.5, color: "bg-amber-500" },
    { label: "Từ 8.5 điểm trở lên (Mục tiêu Vận dụng Cao)", count: 105, percent: 18.3, color: "bg-blue-600" },
    { label: "Dưới 5 điểm (Đang mất gốc)", count: 52, percent: 9.1, color: "bg-rose-500" },
  ];

  const weaknessStats = [
    { label: "Chỉ đưa ra đáp án cuối cùng, không giải thích chi tiết bước làm", count: 404, percent: 70.4 },
    { label: "Thường xuyên phải trả phí/mua VIP mới xem được hết lời giải", count: 395, percent: 68.8 },
    { label: "Không có tính năng thống kê xem mình đang yếu phần kiến thức nào", count: 293, percent: 51.0 },
    { label: "Chứa quá nhiều quảng cáo gây mất tập trung", count: 202, percent: 35.2 },
    { label: "Ngân hàng câu hỏi cũ, chưa cập nhật sát với cấu trúc thi THPT mới", count: 162, percent: 28.2 },
  ];

  const needStats = [
    { level: 5, label: "Mức 5 (Cực kỳ cần thiết)", count: 283, percent: 49.3, color: "bg-blue-600" },
    { level: 4, label: "Mức 4 (Cần thiết)", count: 188, percent: 32.8, color: "bg-sky-500" },
    { level: 3, label: "Mức 3 (Bình thường)", count: 79, percent: 13.8, color: "bg-slate-400" },
    { level: 2, label: "Mức 2 (Ít cần thiết)", count: 16, percent: 2.8, color: "bg-amber-400" },
    { level: 1, label: "Mức 1 (Không cần thiết)", count: 8, percent: 1.4, color: "bg-rose-400" },
  ];

  const handleExportCSV = () => {
    const headers = [
      "STT", "Thời gian", "Trường THPT", "Mức điểm Toán", "Thiết bị", "Thời gian tự học",
      "Khó khăn tự giải", "Hành vi khi gặp bài khó", "Điểm yếu web hiện nay",
      "Gợi ý từng bước (A)", "Áp lực hổng kiến thức (B)", "AI chưa tin cậy (C)",
      "Mức cần thiết FMATH12 (1-5)", "Tính năng mong muốn", "Góp ý mở"
    ];
    
    const rows = filteredData.map((r, i) => [
      i + 1,
      `"${r.timestamp}"`,
      `"${r.school}"`,
      `"${r.scoreRange}"`,
      `"${r.device}"`,
      `"${r.studyTimeDaily}"`,
      `"${r.difficulties.replace(/"/g, '""')}"`,
      `"${r.behaviorWhenStuck.replace(/"/g, '""')}"`,
      `"${r.currentToolsWeakness.replace(/"/g, '""')}"`,
      `"${r.agreeA_scaffolding}"`,
      `"${r.agreeB_pressureWeakness}"`,
      `"${r.agreeC_aiNotReliable}"`,
      r.needFMath12,
      `"${r.desiredFeatures.replace(/"/g, '""')}"`,
      `"${r.openFeedback.replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(",")].concat(rows.map(e => e.join(","))).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Khao_Sat_Thuc_Trang_Hoc_Sinh_FMATH12_${filteredData.length}_Dong.csv`;
    link.click();
  };

  return (
    <section id="khao-sat-hoc-sinh" className="w-full space-y-6 pt-4">
      {/* Header of Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 font-ui">
            <Users size={13} />
            DỮ LIỆU ĐỊNH LƯỢNG THỰC CHỨNG (N = 574)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
            Kết Quả Khảo Sát Thực Trạng Học Sinh
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Công bố toàn bộ <strong className="text-blue-600 dark:text-blue-400">574 dòng dữ liệu khảo sát gốc</strong> từ học sinh lớp 12 trên địa bàn TP. Cần Thơ. Đảm bảo 100% tính nguyên vẹn khoa học.
          </p>
        </div>

        {/* Action Downloads & View Mode Toggle */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                viewMode === 'table' 
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Table size={13} />
              <span>Bảng Dữ Liệu Gốc</span>
            </button>
            <button
              onClick={() => setViewMode('charts')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                viewMode === 'charts' 
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <BarChart3 size={13} />
              <span>Biểu Đồ Trực Quan</span>
            </button>
          </div>

          <a
            href="/Khao_Sat_Hoc_Sinh_574.xlsx"
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-600/20 transition active:scale-[0.98]"
            title="Tải toàn bộ file Excel gốc gồm 3 sheet phân tích chi tiết"
          >
            <FileSpreadsheet size={15} />
            <span className="hidden sm:inline">Tải File Excel Gốc</span>
          </a>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs transition active:scale-[0.98]"
            title="Xuất bảng dữ liệu hiện tại thành tệp CSV"
          >
            <Download size={13} />
            <span>Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Tổng Số Phiếu Gốc</p>
          <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            574 <span className="text-xs font-normal text-slate-400">học sinh</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            ✓ 100% dữ liệu hiển thị
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Đánh Giá Cần Thiết</p>
          <div className="text-2xl sm:text-3xl font-black font-heading text-blue-600 dark:text-blue-400 mt-1">
            82.1%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            471/574 HS cho điểm 4 & 5
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Trường Khảo Sát</p>
          <div className="text-2xl sm:text-3xl font-black font-heading text-indigo-600 dark:text-indigo-400 mt-1">
            9 <span className="text-xs font-normal text-slate-400">trường THPT</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            FPT, Châu Văn Liêm, TĐN...
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase font-heading">Điểm Yếu Web Hiện Nay</p>
          <div className="text-2xl sm:text-3xl font-black font-heading text-rose-600 dark:text-rose-400 mt-1">
            70.4%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            404 HS phản ánh giải không bước
          </p>
        </div>
      </div>

      {/* ================= VIEW MODE 1: VISUAL CHARTS (DASHBOARD TRỰC QUAN) ================= */}
      {viewMode === 'charts' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Chart 1: Cơ cấu trường THPT */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                    1. Cơ Cấu Học Sinh Theo Trường THPT (N = 574)
                  </h3>
                  <p className="text-xs text-slate-400">Thống kê theo số lượng phiếu thu thập thực tế</p>
                </div>
                <School size={18} className="text-blue-500" />
              </div>

              <div className="space-y-2.5">
                {schoolStats.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[240px]">
                        {item.name}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0">
                        {item.count} HS ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${item.percent}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Mức điểm Toán hiện tại */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                    2. Phân Bố Mức Điểm Toán Hiện Tại Của Học Sinh
                  </h3>
                  <p className="text-xs text-slate-400">Tự đánh giá kết quả học tập THPT</p>
                </div>
                <Award size={18} className="text-emerald-500" />
              </div>

              <div className="space-y-3">
                {scoreStats.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {item.label}
                      </span>
                      <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                        {item.count} HS ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${item.percent}%` }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 3: Điểm yếu của công cụ trực tuyến */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                    3. Top Điểm Yếu Của Các Công Cụ Học Toán Hiện Nay
                  </h3>
                  <p className="text-xs text-slate-400">Các rào cản nhận thức học sinh phản ánh (chọn nhiều)</p>
                </div>
                <AlertTriangle size={18} className="text-rose-500" />
              </div>

              <div className="space-y-3">
                {weaknessStats.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {item.label}
                      </span>
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400 shrink-0 ml-2">
                        {item.count} ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${item.percent}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 4: Mức độ cần thiết của FMATH12 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                    4. Đánh Giá Mức Độ Cần Thiết Của Website FMATH12
                  </h3>
                  <p className="text-xs text-slate-400">Thang đo Likert 1–5 điểm (N = 574)</p>
                </div>
                <Star size={18} className="text-amber-500" />
              </div>

              <div className="space-y-2.5">
                {needStats.map((item) => (
                  <div key={item.level} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {item.label}
                      </span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {item.count} phiếu ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${item.percent}%` }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300">
                <strong>Kết luận định lượng:</strong> 82.1% học sinh (471 em) đánh giá ở mức 4 và 5, khẳng định nhu cầu cấp thiết về một trợ lý AI gợi mở tư duy theo định dạng đề thi mới.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ================= VIEW MODE 2: FULL RAW DATA TABLE (574 DÒNG) ================= */}
      {viewMode === 'table' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Filter and Search Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo trường, mức điểm, thiết bị, từ khóa góp ý..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
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
                <option value="all">Tất cả các trường ({studentSurvey574.length})</option>
                {schools.map(sch => (
                  <option key={sch} value={sch}>{sch}</option>
                ))}
              </select>

              <select
                value={scoreFilter}
                onChange={(e) => {
                  setScoreFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
              >
                <option value="all">Tất cả mức điểm</option>
                <option value="Từ 8.5 điểm trở lên (Mục tiêu Vận dụng Cao)">≥ 8.5 (Vận dụng cao)</option>
                <option value="Từ 7 đến dưới 8.5 điểm (Khá/Tốt)">7.0 - 8.5 (Khá/Tốt)</option>
                <option value="Từ 5 đến dưới 7 điểm (Đang nắm cơ bản)">5.0 - 7.0 (Cơ bản)</option>
                <option value="Dưới 5 điểm (Đang mất gốc)">&lt; 5.0 (Mất gốc)</option>
              </select>

              <select
                value={needFilter}
                onChange={(e) => {
                  setNeedFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
              >
                <option value="all">Mức cần thiết: Tất cả</option>
                <option value="5">Mức 5 (Rất cần thiết)</option>
                <option value="4">Mức 4 (Cần thiết)</option>
                <option value="3">Mức 3 (Bình thường)</option>
                <option value="2">Mức 2 (Ít cần thiết)</option>
                <option value="1">Mức 1 (Không cần thiết)</option>
              </select>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
              >
                <option value={25}>25 dòng/trang</option>
                <option value={50}>50 dòng/trang</option>
                <option value={100}>100 dòng/trang</option>
                <option value={574}>Xem tất cả (574)</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-heading uppercase tracking-wider text-[11px]">
                    <th className="p-3 font-bold w-12 text-center">STT</th>
                    <th className="p-3 font-bold">Thời gian</th>
                    <th className="p-3 font-bold">Trường THPT</th>
                    <th className="p-3 font-bold">Mức Điểm Hiện Tại</th>
                    <th className="p-3 font-bold">Thiết Bị</th>
                    <th className="p-3 font-bold">Thời Gian Tự Học</th>
                    <th className="p-3 font-bold text-center">Cần Thiết</th>
                    <th className="p-3 font-bold text-center">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        Không tìm thấy dữ liệu học sinh khớp với bộ lọc tìm kiếm.
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
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                            row.scoreRange.includes('8.5') 
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40'
                              : row.scoreRange.includes('7')
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40'
                                : row.scoreRange.includes('5')
                                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40'
                                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40'
                          }`}>
                            {row.scoreRange}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 text-[11.5px]">
                          {row.device}
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 text-[11.5px] whitespace-nowrap">
                          {row.studyTimeDaily}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                            row.needFMath12 >= 4 
                              ? 'bg-blue-600 text-white' 
                              : row.needFMath12 === 3 
                                ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200' 
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}>
                            {row.needFMath12}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedStudent(row)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition"
                            title="Xem toàn bộ phản hồi chi tiết của học sinh"
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

            {/* Pagination Bar */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                Hiển thị <strong className="text-slate-800 dark:text-slate-200">{filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> - <strong className="text-slate-800 dark:text-slate-200">{Math.min(currentPage * pageSize, filteredData.length)}</strong> trên tổng số <strong className="text-blue-600 dark:text-blue-400">{filteredData.length}</strong> dòng khảo sát
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

        </div>
      )}

      {/* Detail Modal for Selected Student */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase font-heading">
                  Phiếu Khảo Sát Học Sinh #{selectedStudent.id}
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-0.5">
                  {selectedStudent.school}
                </h3>
                <span className="text-xs font-mono text-slate-400">Thời gian ghi nhận: {selectedStudent.timestamp}</span>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 font-medium">Mức điểm Toán hiện tại:</span>
                <div className="font-bold text-slate-900 dark:text-white mt-1">{selectedStudent.scoreRange}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 font-medium">Thiết bị học trực tuyến:</span>
                <div className="font-bold text-slate-900 dark:text-white mt-1">{selectedStudent.device}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 font-medium">Thời gian tự học ở nhà:</span>
                <div className="font-bold text-slate-900 dark:text-white mt-1">{selectedStudent.studyTimeDaily}</div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/50">
                <span className="text-blue-600 dark:text-blue-400 font-medium">Mức cần thiết của FMATH12:</span>
                <div className="text-lg font-black font-heading text-blue-700 dark:text-blue-300 mt-0.5">{selectedStudent.needFMath12} / 5 điểm</div>
              </div>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Khó khăn lớn nhất khi tự giải toán 12:</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedStudent.difficulties || "Không chọn"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Khi gặp bài khó thường làm gì:</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedStudent.behaviorWhenStuck || "Không chọn"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Điểm yếu của công cụ trực tuyến hiện nay:</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedStudent.currentToolsWeakness || "Không chọn"}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10.5px] text-slate-400 block">Nhận định A (Gợi ý từng bước):</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedStudent.agreeA_scaffolding}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10.5px] text-slate-400 block">Nhận định B (Áp lực hổng KT):</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedStudent.agreeB_pressureWeakness}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10.5px] text-slate-400 block">Nhận định C (AI chưa tin cậy):</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedStudent.agreeC_aiNotReliable}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Tính năng mong muốn nhất ở FMATH12:</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedStudent.desiredFeatures || "Không chọn"}</p>
              </div>

              {selectedStudent.openFeedback && (
                <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40">
                  <strong className="text-amber-800 dark:text-amber-300 block mb-1">Nguyện vọng / Góp ý mở của học sinh:</strong>
                  <p className="text-slate-700 dark:text-slate-300 italic">"{selectedStudent.openFeedback}"</p>
                </div>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setSelectedStudent(null)}
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
