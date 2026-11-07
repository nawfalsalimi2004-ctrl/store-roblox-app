import React from 'react';
import { Gamepad2, Heart, Code2, ShieldCheck, Mail, Database, Users } from 'lucide-react';
import { firebaseConfig } from '../../firebase/config';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-right">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-slate-900 dark:text-white">منصة المطورين</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              المجتمع العربي المخصص لمطوري ألعاب روبلوكس وتطبيقات سطح المكتب والأجهزة الذكية، متجر متكامل مع نظام توثيق OTP، شبكة أصدقاء، وتحديثات فورية.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>نظام تحقق مشفر وموثوق للمطورين</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">أقسام المنصة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('roblox')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  ألعاب روبلوكس وتحديثاتها الحية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  متجر التطبيقات والبرامج
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('friends')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  قائمة الأصدقاء والمجتمع
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profile')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  الملف الشخصي (بروفايلي)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  المقالات والشروحات البرمجية
                </button>
              </li>
            </ul>
          </div>

          {/* Developer Tools & Firebase */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">التقنيات والسحابة</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                <Database className="w-3.5 h-3.5" />
                <span>قاعدة بيانات Firebase مدمجة</span>
              </li>
              <li><span className="cursor-default">لغة برمجة Luau الحديثة للروبلوكس</span></li>
              <li><span className="cursor-default">مكتبات DataStores و ProfileService</span></li>
              <li><span className="cursor-default">نماذج ثلاثية الأبعاد PBR</span></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">مركز الدعم والتواصل</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              للاستفسارات التقنية وطلبات توثيق حسابات المطورين:
            </p>
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-rose-500" />
              <span className="font-mono">support@robloxdev-platform.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <span>صُنع بشغف لمجتمع مطوري ألعاب روبلوكس والتطبيقات في الوطن العربي</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            © {new Date().getFullYear()} Roblox & Dev Store Platform
          </div>
        </div>
      </div>
    </footer>
  );
};
