import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, ExternalLink, Sparkles, Clock, 
  Layers, ShieldCheck, School, Users, Compass, ArrowRight,
  Maximize2, Minimize2, X, RefreshCw, FileText, BookOpen,
  CheckCircle2, Download, Award, ChevronRight, Eye, Share2,
  TrendingUp, BarChart3, HelpCircle, GraduationCap, FileSpreadsheet
} from 'lucide-react';

import { StudentSurveySection } from './components/StudentSurveySection';
import { TeacherSurveySection } from './components/TeacherSurveySection';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('fmath12_data_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isBannerZoomed, setIsBannerZoomed] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState<'embed' | 'summary' | 'evidence'>('embed');
  const [iframeKey, setIframeKey] = useState(0);

  const reportRef = useRef<HTMLDivElement>(null);
  const studentSurveyRef = useRef<HTMLDivElement>(null);
  const teacherSurveyRef = useRef<HTMLDivElement>(null);

  const DRIVE_VIEW_URL = "https://drive.google.com/file/d/1XTo9OtOVqcLvXoa31zOGYAlkeACGy7-k/view?usp=sharing";
  const DRIVE_PREVIEW_URL = "https://drive.google.com/file/d/1XTo9OtOVqcLvXoa31zOGYAlkeACGy7-k/preview";

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fmath12_data_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fmath12_data_theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(prev => !prev);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const reloadIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-800 dark:text-slate-100 font-sans flex flex-col transition-colors duration-300 relative selection:bg-blue-600 selection:text-white">
      
      {/* ================= AMBIENT BACKGROUND GLOWS ================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_70%)] blur-2xl"></div>
        <div className="absolute top-[30%] -left-32 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.12),transparent_70%)] blur-2xl"></div>
        <div className="absolute top-[60%] -right-32 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12),transparent_70%)] blur-2xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      </div>

      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3 transition-all shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 via-sky-400 to-amber-500 opacity-70 blur-xs"></div>
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white flex items-center justify-center font-bold text-lg shadow-md font-heading">
                <span>∑</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-none">
                  FMATH<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">12</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-300 dark:border-orange-800/50">
                  KHKT 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Cổng thông tin & Dữ liệu nghiên cứu
              </p>
            </div>
          </div>

          {/* Quick jump navigation pills */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
            <button
              onClick={() => scrollToSection(reportRef)}
              className="px-3 py-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
            >
              <FileText size={13} className="text-blue-500" />
              <span>Báo Cáo KHKT</span>
            </button>

            <button
              onClick={() => scrollToSection(studentSurveyRef)}
              className="px-3 py-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
            >
              <Users size={13} className="text-indigo-500" />
              <span>Khảo Sát Học Sinh (574)</span>
            </button>

            <button
              onClick={() => scrollToSection(teacherSurveyRef)}
              className="px-3 py-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
            >
              <GraduationCap size={13} className="text-emerald-500" />
              <span>Khảo Sát Giáo Viên (35)</span>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
              title="Mở ứng dụng chính FMATH12 (Cổng 5173)"
            >
              <span>Vào App FMATH12</span>
              <ExternalLink size={13} />
            </a>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-slate-600" />}
            </button>
          </div>

        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center space-y-12">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
          <Sparkles size={14} className="text-blue-600 dark:text-blue-400 animate-spin [animation-duration:6s]" />
          <span>Cuộc Thi Khoa Học Kĩ Thuật Học Sinh Trung Học 2026</span>
        </div>

        {/* ================= ẢNH BANNER DỰ ÁN ================= */}
        <div className="w-full relative group">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-900/10 dark:shadow-black/40 transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-blue-500">
            <img 
              src="/khkt-banner.jpg" 
              alt="Dự án Khoa học Kĩ thuật FMATH12 - FPT Schools" 
              className="w-full h-auto object-cover block cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.008]"
              onClick={() => setIsBannerZoomed(true)}
            />

            {/* Click to zoom overlay pill */}
            <button
              onClick={() => setIsBannerZoomed(true)}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-medium backdrop-blur-md transition shadow-md opacity-90 hover:opacity-100"
            >
              <Maximize2 size={13} />
              <span>Phóng to ảnh</span>
            </button>
          </div>
        </div>

        {/* ================= KHUNG TỔNG QUAN DỰ ÁN ================= */}
        <div className="w-full">
          <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900 border-2 border-blue-500/30 dark:border-blue-400/30 shadow-xl shadow-blue-500/5 text-center overflow-hidden">
            
            {/* Top decorative accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500"></div>

            {/* Live Pulsing Status Dot */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400">
                Dữ liệu minh chứng khoa học đầy đủ
              </span>
            </div>

            {/* CHỮ CHÍNH: WEBSITE THÔNG TIN DỰ ÁN KHOA HỌC KĨ THUẬT */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white uppercase leading-snug">
              WEBSITE THÔNG TIN DỰ ÁN KHOA HỌC KĨ THUẬT
            </h1>

            {/* Badge đã đồng bộ dữ liệu */}
            <div className="mt-2.5 inline-block">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 shadow-xs">
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-300 font-heading">
                  Đã Đồng Bộ Toàn Bộ 574 Phiếu Học Sinh & 35 Giáo Viên
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Hệ thống công khai 100% dữ liệu khảo sát thực trạng, kết quả thực nghiệm sư phạm 6 tuần, báo cáo toàn văn và tệp dữ liệu bảng tính gốc phục vụ Ban giám khảo thẩm định.
            </p>

            {/* Badges tóm tắt các thông số đề tài */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Users size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400 font-medium">Đơn vị thực hiện</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">THPT FPT Cần Thơ</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400 font-medium">Lĩnh vực nghiên cứu</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">Hệ thống phần mềm & AI</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Layers size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400 font-medium">Hệ thống sản phẩm</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">FMATH12.COM.VN</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= MỤC 1: BÁO CÁO KHKT DỰ ÁN ================= */}
        <section ref={reportRef} id="baocao" className="w-full space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 font-ui">
                <BookOpen size={13} />
                VĂN BẢN BÁO CÁO KHOA HỌC
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
                Báo Cáo Nghiên Cứu KHKT — Dự Án FMATH12
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Văn bản báo cáo toàn văn công trình nghiên cứu khoa học tham dự Cuộc thi KHKT dành cho học sinh trung học (Tệp <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">NCKH FMATH12.pdf</span>).
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <a
                href={DRIVE_VIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-500 hover:to-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg transition active:scale-[0.98]"
              >
                <span>Mở Trên Google Drive</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs transition active:scale-[0.98]"
              >
                <Maximize2 size={14} />
                <span>Toàn Màn Hình</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveReportTab('embed')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeReportTab === 'embed'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Eye size={15} />
              <span>Đọc Trực Tiếp (PDF Viewer)</span>
            </button>

            <button
              onClick={() => setActiveReportTab('summary')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeReportTab === 'summary'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <BookOpen size={15} />
              <span>Tóm Tắt 5 Chương Trọng Tâm</span>
            </button>

            <button
              onClick={() => setActiveReportTab('evidence')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeReportTab === 'evidence'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <BarChart3 size={15} />
              <span>Chỉ Số Thực Nghiệm Sư Phạm</span>
            </button>
          </div>

          {activeReportTab === 'embed' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">
                    NCKH FMATH12.pdf
                  </span>
                  <span className="hidden sm:inline text-slate-400">• Google Drive Secure Document</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={reloadIframe}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                    title="Tải lại tài liệu"
                  >
                    <RefreshCw size={14} />
                  </button>
                  <button
                    onClick={() => setIsPdfModalOpen(true)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                    title="Mở toàn màn hình"
                  >
                    <Maximize2 size={14} />
                  </button>
                  <a
                    href={DRIVE_VIEW_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 transition"
                    title="Mở trong tab Google Drive mới"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl h-[650px] sm:h-[780px]">
                <iframe
                  key={iframeKey}
                  src={DRIVE_PREVIEW_URL}
                  title="Báo cáo NCKH FMATH12"
                  className="w-full h-full border-0"
                  allow="autoplay"
                />
              </div>
            </div>
          )}

          {activeReportTab === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center font-heading">1</span>
                  <span>CHƯƠNG 1: TỔNG QUAN & LÝ DO CHỌN ĐỀ TÀI</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Thực Trạng Học Toán 12 Theo GDPT 2018 & Sự Thụ Động Của AI
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Khảo sát thực tế trên 574 học sinh lớp 12 và 35 giáo viên tại Cần Thơ chỉ ra 82.5% gặp khó khăn với cấu trúc đề mới (câu Đúng/Sai, Trả lời ngắn, Toán liên môn). Các chatbot AI thông thường (ChatGPT) thường giải thẳng từ A-Z gây triệt tiêu năng lực tự duy độc lập.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center font-heading">2</span>
                  <span>CHƯƠNG 2: CƠ SỞ LÝ LUẬN & SƯ PHẠM</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sư Phạm Đảo Ngược & Gợi Mở Tư Duy (Socratic Scaffolding)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ứng dụng lý thuyết Vùng phát triển gần nhất (ZPD của Vygotsky) và Thuyết kiến tạo. Hệ thống đóng vai trò người gia sư kiên nhẫn, chỉ đặt câu hỏi dẫn dắt logic từng bước chứ tuyệt đối không bao giờ đưa ra đáp án đóng khung ngay lập tức.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  <span className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center font-heading">3</span>
                  <span>CHƯƠNG 3: THIẾT KẾ & HIỆN THỰC HÓA HỆ THỐNG</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Kiến Trúc Cloud Serverless, Groq LPU & KaTeX Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Thiết kế Multi-Tier hiện đại: Frontend React + Tailwind, Backend Supabase RLS, Bộ xử lý LPU Groq siêu tốc 420 tokens/s, công nghệ vẽ đồ thị vector động MathGraphPlotter và engine KaTeX hiển thị công thức chuẩn SGK dưới 40ms.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-heading">4</span>
                  <span>CHƯƠNG 4: KẾT QUẢ THỰC NGHIỆM ĐỐI CHỨNG</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Kiểm Định T-Test p &lt; 0.001, Cohen's d = 1.40 & SUS 84.8
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Thực nghiệm trên 90 học sinh trong 6 tuần (45 Thực nghiệm vs 45 Đối chứng). Nhóm thực nghiệm tăng trung bình +2.12 điểm (+36.6%), độ chênh lệch có ý nghĩa thống kê vượt trội (p &lt; 0.001) và mức độ ảnh hưởng rất lớn (d = 1.40). Thang đo SUS đạt 84.8/100 (Hạng A).
                </p>
              </div>

              <div className="md:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center font-heading">5</span>
                  <span>CHƯƠNG 5: KẾT LUẬN & KHUYẾN NGHỊ SƯ PHẠM</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Khả Năng Nhân Rộng Mô Hình Với Chi Phí 0 Đồng Cho Học Sinh
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Đề tài chứng minh tính khả thi của việc dân chủ hóa công nghệ gia sư AI cá nhân hóa. Nền tảng FMATH12 hoàn toàn sẵn sàng mở rộng quy mô phục vụ hàng ngàn học sinh lớp 12 trên toàn quốc ôn luyện chuẩn bị cho kỳ thi tốt nghiệp THPT theo chương trình mới.
                </p>
              </div>
            </div>
          )}

          {activeReportTab === 'evidence' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase font-heading">Tổng Cỡ Mẫu Khảo Sát</p>
                  <p className="text-2xl font-black font-heading text-slate-900 dark:text-white mt-1">609 Khách thể</p>
                  <p className="text-[11px] text-slate-500 mt-1">574 Học sinh + 35 Giáo viên bộ môn</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase font-heading">Điểm Tăng Trưởng (EG)</p>
                  <p className="text-2xl font-black font-heading text-emerald-600 dark:text-emerald-400 mt-1">+2.12 điểm</p>
                  <p className="text-[11px] text-slate-500 mt-1">Tăng +36.6% từ 5.79 lên 7.91 điểm sau 6 tuần</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase font-heading">Ý Nghĩa Thống Kê</p>
                  <p className="text-2xl font-black font-heading text-blue-600 dark:text-blue-400 mt-1">p &lt; 0.001</p>
                  <p className="text-[11px] text-slate-500 mt-1">Kiểm định T-test t(88) = 6.62 cực kỳ có ý nghĩa</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase font-heading">Thang Đo SUS</p>
                  <p className="text-2xl font-black font-heading text-indigo-600 dark:text-indigo-400 mt-1">84.8 / 100</p>
                  <p className="text-[11px] text-slate-500 mt-1">Cấp độ Xuất sắc (Grade A - Top 4% EdTech)</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ================= MỤC 2: KẾT QUẢ KHẢO SÁT HỌC SINH (574 DÒNG ĐẦY ĐỦ) ================= */}
        <div ref={studentSurveyRef} className="w-full">
          <StudentSurveySection />
        </div>

        {/* ================= MỤC 3: KẾT QUẢ KHẢO SÁT GIÁO VIÊN (35 DÒNG ĐẦY ĐỦ) ================= */}
        <div ref={teacherSurveyRef} className="w-full">
          <TeacherSurveySection />
        </div>

      </main>

      {/* ================= MODAL PHÓNG TO ẢNH BANNER ================= */}
      {isBannerZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsBannerZoomed(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsBannerZoomed(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
            <img 
              src="/khkt-banner.jpg" 
              alt="Dự án KHKT FMATH12 Full" 
              className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/20"
            />
          </div>
        </div>
      )}

      {/* ================= MODAL PHÓNG TO BÁO CÁO PDF FULLSCREEN ================= */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-2 sm:p-4">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 rounded-t-2xl border-b border-slate-800 text-white">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-400" />
              <span className="text-sm font-bold font-heading">
                BÁO CÁO NGHIÊN CỨU KHOA HỌC KỸ THUẬT FMATH12 (NCKH FMATH12.pdf)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={DRIVE_VIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition"
              >
                <span>Mở Trong Drive</span>
                <ExternalLink size={13} />
              </a>
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                aria-label="Đóng toàn màn hình"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full bg-slate-950 rounded-b-2xl overflow-hidden border border-slate-800">
            <iframe
              src={DRIVE_PREVIEW_URL}
              title="Báo cáo NCKH FMATH12 Fullscreen"
              className="w-full h-full border-0"
              allow="autoplay"
            />
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Đội thi FMATH12 — Đề tài Nghiên cứu Khoa học Kĩ thuật 2026.</p>
          <p className="flex items-center gap-1.5">
            <span>Cổng thông tin & Báo cáo KHKT</span>
            <span>•</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">FMATH12 PRO</span>
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
