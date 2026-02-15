import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const skills = [
  { label: 'AI 绘画', icon: '🎨' },
  { label: 'AI 编程', icon: '💻' },
  { label: '提示词工程', icon: '✍️' },
];

const focusAreas = [
  { title: 'AIGC', desc: '生成式 AI 内容创作与工作流' },
  { title: 'AI 编程', desc: 'Cursor / Claude Code / Copilot 深度实践' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[76px]">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 font-heading tracking-tight">
            关于作者
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Business card image */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            <div className="relative group">
              {/* Glow effect behind card */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Card frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src="/images/social-card.png"
                  alt="遁去的一 - 个人名片"
                  className="w-full max-w-[320px] h-auto"
                  loading="eager"
                />
              </div>
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent/40 rounded-br-lg" />
            </div>
          </motion.div>

          {/* Info panel */}
          <div className="lg:col-span-3 space-y-6">
            {/* Name & identity */}
            <motion.div
              className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">
                  遁去的一
                </h2>
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  程序员
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                码农 · 苏州
              </p>
            </motion.div>

            {/* Focus areas */}
            <motion.div
              className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
            >
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                关注领域
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {focusAreas.map((area) => (
                  <div
                    key={area.title}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600/30"
                  >
                    <div className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {area.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {area.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
            >
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                擅长技能
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill.label}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span>{skill.icon}</span>
                    {skill.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Highlight */}
            <motion.div
              className="bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-2xl p-6 border border-primary/10"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={5}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-sm">
                  ⚡
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  个人亮点
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                AI 工具深度使用者
              </p>
            </motion.div>

            {/* Quote */}
            <motion.div
              className="relative pl-5 border-l-2 border-primary/30"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={6}
            >
              <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                "纯粹的浪荡人士与抱定决心干大事的人, 面相是截然不同的。"
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
