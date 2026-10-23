import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, ExternalLink, Sparkles, Clock, 
  Layers, ShieldCheck, School, Users, Compass, ArrowRight,
  Maximize2, X, RefreshCw
} from 'lucide-react';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('fmath12_data_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isZoomed, setIsZoomed] = useState(false);

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
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all">
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

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
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
      <main className="flex-1 relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs mb-6">
          <Sparkles size={14} className="text-blue-600 dark:text-blue-400 animate-spin [animation-duration:6s]" />
          <span>Cuộc Thi Khoa Học Kĩ Thuật 2026</span>
        </div>

        {/* ================= ẢNH BANNER DỰ ÁN ================= */}
        <div className="w-full relative group">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-900/10 dark:shadow-black/40 transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-blue-500">
            <img 
              src="/khkt-banner.jpg" 
              alt="Dự án Khoa học Kĩ thuật FMATH12 - FPT Schools" 
              className="w-full h-auto object-cover block cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.008]"
              onClick={() => setIsZoomed(true)}
            />

            {/* Click to zoom overlay pill */}
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-medium backdrop-blur-md transition shadow-md opacity-90 hover:opacity-100"
            >
              <Maximize2 size={13} />
              <span>Phóng to ảnh</span>
            </button>
          </div>
        </div>

        {/* ================= KHUNG GHI RÕ DƯỚI ẢNH (YÊU CẦU ĐẶC BIỆT) ================= */}
        <div className="w-full mt-6 sm:mt-8">
          <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900 border-2 border-blue-500/30 dark:border-blue-400/30 shadow-xl shadow-blue-500/5 text-center overflow-hidden">
            
            {/* Top decorative accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500"></div>

            {/* Live Pulsing Status Dot */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400">
                Trạng thái hệ thống
              </span>
            </div>

            {/* CHỮ CHÍNH: WEBSITE THÔNG TIN DỰ ÁN KHOA HỌC KĨ THUẬT */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white uppercase leading-snug">
              WEBSITE THÔNG TIN DỰ ÁN KHOA HỌC KĨ THUẬT
            </h1>

            {/* PHẦN GHI CHÚ: (Đang cập nhật) */}
            <div className="mt-2.5 inline-block">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 shadow-xs">
                <Clock size={16} className="text-amber-600 dark:text-amber-400 animate-pulse" />
                <span className="text-base sm:text-lg font-bold text-amber-700 dark:text-amber-300 font-heading">
                  (Đang cập nhật)
                </span>
              </div>
            </div>

            {/* Thông tin vắn tắt bổ trợ */}
            <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Hệ thống đang chuẩn bị đồng bộ toàn bộ cơ sở dữ liệu khảo sát <span className="font-semibold text-slate-800 dark:text-slate-100">(N = 345)</span>, kết quả thực nghiệm sư phạm 6 tuần, chỉ số đánh giá trải nghiệm SUS và tài liệu minh chứng khoa học.
            </p>

            {/* Badges tóm tắt các thông số đề tài */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Users size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400 font-medium">Đơn vị thực hiện</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">Đội thi FMATH12</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400 font-medium">Lĩnh vực nghiên cứu</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">KH Xã hội & Hành vi</p>
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

      </main>

      {/* ================= MODAL PHÓNG TO ẢNH ================= */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsZoomed(false)}
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

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Đội thi FMATH12 — Đề tài Nghiên cứu Khoa học Kĩ thuật 2026.</p>
          <p className="flex items-center gap-1.5">
            <span>Cổng thông tin dữ liệu KHKT</span>
            <span>•</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">FMATH12 PRO</span>
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
