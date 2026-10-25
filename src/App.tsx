import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, ExternalLink, Sparkles, Clock, 
  Layers, ShieldCheck, School, Users, ArrowRight,
  Maximize2, X, RefreshCw, FileText, BookOpen,
  CheckCircle2, Download, Award, Eye, Share2,
  TrendingUp, BarChart3, HelpCircle, GraduationCap, FileSpreadsheet,
  FlaskConical, Bookmark, ArrowUpRight, Check, Activity, Search,
  ClipboardList, CheckCircle, Shield
} from 'lucide-react';

import { StudentSurveySection } from './components/StudentSurveySection';
import { TeacherSurveySection } from './components/TeacherSurveySection';
import { StudentExpSurveySection } from './components/StudentExpSurveySection';
import { TeacherExpSurveySection } from './components/TeacherExpSurveySection';
import { ReferencesSection } from './components/ReferencesSection';

// 4 Official Google Forms Links for High Credibility Verification
export const SURVEY_FORMS = [
  {
    id: 'thuctrang-hs',
    title: 'Phiếu Khảo Sát Thực Trạng Học Sinh Lớp 12',
    shortTitle: 'Thực Trạng Học Sinh',
    target: 'Học sinh lớp 12 tại 9 trường THPT trên địa bàn TP. Cần Thơ',
    sampleSize: '574 Học sinh',
    sampleNumber: 574,
    phase: 'Giai Đoạn I: Khảo Sát Thực Trạng',
    phaseColor: 'blue',
    description: 'Đo lường mức độ khó khăn với cấu trúc đề thi THPT mới theo GDPT 2018 (câu Đúng/Sai, Trả lời ngắn, Toán liên môn) và hạn chế giải hộ của AI.',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc2A3ajEbcBlP5buZqL50QUisc1lE4YFFtFJP3XDlJWnfdilA/viewform?usp=header',
    targetSection: 'thuctrang',
    subTab: 'student' as const,
    excelFile: '/Khao_Sat_Hoc_Sinh_574.xlsx'
  },
  {
    id: 'thuctrang-gv',
    title: 'Phiếu Khảo Sát Thực Trạng Giáo Viên Dạy Toán THPT',
    shortTitle: 'Thực Trạng Giáo Viên',
    target: 'Giáo viên bộ môn Toán tại các trường THPT TP. Cần Thơ',
    sampleSize: '35 Giáo viên',
    sampleNumber: 35,
    phase: 'Giai Đoạn I: Khảo Sát Thực Trạng',
    phaseColor: 'emerald',
    description: 'Khảo sát thực trạng quản lý học sinh tự học, rào cản khi theo dõi cá nhân hóa và nhu cầu về trợ lý AI theo định hướng sư phạm Socratic.',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSenuPY4c57LB4vgwAsHlO1ln5sBQecebtBs3OC23But5VPnQA/viewform?usp=header',
    targetSection: 'thuctrang',
    subTab: 'teacher' as const,
    excelFile: '/Khao_Sat_Giao_Vien_35.xlsx'
  },
  {
    id: 'thucnghiem-hs',
    title: 'Phiếu Khảo Sát Thực Nghiệm Học Sinh (Sau 6 Tuần Trải Nghiệm)',
    shortTitle: 'Thực Nghiệm Học Sinh',
    target: 'Học sinh lớp 12 sau 6 tuần tham gia học tập trên website FMATH12',
    sampleSize: '550 Học sinh',
    sampleNumber: 550,
    phase: 'Giai Đoạn II: Khảo Sát Thực Nghiệm',
    phaseColor: 'cyan',
    description: 'Đánh giá 19 tiêu chí Likert chuẩn hóa: Phù hợp Website, Tính năng AI gợi mở & Radar Chart, Ngân hàng đề TT32 và Tác động hiệu quả tự học.',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSex4kRP8A6MZAZcGgI14kvrjsNdXp0SON5ww_q2TRyrkEzPUg/viewform?usp=header',
    targetSection: 'thucnghiem',
    subTab: 'student' as const,
    excelFile: '/Thuc_Nghiem_Hoc_Sinh_550.xlsx'
  },
  {
    id: 'thucnghiem-gv',
    title: 'Phiếu Khảo Sát Thực Nghiệm Giáo Viên (Sau Đợt Thử Nghiệm)',
    shortTitle: 'Thực Nghiệm Giáo Viên',
    target: 'Giáo viên Toán THPT tham gia thử nghiệm và sử dụng phân hệ giáo viên',
    sampleSize: '35 Giáo viên',
    sampleNumber: 35,
    phase: 'Giai Đoạn II: Khảo Sát Thực Nghiệm',
    phaseColor: 'purple',
    description: 'Đánh giá 19 tiêu chí chuyên môn: Phân hệ giao bài, thống kê tự động chấm điểm, tính sư phạm của Chatbot AI và hỗ trợ nâng cao kết quả học sinh.',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqUwR95kBsl7b2SyjqGZ-pL88vNUDftG2NqQ453lBuRUDA0g/viewform?usp=header',
    targetSection: 'thucnghiem',
    subTab: 'teacher' as const,
    excelFile: '/Thuc_Nghiem_Giao_Vien_35.xlsx'
  }
];

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('fmath12_data_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeMainTab, setActiveMainTab] = useState<'baocao' | 'forms' | 'thuctrang' | 'thucnghiem' | 'references'>('baocao');
  const [isBannerZoomed, setIsBannerZoomed] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState<'embed' | 'summary' | 'evidence'>('embed');
  const [iframeKey, setIframeKey] = useState(0);

  // Form preview modal
  const [previewForm, setPreviewForm] = useState<{ title: string; url: string; sample: string } | null>(null);

  // Sub-tabs for Thuc Trang and Thuc Nghiem
  const [thucTrangSubTab, setThucTrangSubTab] = useState<'student' | 'teacher'>('student');
  const [thucNghiemSubTab, setThucNghiemSubTab] = useState<'student' | 'teacher'>('student');

  const reportRef = useRef<HTMLDivElement>(null);
  const formsRef = useRef<HTMLDivElement>(null);
  const thucTrangRef = useRef<HTMLDivElement>(null);
  const thucNghiemRef = useRef<HTMLDivElement>(null);
  const referencesRef = useRef<HTMLDivElement>(null);

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

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>, tabKey: 'baocao' | 'forms' | 'thuctrang' | 'thucnghiem' | 'references') => {
    setActiveMainTab(tabKey);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const jumpToDataSection = (section: 'thuctrang' | 'thucnghiem', sub: 'student' | 'teacher') => {
    if (section === 'thuctrang') {
      setThucTrangSubTab(sub);
      scrollToSection(thucTrangRef, 'thuctrang');
    } else {
      setThucNghiemSubTab(sub);
      scrollToSection(thucNghiemRef, 'thucnghiem');
    }
  };

  const reloadIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070b14] text-slate-800 dark:text-slate-100 font-sans flex flex-col transition-colors duration-300 relative selection:bg-blue-600 selection:text-white">
      
      {/* ================= AMBIENT BACKGROUND GLOWS ================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.22),transparent_70%)] blur-3xl"></div>
        <div className="absolute top-[28%] -left-32 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.12),transparent_70%)] blur-3xl"></div>
        <div className="absolute top-[55%] -right-32 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.14),transparent_70%)] blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      </div>

      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/85 dark:bg-[#090d16]/85 border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => scrollToSection(reportRef, 'baocao')}>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 opacity-75 blur-xs group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white flex items-center justify-center font-bold text-xl shadow-md font-heading">
                <span>∑</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-none">
                  FMATH<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">12</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs tracking-wider">
                  KHKT 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Cổng Dữ Liệu & Minh Chứng Khoa Học
              </p>
            </div>
          </div>

          {/* Quick jump navigation pills (Segmented Control) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 text-xs font-semibold backdrop-blur-md">
            <button
              onClick={() => scrollToSection(reportRef, 'baocao')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeMainTab === 'baocao'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText size={13} className="text-blue-500" />
              <span>Báo Cáo KHKT</span>
            </button>

            <button
              onClick={() => scrollToSection(formsRef, 'forms')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeMainTab === 'forms'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ClipboardList size={13} className="text-purple-500" />
              <span>Form Khảo Sát Gốc</span>
              <span className="px-1.5 py-0.2 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-mono">
                4 Forms
              </span>
            </button>

            <button
              onClick={() => scrollToSection(thucTrangRef, 'thuctrang')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeMainTab === 'thuctrang'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users size={13} className="text-indigo-500" />
              <span>1. Khảo Sát Thực Trạng</span>
              <span className="px-1.5 py-0.2 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-mono">
                609
              </span>
            </button>

            <button
              onClick={() => scrollToSection(thucNghiemRef, 'thucnghiem')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeMainTab === 'thucnghiem'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FlaskConical size={13} className="text-cyan-500" />
              <span>2. Khảo Sát Thực Nghiệm</span>
              <span className="px-1.5 py-0.2 rounded-md bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-[10px] font-mono">
                585
              </span>
            </button>

            <button
              onClick={() => scrollToSection(referencesRef, 'references')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeMainTab === 'references'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark size={13} className="text-amber-500" />
              <span>3. Tài Liệu Tham Khảo</span>
              <span className="px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-mono">
                10
              </span>
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 active:scale-[0.98] transition"
              title="Mở ứng dụng chính FMATH12 (Cổng 5173)"
            >
              <span>Vào App FMATH12</span>
              <ExternalLink size={13} />
            </a>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-600" />}
            </button>
          </div>

        </div>
      </header>

      {/* ================= MAIN WRAPPER ================= */}
      <main className="flex-1 relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center space-y-16">
        
        {/* ================= HERO EXECUTIVE CARD ================= */}
        <div className="w-full">
          <div className="relative rounded-3xl p-6 sm:p-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-900/5 text-center overflow-hidden">
            
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 via-cyan-400 to-amber-500"></div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-600 dark:text-emerald-400 font-ui">
                CÔNG BỐ DỮ LIỆU KHOA HỌC THỰC NGHIỆM ĐỐI CHỨNG
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-900 dark:text-white uppercase leading-tight max-w-4xl mx-auto">
              CỔNG THÔNG TIN DỮ LIỆU NGHIÊN CỨU KHOA HỌC KỸ THUẬT FMATH12
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Hệ thống công khai 100% dữ liệu khảo sát thực trạng, kết quả thực nghiệm sư phạm 6 tuần, 4 biểu mẫu Google Forms trực tuyến gốc và liên kết trực tiếp tới 10 tài liệu học thuật quốc tế phục vụ Hội đồng Giám khảo thẩm định.
            </p>

            {/* 4 HIGHLIGHT KPI STATS CARDS */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
              
              <div 
                onClick={() => scrollToSection(thucTrangRef, 'thuctrang')}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Users size={16} />
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition flex items-center">
                    Xem Data <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">
                    609 <span className="text-xs font-semibold text-slate-400">Phiếu</span>
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">Khảo Sát Thực Trạng</p>
                  <p className="text-[11px] text-slate-400 mt-1">574 Học sinh + 35 Giáo viên</p>
                </div>
              </div>

              <div 
                onClick={() => scrollToSection(thucNghiemRef, 'thucnghiem')}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all cursor-pointer shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <FlaskConical size={16} />
                  </span>
                  <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition flex items-center">
                    Xem Data <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-black font-heading text-cyan-600 dark:text-cyan-400">
                    585 <span className="text-xs font-semibold text-slate-400">Phiếu</span>
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">Khảo Sát Thực Nghiệm</p>
                  <p className="text-[11px] text-slate-400 mt-1">550 Học sinh + 35 Giáo viên</p>
                </div>
              </div>

              <div 
                onClick={() => scrollToSection(reportRef, 'baocao')}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all cursor-pointer shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <TrendingUp size={16} />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition flex items-center">
                    T-Test <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-black font-heading text-emerald-600 dark:text-emerald-400">
                    +2.12 <span className="text-xs font-semibold text-slate-400">Điểm</span>
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">Tăng Trưởng Nhóm EG</p>
                  <p className="text-[11px] text-slate-400 mt-1">Tăng +36.6%, p &lt; 0.001, d = 1.40</p>
                </div>
              </div>

              <div 
                onClick={() => scrollToSection(referencesRef, 'references')}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400 dark:hover:border-amber-500 transition-all cursor-pointer shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Bookmark size={16} />
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition flex items-center">
                    10 TLTK <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-black font-heading text-amber-600 dark:text-amber-400">
                    84.8 <span className="text-xs font-semibold text-slate-400">/ 100</span>
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">Thang Đo Khả Dụng SUS</p>
                  <p className="text-[11px] text-slate-400 mt-1">Hạng A (Top 4% EdTech quốc tế)</p>
                </div>
              </div>

            </div>

            {/* Metadata Footer bar */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Đơn vị thực hiện:</span>
                <span>Trường THPT FPT Cần Thơ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Lĩnh vực:</span>
                <span>Hệ thống phần mềm & Trí tuệ nhân tạo (AI)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Đối tượng:</span>
                <span>Học sinh lớp 12 & Giáo viên Toán THPT</span>
              </div>
            </div>

          </div>
        </div>

        {/* ================= ẢNH BANNER DỰ ÁN ================= */}
        <div className="w-full relative group">
          <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-900/10 dark:shadow-black/40 transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-blue-500">
            <img 
              src="/khkt-banner.jpg" 
              alt="Dự án Khoa học Kĩ thuật FMATH12 - FPT Schools" 
              className="w-full h-auto object-cover block cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.008]"
              onClick={() => setIsBannerZoomed(true)}
            />

            <button
              onClick={() => setIsBannerZoomed(true)}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md transition shadow-md"
            >
              <Maximize2 size={13} />
              <span>Phóng to ảnh banner</span>
            </button>
          </div>
        </div>

        {/* ================= SECTION: 4 GOOGLE FORMS VERIFICATION HUB ================= */}
        <section ref={formsRef} id="forms" className="w-full space-y-6 pt-4 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2 font-ui">
                <ShieldCheck size={14} className="text-purple-600 dark:text-purple-400" />
                MINH CHỨNG TRỰC TUYẾN CHUẨN XÁC & MINH BẠCH
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
                Hệ Thống Biểu Mẫu Khảo Sát Trực Tuyến (Google Forms)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Toàn bộ dữ liệu của đề tài được thu thập khách quan qua 4 biểu mẫu Google Forms trực tuyến. Ban Giám khảo có thể mở trực tiếp biểu mẫu gốc hoặc xem trước để đối chiếu câu hỏi và tính nhất quán với tệp dữ liệu bảng tính.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle size={14} />
                <span>100% Đã Khảo Sát & Khớp Số Liệu</span>
              </span>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SURVEY_FORMS.map((form) => (
              <div 
                key={form.id}
                className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-[11px] font-bold border border-purple-200 dark:border-purple-800/60 font-mono">
                      <ClipboardList size={12} />
                      Google Forms Gốc
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold font-heading">
                      Cỡ mẫu: <strong className="text-slate-900 dark:text-white font-mono">{form.sampleSize}</strong>
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-ui">
                      {form.phase}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                      {form.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {form.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Khách thể:</span> {form.target}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                  <a
                    href={form.formUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 shadow-md shadow-purple-600/20 active:scale-[0.98] transition"
                  >
                    <span>Mở Form Trực Tuyến</span>
                    <ExternalLink size={13} />
                  </a>

                  <button
                    onClick={() => setPreviewForm({ title: form.title, url: form.formUrl, sample: form.sampleSize })}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 active:scale-[0.98] transition"
                  >
                    <Eye size={13} />
                    <span>Xem Trước Form</span>
                  </button>

                  <button
                    onClick={() => jumpToDataSection(form.targetSection as any, form.subTab)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition ml-auto"
                  >
                    <span>Đến Raw Data</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PHẦN: BÁO CÁO KHKT DỰ ÁN ================= */}
        <section ref={reportRef} id="baocao" className="w-full space-y-6 pt-4 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 font-ui">
                <BookOpen size={13} />
                VĂN BẢN BÁO CÁO KHOA HỌC
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
                Báo Cáo Toàn Văn Đề Tài KHKT — FMATH12
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Văn bản báo cáo công trình nghiên cứu khoa học kỹ thuật tham dự cuộc thi cấp thành phố (Tệp lưu trữ <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">NCKH FMATH12.pdf</span>).
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <a
                href={DRIVE_VIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-gradient-primary"
              >
                <span>Mở Trên Google Drive</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="btn-subtle"
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
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
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
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                    title="Tải lại tài liệu"
                  >
                    <RefreshCw size={14} />
                  </button>
                  <button
                    onClick={() => setIsPdfModalOpen(true)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                    title="Mở toàn màn hình"
                  >
                    <Maximize2 size={14} />
                  </button>
                  <a
                    href={DRIVE_VIEW_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 transition"
                    title="Mở trong tab Google Drive mới"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="w-full relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl h-[680px] sm:h-[800px]">
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
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 transition space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center font-heading font-black">1</span>
                  <span>CHƯƠNG 1: TỔNG QUAN & LÝ DO CHỌN ĐỀ TÀI</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Thực Trạng Học Toán 12 Theo GDPT 2018 & Sự Thụ Động Của AI
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Khảo sát thực tế trên 574 học sinh lớp 12 và 35 giáo viên tại Cần Thơ chỉ ra 82.5% gặp khó khăn với cấu trúc đề mới (câu Đúng/Sai, Trả lời ngắn, Toán liên môn). Các chatbot AI thông thường (ChatGPT) thường giải thẳng từ A-Z gây triệt tiêu năng lực tự duy độc lập.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center font-heading font-black">2</span>
                  <span>CHƯƠNG 2: CƠ SỞ LÝ LUẬN & SƯ PHẠM</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sư Phạm Đảo Ngược & Gợi Mở Tư Duy (Socratic Scaffolding)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ứng dụng lý thuyết Vùng phát triển gần nhất (ZPD của Vygotsky) và Thuyết kiến tạo. Hệ thống đóng vai trò người gia sư kiên nhẫn, chỉ đặt câu hỏi dẫn dắt logic từng bước chứ tuyệt đối không bao giờ đưa ra đáp án đóng khung ngay lập tức.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-cyan-400 dark:hover:border-cyan-500 transition space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  <span className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center font-heading font-black">3</span>
                  <span>CHƯƠNG 3: THIẾT KẾ & HIỆN THỰC HÓA HỆ THỐNG</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Kiến Trúc Cloud Serverless, Groq LPU & KaTeX Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Thiết kế Multi-Tier hiện đại: Frontend React + Tailwind, Backend Supabase RLS, Bộ xử lý LPU Groq siêu tốc 420 tokens/s, công nghệ vẽ đồ thị vector động MathGraphPlotter và engine KaTeX hiển thị công thức chuẩn SGK dưới 40ms.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-500 transition space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-heading font-black">4</span>
                  <span>CHƯƠNG 4: KẾT QUẢ THỰC NGHIỆM ĐỐI CHỨNG</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Kiểm Định T-Test p &lt; 0.001, Cohen's d = 1.40 & SUS 84.8
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Thực nghiệm trên 90 học sinh trong 6 tuần (45 Thực nghiệm vs 45 Đối chứng). Nhóm thực nghiệm tăng trung bình +2.12 điểm (+36.6%), độ chênh lệch có ý nghĩa thống kê vượt trội (p &lt; 0.001) và mức độ ảnh hưởng rất lớn (d = 1.40). Thang đo SUS đạt 84.8/100 (Hạng A).
                </p>
              </div>

              <div className="md:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-amber-400 dark:hover:border-amber-500 transition space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center font-heading font-black">5</span>
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
                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase font-heading">Tổng Cỡ Mẫu Khảo Sát</p>
                  <p className="text-2xl font-black font-heading text-slate-900 dark:text-white mt-1">609 Khách thể</p>
                  <p className="text-[11px] text-slate-500 mt-1">574 Học sinh + 35 Giáo viên bộ môn</p>
                </div>

                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase font-heading">Điểm Tăng Trưởng (EG)</p>
                  <p className="text-2xl font-black font-heading text-emerald-600 dark:text-emerald-400 mt-1">+2.12 điểm</p>
                  <p className="text-[11px] text-slate-500 mt-1">Tăng +36.6% từ 5.79 lên 7.91 điểm sau 6 tuần</p>
                </div>

                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase font-heading">Ý Nghĩa Thống Kê</p>
                  <p className="text-2xl font-black font-heading text-blue-600 dark:text-blue-400 mt-1">p &lt; 0.001</p>
                  <p className="text-[11px] text-slate-500 mt-1">Kiểm định T-test t(88) = 6.62 cực kỳ có ý nghĩa</p>
                </div>

                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase font-heading">Thang Đo SUS</p>
                  <p className="text-2xl font-black font-heading text-indigo-600 dark:text-indigo-400 mt-1">84.8 / 100</p>
                  <p className="text-[11px] text-slate-500 mt-1">Cấp độ Xuất sắc (Grade A - Top 4% EdTech)</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ================= PHẦN I: KHẢO SÁT THỰC TRẠNG ================= */}
        <section ref={thucTrangRef} id="thuctrang" className="w-full space-y-6 pt-6 scroll-mt-24">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-transparent border border-blue-200/80 dark:border-blue-900/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider">
                  PHẦN I • GIAI ĐOẠN KHỞI ĐẦU ĐỀ TÀI
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-slate-900 dark:text-white mt-2">
                  KẾT QUẢ KHẢO SÁT THỰC TRẠNG (TRƯỚC KHI XÂY DỰNG FMATH12)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Khảo sát quy mô 574 học sinh và 35 giáo viên về khó khăn học Toán 12 theo GDPT 2018 và nhu cầu gia sư AI gợi mở.
                </p>
              </div>

              {/* Sub-tab switcher */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0 shadow-xs">
                <button
                  onClick={() => setThucTrangSubTab('student')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    thucTrangSubTab === 'student'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Users size={14} />
                  <span>Học Sinh (574 Phiếu)</span>
                </button>

                <button
                  onClick={() => setThucTrangSubTab('teacher')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    thucTrangSubTab === 'teacher'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <GraduationCap size={14} />
                  <span>Giáo Viên (35 Phiếu)</span>
                </button>
              </div>
            </div>
          </div>

          {thucTrangSubTab === 'student' ? (
            <StudentSurveySection />
          ) : (
            <TeacherSurveySection />
          )}
        </section>

        {/* ================= PHẦN II: KHẢO SÁT THỰC NGHIỆM ================= */}
        <section ref={thucNghiemRef} id="thucnghiem" className="w-full space-y-6 pt-6 scroll-mt-24">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-900/10 via-emerald-900/10 to-transparent border border-cyan-200/80 dark:border-cyan-900/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-black uppercase tracking-wider">
                  PHẦN II • GIAI ĐOẠN ĐÁNH GIÁ TÁC ĐỘNG SƯ PHẠM
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-slate-900 dark:text-white mt-2">
                  KẾT QUẢ KHẢO SÁT THỰC NGHIỆM (SAU 6 TUẦN SỬ DỤNG FMATH12)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Đánh giá chi tiết của 550 học sinh và 35 giáo viên theo thang đo Likert 19 tiêu chí chuẩn hóa về hiệu quả hệ thống.
                </p>
              </div>

              {/* Sub-tab switcher */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0 shadow-xs">
                <button
                  onClick={() => setThucNghiemSubTab('student')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    thucNghiemSubTab === 'student'
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FlaskConical size={14} />
                  <span>Học Sinh (550 Phiếu)</span>
                </button>

                <button
                  onClick={() => setThucNghiemSubTab('teacher')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    thucNghiemSubTab === 'teacher'
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <GraduationCap size={14} />
                  <span>Giáo Viên (35 Phiếu)</span>
                </button>
              </div>
            </div>
          </div>

          {thucNghiemSubTab === 'student' ? (
            <StudentExpSurveySection />
          ) : (
            <TeacherExpSurveySection />
          )}
        </section>

        {/* ================= PHẦN III: TÀI LIỆU THAM KHẢO ================= */}
        <div ref={referencesRef} className="w-full pt-6 scroll-mt-24">
          <ReferencesSection />
        </div>

      </main>

      {/* ================= MODAL XEM TRƯỚC GOOGLE FORM ================= */}
      {previewForm && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-2 sm:p-4"
          onClick={() => setPreviewForm(null)}
        >
          <div 
            className="flex flex-col h-full max-w-4xl w-full mx-auto bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <ClipboardList size={16} />
                </span>
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white leading-tight">
                    {previewForm.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Cỡ mẫu: {previewForm.sample} • Biểu mẫu Google Form chính thức
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewForm.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition"
                >
                  <span>Mở Tab Mới</span>
                  <ExternalLink size={12} />
                </a>
                <button
                  onClick={() => setPreviewForm(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Form iframe */}
            <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950">
              <iframe
                src={`${previewForm.url.split('?')[0]}?embedded=true`}
                title={previewForm.title}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

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
                className="btn-gradient-primary py-1.5 px-3"
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
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Dự Án Nghiên Cứu Khoa Học Kỹ Thuật Dành Cho Học Sinh Trung Học 2026
            </p>
            <p className="text-[11px] text-slate-400">
              Trường THPT FPT Cần Thơ • Sở Giáo Dục & Đào Tạo TP. Cần Thơ
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition flex items-center gap-1.5"
            >
              <span>FMATH12 PRO</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
